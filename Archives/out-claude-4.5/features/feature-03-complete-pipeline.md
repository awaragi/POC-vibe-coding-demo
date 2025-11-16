# Feature 03: Complete Pipeline View

## Overview
Build a comprehensive pipeline management system with three integrated views: (1) Dashboard with key metrics and statistics, (2) Kanban board with drag-and-drop functionality to move opportunities between sales stages, and (3) Data table with sorting, filtering, edit, and delete capabilities. Users can switch between views using tabs.

## User Story
As a sales rep, I want to visualize my pipeline in multiple ways - see summary metrics at a glance, organize deals on a kanban board, and review detailed information in a table - so that I can effectively manage my opportunities and make data-driven decisions.

## UI Components

### Tab Navigation
- Three tabs at top of Pipeline section:
  - **Dashboard** (default active) - Shows metrics and summary
  - **Board View** - Kanban-style visual board
  - **List View** - Data table with all opportunities
- Active tab highlighted with CGI red underline
- Clean, minimal tab design

### 1. Dashboard View

#### Summary Cards (Top Row)
- **Total Pipeline Value**: Show sum of all open opportunities (exclude Closed Won/Lost)
  - Large number display with $ formatting
  - CGI red accent
  
- **Total Opportunities**: Count of all opportunities
  - Large number with breakdown by stage
  
- **Win Rate**: Percentage of Closed Won vs total closed deals
  - Display as percentage with color indicator

#### Stage Breakdown Section
- Visual bar chart or progress bars showing:
  - Count of opportunities in each stage
  - Total value in each stage
  - Color-coded by stage (e.g., Lead=blue, Qualified=green, Proposal=yellow, Negotiation=orange, Closed Won=green, Closed Lost=gray)

#### Recent Activity
- List of last 5 opportunities added
- Show client name, value, and owner
- Click to view details

### 2. Board View (Kanban)

#### Stage Columns
- Six columns side-by-side (horizontal scroll on small screens):
  - Lead
  - Qualified
  - Proposal
  - Negotiation
  - Closed Won
  - Closed Lost

#### Column Headers
- Stage name in bold
- Count of opportunities in that stage
- Total $ value in that stage
- CGI red accent bar at top of column

#### Opportunity Cards
- White card with shadow in each column
- Display:
  - Client name (bold, larger text)
  - Deal value ($ formatted, prominent)
  - Owner name (smaller text)
  - Small "..." menu for edit/delete
- Draggable between columns
- Hover effect (slight lift and shadow)

#### Drag-and-Drop Behavior
- User can drag opportunity card to different column
- Visual feedback during drag (card becomes slightly transparent)
- Drop updates the opportunity's stage in localStorage
- Column counts and totals update automatically
- Smooth animations

#### Empty State
- If no opportunities in a column, show: "No opportunities"

### 3. List View (Data Table)

#### Filter/Search Bar
- Search box at top: "Search by client name or owner..."
- Filter dropdown: "Filter by Stage" (All, Lead, Qualified, etc.)
- Clear filters button

#### Data Table
- Columns:
  - **Client Name** (sortable)
  - **Deal Value** (sortable, $ formatted)
  - **Stage** (badge with color coding)
  - **Owner** (sortable)
  - **Created Date** (sortable, formatted)
  - **Actions** (Edit, Delete buttons)

#### Table Features
- Click column header to sort (ascending/descending)
- Show sort indicator (↑ ↓) on active column
- Alternating row colors for readability
- Hover effect on rows
- Responsive: stack on mobile

#### Edit Action
- Click Edit button to open inline edit mode OR modal
- Can modify all fields except ID and timestamps
- Save button (CGI red) and Cancel button
- Validate same as form
- Update localStorage and refresh views

#### Delete Action
- Click Delete button
- Show confirmation dialog: "Delete opportunity for [Client Name]?"
- Confirm/Cancel buttons
- Remove from localStorage and refresh views

#### Empty State
- If no opportunities match filter/search: "No opportunities found"
- Button to clear filters or add new opportunity

## Data & Fields

Uses existing opportunity structure from Feature 02:
```javascript
{
  id: "unique-id",
  clientName: "string",
  dealValue: number,
  stage: "string",
  owner: "string",
  createdAt: "ISO-8601",
  updatedAt: "ISO-8601"
}
```

## Behavior & Interactions

### Tab Switching
1. User clicks on Dashboard/Board/List tab
2. Hide other views, show selected view
3. Update active tab styling
4. Reload data for that view

### Dashboard Calculations
- Calculate metrics from localStorage on page load and after any changes
- Format currency with commas and 2 decimals
- Update automatically when opportunities change

### Board Drag-and-Drop
1. User clicks and holds on opportunity card
2. Card becomes draggable with visual feedback
3. User drags card to different column
4. On drop:
   - Update opportunity's stage field
   - Update updatedAt timestamp
   - Save to localStorage
   - Re-render board with new layout
   - Animate card to new position
5. Update column headers with new counts/totals

### List View Interactions
- **Search**: Filter table as user types (debounced)
- **Sort**: Click column header to toggle sort direction
- **Filter**: Select stage from dropdown to filter
- **Edit**: 
  - Click Edit button
  - Show edit form (inline or modal)
  - Validate inputs
  - Save changes to localStorage
  - Refresh table
- **Delete**:
  - Click Delete button
  - Show confirmation dialog
  - If confirmed, remove from localStorage
  - Refresh table

### Data Synchronization
- All three views read from same localStorage data
- Any change (edit, delete, drag-drop, new opportunity) updates localStorage
- After update, refresh all views to stay in sync
- Console log data changes for debugging

## Visual Style Notes

### Tab Styling
- Clean tabs with CGI red underline for active tab
- Smooth transition animations
- Light gray background for inactive tabs
- White background for active tab content area

### Dashboard Styling
- Summary cards in grid layout (3 columns on desktop, stack on mobile)
- Large, bold numbers for key metrics
- CGI red accents for important values
- Clean spacing between sections
- Stage breakdown with color-coded bars

### Board Styling
- Columns have equal width with fixed width per column (280px)
- Horizontal scroll if needed
- Column headers with CGI red top border
- Opportunity cards with subtle shadow, hover effect
- Smooth drag animation with cursor change
- Drop zones highlighted during drag

### List Styling
- Clean, professional table design
- Header row with slightly darker background
- Alternating row colors (#FFFFFF and #F9F9F9)
- Stage badges with colored backgrounds
- Action buttons (icon buttons or text links)
- Hover effect on rows
- Responsive table (horizontal scroll on mobile or stack columns)

### Color Coding for Stages
- **Lead**: Light blue (#2196F3)
- **Qualified**: Green (#4CAF50)
- **Proposal**: Yellow/Gold (#FFC107)
- **Negotiation**: Orange (#FF9800)
- **Closed Won**: Dark green (#388E3C)
- **Closed Lost**: Gray (#9E9E9E)

## Testing Instructions

### Dashboard Testing
1. Navigate to Pipeline (should show Dashboard by default)
2. Verify summary cards display with correct totals
3. Add several opportunities with different stages and values
4. Verify dashboard metrics update automatically
5. Check stage breakdown shows counts and values
6. Verify recent activity list shows last 5 opportunities

### Board View Testing
1. Click "Board View" tab
2. Verify all stage columns display
3. Verify opportunity cards appear in correct columns
4. **Test drag-and-drop**:
   - Drag a card from Lead to Qualified
   - Verify card moves to new column
   - Verify column counts update
   - Check localStorage (DevTools) - verify stage updated
5. Drag another card to Closed Won
6. Verify visual feedback during drag (transparency, cursor)
7. Add new opportunity and verify it appears in correct column
8. Test with many opportunities (5+ per column)

### List View Testing
1. Click "List View" tab
2. Verify table displays all opportunities
3. **Test sorting**:
   - Click "Client Name" header to sort
   - Click again to reverse sort
   - Try sorting by Deal Value and Created Date
4. **Test search**:
   - Type client name in search box
   - Verify table filters in real-time
   - Clear search, verify all show again
5. **Test stage filter**:
   - Select "Qualified" from dropdown
   - Verify only Qualified opportunities show
   - Select "All" to show everything
6. **Test edit**:
   - Click Edit button on an opportunity
   - Modify client name and deal value
   - Save changes
   - Verify table updates
   - Check other views (Board/Dashboard) also updated
7. **Test delete**:
   - Click Delete button
   - Verify confirmation dialog appears
   - Cancel - verify nothing deleted
   - Delete again and confirm
   - Verify opportunity removed from table
   - Check Board view - verify card removed

### Integration Testing
1. Add opportunity via form
2. Verify it appears in Dashboard, Board, and List
3. Edit opportunity in List view
4. Switch to Board view, verify changes reflected
5. Drag opportunity to new stage in Board
6. Switch to List view, verify stage updated
7. Check Dashboard metrics updated
8. Delete opportunity in List view
9. Verify removed from all views and localStorage

### Responsive Testing
1. Resize browser to mobile width
2. Verify tabs stack properly
3. Verify Dashboard cards stack vertically
4. Verify Board columns scroll horizontally
5. Verify List table is responsive (scroll or stack)

## Implementation Notes

### Drag-and-Drop Implementation
- Use native HTML5 Drag and Drop API
- Add `draggable="true"` to opportunity cards
- Implement dragstart, dragover, drop event handlers
- Store dragged opportunity ID during drag
- Update opportunity stage on drop
- Prevent default behavior to allow drop

### Performance Considerations
- Load opportunities from localStorage once on page load
- Cache in memory for all three views
- Only re-read localStorage after updates
- Use efficient DOM updates (update only changed elements)
- Debounce search input (300ms delay)

### Data Management
- Create helper functions:
  - `getAllOpportunities()` - Load from localStorage
  - `updateOpportunity(id, updates)` - Update and save
  - `deleteOpportunity(id)` - Remove and save
  - `getOpportunitiesByStage(stage)` - Filter by stage
  - `calculateMetrics()` - Get dashboard stats
- Use event system or callbacks to sync views after changes

### Code Organization
- Separate JavaScript modules/sections for:
  - Dashboard rendering
  - Board rendering and drag-drop
  - List rendering and interactions
  - Data management utilities
- Keep app.js organized with clear function separation

### Accessibility
- Ensure keyboard navigation works for tabs
- Add ARIA labels for drag-and-drop
- Ensure table is screen-reader friendly
- Add focus styles for all interactive elements
