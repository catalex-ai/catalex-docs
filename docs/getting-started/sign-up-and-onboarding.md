---
sidebar_position: 1
title: Sign Up & Onboarding
---

# Sign Up & Onboarding

Welcome to CatalEx! This guide walks you through creating your account, verifying your email, and getting oriented on the platform for the first time.

## Overview

How you create your account determines whether you start a new company or join one that already exists:

- **Register a new company** — Use the **Register** tab on the login page. You'll enter a company name, your details, and a password, then verify your email. You become the **OWNER** of a brand-new workspace.
- **Join an existing company** — Open the **invite link** a teammate sends you and set a password. You join their company with the role they assigned, and you're signed in right away (no separate email verification step).

You can sign in with email and password, **Google**, or **SSO**.

## How It Works

### Step 1: Choose Your Sign-Up Method

| Method | Best For | Details |
|---|---|---|
| **Email & Password** | Users who prefer a dedicated CatalEx login | Enter your name, work email, and a strong password. |
| **Google SSO** | Users with Google Workspace accounts | Click **Sign in with Google** and authorize CatalEx. Your name and email are pulled from your Google profile automatically. |

:::tip
If your organization already uses Google Workspace, Google SSO is the fastest way to get started. It also means one fewer password to manage.
:::

### Step 2: Verify Your Email

After signing up with email and password, CatalEx sends a verification email to the address you provided.

1. Open your inbox and look for an email from **CatalEx** with the subject line "Verify your email address."
2. Click the verification link in the email.
3. You will be redirected to CatalEx and your account will be activated.

:::warning
You must verify your email before you can log in and use CatalEx. If you do not see the verification email, check your spam or junk folder. You can request a new verification link from the login page.
:::

:::info
If you sign up using Google SSO, your email is verified automatically through Google. No additional verification step is needed.
:::

### Step 3: Log In for the First Time

Once your email is verified, log in using the method you chose during sign-up (email/password or Google SSO). CatalEx uses JWT-based authentication to keep your session secure.

### Step 3a: New company owners — verify your domain

If you registered a new company, an admin (you) should verify ownership of your email domain. CatalEx shows a **TXT record** to add to your domain's DNS; once it propagates, click **Verify Domain**. You can also **Skip for now** and do it later. See [Setting Up Your Company](./setting-up-your-company.md).

### Step 4: Land in Studio

After signing in, you arrive in **[Studio](../features/studio.md)** — the home of CatalEx, where you build and run agents. From here you can:

- **Build your first agent** by describing it in plain English or starting from a template.
- **Connect data sources** on the [Knowledge](../features/knowledge.md) page so CatalEx can search your documents and conversations.
- **Connect tools** on the [Tools](../features/tools.md) page so your agents can take actions.

> Joining an existing company? If the company enabled **auto-join** for a verified domain, anyone whose email matches that domain is added automatically at sign-up — no invite needed.

## Configuration

No additional configuration is required at the sign-up stage. Personal settings such as display name and theme are available in **[Preferences](../administration/preferences.md)** (via the profile menu) after login.

## FAQ

**Can I sign up with a personal email address?**
Yes, but you will not benefit from domain-based auto-join. Your company admin will need to send you an explicit invite if they want you in their workspace.

**I did not receive the verification email. What should I do?**
Check your spam or junk folder first. If it is not there, return to the login page and click **Resend verification email**. Make sure you entered the correct email address during sign-up.

**Can I switch from email/password to Google SSO later?**
If your CatalEx account email matches your Google account email, you can use Google SSO to log in going forward.

**What happens if I click an invite link but I already have an account?**
If you already have a CatalEx account, clicking the invite link will add you to the company with the assigned role. You do not need to create a new account.

**Is there a limit to how many companies I can join?**
Each CatalEx account is associated with one company at a time.
