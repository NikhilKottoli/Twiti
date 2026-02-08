import { useEnsText, useEnsAddress } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { normalizeEnsName } from '@/lib/utils'

/** ENS-specific hook: resolve Sui address from ENS text records (com.sui.addr or sui). */
export function useSuiAddressFromEns(name: string) {
    const normalized = normalizeEnsName(name)
    const hasValidFormat = Boolean(normalized && normalized.includes('.'))

    // ENS text record 'com.sui.addr' (primary)
    const { data: suiAddrText, isLoading: isLoadingText, isError: isErrorText } = useEnsText({
        name: normalized,
        key: 'com.sui.addr',
        chainId: mainnet.id,
        query: { enabled: hasValidFormat },
    })

    // ENS text record 'sui' (fallback)
    const { data: simpleSuiAddr } = useEnsText({
        name: normalized,
        key: 'sui',
        chainId: mainnet.id,
        query: { enabled: hasValidFormat && !suiAddrText },
    })

    const address = suiAddrText || simpleSuiAddr

    return {
        address: address ?? undefined,
        normalizedName: normalized,
        isLoading: isLoadingText,
        isError: isErrorText,
    }
}

/** ENS-specific hook: resolve Ethereum address from ENS name (for display/verification). */
export function useEnsResolvedAddress(name: string) {
    const normalized = normalizeEnsName(name)
    const { data: ethAddress } = useEnsAddress({
        name: normalized,
        chainId: mainnet.id,
        query: { enabled: Boolean(normalized && normalized.includes('.')) },
    })
    return { address: ethAddress ?? undefined, normalizedName: normalized }
}
