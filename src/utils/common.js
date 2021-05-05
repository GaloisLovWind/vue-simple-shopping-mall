export default {
  setItem(key,item){
		let _item=typeof item == 'string'?item:JSON.stringify(item);
		return localStorage.setItem(key,_item);
	},
	getItem(key,type){
		let data = localStorage.getItem(key);
		try{
			data = JSON.parse(data);
			return data;
		} catch(ex){
			return data;
		}
	},
  userName:"user_name",
  userInfo: "user_info",
	saveUserInfo(username, userInfo){
		this.setItem(this.userName, username);
		this.setItem(this.userInfo, userInfo);
	},
	clearUserInfo(){
		this.setItem(this.userName, "");
		this.setItem(this.userInfo, "");
	},
	getUserInfo(){
		return this.getItem(this.userInfo);
	},
	getUserName(){
		return this.getItem(this.userName);
	},
	isExistUser(){
		return !!this.getItem(this.userName);
	}
}