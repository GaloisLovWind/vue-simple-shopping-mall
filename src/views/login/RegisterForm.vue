<template>
      <form>
			<ul class="lgoin-content">
				<li class="lg-li">
					<input class="text" type="text" name="username" placeholder="账号" maxlength="45" v-model="userRegister.username">
				</li>
				<li class="lg-li">
					<input class="text" type="email" name="remail" placeholder="邮箱 (需要接收验证码)" maxlength="45" v-model="userRegister.email">
				</li>
				<li class="lg-li">
					<input class="test ui-fl" type="text" name="test" placeholder="输入验证码" maxlength="6" v-model="userRegister.code">
					<input class="test-btn ui-fr" type="button" name="yanzheng" v-model="btnMsg"  :disabled="!mailVerifyStatus" @click="mailVerify">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="输入密码" maxlength="20" v-model="userRegister.passworda">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="确认密码" maxlength="20" v-model="userRegister.passwordb">
				</li>
				<li class="lg-li ui-ver-m">
					<check v-model="checkProtocol" class="ui-ver-md"></check>
					<span class="ui-dis-ib ui-ver-md">我已阅读并已同意</span>
					<a href="javascript:;" class="ui-dis-ib color ui-ver-md">
						《社区用户协议》
					</a>
				</li>
				<li class="lg-li">
					<input class="btn" type="button" name="lgbtn" value="同意并注册" :disabled="!checkProtocol" @click='register'>
				</li>
			</ul>
    </form>
</template>

<script>
import check from 'iview/src/components/checkbox'
export default {
  name: "RegisterForm",
	data(){
		return {
			userRegister:{},
			btnMsg: "",
			mailVerifyStatus: true,
			checkProtocol: false
		}
	},
	methods:{
		mailVerify(){
			let timer = null;
			clearInterval(timer);
			setTimeout(() => {
				this.mailVerifyStatus =false;
			}, 2000);
		},
		register(){
			let data = {
					username: this.userRegister.username,
					email: this.userRegister.email.trim(),
					password: this.userRegister.passwordb.trim(),
					code:this.userRegister.code.trim()
			}
			if(this.userRegister.passworda.trim()== this.userRegister.passwordb.trim()) {
				this.$emit("register", {
					username: data.username,
					email: data.email,
					password: data.password,
				});
			}
		}
	},
	components:{
		check
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
			/*input 通用*/
		.forget{
			text-align:right;
			
		}
	}
</style>