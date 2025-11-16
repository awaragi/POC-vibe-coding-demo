# Feature 1: App Shell and Foundation

## Overview
This feature establishes the basic HTML structure, CSS styling, and JavaScript file for the CRM application. It sets up the main layout, navigation, and the CGI-inspired color scheme (red, white, gray). This initial setup ensures a consistent and visually organized app from the start.

## User Story
As a user, I want to see a consistent and professionally styled application interface so that I can easily navigate and interact with the CRM.

## UI Components
- **Header:** A prominent header displaying the application title "CRM Opportunity Pipeline".
- **Main Content Area:** A central container where future components like forms and data tables will be rendered.
- **Basic Styling:** CSS rules for colors, fonts, and layout.
- **File Structure:** The initial `index.html`, `css/styles.css`, and `js/app.js` files.
- **Favicon:** A default favicon to prevent 404 errors in the browser console.

## Data & Fields
- None for this foundational feature.

## Behavior & Interactions
- The application loads with the defined visual theme.
- The layout is static, with no interactive elements at this stage.

## Visual Style Notes
- **Primary Color (CGI Red):** `#CC0000` for the header background and other key accents.
- **Text Color (Header):** `#FFFFFF` (white) for text within the header.
- **Background Color (Body):** `#F4F4F4` (light gray) for the main page background.
- **Content Background:** `#FFFFFF` (white) for card-based content areas.
- **Standard Text Color:** `#333333` (dark gray) for general text.
- **Typography:** A clean, modern sans-serif font family (e.g., Arial, Helvetica).

## Testing Instructions
1.  Open the `out/project/index.html` file in a web browser.
2.  Confirm the header is visible with the title "CRM Opportunity Pipeline" on a red background with white text.
3.  Verify the page has a light gray background.
4.  Check the browser's developer console to ensure there are no errors, particularly no "favicon.ico" 404 error.
