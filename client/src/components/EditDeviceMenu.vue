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
        <div class="container-md pb-3">
          <b>
            <div class="row item-start">
              <span class="col"> Мак адресс: </span>
              <span class="col">
                {{ device.mac }}
              </span>
            </div>
          </b>
        </div>
        <div class="container-md pb-3">
          <div class="row item-start">
            <span class="col"> Владелец: </span>
            <span class="col">
              <input
                type="text"
                value="setDefaultOwner()"
                :placeholder="device.owner"
                v-model="device.owner"
              />
            </span>
          </div>
        </div>
        <div class="container-md pb-3">
          <div class="row item-start">
            <span class="col"> Тип: </span>
            <span class="col">
              <select class="type-selection" v-model="device.type">
                <option selected disabled hidden>{{ device.type }}</option>
                <option>Компьютер</option>
                <option>Принтер</option>
                <option>IP-телефон</option>
                <option>Видеонаблюдение</option>
                <option>СКУД</option>
                <option>Смартфон</option>
                <option>Планшет</option>
                <option>Ноутбук</option>
                <hr />
                <option>Other</option>
              </select>
            </span>
          </div>
        </div>
        <hr />
        <div class="container-md pb-3">
          <div class="form-floating">
            <textarea class="form-control" :placeholder="device.comment" v-model="device.comment" style="height: 100px"></textarea>
            <small style="color: gray;">*Комментарий</small>
          </div>
        </div>
      </div>
      <div class="modal-footer pt-0">
        <button class="btn btn-danger" @click="deleteDevice">Удалить</button>
        <button class="btn btn-success" @click="saveChanges">
          Сохранить изменения
        </button>
        <button class="btn btn-secondary" @click="$modal.hide(device._id)">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../assets/scripts/request";
export default {
  props: {
    device: {
      type: Object,
    },
  },
  computed: {
    setDefaultOwner() {
      return this.device.owner;
    },
  },
  methods: {
    async saveChanges() {
      try {
        const { allowed, comment, department, type, owner } = this.device;
        const deviceToUpdate = { type, owner, allowed, comment, department };

        const response = await request(`/api/devices/${this.device._id}`, "PATCH", deviceToUpdate);

        await this.$swal({ text: response.message }).then(() => {
          location.reload();
        });
      } catch (error) {
        await this.$swal({ text: "Не удалось применить изменения :(" }).then(
          () => {
            location.reload();
          }
        );
      }
    },
    async deleteDevice() {
      try {
        const response = await request(`/api/devices/${this.device._id}`, "DELETE");
        await this.$swal({ text: response.message }).then(() => {
          location.reload();
        });
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>
