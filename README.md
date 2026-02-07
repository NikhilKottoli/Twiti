# SuiENS Pay

**SuiENS Pay** is a concept application built for the **Sui Hackathon** that bridges the gap between Ethereum's identity layer and Sui's high-performance DeFi layer. It allows users to send SUI tokens directly to any ENS (Ethereum Name Service) name by resolving the associated Sui address from the ENS records.

![SuiENS Pay](https://github.com/MystenLabs/sui/raw/main/doc/assets/sui-logo.svg) <!-- Ideally upload a screenshot of the app here -->

## 🚀 Concept

On most platforms, you have to copy-paste long, error-prone wallet addresses (e.g., `0x123...abc`). On Ethereum, ENS solves this by allowing users to use human-readable names like `vatsak.eth`. 

**SuiENS Pay** extends this utility to the Sui network. It checks if an ENS name has a Sui address stored in its text records (specifically `com.sui.addr` or `sui`) and allows you to seemingly "send SUI to an ENS name".

## ✨ Features

- **ENS Resolution on Sui**: Automatically fetches and resolves Sui addresses from ENS text records using `wagmi` and `viem`.
- **Sui Wallet Integration**: Connect your Sui wallet using the `@mysten/dapp-kit` to sign and execute payments.
- **Dual-Chain Identity**: Connect your Ethereum wallet (via RainbowKit) to verify ownership of the ENS name (optional but recommended for UX).
- **Premium UI**: A polished, dark-mode interface built with Tailwind CSS and Framer Motion, featuring smooth animations and glassmorphism.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Sui Integration**: [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) & [@mysten/sui](https://sdk.mystenlabs.com/typescript)
- **Ethereum/ENS**: [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), [RainbowKit](https://www.rainbowkit.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed.
- A Sui Wallet extension (e.g., Sui Wallet).
- An Ethereum Wallet extension (e.g., MetaMask).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/twiti-app.git
   cd twiti-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 How to Test

1. **Connect Wallet**: Connect your Sui Wallet using the button in the top right.
2. **Enter Recipient**: Type an ENS name that has a Sui address record.
   - *Example*: if `vatsak.eth` has a text record `com.sui.addr` = `0x...sui_address`.
3. **Resolve**: The app will automatically query the ENS registry on Ethereum Mainnet (via public RPC) and display the resolved Sui address.
4. **Send**: Enter an amount and click "Send Assets".
5. **Confirm**: Approve the transaction in your Sui Wallet.

## 📄 License

This project is open-source and available under the MIT License.
