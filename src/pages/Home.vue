
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
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
const refresh = async () => {
  if (walletStore.wallet) {
    const wei = await provider.provider.getBalance(walletStore.wallet.getWallet().address)
    const eth = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2)
    console.debug(`balance: ${eth}`)
    balance.value = eth
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
    <p>balance: {{ balance }} ETH</p>
  </div>
</template>