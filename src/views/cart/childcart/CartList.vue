<template>
  <scroll class="cart-list">
    <cart-list-item v-for="item in cartLists" :key="item.iid" :item-info="item"></cart-list-item>
  </scroll>
</template>

<script>
import scroll from "@/components/commen/scroll/Scroll";
import CartListItem from './CartListItem'
import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components: {
    scroll, CartListItem
  },
  computed:{
    ...mapGetters(['cartLists'])
  }
}
</script>

<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
  overflow: hidden;
}
</style>
