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
          <option>Начальник РОП</option>
          <option>Дивизионал/Регионал</option>
          <option>Админ</option>
        </select>
      </div>
      <div class="form-group">
        <label for="access">Доступ к филиалам</label>
        <div v-if="multipleSelect">
          <select multiple class="form-control" id="access" aria-describedby="selectHelp" v-model="userForm.access">
            <option 
            v-for="department in departments" 
            :key="department.id" 
            >{{ department.name }}</option>
          </select>
          <small id="selectHelp" class="form-text text-muted">*Разрешить доступ к нескольким филиалам можно выбрав их с помощью зажатой кнопки Ctrl.</small>
        </div>
        <div v-else>
          <select class="form-control" id="access" v-model="userForm.access">
            <option v-for="department in departments" :key="department">{{ department.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-success" type="submit" @click="createUser">Создать пользователя</button>
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
        position: "Админ",
        access: []
      },
      departments: [],
      re_password: ""
    }
  },
  methods: {
    async createUser (){
      //const user = {...userForm}
      const password = this.userForm.password
      if(password !== this.re_password){
        this.$swal('Пароли не совпадают!')
      }
    }
  },
  computed: {
    multipleSelect (){
      const user = {...this.userForm}
      if(user.position === "Начальник РОП"){
        return false  
      }
      return true
    }
  },
  mounted (){
    this.departments = JSON.parse(localStorage.getItem('departments'))
  }
}
</script>

<style>
.reg-form {
  margin-top: 20px;
}
</style>