<template>
  <div class="create-department">
    <navbar />
    <div class="container" id="create-department">
      <h1>Создать филиал</h1>
      <form @submit.prevent="createDepartment">
        <div class="form-group mb-3">
          <label for="name" class="form-label">Название нового филиала:</label>
          <input type="name" class="form-control" placeholder="Например Киев..." id="name" v-model="departForm.name" aria-describedby="help">
          <!-- <div id="help" class="form-text">Чтобы создать нажмите кнопку "Создать"</div> -->
          <div class="userAccess mt-4">
            <label for="access" class="form-label">Открыть доступ пользователям:</label>
            <div class="form-check" v-for="user in users" :key="user._id" id="access">
              <input class="form-check-input" type="checkbox" id="user" :value="user._id" v-model="departForm.userIdList">
              <label class="form-check-label" :for="user">{{user.email}}</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Создать</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

import request from '../assets/scripts/request'

export default {
  components: {
    Navbar
  },
  data (){
    return {
      departForm: {
                name: '',
                devices: [],
                userIdList: []
      },
      users: []
    }
  },
  methods: {
    async createDepartment(){
      try {
        const {...department} = this.departForm
        const response = await request('/api/departments', "POST", department)
        await this.$swal({text: response.message})
          .then(()=>{
            location.reload()
          })
      } catch (error) {
        this.$swal({text: 'Не возможно создать новый филиал клиентская ошибка'})
          .then(()=>{
            location.reload()
          })
      }

    }
  },
  async created() {
    try {
      const response = await request('/api/users');

      for (let item of response) {
        if (item.role === 'router' || item.role === 'nachrop' && item.access.length > 0) {
          continue;
        }

        this.users.push(item);
      }
    } catch (error) {
      this.$swal({text: 'Ошибка. Список пользователей не загружен'})
        .exec();
    }
  },
}
</script>
<style scoped></style>
