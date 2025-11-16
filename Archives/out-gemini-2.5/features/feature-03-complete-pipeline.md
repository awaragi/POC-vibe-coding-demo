# Feature 3: Kanban-Style Pipeline View

## Overview
This feature creates a visual, Kanban-style board to display sales opportunities. It introduces columns for each sales stage, and the opportunities added via the form will appear as cards in the corresponding column. This feature also implements data persistence using the browser's `localStorage`, so opportunities are not lost when the page is refreshed.

## User Story
As a sales rep, I want to see all my opportunities organized by sales stage in a visual pipeline so that I can easily track the progress of my deals and understand my overall pipeline health at a glance.

## UI Components
- **Pipeline Container:** A main container to hold the entire Kanban board, titled "Opportunity Pipeline".
- **Stage Columns:** A set of six columns, one for each sales stage: "Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", and "Closed Lost".
- **Column Headers:** Each column will have a header displaying the stage name.
- **Opportunity Cards:** Each opportunity will be represented as a draggable card within its stage column. The card will display the client name, deal value, and owner.

## Data & Fields
- The application will now store an array of opportunity objects in `localStorage`.
- Each opportunity object will be enhanced with a unique `id` for tracking.
- `id`: A unique identifier (e.g., timestamp or random string).
- `clientName`, `dealValue`, `owner`, `stage`: As defined in Feature 2.

## Behavior & Interactions
- **Data Persistence:** When a new opportunity is submitted, it is saved to an array in `localStorage`.
- **Dynamic Rendering:** On page load, the application reads the opportunities from `localStorage` and renders them as cards in the appropriate columns.
- **Real-time Update:** When a new opportunity is added, a new card is dynamically created and added to the correct column without requiring a page refresh.
- **Drag-and-Drop:** Users can drag an opportunity card from one stage column and drop it into another. This action updates the opportunity's `stage` property in `localStorage` and visually moves the card.

## Visual Style Notes
- The pipeline container will use a flexbox layout to arrange the columns horizontally, allowing for scrolling if needed.
- Each stage column will have a light gray background (`#ECECEC`) and a distinct header.
- Opportunity cards will have a white background, padding, and a subtle box-shadow to make them stand out.
- A "dragging" class will be applied to a card while it is being dragged, giving it a visual cue (e.g., reduced opacity).

## Testing Instructions
1.  Open `out/project/index.html`. The "Opportunity Pipeline" board should be visible below the form.
2.  The pipeline should initially be empty.
3.  Add a new opportunity (e.g., Client: "Innovate LLC", Value: "75000", Owner: "Jane Smith", Stage: "Qualified").
4.  Confirm that a new card appears instantly under the "Qualified" column with the correct details.
5.  Refresh the page. The card for "Innovate LLC" should still be present in the "Qualified" column.
6.  Add a second opportunity in a different stage (e.g., "Lead").
7.  Drag the "Innovate LLC" card from the "Qualified" column to the "Proposal" column.
8.  Verify the card moves to the "Proposal" column.
9.  Refresh the page again. Confirm that "Innovate LLC" is now in the "Proposal" column, proving the stage change was saved.
