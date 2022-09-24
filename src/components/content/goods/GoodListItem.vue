<template>
<div class="Good-list-item" @click="clickdetail">
  <img v-lazy="showImg" @load="ImageLoad" :key="showImg">
  <div class="goods-info">
    <p>{{goodsitem.title}}</p>
    <span class="price">{{goodsitem.price}}</span>
    <span class="collect">{{goodsitem.cfav}}</span>
  </div>
</div>
</template>

<script>
import goodlist from "@/components/content/goods/Goodlist";

export default {
  name: "GoodListItem",
  props:{
    goodsitem:Object,
    default(){
      return {

      }
    }
  },
  methods:{
    ImageLoad(){
      this.$bus.$emit('ItemImageLoad')
      // if (this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('ItemImageLoad')
      // }else if (this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('ItemImageLoad')
      // }
    },
    clickdetail(){
      this.$router.push('/detail/'+this.goodsitem.iid)
    },

  },
  computed:{
    showImg(){
      return this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
    }
  }
}
</script>

<style scoped>
.Good-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.Good-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
