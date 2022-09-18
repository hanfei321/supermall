<template>
<div class="comment-info" v-if="Object.keys(CommentInfo).length !== 0">
<div class="comment-header">
  <div class="comment-user">用户评价</div>
  <div class="comment-title">更多</div>
</div>
<div class="info-user">
  <img :src="CommentInfo.user.avatar">
  <span>{{CommentInfo.user.uname}}</span>
</div>
  <div class="info-detail">
    <p>{{CommentInfo.content}}</p>
    <div class="info-other">
      <span class="date">{{CommentInfo.created | showDate}}</span>
      <span>{{CommentInfo.style}}</span>
    </div>
    <div class="info-imgs">
      <img :src="item" v-for="(item, index) in CommentInfo.images" :key="index">
    </div>
  </div>
</div>
</template>

<script>
import {formatDate} from '@/common/utils.js'
export default {
  name: "DetailCommentInfo",
  props:{
    CommentInfo:Object,
    default(){
      return {}
    }
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value*1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-info{
  padding: 1.33333vw 3.2vw;
  color: #333;
  border-bottom: 1.33333vw solid #f2f5f8;
}
.comment-header{
  height: 12.33333vw;
  line-height: 13.33333vw;
  border-bottom: 1px solid rgba(0,0,0,.1);

}
.comment-user{
  float: left;
  font-size: 4vw;
}
.comment-title{
  float: right;
  margin-right: 2.66667vw;
  font-size: 3.46667vw;
}
.info-user{
  padding: 2.66667vw 0 1.33333vw
}
.info-user img{
  width: 11.2vw;
  height: 11.2vw;
  border-radius: 50%;
}
.info-user span{
  position: relative;
  font-size: 4vw;
  top: -4vw;
  margin-left: 2.66667vw;
}
.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-other .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
