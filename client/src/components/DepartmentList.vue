<template>
  <div class="department-list">
    <div class="row align-items-center">
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
      url: "http://localhost:3001",
      departments: []
    }
  },
  async created (){
    const userAccessDepartments = JSON.parse(localStorage.getItem('access'))
    if(typeof userAccessDepartments === "string"){
      this.departments.push(await request(`${this.url}/api/departments/${userAccessDepartments}`))
    }
    else if(typeof userAccessDepartments === "object"){
      await userAccessDepartments.map(async(cur)=> {
      this.departments.push(await request(`${this.url}/api/departments/${cur}`)) 
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