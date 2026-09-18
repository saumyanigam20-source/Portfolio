---
title: KlearAssist – Conversational AI Assistant
slug: klearassist
company: KlearNow.AI
role: UX Designer (End-to-End)
platform: AI-powered Global Trade & Customs Platform
tools:
  - Figma
  - Notion
  - Claude.ai
  - ChatGPT
tags:
  - UI/UX
  - UX Research
  - Interviews
  - Product Design
  - UX Design
category: work
cover: /images/case-studies/klearassist/cover.png
source: https://worried-swim-808.notion.site/KlearAssist-Conversational-AI-Assistant-2f2114033635812db1bdfa1b4eb4986a
summary: An AI conversational assistant inside KlearNow’s enterprise platform, so users can navigate, retrieve data, and take actions in natural language instead of deep menus.
---

## Overview

KlearAssist is an AI-powered conversational assistant embedded inside KlearNow’s enterprise platform. It allows users to navigate the system, retrieve data, and perform actions using natural language instead of complex menus and manuals.

## Problem

KlearNow.AI is a powerful but highly complex platform used for global trade and customs operations. It consists of multiple modules such as:

- Administration
- Entity Management
- Finance & Billing
- Master Data
- Transactions
- Payments
- Shipment Tracking (KlearHub)

Users often struggled with:

- Finding the right data quickly
- Understanding where features were located
- Completing tasks without support or training

The system required significant onboarding, and even experienced users had to rely on documentation or internal support teams.

## Goal

Design KlearAssist, a conversational AI experience that:

- Lets users ask questions in natural language
- Provides contextual and accurate answers
- Guides users to perform system actions
- Reduces dependency on manuals and training

Instead of learning the system, users could simply talk to it.

## My Role

I worked as the UX designer responsible for:

- Conversation design and UX flows
- Information architecture across modules
- Response patterns and UI logic
- Error states and edge cases
- Interaction design for AI-driven actions

I collaborated with product managers and engineers to translate the PRD into a usable, scalable conversational interface.

## Users

### Primary users

- Super Admins
- Finance Managers
- Operations Managers
- Trade & Compliance Teams

### User needs

From research and product inputs, the most common user needs were:

- “Show me all active users”
- “When does my contract expire?”
- “How many credits do I have?”
- “Show shipments arriving this week”

Users wanted quick answers and actions without navigating deep menus.

## UX Challenge

Designing KlearAssist was not just about building a chatbot.

The main challenges were:

- The system spans 10+ enterprise modules
- Each module has different workflows and mental models
- The assistant had to understand user intent, fetch correct system data, and decide the right UI output format

KlearAssist needed to behave like a search engine, a dashboard, and a task execution layer — all at the same time.

## Design Process

### 1. Information architecture

I started by mapping all modules into a conversational structure:

| Module | Example user intent |
| --- | --- |
| Admin | “Show all users” |
| Finance | “Do I have overdue invoices?” |
| Entity | “Add a new sub-customer” |
| KlearHub | “Show active shipments” |

This helped define what the assistant should know and respond to.

![Information architecture mapping](/images/case-studies/klearassist/ia.png)

### 2. Conversation design

I translated system actions into natural language flows.

Instead of: Administration → User Management → Create User

KlearAssist says: “Sure! Let’s add a new user. Please select the user type.”

Each module was converted into intent patterns, follow-up questions, and action confirmations so the assistant felt human and helpful, not technical.

![Conversation mapping](/images/case-studies/klearassist/conversation.png)

### 3. Response pattern system

Not all responses should be plain text. I designed how answers appear on screen:

| Data type | UI pattern |
| --- | --- |
| Single value | Text |
| Summary | Card |
| Multiple records | Table |
| Alerts | Highlighted cards |
| Actions | Modal / side panel |

Examples:

- Contract expiry → Info card
- User list → Searchable table
- Overdue invoices → Red-highlighted table
- Add entity → Side modal form

This made KlearAssist feel like a smart UI controller, not just a chatbot.

## Key UX Flows

### Flow 1: User management

User: “Show me all users”

KlearAssist fetches system hierarchy, displays a sortable user table, and provides edit and deactivate actions.

Impact: reduced a 4-step navigation flow into a single conversational action.

### Flow 2: Finance insights

User: “Do I have any overdue invoices?”

KlearAssist shows invoice count, highlights overdue rows in red, and displays a “Make Payment” CTA.

Impact: turned financial risk into immediate visual insight.

## Error Handling & Edge Cases

Trust was critical for an AI-driven system. I designed human-readable error states for:

- Network failures
- Missing inputs
- Permission issues
- Invalid transactions

Example: “Your session has expired. Please log in again.”

Instead of technical errors, users received clear, actionable feedback.

## UX Principles Applied

### Progressive disclosure

Only show what the user needs now. Reveal advanced data on demand.

### Context awareness

Responses adapt based on user role, permissions, and current module.

### Visual hierarchy

- Critical data → Cards
- Large datasets → Tables
- Status → Color indicators
