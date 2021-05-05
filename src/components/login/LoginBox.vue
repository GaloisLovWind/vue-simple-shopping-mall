<template>
  <div class="ui-login">
    <div class="ui-login-box">
       <div :style="lgContent" >
          <slot name="close" />
          <slot name="content" />
       </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginBox",
  props: {
    boxWidth:{
      type: Number,
      default: 300
    }
  },
  data(){
    return {
      lgContent: {
        width: this.boxWidth + "px"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lg-content{
	width:300px;
}
</style>