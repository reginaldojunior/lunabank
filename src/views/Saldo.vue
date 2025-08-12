<template>
  <main>
    <!-- Pass the books ref directly without curly braces -->
    <!-- <Saldo :books="books" /> -->
    <Saldo :saldo="saldo" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Saldo from '../components/Saldo.vue'
import VueCookies from 'vue-cookies'

const token = $cookies.get('token')
const saldo = ref([])

async function fetchCurrentSaldo() {
  try {
    const headers = { Authorization: `Bearer ${token}` }

    const response = await axios.get('https://3f4b00be35a1.ngrok-free.app/saldo', { headers })
    saldo.value = response.data
  } catch (error) {
    console.error('Error fetching saldo:', error)
  }
}

onMounted(fetchCurrentSaldo)
</script>
