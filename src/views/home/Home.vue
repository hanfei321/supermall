<template>
  <div id="home">
    <NavBer class="home-nav">
      <div slot="center" class="navcenter">购物车</div>
    </NavBer>
    <TabControl
      :titles="['流行','新款','精选']"
      class="tab-Control"
      @tabclick="tabclick"
      ref="tobcontrol"
      v-show="tabShow">
    </TabControl>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @SwiperImageLoad="SwiperImageLoad"></HomeSwiper>
      <HomeRecommend :recommends="recommends"></HomeRecommend>
      <FeatureView></FeatureView>
      <TabControl
        :titles="['流行','新款','精选']"
        class="tab-control"
        @tabclick="tabclick"
        ref="tobcontrol" :class="{fixed:isTabControlshow}" v-show="istabfshow">
      </TabControl>
      <Goodlist :goodlistdata="goods[currentType].list"></Goodlist>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>


  </div>
</template>

<script>
import NavBer from "@/components/commen/navber/NavBer";
import {getHomeMultData,getHomeGoodsData} from "@/network/home";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommend from "@/views/home/childComps/HomeRecommend";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import Goodlist from "@/components/content/goods/Goodlist";
import scroll from "@/components/commen/scroll/Scroll";
import BackTop from "@/components/content/BackTop/BackTop";

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0,list:[]},
          'new':{page: 0,list:[]},
          'sell':{page: 0,list:[]}
        },
        currentType:'pop',
        isShowBackTop: false,
        isTabControlf:0,
        isTabControlshow:false,
        tabShow:false,
        istabfshow:true,
        saveY:0
      }
    },
    components:{
      NavBer,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      Goodlist,
      scroll,
      BackTop
    },
    created() {
      this.getHomeMultData()

      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')


    },
    destroyed() {
      console.log('home destroyed')
    },

    activated() {
      // console.log('activated')
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log(this.$refs.scroll.getScrollY())
      this.saveY = this.$refs.scroll.getScrollY()
    },

    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh,20)
      this.$bus.$on('ItemImageLoad',() => {
        refresh()
      })
      // 1 timer=null 不用清楚  等待delay时间返回函数
      // 可是这个时间内 refresh() 又被执行
      // 2 来到第二次 第二次 timer不为null 清除timer 使其停止返回函数
      // 第二次timer等待时间 setTimeout 返回函数
      // 可是这个时间内 refresh() 又被执行
      // 3   来到第三次 timer不为null 清除timer 使其停止返回函数
      //
      // 第30次 timer 不为空 清除timer 使其停止29次的返回函数
      // 等待 setTimeout 返回函数
      // 可是没有31次,所以函数将被返回


    },
    methods:{
      debounce(func,delay){
        let timer = null
        return (...args) => {
          if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
              func.apply(this,args)
          },delay)

        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        this.tabShow = (-position.y) > this.isTabControlf
        if (this.tabShow){
          this.istabfshow = false
        }else {
          this.istabfshow = true
        }

      },
      loadMore() {
        console.log('-----上拉加载更多-----')
        this.getHomeGoodsData(this.currentType)
      },
      SwiperImageLoad(){
        this.isTabControlf = this.$refs.tobcontrol.$el.offsetTop - 42
      },
      tabclick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
          break
          case 1:
            this.currentType = 'new'
          break
          case 2:
            this.currentType = 'sell'
            break
        }
      },


      getHomeMultData(){
        getHomeMultData().then(res => {
          // console.log(res.data.recommend.list)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list

        })
      },
      getHomeGoodsData(type){
        const page = this.goods[type].page + 1
        getHomeGoodsData(type,page).then(res => {
          // this.goods[type].list = res.data.list
          // console.log(res)
          this.goods[type].list.push(...res.data.list)
          //将数组传入另一个数组es6语法  扩展参数...
          this.goods[type].page += 1
          // 上拉加载跟多执行第二次
          this.$refs.scroll.finishPullUp()

        })
      }





    }
  }
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.navcenter{
  color: #f6f6f6;
}
.home-nav{
  background-color: #ff5777;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-Control{
  /*position: sticky;*/
  /*top: 44px;*/
  /*z-index: 9;*/
  position: relative;
  z-index: 9;
  margin-top: 44px;


}
/*.content{*/
/*  height: 300px;*/
/*  overflow: hidden;*/
/*}*/

/*.content {*/
/*height: 615px;*/
/*overflow: hidden;*/
/*!*margin-top: 44px;*!*/
/*}*/

.content {
  overflow: hidden;

  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0;
  right: 0;
}



</style>
