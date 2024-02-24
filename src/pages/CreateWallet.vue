<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore } from '../store/basic';
import { saveJsonWallet, createWallet, importFromPhrase } from '../utils/wallet';
const router = useRouter()
const basicStore = useBasicStore()
const phrase = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
const create = () => {
  const wallet = createWallet()
  phrase.value = wallet.mnemonic?.phrase
}

const onConfirm = () => {
  try {
    const wallet = importFromPhrase(phrase.value!)
    saveJsonWallet(wallet.encryptSync(password.value!))
    window.web3.wallet = wallet
    basicStore.setIsLocked(false)
    router.push('/')
  } catch (err) {
    basicStore.setIsLocked(true)
    alert('failed to unlock wallet')
    console.error(err)
  }
}

onMounted(async () => {
  create()
})

</script>
<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex flex-col">
      <label for="phrase">Phrase</label>
      <textarea v-model="phrase"/>
      <label for="password">Password</label>
      <input type="password" v-model="password" />
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" v-model="confirmPassword" />
      <span v-if="confirmPassword !== password" class="text-rose-700">Password don't match</span>
    </div>
    <div class="w-full flex flex-col items-center gap-2">
      <button type="button" class="w-min" @click="onConfirm" :disabled="!(phrase && password && confirmPassword && password === confirmPassword)">
        Confirm
      </button>
    </div>
  </div>
</template>
