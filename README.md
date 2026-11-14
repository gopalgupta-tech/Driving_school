# Shukla Car Driving School — Static Website

A responsive, single-page website for Shukla Car Driving School, Kanpur, with two branch locations, monthly pricing, vehicle options, a simulator section and an enquiry form that opens WhatsApp.

## Project structure

```text
Driving_school/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── images/        (logo, car photos, simulator image, hero video)
├── favicon-32.png
├── favicon-192.png
├── apple-touch-icon.png
└── README.md
```

## Before publishing

1. Open `js/main.js` and check `WHATSAPP_NUMBER` at the top (international format, digits only, e.g. `919876543210`).
2. Confirm that both branch addresses and phone numbers in `index.html` are accurate and that the listed monthly fees are current.
3. Make sure the car photos in `assets/images/` are real photos of the school's WagonR, Tata Tigor and Brezza.
4. Add the business email and social links once supplied.

## Run locally

No build tools, framework, database or server-side code are required. For best results (especially the hero video), serve the folder with a static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Features

- Responsive desktop, tablet and mobile layout, with a bottom navigation bar on phones
- Hero section with a background video and a mute/unmute button
- Monthly pricing cards:
  - WagonR — ₹2,500/month
  - Tata Tigor — ₹3,800/month
  - Brezza — ₹4,500/month
- Simulator section with Beginner/Advanced toggle and branch selector
- Two branch address cards
- Enquiry form that prepares a WhatsApp message; "Enquire Now" on a car preselects it
- Scroll-spy navigation, scroll-reveal animations and reduced-motion support
- SEO title, description, Open Graph metadata and LocalBusiness structured data
- Content Security Policy and accessible labels throughout

## Important limitations

This is a static website. It does not store enquiries, process payments, create user accounts or provide an admin dashboard. The enquiry form opens WhatsApp with a prefilled message; it does not submit data to a server.
