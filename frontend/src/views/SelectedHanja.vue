<template>
  <div>
    <h1>선정한자</h1>
    <div class="row jc-between mb-1 no-print">
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
        <button @click="print('all')">모든 페이지 다운로드</button>
        <button @click="print('current')">현재 페이지 다운로드</button>
        <button @click="openAddHanjaModal">한자추가(관리자전용)</button>
      </div>
    </div>
    <div class="filter-group">
      <FilterSelect
        :items="orgs"
        label="기관"
        v-model="searchingOrg"
        @input="searchHanja"
      />
      <FilterSelect
        :items="tiers"
        label="급수"
        v-model="searchingTier"
        @input="searchHanja"
      />
    </div>
    <div v-if="hanjas.length > 0">
      <div class="selected-hanjas">
        <div v-for="hanja in hanjas" :key="hanja.id" class="hanja-letter">
          <div class="row jc-end">
            <router-link to="/test-bank" class="icon">
              <SvgIcon :path="mdiDotsVertical" type="mdi" />
            </router-link>
          </div>
          <div class="letter" :class="{ 'hide-letter': hideLetter }">
            {{ hanja.letter }}
          </div>
          <div class="hanja-meta" :class="{ 'hide-letter': hideMeta }">
            <div class="meaning">{{ hanja.meaning }}</div>
            <div class="sound">{{ hanja.sound }}</div>
          </div>
        </div>
      </div>
      <div class="mt-1">(페이지네이션 영역)</div>
    </div>
    <div v-else>
      <div v-if="!searchingOrg || !searchingTier">
        기관과 급수를 선택하세요.
      </div>
      <div v-else>조회된 한자가 없습니다.</div>
    </div>
    <portal to="modal">
      <h1>선정한자 등록</h1>
      <label for="" class="block">
        기관
        <select v-model="hanjaForm.org">
          <option v-for="org in orgs" :key="org.id" :value="org.value">
            {{ org.text }}
          </option>
        </select>
      </label>
      <label for="" class="block">
        급수
        <select v-model="hanjaForm.tier">
          <option v-for="tier in tiers" :key="tier.id" :value="tier.value">
            {{ tier.text }}
          </option>
        </select>
      </label>
      <label for="addHanja_letter" class="block">
        한자
        <input type="text" id="addHanja_letter" v-model="hanjaForm.letter" />
      </label>
      <label for="addHanja_meaning" class="block">
        훈(뜻)
        <input type="text" id="addHanja_meaning" v-model="hanjaForm.meaning" />
      </label>
      <label for="addHanja_sound" class="block">
        음(소리)
        <input type="text" id="addHanja_sound" v-model="hanjaForm.sound" />
      </label>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <div class="row jc-end mt-1">
        <button @click="addHanja" :disabled="!isValid">등록</button>
      </div>
    </portal>
  </div>
</template>

<script>
import axiso from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiDotsVertical } from "@mdi/js";
import FilterSelect from "../component/FilterSelect";

export default {
  components: { FilterSelect, SvgIcon },
  data() {
    return {
      hanjas: [],
      hideLetter: false,
      hideMeta: false,
      mdiDotsVertical: mdiDotsVertical,
      hanjaForm: {
        letter: null,
        meaning: null,
        sound: null,
        org: null,
        tier: null,
      },
      orgs: [
        { id: 1, text: "한국어문회", value: "G1001" },
        { id: 2, text: "대한검정회", value: "G1002" },
        { id: 3, text: "한자교육진흥회", value: "G1003" },
      ],
      tiers: [
        { id: 1, text: "8급", value: 8 },
        { id: 2, text: "7급", value: 7 },
        { id: 3, text: "6급", value: 6 },
        { id: 4, text: "5급", value: 5 },
        { id: 5, text: "4급", value: 4 },
        { id: 6, text: "3급", value: 3 },
        { id: 7, text: "2급", value: 2 },
        { id: 8, text: "1급", value: 1 },
      ],
      searchingOrg: null,
      searchingTier: null,
      isValid: false,
      errorMessage: null,
    };
  },
  methods: {
    print() {
      print();
    },
    openAddHanjaModal() {
      this.$store.commit("openModal");
    },
    searchHanja() {
      if (this.searchingOrg && this.searchingTier) {
        axiso
          .get("/hanja", {
            params: {
              org: this.searchingOrg,
              tier: this.searchingTier,
            },
          })
          .then((res) => {
            this.hanjas = res.data;
          });
      } else {
        this.hanjas = [];
      }
    },
    addHanja() {
      if (this.isValid) {
        console.log("click", this.hanjaForm);
        axiso
          .post("/hanja", this.hanjaForm)
          .then((res) => {
            this.errorMessage = null;
            this.$store.commit("closeModal");
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
          });
      }
    },
    checkForm(value) {
      this.isValid = Object.values(value).every((v) => v);
    },
  },
  watch: {
    hanjaForm: {
      deep: true,
      handler(value) {
        console.log(value);
        this.checkForm(value);
      },
    },
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
