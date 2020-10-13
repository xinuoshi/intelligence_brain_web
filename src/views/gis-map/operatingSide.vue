<template>
    <div class="out showss">
        <div class="leftButton" @click="hideHis" style="background-color: rgba(3, 8, 37, 0.9);color:#ffffff;">{{arrowDirection}}</div>
        <div class="operatingSideBG" v-if="operatingData.length > 0">
            <!-- 图表 -->
            <div class="operatingSideLine" v-for="(item, index) in operatingData" :key="index">
                <div :id="'operatingSideLineBody' + (index + 1)" class="operatingSideLineBody"></div>
            </div>
        </div>
        <div class="operatingSideBG" v-else>
            暂无数据...
        </div>
    </div>
</template>

<style>
.out {
    display: flex !important;
    flex-direction: row;
}
.hide {
    animation: hide 1s ease-in-out;
    animation-fill-mode: forwards;
}
.showss {
    animation: show 1s ease-in-out;
    animation-fill-mode: forwards;
}
@keyframes hide {
    0% {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 655px;
    }
    100% {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 655px;
        right: -625px;
    }
}
@keyframes show {
     0% {
        position: absolute;
        top: 0;
        right: -625px;
        bottom: 0;
        width: 655px;
    }
    100% {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 655px;
        right: 0;
    }
}
.leftButton{
    width:30px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #ffffff;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.operatingSideBG {
    /* background: url(../../assets/static/trafficComBG.png) no-repeat; */
    /* background-size: 100% 100%; */
    background-color: rgba(3, 8, 37, 0.85);
    padding: 10px 20px;
    width: 625px;
    height: 100%;
    overflow-y: auto;
}

.operatingSideBG .el-input,
.operatingSideBG .el-date-editor {
    height: 23px !important;
}

.trafficCom {
    display: flex;
    flex-direction: column;
    /* padding: 10px 20px; */
}
.operatingSideBG > div + div {
    margin-top: 15px;
}
.operatingSidetopSearch > div,
.operatingSideLine {
    /* background: rgb(0, 4, 30); */
    background: #0d2340;
    -webkit-box-shadow: 1px 1px 10px rgb(4,13,39,0.59);
    box-shadow: 1px 1px 10px rgb(4,13,39,0.59);
    padding: 10px 0;
}

.operatingSideLineBody,
.operatingSideLineBodyMT {
    width: 580px;
    height: 300px;
    overflow: hidden;
}
</style>

<script>
export default {
    name: "operatingSide",
    props: ["operatingData"],
    data() {
        return {
            arrowDirection: " 》 "
        }
    },
    methods: {
        // 显示隐藏侧边栏
        hideHis() {
            var dom = document.getElementsByClassName("out")[0];
            let claN = dom.className;
            if(claN.includes("hide")) {
                dom.className = "out showss";
                // document.getElementsByClassName("leftButton")[0].innerHTML = "》";
                this.arrowDirection = " 》 ";
            } else {
                dom.className = "out hide";
                // document.getElementsByClassName("leftButton")[0].innerHTML = "《";
                this.arrowDirection = " 《 ";
            }
        },
        // 初始化图表
        InitLawchart(domId, titleName, aColor, bColor, aData, bData) {
            let operatingSideLineBody = this.$echarts.init(document.getElementById(domId));
            let option = {
                title: {
                    x: "left",
                    text: titleName, // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    },
                    left: "10",
                    top: "10"
                },
                legend: {
                    type: "plain",
                    top: 20,
                    // bottom: 0,
                    right: 50,
                    // width: "150px",
                    textStyle: {
                        color: "rgb(44, 248, 255)",
                        fontSize: 14
                    },
                    inactiveColor: "#ccc",
                    selectedMode: false,
                    pageIconColor: "#ffffff"
                },
                grid: {
                    left: "8%",
                    top: "25%",
                    bottom: 30
                }, // 整体位置
                xAxis: {
                    data: ["早高峰", "日平峰", "晚高峰", "夜低峰"],
                    nameRotate: 50,
                    axisLine: {
                        lineStyle: {
                            color: "#147a86"
                        }
                    } // x轴样式
                },
                yAxis: [
                    {
                        type: "value",
                        minInterval: 0,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#147a86"
                            }
                        }, // y轴样式
                        splitLine: {
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ["#147a86"],
                                fontSize: 12
                            }
                        } // y轴轴线样式
                    },
                    {
                        type: "value",
                        // name: "平均行驶速度(km/h)",
                        name: "km/h",
                        nameTextStyle: {
                            color: "rgb(44, 248, 255)"
                        },
                        position: "right",
                        // offset: 20,
                        axisTick: {
                            alignWithLabel: true
                        },
                        // min: 0,
                        // max: 30,
                        splitLine: {
                            show: false,
                            interval: 1,
                            lineStyle: {
                                color: ["#567195"],
                                solid: "dashed"
                            }
                        },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: "#1f73a7"
                            }
                        } // y轴样式
                        //   type: "category",
                    }
                ],
                tooltip: {
                    show: true
                },
                series: [
                    {
                        name: "交通延时指数",
                        type: "bar",
                        barWidth: 20,
                        data: aData || [20, 16, 5, 11],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: aColor
                                    },
                                    {
                                        offset: 1,
                                        color: aColor
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: "平均行驶速度",
                        type: "bar",
                        barWidth: 20,
                        barGap: "10%",
                        data: bData || [15, 20, 30, 12],
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                    {
                                        offset: 0,
                                        color: bColor
                                    },
                                    {
                                        offset: 1,
                                        color: bColor
                                    }
                                ])
                            }
                        }
                    }
                ]
            };
            operatingSideLineBody.setOption(option);
        },
        // 循环调用初始化图表
        circularInitialChart() {
            this.operatingData.map((t, i) => {
                let aColor = i % 2 !== 0 ? "#4970ff" : "#7849ff";
                let bColor = i % 2 !== 0 ? "#3feea2" : "#00deff";
                let useNature = this.$store.state.Operatingvehicles.find(e => e.id === t.useNature).name
                let aData = [t.morningAvgDelay.toFixed(2), t.normalAvgDelay.toFixed(2), t.eveningAvgDelay.toFixed(2), t.lowAvgDelay.toFixed(2)];
                let bData = [t.morningAvgSpeed.toFixed(2), t.normalAvgSpeed.toFixed(2), t.eveningAvgSpeed.toFixed(2), t.lowAvgSpeed.toFixed(2)];
                this.InitLawchart(`operatingSideLineBody${i + 1}`, useNature, aColor, bColor, aData, bData);
            });
        }
    },
    watch: {
        "operatingData": {
            immediate: true,
            handler: function(val) {
                if (val.length > 0) {
                    setTimeout(() => {
                        this.circularInitialChart();
                    }, 200);
                }
            },
            deep: true
        }
    },
    computed: {
        
    },
    created() {
       
    },
    mounted() {
        // this.InitLawchart("operatingSideLineBody1", "小客车运行规律", "#4970ff", "#3feea2");
        // this.InitLawchart("operatingSideLineBody2", "救护车运行规律", "#7849ff", "#00deff");
        // this.InitLawchart("operatingSideLineBody3", "危险品运输车运行规律", "#4970ff", "#3feea2");
        // this.InitLawchart("operatingSideLineBody4", "拖车运行规律", "#7849ff", "#00deff");
    }
}
</script>

