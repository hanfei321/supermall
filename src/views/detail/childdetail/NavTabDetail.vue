<template>
<NavBer>
  <div slot="left" class="back" @click="leftback">
    <img src="~assets/img/common/back.svg" alt="">
  </div>

  <div slot="center" class="Navtitle">
    <div class="NavtitleItem"
         v-for="(item,index) in title"
         @click="TitleClick(index)"
         :class="{active:currentIndex === index}">{{item}}</div>
  </div>
</NavBer>
</template>

<script>
import NavBer from "@/components/commen/navber/NavBer";
import {getDetail, getDetailSwiper} from "@/network/detail";
export default {
  name: "NavTabDetail",
  data(){
    return{
      title:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  components:{
    NavBer
  },
  methods:{
    TitleClick(index){
      this.currentIndex = index
      this.$emit('NavTitleClick',index)
    },
    leftback(){
      this.$router.back()
    },

  },

}
</script>

<style scoped>
.Navtitle{
  display: flex;
}
.NavtitleItem{
  flex: 1;
  font-size: 14px;
}
.active{
  color: #ff5777;
}
.back img {
  margin-top: 10px;
}
</style>
