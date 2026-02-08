# Deploy SuiENS Pay Move Contract

Exact steps to build, publish, and wire the contract to the app.

---

## 1. Prerequisites

- **Sui CLI** installed. If not:
  ```bash
  cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui
  ```
  Or use the [official install guide](https://docs.sui.io/build/install).

- **Sui wallet** with SUI for gas (mainnet or testnet).

- **Active Sui client** (mainnet or testnet). Check:
  ```bash
  sui client active-env
  sui client active-address
  ```
  Switch if needed:
  ```bash
  sui client switch --env mainnet
  # or
  sui client switch --env testnet
  ```

---

## 2. Contract Source (reference)

The contract lives in `sources/ens_payment.move`. Full source:

```move
module sui_ens_pay::ens_payment {
    use std::string::String;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// Event emitted when a payment is made via ENS
    public struct Payment has copy, drop {
        sender: address,
        recipient: address,
        amount: u64,
        ens_name: String,
    }

    /// Entry method to pay someone using an ENS name, logging the event on-chain.
    public entry fun pay(payment: Coin<SUI>, recipient: address, ens_name: String, ctx: &mut TxContext) {
        let amount = coin::value(&payment);
        let sender = tx_context::sender(ctx);

        event::emit(Payment {
            sender,
            recipient,
            amount,
            ens_name,
        });

        transfer::public_transfer(payment, recipient);
    }
}
```

- **Entry**: `pay(Coin<SUI>, address, String, &mut TxContext)` — takes a SUI coin, recipient address, ENS name string, and context.
- **Event**: `Payment { sender, recipient, amount, ens_name }` — emitted before transferring the coin.

---

## 3. Build

From the **contract directory** (this folder):

```bash
cd /path/to/twiti-app/contracts/sui_ens_pay
sui move build
```

If you see framework/rev errors, ensure Sui CLI matches the chain (mainnet/testnet). The `Move.toml` uses `rev = "framework/testnet"`; for mainnet you may need to change to the correct framework revision (see [Sui releases](https://github.com/MystenLabs/sui/releases)).

---

## 4. Publish

Still in `contracts/sui_ens_pay`:

```bash
sui client publish --gas-budget 100000000
```

- Use **mainnet** or **testnet** depending on where your app points (the frontend uses Sui mainnet by default).
- Copy the **Package ID** from the command output (it looks like `0x...`). You may also see **Published Objects** and **Created Objects**; the one you need is the **package ID** of the published module.

Example output:

```
Successfully verified dependencies on-chain against source.
----- Transaction Digest ----
...
----- Published Objects ----
 PackageID: 0x1234...abcd
```

Use that `PackageID` in the next step.

---

## 5. Wire the app

1. In the **app root** (`twiti-app`), copy the env example and set the package ID:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and set:
   ```
   NEXT_PUBLIC_SUI_ENS_PAY_PACKAGE_ID=0x1234...abcd
   ```
   (use the real Package ID from step 4).

3. Restart the dev server:
   ```bash
   npm run dev
   ```

Payments from the app will now go through `ens_payment::pay` and emit the `Payment` event on-chain.

---

## 6. Verify on explorer

1. Send a small amount from the app (Send SUI page) to an ENS name that has a Sui address.
2. Open the transaction link (Suiscan mainnet or testnet).
3. Confirm the transaction calls `ens_payment::pay` and that a `Payment` event (sender, recipient, amount, ens_name) is emitted.

---

## Summary

| Step | Command / action |
|------|-------------------|
| 1 | Install Sui CLI, fund wallet, set active env (`sui client active-env`) |
| 2 | (Optional) Review contract in `sources/ens_payment.move` |
| 3 | `cd contracts/sui_ens_pay && sui move build` |
| 4 | `sui client publish --gas-budget 100000000` → copy **Package ID** |
| 5 | Set `NEXT_PUBLIC_SUI_ENS_PAY_PACKAGE_ID=<Package ID>` in `twiti-app/.env.local` |
| 6 | Restart app and verify a payment on the explorer |
