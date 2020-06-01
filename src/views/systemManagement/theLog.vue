<template>
  <div class="theLog">
    <el-form label-width="0.8rem" class="form" :inline="true">
        <el-form-item label="操作时间" prop="businessHours">
            <el-date-picker
                v-model="formData.times"
                size="small"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
        </el-form-item>
        <el-form-item label="操作人">
            <el-input placeholder="操作人" v-model="formData.person"></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
            <el-select size="small" v-model="formData.type" placeholder="请选择">
                <el-option
                v-for="item in formData.type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button size="small">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="logList">
        <el-table
              border
              size="small"
              :data="tableData"
              height="5.6rem"
              style="width: 100%;margin:.1rem">
              <el-table-column
                type="index"
                align="center"
                label=序号
                width="50">
                </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="insTime"
                  label="日期">
                  <template slot-scope="scope">
                    <p>{{scope.row.instime|time}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="id"
                  label="操作ID">
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="userName"
                  label="操作人">
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="typeName"
                  label="操作行为">
              </el-table-column>
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="content"
                  label="操作日志">
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
</template>

<script>
import { formattingTime ,formattingYear } from '@/api/public.js'
import { operateLogger } from  '@/api/api.js'
export default {
    name:'theLog',
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
            formData:{
                times:[],
                person:'',
                type:'',
                types:[{label:'删除',value:'0'},{label:'添加',value:'1'},{label:'修改',value:'2'}],
            },
            page:1,
            size:20,
            total:0,    
            tableData:[]
        }
    },
    methods:{
        handleSizeChange(val) {//每页
          this.size=val
          this.operateLogger()
        },
        handleCurrentChange(val) {//翻页
          this.page=val
          this.operateLogger()
        },
        operateLogger(){
            let data={
                etime:this.formData.times[1]?this.formData.times[1]:'',
                stime:this.formData.times[0]?this.formData.times[0]:'',
                page:this.page-1,
                pageSize:this.size,
                type:this.formData.type,
                userName:''
            }
            operateLogger(data).then(res=>{
                console.log(res.data)
                this.tableData=res.data.body.data
            })
        }
    },
    mounted(){
        this.operateLogger()
    }
}
</script>

<style lang="less" scoped>
    .theLog{
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
    }
</style>