import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ScreenShort from 'screen-shot-fix'
import router from '@/router'
import App from './App.vue'

import './assets/normalize.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ScreenShort, { enableWebRtc: false })

app.mount('#app')
