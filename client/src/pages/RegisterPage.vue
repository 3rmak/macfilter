<template>
  <div class="register-page">
    <navbar />
    <div class="container">
      <h1>Страница регистрации</h1>
      <form class="reg-form">
        <div class="form-group">
          <label for="email">Email адрес</label>
          <input type="email" class="form-control" id="email" placeholder="email@farbex.com.ua" v-model="userForm.email" required>
        </div>
        <div class="form-group">
          <label for="password">Новый пароль</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="userForm.password" required>
        </div>
        <div class="form-group">
          <label for="re-password">Подтвердите новый пароль</label>
          <input type="password" class="form-control" id="re-password" placeholder="Password" v-model="re_password" required>
        </div>
      <div class="form-group">
        <label for="position">Должность</label>
        <select class="form-control" id="position" v-model="userForm.position">
          <option v-for="(item, key) in positions" :value="key" :key="item">
            {{item}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="access">Доступ к филиалам</label>
        <div v-if="multipleSelect">
          <select multiple class="form-control" id="access" aria-describedby="selectHelp" v-model="userForm.access">
            <!-- <option 
            v-for="department in departments" 
            :key="department.id" 
            >{{ department.name }}</option> -->
            <option
            v-for="department in departments"
            :key="department.name"
            :value="department._id"
            >{{ department.name }}
            </option>
          </select>
          <small 
          id="selectHelp" 
          class="form-text text-muted">*Разрешить доступ к нескольким филиалам можно выбрав их с помощью зажатой кнопки Ctrl.
          </small>
        </div>
        <div v-else>
          <select class="form-control" id="access" v-model="userForm.access">
            <option v-for="department in departments" :key="department">{{ department.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-success" type="button" @click="createUser">Создать пользователя</button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  components: {Navbar},
  data (){
    return {
      userForm: {
        email: "",
        password: "",
        position: "admin",
        access: [],
      },
      positions: {"admin":"Администратор","nachrop":"Начальник РОП","regional":"Дивизионал"},
      departments: [],
      re_password: "",
      url: "http://localhost:3001",
    }
  },
  methods: {
    async createUser (){
      try {
        const user = {...this.userForm}
        const password = this.userForm.password
        if(password !== this.re_password){
          this.$swal('Пароли не совпадают!')
          .then(function(isConfirm) {
            if (isConfirm) {
              location.reload()
            }
          })
        }
        else{
          const response = await request(`${this.url}/api/auth/register`, "POST", user)
          console.log(response.message)
          this.$swal({
            text: response.message, 
            type: "success"
            })
          .then(function(isConfirm) {
            if (isConfirm) {
              location.reload()
            }
          })
        }
      } catch (error) {
        this.$swal({
          title: 'Произошла ошибка, обратитесь к системному администратору!', 
          text: error.message, 
          type: "success"
          })
      }
      
    }
  },
  computed: {
    multipleSelect (){
      const user = {...this.userForm}
      if(user.position === "nachrop"){
        return false  
      }
      return true
    }
  },
  mounted (){
    this.departments = JSON.parse(localStorage.getItem('departments'))
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
            console.log("BOdy",body)
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

<style>
.reg-form {
  margin-top: 20px;
}
</style>