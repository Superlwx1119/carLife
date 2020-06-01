<template>
  <div class="app">
    
    
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{

    }
  },
  methods:{
    handleOpen(){

    },
    handleClose(){

    }
  },
  mounted(){

  }
};
</script>

<style lang="less">
  .app{
    .el-submenu .el-menu-item{
      min-width: 0 !important;
    }
    .header{
      height: .8rem;
      div{
        display: flex;
        align-content: center;
        line-height: .8rem;
      }
      .logo{
        height: .5rem;
        width: 1.3rem;
      }
      .user{
        font-size: .24rem;
        img{
          width: .5rem;
          height: .5rem;
        }
      }
    }
  }
</style>