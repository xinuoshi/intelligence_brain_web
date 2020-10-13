<template>
    <div class="main" id="main">
        <div class="left">
            <div class="leftTimer">
                <div class="timeNow">{{nowTime}}</div>
            </div>
            <div class="video"></div>
            <div class="carNum">
                <div class="carNumList">当日各区车流量</div>
                <div class="carNumTable carNumTablePart">
                    <el-table :data="tableData" style="width: 100%;position: relative !important">
                        <el-table-column prop="index" label="排名" :width="45">
                        </el-table-column>
                        <el-table-column prop="name" label="区域" :width="80">
                        </el-table-column>
                        <el-table-column label="数量">
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.number" color="#4ef2f1" :stroke-width="18" :show-text="false"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column label="" style="padding:0 !important;margin:0 !important" :width="40">
                            <template slot-scope="scope">
                                {{scope.row.number}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="carType">
                <div class="carTypeTitle">
                    今日车辆类型统计
                </div>
                <div class="carFrom" id="carFrom">

                </div>
                <div class="carSize" id="carSize">

                </div>
            </div>
        </div>
        <div class="centerEchart" id="centerEchart">

        </div>
        <div class="right">
            <div class="traffic"></div>
            <div class="management">
                <div id="managementEchart"></div>
            </div>
            <div class="thing">
                <div id="thing"></div>
            </div>
            <div class="todayCar">

            </div>
            <div class="accidentType">

            </div>
            <div class="backSystem" @click="gismap"></div>
        </div>
    </div>
</template>
<style>
.main .BMap_cpyCtrl,
.main .BMap_noprint,
.main .anchorBL {
  display: none !important;
}
.main .carNumTablePart .el-progress-bar__outer {
    border-radius: 0;
    background-color: #04263f;
}
.main .carNumTablePart .el-progress-bar__inner {
    border-radius: 0;
}
.main  .carNumTablePart .el-table td,.main .carNumTablePart .el-table th {
    height: 27px;
}
.main .carNumTablePart .el-table__row td {
    border-right: 1px dashed #215b86;
}
.main .carNumTablePart .el-table__row td:nth-child(3) {
    border-right: 0px dashed #215b86;
}
</style>

<style scoped>
* {
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: 100%;
  min-width: 1300px;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  background-color: #000002;
  overflow: auto;
}
.left {
    width: 300px;
    display: flex;
    flex-direction: column;
}
.right {
    width: 150px;
    display: flex;
    flex-direction: column;
}
@media screen and (min-height: 1000px) {
  .left {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .right {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.centerEchart {
  position: absolute;
  left: 330px;
  right: 180px;
  top: 10px;
  bottom: 10px;
}
.leftTimer {
  background-image: url(../../assets/screenDisplayTwo/timeruse.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 126px;
}
.timeNow {
  color: #41efe4;
  position: relative;
  top: 80px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding-right: 20px;
  text-align: right;
  font-weight: 600;
}
.video {
  background-image: url(../../assets/screenDisplayTwo/video.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  flex:1;
  /* width: 100%;
  height: 116px; */
  margin-top: 10px;
}
.carNum {
  background-image: url(../../assets/screenDisplayTwo/carNum.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  flex:2;
  /* width: 100%;
  height: 310px; */
  margin-top: 5px;
    display: flex;
    flex-direction: column;
}
.carNumList,
.carTypeTitle {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.carNumTable {
    width: 90%;
    margin-left: 5%;
    flex: 1;
    overflow: auto;
    margin-top: 5px;
}
.carType {
  background-image: url(../../assets/screenDisplayTwo/todayCarType.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 410px;
  margin-top: 10px;
}
.carFrom {
  background-image: url(../../assets/screenDisplayTwo/background.png);
  background-repeat: no-repeat;
  background-position: 47% 63%;
  width: 300px;
  height: 170px;
}
.carSize {
  width: 300px;
  height: 210px;
}
.traffic {
  background-image: url(../../assets/screenDisplayTwo/offical.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 110px;
  margin-top: 10px;
}
.management {
  background-image: url(../../assets/screenDisplayTwo/xiaqu.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 160px;
  margin-top: 10px;
}
.managementTitle {
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 10px;
  color: #fff;
}
#managementEchart {
  width: 150px;
  height: 140px;
}
.thing {
  background-image: url(../../assets/screenDisplayTwo/qingkuang.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 210px;
  margin-top: 10px;
}
#thing {
  width: 150px;
}
.todayCar {
  background-image: url(../../assets/screenDisplayTwo/todayCar.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 210px;
  margin-top: 10px;
}
.accidentType {
  background-image: url(../../assets/screenDisplayTwo/accidentTyoe.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 195px;
  margin-top: 10px;
}
.backSystem {
  background-image: url(../../assets/screenDisplayTwo/backsystem.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 40px;
  margin-top: 10px;
}
</style>
<script>
import dataJson from "../../assets/data.json";
export default {
    data() {
        return {
            nowTime: "",
            tableData: [
                {
                    index: "1",
                    name: "咸水沽镇",
                    number: 10
                }, {
                    index: "2",
                    name: "葛沽镇",
                    number: 15
                }, {
                    index: "3",
                    name: "小站镇",
                    number: 16
                }, {
                    index: "4",
                    name: "双港镇",
                    number: 19
                }, {
                    index: "5",
                    name: "辛庄镇",
                    number: 20
                }, {
                    index: "6",
                    name: "双桥河镇",
                    number: 18
                }, {
                    index: "7",
                    name: "八里台镇",
                    number: 30
                }, {
                    index: "8",
                    name: "北闸口镇",
                    number: 9
                }
            ]
        }
    },
    methods: {
        // 每秒更新时间
        getTime() {
            let that = this;
            setInterval(function () {
                that.nowTime = that.$tools.nowTime();
            }, 1000)
        },
        // 车辆来源的echart
        setCarFrom() {
            let myChart = this.$echarts.init(document.getElementById("carFrom"));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name: '车辆来源',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '50%'],
                        center:["50%","49%"],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 300,
                                name: '内地车',
                                itemStyle: {
                                    color: "#ffc14a"
                                }
                            },
                            {
                                value: 679,
                                name: '外地车',
                                itemStyle: {
                                    color: "#6bbbff"
                                }
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },
        // 车辆类型镭射图
        setCarSize() {
            let myChart = this.$echarts.init(document.getElementById("carSize"));
            let option = {
                // title: {
                //     text: '基础雷达图'
                // },
                radar: {
                    name: {
                        textStyle: {
                            color: '#fff',
                        }
                    },
                    indicator: [
                        { name: '微型车', max: 6500 },
                        { name: '小型车', max: 1600 },
                        { name: '大客车', max: 3000 },
                        { name: '大型车', max: 3800 },
                        { name: '大货车', max: 5200 }
                    ],
                    splitArea: {
                        areaStyle: {
                            color: ["rgb(23,86,191,0.1),rgb(23,86,191,0.5)"],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    symbolOffset: [0, 0],
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [5000, 1400, 2100, 3200, 2100],
                            name: '实际开销',
                            areaStyle: {
                                normal: {
                                    color: 'rgb(248,250,2,0.4)'
                                }
                            }
                        }
                    ]
                }]
            };
            myChart.setOption(option);
        },
        // 辖区管辖指数
        management() {
            let myChart = this.$echarts.init(document.getElementById("managementEchart"));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '管理指数',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        center: ['50%', '60%'],
                        label: {
                            normal: {
                                formatter: '{{a}{b}\n {{d}%}  '
                            }
                        },
                        labelLine: {
                            length: 0,
                            length2: 10,
                            lineStyle: {

                            }
                        },
                        data: [{ value: 335, name: '八里台镇' },
                        { value: 310, name: '津南镇' },
                        { value: 234, name: '小站镇' },
                        { value: 135, name: '咸水沽' }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: -10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        // 地图
        map() {
            // let echarts = this.$echarts;
            var myChart = echarts.init(document.getElementById("centerEchart"));
            // axios.get("../../assets/data.json").then((data) => {
            // data = [];
            let data = dataJson;
            var hStep = 300 / (data.length - 1);
            var busLines = [].concat.apply([], data.map(function (busLine, idx) {
                var prevPt;
                var points = [];
                for (var i = 0; i < busLine.length; i += 2) {
                    var pt = [busLine[i], busLine[i + 1]];
                    if (i > 0) {
                        pt = [
                            prevPt[0] + pt[0],
                            prevPt[1] + pt[1]
                        ];
                    }
                    prevPt = pt;

                    points.push([pt[0] / 1e4, pt[1] / 1e4]);
                }
                return {
                    coords: points,
                    lineStyle: {
                        normal: {
                            color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                        }
                    }
                };
            }));
            let option = {
                bmap: {
                    center: [116.46, 39.92],
                    zoom: 10,
                    roam: true,
                    mapStyle: {
                        'styleJson': [
                            {
                                'featureType': 'water',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#031628'
                                }
                            },
                            {
                                'featureType': 'land',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#000102'
                                }
                            },
                            {
                                'featureType': 'highway',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            },
                            {
                                'featureType': 'arterial',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'arterial',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#0b3d51'
                                }
                            },
                            {
                                'featureType': 'local',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'railway',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'railway',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#08304b'
                                }
                            },
                            {
                                'featureType': 'subway',
                                'elementType': 'geometry',
                                'stylers': {
                                    'lightness': -70
                                }
                            },
                            {
                                'featureType': 'building',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'all',
                                'elementType': 'labels.text.fill',
                                'stylers': {
                                    'color': '#857f7f'
                                }
                            },
                            {
                                'featureType': 'all',
                                'elementType': 'labels.text.stroke',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'building',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#022338'
                                }
                            },
                            {
                                'featureType': 'green',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#062032'
                                }
                            },
                            {
                                'featureType': 'boundary',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#465b6c'
                                }
                            },
                            {
                                'featureType': 'manmade',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#022338'
                                }
                            },
                            {
                                'featureType': 'label',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            }
                        ]
                    }
                },
                series: [{
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: busLines,
                    silent: true,
                    lineStyle: {
                        normal: {
                            // color: '#c23531',
                            // color: 'rgb(200, 35, 45)',
                            opacity: 0.2,
                            width: 1
                        }
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                }, {
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: busLines,
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    effect: {
                        constantSpeed: 20,
                        show: true,
                        trailLength: 0.1,
                        symbolSize: 1.5
                    },
                    zlevel: 1
                }]
            };
            myChart.setOption(option);
            // });//json文件位置
            // var docElm = document.documentElement; 
            // if (docElm.requestFullscreen) {  
            //     console.log("1")
            //     docElm.requestFullscreen();  
            // } else if (docElm.mozRequestFullScreen) {
            //     console.log("2")
            //     docElm.mozRequestFullScreen();  
            // } else if (docElm.webkitRequestFullScreen) {
            //     console.log("3")
            //     docElm.webkitRequestFullScreen();  
            // } else if (elem.msRequestFullscreen) {
            //     console.log("4")
            //     elem.msRequestFullscreen();
            // }
        },
        // 跳转首页
        gismap() {
            this.$router.push({ path: "/gismap" })
        },
        // bigmap() {
        //     var docElm = document.documentElement; 
        //     if (docElm.requestFullscreen) {  
        //         docElm.requestFullscreen();  
        //     } else if (docElm.mozRequestFullScreen) {
        //         docElm.mozRequestFullScreen();  
        //     } else if (docElm.webkitRequestFullScreen) {
        //         docElm.webkitRequestFullScreen();  
        //     } else if (elem.msRequestFullscreen) {
        //         elem.msRequestFullscreen();
        //     }
        // }
            
    },
    created() {
        this.getTime();
        
    },
    mounted() {
        this.setCarFrom();
        this.setCarSize();
        // this.management();
        this.map();
    },
    watch:{
        
    }
}
</script>


