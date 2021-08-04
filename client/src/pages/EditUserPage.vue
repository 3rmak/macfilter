<template>
  <div class="edit-user-rights">
    <navbar />
    <div class="container">
      <!-- <label for="select-user">Выберите пользователя</label> -->
      <select
        class="form-control"
        id="select-user"
        @click="copyUserData($event)"
        required
      >
        <option value="" disabled selected>Choose your hero</option>
        <option
          v-for="user in allUsersList"
          :key="user.email"
          :value="user._id"
        >
          {{ user.email }}
        </option>
      </select>
      <div class="if-user-selected" v-if="editForm._id">
        <button
          type="button"
          class="btn btn-primary"
          @click="setOption('Password')"
        >
          Смена пароля
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="setOption('Position')"
        >
          Должность
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="setOption('Rights')"
        >
          Права
        </button>
      </div>
      <div class="if-option-selected" v-if="option">
        <div class="if-password" v-if="option === 'Password'">
          <label for="new-pass">Введите пароль</label>
          <input
            type="password"
            id="new-pass"
            aria-describedby="passHelp"
            @input="editForm.password = $event.target.value"
          />
          <small id="passHelp" class="form-text text-muted"
            >Придумайте сложный пароль для пользователя
          </small>
          <button type="submit" class="btn btn-primary" @click="applyChanges">
            Сменить
          </button>
        </div>
        <div class="if-position" v-if="option === 'Position'">
          <label for="role">Должность</label>
          <select class="form-control" id="role" v-model="editForm.role">
            <option v-for="(item, key) in roles" :value="key" :key="item">
              {{ item }}
            </option>
          </select>
          <button type="submit" class="btn btn-primary" @click="applyChanges">
            Сменить
          </button>
        </div>
        <div class="if-rights" v-if="option === 'Rights'">
          <div class="form-group">
            <label for="access">Доступ к филиалам</label>
            <div v-if="multipleSelect">
              <select
                multiple
                class="form-control"
                id="access"
                aria-describedby="selectHelp"
                v-model="editForm.access"
              >
                <!-- <option 
            v-for="department in departments" 
            :key="department.id" 
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
                >*Разрешить доступ к нескольким филиалам можно выбрав их с
                помощью зажатой кнопки Ctrl.
              </small>
              <button
                type="submit"
                class="btn btn-primary"
                @click="applyChanges"
              >
                Сменить
              </button>
            </div>
            <div v-else>
              <select
                class="form-control"
                id="access"
                v-model="editForm.access"
              >
                <option
                  v-for="department in departments"
                  :key="department.name"
                  :value="department._id"
                >
                  {{ department.name }}
                </option>
              </select>
              <button
                type="submit"
                class="btn btn-primary"
                @click="applyChanges"
              >
                Сменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import request from "../assets/scripts/request";
import roles from "../assets/scripts/Roles";
export default {
  data() {
    return {
      editForm: {
        _id: "",
        email: "",
        role: "",
        password: "",
        access: [],
      },
      option: "",
      allUsersList: [],
      departments: [],
      roles,
    };
  },
  computed: {
    multipleSelect() {
      const user = { ...this.editForm };
      console.log(user);
      if (user.role === "nachrop") {
        return false;
      }
      return true;
    },
  },
  methods: {
    setOption(newVal) {
      this.option = newVal;
      console.log("this.editForm", this.editForm);
      console.log("option", this.option);
    },
    copyUserData(e) {
      let user = this.allUsersList.find((u) => u._id == e.target.value);
      this.editForm = { ...user };
    },
    async applyChanges() {
      const { ...user } = this.editForm;
      const response = await request("/api/users", "PATCH", user);
      await this.$swal({ text: response.message }).then(function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      });
    },
  },
  components: {
    Navbar,
  },
  async created() {
    this.allUsersList = await request("/api/users");
    this.departments = await request("/api/departments");
  },
};
</script>

<style></style>
