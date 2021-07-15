<template>
  <div class="department-page" v-cloak>
    <!-- <div v-if="devices.length">
            <div class="card mb-3 mt-3" v-for="device in devices" :key="device" :style="{background: device.allowed ? '#4EE475' : '#CD5C5C'}" style="width: 30rem;">
              <device-card :device="device"/>  
            </div>
            <button class="btn btn-primary" v-on:click="applyChanges()">Сохранить изменения</button>
        </div>
        <div v-else class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div> -->
    <div class="container">
      <h1>РОП {{ department }}</h1>
      <div class="row justify-content-around" v-if="devices.length">
        <div v-for="device in devices" :key="device">
          <div class="col-sm-4">
            <device-card :device="device" />
          </div>
        </div>
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

export default {
  props: {
    id: String,
  },
  components: {
    DeviceCard,
  },
  data() {
    return {
      url: "http://localhost:3001",
      devices: [],
      department: "",
    };
  },
  async created() {
    const devices = await request(`${this.url}/api/devices`);
    this.devices = devices.filter((device) => device.department === this.id);
    const departments = await request(`${this.url}/api/departments`);
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
};

const request = async (url, method = "GET", data = null) => {
  try {
    const headers = {};
    const mode = "cors";
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      (headers["Access-Control-Allow-Origin"] = "*"),
        (headers["Access-Control-Allow-Methods"] = "GET, POST"),
        (headers["Access-Control-Allow-Headers"] = "Content-Type"),
        (headers["Access-Control-Max-Age"] = "3600");
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      mode,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn("Errorinio: ", e.message);
  }
};
</script>

<style scoped></style>
