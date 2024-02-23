<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore, useWalletStore } from '../store/basic';
import { QingWallet, saveJsonWallet } from '../utils/wallet';
const router = useRouter()
const basicStore = useBasicStore()
const walletStore = useWalletStore()
const phrase = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
const onUnlock = () => {
  if(!phrase.value) {
    alert('empty phrase')
    return
  }
  try {
    const wallet = new QingWallet(QingWallet.importFromPhrase(phrase.value))
    saveJsonWallet(wallet.getWallet().encryptSync(password.value!))
    basicStore.setIsLocked(false)
    walletStore.setWallet(wallet)
    router.push('/')
  } catch(err) {
    basicStore.setIsLocked(true)
    alert('failed to unlock wallet')
    console.error(err)
  }
}
</script>
<template>
  <div class="flex flex-col items-center gap-4">
  <div class="flex flex-col">
    <label for="phrase">Phrase</label>
    <textarea v-model="phrase" />
    <label for="password">Password</label>
    <input type="password" v-model="password" />
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" v-model="confirmPassword" />
    <span v-if="confirmPassword !== password" class="text-rose-700">Password don't match</span>
  </div>
  <div>
    <button type="button" @click="onUnlock" :disabled="!(phrase && password && confirmPassword && password === confirmPassword)" >
      Restore
    </button>
  
  </div>
  </div>
</template>