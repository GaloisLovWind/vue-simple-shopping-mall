<template>
  <div class="classify">
    <div class="classify-title w-960">
      <router-link to="/">首页</router-link>
      <span>></span>
      <span>{{ currentClass.text }}</span>
    </div>
    <div class="w-960" :class="{'ld-300': ldpic.main}">
      <ul class="classify-goods-list ui-clear">
        <li class="classify-goods-li ui-fl" v-for="item in classifies">
          <router-link :to="{path:'/goods', query:{id:item.id, cid:item.cid}}">
            <div class="goods-pic" :style="{'background-image':'url('+ item.image +')'}"></div>
            <p class="goods-name">{{ item.name }}</p>
            <p class="goods-price">{{ "$" + item.price }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Classify",
  data(){
    return {
      classifies:[],
      currentClass:{
        text: "classify"
      },
      ldpic: {
        main: true
      }
    }
  },
  computed:{
    currentClassifyId(){
      return this.$router.currentRoute.cid;
    }
  },
  mounted(){
    this.classifies = [
      {id: 1, cid:111, name:"商品1", price: 23.09, image:require("@/assets/images/goods/index-sp_01.jpg")},
      {id: 2, cid:222, name:"商品2", price: 12.22,image:require("@/assets/images/goods/index-sp_02.jpg")},
      {id: 3, cid:333, name:"商品3", price: 57.98,image:require("@/assets/images/goods/index-sp_03.png")},
    ];
    this.currentClass = {
      id: 111,
      text: "分类1",
    }
  },
}
</script>

<style lang="scss" scoped>
  .classify{
    .classify-title{
      padding: 40px 0 20px 20px;
      background-color: #f8f8f8;
    }
    .classify-goods-list{
      width: 100%;
      margin-top: 10px;
      .classify-goods-li{
        text-align: center;
        width: 25%;
        padding-bottom: 10px;
        .goods-pic{
          width: 232px;
          height: 232px;
          margin: 0 auto;
          background-size: cover;
          background-clip: content-box;
        }
        p{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .goods-name{
          padding: 14px 0 12px;
        }
        .goods-price{
          color: #F6732D;
        }
      }
    }
  }

</style>