<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.recommend{
  width: 100%;
  display: flex;
  padding: 8px 2px 40px 2px;
  text-align: center;
  border-bottom: 10px solid #eee;
  font-size: 12px;
  font-weight: bold;

}
.recommend-item{
  flex: 1;

}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
