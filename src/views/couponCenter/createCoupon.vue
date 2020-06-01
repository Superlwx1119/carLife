<template>
    <div class="createCoupon" v-loading="loading">
        <el-row  type="flex">
            <el-col :span="11">
                <el-form  :model="ruleForm"  ref="leftForm" :rules="rules" label-width="120px">
                    <el-form-item label="卡券类型:" prop="couponType">
                        <el-select clearable v-model="ruleForm.couponType" placeholder="请选择">
                            <el-option
                            v-for="item in ruleForm.couponTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡券名称" prop="couponName">
                        <el-input clearable v-model="ruleForm.couponName"></el-input>
                    </el-form-item>
                    <el-form-item label="生效时间" prop="effectTime">
                        <el-date-picker
                        v-model="ruleForm.effectTime"
                        default-time="00:00:00"
                        type="datetime"
                        value-format="yyyyMMddHHmmss"
                        placeholder="选择生效时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="过期时间" prop="expirationTime">
                        <el-date-picker
                        v-model="ruleForm.expirationTime"
                        value-format="yyyyMMddHHmmss"
                        default-time="23:59:59"
                        type="datetime"
                        placeholder="选择过期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="终端价格" prop="terminalPrice">
                        <el-input clearable v-model="ruleForm.terminalPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="需要佐证数量" prop="evidence">
                        <el-input clearable v-model.number="ruleForm.evidence"></el-input>
                    </el-form-item>
                    <el-form-item label="卡券说明" prop="couponNote">
                        <el-input clearable type="textarea" maxlength="100" :rows="4" show-word-limit v-model="ruleForm.couponNote"></el-input>
                    </el-form-item>
                    <el-form-item label="车主说明" prop="carOwnerNote">
                        <el-input clearable type="textarea" maxlength="100" :rows="4" show-word-limit v-model="ruleForm.carOwnerNote"></el-input>
                    </el-form-item>
                    <el-form-item label="商户说明" prop="businessNote">
                        <el-input clearable type="textarea" maxlength="100" :rows="4" show-word-limit v-model="ruleForm.businessNote"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="13">
                <el-form status-icon :model="ruleForm"  ref="rightForm" :rules="rules" label-width="120px">
                    <el-form-item label="适用渠道" prop="channels">
                        <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            :button-texts="['不适用', '适用']"
                            filter-placeholder="请输入渠道名称"
                            v-model="ruleForm.channels"
                            @change="changTransfer"
                            :titles="['全部渠道', '适用渠道']"
                            :data="channelLabel">
                        </el-transfer>
                        <!-- <el-checkbox :indeterminate="channelIndeterminate" v-model="ruleForm.channelCheckAll" @change="channelCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="ruleForm.channelsOptions" @change="channelchannelsChange">
                            <el-checkbox v-for="(item,index) of channelLabel" :value="item.chid" :label="item" :key="index">{{item}}</el-checkbox>
                        </el-checkbox-group> -->
                    </el-form-item>
                    <el-form-item label="适用商户" prop="stores">
                        <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            :button-texts="['不适用', '适用']"
                            filter-placeholder="请输入商户名称"
                            v-model="ruleForm.stores"
                            @change="changTransfer"
                            :titles="['全部商户', '适用商户']"
                            :data="storeLabel">
                        </el-transfer>
                        <!-- <el-checkbox :indeterminate="storeIndeterminate" v-model="ruleForm.storeCheckAll" @change="storeCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="ruleForm.storesOptions" @change="storesOptionsChange">
                            <el-checkbox v-for="(item,index) of storeLabel" :label="item" :key="index">{{item}}</el-checkbox>
                        </el-checkbox-group> -->
                    </el-form-item>
                    <el-form-item label="卡券背景类型" prop="typeBg">
                        <el-select v-model="ruleForm.typeBg">
                            <el-option v-for="(item,index) of ruleForm.typeBgs" :key="index" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-form>
            </el-col>
        </el-row>
        <div class="btn">
            <el-button size="small" type="primary" @click="cardClass">创建</el-button>
            <el-button size="small" @click="$router.push('/couponList')">取消</el-button>
        </div>
        <div class="space">

        </div>
    </div>
</template>
<script>
 import { channel,store,cardClass,getDicts } from '@/api/api.js'
  export default {
    name:'createCoupon',
    data() {
        var checkPrice = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('价格不能为空'));
            }
            if(!(/^((\d+)|([0].\d{0,2}|(\d+.\d{0,2})))$/.test(value))){ 
                callback(new Error('价格只能为数字且保留两位小数'));
                return false; 
            } else{
                callback();
            }
        };
      return {
        transferData:[],
        transfer: [],
        filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
        },
        loading:false,
        channels: [],
        channelLabel: [],
        channelOption:[],
        channelIndeterminate: false,
        stores: [],
        storeLabel: [],
        storeOption:[],
        storeIndeterminate: false,
        ruleForm:{
            channelCheckAll: true,
            storeCheckAll: true,
            couponType:'',
            couponTypes:[],
            couponName:'',
            effectTime:'',
            expirationTime:'',
            terminalPrice:'',
            evidence:'',
            channels:[],
            stores:[],
            couponNote:'',
            carOwnerNote:'',
            businessNote:'',
            typeBg:'',
            typeBgs:[],
            storesOptions:[],
            channelsOptions:[],
            channels:[],
            stores:[],
        },
        rules: {
            couponName: [
                { max: 10, message: '名称最多10个字符', trigger: 'blur' },
                { required: true, message: '请输入卡券名称', trigger: 'blur' }
            ],
            couponType: [
                {required: true, message: '请选择卡券类型', trigger: 'change' }
            ],
            effectTime: [
                { required: true, message: '请选择生效时间', trigger: 'change' }
            ],
            expirationTime: [
                { required: true, message: '请选择过期时间', trigger: 'change' }
            ],
            // typeBg: [
            //     { required: true, message: '请选择卡券背景', trigger: 'change' }
            // ],
            channels: [
                { required: true, type:'array', message: '请选择适用渠道', trigger: 'change' }
            ],
            stores: [
                { required: true, type:'array', message: '请选择适用商户', trigger: 'change' }
            ],
            terminalPrice: [
                // { type: 'number', message: '终端价格必须为数字值'},
                { required: true,  validator: checkPrice , trigger: 'blur' }
            ],
            evidence: [
                { type: 'number', message: '数量必须为数字值'},
                { required: true, message: '请填写佐证数量', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
        changTransfer(val){
            console.log(val)
            console.log(this.ruleForm.channels)
        },
        storeCheckAllChange(val){
            this.ruleForm.storesOptions = val ? this.storeLabel : [];
            this.storeIndeterminate = false;
        },
        channelCheckAllChange(val) {
            this.ruleForm.channelsOptions = val ? this.channelLabel : [];
            this.channelIndeterminate = false;
        },
        storesOptionsChange(value) {
            let checkedCount = value.length;
            this.ruleForm.storeCheckAll = checkedCount === this.storeOption.length;
            this.storeIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.storesOptions.length;
        },
        channelchannelsChange(value) {
            let checkedCount = value.length;
            this.ruleForm.channelCheckAll = checkedCount === this.channelOption.length;
            this.channelIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.channelsOptions.length;
        },
      getDicts(){//字典
            getDicts({itemType:'cardType'}).then(res=>{
                for(let i in res.data.body){
                    let json={
                        label:res.data.body[i],
                        value:i
                    }
                    this.ruleForm.couponTypes.push(json)
                }
            })
        },
      getSelect(){
          store({},true).then(res=>{//商户列表
              if(res.data.code==1){
                  this.storeOption=res.data.body.data
                  this.storeOption.forEach(item=>{
                      this.ruleForm.storesOptions.push(item.name)
                    //   this.storeLabel.push(item.name)
                      item.label=item.name
                      item.key=item.id
                      this.storeLabel.push(item)
                  })
              }
          })
          channel({}).then(res=>{//渠道列表 
              if(res.data.code==1){
                  this.channelOption=res.data.body.data
                  this.channelOption.forEach(item=>{
                      this.ruleForm.channelsOptions.push(item.chName)
                      item.label=item.chName
                      item.key=item.chid
                    //   this.channelLabel.push(item.chName)
                      this.channelLabel.push(item)
                  })
              }
          })
      },
      cardClass(){//保存卡券
        // this.ruleForm.stores=[]
        // this.ruleForm.channels=[]
        // this.ruleForm.storesOptions.forEach(s=>{
        //     this.storeOption.forEach(v=>{
        //         if(s==v.name){
        //             this.ruleForm.stores.push(v.id)
        //         }
        //     })
        // })
        // this.ruleForm.channelsOptions.forEach(s=>{
        //     this.channelOption.forEach(v=>{
        //         if(s==v.chName){
        //             this.ruleForm.channels.push(v.chid)
        //         }
        //     })
        // })
        let finish=false
        this.$refs.leftForm.$children.forEach((item,index)=>{
            if(item.label=='需要佐证数量'&&item.fieldValue=='0'){

            }else{
                if(item.isRequired&&item.fieldValue==''){
                    this.$message.error(item.label+'不能为空!');
                    finish=true;
                    throw new Error('表单验证错误')
                }
            }
            
        })
        if(finish)return
        this.$refs.rightForm.$children.forEach((item,index)=>{
        if(item.isRequired&&item.fieldValue==''){
                this.$message.error(item.label+'不能为空!');
                finish=true;
                throw new Error('表单验证错误')
            }
        })
        if(finish)return
        let data={
            name:this.ruleForm.couponName,
            staTime:this.ruleForm.effectTime,
            expTime:this.ruleForm.expirationTime,
            price:this.ruleForm.terminalPrice,
            needProveNum:this.ruleForm.evidence,
            cardExplain:this.ruleForm.couponNote,
            userExplain:this.ruleForm.carOwnerNote,
            merchantExplain:this.ruleForm.businessNote,
            type:this.ruleForm.couponType,
            applyChannel:this.ruleForm.channels.toString(),
            applyStore:this.ruleForm.stores.toString(),
            uid:JSON.parse(window.sessionStorage.getItem('user')).uid
        }
        this.loading=true
        cardClass(data,'edit').then(res=>{
            this.loading=false
            if(res.data.code==1){
                this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
                });
                this.$router.push('/couponList')
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
        this.getSelect()
        this.getDicts()
    },
    mounted(){
        // this.getSelect()
    }
  };
</script>

<style lang="less" scoped>
    .createCoupon{
        margin-top: .1rem;
        background: white;
        padding: .1rem;
        overflow-y: auto;
        height: 100vh;
        .btn{
            margin: 0 auto;
            text-align: center;
            font-size: .16rem;
        }
        .space{
            height: 1rem;
        }
    }
</style>