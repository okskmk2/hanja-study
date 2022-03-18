<template>
  <div class="modal-cover" v-if="$store.state.isModalOpen">
    <div class="modal-container">
      <div class="row jc-end">
        <span @click="$store.commit('closeModal')" class="icon">
          <SvgIcon :path="mdiClose" type="mdi" />
        </span>
      </div>
      <portal-target name="modal"></portal-target>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose } from "@mdi/js";
export default {
  components: {
    SvgIcon,
  },
  data() {
    return {
      mdiClose: mdiClose,
    };
  },
};
</script>

<style lang="less" scoped>
.modal-cover {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 2000;
}
.modal-container {
  margin: 3rem auto;
  width: 40rem;
  background-color: white;
  padding: 2rem 3rem;
}
</style>