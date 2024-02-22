<script setup lang="ts">
// import { HDNodeWallet, Wallet, ethers, parseEther } from 'ethers';
// import { onMounted, ref, watch } from 'vue';
// import { Web3 } from 'web3';
// import { QingWallet, loadJsonWallet } from './utils/wallet';
// const ganacheUrl = 'http://localhost:7545';
// const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
// const rpcProvider = new ethers.JsonRpcProvider(ganacheUrl)
// const web3 = new Web3(httpProvider)
// const phrase = ref<string>()
// const payee = ref<string>()
// const transactions = ref<Array<Transaction>>()

// interface Transaction {
//   from: string
//   to?: string | null
//   amount: string
// }

// interface Account {
//   address: string
//   privateKey: string
//   balance?: string
// }

// const wallet = ref<QingWallet>()
// const password = ref<string>()

// const account = ref<Account>()

// const otherAccountsAddrs = ref<Array<string>>()
  
// const getBalance = async (address: string) => {
//   const wei = await web3.eth.getBalance(address)
//   return web3.utils.fromWei(wei, 'ether')
// }

// const getTransactionList = async (account: Account) => {
//   const pastLogs = await web3.eth.getPastLogs({
//     fromBlock: 2,
//     address: account.address
//   })

//   //@ts-ignore
//   const transactions = pastLogs.map(log => web3.eth.getTransaction(log.transactionHash));
  
//   return Promise.all(transactions);
// }

// const sendToken = async (amount: number, {account, to} :{ account: Account, to: string }  ) => {
//   const wallet = new Wallet(account.privateKey, rpcProvider)
//   const tx = {
//     to,
//     value: parseEther(amount.toString()),
//   };
//   const transaction = await wallet.sendTransaction(tx);
//   // Wait for the transaction to be mined
//   const receipt = await transaction.wait();

//   return { transaction, receipt };
// }

// const importByPhrase = (phrase: string) => {
//   return HDNodeWallet.fromPhrase(phrase)
// }

// const onImportWallet = async () => {
//   const wallet = importByPhrase(phrase.value!)
//   account.value = {
//     address: wallet.address,
//     privateKey: wallet.privateKey,
//     balance: await getBalance(wallet.address)
//   }
// }

// const onSendToken = async () => {
//   if (account.value && payee.value) {
//     const { transaction, receipt } = await sendToken(1, {account: account.value, to: payee.value})
//     console.log({ transaction, receipt })
//   }
// }

// watch(account, async (account) => {
//   if(account) {
//     const _transactions = await getTransactionList(account)
//     transactions.value = _transactions.map(t => ({
//       from: t.from,
//       to: t.to,
//       amount: web3.utils.fromWei(t.value, 'ether') + ' ETH'
//     }))
//   }
// })

// onMounted(async () => {
//   const addrs = await web3.eth.getAccounts()
//   otherAccountsAddrs.value = addrs

//   const jsonWallet = loadJsonWallet()

//   if(jsonWallet) {
//     wallet.value = new QingWallet(QingWallet.importFromEncryptedJson(jsonWallet, password.value), rpcProvider)
//     console.log(wallet.value)
//   }

//   rpcProvider.getBlockNumber().then((blockNumber) => {
//     console.log('Current block number: ' + blockNumber);
//   });
//   rpcProvider.on('block', async (blockNumber) => {
//     const block = await rpcProvider.getBlock(blockNumber);
//     for (const transaction of block?.transactions ?? []) {
//       console.log('Transaction sent from wallet:', transaction);
//     }
//   })
// })

</script>

<template>
    <div class="w-screen h-screen bg-slate-50">
      <div class="flex flex-col ">
        <router-view></router-view>
      </div>
    </div>
      <!-- <label for="phrase">Phrase</label>
      <textarea v-model="phrase"></textarea>
      <br/>
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password">
       <br/>
      <button type="button" @click="onImportWallet">Import Account</button>

      <hr />
      <section class="account-details">
        <strong>Address:&nbsp;&nbsp;</strong><span>{{ account?.address }}</span>
        <br/>
        <strong>Balance:&nbsp;&nbsp;</strong><span>{{ account?.balance   }} ETH</span>
      </section>
      <hr/>
      <section>
        <label for="payee">Payee</label>
        <select name="payee" v-model="payee">
          <option v-for="addr in otherAccountsAddrs" :value="addr">
            {{ addr }}
          </option>
        </select>
        
        <button type="button" @click="onSendToken">Send 1 ETH</button>
      </section>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tr v-if="transactions" v-for="t in transactions">
          <td>{{ t.from }}</td>
          <td>{{ t.to }}</td>
          <td>{{ t.amount }}</td>
        </tr>
      </table> -->
      

</template>

<style scoped>
.account-details {
  text-align: left;
}
</style>
