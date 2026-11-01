# Workflow experience

Design system for the experience of workflows in which the work is automated.

Static site with no build step. Vercel serves the repository root; `vercel.json` sends every path to `index.html`, and `app.js` renders the page from `nav.js`.

- `nav.js` holds the navigation tree and the content of each page.
- `styles.css` holds the design tokens and layout.
- `app.js` holds the navigation, routing and theme switch.

To run locally: `npx serve -s .`
