<template>
  <div class="ownerAnalysis" v-loading="loading">
      <div class="content">
        <el-row type="flex">
            <el-col :span="12">
                <div class="timeCom">
                    <div id="loginNum" style="height:2.5rem;width:100%">
                    </div>
                    <div  class="radio">
                        <el-radio-group size="small" @change="changeLogin" v-model="loginTime">
                            <el-radio-button label="7天"></el-radio-button>
                            <el-radio-button label="30天"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="timeCom">
                    <div id="businessDue" style="height:2.5rem;width:100%"></div>
                    <!-- <div class="radio">
                        <el-radio-group size="small" @change="changeDue" v-model="dueTime">
                            <el-radio-button label="7天"></el-radio-button>
                            <el-radio-button label="30天"></el-radio-button>
                        </el-radio-group>
                    </div> -->
                </div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="12">
                <div class="timeCom">
                    <div class="radio" >
                        <el-select size="mini" @change="changeCarType" v-model="carType" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in carTypes"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-button type="primary" size="mini">查询</el-button> -->
                    </div>
                    <div id="carNum" style="height:4rem;width:100%"></div>
                    <!-- <div class="wave-progress"> 
                        <div class="inner">
                            <div class="water"></div>
                            <div class="tips">
                                <p>车辆占比</p>
                                <p class="persen">0%</p>
                            </div>
                        </div>
                    </div> -->
                </div>
                
            </el-col>
            <el-col :span="12">
                <div id="priceDistridution" style="height:4rem;width:100%"></div>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="12">
                <div id="yearDistridution" style="height:2.5rem;width:100%"></div>
            </el-col>
            <el-col :span="12">
                <div id="numDistridution" style="height:2.5rem;width:100%"></div>
            </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import  randomData from '@/assets/randomData.json'
import city from '@/assets/pca-code.json'
import { carAnalysisAllTable , getLoginStatistics , getExpireDateStatistics } from '@/api/api.js'
export default {
    name:'ownerAnalysis',
    data(){
        return{
            loading:false,
            today:'',
            carPrice:[],
            carNumer:0,
            loginTime:'7天',
            dueTime:"7天",
            cartotal:0,
            pinpai:'其他',
            carType:'',
            carTypes:[],
            carAreaCode:{},
            carNumber:0,
            login:{
                x:[],
                y:[]
            },
            dueNum:{
                x:[],
                y:[]
            },
            carYears:{
                x:[],
                y:[]
            }
        }
    },
    methods:{
        changeLogin(val){//查询登录人数
            let day=''
            if(val=='7天'){
                day=7
            }else{
                day=30
            }
            getLoginStatistics({day:day}).then(res=>{
                this.login.x=res.data.body.xlist
                this.login.y=res.data.body.ylist
                this.loginNum()
            })
        },
        loginNum(option){//登录人数
            let today=this.today 
            let arrX=[]
            let arrY=[]
            // randomData.login.forEach((item,index)=>{
            //     if(this.today==item.date){
            //         randomData.login.slice(index+1,index+1+option).forEach(item=>{
            //             arrX.unshift(item.date)
            //             arrY.unshift(item.random)
            //         })
            //         this.login.x=arrX
            //         this.login.y=arrY
            //     }
            // })
            let myChart = this.$echarts.init(document.getElementById('loginNum'))
            myChart.setOption({
                title: { text: '登录公众号人数'},
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: this.login.x
                },
                yAxis: {
                },
                series: [{
                    name: '登录人数',
                    type: 'line',
                    data: this.login.y,
                    itemStyle: {
                        color: '#1890FF',
                    },
                }]
            });
        },
        changeDue(val){//查询到期人数
            let day=''
            if(val=='7天'){
                day=7
            }else{
                day=30
            }
            getExpireDateStatistics({day:day}).then(res=>{
                this.dueNum.x=res.data.body.xlist
                this.dueNum.y=res.data.body.ylist
                this.businessDue()
            })
        },
        businessDue(option){//商业险到期人数
            let today=this.today 
            let arrX=[]
            let arrY=[]
            // randomData.due.forEach((item,index)=>{
            //     if(this.today==item.date){
            //         randomData.due.slice(index+1,index+1+option).forEach(item=>{
            //             arrX.unshift(item.date)
            //             arrY.unshift(item.random)
            //         })
            //         this.dueNum.x=arrX
            //         this.dueNum.y=arrY
            //     }
            // })
            let myChart = this.$echarts.init(document.getElementById('businessDue'))
            myChart.setOption({
                title: { text: '商业保险即将到期人数'},
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: this.dueNum.x
                },
                yAxis: {
                    
                },
                series: [{
                    name: '即将到期人数',
                    type: 'line',
                    data: this.dueNum.y,
                    itemStyle: {
                        color: '#1890FF',
                    },
                }]
            });
        },
        changeCarType(val){
            this.carTypes.forEach(item=>{
                if(val==item.label){
                    this.pinpai=item.label
                    this.carNumer=item.num
                    this.carNumber=item.number
                }
            })
            this.carNum()
        },
        carNum(){//车辆数
            let myChart = this.$echarts.init(document.getElementById('carNum'))
            myChart.setOption({
                title: { text: '车辆数查询'},
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}% <br/> 车辆数量 : '+this.carNumber
                },
                series: [
                    {
                        name: '车辆总数 : '+this.cartotal,
                        type: 'gauge',
                        radius: "80%",
                        // center: ["30%", "50%"],
                        detail: {formatter: "{value}%"},
                        data: [{value: this.carNumer, name: this.pinpai+'品牌占比'}]
                    },
                ]
            });
            // var topNum = 100;
            // var timer = setInterval(function(){
            // $(".water").css({"top":topNum+"%"});
            // topNum -= 0.3;
            // var text = parseInt(100 - topNum)+"%";
            // $(".persen").text(text);
            // if(topNum <= 50){
            //     clearInterval(timer);
            // }
            // },1);
        },
        priceDistridution(){//车价分布
            let today=this.today 
            let arrX=[]
            let myChart = this.$echarts.init(document.getElementById('priceDistridution'))
            let arr=[]
            this.carPrice.forEach(item=>{
                arr.push(item.name)
            })
            myChart.setOption({
                title: {
                    text: '车辆价格分布图',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                // visualMap: {
                //     show: false,
                //     min: 80,
                //     max: 600,
                //     inRange: {
                //         colorLightness: [0, .7]
                //     }
                // },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top:'center',
                    data: arr
                },
                series: [
                    {
                        name: '车辆价格分布',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: this.carPrice,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        itemStyle: {
                            color: '#3398DB',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            normal:{
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                        '#4ECB73', '#3AA1FF', '#3E4967', '#975FE5', '#FBD437'
                                    ];
                                    return colorList[params.dataIndex]
                                    }
                            }
                        },
                    }
                ]
            })
        },
        yearDistridution(){//车辆年限分布
            let myChart = this.$echarts.init(document.getElementById('yearDistridution'))
            myChart.setOption({
                title: { text: '车辆年限分布图'},
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.carYears.x,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '车辆年限',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.carYears.y
                    }
                ]
            });
        },
        numDistridution(){//车辆分布
            let myChart = this.$echarts.init(document.getElementById('numDistridution'))
            let arr30=[]
            let arr20_30=[]
            let arr15_20=[]
            let arr10_15=[]
            let arr10=[]
            this.carAreaCode.data.forEach(item=>{
                for(let i in item ){
                    this.carAreaCode.legend.push(i)
                    if(i=='30万以上'){
                        arr30.push(item[i])
                    }else if(i=='20~30万'){
                        arr20_30.push(item[i])
                    }else if(i=='15~20万'){
                        arr15_20.push(item[i])
                    }else if(i=='10~15万'){
                        arr10_15.push(item[i])
                    }else if(i=='10万以下'){
                        arr10.push(item[i])
                    }
                }
            })
            myChart.setOption({
                title: { text: '车辆分布图'},
                tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                top:'top',
                left:'center',
                data: this.carAreaCode.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: this.carAreaCode.area
            },
            series: [
                {
                    name: '30万以上',
                    type: 'bar',
                    stack: '总量',
                    color:'#975FE5',
                    data: arr30
                },
                {
                    name: '20~30万',
                    type: 'bar',
                    stack: '总量',
                    color:'#3E4967',
                    data: arr20_30
                },
                {
                    name: '15~20万',
                    type: 'bar',
                    color:'#FBD437',
                    stack: '总量',
                    data: arr15_20
                },
                {
                    name: '10~15万',
                    type: 'bar',
                    stack: '总量',
                    color:'#4ECB73',
                    data: arr10_15
                },
                {
                    name: '10万以下',
                    type: 'bar',
                    stack: '总量',
                    color:'#3AA1FF',
                    data: arr10
                }
            ]
            });
        },
        getDate(day,type){//近7天30天
            let option=0
            let today=new Date()
            if(day=='7天'){
                option=7
            }else{
                option=30
            }
            
            let arrX=[]
            let arrY=[]
            for(let i=option;i>0;i--){
                let y=new Date(today.getTime()-86400 * i * 1000).getFullYear()
                let m=(new Date(today.getTime()-86400 * i * 1000).getMonth()+1)<10?'0'+(new Date(today.getTime()-86400 * i * 1000).getMonth()+1).toString():new Date(today.getTime()-86400 * i * 1000).getMonth()+1
                let d=(new Date(today.getTime()-86400 * i * 1000).getDate())<10?'0'+(new Date(today.getTime()-86400 * i * 1000).getDate()).toString():new Date(today.getTime()-86400 * i * 1000).getDate()
                let random=(option*Math.random()*15+Math.random()*10).toFixed(0)
                arrX.push(y+'-'+m+'-'+d)
                arrY.push(Number(random))
            }
            if(type=='login'){
                // this.login.x=arrX
                // this.login.y=arrY
                // this.loginNum(option)
            }else{
                // this.dueNum.x=arrX
                // this.dueNum.y=arrY
                // this.businessDue(option)
            }
        },
        carAnalysisAllTable(){//图表数据
            this.loading=true
            carAnalysisAllTable().then(res=>{
                this.loading=false
                if(res.data.code==1){
                    this.login.x=res.data.body.carUserLogin.xlist
                    this.login.y=res.data.body.carUserLogin.ylist
                    this.dueNum.x=res.data.body.businessExpireDate.xlist
                    this.dueNum.y=res.data.body.businessExpireDate.ylist
                    this.cartotal=res.data.body.carModel.carNum
                    this.carYears.x=res.data.body.carYears.xlist
                    this.carYears.y=res.data.body.carYears.ylist
                    this.carAreaCode.area=[]
                    this.carAreaCode.legend=[]
                    this.carAreaCode.data=[]
                    for(let s in res.data.body.carAreaCode){
                        this.carAreaCode.area.push(s)
                        this.carAreaCode.data.push(res.data.body.carAreaCode[s])
                    }
                    for(let i in res.data.body.carPrice){
                        let json={
                            value:res.data.body.carPrice[i],
                            name:i
                        }
                        this.carPrice.push(json)
                    }
                    let qita=0
                    let pinpai=''
                    for(let i in res.data.body.carModel.carModelDate){
                        let json={
                            label:i,
                            num:(100*(Number(res.data.body.carModel.carModelDate[i])/Number(this.cartotal))).toFixed(2),
                            number:Number(res.data.body.carModel.carModelDate[i]),
                            value:i,
                        }
                        if(i=='其他'){
                            // qita=Number(res.data.body.carModel.carModelDate[i]).toFixed(2)
                            qita=i
                            pinpai=i
                            this.carNumer=(100*(Number(res.data.body.carModel.carModelDate[i])/Number(this.cartotal))).toFixed(2)
                            this.carNumber=Number(res.data.body.carModel.carModelDate[i])
                            }
                        this.carTypes.push(json)
                    }
                    this.priceDistridution()
                    this.loginNum()
                    // this.businessDue()
                    getExpireDateStatistics({day:30}).then(res=>{
                        this.dueNum.x=res.data.body.xlist
                        this.dueNum.y=res.data.body.ylist
                        this.businessDue()
                    })
                    this.carType=qita
                    this.pinpai=pinpai
                    this.carNum()
                    this.yearDistridution()
                    this.numDistridution()
                }
            })
        }
    },
    created(){
        // this.carAnalysisAllTable()
    },
    mounted(){
        let y=new Date().getFullYear().toString()
        let m=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1).toString():(new Date().getMonth()+1).toString()
        let d=(new Date().getDate())<10?'0'+(new Date().getDate()).toString():new Date().getDate().toString()
        this.today=y+"-"+m +"-"+d
        // this.numDistridution()
        // this.yearDistridution()
        // this.loginNum()
        // this.carNum()
        // this.businessDue()
        // this.priceDistridution()
        this.getDate('7天','login')
        this.getDate('7天','due')
        this.carAnalysisAllTable()
    }
}
</script>

<style lang="less"  scoped>

    .ownerAnalysis{
        @-webkit-keyframes spin {
           from{-webkit-transform: rotate(0deg);transform: rotate(0deg);}
           to{-webkit-transform: rotate(360deg);transform: rotate(360deg);}
       }
       @keyframes spin {
           from{-webkit-transform: rotate(0deg);transform: rotate(0deg);}
           to{-webkit-transform: rotate(360deg);transform: rotate(360deg);}
       }
       .wave-progress{width:2.8rem;height:2.8rem;margin:.1rem auto;border: .08rem solid #1890FF;border-radius:50%;background-color: #fff;box-sizing: border-box;position: absolute;right:0rem;transform: translateY(15%)}
       .wave-progress .inner{position: absolute;width:100%;height:100%;border-radius:50%;overflow: hidden; border: .06rem solid #56aaf8;box-sizing: border-box;z-index: 10}
       .wave-progress .inner .water{position: absolute;width: 200%;height: 200%;left: -50%;border-radius: 40%;background:rgba(83, 168, 253, 0.3);-webkit-animation:spin 10s linear infinite;animation:spin 10s linear infinite; }
       .tips{color: #1890FF;font-size: .14rem;display:flex;flex-direction: column;justify-content: center;align-items: center;text-align: center;height: 100%;}
 
        background: white;
        font-size: .16rem;
        .content{
            height: 85vh;
            overflow-y: auto;
        }
        .timeCom{
            position: relative;
            display: flex;
            .radio{
                position: absolute;
                top: 0;
                right: .1rem;
                z-index: 999;
            }
        }
        
    }
</style>