<template>
  <div class="device-edit-menu">
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
      <h1>Lorem Ipsum</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident explicabo accusamus laudantium voluptatum nobis sed nesciunt neque possimus molestiae?</p>
      <button class="button" @click="showModal = false">
        Close Modal
      </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 400px;
 background-color: #FFF;
 border-radius: 16px;
 
 padding: 25px;
}
 </style>
