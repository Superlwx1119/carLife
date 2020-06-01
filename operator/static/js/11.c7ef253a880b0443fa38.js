webpackJsonp([11],{XFaS:function(e,t){},lXEp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("P9l9"),o={name:"createChannel",data:function(){return{formData:{contractAnnex:[],annexId:[],ownContact:"",channelName:"",channelLevel:"",channelLevels:[{label:"一级",value:1},{label:"二级",value:2}],address:"",contacter:"",phone:"",email:"",inviteCode:"",status:"0",introduce:"",note:"",endTime:"",startTime:""},rules:{channelName:[{min:3,max:25,message:"3个汉字≤名称≤25个汉字",trigger:"blur"},{required:!0,message:"请输入卡券名称",trigger:"blur"}],startTime:[{required:!0,message:"请选择开始时间",trigger:"change"}],endTime:[{required:!0,message:"请选择结束时间",trigger:"change"}],channelLevel:[{required:!0,message:"请选择渠道级别",trigger:"change"}],address:[{required:!0,message:"请输入渠道地址",trigger:"blur"}],contacter:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{validator:function(e,t,a){return t?/^1[3456789]\d{9}$/.test(t)?void a():(a(new Error("手机号码有误")),!1):a(new Error("手机号码不能为空"))},required:!0,trigger:"blur"}],status:[{required:!0,message:"请选择账号状态",trigger:"change"}]}}},methods:{annexSubmitUpload:function(){var e=this;this.loading=!0;var t=new FormData;this.formData.contractAnnex.forEach(function(a){if(a.size>=104857600)throw e.$message.error("文件过大!"),e.loading=!1,new Error("文件过大!重新上传!");t.append("files",a.raw)}),this.formData.annexId=[],Object(r.C)(t).then(function(t){e.loading=!1,1==t.data.code?(t.data.body.forEach(function(t){e.formData.annexId.push(t.id)}),e.$notify({title:"成功",message:t.data.msg,type:"success"})):e.$notify.error({title:"错误",message:t.data.msg})})},handlePreview:function(e,t){this.formData.contractAnnex=t},handleRemove:function(e,t){this.formData.contractAnnex=t},channel:function(){var e=this,t={chName:this.formData.channelName,chLevel:this.formData.channelLevel,chAddress:this.formData.address,chContacts:this.formData.contacter,chPhone:this.formData.phone,chEmail:this.formData.email,inviteCode:this.formData.inviteCode,chState:this.formData.status,operateUser:this.formData.ownContact,contractStaTime:this.formData.startTime,contractEndTime:this.formData.endTime,contractAnnex:this.formData.annexId.toString(),chIntroduce:this.formData.introduce,chRemarks:this.formData.note,uid:JSON.parse(window.sessionStorage.getItem("user")).uid};this.$refs.formData.$children.forEach(function(t,a){if(t.isRequired&&""==t.fieldValue)throw e.$message.error(t.label+"不能为空!"),finish=!0,new Error("表单验证错误")}),Object(r.j)(t,!0).then(function(t){1==t.data.code?(e.$notify({title:"成功",message:t.data.msg,type:"success"}),e.$router.push("/channelList")):e.$notify.error({title:"错误",message:t.data.msg})})}},mounted:function(){}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"createChannel"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",{attrs:{span:12}},[a("el-form",{ref:"formData",attrs:{rules:e.rules,model:e.formData,"status-icon":"","label-width":"120px"}},[a("el-form-item",{attrs:{label:"渠道名称",prop:"channelName"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.channelName,callback:function(t){e.$set(e.formData,"channelName",t)},expression:"formData.channelName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道级别",prop:"channelLevel"}},[a("el-select",{model:{value:e.formData.channelLevel,callback:function(t){e.$set(e.formData,"channelLevel",t)},expression:"formData.channelLevel"}},e._l(e.formData.channelLevels,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道地址",prop:"address"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.address,callback:function(t){e.$set(e.formData,"address",t)},expression:"formData.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道联系人",prop:"contacter"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.contacter,callback:function(t){e.$set(e.formData,"contacter",t)},expression:"formData.contacter"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"绑定手机号",prop:"phone"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.phone,callback:function(t){e.$set(e.formData,"phone",t)},expression:"formData.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"绑定邮箱",prop:"email"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"合同开始时间",prop:"startTime"}},[a("el-date-picker",{attrs:{clearable:"",type:"date","value-format":"yyyyMMddHHmmss",placeholder:"选择日期"},model:{value:e.formData.startTime,callback:function(t){e.$set(e.formData,"startTime",t)},expression:"formData.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"合同结束时间",prop:"endTime"}},[a("el-date-picker",{attrs:{clearable:"",type:"date","value-format":"yyyyMMddHHmmss",placeholder:"选择日期"},model:{value:e.formData.endTime,callback:function(t){e.$set(e.formData,"endTime",t)},expression:"formData.endTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"合同附件",prop:"contractAnnex"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"#","on-change":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.formData.contractAnnex,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.annexSubmitUpload}},[e._v("上传到服务器")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"帐号状态",prop:"status"}},[a("el-radio",{attrs:{label:"0"},model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}},[e._v("启用")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.formData.status,callback:function(t){e.$set(e.formData,"status",t)},expression:"formData.status"}},[e._v("禁止")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form",{attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"渠道介绍"}},[a("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.formData.introduce,callback:function(t){e.$set(e.formData,"introduce",t)},expression:"formData.introduce"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"我司联络人",prop:"ownContact"}},[a("el-input",{attrs:{type:"text"},model:{value:e.formData.ownContact,callback:function(t){e.$set(e.formData,"ownContact",t)},expression:"formData.ownContact"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道备注"}},[a("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.formData.note,callback:function(t){e.$set(e.formData,"note",t)},expression:"formData.note"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"btn"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.channel}},[e._v("创建")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.$router.push("/channelList")}}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var l=a("VU/8")(o,n,!1,function(e){a("XFaS")},"data-v-7f99b9c5",null);t.default=l.exports}});
//# sourceMappingURL=11.c7ef253a880b0443fa38.js.map