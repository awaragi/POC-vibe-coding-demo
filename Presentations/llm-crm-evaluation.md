---
marp: true
theme: high-density
paginate: true
class: lead
---

<style>
@import 'high-density.css';
</style>

# 🧠 LLM Benchmark: CRM Code Generation (Vibe Edition)
### Speed & Flow matter most  
Pierre Awaragi — 2025

---

## 🎛️ Evaluation Priorities (Vibe-Weighted)

When pair-programming with an LLM, **latency kills flow**.  
We weight criteria accordingly:

| Criterion | Weight | What it means for vibe |
|---|---:|---|
| **Generation Speed** | **35%** | <60s per feature chunk keeps momentum; >3–5m breaks it |
| **Multi-Feature Capability** | **20%** | Parallelizing features = fewer context resets |
| **Code Quality** | **25%** | Clean, modular, maintainable without micro-tweaks |
| **Goal Comprehension** | **10%** | Understands intent, offers sane defaults |
| **Refactoring Overhead** | **10%** | Self-rewrites and retries that slow you down (negative) |

> Target flow: **first useful output < 30–60s**, full multi-file feature ≤ **3 min**.

---

## 🟣 Claude 4.5 — Vibe Summary

| Aspect | Observation |
|---|---|
| **Speed** | Fast, conversational cadence; rarely stalls |
| **Multi-Feature** | Handles multiple features without losing the thread |
| **Quality** | Modern UI, modular, clean and maintainable |
| **Comprehension** | Nails intent; offers strong defaults |
| **Refactoring Overhead** | Low — tends to get it right the first time |

**Vibe score:** **🔥🔥🔥🔥☆** (Excellent flow)

---

## 🔵 Gemini 2.5 — Vibe Summary

| Aspect | Observation |
|---|---|
| **Speed** | Quick, but a touch slower than Claude |
| **Multi-Feature** | Works on several features in parallel |
| **Quality** | Good, slightly less polished than Claude |
| **Comprehension** | Understands goals; suggests reasonable options |
| **Refactoring Overhead** | Moderate — occasional cleanup needed |

**Vibe score:** **🔥🔥🔥⭐☆** (Good flow)

---

## 🟢 GPT-5-1-Codex — Vibe Summary

| Aspect | Observation |
|---|---|
| **Speed** | **Very slow** — long generations; vibe breaker |
| **Multi-Feature** | **Resists** multi-feature analysis; one-track focus |
| **Quality** | Enterprise-grade but verbose with repetition |
| **Comprehension** | Understands requirements; heavy architecture bias |
| **Refactoring Overhead** | **High** — frequent self-refactors mid-stream |

**Vibe score:** **🔥⭐☆☆☆** (Flow frequently stalls)

---

## 🏆 Winner — **Claude 4.5** (Vibe-Weighted)

**Why Claude wins for code-vibing:**
- **Keeps momentum:** fast enough that you stay in the editor, not watching a spinner
- **Parallel feature handling:** fewer prompts, more progress
- **Low cleanup cost:** clean, modular code reduces context switches
- **Great defaults:** less micro-prompting, more building

---

## 📊 Weighted Results (Vibe Edition)

| Model | Speed (35%) | Multi-Feature (20%) | Quality (25%) | Comprehension (10%) | Refactor Overhead (10%) | **Total (100%)** |
|---|:---:|:---:|:---:|:---:|:---:|---:|
| **Claude 4.5** | 4.5 | 5.0 | 4.8 | 4.8 | 4.5 | **4.74** |
| **Gemini 2.5** | 4.0 | 4.5 | 4.2 | 4.5 | 3.8 | **4.23** |
| **GPT-5-1-Codex** | **1.0** | 2.0 | 4.3 | 4.5 | **2.0** | **2.66** |

> Codex’s **slow generation** and **high refactor overhead** tank the vibe despite solid raw capability.

---

## 🔑 Takeaways for “Vibe” Workflows

- **Speed is a UX feature**: anything >3–5 minutes destroys pairing energy  
- Prefer models that **ship usable drafts quickly** over those that chase perfection slowly  
- **Parallelize features** to amortize prompting overhead  
- Optimize for **low refactor cost**: cleanliness beats maximal “enterprise” scaffolding during ideation

---

## ✅ Recommendation

- **Default to Claude 4.5** for day-to-day code vibing and rapid prototyping  
