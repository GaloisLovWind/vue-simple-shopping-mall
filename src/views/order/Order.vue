<template>
  <div class="order w-960">
    <div class="order-box ld-300">
      <div class="order-title">
        <p>选择收货地址</p>
      </div>
      <div class="order-content">
        <div class="order-content-select ui-fl" v-for="(item, index) in address" @click="chooseAddress(index)">
          <div class="address-content" :class="{active: item.isChecked}">
            <p>
              <span class="address-name">{{ item.name }}</span>
              <span class="address-phone">{{ item.phone }}</span>
            </p>
            <p class="ui-t-j">
              <span>{{ item.provice }}</span>
              <span>{{item.city}}</span>
              <span class="or-pad">{{ item.street }}</span>
            </p>
            <p class="address-detail">{{ item.address }}</p>
            <input type="button" value="删除" class="address-delete" @click="del(item, index, $event)">
          </div>
        </div>
        <div class="content-box-add ui-fl" @click="isAddAddress=!isAddAddress">
          <div class="content">
            <p class="add"> + </p>
            <div class="address-add">添加新收货地址</div>
          </div>
        </div>
      </div>
    </div>
    <address-add v-if="isAddAddress" @addAddress="addAddress" @cancle="closeAddAddress"/>
    <div class="clear:both"></div>
    <div class="order-box ld-250">
      <div class="order-title">
        <p>确认订单信息</p>
      </div>
      <div class="order-list">
        <div class="order-list-box">
          <span>合计</span>
          <span>数量</span>
          <span>单价</span>
        </div>
      </div>
      <div class="cold">
        <a href="#"><div class="cold-pic" :style="{'background-image':'url('+goods.images+')'}"></div></a>
        <a href="#">
          <div class="order-explain">
            <p :title="goods.name">{{goods.name}}</p>
            <p v-for="item in chooseAttr">{{item}}</p>
          </div>
        </a>
        <div class="order-mark">
          <span>{{goods.price}}</span>
          <span>{{query.goods_number}}</span>
          <span>{{"$"+query.order_total}}</span>
        </div>
      </div>
      <div class="order-pay">
        <div class="order-pay-box">
          <span>应付：</span>
          <span>{{ "$" + query.order_total}}</span>
          <input type="button" value="提交订单" @click="submitOrder">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import msg from "iview/src/components/message";
import AddressAdd from "./AddressAdd";
export default {
  name: "Order",
  components:{
    AddressAdd
  },
  data(){
    return {
      order:{},
    	address: [],
    	goods:{},
    	isAddAddress:false,
    	successAddress:'',
    	chooseAttr:[]
    }
  },
  computed:{
		query(){
			return this.$router.currentRoute.query;
		}
	},
  methods: {
    closeAddAddress(){
      this.isAddAddress = !this.isAddAddress;
    },
    chooseAddress(index){
      this.address.forEach( item => {
        item.isChecked = false;
      });
      this.address[index].isChecked = true;
      this.successAddress = JSON.stringify(this.address[index]);
    },
    del(item, index, e){
      e.stopPropagation();
      this.address.splice(index, 1);
      msg.success("删除成功")
    },
    addAddress(data){
      // 保存数据 
      this.getAddress("Galois");
      this.closeAddAddress();
    },
    submitOrder(){
      let t = this;
      let addressId = 0;
      this.address.forEach( item => {
        item.isChecked && (addressId = item.id);
      });
      let data = {
        user_id: "Galois",
        good_price: t.query.good_price,
        good_number: t.query.good_number,
        // attr: JSON.parse("{id:1}"),
        order_total: t.query.order_total,
        address_id: addressId,
        good_id: t.query.good_id,
        getSaleById:t.query.getSaleById
      }
      let order_total = "{ id:1}"//t.$route.query.order_total;
      this.$router.push({path:'pay',query:{order_total: order_total,address:t.successAddress, order_id: 1}})
    },
    getGoodsAttr(){
      // const goodsAttr = JSON.parse(this.query.good_attr)||{}
      // for(let item in goodsAttr){
      //       this.chooseAttr.push(item+"： "+ goodsAttr[item]);
      // }
      this.chooseAttr=[
        "颜色: 黄色",
        "尺寸: 小"
      ];
    },
    getGoodsDetail(goodsId){
      this.goods = {
        id: 1,
        cid: 1,
        name: "",
        attr: [
          { name: "颜色", valueList: [{name:'黄色', isActive: false }, {name:'红色', isActive: false }]},
          { name: "尺寸", valueList: [{name:'大', isActive: false }, {name:'小', isActive: false }]}
        ],
        price: 13.89,
        images: [
          require("@/assets/images/goods/index-sp_01.jpg"),
          require("@/assets/images/goods/index-sp_02.jpg"),
        ]
      }
    },
    getAddress(userId){

    }
  },
  mounted(){
    this.address = [
      {id: 1, name:"地址1", phone:"123xxxxxxxx", provice:"广东省", city:"深圳市", street: "南山区", address:"xxx巷xx号", isChecked: true},
      {id: 2, name:"地址2", phone:"123xxxxxxxx", provice:"广东省", city:"深圳市", street: "南山区", address:"xxx巷xx号", isChecked: false},
      {id: 3, name:"地址3", phone:"123xxxxxxxx", provice:"广东省", city:"深圳市", street: "南山区", address:"xxx巷xx号", isChecked: false}
    ];
    this.getGoodsAttr();	
    this.getGoodsDetail();	
  }
}
</script>

<style lang="scss" scoped>
  .order-box{
    background-color: #FFF !important;
    .order-title{
      height:40px;
      margin:0 auto;
      margin-top:20px;
      background:#F7F6F6;
      border-bottom: 1px solid #e5e5e5;
    }
    p{
      width:120px;
      height:28px;
      line-height:40px;
      font-size:20px;
      margin-left:20px;
    }
  }
  .order-content{
    margin: 0 auto;
  }
  .order-content-select{
    width: 25%;
    margin-bottom: 30px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    .active{
      border: 1px solid #E5AD68!important;
    }
    .address-content{
      width:200px;
			height:120px;
			margin:40px auto 0;
			border:1px solid lightgray;
      p{
        width:180px;
				height:34px;
				color: #333333;
				font-size:12px;
				margin-left:10px;
				overflow: hidden;
				word-wrap: break-word;
				span{
					line-height:34px;
					display:inline-block;
				}
				span:nth-child(1){
					float:left;
				}
				span:nth-child(2){
					float:right;
				}
      }
      p:nth-child(1){
				border-bottom:1px solid lightgray;
			}
			p:nth-child(2){
				margin-top:10px;
				color: #888888;
				line-height: 17px;
			}
      input{
				position:absolute;
				right: 0;
				bottom: 0px;
				display:none;
				width:36px;
				height:21px;
				font-size:12px;
				color: #8D8D8D;
				border:none;
				outline: none;
				cursor: pointer;
				background: #E5E5E5;
			}
			&:hover input{
				display: block;
			}
    }
  }
  .content-box-add{
    width:25%;
    display:inline-block;
    cursor: pointer;
    .content{
      width:200px;
      height:120px;
      margin:40px auto 30px;
      
      vertical-align: middle;
      position:relative;
      border:1px solid lightgray;
    }
    .add{
      width:20px;
      height:20px;
      color:white;
      position:absolute;
      left:65px;
      top:35px;
      font-size: 16px;
      line-height:20px;
      text-align: center;
      border-radius: 50%;
      background: #E5AD68;
    }
    .address-add{
      width:84px;
      height:17px;
      line-height: 17px;
      font-size: 12px;
      color: #E5AD68;
      position:absolute;
      left:58px;
      top:60px;
    }
  }
  .order-list{
    height:80px;
    margin:0 auto;
    border-bottom:1px solid #E5E5E5;
    .order-list-box{
      width:300px;
      height:20px;
      float:right;
      margin-top:30px;
      span{
        width:28px;
        height:20px;
        font-size: 14px;
        line-height: 20px;
        float:right;
        color:#444444;
        margin-right:70px;
        display:inline-block;
		  }
    }
  }
  .cold{
    height:200px;
    margin:0 auto;
    position:relative;
    .cold-pic{
      width:100px;
      height:100px;
      margin:40px 0 40px 40px ;
      display:inline-block;
      background-color:#BD8D6A;
      background-position:center;
      background-size:cover;
      background-repeat:no-repeat;
      cursor: pointer;
    }
    .order-explain{
      width:140px;
      margin-left:30px;
      position:absolute;
      top:40px;
      display:inline-block;
      p:nth-child(1){
        // height:22px;
        // width:148px;
        line-height:22px;
        font-size: 16px;
        color: #333333;
        font-weight:bold;
        cursor: pointer;
        overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
      p:nth-child(2){
        height:17px;
        line-height:17px;
        font-size: 12px;
        margin-top:2px;
        color: #888888;
        cursor: pointer;
      }
      p:nth-child(3){
        height:17px;
        line-height:17px;
        font-size: 12px;
        margin-top:13px;
        color: #888888;
        cursor: pointer;
      }
    }
    .order-mark{
      width:300px;
      height:17px;
      float:right;
      margin-top:72px;
      span{
        width:45px;
        height:17px;
        font-size: 12px;
        line-height: 17px;
        color:#444444;
        margin-right:30px;
        margin-left:13px;
        font-weight: bold;
        display:inline-block;
      }
      span:nth-child(3){
        font-size: 16px;
        color: #FF410B;
      }
    }
  }
  .order-pay{
    height:80px;
    margin:0 auto;
    background:#F7F6F6;
    .order-pay-box{
      width:270px;
      float:right;
      span:nth-child(1){
        width:36px;
        height:17px;
        line-height: 80px;
        font-size: 12px;
        color: #444444;
      }
      span:nth-child(2){
        width:56px;
        height:28px;
        line-height: 80px;
        font-weight: bold;
        font-size: 20px;
        color: #FF410B;
      }
      input{
        width:120px;
        height:40px;
        margin:20px 20px 20px 30px;
        background: #E5AD68;
        color:white;
        border: 1px solid rgba(0,0,0,0.14);
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
</style>