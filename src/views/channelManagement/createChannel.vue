<template>
  <div class="createChannel">
      <el-row type="flex">
          <el-col :span="12">
              <el-form :rules="rules" ref="formData" :model="formData" status-icon label-width="120px">
                  <el-form-item label="渠道名称" prop="channelName">
                      <el-input type="text" v-model="formData.channelName"></el-input>
                  </el-form-item>
                  <el-form-item label="渠道级别" prop="channelLevel">
                      <el-select v-model="formData.channelLevel">
                        <el-option
                        v-for="item in formData.channelLevels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="渠道地址" prop="address">
                      <el-input type="text" v-model="formData.address"></el-input>
                  </el-form-item>
                  <el-form-item label="渠道联系人" prop="contacter">
                      <el-input type="text" v-model="formData.contacter"></el-input>
                  </el-form-item>
                  <el-form-item label="绑定手机号" prop="phone">
                      <el-input type="text" v-model="formData.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="绑定邮箱" prop="email">
                      <el-input type="text" v-model="formData.email"></el-input>
                  </el-form-item>

                  <el-form-item label="合同开始时间" prop="startTime">
                      <el-date-picker
                        clearable
                        v-model="formData.startTime"
                        type="date"
                        value-format="yyyyMMddHHmmss"
                        placeholder="选择日期">
                        </el-date-picker>
                  </el-form-item>
                  <el-form-item label="合同结束时间" prop="endTime">
                      <el-date-picker
                        clearable
                        v-model="formData.endTime"
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
                        :file-list="formData.contractAnnex"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="annexSubmitUpload">上传到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                  <!-- <el-form-item label="邀请码" prop="inviteCode">
                      <el-input type="text" v-model="formData.inviteCode"></el-input>
                  </el-form-item> -->
                  <el-form-item label="帐号状态" prop="status">
                    <el-radio v-model="formData.status" label="0">启用</el-radio>
                    <el-radio v-model="formData.status" label="1">禁止</el-radio>
                  </el-form-item>
              </el-form>
          </el-col>
          <el-col :span="12">
              <el-form label-width="120px">
                <el-form-item label="渠道介绍">
                    <el-input type="textarea" :rows="4" v-model="formData.introduce"></el-input>
                </el-form-item>
                <el-form-item label="我司联络人" prop="ownContact">
                    <el-input type="text" v-model="formData.ownContact"></el-input>
                </el-form-item>
                <el-form-item label="渠道备注">
                    <el-input type="textarea" :rows="4" v-model="formData.note"></el-input>
                </el-form-item>
              </el-form>
          </el-col>
      </el-row>
      <div class="btn">
          <el-button size="small" type="primary" @click="channel">创建</el-button>
          <el-button size="small" @click="$router.push('/channelList')" >取消</el-button>
      </div>
  </div>
</template>

<script>
import { channel ,uploadFiles } from '@/api/api.js'
export default {
    name:'createChannel',
    data(){
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }
            if(!(/^1[3456789]\d{9}$/.test(value))){ 
                callback(new Error('手机号码有误'));
                return false; 
            } else{
                callback();
            }
        };
        return{
            formData:{
                contractAnnex:[],
                annexId:[],
                ownContact:'',
                channelName:'',
                channelLevel:'',
                channelLevels:[{label:'一级',value:1},{label:'二级',value:2}],
                address:'',
                contacter:'',
                phone:'',
                email:'',
                inviteCode:'',
                status:'0',
                introduce:'',
                note:'',
                endTime:'',
                startTime:'',
            },
            rules:{
                channelName: [
                    { min: 3 ,max: 25, message: '3个汉字≤名称≤25个汉字', trigger: 'blur' },
                    { required: true, message: '请输入卡券名称', trigger: 'blur' }
                ],
                startTime: [
                    {required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                endTime: [
                    {required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                channelLevel: [
                    { required: true, message: '请选择渠道级别', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入渠道地址', trigger: 'blur' }
                ],
                contacter: [
                    {  required: true, message: '请输入联系人', trigger: 'blur' ,}
                ],
                phone: [
                    {   validator: checkPhone, required: true, trigger: 'blur' }
                ],
                // inviteCode: [
                //     { required: true, message: '请输入邀请码', trigger: 'blur' }
                // ],
                status: [
                    { required: true, message: '请选择账号状态', trigger: 'change' }
                ],
            },

        }
    },
    methods:{   
        annexSubmitUpload(){//上传附件
            this.loading=true
            let formData=new FormData()
            this.formData.contractAnnex.forEach(item=>{
                if(item.size>=104857600){
                    this.$message.error('文件过大!')
                    this.loading=false
                    throw new Error('文件过大!重新上传!')
                }
                formData.append('files',item.raw)
            })
            this.formData.annexId=[]
            uploadFiles(formData).then(res=>{
                this.loading=false
                if(res.data.code==1){
                    res.data.body.forEach(item=>{
                        this.formData.annexId.push(item.id)
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
            this.formData.contractAnnex=fileList
        },
        handleRemove(file,fileList) {
            this.formData.contractAnnex=fileList
        },
        channel(){
            let data={
                chName:this.formData.channelName,
                chLevel:this.formData.channelLevel,
                chAddress:this.formData.address,
                chContacts:this.formData.contacter,
                chPhone:this.formData.phone,
                chEmail:this.formData.email,
                inviteCode:this.formData.inviteCode,
                chState:this.formData.status,
                operateUser:this.formData.ownContact,
                contractStaTime:this.formData.startTime,
                contractEndTime:this.formData.endTime,
                contractAnnex:this.formData.annexId.toString(),
                chIntroduce:this.formData.introduce,
                chRemarks:this.formData.note,
                uid:JSON.parse(window.sessionStorage.getItem('user')).uid
            }
            this.$refs.formData.$children.forEach((item,index)=>{
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
                    this.$router.push('/channelList')
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        }
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
    .createChannel{
        background: white;
        padding: .1rem;
        margin-top: .1rem;
        .btn{
            font-size: .16rem;
            text-align: center;
        }
    }
</style>