<template>
  <div class="edit-user-rights">
      <navbar />
      <div class="container">
          <label for="select-user">Выберите пользователя</label>
          <!-- v-model="editForm.id" -->
          <select class="form-control" id="select-user" @click="copyUserData($event)" required>
              <option value="" disabled selected>Select your option</option>
              <option v-for="user in allUsersList" :key="user.email" :value="user._id">{{user.email}}</option>
          </select>
          <div class="if-user-selected" v-if="editForm._id">
            <button type="button" class="btn btn-primary" @click="setOption('Password')">Смена пароля</button>
            <button type="button" class="btn btn-secondary" @click="setOption('Position')">Должность</button>
            <button type="button" class="btn btn-warning" @click="setOption('Rights')">Права</button>
          </div>
          <div class="if-option-selected" v-if="option">
              <div class="if-password" v-if="option === 'Password'">
                  <label for="new-pass">Введите пароль</label>
                  <input if="new-pass" aria-describedby="passHelp" v-model="editForm.password">
                  <small id="passHelp" class="form-text text-muted">Придумайте сложный пароль для пользователя </small>
                  <button type="submit" class="btn btn-primary" @click="applyChanges">Сменить</button>
              </div>
              <div class="if-position" v-if="option === 'Position'">
                  
              </div>
              <div class="if-rights" v-if="option === 'Rights'">
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import request from '../assets/scripts/request'
export default {
    data(){
        return {
            editForm: {
                _id: '',
                email: '',
                role: '',
                password: '',
                access: []
            },
            option: '',
            allUsersList: []
        }
    },
    methods: {
        setOption(newVal) {
            this.option = newVal
            console.log('this.editForm', this.editForm)
            console.log('option', this.option)
        },
        copyUserData(e) {
            let user = this.allUsersList.find(u => u._id == e.target.value )
            this.editForm = {...user}
        },
        async applyChanges() {
            const {...user} = this.editForm
            const response = await request('/api/users', "PATCH", user)
            await this.$swal({text: response.message})
                .then(function(isConfirm) {
                    if (isConfirm) {
                    location.reload()
                    }
                })
        }
    },
    components: {
        Navbar
    },
    async created(){
        this.allUsersList = await request('/api/users')
        console.log('this.allUsersList', this.allUsersList)
    }

}
</script>

<style>

</style>