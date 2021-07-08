<template>
  <div class="department-page">
    <navbar />
    <devices-list :id="id"/>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import DevicesList from '../components/DevicesList'

export default {
  data (){
    return {
      id: this.$route.params.id
    }
  },
  components: {
    Navbar,
    DevicesList
  }
}
</script>

<style>

</style>