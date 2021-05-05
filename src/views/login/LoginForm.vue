<template>
     <form >
      <ul class="lgoin-content">
				<li class="lg-li">
					<input class="text"  type="text" name="usernum" placeholder="手机号 或 email" maxlength="50" v-model="userLogin.email">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="密码" maxlength="20" v-model="userLogin.password">
				</li>
				<li class="lg-li forget">
					<a href="javascript:;" class="color" >
						忘记密码?
					</a>
				</li>
				<li class="lg-li">
					<input :disabled="loginDisable"  class="btn" type="button" name="lgbtn" value="登录" @click="doLogin()">
				</li>
			</ul>
    </form>
</template>

<script>

import msg from "iview/src/components/message"
export default {
  name: "LoginForm",
	data(){
		return {
			userLogin: {},
			loginDisable: false
		}
	},
	methods: {
		doLogin(){
			let user=this.userLogin;
			if(!user.email||!user.password){
				msg.info("帐号或密码未输入");
				return;
			};
			this.loginDisable = true;
			let data = {
				userId: "Galois",
				username: "Galois",
				email:user.email.trim(),
				password:user.password.trim()
			}
			setTimeout(() => {
				this.$emit("message", "login success");
				msg.success("login success");
				this.loginDisable=false;
				this.$emit("login", data);
			}, 2000);
		}
	},
	components: {
		msg
	}
}
</script>

<style lang="scss" scoped>
	.lgoin-content{
		margin-top:10px;
		width:100%;
    .lg-li{
      margin-top:16px;
      height:40px;
      font-size:14px;
      line-height:40px;

		input{
			outline:none;
			letter-spacing:1px;
		}
		.text,.btn{
			display:block;
			width:100%;
			height:100%;
		}
		.text,.test{
			text-indent:10px;
			border:1px solid #e5e5e5;
		}
		.btn{
			color:#fff;
			background-color: #E5AD68;
			border: 1px solid rgba(0,0,0,0.14);
			border-radius: 2px;
			
		}
		.test{
			width:60%;
		}
		.test-btn{
			width:35%;
			color:#fff;
			background-color: #676564;
			border: 1px solid rgba(0,0,0,0.14);
			border-radius: 2px;
			transition:all .3s ease;
		}

		.btn:active,.test-btn:active{
			opacity:0.6;
		}
	} 
	}
</style>