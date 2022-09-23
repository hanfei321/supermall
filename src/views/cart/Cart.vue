<template>
  <div>
    <navBer class="navbar">
      <div slot="center">购物车({{length}})</div>
    </navBer>

    <CartList></CartList>

    <CartButtonBar></CartButtonBar>


  </div>
</template>

<script>
import navBer from "@/components/commen/navber/NavBer";
import CartList from "@/views/cart/childcart/CartList";
import {mapGetters} from 'vuex'
import CartButtonBar from "@/views/cart/childcart/CartButtonBar";

export default {
  name: "Category",
  data(){
    return{
      scroll:null
    }
  },
  mounted() {

  },
  methods:{

  },
  components:{
    navBer,
    CartList,
    CartButtonBar
  },
  computed:{
    // mapGetters(){
    //   // return this.$store.getters.cartLength
    //
    // }
    ...mapGetters({
      length:'cartLength',
      })
  }

}
</script>

<style scoped>
/*.wrapper{*/
/*  height: 100px;*/
/*  background-color: #ff5777;*/
/*  overflow: hidden;*/
/*}*/
.navbar{
  background-color: #ff5777;
  color: #ffffff;
  font-weight: bold;
}
</style>
