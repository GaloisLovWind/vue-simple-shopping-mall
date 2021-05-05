<template>
  <div class="goods ui-hover-h">
    <div class="w-960 ui-hover-h">
      <div class="goods-header ui-clear">
        <div class="goods-header-left ui-fl">
          <div class="goods-header-left-pic ui-fl":style="{'background-image':'url('+bigImgSrc+')'}"></div>
          <div class="goods-header-left-bottom">
            <span class="left" @click="switchGoodsImg(checkNumber, 'left')"> < </span>
            <div class="wrap">
              <div class="small-image" v-for="(item,index) in banner" :style="{'background-image':'url('+item+')'}" @click="switchGoodsImg(index,'')" ></div>
            </div>
            <span class="right" @click="switchGoodsImg(checkNumber, 'right')"> > </span>
          </div>
        </div>
        <div class="goods-header-right ui-fl">
          <h2 :title="goods.name">{{ goods.name }}</h2>
          <p>{{ goods.introduce }}</p>
          <div class="goods-header-right-price">
            <span>价格</span>
            <span class="goods-header-right-color">{{ "$" + goods.price }}</span>
          </div>
          <div class="goods-header-right-goods">
            <div class="goods-header-right-colors ui-clear" v-for="(item, index) in goods.attr">
              <span class="ui-fl">{{item.name}}</span>
              <ul class="colors-list ui-clear ui-fl">
                <li class="ui-fl" v-for="(val, key) in item.valueList" @click="chooseAttr(item, val, index, key)" :class="{active: val.isActive}">{{ val.name }}</li>
              </ul>
            </div>
            <div class="goods-header-right-number ui-clear">
              <span class="ui-fl">数量</span>
              <btng class="btn-group">
                <btn type="text" ghost icon="md-arrow-round-back" @click="numberSub" ></btn>
                <input class="btn-middle ui-fl" v-model="numberBuy">
								<btn type="text" ghost icon="md-arrow-round-forward" @click="numberSup"></btn>
              </btng>
              <button class="buy-btn" @click="toPayList">
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="goods-pic">
      <li class="goods-pic"  v-html="goods.content">
			</li>
    </ul>
  </div>
</template>

<script>
import btng from 'iview/src/components/button/button-group'
import btn from 'iview/src/components/button/button'
import msg from "iview/src/components/message"
export default {
  name: "Goods",
  components:{
    btng,
		btn,
    msg
  },
  data(){
    return {
      numberBuy: 0,
      userChooseAttr:[],
      goods: {
        attr: [
          { name: "", valueList: []}
        ],
        price: 0,
      },
      banner: [],
      checkNumber: 0,
      bigImgSrc: ""
    }
  },
  computed:{
    goodsId(){
      return this.$router.currentRoute.query.id;
    }
  },
  methods:{
    checkGoods(index){
      this.checkNumber = index;
      let smallImage = document.getElementsByClassName("small-image");
      for(let i = 0; i < this.banner.length; i++){
        smallImage[i].style.border = "none";
        if(i === index){
          smallImage[index].border = "1px solid #ACB72F";
          this.bigImgSrc = this.banner[i];
        }
      }
    },
    switchGoodsImg(index, direction){
      let wrap = document.getElementsByClassName("wrap")[0];
      if(direction === "left"){
        if(this.checkNumber > 0){
          this.checkNumber--;
          if(this.checkNumber < 4 && this.checkNumber >= 0 && wrap.offsetLeft<0){
            wrap.style.left = wrap.offsetLeft + 64 + "px";
          }
          this.checkGoods(this.checkNumber);
        }
      } 
      else if(direction === "right"){
        this.checkNumber++;
        if(this.checkNumber >= 0 && this.checkNumber < this.banner.length){
          if(this.checkNumber > 3){
            wrap.style.left = wrap.offsetLeft - 64 + "px";
          }
          this.checkGoods(this.checkNumber);
        }
        if(this.checkNumber === this.banner.length){
          this.checkNumber = this.banner.length - 1;
        }
      } else {
        this.checkGoods(index);
      }
    },
    chooseAttr(attr, val, index, key){
      this.userChooseAttr[attr.name] = val.name;
      this.goods.attr[index].valueList.forEach( item => {
        item.isActive = false
      });
      val.isActive = true;
    },
    toPayList(){
      let user = "Galois";
      let userChooseAttrLen = 0;
      for(let key in this.userChooseAttr){
        userChooseAttrLen++;
      }
      if(this.goods.attr.length !== userChooseAttrLen){
        msg.warning("请选择商品全部属性");
        return;
      }
      if(user === ""){
        msg.warning("请登录")
      } else {
        let routerQuery = this.getParam(user);
        this.$router.push({path:'order',query:routerQuery})
      }
    },
    getParam(userId){
      // 传递商品参数
      let userChooseGoods = {};
      userChooseGoods.goods_price = this.goods.price;
      userChooseGoods.goods_id = this.goodsId;
      userChooseGoods.user_id=userId;
			userChooseGoods.goods_number=this.numberBuy;
      userChooseGoods.order_total = (Number(userChooseGoods.goods_price,10)*parseInt(userChooseGoods.goods_number,10)).toFixed(2);
      userChooseGoods.goods_attr = JSON.stringify(this.userChooseAttr);
      return userChooseGoods;
    },
    numberSup(){
      this.numberBuy++;
    },
    numberSub(){
      if(this.numberBuy > 1){
        this.numberBuy--;
      }
    }
  },
  mounted(){
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
    };
    this.banner = this.goods.images;
    this.checkNumber = 0;
    setTimeout(() => { this.checkGoods(0);},1000)
  }
}
</script>

<style lang="scss" scoped>
  .goods-header{
    width: 100%;
    position: relative;
    margin-top: 20px;
    margin-bottom: 70px;
    .goods-header-left{
      width: 300px;
      height: 370px;
      font-size: 0px;
      .goods-header-left-pic{
        float: left;
        width: 300px;
        height: 300px;
        background-color: #e8e8e8;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .goods-header-left-bottom{
        position: relative;
        float: left;
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 0;
        .left{
          display: inline-block;
          padding: 0 7px;
          background-color: #FBFBFB;
          position: absolute;
          left: 0;
          z-index: 10;
          line-height: 50px;
        }
        .right{
          position: absolute;
					top: 10px ;
					right:0;
					display: inline-block;
					padding: 0 7px;
					background-color: #FBFBFB;
					line-height: 50px;
        }
        span{
          font-size: 15px;
					cursor: pointer;
        }
        .wrap{
					position: absolute;
					width:400px;
					left:22px;
					bottom: 10px;    
					div{
						display: inline-block;
						width: 50px;
						height: 50px;
						box-sizing: border-box;
						margin: 0 7px;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
					}
          .small-image{
            cursor: pointer;
          } 
        }
      }
    }
    .goods-header-right{
      width:67.9999999999999%;
			padding-left:36px;
      >h2{
        color:#555;
				font-size:20px;
				padding:0 0 10px 0;
      }
      >p{
        font-size:12px;
				color:#888888;
				padding-left:1px;
      }
      .goods-header-right-price{
        width:100%;
				padding:20px;
				background-color: #F7F6F6;
				margin-top:30px;
				color:#000; 
        .goods-header-right-color{
          color: #FF4108;
          font-size: 20px;
          font-weight: 800;
        }
      }
      .goods-header-right-colors{
				width:100%;
				padding-top:20px;
				padding-left:20px;
				line-height: 30px;
				>span{
					color:#000;
				}      
        .colors-list{
        	margin-left:10px;
					overflow:hidden;

					>li{
						line-height: 20px;
						padding: 5px 10px;
						margin-left:10px;
						text-align: center;
						background-color:#e8e8e8;
						background-repeat: no-repeat;
						background-position:center;
						background-size:cover;
						cursor: pointer;

						&.active{
							background-color: #E5AD68;
							color: #fff;
						}
					}
        }  
      }
      .goods-header-right-number{
        padding:10px 0 0 20px;
				line-height:30px;
				color:#000;
        >span{
          padding-right: 20px;
        }
        .btn-group{
          .btn-middle{
						width:60px;
						text-align: center;
						font-size:12px;
						border:none;
						outline: none;
						border-bottom: 1px solid #e7e7e7;
						border-top: 1px solid #e7e7e7;
					}
        }
        .buy-btn{
          text-align:center;
					color:#fff;
					padding:0 34px;
					outline:none;
					background: #E5AD68;
					border: 1px solid rgba(0,0,0,0.14);
					border-radius: 2px;
					margin-left:80px;
        }
        .buy-btn:active{
          border: 1px solid rgba(0,0,0,.3);
        }
      }
    }
  }
  .goods-pics{
		width:960px;
		margin:40px auto 0;
		.goods-pic{
			// width:100%;
			// height:450px;
			text-align:center;
			background-color:#f8f8f8;
			background-repeat: no-repeat;
			background-position:center;
			background-size:cover;
		}
	}
</style>