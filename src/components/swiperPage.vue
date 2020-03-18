<template>
    <div class="outer">
      <div class="swiper-container">
        <mt-swipe :auto="0" :show-indicators="false">
          <mt-swipe-item>
              <Info></Info>
          </mt-swipe-item>
          <mt-swipe-item>
              <RespInfo></RespInfo>    
          </mt-swipe-item>
          <mt-swipe-item>
              <Commit></Commit>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>    
</template>
<script>
import Info from "./swiperItem/Info.vue";
import RespInfo from "./swiperItem/RespInfo.vue";
import Commit from "./swiperItem/Commit.vue";

export default {
  components: {
    Info,
    RespInfo,
    Commit
  },

  data() {
    return {};
  },

  methods: {
    handleChange(index) {
      console.log("index", index);
    }
  },

  mounted() {}
};
</script>
<style>
.outer {
  width: 100%;
  height: 100%;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
