<template>
    <div class="lg-title ui-clear">
      <span @click="close()">
				<Icon class="lg-close" type="md-close" />
			</span>
      <div class="lg-logo ui-fl"></div>
			<span class="ui-fr color" @click="jump">{{jumpText}}</span>
    </div>
</template>

<script>
import icon from "iview/src/components/icon";
export default {
  name: "LoginClose",
  props: ["isLogin"],
  data(){
    return {}
  },
  computed:{
    jumpText(){
      return this.isLogin?"注册":"登录";
    }
  },
  methods:{
    close(){
      this.$emit('close');
    },
    jump(){
      this.$emit('jump');
    }
  },
  components:{
    Icon: icon
  }
}
</script>

<style scoped lang="scss">
  .lg-close{
		font-size:20px;
		position:absolute;
		top:10px;
		right:10px;
		color:#989898;
		z-index:202;
	}
	.color{
		color:#3497FF;
	}
	.lg-title{
		width:100%;
		>span{
			
			font-size:12px;
		}
		>span:hover{
			cursor:pointer;
		}
		.lg-logo{
			width:65px;
			height:20px;
			background:url("~@/assets/images/home/LOGO Text.png") no-repeat center;
			background-size:contain;
		}
	}
</style>