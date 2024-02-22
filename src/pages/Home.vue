
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore, useWalletStore } from '../store/basic';

const router = useRouter()
const basicStore = useBasicStore()
const walletStore = useWalletStore()
onMounted(async () => {
  if (basicStore.isLocked || !walletStore.wallet) {
    router.push('/unlock')
  }
})
</script>
<template>
  <div>
    <p>address: {{ walletStore.wallet?.getWallet()?.address  }}</p>
  </div>
</template>