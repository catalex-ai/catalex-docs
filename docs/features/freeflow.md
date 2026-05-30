---
sidebar_position: 2
title: Freeflow
---

# Freeflow

Freeflow is CatalEx's conversational search assistant. Ask a question in plain language and it searches across your company's knowledge — your knowledge base, Slack, Confluence, Google Docs — and the web, then answers in a chat thread.

> Freeflow was previously called *Intelligence*.

## Starting a conversation

Open **Freeflow** from the sidebar. The welcome screen asks **"What can I help you find?"** Type your question into the box and press **Enter** (use **Shift+Enter** for a new line).

Example:

> "What is our current onboarding process for new engineers?"

There's nothing to configure first — just ask.

## What you'll see

Freeflow answers in real time, and the response is more than plain text:

- **Streaming answers.** The reply types out live, so you can start reading immediately. A playful status line appears while the assistant spins up.
- **Thinking traces.** When the assistant reasons before answering, a collapsible **Thinking** panel shows its reasoning. It collapses on its own once done; click to reopen it.
- **Processing steps.** When the assistant searches your sources, a collapsible row shows the steps it took (e.g. *"3 steps completed"*). Expand it to see each step.
- **Rich formatting.** Answers can include headings, lists, tables, code blocks, links, and more.

If you want to stop a response mid-generation, click **Stop**. If a response fails, a **Try again** button re-sends your original question.

## Approvals

Sometimes the assistant pauses to ask permission before doing something — for example, taking an action through a connected tool. You'll see a card explaining what it wants to do, with the option to **Approve**, **Reject**, or tell it to **do something else** in your own words. If it needs more steps to finish, it may ask whether to **Continue**.

## Managing conversations

Once you have a conversation going, a **Conversations** sidebar appears on the left:

- Click **+** to start a **new conversation**.
- Each entry shows its title and when it was last active; click to switch back to it.
- Hover an entry and click **×** to delete it.

Conversations persist, so you can reopen one later and pick up where you left off. Each conversation keeps its own context, so you can ask follow-up questions like *"Who wrote that?"* without restating the topic.

:::tip
Start a **new conversation** when you switch topics. This keeps each thread focused and gives the assistant cleaner context to work from.
:::

## FAQ

**Where do Freeflow's answers come from?**
From your connected sources — the knowledge base, Slack, Confluence, and Google Docs you've synced (see [Knowledge](./knowledge.md)) — plus the public web. The more you sync, the better the answers.

**Are my conversations private?**
Yes. Conversations are scoped to you. Other users can't see your threads.

**Why doesn't it know about a document?**
It can only search sources that have been connected and indexed. If something's missing, connect or re-sync it from the [Knowledge](./knowledge.md) page and ask again.

**What's the difference between Freeflow and a Studio agent?**
Freeflow is a single, general assistant for answering questions on demand. A [Studio](./studio.md) agent is a purpose-built worker with its own instructions, tools, schedule, and memory that can run autonomously.
