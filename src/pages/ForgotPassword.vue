<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore } from '../store/basic';
import { importFromPhrase, saveJsonWallet } from '../utils/wallet';
const router = useRouter()
const basicStore = useBasicStore()
const phrase = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
const onUnlock = () => {
  if(!phrase.value) {
    alert('empty phrase')
    return
  }
  try {
    const wallet = importFromPhrase(phrase.value, "m/44'/60'/0'/0/0")
    saveJsonWallet(wallet.encryptSync(password.value!))
    window.web3.wallet = wallet
    basicStore.setIsLocked(false)
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
    <router-link to="/create-wallet">Create a wallet</router-link>
  </div>
  </div>
</template>