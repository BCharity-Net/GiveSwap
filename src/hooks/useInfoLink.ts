import { ChainId } from 'giveswap-sdk'
import useNetworkType from './useNetworkType'

export const useInfoLink = (chainId?: ChainId): string => {
  const type = useNetworkType(chainId)
  const oldInfoLink = 'https://metisgive.gitbook.io/metisgive/products/giveswap'
  if (!chainId) return oldInfoLink
  // if (type === 'ETH') return 'https://eth-info.GiveSwap.app'
  // if (type === 'BSC') return 'https://bsc-info.GiveSwap.app'
  if (type === 'HECO') return 'https://info.moonswap.in/pair/0xc64092FB2028b4340BfcdA1D6bAa1332Da32c898'
  return oldInfoLink
}

export default useInfoLink
