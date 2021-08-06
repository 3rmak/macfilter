<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { isJwtExpired } from 'jwt-check-expiration';
export default {
  name: 'App',

  async updated() {
    try {
      const token = localStorage.getItem('jwt')
      if(isJwtExpired(token)) {
        this.$swal({
          text: "Время жизни сессии истекло. Требуется повторно войти в профиль :)",
          type: "success",
        })
            .then(function (isConfirm) {
              if (isConfirm) {
                localStorage.removeItem('jwt')
                localStorage.removeItem('access')
                localStorage.removeItem('role')
              }
            })
            .then(()=>{
              this.$router.push('/login')
            })
      }
    } catch (error) {
      console.warn("Session break problem", error)
    }
  }
  
}
</script>
