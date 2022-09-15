<template>
  <swiper>
    <swiper-item v-for="item in banners" class="swiper-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="ImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/commen/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return{
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      ImageLoad(){
        if (!this.isLoad){
          this.$emit('SwiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
.swiper-item{
  margin-top: 44px;
}
</style>
