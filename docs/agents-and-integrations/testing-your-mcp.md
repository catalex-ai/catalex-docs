---
sidebar_position: 7
title: Testing Your MCP
---

# Testing Your MCP

Before deploying your MCP server or registering it with CatalEx, verify that it works correctly. This guide covers local testing with `curl`, interactive testing with MCP Inspector, automated tests with `pytest`, and using CatalEx's built-in connection tester.

## Local Testing with curl

Start your server:

```bash
python server.py
```

### List available tools

```bash
curl http://localhost:8001/v1/mcps/list
```

This should return a JSON response listing your MCP and all its tools, including names, descriptions, and input schemas.

### Invoke a tool

```bash
curl -X POST http://localhost:8001/v1/mcps/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "mcp_id": "company_directory",
    "tool_name": "lookup_employee",
    "parameters": {"name": "Alice"}
  }'
```

Expected response:

```json
{
  "result": {
    "found": true,
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "department": "Engineering",
    "title": "Senior Engineer"
  }
}
```

### Test a tool with no parameters

```bash
curl -X POST http://localhost:8001/v1/mcps/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "mcp_id": "company_directory",
    "tool_name": "list_departments",
    "parameters": {}
  }'
```

### Test error cases

Verify that your server handles bad input gracefully:

```bash
# Missing required parameter
curl -X POST http://localhost:8001/v1/mcps/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "mcp_id": "company_directory",
    "tool_name": "lookup_employee",
    "parameters": {}
  }'

# Non-existent tool
curl -X POST http://localhost:8001/v1/mcps/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "mcp_id": "company_directory",
    "tool_name": "nonexistent_tool",
    "parameters": {}
  }'
```

## Testing with MCP Inspector

MCP Inspector is an interactive web UI for browsing and testing MCP servers. It connects directly to your server and lets you explore tools, view schemas, and invoke tools with a form-based interface.

```bash
npx @modelcontextprotocol/inspector http://localhost:8001/mcp
```

This opens a browser window where you can:

1. See all registered tools and their descriptions
2. View the JSON Schema for each tool's input
3. Fill in parameters and invoke tools interactively
4. Inspect the raw JSON-RPC request and response

:::tip
MCP Inspector is especially useful during development. Keep it open alongside your editor — you can test changes immediately after restarting your server.
:::

## Testing with Authentication

In production, your server requires a bearer token. Test this locally by setting the `MCP_PROXY_TOKENS` environment variable:

```bash
# Start the server with auth enabled
export MCP_PROXY_TOKENS="test-token-123"
python server.py
```

### Verify that unauthenticated requests are rejected

```bash
curl -X POST http://localhost:8001/v1/mcps/list
# Should return 401 Unauthorized
```

### Test with a valid token

```bash
curl -X POST http://localhost:8001/v1/mcps/list \
  -H "Authorization: Bearer test-token-123"
# Should return the tool listing
```

### Test with an invalid token

```bash
curl -X POST http://localhost:8001/v1/mcps/list \
  -H "Authorization: Bearer wrong-token"
# Should return 401 Unauthorized
```

### Invoke a tool with auth

```bash
curl -X POST http://localhost:8001/v1/mcps/invoke \
  -H "Authorization: Bearer test-token-123" \
  -H "Content-Type: application/json" \
  -d '{
    "mcp_id": "company_directory",
    "tool_name": "lookup_employee",
    "parameters": {"name": "Alice"}
  }'
```

## Using CatalEx's "Test Connection" Button

Once your server is deployed and accessible over HTTPS, use CatalEx's built-in connection tester:

1. Open the **Tools** page from the CatalEx sidebar.
2. Click the **Custom MCPs** tab.
3. Click **"Add MCP"**.
4. Enter your MCP server URL (e.g., `https://my-mcp.company.com`).
5. Enter the auth token you configured during deployment.
6. Click **"Test Connection"**.

CatalEx runs the following checks in sequence:

| Step | What it does |
|------|-------------|
| Proxy discovery | Verifies the URL is reachable |
| Health check | Confirms the server responds to HTTP requests |
| Streamable HTTP probe | Sends an MCP protocol handshake to verify the server speaks MCP |

A **green checkmark** means all checks passed — your server is ready. A **red X** means one or more checks failed; hover over the error icon for details.

:::info
The "Test Connection" button tests connectivity and protocol compatibility only. It does not invoke any of your tools. Use the testing methods described above to verify tool behavior.
:::

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| **401 Unauthorized** | Invalid or missing bearer token | Verify `MCP_PROXY_TOKENS` on the server matches the token entered in CatalEx |
| **Connection refused** | Server not running or wrong port | Confirm the server process is running and listening on the expected port |
| **Timeout** | Server too slow to respond | Check for blocking operations in tool functions; increase client timeout if needed |
| **Tool not found** | Misspelled tool name in the invoke request | Call `/v1/mcps/list` to see the exact tool names your server exposes |
| **500 Internal Server Error** | Unhandled exception in a tool function | Check server logs for the traceback; add try/except error handling (see [Error Handling](./building-an-mcp-server#step-6-error-handling-best-practices)) |
| **SSL/TLS error** | HTTPS misconfigured or certificate invalid | Verify SSL certificates are valid and not expired; check the certificate chain |
| **Connection reset** | Server crashed during request | Check server logs for out-of-memory errors or unhandled exceptions at startup |
| **422 Unprocessable Entity** | Request body does not match the expected schema | Verify the `parameters` object matches the tool's input schema |

## Writing Automated Tests

Automated tests ensure your tools behave correctly as you develop. Use `pytest` with `pytest-asyncio`:

```bash
pip install pytest pytest-asyncio
```

Create a `test_server.py` file:

```python title="test_server.py"
import pytest
from server import directory_mcp


@pytest.mark.asyncio
async def test_lookup_employee_found():
    """Test that looking up a known employee returns their info."""
    result = await directory_mcp.call_tool("lookup_employee", {"name": "Alice"})
    assert result["found"] is True
    assert result["name"] == "Alice Johnson"
    assert result["email"] == "alice@company.com"
    assert result["department"] == "Engineering"


@pytest.mark.asyncio
async def test_lookup_employee_not_found():
    """Test that looking up an unknown name returns found=False."""
    result = await directory_mcp.call_tool("lookup_employee", {"name": "Unknown"})
    assert result["found"] is False
    assert "No employee found" in result["message"]


@pytest.mark.asyncio
async def test_lookup_employee_case_insensitive():
    """Test that employee lookup is case-insensitive."""
    result = await directory_mcp.call_tool("lookup_employee", {"name": "ALICE"})
    assert result["found"] is True
    assert result["name"] == "Alice Johnson"


@pytest.mark.asyncio
async def test_list_departments():
    """Test that list_departments returns all departments."""
    result = await directory_mcp.call_tool("list_departments", {})
    assert "departments" in result
    assert len(result["departments"]) == 4
    names = [d["name"] for d in result["departments"]]
    assert "Engineering" in names
    assert "Product" in names


@pytest.mark.asyncio
async def test_search_by_department():
    """Test searching employees by department."""
    result = await directory_mcp.call_tool(
        "search_by_department", {"department": "Engineering"}
    )
    assert result["department"] == "Engineering"
    assert len(result["employees"]) > 0
```

Run the tests:

```bash
pytest test_server.py -v
```

:::tip
Run your tests in CI (GitHub Actions, GitLab CI, etc.) on every push. MCP tools are the interface between your internal systems and AI agents — regressions can cause confusing agent behavior that is hard to debug from the user's perspective.
:::

### Testing ACL Context

To test tools that use `acl_context`, pass it manually in the parameters:

```python
@pytest.mark.asyncio
async def test_lookup_my_team_with_acl():
    """Test that lookup_my_team uses the caller's email."""
    result = await directory_mcp.call_tool(
        "lookup_my_team",
        {"acl_context": {"user_email": "alice@company.com"}},
    )
    assert result["requested_by"] == "alice@company.com"
    assert "team" in result


@pytest.mark.asyncio
async def test_lookup_my_team_without_acl():
    """Test graceful handling when acl_context is missing."""
    result = await directory_mcp.call_tool("lookup_my_team", {})
    assert result["requested_by"] == "unknown"
```

### Integration Tests

For full end-to-end testing against the HTTP transport, use `httpx` to send actual HTTP requests:

```python title="test_integration.py"
import pytest
import httpx

BASE_URL = "http://localhost:8001"


@pytest.mark.asyncio
async def test_list_endpoint():
    """Test the /v1/mcps/list endpoint returns tools."""
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{BASE_URL}/v1/mcps/list")
        assert response.status_code == 200
        data = response.json()
        assert "mcps" in data or "tools" in data


@pytest.mark.asyncio
async def test_invoke_endpoint():
    """Test the /v1/mcps/invoke endpoint calls a tool."""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/v1/mcps/invoke",
            json={
                "mcp_id": "company_directory",
                "tool_name": "lookup_employee",
                "parameters": {"name": "Alice"},
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert data["result"]["found"] is True
```

:::warning
Integration tests require the server to be running. Start it in a separate terminal or use a `pytest` fixture that launches and tears down the server automatically.
:::

## Frequently Asked Questions

### How do I test ACL context locally?

Pass it manually in the `parameters` dict when calling `call_tool()`, or include `X-User-Id`, `X-Company-Id`, and `X-User-Email` headers in your `curl` requests. The SDK will inject them into the `acl_context` parameter.

### Should I write unit tests or integration tests?

Both. **Unit tests** (using `call_tool()`) verify individual tool logic in isolation — they are fast and easy to debug. **Integration tests** (using `httpx` against the running server) verify the full HTTP stack, including serialization, auth, and transport. Unit tests catch logic bugs; integration tests catch wiring bugs.

### How can I test with realistic data?

Create a fixtures file or use a test database. Avoid testing against production data sources — use mocks or a staging environment. For external API calls, consider using `respx` or `pytest-httpx` to mock HTTP responses.
