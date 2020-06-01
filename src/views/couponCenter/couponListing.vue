<template>
  <div class="couponListing">
    <div v-if="!dialogVisible">
        <el-form label-width="0.8rem" class="form" :inline="true">
            <el-form-item label="关键字:">
                <el-input size="small" clearable v-model="formData.keyword" placeholder="请输入卡券编号或名称"></el-input>
            </el-form-item>
            <el-form-item label="卡券状态:">
                <el-select size="small" clearable v-model="formData.status" placeholder="请选择">
                    <el-option
                    v-for="item in formData.couponStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡券类型:">
                <el-select size="small" clearable v-model="formData.couponType" placeholder="请选择">
                    <el-option
                    v-for="item in formData.couponTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分发渠道:">
                <el-select size="small" clearable @change="changeChannle" v-model="formData.channel" placeholder="请选择">
                    <el-option
                    v-for="item in formData.channels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="归属渠道:">
                <el-select size="small" clearable @change="changeAttr" v-model="formData.attribution" placeholder="请选择">
                    <el-option
                    v-for="item in formData.attributions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
                <el-button size="small" type="primary" @click="getCardRecord">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="couponList" v-loading="loading">
            <h2>数据列表</h2>
            <el-table
                border
                height="5.6rem"
                size="small"
                :data="tableData"
                style="width: 98%;margin:.1rem">
                <el-table-column
                    align="center"
                    prop="cardCode"
                    label="卡券编号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="cardTypeName"
                    label="卡券类型">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="cardName"
                    label="卡券名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    min-width="100px"
                    prop="cardStaTime"
                    label="生效时间">
                    <template slot-scope="{row}">
                    <p>{{row.cardStaTime|date}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    min-width="100px"
                    prop="cardExpTime"
                    label="过期时间">
                    <template slot-scope="{row}">
                    <p>{{row.cardExpTime|date}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="cardStatus"
                    label="卡券状态">
                    <template slot-scope="{row}">
                    <p>{{row.cardStatus|status}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="channelName"
                    label="分发渠道">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="belongChName"
                    label="归属渠道">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="{row}">
                    <el-button type="text" @click="showDetail(row.id)"  size="mini">查看详情</el-button>
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
    </div>
        <transition name="el-zoom-in-top" mode="out-in">
            <div v-if="dialogVisible" class="detail">
                <div class="detailContent">
                    <h2>卡券详情 <i @click="dialogVisible=false" class="el-icon-circle-close"></i></h2>
                    <div class="downCon">
                        <p>卡券信息</p>
                        <div class="detailMsg">
                            <p><span>卡券编号:</span><b>{{cardRecord.cardCode|empty}}</b></p>
                            <p><span>创建时间:</span><b>{{cardRecord.sendTime|time|empty}}</b></p>
                            <p><span>卡券状态:</span><b>{{cardRecord.cardStatus|status}}</b></p>
                            <p><span>扫码次数:</span><b>{{cardRecord.scanNum|empty}}次</b></p>
                        </div>
                        <el-table
                            border
                            class="table"
                            size="small"
                            :data="cardRecord.couponData"
                            style="width: 95%">
                            <el-table-column
                                prop="cardName"
                                align="center"
                                label="卡券名称">
                            </el-table-column>
                            <el-table-column
                                prop="cardStaTime"
                                align="center"
                                label="有效时间">
                                <template slot-scope="{row}">
                                    <span>{{row.cardStaTime|date}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="cardExpTime"
                                align="center"
                                label="过期时间">
                                <template slot-scope="{row}">
                                    <span>{{row.cardExpTime|date}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="channelName"
                                align="center"
                                label="分发渠道">
                            </el-table-column>
                            <el-table-column
                                prop="channelPrices"
                                align="center"
                                label="渠道价格">
                            </el-table-column>
                            <el-table-column
                                prop="cardPrice"
                                align="center"
                                label="终端价格">
                            </el-table-column>
                            
                            <el-table-column
                                prop="needProveNum"
                                align="center"
                                label="所需佐证数">
                            </el-table-column>
                        </el-table>
                        <div class="note">
                            <p>卡券说明: <span>{{cardRecord.cardExplain|empty}}</span></p>
                            <p>车主说明: <span>{{cardRecord.userExplain|empty}}</span></p>
                            <p>商户说明: <span>{{cardRecord.merchantExplain|empty}}</span></p>
                        </div>
                        <p>发送信息</p>
                        <div class="send" >
                            <p>发送人: <span>{{cardRecord.ownerName|empty}}</span></p>
                            <p>手机号: <span>{{cardRecord.ownerPhone|empty}}</span></p>
                            <p>车牌号: <span>{{cardRecord.licenseno|empty}}</span></p>
                        </div>
                        <p>使用信息</p>
                        <el-table
                            border
                            class="table"
                            size="small"
                            :data="cardConsume.userData"
                            style="width: 95%">
                            <el-table-column
                                prop="ownerName"
                                align="center"
                                label="使用人">
                            </el-table-column>
                            <el-table-column
                                prop="ownerPhone"
                                align="center"
                                label="手机号码">
                            </el-table-column>
                            <el-table-column
                                prop="licenseno"
                                align="center"
                                label="车牌号码">
                            </el-table-column>
                            <el-table-column
                                prop="storePrices"
                                align="center"
                                label="合作价格">
                            </el-table-column>
                            <el-table-column
                                prop="consumeTime"
                                align="center"
                                label="使用时间">
                                <template slot-scope="{row}">
                                    <span>{{row.consumeTime|time}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="storeName"
                                align="center"
                                label="扫码商户">
                            </el-table-column>
                        </el-table>
                        <p>佐证信息</p>
                        <div class="edvince">
                            <p v-if="rows.length==0" style="font-size:.16rem;text-indent:2em;font-weight:normal">暂无佐证</p>
                            <el-row v-else type="flex" v-for='(images,index) of rows' :key='index'>
                                <el-col :span="8" v-for="item of images" :key='item'>
                                    <div style="display:flex;justify-content:center;align-item:center">
                                        <img @click="showBigPic(item)" style="width:2rem" :src="'http://sapp.csgxcf.com:2800/seeRecrop?fi='+item+'&sc=0&w=300&h=300'" >
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <p>评价信息</p>
                        <div class="evaluation">
                            {{evaluate.evaluate|empty}}
                            <div class="evaluationFoot">
                                <span>评价人: <span>{{evaluate.ownerName|empty}}</span></span>
                                <span>评价时间: <span>{{evaluate.insTime|time|empty}}</span></span>
                            </div>
                        </div>
                        <p>审核信息</p>
                        <div class="audit">
                            <p>审核人:   <span> {{cardExamine.examineUserName|empty}}</span></p>
                            <p>审核时间:   <span>{{cardExamine.examineTime|empty}}</span></p>
                            <p>审核结果:   <span>{{cardExamine.examineOpinion|empty}}({{cardExamine.examineStatus|examineStatus}})</span></p>
                        </div>
                        <div style="height:2rem;"></div>
                    </div>
                    <el-dialog
                    title="查看佐证"
                    :visible.sync="bigPic"
                    width="50%">
                        <div v-loading="loadingImage" style="display:flex;justify-content:center;align-item:center">
                        <img style="max-width:5rem;" :src="bigUrl" alt="">
                        </div>
                    </el-dialog>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import { cardRecord , channel , cardDetails , getDicts  } from '@/api/api.js'
import { formattingTime , formattingYear} from '@/api/public.js'
export default {
    name:'couponListing',
    filters:{
        time(val){
            return formattingTime(val)
        },
        date(val){
            return formattingYear(val)
        },
        status(val){
            switch (val){
                case '1':
                    return '未使用'
                    break;
                case '2':
                    return '已使用'
                    break;
                case '3':
                    return '已过期'
                    break;
                case '4':
                    return '已失效'
                    break;
                default : return ''
            }
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
                default : return '暂无'
            }
        },
        empty(val){
            if(val==''){
                return '暂无'
            }else{
                return val
            }
        }
    },
    computed:{
        rows(){
            const rows = []
            this.cardConsume.provePicture.forEach((item, index) => {
            const page = Math.floor(index / 4)
            if (!rows[page]) {
                rows[page] = []
            }
            rows[page].push(item)
            })
            return rows
        }
    },
    data(){
        return{
            dialogVisible:false,
            tableData:[],
            formData:{
                keyword:'',
                status:'',
                couponStatus:[
                    {label:'未使用',value:1},
                    {label:'已使用',value:2},
                    {label:'已过期',value:3},
                    {label:'已失效',value:4}
                ],
                couponTypes:[],
                couponType:'',        
                attribution:'',
                aschidLevel:'',
                attributions:[],
                channel:'',
                chLevel:'',
                channels:[]
            },
            cardRecord:{
                cardCode:'---',
                sendTime:'---',
                cardStatus:'---',
                scanNum:'---',
                couponData:[],
                cardExplain:'',
                userExplain:'',
                merchantExplain:'',
                
            },
            cardConsume:{
                provePicture:[],
                userData:[],
            },
            evaluate:{
                evaluate:'',
                insTime:'',
                userId:''
            },
            cardExamine:{
                examineOpinion:'',
                examineStatus:'',
                examineTime:'',
                examineUserName:'',
            },
            page:1,
            pageSize:20,
            total:0,
            loading:false,
            bigPic:false,
            bigUrl:'',
            loadingImage:false
        }
    },
    methods:{
        getDicts(){//字典
            getDicts({itemType:'cardType'}).then(res=>{
                for(let i in res.data.body){
                    let json={
                        label:res.data.body[i],
                        value:i
                    }
                    this.formData.couponTypes.push(json)
                }
            })
        },
        showBigPic(id){//佐证大图
            this.bigPic=true
            this.loadingImage=true
            let url=''
            this.bigUrl=''
            getImages({fi:id}).then(res=>{
                url='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                this.loadingImage=false
                this.bigUrl=url
            })
            // this.bigUrl='http://sapp.csgxcf.com:2800/seeRecrop?fi='+id
        },
        changeChannle(val){
            this.formData.channels.forEach(item=>{
                if(val==item.value){
                    this.formData.chLevel=item.chLevel
                }
            }) 
        },
        changeAttr(val){
            this.formData.channels.forEach(item=>{
                if(val==item.value){
                    this.formData.aschidLevel=item.chLevel
                }
            }) 
        },
        handleSizeChange(val) {//每页
          this.pageSize=val
          this.getCardRecord()
        },
        handleCurrentChange(val) {//翻页
          this.page=val
          this.getCardRecord()
        },
        showDetail(id){//卡券详情
            cardDetails({id:id}).then(res=>{
                if(res.data.code==1){
                    if(res.data.body.cardConsume){
                        this.cardConsume=res.data.body.cardConsume
                        this.cardConsume.provePicture=res.data.body.cardConsume.provePicture.split(',')
                        this.cardConsume.userData=[]
                        let json={
                            ownerName:res.data.body.cardConsume.ownerName,
                            ownerPhone:res.data.body.cardConsume.ownerPhone,
                            licenseno:res.data.body.cardConsume.licenseno,
                            consumeTime:res.data.body.cardConsume.consumeTime,
                            storeName:res.data.body.cardConsume.storeName,
                            storePrices:res.data.body.cardConsume.storePrices,
                        }
                        this.cardConsume.userData.push(json)
                    }
                    if(res.data.body.cardExamine){
                        this.cardExamine=res.data.body.cardExamine
                        
                    }
                    if(res.data.body.cardRecord){
                        this.cardRecord=res.data.body.cardRecord
                        let json={
                            cardName:res.data.body.cardRecord.cardName,
                            cardExpTime:res.data.body.cardRecord.cardExpTime,
                            cardStaTime:res.data.body.cardRecord.cardStaTime,
                            channelName:res.data.body.cardRecord.channelName,
                            channelPrices:res.data.body.cardRecord.channelPrices,
                            cardPrice:res.data.body.cardRecord.cardPrice,
                            needProveNum:res.data.body.cardRecord.needProveNum,
                            cardPrice:res.data.body.cardRecord.cardPrice,
                            cardExplain:res.data.body.cardRecord.cardExplain,
                            userExplain:res.data.body.cardRecord.userExplain,
                            merchantExplain:res.data.body.cardRecord.merchantExplain,
                        }
                        this.cardRecord.couponData=[]
                        this.cardRecord.couponData.push(json)
                    }
                    if(res.data.body.evaluate){
                        this.evaluate=res.data.body.evaluate
                    }
                }
            })
            this.dialogVisible=true
        },
        getCardRecord(){//卡券清单
            let data={
                keyWord:this.formData.keyword,
                page:this.page-1,
                pageSize:this.pageSize,
                cardStatus:this.formData.status,
                dichid:this.formData.channel,
                dichidLevel:this.formData.chLevel,
                aschid:this.formData.attribution,
                aschidLevel:this.formData.aschidLevel
            }
            this.loading=true
            cardRecord(data).then(res=>{
                this.loading=false
                if(res.data.code==1){
                    this.tableData=res.data.body.data
                    this.total=res.data.body.count
                }
            })
        },
        channel(){
            channel().then(res=>{
                if(res.data.code==1){
                    res.data.body.data.forEach(item=>{
                        let json={
                            label:item.chName,
                            value:item.chid,
                            chLevel:item.chLevel
                        }
                        this.formData.channels.push(json)
                        this.formData.attributions.push(json)
                    })
                }
            })
        },
        
    },
    created(){
        this.getDicts()
    },
    mounted(){
        this.getCardRecord()
        this.channel()
    }
}
</script>

<style lang="less" scoped>
    .evaluationFoot{
        display: flex;
        justify-content: space-between;
        font-size: .12rem !important;
        padding-right: 1rem;
        font-weight: normal !important;
    }
    .detail{
        border-top: .1rem solid #eee;
        margin:.1rem;
        background: white;
        .downCon{
            height: 100vh;
            overflow-y: auto;
        }
        .detailContent{
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            padding-bottom: 1rem;
            p{
                padding: .1rem;
                font-size: .18rem;
                font-weight: 550;
            }
            .detailMsg{
                display: flex;
                margin: 0 .15rem;
                justify-content: space-around;
                border-bottom: 1px solid #e5e5e5;
                p{
                    font-size: .14rem;
                    font-weight: normal;
                    b{
                        text-indent: 1em;
                        display: inline-block;
                        padding-left: .05rem;
                        font-weight: normal;
                    }
                }
            }
            
            .evaluation{
                text-indent: 2em;
                font-size: .14rem;
                padding: 0 .1rem;
                
            }
            .audit{
                display: flex;
                justify-content: space-around;
                p{
                    font-size: .14rem;
                    font-weight: normal;
                }
            }
            .edvince{
                // display: flex;
                // justify-content: space-around;
                img{
                    width: 1.5rem;
                    cursor: pointer;
                }
            }
            .send{
                display:flex;
                justify-content:space-around;
                align-items :center;
                p{
                    font-size: .16rem;
                    font-weight: normal;
                    span{
                        font-size: .14rem;
                        line-height: .2rem;
                        text-indent: 2em;
                        display: inline-block;

                    }
                }
            }
            .note{
                margin: .15rem;
                border-bottom: 1px solid #e5e5e5;
                border-top: 1px solid #e5e5e5;
                p{
                    font-size: .16rem;
                    font-weight: normal;
                }
                span{
                    font-size: .14rem;
                    line-height: .2rem;
                    text-indent: 2em;
                    display: inline-block;

                }
            }
            .table{
                margin:.15rem auto;
            }
            h2{
                font-size: .2rem;
                padding: .1rem .2rem;
                border-bottom: 1px solid #e5e5e5;
                i{
                    float:right;
                    display: block;
                    padding-top: .05rem;
                    cursor: pointer;
                }
                i:hover{
                    color: red;
                }
            }
        }
        
    }
    .couponListing{
        .form{
            background: white;
            margin-bottom: .1rem;
            display: flex;
            height: .6rem;
            .el-form-item{
                height: .6rem;
                display: flex;
                align-items: center;
            }
        }
        .couponList{
            background: white;
            h2{
                font-size:.22rem;
                padding: .1rem;
                font-family:Source Han Sans CN;
                font-weight:550;
                color:rgba(0,0,0,1);
            }
        }
    }
</style>