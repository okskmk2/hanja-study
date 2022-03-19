<template>
  <div class="filter_select">
    <div class="select_text" @click="open = !open">
      <template v-if="selectedItem"
        >{{ label }} = {{ selectedItem.text }}</template
      >
      <template v-else>{{ label }}</template>
      <SvgIcon type="mdi" :path="mdiChevronDown"></SvgIcon>
    </div>
    <div class="select_options" v-show="open">
      <div class="select_item" @click="onclickItem(null)">미지정</div>
      <div
        class="select_item"
        v-for="item in items"
        :key="item.text"
        @click="onclickItem(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import _ from "lodash";
import { mdiChevronDown, mdiCheck } from "@mdi/js";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Object],
      required: false,
    },
  },
  components: {
    SvgIcon,
  },
  data() {
    return {
      selectedItem: null,
      open: false,
      mdiChevronDown: mdiChevronDown,
      mdiCheck: mdiCheck,
    };
  },
  methods: {
    onclickItem(value) {
      this.selectedItem = value;
      this.open = false;
      this.$emit("input", this.selectedItem?.value);
    },
  },
  created() {
    this.selectedItem = this.items.find((v) => _.isEqual(v.value, this.value));
  },
};
</script>

<style lang="less" scoped>
.filter_select {
  position: relative;
  font-size: var(--filter_select__font-size, 14px);
}
.select_text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding-left: 4px;
  border: 1px solid var(--filter_select__text, #aaa);
  cursor: pointer;
}
.select_options {
  box-sizing: border-box;
  background-color: white;
  position: absolute;
  width: max-content;
  min-width: 100%;
  z-index: 1000;
  border: 1px solid var(--filter_select__text, #aaa);
}
.select_item {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   gap: 4px;
  //   padding-left: 4px;
  padding: 0 4px;
  cursor: pointer;
}
.select_item:hover {
  background-color: hsl(
    var(--filter_select__select_item_hue, 0deg),
    var(--filter_select__select_item_satu, 0%),
    90%
  );
}
</style>