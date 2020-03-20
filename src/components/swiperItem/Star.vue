<template>
    <div class="outer">
        <div class="header">
            <div class="title">
                <span>star信息</span>
            </div>
            <div class="header-card">
                <span class="header-title-1">你一共送出了多少个star</span>
                <span class="header-title-2">{{starArray.length}}</span>
            </div>
        </div>
        <div class="language-percent">
            <div class="language-title">你喜欢的编程语言Top</div>
            <canvas id="language-canvas-star" width="150px" height="150px"></canvas>
            <canvas id="canvas-star" width="100px" height="100px"></canvas>
        </div>
        <div class="star-popular">
            <div class="popular-title">你的star中最受欢迎Top{{mostStar.length}}</div>
            <div v-for = "(item,index) in mostStar" :key="index" class="popular-list">
              <span>{{index+1}}.{{item[0].split("/")[1]}}</span>
              <span class="star-num">{{item[1]}}</span>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    starArray: state => state.starredArray
  }),

  data() {
    return {
      mostStar: []
    };
  },

  mounted() {
    this.starArray.sort(function(a, b) {
      return b[1] - a[1];
    });

    // Top受欢迎

    for (let i = 0; i < this.starArray.length; i++) {
      if (i == 5) {
        break;
      }
      this.mostStar.push(this.starArray[i]);
    }

    this.initCanvasData();
  },

  methods: {
    initCanvasData() {
      var colorArray = ["#f77ea0", "#FF6347", "#75d83c", "#4de9e9", "#d29deb"];

      var totalStarNum = 0;
      let addTimes = 0;
      for (var i = 0; i < this.starArray.length; i++) {
        if (this.starArray[i][2]) {
          totalStarNum += this.starArray[i][1];
          addTimes += 1;
        }

        if (addTimes == 5) {
          break;
        }
      }

      var dataArray = [];
      let originData = this.starArray;
      for (var j = 0; j < originData.length; j++) {
        if (!originData[j][2]) {
          continue;
        }
        dataArray.push({
          value: originData[j][1] / totalStarNum,
          color: colorArray[dataArray.length],
          language: originData[j][2]
        });

        if (dataArray.length == 5) {
          break;
        }
      }
      this.initCanvas(dataArray);
    },

    initCanvas(dataArray) {
      /** @type {HTMLCanvasElement} */
      // 文字canvas
      let textCanvas = document.getElementById("language-canvas-star");
      let textContext = textCanvas.getContext("2d");

      // 饼图 canvas
      let canvas = document.getElementById("canvas-star");
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
        console.log("drawText2", dataArray[i].language);
        textContext.font = "7pt normal";
        var txtHeight = parseInt(textContext.font);
        textContext.fillText(
          dataArray[i].language +
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
.header {
  width: 100%;
  height: 200px;
}

.title {
  width: 100%;
  height: 133px;
  position: absolute;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background: #f77ea0;
}

.title span {
  padding-top: 30px;
  display: inline-block;
  color: white;
  font-size: 18px;
}

.header-card {
  position: absolute;
  height: 100px;
  max-height: 100px;
  top: 100px;
  left: 20px;
  right: 20px;
  background: white;
  border-radius: 10px;
  overflow: scroll;
}

.header-card span {
  display: block;
  color: black;
}

.header-title-1 {
  padding-top: 15px;
  font-weight: 520;
}

.header-title-2 {
  padding-top: 20px;
  font-size: 22px;
  font-weight: 700;
}

.language-percent {
  margin-top: 10px;
  padding-top: 10px;
  background: white;
  border-radius: 10px;
  height: 170px;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
}

.language-title {
  font-size: 16px;
  color: black;
}

#canvas-star {
  position: absolute;
  left: 20px;
}

#language-canvas-star {
  position: absolute;
  right: 20px;
}

.star-popular {
  height: 180px;
  background: white;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.popular-title {
  font-size: 17px;
  font-weight: 600px;
  padding: 10px 0 5px 0;
}

.popular-list {
  text-align: left;
  color: black;
  padding-top: 6px;
  padding-left: 20px;
  font-weight: 500;
  position: relative;
}

.star-num{
  position: absolute;
  right: 10px;
  color: rgb(151, 143, 143);
  font-size: 12px;
}
</style>
