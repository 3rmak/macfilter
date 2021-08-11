<template>
  <div class="device-edit-menu">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Редактирование устройства</h5>
      </div>
      <div class="modal-body">
        <p class="card-text">
          <b>Дата добавления: {{ new Date(device.addingDate) }}</b>
        </p>
        <p class="card-text"><b>Мак адресс: {{ device.mac }}</b></p>
        <p class="card-text"><b>Владелец:</b> <input type="text" value="setDefaultOwner()" :placeholder="device.owner" v-model="device.owner"></p>
        <p class="card-text"><b>Тип:</b>
          <select class="type-selection" v-model="device.type">
            <option selected disabled hidden>{{device.type}}</option> 
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
        </p>
        <hr/>
        <p class="card-text">Комментарий: 
          <input :placeholder="device.comment" v-model="device.comment">
        </p>
      </div>
      <div class="modal-footer pt-0">
        <button class="btn btn-danger" @click="deleteDevice">Удалить</button>
        <button class="btn btn-success" @click="saveChanges">Сохранить изменения</button>
        <button class="btn btn-secondary" @click="$modal.hide(device._id)">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../assets/scripts/request'
export default {
  props: {
    device: {
      type: Object,
    },
  },
  computed: {
    setDefaultOwner() {
      return this.device.owner
    }
  },
  methods: {
    async saveChanges() {
      try {
        const response = await request('/api/devices', "PATCH", this.device)
        await this.$swal({text: response.message})
          .then(()=>{
            location.reload()
          })
      } catch (error) {
        await this.$swal({text: 'Не удалось применить изменения :('})
          .then(()=>{
            location.reload()
          })
      }
    },
    async deleteDevice() {
      try {
        console.log('this.device', this.device)
        const response = await request('/api/devices', "DELETE", this.device)
        await this.$swal({text: response.message})
          .then(()=>{
            location.reload()
          })
      } catch (error) {
        console.warn(error)
      }
    }
  }
};
</script>
