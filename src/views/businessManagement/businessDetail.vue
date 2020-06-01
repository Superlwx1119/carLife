<template>
  <div class="businessDetail" >
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card" v-loading="loading">
        <el-tab-pane label="基本信息" name="first" >
            <div class="baseMsg">
                <el-row type="flex">
                    <el-col :span="12" class="">
                            <p class="msg">商户信息</p>
                            <el-form ref="businessForm" :rules="rules" :model="businessData" status-icon label-width="120px">
                                <el-form-item label="商户名称" prop="businnessName">
                                    <el-input type="text" v-model="businessData.businnessName"></el-input>
                                </el-form-item>
                                <el-form-item label="主体名称" prop="mainBody">
                                    <el-input type="text" v-model="businessData.mainBody"></el-input>
                                </el-form-item>
                                <el-form-item label="统一社会信用代码" prop="unifyCode">
                                    <el-input type="text" v-model="businessData.unifyCode"></el-input>
                                </el-form-item>
                                <el-form-item label="商户联系人" prop="contacts">
                                    <el-input type="text" v-model="businessData.contacts"></el-input>
                                </el-form-item>
                                <el-form-item label="绑定手机号" prop="mobilePhone">
                                    <el-input type="text" v-model="businessData.mobilePhone"></el-input>
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
                                    <el-input type="text" v-model="businessData.serverPhone"></el-input>
                                </el-form-item>
                                <el-form-item label="营业时间" prop="businessHours">
                                    <el-time-picker
                                        is-range
                                        @change="businessHours"
                                        v-model="businessData.businessHours"
                                        range-separator="至"
                                        value-format="HH:mm:ss"
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
                                    v-model="contractData.startTime"
                                    type="date"
                                    value-format="yyyyMMddHHmmss"
                                    placeholder="选择日期">
                                    </el-date-picker>
                            </el-form-item>
                            <el-form-item label="合同结束时间" prop="endTime">
                                    <el-date-picker
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
                                    <a style="margin-left: 10px;" :href="'https://sapp.csgxcf.com:2843/seeObject?fi='+contractData.annexId" target="_blank"><el-button slot="trigger" size="small" type="primary">下载文件</el-button></a>
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
                                    <el-input type="text" :rows="5" v-model="contractData.contacts"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <div class="btn">
                    <el-button type="primary" size="small" @click="store(true)">保存</el-button>
                    <!-- <el-button  size="small">取消</el-button> -->
                </div>
            </div>
            
        </el-tab-pane>
        <el-tab-pane label="支持卡券" name="second">
            <div class="baseMsg">
                <el-table
                :data="sportData"
                border
                max-height="5.6rem"
                style="width: 80%;margin:.1rem auto;">
                <el-table-column
                  prop="cardTypeName"
                  align="center"
                  label="卡劵类型">
                    <template slot-scope="{row}">
                        <p>{{row.cardTypeName}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="cardName"
                  align="center"
                  label="卡劵名称">
                </el-table-column>
                <el-table-column align="center" label="商户合作价格" prop="storePrices">
                  <template slot-scope="{row}">
                    <template v-if="row.editPrice">
                      <el-input v-model="row.storePrices" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ row.storePrices }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="可派发卡券数量" prop="maxNum">
                  <template slot-scope="{row}">
                    <template v-if="row.editMax">
                      <el-input v-model.number="row.maxNum" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ row.maxNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="是否支持" prop="maxNum">
                  <template slot-scope="{row}">
                    <el-switch v-model="row.supStatus" :disabled="!row.supEdit"></el-switch>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="{row}">
                    <div v-if="row.edit">
                      <el-button
                        type="success"
                        size="small"
                        @click="confirmEdit(row)"
                      >
                        确定
                      </el-button>
                      <el-button
                        class="cancel-btn"
                        size="small"
                        type="warning"
                        @click="cancelEdit(row)"
                      >
                        取消
                      </el-button>
                    </div>
                    <el-button
                      v-else
                      type="primary"
                      size="small"
                      @click="editRow(row)"
                    >
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="服务记录" name="third">
            <div class="baseMsg">
                <el-form :inline="true">
                    <el-form-item label="关键字" >
                        <el-input type="text" size="small" placeholder="卡券编号/名称" v-model="sport.keyword"></el-input>
                    </el-form-item>
                    <el-form-item label="服务客户">
                        <el-input type="text" size="small" placeholder="姓名或手机号" v-model="sport.owner"></el-input>
                    </el-form-item>
                    <el-form-item><el-button type="primary" size="small" @click="storeConsumeRecord">查询</el-button></el-form-item>
                </el-form>
                <el-table
                    border
                    :data="recordData"
                    height="6.6rem"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="ownerName"
                        label="服务客户">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="ownerPhone"
                        label="客户手机号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="cardName"
                        label="使用卡券名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="cardCode"
                        label="卡券编号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="storePrices"
                        label="合作价格">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="consumeTime"
                        label="服务时间">
                        <template slot-scope="{row}">
                            <p>{{row.consumeTime|time}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="provePicture"
                        label="佐证">
                        <template slot-scope="{row}">
                            <el-button type="text" @click="showProvePicture(row.provePicture)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="status"
                        label="审核结果">
                        <template slot-scope="{row}">
                            <p>{{row.status|examineStatus}}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                style="float:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20 ,100, 200, 300, 400]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="服务评价" name="fourth">
            <div class="baseMsg">
                <el-form :inline="true">
                    <el-form-item label="关键字" >
                        <el-input type="text" size="small" placeholder="卡券编号/名称" v-model="comment.keyword"></el-input>
                    </el-form-item>
                    <el-form-item label="服务客户">
                        <el-input type="text" size="small" placeholder="姓名或手机号" v-model="comment.owner"></el-input>
                    </el-form-item>
                    <el-form-item><el-button type="primary" size="small" @click="storeEvaluate">查询</el-button></el-form-item>
                </el-form>
                <el-table
                    border
                    :data="commentData"
                    height="6.6rem"
                    style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="ownerName"
                        label="服务车主">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="ownerPhone"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="licenseno"
                        label="车牌">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="cardName"
                        label="使用卡券">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="grade"
                        label="评分">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="evaluate"
                        show-overflow-tooltip
                        label="评价内容">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="insTime"
                        min-width="110px"
                        label="评价时间">
                        <template slot-scope="{row}">
                            <p>{{row.insTime|time}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="evaluateStatus"
                        label="评价状态">
                    </el-table-column>
                </el-table>
                <el-pagination
                style="float:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20 ,100, 200, 300, 400]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-dialog
    title="佐证"
    :visible.sync="dialogProve"
    width="50%">
    <el-carousel :loop="false" height="4rem" indicator-position="none">
        <el-carousel-item  v-for="(item,index) in proveImages" :key="index">
            <div style="display:flex;justify-content:center;align-item:center">
                <img style="width:3rem;heigh:auto" :src="'https://sapp.csgxcf.com:2843/seeRecrop?fi='+item" >
            </div>
        </el-carousel-item>
    </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import { store,uploadFiles,getFiles,cardClass,storeCard,getDicts,storeConsumeRecord,storeEvaluate,getImages } from '@/api/api.js'
import { formattingTime,formattingDate  } from '@/api/public.js'
import { TMap } from '@/api/maps.js'
import axios from 'axios'
import city from '@/assets/pca-code.json'
export default {
    name:'businessDetail',
    filters:{
      time(val){
        return formattingTime(val)
      },
      examineStatus(val){
        switch (val){
            case '0':
                return '未审核'
                break;
            case '1':
                return '通过'
                break;
            case '2':
                return '不通过'
                break;
            default : return ''
        }
    },
    },
    data(){
        return{
            center: {lng: 0, lat: 0},
            zoom: 13,
            dialogProve:false,
            options:[],
            sportData:[],
            recordData:[],
            commentData:[],
            keyword:'',
            comment:{
                keyword:'',
                customer:'',
            },
            sport:{
                keyword:'',
                owner:'',
            },
            activeName:'first',
            fileList:[],
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
                hezuoStatus: [
                    { required: true, message: '请选择合作状态', trigger: 'change' }
                ],
                yingyeStatus: [
                    { required: true, message: '请选择合作状态', trigger: 'change' }
                ],
            },
            businessData:{
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
                businessHours:[],
                imageArr:[],
                city:[]
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
            showResult:false,
            couponTypes:[],
            page:1,
            pageSize:20,
            total:0,
            proveImages:[],
            loadingMap:false,
            loading:false,
        }
    },
    methods:{
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
        getClickInfo (e) {
            this.center.lng = e.point.lng
            this.center.lat = e.point.lat
            this.businessData.coordinate=e.point.lat+','+e.point.lng
        },
        storeEvaluate(){//服务评价
            let data={
                keyWord:this.comment.keyword,
                owner:this.comment.owner,
                page:this.page-1,
                pageSize:this.pageSize,
                storeId:this.getQueryVariable('id')
            }
            storeEvaluate(data).then(res=>{
                if(res.data.code==1){
                    this.commentData=res.data.body.data
                    this.total=res.data.body.count
                }
                
            })
        },
        showProvePicture(ids){//查看佐证
            if(ids.indexOf(',')){
                ids.split(',').forEach(item=>{
                    this.proveImages.push(item)
                })
            }else{
                this.proveImages.push(ids)
            }
            if(this.proveImages.length==0){
                this.$message.error('暂无佐证!')
                return
            }
            this.dialogProve=true
        },
        handleSizeChange(val) {//每页
            this.pageSize=val
            if(this.activeName=='third'){
                this.storeConsumeRecord()
            }else if(this.activeName=='fourth'){
                this.storeEvaluate()
            }
        },
        handleCurrentChange(val) {//翻页
            this.page=val
            if(this.activeName=='third'){
                this.storeConsumeRecord()
            }else if(this.activeName=='fourth'){
                this.storeEvaluate()
            }
        },
        handleClick(val){
            if(this.activeName=='second'){
                this.storeCard()
            }else if(this.activeName=='third'){
                this.storeConsumeRecord()
            }else if(this.activeName=='fourth'){
                this.storeEvaluate()
            }
        },
        storeConsumeRecord(){//服务记录
            let data={
                keyWord:this.sport.keyword,
                owner:this.sport.owner,
                page:this.page-1,
                pageSize:this.pageSize,
                storeId:this.getQueryVariable('id')
            }
            storeConsumeRecord(data).then(res=>{
                if(res.data.code==1){
                    this.recordData=res.data.body.data
                    this.total=res.data.body.count
                }
            })
        },
        storeCard(){//商户支持卡券列表
            storeCard({sid:this.getQueryVariable('id'),sisVisible:0},true).then(res=>{
                if(res.data.code==1){
                    res.data.body.forEach(item=>{
                        item.editMax=false
                        item.editPrice=false
                        item.edit=false
                        item.supEdit=false
                        item.originalPrice=item.storePrices
                        item.originalMaxCardNum=item.maxNum
                        if(item.supStatus==1){
                            item.supStatus=false
                        }else{
                            item.supStatus=true
                        }
                        item.originalSupStatus=item.supStatus
                    })
                    this.sportData=res.data.body
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
        getQueryVariable(variable){//获取url参数
            var str = window.location.hash.indexOf('?');
            var query=window.location.hash.substring(str+1,window.location.hash.length)
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
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
                    this.loadingMap=false
                    arr=results.Br
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
        store(type){
            if(type){
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
                    id:this.getQueryVariable('id'),
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
                store(data).then(res=>{
                    if(res.data.code==1){
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
            }else{
                store({id:this.getQueryVariable('id')},true).then(res=>{
                    if(res.data.code==1){
                        let cityArr=[]
                        if(res.data.body.data[0].province){
                            cityArr.push(res.data.body.data[0].province)
                        }
                        if(res.data.body.data[0].city){
                            cityArr.push(res.data.body.data[0].city)
                        }
                        if(res.data.body.data[0].area){
                            cityArr.push(res.data.body.data[0].area)
                        }
                        this.businessData.city=cityArr
                        this.businessData.businnessName=res.data.body.data[0].name
                        this.businessData.mainBody=res.data.body.data[0].companyName
                        this.businessData.unifyCode=res.data.body.data[0].unifyCode
                        this.businessData.contacts=res.data.body.data[0].contacts
                        this.businessData.mobilePhone=res.data.body.data[0].mobile
                        this.businessData.coordinate=res.data.body.data[0].coordinate
                        this.businessData.location=res.data.body.data[0].location
                        this.businessData.serverPhone=res.data.body.data[0].phone
                        let t1=res.data.body.data[0].serviceSTime
                        let t2=res.data.body.data[0].serviceETime
                        var h1,h2,m1,m2,s1,s2
                        let arr=[]
                        if(t1!=''){
                            h1=Number(t1.substring(0,2))
                            m1=Number(t1.substring(3,5))
                            s1=Number(t1.substring(6,8))
                            arr.push(new Date(2020,1,1,h1,m1,s1))
                        }
                        if(t2!=''){
                            h2=Number(t2.substring(0,2))
                            m2=Number(t2.substring(3,5))
                            s2=Number(t2.substring(6,8))
                            arr.push(new Date(2020,1,1,h2,m2,s2))
                        }
                        this.businessData.businessHours=arr
                        // this.businessData.businessHours[0]=res.data.body.data[0].serviceSTime
                        // this.businessData.businessHours[1]=res.data.body.data[0].serviceETime
                        this.businessData.loginNum=res.data.body.data[0].phoneNum
                        this.businessData.introduce=res.data.body.data[0].introduce
                        this.businessData.businessId=res.data.body.data[0].pictures.split(',')
                        let businessId=res.data.body.data[0].pictures.split(',')
                        this.businessData.imageArr=[]
                        businessId.forEach(item=>{
                            getImages({fi:item}).then(res=>{
                                let url='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                                function dataURLtoFile(dataurl, filename) { 
                                    var arr = dataurl.split(','),
                                        mime = arr[0].match(/:(.*?);/)[1],
                                        bstr = atob(arr[1]),
                                        n = bstr.length,
                                        u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mime });
                                }
                                //调用
                                var file = dataURLtoFile(url, 'imgName.png')
                                let files={}
                                files.url=url
                                files.raw=file
                                this.businessData.imageArr.push(files)
                            })
                        })
                        let newtime1=formattingDate(res.data.body.data[0].contractSTime)
                        let newtime2=formattingDate(res.data.body.data[0].contractSTime)
                        // this.contractData.startTime=new Date(newtime1.y,newtime1.m,newtime1.d)
                        // this.contractData.endTime=new Date(newtime2.y,newtime2.m,newtime2.d)
                        this.contractData.startTime=res.data.body.data[0].contractSTime
                        this.contractData.endTime=res.data.body.data[0].contractSTime
                        this.contractData.endTime=res.data.body.data[0].contractETime
                        this.contractData.serviceStatus=res.data.body.data[0].serviceStatus
                        this.contractData.collStatus=res.data.body.data[0].collStatus
                        this.contractData.annexId=res.data.body.data[0].contractAnnex
                        this.contractData.contacts=res.data.body.data[0].operateUser
                    }
                })
            }
            
        },
        getUrlBase64(url) {
            return new Promise(resolve => {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                let img = new Image()
                img.crossOrigin = 'Anonymous' //允许跨域
                img.src = url
                img.onload = function() {
                canvas.height = 400
                canvas.width = 550
                ctx.drawImage(img, 0, 0, 550, 400)
                let dataURL = canvas.toDataURL('image/png')
                canvas = null
                resolve(dataURL)
                }
            })
        },
        editRow(row){//编辑行
        row.edit = true
        row.editMax = true
        row.editPrice = true
        row.supEdit = true
      },
      cancelEdit(row) {//取消
        row.storePrices = row.originalPrice
        row.maxNum = row.originalMaxCardNum
        row.supStatus = row.originalSupStatus
        row.edit = false
        row.editMax = false
        row.editPrice = false
        row.supEdit = false
        this.$message({
          message: '已取消操作!',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        if(!(/^((\d+)|([0].\d{0,2}|(\d+.\d{0,2})))$/.test(row.storePrices))){ 
            this.$message.error('价格只能为数字且保留两位小数')
            return 
        }
        if(row.supStatus){
          row.supStatus=0
        }else{
          row.supStatus=1
        }
        let data={
          storeCards:[{
            id:row.id,
            storeId:row.storeId,
            storePrices:row.storePrices,
            supStatus:row.supStatus,
            maxNum:row.maxNum}],
          uid:JSON.parse(window.sessionStorage.getItem('user')).uid
        }
        storeCard(data).then(res=>{
          if(res.data.code==1){
            row.originalPrice = row.storePrices
            row.originalMaxCardNum = row.maxNum
            if(row.supStatus==1){
              row.supStatus=false
            }else{
              row.supStatus=true
            }
            row.originalSupStatus = row.supStatus
            row.edit = false
            row.editMax = false
            row.editPrice = false
            row.supEdit = false
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
          
        })
      },
      getDicts(){//字典
        getDicts({itemType:'cardType'}).then(res=>{
            for(let i in res.data.body){
                let json={
                    label:res.data.body[i],
                    value:i
                }
                this.couponTypes.push(json)
            }
        }).then(()=>{
            this.store()
        })
      },
    },
    created(){
        this.getDicts()
    },
    mounted(){
        this.options=city
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
    .businessDetail{
        background: white;
        padding: .1rem;
        margin-top: .1rem;
        height: 87vh;
        overflow:auto;
        .table{
            margin: .1rem;
        }
        .btn{
            text-align: center;
        }
        .baseMsg{
            padding: .1rem;
            border: 1px solid #eee;
            border-top: none;
        }
        
    }
    #container{
        height: 3rem !important;
    }
</style>