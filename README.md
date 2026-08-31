# Sesan Website

Official web platform for **Sesan App**, focused on Cambodia's agriculture community, knowledge sharing, and digital learning.

Production website: https://about.sesanshop.com

## Main Features

- Sesan public information and landing pages
- Khmer and English localization
- Agriculture Knowledge articles
- Knowledge Admin publishing tools
- Sesan Academy course marketplace
- Creator application and dashboard
- Course review and administration
- My Learning and protected lesson access
- Course ratings
- ABA PayWay checkout integration
- Manual payment review flow
- Privacy Policy and Terms pages

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl
- Firebase / Firestore
- ABA PayWay integration

## Project Structure

```text
app/
  [locale]/
    academy/      # Academy, creator, learning and lesson pages
    admin/        # Admin tools
    knowledge/    # Public knowledge content
    privacy/      # Privacy Policy
    terms/        # Terms
  api/
    academy/      # Academy access, payment and rating APIs
lib/              # Firebase, Academy and PayWay helpers
i18n/             # Localization configuration
public/           # Static assets
```

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Environment Configuration

The website uses environment variables for Firebase, Academy services, and ABA PayWay. Keep credentials and private keys in the deployment environment and never commit secrets to this repository.

## Deployment

The production site is deployed from the `main` branch. Before deployment, verify that the production environment variables are configured and run the build and lint checks.

## Repository

Repository: `klartdean-stack/about-sesan`

Default branch: `main`

---

© Sesan. All rights reserved.
