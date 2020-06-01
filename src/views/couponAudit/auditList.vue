<template>
  <div class="couponAudit">
      <el-tabs  v-model="activeName" type="card" @tab-click="handleClick" v-loading="loading"> 
        <el-tab-pane label="待审核" name="first">
          <div class="waitAudit">
            <el-form :inline="true">
              <el-form-item label="关键字">
                <el-input type="text" size="small" v-model="formData.keyword"></el-input>
              </el-form-item>
              <el-form-item label="提交时间">
                <el-date-picker
                  size="small"
                  v-model="formData.times"
                  value-format="yyyyMMddHHmmss"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="examine">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              border
              :data="waitData"
              height="5.6rem"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="cardCode"
                label="卡券编号">
              </el-table-column>
              <el-table-column
                align="center"
                prop="cardName"
                label="卡券名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="storeName"
                label="申请审核商户">
              </el-table-column>
              <!-- <el-table-column
                align="center"
                prop="examineStatus"
                label="审核状态">
                <template slot-scope="scope">
                  <p>{{scope.row.examineStatus|examineStatus}}</p>
                </template>
              </el-table-column> -->
              <el-table-column
                align="center"
                prop="insTime"
                label="提交时间">
                <template slot-scope="scope">
                  <p>{{scope.row.insTime|time}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="showDetail(scope)" size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane  label="审核完成" name="second">
          <div class="finishAudit">
            <el-form :inline="true" label-width="100px">
              <el-form-item label="关键字">
                <el-input type="text" size="small" v-model="formData.keyword"></el-input>
              </el-form-item>
              <el-form-item label="审核时间">
                <el-date-picker
                  size="small"
                  v-model="formData.times"
                  type="daterange"
                  range-separator="至"
                  value-format="yyyyMMddHHmmss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="examine">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              border
              height="5.6rem"
              :data="finishData"
              style="width: 100%">
              <el-table-column
                align="center"
                prop="cardCode"
                label="卡券编号">
              </el-table-column>
              <el-table-column
                align="center"
                prop="cardName"
                label="卡券名称">
              </el-table-column>
              <el-table-column
                align="center"
                prop="storeName"
                label="申请审核商户">
              </el-table-column>
              <el-table-column
                align="center"
                prop="examineStatus"
                label="审核状态">
                <template slot-scope="scope">
                  <p>{{scope.row.examineStatus|examineStatus}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="examineTime"
                label="审核时间">
                <template slot-scope="scope">
                  <p>{{scope.row.examineTime|time}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="examineUserName"
                label="审核人">
              </el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="showDetail(scope)" size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      <el-dialog
        title="卡券详情"
        top="2%"
        :visible.sync="dialogVisible"
        width="70%">      
            <el-carousel v-if="activeName=='first'" v-loading="dialogLoading" ref="couponCarousel" :initial-index="initialIndex" :loop="false" indicator-position='none' arrow="never" :autoplay="false" height="6.1rem">
              <el-carousel-item   v-for="(item,index) in waitData" :key="index">
                <div class="detail">
                    <div class="detailContent">
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
                                <p>{{evaluate.evaluate|empty}}</p>
                                <div class="evaluationFoot">
                                    <span>评价人: <span>{{evaluate.userId|empty}}</span></span>
                                    <span>评价时间: <span>{{evaluate.insTime|time|empty}}</span></span>
                                </div>
                            </div>
                            <p>审核信息</p>
                            <div class="audit">
                                <p>审核人:   <span> {{cardExamine.examineUserName|empty}}</span></p>
                                <p>审核时间:   <span>{{cardExamine.examineTime|time|empty}}</span></p>
                                <p>审核结果:   <span>{{cardExamine.examineOpinion|empty}}({{cardExamine.examineStatus|examineStatus}})</span></p>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <el-carousel v-else v-loading="dialogLoading" ref="couponCarousel" :initial-index="initialIndex" :loop="false" indicator-position='none' arrow="never" :autoplay="false" height="6.1rem">
              <el-carousel-item   v-for="(item,index) in finishData" :key="index">
                <div class="detail">
                    <div class="detailContent">
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
                                <p v-if="rows.length==0">暂无佐证</p>
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
                                <p>{{evaluate.evaluate|empty}}</p>
                                <div class="evaluationFoot">
                                    <span>评价人: <span>{{evaluate.ownerName|empty}}</span></span>
                                    <span>评价时间: <span>{{evaluate.insTime|time|empty}}</span></span>
                                </div>
                            </div>
                            <p>审核信息</p>
                            <div class="audit">
                                <p>审核人:   <span> {{cardExamine.examineUserName|empty}}</span></p>
                                <p>审核时间:   <span>{{cardExamine.examineTime|time|empty}}</span></p>
                                <p>审核结果:   <span>{{cardExamine.examineOpinion|empty}}({{cardExamine.examineStatus|examineStatus}})</span></p>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="doBtn">
                <el-button size="small" type="primary" :disabled="showPre" @click="preCoupon">上一个({{index+1}}/{{activeName=='first'?waitData.length:finishData.length}})</el-button>
                <div >
                    <!-- <el-button size="small" type="success">通过</el-button>
                    <el-button size="small" type="danger">拒绝</el-button> -->
                </div>
                <el-button size="small" type="primary" :disabled="showNext" @click="nextCoupon">下一个({{index+1}}/{{activeName=='first'?waitData.length:finishData.length}})</el-button>
            </div>
      </el-dialog>
      <el-dialog
      title="查看佐证"
      :visible.sync="bigPic"
      width="50%">
          <div v-loading="loadingImage" style="display:flex;justify-content:center;align-item:center">
          <img style="max-width:5rem;" :src="bigUrl" alt="">
          </div>
      </el-dialog>
  </div>
</template>

<script>
import { formattingTime , formattingYear} from '@/api/public.js'
import { examine , examineDetails , getImages} from '@/api/api.js'
export default {
    name:"auditList",
    filters:{
        time(val){
            return formattingTime(val)
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
        date(val){
          return formattingYear(val)
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
        activeName:'first',
        initialIndex:0,
        formData:{
          keyword:'',
          times:''
        },
        waitData:[],
        finishData:[1],
        couponData:[],
        userData:[],
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
        dialogLoading:false,
        index:0,
        showNext:false,
        showPre:false,
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
          // this.bigUrl='http://sapp.csgxcf.com:2800/seeRecrop?fi='+id
      },
      handleClick(){
        this.formData.keyword=''
        this.formData.times=''
        if(this.activeName=='first'){
          this.finishData=[]
        }else{
          this.waitData=[]
        }
        this.examine()
      },
      handleSizeChange(val) {//每页
        this.pageSize=val
        this.examine()
      },
      handleCurrentChange(val) {//翻页
        this.page=val
        this.examine()
      },
      examineDetails(id){
        examineDetails({cid:id}).then(res=>{
          this.dialogLoading=false
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
      },
      showDetail(scope){//审核详情
        this.index=scope.$index
        this.initialIndex=scope.$index
        this.dialogVisible=true
        this.dialogLoading=true
        this.examineDetails(scope.row.cid)
        if(this.index<=0){
          this.showPre=true
        }else{
          this.showPre=false
        }
        if(this.activeName=='first'){
          if(this.index>=this.waitData.length-1){
            this.showNext=true
          }else{
            this.showNext=false
          }
        }else{
          if(this.index>=this.finishData.length-1){
            this.showNext=true
          }else{
            this.showNext=false
          }
        }
        setTimeout(()=>{
          this.$refs.couponCarousel.setActiveItem(this.index)
        },100)
      },
      preCoupon(){//上一个
        if(this.index<=0){
          this.showPre=true
          return
        }
        this.showPre=false
        this.showNext=false
        this.dialogLoading=true
        this.index--
        this.$refs.couponCarousel.setActiveItem(this.index)
        if(this.activeName=='first'){
          this.examineDetails(this.waitData[this.index].cid)
        }else{
          this.examineDetails(this.finishData[this.index].cid)
        }
        if(this.index<=0){
          this.showPre=true
        }
      },
      nextCoupon(){//下一个
        if(this.activeName=='first'){
          if(this.index>=this.waitData.length){
            this.showNext=true
            return
          }
        }else{
          if(this.index>=this.finishData.length){
            this.showNext=true
            return
          }
        }
        
        this.showNext=false
        this.showPre=false
        this.dialogLoading=true
        this.index++
        this.$refs.couponCarousel.setActiveItem(this.index)
        if(this.activeName=='first'){
          this.examineDetails(this.waitData[this.index].cid)
          if(this.index>=this.waitData.length-1){
            this.showNext=true
          }
        }else{
          this.examineDetails(this.finishData[this.index].cid)
          if(this.index>=this.finishData.length-1){
          this.showNext=true
        }
        }
        // if(this.index>=this.waitData.length-1){
        //   this.showNext=true
        // }
        // if(this.index>=this.finishData.length-1){
        //   this.showNext=true
        // }
      },
      examine(){
        let data={
          examineStatus:this.activeName=='first'?'0':'1,2',
          keyWord:this.formData.keyword,
          page:this.page-1,
          pageSize:this.pageSize,
          time:this.formData.times.toString(),
          timeType:this.activeName=='first'?'0':'1',
          // uid:JSON.parse(window.sessionStorage.getItem('user')).uid
        }
        this.loading=true
        examine(data).then(res=>{
          this.loading=false
          if(res.data.code==1){
            if(data.timeType==0){
              this.waitData=res.data.body.data
            }else{
              this.finishData=res.data.body.data
            }
            this.total=res.data.body.count
          }
        })
      }
    },
    mounted(){
      this.examine()
      this.showPre=this.index<=0
      this.showNext=this.index>=this.waitData.length-1
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
    .doBtn{
      display: flex;
      margin: .1rem;
      justify-content: space-between;
    }
    .detail{
        // border-top: .1rem solid #eee;
        background: white;
        .downCon{
            height: 63vh;
            overflow-y: auto;
        }
        .detailContent{
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            // padding-bottom: 1rem;
            p{
                padding: .1rem;
                font-size: .18rem;
                font-weight: 550;
            }
            .btn{
              text-align: center;
              margin-top: .1rem;
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
  .couponAudit{
    background: white;
    padding: .1rem;
    .waitAudit,.finishAudit{
      padding: .1rem;
      border: 1px solid #eee;
      border-top: none;
    }
  }
</style>