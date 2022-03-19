<template>
  <header class="no-print">
    <div>
      <router-link to="/" class="brand">한자급수시험</router-link>
      <nav class="top-menu">
        <router-link to="/selected-hanja">선정한자</router-link>
        <router-link to="/four-letters">사자성어</router-link>
        <router-link to="/quiz">퀴즈</router-link>
        <router-link to="/test-bank">기출문제</router-link>
      </nav>
      <nav>
        <router-link to="/login-form">로그인</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
header {
  .brand {
    color: black;
  }
  background-color: #f0fff7;
  border-bottom: 2px solid #33cda1;
  > div {
    width: 70rem;
    margin: 0 auto;
    font-size: 20px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    a {
      color: #424242;
      text-decoration: none;
      &.router-link-exact-active {
        color: inherit;
        padding-bottom: 4px;
        border-bottom: 2px solid red;
      }
      &:hover {
        text-decoration: none;
      }
    }
    .top-menu {
      display: flex;
      gap: 3rem;
    }
  }
}
</style>