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
  aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link 
        class="nav-link" 
        aria-current="page" 
        :to="$router.resolve({name: 'departmentsLayout'}).href"
        >Все филиалы
        </router-link>
      </li>
      <li class="nav-item">
        <router-link 
        class="nav-link" 
        aria-current="page" 
        :to="$router.resolve({name: 'adminPage'}).href"
        >Админ панель
        </router-link>
      </li>
      <!-- <li class="nav-item">
        <router-link  
        class="nav-link" 
        aria-current="page" 
        :to="$router.resolve({name: 'createDevice'}).href"
        >Добавить устройство
        </router-link >
      </li>
      <li class="nav-item">
        <router-link  
        class="nav-link" 
        aria-current="page" 
        :to="$router.resolve({name: 'createUser'}).href"
        >Создать пользователя
        </router-link >
      </li> -->
      <!-- <li class="nav-item">
        <a 
        class="nav-link" 
        :href="$router.resolve({name: 'createDepartment'}).href"
        >Добавить филиал
        </a>
      </li> -->
      <!-- <li class="nav-item dropdown">
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
            <router-link 
            class="nav-link" 
            :to="$router.resolve({name: 'departmentPage', params: {id: department._id}}).href"
            >{{ department.name }}
            </router-link >
          </div>
          <div class="dropdown-divider"></div>
          <router-link  class="nav-link" :to="$router.resolve({name: 'createDepartment'}).href">New Department</router-link >
        </div>
      </li> -->
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <router-link 
        class="btn btn-outline-success my-2 my-sm-0" 
        :to="$router.resolve({name: 'login'}).href"
        >Войти
      </router-link >
      
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
      access: [],
      departments: [],
      url: "http://localhost:3001"
    }
  },
  async created() {
    this.auth = localStorage.getItem('auth') !== null
    this.access = JSON.parse(localStorage.getItem('access'))

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
