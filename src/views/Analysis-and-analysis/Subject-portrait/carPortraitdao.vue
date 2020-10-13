<!--此页面为车画像的导出打印页面-->
<template>
    <div class="maincss">
        <div style="height:85vh;padding: 0px 15px;margin-top: 5px">
            <div class="flexRow flexRow">
                <div slot="searchBoxBar" class="operationl">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </div>
           
            <div style="width: 100%;height: 100%;background-color: #081F3F;" class="maincssall">
                <div class="maintwol">
                    <div id="Columns1" class="zpEarchl" style="width: 60%;height:100%"></div>
                    <div id="Columns2" class="zpEarchl" style="width: 40%;height:100%;margin-left: 1%"></div>
                </div>
                <div class="maindown">
                    <div class="leftmokuai">
                        <div class="mainthree">
                            <div id="Caketype1" class="zpEarchl" style="width: 100%;height:50%;margin-bottom: 2%"></div>
                            <div id="Caketype3" class="zpEarchl" style="width: 100%;height:50%"></div>
                        </div>
                        <div  class="mainfour">
                            <div id="lineColumns2" class="zpEarchl" style="width: 100%;height:100%"></div>
                        </div>
                    </div>
                    <div class="rightmokuai">
                        <div id="lineColumns3" class="zpEarchl" style="width: 100%;height:104%"></div>
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
    import portraitPerson from "../../../JSON/picture_thumbs.json";
    import domtoimage from "dom-to-image";
    export default {
        name: "SubjectPortrait",
        data() {
            return {
                zhuzhu: [],
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ],
                carNature : [
                    {dmz : "A",dmsm1 : "非营运"},
                    {dmz : "B",dmsm1 : "公路客运"},
                    {dmz : "C",dmsm1 : "公交客运"},
                    {dmz : "D",dmsm1 : "出租客运"},
                    {dmz : "E",dmsm1 : "旅游客运"},
                    {dmz : "F",dmsm1 : "货运"},
                    {dmz : "G",dmsm1 : "租赁"},
                    {dmz : "H",dmsm1 : "警用"},
                    {dmz : "I",dmsm1 : "消防"},
                    {dmz : "J",dmsm1 : "救护"},
                    {dmz : "K",dmsm1 : "工程救险"},
                    {dmz : "L",dmsm1 : "营转非"},
                    {dmz : "M",dmsm1 : "出租转非"},
                    {dmz : "N",dmsm1 : "教练"},
                    {dmz : "O",dmsm1 : "幼儿校车"},
                    {dmz : "P",dmsm1 : "小学生校车"},
                    {dmz : "Q",dmsm1 : "其他校车"},
                    {dmz : "R",dmsm1 : "危化品运输"}
                    ],
                tablevalue : [{
                    name: "咸水沽",
                    value: "年龄统计总人数",
                    max: "40%",
                    maxvalue: "MAX 20-33岁",
                    min: "10%",
                    minvalue: "MIN 20-33岁"
                },
                    {
                        name: "小站",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "北闸口",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "八里台",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "双桥河",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "葛沽",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "双港",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    },
                    {
                        name: "辛庄",
                        value: "年龄统计总人数",
                        max: "40%",
                        maxvalue: "MAX 20-33岁",
                        min: "10%",
                        minvalue: "MIN 20-33岁"
                    }
                ]
            }
        },
        methods : {
            // 按钮组件回调
            operation(data) {
                let args = this.UnitTopButton[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 导出功能
            DerivedTables() {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maincssall")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                    _this.$router.go(-1);
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "车画像" + time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "车画像" + time + ".png");});
                    }
                });
            },
            async mainzhu(){
                clearInterval(this.tt)
                this.resvalue = await this.postval();
                // 五年每年车辆总数人数量统计
                let Columns1 = this.$echarts.init(document.getElementById('Columns1'));
                let option1 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '近五年机动车数量统计（辆）',// 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#3ba7c9',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#5abdfc',
                        },
                        itemGap: 0  //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        right: 70,
                        data:['近五年','近一年'],
                        textStyle:{
                            color:'#5abdfc'
                        }
                    },
                    grid:{
                        left: '9%',
                        top:'30%'
                    },   // 整体位置
                    xAxis: {
                        data: [] ,
                        nameRotate : 50,
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        }  // x轴样式
                    },
                    yAxis: {
                        minInterval: 0,
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#147a86'
                            }
                        },   // y轴样式
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }  // y轴轴线样式
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#fff',
                    },     // 标签字
                    series: [{
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
                        },   // 渐变
                        name: '近五年',
                        type: 'bar',
                        barWidth: 50,  //柱宽
                        data: []
                    }]
                };
                let arry1 = this.resvalue.totalCarStatistic;
                let keys1 = [];
                let keysValue1 = [];
                let ownlist1 = [];
                for( let i in arry1){
                    for(let j in arry1[i]) {
                        ownlist1.push({x1:j, s1: arry1[i][j]});
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist1 = this.$tools.bubbleSort(ownlist1, "x1");
                ownlist1.forEach((i) => {
                    keys1.push(i.x1)
                    keysValue1.push(i.s1)
                })
                let option1_1 = {
                    xAxis: {
                        data: keys1
                    },
                    series: [{
                        data: keysValue1
                    }],
                }
                Columns1.setOption(option1);
                Columns1.setOption(option1_1);
                // 车辆车检状态统计结果
                let Columns2 = this.$echarts.init(document.getElementById('Columns2'));
                let option2 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '车检状态统计（辆）', // 主标题
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
                        itemGap: 0   //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        show: false,
                        data:['销量']
                    },    // 图例组件
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },   // 分割线
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#147a86'
                            }
                        },
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        },    // y轴样式
                        type: 'category',
                        data: [],
                    },

                    series: [{
                        itemStyle:{
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#801Ce6'
                                }, {
                                    offset: 1,
                                    color: '#3e18c9'
                                }])
                            }
                        },
                        name: '车辆车检状态统计',
                        type: 'bar',
                        barWidth: 18,  //柱宽
                        z: 10,
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '车辆车检状态统计',
                            type: 'bar',
                            color: '#192A41',
                            barWidth: 18,   //柱宽
                            barGap: '-100%'
                        }]
                };

                let arry2 = this.resvalue.vehicleInspectionStatistic;
                let keys2 = [];
                let keysValue2 = [];
                let ownlist2 = [];
                for( let i in arry2){
                    for(let j in arry2[i]) {
                        ownlist2.push({x2:j, s2: arry2[i][j]});
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist2 = this.$tools.bubbleSort(ownlist2, "s2");
                ownlist2.forEach((i) => {
                    if(i.x2 === 1 || i.x2 === "1"){
                        keys2.push("合格")
                    } else if (i.x2 === 2 || i.x2 === "2") {
                        keys2.push("延期合格")
                    } else if (i.x2 === 3 || i.x2 === "3") {
                        keys2.push("委托检验")
                    } else {
                        keys2.push("不合格")
                    }
                    keysValue2.push(i.s2)
                })
                let option2_1 = {
                    yAxis: {
                        data: keys2
                    },
                    series: [{
                        data: keysValue2
                    }]
                };
                Columns2.setOption(option2);
                Columns2.setOption(option2_1);

                // 使用性质统计结果
                let Caketype1 = this.$echarts.init(document.getElementById('Caketype1'));
                let option3 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '使用性质统计（辆）',  // 主标题
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
                        itemGap: 0  //主副标题距离
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                        type: 'scroll',
                        orient: 'vertical',
                        right: 70,
                        top: 60,
                        bottom: 20,
                        textStyle:{
                            color: '#fff'
                        },
                        data:[],
                        selected:[]
                    },
                    series : [
                        {
                            name: '使用性质统计',
                            type: 'pie',
                           /* roseType: 'angle',*/
                            // minAngle: 30,           //最小角度
                            center: ['50%', '55%'], //圆心位置
                            radius: ['20', '40'],  //内半径外半径
                            clockwise: true,
                            // avoidLabelOverlap: false,
                            startAngle: 140,
                            label: {                 //隐藏标签
                                show: true,
                                position: 'outside',
                                color: '#fff',
                                formatter: '{b} : {c}({d}%)',
                            },
                            itemStyle: {
                                // 阴影的大小
                                /*shadowBlur: 400,*/
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            itemStyle: {
                                color:function(params) {
                                    //自定义颜色
                                    var colorList = [
                                        '#8363f9', '#04bbff', '#0451ff', '#ff8604', '#00d591', '#58a92c','#dde017', '#c0a020', '#bf2929', '#8363f9', '#04bbff', '#0451ff', '#ff8604', '#00d591', '#58a92c','#dde017', '#c0a020', '#bf2929',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            },
                            data:[]
                        }
                    ]
                };
                let arry3 = this.resvalue.useNatureStatistic;
                let keyvalue = [];
                let ownlist3 = [];
                for( let i in arry3){
                    for(let j in arry3[i]) {
                        let p = arry3[i][j]; // j 为abcd
                        for(let g in this.carNature){
                            if(this.carNature[g].dmz === j){
                                j = this.carNature[g].dmsm1
                            }
                        }
                        ownlist3.push({x1:j, s1: p});
                    }
                }

                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist3 = this.$tools.bubbleSort(ownlist3, "s1", "inverted");
                ownlist3.forEach((i) => {
                    keyvalue.push({
                        name: i.x1,
                        value: i.s1
                    })
                })
                let option3_1 = {
                    legend: {
                        data:keyvalue.name
                    },
                    series: [{
                        data:keyvalue
                    }],
                }
                Caketype1.setOption(option3);
                Caketype1.setOption(option3_1);
                // 车辆报废状态统计结果
                let Caketype3 = this.$echarts.init(document.getElementById('Caketype3'));
                let option5 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '报废状态统计（辆）',  // 主标题
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
                        itemGap: 0   //主副标题距离
                    },
                    tooltip: {},
                    grid:{
                        left: '12%',
                    },   // 整体位置
                    legend: {
                        show: false,
                        data:['销量']
                    },   // 图例组件
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },    // 分割线
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#147a86'
                            }
                        },
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: [],
                    },

                    series: [{
                        itemStyle:{
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#EE70E9'
                                }, {
                                    offset: 1,
                                    color: '#8463F9'
                                }])
                            }
                        },
                        name: '车辆报废状态统计',
                        type: 'bar',
                        barWidth: 18,    //柱宽
                        z: 10,
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '车辆报废状态统计',
                            type: 'bar',
                            /*data: [300, 300],*/
                            color: '#192A41',
                            barWidth: 18,    //柱宽
                            barGap: '-100%'
                        }]
                };
                let arry5 = this.resvalue.scrappedStatistic;
                let keys5 = [];
                let keysValue5 = [];
                let ownlist5 = [];
                for( let i in arry5){
                    for(let j in arry5[i]) {
                        ownlist5.push({x2:j, s2: arry5[i][j]});
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist5 = this.$tools.bubbleSort(ownlist5, "s2");
                ownlist5.forEach((i) => {
                     if(i.x2 === 1 || i.x2 === "1"){
                         keys5.push("已报废")
                       } else {
                         keys5.push("未报废")
                       }
                    keysValue5.push(i.s2)
                })
                let option5_1 = {
                    yAxis: {
                        data: keys5
                    },
                    series: [{
                        data: keysValue5
                    }]
                };
                Caketype3.setOption(option5);
                Caketype3.setOption(option5_1);

                // 违法扣分统计结果
                let lineColumns2 = this.$echarts.init(document.getElementById('lineColumns2'));
                let option7 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '违法扣分统计（辆）',                                // 主标题
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
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        show: false,
                        data:['销量']
                    },                                   // 图例组件
                    xAxis: {
                        show: false,
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        // max: 2000,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#147a86'
                            }
                        },
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        },                         // y轴样式

                        type: 'category',
                        data: [],
                    },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#fff',
                        formatter: function (value) {
                            let res = value;
                            let i = 0;
                           /* return  res.data*/
                            if(res.data === 10000){
                                return res.data=zhuzhu[i];
                                i++;
                            } else {
                                return  res.data
                            }
                        }
                    },
                   
                    // 标签字
                    series: [{
                        name: '销量',
                        type: 'bar',
                        /* data: [5, 20, 36, 10, 10, 20]*/
                        barWidth: 8,    //柱宽
                        itemStyle:{
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#26C5FE'
                                }, {
                                    offset: 1,
                                    color: '#508DFF'
                                }])
                            }
                        },                // 渐变
                        data: [
                            
                        ]
                    }]
                };
                let arry7 = this.resvalue.accidentStatistic;
                let keys7 = [];
                let keysValue7 = [];
                let zhuzhu = [];
                for( let i in arry7){
                    for(let j in arry7[i]) {
                        keys7.push(j)
                        if(arry7[i][j] > 10000){
                            zhuzhu.push(arry7[i][j])
                        }
                        keysValue7.push(arry7[i][j] > 10000? 10000 : arry7[i][j])
                    }
                }
                refreshData();
               
                function refreshData(){
                let option7_1 = {
                    yAxis: {
                        data: keys7
                    },
                    series: [{
                        name: '违法扣分统计',
                        data: keysValue7
                    }]
                };
                lineColumns2.setOption(option7);
                lineColumns2.setOption(option7_1);
                };
                // 属地统计结果
                let lineColumns3 = this.$echarts.init(document.getElementById('lineColumns3'));
                let option8 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '属地统计（辆）',                                // 主标题
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
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        show: false,
                        data:['销量']
                    },                                   // 图例组件
                    label: {
                        show: true,
                        position: 'right',
                        color: '#fff',
                    },                                 // 标签字
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#147a86'
                            }
                        },
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: [],
                        // 左侧标签位置以及对齐方式
                        axisLabel: {
                            inside: false,
                            margin: 30,
                            align: 'left'
                        },
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        }
                    },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#fff',
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 8,
                            height: '5%',
                            top: '93%',
                            backgroundColor: 'rgba(25,42,65,0.1)',//未选中填充色
                            fillerColor: 'rgba(25,42,65,0.3)', // 选中范围的填充颜色
                            borderColor: '#192A41', //边框色
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100,
                            orient:"vertical",
                        },
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 15,
                            height: '70%',
                            handleSize: 8,
                            showDataShadow: false,
                            left: '96%',
                            backgroundColor: 'rgba(25,42,65,0.1)',//未选中填充色
                            fillerColor: 'rgba(25,42,65,0.3)', // 选中范围的填充颜色
                            borderColor: '#192A41', //边框色
                        }
                    ],
                    series: [{
                        name: '车辆数',
                        type: 'bar',
                        barWidth: 8,    //柱宽
                        itemStyle:{
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#26C5FE'
                                }, {
                                    offset: 1,
                                    color: '#508DFF'
                                }])
                            }
                        },                // 渐变
                        data: []
                    }]
                };
                let arry8 = this.resvalue.territorialStatistic;
                let keys8 = [];
                let keysValue8 = [];
                let ownlist8 = [];
                for( let i in arry8){
                    for(let j in arry8[i]) {
                        ownlist8.push({x2:j, s2: arry8[i][j]});
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist8 = this.$tools.bubbleSort(ownlist8, "s2");
                ownlist8.forEach((i) => {
                    keys8.push(i.x2)
                    keysValue8.push(i.s2)
                })
                let option8_1 = {
                    yAxis: {
                        data: keys8
                    },
                    series: [{
                        data: keysValue8
                    }],
                }
                lineColumns3.setOption(option8);
                lineColumns3.setOption(option8_1);
                window.onresize = function () {
                    Columns1.resize();
                    Columns2.resize();
                    Caketype1.resize();
                    Caketype3.resize();
                    lineColumns2.resize();
                    lineColumns3.resize();
                }
            },
            postval() {
                let val = new Promise(function (resolve, reject) {
                        resolve(portraitPerson.carPortrait.data[0]);

                    // sjhAxios.post("/sjh2/strategysupport/portrait/carPortrait", {}).then((res) => {
                    //     resolve(res.data.data[0]);
                    // }).catch((error) => {
                    //     this.$showSimpleMessage(error, "error")
                    // });
                });
                return val;
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
            await this.mainzhu()
            let _this = this;
            setTimeout(()=> {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maincssall")[0];
                // domtoimage.toBlob(gis, {style: "::-webkit-scrollbar"}).then(function (blob) {
                //     mapLoading.close();
                //     _this.$router.go(-1);
                //     saveAs(blob, "车画像" + time + ".png");
                // });
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                  if (navigator.msSaveBlob) {
                    mapLoading.close();
                    _this.$router.go(-1);
                    navigator.msSaveBlob(canvas.msToBlob(), "车画像" + time + ".png");
                  } else {
                    canvas.toBlob(function(blob) {
                        mapLoading.close();
                        _this.$router.go(-1);
                        saveAs(blob, "车画像" + time + ".png");
                    });
                  }
                });
            },4000)
        }
    }
</script>
<style>
    .maincss .subordinateSubject {
        border: none;
    }
</style>
<style scoped>
    .flexRow {
        width: 100%;
        flex-direction: row-reverse;
        padding: 0 22px 18px 0px;
    }
    .mainone .yangshi1{
        background-color: #193D6E;
        color: #ff8400;
        font-size: 18px;
        width: 122px;
    }
    .mainone .yangshi2{
        background-color: #09132D;
        color: #a41a1a;
        font-size: 20px;
    }
    .mainone .yangshi3{
        background-color: #09132D;
        color: #1ca543;
        font-size: 20px;
    }
    .mainone .yangshi4{
        background-color: #193D6E;
        color: #ff8400;
        font-size: 12px;
    }
    .mainone .yangshi5{
        background-color: #09132D;
        color: #00d8ff;
        font-size: 14px;
    }
    .sss {
        cellpadding: 10px!important;
    }
    .maincss {
        /* background-color: #0D1E35;*/
    }
    hr{
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
        height: 20%;
        width: 90%;
    }
    .maindown {
        display: flex;
        height: 65%;
        flex-wrap: nowrap;
        flex-direction: row;
        margin-bottom: 2%;
    }
    .leftmokuai {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        width: 60%;
    }
    .rightmokuai {
        width: 40%;
        margin-left: 0.5%;
        height: 98%;
    }
    .maintwol {
        display: flex;
        height: 30%;
        margin-bottom: 1%;
    }
    .mainthree {
        width: 50%;
    }
    .mainfour {
        display: flex;
        width: 48%;
        height: 102%;
        margin-left: 1.5%;

    }
</style>