import './assets/css/bootstrap.min.css'
import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueCookies from 'vue-cookies'

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.use(VueCookies, { expires: '7d'})

app.mount('#app')
