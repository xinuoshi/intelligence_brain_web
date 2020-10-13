<template>
    <!-- 交通内部管理评价 -->
    <div class="maincss">
        <div style="height:800px;overflow: auto">
            <api>
                <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                    :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
                <div slot="searchBoxBar" class="operation">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </api>
            <div class="mainone">
                <table class="mineTable" v-for="(item, index) in tablevalue" :key="index">
                    <tr style="height: 50px;">
                        <td class="yangshi1">{{item.name}}<p>内部管理分析指数</p></td>
                        <td class="yangshi2">{{item.max}}</td>
                    </tr>
                </table>
            </div>
            <div class="maintwo">
                <div id="Columns1" class="zpEarch" style="width: 100%;height:100%"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "SubjectPortrait",
        data() {
            return {
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
                // 搜索传参
                searchName: [
                    {searchPlaceholder: "查询日期", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: ""},
                    {searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: ""}
                ],
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ]
            }
        },
        methods : {
            // 搜索回调
            searchEvent(payload) {
                console.log(payload);
            },
            // 按钮组件回调
            operation(data) {
                let args = this.UnitTopButton[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 导出功能
            DerivedTables() {
                alert("是否导出");
            },
            // 绘制图形
            Columns1() {
                let myChart = this.$echarts.init(document.getElementById("Columns1"));
                let option = {
                    legend: {
                        type: "plain",
                        top: 0,
                        right: 200,
                        textStyle: {
                            color: "rgb(44, 248, 255)",
                            fontSize: 14
                        },
                        inactiveColor: "#ccc",
                        selectedMode: false,
                        pageIconColor: "#ffffff"
                    },
                    grid: {
                        left: "3%",
                        top: "20%"
                    }, // 整体位置
                    xAxis: {
                        data: ["辛庄", "双港", "葛沽", "小站", "双桥河", "八里台", "北闸口", "咸水沽"] ,
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
                                }
                            } // y轴轴线样式
                        },
                        {
                            type: "value",
                            min: 0,
                            max: 500,
                            minInterval: 0,
                            position: "right",
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
                                }
                            } // y轴轴线样式
                        },
                    ],
                    tooltip: {
                        show: true
                    },
                    series: [
                        {
                            name:"交通内部管理评价指数环比",
                            type:"line",
                            data:[120, 212, 33, 105, 63, 107, 120, 230],
                            color:"#29D2FF"
                        },
                        {
                            name:"交通内部管理评价指数排名环比",
                            type:"line",
                            data:[105, 82, 133, 142, 158, 135, 113, 153],
                            color: "#9B7731"
                        },
                        {
                            name:"交通内部管理评价指数",
                            type:"bar",
                            barWidth:50,
                            data:[20, 49, 70, 23, 25, 76, 13, 162],
                            itemStyle:{
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#26C5FE'
                                    }, {
                                        offset: 1,
                                        color: '#508DFF'
                                    }])
                                }
                            },
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            this.Columns1();
        }
    }
</script>

<style>
.maincss .subordinateSubject {
    border: none;
}
</style>

<style scoped>
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
        margin-bottom: 3%;
    }
    .maintwo {
        display: flex;
        height: 50%;
        margin-left: 2%;
        margin-bottom: 2%;
    }
</style>