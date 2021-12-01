<template>
  <div class="department-page" v-cloak>
    <div class="container">
      <div class="header-container row justify-content-between inline">
        <h1 class="col-5">РОП {{ department }}</h1>
        <div class="col-5 text-right">
          <router-link
            class="btn btn-outline-info"
            type="submit"
            :to="$router.resolve({ name: 'createDevice' }).href"
            >Добавить устройство вручную
          </router-link>
        </div>
      </div>

      <div v-if="devices.length">
        <div class="row justify-content-start">
          <div v-for="device in devices" :key="device">
            <div class="col-sm-4 ml-5 mr-4">
              <device-card :device="device" @showModal="showModal" />
              <modal :name="device._id" :width="450" :height="'auto'">
                <edit-device-menu :device="device" />
              </modal>
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary mb-5"
          type="submit"
          v-on:click="applyChanges()"
        >
          Сохранить изменения
        </button>
      </div>
      <div v-else class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceCard from "../components/DeviceCard";
import EditDeviceMenu from "./EditDeviceMenu";
import request from "../assets/scripts/request";

export default {
  props: {
    id: String,
  },
  components: {
    DeviceCard,
    EditDeviceMenu,
  },
  data() {
    return {
      devices: [],
      department: "",
    };
  },
  async created() {
    const devices = await request("/api/devices");
    this.devices = devices.filter((device) => device.department === this.id);

    const department = await request(`/api/departments/${this.id}`);
    this.department = department.name;
  },
  methods: {
    async applyChanges() {
      const devicesToUpdate = this.devices.map(item => {
        return {
          '_id': item._id,
          'allowed': item.allowed,
          'department': item.department
        }
      });
      const response = await request("/api/devices/multiple", "PATCH", devicesToUpdate);

      if (response) {
        this.$swal({ text: response.message }).then(() => {
          location.reload();
        });
        console.log("this.devices", Array.isArray(this.devices));
      }
    },
    showModal(id) {
      console.log("id", id);
      this.$modal.show(id);
    },
  },
};
</script>
<style scoped></style>
