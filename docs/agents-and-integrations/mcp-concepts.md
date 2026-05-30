---
sidebar_position: 5
title: MCP Concepts
---

# MCP Concepts

The **Model Context Protocol (MCP)** is a standard protocol for AI models to interact with external tools and services. It defines how an AI agent discovers, describes, and invokes tools exposed by remote servers over HTTP. CatalEx uses MCP as its universal integration layer — every tool an agent can call, whether built-in or custom, speaks MCP.

## Why MCP Matters

Without a standard protocol, every AI integration requires bespoke glue code: custom API clients, hand-rolled authentication, one-off serialization logic. MCP eliminates this by providing a **standardized tool interface**. The result:

- **Any AI agent** can use **any MCP-compatible tool** without custom integration code.
- Tool authors publish once; every MCP-aware platform can consume their tools immediately.
- Authentication, discovery, and invocation all follow a single, well-defined contract.

## Architecture

The following diagram shows how a user request flows through CatalEx to your custom MCP server and back:

```
User
  |
  v
CatalEx Chat UI
  |
  v
Agent (system instructions define persona and behavior)
  |
  v
MCP Proxy (CatalEx-managed, handles auth and routing)
  |
  v
Your MCP Server (exposes tools over Streamable HTTP)
  |
  v
External Service (database, SaaS API, internal system, etc.)
```

1. The user sends a message in the CatalEx Intelligence (chat) interface.
2. The agent interprets the message using its system instructions.
3. When the agent decides it needs external data or wants to perform an action, it calls a tool through the **MCP Proxy**.
4. The proxy authenticates the request, attaches ACL context headers, and forwards the call to **your MCP server**.
5. Your server executes the tool logic (querying a database, calling an API, etc.) and returns a result.
6. The agent incorporates the result into its response to the user.

## Core Concepts

### Tools

A **tool** is a function your MCP server exposes. Each tool has three parts:

| Component | Description | Example |
|-----------|-------------|---------|
| **Name** | A unique identifier for the tool | `lookup_employee` |
| **Description** | Natural-language explanation of what the tool does (the agent reads this to decide when to call it) | "Look up an employee by name and return their profile" |
| **Input schema** | A JSON Schema defining the tool's parameters | `{"name": {"type": "string"}}` |

When the agent calls a tool, it sends the tool name and a JSON object matching the input schema. Your server executes the function and returns a dict with the results.

:::tip
Write clear, specific tool descriptions. The agent uses them to decide **which** tool to call and **when**. A vague description like "does stuff with employees" will produce unreliable behavior.
:::

### Transport: Streamable HTTP

MCP uses **Streamable HTTP** as its transport layer (spec version 2025-03-26). Your MCP server exposes an HTTP endpoint that accepts **JSON-RPC 2.0** requests. This is the same request/response model used by Ethereum, Language Server Protocol, and many other systems — mature, well-understood, and easy to debug with standard HTTP tools.

You do not need to implement the JSON-RPC layer yourself. The Python `mcp` SDK handles serialization, deserialization, and routing automatically.

### Authentication

CatalEx authenticates with your MCP server using **Bearer tokens** in the `Authorization` header:

```
Authorization: Bearer <your-token>
```

You configure the token when you deploy your MCP server (via the `MCP_PROXY_TOKENS` environment variable) and again when you register the server in CatalEx. Every request from CatalEx includes this header; your server should reject requests with missing or invalid tokens.

### ACL Context

In addition to the bearer token, CatalEx sends **user identity headers** with every tool invocation:

| Header | Description | Example |
|--------|-------------|---------|
| `X-User-Id` | The CatalEx user ID of the person who sent the message | `usr_abc123` |
| `X-Company-Id` | The CatalEx company ID | `comp_xyz789` |
| `X-User-Email` | The user's email address | `alice@company.com` |

These headers are injected into your tool function as an `acl_context` dict parameter. Use them to enforce **per-user permissions** — for example, only returning data the requesting user is authorized to see.

:::warning
ACL context is provided for authorization decisions inside your tool. Never trust the agent's natural-language claim about who is asking — always use `acl_context`.
:::

## CatalEx Proxy Contract

CatalEx's MCP Proxy exposes two endpoints that mediate all tool communication:

### `POST /v1/mcps/list`

Returns all registered MCPs and their tool definitions. The agent calls this at the start of a conversation to learn what tools are available.

**Response structure (simplified):**

```json
{
  "mcps": [
    {
      "id": "company_directory",
      "display_name": "Company Directory",
      "tools": [
        {
          "name": "lookup_employee",
          "description": "Look up an employee by name.",
          "input_schema": {
            "type": "object",
            "properties": {
              "name": {"type": "string", "description": "The employee's name to search for."}
            },
            "required": ["name"]
          }
        }
      ]
    }
  ]
}
```

### `POST /v1/mcps/invoke`

Calls a specific tool on a specific MCP server.

**Request body:**

```json
{
  "mcp_id": "company_directory",
  "tool_name": "lookup_employee",
  "parameters": {"name": "Alice"}
}
```

**Response body:**

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

## When to Build a Custom MCP

Build a custom MCP server when you need to connect CatalEx to:

- **Internal tools** — employee directories, internal dashboards, proprietary databases
- **Proprietary APIs** — services with custom authentication or non-standard interfaces
- **Custom business logic** — approval workflows, compliance checks, company-specific calculations
- **Services not covered by official integrations** — niche SaaS products, legacy systems, on-prem services

:::info
Before building a custom MCP, check the [Tools page](/features/tools) for an existing integration. CatalEx ships with MCPs for common services like Jira, GitHub, Slack, and others.
:::

## Frequently Asked Questions

### Do I have to use Python?

No. The official MCP SDK is available for Python (the `mcp` package with the `FastMCP` class), but MCP is a protocol, not a library. Any language that can serve HTTP and speak JSON-RPC 2.0 can implement an MCP server. Python is the fastest path because the SDK handles the protocol details for you.

### Is MCP an open standard?

Yes. The Model Context Protocol is an open standard maintained by Anthropic. The specification, SDKs, and reference implementations are publicly available.

### Can my MCP server host multiple tools?

Yes, and this is the **recommended pattern**. Group related tools into a single MCP server. For example, a "Company Directory" MCP might expose `lookup_employee`, `list_departments`, and `search_by_department` — all in one server. This keeps deployment simple and gives agents a coherent set of capabilities.

### How does the agent decide which tool to call?

The agent reads the tool names and descriptions returned by `/v1/mcps/list`. Based on the user's message and the agent's system instructions, it selects the most appropriate tool and constructs the parameters. This is why clear, descriptive tool names and descriptions are critical.

### What happens if my MCP server is down?

The proxy will return a connection error to the agent. The agent will typically tell the user that the tool is temporarily unavailable. CatalEx does not retry failed tool calls automatically — the user can try again.
