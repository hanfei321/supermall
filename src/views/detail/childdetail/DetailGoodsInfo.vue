<template>
<div class="goods-info" v-if="Object.keys(detail).length !== 0">
  <div class="info-desc clear-fix">
    <div class="start"></div>
    <div class="desc">{{detail.desc}}</div>
    <div class="end"></div>
  </div>
  <div class="info-key">{{detail.detailImage[0].key}}</div>
  <div class="info-list">
    <img v-for="item in detail.detailImage[0].list" :src="item" @load="ImageLoad">
  </div>

</div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props:{
    detail:Object,
    default(){
      return {
        counter:0,
        imagesLength:0
      }
    }
  },
  methods:{
    ImageLoad(){
      this.$emit('imageLoadgoods')
      // if (++this.counter === this.detail.detailImage[0].list.length){
      //   this.$emit('imageLoadgoods')
      // }
    }
  },
  watch:{
    detailInfo(){
      this.imagesLength = this.detail.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info{
  margin-top: 20px;

}
.info-desc{
  padding: 0px 15px;
}
.desc{
  font-size: 14px;
  padding: 15px 0px;
}
.info-desc .start, .info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before, .info-desc .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}
.info-key{
  margin-left: 15px;
  color: #222222;
  margin-top: 5px;
}
.info-list{
  margin-top: 15px;
}
.info-list img {
  width: 100%;
}
</style>
