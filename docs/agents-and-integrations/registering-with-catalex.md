---
sidebar_position: 10
title: Registering with CatalEx
---

# Registering with CatalEx

This guide walks you through the end-to-end process of registering a custom MCP server in CatalEx and creating an agent that uses it. By the end, your team will have a working agent in the Intelligence (chat) interface backed by your custom tools.

:::info
**Prerequisites:** You need a deployed MCP server with HTTPS and a valid auth token. If you have not deployed yet, complete the [Building an MCP Server](./building-an-mcp-server) and [Deploying MCPs](./deploying-mcps) guides first.
:::

## Part 1: Register Your MCP

### Step 1: Open the Custom MCPs Panel

Navigate to **Agent Market** in the CatalEx sidebar, then click the **Custom MCPs** tab.

### Step 2: Add a New MCP

Click the **"Add MCP"** button in the top-right corner. A configuration form opens.

### Step 3: Enter Your Server URL

In the **URL** field, enter the full HTTPS URL of your deployed MCP server:

```
https://my-mcp-server-abc123-uc.a.run.app
```

:::warning
The URL must use HTTPS. CatalEx rejects HTTP URLs in production. If you are testing locally, use a tunnel service like ngrok to get a temporary HTTPS URL: `ngrok http 8001`.
:::

### Step 4: Enter Your Auth Token

In the **Token** field, enter the bearer token you configured via the `MCP_PROXY_TOKENS` environment variable during deployment. This is the same token you used for `curl` testing.

### Step 5: Test the Connection

Click the **"Test Connection"** button. CatalEx performs three checks in sequence:

| Check | What it verifies |
|-------|-----------------|
| **Proxy discovery** | The URL is reachable over the network |
| **Health check** | The server responds to HTTP requests |
| **Streamable HTTP probe** | The server speaks the MCP protocol correctly |

Wait for the result:

- **Green checkmark** — all checks passed. Your server is connected and ready.
- **Red X** — one or more checks failed. Hover over the error for details. Common issues:
  - `401 Unauthorized` — the token does not match `MCP_PROXY_TOKENS`
  - `Connection refused` — the server is not running or the URL is wrong
  - `Timeout` — the server is too slow to respond; check for blocking operations
  - `SSL error` — HTTPS certificate is invalid or expired

### Step 6: Save the Connection

Click **"Save"**. The MCP is now registered in CatalEx's database. It appears in the Custom MCPs list with its name, URL, and connection status.

### Step 7: Configure Auto-Approve (Optional)

If you want agents to invoke this MCP's tools without asking the user for confirmation, toggle **"Auto-approve"** to on. Only enable this for MCPs whose tools are all read-only or non-destructive. See [Auto-Execute Considerations](./creating-custom-agents#auto-execute-considerations) for guidance.

## Part 2: Create an Agent Using Your MCP

### Step 1: Open the Agents Panel

Navigate to **Agent Market** in the CatalEx sidebar, then click the **Agents** tab.

### Step 2: Create a New Agent

Click the **"Create Agent"** button. The agent configuration form opens.

### Step 3: Fill in Basic Details

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | The agent's display name (shown in the chat interface) | "Company Directory" |
| **Description** | A short description of what the agent does | "Look up employees, departments, and org structure" |
| **Icon** | Choose from the available icon set | `users` |
| **Color** | Hex color for the agent's avatar | `#3b82f6` |

### Step 4: Write System Instructions

Enter the agent's system instructions in the **Instructions** field. These define the agent's persona, capabilities, rules, and response format.

**Example for a Company Directory agent:**

```markdown
You are the Company Directory assistant. You help employees find information
about people, teams, and organizational structure.

## Capabilities
- Look up employees by name to find their email, department, and title
- List all departments with their headcounts and department heads
- Search for employees within a specific department

## Rules
- Always present results in a clear, structured format
- If no employee is found, suggest checking the spelling or trying a different name
- Do not speculate about information not returned by the directory tools
- Respect that some employees may have restricted profiles — if a tool returns
  limited data, do not attempt to fill in the gaps

## Response Format
- Use a brief sentence introducing the result, followed by structured details
- For employee lookups: Name, Email, Department, Title
- For department listings: use a table format
```

For detailed guidance on writing effective instructions, see the [Creating Custom Agents](./creating-custom-agents) guide.

### Step 5: Link Your MCP

In the **MCP Linking** section of the form:

1. Click **"Add MCP"** (or **"Link MCP"**, depending on your CatalEx version).
2. A dropdown shows all registered MCPs — both built-in and custom.
3. Select the MCP you registered in Part 1 (e.g., "Company Directory").
4. The MCP's tools are displayed for confirmation. Verify the tool names and descriptions look correct.

You can link multiple MCPs to a single agent. Each MCP's tools become available to the agent.

### Step 6: Configure Auto-Execute

Choose whether the agent should auto-execute tool calls:

- **Auto-execute ON**: The agent calls tools immediately without asking the user. Requires all linked MCPs to have `auto_approve=true`.
- **Auto-execute OFF** (default): The agent asks the user for confirmation before each tool call.

:::info
If any linked MCP does not have auto-approve enabled, the auto-execute toggle is grayed out. You must enable auto-approve on all linked MCPs first (in **Custom MCPs > your MCP > Edit**).
:::

### Step 7: Save and Test

Click **"Save as Draft"**. The agent is created in draft status — visible only to admins.

Open the **Intelligence** (chat) interface. Select your draft agent from the agent picker. Test it with sample queries:

- "Look up Alice"
- "What departments do we have?"
- "Who works in Engineering?"

Verify that:
- The agent calls the correct tools
- Results are formatted according to your instructions
- Error cases are handled gracefully

### Step 8: Activate

Once testing is complete, return to **Agent Market > Agents**, find your agent, and change its status from **Draft** to **Active**. The agent is now available to all users in your company.

## Part 3: What Your Team Sees

After activation, the agent appears in the **Intelligence** (chat) interface for all users in your CatalEx company.

### Discovering the Agent

Users see the agent in the agent picker — a list of available agents shown when starting a new conversation or switching agents mid-conversation. Your agent's name, description, and icon are displayed.

### Using the Agent

Team members interact with the agent by selecting it and typing messages in natural language. The agent uses its system instructions to interpret the message, decides which tools to call, and presents the results.

**Example interaction:**

> **User:** Who is Alice Johnson?
>
> **Agent:** Let me look that up.
> *[Calls lookup_employee with name="Alice Johnson"]*
>
> Here is what I found:
> - **Name:** Alice Johnson
> - **Email:** alice@company.com
> - **Department:** Engineering
> - **Title:** Senior Engineer

### Tool Call Visibility

When the agent calls a tool, users see a collapsible block in the chat showing:
- The tool name
- The parameters sent
- The result returned

This transparency lets users understand what the agent is doing and verify the information source.

## Managing Your MCP

### Updating Credentials

If you rotate your MCP server's auth token:

1. Go to **Agent Market > Custom MCPs**.
2. Find your MCP in the list.
3. Click **Edit** (or the pencil icon).
4. Update the **Token** field with the new token.
5. Click **"Test Connection"** to verify.
6. Click **Save**.

:::tip
To avoid downtime during token rotation, temporarily configure your server with both old and new tokens (`MCP_PROXY_TOKENS=new-token,old-token`), update the token in CatalEx, then remove the old token from the server. See [Auth Token Management](./deploying-mcps#auth-token-management).
:::

### Removing an MCP

To delete a registered MCP:

1. Go to **Agent Market > Custom MCPs**.
2. Find your MCP and click **Delete** (or the trash icon).
3. Confirm the deletion.

:::danger
Deleting an MCP removes it from all agents that link to it. Those agents will lose access to the MCP's tools immediately. If the agent has no other linked MCPs, it becomes a domain-expert agent (instructions only, no tools). Verify which agents are affected before deleting.
:::

### Updating Your MCP Server

When you deploy a new version of your MCP server (adding tools, changing tool behavior, etc.):

- **Adding new tools**: CatalEx discovers them automatically via `/v1/mcps/list` on the next conversation. No CatalEx-side changes needed.
- **Removing tools**: Remove them from your server code and redeploy. Agents will no longer see or call the removed tools.
- **Changing tool behavior**: Redeploy your server. The change takes effect immediately for new tool calls.
- **Changing the URL**: You must delete and re-register the MCP with the new URL.

## Frequently Asked Questions

### Can I register the same MCP URL twice?

No. MCP URLs must be unique per company. If you attempt to add a URL that is already registered, CatalEx will show an error. If you need to re-register, delete the existing entry first.

### What if I need to change the MCP URL?

Delete the existing MCP registration and add a new one with the updated URL. You will need to re-link the new MCP to any agents that used the old one.

### Do I need to restart CatalEx after adding an MCP?

No. All changes — adding MCPs, creating agents, updating tokens, activating agents — take effect immediately. There is no restart or cache invalidation step.

### Can non-admin users register MCPs or create agents?

No. Only users with admin permissions can access the Agent Market management interface (Custom MCPs and agent creation). All users can **use** agents in the Intelligence interface.

### How many custom MCPs can I register?

There is no hard limit. Register as many MCPs as you need. Each MCP can host multiple tools, so you typically need fewer MCPs than you might expect.

### Can I share an MCP across multiple CatalEx companies?

Yes. Deploy one MCP server and register its URL in each CatalEx company separately, with separate auth tokens per company. Your server can use the `X-Company-Id` header (from `acl_context`) to isolate data between companies.
