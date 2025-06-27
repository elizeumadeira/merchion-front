<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const email = ref('')
const password = ref('')
const erroMensagem = ref('')

const { appContext } = getCurrentInstance()!
const apiUrl = appContext.config.globalProperties.$apiUrl

function isJsonObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const alertElement = document.getElementById('erro-mensagem');
  alertElement.classList.add('d-none');

  const response = await fetch(`${apiUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value })
  })

  const data = await response.json()
  console.log(data.message);

  if (![200, 302].includes(response.status)) {
    erroMensagem.value = (
      isJsonObject(data.message) ?
        Object.values(data.message).flat().join('<br />') :
        data.message
    )
      || 'Credenciais inválidas.'

    if (alertElement) {
      alertElement.classList.remove('d-none')
    }
    return;
  }

  erroMensagem.value = ''
  alertElement.classList.add('d-none')

  // aqui seria a área onde eu colocaria o token do JWT no localstorage
  // mas como o desafio não requer isso, eu vou adicionar as informações 
  // vindas do endpoint login e considerar isso como "sessão"

  // const { name, email } = data.user; // não funciona pq ja tem uma variável chamada "email"
  const name = data.user.name;
  const emailUser = data.user.email;
  localStorage.setItem('name', name);
  localStorage.setItem('email', emailUser);

  e.target.submit();
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
    <div class="alert alert-danger hidden d-none" id="erro-mensagem" role="alert">{{ erroMensagem }}</div>

    <button class="btn btn-primary w-100 py-2" type="submit">Entrar</button>
  </form>
</template>