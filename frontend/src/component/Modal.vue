<template>
  <div class="modal-cover" v-if="$store.state.isModalOpen">
    <div class="modal-container">
      <div>
        <div @click="$store.commit('closeModal')">닫기</div>
        <div>(모달내용)</div>
        <div>
          <button>확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.modal-cover {
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  height: 100%;
  width: 100%;
}
.modal-container {
  margin: 3rem auto;
  width: 40rem;
  background-color: white;
}
</style>