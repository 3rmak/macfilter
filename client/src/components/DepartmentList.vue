<template>
  <div class="department-list">
    <div class="card-columns">
      <department-card
        class="department-card"
        v-for="department in departments" 
        :key="department.id" 
        :department="department">
        
      </department-card>
    </div>

  </div>
  
</template>

<script>
import DepartmentCard from '../components/DepartmentCard'

export default {
  components: { DepartmentCard },
  props: {
    departments: Array,
    default: () => []
  }  
}

</script>
<style scoped>
  .department-list {
    margin-top: 30px;
    margin-left: 30px;
  }
</style>