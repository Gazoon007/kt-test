import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import setupFontAwesome from './plugins/fontawesome'

import router from './router'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
setupFontAwesome(app)

app.use(pinia)
app.use(router)

app.mount('#app')
