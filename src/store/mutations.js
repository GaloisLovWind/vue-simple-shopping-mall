import Common from "@/utils/common";

export default {
  setUser(state, userInfo){
    Common.saveUserInfo(userInfo.username, userInfo);
    for (let key in userInfo) {
      state.user[key] = userInfo[key];
    }
  },
  clearUser(state){
    Common.clearUserInfo();
    state.user = {};
  },
  setLocalUser(state){
    if(Common.isExistUser()){
      const userInfo = Common.getUserInfo();
      for (let key in userInfo) {
        state.user[key] = userInfo[key];
      }
    }
  }
}