<template>
  <div>
  	<header class="header">
  		<div class="w-960 ">
  			<router-link to="/">
				<span>社区欢迎您!</span>
			</router-link>
  			<span v-if="isUserTitle">
  				<span class="login" @click="login(true)">登录</span>
	  			<span>|</span>
	  			<span @click="login(false)">注册</span>
  			</span>
  			<span v-else>
  				<span @click="goUserInfo(user)" class="login" :data-name="user.username?user.username:''">{{user &&user.username || '无昵称'}}</span>
	  			<span>|</span>
	  			<span @click="quit()">退出</span>
  			</span>
  		</div>
		</header>
		<login-box v-if="showLoginOrUpdate" :boxWidth="500">
			<login-close slot="close" :isLogin="isLogin" @close="close(0)" @jump="jump"/>
			<login-content slot="content" :isLogin="isLogin" @message="recieveMessage" @login="LoginConfirm" @register="registerConfirm"/>
		</login-box>
    <section class="com-logo">
			<div class="w-960 ui-pos-r">
				<router-link to="/">
					<div class="logo-woniu"></div>
				</router-link>
				<div class="logo-wochuang"></div>
			</div>
		</section>
    <router-view />
		<section class="com-pinzhi">
			<ul class="w-960 pinzhi-list ui-just">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</section>
    <footer class="footer">
			<p>北公网安备 xxxxxxxxxxxxx号    公司版权所有©1997-2017</p>
		</footer>
  </div>
</template>

<script>

import msg from "iview/src/components/message";
import LoginContent from "@/views/login/LoginContent";
import LoginBox from "@/components/login/LoginBox";
import LoginClose from "@/views/login/LoginClose";
import Common from "@/utils/common";
export default {
  name: "Home",
  data(){
    return {
      isUserTitle: true,
      isLogin: false,
			showLoginOrUpdate: false,
    }
  },
	computed:{
		user(){
			return this.$store.state.user||{};
		}
	},
	mounted(){
		if(this.user.username){
			this.isUserTitle = false;
		}
	},
  methods:{
    login(isLogin){
			if(isLogin){
				if(this.isUserTitle){
					msg.error("亲！你还没有注册")
					return;
				}
			}
			this.close(true);
			this.isLogin = isLogin;
    },
    close(isShow){
      this.showLoginOrUpdate = isShow;
    },
		quit(){
			this.isUserTitle = true;
			setTimeout(() => {
				this.$store.commit("clearUser");
				msg.info("当前用户已退出");
			}, 1000);
		},
		recieveMessage(userData){
			msg.sucess("用户登录")
		},
		LoginConfirm(userData){
			this.isUserTitle = false;
			this.saveData(userData);
			this.close(false);
		},
		registerConfirm(userData){
			this.isUserTitle = false;
			this.saveData(userData);
			this.close(false);
		},
		goUserInfo(){

		},
		jump(){
			this.isLogin = !this.isLogin;
		},
		saveData(userData){
			this.$store.commit("setUser", userData);
		}
  },
	components: {
		LoginContent,
		LoginBox,
		LoginClose,
		msg
	}
}
</script>

<style scoped lang="scss">
.header {
  width:100%;
 	padding:12px 0;
 	background-color:#444444;
 	color:#fff;
 	font-size:14px;
  .login{
 		margin-left:20px;
 	}
  span:not(:first-child):hover{
 		cursor:pointer;
 	}
 	span{
 		color:#fff;
 	}
}
.com-logo{
 		width:100%;
 		height:120px;
 		.w-960{height:100%;}
 		.logo-woniu{
 			position:absolute;
 			width:40px;
 			height:34px;
 			background: url("~@/assets/images/home/Worm.png") no-repeat center;
 			left:0;
 			top:50%;
 			transform:translatey(-50%);
		}
		.logo-wochuang{
			position:absolute;
			width:85px;
			height:28px;
			background: url("~@/assets/images/home/LOGO Text.png") no-repeat center;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
		}
 		.logo-woniu,.logo-wochuang{
 			background-size:cover;
 			z-index:1;
 		}
}

.com-pinzhi{
  width:100%;
	padding:50px 0;
  .pinzhi-list {
    padding: 0 40px;
    text-align: justify;
    font-size: 0;
    >li{
      display: inline-block;
      text-align: justify;
      width: 225px;
      height: 64px;
      background-position: center;
			background-repeat: no-repeat;
			background-size:contain;
    }
    li:nth-child(1){
			background-image: url("~@/assets/images/home/left.png");
		}
    li:nth-child(2){
			background-image: url("~@/assets/images/home/middle.png");
		}
		li:nth-child(3){
			background-image: url("~@/assets/images/home/right.png");
		}
  }
}

.footer {
  width: 100%;
  padding: 60px 0 58px;
  font-size: 16px;
  background-color: #444;
  >p {
    width: 100%;
    text-align: center;
    color: #fff;
  }
}
</style>