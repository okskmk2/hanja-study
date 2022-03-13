<template>
  <div class="row">
    <CommonFilter></CommonFilter>
    <div class="col2-content">
      <h1>선정한자</h1>
      <div class="row jc-between mb-05 no-print">
        <div class="top-btn-subgroup">
          <button @click="hideLetter = !hideLetter">
            <span>한자</span>
            <span v-if="hideLetter">보이기</span>
            <span v-else>가리기</span>
          </button>
          <button @click="hideMeta = !hideMeta">
            <span>훈음</span>
            <span v-if="hideMeta">보이기</span>
            <span v-else>가리기</span>
          </button>
        </div>
        <div class="top-btn-subgroup">
          <button @click="print('all')">모든 페이지 다운로드</button>
          <button @click="print('current')">현재 페이지 다운로드</button>
        </div>
      </div>
      <div class="selected-hanjas">
        <div v-for="hanja in hanjas" :key="hanja.id" class="hanja-letter">
          <div class="letter" :class="{ 'hide-letter': hideLetter }">
            {{ hanja.letter }}
          </div>
          <div class="hanja-meta" :class="{ 'hide-letter': hideMeta }">
            <div class="meaning">{{ hanja.meaning }}</div>
            <div class="sound">{{ hanja.sound }}</div>
          </div>
        </div>
      </div>
      <div>(페이지네이션 영역)</div>
    </div>
  </div>
</template>

<script>
import CommonFilter from "../component/CommonFilter";
import axiso from "axios";

export default {
  components: { CommonFilter },
  data() {
    return {
      hanjas: [],
      hideLetter: false,
      hideMeta: false,
    };
  },
  methods: {
    print() {
      print();
    },
  },
  created() {
    axiso.get("/hanja").then((res) => {
      this.hanjas = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.selected-hanjas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.hanja-letter {
  padding: 1rem;
  box-shadow: 1px 1px 4px 1px #ccc;
  display: inline-flex;
  flex-direction: column;
  .letter {
    font-size: 10rem;
  }
  .hanja-meta {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    font-size: 18px;
  }
  .meaning {
  }
  .sound {
  }
}
</style>
