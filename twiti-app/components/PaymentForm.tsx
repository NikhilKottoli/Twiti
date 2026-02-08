'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ConnectButton as SuiConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { useSuiAddressFromEns } from '@/hooks/useEnsSuiResolver'
import { Transaction } from '@mysten/sui/transactions'
import { Loader2, ArrowRight, Check, X, ShieldCheck, Info } from 'lucide-react'

import { SUI_ENS_PAY_PACKAGE_ID } from '@/lib/config'

export function PaymentForm() {
    const [ensName, setEnsName] = useState('')
    const [amount, setAmount] = useState('')
    const [txSuccess, setTxSuccess] = useState<string | null>(null)

    // Hooks
    const currentAccount = useCurrentAccount()
    const { mutate: signAndExecuteTransaction, isPending: isTxPending } = useSignAndExecuteTransaction()

    // ENS Resolver (custom ENS hooks — not just RainbowKit)
    const { address: resolvedSuiAddress, normalizedName, isLoading: isEnsLoading } = useSuiAddressFromEns(ensName)

    const handleSend = async () => {
        if (!currentAccount || !resolvedSuiAddress || !amount) return

        try {
            const tx = new Transaction()
            // Convert SUI to MIST (1 SUI = 10^9 MIST)
            const amountMist = BigInt(Math.floor(parseFloat(amount) * 1_000_000_000))

            const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amountMist)])

            if (SUI_ENS_PAY_PACKAGE_ID) {
                tx.moveCall({
                    target: `${SUI_ENS_PAY_PACKAGE_ID}::ens_payment::pay`,
                    arguments: [
                        coin,
                        tx.pure.address(resolvedSuiAddress),
                        tx.pure.string(ensName)
                    ],
                })
            } else {
                tx.transferObjects([coin], tx.pure.address(resolvedSuiAddress))
            }

            signAndExecuteTransaction(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        console.log('Transaction success', result)
                        setTxSuccess(result.digest)
                    },
                    onError: (error) => {
                        console.error('Transaction failed', error)
                    }
                }
            )
        } catch (e) {
            console.error('Failed to construct transaction', e)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 pointer-events-none" />
            <div className="relative z-10 space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Send SUI via ENS</span>
                </h2>

                {/* Wallets: Ethereum (optional, for ENS resolution) + Sui (required to send) */}
                <div className="space-y-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Wallets</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[11px] text-gray-500 block">Ethereum (optional)</label>
                            <div className="min-h-[40px] flex items-center">
                                <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] text-gray-500 block">Sui (required to send)</label>
                            <div className="min-h-[40px] flex items-center">
                                <SuiConnectButton />
                            </div>
                        </div>
                    </div>
                </div>

                {!SUI_ENS_PAY_PACKAGE_ID && (
                    <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-500/20">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>Using direct transfer. Set <code className="text-amber-300/90">NEXT_PUBLIC_SUI_ENS_PAY_PACKAGE_ID</code> for full Sui contract integration (on-chain Payment events).</span>
                    </div>
                )}

                {/* Input: ENS Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Recipient (ENS Name)</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={ensName}
                            onChange={(e) => {
                                setEnsName(e.target.value)
                                setTxSuccess(null)
                            }}
                            placeholder="vatsak.eth"
                            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-white placeholder-gray-500"
                        />
                        <div className="absolute right-3 top-3">
                            {isEnsLoading ? (
                                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                            ) : resolvedSuiAddress ? (
                                <Check className="w-5 h-5 text-green-400" />
                            ) : ensName.length > 3 ? (
                                <X className="w-5 h-5 text-gray-600" />
                            ) : null}
                        </div>
                    </div>

                    <AnimatePresence>
                        {resolvedSuiAddress && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-green-400 flex items-center gap-1 bg-green-900/20 px-3 py-2 rounded-lg"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Resolved: {resolvedSuiAddress.slice(0, 6)}...{resolvedSuiAddress.slice(-4)}
                            </motion.div>
                        )}
                        {ensName.length > 3 && !resolvedSuiAddress && !isEnsLoading && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-xs text-yellow-500/80 bg-yellow-900/20 px-3 py-2 rounded-lg"
                            >
                                No 'com.sui.addr' record found.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input: Amount */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Amount (SUI)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-white placeholder-gray-500"
                    />
                </div>

                {/* Action Button */}
                <button
                    onClick={handleSend}
                    disabled={!currentAccount || !resolvedSuiAddress || !amount || isTxPending}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${txSuccess
                            ? 'bg-emerald-600'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25'
                        }`}
                >
                    {isTxPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing
                        </span>
                    ) : txSuccess ? (
                        <span className="flex items-center justify-center gap-2">
                            <Check className="w-5 h-5" /> Sent!
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Send Assets <ArrowRight className="w-5 h-5" />
                        </span>
                    )}
                </button>

                {/* Success Message */}
                <AnimatePresence>
                    {txSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
                        >
                            <p className="text-green-400 text-sm mb-1">Transaction Successful</p>
                            <a
                                href={`https://suiscan.xyz/mainnet/tx/${txSuccess}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-green-500/60 hover:text-green-400 underline"
                            >
                                View on Explorer
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
