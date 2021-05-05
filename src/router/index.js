import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
Vue.use(Router)

const Index = () => import("@/views/index/Index");
const Classify = () => import("@/views/classify/Classify");
const Goods = () => import("@/views/goods/Goods");
const Order = () => import("@/views/order/Order");
const Pay = () => import("@/views/pay/Pay");
const Buy = () => import("@/views/buy/Buy");

const routes =  [
  { path: "", redirect: "/index"},
  {
    path: '/index',
    name: 'index',
    meta: {
      name: "Index"
    },  
    component: Index
  },
  {
    path: '/classify',
    name: 'classify',
    meta: {
      name: "Classify"
    },  
    component: Classify
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {
      name: "Goods"
    },  
    component: Goods
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      name: "Order"
    },  
    component: Order
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      name: "Pay"
    },  
    component: Pay
  },
  {
    path: '/buy',
    name: 'buy',
    meta: {
      name: "Buy"
    },  
    component: Buy
  }
];

const router = new Router({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  store.commit("setLocalUser");
  window.scrollTo(0,0);
  next();
})
export default router;
