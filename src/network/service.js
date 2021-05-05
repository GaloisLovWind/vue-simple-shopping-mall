import requst from "./request";

export default {
  getClassifyList(){
    return requst({
      url: '/classify/list',
      method: 'get',
    }).then(res => {
      return res.data;
    });
  },
  getGoodsList(){
    return requst({
      url: '/goods/list',
      method: 'get',
    }).then(res => {
      return res.data;
    });
  }
} 