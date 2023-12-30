import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// const app = createSSRApp(App)
import pinia from './stores'

import App from './App.vue'
import router from './router'
import '@/assets/css/anim.css'
import '@/assets/css/style.css'
// import 'swiper/css';

const app = createApp(App)

// app.use(createPinia())
app.use(pinia)

app.use(router)

app.mount('#app')
