<template>
  <div class="create-department">
    <navbar />
    <div class="container" id="create-department">
      <h1>Department Page</h1>
      <form @submit.prevent="createDepartment">
        <div class="form-group mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="name" class="form-control" id="name" v-model="departForm.name" aria-describedby="help">
          <div id="help" class="form-text">To create Department press 'Submit'</div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>  
</template>

<script>
import Navbar from '../components/Navbar'
import request from '../assets/scripts/request'


export default {
  components: {
    Navbar
  },
  data (){
    return {
      departForm: {
                id: '',
                name: '',
                devices: [],
                listId: ''
      }
    }
  },
  methods: {
    async createDepartment(){
      const {...department} = this.departForm
      await request('/api/departments', "POST", department)
      this.departments = await request('/api/departments')
    }
  }
}
</script>
