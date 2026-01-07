# Digital Wallet & Transaction API

A backend service that handles wallet operations such as deposits, withdrawals, and peer-to-peer transfers with strong data consistency guarantees.

## Overview
This API simulates the core logic behind digital wallets used in fintech systems. It focuses on **transaction safety**, ensuring balances are always accurate even under concurrent requests.

## Key Features
- Wallet creation and balance management
- Deposits and withdrawals
- Peer-to-peer transfers between users
- Atomic transactions to prevent double spending
- Centralized transaction history

## Technical Highlights
- Uses **MongoDB ACID transactions** to ensure all wallet updates are consistent
- Prevents race conditions during concurrent transfers
- Clean service-layer architecture for business logic

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started
```bash
git clone https://github.com/Nngozii/fintech-wallet-service.git
cd digital-wallet-api
npm install
npm start

