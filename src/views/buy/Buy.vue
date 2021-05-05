<template>
  <div class="buy">
    <div class="buy-container w-960">
      <div class="buy-choose">
        <span v-for="item in orderStatus" :class="{active: item.isActive}" :data-type="item.id" @click="switchList($event.target)">
          {{ item.text }}
        </span>
      </div>
        <div class="buy-detail" id="J_to_pay">
          <div class="buy-items">
            <span>金额</span>
            <span>状态</span>
            <span class="operation">操作</span>
          </div>
          <ul class="oUl">
            <li class="oneli" v-for="(item,index) in list" :key="item.id">
              <div class="buy-list">
                <p >
                  <span>下单时间：<span class="time">{{item.createtime}}</span></span>
                  <span>订单编号：<span class="number">{{item.order_sn}}</span></span>
                  <span><span v-cloak v-if="listType==='Receive'">{{'物流公司：'+item.expressName}}</span></span>
                  <span><span v-cloak v-if="listType==='Receive'">{{'物流编号：'+item.expressNumber}}</span></span>
                </p>
                <div class="buy-goods-detail">
                    <div class="buy-img" 
                      v-bind:style="{backgroundImage: 'url(' + item.images[0]+')'}"
                      @click="goodsDetail(item)"></div>
                    <div class="buy-title">
                      <h3 @click="goodsDetail(item)">{{item.name}}</h3>
                      <p> 数量:
                        <span class="goodnum">{{item.good_number}}</span>
                        <span v-for="item2 in item.attr">{{item2}}</span>
                        <p>{{item.province}} - {{item.city}} - {{item.area}} - {{item.street}} - {{item.address}} - {{item.userName}} - {{item.phone}}</p>
                      </p>
                    </div>
                  <div class="buy-item">
                    <span class="money">${{item.order_total}}</span>
                    <span class="state" v-if="listType==='weitPay' || listType==='weitSend'">{{item.pay_status}}</span>
                    <span class="state" v-else-if="listType==='Receive'">{{item.order_status}}</span>
                    <div class="buy-operation" v-if="listType==='weitPay'">
                      <a @click="pay(item)" id="J_now">立即支付</a>
                      <a id="cancel" class="cancel" @click="cancelOrder(item, index)">取消订单</a>
                    </div>
                    <div class="buy-operation" v-else-if="listType==='weitSend'">
                      等待发货
                    </div>
                    <div class="buy-operation" v-else-if="listType==='Receive'">
                      <a class="express" href="http://www.kuaidi100.com/" target="_blank">查看物流</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul> 
        </div>
      </div>
    <div class="buy-z">
      <div class="buy-delete">
        <p>确认删除该宝贝吗</p>
        <button class="buy-yes">确认</button>
        <button class='buy-no'>取消</button>
      </div>  
    </div>
  </div>
</template>

<script>
import { ORDER_STATUS } from "@/utils/constant";

export default {
  name: "Buy",
  data(){
    return {
      listType: 0,
      list:[],
      goodsAttr:[],
      orderStatus:{},
    }
  },
  methods: {
    pay(item){
      let orderInfo = {
        id: item.id,
        uid: item.user_id,
        name: item.userName,
        phone: item.phone,
        address: item.address,
        province: item.province,
        city: item.city,
        area: item.area,
        street: item.street    
      };
      this.$router.push({ path:"/pay", query:{
        order_total: item.order_total,
        sa: JSON.stringify(orderInfo), 
        order_id: item.id
      }})
    },
    switchList(e){
      const type = e.getAttribute("data-type");
      this.listType = type;
      this.taggleOrderStatus();
      this.orderList();
    },
    cancelOrder(order, index){
      this.list.splice(index, 1);
    },
    goodsDetail(item){
      this.$router.push({path: "goods", query: {id: item.goodsId}});
    },
    orderList(){
      this.list = [
        {id: 1, goodsId: 1, createtime: "2021-01-01", order_sn:"xxxxxxxxx", expressName:"韵达", expressNumber: "xxxxxxx", images:["xxx", "xxx"], name:"商品1", goodsNumber:1, attr: [{"颜色": "黄色"}], province:"xx", city: "xx", street:"xx", area:"xx", city:"xx", address:"xx", userName:"xxx", phone: "xxx", orderTotal: 902, payStatus: 0, orderStatus: 0 },
        {id: 2, goodsId: 2, createtime: "2021-01-01", order_sn:"xxxxxxxxx", expressName:"韵达", expressNumber: "xxxxxxx", images:["xxx", "xxx"], name:"商品1", goodsNumber:1, attr: [{"颜色": "黄色"}], province:"xx", city: "xx", street:"xx", area:"xx", city:"xx", address:"xx", userName:"xxx", phone: "xxx", orderTotal: 902, payStatus: 0, orderStatus: 0 }
      ];
    },
    getOrderStatus(isDefault){
      let i = 0;
      for(let key in ORDER_STATUS){
        this.orderStatus[key] = ORDER_STATUS[key];
        this.orderStatus[key].isActive = false;
        if(i == 0 && isDefault) {
          this.orderStatus[key].isActive = true;
          this.listType = this.orderStatus[key].id;
        }
        i++;
      }
    },
    taggleOrderStatus(){
      for(let key in this.orderStatus){
        let item = this.orderStatus[key];
        item.isActive = false;
        if(item.id == this.listType){
          item.isActive = true;
        }
      }
    }
  },
  mounted(){
    this.getOrderStatus(true);
    this.orderList();    
  }
}
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
  .buy-container{
    background-color: #fff;
    .buy-choose{
      width: 100%;
      height: 80px;
      line-height: 80px;
      background-color: #F7F6F6;
      span{
        cursor: pointer;
        font-size: 20px;
        margin: 0 44px;
        display: inline-block;
      }
      .active{
        color:#E5AD68 !important;
      }
    }
    .buy-detail{
      width: 100%;
      margin-top: 16px;
      background-color: #F7F6F6; 
      .buy-items{
        width: 90%;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        background-color: #F7F6F6;
        text-align: right;
        span{
          display: inline-block;
          width: 13%;
          text-align: center;
        }
      }
      #J_buy_items span{
        margin-right:90px;    
      }
    ul{ 
      background-color: #fff;
      li{
        width: 100%;
        border-bottom: 1px solid #F2F2F2;
        list-style: none;
        .buy-list{
          margin: auto;
          width: 90%;
          box-sizing:border-box;
          padding: 12px 0;
          margin-bottom: 18px;
          p{
            font-size: 10px;
            color:#888888;
            // text-align:center;
            span{
              margin-right: 15px;
            }
          }
          .buy-goods-detail{
            position: relative;
            margin-top: 22px;
            .buy-img{
              width: 70px;
              height: 70px;
              vertical-align: middle;
              display: inline-block;
              background-image: url(~@/assets/images/buy/goods.jpg);
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            }
            .buy-title{
              left: 92px;
              display: inline-block;
              vertical-align: middle;
              h3{
                display: inline-block;
                height: 25px;
              }
            }
          }
          .buy-item{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            width: 40%;
            font-size: 10px;
            display: inline-block;
            vertical-align: middle;
            span , div{
              display: inline-block;
              vertical-align: middle;
              width: 33%;
              text-align: center;
            }
            .buy-operation{
              width: 30%;
              display: inline-block;
              text-align: center;   
            }
            #J_now{
              text-decoration: none;
              display: inline-block;
              width: 90%;
              text-align: center;
              line-height: 30px;
              border-radius: 2px;
              border:1px solid #C59559;
              background-color: #E5AD68;
              color:#fff;
            }
            #logistics{
              text-decoration: none;
              cursor: pointer;
            }
          }
          #J_buy_item span:nth-child(1){
            margin-right: 84px; 
          }
          #J_buy_item span:nth-child(2){
            margin-right: 24px; 
          }
          #cancel{
            display: block;
            text-decoration: none;
            font-size: 10px;
            margin-top: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.buy-delete{
  width: 200px;
  height: 120px;
  border:1px solid #000;
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none;
}
#aLi{
  display: block;
}    

</style>