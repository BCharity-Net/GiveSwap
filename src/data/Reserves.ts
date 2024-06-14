import { Interface } from '@ethersproject/abi'
import { abi as IGiveSwapPair } from 'giveswap-core/build/contracts/IGiveSwapPair.json'
import { Currency, Pair, TokenAmount } from 'goodswap-sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../hooks'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface([...IGiveSwapPair])

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}

export function usePairs(
  currencies: [Currency | undefined, Currency | undefined][],
  removeDummy = false
): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId)
      ]),
    [chainId, currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  const dummyResults = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getDummy')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]
      const { result: dummies, loading: dummyLoading } = dummyResults[i]

      if (loading || dummyLoading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves || !dummies) return [PairState.NOT_EXISTS, null]
      let { reserve0, reserve1 } = reserves
      const [dummy0, dummy1] = dummies
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

      if (removeDummy) {
        reserve0 = reserve0.sub(dummy0)
        reserve1 = reserve1.sub(dummy1)
      }

      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
      ]
    })
  }, [results, dummyResults, tokens, removeDummy])
}

export function usePair(tokenA?: Currency, tokenB?: Currency, removeDummy = false): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]], removeDummy)[0]
}
