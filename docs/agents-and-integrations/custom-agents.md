---
sidebar_position: 4
title: Custom Agents
---

# Custom Agents

:::tip
The primary way to build agents is now **[Studio](../features/studio.md)** — describe what you want in plain English and CatalEx assembles the agent's instructions, tools, and goals for you. This page covers the underlying concepts (instructions and linked tools) that shape every agent.
:::

Custom agents are AI personas with specific expertise, defined by instructions and the tools they can use. They let you create specialized assistants tailored to your team's workflows --- a DevOps helper, a support triage bot, an onboarding guide, or anything else your organization needs.

## How It Works

A custom agent combines two elements:

1. **System instructions** (written in Markdown) that define the agent's role, expertise, rules, and behavior.
2. **Linked MCPs** that give the agent access to external tools and services.

When a user selects an agent in CatalEx Chat, the agent's system instructions shape how it responds, and its linked MCPs determine what actions it can take.

## Key Concepts

### Slug

Every agent gets an auto-generated **slug** based on its name. For example, an agent named "DevOps Helper" receives the slug `devops-helper`. The slug is used internally for identification and routing.

### System Instructions

The instructions are the core of an agent's identity. Written in Markdown, they tell the AI:

- What role it plays
- What it should and should not do
- How it should communicate
- What workflows it should follow

See [Writing Effective System Instructions](#writing-effective-system-instructions) below for guidance.

### Linked MCPs

An agent can be linked to one or more MCP connections (both official integrations and custom MCPs). These links determine which external tools the agent can invoke during a conversation.

### Auto-Execute

Controls whether the agent executes tool actions immediately or asks for user approval first.

- **Off (default)**: The agent presents the action it wants to take and waits for the user to approve before executing. This is the safer option for sensitive operations.
- **On**: The agent executes actions immediately without waiting for approval.

:::warning
Auto-execute has a strict safety constraint: it can only be enabled if **all** linked MCPs have **auto-approve** set to `true`. If any linked MCP does not have auto-approve enabled, the agent's auto-execute setting is automatically disabled. This prevents agents from silently executing actions through MCP connections that have not been explicitly trusted.
:::

### Agent Status

| Status     | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| **Draft**  | The agent is not visible to team members. Use this for testing and development. |
| **Active** | The agent is available for use in CatalEx Chat by all team members.            |

## Creating a Custom Agent

1. Open **Studio**.
2. Click **Create Agent**.
3. Enter a **name** for the agent (the slug is generated automatically).
4. Add a **description** that explains what the agent does. This is shown to users when they select an agent in chat.
5. Choose an **icon** and **color** for visual identification in the chat interface.
6. Write **system instructions** in Markdown (see guidance below).
7. **Link one or more MCPs** by selecting from your available connections (official and custom).
8. Configure the **auto-execute** setting.
9. **Save as draft** to test, or **activate** to make it available to your team.

:::tip
Start with the agent in **draft** status. Test it thoroughly in chat before activating it for your entire team.
:::

## Writing Effective System Instructions

System instructions are the single most important factor in how well your agent performs. Here are guidelines for writing them effectively.

### Define the Role Clearly

Start by stating exactly what the agent is and what it does:

```markdown
You are a DevOps assistant. You help engineers with:
- Checking deployment status via GitHub
- Creating and updating Jira tickets for incidents
- Monitoring service health
```

### Set Boundaries

Explicitly state what the agent should and should not do:

```markdown
## Rules
- Always confirm before creating tickets
- Include the PR link when reporting deployment status
- Use concise, technical language
- Never delete issues without explicit confirmation
- Do not access repositories outside the engineering org
```

### Provide Examples

If there are specific formats or workflows the agent should follow, show examples:

```markdown
## Incident Report Format
When reporting an incident, use this format:

**Service**: [service name]
**Severity**: [P1/P2/P3]
**Status**: [investigating/mitigating/resolved]
**Summary**: [one-line description]
**PR**: [link if applicable]
```

### Use Markdown Formatting

System instructions support full Markdown. Use headings, lists, bold text, and code blocks to make instructions clear and organized. Well-structured instructions lead to more consistent agent behavior.

## Linking MCPs

When creating or editing an agent, you can select which MCP connections the agent has access to. The agent can call tools from **any** linked MCP during a conversation.

Consider the following when choosing which MCPs to link:

- **Least privilege**: Only link the MCPs the agent actually needs. A support triage agent probably does not need access to your GitHub integration.
- **Complementary tools**: Link MCPs that work together for the agent's use case. A DevOps agent benefits from having both GitHub (for deployment info) and Jira (for ticket management).
- **Auto-approve alignment**: If you want to enable auto-execute on the agent, all linked MCPs must have auto-approve enabled.

:::info
Changes to MCP links take effect immediately. If you add a new MCP to an active agent, it can start using those tools right away.
:::

## Configuration

All agent configuration is managed through Studio. The key settings are:

| Setting              | Description                                                      | Required |
| -------------------- | ---------------------------------------------------------------- | -------- |
| **Name**             | The agent's display name                                         | Yes      |
| **Slug**             | Auto-generated URL-safe identifier                               | Auto     |
| **Description**      | Short explanation of what the agent does                         | Yes      |
| **Icon**             | Visual icon shown in the chat interface                          | No       |
| **Color**            | Accent color for the agent's avatar                              | No       |
| **System Instructions** | Markdown-formatted instructions defining the agent's behavior | Yes      |
| **Linked MCPs**      | MCP connections the agent can use                                | No       |
| **Auto-Execute**     | Whether tool actions run without user approval                   | No (default: off) |
| **Status**           | Draft (hidden) or Active (visible to team)                       | Yes (default: draft) |

---

## FAQ

### Can I edit an active agent?

Yes. You can edit any aspect of an active agent --- name, description, instructions, linked MCPs, and settings. Changes take effect immediately for all new chat conversations.

### Can I duplicate an agent?

There is no one-click duplication feature. To create a similar agent, create a new agent and copy over the system instructions and MCP links from the existing one.

### What happens if I delete an agent?

The agent is removed from the chat interface and is no longer available to team members. Internally, the agent is soft-deleted, meaning it is retained in the system but inaccessible. Existing chat history that references the agent is preserved.

### How many agents can I create?

There is no limit on the number of custom agents per company. Create as many as your workflows require.

### What happens if a linked MCP is disabled?

If a linked MCP is disabled (but not deleted), the agent will not be able to use tools from that MCP. The agent itself remains active and can still use tools from its other linked MCPs.

### Can non-admin users create agents?

Yes. Any team member can build and run their own agents in [Studio](../features/studio.md). Administrative control (the **ADMIN** or **OWNER** role) is required only for connecting integrations and adding custom MCPs on the [Tools](../features/tools.md) page.
