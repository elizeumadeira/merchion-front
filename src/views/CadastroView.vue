<script setup lang="ts">
import { ref } from 'vue'
import apiService from '../service/api'
import { flatErrorMessages } from '../helpers'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')
const sucessMensagem = ref('')
const erroMensagem = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  try {
    sucessMensagem.value = ''

    // Verifica se as senhas são iguais
    if (password.value !== confirmpassword.value) {
      erroMensagem.value = 'As senhas não coincidem.'
      return;
    }

    erroMensagem.value = ''

    const User = await apiService.register(name.value, email.value, password.value, confirmpassword.value)

    name.value = ''
    email.value = ''
    password.value = ''
    confirmpassword.value = ''
    sucessMensagem.value = 'Usuário cadastrado com sucesso!'

  } catch (error) {
    sucessMensagem.value = ''
    erroMensagem.value = flatErrorMessages(error.response.data.message, 'Erro ao cadastrar o usuário.')
    throw error; // Rethrow the error for handling in the component
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <h1 class="h3 mb-3 fw-normal">Login</h1>
    <div class="form-floating">
      <input type="name" v-model="name" class="form-control" id="floatingName" placeholder="João da Silva">
      <label for="floatingName">Name</label>
    </div>
    <div class="form-floating">
      <input type="email" v-model="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
      <label for="floatingEmail">Email</label>
    </div>
    <div class="form-floating">
      <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating">
      <input type="password" v-model="confirmpassword" class="form-control" id="floatingConfirmPassword"
        placeholder="Password">
      <label for="floatingConfirmPassword">Confirm password</label>
    </div>
    <div class="form-check text-start my-3">
      <label class="form-check-label">
        Voltar para a Tela de Login <RouterLink to="/">aqui</RouterLink>
      </label>
    </div>
    <div class="alert alert-danger" :class="{ 'd-none': erroMensagem === '' }" role="alert">
      {{ erroMensagem }}
    </div>
    <div class="alert alert-success" :class="{ 'd-none': sucessMensagem === '' }" role="alert">
      {{ sucessMensagem }}
    </div>

    <button class="btn btn-primary w-100 py-2" type="submit">Entrar</button>
  </form>
</template>