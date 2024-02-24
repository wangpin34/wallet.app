
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TransactionResponse } from 'ethers'
import { useBasicStore, useWalletStore } from '../store/basic';

const web3 = window.web3.web3
const provider = window.web3.provider

const router = useRouter()
const basicStore = useBasicStore()
const walletStore = useWalletStore()

onMounted(async () => {
  if (basicStore.isLocked || !walletStore.wallet) {
    router.push('/unlock')
  }
})

const balance = ref<string>()
const txCount = ref<number>()
const transactions = ref<TransactionResponse[]>([] as TransactionResponse[])

/*
  you cannot use the Etherscan API with Ganache. Etherscan is a block explorer for the live Ethereum network and it does not have access to your local Ganache network.

  Ganache is a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests. It is available as both a desktop application as well as a command-line tool.

  To get the transactions from Ganache, you can use the web3.js or ethers.js libraries. However, please note that Ganache does not support the txpool APIs, so you cannot get pending transactions directly.
 */

const getTransactions = async () => {
  let blockNum = await provider.provider.getBlockNumber()
  const transactions: string[] = []
  while(blockNum > 0) {
    const block = await web3.eth.getBlock(blockNum)
    const result = block.transactions as string[]
    transactions.push(...result)
    blockNum--
  }
  return Promise.all(transactions.map(hash => provider.provider.getTransaction(hash)))
}

const weiToEth = (wei: bigint) => {
  return parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2)
}

const refresh = async () => {
  if (walletStore.wallet) {
    const address = walletStore.wallet.getWallet().address

    const wei = await provider.provider.getBalance(address)
    const eth = weiToEth(wei)
    console.debug(`balance: ${eth}`)
    balance.value = eth

    const count = await provider.provider.getTransactionCount(address)
    console.debug(`tx count:${count}`)
    txCount.value = count

    const txs = await getTransactions()
    console.debug(`transactions: `, txs)
    transactions.value = txs.filter(t => !!t) as TransactionResponse[]
  }
}
const onRefresh = () => {
  refresh()
}
onMounted(() => {
  refresh()
})
</script>
<template>
  <div>
    <p>address: {{ walletStore.wallet?.getWallet()?.address }}</p>
    <div>
      <button @click="onRefresh">refresh</button>
    </div>
    <p>
      balance: {{ balance }} ETH
      <br/>
      
    </p>
    <div>
      transaction count: {{ txCount }}
      <hr/>
      <div class="w-100 grid grid-cols-3 gap-2">
        <span>from</span>
        <span>amount</span>
        <span>to</span>
      </div>
      <div v-for="t in transactions" class="w-100 grid grid-cols-3 gap-2">
        <span class="w-12 text-ellipsis overflow-hidden">{{t.from}}</span>
        <span>{{weiToEth(t.value)}} ETH</span>
        <span class="w-12 text-ellipsis overflow-hidden">{{t.to}}</span>
      </div>
    </div>
  </div>
</template>