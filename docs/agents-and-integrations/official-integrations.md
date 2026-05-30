---
sidebar_position: 2
title: Official Integrations
---

# Official Integrations

Official integrations are pre-built, CatalEx-maintained MCP connections for popular workplace tools. They provide a fast, reliable way to connect CatalEx to the services your team already uses --- without any custom development.

## How It Works

Each official integration is an MCP server hosted and maintained by CatalEx. When you enable an integration, CatalEx establishes a secure connection to the external service using the credentials you provide. Once connected, the integration's tools become available to agents and chat conversations.

CatalEx handles updates, bug fixes, and compatibility changes for all official integrations, so you do not need to maintain them yourself.

## Available Integrations

| Integration  | Description            | Capabilities                                                        |
| ------------ | ---------------------- | ------------------------------------------------------------------- |
| **Jira**     | Project tracking       | Create and update issues, search tickets, manage sprints            |
| **Slack**    | Team communication     | Send messages, read channels, search conversations                  |
| **GitHub**   | Code repositories      | View pull requests, create issues, check CI status, browse repos    |
| **Notion**   | Documentation          | Search pages, create and update content, manage databases           |
| **Confluence** | Knowledge base       | Search spaces, create and update pages, manage content              |
| **Linear**   | Issue tracking         | Create and update issues, manage projects, track cycles             |

:::tip
More official integrations are added regularly. Check the Tools page for the latest list.
:::

## Key Concepts

### One-Click Enablement

Official integrations are designed for simplicity. Unlike custom MCPs, you do not need to build or host anything. CatalEx provides the MCP server --- you just supply the credentials and configuration for your specific workspace.

### Managed by CatalEx

The MCP servers behind official integrations are maintained by the CatalEx team. This means:

- **Automatic updates**: New capabilities and bug fixes are applied without any action on your part.
- **Guaranteed compatibility**: Official integrations are tested against each CatalEx release.
- **Reliability**: CatalEx monitors the health of official MCP servers.

### Integration-Specific Configuration

Each integration requires different configuration details depending on the external service. Common requirements include:

- **API tokens** or **OAuth credentials** for authentication
- **Workspace URLs** or **organization identifiers**
- **Permission scopes** defining what CatalEx can access

## How to Enable an Official Integration

1. Open the **Tools** page.
2. Browse the list to find the integration you want to enable.
3. Click **Add** (or **Enable**) on the integration card.
4. Fill in the required configuration fields (API key, workspace URL, etc.).
5. Click **Test Connection** to verify that CatalEx can communicate with the service.
6. Save the configuration.

:::warning
Make sure the API token you provide has the appropriate permissions for the capabilities you intend to use. For example, if you want CatalEx to create Jira tickets, the token must have write access to your Jira project.
:::

Once enabled, the integration appears in your list of active connections and can be linked to custom agents or used directly in chat.

## Configuration

Configuration is handled entirely through the Tools page. After enabling an integration, you can return to its settings at any time to:

- Update API tokens or credentials
- Change workspace identifiers
- Enable or disable the integration without removing it
- Toggle **auto-approve** to control whether tool executions require user confirmation

:::info
Disabling an integration does not delete your configuration. You can re-enable it at any time and your settings will be preserved.
:::

---

## FAQ

### Are official integrations free?

Yes. Official integrations are included with your CatalEx subscription at no additional cost.

### Can I customize an official integration?

The MCP server itself is managed by CatalEx and cannot be modified. However, you can create **custom agents** that use official integrations and tailor the agent's behavior through system instructions. This gives you full control over how the integration is used without needing to modify the underlying connection.

### How are official integrations updated?

CatalEx automatically updates official integrations. When new capabilities are added or bugs are fixed, the changes are deployed without requiring any action on your part. You do not need to re-configure or re-enable the integration after an update.

### What happens if an official integration goes down?

CatalEx monitors the health of all official MCP servers. If an integration experiences downtime, the CatalEx team works to restore it. In the meantime, any agent actions that depend on the affected integration will return an error message in chat.

### Can I use an official integration without creating an agent?

Yes. Official integrations can be used directly in CatalEx Chat without a custom agent. Custom agents simply give you more control over how the tools are presented and used.
