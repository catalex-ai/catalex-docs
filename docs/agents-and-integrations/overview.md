---
sidebar_position: 1
title: Agent Market Overview
---

# Agent Market Overview

The **Agent Market** is your central hub for extending CatalEx with external tool integrations and custom AI agents. It allows your organization to connect CatalEx to the services you already use and create specialized AI assistants tailored to your workflows.

## What Is the Agent Market?

The Agent Market provides a unified interface for managing three types of resources:

### Official Integrations

Pre-configured connections to popular workplace tools such as Jira, Slack, GitHub, Notion, Confluence, and Linear. These are built and maintained by CatalEx, and most can be set up with just a few clicks.

### Custom MCPs

Connect any [MCP-compatible](#what-is-mcp) server to CatalEx. Custom MCPs let you integrate CatalEx with your company's internal tools, proprietary APIs, or third-party services that are not covered by official integrations. Your team builds and hosts these servers.

### Custom Agents

AI personas with specific instructions and tool access. Think of custom agents as specialized assistants --- each one has a defined role, expertise area, and set of tools it can use. For example, you might create a "DevOps Helper" agent that can check deployment status in GitHub and create incident tickets in Jira.

## How Agents and MCPs Relate

Understanding the relationship between agents and MCPs is key to getting the most out of the Agent Market.

- **MCP (Model Context Protocol)** is a connection to an external tool or service. It defines *what actions* are available (e.g., "create a Jira ticket", "send a Slack message").
- **Agent** is an AI persona with system instructions that define *how* it behaves. The instructions shape the agent's personality, expertise, and rules of engagement.

An agent can be **linked to multiple MCPs**, giving it access to tools across several external services. For example, a single agent could use both a Jira MCP and a GitHub MCP to correlate issues with pull requests.

Conversely, a single MCP can be used by multiple agents. Your Jira integration does not need to be duplicated for each agent that needs access to it.

## What Is MCP?

**MCP (Model Context Protocol)** is a standard for AI models to interact with external tools and services through a structured API. When CatalEx connects to an MCP server, it discovers the available tools and can invoke them on behalf of users during chat conversations.

## Architecture Overview

When you interact with an agent in CatalEx Chat, the following flow occurs:

```
You (User)
  |
  v
CatalEx Chat
  |
  v
Agent (with system instructions)
  |
  v
MCP Server (proxy connection)
  |
  v
External Service (e.g., Jira, GitHub, Slack)
```

1. You send a message in CatalEx Chat and select (or are routed to) an agent.
2. The agent processes your request using its system instructions to determine intent.
3. The agent calls tools on its linked MCP servers to fetch data or perform actions.
4. The MCP server communicates with the external service (e.g., creating a Jira ticket).
5. The result is returned through the chain back to you in the chat.

## Who Can Manage the Agent Market?

Access to the Agent Market is restricted to users with the **ADMIN** or **OWNER** role in your CatalEx company. These users can:

- Enable and configure official integrations
- Add, edit, and remove custom MCP connections
- Create, edit, activate, and delete custom agents

:::info
All team members can *use* active agents in chat, but only admins and owners can manage them in the Agent Market.
:::

---

## FAQ

### Do I need to be technical to use the Agent Market?

Not necessarily. **Official integrations** are designed for non-technical users --- you can enable them with a few clicks and minimal configuration (typically just an API key or workspace URL). **Custom MCPs**, on the other hand, require your team to build and host an MCP-compatible server, which does require technical expertise.

### Can multiple agents use the same MCP?

Yes. A single MCP connection can be linked to as many agents as you need. For example, both a "Support Bot" agent and a "DevOps Helper" agent could share the same Jira integration.

### What's the difference between an agent and an MCP?

An **MCP** is the tool connection --- it provides access to an external service's capabilities (like creating tickets or reading messages). An **agent** is the AI that uses those tools --- it has instructions defining its behavior, expertise, and rules. The MCP is the "what it can do"; the agent is the "how and when it does it."

### Can I use the Agent Market without creating custom agents?

Yes. You can enable official integrations and use them directly in CatalEx Chat without creating any custom agents. Custom agents are an additional layer of customization for teams that want specialized AI assistants.
