import { createRouter, createWebHistory } from 'vue-router'
import Saldo from '../views/Saldo.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: "login"
      }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
      path: '/',
      name: 'saldo',
      component: Saldo
    }
  ]
})

export default router
