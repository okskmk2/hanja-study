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
    <div class="row jc-between" style="margin-bottom: 8px">
      <div class="filter-group">
        <FilterSelect
          :items="orgs"
          label="기관"
          v-model="searchingOrg"
          @input="searchHanja"
        />
        <FilterSelect
          v-if="searchingOrg"
          :items="tiers"
          label="급수"
          v-model="searchingTier"
          @input="searchHanja"
        />
        <div class="checkbox">
          <label for="searching_include">하위급수 선정한자 포함</label>
          <input
            id="searching_include"
            type="checkbox"
            v-model="searchingInclude"
            @change="searchHanja"
          />
        </div>
      </div>
      <span v-if="hanjas.length > 0"> 총 : {{ hanjas.length }} </span>
    </div>
    <div v-if="hanjas.length > 0">
      <div class="selected-hanjas">
        <div v-for="hanja in hanjas" :key="hanja.id" class="hanja-letter">
          <div class="row jc-between">
            <span>
              {{ hanja.hanja_id }}
            </span>
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
          <option v-for="tier in formTiers" :key="tier.id" :value="tier.value">
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
        tier: {
          tier: null,
          sub_tier: null,
        },
      },
      orgs: [
        {
          id: 1,
          text: "한국어문회",
          value: "G1001",
          tiers: [
            { text: "8급", value: { tier: 8, sub_tier: 1 } },
            { text: "7급 2", value: { tier: 7, sub_tier: 2 } },
            { text: "7급", value: { tier: 7, sub_tier: 1 } },
            { text: "6급 2", value: { tier: 6, sub_tier: 2 } },
            { text: "6급", value: { tier: 6, sub_tier: 1 } },
            { text: "5급 2", value: { tier: 5, sub_tier: 2 } },
            { text: "5급", value: { tier: 5, sub_tier: 1 } },
            { text: "4급 2", value: { tier: 4, sub_tier: 2 } },
            { text: "4급", value: { tier: 4, sub_tier: 1 } },
            { text: "3급 2", value: { tier: 3, sub_tier: 2 } },
            { text: "3급", value: { tier: 3, sub_tier: 1 } },
            { text: "2급", value: { tier: 2, sub_tier: 1 } },
            { text: "1급", value: { tier: 1, sub_tier: 1 } },
            { text: "특급 2", value: { tier: 0, sub_tier: 2 } },
            { text: "특급", value: { tier: 0, sub_tier: 1 } },
          ],
        },
        {
          id: 2,
          text: "대한검정회",
          value: "G1002",
          tiers: [
            { text: "8급", value: { tier: 8, sub_tier: 1 } },
            { text: "7급", value: { tier: 7, sub_tier: 1 } },
            { text: "6급", value: { tier: 6, sub_tier: 1 } },
            { text: "준5급", value: { tier: 5, sub_tier: 2 } },
            { text: "5급", value: { tier: 5, sub_tier: 1 } },
            { text: "준4급", value: { tier: 4, sub_tier: 2 } },
            { text: "4급", value: { tier: 4, sub_tier: 1 } },
            { text: "준3급", value: { tier: 3, sub_tier: 2 } },
            { text: "3급", value: { tier: 3, sub_tier: 1 } },
            { text: "준2급", value: { tier: 2, sub_tier: 2 } },
            { text: "2급", value: { tier: 2, sub_tier: 1 } },
            { text: "준1급", value: { tier: 1, sub_tier: 2 } },
            { text: "1급", value: { tier: 1, sub_tier: 1 } },
            { text: "사범", value: { tier: 0, sub_tier: 1 } },
            { text: "대사범", value: { tier: 0, sub_tier: 0 } },
          ],
        },
        { id: 3, text: "한자교육진흥회", value: "G1003", tiers: [] },
      ],

      searchingOrg: null,
      searchingTier: null,
      searchingInclude: false,
      isValid: false,
      errorMessage: null,
    };
  },
  computed: {
    formTiers() {
      if (this.hanjaForm.org) {
        let a = this.orgs.find((v) => v.value === this.hanjaForm.org);
        return a.tiers;
      } else {
        return [];
      }
    },
    tiers() {
      if (this.searchingOrg) {
        let a = this.orgs.find((v) => v.value === this.searchingOrg);
        return a.tiers;
      } else {
        return [];
      }
    },
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
              tier: this.searchingTier.tier,
              sub_tier: this.searchingTier.sub_tier,
              searching_include: this.searchingInclude,
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
            this.searchHanja();
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
    font-size: 8rem;
  }
  .hanja-meta {
    display: flex;
    justify-content: space-around;
    font-size: 18px;
  }
  .meaning {
  }
  .sound {
  }
}
</style>
