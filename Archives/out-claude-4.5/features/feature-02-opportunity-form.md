# Feature 02: Opportunity Form

## Overview
Create a form for sales reps to add new opportunities to the pipeline with all essential details including client name, deal value, sales stage, and owner assignment.

## User Story
As a sales rep, I want to quickly add new opportunities to my pipeline so that I can track potential deals and ensure nothing falls through the cracks.

## UI Components

### Form Section
- **Section Header**: "Add New Opportunity" with CGI red accent
- **Form Container**: Clean white card with proper spacing

### Form Fields
1. **Client Name** (text input)
   - Label: "Client Name"
   - Placeholder: "Enter client or company name"
   - Required field
   
2. **Deal Value** (number input)
   - Label: "Deal Value ($)"
   - Placeholder: "0.00"
   - Required field
   - Format: Currency with 2 decimal places
   
3. **Sales Stage** (dropdown select)
   - Label: "Current Stage"
   - Options:
     - Lead
     - Qualified
     - Proposal
     - Negotiation
     - Closed Won
     - Closed Lost
   - Default: "Lead"
   
4. **Owner** (text input)
   - Label: "Opportunity Owner"
   - Placeholder: "Enter sales rep name"
   - Required field

### Action Buttons
- **"Add Opportunity"** button - Primary CGI red button
- **"Clear Form"** button - Secondary gray button

### Success Message
- Display green success banner when opportunity is saved
- Message: "✓ Opportunity added successfully!"
- Auto-dismiss after 3 seconds

## Data & Fields

### Opportunity Object Structure
```javascript
{
  id: "unique-id",           // Auto-generated UUID
  clientName: "string",      // Required, 1-100 chars
  dealValue: number,         // Required, positive number
  stage: "string",           // Required, one of predefined stages
  owner: "string",           // Required, 1-50 chars
  createdAt: "ISO-8601",     // Auto-generated timestamp
  updatedAt: "ISO-8601"      // Auto-generated timestamp
}
```

### Validation Rules
- **Client Name**: Required, minimum 2 characters, maximum 100 characters
- **Deal Value**: Required, must be positive number, allow decimals
- **Stage**: Required, must be one of the predefined stages
- **Owner**: Required, minimum 2 characters, maximum 50 characters

### Storage
- Store opportunities in localStorage under key: `crm_opportunities`
- Store as array of opportunity objects
- Persist across page refreshes

## Behavior & Interactions

### Form Submission
1. User fills out all required fields
2. User clicks "Add Opportunity" button
3. Validate all fields:
   - Show inline error messages for invalid fields
   - Highlight invalid fields with red border
4. If valid:
   - Generate unique ID and timestamps
   - Save to localStorage
   - Display success message
   - Clear form fields
   - Console log the saved opportunity
5. If invalid:
   - Show specific error messages
   - Keep focus on first invalid field

### Clear Button
1. User clicks "Clear Form" button
2. Reset all fields to default/empty values
3. Clear any validation error messages

### Field Validation
- Validate on blur (when user leaves field)
- Validate on form submission
- Show inline error messages below fields
- Use red text and red border for errors

## Visual Style Notes

### Form Styling
- White card background with subtle shadow
- CGI red accent bar at top of form
- Clear field labels in dark gray
- Input fields with light border, CGI red border on focus
- Proper spacing between fields (1rem)
- Responsive layout - stack on mobile

### Button Styling
- Primary button: CGI red background, white text, bold
- Secondary button: Light gray background, dark gray text
- Hover effects: Slightly darker shade and subtle lift
- Buttons side-by-side on desktop, stacked on mobile

### Error States
- Red border on invalid fields
- Red text for error messages (font-size: 0.875rem)
- Error icon (❌) before error text

### Success Message
- Green background (#4CAF50)
- White text, centered
- Slide down animation
- Auto-dismiss with fade out

## Testing Instructions

1. **Open the application** in a browser
2. **Navigate to the Opportunities section** (update nav to show form)
3. **Test empty submission**:
   - Click "Add Opportunity" without filling fields
   - Verify error messages appear for required fields
4. **Test invalid data**:
   - Enter single character in Client Name
   - Enter negative number for Deal Value
   - Verify validation errors appear
5. **Test valid submission**:
   - Fill all fields with valid data
   - Click "Add Opportunity"
   - Verify success message appears
   - Verify form clears after submission
6. **Test Clear button**:
   - Fill out form partially
   - Click "Clear Form"
   - Verify all fields reset
7. **Test persistence**:
   - Add an opportunity
   - Refresh the page
   - Open browser DevTools > Application > Local Storage
   - Verify `crm_opportunities` contains the saved data
8. **Test console**:
   - Verify no errors in console
   - Verify opportunity data is logged on successful save

## Implementation Notes
- Update the main content area to show the form when "Opportunities" nav is clicked
- Keep the welcome message for "Pipeline" nav
- Use native HTML5 form validation where possible
- Add custom JavaScript validation for business rules
- Generate IDs using timestamp + random number (or UUID function)
- Format currency display with $ and 2 decimal places
- Keep localStorage operations in the existing Storage utility
