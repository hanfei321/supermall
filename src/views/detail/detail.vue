<template>
<div id="detail">
  <NavTabDetail class="detail-nav" @NavTitleClick="NavDetailClick" ref="navtab"></NavTabDetail>

  <scroll class="centent" ref="scroll" @scroll="contentScroll" :probeType="3">
    <SwiperDetail :DetailSwiper="topImages"></SwiperDetail>
    <DetailBaseInfo :goods="goodsInfo"></DetailBaseInfo>
    <DetailShop :shopinfo="shop"></DetailShop>
    <DetailGoodsInfo :detail="DetailImg" @imageLoadgoods="imageLoadgoods"></DetailGoodsInfo>
    <DetailParamInfo :DetailParam="Param" ref="param"></DetailParamInfo>
    <DetailCommentInfo :comment-info="CommentInfo" ref="comment"></DetailCommentInfo>
    <Goodlist :goodlistdata="Recommend" ref="recommend"></Goodlist>
  </scroll>
</div>
</template>

<script>
import NavTabDetail from "@/views/detail/childdetail/NavTabDetail";
import SwiperDetail from "@/views/detail/childdetail/SwiperDetail";
import DetailBaseInfo from "@/views/detail/childdetail/DetailBaseInfo";
import DetailShop from "@/views/detail/childdetail/DetailShop";
import scroll from "@/components/commen/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childdetail/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childdetail/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childdetail/DetailCommentInfo";
import Goodlist from "@/components/content/goods/Goodlist";
import {getDetail, Goods, GoodsParam, Shop, getRecommend} from "@/network/detail";
import {debounce} from "@/common/debounce";
import {itemListMixin} from "@/common/mixin.js"
export default {
  name: "detail",
  mixins:[itemListMixin],
  data(){
    return{
      iid:null,
      topImages: [],
      goodsInfo:{},
      shop:{},
      DetailImg:{},
      Param:{},
      CommentInfo:{},
      Comment: 0,
      Recommend:[],
      itemImgLister:null,
      NavTitleList:[],
      DetailLister:null,
      getTheme:null,
    }
  },
  components:{
    NavTabDetail,
    SwiperDetail,
    DetailBaseInfo,
    DetailShop,
    scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Goodlist
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
        this.shop = new Shop(data.shopInfo)
        this.DetailImg = data.detailInfo
        this.Param = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (Comment !== 0){
          this.CommentInfo = data.rate.list[0]
        }
      }
    )
    getRecommend().then(res => {
      this.Recommend = res.data.list
    })
    this.getTheme = debounce(() => {
      this.NavTitleList = []
      this.NavTitleList.push(0)
      this.NavTitleList.push(this.$refs.param.$el.offsetTop)
      this.NavTitleList.push(this.$refs.comment.$el.offsetTop)
      this.NavTitleList.push(this.$refs.recommend.$el.offsetTop)
      // this.NavTitleList.push(Number.MAX_VALUE)
      console.log(this.NavTitleList)
    },600)
  },
  methods:{
    imageLoadgoods(){
      // this.DetailLister = () => {
      //   refresh()
      //   console.log('----')
      // }
      // const refresh = debounce(this.$refs.scroll.refresh,20)
      // this.$bus.$on('imageLoadgoods',this.DetailLister)
      this.$refs.scroll.refresh()
      // this.newRefresh()
      this.getTheme()
    },
    NavDetailClick(index){
      this.$refs.scroll.scrollTo(0,-this.NavTitleList[index],500)

    },
    contentScroll(position){
      // console.log(position)
      const PositionY = -position.y
      // console.log(PositionY)
      const lenght = this.NavTitleList.length
      for (let i in this.NavTitleList){
        i = i * 1
        if ((i < lenght - 1 && PositionY >= this.NavTitleList[i] && PositionY < this.NavTitleList[i+1])
          || (i === lenght - 1 && PositionY >= this.NavTitleList[i])){
          this.$refs.navtab.currentIndex = i
        }
      }

    }
  },
  mounted() {

  },

  deactivated() {
    this.$bus.$off('ItemImageLoad',this.itemImgLister)
  },

}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.centent{
  height: calc(100% - 44px);
}
</style>
