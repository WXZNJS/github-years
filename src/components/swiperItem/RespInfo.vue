<template>
    <div class="outer">
        <div class="header">
            <span class="resp-title">仓库信息</span>
        </div>
        <div class="resp-info" style="overflow:scroll;">
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

        <div class="chart-div">
          <div class="chart-inner">
            <span class="chart-title">你的编程语言</span>
            <canvas id="canvas" width="100px" height="100px"></canvas>
            <canvas id="language-canvas" width="150px" height="200px"></canvas>
          </div>
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

    // canvas
    this.initCanvasData();
  },

  methods: {
    initCanvasData() {
      var colorArray = [
        "#f77ea0",
        "#FF6347",
        "#75d83c",
        "#4de9e9",
        "#d29deb",
        "#FFE4C4",
        "#E6E6FA",
        "#1E90FF",
        "#FFEC8B"
      ];

      var repoArray = this.repoInfo;
      var languageMap = {};
      for (let i = 0; i < repoArray.length; i++) {
        let language = repoArray[i].language;
        if (!language) {
          continue;
        }
        if (languageMap[language]) {
          languageMap[language] += 1;
        } else {
          languageMap[language] = 1;
        }
      }

      // languageMap 排序
      var sortArray = [];
      for (var keyMap in languageMap) {
        sortArray.push([keyMap, languageMap[keyMap]]);
      }
      sortArray.sort(function(a, b) {
        return b[1] - a[1];
      });

      let keyArray = [];
      let totalCount = 0;
      console.log("sortArray", sortArray);
      for (let k = 0; k < sortArray.length; k++) {
        totalCount += sortArray[k][1];
        keyArray.push(sortArray[k][0]);
      }

      var dataArray = [];
      for (var j = 0; j < keyArray.length; j++) {
        dataArray.push({
          color: colorArray[j],
          value: languageMap[keyArray[j]] / totalCount
        });
      }
      this.initCanvas(dataArray, keyArray);
    },

    initCanvas(dataArray, keyArray) {
      /** @type {HTMLCanvasElement} */
      // 文字canvas
      let textCanvas = document.getElementById("language-canvas");
      let textContext = textCanvas.getContext("2d");

      // 饼图 canvas
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext("2d");
      var x0 = canvas.width * 0.5;
      var y0 = canvas.height * 0.5;
      var radius = 40;
      var startAngle = -90 * Math.PI / 180;

      for (var i = 0; i < dataArray.length; i++) {
        let swipeAngle = dataArray[i].value * 2 * Math.PI;
        let endAngle = startAngle + swipeAngle;

        context.beginPath();
        context.moveTo(x0, y0);
        // 绘制圆弧
        context.arc(x0, y0, radius, startAngle, endAngle);
        // 设置颜色
        context.fillStyle = dataArray[i].color;
        // 填充
        context.fill();
        startAngle = endAngle;

        // 绘制矩形
        textContext.fillStyle = dataArray[i].color;
        textContext.fillRect(0, 20 * i + 20, 30, 15);

        // 绘制文字
        textContext.font = "7pt normal";
        var txtHeight = parseInt(textContext.font);
        console.log("drawText1", keyArray[i]);
        textContext.fillText(
          keyArray[i] +
            "  " +
            ("(" + dataArray[i].value.toString().substring(2, 4) + "%)"),
          35,
          20 * i + 20 + txtHeight
        );
      }
    }
  }
};
</script>

<style scoped>
.outer {
  position: relative;
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
  height: 150px;
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
  left: 50px;
  line-height: 24px;
  color: rgb(129, 72, 72);
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

.chart-div {
  position: absolute;
  background: white;
  height: 150px;
  max-height: 150px;
  left: 20px;
  right: 20px;
  border-radius: 10px;
  top: 54.8%;
  padding-top: 10px;
}

.chart-inner {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: scroll;
}

#canvas {
  position: absolute;
  right: 35px;
  top: 20%;
}

#language-canvas {
  position: absolute;
  left: 20px;
  top: 10%;
  padding: 0;
  margin: 0;
}
</style>
