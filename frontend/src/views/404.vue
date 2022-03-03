<template>
  <div>
    <p>존재하지 않는 페이지입니다.</p>
    <router-link to="/">홈으로 가기</router-link>
    <button @click="$router.back()">뒤로가기</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>