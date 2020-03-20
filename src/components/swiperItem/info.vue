<template>
    <div class="outer">
        <div class="header">
                <span class="basic-info">基本信息</span>
                <img class="user-header" :src="userInfo.avatar_url"/>
        </div>
        <div class="name-card">
           <span class="name-title">Name</span>
           <span class="name">{{userInfo.login}}</span>
        </div>
        <div class="card">
           <span class="title">Repos</span>
           <span class="value">{{userInfo.public_repos}}个</span>
        </div>
        <div class="card">
           <span class="title">Followers</span>
           <span class="value">{{userInfo.followers}}人</span>
        </div>
        <div class="card">
           <span class="title">Following</span>
           <span class="value">{{userInfo.following}}人</span>
        </div>
    </div>    
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    repoInfo: state => state.repoInfo,
    userInfo: state => state.userInfo
  }),

  methods: {}
};
</script>
<style scoped>
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

.name-card {
  background: white;
  position: relative;
  margin-top: 55px;
  height: 60px;
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.name-title,
.title {
  position: absolute;
  line-height: 60px;
  left: 15px;
  font-size: 16px;
}

.name,
.value {
  position: absolute;
  right: 15px;
  line-height: 60px;
  font-weight: 600;
  font-size: 16px;
}

.card {
  background: white;
  position: relative;
  margin-top: 15px;
  height: 60px;
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.15);
}

</style>
