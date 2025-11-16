# Feature 5: Dashboard & Filtering

## Overview
This feature enhances the CRM by adding a high-level dashboard to display key pipeline metrics and a search bar to filter opportunities. The dashboard will provide an at-a-glance summary of the pipeline's health, while the search functionality will allow users to quickly find specific deals.

## User Story
As a sales manager or rep, I want to see a summary of my total pipeline value and the number of open deals, and I want to be able to quickly find specific opportunities so that I can better assess my performance and manage my work effectively.

## UI Components
- **Dashboard Card:** A new card displayed at the top of the main content area, titled "Dashboard".
- **Total Pipeline Value:** A display within the dashboard showing the sum of `dealValue` for all open opportunities (i.e., not "Closed Won" or "Closed Lost").
- **Open Opportunities Count:** A display showing the total number of open opportunities.
- **Search Bar:** A text input field, placed next to the "Add New Opportunity" button, with placeholder text like "Search by Client or Owner...".

## Data & Fields
- No new data fields will be stored. This feature will perform calculations and filtering on the existing opportunity data.

## Behavior & Interactions
- **Dashboard Metrics:**
  - The dashboard will automatically calculate and display the total value and count of all opportunities that are not in the "Closed Won" or "Closed Lost" stages.
  - These metrics will update in real-time whenever an opportunity is added, edited, deleted, or has its stage changed via drag-and-drop.
- **Search Filtering:**
  - As the user types into the search bar, the opportunity cards on the Kanban board will be filtered instantly.
  - The filtering is case-insensitive and should match the search term against both the `clientName` and `owner` fields.
  - Only cards that match the search term will remain visible.
  - If the search bar is cleared, all opportunities will become visible again.
  - The dashboard metrics will **not** be affected by the search filter; they will always reflect the total data.

## Visual Style Notes
- The dashboard will be a new `card` element, consistent with the existing UI.
- The metrics inside the dashboard will be displayed in a clear, easy-to-read format (e.g., large font size).
- The search bar will be styled to match the application's existing input fields.

## Testing Instructions
1.  Open `out/project/index.html`. A new "Dashboard" card and a search bar should be visible.
2.  Add several opportunities with different values and stages. Include at least one in "Lead", one in "Proposal", and one in "Closed Won".
3.  **Test Dashboard:**
    - Verify that the "Total Pipeline Value" on the dashboard correctly sums the values of the "Lead" and "Proposal" deals, but *excludes* the "Closed Won" deal.
    - Verify the "Open Opportunities" count is 2.
    - Drag the "Proposal" card to "Closed Lost". Confirm that both dashboard metrics decrease accordingly.
4.  **Test Filtering:**
    - Type the first few letters of a client's name into the search bar. Confirm that only the relevant opportunity card(s) remain visible on the board.
    - Clear the search bar. All cards should reappear.
    - Type the name of an owner. Confirm that only cards assigned to that owner are visible.
    - Verify that filtering does not change the numbers in the dashboard.
