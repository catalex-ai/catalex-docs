---
sidebar_position: 5
title: Tasks
---

# Tasks

:::note
Tasks is in **beta**. Some parts of the experience are still being built.
:::

Tasks is your "what needs you today" inbox. Instead of you creating to-dos by hand, your AI agents watch your connected tools — Gmail, Slack, your calendar, your CRM — detect things that need attention, and surface them as task cards. Your job is mostly to **review, approve, refine, or reject** what the agents have prepared.

## How tasks appear

Most tasks are **created automatically** by an agent in response to something it noticed. Each task explains itself with a **"Why this task"** note citing the source and the signal that triggered it — for example, an incoming email, a calendar event, or a deal changing stage.

You can also create a task manually: click **+** (*Create New Task*), give it a title and optional context, and **Create Task**.

## The Tasks page

Tasks are grouped into three tabs, each with a live count:

| Tab | What's in it |
|---|---|
| **Needs You** | Tasks waiting on you — to approve or to answer a question. |
| **Briefing** | Tasks an agent is still preparing. |
| **Handled** | Tasks already done or in motion. |

A live indicator shows how many agents are currently active. Filter the grid by **date range** (Today / Last Week / Last Month), by **priority** (Urgent / Medium / Low), or with the **search** box.

Each card shows the task's title, a short description, its status, when it was created, where it came from (e.g. *"via Gmail"*), its priority, and which agent — or team of agents — is working it.

## Working a task

Click a card to open it. The detail panel has these tabs:

- **Overview** — the *"Why this task"* reasoning, the description, and key details (status, priority, source, owner, deadline, team size).
- **Agents** — who's working the task and their step-by-step progress. For multi-agent tasks, a lead agent coordinates contributors.
- **Action** — where you actually do something (below).
- **Chat** — *coming soon.*

### The Action tab

Depending on where the task is, the Action tab does one of three things:

- **Answers a question.** When an agent needs a decision, it presents options to choose from, plus a box to type your own response.
- **Shows a draft for review.** When an agent has produced something (an email reply, a deck, a digest), you can:
  - **Approve & Execute** — accept it and let the agent carry it out.
  - **Edit Before Sending** — send feedback so the agent revises its plan.
  - **Reject** — decline it.
- **Shows the completed result** once a task is done.

You can also **regenerate** a task (re-run the agent's workflow) from the panel header.

## Getting started

If you have no agents and no tasks yet, Tasks shows a short onboarding that invites you to connect a source — *Connect Gmail*, *Connect Slack* — so agents have something to watch. Each source you connect means one less thing to check manually.

## FAQ

**Where do tasks come from?**
Mostly from your agents watching connected tools. Connect more sources (see [Knowledge](./knowledge.md) and [Tools](./tools.md)) to give agents more to act on. You can also create tasks manually.

**What does "Approve & Execute" do?**
It accepts the agent's draft and lets the agent carry out the action — for example, posting a reply. If something can't be done automatically, CatalEx tells you so you can do it manually.

**Can I redirect an agent that's heading the wrong way?**
Yes. Use **Edit Before Sending** to send instructions, and the agent revises its plan with your feedback.

**How is this different from a to-do list?**
A to-do list is a static list you maintain. Tasks is an active queue driven by agents — items arrive because something happened, already partly done, waiting for your call.
