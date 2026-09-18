---
title: SSO Configuration
slug: sso-configuration
company: KlearNow.AI
role: Product Design
tags:
  - UI/UX
  - Product Design
  - UX Research
  - User Testing
category: work
cover: /images/case-studies/sso-configuration/cover.png
source: https://worried-swim-808.notion.site/SSO-Configuration-2f21140336358152a8a5f4efa52fa8ab
summary: End-to-end Single Sign-On setup for KlearNow admins — a self-serve, validated flow for SAML and OIDC so enterprise customers can connect their identity providers without engineering help.
---

## Project Overview

Designed the end-to-end Single Sign-On (SSO) configuration experience for administrators on the KlearNow platform. The goal was to enable enterprise organizations to easily set up, manage, test, and maintain SSO connections using industry-standard authentication protocols.

The solution focused on building a scalable, secure, and admin-friendly configuration flow, supporting both platform-level SSO and detailed OpenID Connect (OIDC) configuration within Auth0.

## Problem Statement

Enterprise customers required a reliable way to integrate their existing Identity Providers (IdPs) with KlearNow. The existing process was fragmented, highly technical, and lacked validation and error feedback, leading to:

- Failed SSO setups
- Increased dependency on engineering support
- Security risks from misconfiguration
- Poor admin experience for enterprise onboarding

## Goal

Design a self-serve SSO configuration tool that allows administrators to:

- Configure SSO without engineering help
- Validate connections before going live
- Support multiple IdPs and protocols
- Handle errors and edge cases clearly
- Safely manage and remove SSO connections

## Scope of Work

### 1. SSO configuration wizard

Designed a guided, step-by-step setup flow for enabling SSO at the tenant/organization level.

Key capabilities:

- Identity Provider selection: Microsoft Entra, Okta, Google Workspace, Custom SAML / OIDC
- Protocol configuration: SAML 2.0, OpenID Connect (OIDC)
- Metadata configuration: metadata upload or manual entry of IdP details

![SSO configuration screens](/images/case-studies/sso-configuration/screen-1.png)

![SSO configuration screens](/images/case-studies/sso-configuration/screen-2.png)

## Key Screens Designed

- SSO settings landing page (enabled / disabled state)
- IdP connection setup screen
- Domain verification flow
- Test connection and validation feedback
- Success and error confirmation states

## Advanced Configuration Options

Designed advanced enterprise controls including:

- Multiple IdP support per tenant
- Default role assignment rules
- Just-in-Time (JIT) user provisioning
- Session timeout settings
- Security policy controls

## OIDC Configuration Flow (Auth0)

Designed the OpenID Connect (OIDC) setup experience inside Auth0, focusing on correctness, validation, and recoverability.

### OIDC setup wizard

Step-by-step configuration flow with input screens for:

- Client ID
- Client Secret
- Issuer URL / Discovery endpoint
- Authorization endpoint
- Token endpoint
- Redirect URI
- Scope and claims mapping

Includes a test connection step with token validation and a final success summary screen.

## Error Handling & Validation States

Designed comprehensive system feedback for failure scenarios:

- Invalid credentials
- Discovery endpoint unreachable
- Token validation errors
- Redirect URI mismatch
- Timeout / connection failure
- Partial configuration warnings

Also included inline field-level validation and helper error messaging.

## Delete Flow & Connection Management

Designed safe deletion flows to prevent accidental lockouts.

### Delete states

- Delete confirmation modal with impact warning
- Dependency check (active users using this SSO)
- Soft delete vs permanent delete options
- Post-deletion success state
- Fallback authentication messaging
- Undo / recovery option (if supported)
