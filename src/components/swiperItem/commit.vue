<template>
    <div class="outer">
        <div class="header">
                <span class="basic-info">commit信息</span>
                <img class="user-header" :src="userInfo.avatar_url"/>
        </div>
        
    </div>    
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    repoInfo: state => state.repoInfo
  }),

  methods: {}
};
</script>
<style>
.outer {
  background: #f5f5f5;
}

.header {
  width: 100%;
  height: 20%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background: #f77ea0;
  position: relative;
}

.basic-info {
  color: white;
  display: block;
  padding-top: 30px;
  font-size: 18px;
}

.user-header {
  width: 84px;
  height: 84px;
  border-radius: 42px;
  position: absolute;
  display: block;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 50%);
}

</style>
