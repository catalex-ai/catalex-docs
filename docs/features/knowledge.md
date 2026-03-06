---
sidebar_position: 2
title: Knowledge
---

# Knowledge

Knowledge is the central hub for managing your company's document index and knowledge graph. From this page you can view all ingested documents, trigger syncs, monitor sync history, and inspect the state of your knowledge graph.

## Document Listing

The Knowledge page displays a table of all ingested documents with the following metadata:

| Column | Description |
|--------|-------------|
| **Name** | Document title as it appears in the source system |
| **Chunks** | Number of text chunks the document was split into for indexing |
| **Last Synced** | Timestamp of the most recent sync that processed this document |
| **Source Type** | Where the document originated (Google Drive, Slack, etc.) |
| **Owner** | The document owner or author |
| **Tokens Used** | Total token count consumed by this document's chunks |

Use this listing to audit what is in your knowledge base and identify documents that may need re-syncing.

## Sync Types

CatalEx supports three sync modes depending on your needs:

| Sync Type | Description | When to Use |
|-----------|-------------|-------------|
| **Single Document** | Sync a specific Google Doc by providing its URL | When you have updated one important document and want it re-indexed immediately |
| **Update Since** | Sync all documents modified after a given timestamp | Regular incremental updates -- keeps the index fresh without re-processing everything |
| **Full Sync** | Re-sync the entire knowledge base from scratch | Initial setup, after a major reorganization, or to resolve inconsistencies |

:::tip
For day-to-day use, **Update Since** is the most efficient option. Reserve **Full Sync** for initial onboarding or when you suspect the index has drifted from the source documents.
:::

## How a Sync Works

When a sync runs, CatalEx processes each document through the following pipeline:

1. **Fetching** -- The document content is retrieved from the source system (Google Drive or Slack).
2. **Chunking** -- The document is split into smaller text chunks optimized for retrieval.
3. **Embedding** -- Each chunk is converted into a vector embedding for similarity search.
4. **Graph generation** -- Entities and relationships are extracted and added to the knowledge graph as nodes and edges.
5. **Vector indexing** -- Embeddings are stored in the vector database for fast retrieval.

## Sync History

Every sync operation is logged with detailed statistics. The sync history view shows:

- **Documents touched** -- How many documents were processed in the sync
- **Knowledge graph nodes added** -- New entities discovered and added to the graph
- **Knowledge graph edges added** -- New relationships between entities
- **Per-document status** -- Individual success or failure status for each document in the sync batch

Use sync history to verify that syncs completed successfully and to diagnose issues with specific documents.

## Auto-Sync

Toggle auto-sync to enable automatic, scheduled syncing. When enabled, CatalEx periodically checks your connected sources for document changes and runs an incremental sync.

:::info
Auto-sync runs incremental updates (equivalent to **Update Since**). It does not perform a full re-sync on each run.
:::

To enable auto-sync:

1. Navigate to the **Knowledge** page.
2. Locate the **Auto-Sync** toggle.
3. Switch it on.

CatalEx will begin checking for changes on its configured schedule. Disable the toggle at any time to pause automatic syncing.

## Knowledge Graph Stats

The Knowledge page displays aggregate analytics about your knowledge graph:

- **Total nodes** -- The number of distinct entities (people, projects, concepts, documents) in the graph
- **Total edges** -- The number of relationships connecting those entities
- **Total vectors** -- The number of vector embeddings stored for similarity search

These stats give you a quick health check on the size and completeness of your indexed knowledge base.

## Connecting Google Drive

CatalEx supports two authentication methods for Google Drive:

### OAuth (Individual)

With OAuth, CatalEx connects using an individual user's Google account. Only documents accessible to that user are synced.

**Best for:** Small teams or individual use where you only need to index your own documents.

### Domain-Wide Delegation (Organization)

With Domain-Wide Delegation, CatalEx is granted access to documents across your entire Google Workspace domain. This allows indexing of company-wide documents regardless of individual ownership.

**Best for:** Organizations that want comprehensive coverage of all company documents.

:::warning
Domain-Wide Delegation requires a Google Workspace administrator to configure the delegation in the Google Admin Console. See your IT team for setup assistance.
:::

## Connecting Slack

Once Slack is connected, CatalEx automatically indexes threads from your connected channels. Slack messages and threads become searchable through Intelligence just like any other document.

To connect Slack:

1. Navigate to the **Knowledge** page or **Integrations** settings.
2. Click **Connect Slack**.
3. Authorize CatalEx in the Slack OAuth flow.
4. Select which channels to index.

## Disconnecting Sources

You can cleanly remove Google Drive or Slack credentials at any time:

1. Navigate to the integration settings for the source you want to disconnect.
2. Click **Disconnect**.
3. Confirm the disconnection.

When you disconnect a source, CatalEx starts a background cleanup job that removes all indexed data originating from that source. This includes document chunks, vector embeddings, and knowledge graph nodes/edges associated with the disconnected source.

:::warning
Disconnecting a source permanently removes all indexed data from that source. You will need to re-sync if you reconnect later.
:::

## FAQ

**How long does a full sync take?**

It depends on the number and size of your documents. For most organizations, a full sync completes in minutes. Very large document sets (thousands of documents) may take longer.

**What file types are supported?**

CatalEx currently supports Google Docs and text-based files. PDFs, spreadsheets, and binary files are not indexed at this time.

**Can I exclude certain documents from syncing?**

There is no global exclusion filter. However, you can use **Single Document** sync to selectively sync only the documents you want indexed. Documents that are never synced are never indexed.

**What happens if a sync fails for one document?**

The sync continues processing the remaining documents. The failed document is logged in the sync history with an error status. You can retry it individually using **Single Document** sync.

**Can I delete a specific document from the index?**

Disconnecting the entire source removes all its data. For selective removal, re-syncing without including the document will not add new data, but previously indexed content remains until a full re-sync or source disconnection.

**What happens during a sync?**

Each document goes through: chunking, embedding, graph generation, and vector indexing. See the [How a Sync Works](#how-a-sync-works) section above for the full pipeline.
