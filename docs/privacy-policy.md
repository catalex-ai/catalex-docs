---
title: Privacy Policy
sidebar_label: Privacy Policy
slug: /privacy-policy
---

# Privacy Policy

**Effective Date:** March 10, 2026
**Last Updated:** March 10, 2026

CatalEx ("we", "us", or "our") operates the CatalEx platform at [console.catalex.co](https://console.catalex.co) and related services. This Privacy Policy describes how we collect, use, store, and protect your information when you use our AI-powered workplace intelligence platform.

---

## 1. Information We Collect

### 1.1 Account Information

When you create a CatalEx account, we collect:

- **Email address** (used as your unique identifier and for login)
- **Display name** (optional)
- **Profile image** (optional)
- **Company name** and company domain

### 1.2 Authentication Credentials

Depending on your sign-in method, we store:

- **Email and password**: Passwords are stored as one-way cryptographic hashes (bcrypt). We never store plaintext passwords.
- **Google OAuth**: We receive your email and name from Google. We do not store your Google password.
- **SSO/SAML/OIDC**: We receive an external identifier and email from your identity provider.

### 1.3 Connected Data Sources

When you connect third-party integrations, we access and index content from those services:

| Integration | Data Accessed | Credentials Stored |
|---|---|---|
| **Google Drive** | Documents you authorize (read-only) | OAuth refresh token |
| **Slack** | Messages from channels you select | Bot token and user token |
| **Jira** | Issues from selected projects | OAuth credentials |
| **GitHub** | Repository content you authorize | OAuth credentials |
| **Notion** | Pages from selected workspaces | OAuth credentials |
| **Confluence** | Pages from selected spaces | OAuth credentials |

You control which data sources are connected and can disconnect them at any time. Disconnecting a source deletes all indexed content from that source.

### 1.4 Content You Create in CatalEx

- **Chat messages** and conversation history with the AI assistant
- **Tasks** extracted from documents or created manually
- **Automations** and workflow configurations
- **Agent configurations** for custom MCP integrations

### 1.5 Usage Data

We collect limited operational data:

- **Last active timestamp** (when you last used the platform)
- **LLM token usage** (aggregate input/output token counts for billing and capacity planning)
- **Sync job history** (timestamps and status of data source synchronizations)

We do **not** use third-party analytics, advertising trackers, or behavioral tracking tools.

---

## 2. How We Use Your Information

We use collected information to:

- **Provide the service**: Index your documents, answer your queries, extract tasks, and run automations.
- **Process AI queries**: Send relevant document excerpts and your queries to our AI model provider to generate responses. See Section 5 for details.
- **Authenticate you**: Verify your identity and enforce access controls.
- **Send transactional emails**: Account verification, password resets, and team invitations. We do not send marketing emails.
- **Maintain and improve the platform**: Monitor system health, debug issues, and improve performance.

We do **not** sell your personal information to third parties.

---

## 3. Data Storage and Security

### 3.1 Infrastructure

- All data is stored on **Google Cloud Platform (GCP)** infrastructure.
- Databases are hosted in managed PostgreSQL instances with encryption at rest.
- Document embeddings are stored in vector databases for semantic search.
- File content is stored in GCP Cloud Storage with server-side encryption.

### 3.2 Authentication Security

- Passwords are hashed with **bcrypt** before storage.
- Authentication uses **JSON Web Tokens (JWT)** with 24-hour expiration.
- All API communication occurs over **HTTPS/TLS**.

### 3.3 Tenant Isolation

CatalEx is a multi-tenant platform. All data is strictly scoped to your company (tenant). Users in one company cannot access another company's documents, conversations, or configurations.

---

## 4. Data Sharing

We share your data only with the following categories of service providers, and only as necessary to operate the platform:

| Provider | Purpose | Data Shared |
|---|---|---|
| **Google Cloud Platform** | Infrastructure hosting | All platform data (encrypted at rest) |
| **Google Vertex AI (Gemini)** | AI model inference and embeddings | Document excerpts, user queries, conversation context |
| **Google Workspace APIs** | Integration sync | OAuth tokens to access your authorized content |
| **Slack API** | Integration sync | OAuth tokens to access your authorized channels |
| **SMTP provider** | Transactional email | Recipient email address and message content |

We do **not** share your data with advertisers, data brokers, or any parties not listed above.

---

## 5. AI and Large Language Model (LLM) Processing

CatalEx uses AI models to power its intelligence features. Here is how your data interacts with AI:

- **What is sent**: When you ask a question or trigger an automation, relevant document chunks (retrieved via semantic search) and your query are sent to our AI model provider.
- **Conversation context**: Recent chat history may be included to maintain conversational continuity.
- **No training on your data**: We use Google Vertex AI, which does **not** use customer data to train or improve its foundation models. Your data is processed for inference only and is not retained by the model provider beyond the API request lifecycle.
- **No sensitive attribute extraction**: We do not instruct AI models to extract or infer sensitive personal characteristics from your data.

---

## 6. Data Retention

| Data Type | Retention Period |
|---|---|
| Account and profile data | Retained while your account is active |
| Connected source content | Retained while the source is connected; deleted upon disconnection |
| Chat conversations | Retained while your account is active |
| Tasks and automations | Retained while your account is active |
| Sync job history | Retained for operational monitoring |
| Authentication tokens | Automatically expire (JWT: 24 hours) |

When data is deleted, it is soft-deleted (excluded from all queries and inaccessible) and subsequently purged from backups according to our backup retention schedule.

---

## 7. Your Rights and Choices

### 7.1 Access and Control

You can:

- **View and update** your profile information at any time via the CatalEx console.
- **Disconnect integrations** to stop syncing and delete indexed content from that source.
- **Delete conversations** and chat history.
- **Export your data** by contacting us at the address below.

### 7.2 Account Deletion

To request deletion of your account and all associated data, contact us at **privacy@catalex.co**. We will process deletion requests within 30 days.

### 7.3 Data Portability

You may request a copy of your personal data in a machine-readable format by contacting **privacy@catalex.co**.

### 7.4 Rights Under Applicable Law

Depending on your jurisdiction, you may have additional rights including:

- **Right to rectification** of inaccurate data
- **Right to restriction** of processing
- **Right to object** to certain processing activities
- **Right to lodge a complaint** with a supervisory authority

---

## 8. Cookies and Local Storage

CatalEx does **not** use tracking cookies. We use browser `localStorage` for:

- **Authentication token**: To keep you signed in (cleared on logout).
- **UI preferences**: Theme selection (light/dark mode) and panel states.
- **Session identifiers**: To maintain your active chat session.

No data stored in localStorage is shared with third parties.

---

## 9. Children's Privacy

CatalEx is a workplace productivity tool and is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children.

---

## 10. International Data Transfers

Your data may be processed in regions where Google Cloud Platform operates. We rely on GCP's data processing agreements and standard contractual clauses to ensure adequate protection for international data transfers.

---

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of material changes by posting a notice on the CatalEx platform or by email. The "Last Updated" date at the top of this page indicates when the policy was last revised.

---

## 12. Contact Us

If you have questions about this Privacy Policy or our data practices, contact us at:

**Email:** privacy@catalex.co
**Website:** [catalex.co](https://catalex.co)
