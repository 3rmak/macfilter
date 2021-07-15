<template>
  <div class="login-page">
    <navbar />
    <div class="container">
      <h1>Страница входа</h1>
      <form class="form-container">
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            placeholder="email@farbex.com.ua" 
            v-model="loginForm.email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Пароль:</label>
          <input 
            type="password" 
            class="form-control" 
            id="exampleInputPassword1" 
            aria-describedby="passHelp" 
            placeholder="Пароль" 
            v-model="loginForm.password">
          <small id="passHelp" class="form-text text-muted">Никогда не делитесь своими личными данными.</small>
        </div>
        <button type="button" class="btn btn-primary" @click="login">Войти</button>
      </form>
    </div>
  </div>
  
</template>

<script>

import Navbar from '../components/Navbar'
import request from '../assets/scripts/request'

export default {
  components: {Navbar},
  data (){
    return {
      loginForm: {
        email: '',
        password: '',
      },
      url: "http://localhost:3001",
    }
  },
  methods: {
    async login (){
      const user = {...this.loginForm}
      const response = await request(`${this.url}/api/auth/login`, "POST", user)
      console.log("response", response)
      await this.$swal({text: response.message})
        .then(function(isConfirm) {
            if (isConfirm) {
              localStorage.setItem('jwt', response.token)
              localStorage.setItem('access', JSON.stringify(response.user.access))
              localStorage.setItem('role', response.user.role)
              localStorage.setItem('user', JSON.stringify(response.user))
            }
          })
      await this.$router.push('/')
        }
      
  }
}
</script>

<style>
.form-container {
  margin-top: 30px;
}
</style>