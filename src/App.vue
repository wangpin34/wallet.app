<script setup lang="ts">
import { ethers } from 'ethers';
// import { onMounted, ref, watch } from 'vue';
import { Web3 } from 'web3';
// import { QingWallet, loadJsonWallet } from './utils/wallet';
const ganacheUrl = 'http://localhost:7545';
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider)

const defaultProvider = {
  provider: new ethers.JsonRpcProvider(ganacheUrl),
  label: '7545',
  isTestNetwork: true
}

window.web3 = {
  web3,
  provider: defaultProvider
}

</script>

<template>
    <div class="w-screen h-screen bg-slate-50">
      <div class="flex flex-col ">
        <router-view></router-view>
      </div>
    </div>

</template>

<style scoped>
.account-details {
  text-align: left;
}
</style>
