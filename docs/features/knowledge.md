---
sidebar_position: 3
title: Knowledge
---

# Knowledge

The **Knowledge Base** is where you connect your company's data sources and manage what CatalEx has indexed. Once a source is connected and synced, its content becomes searchable in [Freeflow](./freeflow.md) and usable by your [Studio](./studio.md) agents.

## Connecting a source

The Knowledge page lists your **Connected Sources** as cards. CatalEx supports three connectors:

| Source | What gets indexed |
|---|---|
| **Google Docs** | Documents from Google Drive |
| **Slack** | Messages and threads from selected channels |
| **Confluence** | Pages across your accessible spaces |

Each card shows the source's icon, how much is indexed, and a sync-status dot (green = synced recently, yellow = a few hours ago, red = stale, gray = never). Use the toggle to connect or disconnect, and the **⋮** menu for sync actions.

:::info
Connecting, disconnecting, and managing syncs requires the **ADMIN** or **OWNER** role. Members see sources in read-only form.
:::

### Google Docs

Toggle the card on and choose **Proceed** to authorize with Google. After connecting, CatalEx asks whether to **enable periodic sync** — this runs a one-time full sync and then keeps your docs up to date automatically (checking roughly every 15 minutes).

From the **⋮** menu you can:

- **Sync now** — sync a single Google Doc by URL, run an **incremental sync** (only changed docs), or **re-sync all data**.
- **Enable / Disable Sync** — turn automatic updates on or off.
- **Sync History** — review past syncs, with per-run detail and any failures.

> Larger Google Workspace organizations may connect through a service account (Domain-Wide Delegation) instead. In that case an admin pastes service-account credentials in the **Setup Credentials** dialog, which includes step-by-step setup instructions.

### Slack

Toggle the card on and authorize CatalEx in the Slack popup. From the **⋮** menu:

- **Manage Channels** — choose exactly which channels feed the knowledge base. Each public channel (**#**), private channel (🔒), and direct message (💬) has an include/exclude toggle.
- **Sync now** — run a manual backfill and watch live progress.
- **Enable / Disable Sync** — when enabled, new messages are indexed in real time and a full sync runs every 15 minutes.

### Confluence

Toggle the card on and authorize through the Confluence popup. Company accounts may instead enter Atlassian OAuth credentials (a **Site URL**, **Client ID**, and **Client Secret**) and **Test** them before saving. After connecting, you can **enable periodic sync**. Confluence indexes **all accessible spaces and pages** automatically — there's no per-space picker. From the **⋮** menu you can **Sync now**, **View pages**, or toggle auto-sync.

## Browsing indexed content

Click a card's count (e.g. *"128 documents indexed"*) to open a searchable list of what's indexed for that source. From the list you can open any document, thread, or page in the **document viewer**, which shows the content broken into the chunks CatalEx searches over.

When you click a citation elsewhere in CatalEx, the viewer opens to the exact passage and highlights it.

## Sync status

While a sync runs, a banner and a progress view show how many items have been processed, how many succeeded, and any failures. Each source keeps a history you can revisit to confirm everything indexed correctly.

:::warning
Disconnecting a source **deletes all of its synced data** from CatalEx. You can reconnect later, but the content will need to be re-indexed.
:::

## FAQ

**How often does CatalEx re-index my data?**
With auto-sync enabled, roughly every 15 minutes. Slack also indexes new messages in real time. You can always trigger a manual **Sync now**.

**Can I control which Slack channels are indexed?**
Yes — use **Manage Channels** to include or exclude any channel, including private channels and DMs.

**Why is a recently edited document not showing up in answers?**
It may not have synced yet. Run an **incremental sync** (Google) or **Sync now** (Slack/Confluence), then try again.

**Who can connect data sources?**
Only ADMIN and OWNER users. This keeps company data sources under administrative control.
