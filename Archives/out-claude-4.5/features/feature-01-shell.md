# Feature 01: Application Shell & Foundation

## Overview
Establish the base CRM application structure with CGI branding, including main layout, navigation, color scheme, typography, and project foundation.

## User Story
As a sales rep, I want to see a professional, branded application interface so that I have confidence in the tool and can easily navigate to different sections.

## UI Components
- **Header/Navigation Bar**:
  - CGI logo or "CGI CRM" branding on the left
  - Application title: "Sales Pipeline CRM"
  - Navigation links: "Pipeline", "Opportunities" (for future features)
  - Clean, professional header with CGI red accent
  
- **Main Content Area**:
  - Container for page content with proper spacing
  - Responsive layout that works on desktop and tablet
  
- **Footer** (optional):
  - Simple footer with copyright or version info

## Data & Fields
No data fields for this foundational feature - pure structure and styling.

## Behavior & Interactions
- Header remains fixed at top during scroll
- Navigation links highlight current page (prepare for routing)
- Responsive layout adjusts for different screen sizes

## Visual Style Notes

### CGI Brand Colors
- **Primary Red**: #E4002B (CGI brand red) - use for headers, primary buttons, accents
- **Dark Gray**: #2C2C2C - use for text and navigation
- **Light Gray**: #F5F5F5 - use for backgrounds
- **White**: #FFFFFF - use for cards and content areas
- **Border Gray**: #E0E0E0 - use for borders and dividers

### Typography
- Font family: Use system fonts (Segoe UI, Roboto, Arial, sans-serif)
- Header text: Bold, dark gray
- Body text: Regular weight, dark gray
- Button text: Bold, white on CGI red

### Layout
- Maximum content width: 1200px, centered
- Proper padding and margins for breathing room
- Card-based design with subtle shadows
- Professional, clean aesthetic

## Project Structure
Create the following structure in `/out/project/`:
```
/out/project/
  ├── index.html          # Main HTML file
  ├── css/
  │   └── styles.css      # Main stylesheet with CGI branding
  ├── js/
  │   └── app.js          # Main JavaScript file (basic setup)
  └── assets/
      └── favicon.ico     # Simple favicon (or use data URI to avoid 404)
```

## Testing Instructions
1. Open `index.html` in a web browser
2. Verify CGI red color (#E4002B) appears in header/branding
3. Verify header is clean and professional
4. Verify navigation elements are present
5. Verify no console errors (especially no favicon 404)
6. Verify layout is centered and responsive
7. Verify color scheme matches CGI branding

## Implementation Notes
- Use vanilla HTML, CSS, and JavaScript (no frameworks needed for this simple CRM)
- Keep code clean and well-commented
- Ensure mobile-responsive design
- Add a simple favicon (inline SVG data URI is fine) to prevent browser 404 errors
