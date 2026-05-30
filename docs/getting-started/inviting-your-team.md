---
sidebar_position: 3
title: Inviting Your Team
---

# Inviting Your Team

CatalEx is most powerful when your whole team is on board. This guide explains how to invite colleagues, manage pending invitations, and assign roles.

## Overview

Team invitations in CatalEx use **magic links** -- secure, single-use links sent via email. Only users with the **OWNER** or **ADMIN** role can send invitations. Each invite includes a role assignment so new members get the right level of access from day one.

## How It Works

### Step 1: Open the Invite Panel

1. Navigate to **Admin → Team**.
2. Click **Invite Members**.

### Step 2: Enter the Recipient's Email and Select a Role

1. Type the email address of the person you want to invite.
2. Select a role from the dropdown:

| Role | Capabilities |
|---|---|
| **ADMIN** | Invite and manage users, configure integrations, manage company settings |
| **MEMBER** | View and use all CatalEx features (search, insights, dashboards) |

3. Click **Send Invite**.

CatalEx sends a magic link to the recipient's email address. The email includes your company name and the role they have been assigned.

:::info
You cannot invite someone as an **OWNER**. There is exactly one OWNER per company. To transfer ownership, use the dedicated ownership transfer flow under **Admin → Team (use the Make owner action)**.
:::

### Step 3: Recipient Clicks the Magic Link

When the recipient opens the email and clicks the link:

- **If they are new to CatalEx:** They are directed to a streamlined sign-up page where they create their account (email/password or Google SSO). After completing sign-up, they are automatically added to your company with the assigned role.
- **If they already have a CatalEx account:** They are added to your company with the assigned role immediately upon clicking the link.

:::warning
Magic links expire after **24 hours**. If the recipient does not click the link within that window, the invite becomes invalid and you will need to send a new one.
:::

### Step 4: View Pending Invites

To see all outstanding invites, go to **Admin → Team** and scroll to the **Pending Invites** section below the team list.

You will see every invite that has been sent but not yet accepted, including the recipient's email, assigned role, and when the invite was sent. Each pending invite has a **Copy Link** action (to share the join link directly) and a **Revoke** action.

### Step 5: Revoke a Pending Invitation

If you need to cancel an invite before it is used:

1. Go to **Admin → Team** and find the invite in the **Pending Invites** section.
2. Click **Revoke**.

The magic link is immediately invalidated. The recipient will see an error if they try to use it after revocation.

### Managing Members After Joining

From the **Admin → Team** list, each member has an actions (**⋮**) menu. The available actions depend on roles:

- **Disable / Enable** — revoke or restore a user's ability to log in.
- **Make owner** — transfer ownership to an Admin (Owner only; the current Owner is demoted to Admin). See [Roles & Permissions](../administration/roles-and-permissions.md).
- **Delete** — remove a user from the company.

:::tip
A user's role (Member or Admin) is chosen when you invite them. Choose **Member** if you're unsure what access someone needs — Admin grants full administrative control.
:::

## Configuration

| Setting | Location | Who Can Change |
|---|---|---|
| Send Invites | Admin → Team → Invite User | OWNER, ADMIN |
| View / Copy / Revoke Invites | Admin → Team → Pending Invites | OWNER, ADMIN |
| Disable / Enable / Delete users | Admin → Team (⋮ menu) | OWNER, ADMIN |
| Transfer ownership | Admin → Team (Make owner) | OWNER |

## FAQ

**What if an invite link expires?**
Simply send a new invite. Go to **Admin → Team → Invite User**, enter the same email address, select the role, and click **Send Invite**. A fresh magic link with a new 24-hour window will be sent.

**Can I change someone's role after they join?**
A member's role is set at invite time. The Team list lets you disable, enable, or delete a user, and an Owner can transfer ownership to an Admin with **Make owner**. To give someone a different role, re-invite them with that role, or contact support for help. See [Roles & Permissions](../administration/roles-and-permissions.md).

**What is the difference between ADMIN and MEMBER?**
ADMINs can invite users, manage team members, configure integrations, and adjust company settings. MEMBERs can use all of CatalEx's core features -- search, insights, and dashboards -- but cannot modify company or team settings. For a full breakdown, see the [Roles & Permissions](/administration/roles-and-permissions) page.

**Can I invite someone who is already in another company on CatalEx?**
Each CatalEx account is associated with one company. The recipient would need to leave their current company before accepting your invite, or create a new account with a different email.

**Can I send multiple invites at once?**
You can send invites one at a time. For bulk onboarding, consider enabling [auto-join](./setting-up-your-company.md#step-4-enable-auto-join) for your verified domain instead.

**Who can see the list of pending invitations?**
Only users with the OWNER or ADMIN role can view and manage pending invitations.
