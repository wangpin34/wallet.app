<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore, useWalletStore } from '../store/basic';
import { QingWallet, loadJsonWallet } from '../utils/wallet';
const router = useRouter()
const basicStore = useBasicStore()
const walletStore = useWalletStore()
const password = ref<string>()
const onUnlock = () => {
  const walletJson = loadJsonWallet()
  if (!walletJson) {
    alert('no wallet found')
    return
  }
  if (!password.value) {
    alert('password is required')
    return
  }
  try {
    const wallet = new QingWallet(
      QingWallet.importFromEncryptedJson(walletJson!, password.value)
    )
    basicStore.setIsLocked(false)
    walletStore.setWallet(wallet)
    router.push('/')
  } catch (err) {
    basicStore.setIsLocked(true)
    console.error(err)
    alert('failed to unlock')
  }
}
</script>
<template>
  <div class="flex flex-col items-center gap-4">
  <div class="flex flex-col">
    <label for="password">Password</label>
    <input type="text" v-model="password" class="w-36"/>
  </div>
  <div class="w-full flex flex-col items-center gap-2">
    <button type="button" @click="onUnlock" :disabled="!password" class="w-min">
      Unlock
    </button>
    <router-link to="/forgot-password">Forgot Password?</router-link>
  </div>
  </div>
</template>
