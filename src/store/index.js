import Vue from "vue";
import Vuex from 'vuex'
import getters from "@/store/getters";
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.oldProduct.count += payload.payload.num

    },
    addToCart(state,payload){
      payload.checked = true
      payload.count = payload.num
      state.cartList.push(payload)

    }

  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve, reject) => {
        let oldProduct = null;
        for (let item of context.state.cartList){
          if(item.iid === payload.iid && item.sizes === payload.sizes){
            oldProduct = item;
          }
        }
        if (oldProduct){
          // for(let item of state.cartList){
          //   if (item.sizes === payload.sizes){
          //
          //   }
          // }
          // if (state.cartList.sizes === payload.sizes && state.cartList.infocolor === payload.infocolor){
          // oldProduct.count += payload.num
          context.commit('addCounter',{oldProduct,payload})
          resolve('商品数量增加' + payload.num)
          // }else {
          //   state.cartList.push(payload)
          // }
        }else {
          context.commit('addToCart',payload)
          resolve('添加了新商品数量为'+ payload.num)
          // payload.checked = true
          // payload.count = payload.num
          // state.cartList.push(payload)
          // resolve('添加了新商品数量为'+ payload.num)
        }
      })

    }
  },
  getters,
})
export default store
