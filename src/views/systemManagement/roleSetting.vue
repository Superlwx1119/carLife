<template>
  <div class="roleSetting">
      <el-form class="form" :inline="true" label-width="80px">
          <el-form-item label="关键字">
              <el-input type="text" size="small" v-model="formData.keyword"></el-input>
          </el-form-item>
          <el-form-item label="角色">
              <el-select size="small" v-model="formData.form">
                  <el-option v-for="(item,index) of formData.roles" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item >
              <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
      </el-form>
      <div class="tabel">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="部门">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="角色">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
      
  </div>
</template>

<script>
export default {
    name:'roleSetting',
    data(){
        return{
            formData:{
                keyword:'',
                role:'',
                roles:[]
            },
            tableData:[]
        }
    }
}
</script>

<style lang="less" scoped>
    .roleSetting{
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