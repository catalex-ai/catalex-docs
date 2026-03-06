---
sidebar_position: 1
title: Intelligence
---

# Intelligence

Intelligence is CatalEx's AI-powered conversational interface for querying your company's knowledge base. Ask questions in natural language and get precise, citation-backed answers drawn from all of your synced documents, Slack threads, and knowledge graph data.

## How It Works

When you submit a question, CatalEx performs a multi-step retrieval and generation process:

1. **Query analysis** -- CatalEx parses your question to identify key entities, intent, and context from your conversation history.
2. **Hybrid retrieval** -- The system runs two searches in parallel:
   - **Vector similarity search** finds document chunks that are semantically close to your question.
   - **Knowledge graph traversal** follows relationships between entities (people, projects, concepts) to surface structurally relevant information.
3. **Context assembly** -- Results from both retrieval methods are merged, deduplicated, and ranked by relevance.
4. **Answer generation** -- The selected LLM receives the assembled context and your question, then generates a response with inline citations.
5. **Streaming delivery** -- The answer streams to your browser in real time, token by token.

## Key Features

### Streaming Responses

Answers appear in real time as the AI generates them. You do not need to wait for the full response before you start reading.

### Citations

Every answer includes source references pointing back to the original documents. Click any citation to open the source document and see the exact passage that informed the answer.

:::tip
Use citations to verify answers and to discover related documents you may not have known about.
:::

### Enriched Content Toggle

Toggle the citation sources panel on or off alongside the answer. When enabled, a side panel displays the full context of each cited source, making it easy to cross-reference without leaving the conversation.

### Agent Thinking Traces

Expand the thinking trace section beneath any answer to see exactly how the AI arrived at its response. The trace shows:

- Which retrieval tools were called
- What search queries were executed
- How many document chunks were considered
- Token usage for the request

:::info
Thinking traces are useful for debugging unexpected answers or understanding why certain documents were or were not referenced.
:::

### Session Management

Conversations are organized into **sessions**. Each session maintains its own context and history.

- **Create a new session** to start a fresh conversation on a different topic.
- **Revisit old sessions** from the session list to continue a previous line of inquiry.
- **Bookmark important conversations** so you can find them quickly later.

### Suggested Prompts

When you start a new session, CatalEx suggests relevant questions based on the contents of your knowledge base. These prompts help you discover what kinds of questions the system can answer and surface topics you may not have thought to ask about.

### Model Selection

Choose which LLM model powers your responses. Model preferences are configured in **Preferences** and apply to all new sessions. Different models may offer different trade-offs between speed, cost, and answer quality.

## How to Use Intelligence

### Step 1: Start a Session

Navigate to the **Intelligence** page. You will see a chat interface with suggested prompts. Click a suggested prompt or type your own question.

### Step 2: Ask a Question

Type your question in the input field and press **Enter** or click **Send**. For example:

> "What is our current onboarding process for new engineers?"

### Step 3: Read the Response

The answer streams in real time. Inline citations appear as numbered references (e.g., [1], [2]) within the text.

### Step 4: Check Citations

Click any citation number to view the original source document. If the enriched content panel is enabled, source excerpts appear alongside the answer automatically.

### Step 5: Follow Up

Ask follow-up questions within the same session. CatalEx maintains conversation context, so you can ask things like "Who wrote that document?" or "What changed since last quarter?" without restating the topic.

### Step 6: Manage Sessions

Use the session sidebar to create new sessions, return to previous ones, or bookmark conversations you want to reference later.

:::warning
Starting a new session clears the conversation context. If you need to continue a line of questioning, stay in the same session.
:::

## FAQ

**How does CatalEx know what documents to search?**

CatalEx searches the knowledge graph and vector index built from all documents synced through Google Drive and Slack integrations. Only documents that have been synced and indexed are searchable. See the [Knowledge](./knowledge.md) page for details on managing your document index.

**Can I use Intelligence for code-related questions?**

Yes. If your code documentation, READMEs, or technical design documents are synced into CatalEx, Intelligence can answer questions about them. The quality of answers depends on the completeness of the synced documentation.

**Are conversations private?**

Yes. Sessions are scoped to individual users. Other users cannot see your conversation history or session list.

**Can I share a conversation with a teammate?**

Session bookmarking is per-user. To share an answer, copy the response text and citations manually.

**What if the answer is wrong or incomplete?**

Check the thinking trace to understand what context was used. If relevant documents are missing from the knowledge base, sync them through the [Knowledge](./knowledge.md) page and try again.
