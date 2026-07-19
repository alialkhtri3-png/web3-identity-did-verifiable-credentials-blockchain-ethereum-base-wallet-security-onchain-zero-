# SovereignLayer Technical Audit

Generated: Sat Jul 18 23:50:58 +03 2026

## Repository Structure
.
./assets
./backend
./identity
./identity/base-onchain-identity
./identity/identity-dashboard
./identity/identity-engine
./identity/saas

## Backend Files
./mailer.js
./server.js
./webhook-server.js

## Frontend Files
identity/base-onchain-identity/base-onchain-identity-v2/src/App.css
identity/base-onchain-identity/base-onchain-identity-v2/src/App.tsx
identity/base-onchain-identity/base-onchain-identity-v2/src/assets/react.svg
identity/base-onchain-identity/base-onchain-identity-v2/src/index.css
identity/base-onchain-identity/base-onchain-identity-v2/src/main.tsx

## Dependencies
{
  "type": "module",
  "dependencies": {
    "axios": "^1.18.1",
    "body-parser": "^1.20.3",
    "cbor-x": "^1.6.4",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "ethers": "^6.17.0",
    "express": "^4.22.2",
    "jsonwebtoken": "^9.0.3",
    "nodemailer": "^9.0.3"
  }
}
