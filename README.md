# Multi-vendor marketplace web

Multivendor marketplace frontend website build with [Next.js](https://nextjs.org/).

This project is a frontend part of [Multi-vendor marketpalce backend](https://github.com/phyohtetarkar/marketplace-backend/)

## Setup and run

Required `.env.local` file properties.

```ini

NEXT_PUBLIC_APP_NAME=Marketplace

NEXT_PUBLIC_APP_DESCRIPTION=Multi-vendor marketplace ecommerce website

NEXT_PUBLIC_CONTACT_LOCATION=Yangon, Myanmar

NEXT_PUBLIC_CONTACT_EMAIL=yoursitename@domain.com

NEXT_PUBLIC_BASE_URL= # http://localhost:3000 or (http|https)://yourdomain.com

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_MAP_API_KEY=

NEXT_PUBLIC_API_URL= # backend api url
```

You can modify bootstrap scss file in `/styles/scss/bootstrap-custom.scss` and then compile

```bash
npm run sass
```