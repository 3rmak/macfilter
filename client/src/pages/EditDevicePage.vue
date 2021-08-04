<template>
  <div class="edit-device-page">
    <navbar />
    <div class="container">
      <select
        class="form-control"
        id="select-user"
        @click="setOption($event)"
        required
      >
        <option value="" disabled selected>
          Выбери департамент для отображения устройств
        </option>
        <option v-for="item in departments" :key="item.name" :value="item._id">
          {{ item.name }}
        </option>
      </select>
      <button
        class="btn btn-success"
        @click="$router.push({ name: 'departmentPage', params: { id: id } })"
      >
        Перейти
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import request from "../assets/scripts/request";
export default {
  components: { Navbar },
  data() {
    return {
      id: "",
      departments: [],
    };
  },
  methods: {
    setOption(event) {
      this.id = event.target.value;
      console.log("this.id", event.target.value);
    },
  },
  async mounted() {
    this.departments = await request("/api/departments");
  },
};
</script>

<style></style>
