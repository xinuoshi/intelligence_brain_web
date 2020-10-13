<style scoped>
    *{
        box-sizing: border-box
    }
    .bodyAll {
        width: 1764px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .topLeftDiv, .topLeftDiv, .topLeftRightDiv{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .topDiv {
        display: flex;
        margin-bottom: 5px;
        margin-top: 5px;
    }
    .topLeftTop {
        display: flex;
        flex-direction: row;
        margin-right: 13px;
    }
    .topLeftLeftDiv{
        width: 336px;
        height: 890px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        margin-right: 13px;
        margin-left: 13px;
        margin-top: 5px;
    }
    .topLeftRightDiv{
        width: 1032px;
        height: 890px;
        /* border: 1px solid red; */
        background-color: #0d2340;
    }
    .toprightDiv {
        width: 336px;
        height: 1304px;
        /* border: 1px solid red; */
        background-color: #0d2340;
    }
    .topLeftRightDivChild {
        width: 100%;
        flex: 1;
        /* border: 1px solid red; */
        background-color: #0d2340;
    }
    .topLeftBottom{
        display: flex;
        justify-content: space-between;
        margin-right: 13px;
        margin-left: 13px;
    }
    .topLeftBottomChild{
        height: 400px;
        width: 336px;
        /* border: 1px solid red; */
        background-color: #0d2340;
    }
    .bottomDiv{
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        margin-left: 13px;
        margin-right: 13px;
        margin-top: 13px;
    }
    .bottomLeft{
        width: 1024px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
         /* margin-left: 13px; */
        margin-right: 13px;
    }
    .bottomLeftTop{
        display: flex;
        width: 1047px;;
        /* justify-content: space-between; */
    }
    .bottomLeftTopLeft {
        width: 685px;
        justify-content: space-between;
        display: flex;
    }
    .bottomLeftTopLeftDiv {
        width: 336px;
        height: 400px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        margin-bottom: 13px;
        margin-right: 13px;
    }
    .bottomLeftTopRight{
        width: 336px;
        height: 823px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        margin-bottom: 13px;
        margin-left: 13px;
    }
    .bottomLeftBottom{
        width: 1047px;
        display: flex;
        flex-direction: row;
        /* justify-content: space-between */
    }
    .bottomLeftBottomDiv{
        width: 336px;
        height: 400px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        margin-right: 13px;
    }
    .bottomRight{
        width: 685px;
        margin-left: 9px;
        min-height: 823px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .bottomRightDiv{
        width: 336px;
        min-height: 823px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        /* margin-right: 13px; */
        /* margin-bottom: 5px;/ */
    }
    .bottomRightDivs{
        width: 336px;
        height: 400px;
        /* border: 1px solid red; */
        background-color: #0d2340;
        margin-top: 13px;
    }
    .tableOffictitle{
        font-size: 13px;
        color: #3ba7c9;
        text-align: left;
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
  }
   .el-table__body-wrapper::-webkit-scrollbar {
        display: none;
    }
  .tableOffictitle{
        font-size: 13px;
        color: #3ba7c9;
        text-align: left;
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
  }
  .earchTraffic .el-carousel__button{
    width: 5px;
    height: 5px;
    border-radius: 50px;
  }
  #table .el-table__body{
      box-sizing: border-box;
      margin-top:0%;
      height: 100%;
      overflow: scroll;
  }
  .title {
      width: 100%;
      font-size: 13px;
      padding-left: 10px;
      /* padding: 10px; */
      /* line-height: 40px; */
      border: none;
      color: #3ba7c9 !important;
  }
  .topLeftLeftDiv /deep/ .el-table--fit, .el-table {
      position: relative !important;
  }
  .topLeftLeftDiv /deep/ .el-table td, .el-table th {
      height:40px !important;
  }
</style>

<template>
    <div style="width:100%;height:100%;overflow:scroll">
        <div class="bodyAll">
            <div class="topDiv">
                <div class="topLeftDiv">
                    <div class="topLeftTop">
                        <div class="topLeftLeftDiv">
                            <div class="tableOffictitle">{{tableTitle}}</div>
                            <el-table :data="tableData" id="table"  height="96%">
                                <el-table-column prop="index" label="排名" width="50"></el-table-column>
                                <el-table-column prop="name" label="企业名称">
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="right">
                                            <p style="color: #fff">{{scope.row.name}}</p>
                                            <div slot="reference" class="tems_popover">
                                                <el-tag class="roadNameInner" size="medium">{{scope.row.name}}</el-tag>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="address" label="行政区域"></el-table-column>
                                <el-table-column prop="num" :label="biaoname+'(个)'"></el-table-column>
                            </el-table>
                        </div>
                        <div class="topLeftRightDiv">
                            <div class="topLeftRightDivChild" id="Columns1"></div>
                            <div class="topLeftRightDivChild" id="popyoy"></div>
                            <div class="topLeftRightDivChild" id="Columns2"></div>
                        </div>
                    </div>
                    <div class="topLeftBottom">
                        <div class="topLeftBottomChild" id="sex"></div>
                        <div class="topLeftBottomChild" id="age"></div>
                        <div class="topLeftBottomChild" id="driveAge"></div>
                        <div class="topLeftBottomChild" id="illNum"></div>
                    </div>
                </div>
                <div id="lineColumns2" class="toprightDiv"></div>
            </div>
            <div class="bottomDiv">
                <div class="bottomLeft">
                    <div class="bottomLeftTop">
                        <div class="bottomLeftTopLeft">
                            <div style="display:flex;flex-direction: column;">
                                <div class="bottomLeftTopLeftDiv" id="historyNum"></div>
                                <div class="bottomLeftTopLeftDiv" id="score"></div>
                            </div>
                            <div style="display:flex;flex-direction: column;">
                                <div class="bottomLeftTopLeftDiv" id="belong"></div>
                                <div class="bottomLeftTopLeftDiv" id="num"></div>
                            </div>
                        </div>
                        <div class="bottomLeftTopRight" id="carColor"></div>
                    </div>
                    <div class="bottomLeftBottom">
                        <div class="bottomLeftBottomDiv" id="carUse"></div>
                        <div class="bottomLeftBottomDiv" id="accidentNum"></div>
                        <div class="bottomLeftBottomDiv"  id="zpEarch"></div>
                        <!-- <div class="bottomLeftBottomDiv" id="Caketype1">

                            <div class="title">{{peopleTitle}}</div>
                            <div class="cwl" style="display: flex; justify-content: space-around;margin-top: 30px;">
                                <el-progress type="circle" :percentage="driverLocations[0].percent" :width="100" :stroke-width="16" color="#01ffff" background-color="#064f66"></el-progress>
                                <el-progress type="circle" :percentage="driverLocations[1].percent" :width="100" :stroke-width="16" color="#01ffff"></el-progress>
                            </div>
                            <div style="display: flex; justify-content: space-around;margin-top: 10px;">
                                <span>{{driverLocations[0].name}}  {{driverLocations[0].count}}</span>
                                <span>{{driverLocations[1].name}}  {{driverLocations[1].count}}</span>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="bottomRight">
                    <div class="bottomRightDiv" id="carType"></div>
                    <div class="bottomRightDiv" id="carNature"></div>
                    <div class="bottomRightDivs" id="lineColumns1" v-if="weatherON" >
                        <div class="title">{{peopleTitle}}</div>
                        <div class="cwl" style="display: flex; justify-content: space-around;margin-top: 30px;">
                            <el-progress type="circle" :percentage="driverLocations[0].percent" :width="100" :stroke-width="16" color="#01ffff" background-color="#064f66"></el-progress>
                            <el-progress type="circle" :percentage="driverLocations[1].percent" :width="100" :stroke-width="16" color="#01ffff"></el-progress>
                        </div>
                        <div style="display: flex; justify-content: space-around;margin-top: 10px;">
                            <span>{{driverLocations[0].name}}  {{driverLocations[0].count}}</span>
                            <span>{{driverLocations[1].name}}  {{driverLocations[1].count}}</span>
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
import domtoimage from "dom-to-image";
import { Loading } from 'element-ui';
export default {
  name: "SubjectPortrait",
  data() {
    return {
      weatherON: true,
      tablevalue: [],
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
        {
          searchPlaceholder: "查询日期",
          id: "",
          type: 3,
          url: "",
          Sendkey: "startTime",
          data: "",
          time: ""
        },
        {
          searchPlaceholder: "至",
          id: "",
          type: 4,
          url: "",
          Sendkey: "endTime",
          data: "",
          time: ""
        }
      ],
      // 按钮传参
      UnitTopButton: [
        {
          title: "导出",
          plain: true,
          type: "primary",
          size: "small",
          class: "qiliang",
          functionKeyName: "DerivedTables"
        }
      ],
      // 24小时违法数量统计
      twentyFour: [],
      // 违法类型分布统计
      accidentTypeNumber: [],
      // 违法类型分布统计对应侧边
      legend: [],
      // 违法车辆号牌属地统计
      accidentCarNumber: [],
      // 违法数量同比环比
      accidentCompareNumber: [],
      // 违法天气的统计数据
      weather: [],
      // 涉事人员户口统计
      driverLocation: [],
      driverLocations: [{name:"本地",percent:0,count:0},{name:"外地",percent:0,count:0}],
      // 涉事人员年龄分布
      driverAgeArr: [],
      // 涉事人员违章次数统计
      illegalTimeArr: [],
      // 涉事人员的驾龄统计
      driverDirveAgeArr: [],
      tableData:[],
      tableDataAcd: [
        {
          index: "1",
          name: "顺通长途客运有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "2",
          name: "吉通客运有限公司",
          address: "津南区",
          num: 3
        },
        {
          index: "3",
          name: "正通汽车租赁有限公司",
          address: "津南区",
          num: 3
        },
        {
          index: "4",
          name: "海华运输有限公司",
          address: "津南区",
          num: 3
        },
        {
          index: "5",
          name: "华洋阀门有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "6",
          name: "大光出租汽车有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "7",
          name: "海琪运输有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "8",
          name: "丰收客运有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "9",
          name: "神州客运有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "10",
          name: "利通运业有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "11",
          name: "新生汽车租赁服务部",
          address: "津南区",
          num: 2
        },
        {
          index: "12",
          name: "龙华运输有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "13",
          name: "通达危险品运输有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "14",
          name: "太阳科贸有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "15",
          name: "海纳物资供应有限责任公司",
          address: "津南区",
          num: 2
        },
        {
          index: "16",
          name: "博通汽车出租有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "17",
          name: "精忠国际旅行社有限公司",
          address: "津南区",
          num: 2
        },
        {
          index: "18",
          name: "聚力联运服务站",
          address: "津南区",
          num: 1
        },
        {
          index: "19",
          name: "扬帆国际旅行社有限公司",
          address: "津南区",
          num: 1
        },
        {
          index: "20",
          name: "汇林汽车租赁有限公司",
          address: "津南区",
          num: 1
        }
      ],
       tableDataOff: [
        {
          index: "1",
          name: "畅达旅游公司",
          address: "津南区",
          num: 7
        },
        {
          index: "2",
          name: "高宏科技有限公司",
          address: "津南区",
          num: 6
        },
        {
          index: "3",
          name: "顺通长途客运有限公司",
          address: "津南区",
          num: 6
        },
        {
          index: "4",
          name: "浩瀚汽车服务有限公司",
          address: "津南区",
          num: 6
        },
        {
          index: "5",
          name: "博通汽车出租有限公司",
          address: "津南区",
          num: 6
        },
        {
          index: "6",
          name: "广源通物流有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "7",
          name: "金润客运有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "8",
          name: "海河国际机场",
          address: "津南区",
          num: 5
        },
        {
          index: "9",
          name: "长虹客运车队",
          address: "津南区",
          num: 5
        },
        {
          index: "10",
          name: "太湖客运有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "11",
          name: "精忠国际旅行社有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "12",
          name: "正通汽车租赁有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "13",
          name: "龙华运输有限公司",
          address: "津南区",
          num: 5
        },
        {
          index: "14",
          name: "港兴天然气运输公司",
          address: "津南区",
          num: 4
        },
        {
          index: "15",
          name: "科荣运输发展有限公司",
          address: "津南区",
          num: 4
        },
        {
          index: "16",
          name: "新生汽车租赁有限公司",
          address: "津南区",
          num: 4
        },
        {
          index: "17",
          name: "海纳企业管理有限公司",
          address: "津南区",
          num: 4
        },
        {
          index: "18",
          name: "新港南运输队",
          address: "津南区",
          num: 4
        },
        {
          index: "19",
          name: "华盛客运出租汽车公司",
          address: "津南区",
          num: 4
        },
        {
          index: "20",
          name: "景昌出租车有限公司",
          address: "津南区",
          num: 4
        }
      ],
      tableTitle:"企业事故排行榜",
      biaoname:"",
      accidentTypeN:[],
      aa:"",
      ww:"",
      dd:"",
      use:"",
      type:"",
      car:"",
      setIn:"",
      timer:"",
      ifstop: true,
      mgt:"",
      firstData:[],
      peopleTitle:""
    };
  },
  methods: {
     // 搜索回调
    searchEvent(payload) {
      if (payload.startTime === undefined || payload.endTime === undefined) {
        this.$showSimpleMessage("请选择时间区间", "error");
        return;
      }
      let timer = {
        endTime:
          payload.endTime === undefined
            ? ""
            : this.$tools.getDays(new Date(payload.endTime)),
        startTime:
          payload.startTime === undefined
            ? ""
            : this.$tools.getDays(new Date(payload.startTime)),
        area: payload.ares === undefined ? "" : payload.ares
      };
      this.timer = timer;
    //   window.clearInterval(this.aa);
       window.clearInterval(this.ww);
       window.clearInterval(this.dd);
       window.clearInterval(this.use);
       window.clearInterval(this.type);
       window.clearInterval(this.car);
      // this.getTrafficNumber(timer);
      this.getTrafficDay(timer);
      this.accidentType(timer);
      this.accidentCar(timer);
      this.accidentCompare(timer);
      this.accidentWeather(timer);
      this.accidentPerson(timer);
      this.accidentDriverSex(timer);
      this.illegalDriverAge(timer);
      this.illegalTime(timer);
      this.illDriverDriveAge(timer);
      this.driverHistory(timer);
      this.driverCount(timer);
      this.driverCarType(timer);
      this.carColor(timer);
      this.carUser(timer);
      this.carProperties(timer);
      this.illNum(timer);
      this.illAccidentNum(timer);
      this.carBlone(timer);
    },
    // 按钮组件回调
    operation(data) {
      let args = this.UnitTopButton[data.index].functionKeyName.split(":");
      let fn = eval(`this.${args.shift()}`);
      fn.apply(this, args);
    },
    // 导出功能
    DerivedTables() {
      //   alert("是否导出");
      this.$router.push({
                path: "/download",
                query: {
                    timer: this.timer
                }
            });
    },
    // 24小时事故数量统计
    Columns1(name) {
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        title: {
          x: "left",
          text: name,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0
        },
        tooltip: {
            show:true,
            trigger: 'item',
            formatter: "{a} <br/>{b}点{c} (次)"
        },
        // dataset: {
        //   source: [
        //     [
        //       "00",
        //       "01",
        //       "02",
        //       "03",
        //       "04",
        //       "05",
        //       "06",
        //       "07",
        //       "08",
        //       "09",
        //       "10",
        //       "11",
        //       "12",
        //       "13",
        //       "14",
        //       "15",
        //       "16",
        //       "17",
        //       "18",
        //       "19",
        //       "20",
        //       "21",
        //       "22",
        //       "23"
        //     ],
        //     // this.twentyFour
        //     // [22,25,26,29,35,36,38,15,16,14,12,35,28,48,46,55,26,35,59,13,15,2,2,9]
        //   ]
        // },
        grid: {
          left: "3%",
        //   top: "60px",
          width: "94%",
          height: "75%",
          bottom:0,
          containLabel: true
        },
        xAxis: {
          type: "category",
          // data: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
          axisLine: {
            lineStyle: {
              color: "#147a86"
            }
          },
          name: "/时",
          nameRotate: null,
          nameLocation: "end", // x轴样式
          nameGap: 10,
          data:[
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23"
            ],
          nameTextStyle: {
            verticalAlign: "middle",
            padding: [30, 0, 0, 0]
          }
        },
        yAxis: {
          // type: 'category',
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
              type: "dotted"
            }
          } // y轴轴线样式
        },
        label: {
          show: true,
          position: "top",
          color: "#fff"
        }, // 标签字
        series: [
          {
              data:this.twentyFour,
            itemStyle: {
              normal: {
                color: "#5abdfc"
              }
            }, // 渐变
            name: "事故数量",
            type: "line",
            symbolSize: function(val) {
              return val[2] * 2;
            },
            seriesLayoutBy: "row",
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#0cede3'
                }, {
                    offset: 1,
                    color: '#1483bb'
                }])
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    // 事故类型分布统计
    Columns2(start, end, name) {
        let myChart = this.$echarts.init(document.getElementById("Columns2"));
        let option = {
            title: {
                x: "left",
                text: name,
                textStyle: {
                    fontSize: 14,
                    fontWeight: "normal",
                    color: "#3ba7c9",
                    fontFamily: "PingFangSC-Regular"
                },
                left: "10",
                top: "10",
                subtextStyle: {
                    color: "#3ba7c9"
                },
                itemGap: 0
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} (次)"
            },
            grid: {
                left: "3%",
                // top: "60px",
                 bottom:0,
                width:"94%",
                height: "75%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                axisLine: {
                    lineStyle: {
                    color: "#147a86"
                    }
                },
                // name: "/时",
                nameRotate: 40,
                nameLocation: "end", // x轴样式
                nameGap: 10,
                nameTextStyle: {
                    verticalAlign: "middle",
                    width: 20
                },
                data: this.accidentTypeN,
                axisLabel:{
                    formatter: function(name) {
                        if (name.length > 5) {
                            return name.substring(0, 5) + "...";
                        } else {
                            return name;
                        }
                    }
                },
                axisTick: {
                    lineStyle: {
                        length: 6
                    }
                }
            },
            yAxis: {
            // type: 'value',
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
                    type: "dotted"
                    }
                },
            },
            label: {
                show: true,
                position: "top",
                color: "#fff"
            }, // 标签字
            dataZoom: [
            {
                show: false,
                start: start,
                end: end
            },
            {
                show: false,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 30,
                height: '80%',
                showDataShadow: false,
                left: '93%'
            }
        ],
            series: [
            {
                itemStyle: {
                    normal: {
                       color: "#01ffff"
                    }
                }, // 渐变
                name: "事故数量",
                type: "bar",
                barWidth: 25,
                // symbolSize: function(val) {
                // return val[2] * 2;
                // },
                seriesLayoutBy: "row",
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(136,100,248,0.8)'
                    }, {
                        offset: 1,
                        color: 'rgb(136,100,248,0)'
                    }])
                },
                data: this.accidentTypeNumber
            }
            ]
      };

      myChart.setOption(option);
    },
    // 涉事机动车属地统计
    Caketype1(data,dataY,name) {
      let myChart = this.$echarts.init(document.getElementById("lineColumns2"));
      let option = {
        title: {
          x: "left",
          text: name, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        grid: {
            left: "1%",
            height: '85%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} (辆)"
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          }
        }, // 图例组件
        xAxis: {
          type: "value",
          //   boundaryGap: [0, 0.01],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#567195"
            }
          }, // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6f747c",
              width: 1,
              shadowColor: "rgba(4,13,39,0.79)",
              shadowBlur: 2,
              shadowOffsetY: "2"
            }
          },
          axisLabel: {
              show: false,
            color: "#145b8b"
          },
          axisTick:{
              show:false
          }
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: "#1f73a7"
                }
            }, // y轴样式
            scale: true,
            type: "category",
            data: dataY,
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "rgb(33,53,80,0.74)"
              }
            },
            silent: true,
            label: {
              shadowColor: "red",
              shadowBlur: 25,
              shadowOffsetY: "25",
              shadowOffsetX: "25"
            },
            barWidth: 26,
            barGap: "-100%", // Make series be overlap
            data: [this.accidentCarNumber, this.accidentCarNumber, this.accidentCarNumber, this.accidentCarNumber, this.accidentCarNumber]
          },
          {
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0bf2e4"
                  },
                  {
                    offset: 1,
                    color: "#0791d7"
                  }
                ])
              }
            },
            type: "bar",
            barWidth: 26,
            z: 10,
            data: data,
            label: {
                show: true,
                position: "right",
                color: "#03aac"
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    // 涉事事故环比同比
    Caketype2(name) {
        let _this = this;
        let myChart = this.$echarts.init(document.getElementById("popyoy"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          trigger: 'item',
            // formatter: "{a1} <br/>{b1}: {c1} (次)"
        },
        grid: {
          left: "3%",
        //   top: "60px",
          width:"92%",
          height:"75%",
          containLabel: true,
           bottom:0,
        },
        title: {
          text: name,
          left: 50,
          top: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0
        },
        legend: {
          right: 5,
          top: 10,
          textStyle: {
            color: "rgb(44, 248, 255)",
            fontSize: 14
          },
          selectedMode: true,
          data: ["环比", "同比", this.biaoname]
        },
        xAxis: {
          type: "category",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#567195",
            }
          }, // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6f747c",
              width: 1,
              shadowColor: "rgba(4,13,39,0.79)",
              shadowBlur: 2,
              shadowOffsetY: "2"
            }
          },
          axisLabel: {
            color: "#145b8b"
          },
          data: this.accidentCompareNumber[0]
        // data: ["津南", "塘沽", "大港", "宁河", "静海", "西青", "和平", "小店"]
        },
        yAxis: [
          {
            name: this.biaoname,
            // maxInterval: 20,
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "rgb(44, 248, 255)"
            },
            splitLine: {
              show: false,
              interval: 1,
              lineStyle: {
                color: ["#567195"],
                solid: "dashed"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#1f73a7"
              }
            }, // y轴样式
            type: "value"
          },
          {
            type: "value",
            name: "环比/同比",
            position: "right",
            offset: 20,
            max: 'dataMax',
            min: 'dataMin',
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "rgb(44, 248, 255)"
            },
            splitLine: {
              show: false,
              interval: 1,
              lineStyle: {
                color: ["#567195"],
                solid: "dashed"
              }
            },
            axisLabel: {
                // inside: true,
                // rotate: 45
            },
            axisLine: {
              lineStyle: {
                color: "#1f73a7"
              }
            } // y轴样式
            //   type: "category",
          }
        ],

        series: [
            {
            type: "bar",
            itemStyle: {
              normal: {
                color: "rgb(33,53,80,0.74)"
              }
            },
            silent: true,
            barWidth: 26,
            barGap: "-100%", // Make series be overlap
            data: this.accidentCompareNumber[4],
            tooltip:{
                show:false
            }
          },
          {
            itemStyle: {
              normal: {
                color: "#01ffff"
              }
            },
            yAxisIndex: 0,
            name: this.biaoname,
            type: "bar",
            barWidth: 26,
              label: {
                  show: true,
                  position: "top",
                  align: "center",
                  formatter: function(value) {
                      //console.log(value)
                      return "{a|"+_this.biaoname+":" + value.data + "起}\n{b|环比:" + _this.accidentCompareNumber[1][value.dataIndex].toFixed(2) + "}\n{c|同比:" + _this.accidentCompareNumber[2][value.dataIndex].toFixed(2) + "}";
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
            data: this.accidentCompareNumber[3],
            // data: [45, 45, 55, 56, 33, 20, 45, 52]
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} (次)"
                },
          },
          {
            color: "#57c8f5",
            name: "环比",
            type: "line",
            yAxisIndex: 1,
            lineStyle: {
                color: "#ccf235"
            },
            itemStyle: {
                color: "#ccf235"
            },
            data: this.accidentCompareNumber[1],
            // data: [0.2, 0.35, 0.64, 0.54, 0.53, 0.20, 0.65, 0.72]
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}"
            },
          },
          {
            color: "#d14a61",
            name: "同比",
            type: "line",
            yAxisIndex: 1,
            lineStyle: {
                color: "#bf3610"
            },
            itemStyle: {
                color: "#bf3610"
            },
            data: this.accidentCompareNumber[2],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}"
            },
            // data: [0.6, 0.5, 0.2, 0.4, 0.5, 0.8, 0.7, 0.6]
          },
          
        ]
      };
      myChart.setOption(option);
    },
    // 事故天气类型分布
    lineColumns1() {
      let myChart = this.$echarts.init(document.getElementById("lineColumns1"));
      let option = {
        title: {
          x: "left",
          text: "事故天气类型分布（天）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} (天)",
            confine: true
        },
        grid: {
          left: "3%",
          top: "80px",
          width: "80%",
          height:"100%",
          containLabel: true
        },
        legend: {
          show: true,
          type: "scroll",
          orient: "vertical",
          right: "1%",
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
          itemWidth: 15,
          itemHeight: 10,
          top: "2%",
          data: this.weather
        },
        color:["#206fc0","#23b6d1","#20c09c","#20a8c0","#204dc0","#2420c0","#6bc020","#c0a020","#c06b20"],
        series: [
          {
            name: "事故天气类型分布统计",
            type: "pie",
            center: ["50%", "55%"], //圆心位置
            radius: '30%',
            label: {
              //内饰标签
              show: true,
              position: "outside",
              formatter: "{b}: {c} (天)",
            },
            data: this.weather
          }
        ]
      };
      myChart.setOption(option);
    },
    // 违法人员户口属地统计
    lineColumns2() {
      // let myChart = this.$echarts.init(document.getElementById("lineColumns2"));
      let myChart = this.$echarts.init(document.getElementById("Caketype1"));
      let option = {
        title: {
          x: "left",
          text: "涉事人员属地统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {},
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          }
        }, // 图例组件
        xAxis: {
          type: "value",
          //   boundaryGap: [0, 0.01],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#567195"
            }
          }, // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6f747c",
              width: 1,
              shadowColor: "rgba(4,13,39,0.79)",
              shadowBlur: 2,
              shadowOffsetY: "2"
            }
          },
          axisLabel: {
            color: "#145b8b"
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#1f73a7"
            }
          }, // y轴样式
          type: "category",
          data: this.driverLocation[1]
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: "rgb(33,53,80,0.74)"
              }
            },
            silent: true,
            // label: {
            //   shadowColor: "red",
            //   shadowBlur: 25,
            //   shadowOffsetY: "25",
            //   shadowOffsetX: "25"
            // },
            barWidth: 46,
            barGap: "-100%", // Make series be overlap
            data: [80, 80]
          },
          {
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0bf2e4"
                  },
                  {
                    offset: 1,
                    color: "#0791d7"
                  }
                ])
              }
            },
            // name: "涉事人员属地统计（人）",
            type: "bar",
            barWidth: "46px",
            z: 10,
            data: this.driverLocation[0],
            label: {
              show: true,
              position: "right",
              color: "#03aac"
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    // 违法驾驶员性别统计
    driverSex(name) {
      let option = {
        title: {
          x: "left",
          text: name, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        color:["#f8af00", "#009ef8"],
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} (人)"
        },
        legend: {
          show: true,
          type: "scroll",
          orient: "vertical",
          right: "1%",
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
          itemWidth: 15,
          itemHeight: 10,
          top: "5%",
        }, // 图例组件
        series: [
          {

            // name: "涉事人员属地统计（人）",
            type: "pie",
            radius: ['20%', '40%'],
            data: this.driverLocation,
            // data:[
            //     {value:325, name:'男'},
            //     {value:210, name:'女'},
            // ],
              label:{
                  show: true,
                  position: 'right',
                  color: '#fff',
                  formatter: '{b} : {c}人({d}%)',
              },
            labelLine: {
                length: 5,
                length2: 5
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("sex"));
      myChart.setOption(option);
    },
    // 违法驾驶员年龄统计  // 侧边的柱形图
    driverAge(title,name,dataS,dataY, dep) {
      if (dataS.length === 0 || dataY.length === 0) {
        // document.getElementById(name).innerHTML=title;
        // return;
      }
      if(!dep) {
          dep = "人"
      }
      let option = {
        title: {
          x: "left",
           show:true,
          text: title, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ("+dep+")"
            },
        grid:{
            left: "4%",
            containLabel: true,
            bottom: 40
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          }
        }, // 图例组件
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          }, // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#929292"
            }
          },
          axisLabel:{
              show:false
          },
          axisTick:{
              show:false
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#147a86"
            }
          }, // y轴样式
          type: "category",
        //  data: this.driverAgeArr[1]
        data: dataY,
        // 限制字数
        axisLabel:{
              formatter: function(value) {
                if (value.length > 5) {
                    return value.substring(0, 5) + "...";
                } else {
                    return value;
                }
            }
          }
        },

        series: [
          {
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#26C5FE"
                  },
                  {
                    offset: 1,
                    color: "#508DFF"
                  }
                ])
              }
            },
            // name: "涉事人员属地统计（人）",
            type: "bar",
            barWidth: "10px",
            z: 10,
            // data: this.driverAgeArr[0],
            data: dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(name));
      myChart.setOption(option);
    },
    // 违法驾驶员驾龄统计 // 雷达图
    driverDirveAge(title, name,dataS,dataY) {
      if (dataS.length === 0 || dataY.length === 0) {
        dataS = [0];
        dataY = [""];
      }
        let option = {
            title: {
                x: "left",
                textStyle: {
                    fontSize: 14,
                    fontWeight: "normal",
                    color: "#3ba7c9",
                    fontFamily: "PingFangSC-Regular"
                },
                left: "10",
                top: "10",
                subtextStyle: {
                    color: "#5abdfc"
                },
                 show:true,
                text: title
            },
            tooltip: {
                position:[0,0]
            },
            grid: {
                containLabel: true,
                bottom: 20
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                center:['45%', '50%'],
                radius: '40%' ,
                axisLine:{
                    lineStyle: {
                        color:"#567195"
                    }
                },
                splitLine:{
                    lineStyle: {
                        color:"#567195"
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ["rgb(23,86,191,0.1),rgb(23,86,191,0.5)"],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                name: {
                    textStyle: {
                        color: 'rgb(238, 197, 102)'
                    }
                },
                indicator: dataY
            },
            series: [{
                // name: '预算 vs 开销',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : dataS,
                symbolSize: 2,
                areaStyle:{
                    color:  new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: "rgb(150,148,21)"
                        },
                        {
                            offset: 1,
                            color: "rgb(236,255,10)"
                        }
                        ])
                }
            }]
        };
      let myChart = this.$echarts.init(
        document.getElementById(name)
      );
      myChart.setOption(option);
    },
    // 涉事驾驶员违章次数统计 // 扇形图
    driverTime(name, title, dataS, dataY,color) {
      if (dataS.length === 0 || dataY.length === 0) {
        // dataS=[0];
        // dataY = [""]
      }
      let option = {
        title: {
          x: "left",
           show:true,
          text: title, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#5abdfc",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#5abdfc"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            trigger: 'item',
            formatter:"{b}(次): {c}(起) "
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          },
        bottom: 40,
        textStyle:{
            color: "#5abdfc"
        },
          data: dataY
        }, // 图例组件
        color:color,
        series: [
          {
            itemStyle: {
              normal: {
                // color: function (params) {
                //     let colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                //     let color = colorList[params.dataIndex];
                //     return color
                // }
              }
            },
            center:['55%', '50%'],
            radius: '30%' ,
            type: "pie",
            barWidth: "10px",
            z: 10,
            // data: this.illegalTimeArr[0],
            data:dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter:"{b}(次): {c}(起) "
            },
            labelLine: {
                length: 5,
                length2: 5
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(name));
      myChart.setOption(option);
    },
    //违法驾驶员历史违法统计 // 扇形图
    driver1(name, title, dataS, dataY,color) {
      if (dataS.length === 0 || dataY.length === 0) {
        // dataS=[0];
        // dataY = [""]
      }
      let option = {
        title: {
          x: "left",
           show:true,
          text: title, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#5abdfc",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#5abdfc"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            trigger: 'item',
            formatter:"{b}(次): {c}(人) "
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          },
        bottom: 40,
        textStyle:{
            color: "#5abdfc"
        },
          data: dataY
        }, // 图例组件
        color:color,
        series: [
          {
            itemStyle: {
              normal: {
                // color: function (params) {
                //     let colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                //     let color = colorList[params.dataIndex];
                //     return color
                // }
              }
            },
            center:['55%', '50%'],
            radius: '30%' ,
            type: "pie",
            barWidth: "10px",
            z: 10,
            // data: this.illegalTimeArr[0],
            data:dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter:"{b}(次): {c}(人) "
            },
            labelLine: {
                length: 5,
                length2: 5
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(name));
      myChart.setOption(option);
    },
    // 涉事机动车(违法/事故)次数统计 // 扇形图
    carDriverTime(name, title, dataS, dataY,color) {
      if (dataS.length === 0 || dataY.length === 0) {
        // dataS=[0];
        // dataY = [""]
      }
      let option = {
        title: {
          x: "left",
           show:true,
          text: title, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#5abdfc",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#5abdfc"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            trigger: 'item',
            formatter:"{b}(次): {c}(辆) "
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          },
        bottom: 40,
        textStyle:{
            color: "#5abdfc"
        },
          data: dataY
        }, // 图例组件
        color:color,
        series: [
          {
            itemStyle: {
              normal: {
                // color: function (params) {
                //     let colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                //     let color = colorList[params.dataIndex];
                //     return color
                // }
              }
            },
            center:['55%', '50%'],
            radius: '30%' ,
            type: "pie",
            barWidth: "10px",
            z: 10,
            // data: this.illegalTimeArr[0],
            data:dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter:"{b}(次): {c}(辆) "
            },
            labelLine: {
                length: 5,
                length2: 5
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(name));
      myChart.setOption(option);
    },
    //请求接口
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
        startTime: startTime,
        endTime: endTime,
        area: area
      };
      return params;
    },
    // 请求交通违法数量统计,如果有timer是OD规律的查询
    getTrafficNumber(url,timer) {
        let urls = "";
      if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            urls = url + "acdRegionRank"
        } else {
            urls = url + "illRegionRank"
        }
      sjhAxios
        .post(
          urls,
          this.getParams(timer)
        )
        .then(res => {
          let tablevalue = res.data.data;
          if(tablevalue.length > 0) {
              tablevalue.map(val => {
                    val.name = val.area;
                });
          };
          this.tablevalue = tablevalue;
        })
        .catch(error => {
        //   this.$showSimpleMessage(error, "error");
        });
    },
    // 24小时统计
    getTrafficDay(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = " 事故24小时数量分布（起） "
        } else {
            name = "违法24小时数量分布（起）"
        }
      sjhAxios
        .post(
          url + "duration",
          this.getParams(timer)
        )
        .then(res => {
          let userData = res.data.data;
          let date = [
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ];
          let twentyFour = [];
          date.map(val => {
            let item = userData.find(t => t.duration === val);
            if (item) {
              twentyFour.push(item.count);
            } else {
              twentyFour.push(0);
            }
          });
          this.twentyFour = twentyFour;
          this.Columns1(name);
        })
        .catch(error => {
        //   this.$showSimpleMessage(error, "error");
        });
    },
    // 事故类型分布统计
    accidentType(url,timer) {
        let urls = "";
        let name = "";
        let accidentType = "";
        let illegalList = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            urls = url + "acdType";
            name = "事故类型分布（起）";
            accidentType = this.$store.state.accidentType;
        } else {
            urls = url + "illType";
            name = "违法行为分布（起）";
            illegalList = this.$store.state.illegal;
        }
      sjhAxios
        .post(
          urls,
          this.getParams(timer)
        )
        .then(res => {
          let eventType = res.data.data;
          let accidentTypeNumber = [];
          let legend = [];
          let accidentTypeN =[];
        //   let accidentType = this.$store.state.accidentType;
          if(eventType.length > 0) {
              eventType.map(val => {
                let item = "";
                if(accidentType !== "") {
                   item = accidentType.find(t => t.id === +val.accidentType);
                } else {
                    item = illegalList.find(t => t.id === val.illegalBehavior);
                }
                accidentTypeNumber.push({
                name: item.name,
                value: val.count,
                textStyle: {
                    color: "#fff"
                }
                });
                accidentTypeN.push(item.name)
            });
          } else {
            //   this.$showSimpleMessage("事故类型分布统计暂无数据","success");
          }
          
          this.legend = accidentTypeNumber;
          this.accidentTypeN = accidentTypeN;
          this.accidentTypeNumber = accidentTypeNumber;
          this.Columns2(0, 20,name);
        })
        .catch(error => {
        //   this.$showSimpleMessage(error, "error");
        });
    },

    // 违法车辆号牌属地统计
    accidentCar(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车属地统计（辆）"
        } else {
            name = "违法机动车属地统计（辆）"
        }
      sjhAxios
        .post(
          url + "vehicleLocation",
          this.getParams(timer)
        )
        .then(res => {
            let accidentCarNumber = [];
            let req = res.data.data;
            let num = 0;
            if(req.length === 0) {
                this.Caketype1(0,0,name);
                return;
            }
            req.map(val => {
                if(num < val.count) {
                    num = val.count;
                }
                accidentCarNumber.push({
                name: val.area,
                value: val.count,
                textStyle: {
                    color: "#fff"
                }
                });
            });
        this.accidentCarNumber = num + 10;
        let allData = accidentCarNumber;
        let dataY = [];
        let allDataT = [];
        let nData = [];
        let length = allData.length;
        let start = 0;
        // let dd = setInterval(() => {
            // dataY = [];
            allDataT = this.$tools.deepCopy(allData);
            nData = allDataT;
            nData.map(val => {
                dataY.push(val.name);
            })
            this.Caketype1(nData,dataY, name);
            // start += 1;
            // if(length <= start + 6) {
            //     start = 0;
            // }
        // },2000);
        // this.dd = dd;
        })
        .catch(error => {
        //   this.$showSimpleMessage(error, "error");
        });
    },
    // 违法事故环比同比, qoq环比，yoy同比
    accidentCompare(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "各行政区事故数量及环比同比"
        } else {
            name = "各行政区违法数量及环比同比"
        }
      let endTime;
      let startTime;
      let nowDate = new Date();
      if (!timer) {
        endTime = "";
        startTime = "";
      } else {
        endTime = timer.endTime;
        startTime = timer.startTime;
      }
      let params = {
        startTime: startTime,
        endTime: endTime,
        area: ""
      };
      let urls = "";
      if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            urls = url + "acdRegionRank"
        } else {
            urls = url + "illRegionRank"
        }
      sjhAxios
        .post(urls, params)
        .then(res => {
          let tablevalue = res.data.data;
          let accidentCompareNumber = [];
          let area = [];
          let qoq = [];
          let yoy = [];
          let count = [];
          let length = tablevalue.length;
          let num = 0;
          for (let i = 1; i <= length; i++) {
            let result = tablevalue.find(t => t.rank === i);
            area.push(result.area);
            qoq.push(result.qoq ? result.qoq:0);
            yoy.push(result.yoy);
            count.push(result.count);
            if(num < result.count) {
                num = result.count
            }
          }
          accidentCompareNumber.push(area);
          accidentCompareNumber.push(qoq);
          accidentCompareNumber.push(yoy);
          accidentCompareNumber.push(count);
          accidentCompareNumber.push([num,num,num,num,num,num,num,num]);
          this.accidentCompareNumber = accidentCompareNumber;
        //   console.log(accidentCompareNumber);
          this.Caketype2(name);
        })
        .catch(error => {
        //   this.$showSimpleMessage("error", "error");
        });
    },
    // 事故天气类型分布
    accidentWeather(url,timer) {
      sjhAxios
        .post(
          url + "weather",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let weather = [];
          let allWeather = this.$store.state.weather;
          if(req.length > 0) {
            req.map(val => {
                let item = {};
                let chose = allWeather.find(t => t.id === val.weatherType);
                if(!chose) {
                    chose = {
                        name:"雪"
                    }
                }
                item = {
                name: chose.name,
                value: val.count,
                textStyle: {
                    color: "#fff"
                }
                };
                weather.push(item);
            });
          } else {
            //   this.$showSimpleMessage("事故天气类型分布暂无数据","success")
          }
          
          this.weather = weather;
          this.lineColumns1();
        });
    },
    // 违法人员户口属地统计
    accidentPerson(url,timer) {
        let name = "";
        
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事人员属地统计（人）"
        } else {
            name = "违法人员属地统计（人）"
        }
        this.peopleTitle = name;
      sjhAxios
        .post(
          url + "driverLocation",
          this.getParams(timer)
        )
        .then(res => {
         let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let num = 0;
          if(req.length === 0) {
              this.driverLocations = [{name:"本地",value:0},{name:"外地",value:0}];
              return;
          }
          req.map(val => {
            num = num + val.count;
            count.push(val);
          });
         count.map(val => {
              // driverLocation.push({name:val.area,percent:+(val.count*100/num).toFixed(2)|| 0,count:val.count})
              driverLocation.push({name:val.area,value:val.count})
          })

          this.driverLocations = driverLocation;
          this.accidentPersonEarch();
        });
    },
    accidentPersonEarch(){
      
      let option = {
        title: {
          x: "left",
          text: "违法人员户口属地统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} (人)",
            confine: true
        },
        grid: {
          left: "3%",
          top: "80px",
          width: "80%",
          height:"100%",
          containLabel: true
        },
        legend: {
          show: true,
          type: "scroll",
          orient: "vertical",
          right: "1%",
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
          itemWidth: 15,
          itemHeight: 10,
          top: "2%",
          data: this.driverLocations
        },
        color:["#206fc0","#23b6d1","#20c09c","#20a8c0","#204dc0","#2420c0","#6bc020","#c0a020","#c06b20"],
        series: [
          {
            name: "违法人员户口属地统计",
            type: "pie",
            center: ["50%", "55%"], //圆心位置
            radius: '30%',
            label: {
              //内饰标签
              show: true,
              position: "outside",
              formatter: "{b}: {c} (人)",
            },
            data: this.driverLocations
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("zpEarch"));
      myChart.setOption(option);
    },
    // 违法驾驶员性别
    accidentDriverSex(url,timer) {
         let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员性别统计（人）"
        } else {
            name = "违法驾驶员性别统计（人）"
        }
      sjhAxios
        .post(
          url + "sex",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let sex = [];
          req.map(val => {
            let sexs = val.sex === "1" ? "男" : "女";
            driverLocation.push({
                name:sexs,
                value: val.count
            })
          });
          this.driverLocation = driverLocation;
          this.driverSex(name);
        });
    },
    // 违法驾驶员年龄统计
    illegalDriverAge(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员年龄统计（人）"
        } else {
            name = "违法驾驶员年龄统计（人）"
        }
      sjhAxios
        .post(
          url + "age",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let ageGroup = [];
          if(req.length > 0) {
              req.map(val => {
                count.push(val.count);
                ageGroup.push(val.ageGroup);
            });
          } else {
            //   this.$showSimpleMessage("涉事驾驶员年龄统计暂无数据","success");
          };          
          driverLocation.push(count);
          driverLocation.push(ageGroup);
          this.driverAgeArr = driverLocation;
          this.driverAge(name,"age",count,ageGroup);
        });
    },
    // 违法驾驶员违章次数统计
    illegalTime(url,timer) {
         let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员违章次数统计（人）"
        } else {
            name = "违法驾驶员违章次数统计（人）"
        }
      sjhAxios
        .post(
          url + "driverVioNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let violation = [];
          if(req.length > 0) {
              req.map(val => {
                count.push({
                    name: val.violation,
                    value: val.count
                });
                violation.push(val.violation);
            });
          } else {
            //   this.$showSimpleMessage("涉事驾驶员违章次数统计暂无数据","success");
          };
          
          driverLocation.push(count);
          driverLocation.push(violation);
          this.illegalTimeArr = driverLocation;
          this.driver1("num",name,count,violation,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
        });
    },
    //违法驾驶员驾龄统计
    illDriverDriveAge(url,timer) {
         let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员驾龄统计（人）"
        } else {
            name = "违法驾驶员驾龄统计（人）"
        }
      sjhAxios
        .post(
          url + "driveage",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let driveAgeGroup = [];
          let driveAgeArr = [{
              name: "1年以下"
          },{
              name: "2年"
          },{
              name: "3年"
          },{
              name: "4年"
          },{
              name: "5年"
          },{
              name: "6-10年"
          },{
              name: "11-15年"
          },{
              name: "15-20年"
          }];
          let num = 0;
          if(req.length > 0) {
              req.map(val => {
                if(num < val.count) {
                    num = val.count;
                }
            });
            driveAgeArr.map(val => {
                    let dd = req.find(t => t.driveAgeGroup === val.name);
                    if(dd) {
                        count.push(dd.count);
                        driveAgeGroup.push({
                            name:dd.driveAgeGroup+":"+dd.count+"人",
                            max: num,
                            color: "#5abdfc"
                        });
                    };
              });
            // req.map(val => {
            //     count.push(val.count);
            //     driveAgeGroup.push({
            //         name:val.driveAgeGroup,
            //         max: num,
            //         color: "#5abdfc"
            //     });
            // });
          } else {
            //   this.$showSimpleMessage("涉事驾驶员驾龄统计暂无数据","success");
          };
          
          driverLocation.push(count);
          driverLocation.push(driveAgeGroup);
          this.driverDirveAgeArr = driverLocation;
          this.driverDirveAge(name,"driveAge", [
                    {
                        value : count,
                        name : name,
                        lineStyle: {
                            normal: {
                                color: "rgb(150,148,21)"
                            }
                        }
                    }
                ],driveAgeGroup);
        });
    },
    // 普通柱状图
    barCanvas(name, dataY, dataS, divId, colorS, colorE) {
      let option = {
        title: {
          x: "left",
          text: name, // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtextStyle: {
            color: "#5abdfc"
          },
          itemGap: 0 //主副标题距离
        },
        tooltip: {},
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          }
        }, // 图例组件
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          splitLine: {
            show: true
          }, // 分割线
          axisLine: {
            show: true,
            lineStyle: {
              color: "#929292"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#147a86"
            }
          }, // y轴样式
          type: "category",
          data: dataY
        },

        series: [
          {
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: colorS || "#26C5FE"
                  },
                  {
                    offset: 1,
                    color: colorE || "#508DFF"
                  }
                ])
                // color: function (params) {
                //     let colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                //     let color = colorList[params.dataIndex];
                //     return color
                // }
              }
            },
            type: "bar",
            barWidth: "10px",
            z: 10,
            data: dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff"
            },
            barMaxWidth: 45
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById(divId));
      myChart.setOption(option);
    },
    // 事故驾驶员累计计分统计
    driverHistory(url,timer) {
         let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员累计扣分统计（人）"
        } else {
            name = "违法驾驶员累计扣分统计（人）"
        }
      sjhAxios
        .post(
         url + "score",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataS = [];
          let dataY = [];
          let dataStart = [{
              name: "0分"
          },{
              name: "1-3分"
          },{
              name: "4-6分"
          },{
              name: "7-11分"
          },{
              name: "12分及以上"
          }]
          let num = 0;
          if(req.length > 0) {
                req.map(val => {
                    if(num < val.count) {
                        num = val.count;
                    }
                })
                dataStart.map(val => {
                    let dd = req.find(t => t.scoreNum === val.name);
                    if(dd) {
                        dataS.push(dd.count);
                        dataY.push({
                            name:dd.scoreNum+":"+dd.count+"人",
                            max: num,
                            color: "#5abdfc"
                        });
                    };                    
                });
                // req.map(val => {
                //     dataS.push(val.count);
                //     dataY.push({
                //         name:val.scoreNum,
                //         max: num,
                //         color: "#5abdfc"
                //     });
                // });
          } else {
            //   this.$showSimpleMessage("事故驾驶员累计计分统计暂无数据","success");
          };
          
          this.driverDirveAge(name,"score", [
                    {
                        value : dataS,
                        name : name,
                        lineStyle: {
                            normal: {
                                color: "rgb(150,148,21)"
                            }
                        }
                    }
                ],dataY);
        });
    },
    // 事故驾驶员历史事故次数统计
    driverCount(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事驾驶员历史事故统计（起）"
        } else {
            name = "违法驾驶员历史违法统计（起）"
        }
      sjhAxios
        .post(
         url + "driverAcdNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataS = [];
          let dataY = [];
          if(req.length > 0) {
                req.map(val => {
                    dataS.push({
                        name: val.accident,
                        value: val.count
                    });
                    dataY.push(val.accident);
                });
          } else {
            //   this.$showSimpleMessage("事故驾驶员历史事故次数统计暂无数据","success");
          };
          
          this.driverTime("historyNum",name,dataS,dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
        });
    },
    // 违法机动车类型统计
    driverCarType(url,timer) {
      let carTypeList = this.$store.state.carType;
       let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车类型统计（辆）"
        } else {
            name = "违法机动车类型统计（辆）"
        }
      sjhAxios
        .post(
          url + "carType",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
                req.map(val => {
                    dataS.push(val.count);
                    let carType = carTypeList.find(t => t.id === val.carType);
                    if(carType) {
                        dataY.push(carType.name)
                    } else {
                        dataY.push( "数据返回有问题");
                    }
                    
                });
          } else {
            //   this.$showSimpleMessage("涉事机动车类型统计暂无数据","success");
          };
          
          let dataO,dataT;
          let start = 0;
          let length = dataS.length;
            this.driverAge(name,"carType",dataS,dataY,"辆");
        });
    },
    // 驾驶机动车颜色统计
    carColor(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "驾驶机动车颜色统计（辆）"
        } else {
            name = "违法机动车颜色统计（辆）"
        }
      sjhAxios
        .post(
          url + "vehicleColour",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          let color = this.$store.state.vehicleColorT;
          if(req.length > 0) {
            req.map(val => {
                dataS.push(val.count);
                let item = color.find(t => t.id === val.vehicleColour)
                dataY.push(item.name);
            });
          } else {
            //   this.$showSimpleMessage("驾驶机动车颜色统计暂无数据","success");
          };
          
           let dataO,dataT;
          let start = 0;
            this.driverAge(name,"carColor",dataS,dataY,"辆");
        });
        //    this.driverAge("违法机动车类型统计","carColor",dataS,dataY);
    },
    // 违法机动车使用性质统计
    carUser(url,timer) {
      let allUseNature = this.$store.state.useNature;
      let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车使用性质统计（辆）"
        } else {
            name = "违法机动车使用性质统计（辆）"
        }
      sjhAxios
        .post(
          url + "useNature",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
            req.map(val => {
                dataS.push(val.count);
                let useNature = allUseNature.find(t => t.id === val.useNature);
                dataY.push(useNature.name);
            });
          } else {
            //   this.$showSimpleMessage("涉事机动车使用性质统计暂无数据","success");
          };
            this.driverAge(name,"carNature",dataS,dataY,"辆");
        //   this.barCanvas("违法机动车使用性质统计", dataY, dataS, "carNature");
        //   this.driverAge("涉事机动车使用性质统计","carNature",dataS,dataY);
        });
    },
    // 违法机动车用途性质统计
    carProperties(url,timer) {
      let allVehicleUse = this.$store.state.vehicleUse;
      let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车用途性质统计（辆）"
        } else {
            name = "违法机动车用途性质统计（辆）"
        }
      sjhAxios
        .post(
          url + "vehicleUse",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
            req.map(val => {
                dataS.push(val.count);
                let vehicleUse = allVehicleUse.find(t => t.id === val.vehicleUse);
                if(!vehicleUse) {
                    console.log(val.vehicleUse)
                    dataY.push("数据返回有问题");
                } else {
                    dataY.push(vehicleUse.name);
                }
            });
          } else {
            //   this.$showSimpleMessage("涉事机动车用途性质统计暂无数据","success");
          };

          this.driverAge(name,"carUse",dataS,dataY,"辆");
        //   this.barCanvas(
        //     "违法机动车用途性质统计",
        //     dataY,
        //     dataS,
        //     "carUse"
        //   );
        });
    },
    // 违法机动车违法次数统计
    illNum(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车违法次数统计（辆）"
        } else {
            name = "违法机动车违法次数统计（辆）"
        }
      sjhAxios
        .post(
          url + "carVioNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
            req.map(val => {
                dataS.push({
                    name: val.violation,
                    value: val.count
                });
                dataY.push(val.violation);
            });
          } else {
            //   this.$showSimpleMessage("涉事机动车违法次数统计暂无数据","success");
          };
          
        //   this.barCanvas(
        //     "违法机动车违法次数统计",
        //     dataY,
        //     dataS,
        //     "illNum",
        //     "#8463f8",
        //     "#eb6fe9"
        //   );
          this.carDriverTime("illNum", name, dataS, dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
        });
    },
    // 违法机动车事故次数统计
    illAccidentNum(url,timer) {
        let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车事故次数统计（辆）"
        } else {
            name = "违法机动车事故次数统计（辆）"
        }
      sjhAxios
        .post(
          url + "carAcdNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
            req.map(val => {
                dataS.push({
                    name: val.accident,
                    value: val.count
                });
                dataY.push(val.accident);
            });
          } else {
            //   this.$showSimpleMessage("涉事机动车事故次数统计暂无数据","success");
          };
          
          this.carDriverTime("accidentNum", name, dataS, dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
        });
    },
    // 涉事机动车所有权统计结果
    carBlone(url,timer) {
      
      let ownershipList = this.$store.state.Ownership;
       let name = "";
        if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
            name = "涉事机动车所有权统计（辆）"
        } else {
            name = "涉事机动车所有权统计（辆）"
        }
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/ownership",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
            req.map(val => {
                dataS.push(val.count);
                let ownership = ownershipList.find(t => t.id === +val.ownership);
                dataY.push({
                    name: ownership.name,
                    value: val.count
                });
            });
          } else {
            //   this.$showSimpleMessage("机动车所有权统计暂无数据","success");
          };
          
            let myChart = this.$echarts.init(document.getElementById("belong"));
          let option = {
                title: {
                x: "left",
                text: name, // 主标题
                textStyle: {
                    fontSize: 14,
                    fontWeight: "normal",
                    color: "#3ba7c9",
                    fontFamily: "PingFangSC-Regular"
                },
                left: "10",
                top: "10",
                subtextStyle: {
                    color: "#5abdfc"
                },
                itemGap: 0 //主副标题距离
                },
                color:["#0068f8", "#00f8bb"],
                tooltip: {
                     trigger: 'item',
                    formatter: "{b}: {c} (辆)"
                },
                legend: {
                show: true,
                type: "scroll",
                orient: "vertical",
                right: "1%",
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
                itemWidth: 15,
                itemHeight: 10,
                top: "5%",
                }, // 图例组件
                series: [
                {
                    // name: "涉事人员属地统计（人）",
                    type: "pie",
                    radius: ['20%', '40%'],
                    data:dataY,
                    label: {
                        show: true,
                        position: "right",
                        color: "#fff",
                        formatter: "{b}: {c} (辆)"
                    },
                    labelLine: {
                        length: 5,
                        length2: 5
                    }
                }
                ]
            };
            myChart.setOption(option);
        });
         
    },
    // 向上滚动
    scrollTop(range){
        let num = 0;
        let index = 0;
    },
     stopScroll(){

        this.ifstop = false;
    },
    continueScroll() {
        this.ifstop = true;
    }
  },
  async mounted() {
    let mapLoading = Loading.service({
        lock: true,
        text: "正在整理所有视图，给您规划排版，请耐心等待...",
        spinner: "el-icon-loading",
        // background: "rgba(10, 40, 100, 0)"
    });
    let timer = this.$route.query.timer;
    let url = this.$route.query.url;
      let params = "";
      if (timer) {
          params = this.getParams(timer);
      }
     await this.getTrafficDay(url,timer);
     await this.accidentType(url,timer);
     await this.accidentCar(url,timer);
     await this.accidentCompare(url,timer);
     if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
         await this.accidentWeather(url,timer);
     } else {
         this.weatherON = false;
     }
     await this.accidentPerson(url,timer);
     await this.accidentDriverSex(url,timer);
    await  this.illegalDriverAge(url,timer);
    await  this.illegalTime(url,timer);
    await  this.illDriverDriveAge(url,timer);
    await  this.driverHistory(url,timer);
    await  this.driverCount(url,timer);
    await  this.driverCarType(url,timer);
    await  this.carColor(url,timer);
    await  this.carUser(url,timer);
    await  this.carProperties(url,timer);
    await  this.illNum(url,timer);
    await  this.illAccidentNum(url,timer);
    await  this.carBlone(url,timer);
    await this.getTrafficNumber(url,timer);
    let _this = this;
    let imgName = "";
    if(url === "sjh2/strategysupport/safty/acdAnalysis/") {
        imgName = "交通事故分析";
        this.tableTitle = "企业事故排行榜";
        this.biaoname = "事故数量";
        // this.biaonamel = "事故数量";
        this.tableData = this.tableDataAcd;
    } else {
        imgName = "交通违法分析";
        this.tableTitle = "企业违法排行榜";
        this.biaoname = "违法数量";
        // this.biaonamel = "违法数量";
        this.tableData = this.tableDataOff;
    };
    setTimeout(()=>{
         let time = this.$tools.nowTime();
        let gis = document.getElementsByClassName("bodyAll")[0];
        let ww = gis.clientWidth;
        let hh = gis.clientHeight;
        // domtoimage.toBlob(gis,{style:"::-webkit-scrollbar"}).then(function (blob) {
        //     mapLoading.close();
        //     _this.$store.state.isExportParams = params;
        //     _this.$store.state.isExport = true;
        //     _this.$router.go(-1);
        //     saveAs(blob, imgName + time + ".png");
        // });
        html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
          _this.$store.state.isExportParams = params;
          _this.$store.state.isExport = true;
          _this.$router.go(-1);
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas.msToBlob(), "交通违法分析" +time + ".png");
          } else {
            canvas.toBlob(function(blob) {saveAs(blob, "交通违法分析" + time + ".png");});
          }
          mapLoading.close();
        });
    },3000);
  },
  created() {
      this.firstData = this.$tools.deepCopy(this.tableData).splice(0,3);
  },
  beforeDestroy() {
  }
};
</script>

<style scoped>
    .mapHover /deep/ .el-carousel__container{
        height: 100% !important; 
    }
</style>
<style>
    .mapHover .el-carousel__container {
        height: 100% !important; 
    }
</style>