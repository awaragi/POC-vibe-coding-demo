# Feature 2: Opportunity Entry Form

## Overview
This feature introduces a form that allows sales representatives to add new opportunities to the CRM. The form will capture essential details such as the client's name, the value of the deal, the owner of the opportunity, and its initial stage in the sales pipeline.

## User Story
As a sales rep, I want to easily enter new opportunities with all the key details so that I can quickly add them to my pipeline and start tracking their progress.

## UI Components
- **Form Container:** A styled card to house the form elements, titled "Add New Opportunity".
- **Client Name Input:** A text field for the client's name.
- **Deal Value Input:** A number field for the deal's monetary value.
- **Opportunity Owner Input:** A text field for the name of the sales rep who owns the opportunity.
- **Stage Selector:** A dropdown (`<select>`) menu for the initial sales stage. Options include:
  - Lead
  - Qualified
  - Proposal
  - Negotiation
  - Closed Won
  - Closed Lost
- **Submit Button:** A button labeled "Add Opportunity" to submit the form.

## Data & Fields
- `clientName`: Text, required.
- `dealValue`: Number, required, must be a positive value.
- `owner`: Text, required.
- `stage`: Text, required, selected from the predefined list.

## Behavior & Interactions
- The form will be displayed within the main content area of the application.
- Upon clicking the "Add Opportunity" button, the form data will be captured.
- For this feature, the captured data will be logged to the browser's developer console as an object. (Data persistence will be added in a later feature).
- Basic client-side validation will be implemented to ensure all fields are filled before submission. An alert will notify the user if fields are missing.

## Visual Style Notes
- The form will be enclosed in a container with a white background (`#FFFFFF`) and a subtle box-shadow to give it a "card" appearance.
- Input fields and the select menu will have consistent padding, borders, and a modern look.
- The "Add Opportunity" button will use the primary CGI Red (`#CC0000`) as its background color with white text.

## Testing Instructions
1.  Open `out/project/index.html` in a web browser.
2.  Verify that the "Add New Opportunity" form is visible on the page.
3.  Attempt to click the "Add Opportunity" button without filling out the form. Confirm that an alert appears asking you to fill all fields.
4.  Fill in all the fields with sample data (e.g., Client: "Tech Corp", Value: "50000", Owner: "John Doe", Stage: "Lead").
5.  Click the "Add Opportunity" button.
6.  Open the browser's developer console (usually by pressing F12).
7.  Confirm that an object containing the exact data you entered is logged to the console.
