import { ChainId } from 'giveswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.BIANMAIN]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
  [ChainId.BIANTEST]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
  [ChainId.HECOMAIN]: '0x27F2494c8828f1326EEee1630FdA48EAF6dD042e',
  [ChainId.HECOTEST]: '0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87',
  [ChainId.OKTEST]: '0x27F2494c8828f1326EEee1630FdA48EAF6dD042e',
  [ChainId.MOONRIVER]: '0xe05349d6fE12602F6084550995B247a5C80C0E2C',
  [ChainId.METISTEST]: '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
  [ChainId.METIS]: '0xc39aBB6c4451089dE48Cffb013c39d3110530e5C'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
