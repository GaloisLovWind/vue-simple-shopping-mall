<template>
    <div class="address-mask" >
      <div class="mask-in">
        <input v-model="address.name" type="text" placeholder="收货人姓名" class="address-input">
        <input v-model="address.phone" type="text" placeholder="收货人电话" class="address-input">
        <input v-model="address.province" type="text" placeholder="选择省份" class="address-input">
        <input v-model="address.city" type="text" placeholder="选择城市" class="address-input">
        <input  v-model="address.area" type="text" placeholder="选择区" class="address-input">
        <input v-model="address.street" type="text" placeholder="街道" class="address-input">
        <input v-model="address.address" type="text" placeholder="详细地址" class="address-input-col">
        <input type="button" value="确认" class="address-submit"  @click="addAddress()">
        <input type="button" value="取消" class="address-cancle" @click="cancle">
			</div>
  </div>
</template>

<script>
export default {
  name: "AddressAdd",
	data(){
		return {
			address: {}
		}
	},
	methods:{
		cancle(){
			this.$emit("cancle");
		},
		addAddress(){
			let t = this;
			let data = {
				uid: "Galois",
				name:t.address.name.trim(),
				phone:t.address.phone.trim(),
				address:t.address.address.trim(),
				province:t.address.province.trim(),
				city:t.address.city.trim(),
				area:t.address.area.trim(),
				street:t.address.street.trim()
			}
			this.$emit("addAddress", data);
		}
	}
}
</script>

<style lang="scss" scoped>
.address-mask{
	background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
    // display:none;
    .mask-in{
    	width:450px;
    	height:447px;
    	position:absolute;
    	top:50%;    	
    	left:50%;
    	transform:translate(-50%,-50%);
    	background:white;
    	text-align: center;
    	img{
    		height:20px;
    		margin-left:20px;
    		margin-top:43px;
    		display:block;
    	}
    	input{
    		border:1px solid #E5E5E5;
    		outline: none;
    	}
    	input.address-input{
    		width:187px;
    		height:50px;
    		margin:0 7px;
    		margin-top: 20px;
    		padding-left:10px;
    	}
    	input.address-input-col{
    		width: 392px;
    		height:50px;
    		margin:0 7px;
    		margin-top: 20px;
    		padding-left:10px;
    	}
    	input.address-cancle,input.address-submit{
    		width:30%;
				height:40px;
				line-height: 40px;
				font-size: 12px;
				color:white;
				text-align: center;
				border-radius: 2px;
				border:none;
				margin:25px 15px 0 15px;
				letter-spacing: 0.75px;
    	}
    	input.address-submit{
				background: #7b8cee;
    	}
    }
}
</style>