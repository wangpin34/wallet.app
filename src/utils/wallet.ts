import {
  HDNodeWallet,
  Mnemonic,
  Provider,
  Wallet,
  ethers,
  parseEther,
} from 'ethers'

const STORAGE_KEY = 'wallet'

export function loadJsonWallet() {
  return localStorage.getItem(STORAGE_KEY)
}

export function saveJsonWallet(json: string) {
  return localStorage.setItem(STORAGE_KEY, json)
}

export class QingWallet {
  private wallet: HDNodeWallet
  private provider?: Provider | null = null
  private accounts: HDNodeWallet[] = []
  constructor(wallet: HDNodeWallet, provider?: Provider) {
    this.wallet = wallet
    this.provider = provider
  }
  addAccount() {
    const account = ethers.Wallet.createRandom(this.provider)
    this.accounts.push(account)
    return account
  }
  getWallet() {
    return this.wallet
  }
  getAccounts() {
    return this.accounts
  }
  setProvider(provider: Provider) {
    this.provider = provider
  }

  async sendToken(amount: number, to: string) {
    const wallet = new Wallet(this.wallet.privateKey, this.provider)
    const tx = {
      to,
      value: parseEther(amount.toString()),
    }
    const transaction = await wallet.sendTransaction(tx)
    // Wait for the transaction to be mined
    const receipt = await transaction.wait()

    return { transaction, receipt }
  }

  static importFromPhrase(phrase: string) {
    const mnemonic = Mnemonic.fromPhrase(phrase)
    const wallet = HDNodeWallet.fromMnemonic(mnemonic)
    return wallet
  }
  static importFromEncryptedJson(json: string, password: string | Uint8Array) {
    return ethers.Wallet.fromEncryptedJsonSync(json, password) as HDNodeWallet
  }

  static createWallet(provider: Provider) {
    const wallet = ethers.Wallet.createRandom(provider)
    return wallet
  }
}
