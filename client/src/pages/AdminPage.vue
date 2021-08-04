<template>
  <div class="admin-page">
    <navbar />
    <div class="container">
      <div class="title">
        <h1>Админка</h1>
      </div>
      <div class="content">
        <div class="d-flex justify-content-around">
          <div class="card" style="width: 21rem;">
            <img src="../assets/images/logo.png" class="card-img-top" alt="Зелька" style="width: 21rem; height: 21rem">
            <div class="card-body">
              <h5 class="card-title">Пользователи</h5>
              <p class="card-text">Управление пользовательскими учетными записями.</p>
            </div>
            <div class="card-footer">
              <router-link :to="$router.resolve({name: 'createUser'}).href" class="btn btn-primary mb-2">Добавить нового юзера</router-link>
              <router-link :to="$router.resolve({name: 'editUser'}).href" class="btn btn-primary mb-2">Изменить параметры для юзера</router-link>
            </div>
          </div>
          <div class="card" style="width: 21rem;">
            <img src="../assets/images/logo.png" class="card-img-top" alt="Зеленушка" style="width: 21rem; height: 21rem">
            <div class="card-body">
              <h5 class="card-title">Филиалы</h5>
              <p class="card-text">Позволяет предоставить доступы для устройств, за настроеваемым маршрутизатором.</p>
            </div>
            <div class="card-footer">
              <router-link :to="$router.resolve({name: 'createDepartment'}).href" class="btn btn-primary mb-2">Добавить филиал</router-link>
            </div>
          </div>
          <div class="card" style="width: 21rem;">
            <img src="../assets/images/logo.png" class="card-img-top" alt="Зелень" style="width: 21rem; height: 21rem">
            <div class="card-body">
              <h5 class="card-title">Устройства</h5>
              <p class="card-text">Ручное добавление устройства в систему.</p>
            </div>
            <div class="card-footer">
              <router-link :to="$router.resolve({name: 'createDevice'}).href" class="btn btn-primary mb-2">Добавить устройство</router-link>
              <router-link :to="$router.resolve({name: 'editDevice'}).href" class="btn btn-primary mb-2">Редактировать устройство</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
.content {
  margin-top: 30px;
}
</style>