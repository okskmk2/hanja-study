<template>
  <div id="app">
    <Modal></Modal>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./component/Modal.vue";
export default {
  components: {
    Modal,
  },
};
</script>

<style>
</style>