webpackJsonp([27],{"85CY":function(e,a){},pkkd:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("bOdI"),r=t.n(n),i=t("0w2Z"),c=t("P9l9"),o={name:"auditIng",filters:{time:function(e){return Object(i.b)(e)},date:function(e){return Object(i.c)(e)},status:function(e){switch(e){case"1":return"未使用";case"2":return"已使用";case"3":return"已过期";case"4":return"已失效";default:return""}},examineStatus:function(e){switch(e){case"0":return"未审核";case"1":return"通过";case"2":return"不通过";default:return"暂无"}},empty:function(e){return""==e?"暂无":e}},computed:{rows:function(){var e=[];return this.cardConsume.provePicture.forEach(function(a,t){var n=Math.floor(t/4);e[n]||(e[n]=[]),e[n].push(a)}),e}},data:function(){return{cardRecord:{cardCode:"---",sendTime:"---",cardStatus:"---",scanNum:"---",couponData:[],cardExplain:"",userExplain:"",merchantExplain:""},cardConsume:{provePicture:[],userData:[]},evaluate:{evaluate:"",insTime:"",userId:""},cardExamine:{examineOpinion:"",examineStatus:"",examineTime:"",examineUserName:""},loading:!1,webLoading:!1,bigPic:!1,bigUrl:"",loadingImage:!1}},methods:{showBigPic:function(e){var a=this;this.bigPic=!0,this.loadingImage=!0;var t="";this.bigUrl="",Object(c.s)({fi:e}).then(function(e){t="data:image/png;base64,"+btoa(new Uint8Array(e.data).reduce(function(e,a){return e+String.fromCharCode(a)},"")),a.loadingImage=!1,a.bigUrl=t})},doOpinion:function(e,a){var t=this,n={cid:this.cardRecord.cardCode,examineStatus:e,examineOpinion:a};Object(c.p)(n).then(function(e){1==e.data.code?(t.$notify({title:"成功",message:e.data.msg,type:"success"}),t.examineDetails()):t.$notify.error({title:"错误",message:e.data.msg})})},examineOpinion:function(e){var a=this;"no"==e?this.$prompt("请输入理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var t=e.value;a.doOpinion("2",t)}).catch(function(){}):this.$confirm("确认同意","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.doOpinion("1","同意")}).catch(function(){})},examineDetails:function(){var e=this;this.webLoading=!0,Object(c.o)({uid:JSON.parse(window.sessionStorage.getItem("user")).uid}).then(function(a){if(e.webLoading=!1,!$.isEmptyObject(a.data.body)&&a.data.body){if(a.data.body.cardConsume){e.cardConsume=a.data.body.cardConsume,e.cardConsume.userData=[],e.cardConsume.provePicture=a.data.body.cardConsume.provePicture.split(",");var t={ownerName:a.data.body.cardConsume.ownerName,ownerPhone:a.data.body.cardConsume.ownerPhone,licenseno:a.data.body.cardConsume.licenseno,consumeTime:a.data.body.cardConsume.consumeTime,storeName:a.data.body.cardConsume.storeName,storePrices:a.data.body.cardConsume.storePrices};e.cardConsume.userData.push(t)}if(a.data.body.cardExamine&&(e.cardExamine=a.data.body.cardExamine),a.data.body.cardRecord){var n;e.cardRecord=a.data.body.cardRecord;var i=(n={cardName:a.data.body.cardRecord.cardName,cardExpTime:a.data.body.cardRecord.cardExpTime,cardStaTime:a.data.body.cardRecord.cardStaTime,channelName:a.data.body.cardRecord.channelName,channelPrices:a.data.body.cardRecord.channelPrices,cardPrice:a.data.body.cardRecord.cardPrice,needProveNum:a.data.body.cardRecord.needProveNum},r()(n,"cardPrice",a.data.body.cardRecord.cardPrice),r()(n,"cardExplain",a.data.body.cardRecord.cardExplain),r()(n,"userExplain",a.data.body.cardRecord.userExplain),r()(n,"merchantExplain",a.data.body.cardRecord.merchantExplain),n);e.cardRecord.couponData=[],e.cardRecord.couponData.push(i)}a.data.body.evaluate&&(e.evaluate=a.data.body.evaluate)}else e.loading=!0})}},mounted:function(){this.examineDetails()}},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.webLoading,expression:"webLoading"}],staticClass:"detail"},[t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"detailContent",attrs:{"element-loading-text":"暂无卡券可审核","element-loading-spinner":"el-icon-warning","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[t("div",{staticClass:"downCon"},[t("p",[e._v("卡券信息")]),e._v(" "),t("div",{staticClass:"detailMsg"},[t("p",[t("span",[e._v("卡券编号:")]),t("b",[e._v(e._s(e._f("empty")(e.cardRecord.cardCode)))])]),e._v(" "),t("p",[t("span",[e._v("创建时间:")]),t("b",[e._v(e._s(e._f("empty")(e._f("time")(e.cardRecord.sendTime))))])]),e._v(" "),t("p",[t("span",[e._v("卡券状态:")]),t("b",[e._v(e._s(e._f("status")(e.cardRecord.cardStatus)))])]),e._v(" "),t("p",[t("span",[e._v("扫码次数:")]),t("b",[e._v(e._s(e._f("empty")(e.cardRecord.scanNum))+"次")])])]),e._v(" "),t("el-table",{staticClass:"table",staticStyle:{width:"95%"},attrs:{border:"",size:"small",data:e.cardRecord.couponData}},[t("el-table-column",{attrs:{prop:"cardName",align:"center",label:"卡券名称"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cardStaTime","min-width":"110px",align:"center",label:"有效时间"},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[t("span",[e._v(e._s(e._f("date")(n.cardStaTime)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"cardExpTime","min-width":"110px",align:"center",label:"过期时间"},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[t("span",[e._v(e._s(e._f("date")(n.cardExpTime)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"channelName",align:"center",label:"分发渠道"}}),e._v(" "),t("el-table-column",{attrs:{prop:"channelPrices",align:"center",label:"渠道价格"}}),e._v(" "),t("el-table-column",{attrs:{prop:"cardPrice",align:"center",label:"终端价格"}}),e._v(" "),t("el-table-column",{attrs:{prop:"needProveNum",align:"center",label:"所需佐证数"}})],1),e._v(" "),t("div",{staticClass:"note"},[t("p",[e._v("卡券说明: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.cardExplain)))])]),e._v(" "),t("p",[e._v("车主说明: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.userExplain)))])]),e._v(" "),t("p",[e._v("商户说明: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.merchantExplain)))])])]),e._v(" "),t("p",[e._v("发送信息")]),e._v(" "),t("div",{staticClass:"send"},[t("p",[e._v("发送人: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.ownerName)))])]),e._v(" "),t("p",[e._v("手机号: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.ownerPhone)))])]),e._v(" "),t("p",[e._v("车牌号: "),t("span",[e._v(e._s(e._f("empty")(e.cardRecord.licenseno)))])])]),e._v(" "),t("p",[e._v("使用信息")]),e._v(" "),t("el-table",{staticClass:"table",staticStyle:{width:"95%"},attrs:{border:"",size:"small",data:e.cardConsume.userData}},[t("el-table-column",{attrs:{prop:"ownerName",align:"center",label:"使用人"}}),e._v(" "),t("el-table-column",{attrs:{prop:"ownerPhone",align:"center",label:"手机号码"}}),e._v(" "),t("el-table-column",{attrs:{prop:"licenseno",align:"center",label:"车牌号码"}}),e._v(" "),t("el-table-column",{attrs:{prop:"storePrices",align:"center",label:"合作价格"}}),e._v(" "),t("el-table-column",{attrs:{prop:"consumeTime",align:"center","min-width":"110px",label:"使用时间"},scopedSlots:e._u([{key:"default",fn:function(a){var n=a.row;return[t("span",[e._v(e._s(e._f("time")(n.consumeTime)))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"storeName",align:"center",label:"扫码商户"}})],1),e._v(" "),t("p",[e._v("佐证信息")]),e._v(" "),t("div",{staticClass:"edvince"},[0==e.rows.length?t("p",{staticStyle:{"font-size":".16rem","text-indent":"2em","font-weight":"normal"}},[e._v("暂无佐证")]):e._l(e.rows,function(a,n){return t("el-row",{key:n,attrs:{type:"flex"}},e._l(a,function(a){return t("el-col",{key:a,attrs:{span:8}},[t("div",{staticStyle:{display:"flex","justify-content":"center","align-item":"center"}},[t("img",{staticStyle:{width:"2rem"},attrs:{src:"http://sapp.csgxcf.com:2800/seeRecrop?fi="+a+"&sc=0&w=300&h=300"},on:{click:function(t){return e.showBigPic(a)}}})])])}),1)})],2),e._v(" "),t("p",[e._v("评价信息")]),e._v(" "),t("div",{staticClass:"evaluation"},[e._v("\n                  "+e._s(e._f("empty")(e.evaluate.evaluate))+"\n                  "),t("div",{staticClass:"evaluationFoot"},[t("span",[e._v("评价人: "),t("span",[e._v(e._s(e._f("empty")(e.evaluate.ownerName)))])]),e._v(" "),t("span",[e._v("评价时间: "),t("span",[e._v(e._s(e._f("empty")(e._f("time")(e.evaluate.insTime))))])])])]),e._v(" "),t("p",[e._v("审核信息")]),e._v(" "),t("div",{staticClass:"audit"},[t("p",[e._v("审核人:   "),t("span",[e._v(" "+e._s(e._f("empty")(e.cardExamine.examineUserName)))])]),e._v(" "),t("p",[e._v("审核时间:   "),t("span",[e._v(e._s(e._f("empty")(e.cardExamine.examineTime)))])]),e._v(" "),t("p",[e._v("审核结果:   "),t("span",[e._v(e._s(e._f("empty")(e.cardExamine.examineOpinion))+"( "+e._s(e._f("examineStatus")(e.cardExamine.examineStatus))+")")])])]),e._v(" "),t("div",{staticClass:"btn"},[t("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){return e.examineOpinion("pass")}}},[e._v("通过")]),e._v(" "),t("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.examineOpinion("no")}}},[e._v("拒绝")])],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"查看佐证",visible:e.bigPic,width:"50%"},on:{"update:visible":function(a){e.bigPic=a}}},[t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingImage,expression:"loadingImage"}],staticStyle:{display:"flex","justify-content":"center","align-item":"center"}},[t("img",{staticStyle:{"max-width":"5rem"},attrs:{src:e.bigUrl,alt:""}})])])],1)])},staticRenderFns:[]};var d=t("VU/8")(o,s,!1,function(e){t("85CY")},"data-v-1171e670",null);a.default=d.exports}});
//# sourceMappingURL=27.a42896dbc2679e35803a.js.map