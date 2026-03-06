---
sidebar_position: 4
title: Connecting Data Sources
---

# Connecting Data Sources

CatalEx draws its intelligence from the data your team already produces. This guide covers how to connect Google Drive and Slack so CatalEx can index your organization's knowledge.

## Overview

CatalEx supports two data source types:

| Data Source | What Gets Indexed | Connection Method |
|---|---|---|
| **Google Drive** | Documents, spreadsheets, presentations, and other files | OAuth (individual) or Domain-Wide Delegation (company-wide) |
| **Slack** | Messages and threads from connected channels | OAuth |

You can connect both data sources simultaneously. The more data CatalEx has access to, the richer and more accurate its insights become.

## How It Works

### Google Drive

CatalEx offers two ways to connect Google Drive, depending on the size and needs of your team.

#### Option A: OAuth (Individual Connection)

With OAuth, each user connects their own Google account. CatalEx can only access documents that the connected user has access to.

1. Navigate to **Settings > Data Sources > Google Drive**.
2. Click **Connect with Google**.
3. You are redirected to Google's authorization screen. Sign in and grant CatalEx permission to read your Drive files.
4. Once authorized, you are redirected back to CatalEx. The connection status indicator turns **green**.

:::tip
OAuth is the fastest way to get started. Each team member connects their own account, and CatalEx indexes the documents they can see.
:::

#### Option B: Domain-Wide Delegation (Company-Wide Connection)

With Domain-Wide Delegation (DWD), a Google Workspace administrator configures a service account that gives CatalEx access to documents across the entire organization. This is a one-time setup performed by an admin.

**Prerequisites:**

- A Google Workspace account with admin privileges
- Access to the Google Cloud Console
- Access to the Google Admin Console

**Setup steps:**

1. **Create a service account** in the Google Cloud Console:
   - Go to **IAM & Admin > Service Accounts**.
   - Click **Create Service Account**, give it a name (e.g., `catalex-integration`), and click **Create**.
   - On the key creation step, select **JSON** and download the key file.

2. **Enable required API scopes** in the Google Admin Console:
   - Go to **Security > API Controls > Domain-wide Delegation**.
   - Click **Add new** and enter the service account's Client ID.
   - Add the following OAuth scopes:
     - `https://www.googleapis.com/auth/drive.readonly`

3. **Upload the service account key to CatalEx:**
   - Navigate to **Settings > Data Sources > Google Drive**.
   - Select **Domain-Wide Delegation**.
   - Upload the JSON key file you downloaded in step 1.
   - Click **Connect**.

4. CatalEx validates the configuration and begins indexing organization-wide documents.

:::warning
The service account JSON key contains sensitive credentials. Do not share it or commit it to version control. Only OWNER and ADMIN roles can configure Domain-Wide Delegation in CatalEx.
:::

#### Which Option Should I Choose?

```
Is your team larger than 10 people?
├── Yes  → Use Domain-Wide Delegation
│         (Company-wide knowledge, single setup, complete coverage)
└── No   → Start with OAuth
           (Quick setup, each user connects individually)
```

| Factor | OAuth (Individual) | Domain-Wide Delegation |
|---|---|---|
| **Setup effort** | Low -- each user clicks "Connect" | Medium -- requires Google Workspace admin |
| **Coverage** | Only the connected user's files | All files across the organization |
| **Best for** | Small teams, individual users, quick trials | Large teams, company-wide knowledge bases |
| **Who sets it up** | Each team member | A Google Workspace admin (once) |
| **Ongoing maintenance** | Each user manages their own connection | Centrally managed by admin |

### Slack

Slack connects via a standard OAuth flow. Once connected, CatalEx indexes messages and threads from your Slack workspace.

1. Navigate to **Settings > Data Sources > Slack**.
2. Click **Connect Slack**.
3. You are redirected to Slack's authorization screen. Select the workspace you want to connect and click **Allow**.
4. Once authorized, you are redirected back to CatalEx. Connected channels are **auto-discovered** and listed in the Data Sources panel.
5. The connection status indicator turns **green**.

:::info
CatalEx indexes messages and threads from connected channels. Direct messages and private channels are not indexed unless the CatalEx Slack app is explicitly invited to those channels.
:::

### Verifying Your Connection

After connecting a data source, check the status indicator on the **Data Sources** page:

| Status | Indicator | Meaning |
|---|---|---|
| **Connected** | Green | Data source is linked and syncing normally |
| **Syncing** | Yellow | Initial indexing or a sync cycle is in progress |
| **Disconnected** | Gray | No active connection |
| **Error** | Red | Something went wrong -- check the error details |

### Disconnecting a Data Source

If you need to remove a data source:

1. Go to **Settings > Data Sources**.
2. Find the data source you want to disconnect.
3. Click **Disconnect**.
4. Confirm the action in the dialog.

:::warning
When you disconnect a data source, CatalEx runs a background cleanup job that removes all indexed data from that source. This process may take a few minutes depending on the volume of data. The removal is permanent -- reconnecting will require a full re-index.
:::

## Configuration

| Setting | Location | Who Can Change |
|---|---|---|
| Connect Google Drive (OAuth) | Settings > Data Sources > Google Drive | Any authenticated user |
| Connect Google Drive (DWD) | Settings > Data Sources > Google Drive | OWNER, ADMIN |
| Connect Slack | Settings > Data Sources > Slack | OWNER, ADMIN |
| Disconnect any source | Settings > Data Sources | OWNER, ADMIN |
| View sync status | Settings > Data Sources | All roles |

## FAQ

**Can I connect both Google Drive and Slack at the same time?**
Yes. CatalEx supports multiple data sources simultaneously. Connecting both gives CatalEx the richest context for generating insights across your documents and conversations.

**What happens to indexed data when I disconnect a data source?**
All indexed data from that source is permanently removed. CatalEx runs a background cleanup job after disconnection. If you reconnect later, the data will need to be re-indexed from scratch.

**How often does data sync?**
CatalEx supports configurable auto-sync. After the initial indexing, subsequent syncs pick up new and modified content at the interval you configure. Check **Settings > Data Sources** for sync frequency options.

**Can individual users connect Google Drive via OAuth if the company already uses Domain-Wide Delegation?**
Typically, DWD covers the entire organization, so individual OAuth connections are unnecessary. If both are configured, CatalEx deduplicates content to avoid indexing the same documents twice.

**What Slack channels are indexed?**
Public channels the CatalEx app has access to are auto-discovered. To include a private channel, invite the CatalEx bot to that channel within Slack.

**I connected a data source but no data is appearing. What should I do?**
Initial indexing can take time depending on the volume of data. Check the status indicator -- if it shows **Syncing** (yellow), the process is still running. If it shows **Error** (red), click on the error message for details and troubleshooting steps.

**Is my data secure?**
CatalEx is a multi-tenant platform with strict data isolation between companies. Data from your connected sources is only accessible to members of your company. All connections use OAuth or service account credentials with the minimum required permissions.
