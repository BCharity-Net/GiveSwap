import { Currency, ETHER, Token } from 'goodswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'CURRENCY'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
