<template>
    <div class="outer">
        <div class="header">
            <span class="commit-title">commit数据</span>
        </div>
        <div class="header-card">
                <span class="title-tip">你一共commit了</span>
                <span class="commit-count">{{totalCommitCount}}</span>
        </div>
        <div class="year-card">
            <div class="year-item" v-for="(value,key) in commitYearMap" :key="key">
                <span class="year-desc">{{key}}</span>
                <span class="length-desc" :style="'width:' + value.length / maxLength*70 + '%'"></span>
                <span class="num-show">{{value.length}}次</span>  
            </div>
        </div>

        <div class="commit-card">
              <div class="commit-top">commit最多的Top{{topCommit.length}}</div>
              <div v-for="(item,index) in topCommit" :key="index" class="top-repo">
                  <span>{{index+1}}.{{item[0]}}</span>
                  <span class="commit-times">{{item[1]}}次</span>
              </div>
        </div>

    </div>    
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    commitInfo: state => state.commitInfo,
    commitMap: state => state.commitMap
  }),

  data() {
    return {
      totalCommitCount: 0,
      yearCommitCount: 0,
      commitYearMap: {},
      maxLength: 0,
      topCommit: []
    };
  },

  mounted() {
    // commit 按年分类
    let commitArray = this.commitInfo;
    let commitClassify = {};
    for (let i = 0; i < commitArray.length; i++) {
      for (let j = 0; j < commitArray[i].length; j++) {
        let date = commitArray[i][j].commit.author.date;
        let yearSign = date.substring(0, 4);
        if (commitClassify[yearSign]) {
          commitClassify[yearSign].push(date);
        } else {
          commitClassify[yearSign] = [date];
        }
      }
    }
    this.commitYearMap = commitClassify;

    // 总commit数
    let totalCommitCount = 0;
    let maxCommitYear = 0;
    for (var key in commitClassify) {
      let yearCommit = commitClassify[key].length;
      if (yearCommit > maxCommitYear) {
        maxCommitYear = yearCommit;
      }
      totalCommitCount += yearCommit;
    }
    this.maxLength = maxCommitYear;
    this.totalCommitCount = totalCommitCount;

    // top3 repo
    let mapToList = [];
    for (var keyMap in this.commitMap) {
      mapToList.push([keyMap, this.commitMap[keyMap]]);
    }
    mapToList.sort(function(a, b) {
      return b[1] - a[1];
    });

    let topThreeArray = [];
    for (let i = 0; i < mapToList.length; i++) {
      if (i == 3) {
        break;
      }
      this.topCommit.push(mapToList[i]);
    }
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

.commit-title {
  position: absolute;
  font-size: 18px;
  color: white;
  transform: translateX(-50%);
  top: 30px;
}

.header-card {
  position: absolute;
  background: white;
  left: 20px;
  right: 20px;
  top: 15%;
  border-radius: 10px;
  padding-top: 10px;
}

.title-tip {
  color: black;
  font-size: 18px;
  font-weight: 500;
}

.commit-count {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 24px;
  color: black;
  font-weight: 550;
  display: block;
}

.year-card {
  top: 10%;
  text-align: left;
  background: white;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px 13px;
  position: relative;
}

.year-item {
  margin-top: 10px;
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

.commit-card {
  top: 75px;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  background: white;
  border-radius: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.top-repo {
  text-align: left;
  padding-left: 20px;
  color: black;
  padding-top: 10px;
  font-size: 16px;
}

.commit-top {
  color: black;
  font-size: 18px;
}

.commit-times{
  padding-left: 15px;
  font-size: 14px;
  color: #f77ea0;
}
</style>
