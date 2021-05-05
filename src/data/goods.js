/*
{id: 1, cid: 111, name:"商品1", price: 12.54, image:"", images:[], attr:[
  {name: "颜色", valueList[
    { name:"", }
  ]}
]}
	this.goods = [
			{id: 1, cid: 111, name:"商品1", price: 12.54, image: require("@/assets/images/goods/index-sp_01.jpg")},
			{id: 2, cid: 222, name:"商品2", price: 67.32, image: require("@/assets/images/goods/index-sp_02.jpg")},
			{id: 3, cid: 333, name:"商品3", price: 190.23, image: require("@/assets/images/goods/index-sp_03.png")},
			{id: 4, cid: 444, name:"商品4", price: 23.09, image: require("@/assets/images/goods/index-sp_04.png")},
			{id: 5, cid: 555, name:"商品5", price: 12.32, image: require("@/assets/images/goods/index-sp_05.png")},
			{id: 6, cid: 666, name:"商品6", price: 56.12, image: require("@/assets/images/goods/index-sp_06.png")},
		];
*/
const imageGoodsList = [
  require("@/assets/images/goods/index-sp_01.jpg"),
  require("@/assets/images/goods/index-sp_02.jpg"),
  require("@/assets/images/goods/index-sp_03.png"),
  require("@/assets/images/goods/index-sp_04.png"),
  require("@/assets/images/goods/index-sp_05.png"),
  require("@/assets/images/goods/index-sp_06.png")
];
const goodsList = {
  status: 200,
  message: 'success',
  'data|10': [
    {
      id: "@increment",
      cid: "@integer(1, 4)",
      name: "商品-@cword",
      price: "@float(10, 1000, 2, 4)",
      "image|1": imageGoodsList,
      "images:3":imageGoodsList,
      "attr":[
        {
          name: "颜色",
          "valueList|2":[{
            "name|1": ["黄", "蓝", "红", "黑", "白"]
          }]
        },
        {
          name: "尺寸",
          "valueList|2":[{
            "name|1": ["大", "小", "中"]
          }]
        }
      ]
    }
  ]
};
export default {
  'get|/goods/list': goodsList
}