<template>
  <div id="app">
      <div class="app" v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)">
        <el-row type="flex">
          <el-col :span="3" class="leftMenu">
            <div class="logo">
              <img  src="./assets/images/gxcf.png" >
            </div>
            <el-menu
              router
              :default-openeds="activeArr"
              unique-opened
              :default-active="defalutActive"
              class="el-menu-vertical-demo menuUl"
              @open="handleOpen"
              @close="handleClose"
              background-color="#00172E"
              text-color="#909399"
              active-text-color="#FFFFFF"
            >
              <template v-for="(item,index) of $router.options.routes" :index="index">
                <el-submenu  :index="item.path" v-if="!item.leaf&&!item.hidden">
                  <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span>{{item.meta.title}}</span>
                  </template>
                  <el-menu-item v-for="(child,indexC) of item.children" :key='indexC' v-if="!child.hidden" :index="child.path">{{child.meta.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-if="item.leaf&&!item.hidden" :index="item.path" :key="item.path"  >
                  <i :class="item.meta.icon"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
              </template>

              <!-- <el-submenu  :index="item.path" v-if="item.children" v-for="(item,index) of $router.options.routes" :key="index">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{item.meta.title}}</span>
                </template>
                <el-menu-item v-for="(child,indexC) of item" :key='indexC'  :index="child.path">{{child.meta}}</el-menu-item>
              </el-submenu> -->
              <!-- <el-menu-item v-if="!item.hidden" :index="item.path" v-for="(item,index) of $router.options.routes" :key="index"  >{{item.meta.title}}</el-menu-item> -->
            </el-menu>
          </el-col>
          <el-col :span="21" class="rightView">
            <div class="user">
              <p>车生活运营系统</p>
              <p>
                <img src="./assets/images/touxiang.png" >
                <span>{{uName}}</span>
              </p>
            </div>
            <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
              <!-- <el-breadcrumb-item >车生活</el-breadcrumb-item> -->
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="contentView">
              <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
            
          </el-col>
        </el-row>
        
        
      </div>
  </div>
</template>

<script>
(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    // $('.qrCode').css('font-size','100px')
                    docEl.style.fontSize = '100px';
                }else{
                    // $('.qrCode').css('font-size',100 * (clientWidth / 375) + 'px')
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };
  
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
import { testLogin } from '@/api/api.js'
export default {
  name: 'App',
  data(){
    return{
      loading:false,
      defalutActive:'',
      activeArr:['/couponCenter'],
      uName:'admin'
    }
  },
  methods:{
    handleOpen(){
      
    },
    handleClose(){

    },
    getUser(){
      if(!window.sessionStorage.getItem('user')){
        this.$router.options.routes.forEach(item=>{
          item.hidden=true
        })
        return
      }
      let role=JSON.parse(window.sessionStorage.getItem('user')).role
      
      this.$router.options.routes.forEach((item, index) => {
        //0  /
        //1  /error
        //2  /testLogin
        //3  /couponCenter
        //4  /channelManagement
        //5  /couponAudit
        //6  /information
        //7  /ownerManagement
        //8  /businessManagement
        //9  /systemManagement
        switch (role){
          case '0':{
            sessionStorage.removeItem('userid')
            sessionStorage.removeItem('user')
            this.$router.push('/error')
          };//游客
          break;
          case '10':{//审核员
                if(index==5){
                  // item.children[0].hidden=true
                }
          }
          break;
          case '20':{};
          break;
          case '30':{};
          break;
          default:{}

        }
      });
    },
    getTestUser(){//测试登录
      this.loading=true
      this.$prompt('请输入用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          testLogin({uid:value}).then(res=>{
              this.$message({
                type: 'success',
                message: '你的用户是: ' + value
              });
              if(res.data.code==1){
                this.loading=false
                this.$store.dispatch('getUser',res.data.body)
                window.sessionStorage.setItem('uid',res.data.body.uid)
                this.$router.push('/couponCenter')
                setTimeout(()=>{
                  this.$router.go(0)
                  // window.location.href='../static/login.html'
                },100)
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.msg
                });
                this.getTestUser()
              }
          }).catch(()=>{
            this.getTestUser()
          })
        })
    }
  },
  watch:{
    $route(to,from){
      this.activeArr=[]
      this.defalutActive=to.name
      this.activeArr.push(to.meta.parent)
      if(to.name=='/testLogin'){
        this.getTestUser()
      }
    }
  },  
  mounted(){
    this.getUser()
    if(window.location.hash.substring(1,window.location.hash.length)=='/testLogin'){
      this.getTestUser()
    }
    this.defalutActive=window.location.hash.substring(1,window.location.hash.length)=='/'?'/couponList':window.location.hash.substring(1,window.location.hash.length)
    this.activeArr.push(this.defalutActive)
    this.uName=JSON.parse(window.sessionStorage.getItem('user')).userName
  }
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .el-menu-vertical-demo{
    height: 100vh;
  }
  .leftMenu{
    height: 100vh;
    overflow-y: hidden;
  }
  // .el-table{
  //   font-size: .14rem !important;
  // }
  // .el-table__footer-wrapper, .el-table__header-wrapper{
  //   font-size: .14rem !important;
  // }
  // .el-table th, .el-table tr, .el-table td{
  //   font-size: .14rem !important;
  // }
  // .el-table td, .el-table th.is-leaf{
  //   font-size: .14rem !important;
  // }
  .el-menu-item:hover{
    color: white !important;
  }
  .bm-view{
      height: 4rem !important;
  }
  .el-message{
      font-size: .16rem !important;
    }
  .app{
    
    .el-form-item__error{
      padding-top: 0 !important;
    }
    .menuUl .el-submenu .el-menu-item{
      text-indent: .12rem !important;
    }
    .el-form-item{
      margin-bottom: .12rem !important;
    }
    .el-dialog__header{
      font-size: .16rem !important;
    }
    .cell{
      font-size: .14rem !important;
    }
    .menuUl{
      .el-submenu .el-menu-item{
        min-width: 0 !important;
      }
      .is-active{
        background: #1890FF !important;
      }
    }
    .logo{
      background: #00385C;
      height: .7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        // height: .4rem;
        width: 1.4rem;
      }
      
    }
    .rightView{
      height: 100vh;
      overflow-y: hidden;
      .contentView{
        background: #EDF2F5;
        
      }
      .bread{
        margin: .1rem
      }
      .user{
        font-size: .24rem;
        height: .7rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .2rem;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
        margin-bottom: .1rem;
        img{
          width: .5rem;
          height: .5rem;
        }
        p{
          font-size:.32rem;
          font-family:Source Han Sans CN;
          font-weight:550;
          display: flex;
          align-items: center;
        }
        span{
          display: block;
          padding: 0 .1rem;
          cursor: pointer;
          font-size:.2rem;
          font-family:Helvetica;
          font-weight:400;
        }
      }
    }
    
    .couponMsg{
        .el-tabs__header{
            height: .4rem !important;
            margin: 0 !important;
        }
        .el-select{
          width: 100% !important;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100% !important;
        }
        .el-transfer-panel__list.is-filterable{
          .el-checkbox, .el-checkbox__input{
            display: block !important;
          }
        }
    }
    .createCoupon{
      .el-transfer-panel__list.is-filterable{
          .el-checkbox, .el-checkbox__input{
            display: block !important;
          }
        }
      .el-select{
        width: 100% !important;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100% !important;
        }
    }
    .createChannel{
      .el-select{
        width: 100% !important;
      }
    }
    .createChannel{
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100% !important;
        }
    }
    .channelDetail{
        font-size: .16rem !important;
        .el-select{
          width: 100% !important;
        }
        .el-tabs__header{
            height: .4rem !important;
            margin: 0 !important;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100% !important;
        }
    }
    .createBusiness{
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100% !important;
        }
        .el-select{
          width: 100% !important;
        }
    }
    .businessDetail{
      font-size: .16rem !important;
        .el-tabs__header{
            height: .4rem !important;
            margin: 0 !important;
        }
    }
    .couponAudit{
        font-size: .16rem !important;
        .el-tabs__header{
            height: .4rem !important;
            margin: 0 !important;
        }
    }
    .timeCom{
        .radio{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 999;
        }
    }
  }
</style>
