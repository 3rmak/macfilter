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
        <option value="" disabled selected>Выберите пользователя из выпадающего списка</option>
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
        <button
            type="button"
            class="btn btn-outline-info"
            @click="setOption('isActive')"
        >
          Состояние
        </button>
        <button
            type="button"
            class="btn btn-outline-danger"
            @click="setOption('isDelete')"
        >
          Удалить
        </button>
      </div>
      <div class="if-option-selected" v-if="option">
        <div class="if-password" v-if="option === 'Password'">
          <label for="new-pass">Введите пароль</label>
          <input
            type="password"
            class="form-control"
            id="new-pass"
            aria-describedby="passHelp"
            @input="editForm.password = $event.target.value"
          />
          <small id="passHelp" class="form-text text-muted"
            >Придумайте сложный пароль для пользователя
          </small>
          <button type="submit" class="btn btn-primary" @click="applyChanges('password')">
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
          <button type="submit" class="btn btn-primary" @click="applyChanges('role')">
            Сменить
          </button>
        </div>
        <div class="if-rights" v-if="option === 'Rights'">
          <div class="form-group">
            <label>Доступ к филиалам</label>
            <div class="if-rights-deep" v-if="multipleSelect">
              <select
                multiple
                class="form-control"
                id="access-multi"
                aria-describedby="selectHelp"
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
              <small id="selectHelp" class="form-text text-muted"
                >*Разрешить доступ к нескольким филиалам можно выбрав их с
                помощью зажатой кнопки Ctrl.
              </small>
              <button
                type="submit"
                class="btn btn-primary"
                @click="applyChanges('access')"
              >
                Сменить
              </button>
            </div>
            <div class="if-rights-deep" v-else>
              <select
                class="form-control"
                id="access-solo"
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
                @click="applyChanges('access')"
              >
                Сменить
              </button>
            </div>
          </div>
        </div>
        <div class="if-isActive" v-if="option === 'isActive'">
          <div class="form-check">
            <input
                type="checkbox"
                class="form-check-input"
                id="isActive"
                v-model="editForm.isActive"
            />
            <label class="form-check-label" for="isActive">Пользователь активен?</label>
          </div>
          <button type="submit" class="btn btn-primary" @click="applyChanges('isActive')">
            Сменить
          </button>
        </div>
        <div class="if-isDelete" v-if="option === 'isDelete'">
          <div>
            <label for="isDelete">Вы действительно хотите удалить пользователя?</label>
          </div>
          <button type="submit" id="isDelete" class="btn btn-danger" @click="deleteUser()">
            Подтвердить удаление
          </button>
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
        isActive: false
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

      if (user.role === "nachrop" || user.role === "router") {
        return false;
      }
      return true;
    },
  },
  methods: {
    setOption(newVal) {
      this.option = newVal;
    },
    copyUserData(e) {
      let user = this.allUsersList.find((u) => u._id == e.target.value);
      this.editForm = { ...user };
    },
    async applyChanges(field) {
      if(field === 'access' && !Array.isArray(this.editForm[field])) {
        this.editForm[field] = [this.editForm[field]];
      }

      const user = { [field]: this.editForm[field] };
      const response = await request(`/api/users/${this.editForm._id}`, "PATCH", user);
      this.$swal({ text: response.message }).then(function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      });
    },
    async deleteUser() {
      try {
        const response = await request(`/api/users/${this.editForm._id}`, "DELETE");

        this.$swal({ text: response.message }).then(function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        });
      } catch (e) {
        this.$swal({ text: e.message }).then((isConfirm) => {
          if (isConfirm) {
            location.reload();
          }
        });
      }
    }
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

<style>
  .if-user-selected {
    padding: 10px 0px;
  }
  .if-user-selected button {
    margin-right: 3px;
  }

  .if-password > button, .if-position > button, .if-rights-deep > button, .if-isActive > button  {
    margin-top: 10px;
  }
</style>
