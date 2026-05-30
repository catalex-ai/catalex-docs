---
sidebar_position: 2
title: Setting Up Your Company
---

# Setting Up Your Company

Once you have created your company workspace, you will want to configure it so team members can find and join it easily. This guide covers company naming, domain management, DNS verification, and auto-join settings.

## Overview

Company setup in CatalEx involves three key areas:

1. **Company name** -- The display name visible to all members.
2. **Domain management** -- Adding and verifying your organization's email domains.
3. **Auto-join** -- Allowing users with matching email domains to join automatically.

These settings are available to users with the **OWNER** or **ADMIN** role.

## How It Works

### Step 1: Set Your Company Name

1. Navigate to **Admin → Company Settings**.
2. Enter your company name in the **Company Name** field.
3. Click **Save**.

This name appears in the navigation bar, invite emails, and anywhere your company is referenced within CatalEx.

### Step 2: Add Allowed Domains

Adding domains tells CatalEx which email domains belong to your organization. This is a prerequisite for both DNS verification and auto-join.

1. Go to **Admin → Company Settings**.
2. Click **Add Domain**.
3. Enter the domain (e.g., `yourcompany.com`).
4. Click **Add**.

You can add multiple domains if your organization uses more than one (e.g., `yourcompany.com` and `yourcompany.co.uk`).

### Step 3: Verify Domain Ownership via DNS

Domain verification proves that your organization controls the domain. Each domain you add receives a unique `dns_verification_code`.

1. In the **Domains** section, find the domain you want to verify and click **Verify**.
2. CatalEx displays a TXT record value. It will look something like: `catalex-verify=abc123def456`.
3. Log in to your DNS provider (e.g., Cloudflare, Route 53, GoDaddy).
4. Add a new **TXT record** to your domain:
   - **Host / Name:** `@` (or leave blank, depending on your provider)
   - **Value:** The verification string provided by CatalEx
   - **TTL:** Default or 3600
5. Return to CatalEx and click **Check Verification**.

:::info
DNS changes can take anywhere from a few minutes to 48 hours to propagate, though most propagate within 15 minutes. If verification fails on the first attempt, wait a few minutes and try again.
:::

:::warning
Do not remove the TXT record after verification. CatalEx may periodically re-check domain ownership. If the record is missing, your domain's verified status could be revoked.
:::

### Step 4: Enable Auto-Join

Once a domain is verified, you can enable auto-join so that any new user who signs up with a matching email domain is automatically added to your company.

1. Go to **Admin → Company Settings**.
2. Next to your verified domain, toggle **Auto-Join** to **Enabled**.
3. Click **Save**.

From this point forward, any user who creates a CatalEx account with an email address at that domain (e.g., `jane@yourcompany.com`) will be added to your company as a **MEMBER** automatically.

:::tip
Auto-join is ideal for organizations that want frictionless onboarding. Combined with Google SSO, new team members can go from zero to productive in under a minute.
:::

## When to Use Domain Verification vs. Invites

| Scenario | Recommended Approach |
|---|---|
| Large organization, many people joining over time | Verify domain + enable auto-join |
| Small team, controlled rollout | Send individual invites |
| External contractors or partners with different email domains | Send individual invites |
| Multiple office locations with different domains | Verify all domains + enable auto-join |
| Need to assign specific roles (ADMIN) on join | Send individual invites with role selection |

:::info
Auto-join always assigns the **MEMBER** role. If you need someone to have the **ADMIN** role, either send them an invite with the ADMIN role selected, or change their role after they join via **Admin → Team**.
:::

## Configuration

| Setting | Location | Who Can Change |
|---|---|---|
| Company Name | Admin → Company Settings | OWNER, ADMIN |
| Add / Remove Domains | Admin → Company Settings | OWNER, ADMIN |
| DNS Verification | Admin → Company Settings | OWNER, ADMIN |
| Auto-Join Toggle | Admin → Company Settings | OWNER, ADMIN |

## FAQ

**Can I change the company name later?**
Yes. Navigate to **Admin → Company Settings** and update the name at any time. The change takes effect immediately for all members.

**What if DNS verification keeps failing?**
Double-check that the TXT record value matches exactly what CatalEx provided, including any prefixes. Ensure you added the record to the correct domain and that enough time has passed for DNS propagation. Use a tool like [MXToolbox TXT Lookup](https://mxtoolbox.com/TXTLookup.aspx) to confirm the record is visible.

**Can I remove a domain after adding it?**
Yes. Go to **Admin → Company Settings** and click **Remove** next to the domain. Removing a domain disables auto-join for that domain and new users with that email domain will no longer be added automatically. Existing members are not affected.

**Who is the OWNER and can it change?**
The person who creates the company is the OWNER. There is exactly one OWNER per company. Ownership can be transferred to another member from **Admin → Team (use the Make owner action)**.

**Does auto-join work retroactively?**
No. Auto-join only applies to users who sign up after it is enabled. Existing CatalEx users with matching email domains will need an invite to join.
