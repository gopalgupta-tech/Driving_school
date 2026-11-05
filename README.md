# Shukla Car Driving School — Static Website

A responsive, single-page website for Shukla Car Driving School, Kanpur, with two branch locations, monthly pricing, vehicle options, FAQs and an enquiry form that opens WhatsApp.

## Project structure

```text
shukla-driving-school/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── script.js
├── assets/
│   └── images/
└── README.md
```

## Before publishing

1. Open `js/config.js`.
2. Add the school's official WhatsApp number in international format, digits only. Example: `919876543210`.
3. Replace the demo car/road photographs with actual photographs of the school's WagonR, Tata Tigor and Brezza. Keep image filenames/paths updated in `index.html`.
4. Confirm that both branch addresses are accurate and that the listed monthly fees are current.
5. Replace `https://www.example.com/` in the structured data with the final website domain.
6. Add the official phone number, business email and social links once supplied.

## Run locally

No build tools, framework, database or server-side code are required.

- Double-click `index.html`, or
- Open the project folder in VS Code and use the Live Server extension.

For best testing, run it through a local static server so all browser features behave consistently.

## Features

- Responsive desktop, tablet and mobile layout
- Mobile navigation
- Monthly pricing cards:
  - WagonR — ₹2,500/month
  - Tata Tigor — ₹3,800/month
  - Brezza — ₹4,500/month
- Two branch address cards with Google Maps search links
- FAQ accordion
- Enquiry form that prepares a WhatsApp message
- Course CTA preselects the chosen car
- SEO title, description, Open Graph metadata and LocalBusiness structured data
- Accessible labels, semantic sections and reduced-motion support

## Important limitations

This is a static website. It does not store enquiries, process payments, create user accounts or provide an admin dashboard. The enquiry form opens WhatsApp; it does not submit data to a server. Direct WhatsApp functionality remains inactive until the official number is added to `js/config.js`.

The photos currently used are illustrative stock images and are not verified photographs of the school's actual vehicles. Replace them with genuine business photos before launch.
