<template>
    <!-- 交通秩序分析 -->
    <div class="maincss" @mouseenter="onMouseOver()" @mouseleave="onMouseOut()">
        <div style="height:90vh;background-color: #081f3f;overflow: auto">
            <api>
                <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                    :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
                <div slot="searchBoxBar" class="operationl">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation" style="margin-right:15px;"></bt>
                </div>
            </api>
            <span class="save" style="background-color: #081f3f">
                <!--<div class="mainone">
                    <table class="mineTable" v-for="(item, index) in tablevalue" :key="index">
                        <tr style="height: 50px;">
                            <td class="yangshi1">{{item.area}}<p>负秩序事件数量</p></td>
                            <td class="yangshi2">{{item.count}}</td>
                        </tr>
                    </table>
                </div>-->
                <div class="maintwo">
                    <div id="Caketype1" class="zpEarch" style="width: 100%;height:100%"></div>
                </div>
                <div class="mainthree">
                        <div id="Caketype2" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                        </div>
                    <div class="mainfour">
                        <div id="Columns1" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                <div class="mainfour">
                        <div id="Columns2" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns3" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns4" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns5" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns6" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns7" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns8" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns9" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns10" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns11" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns12" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns13" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns14" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
                 <div class="mainfour">
                        <div id="Columns15" class="zpEarch"
                             style="width: 100%;height:100%;"></div>
                    </div>
            </span>
            
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
                timeaa: 15000,
                paramsl:{},
                listhour: [],
                listhour1: [],
                listhour2: [],
                listhour3: [],
                listhour4: [],
                listhour5: [],
                listhour6: [],
                listhour7: [],
                listhour8: [],
                listhour9: [],
                listhour10: [],
                listhour11: [],
                listhour12: [],
                listhour13: [],

                shijianTypecount: [],
                shijianTypeeventType: [],
                Eventchange : [
                    {dmz : "1",dmsm1 : "交通溢出拥堵"},
                    {dmz : "2",dmsm1 : "路段交通严重拥堵"},
                    {dmz : "4",dmsm1 : "信号灯不正常显示"},
                    {dmz : "5",dmsm1 : "交通事故"},
                    {dmz : "6",dmsm1 : "车辆逆行"},
                    {dmz : "7",dmsm1 : "不文明停车"},
                    {dmz : "8",dmsm1 : "烟雾/火灾"},
                    {dmz : "9",dmsm1 : "道路积水"},
                    {dmz : "10",dmsm1 : "机动车闯红灯"},
                    {dmz : "11",dmsm1 : "行人闯红灯"},
                    {dmz : "12",dmsm1 : "行人翻越护栏"},
                    {dmz : "13",dmsm1 : "非机动车闯灯"},
                    {dmz : "14",dmsm1 : "路口车辆交通秩序混乱"},
                    {dmz : "15",dmsm1 : "牌照无法识别"},
                    {dmz : "16",dmsm1 : "状态异常车辆识别"},
                    {dmz : "17",dmsm1 : "车辆偏离路线"},
                    {dmz : "18",dmsm1 : "交通流量异常"},
                    {dmz : "19",dmsm1 : "车型构成异常"},
                    {dmz : "20",dmsm1 : "违反限行"},
                    {dmz : "21",dmsm1 : "报废车辆上路行驶"},
                    {dmz : "22",dmsm1 : "逾期未检车辆上路行驶"},
                    {dmz : "24",dmsm1 : "外地车数量异常"},
                    {dmz : "26",dmsm1 : "施工占道"}
                ],
                // 搜索传参
                searchName: [
                    { searchPlaceholder: "查询区域", id: "", type: 1, url: "", Sendkey: "ares", data: this.$store.state.area },
                    { searchPlaceholder: "查询日期", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: "" },
                    { searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: "" }
                ],
                tablevalue : [
                   /* {

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
                    }*/
                ],
                tsmiqoq: "",
                tsmiyoy: "",
                count: "",
                area: "",
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ]
            }
        },
        methods : {
            onMouseOver(){
               this.timeaa = 100000
            },
            onMouseOut(){
                this.timeaa = 15000
            },
            // 搜索回调
            searchEvent(payload) {
                /*if (payload.startTime === undefined || payload.endTime === undefined) {
                    this.$showSimpleMessage("请选择时间区间", "error");
                    return;
                }*/
                let timer = {
                    endTime: payload.endTime === undefined ? "" : this.$tools.getDays(new Date(payload.endTime)),
                    startTime: payload.startTime === undefined ? "" : this.$tools.getDays(new Date(payload.startTime)),
                    area: payload.ares === undefined ? "" : payload.ares
                }
                this.paramsl = timer;
                this.orderRegionRank(timer);
                this.duration(timer);
                // this.getTrafficDay(timer);
                // this.accidentType(timer);
                // this.accidentCar(timer);
                // this.accidentCompare(timer);
                // this.accidentWeather(timer);
                // this.accidentPerson(timer);
            },
            // 按钮组件回调
            operation(data) {
                let args = this.UnitTopButton[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 导出功能
            DerivedTables() {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("save")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                    _this.$router.go(-1);
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "交通秩序分析" + time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "交通秩序分析" + time + ".png");});
                    }
                });
            },
            // 绘制图形1
            Columns1() {
                let myChart = this.$echarts.init(document.getElementById("Columns1"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": false,
                            "行人闯红灯": false,
                            "行人翻越护栏": false,
                            "非机动车闯灯": false,
                            "路口车辆交通秩序混乱": false,
                            "牌照无法识别": false,
                            "状态异常车辆识别": false,
                            "车辆偏离路线": false,
                            "交通流量异常": false,
                            "车型构成异常": false,
                            "违反限行": false,
                            "报废车辆上路行驶": false,
                            "逾期未检车辆上路行驶": false,
                            "外地车数量异常": false,
                            "施工占道": false,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形2
            Columns2() {
                let myChart = this.$echarts.init(document.getElementById("Columns2"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": false,
                            "行人闯红灯": false,
                            "行人翻越护栏": false,
                            "非机动车闯灯": false,
                            "路口车辆交通秩序混乱": false,
                            "牌照无法识别": false,
                            "状态异常车辆识别": false,
                            "车辆偏离路线": false,
                            "交通流量异常": false,
                            "车型构成异常": false,
                            "违反限行": false,
                            "报废车辆上路行驶": false,
                            "逾期未检车辆上路行驶": false,
                            "外地车数量异常": false,
                            "施工占道": false,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour1,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形3
            Columns3() {
                let myChart = this.$echarts.init(document.getElementById("Columns3"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": false,
                            "行人闯红灯": false,
                            "行人翻越护栏": false,
                            "非机动车闯灯": false,
                            "路口车辆交通秩序混乱": false,
                            "牌照无法识别": false,
                            "状态异常车辆识别": false,
                            "车辆偏离路线": false,
                            "交通流量异常": false,
                            "车型构成异常": false,
                            "违反限行": false,
                            "报废车辆上路行驶": false,
                            "逾期未检车辆上路行驶": false,
                            "外地车数量异常": false,
                            "施工占道": false,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour2,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形4
            Columns4() {
                let myChart = this.$echarts.init(document.getElementById("Columns4"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": false,
                            "行人闯红灯": false,
                            "行人翻越护栏": false,
                            "非机动车闯灯": false,
                            "路口车辆交通秩序混乱": false,
                            "牌照无法识别": false,
                            "状态异常车辆识别": false,
                            "车辆偏离路线": false,
                            "交通流量异常": false,
                            "车型构成异常": false,
                            "违反限行": false,
                            "报废车辆上路行驶": false,
                            "逾期未检车辆上路行驶": false,
                            "外地车数量异常": false,
                            "施工占道": false,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour3,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形5
            Columns5() {
                let myChart = this.$echarts.init(document.getElementById("Columns5"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": false,
                            "行人闯红灯": false,
                            "行人翻越护栏": false,
                            "非机动车闯灯": false,
                            "路口车辆交通秩序混乱": false,
                            "牌照无法识别": false,
                            "状态异常车辆识别": false,
                            "车辆偏离路线": false,
                            "交通流量异常": false,
                            "车型构成异常": false,
                            "违反限行": false,
                            "报废车辆上路行驶": false,
                            "逾期未检车辆上路行驶": false,
                            "外地车数量异常": false,
                            "施工占道": false,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour4,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形6
            Columns6() {
                let myChart = this.$echarts.init(document.getElementById("Columns6"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour5,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形7
            Columns7() {
                let myChart = this.$echarts.init(document.getElementById("Columns7"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour6,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形8
            Columns8() {
                let myChart = this.$echarts.init(document.getElementById("Columns8"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour7,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形9
            Columns9() {
                let myChart = this.$echarts.init(document.getElementById("Columns9"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour8,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形10
            Columns10() {
                let myChart = this.$echarts.init(document.getElementById("Columns10"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour9,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形11
            Columns11() {
                let myChart = this.$echarts.init(document.getElementById("Columns11"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour10,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形12
            Columns12() {
                let myChart = this.$echarts.init(document.getElementById("Columns12"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour11,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形13
            Columns13() {
                let myChart = this.$echarts.init(document.getElementById("Columns13"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour12,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形14
            Columns14() {
                let myChart = this.$echarts.init(document.getElementById("Columns14"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour13,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形15
            Columns15() {
                let myChart = this.$echarts.init(document.getElementById("Columns15"));
                let option = {
                    title: {
                        x: "left",
                        text: "负秩序事件24小时数量分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        left:10,
                        top: 10,
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "scroll",
                        width: "660px",
                        orient: "horizontal",
                        top: 20,
                        right: 100,
                        // left: 1000,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: "multiple",
                        selected: {
                            "路段交通严重拥堵": true,
                            "信号灯不正常显示": true,
                            "交通事故": true,
                            "车辆逆行": true,
                            "不文明停车": true,
                            "烟雾/火灾": true,
                            "道路积水": true,
                            "机动车闯红灯": true,
                            "行人闯红灯": true,
                            "行人翻越护栏": true,
                            "非机动车闯灯": true,
                            "路口车辆交通秩序混乱": true,
                            "牌照无法识别": true,
                            "状态异常车辆识别": true,
                            "车辆偏离路线": true,
                            "交通流量异常": true,
                            "车型构成异常": true,
                            "违反限行": true,
                            "报废车辆上路行驶": true,
                            "逾期未检车辆上路行驶": true,
                            "外地车数量异常": true,
                            "施工占道": true,
                        },
                        pageIconColor: "#ffffff",
                        icon: "circle",
                        itemWidth: 15
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{c} (起)"
                    },
                    grid:{
                        left: "5%",
                        width:"90%",
                        top: "60px"
                    }, // 整体位置
                    xAxis: {
                        data: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"] ,
                        axisLine: {
                            lineStyle : {
                                color: "#147a86"
                            }
                        },
                        name: "/时",
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
                                color: "#147a86"
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
                    itemStyle: {
                        normal:{
                            color:function(params) {
                                //自定义颜色
                                var colorList = [
                                    '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                                ];
                                return colorList[params.dataIndex]
                            }}
                    },
                    series: this.listhour14,
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 绘制图形
            Caketype1() {
                let myChart = this.$echarts.init(document.getElementById("Caketype1"));
                let option = {
                    title: {
                        x:"left",
                        text: "各行政区负秩序事件数量及环比同比", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                        left:10,
                        top: 10,
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "plain",
                        top: 10,
                        right: 100,
                        // width: "150px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        // selectedMode: false,
                        pageIconColor: "#ffffff",
                    },
                    grid: {
                        left: "5%",
                        width:"90%",
                        top: "30%"
                    }, // 整体位置
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross"
                        },
                        formatter: "{a0}: {c0}%</br> {a1}: {c1}(起) "
                    },
                    xAxis: {
                        data: this.area,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "#567195",
                            }
                        }, // 分割线
                        nameRotate : 50,
                        axisLine: {
                            lineStyle : {
                                color:"#147a86"
                            }
                        } // x轴样式
                    },
                    yAxis: [
                        {
                            type: "value",
                            name: '数量',
                            minInterval: 0,
                            axisLine: {
                                show : true,
                                lineStyle : {
                                    color:"#147a86"
                                }
                            }, // y轴样式
                            splitLine: {
                                show : false,
                                lineStyle : {
                                    // 使用深浅的间隔色
                                    color: ["#147a86"],
                                }
                            } // y轴轴线样式
                        },
                        {
                            type: "value",
                            name: '百分比',
                            minInterval: 0,
                           /* max:1.2,*/
                            position: "right",
                            axisLine: {
                                show : true,
                                lineStyle : {
                                    color:"#147a86"
                                }
                            }, // y轴样式
                            offset: 10,
                            splitLine: {
                                show : false,
                                lineStyle : {
                                    // 使用深浅的间隔色
                                    color: ["#147a86"],
                                    type : 'dotted'
                                }
                            } // y轴轴线样式
                        },
                    ],
                    // label: {
                    //     show: true,
                    //     position: "top",
                    //     color: "#fff",
                    // }, // 标签字
                    series: [
                        {
                            name:"负秩序事件数量环比",
                            type:"line",
                            yAxisIndex: 1,
                            data:this.tsmiqoq,
                            color:"#FF720F"
                        },
                       /* {
                            name:"负秩序事件数量排名环比",
                            type:"line",
                            yAxisIndex: 1,
                            data:this.tsmiyoy,
                            color: "#9B7731"
                        },*/
                        {
                            name:"负秩序事件数量",
                            type:"bar",
                            barWidth:25,
                            data:this.count,
                            itemStyle:{
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#26C5FE"
                                    }, {
                                        offset: 1,
                                        color: "#508DFF"
                                    }])
                                }
                            },
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
                    title: {
                        x:"left",
                        text: "负秩序事件类型分布（起）", // 主标题
                        textStyle: {
                            fontSize: 14,
                            fontWeight: "normal",
                            color: "#3ba7c9",
                            fontFamily: "PingFangSC-Regular"
                        },
                         left:10,
                        top: 10,
                        subtext: "_________________________________________________________________________", // 副标题
                        subtextStyle: {
                            color: "#3ba7c9",
                        },
                        itemGap: 0 //主副标题距离
                    },
                    legend: {
                        type: "plain",
                        top: 10,
                        right: 200,
                        // width: "150px",
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        // selectedMode: false,
                        pageIconColor: "#ffffff",
                    },
                    grid: {
                        left: "5%",
                        width:"90%",
                        top: "30%"
                    }, // 整体位置
                    xAxis: {
                        // data: this.area,
                        type: 'category',
                        axisLabel: {
                            interval:0,
                            rotate:10
                        },
                        data: this.shijianTypeeventType,
                        axisLine: {
                            lineStyle : {
                                color:"#147a86"
                            }
                        } // x轴样式
                    },
                    yAxis: [
                        {
                            type: "value",
                            name: '数量',
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
                                    color: ['#147a86'],
                                    type : 'dotted'
                                }
                            }
                        }
                    ],
                    tooltip: {
                        show: true
                    },
                    label: {
                        show: true,
                        position: "top",
                        color: "#fff",
                    }, // 标签字
                    series: [
                        {
                            name:"津南区",
                            type:"bar",
                            barWidth:25,
                            // data:this.count,
                            data:this.shijianTypecount,
                            itemStyle:{
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#26C5FE"
                                    }, {
                                        offset: 1,
                                        color: "#508DFF"
                                    }])
                                }
                            },
                        }
                    ]
                };
                myChart.setOption(option);
                window.onresize = function () {
                    myChart.resize();
                }
            },
            // 处理参数
            getParams(timer) {
                let endTime;
                let startTime;
                let area = "";
                let nowDate = new Date();
                if (!timer) {
                    endTime = "";
                    startTime = "";
                } else {
                    endTime = timer.endTime;
                    startTime = timer.startTime;
                    area = timer.area;
                }
                let params = {
                    "startTime": startTime,
                    "endTime": endTime,
                    "area": area
                }
                return params;
            },
            // 各种类型负秩序事件数量统计环比/排名环比变化
            orderRegionRank(timer) {
                sjhAxios.post("sjh2/strategysupport/safty/orderAnalysis/orderRegionRank", this.getParams(timer)).then((res) => {
                    let tablevalue = res.data.data;
                    // 环比
                    let tsmiqoq = [];
                    // 同比
                    /*let tsmiyoy = [];*/
                    // 区域
                    let count = [];
                    let area = [];
                    tablevalue.map(val => {
                        if(val.qoq === null){
                            tsmiqoq.push("");
                        } else {
                            tsmiqoq.push(val.qoq.toFixed(2));
                        }
                        /*if(val.yoy === null){
                            tsmiyoy.push("");
                        } else {
                            tsmiyoy.push(val.yoy.toFixed(2));
                        }*/
                        count.push(val.count);
                        area.push(val.area);
                    })
                    this.tablevalue = tablevalue;
                    this.tsmiqoq = tsmiqoq;
                    /*this.tsmiyoy = tsmiyoy;*/
                    this.count = count;
                    this.area = area;
                    this.Caketype1();
                    this.duration(timer);
                }).catch((error) => {
                    this.$showSimpleMessage("无数据", "error");
                    this.duration(timer);
                })
            },
            // 负秩序事件类型分布统计
            duration(timer) {
                sjhAxios.post("sjh2/strategysupport/safty/orderAnalysis/orderType", this.getParams(timer)).then((res) => {
                    let tablevalue = res.data.data;
                    let eventType = [];
                    let count = [];
                    tablevalue.map(val => {
                            for (let g in this.Eventchange) {
                                if (this.Eventchange[g].dmz === val.eventType) {
                                    val.eventType = this.Eventchange[g].dmsm1
                                }
                            };
                        eventType.push(val.eventType);
                        count.push(val.count);
                    })
                    this.shijianTypecount = count;
                    this.shijianTypeeventType = eventType;
                    this.Caketype2();
                    this.durationStatistics(timer);
                }).catch((error) => {
                    this.$showSimpleMessage("无数据", "error");
                    this.durationStatistics(timer);
                })
            },
            // 负秩序事件类型分布统计
            durationStatistics(timer) {
                sjhAxios.post("sjh2/strategysupport/safty/orderAnalysis/duration", this.getParams(timer)).then((res) => {
                    let tablevalue = res.data.data;
                    let listoption = [];
                    let map= {},
                        dest= [];
                    for(var i= 0; i < tablevalue.length; i++){
                        var ai= tablevalue[i];
                        if(!map[ai.eventType]){
                            dest.push({
                                eventType: ai.eventType,
                                count: [ai.count]
                            });
                            map[ai.eventType]= ai;
                        }else{
                            for(var j= 0; j< dest.length; j++){
                                var dj= dest[j];
                                if(dj.eventType == ai.eventType){
                                    dj.count.push(ai.count);
                                    break;
                                }
                            }
                        }
                    }
                    let colordest = []
                    let length = (dest.length/8).toFixed(0);
                    let colorCommon = [
                        '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#ffd593','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#109ef7', '#80bfff', '#d570c6',
                    ]
                    for (let i = 0; i < length; i++) {
                        for (let j in colorCommon) {
                            colordest.push(colorCommon[j])
                        }
                    }
                    for (let i in dest) {
                        dest[i].color=colordest[i];
                    }
                    dest.map(val => {
                        for(let g in this.Eventchange){
                            if(this.Eventchange[g].dmz === val.eventType){
                                val.eventType = this.Eventchange[g].dmsm1
                            }
                        }
                        listoption.push( {
                                data:val.count,
                                name: val.eventType,
                                type: "line",
                                itemStyle:{
                                    color:val.color
                                }
                            }
                       )
                    })
                    this.listhour = listoption[0];
                    this.listhour1 = listoption[1];
                    this.listhour2 = listoption[2];
                    this.listhour3 = listoption[3];
                    this.listhour4 = listoption[4];
                    this.listhour5 = listoption[5];
                    this.listhour6 = listoption[6];
                    this.listhour7 = listoption[7];
                    this.listhour8 = listoption[8];
                    this.listhour9 = listoption[9];
                    this.listhour10 = listoption[10];
                    this.listhour11 = listoption[11];
                    this.listhour12 = listoption[12];
                    this.listhour13 = listoption[13];
                    this.listhour14 = listoption[14];
                    this.Columns1();
                    this.Columns2();
                    this.Columns3();
                    this.Columns4();
                    this.Columns5();
                    this.Columns6();
                    this.Columns7();
                    this.Columns8();
                    this.Columns9();
                    this.Columns10();
                    this.Columns11();
                    this.Columns12();
                    this.Columns13();
                    this.Columns14();
                    this.Columns15();
                }).catch((error) => {
                    this.$showSimpleMessage("无数据", "error");
                })
            },
        },
        beforeDestroy (){
            clearInterval(this.t)
        },
        async mounted() {
            let mapLoading = Loading.service({
                lock: true,
                text: "正在整理所有视图，给您规划排版，请耐心等待...",
                spinner: "el-icon-loading",
                // background: "rgba(10, 40, 100, 0)"
            });
            let timer = this.$route.query.timer;
            let params = "";
            if (timer) {
                params = this.getParams(timer);
            }
            if(timer === "" && timer === null){
                await this.orderRegionRank(timer)
            } else {
                await this.orderRegionRank(timer)
            }
            let _this = this;
            setTimeout(()=> {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("save")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                    mapLoading.close();
                    _this.$store.state.isExportParams = params;
                    _this.$store.state.isExport = true;
                    _this.$router.go(-1);
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "交通秩序分析" + time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "交通秩序分析" + time + ".png");});
                    }
                });
            },5000);
            /*this.orderRegionRank(this.paramsl);
            this.t = setInterval(() => {
                this.orderRegionRank(this.paramsl);
            },this.timeaa)*/

            // this.duration();
            // this.durationStatistics();
        }
    }
</script>

<style>
.maincss .subordinateSubject {
    border: none;
}
</style>

<style scoped>
    .maintop /deep/ .el-carousel__container {
        height: 90% !important;
    }
    .maintop {
        height: 50%;
        margin-top: 1%;
        margin-bottom: 1%;
    }
    .subject {
        min-height: 90vh;
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
        background-color: #0D1E35;
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
        margin-bottom: 2%;
    }
    .maintwo {
        display: flex;
        height: 30%;
        /* margin-top: 1%; */
        margin-left: 15px;
        margin-bottom: 1%;
        margin-right:15px;
    }
    .mainthree {
        display: flex;
        height: 30%;
         margin-left: 15px;
        margin-right: 15px;
         margin-bottom: 1%;
    }
    .mainfour {
        display: flex;
        height: 30%;
         margin-left: 15px;
        margin-right: 15px;
    }
</style>