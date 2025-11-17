# Feature 03: Opportunity Detail & Quick Edit

## Overview
Add a slide-in detail drawer that appears when clicking any opportunity card. The drawer surfaces full deal context, a quick edit form for key fields, a mini timeline, and actions to update or close the deal.

## User Story
As a sales rep, I want to click any opportunity and instantly review/edit its critical details so I can keep the pipeline accurate without leaving the board.

## UI Components
- Card Trigger: clicking any pipeline card opens the detail drawer, highlighting the selected card.
- Detail Drawer (right-side overlay, separate from the existing create form):
  - Header with client name, opportunity title, and stage badge.
  - KPI Row: deal value, probability, close date, owner pill.
  - Quick Edit Form Fields (pre-filled): stage select, probability slider, owner, close date, notes (multiline).
  - Timeline Section: static list of 3 recent milestone entries (date + note) for now.
  - Action Buttons: primary "Update Deal" (saves edits), secondary ghost "Mark Closed Won", tertiary ghost "Mark Closed Lost".
- Confirmation Toasts for updates and close actions.

## Data & Fields
- Reuse existing pipelineData entries; ensure each deal stores an `id` for lookup.
- Quick edit updates the selected object in memory and rerenders board counts.
- Close Won/Lost actions move the deal into the respective final stage list and adjust counts.
- Timeline entries can be stub data on each deal object (array of {date, text}).

## Behavior & Interactions
- Opening the detail drawer locks body scroll (independent from creation panel; both cannot be open simultaneously).
- Drawer stays synced with selected card; clicking a different card swaps content without closing.
- Form validation mirrors create form rules (future close date, probability 0-100, required owner/stage/value).
- Update button stays disabled until a change is detected relative to original values.
- Mark Closed Won/Lost confirms via toast and moves card immediately.
- Escape key or overlay click closes the detail drawer and removes card highlight.

## Visual Style Notes
- Detail drawer uses CGI slate background (`#1F1F24`) with white content cards, red accents for active stage and buttons.
- Use subtle motion when switching between opportunities (fade/slide content).
- Highlight the selected card with a red outline or glow while the drawer is open.

## Testing Instructions
1. Click different opportunity cards and confirm the detail drawer opens with correct data and card highlight.
2. Adjust probability or notes, hit "Update Deal"; verify the card reflects the new info and a toast appears.
3. Use "Mark Closed Won" and ensure the opportunity moves to the Closed Won column with counts updating.
4. Press Escape or the overlay to close the drawer and ensure body scroll resumes.
5. Confirm only one drawer (create vs. detail) can be open at a time.
