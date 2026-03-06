---
sidebar_position: 4
title: Automation
---

# Automation

Automation lets you create scheduled workflows that run on a recurring basis without manual intervention. Define what should happen, set a schedule, and CatalEx takes care of the rest.

## Overview

Automations are recurring jobs that CatalEx executes on your behalf. Common use cases include:

- Sending a daily summary of new tasks to your inbox
- Running a weekly knowledge base sync
- Generating periodic reports from your documents
- Monitoring Slack channels for specific topics and alerting you

Each automation has a heading, description, icon, schedule, and execution configuration.

## Schedule Types

CatalEx supports three schedule types:

| Schedule | Configuration | Example |
|----------|---------------|---------|
| **Hourly** | Start time, end time, interval in hours | Every 2 hours from 9:00 AM to 5:00 PM |
| **Daily** | Time of day | Every day at 9:00 AM |
| **Weekly** | Day(s) of week, time of day | Every Monday and Friday at 10:00 AM |

:::info
All schedule times use your local timezone as configured in your account preferences.
:::

## Creating an Automation

### Manual Creation

1. Navigate to the **Automation** page.
2. Click **New Automation**.
3. Enter a **heading** that describes what the automation does (e.g., "Daily Task Summary").
4. Add a **description** with more detail about the automation's purpose and behavior.
5. Choose an **icon** to visually identify the automation. Available icons include:
   - `calendar`, `clock`, `zap`, `file-text`, `mail`, `bell`, `database`, `globe`, `server`, `shield`, `activity`, `bar-chart`, `bookmark`, `briefcase`, `code`, `cpu`, `layers`, `link`, `search`, `users`, and more.
6. Select the **schedule type** (Hourly, Daily, or Weekly) and configure the timing parameters.
7. Set **max instances** to control how many concurrent runs are allowed (see [Max Instances](#max-instances) below).
8. Click **Save** to create the automation.
9. **Activate** the automation to start it on schedule.

### Creating from Natural Language

CatalEx can generate automation configurations from plain-English descriptions. Simply type a prompt describing what you want, and the system generates the appropriate settings.

**Example prompts:**

- "Send me a daily summary of new tasks every morning at 9am"
- "Every Monday at 8am, compile a report of documents updated last week"
- "Check for new Slack threads about production issues every 2 hours during business hours"

CatalEx parses the prompt, infers the schedule type and timing, and pre-fills the automation form. Review the generated configuration and adjust as needed before saving.

:::tip
Natural language creation is a fast way to set up automations. You can always fine-tune the generated configuration after the form is populated.
:::

## Managing Automations

### View Modes

Automations can be displayed in two layouts:

- **Card view** -- Each automation appears as a card with its icon, heading, and status. Good for visual scanning.
- **List view** -- Automations appear in a compact table. Better for managing many automations at once.

Toggle between views in your preferences.

### Pause and Resume

Temporarily stop an automation without deleting it:

1. Open the automation or select it from the list.
2. Click **Pause**.
3. The automation stops executing on its schedule but retains all configuration.
4. Click **Resume** when you want it to start running again.

:::warning
Pausing an automation does not cancel a run that is already in progress. It only prevents future scheduled runs from starting.
:::

### Manual Trigger

Run an automation immediately without waiting for its next scheduled time:

1. Open the automation.
2. Click **Run Now** (or the manual trigger button).
3. The automation executes once with its current configuration.

Manual triggers respect the **max instances** setting. If the maximum number of instances are already running, the manual trigger is skipped.

### Execution History

Each automation maintains a log of past runs showing:

- **Timestamp** -- When the run started and finished
- **Result** -- Success or failure status
- **Output** -- Any results or artifacts produced by the run
- **Duration** -- How long the run took

Use execution history to monitor reliability and diagnose failures.

## Status States

| Status | Meaning |
|--------|---------|
| **Active** | The automation is running on its configured schedule |
| **Paused** | The automation is temporarily stopped; no scheduled runs will occur |
| **Completed** | The automation has finished its lifecycle (if applicable) |

## Max Instances

The **max instances** setting prevents multiple copies of the same automation from running simultaneously. This is important for automations that take longer to execute than their schedule interval.

**How it works:**

- If a previous run is still executing when the next schedule triggers, the new run is **skipped**.
- The skipped run is logged in the execution history with a note indicating it was skipped due to max instances.
- Once the running instance completes, the next scheduled trigger proceeds normally.

**Example:** An automation is scheduled to run every hour with max instances set to 1. If a run starts at 9:00 AM and takes 75 minutes to complete, the 10:00 AM run is skipped. The next run starts at 11:00 AM as scheduled.

:::info
The default max instances value is 1, which is appropriate for most automations. Increase it only if you specifically need overlapping runs.
:::

## Configuration Reference

| Field | Required | Description |
|-------|----------|-------------|
| **Heading** | Yes | Short name for the automation |
| **Description** | No | Detailed explanation of what the automation does |
| **Icon** | No | Visual identifier chosen from the icon library |
| **Schedule Type** | Yes | Hourly, Daily, or Weekly |
| **Schedule Config** | Yes | Timing parameters specific to the chosen schedule type |
| **Max Instances** | Yes | Maximum concurrent runs allowed (default: 1) |

## FAQ

**Can I edit a running automation?**

Pause the automation first, then make your changes. Save the updated configuration and resume the automation. Edits do not take effect while the automation is actively running.

**What happens if an automation fails?**

The failure is logged in the execution history with error details. The automation remains active and retries on the next scheduled trigger. Repeated failures do not automatically pause the automation -- check the execution history regularly or set up a monitoring automation to alert you.

**Can automations trigger actions in external tools?**

Yes. If you have external tools connected via MCPs (Model Context Protocols) or custom agents, automations can invoke those integrations. For example, an automation could create a Jira ticket, send a Slack message, or update an external database.

**Can I duplicate an automation?**

Create a new automation and use the same configuration. There is no one-click duplicate button, but the natural language creation feature makes it fast to set up similar automations.

**What timezone do schedules use?**

Schedules use your local timezone as configured in your account preferences. All timestamps in the execution history are displayed in the same timezone.

**Is there a limit on the number of automations I can create?**

There is no hard limit on the number of automations. However, consider your system's capacity and the max instances setting to avoid resource contention.
