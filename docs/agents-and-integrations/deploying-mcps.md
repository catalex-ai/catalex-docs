---
sidebar_position: 8
title: Deploying MCPs
---

# Deploying MCPs

Once your MCP server is tested locally, deploy it to a production environment where CatalEx can reach it. This guide covers deployment options, authentication setup, and operational best practices.

## Production Requirements

Before deploying, ensure your setup meets these requirements:

| Requirement | Why | Details |
|-------------|-----|---------|
| **HTTPS** | CatalEx requires encrypted connections in production | Use a platform with built-in TLS or put a reverse proxy in front of your server |
| **Stable URL** | CatalEx stores the URL in its database; changing it requires re-registration | Use a custom domain or a platform that provides stable URLs |
| **Auth tokens** | Prevents unauthorized access to your tools | Set `MCP_PROXY_TOKENS` environment variable |
| **Health monitoring** | Detect outages before users report them | Add a `/health` endpoint and configure alerting |

:::danger
Never deploy an MCP server without authentication in production. Set `MCP_PROXY_TOKENS` to a strong, randomly generated token. Without it, anyone who discovers your server URL can invoke your tools.
:::

## Deployment Option 1: Google Cloud Run

Cloud Run provides serverless container hosting with automatic HTTPS, scaling, and pay-per-request billing.

**Build and deploy in one command:**

```bash
gcloud run deploy my-mcp-server \
  --source . \
  --port 8001 \
  --set-env-vars="MCP_PROXY_TOKENS=your-secure-token" \
  --allow-unauthenticated
```

:::info
`--allow-unauthenticated` means Cloud Run does not enforce its own IAM auth layer. Your MCP server still validates the bearer token via `MCP_PROXY_TOKENS`. This flag is required so that CatalEx's proxy can reach your server without a Google Cloud service account.
:::

**Result:** A stable HTTPS URL like `https://my-mcp-server-abc123-uc.a.run.app`

**Advanced options:**

```bash
gcloud run deploy my-mcp-server \
  --source . \
  --port 8001 \
  --set-env-vars="MCP_PROXY_TOKENS=your-secure-token" \
  --allow-unauthenticated \
  --min-instances=1 \
  --max-instances=10 \
  --memory=512Mi \
  --cpu=1 \
  --region=us-central1
```

- `--min-instances=1` keeps one instance warm to avoid cold-start latency.
- `--max-instances=10` caps scaling to control costs.

## Deployment Option 2: Railway

Railway offers one-click deploys from a GitHub repository with automatic HTTPS.

1. Push your MCP server code to a **GitHub repository**.
2. Go to [railway.app](https://railway.app) and create a new project.
3. Select **"Deploy from GitHub repo"** and connect your repository.
4. In the service settings, add environment variables:
   - `MCP_PROXY_TOKENS` = `your-secure-token`
5. Railway automatically detects the `Dockerfile`, builds the image, and deploys it.
6. Your server gets an HTTPS URL like `https://my-mcp-server.up.railway.app`.

Railway auto-deploys on every push to your default branch.

## Deployment Option 3: Fly.io

Fly.io runs containers on edge infrastructure with built-in HTTPS.

```bash
# Initialize (creates fly.toml configuration)
fly launch

# Set the auth token as a secret
fly secrets set MCP_PROXY_TOKENS=your-secure-token

# Deploy
fly deploy
```

Fly.io will detect your `Dockerfile`, build the image, and deploy it. Your server gets a URL like `https://my-mcp-server.fly.dev`.

**Scaling:**

```bash
# Scale to 2 instances for redundancy
fly scale count 2

# Scale machine size
fly scale vm shared-cpu-1x --memory 512
```

## Deployment Option 4: Self-Hosted (Docker Compose)

For on-premises or private cloud deployments, use Docker Compose:

```yaml title="docker-compose.yml"
version: '3.8'
services:
  mcp-server:
    build: .
    ports:
      - "8001:8001"
    environment:
      - MCP_PROXY_TOKENS=your-secure-token
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Start the service:

```bash
docker compose up -d
```

:::warning
Docker Compose alone does not provide HTTPS. You **must** place a reverse proxy in front of your server. Use **Caddy** (automatic HTTPS with Let's Encrypt) or **nginx** with a TLS certificate.
:::

**Example Caddy configuration:**

```Caddyfile title="Caddyfile"
my-mcp.company.com {
    reverse_proxy mcp-server:8001
}
```

**Docker Compose with Caddy:**

```yaml title="docker-compose.yml"
version: '3.8'
services:
  mcp-server:
    build: .
    expose:
      - "8001"
    environment:
      - MCP_PROXY_TOKENS=your-secure-token
    restart: unless-stopped

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    depends_on:
      - mcp-server
    restart: unless-stopped

volumes:
  caddy_data:
```

## Auth Token Management

### Generate a secure token

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

This generates a 43-character, cryptographically random, URL-safe token. Example output:

```
dBs8G_Hk2qV1mXzRt0pL4wNaEjCfY7yU5oZiKxJnSbA
```

### Token rotation

To rotate a token without downtime:

1. Generate a new token.
2. Add the new token to your server's `MCP_PROXY_TOKENS` (comma-separated — see below).
3. Update the token in CatalEx (the **Tools** page → your MCP → Edit).
4. Remove the old token from `MCP_PROXY_TOKENS`.
5. Redeploy the server.

### Multiple tokens

`MCP_PROXY_TOKENS` accepts comma-separated values. This is useful for rolling updates:

```bash
# Both tokens are valid simultaneously
MCP_PROXY_TOKENS="new-token-abc,old-token-xyz"
```

The server accepts any request bearing a token that matches any value in the list.

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MCP_PROXY_TOKENS` | Yes (production) | — | Comma-separated list of valid bearer tokens |
| `MCP_PROXY_DEV_MODE` | No | `false` | Set to `"true"` to disable auth checks (development only) |

:::danger
Never set `MCP_PROXY_DEV_MODE=true` in production. It disables all authentication, allowing anyone to invoke your tools without a token.
:::

## Health Check Endpoint

Add a health check endpoint to your server for monitoring and orchestration (load balancers, Kubernetes probes, Docker health checks):

```python title="server.py (addition)"
from starlette.responses import JSONResponse

# If using FastMCP's underlying Starlette app:
@directory_mcp.custom_route("/health", methods=["GET"])
async def health_check(request):
    return JSONResponse({"status": "ok"})
```

Alternatively, add a simple health check as a standalone route if your framework supports it. The key requirement is that `GET /health` returns a `200` status code when the server is ready to handle requests.

**Usage in monitoring:**

```bash
# Simple uptime check
curl -f https://my-mcp.company.com/health

# Use with monitoring tools (UptimeRobot, Datadog, Pingdom, etc.)
# Configure them to poll GET /health every 60 seconds
```

## Deployment Checklist

Use this checklist before registering your MCP with CatalEx:

- [ ] Server is accessible over HTTPS
- [ ] `MCP_PROXY_TOKENS` is set to a strong, randomly generated token
- [ ] `MCP_PROXY_DEV_MODE` is **not** set (or set to `false`)
- [ ] `curl -X POST https://your-url/v1/mcps/list -H "Authorization: Bearer your-token"` returns your tools
- [ ] Tool invocations return structured dicts (not exceptions)
- [ ] Error cases return `{"error": "..."}` with user-friendly messages
- [ ] Health check endpoint is configured
- [ ] Monitoring/alerting is set up for the health check
- [ ] Server logs are captured and accessible for debugging

## Frequently Asked Questions

### Can I deploy to AWS Lambda?

Yes, but it requires additional work. Lambda uses a request/response model that differs from Streamable HTTP's long-lived connections. You will need an API Gateway in front of Lambda and may need to adapt the transport layer. For most teams, a container-based deployment (Cloud Run, Fly.io, ECS) is simpler.

### How do I handle secrets (API keys, database passwords)?

Use your platform's secret management:

| Platform | Secret Management |
|----------|------------------|
| Google Cloud Run | `--set-secrets` flag or Secret Manager |
| Railway | Environment variables (encrypted at rest) |
| Fly.io | `fly secrets set` |
| AWS | Secrets Manager or Parameter Store |
| Kubernetes | Kubernetes Secrets |

Never hard-code secrets in your source code or `Dockerfile`.

### What about scaling?

MCP servers are **stateless** — they hold no session data between requests. This means you can scale horizontally without coordination: add more instances behind a load balancer. All major platforms (Cloud Run, Fly.io, Railway) handle this automatically.

### How do I handle zero-downtime deployments?

Most platforms support rolling deployments by default:

- **Cloud Run**: new revision is deployed alongside the old one; traffic shifts after the new revision passes health checks.
- **Fly.io**: `fly deploy` performs a rolling update.
- **Docker Compose**: use `docker compose up -d --no-deps --build mcp-server` to rebuild and restart only the MCP server container.

Combine rolling deployments with multiple auth tokens (see [Token Rotation](#token-rotation)) for fully zero-downtime updates.

### What resources does an MCP server need?

Most MCP servers are lightweight — they receive a request, make an API call or database query, and return the result. Start with:

- **CPU**: 0.5–1 vCPU
- **Memory**: 256–512 MB
- **Instances**: 1–2 for availability

Scale up if your tools perform heavy computation or handle high concurrency.
