<template>
    <div class="flexRow screenDisplay">
        <div class="left flexColumn">
            <div class="timerPart">{{nowTime}}</div>
            <div class="leftPart dayYD" id="dayYD"></div>
            <div class="leftPart areaPeed flexColumn">
                <div class="dayYDhoverRIGHT">
                    <div @click="dayYDhover()"></div>
                </div>
                <el-carousel>
                    <el-carousel-item class="flexRow" v-for="(val, i) in areaPartList2" :key="i">
                    <!-- <div class="flexRow" v-for="(val, i) in areaPartList2" :key="i"> -->
                       <div class="areaPart2" v-for="(item, index) in val" :key="index">
                            <el-progress :stroke-width=20 type="circle" :percentage=item.value color="#01ffff"></el-progress>
                            <span class="dayYDAreaTitle"> {{item.name}} </span>
                        </div>
                    <!-- </div> -->
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="leftPart systerm flexColumn">
                <div class="systermRIGHT"></div>
                <p style="color:#ffb108;font-size:12px;text-align:left">今日天气：晴转多云，15到34度，微风4级，空气质量175（重度污染） <el-button type="warning" class="zdBtn">置顶</el-button></p>
                <div class="systermBody text-container">
                    <transition class="inner-container2" name="slide" mode="out-in">
                        <div :key="text.id">                            
                            <p v-for="(val, i) in text.val" :key="i">
                                <span>{{'1'+i+':2'+i+':'}}&nbsp;&nbsp;&nbsp;</span>{{val}}
                            </p>
                        </div>
                    </transition>                    
                </div>
            </div>
            <router-link tag="div" to="/gisMap" class="leftBottomPart"></router-link>
        </div>
        <div class="middle flexColumn" style="width: 100px;">
            <div class="middleMapTitle"></div>
            <div class="middleMap flexColumn">
                <div class="middleMapName"></div>
                <div class="middleMapBody"></div>
            </div>
            <div class="middleArea flexColumn">
                <div class="mapTitle"></div>
                <el-carousel class="mapHover">
                    <el-carousel-item v-for="(item, i) in 2" :key="i">
                        <div class="mapHoverImg" :class="'mapHover'+i"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="right flexColumn">
            <div class="rightAccident flexColumn">
                <div class="CarTitle"></div>
                <div class="accientLengthAll">
                    <div>
                        <lable class="accientLengthbox" v-for="(val, i) in accidentList" :key="i">
                            {{val.name}}:<span class="accientLength">{{val.value}}</span>起
                        </lable>
                    </div>
                </div>
                <div id="rightAccidentEarch"></div>
            </div>
            <div class="rightCarLength flexColumn">
                <div class="CarTitle"></div>
                <div class="flexRow Carbody">
                    <div class="CarName flexColumn">
                        <div v-for="(item,i) in carlistP" :key="i">
                            {{item.name}}
                        </div>
                        <div class="tableTicket"></div>
                        <div class="tableTicketNum"></div>
                    </div>
                    <div class="CarTable flexColumn">
                        <div v-for="(item,i) in carlistP" :key="i">
                            <span class="Carjdt" :style="{'border-right':(i+1)+'px solid #0892d7','width':item.value+'%'}"></span>
                        </div>
                        <div class="tableTicket flexRow">
                            <span class="CarjdtBorder" :style="{'width':val.value+'%'}" v-for="(val, index) in carlist" :key="index"></span>
                        </div>
                        <div class="tableTicketNum flexRow">
                            <span class="CarjdtNum">0</span>
                            <span class="CarjdtNum" :style="{'width':val.value+'%'}" v-for="(val, index) in carlist" :key="index">{{val.num}}</span>
                        </div>
                    </div>                    
                </div>
                <!-- <div style="font-size:12px">单位：人</div> -->
            </div>
        </div>
    </div>
</template>
<style scoped>
    .el-button--warning {
        color: #c04b0d;
        background-color: transparent;
        border-color: #c04b0d;
        padding: 2px;
    }
    .el-carousel{
        overflow: hidden;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 0.5s linear;
    }
    .slide-leave-to {
        transform: translateY(-20%);
    }
    .slide-enter {
        transform: translateY(0%);
    }
    .leftPart /deep/ svg > path:first-child{
      stroke: rgb(20,161,255,0.2) !important;
    }
</style>

<style>
    .accientLengthAll{
        margin: 0px 15px;
        overflow: auto;
    }
    .accientLengthAll>div{
        width:200%;
        height: 30px;
    }
    .accientLengthbox{  
        border: 1px solid #1084a9;
        padding: 5px;
        border-radius: 5px;
        color: #128da5;
        font-size: 12px;
        float: left;
    }
    .accientLengthbox + .accientLengthbox{
        margin-left: 5px;
    }
    .accientLength{        
        color: #c04b0d;
        font-size: 16px;
    }
    #rightAccidentEarch{
        flex:1;
        padding: 10px 20px;
        background: url(../../assets/svreenDisplay/pieBG.png)no-repeat 83px 23px;
    }
    .systermBody{
        flex:1;
        overflow: hidden;        
        font-size: 12px;
        text-align: left;
    }
    .zdBtn{
        margin-left: 80%;
    }
    .systermBody p>span{
        color: #0a8bc5;
    }
    .mapHoverImg{
        width: 81%;
        margin-left: 10%;
        height: 90%;        
    }
    .mapHover0{
        background: url(../../assets/svreenDisplay/ydFXAllBg.png)no-repeat;
        background-size: 100%;
    }
    .mapHover1{
        background: url(../../assets/svreenDisplay/ydFXAllBg2.png)no-repeat;
        background-size: 100%;
    }
    .screenDisplay{    
        width: 1920px;
        height: 1080px;
        background: url(../../assets/svreenDisplay/bg.png)no-repeat;
        color: #fff;
    }
    .left{
        width: 390px;
        margin-top: 53px;
        margin-left: 63px;
        margin-bottom: 38px;
    }
    .left>.timerPart{   
        height: 108px;
        line-height: 140px;
        font-size: 45px;
        font-weight: bold;
        font-family: -webkit-pictograph;
        text-shadow: 2px 2px 6px #2f48b7;
        background: url(../../assets/svreenDisplay/timeTitle.png)no-repeat;
    }
    .left>.leftPart{
        margin-top: 32px;
    }
    .dayYD{
        height: 259px;
        background: url(../../assets/svreenDisplay/dayYDbg.png)no-repeat;
    }
    .dayYDhoverRIGHT{
        height: 80px;
        text-align: right;
        padding: 0 15%;
        line-height: 100px;
    }
    .dayYDhoverRIGHT>div{
        height: 7px;
        width: 42px;
        display: inline-table;
        background: url(../../assets/svreenDisplay/rightHover.png)no-repeat;
    }
    .areaPart2{
        padding: 0 9px;
    }
    .dayYDAreaTitle{
        height: 50px;
        line-height: 50px;
        display: inline-block;
    }
    .el-progress--circle{
        display: block;
    }
    .el-progress--circle>.el-progress-circle{
        width: 80px !important;
        height: 80px !important;
    }
    .areaPeed{
        background: url(../../assets/svreenDisplay/AreaBg.png)no-repeat;
        height: 229px;
    }
    .systerm{
        background: url(../../assets/svreenDisplay/systermTitle.png)no-repeat;
        height: 229px;
        padding: 0 18px;
        box-sizing: border-box;
    }
    .systermRIGHT{
        height: 50px;
    }
    .left>.leftBottomPart{
        height: 36px;
        cursor: pointer;
        margin-top: 28px !important;
        background: url(../../assets/svreenDisplay/backBtn.png)no-repeat 0;
    }
    .middle{
        flex: 1;
        margin-bottom: 38px;
        padding: 0 40px;
    }
    .middleMapTitle{
        width: 100%;
        height: 74px;
        background: url(../../assets/svreenDisplay/title.png)no-repeat -70px 10px;
    }
    .middleMap{
        flex: 2;
    }
    .middleMapName{
        width: 168px;
        background: url(../../assets/svreenDisplay/mapTitle.png)no-repeat center;
        height: 80px;

    }
    .middleMapBody{
        flex:1;
        background: url(../../assets/svreenDisplay/Map2.png)no-repeat center;
    }
    .middleArea{
        flex: 1;
    }
    .mapTitle{
        height: 80px;
        width: 168px;
        background: url(../../assets/svreenDisplay/areaPeed.png)no-repeat center;
    }
    .right{
        width: 461px;
        margin-top: 54px;
        margin-bottom: 54px;
        margin-right: 63px;
    }
    .rightAccident{
        width: 461px;
        height: 496px;
        background: url(../../assets/svreenDisplay/nowLength.png)no-repeat center;
    }
    .rightCarLength{
        margin-top: 42px;
        width: 465px;
        background: url(../../assets/svreenDisplay/nowCarLength.png)no-repeat center;
        height: 433px;
    }
    .CarTitle{
        height: 40px;
    }
    .Carbody{
        flex: 1;
        padding: 0 29px;
    }
    .CarName{
        width: 65px;
    }
    .CarTable{
        flex: 5;
    }
    .CarName>div,.CarTable>div{
        flex: 1;
        padding: 2% 0;
        text-align: left;
    }
    .CarName>div{
        text-align: center;
        padding-right: 15px;
        line-height: 33px;
    }
    .Carjdt{    
        display: inline-block;
        background: linear-gradient(to right, #0cefe4 , #0892d7);
        height: 100%;
        border-radius: 5px;
    }
    .tableTicket,.tableTicketNum{        
        flex: 0.2 !important;
    }
    .tableTicketNum{        
        flex: 0.8 !important;
    }
    .CarjdtBorder{
        border: 0.5px solid;
        height: 80%;
        border-top: 0px solid !important;
    }
    .CarjdtNum{
        text-align: right;
    }
    .mapHover{
        overflow: hidden;
    }
    .mapHover .el-icon-arrow-left, .mapHover .el-icon-arrow-right{
        font-size: 50px !important;
    }
    .mapHover .el-carousel__arrow {
        color: #06f7ff;
        top:35%;
        display: inline !important;
    }
</style>

<script>
export default {    
    name: "screenDisplay",
    computed: {
    text() {
        return {
            id: this.number,
            val: this.pValueScroll[this.number]
            }
        }
    },
    data() {
        return {
            number:0,
            pValueScroll:[
                ["咸水沽镇1-南华路-与红旗路交口东侧津南少年宫门前（红旗路至南华里2号楼） 交通事故",
                "咸水沽镇-红旗路-津南大剧院门前（大剧场公交站至南华路）机动车闯红灯",
                "咸水沽镇-津沽大街--咸水沽医院门前（景明花园小区门前至红旗路）信号灯不正常",
                "咸水沽镇-红旗路-与体育场路交口南侧（体育场路至永安里5号楼）行人闯红灯"],
                ["咸水沽镇2-体育场路--光明南里门前（光明南里7号楼至红旗路）行人翻越护栏",
                "咸水沽镇-南华路-与红旗路交口东侧津南少年宫门前（红旗路至南华里2号楼） 交通事故",
                "咸水沽镇-红旗路-津南大剧院门前（大剧场公交站至南华路）机动车闯红灯",
                "咸水沽镇-津沽大街--咸水沽医院门前（景明花园小区门前至红旗路）信号灯不正常",
                "咸水沽镇-红旗路-与体育场路交口南侧（体育场路至永安里5号楼）行人闯红灯"],
                ["咸水沽镇3-体育场路--光明南里门前（光明南里7号楼至红旗路）行人翻越护栏",
                "咸水沽镇-南华路-与红旗路交口东侧津南少年宫门前（红旗路至南华里2号楼） 交通事故",
                "咸水沽镇-红旗路-津南大剧院门前（大剧场公交站至南华路）机动车闯红灯",
                "咸水沽镇-津沽大街--咸水沽医院门前（景明花园小区门前至红旗路）信号灯不正常",
                "咸水沽镇-红旗路-与体育场路交口南侧（体育场路至永安里5号楼）行人闯红灯"],
                ["咸水沽镇4-体育场路--光明南里门前（光明南里7号楼至红旗路）行人翻越护栏",
                "咸水沽镇-南华路-与红旗路交口东侧津南少年宫门前（红旗路至南华里2号楼） 交通事故",
                "咸水沽镇-红旗路-津南大剧院门前（大剧场公交站至南华路）机动车闯红灯",
                "咸水沽镇-津沽大街--咸水沽医院门前（景明花园小区门前至红旗路）信号灯不正常",
                "咸水沽镇-红旗路-与体育场路交口南侧（体育场路至永安里5号楼）行人闯红灯"],
                ["咸水沽镇5-体育场路--光明南里门前（光明南里7号楼至红旗路）行人翻越护栏",
                "咸水沽镇-南华路-与红旗路交口东侧津南少年宫门前（红旗路至南华里2号楼） 交通事故",
                "咸水沽镇-红旗路-津南大剧院门前（大剧场公交站至南华路）机动车闯红灯",
                "咸水沽镇-津沽大街--咸水沽医院门前（景明花园小区门前至红旗路）信号灯不正常",
                "咸水沽镇-红旗路-与体育场路交口南侧（体育场路至永安里5号楼）行人闯红灯"]
            ],
            carlistP:[],
            carlist:[],
            accidentList:[
                {name:"路口交通溢出拥堵",value: 38, itemStyle:{color:"#02337c"}},
                {name:"路段交通严重拥堵",value: 22, itemStyle:{color:"#022866"}},
                {name:"车辆逆行",value: 33, itemStyle:{color:"#0064a6"}},
                {name:"不文明停车",value: 18, itemStyle:{color:"#048ebd"}},
                {name:"烟雾、火灾",value: 55, itemStyle:{color:"#009ae8"}},
                {name:"道路积水",value: 65, itemStyle:{color:"#047bf3"}}
            ],
            areaPartList: [
                {name:"八里台",value:98},
                {name:"咸水沽",value:84},
                {name:"北闸口",value:75},
                {name:"小站镇",value:36},
                {name:"双桥河",value:55},
                {name:"葛沽",value:61},
                {name:"双港",value:83},
                {name:"辛庄",value:69}
            ],
            areaPartList2:[
                [
                    {name:"八里台",value:98},
                    {name:"咸水沽",value:84},
                    {name:"北闸口",value:75},
                    {name:"小站镇",value:36}
                ],[
                    {name:"双桥河",value:55},
                    {name:"葛沽",value:61},
                    {name:"双港",value:83},
                    {name:"辛庄",value:69}
                ]
            ],
            nowTime:"2018-11-20 10:34"
        }
    },
    methods: {
        dayYDhover(){

        },
        startMove() {
            let timer = setTimeout(() => {
                if (this.number === 4) {
                    this.number = 0;
                } else {
                    this.number += 1;
                }
                this.startMove();
            }, 2000);
        },
        // 获取饼图,获取TU表
        dayYd() {
            let series = [];
            let distictList = [
                { name: "咸水沽镇", color: "#8363f9", data: [15,44,55,86,9,5,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41] },
                { name: "小站镇", color: "#04bbff", data: [105,43,52,26,92,50,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41] },
                { name: "北闸口镇", color: "#0451ff", data: [15,40,55,86,9,5,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41] },
                { name: "八里台镇", color: "#ff8604", data: [55,86,9,5,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41,15,40] },
                { name: "双桥河镇", color: "#00d591", data: [11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41,15,21,11,14,25,14] },
                { name: "葛沽镇", color: "#58a92c", data: [26,36,55,25,41,5,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41] },
                { name: "双港镇", color: "#c6c845", data: [11,22,55,35,25,58,25,11,22,55,35,25,58,36,21,11,14,25,14,26,36,55,25,41] },
                { name: "辛庄镇", color: "#bf2929", data: [,5,25,11,22,55,35,25,58,22,55,35,25,58,36,21,11,14,26,92,50,25,11,22] }
            ];
            for (let i in distictList) {
                series.push({
                    name: distictList[i].name,
                    type: 'line',
                    data: distictList[i].data,
                    smooth: true,
                    itemStyle: {
                        color: distictList[i].color
                    }
                });
            }
            let naturalOption1 = {
                grid: {
                    top: "100px",
                    left: '15px',
                    right: '5px',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    type: "scroll",
                    width: "360px",
                    right: 0,
                    top:"50px",
                    orient: "horizontal",
                    padding: [0, 20, 0, 0],
                    textStyle: {
                        color: "#ffffff",
                        fontSize: "10px",
                        padding: [0, 0, 0, 0]
                    },
                    pageTextStyle: {
                        width: "10px",
                        padding: [0, 0, 0, 0]
                    },
                    inactiveColor: "#ffffff",
                    selectedMode: "multiple",
                    pageButtonGap: 0,
                    pageIconColor: "#ffffff",
                    icon: 'circle'
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: "#3067b4"
                            }
                        },
                        nameTextStyle: {
                            color: "#3067b4"
                        },
                        nameLocation: "start",
                        data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
                    }
                ],
                tooltip: {
                    show: true,
                    axisPointer: {
                        type: "cross",
                        label: {
                            color: "#239892",
                            backgroundColor: "#ffffff"
                        }
                    },
                    formatter: "{b}{a}{c}",
                    textStyle: "#239892"
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: "#3067b4"
                            }
                        },
                        nameLocation: "start",
                        nameTextStyle: {
                            color: "#3067b4"
                        },
                        splitLine: {
                            show: true,
                            interval: 1,
                            lineStyle: {
                                color: ["transparent"],
                                solid: "dashed"
                            }
                        }
                    }
                ],
                series: series
            };
            let naturalOption = {
                // tooltip : {
                //     // trigger: 'item',
                //     formatter: "{b} : {c}条 ({d}%)"
                // },
                legend: { 
                    width: "100%",
                    orient: "horizontal",
                    textStyle: {
                        color: "#ffffff",
                        fontSize: "10px",
                        padding: [0, 0, 0, 0]
                    },
                    bottom: "0"
                },
                series : [
                    {
                        legendHoverLink: false,
                        type: 'pie',
                        radius : '60%',
                        center: ['50%', '40%'],
                        data: this.accidentList,
                        label: {
                            normal: {
                                position: 'inner',
                                formatter: '{d}%',
                            }
                        }
                    }
                ]
            };
            setTimeout(() => {               
                let myNaturalChart = this.$echarts.init(document.getElementById("rightAccidentEarch"));
                myNaturalChart.setOption(naturalOption);
                let myNaturalChart1 = this.$echarts.init(document.getElementById("dayYD"));
                myNaturalChart1.setOption(naturalOption1); 
            });
        },
        // 获取当日各区车流量
        getLast() {            
            let carlist = this.areaPartList;
            carlist.sort(function(a, b){
                return a.value-b.value;
            });
            for (let i in carlist) {
                this.carlist.push({
                    num: carlist[i].value,
                    value: (i>"0" ? carlist[i].value-carlist[i-1].value : carlist[i].value)
                });
            }
            this.carlistP =this.areaPartList;
            this.carlistP.sort(function(a, b){
                return b.value-a.value;
            });
        },
        // 获取时间
        getTimeNow() {
            this.nowTime = this.$filter.formatDateTimeMinute(this.$filter.timesFormat(new Date()));
            setTimeout(()=>{
                this.nowTime = this.$filter.formatDateTimeMinute(this.$filter.timesFormat(new Date()));
            },6000);
        }
    },
    mounted(){
        this.dayYd();
        this.getLast();
        this.getTimeNow();
        this.startMove();
    }
}
</script>