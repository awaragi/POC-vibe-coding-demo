# Demo Vibe - AI-Powered App Prototyping

A demonstration framework for rapid app prototyping using AI agents. This project showcases a structured approach to designing and implementing functional prototypes through guided discovery and automated development.

## Overview

This repository contains AI agent prompts and case studies for building demo-ready applications in minutes rather than days. The workflow separates design discovery from implementation, enabling efficient collaboration between product thinking and development execution.

## Structure

- **Agents/** - AI agent prompt templates
  - `analysis-agent-interactive.md` - Interactive discovery and specification generation
  - `implement-agent-interactive.md` - Autonomous implementation from specifications
  
- **Cases/** - Example use cases and requirements
  - `crm-case-01.md` - CRM opportunity pipeline application

## Workflow

1. **Discovery Phase**: Use the analysis agent to interactively define app requirements, screens, and user flows
2. **Specification**: Generate a detailed specification document with implementation steps
3. **Development Phase**: Use the implement agent to build the working prototype
4. **Preview & Test**: View the application in your browser (see preview instructions below)
5. Repeat 1-4

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
- **Structured Discovery**: Focused questions that define requirements efficiently
- **Step-by-Step Implementation**: Testable increments with clear validation
- **Demo-Ready Output**: Polished applications suitable for executive presentations

## AI Agent Prompts

### Analysis Agent Prompt

```
Please use the instructions in analysis agent file as your agent behavior and methodology. 
Follow those guidelines exactly to analyze and design the requirements specified in case file.
```

### Implementation Agent Prompt

```
You have two attached files: one contains the complete application specification with requirements
and implementation plan, the other contains your role as an implementation agent with setup questions 
and technical guidelines. Follow the agent instructions exactly to build the application described 
in the specification.
```

## Presentations

To view the project presentations:

```bash
PORT=8880 npx @marp-team/marp-cli -s Presentations
```

Then open [http://localhost:8880](http://localhost:8880) in your browser.

## License

See LICENSE file for details.
