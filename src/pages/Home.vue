
<script setup lang="ts">
import { TransactionResponse, parseEther } from 'ethers';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore } from '../store/basic';

const web3 = window.web3.web3
const wallet = window.web3.wallet
const provider = window.web3.provider

const router = useRouter()
const basicStore = useBasicStore()

onMounted(async () => {
  if (basicStore.isLocked || !wallet) {
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
  if (wallet) {
    const address = wallet.address

    const wei = await provider.provider.getBalance(address)
    const eth = weiToEth(wei)
    balance.value = eth

    const count = await provider.provider.getTransactionCount(address)
    txCount.value = count

    const txs = await getTransactions()
    transactions.value = txs.filter(t => !!t) as TransactionResponse[]
  }
}
const onRefresh = () => {
  refresh()
}

// private key of receiptor
const receiptor = ref<string>()
const amount = ref<number>()
const onSend = async () => {
  if (wallet && amount.value !== undefined && amount.value > 0) {
    try {

      const walletConnected = wallet.connect(provider.provider)
    
      const tx = {
        to: receiptor.value,
        value: parseEther(amount.value.toString()),
      };
      
      const transaction = await walletConnected.sendTransaction(tx);
      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
      console.log(`succeed`, transaction, receipt)
      await refresh()
    } catch (err) {
      console.error(`failed to send token`, err)
    }
  } else {
    alert('failed to send token because that either wallet is not ready, or amount is invalid')
  }
}

onMounted(() => {
  refresh()
})
</script>
<template>
  <div>
    <p>
    address: {{ wallet?.address }}
    <br/>
    hd path: {{ wallet?.path }}
    </p>
    <div>
      <button @click="onRefresh">refresh</button>
    </div>
    <p>
      balance: {{ balance }} ETH
    </p>
    <div class="flex flex-col gap-2">
      <h1>Send</h1>
      <label for="account">Send to</label>
      <input type="text" name="receiptor" placeholder="private key" v-model="receiptor"/>
      <label for="amount">Amount</label>
      <input type="number" name="amount" placeholder="input amount of EHT to send" v-model="amount"/>
      <button @click="onSend">Send</button>
    </div>
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