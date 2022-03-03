<template>
  <div>
    <Gnb></Gnb>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Gnb from "./Gnb";
export default {
  components: {
    Gnb
  }
};
</script>

<style>
</style>