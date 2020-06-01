<template>
  <div class="channelDetail">
      <el-tabs v-model="activeName" type="card" @tab-click="handlclick">
        <el-tab-pane label="基本信息" name="first">
            <div class="baseMsg">
              <el-row type="flex">
                <el-col :span="12">
                    <el-form :rules="rules" ref="baseData" :model="baseData" status-icon label-width="120px">
                        <el-form-item label="渠道名称" prop="channelName">
                            <el-input type="text" v-model="baseData.channelName"></el-input>
                        </el-form-item>
                        <el-form-item label="渠道级别" prop="channelLevel">
                            <el-select v-model="baseData.channelLevel" disabled>
                              <el-option
                              v-for="item in baseData.channelLevels"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="渠道地址" prop="address">
                            <el-input type="text" v-model="baseData.address"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="contacter">
                            <el-input type="text" v-model="baseData.contacter"></el-input>
                        </el-form-item>
                        <el-form-item label="绑定手机号" prop="phone">
                            <el-input type="text" v-model="baseData.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="绑定邮箱" prop="email">
                            <el-input type="text" v-model="baseData.email"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="邀请码" prop="inviteCode">
                            <el-input type="text" v-model="baseData.inviteCode"></el-input>
                        </el-form-item> -->
                        <el-form-item label="合同开始时间" prop="startTime">
                            <el-date-picker
                              clearable
                              v-model="baseData.startTime"
                              type="date"
                              value-format="yyyyMMddHHmmss"
                              placeholder="选择日期">
                              </el-date-picker>
                        </el-form-item>
                        <el-form-item label="合同结束时间" prop="endTime">
                            <el-date-picker
                              clearable
                              v-model="baseData.endTime"
                              type="date"
                              value-format="yyyyMMddHHmmss"
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
                              :file-list="baseData.contractAnnex"
                              :auto-upload="false">
                              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                              <el-button style="margin-left: 10px;" size="small" type="success" @click="annexSubmitUpload">上传到服务器</el-button>
                              <a style="margin-left: 10px;" :href="'https://sapp.csgxcf.com:2843/seeObject?fi='+baseData.annexId" target="_blank"><el-button slot="trigger" size="small" type="primary">下载文件</el-button></a>
                              </el-upload>
                          </el-form-item>
                        <el-form-item label="帐号状态" prop="status">
                              <el-radio v-model="baseData.status" label="0">启用</el-radio>
                              <el-radio v-model="baseData.status" label="1">禁止</el-radio>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-form label-width="120px">
                      <el-form-item label="渠道介绍">
                          <el-input type="textarea" :rows="4" v-model="baseData.introduce"></el-input>
                      </el-form-item>
                      <el-form-item label="我司联络人" prop="ownContact">
                            <el-input type="text" v-model="baseData.ownContact"></el-input>
                        </el-form-item>
                      <el-form-item label="渠道备注">
                          <el-input type="textarea" :rows="4" v-model="baseData.note"></el-input>
                      </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="btn">
                <el-button size="small" type="primary" @click="saveChannel">保存</el-button>
                <el-button size="small" @click="$router.push('/channelList')" >取消</el-button>
            </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="卡券设置" name="second">
            <div class="couponMsg">
              <!-- <el-form label-width="150px" :rules="couponRules">
                <el-form-item  :v-model="couponData" >
                  <el-form-item label="可派卡包总金额上限" prop="moneyLimit">
                    <el-input type="text"  v-model.number="couponData.limit"></el-input>
                  </el-form-item>
                </el-form-item>
              </el-form> -->
              <el-table
                :data="couponTable"
                border
                max-height="5.6rem"
                style="width: 80%;margin:.1rem auto;">
                <el-table-column
                  prop="cardTypeName"
                  align="center"
                  label="卡劵类型">
                </el-table-column>
                <el-table-column
                  prop="cardName"
                  align="center"
                  label="卡劵名称">
                </el-table-column>
                <el-table-column align="center" label="渠道合作价格" prop="channelPrices">
                  <template slot-scope="{row}">
                    <template v-if="row.editPrice">
                      <el-input v-model="row.channelPrices" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ row.channelPrices }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="可派发卡券数量" prop="maxCardNum">
                  <template slot-scope="{row}">
                    <template v-if="row.editMax">
                      <el-input v-model.number="row.maxCardNum" class="edit-input" size="small" />
                    </template>
                    <span v-else>{{ row.maxCardNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="是否支持" prop="maxCardNum">
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
              <!-- <div class="btn">
                  <el-button size="small" type="primary">保存</el-button>
                  <el-button size="small" @click="$router.push('/channelList')" >取消</el-button>
              </div> -->
            </div>
        </el-tab-pane>
        <el-tab-pane label="卡券审核设置" name="third">
          <div class="baseMsg">
            <el-form label-width="120px">
                <el-form-item  :v-model="couponData" >
                  <el-form-item label="卡券审核规则">
                    <el-input type="textarea" :rows="5"  v-model="couponData.rule"></el-input>
                  </el-form-item>
                </el-form-item>
              </el-form>
              <div class="btn">
                  <el-button size="small" type="primary" @click="saveCouponRule">保存</el-button>
                  <el-button size="small" @click="$router.push('/channelList')" >取消</el-button>
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关联下级渠道" v-if="baseData.channelLevel==1" name='fourth'>
          <div class="baseMsg">
            <el-form>
              <el-form-item label-width="120px" label="关联下级渠道">
                <el-checkbox-group v-model="relation" >
                  <el-checkbox v-for="item in channelRelationList" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            
            <div class="btn">
              <el-button size="small" type="primary" @click="savleChannelRelation">保存</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      
  </div>
</template>

<script>
import { channel,channelCard,channelRelation } from '@/api/api.js'
export default {
    name:'channelDetail',
    data(){
      return{
        activeName:'first',
        baseData:{
            channelName:'',
            channelLevel:'',
            channelLevels:[{label:'一级',value:'1'},{label:'二级',value:'2'}],
            address:'',
            contacter:'',
            phone:'',
            email:'',
            inviteCode:'',
            status:'0',
            introduce:'',
            note:'',
            ownContact:'',
            contractAnnex:[],
            annexId:[],
            endTime:'',
            startTime:'',
        },
        couponTable:[],
        relation:[],
        channelRelationList:[],
        couponData:{
            limit:'',
            rule:''
        },
        couponRules:{
            moneyLimit: [
                { type:'number', required: true, message: '请输入总金额上限', trigger: 'change' }
            ],
        },
        rules:{
            channelName: [
                { min: 3 ,max: 25, message: '3个汉字≤名称≤25个汉字', trigger: 'blur' },
                { required: true, message: '请输入卡券名称', trigger: 'blur' }
            ],
            channelLevel: [
                { required: true, message: '请选择渠道级别', trigger: 'change' }
            ],
            address: [
                { required: true, message: '请输入渠道地址', trigger: 'blur' }
            ],
            contacter: [
                { required: true, message: '请输入联系人', trigger: 'blur' }
            ],
            phone: [
                { required: true, message: '请输入绑定手机号', trigger: 'blur' }
            ],
            // inviteCode: [
            //     { required: true, message: '请输入邀请码', trigger: 'blur' }
            // ],
            status: [
                { required: true, message: '请选择账号状态', trigger: 'change' }
            ],
            startTime: [
                {required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            endTime: [
                {required: true, message: '请选择结束时间', trigger: 'change' }
            ],
        },
      }
    },
    methods:{
      handlePreview(file,fileList) {
          this.baseData.contractAnnex=fileList
      },
      handleRemove(file,fileList) {
          this.baseData.contractAnnex=fileList
      },
      annexSubmitUpload(){//上传附件
          this.loading=true
          let formData=new FormData()
          this.baseData.contractAnnex.forEach(item=>{
            if(item.size>=1048576){
                    this.$message.error('文件过大!')
                    this.loading=false
                    throw new Error('文件过大!重新上传!')
                }
              formData.append('files',item.raw)
          })
          this.baseData.annexId=[]
          uploadFiles(formData).then(res=>{
              this.loading=false
              if(res.data.code==1){
                  res.data.body.forEach(item=>{
                      this.baseData.annexId.push(item.id)
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
      handlclick(){
        if(this.activeName=='second'){
            this.channelCard()
        }
      },
      channelCard(){//渠道支持的卡券列表
        channelCard({chid:this.getQueryVariable('id'),cisVisible:0},true).then(res=>{
          if(res.data.code==1){
            res.data.body.forEach(item=>{
              item.editMax=false
              item.editPrice=false
              item.edit=false
              item.supEdit=false
              item.originalPrice=item.channelPrices
              item.originalMaxCardNum=item.maxCardNum
              if(item.supStatus==1){
                item.supStatus=false
              }else{
                item.supStatus=true
              }
              item.originalSupStatus=item.supStatus
            })
            this.couponTable=res.data.body
          }
        })
      },
      saveCouponRule(){//卡券审核规则设置
          let data={
              chName:this.baseData.channelName,
              chLevel:this.baseData.channelLevel,
              chAddress:this.baseData.address,
              chContacts:this.baseData.contacter,
              chPhone:this.baseData.phone,
              chEmail:this.baseData.email,
              inviteCode:this.baseData.inviteCode,
              chState:this.baseData.status,
              chIntroduce:this.baseData.introduce,
              chRemarks:this.baseData.note,
              operateUser:this.baseData.ownContact,
              chid:this.getQueryVariable('id'),
              uid:JSON.parse(window.sessionStorage.getItem('user')).uid,
              cardExamineRule:this.couponData.rule,
          }
          channel(data,true).then(res=>{
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
      },
      saveChannel(){//保存信息
          
          let data={
              chName:this.baseData.channelName,
              cardExamineRule:this.couponData.rule,
              chLevel:this.baseData.channelLevel,
              chAddress:this.baseData.address,
              chContacts:this.baseData.contacter,
              chPhone:this.baseData.phone,
              chEmail:this.baseData.email,
              inviteCode:this.baseData.inviteCode,
              chState:this.baseData.status,
              chIntroduce:this.baseData.introduce,
              chRemarks:this.baseData.note,
              operateUser:this.baseData.ownContact,
              chid:this.getQueryVariable('id'),
              contractStaTime:this.baseData.startTime,
              contractEndTime:this.baseData.endTime,
              contractAnnex:this.baseData.annexId.toString(),
              uid:JSON.parse(window.sessionStorage.getItem('user')).uid
          }
          this.$refs.baseData.$children.forEach((item,index)=>{
              if(item.isRequired&&item.fieldValue==''){
                  this.$message.error(item.label+'不能为空!');
                  finish=true;
                  throw new Error('表单验证错误')
              }
          })
          channel(data,true).then(res=>{
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
      },
      channel(){
        channel({chid:this.getQueryVariable('id')}).then(res=>{
          if(res.data.code==1){
              this.baseData.channelName=res.data.body.data[0].chName
              this.baseData.channelLevel=res.data.body.data[0].chLevel
              this.baseData.address=res.data.body.data[0].chAddress
              this.baseData.contacter=res.data.body.data[0].chContacts
              this.baseData.phone=res.data.body.data[0].chPhone
              this.baseData.email=res.data.body.data[0].chEmail
              this.baseData.inviteCode=res.data.body.data[0].inviteCode
              this.baseData.status=res.data.body.data[0].chState
              this.baseData.introduce=res.data.body.data[0].chIntroduce
              this.baseData.note=res.data.body.data[0].chRemarks
              this.baseData.startTime=res.data.body.data[0].contractStaTime
              this.baseData.endTime=res.data.body.data[0].contractEndTime
              this.baseData.annexId=res.data.body.data[0].contractAnnex.split(',')
              this.couponData.rule=res.data.body.data[0].cardExamineRule
              this.channelRelation()
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
        row.channelPrices = row.originalPrice
        row.maxCardNum = row.originalMaxCardNum
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
      confirmEdit(row) {//编辑行
        if(!(/^((\d+)|([0].\d{0,2}|(\d+.\d{0,2})))$/.test(row.channelPrices))){ 
            this.$message.error('价格只能为数字且保留两位小数')
            return 
        }
        if(row.supStatus){
          row.supStatus=0
        }else{
          row.supStatus=1
        }
        let data={
          channelCards:[{
            id:row.id,
            channelId:row.channelId,
            channelPrices:row.channelPrices,
            supStatus:row.supStatus,
            maxCardNum:row.maxCardNum}],
            uid:JSON.parse(window.sessionStorage.getItem('user')).uid
        }
        channelCard(data).then(res=>{
          if(res.data.code==1){
            row.originalPrice = row.channelPrices
            row.maxCoriginalMaxCardNumardNum = row.maxCardNum
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
      channelRelation(){//获取关联下级渠道
        let data={
          chLevel:this.baseData.channelLevel,
          chid:this.getQueryVariable('id')
        }
        channelRelation(data).then(res=>{
          if(res.data.code==1){
            res.data.body.forEach(item=>{
              let json={
                label:item.secChannelName,
                value:item.secChannelId
              }
              this.channelRelationList.push(json)
              if(item.supportState==1){
                this.relation.push(item.secChannelId)
              }
            })
          }
        })
      },
      savleChannelRelation(){//保存关联
        let data={
            chid:this.getQueryVariable('id'),
            chLevel:this.baseData.channelLevel,
            relationIds:this.relation.toString(),
            uid:JSON.parse(window.sessionStorage.getItem('user')).uid
        }
        channelRelation(data,true).then(res=>{
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
      }
    },
    created(){
      
    },
    mounted(){
      this.channel()
    }
}
</script>

<style lang="less" scoped>
  .channelDetail{
    background: white;
    padding: .1rem;
    margin-top: .1rem;
    .baseMsg{
      border: 1px solid #eee;
      border-top: none;
      padding: .2rem .1rem;
    }
    .couponMsg{
      border: 1px solid #eee;
      border-top: none;
      padding: .2rem .1rem;
      // padding-right: 2rem;
    }
    .btn{
        font-size: .16rem;
        text-align: center;
    }
  }
</style>