<!--此页面为人画像的导出打印页面-->
<template>
    <div class="maincss">
        <div class="flexTop"> 
            <div class="flexRow flexRow">
                <div slot="searchBoxBar" class="operationl">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </div>
            
            <div class="maincssall maincssalls">
                <div class="mianup">
                    <div class="leftmokuai">
                        <div class="maintwo">
                            <div id="Columns1" class="zpEarchl height100" ></div>
                        </div>
                        <div class="mainthree">
                            <div id="Caketype1" class="zpEarchl width48" ></div>
                            <div id="Caketype2" class="zpEarchl marginLeft" ></div>
                        </div>
                        <div class="mainfour">
                            <div id="lineColumns1" class="zpEarchl width48"></div>
                            <div id="Caketype3" class="zpEarchl" style="width: 48%;height:100%;margin-left: 2.5%"></div>
                        </div>
                    </div>
                    <div class="rightmokuai">
                        <div id="lineColumns2" class="zpEarchl" style="width: 100%;height:62.5%"></div>
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
                t:"",
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ],
                // 公共方法获取数据
                resvalue: "",
                tablevalue : [{
                    name: "2014",
                    value: "年龄统计总人数",
                    max: "5",
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
                // mianup
                
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maincssall")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "人画像" +time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "人画像" + time + ".png");});
                    }
                });
            },
            async mainzhu(){
                clearInterval(this.tt)
                clearInterval(this.tt7)
                this.resvalue = await this.postval();
                // 五年驾驶人数量统计
                let Columns1 = this.$echarts.init(document.getElementById('Columns1'));
                let option1 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '近五年驾驶员数量统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#ffffff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#ffffff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        right: 70,
                        data:['近五年','近一年'],
                        textStyle:{
                            color:'#ffffff'
                        }
                    },
                    grid:{
                        left: '7%',
                        top:'30%'
                    },                               // 整体位置
                    xAxis: {
                        data: [] ,
                        nameRotate : 50,
                        axisLine: {
                            lineStyle : {
                                color:'#ffffff'
                            }
                        }                           // x轴样式
                    },
                    yAxis: {
                        minInterval: 0,
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#ffffff'
                            }
                        },                           // y轴样式
                        splitLine: {
                            lineStyle : {
                                // 使用深浅的间隔色
                                color: ['#147a86'],
                                type : 'dotted'
                            }
                        }                              // y轴轴线样式
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#fff',
                    },                                 // 标签字
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
                            },
                               
                        },                // 渐变
                        name: '近五年',
                        type: 'bar',
                        barWidth: 50,    //柱宽
                        data: []
                    }]
                };
                let arry1 = this.resvalue.totalDriverStatistic;
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
                
                // 年龄统计结果
                let Caketype1 = this.$echarts.init(document.getElementById('Caketype1'));
                let option3 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '年龄统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#fff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#fff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                        type: 'plain',
                        orient: 'horizontal',
                        itemWidth: 25,
                        right: 0,
                        left:250,
                        top: 60,
                        bottom: 0,
                        textStyle:{
                            color: '#fff'
                        },
                        data:[],
                        selected:[]
                    },
                    series : [
                        {
                            name: '年龄统计-人数',
                            type: 'pie',
                            // minAngle: 60,           //最小角度
                            center: ['50%', '60%'], //圆心位置
                            radius: ['0', '40'],  //内半径外半径
                            clockwise: true,      //瞬时针排布
                            startAngle: 140,
                            label:{                 //内饰标签
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
                                        '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#9820c0',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            },
                            data:[]
                        }
                    ]
                };
                let arry3 = this.resvalue.ageStatistic;
                let keyvalue = [];
                let ownlist3 = [];
                for( let i in arry3){
                    for(let j in arry3[i]) {
                        ownlist3.push({x1:j, s1: arry3[i][j]});
                    }
                }

                // 冒泡排序（数组，大key，小到大或者大到小）
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
                // 驾龄统计结果
                let Caketype2 = this.$echarts.init(document.getElementById('Caketype2'));
                let option4 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '驾龄统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#fff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#fff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                        type: 'plain',
                        orient: 'horizontal',
                        itemWidth: 25,
                        right: 0,
                        left:250,
                        top: 60,
                        bottom: 0,
                        textStyle:{
                            color: '#fff'
                        },
                        data:[],
                        selected:[]
                    },
                    series : [
                        {
                            name: '驾龄统计-人数',
                            type: 'pie',
                            center: ['50%', '60%'], //圆心位置
                            radius: ['20', '40'],  //内半径外半径
                            clockwise: true,
                            startAngle: 140,
                            label:{
                                show: true,
                                position: 'outside',
                                color: '#fff',
                                formatter: '{b} : {c}({d}%)',
                            },
                            itemStyle: {
                                // 阴影的大小
                                /* shadowBlur: 400,*/
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
                                        '#1e7ad8', '#20c0ba', '#3edd8d', '#3db840', '#c5d85b', '#d69849','#c55435', '#f06161', '#d3527f', '#9a21c2', '#794dd3', '#9820c0',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            },
                            data:[],
                        }
                    ]
                };
                let arry4 = this.resvalue.drivingAgeStatistic;
                let keyvalue2 = [];
                let ownlist4 = [];
                for( let i in arry4){
                    for(let j in arry4[i]) {
                        ownlist4.push({x1:j, s1: arry4[i][j]});
                    }
                }

                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist4.forEach((i) => {
                    if (i.x1 === "2年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "3年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "4年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "5年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "6-10年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "11-15年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "16-20年") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                ownlist4.forEach((i) => {
                    if (i.x1 === "20年以上") {
                        keyvalue2.push({
                            name: i.x1,
                            value: i.s1
                        })
                    }
                });
                   /* keyvalue2.push({
                        name: i.x1,
                        value: i.s1
                    })*/
                    /*keys3.push(i.x1)
                    keysValue3.push(i.s1)*/
                /*})*/
                let option4_1 = {
                    legend: {
                        data:keyvalue2.name
                    },
                    series: [{
                        data:keyvalue2
                    }],
                }
                Caketype2.setOption(option4);
                Caketype2.setOption(option4_1);
                // 性别统计结果
                let Caketype3 = this.$echarts.init(document.getElementById('Caketype3'));
                let option5 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '性别统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#fff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#fff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        show: false,
                        data:['销量']
                    },                                   // 图例组件
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },                               // 分割线
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#fff'
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
                                color:'#fff'
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
                                    color: '#801Ce6'
                                }, {
                                    offset: 1,
                                    color: '#3e18c9'
                                }])
                            }
                        },
                        name: '性别统计',
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
                            name: '性别统计',
                            type: 'bar',
                            silent: true,
                            data: [150, 150],
                            color: '#192A41',
                            barWidth: 12,    //柱宽
                            barGap: '-100%'
                        }]
                };

                let arry5 = this.resvalue.sexStatistic;
                let keys5 = [];
                let keysValue5 = [];
                for( let i in arry5){
                    for(let j in arry5[i]) {
                        if(j === 1 || j === "1"){
                            keys5.push("男")
                        } else {
                            keys5.push("女")
                        }
                        keysValue5.push(arry5[i][j])
                    }
                }
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
                let lineColumns1 = this.$echarts.init(document.getElementById('lineColumns1'));
                let option6 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '违法扣分统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#fff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#fff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {
                        
                    },
                    grid:{
                        left: '15%',
                        top:'30%'
                    },                               // 整体位置
                    legend: {
                        show: false,
                        data:['销量']
                    },                                   // 图例组件
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#fff'
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
                                color:'#fff'
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
                                    color: '#801Ce6'
                                }, {
                                    offset: 1,
                                    color: '#3e18c9'
                                }])
                            }
                        },
                        name: '销量',
                        type: 'bar',
                        barWidth: 18,    //柱宽
                        z: 10,
                        data: [],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    }]
                };
                let arry6 = this.resvalue.illegalDeductionRecordStatistic;
                let keys6 = [];
                let keysValue6 = [];
                for( let i in arry6){
                    for(let j in arry6[i]) {
                        keys6.push(j)
                        keysValue6.push(arry6[i][j])
                    }
                }
                let option6_1 = {
                    yAxis: {
                        data: keys6
                    },
                    series: [{
                        name: '违法扣分统计',
                        data: keysValue6
                    }]
                };
                lineColumns1.setOption(option6);
                lineColumns1.setOption(option6_1);
                // 职业统计结果

                let lineColumns2 = this.$echarts.init(document.getElementById('lineColumns2'));
                let option7 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '职业统计（人）',                                // 主标题
                        textStyle:{
                            fontSize:14,
                            fontWeight:'normal',
                            color:'#fff',
                            fontFamily: 'PingFangSC-Regular'
                        },
                        subtext: '_________________________________________________________________________', // 副标题
                        subtextStyle:{
                            color: '#fff',
                        },
                        itemGap: 0                 //主副标题距离
                    },
                    tooltip: {},
                    legend: {
                        show: false,
                        data:['销量']
                    },                                   // 图例组件
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show : false,
                        },
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#fff'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: [],
                    },
                    grid: {
                        top:50,
                        left: 100
                    },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#fff',
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
                        data: []
                    }]
                };
                let arry7 = this.resvalue.careerStatistic;
                let keys7 = [];
                let keysValue7 = [];
                let ownlist7 = [];
                for( let i in arry7){
                    for(let j in arry7[i]) {
                        ownlist7.push({x7:j, s7: arry7[i][j]});
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist7 = this.$tools.bubbleSort(ownlist7, "s7");
                ownlist7.forEach((i) => {
                    keys7.push(i.x7)
                    keysValue7.push(i.s7)
                })
                refreshDatal();
                function refreshDatal() {
                    let option7_1 = {
                        yAxis: {
                            data: keys7
                        },
                        series: [{
                            name: '职业统计',
                            data: keysValue7
                        }]
                    };
                    lineColumns2.setOption(option7);
                    lineColumns2.setOption(option7_1);
                }
                window.onresize = function () {
                    Columns1.resize();
                    Columns2.resize();
                    Caketype1.resize();
                    Caketype2.resize();
                    Caketype3.resize();
                    lineColumns1.resize();
                    lineColumns2.resize();
                }
            },
            postval() {
                let val = new Promise(function (resolve, reject) {
                    // sjhAxios.post("/sjh2/strategysupport/portrait/personPortrait", {}).then((res) => {
                        resolve(portraitPerson.portraitPerson.data[0]);
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
            });
            await this.mainzhu()
            let _this = this;
            setTimeout(()=> {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maincssall")[0];
                // domtoimage.toBlob(gis, {style: "::-webkit-scrollbar"}).then(function (blob) {
                //     mapLoading.close();
                //     _this.$router.go(-1);
                //     saveAs(blob, "人画像" + time + ".png");
                    
                // });
                                // let gis = document.getElementsByClassName("maincssall")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {

                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "人画像" +time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "人画像" + time + ".png");});
                    }
                    mapLoading.close();
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
    .titileName{
        text-align: left;
        border-bottom: 1px solid #5abdfc;
        width: 85%;
        height:8px;
        color: #5abdfc;
        font-size:12px;
        margin: 5px 0 10px 15px;
        padding: 0 0 20px 0;
    }
    .mainone .yangshi1{
        background-color: #193D6E;
        color: #ff8400;
        font-size: 16px;
        width: 100px;
        border-radius: 5px;
    }
    .mainone .yangshi2{
        background-color: #09132D;
        color: #a41a1a;
        font-size: 16px;
        width: 50px;
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
        cellpadding: 10px !important;
    }
    .maincss {
        /*background-color: #0D1E35;*/
        width: 100%;
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
        height: 10%;
        width: 90%;
        margin-bottom: 2%;
    }
    .maintwo {
        height: 30%;
        margin-bottom: 2%;
    }
    .mainthree {
        display: flex;
        height: 30%;
        margin-bottom: 2%;
    }
    .maincssalls {
        width: 100%;
        height: 100%;
        background-color: #081F3F;
    }
    .flexTop{
        height:83vh;
        padding: 0px 15px;
        margin-top: 5px;
    }
    .height100{
        width: 100%;
        height:100%
    }
    .width48 {
        width: 48%;
        height:100%
    }
    .marginLeft {
        width: 48%;
        height:100%;
        margin-left: 2.5%
    }
    .mianup {
        display: flex;
        height: 100%;
        flex-wrap: nowrap;
        flex-direction: row;
        margin-bottom: 2%;
    }
    .leftmokuai {
        width: 60%;
    }
    .rightmokuai {
        width: 40%;
        margin-left: 0.5%;
    }
    .mainfour {
        display: flex;
        height: 30%;
    }
</style>