<template>
  <div class="businessList">
      <transition v-if="showCouPonRoute" name="el-fade-in" mode="out-in">
        <router-view ></router-view>
      </transition>
      <div v-else>
        <el-form label-width="0.8rem" class="form" :inline="true">
          <el-form-item label="关键字:">
          <el-input size="small" clearable v-model="formData.keyword" placeholder="商户名称或联系人"></el-input>
          </el-form-item>
          <!-- <el-form-item label="卡券类型:">
          <el-select size="small" v-model="formData.couponType" placeholder="请选择">
              <el-option
              v-for="item in formData.couponTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
          </el-form-item> -->
          <el-form-item >
          <el-button size="small" type="primary" @click="sreach">查询</el-button>
          </el-form-item>
      </el-form>
      <div class="businessList" v-loading="loading">
          <h2>数据列表 <el-button type="primary" @click="createBusiness" style="float:right" size="small">创建商户</el-button></h2>
            <el-table
            border
            height="5.6rem"
            :data="tableData"
            size="small"
            style="width: 98%;margin:.1rem">
            <el-table-column
                align="center"
                prop="name"
                label="商户名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="companyName"
                label="主体名称">
            </el-table-column>
            <el-table-column
                align="center"
                show-overflow-tooltip
                prop="location"
                label="商户地址">
            </el-table-column>
            <el-table-column
                align="center"
                min-width="90px"
                prop="phone"
                label="商户电话">
            </el-table-column>
            <el-table-column
                align="center"
                prop="contacts"
                label="联系人">
            </el-table-column>
            <el-table-column
                align="center"
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="serviceStatus"
                label="营业状态">
                <template slot-scope="scope">
                  <p>{{scope.row.serviceStatus|serviceStatus}}</p>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="collStatus"
                label="合作状态">
                <template slot-scope="scope">
                  <p>{{scope.row.collStatus|collStatus}}</p>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="supCardNum"
                label="支持卡券数">
            </el-table-column>
            <el-table-column
                align="center"
                prop="operateUser"
                label="联络人">
            </el-table-column>
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
                  <el-button type="text" @click="showBusiness(scope.row.id)" size="mini">查看</el-button>
                  <el-button type="text" @click="delBusiness(scope.row.id)" size="mini">删除</el-button>
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
      
  </div>
</template>

<script>
import { store , delStore } from '@/api/api.js'
import { formattingTime } from '@/api/public.js'
export default {
    name:'businessList',
    filters:{
      time(val){
        return formattingTime(val)
      },
      collStatus(val){
        if(val==0){
          return '合作'
        }else{
          return '终止'
        }
      },
      serviceStatus(val){
        if(val==0){
          return '营业'
        }else{
          return '歇业'
        }
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
        tableData:[1],
        page:1,
        pageSize:20,
        total:0
      }
    },
    watch:{
        $route(to,from){
            if(from.path=='/createBusiness'||from.path=='/businessDetail'){
                this.showCouPonRoute=false
                this.store()
            }
        }
    },
    methods:{
      handleSizeChange(val) {//每页
        this.pageSize=val
        this.store()
      },
      handleCurrentChange(val) {//翻页
        this.page=val
        this.store()
      },
      showBusiness(id){
        this.showCouPonRoute=true
        this.$router.push('/businessDetail?id='+id)
      },
      createBusiness(){//创建商户
        this.showCouPonRoute=true
        this.$router.push('/createBusiness')
      },
      delBusiness(id){
        this.$confirm('此操作将永久删除该商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
            uid:JSON.parse(window.sessionStorage.getItem('user')).uId,
            storeIds:id
          }
          delStore(data).then(res=>{
            if(res.data.code==1){
                this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
                });
                this.store()
            }else{
                this.$notify.error({
                title: '错误',
                message: res.data.msg,
                });
            }
          })
        })
      },
      sreach(){
        this.pageSize=20,
        this.page=1
        this.store()
      },
      store(){
        this.loading=true
        let data={
          keyName:this.formData.keyword,
          pageSize:this.pageSize,
          page:this.page-1
        }
        store(data,true).then(res=>{
          this.loading=false
          if(res.data.code==1){
              this.tableData=res.data.body.data
            this.total=res.data.body.count
          }
        })
      }
    },
    mounted(){
      this.store()
      if(window.location.hash.substring(1,window.location.hash.length)=='/createBusiness'||window.location.hash.substring(1,window.location.hash.indexOf('?'))=='/businessDetail'){
        this.showCouPonRoute=true
      }
    }
}
</script>

<style lang="less" scpoed>
  .businessList{
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
    .businessList{
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