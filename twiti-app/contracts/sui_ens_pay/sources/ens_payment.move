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
