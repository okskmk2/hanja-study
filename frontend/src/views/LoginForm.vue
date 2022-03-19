<template>
  <div
    class="col jc-center ai-center"
    style="height: 100%; background-color: #ddd"
  >
    <div class="login-form">
      <h1>한자급수시험</h1>
      <div>
        <label>
          아이디
          <input type="text" id="hanja_study_account"/>
        </label>
        <label>
          비밀번호
          <input type="password" id="hanja_study_pwd"/>
        </label>
        <div class="login-btn-group">
          <button class="login-btn">로그인</button>
        </div>
      </div>
      <hr />
      <div>
        <router-link to="/">한자스터디 바로가기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.login-form {
  padding: 2rem;
  width: 25rem;
  box-shadow: 1px 1px 8px 4px #bbb;
  background-color: white;
  label {
    margin-bottom: 1rem;
    display: block;
    input {
      width: 100%;
      display: block;
      margin-top: 4px;
      padding: 6px 8px;
      box-sizing: border-box;
      font-size: 16px;
      color: #222;
    }
  }
  .login-btn-group {
    margin-top: 2rem;
  }
  .login-btn {
    width: 100%;
    padding: 6px;
    font-size: 14px;
  }
  hr {
    margin: 1rem 0;
  }
}
</style>