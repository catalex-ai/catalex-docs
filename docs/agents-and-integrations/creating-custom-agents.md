---
sidebar_position: 9
title: Creating Custom Agents (Developer Guide)
---

# Creating Custom Agents (Developer Guide)

This guide covers the **developer perspective** on designing effective CatalEx agents. An agent is a persona backed by tools — you define what it knows, how it behaves, and what it can do. This page focuses on architecture decisions, instruction writing, and design patterns. For the step-by-step UI walkthrough of registering agents, see [Registering with CatalEx](./registering-with-catalex).

## Agent Architecture

Every CatalEx agent has two components:

```
Agent = Persona (system instructions) + Tools (linked MCPs)
```

- **Persona**: A set of system instructions that define the agent's role, behavior, tone, capabilities, and constraints. The agent follows these instructions for every conversation.
- **Tools**: One or more MCP servers linked to the agent. Each MCP provides a set of tools the agent can call to retrieve data or perform actions.

The persona determines **when and why** the agent calls tools. The tools determine **what** the agent can actually do.

## Design Patterns

### Single-Purpose Agent

**One MCP, focused instructions.** The simplest and most reliable pattern.

| Attribute | Example |
|-----------|---------|
| Name | Jira Agent |
| MCPs | Jira MCP |
| Instructions | "You manage Jira tickets. You can create, update, search, and close issues." |
| Best for | Teams that need a dedicated tool assistant |

**Advantages:** Easy to test, predictable behavior, clear scope. Users know exactly what this agent can and cannot do.

### Multi-Tool Agent

**Multiple MCPs, orchestration instructions.** The agent coordinates across several tools.

| Attribute | Example |
|-----------|---------|
| Name | DevOps Agent |
| MCPs | GitHub MCP, Jira MCP, PagerDuty MCP |
| Instructions | "You help engineers with deployments, incidents, and ticket management. When an incident is reported, create a Jira ticket AND a PagerDuty alert." |
| Best for | Workflows that span multiple systems |

**Advantages:** Users interact with one agent instead of switching between tools. The agent handles cross-system orchestration.

:::warning
Multi-tool agents are more complex to test. Each MCP adds a potential failure point. Start with a single-purpose agent, verify it works well, and then expand to multiple MCPs.
:::

### Domain Expert

**No MCPs, specialized instructions only.** The agent answers questions based on its training and your custom instructions — no external tool calls.

| Attribute | Example |
|-----------|---------|
| Name | Legal Advisor |
| MCPs | None |
| Instructions | "You are a legal advisor who knows our company's policies. You answer questions about employment law, data privacy, and compliance. You always caveat that your answers are not legal advice." |
| Best for | FAQ-style agents, policy guides, onboarding assistants |

**Advantages:** No infrastructure to maintain, no MCP deployment, instant setup. The agent's value comes entirely from well-crafted instructions.

## Writing System Instructions

System instructions are the most important part of agent design. They control the agent's behavior, tone, and decision-making. Write them as if you are onboarding a new team member.

### Anatomy of Good Instructions

A complete set of instructions includes five sections:

1. **Role definition** — who the agent is and what it does
2. **Capabilities** — what it can do (linked to specific tools)
3. **Rules** — behavioral constraints and guardrails
4. **Response format** — how to structure answers
5. **Examples** (optional) — sample interactions

### Full Example

```markdown
You are the Engineering Operations agent for Acme Corp. You help engineers
with deployments, incident management, and project tracking.

## Capabilities
- Check deployment status and CI/CD pipeline results via GitHub
- Create, update, and search Jira tickets for incidents and feature requests
- Look up team members and their current assignments via the Company Directory

## Rules
- Always confirm with the user before creating or modifying tickets
- When reporting deployment status, always include the PR link and commit SHA
- For incident tickets, set priority to High by default
- Use concise, technical language appropriate for a software engineering audience
- If you are unsure about something, say so rather than guessing
- Never expose internal system IDs or database keys to the user
- When multiple tools could answer a question, prefer the most specific one

## Response Format
- Use bullet points for lists of items
- Include relevant links (PR URLs, ticket URLs) inline
- Summarize actions taken at the end of each interaction
- For deployment status, use this format:
  - **PR**: [link]
  - **Commit**: [SHA]
  - **Status**: [passing/failing]
  - **Deployed at**: [timestamp]

## Examples

User: "What's the status of PR #1234?"
Agent: Checks GitHub for PR #1234 details, returns status, checks, and merge state.

User: "Create a bug ticket for the login page crash"
Agent: Confirms details with the user, then creates a Jira ticket with appropriate fields.
```

### Instruction Writing Guidelines

| Guideline | Good | Bad |
|-----------|------|-----|
| Be specific about capabilities | "You can create Jira tickets of type Bug, Story, and Task" | "You can do Jira stuff" |
| Set explicit boundaries | "Never delete tickets without asking for confirmation" | (no boundaries mentioned) |
| Define the tone | "Use concise, technical language" | (agent defaults to verbose, generic tone) |
| Handle unknowns | "If you cannot find the information, say so" | (agent may hallucinate an answer) |
| Specify format | "Use bullet points for lists" | (agent may use inconsistent formatting) |

:::tip
Test your instructions by imagining edge cases. What happens if the user asks something outside the agent's scope? What if a tool returns an error? What if the user's request is ambiguous? Add rules to cover these cases.
:::

## Auto-Execute Considerations

CatalEx agents can be configured to **auto-execute** tool calls — the agent invokes tools without asking the user for confirmation. This creates a faster, more seamless experience but removes the human-in-the-loop check.

### When to Enable Auto-Execute

- **Trusted, read-only tools** — looking up employee info, checking deployment status, searching tickets
- **Non-destructive operations** — queries and searches that don't modify external systems
- **High-frequency tasks** — tools the user invokes repeatedly and trusts implicitly

### When NOT to Enable Auto-Execute

- **Tools that create or modify external resources** — creating Jira tickets, merging PRs, sending messages
- **Billing-related tools** — anything that could incur costs
- **Tools with irreversible side effects** — deleting records, revoking access, triggering deployments
- **Tools that access sensitive data** — where the user should explicitly consent to each lookup

### Auto-Execute Requirement

:::danger
Auto-execute requires that **ALL** MCPs linked to the agent have `auto_approve=true`. If any single linked MCP does not have auto-approve enabled, auto-execute is automatically disabled for the entire agent. This is a safety mechanism — you cannot partially auto-execute.
:::

This means:

- If your agent links 3 MCPs and 2 have `auto_approve=true` but 1 does not, the agent will ask for confirmation on **every** tool call.
- To enable auto-execute, go to **Agent Market > Custom MCPs**, find each linked MCP, and enable auto-approve.
- Only enable auto-approve on MCPs whose tools are all safe to run without confirmation.

## Testing Your Agent

Follow this workflow to test an agent before making it available to your team:

### 1. Create the Agent in Draft Status

In **Agent Market > Agents > Create Agent**, fill in the details and save as **Draft**. Draft agents are only visible to admins.

### 2. Test in Chat

Open the **Intelligence** (chat) interface. Select your draft agent from the agent picker. Send test messages that exercise each of its capabilities:

- Does it call the right tool for each type of question?
- Does it handle errors gracefully (e.g., when a tool returns `{"error": "..."}`)?
- Does it follow the rules in its instructions (e.g., asking for confirmation before modifying resources)?
- Does it respond in the expected format?

### 3. Verify Tool Calls

In the chat interface, expand the tool call details to verify:

- The correct tool was selected
- The parameters were populated correctly
- The result was interpreted accurately by the agent

### 4. Test Edge Cases

- Ask questions outside the agent's scope — it should decline gracefully
- Provide ambiguous input — it should ask for clarification
- Simulate tool failures — verify the agent explains the error to the user
- Try prompt injection — the agent should not deviate from its instructions

### 5. Activate

Once testing is complete, change the agent status from **Draft** to **Active**. It will appear in the Intelligence interface for all users in your company.

:::tip
Keep a draft "staging" copy of your agent. When you need to change instructions or link new MCPs, edit the draft, test it, and then update the active agent. This prevents broken agents from reaching users.
:::

## Agent Design Checklist

- [ ] Role and scope are clearly defined in the instructions
- [ ] Every tool the agent might call is covered in the "Capabilities" section
- [ ] Behavioral rules cover error cases, ambiguous inputs, and out-of-scope requests
- [ ] Response format is specified (bullet points, links, summaries, etc.)
- [ ] Auto-execute is only enabled for read-only, non-destructive tools
- [ ] Agent has been tested in draft mode with a variety of inputs
- [ ] Edge cases and error scenarios have been tested

## Frequently Asked Questions

### Can I link the same MCP to multiple agents?

Yes. An MCP can be linked to any number of agents. For example, a "Company Directory" MCP might be linked to both an "HR Agent" and a "DevOps Agent" — each uses the same employee lookup tools but with different instructions and context.

### How long can system instructions be?

There is no strict character limit, but keep instructions **focused and actionable**. Long, rambling instructions are harder for the agent to follow consistently. Aim for 200-500 words. If your instructions exceed 1,000 words, consider whether the agent's scope is too broad and should be split into multiple agents.

### Can I update an agent's instructions without downtime?

Yes. Changes to system instructions take effect immediately for new conversations. Existing open conversations continue using the instructions they started with.

### How do I know which tools the agent is calling?

In the Intelligence (chat) interface, tool calls are shown inline in the conversation. Expand the tool call block to see the tool name, parameters sent, and the raw result returned. This is the primary debugging tool for agent behavior.

### Can agents call other agents?

No. Agents are independent — they do not invoke each other. If you need coordinated behavior across domains, create a multi-tool agent that links the relevant MCPs directly.
