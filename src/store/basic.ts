import { defineStore } from 'pinia'
import { QingWallet } from 'utils/wallet'
import { Provider, ethers } from 'ethers'

export const useBasicStore = defineStore('basic', {
  state: () => ({
    isLocked: true,
  }),
  actions: {
    setIsLocked(isLocked: boolean) {
      this.isLocked = isLocked
    },
  },
})

interface ProviderEntity {
  provider: Provider
  label: string
  isTestNetwork?: boolean
}

const defaultProvider: ProviderEntity = {
  provider: new ethers.JsonRpcProvider('http://127.0.0.1:7545'),
  label: '7545',
  isTestNetwork: true
}

export const useProviderStore = defineStore('provider', {
  state: () => ({
    provider: defaultProvider
  })
})

export const useWalletStore = defineStore('wallet', {
  state: () => {
    return { wallet: null as QingWallet | null }
  },
  actions: {
    setWallet(wallet: QingWallet | null) {
      this.wallet = wallet
    },
  },
})
