/*
{
  id: 1, text: "分类1", image:"",desc:""
}
[
		// 	{id: 1, text: "分类1", image: require("@/assets/images/classify/1.jpg")},
		// 	{id: 1, text: "分类2", image: require("@/assets/images/classify/2.jpg")},
		// 	{id: 1, text: "分类3", image: require("@/assets/images/classify/3.jpg")},
		// 	{id: 1, text: "分类4", image: require("@/assets/images/classify/4.jpg")}
		// ];
*/
const imageClassifyList = [
  require("@/assets/images/classify/1.jpg"), 
  require("@/assets/images/classify/2.jpg"),
  require("@/assets/images/classify/3.jpg"),
  require("@/assets/images/classify/4.jpg")
];
const classifyList = {
  status: 200,
  message: 'success',
  'data|4': [{
    id: '@increment',
    text: '分类@integer(1, 10)',
    desc: "@cparagraph",
    'image|1': imageClassifyList
    // image:"@dataImage('200x100', '分类!')"
  }]
};

export default {
  'get|/classify/list': classifyList
}