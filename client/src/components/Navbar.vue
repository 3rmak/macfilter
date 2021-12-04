<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link
    class="navbar-brand"
    :to="$router.resolve({name: 'main'}).href">Главная
  </router-link >
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
      <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto" v-if="auth">
      <li class="nav-item">
        <router-link
        class="nav-link"
        aria-current="page"
        :to="$router.resolve({name: 'departmentsLayout'}).href"
        >Мои филиалы
        </router-link>
      </li>
      <li class="nav-item" v-if="role ==='admin'">
        <router-link
        class="nav-link"
        aria-current="page"
        :to="$router.resolve({name: 'adminPage'}).href"
        >Админ панель
        </router-link>
      </li>
    </ul>


  </div>
  <div class="is-logged">
      <form class="form-inline my-2 my-lg-0" v-if="!auth">
        <router-link
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          :to="$router.resolve({name: 'login'}).href"
          >Войти
        </router-link >
      </form>
      <form class="form-inline my-2 my-lg-0" v-else>
        <div class="nav-item dropdown">
          <button
          class="btn btn-default dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          >Привет, {{ email }}
          <span class="caret"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <button
              class="btn nav-link"
              type="submit"
              @click="handleLogout"
              >Выйти
            </button >
          </div>
        </div>
      </form>
    </div>
</nav>
</template>

<script>

export default {
  data() {
    return {
      auth: false,
      role: "",
      email: "",
      departments: []
    }
  },
  created() {
    if (localStorage.getItem('jwt') !== null) {
      this.auth = true
      this.role = localStorage.getItem('role')
      this.email = JSON.parse(localStorage.getItem('user')).email
    }

  },
  methods: {
    handleLogout (){
      localStorage.removeItem('jwt')
      localStorage.removeItem('access')
      localStorage.removeItem('role')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #0c0c0c;
  .container {
    margin-top: 0;
    display: flex;
    align-items: baseline;
  }
  padding: 20px 0;
  a {
    text-decoration: none;
    font-weight: 700;
    color: #ffffff;
    font-size: 25px;
  }
  .logo {
    color: #EB5804;
    font-size: 30px;
  }
  .links {
    margin-left: 75px;
    display: flex;
    flex-grow: 1;
  }
  button {
    margin-left: auto;
  }
}
</style>
