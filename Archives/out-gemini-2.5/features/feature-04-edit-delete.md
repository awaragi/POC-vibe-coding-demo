# Feature 4: Edit and Delete Opportunities

## Overview
This feature adds controls to each opportunity card, allowing users to edit existing details or delete an opportunity from the pipeline. Editing will be handled through a modal (pop-up) form, and deletion will require a confirmation step to prevent accidental data loss.

## User Story
As a sales rep, I want to be able to modify the details of an opportunity or remove it entirely so that I can keep my pipeline accurate and up-to-date.

## UI Components
- **Edit Button:** An "Edit" icon or button on each opportunity card.
- **Delete Button:** A "Delete" icon or button on each opportunity card.
- **Edit Modal:** A pop-up dialog that contains a form pre-filled with the selected opportunity's data.
- **Save Changes Button:** A button within the edit modal to save the updated information.
- **Cancel Button/Close Icon:** To close the edit modal without saving.
- **Confirmation Dialog:** A native `confirm()` dialog box that asks the user to confirm before deleting an opportunity.

## Data & Fields
- No new data fields. This feature will modify the existing opportunity objects in the `localStorage` array.

## Behavior & Interactions
- **Delete Action:**
    1. User clicks the "Delete" button on an opportunity card.
    2. A browser confirmation dialog appears (e.g., "Are you sure you want to delete this opportunity?").
    3. If the user confirms, the opportunity is removed from the `localStorage` array, and the card is removed from the UI.
    4. If the user cancels, nothing happens.
- **Edit Action:**
    1. User clicks the "Edit" button on an opportunity card.
    2. A modal window appears, displaying a form with the current data for that opportunity.
    3. The user modifies the data in the form and clicks "Save Changes".
    4. The corresponding opportunity object in `localStorage` is updated with the new data.
    5. The modal closes, and the opportunity card in the UI updates to reflect the new information.
    6. If the user clicks "Cancel" or closes the modal, no changes are saved.

## Visual Style Notes
- **Edit/Delete Buttons:** Small, unobtrusive icon buttons (e.g., a pencil for edit, a trash can for delete) positioned in the corner of the opportunity card.
- **Modal:** The modal will have a semi-transparent overlay to cover the background page content. The modal itself will be a styled card.
- **Button Styling:** Buttons within the modal will follow the existing application button styles.

## Testing Instructions
1.  Open `out/project/index.html` and add at least one opportunity.
2.  **Test Deletion:**
    - Hover over an opportunity card and click the "Delete" button.
    - A confirmation dialog should appear. Click "Cancel". The card should remain.
    - Click "Delete" again, then click "OK". The card should be removed.
    - Refresh the page and confirm the deleted card does not reappear.
3.  **Test Editing:**
    - Hover over an opportunity card and click the "Edit" button. A modal form should appear, pre-filled with the card's data.
    - Change the Client Name and Deal Value.
    - Click "Save Changes". The modal should close, and the card should update with the new information.
    - Refresh the page and confirm the edited information is correct.
    - Click "Edit" again, change the data, but this time click "Cancel". The card's data should not change.
