<template>
  <div class="department-page" v-cloak>
    <div class="container">
      <h1>РОП {{ department }}</h1>
      <div v-if="devices.length">
        <div class="row justify-content-around">
          <div v-for="device in devices" :key="device">
            <div class="col-sm-4">
              <device-card :device="device" />
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
import request from "../assets/scripts/request";

export default {
  props: {
    id: String,
  },
  components: {
    DeviceCard,
  },
  data() {
    return {
      devices: [],
      department: "",
    };
  },
  async created() {
    const devices = await request('/api/devices');
    this.devices = devices.filter((device) => device.department === this.id);
    const departments = await request('/api/departments');
    departments.map((cur) => {
      if (cur._id === this.id) {
        this.department = cur.name;
      }
    });

    // const film = films.find(film => film.id == this.$route.params.id)
    // if (film) {
    //   this.film = film
    // }
  },
  methods: {
    async applyChanges() {
      const response = await request(
        '/api/devices',
        "PATCH",
        this.devices
      );
      if (response) {
        this.$swal({ text: "Изменения сохранены!" }).then(() => {
          location.reload();
        });
      }
    },
  },
};
</script>
<style scoped></style>
