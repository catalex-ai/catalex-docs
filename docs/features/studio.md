---
sidebar_position: 1
title: Studio
---

# Studio

Studio is where you build and run **agents** — autonomous AI workers that do recurring work for you, such as monitoring a source, summarizing activity, drafting content, or syncing data across your connected tools. Studio is the home screen of CatalEx: when you sign in, you land here.

An agent has its own instructions, a set of tools it can use, success metrics (KPIs), an optional set of run schedules, and a memory that grows as it works. You can chat with an agent to test it, run it on demand, or let it run automatically on a schedule.

## The Studio home page

Your agents appear as a grid of cards. Across the top you have:

- **Search agents…** — filter by name, description, or tag.
- **Sort** — *Most recent*, *Most run*, or *Alphabetical*.
- **New agent** — start building (disabled with *Agent quota reached* if you are at your limit).
- **Tag filters** — pills for *Design, Engineering, Ops, Sales, Marketing, Research, HR, Product, Finance, Personal*. Select one or more to narrow the grid.

If you have no agents yet, the page invites you to **Build your first agent** with a prompt box and a row of starter templates.

### The agent card

Each card shows the agent's avatar, name, and description, plus a quick-glance status row:

- A status dot and label — **Active** or **Paused**.
- The version (e.g. **v1**) and run count (e.g. **12 runs**).
- **N scheduled** when the agent has recurring schedules.
- The time of the last run and whether it succeeded.

From the card you can **Run now** (or **Resume** if paused), open the agent's tasks, jump straight to its tools, or delete it. Clicking the card opens the agent's full detail view.

## Creating an agent

Click **New agent**. You can start in two ways:

- **Describe it in plain English.** Type what you want — for example, *"Track competitor pricing pages and alert me when anything changes."* This opens a short conversation where an assistant interviews you to understand the job.
- **Start from a template.** Pick a ready-made blueprint such as *Product Manager*, *Account Strategist*, *Code Reviewer*, *Feedback Synthesizer*, or *Content Creator*, or **browse the full catalog** by category.

### The build conversation

The assistant asks questions to refine the agent's purpose, the tools it needs, and how success should be measured. Answer in your own words. Once you have exchanged enough detail, the **Create Agent** button becomes available.

When you click it, CatalEx synthesizes a proposed agent — *Analyzing conversation → Discovering tools → Crafting instructions → Proposing KPIs* — and hands you a review screen.

### Review and create

On the review screen, everything is editable before the agent is created:

| Section | What you set |
|---|---|
| **Name** | The agent's name (click to rename). |
| **Tags** | The domains the agent belongs to. |
| **Description** | A short summary of what it does. |
| **Instructions** | The full operating instructions, in Markdown. |
| **Tools** | The integrations the agent may use. Add or remove any. |
| **KPIs** | The success metrics it is judged against (up to 8). |

Click **Create Agent** to finish. The new agent appears on your Studio home page.

:::tip
You don't have to get everything perfect at creation. Instructions, tools, KPIs, and memory can all be edited later from the agent's detail view.
:::

## Working with an agent

Opening an agent reveals a detail panel with tabs. The header always shows the agent's name, status, and a **Run now** button; owners also see **Share** and a delete control.

### Chat

Chat is the default tab and the best way to test an agent. Type a message, and the agent responds — streaming its reasoning, calling tools, and asking for your approval when it wants to take a sensitive action. Use the **+** button to start a new conversation, and attach files (images, PDFs, spreadsheets, and more) when needed.

If the agent proposes an action that requires approval, you can **Approve**, **Reject**, or tell it to **do something else** in your own words.

### Overview

The agent's core **Instructions** (editable Markdown) and its **Domains** (tags). This is where you refine what the agent knows how to do.

### Memory

What the agent has learned and remembers across conversations. You can add a memory, edit one, or clear them all. Memories are short — a sentence each — and the agent picks them up as it works.

### Tools

Manage which integrations the agent can use. Your connected tools appear under **Agent's tools**; browse **Other Available Tools** to add more. For each tool you can choose which connected accounts the agent may act through, and you can build a **custom script tool** in Python for bespoke logic. See [Tools](./tools.md) for how connecting and guardrails work.

### Runs

The history of the agent's automated runs (as opposed to chats). Each row shows the run's title, type, status, and when it was last updated. Click any run to read its full transcript. This tab is also where you manage **schedules** (below).

### Impact

Measures the agent against its **KPIs**. After each interaction, CatalEx scores the agent (0–100) on each KPI and records what worked and what needs improvement. The tab shows current scores, trends, and sparklines over your chosen time window, and lets you add or remove KPIs. Pausing measurement here also pauses evolution.

#### How are KPIs measured?

KPI measurement is **self-contained**: after a run finishes, an automated evaluator reviews *that run and nothing else* — the request, the agent's responses, every tool call with its result (success or error), and execution stats such as duration, turns, and tokens. It then scores each approved KPI from 0 to 100 with a short reasoning, plus what worked well and what needs improvement.

Think of it as a teaching assistant grading a student's submitted work: the evaluator can judge the quality of the submission itself, but it can't follow the student home to see whether the advice paid off. It has **no access to your external systems, analytics, or anything that happens after the run ends**.

That means a KPI is only as good as what the conversation can show:

| Measurable (visible in the run) | Not measurable (outside the run) |
|---|---|
| Completeness — did the response cover everything the request asked for? | Business outcomes — revenue, conversions, CSAT, retention |
| Grounding — are claims and figures backed by data the agent actually fetched? | Events in external systems after the run (e.g. whether a fix held in production) |
| Follow-through — does every claimed action have a successful tool call behind it? | Rates aggregated over events the run never saw (e.g. "% of tickets deflected") |
| Structure and actionability of the deliverable | Wall-clock business timelines measured in days or weeks |
| Efficiency — focused execution without wasted turns or tool errors | Whether people adopted the agent's recommendations |

:::tip Writing good KPIs
Phrase KPIs about the **work product the agent delivers in the conversation** — "every flagged discrepancy names the account, amount, and suspected cause" — rather than downstream outcomes like "reconciliation error rate below 2%". Each run gets its own score, so trends across runs build up automatically on this tab.
:::

### Evolution

This is where the agent **improves itself**. Based on its KPI observations, the agent proposes changes to its instructions, memory, and tools. You review each proposal — **Approve**, **Edit**, **Compare** (a side-by-side diff), or **Reject** — then **commit** the approved changes as a new version. Every version is kept, so you can compare versions or **roll back** at any time. Evolution requires impact measurement to be turned on.

## Scheduling recurring runs

Agents can run automatically on a recurring basis. Schedules are managed from the **Runs** tab — click **Schedules** (the button reads **Create schedule** when you have none, or **Schedules (N)** once you do).

An agent can have **any number of schedules**. To add one, click **Add schedule** and choose:

| Field | Options |
|---|---|
| **Frequency** | *Daily*, *Hourly*, or *Weekly* |
| **Time** | The local time of day (Daily and Weekly) |
| **Every** | The interval — every 1, 2, 3, 4, 6, 8, or 12 hours (Hourly) |
| **Days** | One or more weekdays (Weekly) |
| **Prompt** | *(optional)* what the agent should do on each run |

The **prompt** is what makes schedules powerful: each schedule can carry its own instructions, so one agent can have several schedules that each kick off a different recurring job (for example, a morning digest and a Friday report). Leave it blank to run the agent with its default instructions.

Each saved schedule shows its cadence in plain English (e.g. *"At 09:00 AM, every day"*) in your local timezone. Use **Run now** on a schedule to fire it once immediately, or the trash icon to delete it.

:::info
Schedules can't be edited or paused individually — to change one, delete it and create a new one. Times you enter and see are always in your local timezone.
:::

When a schedule fires, the run appears in the **Runs** list just like any other run, where you can open it and read what the agent did.

## Sharing an agent

Owners can **Share** an agent, which sends a copy to a teammate's workspace. The recipient gets their own independent copy to run and edit.

## FAQ

**What's the difference between chatting with an agent and running it?**
Chat is an interactive conversation you drive in real time — ideal for testing. A run is the agent working on its own, either because you clicked **Run now** or because a schedule fired. Runs appear in the Runs tab.

**Do I need to be technical to build an agent?**
No. You describe what you want in plain English and review the result. The only technical surface is the optional custom **script tool**, which is for advanced users.

**Why is an agent asking me to approve an action?**
Sensitive tool actions require approval by default (a "guardrail"). You can change which actions run automatically — see [Tools](./tools.md#guardrails-and-approvals).

**What does "Evolution" actually change?**
With your approval, it updates the agent's instructions, memory, and tool set to improve its KPI scores — then saves the result as a new version you can roll back.

**Can I pause an agent without deleting it?**
Yes. Pausing an agent stops its scheduled runs while preserving everything. Resume it whenever you like.
