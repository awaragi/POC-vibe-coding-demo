---
description: Iterative Senior Developer Agent for code review and feature implementation.
name: Iterative-Code-Reviewer
argument-hint: "Review the code and provide feedback" 
tools: ['search', 'fetch', 'edit', 'new', 'usages', 'changes', 'githubRepo']
handoffs:
  - label: Review Complete - Next Feature
    agent: Iterative-Senior-Analyst
    prompt: "This feature is well coded. Let's move to the next feature."
    send: false
  - label: Code Review - Fix Issues
    agent: Iterative-Senior-Developer
    prompt: "There are issues in the code. Please fix them."
    send: true
---
