<template>
  <div class="main-page">
    <navbar />
    <div class="header" v-if="!auth">
      <h1>Welcome!</h1>
      <h5>Для работы с сервисом выполните вход</h5>
    </div>
    <div class="header" v-else>
      <h1>Главная страница</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      auth: false,
    }
  },
  created() {
    if (localStorage.getItem('jwt') !== null) {
      this.auth = true
    }

  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  min-height: 100vh;
  h1 {
    color: #333333;
    font-size: 70px;
    margin-bottom: 20px;
  }
  h5 {
    margin-top: 30px;
  }
}
</style>
