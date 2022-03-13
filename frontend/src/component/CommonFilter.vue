<template>
  <div class="commonfilter no-print">
    <div>
      <div class="mb-05">시행기관</div>
      <div class="commonfilter-subgroup">
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
      </div>
    </div>
    <div class="mt-1">
      <div class="mb-05">급수</div>
      <div class="commonfilter-subgroup">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onchangeOrganization(v) {
      console.log(v.target.value);
    },
    onchangeLevel(v) {
      console.log(v.target.value);
    },
  },
};
</script>

<style scoped lang="less">
.commonfilter {
  padding: 1rem;
  width: 10rem;
  background-color: #f2f2f2;
  .commonfilter-subgroup {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>