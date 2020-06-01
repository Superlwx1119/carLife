<template>
  <div class="userSeting">
      <el-form class="form" :inline="true" label-width="80px">
          <el-form-item label="关键字">
              <el-input type="text" size="small" v-model="formData.keyword"></el-input>
          </el-form-item>
          <el-form-item label="角色">
              <el-select size="small" v-model="formData.role">
                  <el-option v-for="(item,index) of formData.roles" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item >
              <el-button type="primary" size="small" @click="operateUser">查询</el-button>
          </el-form-item>
      </el-form>
      <div class="tabel" v-loading="loading">
          <el-table
            :data="tableData"
            border
            height="6.6rem"
            style="width: 100%">
            <el-table-column
                align="center"
                prop="depName"
                label="部门">
            </el-table-column>
            <el-table-column
                align="center"
                prop="userName"
                label="姓名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="roleName"
                label="角色">
            </el-table-column>
            <el-table-column
                align="center"
                prop="phone"
                label="手机">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="shouEdit(scope.row)">查看</el-button>
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
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form  label-width="100px">
            <el-form-item label="姓名">
                <el-input size="small" v-model="userData.userName"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select style="width:100%" size="small" v-model="userData.role">
                  <el-option v-for="(item,index) of formData.roles" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机">
                <el-input size="small" v-model="userData.phone"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button size="small" type="primary" @click="saveOperateUser">确定</el-button>
                <el-button size="small" @click="dialogVisible=false">取消</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
  </div>
</template>

<script>
import { operateUser } from '@/api/api.js'
export default {
    name:'userSeting',
    data(){
        return{
            dialogVisible:false,
            formData:{
                keyword:'',
                role:'',
                roles:[
                    {label:'游客',value:'0'},
                    {label:'审核员',value:'10'},
                    {label:'经理',value:'20'},
                    {label:'管理员',value:'30'},
                ]
            },
            userData:{
                userName:'',
                role:'',
                phone:'',
                id:'',
                uid:'',
            },
            tableData:[],
            page:1,
            pageSize:20,
            total:0,
            loading:false
        }
    },
    methods:{
        shouEdit(row){
            this.dialogVisible=true
            this.userData.userName=row.userName
            this.userData.role=row.role
            this.userData.phone=row.phone
            this.userData.id=row.id
            this.userData.uid=row.uid
        },
        handleSizeChange(val) {//每页
          this.size=val
          this.operateUser(true)
        },
        saveOperateUser(){//保存用户信息
            let data={
                userName:this.userData.userName,
                id:this.userData.id,
                uid:this.userData.uid,
                role:this.userData.role,
                phone:this.userData.phone
            }
            operateUser(data).then(res=>{
                if(res.data.code==1){
                    this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                    });
                    this.dialogVisible=false
                    this.operateUser(true)
                }else{
                    this.$notify.error({
                    title: '错误',
                    message: res.data.msg,
                    });
                }
            })
        },
        handleCurrentChange(val) {//翻页
          this.pageSize=val
          this.operateUser(true)
        },
        operateUser(type){
            let data={
                page:this.page-1,
                pageSize:this.pageSize,
                keyWord:this.formData.keyword,
                role:this.formData.role,
                // uid:JSON.parse(window.sessionStorage.getItem('user')).uid
            }
            this.loading=true
            operateUser(data,type).then(res=>{
                this.loading=false
                this.tableData=res.data.body.data
                this.total=res.data.body.count
            })
        }
    },
    mounted(){
        this.operateUser(true)
    }
}
</script>

<style lang="less" scoped>
    .userSeting{
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
            padding: .1rem;
        }
    }
</style>