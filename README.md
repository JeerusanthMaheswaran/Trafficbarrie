# Traffic Ticket Experts website

A static website for Traffic Ticket Experts (50 Essa Road, Barrie, ON). It focuses on Barrie, Innisfil and Bradford.

Files: `index.html`, `styles.css`, `main.js`, `reviews.js`, `thanks.html`. There is no build step. Host it on any static host (GitHub Pages, Netlify, etc.).

## Booking and ticket upload form
The form posts through [FormSubmit](https://formsubmit.co) straight to **trafficticketexperts@rogers.com**, including an optional photo of the ticket (up to 5 MB).
**One-time setup:** the first time the form is submitted from the live site, FormSubmit sends an activation email to that inbox. Click the link in that email to turn on delivery.

## Google reviews
Paste real reviews from the Google Business Profile into `reviews.js`, word for word. While the list is empty, the site shows "Read our Google reviews" buttons instead.
