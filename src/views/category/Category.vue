<template>
<div>
<navBer>
  <div slot="center">购物车</div>
</navBer>
</div>
</template>

<script>
import navBer from "@/components/commen/navber/NavBer";
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
      navBer
    }
  }
</script>

<style scoped>
.wrapper{
  height: 100px;
  background-color: #ff5777;
  overflow: hidden;
}
</style>
