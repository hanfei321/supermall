<template>
<div class="base-info" v-if="Object.keys(goods).length !== 0">

  <div class="info-title">{{goods.title}}</div>
  <div class="info-price">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span class="discount">{{goods.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{this.goods.columns[0]}}</span>
    <span>{{this.goods.columns[1]}}</span>
    <span>{{this.goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span v-for="index in goods.services.length-1" class="info-item" :key="index">
      <img :src="goods.services[index-1].icon">
      <span>{{goods.services[index-1].name}}</span>
    </span>
  </div>

</div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:Object,
    default(){
      return []
    }
  },
  created() {

  },
  methods:{

  },
}
</script>

<style scoped>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;

}
.info-title{
  color: #222;
}
.info-price{
  margin-top: 8px;
  padding: 2px;
}
.n-price{
  font-size: 26px;
  color: #ff5777;
}
.o-price{
  padding: 5px;
  font-size: 14px;
  text-decoration: line-through;
}
.info-price .discount{
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: #ff5777;
  border-radius: 8px;
  margin-left: 5px;
  position: relative;
  top: -10px;
}
.info-other{
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100,100,100,.1);
  justify-content: space-between;
}
.info-service{
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.info-service .info-item span{
  font-size: 12px;
  color: #333;
}
.info-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
}

</style>
