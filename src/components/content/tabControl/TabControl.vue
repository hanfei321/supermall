<template>
<div class="tab-control">
  <div v-for="(item,index) in titles" class="tab-item" :class="{active:index === currentIndex}" @click="activeclick(index)" id="move">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "tabcontrol",
  props:{
    titles:Array,
    default:{
      return:[]
    }
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  methods:{
    activeclick(index){
      this.currentIndex = index;
      this.$emit('tabclick',index)

    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  background: white;
  height: 44px;
}
.tab-item{
  flex: 1;
  padding: 10px;
  padding-top: 12px;
}
.active {
  color: var(--color-high-text);
}
.tab-item span {
  padding: 6px;
}
.active span {
  /*border-bottom: 3px solid var(--color-tint);*/
  animation: mymove 1s 1;
  animation-fill-mode: forwards;
}
#move {animation-timing-function: ease}
 @keyframes mymove {
   from{
     border-bottom: 3px solid white;
   }
   to{border-bottom: 3px solid var(--color-tint);}
 }
</style>
