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
      },
      url: "http://localhost:3001"
    }
  },
  methods: {
    async createDepartment(){
      const {...department} = this.departForm
      await request(`${this.url}/api/departments`, "POST", department)
      this.departments = await request(`${this.url}/api/departments`)
    }
  }
}
</script>
