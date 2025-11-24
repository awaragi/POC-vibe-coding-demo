# Demo Vibe - AI-Powered App Prototyping

A demonstration framework for rapid app prototyping using AI agents. This project showcases a structured approach to designing and implementing functional prototypes through guided discovery and automated development.

## Overview

This repository contains AI agent prompts and case studies for building demo-ready applications in minutes rather than days. The workflow separates design discovery from implementation, enabling efficient collaboration between product thinking and development execution.

## Structure

- **.github/agents/** - AI agent prompt templates
  - **Iterative Workflow Agents**
    - `iterative-analyst.agent.md` - Feature-by-feature discovery and orchestration
    - `iterative-developer.agent.md` - Streaming feature implementation with rapid testing
    - `iterative-code-review.agent.md` - Comprehensive code review with quality and security checks
  - **Linear Workflow Agents**
    - `linear-analyst.agent.md` - Complete app specification through interactive discovery
    - `linear-developer.agent.md` - Full implementation from specification document
  
- **Cases/** - Example use cases and requirements
  - `crm-case-01.md` - CRM opportunity pipeline application

- **Presentations/** - Project presentation materials
  - `vibe-coding-agent-demo.md` - Marp presentation on AI-assisted development best practices

## Workflows

This framework supports two complementary workflows:

### Iterative Workflow (Feature-by-Feature)

Build applications incrementally with fast visual feedback:

1. **Feature Discovery**: Iterative Analyst asks about the next feature and creates a feature card
2. **Implementation**: Iterative Developer implements the feature and provides testing instructions
3. **User Testing**: Test the feature in your browser and provide feedback
4. **Quality Check** (Optional): Use handoff buttons to choose:
   - **Code Review**: Iterative Code Reviewer examines code for quality, security, and best practices
   - **Next Feature**: Skip review and proceed directly to the next feature for rapid iteration
5. **Iterate**: Repeat steps 1-4 until the application is complete

**Best for**: Rapid prototyping with flexibility to balance speed and quality at each step.

### Linear Workflow (Complete Specification)

Define everything upfront, then implement:

1. **Discovery Phase**: Linear Analyst guides interactive discovery of all app requirements
2. **Specification**: Generate a complete specification document with implementation plan
3. **Development Phase**: Linear Developer builds the entire application from the spec
4. **Preview & Test**: View and test the completed application in your browser

**Best for**: Well-defined projects where requirements are clear from the start.

## Previewing Generated Applications

Generated applications are created in `/out/project/`. To preview them, use any of these methods:

### Option 1: Live Preview Extension (Recommended)
1. Install the "Live Preview" extension in VS Code
2. Right-click on `/out/project/index.html`
3. Select "Show Preview"
4. Changes auto-refresh as you develop

### Option 2: Python HTTP Server
```bash
cd /out/project
python3 -m SimpleHTTPServer 8000
```
Then open http://localhost:8000 in your browser

### Option 3: npx HTTP Server
```bash
cd /out/project
npx @compodoc/live-server -p 8000
```
Then open http://localhost:8000 in your browser

### Option 4: Direct File Opening
Simply open `/out/project/index.html` directly in Chrome or your preferred browser. Note that some features requiring CORS may not work with the `file://` protocol.

## Key Features

- **Rapid Prototyping**: Go from concept to working demo in under 30 minutes
- **Flexible Workflows**: Choose between iterative feature-by-feature or linear complete-spec approaches
- **Quality Assurance**: Built-in code review agent with comprehensive security and quality checks
- **Structured Discovery**: Focused questions that define requirements efficiently
- **Step-by-Step Implementation**: Testable increments with clear validation
- **Demo-Ready Output**: Polished applications suitable for executive presentations

## Agent Descriptions

### Iterative Workflow Agents

**Iterative Analyst** - Orchestrates feature-by-feature development:
- Creates focused feature cards stored in `/out/features/`
- Asks about next feature after each implementation
- Maintains incremental progress with fast feedback loops

**Iterative Developer** - Implements features with streaming mode:
- Reads feature cards and implements in `/out/project/`
- Provides clear testing instructions after each feature
- Offers handoff options: code review or next feature

**Iterative Code Reviewer** - Ensures code quality and security:
- Comprehensive 6-part review: functionality & correctness, code quality & maintainability, security, performance, user experience, and best practices
- Provides severity-based feedback (Critical 🔴, Important 🟡, Suggestions 🟢)
- Balances thoroughness with rapid prototyping needs

### Linear Workflow Agents

**Linear Analyst** - Complete upfront specification:
- Interactive discovery process (< 10 questions, < 10 minutes)
- Generates detailed specification document in `/out/`
- Defines all screens, data, and implementation steps

**Linear Developer** - Full implementation from spec:
- Builds complete application in autonomous or phased mode
- Uses vanilla HTML/CSS/JavaScript for zero build time
- Provides executable commands and automated testing

## Presentations

To view the project presentations:

```bash
PORT=8880 npx @marp-team/marp-cli -s Presentations
```

Then open [http://localhost:8880](http://localhost:8880) in your browser.

## License

See LICENSE file for details.
