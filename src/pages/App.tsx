import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn from './Earn'
import Manage from './Earn/Manage'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'

import Background from '../components/Background'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  return (
    <>
      <Background />
      <Suspense fallback={null}>
        <Route element={<GoogleAnalyticsReporter />} />
        <Route element={<DarkModeQueryParamReader />} />
        <AppWrapper>
          <URLWarning />
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Polling />
            <TopLevelModals />
            <Web3ReactManager>
              <Routes>
                <Route path="/swap" element={<Swap />} />
                <Route path="/claim" element={<OpenClaimAddressModalAndRedirectToSwap />} />
                <Route path="/swap/:outputCurrency" element={<RedirectToSwap />} />
                <Route path="/send" element={<RedirectPathToSwapOnly />} />
                <Route path="/find" element={<PoolFinder />} />
                <Route path="/pool" element={<Pool />} />
                <Route path="/best" element={<Earn />} />
                <Route path="/create" element={<RedirectToAddLiquidity />} />
                <Route path="/add" element={<AddLiquidity />} />
                <Route path="/add/:currencyIdA" element={<RedirectOldAddLiquidityPathStructure />} />
                <Route path="/add/:currencyIdA/:currencyIdB" element={<RedirectDuplicateTokenIds />} />
                <Route path="/create" element={<AddLiquidity />} />
                <Route path="/create/:currencyIdA" element={<RedirectOldAddLiquidityPathStructure />} />
                <Route path="/create/:currencyIdA/:currencyIdB" element={<RedirectDuplicateTokenIds />} />
                <Route path="/remove/:tokens" element={<RedirectOldRemoveLiquidityPathStructure />} />
                <Route path="/remove/:currencyIdA/:currencyIdB" element={<RemoveLiquidity />} />
                <Route path="/best/:currencyIdA/:currencyIdB" element={<Manage />} />
                <Route element={<RedirectPathToSwapOnly />} />
              </Routes>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </Suspense>
    </>
  )
}
