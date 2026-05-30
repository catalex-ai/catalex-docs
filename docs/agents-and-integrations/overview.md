---
sidebar_position: 1
title: Overview
---

# Building Custom Tools & Agents

CatalEx ships with two surfaces for extending the platform:

- The **[Tools](../features/tools.md)** page — a catalog of 100+ official integrations you connect with a click, plus the ability to add custom MCP servers your team builds.
- **[Studio](../features/studio.md)** — where you build agents in plain English and give them tools, schedules, and goals.

This section is the deeper guide for teams that want to go beyond the catalog: connect **custom MCP servers** for internal tools, and design **agents** with precise instructions and tool access.

## The building blocks

CatalEx is built on the **Model Context Protocol (MCP)**, an open standard for letting AI use external tools through a structured API.

- An **integration / MCP** is a connection to an external service. It defines *what actions* are available (e.g., "create a Jira ticket", "send a Slack message"). Official integrations are MCP servers CatalEx hosts for you; **custom MCPs** are servers your team builds and hosts.
- An **agent** is an AI worker with instructions that define *how* it behaves and *which* tools it can use. You build agents in [Studio](../features/studio.md).

An agent can use **multiple tools**, and a single tool can be used by **many agents** — your Jira connection doesn't need to be duplicated per agent.

## How they fit together

```
You
  |
  v
Studio agent (instructions + goals)
  |
  v
Tools (official integration or custom MCP)
  |
  v
External service (e.g., Jira, GitHub, Slack)
```

1. You give an agent a task (in chat, on a schedule, or via Tasks).
2. The agent uses its instructions to decide what to do.
3. It calls tools — official integrations or custom MCPs — to fetch data or take actions.
4. Sensitive actions pause for your approval, governed by [guardrails](../features/tools.md#guardrails-and-approvals).

## What's in this section

| Guide | What it covers |
|---|---|
| [Official Integrations](./official-integrations.md) | The catalog of ready-made connections and how to enable them. |
| [Custom MCPs](./custom-mcps.md) | Connecting your own MCP servers for internal tools and APIs. |
| [Custom Agents](./custom-agents.md) | Designing agent instructions and tool access. |
| **Build Your Own MCP** | A hands-on developer track: [concepts](./mcp-concepts.md), [building](./building-an-mcp-server.md), [testing](./testing-your-mcp.md), [deploying](./deploying-mcps.md), and [registering](./registering-with-catalex.md) an MCP server. |

## Who can manage these?

Connecting integrations, adding custom MCPs, and managing company-wide tools requires the **ADMIN** or **OWNER** role. Any team member can build and run agents in Studio using the tools that have been connected.

## FAQ

### Do I need to be technical?

No for most of it. Connecting **official integrations** and **building agents** in Studio are point-and-click. Only **custom MCPs** require engineering — your team builds and hosts an MCP-compatible server.

### Can multiple agents use the same tool?

Yes. A connected tool can be used by as many agents as you like, and each agent can be scoped to specific connected accounts.

### What's the difference between a tool and an agent?

A **tool** is the connection that provides access to an external service's capabilities. An **agent** is the AI that decides how and when to use those tools.
