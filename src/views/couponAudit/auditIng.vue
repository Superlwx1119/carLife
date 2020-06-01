<template>
  <div class="detail" v-loading="webLoading">
        <div class="detailContent" v-loading="loading" element-loading-text="暂无卡券可审核"
        element-loading-spinner="el-icon-warning"
        element-loading-background="rgba(255, 255, 255, 0.8)">
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
                        min-width="110px"
                        align="center"
                        label="有效时间">
                        <template slot-scope="{row}">
                            <span>{{row.cardStaTime|date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cardExpTime"
                        min-width="110px"
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
                        min-width="110px"
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
                    <p>审核结果:   <span>{{cardExamine.examineOpinion|empty}}( {{cardExamine.examineStatus|examineStatus}})</span></p>
                </div>
                <div class="btn">
                    <el-button size="small" type="success" @click="examineOpinion('pass')">通过</el-button>
                    <el-button size="small" type="danger"  @click="examineOpinion('no')">拒绝</el-button>
                </div>
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
</template>

<script>
import { formattingTime ,formattingYear } from '@/api/public.js'
import { examine , examineDetails , examineOpinion , getFiles , getImages} from '@/api/api.js'
export default {
    name:'auditIng',
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
            loading:false,
            webLoading:false,
            bigPic:false,
            bigUrl:'',
            loadingImage:false
        }
    },
    methods:{
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
        },
        doOpinion(type,opinion){
            let data={
                cid:this.cardRecord.cardCode,
                examineStatus:type,
                examineOpinion:opinion
            }
            examineOpinion(data).then(res=>{
                if(res.data.code==1){
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.examineDetails()
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        },
        examineOpinion(type){//审核
            if(type=='no'){
                this.$prompt('请输入理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.doOpinion('2',value)
                }).catch(()=>{
                })
            }else{
                this.$confirm('确认同意','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.doOpinion('1','同意')
                }).catch(()=>{})
                
            }
            
        },
        examineDetails(){//审核详情
            this.webLoading=true
            examineDetails({uid:JSON.parse(window.sessionStorage.getItem('user')).uid}).then(res=>{
                this.webLoading=false
                if($.isEmptyObject(res.data.body)||!res.data.body){
                    this.loading=true
                    return
                }
                
                if(res.data.body.cardConsume){
                    this.cardConsume=res.data.body.cardConsume
                    this.cardConsume.userData=[]
                    this.cardConsume.provePicture=res.data.body.cardConsume.provePicture.split(',')
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
                })
        }
    },
    mounted(){
        this.examineDetails()
    }
}
</script>

<style lang='less' scoped>
    .detail{
        // border-top: .1rem solid #eee;
        padding:.1rem;
        background: white;
        .downCon{
            height: 85vh;
            overflow-y: auto;
        }
        .btn{
            font-size: .16rem;
            text-align: center;
            margin: .1rem;
        }
        .detailContent{
            // border: 1px solid #e5e5e5;
            border-radius: 5px;
            // padding-bottom: 1rem;
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
                .evaluationFoot{
                    display: flex;
                    justify-content: space-between;
                    font-size: .12rem !important;
                    padding-right: 1rem;
                    font-weight: normal !important;
                }
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
</style>