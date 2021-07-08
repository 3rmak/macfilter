<template>
  <div class="all-department-page">
    <navbar />
    <department-list :departments="departments"/>
  </div>
</template>

<script>
import DepartmentList from '../components/DepartmentList'
import Navbar from '../components/Navbar'
export default {
  components: { Navbar, DepartmentList },
  data (){
    return {
      url: "http://localhost:3001",
      departments: [],
    }
  },
  async created (){
    this.departments = await request(`${this.url}/api/departments`)
  }

}

const request = async (url, method="GET", data=null) => {
    try {
        const headers = {}
        const mode = 'cors'
        let body
        if(data){
            headers['Content-Type'] = 'application/json'
            headers['Access-Control-Allow-Origin'] = '*',
            headers['Access-Control-Allow-Methods'] = 'GET, POST',
            headers['Access-Control-Allow-Headers'] = 'Content-Type',
            headers['Access-Control-Max-Age'] = '3600'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            mode,
            headers,
            body
        })
        return await response.json()
    } catch (e){
        console.warn('Errorinio: ', e.message)
    }
}

</script>

<style>

</style>