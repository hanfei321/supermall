import {debounce} from "@/common/debounce";

export const itemListMixin = {
  data(){
    return{
      itemImgLister:null,
      // newRefresh:null,
    }
  },
  mounted(){
    this.itemImgLister = () => {
      refresh()
    }
    // 防抖函数
    const refresh = debounce(this.$refs.scroll.refresh,20)
    this.$bus.$on('ItemImageLoad',this.itemImgLister)
    console.log('混入')
  }
}
