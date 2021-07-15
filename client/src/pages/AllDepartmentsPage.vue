<template>
  <div class="all-department-page">
    <navbar />
    <department-list />
  </div>
</template>

<script>
import DepartmentList from '../components/DepartmentList'
import Navbar from '../components/Navbar'
export default {
  components: { Navbar, DepartmentList },
}


</script>

<style>

</style>