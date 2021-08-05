<template>
  <!-- <div class="card">
  <div class="card-body"> -->
  <!-- <h4 class="card-title">{{device.type}}</h4>
    <p class="card-text"><b>Владелец:</b> {{device.owner}}</p>
    <p class="card-text"><b>Мак адресс:</b> {{device.mac}}</p>
    <p class="card-text"><b>Дата добавления:</b> {{device.addingDate}}</p>
    <div v-if="device.comment">
        <hr>
        <p class="text-secondary">{{device.comment}}</p>
    </div>

    <button class="btn btn-success mr-3" v-on:click="allowDevice(device._id)" :disabled="device.allowed">Разрешить</button>
    <button class="btn btn-danger" v-on:click="disallowDevice(device._id)" :disabled="!device.allowed">Запретить</button> -->
  <!--     
  </div>
</div> -->

  <div class="device-card">
    <div class="card box-shadow mx-auto my-5" style="width: 18rem">
      <div
        class="card-header"
        :style="{ background: device.allowed ? '#4EE475' : '#CD5C5C' }"
      >
        <div class="logo-container">
          <img :src="getLogoPath" class="card-img-top" alt="logo" />
        </div>
        <!-- <router-link :to="$router.resolve({ name: 'main' }).href">
          <div class="wrapper pencil">
            <img src="../assets/images/pencil-removebg-preview.png" />
          </div>
        </router-link> -->
        <a type="button" class="logo-container" @click="showModal">
          <div class="wrapper pencil">
            <img src="../assets/images/pencil-removebg-preview.png" />
          </div>
        </a>
        <!-- <button class="btn btn-secondary wrapper pencil" @click="showModal">Edit</button> -->
        <!-- Modal  -->
        
      </div>
      <div class="card-body">
        <div class="card-title">
          <h5>{{ device.type }}</h5>
        </div>
        <div class="content">
          <p class="card-text"><b>Владелец:</b> {{ device.owner }}</p>
          <p class="card-text"><b>Мак адресс:</b> {{ device.mac }}</p>
          <p class="card-text">
            <b>Дата добавления:</b> {{ new Date(device.addingDate) }}
          </p>
          <div v-if="device.comment">
            <hr />
            <p class="text-secondary">{{ device.comment }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button
          class="btn btn-success mr-3"
          v-on:click="allowDevice(device._id)"
          :disabled="device.allowed"
        >
          Разрешить
        </button>
        <button
          class="btn btn-danger"
          v-on:click="disallowDevice(device._id)"
          :disabled="!device.allowed"
        >
          Запретить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LogoNames from "../assets/scripts/NameDevices";

export default {
  components: {  },
  props: {
    device: {
      type: Object,
    },
  },
  data() {
    return {
      logoNames: LogoNames,
    };
  },
  computed: {
    getLogoPath() {
      const path = this.logoNames[this.device.type];
      console.log("path", path);
      return path;
    },
  },
  methods: {
    allowDevice() {
      this.device.allowed = true;
    },
    disallowDevice() {
      this.device.allowed = false;
    },
    showModal() {
      this.$emit("showModal", this.device._id)
    }
  },
};
</script>

<style>
a {
  cursor: pointer;
}

p {
  padding-bottom: 1rem;
}

h5 {
  font-weight: bold;
  color: #2b2b2b;
}
.card-header {
  height: 18rem;
  width: 18rem;
}
.box-shadow {
  -webkit-box-shadow: 0 1px 1px rgba(72, 78, 85, 0.6);
  box-shadow: 0 1px 1px rgba(72, 78, 85, 0.6);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.box-shadow:hover {
  -webkit-box-shadow: 0 20px 40px rgba(72, 78, 85, 0.6);
  box-shadow: 0 20px 40px rgba(72, 78, 85, 0.6);
  -webkit-transform: translateY(-2px);
  -moz-transform: translateY(-2px);
  -ms-transform: translateY(-2px);
  -o-transform: translateY(-2px);
  transform: translateY(-2px);
}
*/ .card {
  border-radius: 25px;
  min-width: 200px;
  max-width: 800px;
}

.card img {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.wrapper {
  position: absolute;
  height: 55px;
  width: 55px;
  float: left;
  transition: all 0.5s ease-in-out;
}
.pencil {
  top: 16rem;
  right: 1.5rem;
  position: absolute;
  background: #ffffff;
  border-radius: 25px 25px 25px 25px;

  border: 2px solid rgb(189, 192, 192);
  color: white;
  font-size: 5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.wrapper.pencil img {
  width: 100%;
  height: 100%;
}
.card :hover .pencil {
  transform: rotate(-360deg);
  box-shadow: #3d7d7d inset;
}

</style>
