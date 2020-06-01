<template>
  <div class="couponMsg">
        <el-tabs v-model="activeName" type="card" @tab-click="handlclick" class="tabs" >
            <el-tab-pane label="基本信息" name="first" >
                <div class="baseMsg">
                    <el-row  type="flex">
                        <el-col :span="11">
                            <el-form  :model="ruleForm" ref="leftForm" :rules="rules" label-width="120px">
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
                                    value-format="yyyyMMddHHmmss"
                                    default-time="00:00:00"
                                    type="datetime"
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
                                <!-- <el-form-item label="商户说明" prop="businessNote">
                                    <el-input clearable type="textarea" maxlength="100" :rows="4" show-word-limit v-model="ruleForm.businessNote"></el-input>
                                </el-form-item> -->
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
                        <el-button size="small" type="primary" @click="cardClass">保存</el-button>
                        <el-button size="small" @click="$router.push('/couponList')">取消</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="渠道合作价格" name="second">
                <div class="channelPrice">
                    <el-table
                    :data="channelData"
                    border
                    style="width: 30%">
                    <el-table-column
                        prop="channelLevel"
                        label="渠道级别"
                        align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.channelLevel|level}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="channelName"
                        label="合作渠道"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="channelPrices"
                        label="合作价格"
                        align="center">
                    </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商户合作价格" name="third">
                <div class="businessPrice">
                    <el-table
                    :data="businessData"
                    border
                    style="width: 30%">
                    <el-table-column
                        prop="storeName"
                        label="合作商户"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="storePrices"
                        label="合作价格"
                        align="center">
                    </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import { channel,store,cardClass,cardChannel,cardStore,getDicts } from '@/api/api.js'
import { getQueryVariable } from '@/api/public.js'
export default {
    name:'couponMsg',
    filters:{
        level(val){
            if(val==1){
            return '一级'
            }else{
            return '二级'
            }
        },
    },
    data(){
        var checkPrice = (rule, value, callback) => {
            console.log(rule)
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
        return{
            filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
            },
            activeName:'first',
            channelData:[],
            businessData:[],
            ruleForm:{
                channelCheckAll: true,
                storeCheckAll: true,
                couponName:'',
                couponType:'',
                couponTypes:[],
                effectTime:'',
                expirationTime:'',
                terminalPrice:'',
                evidence:'',
                couponNote:'',
                carOwnerNote:'',
                businessNote:'',
                storesOptions:[],
                channelsOptions:[],
                stores:[],
                channels:[]
            },
            channels: [],
            channelLabel: [],
            channelOption:[],
            channelIndeterminate: false,
            stores: [],
            storeLabel: [],
            storeOption:[],
            storeIndeterminate: false,
            rules: {
                couponType: [
                    {required: true, message: '请选择卡券类型', trigger: 'change' }
                ],
                couponName: [
                    { max: 10, message: '名称最多10个字符', trigger: 'blur' },
                    { required: true, message: '请输入卡券名称', trigger: 'blur' }
                ],
                effectTime: [
                    {required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                expirationTime: [
                    {required: true, message: '请选择过期时间', trigger: 'change' }
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
                    { validator:checkPrice , required: true, trigger: 'blur' }
                ],
                evidence: [
                    { type: 'number', message: '数量必须为数字值'},
                    { required: true, message: '请填写佐证数量', trigger: 'blur' }
                ]
            }
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
                    this.ruleForm.couponTypes.push(json)
                }
            })
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
        handlclick(){
            if(this.activeName=='second'){
                cardChannel({id:getQueryVariable('id')}).then(res=>{
                    if(res.data.code==1){
                        this.channelData=res.data.body
                    }
                })
            }else if(this.activeName=='third'){
                cardStore({id:getQueryVariable('id')}).then(res=>{
                    if(res.data.code==1){
                        this.businessData=res.data.body
                    }
                })
            }
        },
        changTransfer(val){
            console.log(val)
            console.log(this.ruleForm.channels)
        },
        getCard(){//卡券详情
            cardClass({id:getQueryVariable('id')}).then(res=>{
                if(res.data.code==1){
                    this.ruleForm.couponType=res.data.body.card.type
                    this.ruleForm.couponName=res.data.body.card.name
                    this.ruleForm.effectTime=res.data.body.card.staTime
                    this.ruleForm.expirationTime=res.data.body.card.expTime
                    this.ruleForm.terminalPrice=res.data.body.card.price
                    this.ruleForm.evidence=res.data.body.card.needProveNum
                    this.ruleForm.couponNote=res.data.body.card.cardExplain
                    this.ruleForm.carOwnerNote=res.data.body.card.userExplain
                    this.ruleForm.businessNote=res.data.body.card.merchantExplain
                    this.storeOption=res.data.body.store
                    this.storeOption.forEach(item=>{
                        item.label=item.storeName
                        item.key=item.storeId
                        if(item.sisVisible==0){
                            this.ruleForm.storesOptions.push(item.storeName)
                            this.ruleForm.stores.push(item.storeId)
                        }else{
                            this.ruleForm.storeCheckAll=false
                        }
                        // this.storeLabel.push(item.storeName)
                        
                        this.storeLabel.push(item)
                    })
                    this.channelOption=res.data.body.channel
                    this.channelOption.forEach(item=>{
                        item.label=item.channelName
                        item.key=item.channelId
                        if(item.cisVisible==0){
                            this.ruleForm.channelsOptions.push(item.channelName)
                            this.ruleForm.channels.push(item.channelId)
                        }else{
                            this.ruleForm.channelCheckAll=false
                        }
                        // this.channelLabel.push(item.channelName)
                        
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
            //         if(s==v.storeName){
            //             this.ruleForm.stores.push(v.storeId)
            //         }
            //     })
            // })
            // this.ruleForm.channelsOptions.forEach(s=>{
            //     this.channelOption.forEach(v=>{
            //         if(s==v.channelName){
            //             this.ruleForm.channels.push(v.channelId)
            //         }
            //     })
            // })
            let finish=false
            this.$refs.leftForm.$children.forEach((item,index)=>{
                if(item.isRequired&&item.fieldValue==''){
                    this.$message.error(item.label+'不能为空!');
                    finish=true;
                    throw new Error('表单验证错误')
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
                id:getQueryVariable('id'),
                staTime:this.ruleForm.effectTime,
                expTime:this.ruleForm.expirationTime,
                type:this.ruleForm.couponType,
                price:this.ruleForm.terminalPrice,
                needProveNum:this.ruleForm.evidence,
                cardExplain:this.ruleForm.couponNote,
                userExplain:this.ruleForm.carOwnerNote,
                merchantExplain:this.ruleForm.businessNote,
                applyChannel:this.ruleForm.channels.toString(),
                applyStore:this.ruleForm.stores.toString(),
                uid:JSON.parse(window.sessionStorage.getItem('user')).uid
            }
            cardClass(data,'edit').then(res=>{
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
        this.getDicts()
    },
    mounted(){
        this.getCard()
    }
}
</script>

<style lang="less" scoped>
    .couponMsg{
        margin-top: .1rem;
        background: white;
        padding: .1rem;
        .btn{
            margin: 0 auto;
            height: 3rem;
            text-align: center;
        }
        .tabs{
            font-size: .2rem !important;
        }
        .baseMsg,.channelPrice,.businessPrice{
            border: 1px solid #eee;
            border-top: none;
            overflow-y: auto;
            height: 100vh;
            padding: .1rem;
        }
    }
</style>