import { HDNodeWallet, Mnemonic, Provider, ethers } from 'ethers'

const STORAGE_KEY = 'wallet'

export function loadJsonWallet() {
  return localStorage.getItem(STORAGE_KEY)
}

export function saveJsonWallet(json: string) {
  return localStorage.setItem(STORAGE_KEY, json)
}

export function importFromPhrase(phrase: string, path?: string) {
  const mnemonic = Mnemonic.fromPhrase(phrase)
  const wallet = HDNodeWallet.fromMnemonic(mnemonic, path)
  return wallet
}

export function importFromMnemonic(mnemonic: Mnemonic, path?: string) {
  return HDNodeWallet.fromMnemonic(mnemonic, path)
}

export function importFromEncryptedJson(
  json: string,
  password: string | Uint8Array
) {
  return ethers.Wallet.fromEncryptedJsonSync(json, password) as HDNodeWallet
}

export function createWallet(provider?: Provider | null) {
  const wallet = ethers.Wallet.createRandom(provider)
  return wallet
}
