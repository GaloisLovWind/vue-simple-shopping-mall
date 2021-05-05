<template>
  <div>
    <login-form  v-if="isLogin" @login="loginSuccess"/>
    <register-form v-else @register="registerSuccess" @message="recieveMessage"/>
  </div>
</template>

<script>
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default {
  name: "LoginContent",
  props:["isLogin"],
  data(){
    return {
      userLogin:{},
      userRegister:{},
    }
  },
  methods: {
    registerSuccess(userData){
      this.userRegister = userData;
      this.$emit("register", userData);
    },
    loginSuccess(userData){
      this.userLogin = userData;
      this.$emit("login", userData);
    },
    recieveMessage(data){
      this.$emit("message", data);
    }
  },  
  components:{
    LoginForm,
    RegisterForm
  }
}
</script>