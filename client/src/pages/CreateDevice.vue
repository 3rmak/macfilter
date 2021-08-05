<template>
  <div class="create-device">
    <navbar />
    <div class="container pt-3" id="app" v-cloak>
      <h1>App</h1>
      <form @submit.prevent="createDevice">
        <div class="form-group mb-3">
          <label for="type">Тип устройства</label>
          <select class="form-control" id="type" v-model="form.type" required>
            <option>Компьютер</option>
            <option>Принтер</option>
            <option>IP-телефон</option>
            <option>Видеонаблюдение</option>
            <option>СКУД</option>
            <option>Смартфон</option>
            <option>Планшет</option>
            <option>Ноутбук</option>
            <hr />
            <option>Другое</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="department">Удаленный филиал</label>
          <select class="form-control" id="department" v-model="form.department" required>
            <option v-for="department in departments" :key="department">{{department.name}}</option>
            <!--                <option>Харьков</option>-->
            <!--                <option>Кировоград</option>-->
            <!--                <option>Луцьк</option>-->
            <!--                <option>Чернигов</option>-->
            <!--                <option>Запорожье</option>-->
            <!--                <option>Одесса</option>-->
            <!--                <option>Львов</option>-->
            <!--                <option>Франковск</option>-->
            <!--                <option>Хмельницк</option>-->
            <!--                <option>Николаев</option>-->
            <!--                <option>Белая Церковь</option>-->
            <!--                <option>Мукачево</option>-->
            <!--                <option>Днепр</option>-->
            <!--                <option>Житомир</option>-->
            <!--                <option>Киев</option>-->
            <!--                <option>Полтава</option>-->
            <!--                <option>Краматорск</option>-->
            <!--                <option>Кривой Рог</option>-->
            <!--                <option>Черкассы</option>-->
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="owner">ФИО владельца</label>
          <input type="text" class="form-control" id="owner" v-model="form.owner" required>
        </div>
        <div class="form-group mb-3">
          <!--            добавить валидацию мака-->
          <label for="mac">MAC адресс устройства</label>
          <input type="text" class="form-control" id="mac" v-model="form.mac" required>
        </div>

        <div class="form-group form-check form-check-inline mb-3">
          <input class="form-check-input" type="radio" name="access" id="enabled" value="true" v-model="form.allowed">
          <label class="form-check-label" for="enabled">Разрешить доступ</label>
        </div>
        <div class="form-group form-check form-check-inline mb-3">
          <input class="form-check-input" type="radio" name="access" id="disabled" value="false">
          <label class="form-check-label" for="disabled">Запретить доступ</label>
        </div>
        <div class="form-group mb-3">
          <label for="comment">Комментарий</label>
          <textarea class="form-control" id="comment" placeholder="Необязательное поле" v-model="form.comment"></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import request from '../assets/scripts/request'
import types from '../assets/scripts/request'

export default ({
  components: {Navbar},
  data() {
    return {
      form: {
        id: '',
        department:'',
        type: '',
        owner: '',
        mac: '',
        allowed: 'false',
        comment: '',
        addingDate: (new Date())
      },
      types,
      departments: []
    }
  },
  methods: {
    async createDevice(){
      const {...device} = this.form
      const response = await request('/api/devices', "POST", device)
      this.devices = await request('/api/devices')
      await this.$swal({text: response.message})
        .then(function(isConfirm) {
            if (isConfirm) {
              location.reload()
            }
          })
    }
  },
  async created (){
    this.departments = await request('/api/departments')
    console.log("this.types", this.types)
  }
})


</script>