# Feature 01: CGI-Branded Shell

## Overview
Establish the foundational CRM layout with CGI visual styling, including navigation, stage sidebar, primary pipeline canvas, and placeholder areas for future opportunity interactions.

## User Story
As a sales rep, I want to load the CRM workspace with clear navigation and pipeline sections so that I immediately understand where to view and manage opportunities.

## UI Components
- Top Navigation Bar: left-aligned CGI wordmark placeholder, centered app title "CGI Opportunity Pipeline", right-aligned user badge.
- Stage Sidebar: vertical list of sales stages (Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost) with status badges.
- Pipeline Canvas: responsive grid with empty state cards for each stage and messaging that encourages adding opportunities.
- Footer: concise help/contact text and links.
- Favicon: simple red square SVG/PNG to avoid missing-icon console warnings.

## Data & Fields
- Stage Labels (string, required, predefined list).
- Placeholder Opportunity Cards: title (string), owner (string), value (currency). Values can be static lorem data for now.

## Behavior & Interactions
- Navigation links and stage badges use `href="#"` placeholders.
- Pipeline cards respond to hover with subtle elevation (box-shadow) to preview interactivity.
- Layout scales down to a single-column stack on screens <768px; sidebar collapses into a horizontal stage scroller.

## Visual Style Notes
Apply CGI palette: primary red `#CC0633`, dark slate `#1F1F24`, light gray `#F5F5F7`, white accents, and subtle gradients for cards. Use bold typography (e.g., Inter or system sans) and generous spacing. Buttons and highlights use the primary red with white text; hovering should deepen the shade (`#A00428`).

## Testing Instructions
1. Open `/out/project/index.html` in a browser.
2. Confirm CGI colors are applied consistently across nav, sidebar, and cards.
3. Resize to mobile width to ensure sidebar collapses and content stays legible.
4. Check favicon loads without console warnings.
5. Hover over stage badges and cards to verify interactive states appear.
