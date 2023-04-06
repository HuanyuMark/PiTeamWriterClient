import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setUpPinia } from './stores'

const app = createApp(App)

app.use(setUpPinia())
app.use(router)

app.mount('#app')
