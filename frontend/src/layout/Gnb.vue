<template>
  <header>
    <div>
      <router-link to="/">한자급수시험</router-link>
      <nav class="top-menu">
        <router-link to="/selected-hanja">선정한자</router-link>
        <router-link to="/picture-hanja">그림한자</router-link>
        <router-link to="/practice">따라쓰기</router-link>
        <router-link to="/test-bank">기출문제</router-link>
        <router-link to="/four-letters">사자성어</router-link>
      </nav>
      <nav>
        <router-link to="/login">로그인</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
header {
  border-bottom: 1px solid;
  > div {
    width: 70rem;
    margin: 0 auto;
    font-size: 20px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    a {
      color:black;
      text-decoration: none;
      &.router-link-exact-active {
        color: red;
      }
      &:hover {
        text-decoration: underline;
      }
    }
    .top-menu {
      display: flex;
      gap: 3rem;
    }
  }
}
</style>