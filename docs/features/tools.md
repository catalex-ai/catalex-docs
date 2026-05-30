---
sidebar_position: 4
title: Tools
---

# Tools

The **Tools** page is the catalog of services CatalEx can connect to — Slack, GitHub, Jira, Gmail, Notion, HubSpot, Salesforce, Stripe, and roughly a hundred more. Once a service is connected, your [Studio](./studio.md) agents and [Freeflow](./freeflow.md) can act on it: read and send email, create issues, post messages, query a database, and so on.

Each connectable service is an **integration**, and every integration exposes a set of individual **actions** (for example, the Gmail integration includes *Send Email*, *Create Draft*, and *List Labels*).

## Browsing the catalog

Tools are grouped under **Official Integrations** into collapsible categories (Communication, CRM & Sales, Developer Tools, and more). Use the **Search tools…** box or the category pills to find what you need.

Cards carry badges that tell you their state:

| Badge | Meaning |
|---|---|
| **✓ Available** | A built-in tool that needs no setup — *Web Search*, *Web Fetcher*, *Script Executor*, *Knowledge Base*. |
| **+** (Connect) | Ready to connect with one click. |
| **✓ Connected** | Already connected. *(N)* indicates multiple accounts. |
| **Setup Required** | Needs your own API key or OAuth app first. |
| **Coming Soon** | Not yet available. |

:::info
Connecting integrations requires the **ADMIN** or **OWNER** role. Members can use what's connected but see a prompt to *"Contact your workspace admin to add this integration."*
:::

## Connecting an integration

There are three connection paths, depending on the service:

1. **One-click OAuth** (most services). Click **+**, approve access on the vendor's screen, then give the connection a name (e.g. *"Work Slack"*). This name helps you tell multiple accounts apart.
2. **Custom OAuth app.** Some services need your company's own OAuth app. CatalEx shows the redirect URI to register and fields for the **Client ID** and **Client Secret**, then continues to OAuth.
3. **API key / token** (*Setup Required*). CatalEx walks you through a per-service **Setup Guide** with the exact fields that service needs.

### Multiple accounts

You can connect more than one account per integration. Click the **✓ Connected** badge to open the connections manager, where you can rename a connection, **add another account**, or **disconnect** one. Disconnecting is reversible — reconnect any time.

## How agents use tools

Connecting an integration here makes it *available*; each agent then chooses which tools it actually uses. In an agent's [Tools tab](./studio.md#tools), you add tools from the catalog and pick which connected accounts that agent may act through.

## Guardrails and approvals

Every tool action has a **guardrail** setting that decides whether an agent can run it automatically or must pause for your approval. Open an integration's detail panel to see its **Available Tools** list. Each action has a toggle:

- **Auto** — the agent performs the action automatically.
- **Manual** — the action requires your approval before it runs (this is the default).

Changes save instantly. When an action is set to **Manual**, the agent pauses and asks you to **Approve** or **Reject** it — you'll see this in the agent's chat. From an approval prompt you can also choose to auto-approve that tool going forward (for 24 hours, or always), so you aren't asked again.

Guardrails can be set at two levels: a **workspace default** here on the Tools page, and a **per-agent override** in each agent's Tools tab.

:::tip
Start new integrations on **Manual** for anything that writes or sends data (emails, messages, tickets). Once you trust an agent's behavior, switch the safe actions to **Auto**.
:::

## Custom tools and MCPs

Beyond the official catalog, CatalEx supports two ways to extend what agents can do:

- **Script tools** — small Python tools you build directly in an agent's Tools tab for bespoke logic. See [Studio → Tools](./studio.md#tools).
- **Custom MCPs** — connect any MCP-compatible server your team builds and hosts. This is an admin capability; see [Custom MCPs](../agents-and-integrations/custom-mcps.md) and the [build-your-own guides](../agents-and-integrations/overview.md).

## FAQ

**What's the difference between an integration and an action?**
An integration is the service (e.g. Gmail). An action is one thing the agent can do within it (e.g. *Send Email*). Guardrails are set per action.

**Why did my agent stop and ask for approval?**
That action's guardrail is set to **Manual**. Approve it once, or switch the action (or tool) to **Auto** to skip future prompts.

**Can different agents use different accounts of the same tool?**
Yes. When you add a tool to an agent, you choose which connected accounts that agent may use.

**Do members need to reconnect tools themselves?**
No. An admin connects an integration once, and team members reuse it.
