---
sidebar_position: 3
title: Tasks
---

# Tasks

Tasks is CatalEx's AI-powered action item extraction and workflow management system. It analyzes your synced documents to identify actionable items, then helps you track, execute, and approve them through a structured workflow.

## How It Works

CatalEx scans your synced documents and Slack threads for actionable language -- things like "we need to update the API docs" or "John should review the security policy by Friday." It extracts these into structured tasks with:

- **Title** -- A concise summary of the action item
- **Description** -- Detailed context pulled from the source document
- **Priority** -- High, medium, or low
- **Assignee** -- The person responsible, if identifiable from the source text

## Task Status Flow

Every task moves through a defined lifecycle:

```
pending --> in_progress --> awaiting_approval --> done
                                              --> rejected
                        --> failed
```

| Status | Meaning |
|--------|---------|
| **pending** | Task has been extracted or created but not yet acted on |
| **in_progress** | CatalEx is generating or executing a workflow for this task |
| **awaiting_approval** | Execution results are ready for human review |
| **done** | Task has been approved and completed |
| **rejected** | Execution results were rejected by a reviewer |
| **failed** | Execution encountered an error |

## Priority Levels

Tasks are assigned one of three priority levels, each color-coded for quick identification:

| Priority | Indicator | When Assigned |
|----------|-----------|---------------|
| **High** | Red | Urgent items, deadlines mentioned, blockers |
| **Medium** | Yellow | Standard action items with moderate urgency |
| **Low** | Green | Nice-to-have items, long-term suggestions |

## Execution and Approval Workflow

The full lifecycle of a task from extraction to completion:

### Step 1: Task Extraction

CatalEx identifies an action item in a synced document and creates a task with status **pending**.

### Step 2: Execution Plan Generation

CatalEx generates an execution plan (workflow) that outlines the steps needed to complete the task. The task moves to **in_progress**.

### Step 3: Execution and Submission

The workflow executes and produces results. The task moves to **awaiting_approval**, and the results are presented for human review.

### Step 4: Human Review

You review the execution results and choose one of two actions:

- **Approve** -- The task moves to **done**. The results are finalized.
- **Reject** -- The task moves to **rejected**. You can optionally rerun the task with updated parameters.

:::info
The approval step ensures that no AI-generated output is finalized without human oversight. Every execution result requires explicit approval before it is considered complete.
:::

### Handling Failures

If the execution encounters an error, the task moves to **failed**. You can inspect the error details and choose to rerun the task.

## Searching and Filtering Tasks

### Search

Use the search bar to find tasks by keyword. The search matches against task titles and descriptions.

### Filter by Status

Filter the task list to show only tasks in a specific state:

- **Pending** -- Tasks awaiting action
- **Awaiting Approval** -- Tasks with results ready for review
- **Failed** -- Tasks that encountered errors
- **Done** -- Completed tasks
- **Deleted** -- Removed tasks

### Filter by Priority

Narrow down tasks by priority level: **High**, **Medium**, or **Low**.

### Filter by Date Range

View tasks from a specific time period:

- **Today** -- Tasks created or updated today
- **Last Week** -- Tasks from the past 7 days
- **Last Month** -- Tasks from the past 30 days

:::tip
Combine filters to create focused views. For example, filter by **Awaiting Approval** + **High** priority to see the most urgent items that need your attention.
:::

## Metrics Dashboard

The Tasks page includes a metrics section that shows:

- **Completion rate** -- The ratio of completed tasks to total tasks, displayed as a percentage
- **Progress bar** -- A visual indicator with color coding:
  - Green for high completion rates
  - Yellow for moderate rates
  - Red for low completion rates

Use these metrics to track your team's progress on extracted action items over time.

## Creating Tasks Manually

In addition to AI-extracted tasks, you can create tasks manually:

1. Click **New Task** (or the equivalent create button).
2. Enter a **title** for the task.
3. Add a **description** with relevant context.
4. Set the **priority** (high, medium, or low).
5. Optionally assign the task to a specific person.
6. Save the task.

Manually created tasks enter the same workflow as extracted tasks and follow the same status lifecycle.

## Rerunning Tasks

If a task's execution results are unsatisfactory or if the task failed, you can rerun it:

1. Open the task detail view.
2. Click **Rerun**.
3. CatalEx regenerates the execution plan and produces updated results.
4. The task returns to **awaiting_approval** for review.

:::tip
Rerunning is useful when the underlying source documents have been updated since the original extraction, or when you want to try a different approach to the task.
:::

## Task History

View the extraction history to see which documents tasks were extracted from. The history shows:

- The source document name and link
- When the extraction ran
- How many tasks were extracted from each document
- The status of each extracted task

This helps you trace any task back to its origin and understand the context in which it was identified.

## FAQ

**Can I edit a task's description?**

Yes. Open the task detail view and modify the title, description, priority, or assignee as needed.

**What happens when I reject an execution?**

The task moves to **rejected** status. You can then rerun the task to generate a new execution plan and updated results.

**Can tasks be assigned to specific people?**

Yes. You can set or change the assignee when creating a task manually or by editing an existing task. AI-extracted tasks are assigned automatically when the source text identifies a responsible person.

**Are tasks extracted automatically every time I sync?**

Task extraction runs as part of the document analysis pipeline. When new or updated documents are synced, CatalEx scans them for action items.

**Can I delete a task?**

Yes. Deleted tasks move to the **deleted** filter category and are hidden from the default view.

**How accurate is the priority assignment?**

CatalEx infers priority from language cues in the source document (urgency words, deadlines, escalation language). You can always adjust the priority manually if the AI's assessment does not match your judgment.
