<template>
  <div class="ownerList">
      <el-form class="form" :inline="true" label-width="100px">
        <el-form-item label="车牌号">
          <el-input type="text" size="small" clearable v-model="licenseno"></el-input>
        </el-form-item>
        <el-form-item label="车主姓名">
          <el-input type="text" size="small" clearable v-model="ownerName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" size="small" clearable v-model="ownerPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="carUser">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table" v-loading="loading">
        <el-table
          border
          :data="tableData"
          height="6.6rem"
          size="small"
          style="width: 98%;margin:.1rem">
          <!-- <el-table-column
            prop="avatar"
            align="center"
            label="头像">
          </el-table-column> -->
          <el-table-column
            prop="nickName"
            align="center"
            label="微信昵称">
          </el-table-column>
          <el-table-column
            prop="ownerName"
            align="center"
            label="车主姓名">
          </el-table-column>
          <el-table-column
            prop="ownerPhone"
            align="center"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="licenseno"
            align="center"
            label="车牌">
          </el-table-column>
          <el-table-column
            prop="visitNum"
            align="center"
            label="访问次数">
          </el-table-column>
          <el-table-column
            prop="notUsedNum"
            align="center"
            label="未用卡券数">
          </el-table-column>
          <el-table-column
            prop="usedNum"
            align="center"
            label="已用卡券数">
          </el-table-column>
          <el-table-column
            prop="overdueNum"
            align="center"
            label="过期卡券数">
          </el-table-column>
          <el-table-column
            prop="insTime"
            min-width="110px"
            align="center"
            label="注册时间">
            <template slot-scope="{row}">
                <p>{{row.insTime|time}}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="{row}">
                <el-button type="text" @click="showCoupon(row.ownerPhone)"  size="mini">查看卡券</el-button>
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
        <el-dialog
        title="车主卡券详情"
        :visible.sync="dialogVisible"
        width="70%">
        <el-table
          border
          v-loading="dialogLoading"
          :data="detailData"
          size="small"
          height="6rem"
          style="width: 100%">
          <el-table-column
            prop="cardCode"
            min-width="120px"
            align="center"
            label="卡券编号">
          </el-table-column>
          <el-table-column
            prop="cardTypeName"
            align="center"
            label="卡券类型">
          </el-table-column>
          <el-table-column
            prop="cardName"
            align="center"
            label="卡券名称">
          </el-table-column>
          <el-table-column
            prop="cardStaTime"
            min-width="110px"
            align="center"
            label="生效时间">
            <template slot-scope="{row}">
                <p>{{row.cardStaTime|date}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="cardExpTime"
            min-width="110px"
            align="center"
            label="过期时间">
            <template slot-scope="{row}">
                <p>{{row.cardExpTime|date}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="channelName"
            align="center"
            label="派发渠道">
          </el-table-column>
          <el-table-column
            prop="sendTime"
            min-width="110px"
            align="center"
            label="派发时间">
            <template slot-scope="{row}">
                <p>{{row.sendTime|time}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="cardStatus"
            align="center"
            label="卡券状态">
            <template slot-scope="{row}">
                <p>{{row.cardStatus|status}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="useStoreName"
            align="center"
            label="扫码商户">
          </el-table-column>
        </el-table>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import { carUser , carUserCards } from '@/api/api.js'
import { formattingTime , formattingYear } from '@/api/public.js'
export default {
    name:'ownerList',
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
    },
    data(){
        return{
            dialogLoading:false,
            loading:false,
            dialogVisible:false,
            licenseno:'',
            ownerPhone:'',
            ownerName:'',
            tableData:[],
            detailData:[],
            pageSize:20,
            page:1,
            total:0
        }
    },
    methods:{
        showCoupon(ownerPhone){
            this.dialogVisible=true
            this.dialogLoading=true
            carUserCards({ownerPhone:ownerPhone}).then(res=>{
              this.dialogLoading=false
              if(res.data.code==1){
                this.detailData=res.data.body
              }
            })
        },
        handleSizeChange(val) {//每页
          this.pageSize=val
          this.carUser()
        },
        handleCurrentChange(val) {//翻页
          this.page=val
          this.carUser()
        },
        carUser(){//车主列表
          let data={
            licenseno:this.licenseno,
            ownerPhone:this.ownerPhone,
            ownerName:this.ownerName,
            page:this.page-1,
            pageSize:this.pageSize
          }
          this.loading=true
          carUser(data).then(res=>{
            this.loading=false
            if(res.data.code==1){
              this.tableData=res.data.body.data
              this.total=res.data.body.count
            }
          })
        }
    },
    mounted(){
      this.carUser()
    }
}
</script>

<style lang='less' scoped>
    .ownerList{
      background: white;
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
        .tabel{
            margin: .1rem;
        }
    }
</style>