import { Web3 } from 'web3'
import { Provider, HDNodeWallet } from 'ethers'

interface ProviderEntity {
  provider: Provider
  label: string
  isTestNetwork?: boolean
}

declare global {
  interface Window {
    web3:  {
      web3: Web3
      wallet?: HDNodeWallet
      provider: ProviderEntity
    }
  }
}