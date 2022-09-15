<template>
<div class="goodlist">
    <GoodListItem v-for="item in goodlistdata" :goodsitem="item"></GoodListItem>
</div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";
export default {
  name: "Goodlist",
  props:{
    goodlistdata:Array,
    default(){
      return []
    }
  },
  components:{
    GoodListItem
  }
}
</script>

<style scoped>
.goodlist{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>
