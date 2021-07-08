<template>
<div class="department-page container pt-3" v-cloak>
    <h1>РОП {{ department }}</h1>
    <div v-if="devices.length">
        <div class="card mb-3 mt-3" v-for="device in devices" :key="device" :style="{background: device.allowed ? '#4EE475' : '#CD5C5C'}" style="width: 30rem;">
            <div class="card-body">
                <h4 class="card-title">{{device.type}}</h4>
                <p class="card-text"><b>Владелец:</b> {{device.owner}}</p>
                <p class="card-text"><b>Мак адресс:</b> {{device.mac}}</p>
                <p class="card-text"><b>Дата добавления:</b> {{device.addingDate}}</p>
                <div v-if="device.comment">
                    <hr>
                    <p class="text-secondary">{{device.comment}}</p>
                </div>

                <button class="btn btn-success" v-on:click="allowDevice(device._id)" :disabled="device.allowed">Разрешить</button>
                <button class="btn btn-danger" v-on:click="disallowDevice(device._id)" :disabled="!device.allowed">Запретить</button>
            </div>
        </div>
        <button class="btn-primary" v-on:click="applyChanges()">Сохранить изменения</button>
    </div>
    <div v-else class="text-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    
</div>
  
</template>

<script>

export default {
  props: {
      id: String
  },
  data() {
    return {
      url: "http://localhost:3001",
      devices: [],
      department: ""
    }
  },
  async created() {
    const devices = await request(`${this.url}/api/devices`)
    this.devices = devices.filter(device => device.department === this.id)
    const departments = await request(`${this.url}/api/departments`)
    departments.map(cur => {
        if(cur._id === this.id){
            this.department =  cur.name
        }
    })
    
    // const film = films.find(film => film.id == this.$route.params.id)
    // if (film) {
    //   this.film = film
    // }
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
