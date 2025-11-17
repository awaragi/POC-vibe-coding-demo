# Feature 02: Opportunity Entry Form

## Overview
Introduce an interactive slide-over form to capture new opportunity details directly from the pipeline view, with CGI-styled inputs, validation, and a confirmation toast. Data can remain in-memory for now.

## User Story
As a sales rep, I want to quickly enter client and deal details when an opportunity is identified so that my pipeline stays current.

## UI Components
- Trigger Button: existing "+ New Opportunity" button opens the form panel.
- Slide-Over Panel: right-aligned, full-height on desktop, modal overlay on mobile.
- Form Fields (stacked with floating labels):
  - Client Name (text, required)
  - Opportunity Title (text, required)
  - Deal Owner (text with dropdown suggestions, required)
  - Stage (select dropdown with stages list, required)
  - Deal Value (currency input, required, positive only)
  - Close Date (date picker, required, cannot be past date)
  - Probability (range slider 0–100%, required)
  - Notes (multiline textarea, optional)
- Footer Buttons: "Save Opportunity" (primary) and "Cancel" (secondary).
- Confirmation Toast: top-right toast confirming save (even if data just logs to console for now).

## Data & Fields
- Validation rules per field above.
- Form submission builds an object with the fields; for this stage, append to `pipelineData` in memory and rerender columns.
- Probability stored as integer percent; display with % symbol.
- Deal value stored as number; shown via existing currency formatter.

## Behavior & Interactions
- Clicking "+ New Opportunity" opens the panel and traps focus.
- Cancel or clicking the overlay closes the panel and resets the form.
- Save performs validation: show inline error text under invalid fields with CGI red color.
- On success: append to selected stage array, update counts, show toast, close panel.
- Disable the save button until all required fields pass validation.

## Visual Style Notes
- Panel background: white with subtle drop shadow; use CGI red for accents, action buttons, and error text.
- Inputs have rounded corners, light gray borders, and glow red on focus.
- Toast uses CGI red strip with slate body to feel on-brand.

## Testing Instructions
1. Load `out/project/index.html` in a browser.
2. Click "+ New Opportunity" to ensure the slide-over appears and focus moves to the first field.
3. Try submitting with empty required fields to confirm errors show and save stays disabled/enabled appropriately.
4. Enter valid data and save; verify the toast appears and the new card is added to the appropriate stage column with updated counts.
5. Refresh/reopen to confirm data resets (since persistence isn’t implemented yet).
