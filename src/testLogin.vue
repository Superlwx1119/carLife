<template>
  <div>
      <el-input type="text" v-model="userid"></el-input>
      <el-button>登录</el-button>
  </div>
</template>

<script>
import { testLogin } from '@/api/api.js'
export default {
    name:'testLogin',
    data(){
        return{
            userid:''
        }
    },
    methods:{
        testLogin(){
            testLogin({uid:this.userid}).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>