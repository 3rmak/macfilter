<template>
  <div class="department-card" style="width: 25rem;">
    <div class="card text-center">
      <img class="card-img-top" src="../assets/images/logo.png" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ department.name }}</h5>
        <p class="card-devices">Устройств: {{ (department.devices).length/2 }}</p>
        <router-link :to="$router.resolve({name: 'departmentPage', params: {id: department._id}}).href"
          class="more-info"
        >К устройствам
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    department: {
      type: Object
    }
  },
  async mounted (){
    console.log("Departs: ", this.department)
  }
}
</script>


<style lang="scss" scoped>
  .card {
    margin-bottom: 30px;
    margin-left: 30px;
    border-radius: 10px;
    border: 2px solid;
  }
  // .card-img-top {
  //   display: block;
  //   margin-left: auto;
  //   margin-right: auto;
    
  // }
  .card-title {
    position: absolute;
    margin-bottom: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    color: #ffffff;
    height: 80px;
    align-items: center;
    //background: linear-gradient(90deg, rgb(12, 77, 97) 0%, rgba(0,0,0,0) 90%);
    background: rgb(3, 32, 94);
    font-weight: 700;
    padding: 20px;
    font-size: 30px;
    border-radius: 0 0 10px 10px;
  }
  .card-devices {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #EB5804;
    width: 170px;
    height: 50px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
    border-radius: 0 10px 0 10px;
    opacity: 0.8;
  }
  .more-info {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 30px;
    text-decoration: none;
    opacity: 0;
    transition: all 0.2s ease;
    &:hover, &:focus {
      opacity: 1;
    }
  }
</style>

