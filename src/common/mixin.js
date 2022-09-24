import {debounce} from "@/common/debounce";
import {TOP_DISTANCE} from "./const";
import {POP, NEW, SELL} from "./const";
import BackTop from "@/components/content/BackTop/BackTop";
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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
