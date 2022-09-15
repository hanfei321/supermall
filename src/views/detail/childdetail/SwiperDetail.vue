<template>
<swiper class="detail-swiper">
  <swiper-item v-for="item in DetailSwiper">
    <img :src="item">
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/commen/swiper/index.js'
export default {
  name: "SwiperDetail",
  props:{
    DetailSwiper:Array,
    default(){
      return []
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
