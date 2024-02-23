<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBasicStore, useWalletStore, useProviderStore } from '../store/basic';
import { QingWallet, saveJsonWallet } from '../utils/wallet';
const router = useRouter()
const basicStore = useBasicStore()
const walletStore = useWalletStore()
const providerStore = useProviderStore()
const phrase = ref<string>()
const password = ref<string>()
const confirmPassword = ref<string>()
const create = () => {
  const wallet = QingWallet.createWallet(providerStore.provider.provider)
  phrase.value = wallet.mnemonic?.phrase
  console.log(wallet)
}

const onConfirm = () => {
  try {
    const wallet = new QingWallet(QingWallet.importFromPhrase(phrase.value!))
    saveJsonWallet(wallet.getWallet().encryptSync(password.value!))
    basicStore.setIsLocked(false)
    walletStore.setWallet(wallet)
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
