---
sidebar_position: 4
title: Connecting Data Sources
---

# Connecting Data Sources

CatalEx draws on the data your team already produces. Connect your data sources so CatalEx can search your documents and conversations and act on your behalf. There are two places to connect things:

| Where | What you connect | Used for |
|---|---|---|
| **Knowledge** page | Google Docs, Slack, Confluence | Making your company's documents and messages searchable. |
| **Tools** page | 100+ integrations (Slack, GitHub, Jira, Gmail, etc.) | Letting agents take actions in outside services. |

This guide covers the **Knowledge** sources. For action integrations, see [Tools](../features/tools.md). For the full detail on each connector, see [Knowledge](../features/knowledge.md).

:::info
Connecting and managing data sources requires the **ADMIN** or **OWNER** role.
:::

## Knowledge sources

Open the **Knowledge** page from the sidebar. You'll see a card for each source — **Google Docs**, **Slack**, and **Confluence** — with a toggle to connect and a **⋮** menu for sync options. After connecting, CatalEx offers to enable **periodic sync**, which runs an initial full sync and then keeps the source up to date automatically.

### Google Docs

CatalEx offers two ways to connect Google, depending on your team's size.

#### Option A: OAuth (individual)

Each user connects their own Google account; CatalEx indexes the documents that account can see. Toggle **Google Docs** on, choose **Proceed**, and authorize CatalEx on Google's screen. This is the fastest way to start.

#### Option B: Domain-Wide Delegation (company-wide)

A Google Workspace admin configures a service account so CatalEx can index documents across the whole organization in one setup. When toggled on for a Workspace that requires it, CatalEx opens a **Setup Credentials** dialog with step-by-step instructions for creating the service account, enabling the Drive and Docs APIs, granting domain-wide delegation, and pasting the JSON key.

:::warning
The service account JSON key contains sensitive credentials. Don't share it or commit it to version control. Only OWNER and ADMIN roles can configure Domain-Wide Delegation.
:::

#### Which should I choose?

| Factor | OAuth (individual) | Domain-Wide Delegation |
|---|---|---|
| **Setup effort** | Low — each user clicks connect | Medium — requires a Workspace admin |
| **Coverage** | The connected user's files | All files across the organization |
| **Best for** | Small teams, quick trials | Larger teams, company-wide knowledge |

### Slack

Toggle **Slack** on and authorize CatalEx in the popup. Then use the **⋮** menu → **Manage Channels** to pick exactly which channels feed the knowledge base — public channels, private channels, and direct messages each have an include/exclude toggle. With auto-sync on, new messages index in real time.

### Confluence

Toggle **Confluence** on and authorize through the popup (company accounts can instead enter Atlassian OAuth credentials and test them first). Confluence indexes **all accessible spaces and pages** automatically.

## Checking and managing syncs

Each source card shows a status dot and how much is indexed. While a sync runs, a progress view shows items processed and any failures. You can trigger **Sync now** at any time, and review past runs in the source's sync history.

:::warning
Disconnecting a source **permanently removes** its indexed data from CatalEx. Reconnecting requires a full re-index.
:::

## FAQ

**Where did the "Data Sources" page go?**
Knowledge sources are now managed on the **Knowledge** page; action integrations live on the **Tools** page.

**Can I connect more than one source?**
Yes — connect all three knowledge sources, plus any Tools integrations. The more CatalEx can see, the better its answers and the more your agents can do.

**How often does data sync?**
With auto-sync enabled, roughly every 15 minutes; Slack also indexes new messages in real time. You can always run **Sync now** manually.

**Is my data secure?**
CatalEx is multi-tenant with strict isolation between companies. Your connected data is only accessible to members of your company.
