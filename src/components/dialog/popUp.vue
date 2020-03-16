<template>
    <div class='dialog' v-show='showstate'>
        <div class='dialog-bg' >
            <div class='dialog-title'>
              <slot name='title' >标题</slot>
            </div>
            <input type="text" id="input" class="input-name"/>
            <div class='dialog-content' v-show="false">
              <slot name='content' >这里是弹框内容</slot>
            </div>
            <div class='footer'  @click='sure'>
                确定
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "modal",
  props: ["type", "showstate"],
  methods: {
    sure: function() {
      this.$emit("sure", document.getElementById("input").value);
    }
  }
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

.dialog-title {
  margin-top: 15px;
  color: #fb7299;
  font-size: 16px;
}

.dialog-content {
  width: 100%;
  font-size: 15px;
}

.input-name {
  border: none;
  outline: none;
  font-size: 18px;
  padding: 6px;
  color: #232525;
  width: 80%;
  margin-top: 20px;
  display: block;
  margin-left: 10%;
  background: #f7f5f6;
}

.footer {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 16px;
}
</style>
