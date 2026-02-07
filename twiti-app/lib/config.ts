import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Note: Replaced with valid process.env check or hardcoded public ID for demo
export const config = getDefaultConfig({
    appName: 'SuiENS Pay',
    projectId: '3fcc6bba6f1de962d911bb5b5c3dba68', // Public demo ID from RainbowKit
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
})

export const SUI_ENS_PAY_PACKAGE_ID = process.env.NEXT_PUBLIC_SUI_ENS_PAY_PACKAGE_ID || ''
