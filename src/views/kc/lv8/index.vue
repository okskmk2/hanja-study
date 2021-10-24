<template>
  <div class="snb-content-container">
    <KcL8Snb></KcL8Snb>
    <router-view></router-view>
  </div>
</template>

<script>
import KcL8Snb from "./KcL8Snb";
export default {
  components: { KcL8Snb }
};
</script>

<style>
</style>