# SuiENS Pay

Send SUI to any ENS name. The app resolves the Sui address from ENS text records (`com.sui.addr` or `sui`) and sends—no copy-paste.

Built for [HackMoney 2026](https://ethglobal.com/events/hackmoney2026) (ENS pool + Sui track).

## Run the app

```bash
npm install
cp .env.example .env.local   # optional until you deploy the contract
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Home** for the landing page and **Send SUI** for the payment form.

## Deploy the Move contract

**Exact steps** (prerequisites, build, publish, env): see **[contracts/sui_ens_pay/DEPLOY.md](contracts/sui_ens_pay/DEPLOY.md)**.

Short version:

1. Install [Sui CLI](https://docs.sui.io/build/install), fund a wallet, set active env (`sui client active-env`).
2. From `contracts/sui_ens_pay`: `sui move build` then `sui client publish --gas-budget 100000000`.
3. Copy the **Package ID** from the output.
4. In the app root: set `NEXT_PUBLIC_SUI_ENS_PAY_PACKAGE_ID=<Package ID>` in `.env.local`.
5. Restart the dev server. Payments will go through the contract and emit a `Payment` event.

Without the env var, the app still works using direct SUI transfer.

## How to test

Use an ENS name that has a Sui address in its text records. Add one at [app.ens.domains](https://app.ens.domains) if you own the name.

1. Open **Send SUI**, connect your Sui wallet (and optionally Ethereum).
2. Enter an ENS name (e.g. `yourname.eth`). The app shows the resolved Sui address when found.
3. Enter amount and click **Send Assets**. Approve in your Sui wallet.
4. If the contract is deployed, check the transaction on [Suiscan](https://suiscan.xyz/mainnet) for the `Payment` event.

## Tech

- Next.js 15, Tailwind, Framer Motion
- ENS: Wagmi `useEnsText` for `com.sui.addr` / `sui`
- Sui: @mysten/dapp-kit, Move contract in `contracts/sui_ens_pay`

## License

MIT
