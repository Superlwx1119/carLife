webpackJsonp([3],{"2YcK":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("bOdI"),i=a.n(s),n=(a("mtWM"),a("mw3O"),a("Alwf"),a("k2ma")),o=a.n(n),r=a("P9l9"),l={name:"createBusiness",data:function(){return i()({loading:!1,searchService:null,showResult:!1,center:{lng:0,lat:0},zoom:3,show:!1,add:{siteName:"",site:"",jd:"",wd:"",desce:"",type:"",jgName:"",jgNum:""},showMap:!1,fileList:[],keyword:"",location:"",contractData:{startTime:"",endTime:"",contacts:"",collStatus:"0",serviceStatus:"0",contractAnnex:[],annexId:[]},contractRules:{startTime:[{required:!0,message:"请选择开始时间",trigger:"change"}],endTime:[{required:!0,message:"请选择结束时间",trigger:"change"}],collStatus:[{required:!0,message:"请选择合作状态",trigger:"change"}],serviceStatus:[{required:!0,message:"请选择合作状态",trigger:"change"}]},businessData:{businessId:[],businnessName:"",channelLevel:"",loginNum:"",channelLevels:[],unifyCode:"",contacts:"",mobilePhone:"",coordinate:"",location:"",status:"启用",introduce:"",note:"",serverPhone:"",businessHours:[new Date(2020,1,1,0,0),new Date(2020,1,1,23,59,59)],imageArr:[],city:""},rules:{businnessName:[{min:3,max:25,message:"3个汉字≤名称≤25个汉字",trigger:"blur"},{required:!0,message:"请输入商户名称",trigger:"blur"}],mainBody:[{required:!0,message:"请输入主体名称",trigger:"blur"}],unifyCode:[{required:!0,message:"请输入代码",trigger:"blur"}],coordinate:[{required:!0,message:"请输入坐标",trigger:"blur"}],contacts:[{required:!0,message:"请输入联系人",trigger:"blur"}],mobilePhone:[{required:!0,message:"请输入绑定手机号",trigger:"blur"}],businessHours:[{required:!0,message:"请输入营业时间",trigger:"blur"}],serverPhone:[{required:!0,message:"请输入服务电话",trigger:"blur"}],location:[{required:!0,message:"请输入商户地址",trigger:"blur"}],imageArr:[{type:"array",required:!0,message:"请上传图片",trigger:"change"}]},dialogImageUrl:"",dialogVisible:!1,disabled:!1,mapLocation:{address:void 0,coordinate:void 0},uId:"",value:[],options:[],loadingMap:!1},"keyword","")},methods:{businessHours:function(e){console.log(e)},getResult:function(){var e=this;$("#infoDiv div").remove(),this.showResult=!0;var t=new qq.maps.Map(document.getElementById("container"),{center:new qq.maps.LatLng(39.916527,116.397128),zoom:12});this.searchService=new qq.maps.SearchService({panel:document.getElementById("infoDiv"),map:t,zoom:12});var a=document.getElementById("poiText").value,s=document.getElementById("regionText").value;this.searchService.setLocation(s),this.searchService.search(a),this.searchService.setComplete(function(t){var a=e;setTimeout(function(){t.detail.pois.forEach(function(e,t){var s=document.createElement("button");s.innerHTML="确定",s.className="optionBtn"+t,document.getElementById("infoDiv").children[0].children[1].children[t].children[1].appendChild(s),$(".optionBtn"+t).on("click",function(){a.businessData.coordinate=e.latLng.lat+","+e.latLng.lng,a.businessData.location=e.address})})},500)})},getClickInfo:function(e){this.center.lng=e.point.lng,this.center.lat=e.point.lat,this.businessData.coordinate=e.point.lat+","+e.point.lng},sreachPoint:function(e){var t=this,a=new BMap.Map("l-map"),s=this;a.centerAndZoom(new BMap.Point(112.939685,28.224946),12);var i=new BMap.LocalSearch(a,{renderOptions:{map:a,panel:"r-result"}});document.getElementById("r-result");i.search(this.keyword);var n=[];this.loadingMap=!0,i.setSearchCompleteCallback(function(e){setTimeout(function(){if(n=e.Br,t.loadingMap=!1,0!=n.length)for(var a=function(e){var t=document.createElement("button");t.innerHTML="确定",t.className="optionBtn"+e,document.getElementById("r-result").children[0].children[0].children[0].children[e].children[1].appendChild(t),$(".optionBtn"+e).on("click",function(){s.businessData.coordinate=n[e].point.lat+","+n[e].point.lng,s.businessData.location=n[e].address})},i=0;i<document.getElementById("r-result").children[0].children[0].children[0].children.length;i++)a(i)},600)})},handler:function(e){var t=e.BMap,a=e.map,s=this,i=void 0,n=void 0;(new t.Geolocation).getCurrentPosition(function(e){if(this.getStatus()==BMAP_STATUS_SUCCESS){var o=new t.Marker(e.point);a.addOverlay(o),a.panTo(e.point),n=e.point.lat,i=e.point.lng,s.loading=!1}else alert("failed"+this.getStatus())},{enableHighAccuracy:!0}),this.center.lng=i,this.center.lat=n,this.zoom=15},store:function(){var e=this,t=this.businessData.businessHours;if(t&&"string"!=typeof t[0]){var a=t[0].getHours()<10?"0"+t[0].getHours().toString():t[0].getHours().toString(),s=t[1].getHours()<10?"0"+t[1].getHours().toString():t[1].getHours().toString(),i=t[0].getMinutes()<10?"0"+t[0].getMinutes().toString():t[0].getMinutes().toString(),n=t[1].getMinutes()<10?"0"+t[1].getMinutes().toString():t[1].getMinutes().toString(),o=t[0].getSeconds()<10?"0"+t[0].getSeconds().toString():t[0].getSeconds().toString(),l=t[1].getSeconds()<10?"0"+t[1].getSeconds().toString():t[1].getSeconds().toString();t[0]=a+":"+i+":"+o,t[1]=s+":"+n+":"+l}var c={operateUser:this.contractData.contacts,uid:JSON.parse(window.sessionStorage.getItem("user")).uid,name:this.businessData.businnessName,companyName:this.businessData.mainBody,unifyCode:this.businessData.unifyCode,contacts:this.businessData.contacts,mobile:this.businessData.mobilePhone,coordinate:this.businessData.coordinate,location:this.businessData.location,phone:this.businessData.serverPhone,serviceSTime:t[0],serviceETime:t[1],phoneNum:this.businessData.loginNum,introduce:this.businessData.introduce,pictures:this.businessData.businessId.toString(),contractSTime:this.contractData.startTime,contractETime:this.contractData.endTime,serviceStatus:this.contractData.serviceStatus,collStatus:this.contractData.collStatus,contractAnnex:this.contractData.annexId.toString()};switch(this.businessData.city.length){case 1:c.province=this.businessData.city[0];break;case 2:c.province=this.businessData.city[0],c.city=this.businessData.city[1];break;case 3:c.province=this.businessData.city[0],c.city=this.businessData.city[1],c.area=this.businessData.city[2]}var u=!1;this.$refs.businessForm.$children.forEach(function(t,a){if(t.isRequired&&""==t.fieldValue)throw e.$message.error(t.label+"不能为空!"),u=!0,new Error("表单验证错误")}),u||(this.$refs.contractForm.$children.forEach(function(t,a){if(t.isRequired&&""==t.fieldValue)throw e.$message.error(t.label+"不能为空!"),u=!0,new Error("表单验证错误")}),u||(this.loading=!0,Object(r.w)(c).then(function(t){e.loading=!1,1==t.data.code?(e.$notify({title:"成功",message:t.data.msg,type:"success"}),e.$router.push("/businessList")):e.$notify.error({title:"错误",message:t.data.msg})})))},businessSubmitUpload:function(){var e=this;this.loading=!0;var t=new FormData;this.businessData.imageArr.forEach(function(a){if(a.size>=104857600)throw e.$message.error("文件过大!"),e.loading=!1,new Error("文件过大!重新上传!");t.append("files",a.raw)}),this.businessData.businessId=[],Object(r.C)(t).then(function(t){e.loading=!1,1==t.data.code?(t.data.body.forEach(function(t){e.businessData.businessId.push(t.id)}),e.$notify({title:"成功",message:t.data.msg,type:"success"})):e.$notify.error({title:"错误",message:t.data.msg})})},annexSubmitUpload:function(){var e=this;this.loading=!0;var t=new FormData;this.contractData.contractAnnex.forEach(function(a){if(a.size>=104857600)throw e.$message.error("文件过大!"),e.loading=!1,new Error("文件过大!重新上传!");t.append("files",a.raw)}),this.contractData.annexId=[],Object(r.C)(t).then(function(t){e.loading=!1,1==t.data.code?(t.data.body.forEach(function(t){e.contractData.annexId.push(t.id)}),e.$notify({title:"成功",message:t.data.msg,type:"success"})):e.$notify.error({title:"错误",message:t.data.msg})})},handlePreview:function(e,t){this.contractData.contractAnnex=t},handleRemove:function(e,t){this.contractData.contractAnnex=t},handleRemoveBusiness:function(e){var t=null;this.businessData.imageArr.forEach(function(a,s){a===e&&(t=s)}),this.businessData.imageArr.splice(t,1),this.businessData.businessId.splice(t,1)},handlePreviewBusiness:function(e,t){this.businessData.imageArr=t},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0}},mounted:function(){this.options=o.a}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"createBusiness"},[a("el-row",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"flex"}},[a("el-col",{attrs:{span:12}},[a("p",{staticClass:"msg"},[e._v("商户信息")]),e._v(" "),a("el-form",{ref:"businessForm",attrs:{id:"test",rules:e.rules,model:e.businessData,"status-icon":"","label-width":"120px"}},[a("el-form-item",{attrs:{label:"商户名称",prop:"businnessName"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.businnessName,callback:function(t){e.$set(e.businessData,"businnessName",t)},expression:"businessData.businnessName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主体名称",prop:"mainBody"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.mainBody,callback:function(t){e.$set(e.businessData,"mainBody",t)},expression:"businessData.mainBody"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"统一社会信用代码",prop:"unifyCode"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.unifyCode,callback:function(t){e.$set(e.businessData,"unifyCode",t)},expression:"businessData.unifyCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户联系人",prop:"contacts"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.contacts,callback:function(t){e.$set(e.businessData,"contacts",t)},expression:"businessData.contacts"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"绑定手机号",prop:"mobilePhone"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.mobilePhone,callback:function(t){e.$set(e.businessData,"mobilePhone",t)},expression:"businessData.mobilePhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户坐标",prop:"coordinate"}},[a("el-popover",{attrs:{placement:"top",width:"600",trigger:"click"}},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.sreachPoint},slot:"append"})],1),e._v(" "),a("baidu-map",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingMap,expression:"loadingMap"}],staticStyle:{height:"3rem !important"},attrs:{id:"l-map",center:e.center,zoom:e.zoom,"scroll-wheel-zoom":!0},on:{ready:e.handler,click:e.getClickInfo}},[a("bm-navigation",{attrs:{anchor:"BMAP_ANCHOR_TOP_LEFT"}}),e._v(" "),a("bm-map-type",{attrs:{"map-types":["BMAP_NORMAL_MAP","BMAP_HYBRID_MAP"],anchor:"BMAP_ANCHOR_TOP_RIGHT"}}),e._v(" "),a("bm-geolocation",{attrs:{anchor:"BMAP_ANCHOR_BOTTOM_RIGHT",showAddressBar:!0,autoLocation:!0}})],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingMap,expression:"loadingMap"}],staticStyle:{"max-height":"30vh",overflow:"auto"},attrs:{id:"r-result"}}),e._v(" "),a("el-input",{attrs:{slot:"reference",readonly:"",type:"text"},slot:"reference",model:{value:e.businessData.coordinate,callback:function(t){e.$set(e.businessData,"coordinate",t)},expression:"businessData.coordinate"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商户地址",prop:"location"}},[a("el-cascader",{staticStyle:{width:"100% !important"},attrs:{options:e.options,clearable:"",props:{expandTrigger:"hover",checkStrictly:!0}},model:{value:e.businessData.city,callback:function(t){e.$set(e.businessData,"city",t)},expression:"businessData.city"}}),e._v(" "),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.businessData.location,callback:function(t){e.$set(e.businessData,"location",t)},expression:"businessData.location"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务电话",prop:"serverPhone"}},[a("el-input",{attrs:{type:"text",clearable:""},model:{value:e.businessData.serverPhone,callback:function(t){e.$set(e.businessData,"serverPhone",t)},expression:"businessData.serverPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营业时间",prop:"businessHours"}},[a("el-time-picker",{attrs:{"is-range":"",clearable:"","range-separator":"至","value-format":"HH:mm:ss","default-time":["08:00:00","19:00:00"],"start-placeholder":"开始时间","end-placeholder":"结束时间",placeholder:"选择时间范围"},on:{change:e.businessHours},model:{value:e.businessData.businessHours,callback:function(t){e.$set(e.businessData,"businessHours",t)},expression:"businessData.businessHours"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户图片",prop:"imageArr"}},[a("el-upload",{attrs:{action:"#",multiple:"","list-type":"picture-card","file-list":e.businessData.imageArr,"on-change":e.handlePreviewBusiness,"auto-upload":!1},scopedSlots:e._u([{key:"file",fn:function(t){var s=t.file;return a("div",{},[a("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:s.url,alt:""}}),e._v(" "),a("span",{staticClass:"el-upload-list__item-actions"},[a("span",{staticClass:"el-upload-list__item-preview",on:{click:function(t){return e.handlePictureCardPreview(s)}}},[a("i",{staticClass:"el-icon-zoom-in"})]),e._v(" "),e.disabled?e._e():a("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemoveBusiness(s)}}},[a("i",{staticClass:"el-icon-delete"})])])])}}])},[a("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),e._v(" "),a("el-button",{attrs:{size:"small",type:"success"},on:{click:e.businessSubmitUpload}},[e._v("上传到服务器")]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),a("el-form-item",{attrs:{label:"商户介绍",prop:"introduce"}},[a("el-input",{attrs:{type:"textarea",rows:5},model:{value:e.businessData.introduce,callback:function(t){e.$set(e.businessData,"introduce",t)},expression:"businessData.introduce"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"可支持同时登录个数",prop:"loginNum"}},[a("el-input",{attrs:{type:"text"},model:{value:e.businessData.loginNum,callback:function(t){e.$set(e.businessData,"loginNum",t)},expression:"businessData.loginNum"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("p",{staticClass:"msg"},[e._v("合同信息")]),e._v(" "),a("el-form",{ref:"contractForm",attrs:{model:e.contractData,rules:e.contractRules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"合同开始时间",prop:"startTime"}},[a("el-date-picker",{attrs:{clearable:"",type:"date","value-format":"yyyyMMddHHmmss",placeholder:"选择日期"},model:{value:e.contractData.startTime,callback:function(t){e.$set(e.contractData,"startTime",t)},expression:"contractData.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"合同结束时间",prop:"endTime"}},[a("el-date-picker",{attrs:{clearable:"","value-format":"yyyyMMddHHmmss",type:"date",placeholder:"选择日期"},model:{value:e.contractData.endTime,callback:function(t){e.$set(e.contractData,"endTime",t)},expression:"contractData.endTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"合同附件",prop:"contractAnnex"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"#","on-change":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.contractData.contractAnnex,"auto-upload":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"success"},on:{click:e.annexSubmitUpload}},[e._v("上传到服务器")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"合作状态",prop:"collStatus"}},[a("el-radio",{attrs:{label:"0"},model:{value:e.contractData.collStatus,callback:function(t){e.$set(e.contractData,"collStatus",t)},expression:"contractData.collStatus"}},[e._v("合作")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.contractData.collStatus,callback:function(t){e.$set(e.contractData,"collStatus",t)},expression:"contractData.collStatus"}},[e._v("终止")])],1),e._v(" "),a("el-form-item",{attrs:{label:"营业状态",prop:"serviceStatus"}},[a("el-radio",{attrs:{label:"0"},model:{value:e.contractData.serviceStatus,callback:function(t){e.$set(e.contractData,"serviceStatus",t)},expression:"contractData.serviceStatus"}},[e._v("营业")]),e._v(" "),a("el-radio",{attrs:{label:"1"},model:{value:e.contractData.serviceStatus,callback:function(t){e.$set(e.contractData,"serviceStatus",t)},expression:"contractData.serviceStatus"}},[e._v("歇业")])],1),e._v(" "),a("el-form-item",{attrs:{label:"我司联络人",prop:"introduce"}},[a("el-input",{attrs:{type:"text",clearable:"",rows:5},model:{value:e.contractData.contacts,callback:function(t){e.$set(e.contractData,"contacts",t)},expression:"contractData.contacts"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"primary"},on:{click:e.store}},[e._v("创建")])],1),e._v(" "),a("div",{staticStyle:{height:".8rem"}})],1)},staticRenderFns:[]};var u=a("VU/8")(l,c,!1,function(e){a("nzFs")},"data-v-4530cef9",null);t.default=u.exports},Alwf:function(e,t,a){"use strict";var s=a("//Fk");a.n(s)},nzFs:function(e,t){}});
//# sourceMappingURL=3.58a88f4c7e11d2a5f1bf.js.map