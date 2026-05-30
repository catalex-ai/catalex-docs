---
sidebar_position: 2
title: Roles & Permissions
---

# Roles & Permissions

Understand the three roles in CatalEx and what each one can do across the platform.

## Overview

CatalEx uses a simple, fixed role model with three roles: **OWNER**, **ADMIN**, and **MEMBER**. Each company has exactly one OWNER, any number of ADMINs, and any number of MEMBERs. Roles determine what a user can see and do within the platform — particularly around administration, user management, and system configuration.

## How It Works

Every user in a CatalEx company is assigned exactly one role. Roles are hierarchical in terms of capability:

- **MEMBER** — The default role for most users. Full access to CatalEx features (Studio agents, Freeflow chat, Tasks, knowledge search) but no administrative capabilities.
- **ADMIN** — Everything a Member can do, plus the ability to manage users, configure integrations, and administer the system.
- **OWNER** — Everything an Admin can do, plus the exclusive ability to transfer company ownership. There is exactly one Owner per company.

:::info
The first user who creates a company is automatically assigned the **OWNER** role.
:::

## Role Descriptions

### OWNER

Full control over the CatalEx company. The OWNER is the only user who can transfer ownership to another user. There can only be **one OWNER per company**. If the OWNER needs to leave the organization, they should transfer ownership first.

### ADMIN

ADMINs manage the day-to-day administration of the platform. They can invite and remove users, configure data sources and integrations, manage MCPs, create and edit agents, and modify company settings. Multiple users can hold the ADMIN role.

### MEMBER

MEMBERs are standard users of the platform. They have full access to all CatalEx productivity features — building and running agents in [Studio](../features/studio.md), [Freeflow](../features/freeflow.md) chat, [Knowledge](../features/knowledge.md) search, [Tasks](../features/tasks.md), and using connected [Tools](../features/tools.md) — but cannot perform administrative actions such as connecting data sources or managing the team.

## Permission Matrix

The table below shows representative actions in CatalEx and which roles can perform them.

| Action | Member | Admin | Owner |
|---|:---:|:---:|:---:|
| Use Freeflow (chat) | Yes | Yes | Yes |
| Search the knowledge base | Yes | Yes | Yes |
| Build and run agents (Studio) | Yes | Yes | Yes |
| View and create tasks | Yes | Yes | Yes |
| Use connected tools in agents | Yes | Yes | Yes |
| Update own preferences | Yes | Yes | Yes |
| Invite users | No | Yes | Yes |
| Disable / enable / delete users | No | Yes | Yes |
| Connect & sync data sources (Knowledge) | No | Yes | Yes |
| Connect integrations (Tools) | No | Yes | Yes |
| Add custom MCPs | No | Yes | Yes |
| Edit company settings | No | Yes | Yes |
| Transfer ownership | No | No | Yes |

## Role Assignment

Roles are assigned at two points:

1. **Company creation** — The user who creates the company is automatically the **OWNER**.
2. **Invitation** — When an ADMIN or OWNER invites a new user, they select a role (`ADMIN` or `MEMBER`) for the invitation.

### Changing a User's Role

There is no direct role-change action in CatalEx. To change a user's role:

- **MEMBER to ADMIN (or vice versa)**: Disable the user, then send a new invitation with the desired role.
- **Any role to OWNER**: The current OWNER uses the **Transfer Ownership** feature. See [User Management](./user-management.md#transferring-ownership) for details.

:::tip
Plan role assignments carefully during invitation. While role changes are possible, they require a disable-and-reinvite workflow.
:::

## Configuration

Roles are a fixed part of the CatalEx platform and do not require configuration. The three roles (OWNER, ADMIN, MEMBER) and their associated permissions are built in.

## Security Considerations

Follow these best practices to keep your CatalEx workspace secure:

- **Minimize the number of ADMINs.** Only grant admin access to users who genuinely need to manage the platform. Fewer admins means a smaller attack surface.
- **Choose your OWNER carefully.** The OWNER should be a senior, stable team member who is unlikely to leave the organization unexpectedly.
- **Transfer ownership proactively.** If the current OWNER is leaving the organization, transfer ownership **before** their departure. Once an OWNER account is inaccessible, only CatalEx support can help.
- **Review roles periodically.** As your team evolves, audit who has ADMIN access and whether they still need it.

:::warning
If the OWNER leaves your organization without transferring ownership, contact **CatalEx support** to resolve the situation. This process requires identity verification and may take time.
:::

## FAQ

### Can I create custom roles?

Not currently. CatalEx has three fixed roles: **OWNER**, **ADMIN**, and **MEMBER**. Custom roles are not supported at this time.

### What happens if the OWNER leaves the organization?

The OWNER should transfer ownership to another user **before** leaving. If the OWNER has already left and did not transfer ownership, contact [CatalEx support](mailto:support@catalex.io) for assistance. The support team will verify your identity and help reassign ownership.

### Can an ADMIN remove another ADMIN?

Yes. An ADMIN can disable or delete any other user except the OWNER, including other ADMINs.

### Can an ADMIN remove the OWNER?

No. The OWNER cannot be disabled, deleted, or demoted by an ADMIN. Only the OWNER can voluntarily transfer their ownership to another user.
