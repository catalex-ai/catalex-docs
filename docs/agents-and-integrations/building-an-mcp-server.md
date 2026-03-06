---
sidebar_position: 6
title: Building an MCP Server
---

# Building an MCP Server

This guide walks you through building a complete MCP server from scratch. By the end, you will have a working server with multiple tools, a manifest file for CatalEx, and a Dockerfile for deployment.

## Prerequisites

- **Python 3.11+** installed
- **pip** or **uv** for package management
- A text editor or IDE
- Basic familiarity with Python async/await

## Project Structure

Create the following directory layout:

```
my-mcp-server/
├── server.py           # FastMCP server with tool definitions
├── manifest.json       # UI metadata for CatalEx
├── requirements.txt    # Dependencies
└── Dockerfile          # For deployment
```

## Step 1: Install Dependencies

Create a `requirements.txt` file:

```txt title="requirements.txt"
mcp>=1.0.0
httpx>=0.27.0
uvicorn>=0.30.0
```

Install the dependencies:

```bash
pip install mcp httpx uvicorn
```

:::tip
If you use **uv** for dependency management, you can run `uv pip install -r requirements.txt` instead. The `mcp` package includes the `FastMCP` class and the Streamable HTTP transport — no additional packages are needed for the protocol layer.
:::

## Step 2: Create Your MCP Server

Create `server.py` with the following complete code:

```python title="server.py"
from mcp.server.fastmcp import FastMCP

# Create the MCP server instance.
# The name appears in tool discovery and logs.
directory_mcp = FastMCP("Company Directory")


@directory_mcp.tool()
async def lookup_employee(name: str) -> dict:
    """Look up an employee by name.

    Args:
        name: The employee's name to search for.
    """
    # Replace with your actual database or API lookup
    employees = {
        "alice": {
            "name": "Alice Johnson",
            "email": "alice@company.com",
            "department": "Engineering",
            "title": "Senior Engineer",
        },
        "bob": {
            "name": "Bob Smith",
            "email": "bob@company.com",
            "department": "Product",
            "title": "Product Manager",
        },
    }

    key = name.lower()
    if key in employees:
        return {"found": True, **employees[key]}
    return {"found": False, "message": f"No employee found matching '{name}'"}


@directory_mcp.tool()
async def list_departments() -> dict:
    """List all departments in the company."""
    return {
        "departments": [
            {"name": "Engineering", "head": "Alice Johnson", "headcount": 45},
            {"name": "Product", "head": "Bob Smith", "headcount": 12},
            {"name": "Design", "head": "Carol Davis", "headcount": 8},
            {"name": "Sales", "head": "Dan Wilson", "headcount": 30},
        ]
    }


@directory_mcp.tool()
async def search_by_department(department: str) -> dict:
    """Find all employees in a specific department.

    Args:
        department: The department name to search in.
    """
    # Replace with your actual lookup
    return {
        "department": department,
        "employees": [
            {"name": "Alice Johnson", "title": "Senior Engineer"},
            {"name": "Eve Chen", "title": "Staff Engineer"},
        ],
    }


if __name__ == "__main__":
    directory_mcp.run(transport="streamable-http", host="0.0.0.0", port=8001)
```

**Key points about this code:**

- **`FastMCP("Company Directory")`** — creates a server instance. The string argument is a human-readable name used in logs and discovery.
- **`@directory_mcp.tool()`** — registers an async function as an MCP tool. The function name becomes the tool name; the docstring becomes the tool description.
- **Type hints are required.** The `mcp` SDK uses them to generate the tool's JSON Schema automatically. `name: str` produces `{"name": {"type": "string"}}` in the schema.
- **Docstring `Args:` section** — each parameter description is extracted and included in the schema. Agents read these to understand what values to pass.
- **Return type is always `dict`.** Tools must return a dictionary. The SDK serializes it to JSON for the response.
- **`transport="streamable-http"`** — serves the MCP protocol over HTTP (the transport CatalEx expects).

## Step 3: Create the Manifest File

The `manifest.json` file provides UI metadata so CatalEx can display your MCP with a name, description, and icon in the Agent Market.

```json title="manifest.json"
{
    "name": "company_directory",
    "display_name": "Company Directory",
    "description": "Look up employees, departments, and organizational information",
    "icon": "users",
    "color": "#3b82f6"
}
```

| Field | Description |
|-------|-------------|
| `name` | Machine-readable identifier (snake_case, unique) |
| `display_name` | Human-readable name shown in the CatalEx UI |
| `description` | Short description shown below the name |
| `icon` | Icon identifier (CatalEx uses a standard icon set — see the Agent Market for available icons) |
| `color` | Hex color code for the icon background |

## Step 4: Run Locally

Start your server:

```bash
python server.py
```

You should see output indicating the server is listening:

```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
```

Your MCP server is now running at `http://localhost:8001`. You can verify it works by following the [Testing Your MCP](./testing-your-mcp) guide.

## Step 5: Handling ACL Context

When CatalEx calls your MCP server, it passes user identity information via HTTP headers:

- `X-User-Id` — the CatalEx user ID
- `X-Company-Id` — the CatalEx company ID
- `X-User-Email` — the user's email address

The `mcp` SDK injects these headers into your tool function as an `acl_context` dictionary parameter. To receive them, add `acl_context` as an optional parameter to your tool:

```python
@directory_mcp.tool()
async def lookup_my_team(acl_context: dict | None = None) -> dict:
    """Look up the current user's team members.

    Args:
        acl_context: Automatically provided by CatalEx with user identity.
    """
    user_email = acl_context.get("user_email", "unknown") if acl_context else "unknown"
    # Use user_email to look up their team in your database
    return {
        "requested_by": user_email,
        "team": ["Alice Johnson", "Bob Smith"],
    }
```

:::info
The `acl_context` parameter is **automatically injected** by CatalEx. Users and agents never set it manually. When testing locally without CatalEx, `acl_context` will be `None` — always handle this gracefully with a default.
:::

**Available fields in `acl_context`:**

| Key | Source Header | Description |
|-----|--------------|-------------|
| `user_id` | `X-User-Id` | CatalEx user ID |
| `company_id` | `X-Company-Id` | CatalEx company ID |
| `user_email` | `X-User-Email` | User's email address |

:::warning
Always use `acl_context` for authorization decisions. Never rely on the agent's natural-language description of who is asking — it can be manipulated through prompt injection.
:::

## Step 6: Error Handling Best Practices

Tools should **never raise unhandled exceptions**. Always catch errors and return them as a dict with an `"error"` key:

```python
@directory_mcp.tool()
async def lookup_employee(name: str) -> dict:
    """Look up an employee by name.

    Args:
        name: The employee's name to search for.
    """
    try:
        result = await your_api_call(name)
        return {"found": True, "data": result}
    except TimeoutError:
        return {"error": "Request timed out. Please try again."}
    except Exception as e:
        return {"error": f"Failed to look up employee: {str(e)}"}
```

**Why this matters:**

- An unhandled exception causes a 500 Internal Server Error, which gives the agent no useful information to relay to the user.
- A structured `{"error": "..."}` response lets the agent explain the problem clearly: "The employee lookup timed out — please try again."
- The error message should be **user-friendly**. Avoid stack traces or internal implementation details.

:::danger
Never expose sensitive information in error messages. Messages like `"Database connection failed: password=secret123"` or `"Internal error at /opt/app/db.py:42"` leak implementation details. Return generic messages and log the details server-side.
:::

**Additional error handling guidelines:**

| Pattern | Example |
|---------|---------|
| Validate inputs early | `if not name.strip(): return {"error": "Name cannot be empty"}` |
| Set timeouts on external calls | `httpx.AsyncClient(timeout=10.0)` |
| Handle partial results | `return {"results": found_items, "warning": "2 of 5 sources were unavailable"}` |
| Distinguish "not found" from "error" | `{"found": False}` vs `{"error": "Service unavailable"}` |

## Step 7: Create the Dockerfile

For deployment, create a `Dockerfile`:

```dockerfile title="Dockerfile"
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["python", "server.py"]
```

Build and test locally with Docker:

```bash
docker build -t my-mcp-server .
docker run -p 8001:8001 my-mcp-server
```

See [Deploying MCPs](./deploying-mcps) for production deployment options.

## Complete File Listing

For reference, here is every file in the finished project:

```
my-mcp-server/
├── server.py           # 50 lines — FastMCP server with 3 tools
├── manifest.json       # 7 lines — UI metadata
├── requirements.txt    # 3 lines — Python dependencies
└── Dockerfile          # 8 lines — Container image definition
```

## Frequently Asked Questions

### Can I use async database drivers?

Yes. Tool functions are `async`, so you can use any async-compatible library — `asyncpg` for PostgreSQL, `motor` for MongoDB, `aiohttp` for HTTP calls, `aioboto3` for AWS, and so on. Avoid blocking calls (like `requests.get` or `time.sleep`) inside tool functions, as they will block the event loop.

### How many tools can one server have?

There is no hard limit. However, keep tools **focused and cohesive** — group related tools into one server (e.g., all HR tools in one server, all DevOps tools in another). If you have 50 unrelated tools on one server, agents will struggle to pick the right one.

### Can tools call other tools?

Not directly through the MCP protocol. However, you can share helper functions between tools in the same server:

```python
async def _get_employee(email: str) -> dict | None:
    """Shared helper — not exposed as a tool."""
    # ... database lookup ...

@directory_mcp.tool()
async def lookup_employee(name: str) -> dict:
    """Look up an employee by name."""
    employee = await _get_employee(name)
    # ...

@directory_mcp.tool()
async def lookup_my_team(acl_context: dict | None = None) -> dict:
    """Look up the current user's team."""
    me = await _get_employee(acl_context.get("user_email"))
    # ...
```

### What return format should tools use?

Always return a **dict**. The SDK serializes it to JSON. Use descriptive keys and include enough context for the agent to form a useful response:

```python
# Good — the agent can construct a helpful answer from this
return {
    "found": True,
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "department": "Engineering",
    "title": "Senior Engineer",
}

# Bad — the agent has no structured data to work with
return {"result": "Alice Johnson is in Engineering"}
```

### Can I add dependencies beyond the basics?

Yes. Add any Python package to `requirements.txt`. Common additions include:

- `sqlalchemy[asyncio]` — async database ORM
- `httpx` — async HTTP client (already included)
- `pydantic` — data validation (already a dependency of `mcp`)
- `redis` — caching layer
- `boto3` / `aioboto3` — AWS services
