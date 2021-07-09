<template>
  <div class="login-page">
    <navbar />
    <div class="container">
      <h1>Страница входа</h1>
      <form class="form-container">
        <div class="form-group">
          <label for="exampleInputEmail1">Email:</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email@farbex.com.ua">
          <small id="emailHelp" class="form-text text-muted">Никогда не делитесь своими личными данными.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Пароль:</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль">
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
    </div>
  </div>
  
</template>

<script>

import Navbar from '../components/Navbar'

export default {
  components: {Navbar}
}
</script>

<style>

</style>