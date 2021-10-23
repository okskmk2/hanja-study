<template>
  <header>
    <span>한자급수시험</span>
    <nav class="top-menu">
      <router-link to="/kc">대한검정회</router-link>
      <router-link to="/ac">어문회</router-link>
      <router-link to="/hc">한자진흥회</router-link>
      <router-link to="/sc">상공회</router-link>
    </nav>
    <nav>
      <router-link to="/login">로그인</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
header {
  padding: 8px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
  .top-menu {
    display: flex;
    gap: 2rem;
  }
}
</style>