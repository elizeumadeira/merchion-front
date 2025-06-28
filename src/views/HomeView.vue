<script setup lang="ts">
import { ref } from 'vue'
import apiService from '../service/api'
import { flatErrorMessages } from '../helpers'

const email = ref('')
const password = ref('')
const erroMensagem = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  try {
    const User = await apiService.login(email.value, password.value)
    erroMensagem.value = ''

    // aqui seria a área onde eu colocaria o token do JWT no localstorage
    // mas como o desafio não requer isso, eu vou adicionar as informações 
    // vindas do endpoint login e considerar isso como "sessão"

    // const { name, email } = data.user; // não funciona pq ja tem uma variável chamada "email"
    const name = User.name;
    const emailUser = User.email;
    const id = User.id;
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', emailUser);

    // envia pro /admin
    e.target.submit();
  } catch (error) {
    erroMensagem.value = flatErrorMessages(error.response.data.message, 'Credenciais inválidas.');

    throw error; // Rethrow the error for handling in the component
  }
}
</script>

<template>
  <form @submit="handleSubmit" action="admin">
    <h1 class="h3 mb-3 fw-normal">Login</h1>
    <div class="form-floating">
      <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-check text-start my-3">
      <label class="form-check-label">
        Ainda não possui uma conta? Faça seu cadastro <RouterLink to="/cadastro">aqui</RouterLink>
      </label>
    </div>
    <div class="alert alert-danger" :class="{ 'd-none': erroMensagem === '' }" id="erro-mensagem"
      role="alert">{{ erroMensagem }}</div>

    <button class="btn btn-primary w-100 py-2" type="submit">Entrar</button>
  </form>
</template>