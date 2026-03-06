---
sidebar_position: 3
title: Company Settings
---

# Company Settings

Configure your company's identity, manage verified domains, and control how new users join your CatalEx workspace.

## Overview

Company Settings let ADMIN and OWNER users customize the organization's presence in CatalEx. You can update your company name, manage email domains, verify domain ownership via DNS, and configure auto-join so that new users with matching email addresses are added to your company automatically.

## How It Works

Every CatalEx company has a **name**, one or more **domains**, and an **auto-join** setting. Domains must be **verified** through DNS before they can be used for auto-join. Verification proves that your organization controls the domain, preventing unauthorized users from joining your workspace.

## Accessing Company Settings

1. Click **Admin** in the left sidebar (visible only to ADMIN and OWNER roles).
2. Select the **Company Settings** tab.

## Company Name

Your company name is the display name shown throughout CatalEx — in the sidebar, in user profiles, and in any shared content.

**To change your company name:**

1. Go to **Admin** > **Company Settings**.
2. Edit the **Company Name** field.
3. Click **Save**.

:::tip
Choose a name your team will recognize. This is a display name only and does not affect your account URL or billing.
:::

## Domain Management

Domains define which email addresses are associated with your company. For example, adding `company.com` means that users with `@company.com` email addresses belong to your organization. Verified domains are required for the [auto-join](#auto-join-configuration) feature.

### Adding a Domain

1. Go to **Admin** > **Company Settings**.
2. In the **Domains** section, click **Add Domain**.
3. Enter your domain (e.g., `company.com`).
4. Click **Add**.

The domain is added in an **unverified** state. You must complete DNS verification before it can be used for auto-join.

### DNS Verification Process

After adding a domain, CatalEx generates a unique verification code. You need to add this code as a DNS TXT record to prove you own the domain.

**Step-by-step:**

1. **Add the domain** in Company Settings (see above).
2. CatalEx generates a **unique verification code** (displayed on screen).
3. Log in to your **DNS provider** (e.g., Cloudflare, Route 53, GoDaddy, Namecheap).
4. Add a **TXT record** to your domain's DNS configuration with the verification code provided by CatalEx.
5. Return to CatalEx and click **Verify**.
6. CatalEx checks the DNS record. Once confirmed, the domain is marked as **Verified**.

:::info
DNS changes can propagate almost instantly, but in some cases propagation can take **up to 48 hours** depending on your DNS provider and TTL settings. If verification fails, wait and try again later.
:::

### Multiple Domains

You can add as many domains as your organization needs. For example, a company operating in multiple regions might add:

- `company.com`
- `company.co.uk`
- `company.de`

Each domain goes through its own independent verification process.

### Removing a Domain

To remove a domain, find it in the Domains list and click **Remove**.

:::warning
Removing a domain does **not** affect existing users who signed up with that email domain. They retain full access to CatalEx. Removing a domain only prevents **new** auto-join signups from that domain going forward.
:::

## Auto-Join Configuration

Auto-join controls whether users can join your company automatically based on their email domain.

| Setting | Behavior |
|---------|----------|
| **Enabled** | Any user who signs up with an email matching a **verified domain** is automatically added to your company as a **MEMBER**. No invitation required. |
| **Disabled** | Users must be explicitly invited by an ADMIN or OWNER. Signing up with a matching email domain has no effect. |

**To toggle auto-join:**

1. Go to **Admin** > **Company Settings**.
2. Find the **Auto-Join** toggle.
3. Enable or disable it.
4. Click **Save**.

:::tip
**Large organizations**: Enable auto-join for frictionless onboarding. Anyone with a verified company email can get started without waiting for an invite.

**Small or security-sensitive teams**: Disable auto-join to maintain tight control over who has access. Every new user must be individually invited.
:::

### How Auto-Join Works

1. A new user signs up for CatalEx with their work email (e.g., `jane@company.com`).
2. CatalEx checks if `company.com` is a **verified domain** for any company with **auto-join enabled**.
3. If a match is found, the user is automatically added to that company as a **MEMBER**.
4. If no match is found, the user is prompted to create a new company or wait for an invitation.

## Configuration Summary

| Setting | Where | Who Can Change |
|---------|-------|---------------|
| Company name | Admin > Company Settings | ADMIN, OWNER |
| Domains | Admin > Company Settings > Domains | ADMIN, OWNER |
| DNS verification | External DNS provider + CatalEx | ADMIN, OWNER |
| Auto-join | Admin > Company Settings | ADMIN, OWNER |

## FAQ

### How long does DNS verification take?

In most cases, verification succeeds within **a few minutes**. However, DNS propagation can take **up to 48 hours** depending on your DNS provider and the TTL (Time to Live) settings on your records. If verification fails on the first attempt, wait an hour and try again.

### Can I change my company name?

Yes. Go to **Admin** > **Company Settings**, edit the Company Name field, and click Save. The change takes effect immediately across the platform.

### What happens if I disable auto-join?

Existing users are **not affected** — they keep their accounts and access. Disabling auto-join only changes the behavior for **new signups**: users with matching email domains will no longer be added automatically and will need an explicit invitation.

### Can I have domains from different DNS providers?

Yes. CatalEx does not require your domains to use a specific DNS provider. Any domain where you can add a TXT record to the DNS configuration can be verified. You can mix providers freely — for example, `company.com` on Cloudflare and `company.co.uk` on Route 53.
