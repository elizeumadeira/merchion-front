<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '../service/api'

const usuarioNomeLocalStorage = ref(localStorage.getItem('name'))
const usuarioNomeBackend = ref('')

onMounted(async () => {
  try {
    const user = await apiService.me()
    usuarioNomeBackend.value = user.name
  } catch (error) {
    console.error('error', error);
    // handle error if needed
  }
})

</script>

<template>
  <main>
    Bem-vindo, {{ usuarioNomeLocalStorage }}, {{ usuarioNomeBackend }}!

    <RouterLink to="/logout">Sair</RouterLink>

  </main>
</template>
