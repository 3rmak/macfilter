<template>
  <div class="department-list">
    <div class="row align-items-start">
      <department-card
        class="department-card"
        v-for="department in departments" 
        :key="department._id" 
        :department="department">
        
      </department-card>
    </div>

  </div>
  
</template>

<script>
import DepartmentCard from '../components/DepartmentCard'
import request from '../assets/scripts/request'

export default {
  components: { DepartmentCard },
  data (){
    return {
      departments: []
    }
  },
  async created (){
    const userAccessDepartments = JSON.parse(localStorage.getItem('access'))
    if(typeof userAccessDepartments === "string"){
      this.departments.push(await request(`/api/departments/${userAccessDepartments}`))
    }
    else if(Array.isArray(userAccessDepartments)){
      userAccessDepartments.map(async(cur)=> {
      this.departments.push(await request(`/api/departments/${cur}`)) 
      })
    }
    
  }
}
</script>
<style scoped>
  .department-list {
    margin-top: 30px;
    margin-left: 30px;
  }
</style>