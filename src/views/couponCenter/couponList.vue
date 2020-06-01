<template>
  <div class="couponList">
      <transition  name="fade" mode="in-out">
        <router-view v-if="showCouPonRoute"></router-view>
      </transition>
      <transition  name="fade" mode="out-in">
        <div v-if="!showCouPonRoute" v-loading="loading">
          <el-form label-width="0.8rem" class="form" :inline="true">
              <el-form-item label="关键字:">
              <el-input size="small" clearable v-model="formData.keyword" placeholder="请输入卡券代码或名称"></el-input>
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
              <el-form-item >
              <el-button size="small" type="primary" @click="cardClass">查询</el-button>
              </el-form-item>
          </el-form>
          <div class="couponList">
              <h2>数据列表 <el-button type="primary" @click="createCoupon" style="float:right" size="small">创建卡券</el-button></h2>
              <el-table
              border
              size="small"
              :data="tableData"
              height="5.6rem"
              style="width: 100%;margin:.1rem">
              <el-table-column
                  align="center"
                  prop="code"
                  label="卡券代码">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="typeName"
                  label="卡券类型">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="name"
                  label="卡券名称">
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="staTime"
                  label="生效时间">
                  <template slot-scope="scope">
                    <p>{{scope.row.staTime|date}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="expTime"
                  label="过期时间">
                  <template slot-scope="scope">
                    <p>{{scope.row.expTime|date}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="price"
                  label="终端价格">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="needProveNum"
                  label="所需佐证数">
              </el-table-column>
              <!-- <el-table-column
                  align="center"
                  prop="address"
                  label="已派发数量">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="address"
                  label="使用数量">
              </el-table-column> -->
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="insTime"
                  label="创建时间">
                  <template slot-scope="scope">
                    <p>{{scope.row.insTime|time}}</p>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                  <el-button type="text" @click="showCoupon(scope.row.id)" size="mini">查看</el-button>
                  </template>
              </el-table-column>
              </el-table>
              <el-pagination
                style="float:right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20 ,100, 200, 300, 400]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </div>
        </div>
      </transition>
      
  </div>
</template>

<script>
import { cardClass , getDicts} from '@/api/api.js'
import { formattingTime ,formattingYear } from '@/api/public.js'
export default {
    name:"couponList",
    filters:{
      time(val){
        return formattingTime(val)
      },
      date(val){
        return formattingYear(val)
      }
    },
    data(){
      return{
        loading:false,
        showCouPonRoute:false,
        formData:{
          keyword:'',
          couponTypes:[],
          couponType:''
        },
        page:1,
        size:20,
        total:0,
        tableData:[]
      }
    },
    watch:{
        $route(to,from){
            // console.log(this.$route)
            if(from.path=='/couponMsg'||from.path=='/createCoupon'){
                this.showCouPonRoute=false
                this.cardClass()
            }
        }
    },
    methods:{
        showCoupon(id){//查看卡券
            this.showCouPonRoute=true
            this.$router.push('/couponMsg?id='+id)
        },
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
        createCoupon(){
          this.showCouPonRoute=true
          this.$router.push('/createCoupon')
        },
        handleSizeChange(val) {//每页
          this.size=val
          this.cardClass()
        },
        handleCurrentChange(val) {//翻页
          this.page=val
          this.cardClass()
        },
        cardClass(){
          let data={
            cardType:this.formData.couponType,
            keyName:this.formData.keyword,
            page:this.page-1,
            pageSize:this.size
          }
          this.loading=true
          cardClass(data,'show').then(res=>{
            this.loading=false
            this.tableData=res.data.body.data
            this.total=res.data.body.count
          })
        }
    },
    created(){
      this.getDicts()
    },
    mounted(){
      this.cardClass()
      if(window.location.hash.substring(1,window.location.hash.length)=='/createCoupon'||window.location.hash.substring(1,window.location.hash.indexOf('?'))=='/couponMsg'){
        this.showCouPonRoute=true
      }
    }
}
</script>

<style lang="less" scoped>
  .couponList{
    height: 100vh;
    overflow: hidden;
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