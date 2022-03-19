<template>
  <div>
    <h2>기본정보</h2>
    <div class="hanja-letter">
      <div class="letter">
        {{ hanja.letter }}
      </div>
      <div class="hanja-meta">
        <div class="meaning">{{ hanja.meaning }}</div>
        <div class="sound">{{ hanja.sound }}</div>
      </div>
    </div>
    <h2>선정한자</h2>
    <div class="tag-group">
      <span
        to="/selected-hanja"
        v-for="org in hanja.org"
        :key="org.org_name"
        class="tag"
        @click="gotoSelectHanja(org)"
      >
        {{ org.org_name }}
        <template v-if="org.sub_tier > 1">준</template>
        {{ org.tier }}급
      </span>
    </div>
    <h2>그림한자</h2>
    <h2>따라쓰기</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hanja: {
        letter: null,
        meangin: null,
        sound: null,
        org: [],
      },
    };
  },
  methods: {
    gotoSelectHanja(org) {
      this.$store.commit("setOrgTier", org);
      this.$router.push("/selected-hanja");
    },
  },
  created() {
    axios.get(`/hanja/${this.$route.params.hanja_id}`).then((res) => {
      this.hanja = res.data;
    });
  },
};
</script>

<style>
</style>