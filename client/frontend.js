import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

const request = async (url, method="GET", data=null) => {
    try {
        const headers = {}
        let body
        if(data){
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e){
        console.warn('Error: ', e.message)
    }

}

new Vue({
    el: '#app',
    data() {
        return {
            form: {
                id: '',
                department:'',
                type: '',
                owner: '',
                mac: '',
                allowed: 'false',
                comment: '',
                addingDate: Date.now
            },
            departForm: {
                id: '',
                name: '',
                devices: [],
                listId: ''

            },
            departments: [],
            devices: []
        }

    },
    methods: {
        async createDevice(){
            const {...device} = this.form
            await request('/api/devices', "POST", device)
            this.devices = await request('/api/devices')
        },
        allowDevice(id){
            const device = this.devices.find(cur => cur._id === id )
            device.allowed = true
        },
        disallowDevice(id){
            const device = this.devices.find(cur => cur._id === id )
            device.allowed = false
        },
        async applyChanges(){
            const response = await request('/api/devices', "PATCH", this.devices)
            if(response){
                this.devices = await request('/api/devices')
            }
        },
        async createDepartment(){
            const {...department} = this.departForm
            await request('/api/departments', "POST", department)
            this.departments = await request('/api/departments')

        }
    },
    async mounted() {
        this.departments = await request('/api/departments')
        this.devices = await request('/api/devices')
    }
})


