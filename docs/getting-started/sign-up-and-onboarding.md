---
sidebar_position: 1
title: Sign Up & Onboarding
---

# Sign Up & Onboarding

Welcome to CatalEx! This guide walks you through creating your account, verifying your email, and getting oriented on the platform for the first time.

## Overview

CatalEx supports two ways to create an account: traditional email and password registration, or Google Single Sign-On (SSO). After signing up, you will verify your email address and either create a new company workspace or join an existing one.

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

### Step 4: Create a Company or Join an Existing One

After your first login, you have two paths:

#### Path A: Create a New Company

If you are the first person from your organization on CatalEx, select **Create a new company**. You will become the **OWNER** of the company workspace. See [Setting Up Your Company](./setting-up-your-company.md) for next steps.

#### Path B: Join an Existing Company

There are two ways to join a company that already exists on CatalEx:

- **Invite link** -- Someone with an ADMIN or OWNER role sends you a magic link via email. Click the link to join the company with the role they assigned. See [Inviting Your Team](./inviting-your-team.md) for details.
- **Auto-join** -- If the company has configured a verified domain and enabled auto-join, any user whose email matches that domain is automatically added to the company upon sign-up. No invite needed.

:::tip
Not sure if your company is already on CatalEx? Check with your IT team or manager. If auto-join is enabled for your domain, you will be added automatically when you create your account.
:::

### Step 5: Explore the Dashboard

On your first login to a company workspace, you will see:

- An **empty dashboard** with a welcome message.
- **Guided prompts** encouraging you to connect your first data source (Google Drive or Slack).
- A quick-start checklist to help you configure your workspace.

The dashboard will populate with insights and knowledge once data sources are connected and indexed.

## Configuration

No additional configuration is required at the sign-up stage. Account-level settings such as display name and password changes are available under **Profile Settings** after login.

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
