import {request} from "@/network/request";


export function getHomeMultData() {
  return request({
    url: '/home/multidata',
    method:'get'
  })
}
export function getHomeGoodsData(type,page){
  return request({
    url:'/home/data',
    method:'get',
    params:{
      type,
      page
    }
  })
}
