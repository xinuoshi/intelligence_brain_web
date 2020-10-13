<template>
    <!-- 设施运行分析 -->
    <div class="maincss">
        <div style="position:absolute;top:120px;bottom:0px;overflow: auto;padding: 0px 15px;margin-top: 10px">
            <div>
                <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                            :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
                <div slot="searchBoxBar" class="operation">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </div>
            <div class="maincssall" style="background-color: #0D1E35">
               <div class="maintwol">
                <div style="width: 530px;height:100%;padding: 0 30px;" class="zpEarchl">
                    <div class="titileName">电子警察覆盖率</div>
                    <div class="flexRow" v-for="(item, index) in peiList1" :key="index" style="margin-bottom:5px">
                        <div v-for="(items, i) in item.value" :key="i" style="margin-left: 2vw">
                            <el-progress class="yhcolor" max=100 type="circle" :stroke-width=10 :width="wid"
                                         :percentage="Number(items.pei).toFixed(2)" v-bind:class="{ colordi: Number(items.pei)>100 }" :color="items.color"></el-progress>
                            <p>{{items.name}}</p>
                        </div>
                    </div>
                </div>
                <div id="Columns2" class="zpEarchl" style="width: calc(100% - 500px);"></div>
                </div>
                <div class="mainthree">
                <div style="width: 530px;height:100%;padding: 0 30px;" class="zpEarchl">
                    <div class="titileName">人行灯覆盖率</div>
                    <div class="flexRow" v-for="(item, index) in peiList2" :key="index" style="margin-bottom:5px">
                        <div v-for="(items, i) in item.value" :key="i" style="margin-left: 2vw">
                            <el-progress class="yhcolor" type="circle" :stroke-width=10 :width="wid"
                                         :percentage="Number(items.pei).toFixed(2)" v-bind:class="{ colordi: Number(items.pei)>100 }"
                                         :color="items.color"></el-progress>
                            <p>{{items.name}}</p>
                        </div>
                    </div>
                </div>
                <div id="Caketype1" class="zpEarchl" style="width: calc(100% - 500px);"></div>
            </div>
                 <div class="mainfourl">
                <div style="width: 530px;height:100%;padding: 0 30px;" class="zpEarchl">
                    <div class="titileName">斑马线覆盖率</div>
                    <div class="flexRow" v-for="(item, index) in peiList3" :key="index" style="margin-bottom:5px">
                        <div v-for="(items, i) in item.value" :key="i" style="margin-left: 2vw">
                            <el-progress class="yhcolor" type="circle" :stroke-width=10 :width="wid"
                                         :percentage="Number(items.pei).toFixed(2)" v-bind:class="{ colordi: Number(items.pei)>100 }" :color="items.color"></el-progress>
                            <p>{{items.name}}</p>
                        </div>
                    </div>
                </div>
                <div id="lineColumns2" class="zpEarchl" style="width: calc(100% - 500px);"></div>
            </div>

            <div  class="mainfive">
                <div id="lineColumns3" class="zpEarchl" style="width: 64.4%;"></div>
                <div id="lineColumns4" class="zpEarchl" style="width: 31.5%;height:100%">
                    <div class="FacilityTable">
                        <div class="titileName">行政区事故高发路段排名</div>
                        <el-table :data="tableData" height="34vh" width="100vw" style="position:relative !important" :show-header="true">
                            <el-table-column prop="rank" label="排行"> </el-table-column>
                            <el-table-column prop="roadName" label="道路" > </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="mainsix">
                <div id="lineColumns5" class="zpEarchl" style="width: 31.5%;height:100%">
                    <div class="FacilityTable1">
                        <div class="titileName">行政区事故高发路段排名</div>
                        <el-table :data="tableData1" height="34vh" width="100vw" style="position:relative !important" :show-header="true">
                            <el-table-column prop="rank" label="排行"> </el-table-column>
                            <el-table-column prop="roadName" label="道路" > </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="lineColumns6" class="zpEarchl" style="width: 31.5%;height:100%">
                    <div class="FacilityTable1">
                        <div class="titileName">行政区事故高发路段排名</div>
                        <el-table :data="tableData2" height="34vh" width="100vw" style="position:relative !important" :show-header="true">
                            <el-table-column prop="rank" label="排行"> </el-table-column>
                            <el-table-column prop="roadName" label="道路" > </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div id="lineColumns7" class="zpEarchl" style="width: 31.5%;height:100%">
                    <div class="FacilityTable1">
                        <div class="titileName">行政区事故高发路段排名</div>
                        <el-table :data="tableData3" height="34vh" width="100vw" style="position:relative !important" :show-header="true">
                            <el-table-column prop="rank" label="排行"> </el-table-column>
                            <el-table-column prop="roadName" label="道路" > </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import saveAs from "save-as";
    import { Loading } from 'element-ui';
    import domtoimage from "dom-to-image";
    export default {
        name: "SubjectPortrait",
        data() {
            return {
                tableData1: [],
                tableData2: [],
                tableData3: [],
                screenWidth: document.body.clientWidth,
                changeDivW: "",
                wid: 70,
                time: "",
                // 当前时间转换
                timedatal: this.$filter.timesFormat(new Date()),
                timedata: new Date().getTime(),
                thistime: this.$tools.getDays(this.timedatal),
                tableData:[
                ],
                tablevalue:[],
                areaName:[],
                electronicPoliceCR:[],
                electronicPoliceCR_RingRatio:[],
                electronicPoliceCR_YearOnYear:[],
                pedestrianLightCR:[],
                pedestrianLightCR_RingRatio:[],
                pedestrianLightCR_YearOnYear:[],
                totalOutfieldEquipmentNew:[],
                totalOutfieldEquipmentRingRatio:[],
                totalOutfieldEquipmentSum:[],
                zebraCrossingCR:[],
                zebraCrossingCR_RingRatio:[],
                zebraCrossingCR_YearOnYear:[],
                // 搜索传参
                searchName: [
                    {
                        searchPlaceholder: "查询区域",
                        id: "",
                        type: 1,
                        url: "",
                        Sendkey: "ares",
                        data: this.$store.state.area
                    },
                    {searchPlaceholder: "查询日期", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: "",overToday: true},
                    {searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: "",overToday: true},
                ],
                tablevalue : [
                    {
                        name: "辛庄",
                        max: "40"
                    },
                    {
                        name: "双港",
                        max: "35"
                    },
                    {
                        name: "葛沽",
                        max: "30"
                    },
                    {
                        name: "小站",
                        max: "25"
                    },
                    {
                        name: "双河桥",
                        max: "20"
                    },
                    {
                        name: "八里台",
                        max: "10"
                    },
                    {
                        name: "北闸口",
                        max: "10"
                    },
                    {
                        name: "咸水沽",
                        max: "10"
                    }
                ],
                // 环状图数据
                peiList1:[],
                peiList2:[],
                peiList3:[],
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ]
            }
        },
        methods : {
            mapFullscreenLoding() {
                // 打开loding
                this.mapLoading = Loading.service({
                    lock: true,
                    background: "rgba(10, 40, 100, 0)"
                });
            },
            // 当前时间的前七天日期
            timeseven(day){
                let today = new Date();
                let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
                today.setTime(targetday_milliseconds); //注意，这行是关键代码
                let tYear = today.getFullYear();
                let tMonth = today.getMonth();
                let tDate = today.getDate();
                tMonth = this.doHandleMonth(tMonth + 1);
                tDate = this.doHandleMonth(tDate);
                return tYear+""+tMonth+""+tDate;
            },
            timesevenl(){
              let timeStamp = new Date(new Date().setHours(0,0,0,0));
              let hourseven = this.$filter.timesFormat(timeStamp)-7*24*60*60*1000;
              return hourseven;
            },
            doHandleMonth(month){
                var m = month;
                if(month.toString().length == 1){
                    m = "0" + month;
                }
                return m;
            },
            // 搜索回调
            searchEvent(payload) {
                if (payload.startTime === undefined || payload.endTime === undefined) {
                    this.$showSimpleMessage("请选择时间区间", "error");
                    return;
                }
                let timer = {
                    endTimel: payload.endTime === undefined ? "" : this.$tools.getDays(new Date(payload.endTime)),
                    endTime: payload.endTime === undefined ? "" : this.$filter.timesFormat(new Date(payload.endTime)),
                    startTimel: payload.startTime === undefined ? "" : this.$tools.getDays(new Date(payload.startTime)),
                    startTime: payload.startTime === undefined ? "" : this.$filter.timesFormat(new Date(payload.startTime)),
                    area: payload.ares === undefined ? "" : payload.ares,
                    equipmentType: payload.equipmentType === undefined ? "" : payload.equipmentType
                }
                this.time = timer
                this.getTrafficNumber(timer);
                this.duration(timer);
            },
            fugailv_d() {
                let peiList = [];
                peiList.push(
                    {
                        value: [
                            {
                                name: this.tablevalue[0].areaName,
                                pei: this.tablevalue[0].electronicPoliceCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[1].areaName,
                                pei: this.tablevalue[1].electronicPoliceCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[2].areaName, pei: this.tablevalue[2].electronicPoliceCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[3].areaName,
                                pei: this.tablevalue[3].electronicPoliceCR * 100,
                                color: "red"
                            }
                        ]
                    },
                    {
                        value: [
                            {
                                name: this.tablevalue[4].areaName,
                                pei: this.tablevalue[4].electronicPoliceCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[5].areaName,
                                pei: this.tablevalue[5].electronicPoliceCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[6].areaName, pei: this.tablevalue[6].electronicPoliceCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[7].areaName,
                                pei: this.tablevalue[7].electronicPoliceCR * 100,
                                color: "red"
                            }
                        ]
                    }
                );
                return peiList
            },
            fugailv_r() {
                let peiList = [];
                peiList.push(
                    {
                        value: [
                            {
                                name: this.tablevalue[0].areaName,
                                pei: this.tablevalue[0].pedestrianLightCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[1].areaName,
                                pei: this.tablevalue[1].pedestrianLightCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[2].areaName, pei: this.tablevalue[2].pedestrianLightCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[3].areaName,
                                pei: this.tablevalue[3].pedestrianLightCR * 100,
                                color: "red"
                            }
                        ]
                    },
                    {
                        value: [
                            {
                                name: this.tablevalue[4].areaName,
                                pei: this.tablevalue[4].pedestrianLightCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[5].areaName,
                                pei: this.tablevalue[5].pedestrianLightCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[6].areaName, pei: this.tablevalue[6].pedestrianLightCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[7].areaName,
                                pei: this.tablevalue[7].pedestrianLightCR * 100,
                                color: "red"
                            }
                        ]
                    }
                );
                return peiList
            },
            fugailv_b() {
                let peiList = [];
                peiList.push(
                    {
                        value: [
                            {
                                name: this.tablevalue[0].areaName,
                                pei: this.tablevalue[0].zebraCrossingCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[1].areaName,
                                pei: this.tablevalue[1].zebraCrossingCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[2].areaName, pei: this.tablevalue[2].zebraCrossingCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[3].areaName,
                                pei: this.tablevalue[3].zebraCrossingCR * 100,
                                color: "red"
                            }
                        ]
                    },
                    {
                        value: [
                            {
                                name: this.tablevalue[4].areaName,
                                pei: this.tablevalue[4].zebraCrossingCR * 100,
                                color: "green"
                            },
                            {
                                name: this.tablevalue[5].areaName,
                                pei: this.tablevalue[5].zebraCrossingCR * 100,
                                color: "#8e71c7"
                            },
                            {name: this.tablevalue[6].areaName, pei: this.tablevalue[6].zebraCrossingCR * 100, color: "#C78C34"},
                            {
                                name: this.tablevalue[7].areaName,
                                pei: this.tablevalue[7].zebraCrossingCR * 100,
                                color: "red"
                            }
                        ]
                    }
                );
                return peiList
            },
            // 按钮组件回调
            operation(data) {
                let args = this.UnitTopButton[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 导出功能
            DerivedTables() {
                // mianup
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maincssall")[0];
                domtoimage.toBlob(gis, {style: "::-webkit-scrollbar"}).then(function (blob) {
                    saveAs(blob, "设施运行分析" + time + ".png");
                });
            },
            // 绘制图形
            Columns1() {
                let myChart = this.$echarts.init(document.getElementById("Columns1"));
                let option = {
                    title: {
                        x: "left",
                        text: "24小时违法数量统计", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle:{
                            color: "#3ba7c9",
                        },
                        itemGap: 0 //主副标题距离
                    },
                    tooltip: {},
                    grid:{
                        left: "3%",
                        top:"80px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color:"#147a86"
                            }
                        },
                        name:"/时",
                        nameRotate: null ,
                        nameLocation: "end", // x轴样式
                        nameGap: 10,
                        nameTextStyle: {
                            verticalAlign: "middle",
                            padding: [30, 0, 0, 0]
                        }
                    },
                    yAxis: {
                        minInterval: 0,
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:"#147a86"
                            }
                        }, // y轴样式
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ["#147a86"],
                                type : "dotted"
                            }
                        } // y轴轴线样式
                    },
                    label: {
                        show: true,
                        position: "top",
                        color: "#fff",
                    }, // 标签字
                    series: [{
                        itemStyle:{
                            normal: {
                                color: "red"
                            }
                        }, // 渐变
                        name: "事故数量",
                        type: "line",
                        data: [25, 50, 26, 40, 60, 70, 80, 40, 60, 30, 20, 90, 65, 58, 45, 48, 37, 10, 15, 25, 68, 98, 100, 5]
                    }]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 电子警察
            Columns2() {
                let _this = this;
                let myChart = this.$echarts.init(document.getElementById("Columns2"));
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        width: "100%",
                        left: 50,
                        height: "70%"
                    },
                    title: {
                        text: '电子警察覆盖率环比同比',
                        left: 50,
                        top: 10,
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#3ba7c9',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#3ba7c9',
                        },
                        itemGap: 0
                    },
                    legend: {
                        type: "plain",
                        top: 0,
                        right: 40,
                        width: "300px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        pageIconColor: "#ffffff"
                    },
                    // 右侧标签内容显示距离
                    grid: {
                        right: 50
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#147a86'
                            }
                        },
                        data: this.areaName
                    },
                    yAxis: {
                        type: 'value',
                        maxInterval: 20,
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle: {
                            color: "rgb(44, 248, 255)"
                        },
                        splitLine: {
                            show: true,
                            interval: 1,
                            lineStyle: {
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle:{
                                color:'#147a86'
                            }
                        }
                    },
                    series: [
                        {
                            name:'同比',
                            type:'line',
                            label: {
                                show: true,
                                position: "top",
                                align: "center",
                                formatter: function (value) {
                                    return "{a|同比:" + value.data + "}\n{b|环比:" + _this.electronicPoliceCR_RingRatio[value.dataIndex] + "}";
                                },
                                rich: {
                                    a: {
                                        color: "#fff",
                                        lineHeight: 17
                                    },
                                    b: {
                                        color: "#fff",
                                        lineHeight: 17
                                    }
                                }
                            },
                            data:this.electronicPoliceCR_YearOnYear,
                            color:'#d14a61'
                        },
                        {
                            name:'环比',
                            type:'line',
                            data:this.electronicPoliceCR_RingRatio,
                            color: "#8363f9"
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 人行灯
            Caketype1() {
                let _this = this;
                let myChart = this.$echarts.init(document.getElementById("Caketype1"));
                let option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    grid: {
                        width: "100%",
                        left: 50,
                        height: "70%"
                    },
                    title: {
                        text: "人行灯覆盖率环比同比",
                        left: 50,
                        top: 0,
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle:{
                            color: "#3ba7c9",
                        },
                        itemGap: 0
                    },
                    legend: {
                        type: "plain",
                        top: 0,
                        right: 40,
                        width: "200px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        pageIconColor: "#ffffff"
                    },
                    // 右侧标签内容显示距离
                    grid: {
                        right: 50
                    },
                    xAxis: {
                        type: "category",
                        axisLine: {
                            onZero: false,
                            lineStyle:{
                                color: "#147a86"
                            }
                        },
                        data: this.areaName
                    },
                    yAxis: {
                        type: "value",
                        maxInterval: 20,
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle: {
                            color: "rgb(44, 248, 255)"
                        },
                        splitLine: {
                            show: true,
                            interval: 1,
                            lineStyle: {
                                color: ["#567195"],
                                type : 'dotted'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle:{
                                color: "#147a86"
                            }
                        }
                    },
                    series: [
                        {
                            name: "同比",
                            type: "line",
                            data: this.pedestrianLightCR_YearOnYear,
                            label: {
                                show: true,
                                position: "top",
                                align: "center",
                                formatter: function (value) {
                                    return "{a|同比:" + value.data + "}\n{b|环比:" + _this.pedestrianLightCR_RingRatio[value.dataIndex] + "}";
                                },
                                rich: {
                                    a: {
                                        color: "#fff",
                                        lineHeight: 17
                                    },
                                    b: {
                                        color: "#fff",
                                        lineHeight: 17
                                    }
                                }
                            },
                            color: "#d14a61"
                        },
                        {
                            name: "环比",
                            type: "line",
                            data: this.pedestrianLightCR_RingRatio,
                            color: "#8363f9"
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形
            Caketype2() {
                let myChart = this.$echarts.init(document.getElementById("Caketype2"));
                let option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    grid: {
                        width: "100%"
                    },
                    title: {
                        text: "各行政区违法数量及环比同比",
                        left: 50,
                        top: 0,
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle:{
                            color: "#3ba7c9",
                        },
                        itemGap: 0
                    },
                    legend: {
                        type: "plain",
                        top: 0,
                        right: 0,
                        width: "200px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        selectedMode: false,
                        inactiveColor: "#ccc",
                        pageIconColor: "#ffffff"
                    },
                    xAxis: {
                        type: "category",
                        axisLine: {
                            onZero: false,
                            lineStyle:{
                                color: "rgb(44, 248, 255)"
                            }
                        },
                        data: ["辛庄镇","双港镇","葛沽镇","小站","咸水沽","北闸镇","八里台","双桥镇"]
                    },
                    yAxis: {
                        type: "value",
                        maxInterval: 20,
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle: {
                            color: "rgb(44, 248, 255)"
                        },
                        splitLine: {
                            show: true,
                            interval: 1,
                            lineStyle: {
                                color: ["#567195"],
                                solid: "dashed"
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color: "#147a86"
                            }
                        }
                    },
                    series: [
                        {
                            name: "上周",
                            type: "bar",                            
                            barWidth:"10px",
                            data: [20, 49, 70, 23, 25, 76, 13, 162],
                            color: "#57c8f5"
                        },
                        {
                            name: "同比",
                            type: "line",
                            data: [12, 21, 33, 10, 63, 10, 12, 23],
                            color: "#d14a61"
                        },
                        {
                            name: "环比",
                            type: "line",
                            data: [15, 82, 13, 14, 15, 135, 113, 153],
                            color: "#8363f9"
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形
            lineColumns1() {
                let myChart = this.$echarts.init(document.getElementById("lineColumns1"));
                let option = {
                    title: {
                        x: "left",
                        text: "天气类型分布统计", // 主标题
                        textStyle: {
                            fontSize:14,
                            fontWeight:"normal",
                            color:"#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle:{
                            color: "#3ba7c9",
                        },
                        itemGap: 0 //主副标题距离
                    },
                    tooltip: {
                        show: true
                    },
                    legend: {
                        show: true,
                        type: "scroll",
                        orient: "vertical",
                        right: "120",
                        top: "80",
                        data:[
                            {
                                name: "1",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            {
                                name: "2",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            {
                                name: "3",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            {
                                name: "4",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            {
                                name: "5",
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            {
                                name: "6",
                                textStyle: {
                                    color: "#fff"
                                }
                            }
                        ],
                    }, // 图例组件
                    label: {
                        show: true,
                        position: "right",
                        color: "#fff",
                    }, // 标签字
                    series: [
                        {
                            name: "数量",
                            type: "pie",
                            center: ["30%", "50%"],
                            radius : [30, 120],
                            roseType: "area",
                            label: {
                                position: "inside"
                            },
                            data: [
                                {
                                    value: 200,
                                    name: "6",
                                },
                                {
                                    value: 400,
                                    name: "5",
                                },
                                {
                                    value: 600,
                                    name: "4",
                                },
                                {
                                    value: 650,
                                    name: "1",
                                },
                                {
                                    value: 500,
                                    name: "2",
                                },
                                {
                                    value: 550,
                                    name: "3",
                                },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 斑马线
            lineColumns2() {
                let _this = this;
                let myChart = this.$echarts.init(document.getElementById("lineColumns2"));
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        width: "100%",
                        left: 50,
                        height: "70%"
                    },
                    title: {
                        text: '斑马线覆盖率环比同比',
                        left: 50,
                        top: 10,
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#3ba7c9',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#3ba7c9',
                        },
                        itemGap: 0
                    },
                    legend: {
                        type: "plain",
                        top: 0,
                        right: 40,
                        width: "300px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        pageIconColor: "#ffffff"
                    },
                    // 右侧标签内容显示距离
                    grid: {
                        right: 50
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:'#147a86'
                            }
                        },
                        data: this.areaName
                    },
                    yAxis: {
                        type: 'value',
                        maxInterval: 20,
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle: {
                            color: "rgb(44, 248, 255)"
                        },
                        splitLine: {
                            show: true,
                            interval: 1,
                            lineStyle: {
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle:{
                                color:'#147a86'
                            }
                        }
                    },
                    series: [
                        {
                            name:'同比',
                            type:'line',
                            data:this.zebraCrossingCR_YearOnYear,
                            label: {
                                show: true,
                                position: "top",
                                align: "center",
                                formatter: function (value) {
                                    return "{a|同比:" + value.data + "}\n{b|环比:" + _this.zebraCrossingCR_RingRatio[value.dataIndex] + "}";
                                },
                                rich: {
                                    a: {
                                        color: "#fff",
                                        lineHeight: 17
                                    },
                                    b: {
                                        color: "#fff",
                                        lineHeight: 17
                                    }
                                }
                            },
                            color:'#d14a61'
                        },
                        {
                            name:'环比',
                            type:'line',
                            data:this.zebraCrossingCR_RingRatio,
                            color: "#8363f9"
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 外场设备
            lineColumns3() {
                let _this = this;
                let myChart = this.$echarts.init(document.getElementById("lineColumns3"));
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    title: {
                        text: '外场设施数量及环比（个）',
                        left: 20,
                        top: 10,
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#3ba7c9',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#3ba7c9',
                        },
                        itemGap: 0
                    },
                    legend: {
                        type: "plain",
                        top: 10,
                        right: 5,
                        width: "400px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        pageIconColor: "#ffffff"
                    },
                    // 右侧标签内容显示距离
                    grid: {
                        left: 60
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            show: false,
                            lineStyle:{
                                color:'#147a86'
                            }
                        },
                        data: this.areaName
                    },
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: "rgb(44, 248, 255)"
                            },
                            splitLine: {
                                show: true,
                                interval: 1,
                                lineStyle: {
                                    color: ['#147a86'],
                                    type: 'dotted'
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#147a86'
                                }
                            }
                        },
                        {
                            type: 'value',
                            axisTick: {
                                alignWithLabel: true
                            },
                            nameTextStyle: {
                                color: "rgb(44, 248, 255)"
                            },
                            splitLine: {
                                show: true,
                                interval: 1,
                                lineStyle: {
                                    color: ['#147a86'],
                                    type: 'dotted'
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#147a86'
                                }
                            }
                        },
                        {
                            type: "value",
                            name: '同比/环比',
                            minInterval: 0,
                            position: "right",
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#147a86"
                                }
                            }, // y轴样式
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: ["#147a86"],
                                    type: 'dotted'
                                }
                            } // y轴轴线样式
                        },
                        {
                            type: "value",
                            name: '同比/环比',
                            minInterval: 0,
                            position: "right",
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#147a86"
                                }
                            }, // y轴样式
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    // 使用深浅的间隔色
                                    color: ["#147a86"],
                                    type: 'dotted'
                                }
                            } // y轴轴线样式
                        },
                    ],
                    color: ['#06CBD1', '#3F89D1'],
                    series: [
                        {
                            name:'总数量',
                            type:'bar',
                            barWidth:20,
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                position: [-20, -5],
                                align: "center",
                                formatter: function (value) {
                                    return "{a|总数量:" + value.data + "}\n{b|环比:" +  (_this.totalOutfieldEquipmentRingRatio[value.dataIndex]=== null ? " - " : _this.totalOutfieldEquipmentRingRatio[value.dataIndex]) + "}\n{c|同比:" + (_this.totalOutfieldEquipmentYearOnYear[value.dataIndex] === null ? " - " : _this.totalOutfieldEquipmentYearOnYear[value.dataIndex]) + "}";
                                },
                                rich: {
                                    a: {
                                        color: "#fff",
                                        lineHeight: 17
                                    },
                                    b: {
                                        color: "#fff",
                                        lineHeight: 17
                                    },
                                    c: {
                                        color: "#fff",
                                        lineHeight: 17
                                    }
                                }
                            },
                            data: this.totalOutfieldEquipmentSum,
                        },
                        {
                            name:'新增数量',
                            type:'bar',
                            barWidth:20,
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                position: "top",
                                align: "center",
                                formatter: "{c}"
                            },
                            data:this.totalOutfieldEquipmentNew,
                        },
                         {
                             name:'同比',
                             type:'line',
                             yAxisIndex: 1,
                             data:this.totalOutfieldEquipmentYearOnYear,
                             color:'#d14a61'
                         },
                        {
                            name:'环比',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.totalOutfieldEquipmentRingRatio,
                            color: "#8363f9"
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            lineColumns4() {
                let myChart = this.$echarts.init(document.getElementById("lineColumns4"));
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 处理参数
            getParams(timer) {
                let endTime;
                let startTime;
                let area = "";
                let equipmentType = "";
                let nowDate = new Date();
                if (!timer || timer === "") {
                    endTime = this.timedata;
                    startTime = this.timesevenl();
                    area = undefined,
                    equipmentType = undefined
                } else {
                    endTime = timer.endTime;
                    startTime = timer.startTime;
                    area = timer.area;
                    equipmentType = timer.equipmentType;
                }
                let params = {
                    "startTime": startTime,
                    "endTime": endTime,
                    "area": area,
                    "equipmentType": equipmentType
                }
                return params;
            },
            getParamsl(timer) {
                let endTime;
                let startTime;
                let area = "";
                let equipmentType = "";
                let nowDate = new Date();
                if (!timer || timer === "") {
                    endTime = this.thistime;
                    startTime = this.timeseven(-7);
                    area = undefined,
                    equipmentType = undefined
                } else {
                    endTime = timer.endTimel;
                    startTime = timer.startTimel;
                    area = timer.area;
                    equipmentType = timer.equipmentType;
                }
                let params = {
                    "startTime": startTime,
                    "endTime": endTime,
                    "area": area,
                    "equipmentType": equipmentType
                }
                return params;
            },
            // 请求交通事故数量统计,如果有timer是OD规律的查询 startTime=0&endTime=30000000000000
            getTrafficNumber(timer) {
                axios.get("/reportForm/", {params: this.getParams(timer)}).then((res) => {
                    
                    let tablevalue = res.data.data;
                    let areaName = [];
                    let electronicPoliceCR = [];
                    let electronicPoliceCR_RingRatio = [];
                    let electronicPoliceCR_YearOnYear = [];
                    let pedestrianLightCR = [];
                    let pedestrianLightCR_RingRatio = [];
                    let pedestrianLightCR_YearOnYear = [];
                    let totalOutfieldEquipmentNew = [];
                    let totalOutfieldEquipmentRingRatio = [];
                    let totalOutfieldEquipmentSum = [];
                    let totalOutfieldEquipmentYearOnYear = [];
                    let zebraCrossingCR = [];
                    let zebraCrossingCR_RingRatio = [];
                    let zebraCrossingCR_YearOnYear = [];
                    tablevalue.map(val => {
                        areaName.push(val.areaName);
                        electronicPoliceCR.push(val.electronicPoliceCR);
                        electronicPoliceCR_RingRatio.push(val.electronicPoliceCR_RingRatio);
                        electronicPoliceCR_YearOnYear.push(val.electronicPoliceCR_YearOnYear);
                        pedestrianLightCR.push(val.pedestrianLightCR);
                        pedestrianLightCR_RingRatio.push(val.pedestrianLightCR_RingRatio);
                        pedestrianLightCR_YearOnYear.push(val.pedestrianLightCR_YearOnYear);
                        totalOutfieldEquipmentNew.push(val.totalOutfieldEquipmentNew);
                        totalOutfieldEquipmentRingRatio.push(val.totalOutfieldEquipmentRingRatio);
                        totalOutfieldEquipmentSum.push(val.totalOutfieldEquipmentSum);
                        totalOutfieldEquipmentYearOnYear.push(val.totalOutfieldEquipmentYearOnYear);
                        zebraCrossingCR.push(val.zebraCrossingCR);
                        zebraCrossingCR_RingRatio.push(val.zebraCrossingCR_RingRatio);
                        zebraCrossingCR_YearOnYear.push(val.zebraCrossingCR_YearOnYear);
                    })
                    this.tablevalue = tablevalue;
                    this.peiList1 = this.fugailv_d();
                    this.peiList2 = this.fugailv_r();
                    this.peiList3 = this.fugailv_b();
                    this.areaName = areaName;
                    this.electronicPoliceCR = electronicPoliceCR;
                    this.electronicPoliceCR_RingRatio = electronicPoliceCR_RingRatio;
                    this.electronicPoliceCR_YearOnYear = electronicPoliceCR_YearOnYear;
                    this.pedestrianLightCR = pedestrianLightCR;
                    this.pedestrianLightCR_RingRatio = pedestrianLightCR_RingRatio;
                    this.pedestrianLightCR_YearOnYear = pedestrianLightCR_YearOnYear;
                    this.totalOutfieldEquipmentNew = totalOutfieldEquipmentNew;
                    this.totalOutfieldEquipmentRingRatio = totalOutfieldEquipmentRingRatio;
                    this.totalOutfieldEquipmentSum = totalOutfieldEquipmentSum;
                    this.totalOutfieldEquipmentYearOnYear = totalOutfieldEquipmentYearOnYear;
                    this.zebraCrossingCR = zebraCrossingCR;
                    this.zebraCrossingCR_RingRatio = zebraCrossingCR_RingRatio;
                    this.zebraCrossingCR_YearOnYear = zebraCrossingCR_YearOnYear;
                    
                    setTimeout(()=>{
                        this.Columns2();
                        this.Caketype1();
                        this.lineColumns2();
                        this.lineColumns3();
                        this.mapLoading.close();
                    },2000)
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                })
            },
            // 排行
            duration(timer) {
                sjhAxios.post("sjh2/strategysupport/internalManage/acdRoad", this.getParamsl(timer)).then((res) => {
                    
                    let tablevalue = res.data.data;
                    for(let i in tablevalue){
                        if(tablevalue[i].rank<6){
                            this.tableData.push(tablevalue[i])
                        } else if (5<tablevalue[i].rank && tablevalue[i].rank<11){
                            this.tableData1.push(tablevalue[i])
                        } else if (10<tablevalue[i].rank && tablevalue[i].rank<16){
                            this.tableData2.push(tablevalue[i])
                        } else {
                            this.tableData3.push(tablevalue[i])
                        }
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                })
            },
        },
        beforeDestroy (){
            clearInterval(this.t)
        },
        async mounted() {
            let _this = this;
            let mapLoading = Loading.service({
                lock: true,
                text: "正在整理所有视图，给您规划排版，请耐心等待...",
                spinner: "el-icon-loading",
            });
            let timer = this.$route.query.timer;
            console.log(timer)
            let params = "";
            if (timer) {
               params = this.getParams(timer);
            }
            if(timer === "" && timer === null){
                await axios.get("/reportForm/", {params: this.getParams(timer)}).then(async(res) => {
                    
                    let tablevalue = res.data.data;
                    let areaName = [];
                    let electronicPoliceCR = [];
                    let electronicPoliceCR_RingRatio = [];
                    let electronicPoliceCR_YearOnYear = [];
                    let pedestrianLightCR = [];
                    let pedestrianLightCR_RingRatio = [];
                    let pedestrianLightCR_YearOnYear = [];
                    let totalOutfieldEquipmentNew = [];
                    let totalOutfieldEquipmentRingRatio = [];
                    let totalOutfieldEquipmentSum = [];
                    let totalOutfieldEquipmentYearOnYear = [];
                    let zebraCrossingCR = [];
                    let zebraCrossingCR_RingRatio = [];
                    let zebraCrossingCR_YearOnYear = [];
                    tablevalue.map(val => {
                        areaName.push(val.areaName);
                        electronicPoliceCR.push(val.electronicPoliceCR);
                        electronicPoliceCR_RingRatio.push(val.electronicPoliceCR_RingRatio);
                        electronicPoliceCR_YearOnYear.push(val.electronicPoliceCR_YearOnYear);
                        pedestrianLightCR.push(val.pedestrianLightCR);
                        pedestrianLightCR_RingRatio.push(val.pedestrianLightCR_RingRatio);
                        pedestrianLightCR_YearOnYear.push(val.pedestrianLightCR_YearOnYear);
                        totalOutfieldEquipmentNew.push(val.totalOutfieldEquipmentNew);
                        totalOutfieldEquipmentRingRatio.push(val.totalOutfieldEquipmentRingRatio);
                        totalOutfieldEquipmentSum.push(val.totalOutfieldEquipmentSum);
                        totalOutfieldEquipmentYearOnYear.push(val.totalOutfieldEquipmentYearOnYear);
                        zebraCrossingCR.push(val.zebraCrossingCR);
                        zebraCrossingCR_RingRatio.push(val.zebraCrossingCR_RingRatio);
                        zebraCrossingCR_YearOnYear.push(val.zebraCrossingCR_YearOnYear);
                    })
                    this.tablevalue = tablevalue;
                    this.peiList1 = await this.fugailv_d();
                    this.peiList2 = await this.fugailv_r();
                    this.peiList3 = await this.fugailv_b();
                    this.areaName = areaName;
                    this.electronicPoliceCR = electronicPoliceCR;
                    this.electronicPoliceCR_RingRatio = electronicPoliceCR_RingRatio;
                    this.electronicPoliceCR_YearOnYear = electronicPoliceCR_YearOnYear;
                    this.pedestrianLightCR = pedestrianLightCR;
                    this.pedestrianLightCR_RingRatio = pedestrianLightCR_RingRatio;
                    this.pedestrianLightCR_YearOnYear = pedestrianLightCR_YearOnYear;
                    this.totalOutfieldEquipmentNew = totalOutfieldEquipmentNew;
                    this.totalOutfieldEquipmentRingRatio = totalOutfieldEquipmentRingRatio;
                    this.totalOutfieldEquipmentSum = totalOutfieldEquipmentSum;
                    this.totalOutfieldEquipmentYearOnYear = totalOutfieldEquipmentYearOnYear;
                    this.zebraCrossingCR = zebraCrossingCR;
                    this.zebraCrossingCR_RingRatio = zebraCrossingCR_RingRatio;
                    this.zebraCrossingCR_YearOnYear = zebraCrossingCR_YearOnYear;

                    await this.duration(timer);
                    this.$nextTick(() => {
                        
                        setTimeout(async()=>{
                            this.Columns2();
                            this.Caketype1();
                            this.lineColumns2();
                            this.lineColumns3();
                            this.$nextTick(() => {
                                setTimeout(()=> {
                                    let time = this.$tools.nowTime();
                                    let gis = document.getElementsByClassName("maincssall")[0];
                                    // domtoimage.toBlob(gis, {style: "::-webkit-scrollbar"}).then(function (blob) {
                                    //     mapLoading.close();
                                    //     _this.$store.state.isExportParams = params;
                                    //     _this.$store.state.isExport = true;
                                    //     _this.$router.go(-1);
                                    //     saveAs(blob, "设施运行分析" + time + ".png");
                                    // });
                                    html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                                        mapLoading.close();
                                        _this.$store.state.isExportParams = params;
                                        _this.$store.state.isExport = true;
                                        _this.$router.go(-1);
                                        if (navigator.msSaveBlob) {
                                            navigator.msSaveBlob(canvas.msToBlob(), "设施运行分析" + time + ".png");
                                        } else {
                                            canvas.toBlob(function(blob) {saveAs(blob, "设施运行分析" + time + ".png");});
                                        }
                                    });
                                },2000);
                            })
                        },10000)
                    })
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                })
            } else {
                await axios.get("/reportForm/", {params: params}).then(async(res) => {
                    let tablevalue = res.data.data;
                    let areaName = [];
                    let electronicPoliceCR = [];
                    let electronicPoliceCR_RingRatio = [];
                    let electronicPoliceCR_YearOnYear = [];
                    let pedestrianLightCR = [];
                    let pedestrianLightCR_RingRatio = [];
                    let pedestrianLightCR_YearOnYear = [];
                    let totalOutfieldEquipmentNew = [];
                    let totalOutfieldEquipmentRingRatio = [];
                    let totalOutfieldEquipmentSum = [];
                    let totalOutfieldEquipmentYearOnYear = [];
                    let zebraCrossingCR = [];
                    let zebraCrossingCR_RingRatio = [];
                    let zebraCrossingCR_YearOnYear = [];
                    tablevalue.map(val => {
                        areaName.push(val.areaName);
                        electronicPoliceCR.push(val.electronicPoliceCR);
                        electronicPoliceCR_RingRatio.push(val.electronicPoliceCR_RingRatio);
                        electronicPoliceCR_YearOnYear.push(val.electronicPoliceCR_YearOnYear);
                        pedestrianLightCR.push(val.pedestrianLightCR);
                        pedestrianLightCR_RingRatio.push(val.pedestrianLightCR_RingRatio);
                        pedestrianLightCR_YearOnYear.push(val.pedestrianLightCR_YearOnYear);
                        totalOutfieldEquipmentNew.push(val.totalOutfieldEquipmentNew);
                        totalOutfieldEquipmentRingRatio.push(val.totalOutfieldEquipmentRingRatio);
                        totalOutfieldEquipmentSum.push(val.totalOutfieldEquipmentSum);
                        totalOutfieldEquipmentYearOnYear.push(val.totalOutfieldEquipmentYearOnYear);
                        zebraCrossingCR.push(val.zebraCrossingCR);
                        zebraCrossingCR_RingRatio.push(val.zebraCrossingCR_RingRatio);
                        zebraCrossingCR_YearOnYear.push(val.zebraCrossingCR_YearOnYear);
                    })
                    this.tablevalue = tablevalue;
                    this.peiList1 = this.fugailv_d();
                    this.peiList2 = this.fugailv_r();
                    this.peiList3 = this.fugailv_b();
                    this.areaName = areaName;
                    this.electronicPoliceCR = electronicPoliceCR;
                    this.electronicPoliceCR_RingRatio = electronicPoliceCR_RingRatio;
                    this.electronicPoliceCR_YearOnYear = electronicPoliceCR_YearOnYear;
                    this.pedestrianLightCR = pedestrianLightCR;
                    this.pedestrianLightCR_RingRatio = pedestrianLightCR_RingRatio;
                    this.pedestrianLightCR_YearOnYear = pedestrianLightCR_YearOnYear;
                    this.totalOutfieldEquipmentNew = totalOutfieldEquipmentNew;
                    this.totalOutfieldEquipmentRingRatio = totalOutfieldEquipmentRingRatio;
                    this.totalOutfieldEquipmentSum = totalOutfieldEquipmentSum;
                    this.totalOutfieldEquipmentYearOnYear = totalOutfieldEquipmentYearOnYear;
                    this.zebraCrossingCR = zebraCrossingCR;
                    this.zebraCrossingCR_RingRatio = zebraCrossingCR_RingRatio;
                    this.zebraCrossingCR_YearOnYear = zebraCrossingCR_YearOnYear;

                    await this.duration(timer);
                    this.$nextTick(() => {
                        setTimeout(async()=>{
                            this.Columns2();
                            this.Caketype1();
                            this.lineColumns2();
                            this.lineColumns3();
                            this.$nextTick(() => {
                                setTimeout(()=> {
                                    let time = this.$tools.nowTime();
                                    let gis = document.getElementsByClassName("maincssall")[0];
                                    // domtoimage.toBlob(gis, {style: "::-webkit-scrollbar"}).then(function (blob) {
                                    //     mapLoading.close();
                                    //     _this.$store.state.isExportParams = params;
                                    //     _this.$store.state.isExport = true;
                                    //     _this.$router.go(-1);
                                    //     saveAs(blob, "设施运行分析" + time + ".png");
                                    // });
                                    html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                                        mapLoading.close();
                                        _this.$store.state.isExportParams = params;
                                        _this.$store.state.isExport = true;
                                        _this.$router.go(-1);
                                        if (navigator.msSaveBlob) {
                                            navigator.msSaveBlob(canvas.msToBlob(), "设施运行分析" + time + ".png");
                                        } else {
                                            canvas.toBlob(function(blob) {saveAs(blob, "设施运行分析" + time + ".png");});
                                        }
                                    });
                                },2000);
                            })
                        },10000)
                    })
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                })
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        console.log(that.screenWidth)
                        that.init()
                        that.timer = false
                    }, 4000)
                }
            },

            "changeDivW": {
                handler: function (val ,old) {
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style>
    .maincss .subordinateSubject {
        border: none;
    }
</style>

<style scoped>
    /*深层改变环形图的渲染*/
    .colordi /deep/ svg > path:nth-child(2){
        stroke-dashoffset: 0px !important;
    }
    @media screen and (max-width: 200px) {
        .yhcolor {width:10px;}

    }
    /*加高顶部高度*/
    .maintop /deep/ .el-carousel__container {
        height: 100%;
    }
    .maincss .zpEarchl+.zpEarchl{
        margin-left: 1.5%;
    }
    .yhcolor /deep/ svg > path:first-child{
        stroke: #192A41 !important;
    }
    .flexRow {

    }
    .FacilityTable {
        padding: 0 30px;
    }
    .titileName{
        text-align: left;
        border-bottom: 1px solid #5abdfc;
        width: 80%;
        height:12px;
        color: #5abdfc;
        font-size:14px;
        margin: 15px 0 10px 0;
        padding: 0 0 20px 0;
    }
    .mainone {
        display: flex;
        justify-content: space-between;
    }
    .mineTable {
        width:21%;
    }
    .mainone .yangshi1 {
        background-color: #193D6E;
        color: #ff8400;
        font-size: 16px;
        width: 110px;
        border-radius: 5px;
    }
    .mainone .yangshi1 p {
        font-size: 8px;
    }
    .mainone .yangshi2 {
        background-color: #09132D;
        font-size: 20px;
        width: 80px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .maincss {
       /* background-color: #0D1E35;*/
    }
    hr {
        margin: 0 40px 35px 40px;
        border: 1px solid;
        background-color:#33A5FF;
        color:#33A5FF;
    }
    .mainone {
        font-family: "PingFangSC-Regular";
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;
        /* height: 20%; */
        width: 90%;
        margin-left: 2%;
        margin-bottom: 3%;
    }
    .maintop {
        height: 39%;
        margin-bottom: 1%;
    }
    .maintwol {
        display: flex;
        height: 40%;
        margin-bottom: 1%;
    }
    .mainthree {
        display: flex;
        height: 40%;
        margin-bottom: 1%;
    }
    .mainfourl {
        display: flex;
        height: 40%;
        margin-bottom: 1%;
    }
    .mainfive {
        display: flex;
        height: 47%;
    }
    .mainsix {
        display: flex;
        height: 47%;
    }
</style>