<template>
    <div class="outer">
        <div class="container">
            <img src="/static/icon/github.png"/>
            <p class="year">2019</p>            
            <p class="title">年度数据总结</p>
            <p class="desc">Support By Github</p>
            <span class="go" @click="showDialog()">我的年度报告</span>
        </div>
      <div class="dialog">
        <Modal @sure='clickSure' :showstate='isShow'>
            <span slot='title'>请输入github用户名</span>
            <div slot='content'>{{msg}}</div>
       </Modal>
        <loading :showLoading="isShowLoading">
          <span slot="title">数据加载中，请稍后...</span>
        </loading>
      </div>
    </div>
</template>
<script>
import api from "../api/index.js";
import Modal from "./dialog/popUp.vue";
import loading from "./dialog/loadDialog.vue";

export default {
  components: {
    Modal,
    loading
  },

  data() {
    return {
      userName: "WXZNJS",
      isShow: false,
      isShowLoading: false,
      msg: "",
      commitMap: {}
    };
  },

  methods: {
    showDialog() {
      this.isShow = !this.isShow;
    },
    clickSure(inputValue) {
      this.isShow = false;
      this.isShowLoading = true;
      this.getUserInfo();
    },

    getUserInfo() {
      api.getUserInfo(this.userName).then(res => {
        console.log(res);
        this.$store.dispatch("setUser", res.data);
        this.getAllRepo();
      });
    },

    getAllRepo() {
      api.getAllRepo(this.userName).then(res => {
        var repoList = [];
        for (var i = 0; i < res.data.length; i++) {
          var obj = {};
          obj.name = res.data[i].name;
          obj.created_at = res.data[i].created_at;
          obj.language = res.data[i].language;
          obj.open_issues_count = res.data[i].open_issues_count;
          repoList.push(obj);
        }
        console.log("repo", repoList);
        // 设置仓库信息
        this.$store.dispatch("setRepo", repoList);
        this.getAllCommit(repoList);
      });
    },

    // 获取所有repo commit信息
    getAllCommit(repoList) {
      let result = [];
      var self = this;
      for (let i = 0; i < repoList.length; i++) {
        result.push(this.getRepoCommit(repoList[i].name));
      }

      var resp = Promise.all(result);
      resp.then(res => {
        console.log("commit", res);
        console.log("commitMap", self.commitMap);
        // self.dealCommitInfo(res);
        this.$store.dispatch("setCommitMap", self.commitMap);
        this.$store.dispatch("setCommit", res);
        this.isShowLoading = false;
        this.$router.push({ path: "swiperPage" });
      });
    },

    getRepoCommit(repoName) {
      let self = this;
      var promise = new Promise(function(resolve, reject) {
        api.getCommitInfo(self.userName, repoName).then(res => {
          resolve(res.data);
          self.commitMap[repoName] = res.data.length;
        });
      });
      return promise;
    },

    dealCommitInfo(commitData) {
      let commitTimes = 0;
      let dateList = [];
      for (let i = 0; i < commitData.length; i++) {
        let repoInfo = commitData[i];
        commitTimes += repoInfo.length;
        for (let j = 0; j < repoInfo.length; j++) {
          let commitDate = repoInfo[j].commit.committer.date;
          if (commitDate.split("-")[0] == "2019") {
            dateList.push(commitDate);
          }
        }
      }

      let dateMap = new Map();
      for (let i = 0; i < dateList.length; i++) {
        let key = dateList[i].split("T")[0];
        if (dateMap.has(key)) {
          dateMap.set(key, dateMap.get(key) + 1);
        } else {
          dateMap.set(key, 1);
        }
      }

      var maxCommitCount = 0;
      var maxCommitDate;
      for (let key of dateMap.keys()) {
        if (dateMap.get(key) > maxCommitCount) {
          maxCommitCount = dateMap.get(key);
          maxCommitDate = key;
        }
      }
    }
  }
};
</script>
<style>
.outer {
  width: 100%;
  height: 100%;
  position: relative;
}

.container {
  height: 70%;
  width: 90%;
  top: 20px;
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.15);
  background: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.container p {
  color: #fb7299;
}

.container img {
  margin-top: 25px;
}

.year {
  font-size: 15px;
  margin-top: 60px;
}

.title {
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 25px;
}

.desc {
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 13px;
}

.go {
  display: inline-block;
  margin-top: 70px;
  font-size: 20px;
  padding: 10px;
  color: #73c9e5;
  border: 2px solid rgb(233, 229, 229);
  box-shadow: 7px 10px 3px rgba(136, 134, 134, 0.15);
}

.popup {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
