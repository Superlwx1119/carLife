import axios from 'axios'
import qs from 'qs'
import Vue from 'vue';
import { Message , MessageBox } from 'element-ui';
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox.alert;
let baseUrl=""
if(process.env.NODE_ENV=='development'){
  baseUrl='http://192.168.103.125:8070/platformsys'
}else{
  baseUrl='https://boot.csgxcf.com/operator' 
}
export const BaseUrl = baseUrl


const request = axios.create({
    baseURL: baseUrl, // api 的 base_url
    timeout: 20000 // request timeout
})


request.interceptors.response.use(res =>{
  //对响应数据做些事
    // console.log(res)
    
   if(res.data.code==2){
    // Vue.prototype.$message.error(res.data.msg);
    MessageBox.alert(res.data.msg, '提示', {
      confirmButtonText: '确定',
      showClose:false,
      closeOnClickModal:false,
      closeOnPressEscape:false,
      distinguishCancelAndClose:true,
      callback: () => {
        if(process.env.NODE_ENV=='development'){
          window.location.href='https://sso.csgxcf.com:8043/passport/login?appid=456'
        }else{
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('uid')
          window.location.href='https://sso.csgxcf.com:8043/passport/login?appid=765'
        }
      }
    })
   }else if(res.data.code==-1){
    Vue.prototype.$message.error(res.data.msg);
   }
   return res
}, error => {
   if(error.toString().indexOf('timeout')>0){
      Vue.prototype.$message.error('请求超时!');
   }
   // 返回 response 里的错误信息
   return Promise.reject(error.response.data)
})

request.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // if(config.method=='post'){ 
  //     config.data = { 
  //         ...config.data, 
  //         _t: Date.parse(new Date())/1000, 
  //     } 
  // }else if(config.method=='get'){ 
  //     config.params = { 
  //         _t: Date.parse(new Date())/1000, 
  //         ...config.params 
  //     } 
  // }
  return config;
}, function (error) {
  // 对请求失败做处理
  // console.log(error)
  return Promise.reject(error);
});

export function testLogin(data){
    return request({
      url: 'testLogin',
      method: 'post',
      data: qs.stringify(data),
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}         

export function carInfos(data){//获取车辆列表
  return request({
    url: 'carInfos',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function getLoginStatistics(data){//登录公众号人数
  return request({
    url: 'getLoginStatistics',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function getExpireDateStatistics(data){//商业险即将到期人数
  return request({
    url: 'getExpireDateStatistics',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function carUser(data){//获取车主列表
  return request({
    url: 'carUser',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function carAnalysisAllTable(data){//获取车主分析数据
  return request({
    url: 'carAnalysisAllTable',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function examine(data){//获取车主卡券详情
  return request({
    url: 'examine',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function operateLogger(data){//获取操作日志
  return request({
    url: 'operateLogger',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function examineDetails(data){//获取车主卡券详情
  return request({
    url: 'examineDetails',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function examineOpinion(data){//获取车主卡券详情
  return request({
    url: 'examineOpinion',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'application/json'}
  })
}

export function carUserCards(data){//获取车主卡券详情
  return request({
    url: 'carUserCards',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function channelRelation(data,type){
  if(type){
    return request({//新增修改渠道
      url: 'channelRelation',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }else{
    return request({//获取渠道列表
      url: 'channelRelation',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }
}


export function delChannel(data){//删除渠道
  return request({
    url: 'delChannel',
    method: 'post',
    data: qs.stringify(data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function channel(data,type){
  if(type){
    return request({//新增修改渠道
      url: 'channel',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }else{
    return request({//获取渠道列表
      url: 'channel',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }
}

export function channelCard(data,type){
  if(type){
    return request({//获取渠道关联卡券信息
      url: 'channelCard',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }else{
    return request({//保存渠道卡券设置
      url: 'channelCard',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }
}

export function storeCard(data,type){
  if(type){
    return request({//获取商户关联卡券信息
      url: 'storeCard',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }else{
    return request({//保存商户卡券设置
      url: 'storeCard',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }
}


export function operateUser(data,type){
  if(type){
    return request({//获取平台用户信息
      url: 'operateUser',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }else{
    return request({//保存平台用户信息
      url: 'operateUser',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }
}

export function cardChannel(data){//卡券渠道合作价格
  return request({
    url: 'cardChannel',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/json'},
  })
}

export function cardStore(data){//卡券商户合作价格
  return request({
    url: 'cardStore',
    method: 'get',
    params: data,
    headers: {'Content-Type': 'application/json'},
  })
}

export function uploadFiles(data){//上传文件
  return request({
    url: 'uploadFiles',
    method: 'post',
    data: data,
    headers:{'Content-Type':'multipart/form-data'},
  })
}

export function getFiles(data){//图片接口
  return request({
    url: 'https://sapp.csgxcf.com:2843/seeObject?fi='+data,
    method: 'get',
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function getImages(data){//图片接口
  return request({
    url: 'https://sapp.csgxcf.com:2843/seeRecrop',
    method: 'get',
    params:data,
    responseType: "arraybuffer",
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function getDicts(data){//字典
  return request({
    url: 'getDicts',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function cardRecord(data){//卡券清单
  return request({
    url: 'cardRecord',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function cardDetails(data){//卡券清单
  return request({
    url: 'cardDetails',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function storeConsumeRecord(data){//商户服务记录
  return request({
    url: 'storeConsumeRecord',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function storeEvaluate(data){//商户服务评价
  return request({
    url: 'storeEvaluate',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}

export function delStore(data){//删除商户
  return request({
    url: 'delStore',
    method: 'post',
    data: qs.stringify(data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}

export function store(data,type){
  if(!type){
    return request({// 新增/修改商户
      url: 'store',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }else{//列表
    return request({
      url: 'store',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }
}

export function cardClass(data,type){
  if(type=='edit'){// 新增/修改卡券
    return request({
      url: 'card',
      method: 'post',
      data: data,
      headers: {'Content-Type': 'application/json'}
    })
  }else if(type=='show'){//列表
    return request({
      url: 'card',
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }else{//详情
    return request({
      url: 'card/'+data.id,
      method: 'get',
      params: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }
}

export function suggestion(data){//信息反馈
  return request({
    url: 'suggestion',
    method: 'get',
    params:data
    // headers:{'Content-Type':'multipart/form-data'},
  })
}