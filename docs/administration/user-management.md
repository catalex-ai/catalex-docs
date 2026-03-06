---
sidebar_position: 1
title: User Management
---

# User Management

Manage your team members in CatalEx — invite new users, control access, and maintain your organization's roster from a single admin panel.

## Overview

CatalEx provides a complete set of user management tools that let administrators invite teammates, control who has access, and handle role assignments. Every company in CatalEx is fully isolated (multi-tenant), so your team data is never visible to other organizations.

User management covers the full lifecycle: **invite**, **activate**, **disable**, **re-enable**, and **delete**. Ownership of the company can also be transferred between users.

## How It Works

All user management operations are performed from the **Admin Panel**, which is only visible to users with the **ADMIN** or **OWNER** role. Members do not see this panel.

When you invite a user, CatalEx sends a magic link to their email address. The recipient clicks the link to accept the invitation and set up their account. Once active, users appear in your team list with their name, email, role, and status.

:::info
CatalEx uses **soft deletes** — users are never permanently removed from the system. Deleted users are marked with a `deleted_at` timestamp, and their data is preserved for audit purposes.
:::

## Accessing User Management

1. Click **Admin** in the left sidebar (visible only to ADMIN and OWNER roles).
2. Select the **Team** tab.

You will see a list of all active users in your company, including their **name**, **email**, **role**, and **status**.

### Searching Users

Use the search bar at the top of the team list to filter users by **name** or **email**. Results update as you type.

## Inviting New Users

To add someone to your CatalEx workspace:

1. Click the **Invite** button at the top of the team list.
2. Enter the user's **email address**.
3. Select a **role**: `ADMIN` or `MEMBER`.
4. Click **Send**.
5. A **magic link** email is sent to the recipient (valid for **24 hours**).
6. The invite appears in the **Pending Invitations** list.

:::tip
You do not need to create an account for the user — they complete their own setup when they accept the magic link.
:::

### Managing Pending Invitations

Below the active team list, you can view all **Pending Invitations**. Each entry shows the invited **email**, the assigned **role**, and the **expiry time**.

| Action | How |
|--------|-----|
| **View pending invites** | Scroll to the Pending Invitations section of the Team tab. |
| **Revoke an invite** | Click the **Delete** button next to the pending invitation to cancel it. The magic link becomes invalid immediately. |
| **Re-send an expired invite** | Expired invitations cannot be resent directly. Simply create a **new invitation** for the same email address. |

:::warning
Magic links expire after **24 hours**. If the recipient does not accept in time, you will need to send a new invitation.
:::

## Disabling a User

Disabling a user locks them out of CatalEx without deleting their account or data. This is useful for **temporary suspensions**, such as when an employee is on leave or under review.

**To disable a user:**

1. Navigate to the **Team** list in the Admin panel.
2. Find the user you want to disable.
3. Click **Disable**.

The user's status changes to **Disabled** and they can no longer log in.

**To re-enable a user:**

1. Find the disabled user in the team list.
2. Click **Enable**.

The user regains access immediately.

:::info
When a user is disabled, any existing sessions are invalidated. JWT verification fails for disabled users, so there is no window where a disabled user can continue using the platform.
:::

## Deleting a User

Deleting a user performs a **soft delete**: the user is marked as deleted, cannot log in, and no longer appears in the team list. However, all data associated with the user is preserved for audit purposes.

**To delete a user:**

1. Navigate to the **Team** list in the Admin panel.
2. Find the user you want to delete.
3. Click **Delete** and confirm the action.

:::warning
Deleting a user **cannot be undone** from the UI. If you need to restore a deleted user, contact CatalEx support.
:::

## Transferring Ownership

Only the current **OWNER** can transfer ownership of the company. There is exactly **one OWNER per company** at all times.

**To transfer ownership:**

1. Navigate to the **Team** list in the Admin panel.
2. Select the user you want to make the new OWNER.
3. Click **Transfer Ownership** and confirm.

After the transfer:

- The selected user becomes the new **OWNER**.
- You (the previous OWNER) are automatically changed to an **ADMIN**.

:::warning
This action is significant — the new OWNER will have full control over the company, including the ability to remove your admin access. Make sure you are transferring to the right person.
:::

## Configuration

User management does not require additional configuration beyond having the appropriate role (ADMIN or OWNER). For domain-based auto-join, see [Company Settings](./company-settings.md).

## FAQ

### Can I change a user's role?

There is no direct "change role" action. To change a user's role:

- **To make someone OWNER**: Use the [Transfer Ownership](#transferring-ownership) feature (OWNER only).
- **To change between ADMIN and MEMBER**: Disable the user, then send a new invitation with the desired role.

### What happens to a deleted user's tasks and data?

All data associated with a deleted user — including tasks, conversations, and automation history — is **preserved**. Deleting a user only removes their ability to log in; it does not delete their contributions.

### Can a disabled user's existing sessions still work?

No. CatalEx checks user status during JWT verification. If a user is disabled, **all API requests fail immediately**, even if the user has a previously valid token.

### Can I bulk invite users?

Not currently. Invitations are sent **one at a time**. For large teams, consider enabling [auto-join](./company-settings.md#auto-join-configuration) with a verified domain so that new users can sign up without individual invitations.
