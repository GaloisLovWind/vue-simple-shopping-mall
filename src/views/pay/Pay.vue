<template>
	<div class="pay">
		<div class="qr-wrap" v-show="show">
      <div class="qr">
        <p>请用手机支付宝扫码付款</p>
        <div id="qrcode"></div>
        <button @click="cancelPay">取消支付</button>
      </div>
    </div>
    <div class="pay-wrap">
      <h3>订单提交成功，应付金额 ${{orderTotal}}</h3>
      <p>
        <span>该宝贝为付款减库存，拍下并不代表购买成功哦。请您尽快付款，付款后我们将会尽快安排发货。</span>
        <span>收货地址:<span class="detail">{{successAddress.province+'  '+successAddress.city+'  '+successAddress.area+'  '+successAddress.street+'  '+successAddress.address+'  '+successAddress.name+'  '+'(收)'+'  '+successAddress.phone}}</span></span>
      </p>
      <ul>
        <h3>支付方式</h3>
        <li>
          <div class="pay-check" :class="{'active': alipay }" @click="alipay=!alipay,wechat=false" ></div>
          <div class="pay-content">
            <h4>支付宝</h4>
            <span>国内最大支付平台，安全保障、支付自如</span>
          </div>
          <div class="img alipay"></div>
        </li>
        <li>
          <div class="pay-check" :class="{'active': wechat}" @click="wechat=!wechat,alipay=false"></div>
				  <div class="pay-content">
					<h4>微信</h4>
					<span>微信支付是面向聊天垂直领域的不可替代品</span>
				  </div>
          <div class="img weixin"></div>
        </li>
        <div class="pay-affirm">
          <input type="button" value="确认支付" @click="goPay()"></input>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import msg from "iview/src/components/message";
export default {
  name: "Pay",
  components:{
    msg
  },
  data(){
    return {
      alipay:true,
      wechat:false,
      show:false,
      orderTotal: 203.00,
      successAddress:{},
      payCheck:[],
    }
  },
  methods:{
    getAipayCode(){
      return "支付宝二维码"
    },
    getWechatCode(){
      return "微信二维码"
    },
    cancelPay(){
      let Qrcode = document.getElementById("qrcode");
      Qrcode.innerHTML = "";
      this.show = false;
    },
    goPay(){
      let code = null;
      this.show = true;
      if(this.alipay){
        code = this.getAipayCode();
      } else if(this.wechat){
        code = this.getWechatCode();
      }
      let oQrcode = document.getElementById("qrcode");
      let qrcode = new QRCode(oQrcode, {
            width : 150,//设置宽高
            height : 150
      });
      qrcode.makeCode(code);
      this.queryPayStatus(1);
    },
    queryPayStatus(payId){
      setTimeout(() => {
        this.paySuccessNotice(payId);
      }, 2000);
    },
    paySuccessNotice(payId){
      msg.success('支付成功,正在跳转页面');
      this.show = false;
      setTimeout(() => {
        this.$router.push({path:'buy',query:{ id: 1}});
      },3000);
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  .qr-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.7);
    z-index: 2;
    text-align: center;
    p{
      color: #888;
      font-size: 13px;
      padding-bottom: 20px;
    }
    .qr{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      text-align: center;
      background-color: #fff;
      padding: 15px;
      #qrcode{
        display: inline-block;
      }
      button{
        width: 200px;
				height: 33px;
				margin-top: 30px;
				background-color: #D9534F;
				color: #fff;
				font-size: 14px;
				outline: none;
				border: solid 1px #D43F3A;
				border-radius: 4px;
				cursor: pointer;
      }
      button:hover{
				background-color: #C9302C;
				border: solid 1px #AC2925;
			}
			button:active{
				background-color: #AB2824;
			}
    }
  }
  .pay-wrap{
    width: 960px;
    background-color: #fff;
    margin:0 auto;
    h3{
      height: 80px;
      background-color: #F7F6F6;
      line-height: 80px;
      font-weight: 500;
      font-size: 20px;
      box-sizing:border-box;
      padding: 0 0 0 20px;
    }	
    p{
      height: 160px;
      box-sizing:border-box;
      padding: 0 0 0 20px;
      font-size: 12px;
      margin-top: 7px;
      span{
        margin-top: 13px;
      }
      span:nth-child(1){
        display: inline-block;
        color:#FF410B ;
      }
      .detail{
        margin-left: 30px;
        color: #657180 !important;
        font-size: 18px;
      }
      span:nth-child(2){
        display:block;
      }
    }
    ul{
      li{
        height: 120px;
        position: relative;
        box-sizing:border-box;
        padding: 0 38px 0 0;
        background-color: #FAFAFA;
        .pay-check{
          width: 22px;
          height: 22px;
          border:1px solid #D3CFC8;
          border-radius: 50%;
          display: inline-block;
          position: absolute;
          top: 42%;
          left: 20px;
        }
        .active{
          width: 22px;
          height: 22px;
          background-image: url(~@/assets/images/pay/checked.png);
          border: 0;
        }
        .pay-content{
          display: inline-block;
          position: absolute;
          left: 63px;
          top:28%;
          h4{
            margin-bottom: 14px;
          }
        }
        .img{
          height: 46px;
          background-repeat: no-repeat;
          -webkit-background-size: cover;
          background-size: cover;
          float: right;
          margin-top: 40px;
          
        }
        .alipay{
          width: 130px;
          margin-right: 9px;
          background-image: url(~@/assets/images/pay/alipay.png);
        }
        .weixin{
          width: 140px;
          background-image: url(~@/assets/images/pay/weixin.png);
        }
      }
      .pay-affirm{
        height: 80px;
        background-color: #FAFAFA;
        margin-top: 60px;
        box-sizing: border-box;
          padding: 20px 20px 20px 0;
        input{
          text-decoration: none;
          width: 124px;
            height: 40px;
            border: 0;
            border-radius: 2px;
            background-color: #E5AD68;
            float: right;
            color: #fff;
        }
      }
    }
  }
  #checked{
  width: 23px;
    height: 23px;
    background-image: url(~@/assets/images/pay/checked.png);
    border: 0;
  }
  .pay-ma{
    width: 400px;
    height: 400px;
    box-sizing:border-box;
    padding:50px 50px;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>