<template>
  <div style="display:flex;flex-direction:column;height:100%">
    <gnb></gnb>
    <router-view style="flex-grow:1"></router-view>
    <fnb></fnb>
  </div>
</template>

<script>
import gnb from "../layout/Gnb";
import fnb from "../layout/Fnb";
export default {
  components: {
    gnb,
    fnb
  }
};
</script>

<style>
</style>