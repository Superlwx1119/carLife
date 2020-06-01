<template>
  <div class="channelManagement" v-loading="loading">
      <transition v-if="showRoute" name="el-fade-in" mode="out-in">
        <router-view ></router-view>
      </transition>
      <div v-else>
        <el-form label-width="0.8rem" class="form" :inline="true">
            <el-form-item label="关键字:">
              <el-input size="small" v-model="formData.keyword" placeholder="渠道名称"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button size="small" type="primary" @click="channel">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="channelList">
              <h2>数据列表 <el-button type="primary" @click="createChannel" style="float:right" size="small">创建渠道</el-button></h2>
              <el-table
              border
              :data="tableData"
              size="small"
              height="5.6rem"
              style="width: 100%;margin:.1rem">
              <el-table-column
                  align="center"
                  min-width="110px"
                  prop="chName"
                  label="渠道名称">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="chLevel"
                  label="渠道级别">
                  <template slot-scope="scope">
                    <p>{{scope.row.chLevel|level}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="chContacts"
                  label="联系人">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="chPhone"
                  label="绑定手机号">
              </el-table-column>
              <!-- <el-table-column
                  align="center"
                  prop="address"
                  label="已创建卡包数">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="address"
                  label="已派发卡券数">
              </el-table-column> -->
              <el-table-column
                  align="center"
                  prop="chState"
                  label="帐号状态">
                  <template slot-scope="scope">
                  <p>{{scope.row.chState|chState}}</p>
                  </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="insTime"
                  min-width="110px"
                  label="创建时间">
                  <template slot-scope="scope">
                  <p>{{scope.row.insTime|time}}</p>
                  </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                  <el-button type="text" @click="showChannel(scope.row.chid)" size="mini">查看</el-button>
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
import { formattingTime } from '@/api/public.js'
import { channel,delChannel } from '@/api/api.js'
export default {
  name:'channelManagement',
    filters:{
      time(val){
        return formattingTime(val)
      },
      level(val){
        if(val==1){
          return '一级'
        }else{
          return '二级'
        }
      },
      chState(val){
        if(val==1){
          return '停用'
        }else{
          return '启用'
        }
      }
    },
    data(){
      return{
        loading:false,
        dialogVisible:false,
        showRoute:false,
        formData:{
          keyword:'',
        },
        tableData:[1],
        page:1,
        pageSize:20,
        total:0
      }
    },
    watch:{
        $route(to,from){
            if(from.path=='/channelDetail'||from.path=='/createChannel'){
                this.showRoute=false
                this.channel()
            }
        }
    },
    methods:{
      handleSizeChange(val) {//每页
          this.size=val
          this.channel()
        },
        handleCurrentChange(val) {//翻页
          this.pageSize=val
          this.channel()
        },
      channel(){//渠道列表
        let data={
          keyWord:this.formData.keyword,
          page:this.page-1,
          pageSize:this.pageSize
        }
        this.loading=true
        channel(data).then(res=>{
          this.loading=false
          this.tableData=res.data.body.data
          this.total=res.data.body.count
        })
      },
      showChannel(id){
        this.showRoute=true
        this.$router.push('/channelDetail?id='+id)
      },
      createChannel(){
        this.showRoute=true
        this.$router.push('/createChannel')
      }
    },
    mounted(){
      this.channel()
    }
}
</script>

<style lang="less" scoped>
  .channelManagement{
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
      .channelList{
        background: white !important;
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