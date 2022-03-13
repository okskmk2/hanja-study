<template>
  <div class="row">
    <CommonFilter></CommonFilter>
    <div class="col2-content">
      <h1>기출문제</h1>
      <div class="row jc-end">
        <input
          type="file"
          style="display: none"
          ref="inputFileRef"
          @change="onchangeInputFile"
        />
        <button @click="onclickUpload">업로드</button>
      </div>
      <div>
        <table class="full">
          <thead>
            <tr>
              <th>기관</th>
              <th>급수</th>
              <th>제목</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button>다운로드</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommonFilter from "../component/CommonFilter";
export default {
  components: { CommonFilter },
  methods: {
    onclickUpload() {
      this.$refs.inputFileRef.click();
    },
    onchangeInputFile() {
      console.log("파일내용이 업데이트되었다.");
      const form = new FormData();
      form.append("file", this.$refs.inputFileRef.files[0]);

      axios.post("/testbank/upload", form).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>