import { ChainId } from 'giveswap-sdk'
import useNetworkType from './useNetworkType'

export const useMiningLink = (chainId?: ChainId): string => {
  const type = useNetworkType(chainId)
  const oldLink = 'https://metisgive.netlify.app/pools'
  if (!chainId) return oldLink
  if (type === 'ETH') return 'https://moongive.netlify.app/pools'
  if (type === 'BSC') return 'https://moongive.netlify.app/pools'
  if (type === 'HECO') return 'https://moongive.netlify.app/pools'
  return oldLink
}

export default useMiningLink
