<!--此页面为路画像的导出打印页面-->
<template>
    <div class="maincss">
        <div style="height:85vh;padding: 0px 15px;margin-top: 5px">
            <div class="flexRow flexRow">
                <div slot="searchBoxBar" class="operationl">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </div>
           <!-- <h4 style="text-align: left;margin-left: 20px;margin-bottom: 10px">数据概览</h4>
            <div class="mainone">
                <table v-for="item in tablevalue" >
                    <tr style="height: 33px">
                        <td class="yangshi1">{{item.name}}</td>
                        <td class="yangshi2">{{item.max}}</td>
                        <td class="yangshi3">{{item.min}}</td>
                    </tr>
                    <tr style="height: 33px">
                        <td class="yangshi4">{{item.value}}</td>
                        <td class="yangshi5">{{item.maxvalue}}</td>
                        <td class="yangshi5">{{item.minvalue}}</td>
                    </tr>
                </table>
            </div>-->
            <div style="width: 100%;height: 100%;background-color: #081F3F;" class="maincssall">
                <div class="mainyangshi">
                    <div class="maintwol">
                        <div class="leftone">
                            <div id="Caketype1" class="zpEarchl" style="width: 49%;height:100%"></div>
                            <div id="Caketype2" class="zpEarchl" style="width: 49%;height:100%;margin-left: 1%"></div>
                        </div>
                        <div class="lefttwo">
                            <div id="Caketype3" class="zpEarchl" style="width: 49%;height:100%"></div>
                            <div id="Caketype4" class="zpEarchl" style="width: 49%;height:100%;margin-left: 1%"></div>
                        </div>
                        <div class="leftthree">
                            <div id="Caketype5" class="zpEarchl" style="width: 49%;height:100%"></div>
                            <div id="Caketype6" class="zpEarchl" style="width: 49%;height:100%;margin-left: 1%"></div>
                        </div>
                        <div class="leftfour">
                            <div id="Caketype7" class="zpEarchl" style="width: 49%;height:100%"></div>
                            <div id="Caketype8" class="zpEarchl" style="width: 49%;height:100%;margin-left: 1%"></div>
                        </div>
                       <!-- <div id="Caketype1" @mouseenter="onMouseOver()" @mouseleave="onMouseOut()" class="zpEarchl"
                             style="width: 32%;height:100%"></div>
                        <div id="Columns1" class="zpEarch" style="width: 60%;height:110%"></div>
                        <div id="Columns2" class="zpEarch" style="width: 30%;height:100%"></div>-->
                    </div>
                    <div class="mainfour">
                        <div id="lineColumns3" class="zpEarchl" style="width: 100%;height:51.5%;margin-bottom: 2%"></div>
                        <div id="lineColumns2" class="zpEarchl" style="width: 100%;height:51%;"></div>
                    </div>
                </div>
            </div>

            <!--<div class="mainthree">
                <div id="lineColumns1" class="zpEarch" style="width: 30%;height:100%"></div>
                <div id="Caketype2" class="zpEarch" style="width: 30%;height:100%"></div>
                <div id="Caketype3" class="zpEarch" style="width: 30%;height:100%"></div>
            </div>-->
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
                bbb: 1500,
                // 按钮传参
                UnitTopButton: [
                    { title: "导出", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "DerivedTables" }
                ],
                roadlist: [{"career":"","careerCount":174424},{"career":"会计","careerCount":8},{"career":"保姆","careerCount":7},{"career":"医生","careerCount":7},{"career":"司机","careerCount":7},{"career":"学者","careerCount":7},{"career":"市场顾问 ","careerCount":8},{"career":"建筑师 ","careerCount":8},{"career":"摄影师","careerCount":7},{"career":"教师","careerCount":7},{"career":"无业","careerCount":7},{"career":"服务员 ","careerCount":8},{"career":"清洁工","careerCount":7},{"career":"演员","careerCount":7},{"career":"电话调查员 ","careerCount":8},{"career":"硬件工程师","careerCount":7},{"career":"秘书","careerCount":7},{"career":"经理","careerCount":7},{"career":"经纪人","careerCount":7},{"career":"编辑","careerCount":7},{"career":"育儿师","careerCount":7},{"career":"自由职业者","careerCount":7},{"career":"艺术家 ","careerCount":8},{"career":"软件工程师","careerCount":7},{"career":"采购经理 ","careerCount":8},{"career":"销售副总裁 ","careerCount":8},{"career":"音乐家","careerCount":7},{"career":"预算编制者 ","careerCount":8},{"career":"高级客户经理 ","careerCount":8}],

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
            onMouseOver(){
                this.bbb = 10000;
                let Caketype1 = this.$echarts.init(document.getElementById('Caketype1'));
                let option1_2 = {
                    timeline: {
                        playInterval: this.bbb,//动画的播放速度
                    },
                }
                Caketype1.setOption(option1_2);
            },
            onMouseOut(){
                this.bbb = 1500;
                let Caketype1 = this.$echarts.init(document.getElementById('Caketype1'));
                let option1_2 = {
                    timeline: {
                        playInterval: this.bbb,//动画的播放速度
                    },
                }
                Caketype1.setOption(option1_2);
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
                let gis = document.getElementsByClassName("maincssall")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "路画像" + time + ".png");
                    } else {
                        canvas.toBlob(function(blob) {saveAs(blob, "路画像" + time + ".png");});
                    }
                });
            },
            async mainzhu(){
                clearInterval(this.tt)
                this.resvalue = await this.postval();
                // 区域道路级配统计结果 1
                let Caketype1 = this.$echarts.init(document.getElementById('Caketype1'));
                let option1 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry1 = this.resvalue.roadGradingStatistic;
                let keyvalue1 = [];
                let ownlist1 = [];
                let aaa = [];
                let keys1 = [];
                let roadji = ["快速路","主干路","支干路","支路"];
                    for(let j in arry1[0]) {
                        aaa = arry1[0][j].split(":");
                        ownlist1.push({x1:j, s1: aaa});
                        keys1.push(j)
                        for(let f in aaa){
                            aaa[f] = {value:aaa[f],name:roadji[f]}
                            keyvalue1.push(aaa[f]);
                        }
                    }
                let option1_1 = {
                    series:[{
                        data: keyvalue1
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys1[0]
                    }
                }
                Caketype1.setOption(option1);
                Caketype1.setOption(option1_1);
                // 区域道路级配统计结果 2
                let Caketype2 = this.$echarts.init(document.getElementById('Caketype2'));
                let option2 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry2 = this.resvalue.roadGradingStatistic;
                let keyvalue2 = [];

                let aaa2 = [];
                let keys2 = [];
                let roadji2 = ["快速路","主干路","支干路","支路"];
                for(let j in arry2[1]) {
                    aaa2 = arry2[1][j].split(":");

                    keys2.push(j)
                    for(let f in aaa2){
                        aaa2[f] = {value:aaa2[f],name:roadji2[f]}
                        keyvalue2.push(aaa2[f]);
                    }
                }
                let option1_2 = {
                    series:[{
                        data: keyvalue2
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys2[0]
                    }
                }
                Caketype2.setOption(option2);
                Caketype2.setOption(option1_2);
                // 区域道路级配统计结果 3
                let Caketype3 = this.$echarts.init(document.getElementById('Caketype3'));
                let option3 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry3 = this.resvalue.roadGradingStatistic;
                let keyvalue3 = [];

                let aaa3 = [];
                let keys3 = [];
                let roadji3 = ["快速路","主干路","支干路","支路"];
                for(let j in arry3[2]) {
                    aaa3 = arry3[2][j].split(":");

                    keys3.push(j)
                    for(let f in aaa3){
                        aaa3[f] = {value:aaa3[f],name:roadji3[f]}
                        keyvalue3.push(aaa3[f]);
                    }
                }
                let option1_3 = {
                    series:[{
                        data: keyvalue3
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys3[0]
                    }
                }
                Caketype3.setOption(option3);
                Caketype3.setOption(option1_3);
                // 区域道路级配统计结果 4
                let Caketype4 = this.$echarts.init(document.getElementById('Caketype4'));
                let option4 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry4 = this.resvalue.roadGradingStatistic;
                let keyvalue4 = [];

                let aaa4 = [];
                let keys4 = [];
                let roadji4 = ["快速路","主干路","支干路","支路"];
                for(let j in arry4[3]) {
                    aaa4 = arry4[3][j].split(":");

                    keys4.push(j)
                    for(let f in aaa4){
                        aaa4[f] = {value:aaa4[f],name:roadji4[f]}
                        keyvalue4.push(aaa4[f]);
                    }
                }
                let option1_4 = {
                    series:[{
                        data: keyvalue4
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys4[0]
                    }
                }
                Caketype4.setOption(option4);
                Caketype4.setOption(option1_4);
                // 区域道路级配统计结果 5
                let Caketype5 = this.$echarts.init(document.getElementById('Caketype5'));
                let option5 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry5 = this.resvalue.roadGradingStatistic;
                let keyvalue5 = [];

                let aaa5 = [];
                let keys5 = [];
                let roadji5 = ["快速路","主干路","支干路","支路"];
                for(let j in arry5[4]) {
                    aaa5 = arry5[4][j].split(":");

                    keys5.push(j)
                    for(let f in aaa5){
                        aaa5[f] = {value:aaa5[f],name:roadji5[f]}
                        keyvalue5.push(aaa5[f]);
                    }
                }
                let option1_5 = {
                    series:[{
                        data: keyvalue5
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys5[0]
                    }
                }
                Caketype5.setOption(option5);
                Caketype5.setOption(option1_5);
                // 区域道路级配统计结果 6
                let Caketype6 = this.$echarts.init(document.getElementById('Caketype6'));
                let option6 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry6 = this.resvalue.roadGradingStatistic;
                let keyvalue6 = [];

                let aaa6 = [];
                let keys6 = [];
                let roadji6 = ["快速路","主干路","支干路","支路"];
                for(let j in arry6[5]) {
                    aaa6 = arry6[5][j].split(":");

                    keys6.push(j)
                    for(let f in aaa6){
                        aaa6[f] = {value:aaa6[f],name:roadji6[f]}
                        keyvalue6.push(aaa6[f]);
                    }
                }
                let option1_6 = {
                    series:[{
                        data: keyvalue6
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys6[0]
                    }
                }
                Caketype6.setOption(option6);
                Caketype6.setOption(option1_6);
                // 区域道路级配统计结果 7
                let Caketype7 = this.$echarts.init(document.getElementById('Caketype7'));
                let option7 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry7 = this.resvalue.roadGradingStatistic;
                let keyvalue7 = [];

                let aaa7 = [];
                let keys7 = [];
                let roadji7 = ["快速路","主干路","支干路","支路"];
                for(let j in arry7[6]) {
                    aaa7 = arry7[6][j].split(":");

                    keys7.push(j)
                    for(let f in aaa7){
                        aaa7[f] = {value:aaa7[f],name:roadji7[f]}
                        keyvalue7.push(aaa7[f]);
                    }
                }
                let option1_7 = {
                    series:[{
                        data: keyvalue7
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys7[0]
                    }
                }
                Caketype7.setOption(option7);
                Caketype7.setOption(option1_7);
                // 区域道路级配统计结果 8
                let Caketype8 = this.$echarts.init(document.getElementById('Caketype8'));
                let option8 = {
                    baseOption: {
                        title: {
                            x:"left",
                            left:12,
                            top:8,
                            text: '区域道路级配统计(条)',                                // 主标题
                            textStyle:{
                                fontSize:14,
                                fontWeight:'normal',
                                color:'#3ba7c9',
                                fontFamily: 'PingFangSC-Regular'
                            },
                            subtext: '__________________________________________________________', // 副标题
                            subtextStyle:{
                                color: '#3ba7c9',
                            },
                            itemGap: 0                 //主副标题距离
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}:{c}"
                        },
                        legend: {
                            show: false,
                            type: 'plain',
                            orient: 'vertical',
                            right: 90,
                            top: 60,
                            bottom: 20,
                            textStyle:{
                                color: '#fff'
                            },
                            data:["快速路","主干路","支干路","支路"],
                            selected:[]
                        },
                        series : [
                            {
                                name: '道路级配统计',
                                type: 'pie',
                                radius: '60%',           //图形大小
                                roseType: 'angle',
                                minAngle: 30,           //最小角度
                                center: ['50%', '60%'], //圆心位置
                                radius: ['20%', '50%'],  //内半径外半径
                                clockwise: true,
                                startAngle: 190,
                                avoidLabelOverlap: true,
                                label:{                 //内饰标签
                                    show: true,
                                    position: 'inside',
                                    formatter: '{c}'
                                },
                                label: {                 //隐藏标签
                                    show: true,
                                    position: 'outside',
                                    color: '#fff',
                                    formatter: '{b} : {c}({d}%)',
                                },
                                data:[],
                                itemStyle: {
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = [
                                            '#43ACEE', '#01C7B8', '#008A7C', '#216FC1',
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        ]
                    },
                };
                let arry8 = this.resvalue.roadGradingStatistic;
                let keyvalue8 = [];

                let aaa8 = [];
                let keys8 = [];
                let roadji8 = ["快速路","主干路","支干路","支路"];
                for(let j in arry8[7]) {
                    aaa8 = arry8[7][j].split(":");

                    keys8.push(j)
                    for(let f in aaa8){
                        aaa8[f] = {value:aaa8[f],name:roadji8[f]}
                        keyvalue8.push(aaa8[f]);
                    }
                }
                let option1_8 = {
                    series:[{
                        data: keyvalue8
                    }],
                    title: {
                        text: '区域道路级配统计(条)'+'--'+keys8[0]
                    }
                }
                Caketype8.setOption(option8);
                Caketype8.setOption(option1_8);
                // 区域路网密度统计结果
                let lineColumns2 = this.$echarts.init(document.getElementById('lineColumns2'));
                let option21 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '区域路网密度统计(千米/平方千米)',                                // 主标题
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
                    },
                    // 左侧标签内容显示距离
                    grid: {
                        top: 50,
                        left: 80
                    },// 标签字
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
                    /*dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 8,
                            height: '5%',
                            top: '90%',
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
                            width: 5,
                            height: '70%',
                            handleSize: 8,
                            showDataShadow: false,
                            left: '98%',
                            backgroundColor: 'rgba(25,42,65,0.1)',//未选中填充色
                            fillerColor: 'rgba(25,42,65,0.3)', // 选中范围的填充颜色
                            borderColor: '#192A41', //边框色
                        }
                    ],*/
                    series: [{
                        name: '路网密度',
                        type: 'bar',
                        /* data: [5, 20, 36, 10, 10, 20]*/
                        barWidth: 8,    //柱宽
                        /* itemStyle: {
                             normal: {
                                 color: function (params) {
                                     //自定义颜色
                                     var colorList = [
                                         ['#26C5FE', '#508DFF'], ['#cc6d2f', '#fbea69']
                                     ];
                                     var index=params.dataIndex;
                                     if(params.dataIndex >= colorList.length){
                                         index=params.dataIndex-colorList.length;
                                     }
                                     return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                         offset: 0,
                                         color: colorList[index][0]
                                     }, {
                                         offset: 1,
                                         color: colorList[index][1]
                                     }])
                                 }
                             }
                         },*/
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
                let arry21 = this.resvalue.roadNetDendityStatistic;
                let keys21 = [];
                let keysValue2 = [];
                let ownlist2 = [];
                for( let i in arry21){
                    for(let j in arry21[i]) {
                        ownlist2.push({x2:j, s2: arry21[i][j]});
                        // keys1.push(j)
                        // keysValue1.push(arry1[i][j])
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                ownlist2 = this.$tools.bubbleSort(ownlist2, "s2");
                ownlist2.forEach((i) => {
                    keys21.push(i.x2)
                    keysValue2.push(i.s2.toFixed(2))
                })
                let option2_1 = {
                    yAxis: {
                        data: keys21
                    },
                    series: [{
                        data: keysValue2
                    }],
                }
                lineColumns2.setOption(option21);
                lineColumns2.setOption(option2_1);
                // 积水道路条数
                let lineColumns3 = this.$echarts.init(document.getElementById('lineColumns3'));
                let option31 = {
                    title: {
                        x:"left",
                        left:12,
                        top:8,
                        text: '道路高频积水点数量统计(条)',                                // 主标题
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
                    /*animation: false,*/
                    /*dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 8,
                            height: '5%',
                            top: '90%',
                            backgroundColor: 'rgba(25,42,65,0.1)',//未选中填充色
                            fillerColor: 'rgba(25,42,65,0.3)', // 选中范围的填充颜色
                            borderColor: '#192A41', //边框色
                        },
                        {
                            type: 'inside',
                            start: 30,
                            end: 60,
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
                            left: '93%',
                            backgroundColor: 'rgba(25,42,65,0.1)',//未选中填充色
                            fillerColor: 'rgba(25,42,65,0.3)', // 选中范围的填充颜色
                            borderColor: '#192A41', //边框色
                        }
                    ],*/
                    series: [{
                        name: '道路高频积水点数量统计',
                        type: 'bar',
                        /* data: [5, 20, 36, 10, 10, 20]*/
                        barWidth: 8,    //柱宽
                        /* itemStyle: {
                             normal: {
                                 color: function (params) {
                                     //自定义颜色
                                     var colorList = [
                                         ['#26C5FE', '#508DFF'], ['#cc6d2f', '#fbea69']
                                     ];
                                     var index=params.dataIndex;
                                     if(params.dataIndex >= colorList.length){
                                         index=params.dataIndex-colorList.length;
                                     }
                                     return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                         offset: 0,
                                         color: colorList[index][0]
                                     }, {
                                         offset: 1,
                                         color: colorList[index][1]
                                     }])
                                 }
                             }
                         },*/
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
                        },                // 渐变
                        data: []
                    }]
                };
                let arry31 = this.resvalue.highFreWaterPointNumStatistic;
                let keys31 = [];
                let keysValue3 = [];
                let ownlist3 = [];
                for( let i in arry31){
                    for(let j in arry31[i]) {
                        // ownlist3.push({x2:j, s2: arry31[i][j]});
                        keys31.push(j)
                        keysValue3.push(arry31[i][j])
                    }
                }
                // 冒泡排序（数组，大key，小到大或者大到小）
                // ownlist3 = this.$tools.bubbleSort(ownlist3, "s2");
                // ownlist3.forEach((i) => {
                //     keys31.push(i.x2)
                //     keysValue3.push(i.s2)
                // })
                let data= keysValue3;
                let data1= keys31;
                refreshData();
                /*this.tt = setInterval(() => {
                    let aa = data.shift();
                    data.push(aa);
                    let bb = data1.shift();
                    /!*var randomNum=parseInt(Math.random()*400)*!/
                    data1.push(bb);
                    refreshData();
                    /!*console.log(data);*!///查看下数组是否满足需求
                    /!*let option3_2 = lineColumns3.getOption();//获取页面的option*!/
                }, 3000);*/
                function refreshData(){
                    /*let option3_2 = lineColumns3.getOption();//获取页面的option*/
                    let option3_1 = {
                        yAxis: {
                            data: data1
                        },
                        series: [{
                            data: data
                        }],
                    }
                    /*option.series[0].data = data;//设置新的数据
                    option.yAxis[0].data = data1;*/
                    /*lineColumns3.setOption(option3_2);//绑定到ECharts*/
                    lineColumns3.setOption(option31);
                    lineColumns3.setOption(option3_1);
                }
                window.onresize = function () {
                    Caketype1.resize();
                    Caketype2.resize();
                    Caketype3.resize();
                    Caketype4.resize();
                    Caketype5.resize();
                    Caketype6.resize();
                    Caketype7.resize();
                    Caketype8.resize();
                    lineColumns2.resize();
                    lineColumns3.resize();
                }
            },
            postval() {
                let val = new Promise(function (resolve, reject) {
                    // sjhAxios.post("/sjh2/strategysupport/portrait/roadPortrait", {}).then((res) => {
                        // resolve(res.data.data[0]);
                        resolve(portraitPerson.roadPortrait.data[0]);

                    // }).catch((error) => {
                    //     this.$showSimpleMessage(error, "error")
                    // });
                });
                return val;
            },
           /* Columns1() {
                let myChart = this.$echarts.init(document.getElementById('Columns1'));
                let option = {
                    title: {
                        x:"left",
                        text: '五年每年车辆总数人数量统计',                                // 主标题
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
                        right: 70,
                        data:['近五年','近一年']
                    },
                    grid:{
                        left: '3%',
                        top:'30%'
                    },                               // 整体位置
                    xAxis: {
                        data: ["2014","2015","2016","2017","2018"] ,
                        nameRotate : 50,
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        }                           // x轴样式
                    },
                    yAxis: {
                        minInterval: 0,
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#147a86'
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
                            }
                        },                // 渐变
                        name: '近五年',
                        type: 'bar',
                        barWidth: 50,    //柱宽
                        data: [5, 20, 36, 10, 20]
                    }]
                };
                myChart.setOption(option);
            },
            Columns2() {
                let myChart = this.$echarts.init(document.getElementById('Columns2'));
                let option = {
                    title: {
                        x:"left",
                        text: '车辆车检状态统计结果',                                // 主标题
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
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },                               // 分割线
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#929292'
                            }
                        },
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: ["已车检","未车检"],
                    },

                    series: [{
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
                        },
                        name: '销量',
                        type: 'bar',
                        z: 10,
                        data: [36, 10],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '销量',
                            type: 'bar',
                            data: [40, 40],
                            color: '#192A41',
                            barGap: '-100%'
                        }]
                };
                myChart.setOption(option);
            },*/
           /* Caketype1() {
                let myChart = this.$echarts.init(document.getElementById('Caketype1'));
                let option = {
                    title: {
                        x:"left",
                        text: '区域道路级配统计结果',                                // 主标题
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
                    series : [
                        {
                            name: '使用数据统计结果',
                            type: 'pie',
                            roseType: 'angle',
                            minAngle: 60,           //最小角度
                            center: ['30%', '60%'], //圆心位置
                            radius: ['20', '80%'],  //内半径外半径
                            label:{                 //内饰标签
                                show: true,
                                position: 'inside',
                            },
                            itemStyle: {
                                // 阴影的大小
                                shadowBlur: 400,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            data:[
                                {
                                    value: 30, name: '30%',
                                    itemStyle: {
                                        color: '#43ACEE'
                                    }
                                },
                                {
                                    value: 20, name: '20%',
                                    itemStyle: {
                                        color: '#01C7B8'
                                    }
                                },
                                {
                                    value: 10, name: '10%',
                                    itemStyle: {
                                        color: '#008A7C'
                                    }
                                },
                                {
                                    value: 40, name: '40%',
                                    itemStyle: {
                                        color: '#216FC1'
                                    }
                                }
                            ]
                        }
                    ],
                    graphic : {
                        elements: [

                        ]
                    }
                };
                myChart.setOption(option);
            },*/
           /* Caketype2() {
                let myChart = this.$echarts.init(document.getElementById('Caketype2'));
                let option = {
                    title: {
                        x:"left",
                        text: '车型统计结果',                                // 主标题
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
                    series : [
                        {
                            name: '驾龄统计结果',
                            type: 'pie',
                            /!* radius: '90%',*!/           //图形大小
                            roseType: 'angle',
                            minAngle: 60,           //最小角度
                            center: ['30%', '60%'], //圆心位置
                            radius: ['20', '80%'],  //内半径外半径
                            label:{                 //内饰标签
                                show: true,
                                position: 'inside',
                            },
                            itemStyle: {
                                // 阴影的大小
                                shadowBlur: 400,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            data:[
                                {
                                    value: 25, name: '25%',
                                    itemStyle: {
                                        color: '#42acef'
                                    }
                                },
                                {
                                    value: 20, name: '20%',
                                    itemStyle: {
                                        color: '#01C7B8'
                                    }
                                },
                                {
                                    value: 10, name: '10%',
                                    itemStyle: {
                                        color: '#907845'
                                    }
                                },
                                {
                                    value: 5, name: '5%',
                                    itemStyle: {
                                        color: '#008A7C'
                                    }
                                },
                                {
                                    value: 40, name: '40%',
                                    itemStyle: {
                                        color: '#206fc0'
                                    }
                                }
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            Caketype3() {
                let myChart = this.$echarts.init(document.getElementById('Caketype3'));
                let option = {
                    title: {
                        x:"left",
                        text: '车辆报废状态统计结果',                                // 主标题
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
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        splitLine: {
                            show: true,
                        },                               // 分割线
                        axisLine: {
                            show : true,
                            lineStyle : {
                                color:'#929292'
                            }
                        },
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle : {
                                color:'#147a86'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: ["已报废","未报废"],
                    },

                    series: [{
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
                        },
                        name: '销量',
                        type: 'bar',
                        z: 10,
                        data: [36, 10],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '销量',
                            type: 'bar',
                            data: [40, 40],
                            color: '#192A41',
                            barGap: '-100%'
                        }]
                };
                myChart.setOption(option);
            },*/
           /* lineColumns1() {
                let myChart = this.$echarts.init(document.getElementById('lineColumns1'));
                let option = {
                    title: {
                        x:"left",
                        text: '事故次数统计结果',                                // 主标题
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
                                color:'#147a86'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: ["衬衫","羊毛衫","高跟鞋","袜子"],
                    },

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
                        },
                        name: '销量',
                        type: 'bar',
                        z: 10,
                        data: [5, 20, 36, 10],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '销量',
                            type: 'bar',
                            data: [40, 40, 40, 40],
                            color: '#192A41',
                            barGap: '-100%'
                        }]
                };
                myChart.setOption(option);
            },*/
           /* lineColumns2() {
                let myChart = this.$echarts.init(document.getElementById('lineColumns2'));
                let option = {
                    title: {
                        x:"left",
                        text: '区域路网密度统计结果',                                // 主标题
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
                                color:'#147a86'
                            }
                        },                         // y轴样式
                        type: 'category',
                        data: ["衬衫","羊毛衫","高跟鞋","袜子"],
                    },

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
                        },
                        name: '销量',
                        type: 'bar',
                        z: 10,
                        data: [5, 20, 36, 10],
                        label: {
                            show: true,
                            position: 'right',
                            color: '#fff',
                        },
                    },
                        {
                            name: '销量',
                            type: 'bar',
                            data: [40, 40, 40, 40],
                            color: '#192A41',
                            barGap: '-100%'
                        }]
                };
                myChart.setOption(option);
            },*/
           /* lineColumns3() {
                let myChart = this.$echarts.init(document.getElementById('lineColumns3'));
                let option = {
                    title: {
                        x:"left",
                        text: '积水道路条数',                                // 主标题
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
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {
                            show : false,
                            lineStyle : {
                                color:'#929292'
                            }
                        },
                    },
                    yAxis: {
                        type: 'category',
                        boundaryGap : true,
                        axisLabel: {
                            interval: 0,
                        },
                        data: [],
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
                            top: '90%'
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 30,
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
                            left: '93%',

                        }
                    ],
                    // 标签字
                    series: [{
                        name: '销量',
                        type: 'bar',
                        /!* data: [5, 20, 36, 10, 10, 20]*!/
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
                            /!*{
                                value: 15,
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
                            },
                            {
                                value: 50,
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
                            },
                            {
                                value: 100,
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
                            },
                            {
                                value: 200,
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
                            },
                            {
                                value: 500,
                                itemStyle:{
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#cc6d2f'
                                        }, {
                                            offset: 1,
                                            color: '#fbea69'
                                        }])
                                    }
                                },                // 渐变
                            },
                            {
                                value: 1000,
                                itemStyle:{
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#e8675d'
                                        }, {
                                            offset: 1,
                                            color: '#e8672f'
                                        }])
                                    }
                                },                // 渐变
                            },*!/
                        ]
                    }]
                };
                let road = this.roadlist;
                let eee = [];
                let fff = [];
                for(let i =0;i < road.length;i++){
                    if(road[i].career != ""){
                        eee.push(road[i].career)
                        fff.push(road[i].careerCount)
                    }
                }
                let option1 = {
                    yAxis: {
                        data: eee
                    },
                    series: [{
                        name: '销量',
                        data: fff
                    }]
                };
                myChart.setOption(option);
                myChart.setOption(option1);
            }*/
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
                //     saveAs(blob, "路画像" + time + ".png");
                //     /*if (navigator.msSaveBlob) {
                //     navigator.msSaveBlob(canvas.msToBlob(), "人画像" + time + ".png");
                // } else {
                //     canvas.toBlob(function(blob) {saveAs(blob, "人画像" + time + ".png");});
                // }*/
                // });
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                  if (navigator.msSaveBlob) {
                    mapLoading.close();
                    navigator.msSaveBlob(canvas.msToBlob(), "路画像" + time + ".png");
                  } else {
                    canvas.toBlob(function(blob) {
                        mapLoading.close();
                        saveAs(blob, "路画像" + time + ".png");
                    });
                  }
                });
            },4000)
           /* this.mainzhu();
            this.t = setInterval(() => {
                this.mainzhu();
            },15000)*/
        }
    }
</script>
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
        margin-left: 2%;
        margin-bottom: 2%;
    }
    .mainyangshi {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        height: 90%;
    }
    .maintwol {
        width: 58%;
    }
    .leftone {
        display: flex;
        height: 24%;
        margin-bottom: 1%;
    }
    .lefttwo {
        display: flex;
        height: 24%;
        margin-bottom: 1%;
    }
    .leftthree {
        display: flex;
        height: 24%;
        margin-bottom: 1%;
    }
    .leftfour {
        display: flex;
        height: 24%;
    }
    .mainthree {
        display: flex;
        height: 30%;
        margin-left: 2%;
        margin-bottom: 2%;
    }
    .mainfour {

        width: 40%;
    }
</style>