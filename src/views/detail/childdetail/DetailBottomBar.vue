<template>
<div v-if="Object.keys(showpop,showgoods,showParam,showiid).length !== 0">
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="showVuePopup(true)">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
  <div class="vue-popup">
    <div class="mask" v-show="show2" @click="showVuePopclose(false)"></div>
    <transition name="slide">
      <div class="popup-content" v-show="show2">
        <div class="popup-info">
          <div class="popup-item">
            <img :src="showpop[0]">
            <span class="popup-price">{{showgoods.newPrice}}</span>
          </div>
<!--          尺码渲染-->
          <div class="popup-sizes">
            <div class="popup-sizes-info">尺码:</div>
            <div v-for="(item,index) in showParam.sizes[0][0]" v-if="index !== 0" class="popup-sizes-item"
            :class="{active:currentIndex === index}"
            @click="TitleClick(index)">
              <div @click="showhtml">{{item}}</div>
            </div>
          </div>
<!--          颜色渲染-->
          <div class="popup-infos">
            <div class="popup-title">颜色:</div>
            <div v-for="(item,index) in this.showinfovalue"
                 class="popup-value"
                 :class="{activecorol:currentIndexcorol === index}"
                 @click="TitleClickcorol(index)">
              <div @click="showvaluehtml">
                {{item}}
              </div>
            </div>
          </div>
<!--          计数器渲染-->
          <div class="popup-bottom">
            <div class="pop-bottom-title">购买数量</div>
            <div class="pop-bottom-but">
              <button @click="numbtn--" :disabled="numbtn<=1">-</button>
              <span>{{numbtn}}</span>
              <button @click="numbtn++">+</button>
            </div>
          </div>

          <div class="pop-btn">
            <span class="btnTest" @click="addToCart">确认</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>


</template>

<script>


export default {
  name: "DetailBottomBar",
  props:{
    showpop:{
      type:Array,
      default:[]
    },
    showgoods:{
      type:Object,
      default: {}
    },
    showParam:{
      type:Object,
    },
    showiid:{
      type:String,
    }
  },
  // props:[
  //   {
  //     showpop:Array,
  //     default(){
  //       return []
  //     },
  //   },
  //   {
  //     showgoods:Object,
  //     default() {
  //       return {};
  //     }
  //   }
  // ],
// filters:{
//   showsize : function (value){
//     if (index === 0){
//       return value = null
//     }
//   }
// },

  data(){
    return{
      show2: false,
      currentIndex:0,
      showsizehtml:null,
      showinfosIndex:0,
      showinfovalue:[],
      currentIndexcorol:null,
      showcolorhtml:null,
      numbtn:1
      // showinf:{}

    }
  },
  components: {

  },
  methods: {
    // addToCart(event) {
    //   this.$refs.ball.run(event.target)
    //   this.$emit('addToCart')
    // }
    showVuePopup(flag) {
      this.show2 = flag
      document.body.style.overflow = "hidden"
      // console.log(this.showParam.infos)
      for (let i in this.showParam.infos){
        let color = '颜色'
        if (this.showParam.infos[i].key === color){
          // console.log(this.showParam.infos[i])
          this.showinfosIndex = i
          this.showinfovalue = this.showParam.infos[i].value.split( ',' )

        }
      }
      console.log(this.showinfosIndex)
    },
    showVuePopclose(flag) {
      this.show2 = flag
      document.body.style.overflow = "auto"
    },
    showhtml(event){
      var e = event.currentTarget
      // alert(e.innerHTML)
        this.showsizehtml = e.innerHTML
      console.log(this.showsizehtml)
    },
    showvaluehtml(event){
      var e = event.currentTarget
      this.showcolorhtml = e.innerHTML
      console.log(this.showcolorhtml)
    },
    TitleClick(index){
      this.currentIndex = index
    },
    TitleClickcorol(index){
      this.currentIndexcorol = index
    },
    addToCart(){
      const product = {}
      product.image = this.showpop[0]
      product.title = this.showgoods.title
      product.desc = this.showgoods.desc
      // product.price = this.showgoods.newPrice
      product.iid = this.showiid
      product.sizes = this.showsizehtml
      product.infocolor = this.showcolorhtml
      product.num = this.numbtn
      product.price = this.showgoods.realPrice

      this.$store.dispatch('addCart',product).then(res => {
        console.log(res)})

    }

  },
  mounted() {
    console.log()
    // for (let i in this.showParam){
    //
    // }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 58px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item>div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position:0 -54px;
}

.bar-left .shop {
  background-position:0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}

.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}


.vue-popup .popup-content {
  position: absolute;
  height: 400px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  z-index: 9;
}
.vue-popup .popup-content p {
  line-height: 30px;
  text-align: center;
}


.mask {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.5s ease-in;
  z-index: 9;
}
.slide-enter-active {
  animation-name: slideInUp;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.slide-leave-active {
  animation-name: slideOutDown;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
@keyframes slideInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translateZ(0);
  }
}
@keyframes slideOutDown {
  0% {
    transform: translateZ(0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}
.delay-leave-active {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.popup-item{
  margin-top: 15px;
  margin-left: 30px;
}
.popup-item img{
  width: 30%;
  border-radius: 10px 10px;
}
.popup-price{
  font-size: 20px;
  color: #ff5777;
  margin-left: 15px;
}
.popup-sizes{
  display: flex;
  margin-top: 30px;
  padding: 0px 15px;
  margin-left: 5px;
}
.popup-sizes-info{
  color: #222222;
  font-size: 18px;
  flex: 1;
}
.popup-sizes-item{
  flex: 1;
}
.popup-sizes-item{
  margin-left: 5px;
  height: 24px;
  border-radius: 5px;
  border: #222222 solid 1px;
  text-align: center;
}
.active{
  color: #ff5777;
  border: #ff5777 solid 1px;
}

.popup-infos{
  margin-top: 20px;
  display: flex;
  padding: 0 15px;
}
.popup-title{
  color: #222222;
  font-size: 18px;
  flex: 1;
  padding-left: 5px;
}
.popup-value{
  margin-left: 5px;
  height: 24px;
  border-radius: 5px;
  border: #222222 solid 1px;
  text-align: center;
  padding: 2px;
}
.activecorol{
  color: #ff5777;
  border: #ff5777 solid 1px;
}
.popup-bottom{
  margin-top: 20px;
  padding: 15px;
  display: flex;
}
.pop-bottom-title{
  color: #222222;
  flex: 1;
  font-size: 18px;
}
.pop-bottom-but{
  right: 20px;
  flex: 1;
  position: fixed;
  display: flex;
}
.pop-bottom-but button{
  width: 30px;
  height: 30px;
  flex: 1;
  font-size: 18px;
  /*background-color: #eeeeee;*/
}
.pop-bottom-but span{
  width: 35px;
  height: 30px;
  font-size: 20px;
  color: #222222;
  flex: 1;
  background-color: #eeeeee;
  text-align: center;
  padding-top: 5px;
  margin: 0px 3px;
}
.pop-btn{
  width: 100%;
  text-align: center;
  margin-top: 15px;
}
.btnTest {
  background: #ff5071;
  background-image: -webkit-linear-gradient(top, #ff5071, #e05973);
  background-image: -moz-linear-gradient(top, #ff5071, #e05973);
  background-image: -ms-linear-gradient(top, #ff5071, #e05973);
  background-image: -o-linear-gradient(top, #ff5071, #e05973);
  background-image: linear-gradient(to bottom, #ff5071, #e05973);
  border-radius: 28px;
  font-family: Arial;
  color: white;
  font-size: 17px;
  padding: 10px 35px 10px 35px;
  text-decoration: none;
  height: 30px;
  border: 0;
}

.btnTest:hover {
  background: #ff5071;
  background-image: -webkit-linear-gradient(top, #ff5071, #e05973);
  background-image: -moz-linear-gradient(top, #ff5071, #e05973);
  background-image: -ms-linear-gradient(top, #ff5071, #e05973);
  background-image: -o-linear-gradient(top, #ff5071, #e05973);
  background-image: linear-gradient(to bottom, #ff5071, #e05973);
  text-decoration: none;
}
</style>
