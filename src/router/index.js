import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import couponCenter from '@/views/couponCenter/couponCenter'
import { parse } from 'semver'
Vue.use(Router)
export const constantRoutes =[
  {
    path: '/',
    redirect: '/couponCenter',
    hidden:true,
    index:'0',
    leaf:true,//单节点
    meta:{
      icon:'el-icon-bank-card',
      title:'车生活',
      requiresAuth:true
    }
  },
  {
    path: '/error',
    component: () => import('@/error'),
    hidden:true,
    index:'0',
    leaf:true,//单节点
    meta:{
      icon:'el-icon-bank-card',
      title:'错误页面'
    }
  },
  {
    path: '/testLogin',
    hidden:true,
    leaf:true,//单节点
    name:'/testLogin',
    meta:{
      title:'测试登录页'
    }
  },
  {
    path: '/couponCenter',
    component: () => import('@/views/couponCenter/couponCenter'),
    index:'1',
    name:'卡券中心',
    // leaf:true,
    redirect: '/couponList',
    meta:{
      icon:'el-icon-bank-card',
      title:'卡券中心',
      requiresAuth:true
    },
    children:[
      {
        path: '/couponList',
        component: () => import('@/views/couponCenter/couponList'),
        index:'1-1',
        name:'/couponList',
        meta:{
          title:'卡券列表',
          parent:'/couponCenter',
          requiresAuth:true
        },
        children:[
          {
            path: '/couponMsg',
            component: () => import('@/views/couponCenter/couponMsg'),
            index:'1-1-1',
            name:'/couponList',
            meta:{
              title:'卡券信息',
              parent:'/couponCenter',
              requiresAuth:true
            },
          },
          {
            path: '/createCoupon',
            component: () => import('@/views/couponCenter/createCoupon'),
            index:'1-1-1',
            name:'/couponList',
            meta:{
              title:'创建卡券',
              parent:'/couponCenter',
              requiresAuth:true
            },
          },
        ]
      },
      {
        path: '/couponListing',
        component: () => import('@/views/couponCenter/couponListing'),
        index:'1-2',
        name:'/couponListing',
        meta:{
          title:'卡券清单',
          parent:'/couponCenter',
          requiresAuth:true
        },
      },
    ]
  },
  {
    path: '/channelManagement',
    component: () => import('@/views/channelManagement/channelManagement'),
    index:'2',
    name:'/channelManagement',
    // leaf:true,
    meta:{
      icon:'el-icon-position',
      title:'渠道管理',
      requiresAuth:true
    },
    children:[
      {
        path: '/channelList',
        component: () => import('@/views/channelManagement/channelList'),
        index:'2-1',
        name:'/channelList',
        meta:{
          title:'渠道列表',
          parent:'/channelManagement',
          requiresAuth:true
        },
        children:[
          {
            path: '/createChannel',
            component: () => import('@/views/channelManagement/createChannel'),
            index:'2-1-1',
            name:'/channelList',
            meta:{
              title:'创建渠道',
              parent:'/channelManagement',
              requiresAuth:true
            },
          },
          {
            path: '/channelDetail',
            component: () => import('@/views/channelManagement/channelDetail'),
            index:'2-1-1',
            name:'/channelList',
            meta:{
              title:'渠道详情',
              parent:'/channelManagement',
              requiresAuth:true
            },
          },
        ]
      },
      
    ]
  },
  {
    path: '/couponAudit',
    component: () => import('@/views/couponAudit/couponAudit'),
    index:'3',
    name:'/couponAudit',
    // leaf:true,
    meta:{
      icon:'el-icon-edit',
      title:'卡券审核',
      requiresAuth:true
    },
    children:[
      {
        path: '/auditList',
        component: () => import('@/views/couponAudit/auditList'),
        index:'3-1',
        // hidden:JSON.parse(window.sessionStorage.getItem('user')).role=='10',//审核员不可见
        name:'/auditList',
        meta:{
          title:'审核列表',
          parent:'/couponAudit',
          requiresAuth:true
        },
      },
      {
        path: '/auditIng',
        component: () => import('@/views/couponAudit/auditIng'),
        index:'3-2',
        name:'/auditIng',
        meta:{
          title:'开始审核',
          parent:'/couponAudit',
          requiresAuth:true
        },
      },
    ]
  },
  {
    path: '/information',
    component: () => import('@/views/Information/information'),
    index:'4',
    name:'/information',
    meta:{
      icon:'el-icon-chat-dot-round',
      title:'信息反馈',
      requiresAuth:true
    },
    children:[
      {
        path: '/ownerInfo',
        component: () => import('@/views/Information/ownerInfo'),
        index:'4-1',
        name:'/ownerInfo',
        meta:{
          title:'车主反馈',
          parent:'/information',
          requiresAuth:true
        },
      },
      {
        path: '/storeInfo',
        component: () => import('@/views/Information/storeInfo'),
        index:'4-2',
        name:'/storeInfo',
        meta:{
          title:'商户反馈',
          parent:'/information',
          requiresAuth:true
        },
      },
    ]
  },
  {
    path: '/ownerManagement',
    component: () => import('@/views/ownerManagement/ownerManagement'),
    index:'5',
    name:'/ownerManagement',
    // leaf:true,
    meta:{
      icon:'el-icon-user',
      title:'车主管理',
      requiresAuth:true
    },
    children:[
      {
        path: '/carList',
        component: () => import('@/views/ownerManagement/carList'),
        index:'5-1',
        name:'/carList',
        leaf:true,
        meta:{
          icon:'el-icon-chat-dot-round',
          title:'车辆列表',
          parent:'/ownerManagement',
          requiresAuth:true
        }
      },
      {
        path: '/ownerList',
        component: () => import('@/views/ownerManagement/ownerList'),
        index:'5-2',
        name:'/ownerList',
        leaf:true,
        meta:{
          icon:'el-icon-chat-dot-round',
          title:'车主列表',
          parent:'/ownerManagement',
          requiresAuth:true
        }
      },
      {
        path: '/ownerAnalysis',
        component: () => import('@/views/ownerManagement/ownerAnalysis'),
        index:'5-3',
        name:'/ownerAnalysis',
        leaf:true,
        meta:{
          icon:'el-icon-chat-dot-round',
          title:'车主分析',
          parent:'/ownerManagement',
          requiresAuth:true
        },
      },
    ]
  },
  {
    path: '/businessManagement',
    component: () => import('@/views/businessManagement/businessManagement'),
    index:'6',
    name:'/businessManagement',
    // leaf:true,
    meta:{
      icon:'el-icon-house',
      title:'商户管理',
      requiresAuth:true
    },
    children:[
      {
        path: '/businessList',
        component: () => import('@/views/businessManagement/businessList'),
        index:'6-1',
        name:'/businessList',
        leaf:true,
        meta:{
          parent: '/businessManagement',
          icon:'el-icon-setting',
          title:'商户列表',
          requiresAuth:true
        },
        children:[
          {
            path: '/createBusiness',
            component: () => import('@/views/businessManagement/createBusiness'),
            index:'6-1-1',
            name:'/businessList',
            leaf:true,
            meta:{
              title:'创建商户',
              parent: '/businessManagement',
              requiresAuth:true
            }
          },
          {
            path: '/businessDetail',
            component: () => import('@/views/businessManagement/businessDetail'),
            index:'6-1-2',
            name:'/businessList',
            leaf:true,
            meta:{
              title:'商户详情',
              parent: '/businessManagement',
              requiresAuth:true
            }
          }
        ]
      },
    ]
  },
  {
    path: '/systemManagement',
    component: () => import('@/views/systemManagement/systemManagement'),
    index:'7',
    name:'/systemManagement',
    // leaf:true,
    meta:{
      icon:'el-icon-setting',
      title:'系统管理',
      requiresAuth:true
    },
    children:[
      {
        path: '/roleSetting',
        component: () => import('@/views/systemManagement/roleSetting'),
        index:'7-1',
        name:'/roleSetting',
        leaf:true,
        meta:{
          title:'角色配置',
          parent: '/systemManagement',
          requiresAuth:true
        }
      },
      {
        path: '/permissions',
        component: () => import('@/views/systemManagement/permissions'),
        index:'7-2',
        name:'/permissions',
        leaf:true,
        meta:{
          title:'权限配置',
          parent: '/systemManagement',
          requiresAuth:true
        }
      },
      {
        path: '/theLog',
        component: () => import('@/views/systemManagement/theLog'),
        index:'7-3',
        name:'/theLog',
        leaf:true,
        meta:{
          title:'操作日志',
          parent: '/systemManagement',
          requiresAuth:true
        }
      },
      {
        path: '/couponBg',
        component: () => import('@/views/systemManagement/couponBg'),
        index:'7-4',
        name:'/couponBg',
        leaf:true,
        meta:{
          title:'卡券背景设置',
          parent: '/systemManagement',
          requiresAuth:true
        }
      },
      {
        path: '/userSeting',
        component: () => import('@/views/systemManagement/userSeting'),
        index:'7-5',
        name:'/userSeting',
        leaf:true,
        meta:{
          title:'用户管理',
          parent: '/systemManagement',
          requiresAuth:true
        }
      },
    ]
  },
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//       document.title = to.meta.title
//   }
//   next()
// })
router.beforeEach((to, from, next) => {    
  if (to.meta.title) {
      document.title = to.meta.title
      next()
    }
  if(to.path === '/testLogin')  {
  var timer=null
  if(sessionStorage.getItem('uid')){
    timer=setInterval(()=>{
      next({ path: '/' })
    },10)
  }
  next()
  }  // 如果即将进入登录路由，则直接放行
  else {     //进入的不是登录路由
        if(to.meta.requiresAuth && !sessionStorage.getItem('uid')) {
        // console.log(router)
        router.options.routes.forEach(item=>{
          item.hidden=true
        })
        next({ path: '/error' })
      } 
      else { next() }}  //如果不需要登录验证，或者已经登录成功，则直接放行
  });

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
