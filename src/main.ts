import ForgotPassword from 'pages/ForgotPassword.vue'
import Home from 'pages/Home.vue'
import Unlock from 'pages/Unlock.vue'
import CreateWallet from 'pages/CreateWallet.vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/unlock', component: Unlock },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/create-wallet', component: CreateWallet }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
