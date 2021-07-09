<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Главная</a>
  <button 
  class="navbar-toggler" 
  type="button" 
  data-toggle="collapse" 
  data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" 
  aria-expanded="false" 
  aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a 
        class="nav-link" 
        aria-current="page" 
        :href="$router.resolve({name: 'departmentsLayout'}).href"
        >Все филиалы
        </a>
      </li>
      <li class="nav-item">
        <a 
        class="nav-link" 
        aria-current="page" 
        :href="$router.resolve({name: 'createDevice'}).href"
        >Добавить устройство
        </a>
      </li>
      <li class="nav-item">
        <a 
        class="nav-link" 
        aria-current="page" 
        :href="$router.resolve({name: 'createUser'}).href"
        >Создать пользователя
        </a>
      </li>
      <!-- <li class="nav-item">
        <a 
        class="nav-link" 
        :href="$router.resolve({name: 'createDepartment'}).href"
        >Добавить филиал
        </a>
      </li> -->
      <li class="nav-item dropdown">
        <button 
        class="btn btn-default dropdown-toggle" 
        type="button" 
        data-toggle="dropdown"
        >Филиалы
        <span class="caret"></span>
        </button>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <div 
          v-for="department in departments" 
          :key="department"
          >
            <a 
            class="nav-link" 
            :href="$router.resolve({name: 'departmentPage', params: {id: department._id}}).href"
            >{{ department.name }}
            </a>
          </div>
          <div class="dropdown-divider"></div>
          <a class="nav-link" :href="$router.resolve({name: 'createDepartment'}).href">New Department</a>
        </div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <a 
      class="btn btn-outline-success my-2 my-sm-0" 
      :href="$router.resolve({name: 'login'}).href"
      >Войти
      </a >
      <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="changeUserState"
        >
          {{ auth ? 'Выйти' : 'Войти' }}
        </button> -->
    </form>
  </div>
</nav>
</template>

<script>

export default {
  data() {
    return {
      auth: false,
      departments: [],
      url: "http://localhost:3001"
    }
  },
  async created() {
    this.auth = localStorage.getItem('auth') !== null

    this.departments = await request(`${this.url}/api/departments`)
    localStorage.setItem('departments', JSON.stringify(this.departments))
  },
  methods: {
    changeUserState() {
      if (this.auth) {
        localStorage.removeItem('auth')
        this.$router.push({ name: 'main'})
      } else {
        localStorage.setItem('auth', true)
        this.auth = true
      }
    }
  },
  async mounted() {
    // this.departments = await request(`${this.url}/api/departments`)
    // localStorage.setItem('departments', this.departments)
  }

}

const request = async (url, method="GET", data=null) => {
    try {
        const headers = {}
        const mode = 'cors'
        let body
        if(data){
            headers['Content-Type'] = 'application/json'
            headers['Access-Control-Allow-Origin'] = '*',
            headers['Access-Control-Allow-Methods'] = 'GET, POST',
            headers['Access-Control-Allow-Headers'] = 'Content-Type',
            headers['Access-Control-Max-Age'] = '3600'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            mode,
            headers,
            body
        })
        return await response.json()
    } catch (e){
        console.warn('Errorinio: ', e.message)
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
