'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { SuiClientProvider, WalletProvider, createNetworkConfig } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { config } from '@/lib/config'
import '@rainbow-me/rainbowkit/styles.css'
import '@mysten/dapp-kit/dist/index.css'

const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl('localnet') },
    mainnet: { url: getFullnodeUrl('mainnet') },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    // Wrap everything carefully.
    // We use one QueryClient for both if possible, or separate.
    // Actually, Wagmi expects us to pass the QueryClientProvider explicitly?
    // In Wagmi v2, you just wrap with WagmiProvider (which accepts config) and QueryClientProvider.
    // DappKit also needs QueryClientProvider. They can share the client.

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
                    <WalletProvider>
                        <RainbowKitProvider theme={darkTheme()}>
                            {children}
                        </RainbowKitProvider>
                    </WalletProvider>
                </SuiClientProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
