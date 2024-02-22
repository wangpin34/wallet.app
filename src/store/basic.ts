import { defineStore } from 'pinia'
import { QingWallet } from 'utils/wallet'

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
