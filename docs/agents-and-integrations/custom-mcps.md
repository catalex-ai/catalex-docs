---
sidebar_position: 3
title: Custom MCPs
---

# Custom MCPs

Custom MCPs are MCP server connections that your company builds, hosts, and manages. They allow you to extend CatalEx with integrations for internal tools, proprietary APIs, or any service not covered by the official integrations.

## How It Works

When you add a custom MCP, CatalEx connects to your MCP server through a secure proxy. During chat conversations, CatalEx discovers the tools your server exposes and can invoke them on behalf of users. Your server handles the actual interaction with the underlying service or API.

```
CatalEx  --->  Your MCP Server  --->  Your Internal Service / API
         (HTTPS + Bearer token)
```

Your MCP server must implement the Model Context Protocol (MCP) standard so that CatalEx can discover available tools and call them with structured inputs and outputs.

## Why Build Custom MCPs?

Custom MCPs are the right choice when you need to:

- **Connect internal tools**: Integrate CatalEx with your company's proprietary systems (internal dashboards, admin panels, custom databases).
- **Wrap proprietary APIs**: Expose your company's API endpoints as MCP tools that agents can invoke.
- **Cover unsupported services**: Integrate with third-party services that do not yet have an official CatalEx integration.
- **Enforce custom logic**: Add business-specific validation, logging, or transformation logic between CatalEx and external services.

## Key Concepts

### MCP Server URL

The URL where your MCP server is hosted. CatalEx sends requests to this URL to discover tools and execute actions.

:::warning
In production environments, the MCP server URL **must use HTTPS**. Unencrypted HTTP connections are not supported in production.
:::

### Authentication Token

CatalEx authenticates with your MCP server using a **Bearer token**. This token is sent in the `Authorization` header of every request. Your server should validate this token before processing any request.

### Auto-Approve

When auto-approve is **disabled** (the default), every tool execution from this MCP requires the user to confirm the action in chat before it runs. When auto-approve is **enabled**, tools execute immediately without confirmation.

:::warning
Only enable auto-approve for MCP servers you fully trust and have thoroughly tested. Auto-approved tools execute actions (like creating tickets, sending messages, or modifying data) without any user confirmation step.
:::

### Connection Testing

When you test a custom MCP connection, CatalEx tries multiple verification methods to determine if your server is reachable and compatible:

1. **Proxy discovery** --- checks if the URL hosts multiple MCPs behind a proxy.
2. **REST health check** --- sends a standard health check request.
3. **Streamable HTTP probe** --- tests the MCP streaming protocol.

If **any** of these methods succeeds, the connection is considered valid.

## Adding a Custom MCP

1. Open the **Tools** page (admins only).
2. Click **Add MCP**.
3. Enter a **name** for the connection (e.g., "Internal Ticketing System").
4. Enter the **MCP server URL** (must be HTTPS in production).
5. Enter the **authentication token** (Bearer token your server expects).
6. Click **Test Connection** to verify that CatalEx can reach your server.
7. Click **Save**.

:::tip
Give your MCP a descriptive name that makes it easy to identify when linking it to agents later. Names like "Prod Inventory API" or "Staging CRM Tools" are more helpful than "My MCP".
:::

## Managing Custom MCPs

Once a custom MCP is added, you can manage it from the Tools page.

### Enable / Disable

Toggle a connection on or off without deleting it. Disabling an MCP prevents any agent from using its tools, but preserves the configuration so you can re-enable it later.

### Edit

Update the MCP's name or auto-approve setting. The server URL and auth token are set at creation time.

### Delete

Permanently remove the MCP connection. Any agents linked to this MCP will lose access to its tools.

:::info
If an agent is linked to a deleted MCP, the agent will continue to function but will no longer be able to call tools from the removed connection.
:::

## Configuration

All custom MCP configuration is managed through Studio. The key settings are:

| Setting           | Description                                                    | Required |
| ----------------- | -------------------------------------------------------------- | -------- |
| **Name**          | A human-readable label for the connection                      | Yes      |
| **MCP Server URL**| The HTTPS endpoint where your MCP server is hosted             | Yes      |
| **Auth Token**    | Bearer token used to authenticate requests to your server      | Yes      |
| **Auto-Approve**  | Whether tool executions skip user confirmation                 | No (default: off) |
| **Enabled**       | Whether the connection is active                               | No (default: on)  |

---

## FAQ

### Can I add an MCP from another company?

Yes. If a third party provides you with an MCP server URL and authentication token, you can add it as a custom MCP on your Tools page. The MCP standard is vendor-agnostic.

### What if the connection test fails?

Check the following:

- **URL is correct**: Ensure the full URL is entered, including the protocol (`https://`) and any path.
- **Server is running**: Verify that your MCP server is up and accessible from the internet.
- **Auth token is valid**: Confirm the Bearer token matches what your server expects.
- **Firewall rules**: Make sure your server allows incoming HTTPS requests from CatalEx's IP ranges.

If all of the above check out and the test still fails, review your MCP server logs for errors.

### Can I use the same MCP across multiple companies?

Each CatalEx company needs its own connection record. Even if two companies point to the same MCP server URL, they each maintain a separate configuration with their own authentication token and settings.

### How many custom MCPs can I add?

There is no hard limit on the number of custom MCP connections per company.

### Do I need to build the MCP server myself?

Yes. Custom MCPs require you (or your engineering team) to build and host an MCP-compatible server. The server must implement the Model Context Protocol standard. Refer to the MCP specification for implementation details.
