<template>
  <div class="main-page">
    <navbar />
    <div class="header">
      <h1>Main Page</h1>

      <div class="container" v-for="modal in modals" :key="modal">
        <button class="btn btn-success" @click="showModal(modal)">Show modal {{modal}}</button>
        <modal :name="modal">This is an {{modal}}</modal>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  data() {
    return {
      modals: ['60db2269cf2628063445a57d', '60db421084972f12d434b6b5']
    };
  },
  components: {
    Navbar,
  },
  methods: {
    showModal(m) {
      this.$modal.show(m)
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  h1 {
    color: #333333;
    font-size: 70px;
    margin-bottom: 20px;
  }
}
</style>
