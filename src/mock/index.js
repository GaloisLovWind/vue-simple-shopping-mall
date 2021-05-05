import Mock from "mockjs";

Mock.setup({
  timeout: "200-600"
});

let configPathService = [];
let whiteList =[
  "./classify.js",
  "./goods.js"
];
const files = require.context('../data', true,/\.js$/);
files.keys().forEach( key => {
  if(whiteList.indexOf(key) != -1){
    configPathService = configPathService.concat(files(key).default);
  }
});

configPathService.forEach( service => {
  for (let [path, target] of Object.entries(service)) {
    let protocol = path.split('|');
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
  }
});