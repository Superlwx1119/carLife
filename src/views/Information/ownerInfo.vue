<template>
  <div class="ownerInfo">
      <el-form class="form" :inline="true" label-width="100px">
        <el-form-item label="关键字">
          <el-input type="text" size="small" placeholder="车主名称或联系人" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item label="反馈时间">
          <el-date-picker
            v-model="time"
            size="small"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="suggestion">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table">
        <el-table
          border
          size="small"
          height="5.6rem"
          :data="tabelData"
          style="width: 100%">
          <el-table-column
            prop="name"
            align="center"
            width="200"
            label="反馈人">
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="center"
            width="200"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="content"
            align="center"
            show-overflow-tooltip
            label="反馈信息">
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
</template>

<script>
import { formattingTime ,formattingYear } from '@/api/public.js'
import { suggestion } from '@/api/api.js'
export default {
    name:'ownerInfo',
    filters:{
      time(val){
        return formattingTime(val)
      }
    },
    data(){
      return{
        keyword:'',
        time:'',
        page:1,
        pageSize:20,
        total:0,
        tabelData:[],
        loading:false,
      }
    },
    methods:{
        handleSizeChange(val) {//每页
          this.pageSize=val
          this.suggestion()
        },
        handleCurrentChange(val) {//翻页
          this.page=val
          this.suggestion()
        },
        suggestion(){
          let data={
            name:this.keyword,
            page:this.page-1,
            pageSize:this.pageSize,
            suggestTime:this.time.toString(),
            type:'0'
          }
          this.loading=true
          suggestion(data).then(res=>{
            this.loading=false
            if(res.data.code==1){
              this.tabelData=res.data.body.data
              this.total=res.data.body.count
            }
          })
        }
    },
    mounted(){
      this.suggestion()
    }
}
</script>

<style lang="less" scoped>
  .ownerInfo{
    background: white;
    font-size: .16rem;
    .table{
      margin: .1rem;
    }
  }
</style>