import { createApp } from 'vue'

import App from './App.vue'
import { BussinessError } from './errors'
import router from './router'
import { setUpPinia } from './stores'

const app = createApp(App)

app.use(setUpPinia())
app.use(router)

app.mount('#app')

app.config.errorHandler = (err: unknown, component) => {
}

window.onerror = (err: unknown) => {
    // if (!(err instanceof BussinessError)) {
    //     alert('Don`t edit the DOM tree!');
    //     return;
    // }
    console.log(err);
}