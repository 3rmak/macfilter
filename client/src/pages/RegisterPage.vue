<template>
  <div class="register-page">
    <navbar />
    <div class="container">
      <h1>Страница регистрации</h1>
      <form class="reg-form">
        <div class="form-group">
          <label for="email">Email адрес</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="email@farbex.com.ua"
            v-model="userForm.email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Новый пароль</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="userForm.password"
            required
          />
        </div>
        <div class="form-group">
          <label for="re-password">Подтвердите новый пароль</label>
          <input
            type="password"
            class="form-control"
            id="re-password"
            placeholder="Password"
            v-model="re_password"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Должность</label>
          <select class="form-control" id="role" v-model="userForm.role">
            <option v-for="(item, key) in roles" :value="key" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="access">Доступ к филиалам</label>
          <div v-if="multipleSelect">
            <select
              multiple
              class="form-control"
              id="access"
              aria-describedby="selectHelp"
              v-model="userForm.access"
            >
              <!-- <option 
            v-for="department in departments" 
            :key="department.id" access
            >{{ department.name }}</option> -->
              <option
                v-for="department in departments"
                :key="department.name"
                :value="department._id"
              >
                {{ department.name }}
              </option>
            </select>
            <small id="selectHelp" class="form-text text-muted"
              >*Разрешить доступ к нескольким филиалам можно выбрав их с помощью
              зажатой кнопки Ctrl.
            </small>
          </div>
          <div v-else>
            <select class="form-control" id="access" v-model="userForm.access">
              <option
                v-for="department in departments"
                :key="department.name"
                :value="department._id"
              >
                {{ department.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-success" type="button" @click="createUser">
            Создать пользователя
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import request from "../assets/scripts/request";
import roles from "../assets/scripts/Roles";

export default {
  components: { Navbar },
  data() {
    return {
      userForm: {
        email: "",
        password: "",
        role: "admin",
        access: [],
      },
      departments: [],
      re_password: "",
      roles,
    };
  },
  methods: {
    async createUser() {
      try {
        const user = { ...this.userForm };
        const password = this.userForm.password;
        if (password !== this.re_password) {
          this.$swal("Пароли не совпадают!").then(function (isConfirm) {
            if (isConfirm) {
              location.reload();
            }
          });
        } else {
          const response = await request("/api/auth/register", "POST", user);
          console.log(response.message);
          this.$swal({
            text: response.message,
            type: "success",
          }).then(function (isConfirm) {
            if (isConfirm) {
              location.reload();
            }
          });
        }
      } catch (error) {
        this.$swal({
          title: "Произошла ошибка, обратитесь к системному администратору!",
          text: error.message,
          type: "error",
        });
      }
    },
  },
  computed: {
    multipleSelect() {
      const user = { ...this.userForm };
      if (user.role === "nachrop") {
        return false;
      }
      return true;
    },
  },
  async mounted() {
    // this.departments = JSON.parse(localStorage.getItem("departments"));
    // console.log("this.departments", this.departments);
    try {
      this.departments = await request('/api/departments')
    } catch (error) {
      console.warn('can not get departments list')
    }
    
  },
};
</script>

<style>
.reg-form {
  margin-top: 20px;
}
</style>
