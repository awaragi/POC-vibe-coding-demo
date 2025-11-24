# Demo Vibe - AI-Powered App Prototyping

A demonstration framework for rapid app prototyping using AI agents. This project showcases a structured approach to designing and implementing functional prototypes through guided discovery and automated development.

## Overview

This repository contains GitHub Copilot custom agent configurations and case studies for building demo-ready applications in minutes rather than days. Two distinct workflows are provided: an **iterative** approach for feature-by-feature development with fast feedback, and a **linear** approach for complete specification-driven development.

## Structure

- **.github/agents/** - GitHub Copilot custom agent configurations
  - `iterative-analyst.agent.md` - Feature-by-feature design and orchestration
  - `iterative-developer.agent.md` - Streaming feature implementation with live preview
  - `linear-analyst.agent.md` - Interactive discovery and complete specification generation
  - `linear-developer.agent.md` - Autonomous implementation from specifications
  
- **Cases/** - Example use cases and requirements
  - `crm-case-01.md` - CRM opportunity pipeline application
  
- **Presentations/** - Project presentations and demos
  - `vibe-coding-agent-demo.md` - Introduction to vibe coding methodology
  - `llm-crm-evaluation.md` - LLM benchmark for CRM code generation
  - `high-density.css` - High-density theme for Marp presentations
  
- **Archives/** - Example implementations from different LLMs
  - `out-claude-4.5/` - Claude 4.5 generated CRM application
  - `out-gemini-2.5/` - Gemini 2.5 generated CRM application
  - `out-gpt-5.1-codex/` - GPT 5.1 Codex generated CRM application

## Workflows

### Iterative Workflow (Feature-by-Feature)

The iterative workflow builds applications incrementally with fast visual feedback:

1. **Initial Setup**: Use the Iterative Analyst agent with a case file (e.g., `Cases/crm-case-01.md`)
2. **Foundation**: Analyst generates shell/foundation feature card in `/out/features/`
3. **Hand-off**: Manually hand off to Iterative Developer agent for implementation
4. **Implementation**: Developer implements in `/out/project/` with live preview
5. **Testing**: Developer provides testing instructions and waits for feedback
6. **Next Feature**: Hand back to Analyst, define next feature, repeat steps 3-5
7. **Iterate**: Continue until application is complete

**Best for**: Rapid prototyping with continuous feedback and visual validation

### Linear Workflow (Complete Specification)

The linear workflow creates a complete specification before implementation:

1. **Discovery Phase**: Use the Linear Analyst agent to interactively define app requirements
2. **Specification**: Analyst generates complete specification with implementation plan
3. **Hand-off**: Manually hand off to Linear Developer agent with specification
4. **Development**: Developer builds complete prototype (autonomous or phased mode)
5. **Preview & Test**: View and test the application in your browser

**Best for**: Well-defined projects where complete planning upfront is beneficial

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

- **Dual Workflows**: Choose between iterative (feature-by-feature) or linear (complete spec) approaches
- **Rapid Prototyping**: Go from concept to working demo in under 30 minutes
- **GitHub Copilot Integration**: Custom agents optimized for AI-assisted development
- **Structured Discovery**: Focused questions that define requirements efficiently
- **Streaming Implementation**: Real-time code generation with live preview
- **Zero Build Time**: Pure vanilla HTML/CSS/JavaScript for instant feedback
- **Demo-Ready Output**: Polished applications suitable for executive presentations

## Using the Agents

The custom agents are configured in `.github/agents/` and are automatically available in GitHub Copilot for VS Code or GitHub.com when working in this repository.

### Iterative Agents

**Iterative Analyst** - Start with a case file or description:
- Provide: `Cases/crm-case-01.md` or describe your app idea
- Agent asks about design preferences and generates feature cards
- Use handoff button to send features to Developer

**Iterative Developer** - Receives feature cards via handoff:
- Implements features with streaming output
- Auto-starts servers and opens browser preview
- Provides testing instructions and waits for feedback
- Use handoff button to return to Analyst for next feature

### Linear Agents

**Linear Analyst** - Collaborative specification creation:
- Answer focused questions about app requirements
- Agent generates complete specification document
- Use handoff button to send spec to Developer

**Linear Developer** - Autonomous or phased implementation:
- Receives specification via handoff
- Choose autonomous (full implementation) or phased (step-by-step) mode
- Builds complete prototype in `/out/project/`

## Example Implementations

The **Archives/** directory contains complete CRM application implementations generated by different LLMs, demonstrating the capabilities of various AI models:

- **Claude 4.5**: Fast, conversational generation with clean, modular code
- **Gemini 2.5**: Multi-feature handling with comprehensive implementations
- **GPT 5.1 Codex**: Advanced code generation with modern UI patterns

Each archive includes:
- Complete project files (`index.html`, `css/styles.css`, `js/app.js`)
- Feature cards documenting the development progression
- Working CRM opportunity pipeline application

These serve as reference implementations and benchmarks for comparing different LLM capabilities in vibe coding workflows.

## Presentations

To view the project presentations:

```bash
PORT=8880 npx @marp-team/marp-cli -s Presentations
```

Then open [http://localhost:8880](http://localhost:8880) in your browser.

Available presentations:
- **vibe-coding-agent-demo.md**: Introduction to vibe coding methodology and best practices
- **llm-crm-evaluation.md**: Comprehensive benchmark comparing LLMs for CRM code generation

## License

See LICENSE file for details.
