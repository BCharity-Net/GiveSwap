import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, X } from 'react-feather'
import { useURLWarningToggle, useURLWarningVisible } from '../../state/user/hooks'
import { isMobile } from 'react-device-detect'

const PhishAlert = styled.div<{ isActive: any }>`
  width: 100%;
  padding: 6px 6px;
  background-color: ${({ theme }) => theme.blue1};
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`

export const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

export default function URLWarning() {
  const toggleURLWarning = useURLWarningToggle()
  const showURLWarning = useURLWarningVisible()
  const { t } = useTranslation()

  return isMobile ? (
    <PhishAlert isActive={showURLWarning}>
      <div style={{ display: 'flex' }}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} /> {t('make-sure-the-url-is')}
        <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>GiveSwap.app</code>
      </div>
      <StyledClose size={12} onClick={toggleURLWarning} />
    </PhishAlert>
  ) : window.location.hostname === 'GiveSwap.app' ? (
    <PhishAlert isActive={showURLWarning}>
      <div style={{ display: 'flex' }}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} /> {t('always-make-sure-the-url-is')}
        <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>GiveSwap.app</code> -{' '}
        {t('bookmark-it-to-be-safe')}
      </div>
      <StyledClose size={12} onClick={toggleURLWarning} />
    </PhishAlert>
  ) : null
}
