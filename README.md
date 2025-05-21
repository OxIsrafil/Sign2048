# 🟧 Sign2048

> A fully on-chain 2048 game powered by [Sign Protocol](https://sign.global) with wallet and Google login. Built for the Orange Dynasty community.

---

## 🔥 About the Game

**Sign2048** is a web-based version of the classic 2048 puzzle game, with a Web3 twist. Each game score is:
- Attested **on-chain** using [Sign Protocol](https://docs.sign.global).
- Stored in a backend database for leaderboard tracking.
- Linked to your **wallet** or **Google account** via [Privy](https://www.privy.io/).

---

## 🎮 How to Play

1. **Use arrow keys (⬅️ ⬆️ ➡️ ⬇️)** on desktop or **swipe** on mobile.
2. **Combine tiles** with the same number to create higher ones.
3. Reach **2048** and keep going if you want a higher score!
4. Once the board is full and no moves are left, **Game Over**.
5. Your **final score is recorded on-chain** (if logged in).

---

## 🚀 Features

- ✅ Web3 Login (Wallet + Google via Privy)
- ✅ On-chain attestation of scores (Sign Protocol)
- ✅ Real-time leaderboard (MongoDB + Express backend)
- ✅ Game-over animation & "Share to X" button
- ✅ Orange Dynasty themed UI

---

## 🧠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS, TypeScript
- **Auth**: Privy (Wallet + OAuth)
- **On-chain**: Sign Protocol SDK (`@ethsign/sp-sdk`)
- **Backend**: Node.js + Express + MongoDB
- **Deployment**: Vercel (frontend), Render (backend)

---

## 🛠️ Setup Instructions

### 🔧 Frontend Setup

```bash
git clone https://github.com/0xIsrafil/Sign2048.git
cd sign2048-frontend
yarn install
# Create a .env file with Privy and Sign credentials
yarn dev

## 🔗 Useful Links

[Sign Protocol Docs] (https://docs.sign.global/)
[Sign Scan (Attestations)](https://scan.sign.global/)
[Privy Auth] (https://docs.privy.io)
[BaseScan](https://basescan.org/)
[Next.js Docs](https://nextjs.org/docs)