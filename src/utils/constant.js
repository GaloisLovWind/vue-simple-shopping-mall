export const ORDER_STATUS = {
  WAITPAY: { id: 0,  name:"wait_pay",  text: "待付款" },
  WAITSEND: { id: 1, name:"wait_send", text: "待发货" },
  Recieve: { id: 2, name:"already_send", text: "已发货" },
  FINSH: { id: 0, name:"finish", text: "完成" }
}

export const PAY_STATUS = {
  WAITPAY: { id:0, name:"wait_pay", text: "未付款" },
  PAYING: { id:1, name:"paying", text: "付款中" },
  FINISH: { id:0, name:"finish", text: "已付款" },
}

export const CLIENT_END_PATH = {
  PAY: "/pay",
  BUY:"/buy",
  ORDER: "/order",
}