import { useEnsText } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export function useSuiAddressFromEns(name: string) {
    // Use wagmi to fetch the 'sui' text record
    // Or 'com.sui.addr' which is a common pattern for custom text records

    // Method 1: Fetch 'com.sui.addr'
    const { data: suiAddrText, isLoading: isLoadingText, isError: isErrorText } = useEnsText({
        name,
        key: 'com.sui.addr',
        chainId: mainnet.id,
        query: {
            enabled: Boolean(name && name.includes('.')),
        }
    })

    // Method 2: Fetch 'sui' text record (fallback)
    const { data: simpleSuiAddr } = useEnsText({
        name,
        key: 'sui',
        chainId: mainnet.id,
        query: {
            enabled: Boolean(name && name.includes('.') && !suiAddrText),
        }
    })

    // Method 3: Fetch 'description' just in case user put it there (for demo robustness)
    // Actually, let's stick to 'com.sui.addr' and 'sui'.

    const address = suiAddrText || simpleSuiAddr

    return {
        address,
        isLoading: isLoadingText,
        isError: isErrorText
    }
}
