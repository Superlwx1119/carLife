<template>
  <div class="createBusiness" >
      <el-row type="flex" v-loading="loading">
          <el-col :span="12" class="">
                <p class="msg">商户信息</p>
                <el-form ref="businessForm" id="test" :rules="rules" :model="businessData" status-icon label-width="120px">
                    <el-form-item label="商户名称" prop="businnessName">
                        <el-input type="text" clearable v-model="businessData.businnessName"></el-input>
                    </el-form-item>
                    <el-form-item label="主体名称" prop="mainBody">
                        <el-input type="text" clearable v-model="businessData.mainBody"></el-input>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码" prop="unifyCode">
                        <el-input type="text" clearable v-model="businessData.unifyCode"></el-input>
                    </el-form-item>
                    <el-form-item label="商户联系人" prop="contacts">
                        <el-input type="text" clearable v-model="businessData.contacts"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机号" prop="mobilePhone">
                        <el-input type="text" clearable v-model="businessData.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="商户坐标" prop="coordinate">
                        <el-popover
                        placement="top"
                        width="600"
                        
                        trigger="click">
                            <el-input placeholder="请输入内容" clearable v-model="keyword" class="input-with-select">
                                <el-button slot="append" @click="sreachPoint" icon="el-icon-search"></el-button>
                            </el-input>
                            <!-- <div>区域 <input type='text' value='' id="regionText"/>
                                地点 <input type='text' value="" id="poiText"/>
                                <input type="button" value="搜索" @click="sreachPoint"/>
                                <div id="pageIndexLabel" style="width: 100px;"></div> -->
                            <baidu-map v-loading="loadingMap" id="l-map" :center="center" :zoom="zoom" @ready="handler" style="height: 3rem !important;" @click="getClickInfo" :scroll-wheel-zoom='true'>
                                <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
                                <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
                                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                            </baidu-map>
                            <!-- <div id="l-map"></div> -->
                            <div id="r-result" v-loading="loadingMap" style="max-height:30vh;overflow:auto"></div>
                            <!-- <div>区域 <input type='text' value='' id="regionText"/>
                                地点 <input type='text' value="" id="poiText"/>
                                <input type="button" value="搜索" @click="getResult"/>
                                <div id="pageIndexLabel" style="width: 100px;"></div>
                            </div>
                            <div id="container"></div>
                            <div :style="{width:' 100%', height:showResult?'3rem':'0',overflow:'auto'}" ref="infoDiv" id="infoDiv"></div> -->
                            <el-input slot="reference" readonly type="text" v-model="businessData.coordinate"></el-input>
                        </el-popover>
                        
                    </el-form-item>
                    <el-form-item label="商户地址" prop="location">
                        <el-cascader
                            v-model="businessData.city"
                            style="width:100% !important"
                            :options="options"
                            clearable
                            :props="{ expandTrigger: 'hover', checkStrictly: true  }">
                            </el-cascader>
                        <el-input placeholder="请输入内容" v-model="businessData.location" class="input-with-select">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="服务电话" prop="serverPhone">
                        <el-input type="text" clearable v-model="businessData.serverPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="businessHours">
                        <el-time-picker
                            is-range
                            clearable
                            @change="businessHours"
                            v-model="businessData.businessHours"
                            range-separator="至"
                            value-format="HH:mm:ss"
                            :default-time="['08:00:00', '19:00:00']"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                        
                    </el-form-item>
                    <el-form-item label="商户图片" prop="imageArr">
                        <el-upload
                            action="#"
                            multiple
                            list-type="picture-card"
                            :file-list="businessData.imageArr"
                            :on-change="handlePreviewBusiness"
                            :auto-upload="false">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
                                >
                                <span class="el-upload-list__item-actions">
                                    <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                    >
                                    <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemoveBusiness(file)"
                                    >
                                    <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                                </div>
                            </el-upload>
                            <el-button size="small" type="success" @click="businessSubmitUpload">上传到服务器</el-button>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                    </el-form-item>
                    <el-form-item label="商户介绍" prop="introduce">
                        <el-input type="textarea" :rows="5" v-model="businessData.introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="可支持同时登录个数" prop="loginNum">
                        <el-input type="text" v-model="businessData.loginNum"></el-input>
                    </el-form-item>
                </el-form>
          </el-col>
          <el-col :span="12">
              <p class="msg">合同信息</p>
              <el-form ref="contractForm" :model="contractData" :rules="contractRules" label-width="120px">
                  <el-form-item label="合同开始时间" prop="startTime">
                      <el-date-picker
                        clearable
                        v-model="contractData.startTime"
                        type="date"
                        value-format="yyyyMMddHHmmss"
                        placeholder="选择日期">
                        </el-date-picker>
                  </el-form-item>
                  <el-form-item label="合同结束时间" prop="endTime">
                        <el-date-picker
                        clearable
                        v-model="contractData.endTime"
                        value-format="yyyyMMddHHmmss"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                  </el-form-item>
                  <el-form-item label="合同附件" prop="contractAnnex">
                        <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="#"
                        :on-change="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="contractData.contractAnnex"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="annexSubmitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="合作状态" prop="collStatus">
                        <el-radio v-model="contractData.collStatus" label="0">合作</el-radio>
                        <el-radio v-model="contractData.collStatus" label="1">终止</el-radio>
                  </el-form-item>
                  <el-form-item label="营业状态" prop="serviceStatus">
                        <el-radio v-model="contractData.serviceStatus" label="0">营业</el-radio>
                        <el-radio v-model="contractData.serviceStatus" label="1">歇业</el-radio>
                  </el-form-item>
                  <el-form-item label="我司联络人" prop="introduce">
                        <el-input type="text" clearable :rows="5" v-model="contractData.contacts"></el-input>
                  </el-form-item>
              </el-form>
          </el-col>
      </el-row>
      <div class="btn"><el-button type="primary" @click="store">创建</el-button></div>
      <div style="height:.8rem"></div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { TMap } from '@/api/maps.js'
import city from '@/assets/pca-code.json'
import { store , uploadFiles } from '@/api/api.js'
export default {
    name:'createBusiness',
    data(){
        return{
            loading:false,
            searchService:null,
            showResult:false,
            center: {lng:0, lat: 0},
            zoom: 3,
            show: false,
            add:{
                siteName:'',
                site:'',
                jd:'',
                wd:'',
                desce:'',
                type:'',
                jgName:'',
                jgNum:'',
            },
            showMap:false,
            fileList:[],
            keyword: '',
            location: '',
            contractData:{
                startTime:'',
                endTime:'',
                contacts:'',
                collStatus:'0',
                serviceStatus:'0',
                contractAnnex:[],
                annexId:[]
            },
            contractRules:{
                startTime: [
                    {required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                endTime: [
                    {required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                collStatus: [
                    { required: true, message: '请选择合作状态', trigger: 'change' }
                ],
                serviceStatus: [
                    { required: true, message: '请选择合作状态', trigger: 'change' }
                ],
            },
            businessData:{
                //18673493475
                businessId:[],
                businnessName:'',
                channelLevel:'',
                loginNum:'',
                channelLevels:[],
                unifyCode:'',
                contacts:'',
                mobilePhone:'',
                coordinate:'',
                location:'',
                status:'启用',
                introduce:'',
                note:'',
                serverPhone:'',
                businessHours:[new Date(2020, 1, 1, 0, 0), new Date(2020, 1, 1, 23, 59, 59)],
                imageArr:[],
                city:''
            },
            rules:{
                businnessName: [
                    { min: 3 ,max: 25, message: '3个汉字≤名称≤25个汉字', trigger: 'blur' },
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                ],
                mainBody: [
                    { required: true, message: '请输入主体名称', trigger: 'blur' }
                ],
                unifyCode: [
                    { required: true, message: '请输入代码', trigger: 'blur' }
                ],
                coordinate: [
                    { required: true, message: '请输入坐标', trigger: 'blur' }
                ],
                contacts: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                mobilePhone: [
                    { required: true, message: '请输入绑定手机号', trigger: 'blur' }
                ],
                businessHours: [
                    { required: true, message: '请输入营业时间', trigger: 'blur' }
                ],
                serverPhone: [
                    { required: true, message: '请输入服务电话', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请输入商户地址', trigger: 'blur' }
                ],
                imageArr: [
                    { type:'array', required: true, message: '请上传图片', trigger: 'change' }
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            mapLocation: {
                address: undefined,
                coordinate: undefined
            },
            uId:'',
            value: [],
            options: [],
            loadingMap:false,
            keyword:'',
        }
    },
    methods:{
        businessHours(val){
            console.log(val)
        },
        getResult(){
            $("#infoDiv div").remove();
            this.showResult=true
            var map = new qq.maps.Map(document.getElementById("container"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(39.916527, 116.397128),
                zoom: 12
            });

            this.searchService = new qq.maps.SearchService({
                panel:document.getElementById('infoDiv'),
                map : map,
                zoom: 12
            });
            var poiText = document.getElementById("poiText").value;
            var regionText = document.getElementById("regionText").value;
            this.searchService.setLocation(regionText);
            this.searchService.search(poiText);
            this.searchService.setComplete((res)=>{
                let that=this
                setTimeout(()=>{
                    res.detail.pois.forEach((item,index)=>{
                        let el=document.createElement('button');
                        el.innerHTML='确定'
                        el.className='optionBtn'+index
                        document.getElementById('infoDiv').children[0].children[1].children[index].children[1].appendChild(el)
                        // qq.maps.event.addListener(document.getElementById('infoDiv').children[0].children[1].children[index], 'click', function() {
                        //     that.businessData.coordinate=item.latLng.lat+','+item.latLng.lng
                        // });
                        $('.optionBtn'+index).on('click',()=>{
                            that.businessData.coordinate=item.latLng.lat+','+item.latLng.lng
                            that.businessData.location=item.address
                        })
                    })
                    
                },500)
                
            })
            
        },
        getClickInfo (e) {
            this.center.lng = e.point.lng
            this.center.lat = e.point.lat
            this.businessData.coordinate=e.point.lat+','+e.point.lng
        },
        sreachPoint(str){
            var map = new BMap.Map("l-map");            // 创建Map实例
            let that=this
            map.centerAndZoom(new BMap.Point(112.939685, 28.224946), 12);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {map: map, panel: "r-result"}
            });
            let result=document.getElementById('r-result')
            local.search(this.keyword);
            let arr=[]
            this.loadingMap=true
            local.setSearchCompleteCallback(results=>{
                setTimeout(()=>{
                    arr=results.Br
                    this.loadingMap=false
                    if(arr.length==0)return
                    for(let i=0;i<document.getElementById('r-result').children[0].children[0].children[0].children.length;i++){
                        let el=document.createElement('button');
                        el.innerHTML='确定'
                        el.className='optionBtn'+i
                        document.getElementById('r-result').children[0].children[0].children[0].children[i].children[1].appendChild(el)
                        $('.optionBtn'+i).on('click',()=>{
                            that.businessData.coordinate=arr[i].point.lat+','+arr[i].point.lng
                            that.businessData.location=arr[i].address
                        })
                    }
                },600)
            })
        },
        handler ({BMap, map}) {
            let that=this
            let lng
            let lat
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                lat=r.point.lat;
                lng=r.point.lng;
                that.loading=false
                // alert('您的位置：'+r.point.lng+','+r.point.lat);
            }
            else {
                alert('failed'+this.getStatus());
            }        
            },{enableHighAccuracy: true})
            this.center.lng = lng
            this.center.lat = lat
            this.zoom = 15
        },
        store(){//创建商户
            let businessHours=this.businessData.businessHours
            if(businessHours){
                if(typeof businessHours[0]!='string'){
                    let h1=businessHours[0].getHours()<10?'0'+businessHours[0].getHours().toString():businessHours[0].getHours().toString()
                    let h2=businessHours[1].getHours()<10?'0'+businessHours[1].getHours().toString():businessHours[1].getHours().toString()
                    let m1=businessHours[0].getMinutes()<10?'0'+businessHours[0].getMinutes().toString():businessHours[0].getMinutes().toString()
                    let m2=businessHours[1].getMinutes()<10?'0'+businessHours[1].getMinutes().toString():businessHours[1].getMinutes().toString()
                    let s1=businessHours[0].getSeconds()<10?'0'+businessHours[0].getSeconds().toString():businessHours[0].getSeconds().toString()
                    let s2=businessHours[1].getSeconds()<10?'0'+businessHours[1].getSeconds().toString():businessHours[1].getSeconds().toString()
                    businessHours[0]=h1+':'+m1+':'+s1
                    businessHours[1]=h2+':'+m2+':'+s2
                }
            }
            let data={
                operateUser:this.contractData.contacts,
                uid:JSON.parse(window.sessionStorage.getItem('user')).uid,
                name:this.businessData.businnessName,
                companyName:this.businessData.mainBody,
                unifyCode:this.businessData.unifyCode,
                contacts:this.businessData.contacts,
                mobile:this.businessData.mobilePhone,
                coordinate:this.businessData.coordinate,
                location:this.businessData.location,
                phone:this.businessData.serverPhone,
                serviceSTime:businessHours[0],
                serviceETime:businessHours[1],
                phoneNum:this.businessData.loginNum,
                introduce:this.businessData.introduce,
                pictures:this.businessData.businessId.toString(),
                contractSTime:this.contractData.startTime,
                contractETime:this.contractData.endTime,
                serviceStatus:this.contractData.serviceStatus,
                collStatus:this.contractData.collStatus,
                contractAnnex:this.contractData.annexId.toString()
            }
            switch (this.businessData.city.length){
                case 1:data.province=this.businessData.city[0];
                break;
                case 2:
                    data.province=this.businessData.city[0];
                    data.city=this.businessData.city[1];
                break;
                case 3:
                    data.province=this.businessData.city[0];
                    data.city=this.businessData.city[1];
                    data.area=this.businessData.city[2];
                break;
            }
            let finish=false
            this.$refs.businessForm.$children.forEach((item,index)=>{
                if(item.isRequired&&item.fieldValue==''){
                    this.$message.error(item.label+'不能为空!');
                    finish=true;
                    throw new Error('表单验证错误')
                }
            })
            if(finish)return
            this.$refs.contractForm.$children.forEach((item,index)=>{
            if(item.isRequired&&item.fieldValue==''){
                    this.$message.error(item.label+'不能为空!');
                    finish=true;
                    throw new Error('表单验证错误')
                }
            })
            if(finish)return
            this.loading=true
            store(data).then(res=>{
                this.loading=false
                if(res.data.code==1){
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.$router.push('/businessList')
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        },
        businessSubmitUpload(){//上传图片
            this.loading=true
            let formData=new FormData()
            this.businessData.imageArr.forEach(item=>{
                if(item.size>=104857600){
                    this.$message.error('文件过大!')
                    this.loading=false
                    throw new Error('文件过大!重新上传!')
                }
                formData.append('files',item.raw)
            })
            this.businessData.businessId=[]

            uploadFiles(formData).then(res=>{
                this.loading=false
                if(res.data.code==1){
                    
                    res.data.body.forEach(item=>{
                        this.businessData.businessId.push(item.id)
                    })
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        },
        annexSubmitUpload(){//上传附件
            this.loading=true
            let formData=new FormData()
            this.contractData.contractAnnex.forEach(item=>{
                if(item.size>=104857600){
                    this.$message.error('文件过大!')
                    this.loading=false
                    throw new Error('文件过大!重新上传!')
                }
                formData.append('files',item.raw)
            })
            this.contractData.annexId=[]
            uploadFiles(formData).then(res=>{
                this.loading=false
                if(res.data.code==1){
                    res.data.body.forEach(item=>{
                        this.contractData.annexId.push(item.id)
                    })
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        },
        handlePreview(file,fileList) {
            
            this.contractData.contractAnnex=fileList
        },
        handleRemove(file,fileList) {
            this.contractData.contractAnnex=fileList
        },
        handleRemoveBusiness(file){
            let s=null
            this.businessData.imageArr.forEach((item,index)=>{
                if(item===file){
                    s=index
                }
            })
            this.businessData.imageArr.splice(s,1)
            this.businessData.businessId.splice(s,1)
        },
        handlePreviewBusiness(file, fileList){
            
            this.businessData.imageArr=fileList
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    },
    mounted(){
        this.options=city
        // this.uId=JSON.parse(window.sessionStorage.getItem('user')).uid
        // TMap('UW4BZ-2TR6I-HVJGC-5QVBO-JDL6H-E3FB2').then(qq => {
        //     var center = new qq.maps.LatLng(39.916527,116.397128);
        //     let map = new qq.maps.Map(document.getElementById('container'),{
        //         center: new qq.maps.LatLng(39.916527,116.397128),
        //         zoom: 13
        //     });
        //     //获取城市列表接口设置中心点
        //     let citylocation = new qq.maps.CityService({
        //         complete : function(result){
        //             map.setCenter(result.detail.latLng);
        //         }
        //     });
        //     //调用searchLocalCity();方法    根据用户IP查询城市信息。
        //     citylocation.searchLocalCity();
        //     qq.maps.event.addListener(map, 'click', (event)=>{
        //         var latLng = event.latLng,
        //             lat = latLng.getLat().toFixed(5),
        //             lng = latLng.getLng().toFixed(5);
        //         // alert(lat+','+lng);
        //         this.businessData.coordinate=lat+','+lng
        //     });
            
        // });
    }
}
</script>

<style lang="less" scoped>
    .createBusiness{
        background: white;
        padding: .1rem;
        margin-top: .1rem;
        height: 89vh;
        overflow:auto;
        .btn{
            font-size: .16rem;
            text-align: center;
        }
        .msg{
            font-size: .16rem;
            margin: .1rem;
        }
        .bm-view{
            height: 3rem !important;
        }
        
    }
    #container{
            height: 3rem !important;
        }
</style>