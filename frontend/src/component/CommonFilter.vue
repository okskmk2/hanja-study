<template>
  <table>
    <tr>
      <th>시행기관</th>
      <td>
        <label>
          <input type="checkbox" value="kc" />
          대한검정회
        </label>
        <label>
          <input type="checkbox" value="ac" />
          한국어문회
        </label>
        <label>
          <input type="checkbox" value="jc" />
          한자교육진흥회
        </label>
      </td>
    </tr>
    <tr>
      <th>급수</th>
      <td>
        <label>
          <input type="checkbox" value="8" />
          8급
        </label>
        <label>
          <input type="checkbox" value="7" />
          7급
        </label>
        <label>
          <input type="checkbox" value="6" />
          6급
        </label>
        <label>
          <input type="checkbox" value="5" />
          5급
        </label>
        <label>
          <input type="checkbox" value="4" />
          4급
        </label>
        <label>
          <input type="checkbox" value="3" />
          3급
        </label>
        <label>
          <input type="checkbox" value="2" />
          2급
        </label>
        <label>
          <input type="checkbox" value="1" />
          1급
        </label>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  methods: {
    onchangeOrganization(v) {
      console.log(v.target.value);
    },
    onchangeLevel(v) {
      console.log(v.target.value);
    }
  }
};
</script>

<style scoped lang="less">
table {
  width: 100%;
  th {
    text-align: left;
  }
  th,
  td {
    padding: 4px;
  }
  tr {
    label {
      margin-right: 8px;
      display: inline-flex;
    }
  }
}
</style>