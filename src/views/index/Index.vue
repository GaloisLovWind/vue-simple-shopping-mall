<template>
  <div>
    <section class="banner w-960" :class="{'ld-400':ldpic.banner}">
			<Carousel 
					v-model="setBan.index"
					:autoplay="setBan.autoplay">
	        <Carousel-item v-for="item in banner" :key="item.id">
	        	<router-link :to="{path:'/goods',query:{id:item.link}}">
		            <div class="ban-pic" :style="{'background-image':'url('+item.image+')'}">
		            	
		            </div>
	            </router-link>
	        </Carousel-item>
	    	</Carousel>
		</section>
		<ul class="w-960 nav ui-clear" :class="{'ld-200':ldpic.nav}">
			<li class="ui-fl" v-for="item in classify"  @click="goClassify(item)">
					<p>{{item.text}}</p>
						<div class="nav-bg" :data-id="item.id"
							:style="{'background-image':'url('+item.image+')'}"></div>
			</li>
		</ul>
		<div class="huodong">
			<a href="javascript:;" class="w-960" :style="{'background-image':'url('+SliderCenter.image+')'}">
				活动
			</a>
		</div>
		<div class="tejia">
			<div class="w-960" :class="{'ld-400':ldpic.tj}">
				<h3 class="tejia-title">
					<span class="tejia-bg">特价专区</span>
					<span class="tejia-sm">给你最优惠的好商品</span>
				</h3>
				<ul class="tj-list ui-clear">
					<li class="ui-fl" v-for="item in sales">
						<router-link :to="{path: '/goods', query:{id: item.id, cid: item.cid}, getSaleById:'getSaleById'}">
							<div class="tj-bg" :style="{'background-image': 'url('+ item.image+')'}"></div>
							<p class="tj-name">{{ item.name }}</p>
							<p class="tj-price">{{ "$" + item.price }}</p>
						</router-link>
					</li>
				</ul>
			</div>	
		</div>
		<section class="tuijian w-960 ui-clear" :style="{'background-image':'url('+SliderBottom.image+')'}">

		</section>
		<section class="goods w-960 ui-clear" :class="{'ld-400': ldpic.goods}">
			<h3 class="goods-title">
				<span class="goods-lg">商品</span>
				<span class="goods-sm">社区最有态度的好物送给你</span>
			</h3>
			<ul class="goods-list ui-clear">
				<li class="goods-li ui-fl" v-for="item in goods">
					<router-link :to="{path:'/goods' ,query: {id:item.id}}">
						<div class="goods-pic" :style="{'background-image': 'url('+ item.image +')'}"></div>
						<p class="goods-name">{{ item.name }}</p>
						<p class="goods-price">{{ "$" + item.price }}</p>
					</router-link>
				</li>
			</ul>
		</section>
  </div>
</template>

<script>
import Carousel from "iview/src/components/carousel/carousel"
import CarouselItem from "iview/src/components/carousel/carousel-item"
import alert from "iview/src/components/alert"
import APIService from "@/network/service";

export default {
  name: "Index",
  data(){
    return {
      ldpic:{
      	banner:true,
      	nav:true,
      	tj:true,
      	goods:false
      },
			setBan:{
      	autoplay:true,
        autoplaySpeed: 2000,
        dots: 'inside',
        trigger: 'click',
        arrow: 'hover',
        index:0
			},
			// 幻灯片
      banner: [],
			// 分类
			classify: [],
			// 中部幻灯片
			SliderCenter: {},
			// 特价
			sales: [],
			// 底部幻灯片
			SliderBottom:{},
			// 商品
			goods: [],
    }
  },
  mounted() {
		// 幻灯片
    this.banner = [
      {id: 1, link: "", image: require("@/assets/images/banner/1.jpg")},
      {id: 2, link: "", image: require("@/assets/images/banner/2.jpg")},
      {id: 3, link: "", image: require("@/assets/images/banner/3.jpg")},
      {id: 4, link: "", image: require("@/assets/images/banner/4.jpg")},
      {id: 5, link: "", image: require("@/assets/images/banner/5.jpg")}
    ];
		// 分类
		APIService.getClassifyList().then((res) => {
			this.classify = res.data;
		});
		// 中部幻灯片
		this.SliderCenter = { image: require("@/assets/images/classify/index-hd_03.png")};
		// 特价
		this.sales = [
			{id: 1, cid: 111, name:"特价1", price: 23.09, image: require("@/assets/images/tejia/tj-li_03.png")},
			{id: 2, cid: 222, name:"特价2", price: 19.05, image: require("@/assets/images/tejia/tj-li_05.png")},
			{id: 3, cid: 333, name:"特价3", price: 53.01, image: require("@/assets/images/tejia/tj-li_07.png")},
		];
		// 底部幻灯片
		this.SliderBottom = { image: require("@/assets/images/tuijian/1.jpeg")};
		// 商品
		APIService.getGoodsList().then((res) => {
			this.goods = res.data;
		});
	
	},
	methods:{
		goClassify(item){
			this.$router.push({path:'/classify',query:{cid:item.id}})
		}
	},
  components:{
    Carousel,
    CarouselItem,
    alert
  }
}
</script>

<style lang="scss" scoped>
	/* 幻灯片 */
	.ban-pic{
		height:400px;
		background-repeat:no-repeat;
		background-position:center;
		>a{
			display:block;
			height:100%;
			width:100%;
			text-indent:-9999px;
		}
	}
	/* 分类 */
	.nav{
		margin-top: 10px !important;
		>li{
			width: 25%;
			padding: 24px 0 40px;
			text-align: center;
			p{
				width: 100%;
				padding: 5px 0;
				font-weight: 600;
			}
			.nav-bg{
				width: 100%;
				height: 100px;
				margin: 0 auto;
				background:url("~@/assets/images/classify/index-class_03.jpg") no-repeat center;
				background-size: auto;
			}
		}
	}
	/* 活动 */ 
	.huodong{
		height: 220px;
		margin-top: 10px;
		>a{
			display:block;
			height:100%;
			text-indent:-9999px;
			background: url("~@/assets/images/classify/index-hd_03.png") no-repeat center;
			background-size:cover;
		}
	}
	/* 特价 */
	.tejia{
		margin-top: 10px;
		.tejia-title{
			padding: 20px 0;
			.tejia-bg{
				padding-left:10px;
				font-size:24px;
			}
			.tejia-sm{
				margin-left:40px;
				font-size:14px;
				font-weight: 400;
			}
		}
		.tj-list{
			>li{
				width: 33.333333333%;
				min-height: 270px;
				padding: 36px 0 20px;
				text-align: center;
				.tj-bg{
					display: block;
					width: 200px;
					height: 200px;
					background-image:url("~@/assets/images/tejia/tj-li_03.png"); 
					background-repeat: no-repeat;
					background-position: center;
					background-size:cover;
					margin:0 auto;
				}
				.tj-name{
					padding:10px 0;
				}
				.tj-price{
					color:#F6732D;
				}
			}
		}
	}
	.tuijian{
		padding:34px 20px  28px 50px;
		background-color:#FFFCF6;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		height: 230px;
	}
	.goods{
		overflow: hidden;
		.goods-title{
			padding: 20px 0;
			.goods-lg{
				padding-left: 10px;
				font-size: 24px;
			}
			.goods-sm{
				margin-left: 40px;
				font-size: 14px;
				font-weight: 400; 
			}
		}
		.goods-li{
			text-align: center;
			width: 25%;
			padding-bottom: 10px;
			.goods-pic{
				width: 200px;
				height: 200px;
				margin: 0 auto;
				padding: 5px;
				background-repeat: no-repeat;
				background-position: center;
				background-size:cover;
				background-clip:content-box;
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
				color: #F6732D
			}
		}
	}
</style>