<template>
    <div class="outer">
        <div class="header">
            <span class="resp-title">仓库信息</span>
        </div>
        <div class="resp-info">
              <span class="total-desc">你一共创建了{{repoInfo.length}}个仓库</span>
              <div v-for="(value,key) in yearMap" :key="key" class="repoNum">
                  <span class="year-desc">{{key}}</span>
                  <span class="length-desc" :style="'width:' + value / maxRepoYear*70 + '%'"></span>
                  <span class="num-show">{{value}}</span>                  
              </div>
        </div>    

        <div class="busy-div">
            <span class="issue-title">当前issue最多的仓库</span>
            <span class="issue-repo-name">{{issueRepo}}</span>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    repoInfo: state => state.repoInfo
  }),

  data() {
    return {
      yearMap: {},
      maxRepoYear: 0,
      busyRepo: "",
      issueRepo: ""
    };
  },

  mounted() {
    var repoArray = this.repoInfo;
    let yearMap = {};
    for (let i = 0; i < repoArray.length; i++) {
      let createdAt = repoArray[i].created_at.substring(0, 4).toString();
      if (yearMap[createdAt]) {
        yearMap[createdAt] = yearMap[createdAt] + 1;
      } else {
        yearMap[createdAt] = 1;
      }
    }

    let maxCount = 0;
    for (var key in yearMap) {
      if (yearMap[key] > maxCount) {
        maxCount = yearMap[key];
      }
    }

    let mostIssue = 0;
    let issueIndex = 0;
    for (let i = 0; i < repoArray.length; i++) {
      if (repoArray[i].open_issues_count > mostIssue) {
        mostIssue = repoArray[i].open_issues_count;
        let issueIndex = i;
      }
    }

    this.issueRepo = repoArray[issueIndex].name;
    this.maxRepoYear = maxCount;
    this.yearMap = yearMap;
  }
};
</script>

<style>
.outer {
  position: relative;
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

.resp-title {
  position: absolute;
  font-size: 18px;
  color: white;
  transform: translateX(-50%);
  top: 30px;
}

.resp-info {
  position: absolute;
  background: white;
  left: 20px;
  right: 20px;
  padding-bottom: 10px;
  border-radius: 18px;
  top: 15%;
}

.total-desc {
  font-size: 16px;
  color: black;
  display: block;
  margin-top: 10px;
}

.repoNum {
  text-align: left;
  margin-left: 20px;
  margin-top: 10px;
  position: relative;
}

.year-desc {
  color: black;
  font-size: 14px;
  vertical-align: top;
  line-height: 24px;
}

.length-desc {
  display: inline-block;
  background: #f77ea0;
  height: 24px;
  line-height: 24px;
  margin-left: 4px;
}

.num-show {
  position: absolute;
  left: 60px;
  line-height: 24px;
  color: white;
  font-size: 14px;
}

.busy-div {
  position: absolute;
  background: white;
  left: 20px;
  right: 20px;
  padding-bottom: 10px;
  border-radius: 10px;
  top: 40%;
  padding-top: 14px;
}

.issue-title {
  font-size: 18px;
  color: black;
  font-weight: 500;
}

.issue-repo-name {
  display: block;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
}
</style>
