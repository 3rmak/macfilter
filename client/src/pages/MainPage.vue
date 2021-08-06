<template>
  <div class="main-page">
    <navbar />
    <div class="header">
      <h1>Main Page</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar,
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
