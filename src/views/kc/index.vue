<template>
  <div>
    <kc-lnb></kc-lnb>
    <router-view></router-view>
  </div>
</template>

<script>
import KcLnb from "./KcLnb";
export default {
  components: { KcLnb }
};
</script>

<style>
</style>