import { ChainId } from 'goodswap-sdk'

export const useNetworkType = (chainId?: ChainId): 'ETH' | 'BSC' | 'POLYGON' | 'OKTEST' | null => {
  const ethIds = [ChainId.MAINNET, ChainId.ROPSTEN, ChainId.RINKEBY, ChainId.GÖRLI, ChainId.KOVAN]
  const bscIds = [ChainId.BIANMAIN, ChainId.BIANTEST]
  const hecoIds = [ChainId.BIANMAIN, ChainId.BIANTEST]
  const oktest = [ChainId.BIANMAIN, ChainId.OKTEST]
  if (!chainId) return null
  if (ethIds.includes(chainId)) return 'ETH'
  if (bscIds.includes(chainId)) return 'BSC'
  if (hecoIds.includes(chainId)) return 'POLYGON'
  if (oktest.includes(chainId)) return 'OKTEST'
  return null
}

export default useNetworkType
