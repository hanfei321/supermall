<template>
<div class="navber ignore">
  <div class="left"><slot name="left"></slot></div>
  <div class="center"><slot name="center"></slot></div>
  <div class="right"><slot name="right"></slot></div>
</div>
</template>

<script>
export default {
  name: "NavBer"
}
</script>

<style scoped>
.navber{
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
.left{
  width: 60px;
}
.right{
  width: 60px;
}
.center{
  flex: 1;
}
</style>
