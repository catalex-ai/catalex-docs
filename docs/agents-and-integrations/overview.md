---
sidebar_position: 1
title: Overview
---

# Integrations Overview

Integrations are the connections that let CatalEx work with the services your team already uses — Slack, GitHub, Gmail, Jira, Salesforce, and many more. Once an integration is connected, your [Studio](../features/studio.md) agents and [Freeflow](../features/freeflow.md) can read from and act on it.

All integrations are connected and managed on the **[Tools](../features/tools.md)** page.

## The building blocks

- An **integration** is a connection to an external service. It exposes a set of **actions** — for example, the Gmail integration includes *Send Email*, *Create Draft*, and *List Labels*.
- A few **built-in tools** are always available with no setup: *Web Search*, *Web Fetcher*, *Script Executor*, and *Knowledge Base*.
- An **agent** (built in [Studio](../features/studio.md)) decides how and when to use the tools it's been given.

An agent can use **multiple tools**, and a single connected integration can be used by **many agents** — you don't duplicate a connection per agent.

## How they fit together

```
You
  |
  v
Studio agent (instructions + goals)
  |
  v
Tools (connected integration)
  |
  v
External service (e.g., Jira, GitHub, Slack)
```

1. You give an agent a task — in chat, on a schedule, or via Tasks.
2. The agent uses its instructions to decide what to do.
3. It calls the actions of its connected tools to fetch data or take action.
4. Sensitive actions pause for your approval, governed by [guardrails](../features/tools.md#guardrails-and-approvals).

## Connecting integrations

See the [Tools](../features/tools.md) page for the full walkthrough: browsing the catalog, one-click OAuth, custom OAuth apps, API-key setup, managing multiple accounts, and setting per-action **guardrails**.

For the full list of supported services, see [Official Integrations](./official-integrations.md).

## Who can manage integrations?

Connecting and configuring integrations requires the **ADMIN** or **OWNER** role. Any team member can build and run agents in Studio using the tools that have been connected.
