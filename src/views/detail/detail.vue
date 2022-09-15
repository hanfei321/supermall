<template>
<div>
  <NavTabDetail></NavTabDetail>
  <SwiperDetail :DetailSwiper="topImages"></SwiperDetail>
  <DetailBaseInfo :goods="goodsInfo"></DetailBaseInfo>
</div>
</template>

<script>
import NavTabDetail from "@/views/detail/childdetail/NavTabDetail";
import SwiperDetail from "@/views/detail/childdetail/SwiperDetail";
import DetailBaseInfo from "@/views/detail/childdetail/DetailBaseInfo";
import {getDetail, Goods} from "@/network/detail";
export default {
  name: "detail",
  data(){
    return{
      iid:null,
      topImages: [],
      goodsInfo:{}
    }
  },
  components:{
    NavTabDetail,
    SwiperDetail,
    DetailBaseInfo,
  },
  created() {
    this.iid = this.$route.params.iid
    console.log(this.iid)
    getDetail(this.iid).then(
      res => {
        console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      }
    )
  },
  methods:{

  }

}
</script>

<style scoped>

</style>
