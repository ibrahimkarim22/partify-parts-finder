# Partify Parts Finder

This is a vanilla HTML, CSS, and JavaScript project for the Partify Web Developer coding assessment.

The page lets a user choose a vehicle year, make, model, and product type. Once all fields are selected, the form finds the matching item from the provided data and sends the user to the correct Partify collection URL.

## What It Does

- Builds dropdown options from the provided data
- Filters each dropdown based on the previous selection
- Shows a match preview when a complete match is ready
- Redirects to the matching Partify collection page
- Includes a reset button to clear the form and start over

## Files

- `index.html` - page structure and form markup
- `styles.css` - layout and visual styling
- `data.js` - provided vehicle and product collection data
- `script.js` - dropdown filtering, match preview, reset, and redirect logic

## How To Run It

Open `index.html` in a browser.

No build tools, frameworks, backend, or install step are required.

## Live Demo

[View the live project](https://ibrahimkarim22.github.io/partify-parts-finder/)

## Notes

The dropdowns are data driven instead of hardcoded with individual vehicle combinations. This makes the form easier to update as the catalog grows, since adding more catalog rows would only require updating `data.js`.

The form uses cascading selections so each choice narrows the next set of available options: Year, Make, Model, and Product Type.
