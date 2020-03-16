<template>
    <div class='dialog' v-show='showLoading'>
        <div class='dialog-bg' >
            <img class="loading-img" src="/static/icon/loading.png"/>
            <div class="tip-text">
                <slot name="title"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "loadDialog",
  props: ["type", "showLoading"]
};
</script>
<style scoped>
.dialog {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dialog-bg {
  width: 70%;
  background: white;
  border-radius: 10px;
}

.loading-img {
  margin-top: 40px;
  margin-bottom: 30px;
  width: 60px;
  height: 60px;
  -webkit-animation: circle 1.5s infinite linear;
}

@-webkit-keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.tip-text{
    font-size: 16px;
    margin-bottom: 20px;
}
</style>
