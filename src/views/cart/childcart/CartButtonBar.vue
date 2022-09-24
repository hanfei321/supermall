<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" v-model="isSelectAll" @click.native="checkBtnClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="showtoast">去计算({{cartLengths}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters([
      'cartLists',
      'cartLength'
    ]),
    totalPrice() {
      const cartList = this.cartLists;
      return cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.price
      }, 0).toFixed(2)
    },
    cartLengths(){
      const cartList = this.cartLists;
      return cartList.filter(item => {
        return item.checked
      }).length
    },
    // isSelectAll: function () {
    //   return this.cartList.find(item => item.checked === false) === undefined;
    // }
    isSelectAll(){
      if(this.cartLists.length === 0) return false
      return !this.cartLists.find(item => !item.checked)
      // return !(this.cartLists.filter(item => !item.checked).length)
},

  },
  methods: {
    checkBtnClick: function () {
      // // 1.判断是否有未选中的按钮
      // let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
      //
      // // 2.有未选中的内容, 则全部选中
      // if (isSelectAll) {
      //   this.$store.state.cartList.forEach(item => {
      //     item.checked = true;
      //   });
      // } else {
      //   this.$store.state.cartList.forEach(item => {
      //     item.checked = false;
      //   });
      // }
      if (this.isSelectAll){
        this.cartLists.forEach(item => item.checked = false)
      }else {
        this.cartLists.forEach(item => item.checked = true)
      }
    },
    showtoast(){
      // console.log(this.$toast)
      if (!this.isSelectAll){
        this.$toast({message: '请添加商品'})
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
