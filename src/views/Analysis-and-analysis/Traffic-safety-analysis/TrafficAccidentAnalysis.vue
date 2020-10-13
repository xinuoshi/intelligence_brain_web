<style>
  .earchTraffic{
      padding: 0 15px 15px 15px;
      box-sizing: border-box;
      margin-top: 15px;
  }
  .earchTrafficBody{
      background-color: #081f3f;
  }
  .earchTrafficBody>div{
    /* border:1px solid */
  }
  .earchTrafficBody>div+div{  
      margin-left: 16px;
  }
  .leftEarchTraffic>div{
      flex: 1;
  }
  .tableOffic{
    width: 100%;
    position: relative;
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
  .cwl /deep/ svg > path:first-child{
      stroke: #0b4f66 !important;
    }
   svg>path{
        stroke-linecap: butt;
    }
/* .earchTraffic .el-table__body-wrapper{
  overflow: hidden !important;
} */

</style>

<template>
    <!-- 交通事故分析 -->
    <div class="earchTraffic flexColumn flexNum">
      <div class="flexRow flexRow">
          <SearchPage class="search flexNum" ref="searchPage" :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
          <div class="operation">
              <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
              <!-- <bt ref="dn" :buttonList="UnitTopButton"  @operation="download"></bt> -->
          </div>
      </div>
      <div class="earchTrafficBody flexNum flexRow">
        <div class="flexNum leftEarchTraffic flexColumn">
            <!-- 企业违法排行榜 表格 -->
            <div class="tableOffic flexNum zpEarch"  @mouseenter="stopScroll" @mouseleave="continueScroll">
                <div class="tableOffictitle">企业事故排行榜</div>
                <el-table :data="tableData" id="table"  height="85%">
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
                    <el-table-column prop="num" label="事故数量(个)"></el-table-column>
                </el-table>
                <el-table :data="firstData" id="table" style="background-color: rgb(8, 31, 63);">
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
                    <el-table-column prop="num" label="事故数量(个)"></el-table-column>
                </el-table>
            </div>   
            <!-- 违法天气类型统计 饼图-->
            <div id="lineColumns1" class="zpEarch flexNum"></div>
            <!-- 违法车辆号牌属地统计 柱状图-->
            <div id="lineColumns2" class="zpEarch flexNum" @mouseenter="stopLine" @mouseleave="keepLine"></div>
        </div>
        <div style="flex:3" class="zpEarch flexColumn">  
          <!--24小时时段分布 折线图 -->
          <div id="Columns1" class="flexNum"></div>
          <!-- 违法数量同比环比 柱状图-->
          <div id="popyoy" class="flexNum"></div>
          <!-- 违法行为分布统计 折线图-->
          <div id="Columns2" class="flexNum"></div>
        </div>
        <div class="flexNum flexColumn">  
          <!-- 走马灯 六个 -->
          <el-carousel class="mapHover zpEarch flexNum" :interval="4000" indicator-position="none">
              <el-carousel-item id="sex"></el-carousel-item>
              <el-carousel-item id="age"></el-carousel-item>
              <el-carousel-item id="driveAge"></el-carousel-item>
              <el-carousel-item id="num"></el-carousel-item>
              <el-carousel-item id="score"></el-carousel-item>
              <el-carousel-item id="historyNum"></el-carousel-item>
          </el-carousel>
          <!-- 环饼图 涉事人员户口统计-->
          <div class="zpEarch flexNum"  id="zpEarch">
                <div class="title">涉事人员属地统计（人）</div>
                <div class="cwl" style="display: flex; justify-content: space-around;margin-top: 30px;">
                    <!-- <el-progress type="circle" :percentage="driverLocations[0].percent" :width="100" :stroke-width="16" color="#01ffff" background-color="#064f66"></el-progress>
                    <el-progress type="circle" :percentage="driverLocations[1].percent" :width="100" :stroke-width="16" color="#01ffff"></el-progress> -->
					<el-progress type="circle" :percentage="30" :width="100" :stroke-width="16" color="#01ffff" background-color="#064f66"></el-progress>
					<el-progress type="circle" :percentage="10" :width="100" :stroke-width="16" color="#01ffff"></el-progress>
                </div>
               <div style="display: flex; justify-content: space-around;margin-top: 10px;">
                    <span>{{driverLocations[0].name}}  {{driverLocations[0].count}}</span>
                   <span>{{driverLocations[1].name}}  {{driverLocations[1].count}}</span>
               </div>
            </div> 

          <!-- 走马灯  七个-->
          <div class="zpEarch flexNum" @mouseenter="stopCarNature" @mouseleave="keepCarNature">
              <el-carousel  class="mapHover" :interval="3000" indicator-position="none" style="height:100%">
                <el-carousel-item id="carType"></el-carousel-item>
                <el-carousel-item id="carColor"></el-carousel-item>
                <el-carousel-item id="carNature"></el-carousel-item>
                <el-carousel-item id="carUse"></el-carousel-item>
                <el-carousel-item id="illNum"></el-carousel-item>
                <el-carousel-item id="accidentNum"></el-carousel-item>
                <el-carousel-item id="belong"></el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import saveAs from "save-as";
import TrafficAccidentAnalysis from "../../../JSON/TrafficAccidentAnalysis.json";
import domtoimage from "dom-to-image";
export default {
  name: "SubjectPortrait",
  data() {
    return {
      tablevalue: [],
      // 搜索传参
      searchName: [
        {
          searchPlaceholder: "查询区域",
          id: "",
          type: 9,
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
      tableData: [
        {
          index: "1",
          name: "顺通长途客运有限公司",
          address: "梁徐街道",
          num: 5
        },
        {
          index: "2",
          name: "吉通客运有限公司",
          address: "罗塘街道",
          num: 3
        },
        {
          index: "3",
          name: "正通汽车租赁有限公司",
          address: "三水街道",
          num: 3
        },
        {
          index: "4",
          name: "海华运输有限公司",
          address: "天目山街道",
          num: 3
        },
        {
          index: "5",
          name: "华洋阀门有限公司",
          address: "蒋垛镇",
          num: 2
        },
        {
          index: "6",
          name: "大光出租汽车有限公司",
          address: "娄庄镇",
          num: 2
        },
        {
          index: "7",
          name: "海琪运输有限公司",
          address: "白米镇",
          num: 2
        },
        {
          index: "8",
          name: "丰收客运有限公司",
          address: "俞垛镇",
          num: 2
        },
        {
          index: "9",
          name: "神州客运有限公司",
          address: "大土仑镇",
          num: 2
        },
        {
          index: "10",
          name: "利通运业有限公司",
          address: "顾高镇",
          num: 2
        },
        {
          index: "11",
          name: "新生汽车租赁服务部",
          address: "张甸镇",
          num: 2
        },
        {
          index: "12",
          name: "龙华运输有限公司",
          address: "沈高镇",
          num: 2
        },
        {
          index: "13",
          name: "通达危险品运输有限公司",
          address: "溱潼镇",
          num: 2
        },
        {
          index: "14",
          name: "太阳科贸有限公司",
          address: "淤溪镇",
          num: 2
        },
        {
          index: "15",
          name: "海纳物资供应有限责任公司",
          address: "淤溪镇",
          num: 2
        },
        {
          index: "16",
          name: "博通汽车出租有限公司",
          address: "淤溪镇",
          num: 2
        },
        {
          index: "17",
          name: "精忠国际旅行社有限公司",
          address: "淤溪镇",
          num: 2
        },
        {
          index: "18",
          name: "聚力联运服务站",
          address: "淤溪镇",
          num: 1
        },
        {
          index: "19",
          name: "扬帆国际旅行社有限公司",
          address: "顾高镇",
          num: 1
        },
        {
          index: "20",
          name: "汇林汽车租赁有限公司",
          address: "顾高镇",
          num: 1
        }
      ],
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
      accidentCarScrol : true,
      carNatureScroll: true
    };
  },
  methods: {
      // 用户把数据湖的时间格式转成常用的事件格式（如2018-10-23 15:58:00）,方便转成时间戳用
      dataLaketimeConversion(timer) {
          let at = timer.split("");
          let timerst = at[0] + at[1] + at[2] + at[3] + "-" + at[4] + at[5] + "-" + at[6] + at[7];
          return timerst;
      },
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
                    timer: this.timer,
                    url: "sjh2/strategysupport/safty/acdAnalysis/"
                }
            });
    },
    // 24小时事故数量统计
    Columns1(data) {
        console.log(this.twentyFour);
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        title: {
          x: "left",
          text: " 事故24小时数量分布（起）",
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
            formatter: "{a} <br/>{b}点{c} (起)"
        },
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
              data:data,
            itemStyle: {
              normal: {
                color: "#3ba7c9"
              }
            }, // 渐变
            name: "事故数量",
            type: "line",
            symbolSize: function(val) {
              return val[2] * 2;
            },
            seriesLayoutBy: "row",
            areaStyle: {
                    color:{
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: '#0cede3' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#1483bb' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    // 事故类型分布（起）
    Columns2(start, end) {
        let myChart = this.$echarts.init(document.getElementById("Columns2"));
        let option = {
            title: {
                x: "left",
                text: "事故类型分布（起）",
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
                formatter: "{a} <br/>{b}: {c} (起)"
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
                            return name;
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
                    color:{
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: 'rgb(136,100,248,0.8)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgb(136,100,248,0)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                },
                data: this.accidentTypeNumber
            }
            ]
      };

      myChart.setOption(option);
    },
    // 涉事机动车属地统计（辆）
    Caketype1(data,dataY) {
      let myChart = this.$echarts.init(document.getElementById("lineColumns2"));
      let option = {
        title: {
          x: "left",
          text: "涉事机动车属地统计（辆）", // 主标题
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
            height: '75%',
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
            data: [this.accidentCarNumber]
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
    Caketype2() {
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
          text: "各行政区事故数量及环比同比",
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
          right: 10,
          top: 10,
          textStyle: {
            color: "rgb(44, 248, 255)",
            fontSize: 14
          },
          selectedMode: true,
          data: ["环比", "同比", "事故数量"]
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
            color: "#017482"
          },
          data: this.accidentCompareNumber[0]
        // data: ["津南", "塘沽", "大港", "宁河", "静海", "西青", "和平", "小店"]
        },
        yAxis: [
          {
            name: "事故数量",
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
            name: "事故数量",
            type: "bar",
            barWidth: 26,
            data: this.accidentCompareNumber[3],
            // data: [45, 45, 55, 56, 33, 20, 45, 52]
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                },
                trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} (起)"
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
    lineColumns1(name,text,data,unit,seriesName) {
      let myChart = this.$echarts.init(document.getElementById(name));
      let option = {
        title: {
          x: "left",
          text: text, // 主标题
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
            formatter: `{a} <br/>{b}: {c} (${unit})`,
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
          data: data
        },
        color:["#206fc0","#23b6d1","#20c09c","#20a8c0","#204dc0","#2420c0","#6bc020","#c0a020","#c06b20"],
        series: [
          {
            name: seriesName,
            type: "pie",
            center: ["45%", "55%"], //圆心位置
            radius: '60%',
            label: {
              //内饰标签
              show: true,
              position: "outside"
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
    },
    
    // 违法人员属地统计
    accidentPersonEarch(){
        let option = {
        title: {
          x: "left",
          text: "违法人员属地统计（人）", // 主标题
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
            name: "违法人员属地统计",
            type: "pie",
            center: ["45%", "55%"], //圆心位置
            radius: '60%',
            label: {
              //内饰标签
              show: true,
              position: "outside"
            },
            data: this.driverLocations
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("zpEarch"));
      myChart.setOption(option);
    },
    // 违法驾驶员性别统计
    driverSex() {
      let option = {
        title: {
          x: "left",
          text: "涉事驾驶员性别统计（人）", // 主标题
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
            radius: ['30%', '50%'],
            center:["50%", "55%"],
            data: this.driverLocation,
            // data:[
            //     {value:325, name:'男'},
            //     {value:210, name:'女'},
            // ],
            label: {
              show: true,
              position: "right",
              color: "#fff"
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
    // 所有的侧边的柱形图
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
            bottom: 10
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
                    color: "#3ba7c9"
                },
                 show:true,
                text: title
            },
            tooltip: {
                position:[0,0]
            },
            grid: {
                containLabel: true,
                bottom: 10
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
                center:['50%', '55%'],
                radius: '48%' ,
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
    // 违法驾驶员违章次数统计 // 扇形图
    driverTime(name, title, dataS, dataY, color, dep) {
      if (dataS.length === 0 || dataY.length === 0) {
        // dataS=[0];
        // dataY = [""]
      }
        if(!dep) {
            dep = "辆"
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
            formatter:"{b}(次): {c}("+dep+") "
        },
        legend: {
          show: true,
          itemStyle: {
            color: "#fff"
          },
        bottom: 10,
        textStyle:{
            color: "#3ba7c9"
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
            center:['50%', '50%'],
            radius: '45%' ,
            type: "pie",
            barWidth: "10px",
            z: 10,
            // data: this.illegalTimeArr[0],
            data:dataS,
            label: {
              show: true,
              position: "right",
              color: "#fff"
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
    getTrafficNumber(timer) {
          let tablevalue = TrafficAccidentAnalysis.illRegionRank.data;
          if(tablevalue.length > 0) {
              tablevalue.map(val => {
                    val.name = val.area;
                });
          };
          this.tablevalue = tablevalue;
    },
    // 24小时统计
    getTrafficDay(timer) {
        let _this = this
          let userData = TrafficAccidentAnalysis.duration.data;
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
          this.$nextTick(()=>{
              _this.Columns1(twentyFour);
          })
    },

    // 事故类型分布统计
    accidentType(timer) {
          let eventType = TrafficAccidentAnalysis.acdType.data;
          let accidentTypeNumber = [];
          let legend = [];
          let accidentTypeN =[];
          let accidentType = this.$store.state.accidentType;
          if(eventType.length > 0) {
              eventType.map(val => {
                let item = accidentType.find(t => t.id === +val.accidentType);
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
              this.$showSimpleMessage("事故类型分布暂无数据","error");
          }
          
          this.legend = accidentTypeNumber;
          this.accidentTypeN = accidentTypeN;
          this.accidentTypeNumber = accidentTypeNumber;
          this.$nextTick(()=>{
              this.Columns2(0, 100);
          })
        //   let start = 0;
        //   let end = 30;
        //   let ww = setInterval(()=>{
        //       this.Columns2(start, end);
        //       start += 3;
        //       end = end +3;
        //       if(end >= 100) {
        //           start = 0;
        //           end = 30;
        //       }
        //   },1500);
        //   this.ww = ww;
        // })
        // .catch(error => {
        //   this.$showSimpleMessage("暂无数据", "error");
        // });
    },
    // 涉事机动车属地统计
    accidentCar(timer) {
            let accidentCarNumber = [];
            let req = TrafficAccidentAnalysis.vehicleLocation.data;
            let num = 0;
            if(req.length === 0) {
                this.dd ="";
                this.Caketype1(0,0);
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
        let dd = setInterval(() => {
            if(this.accidentCarScrol) {
                dataY = [];
                allDataT = this.$tools.deepCopy(allData);
                nData = allDataT.splice(start,5);
                nData.map(val => {
                    dataY.push(val.name);
                })
                this.Caketype1(nData,dataY);
                start += 1;
                if(length <= start + 6) {
                    start = 0;
                }
            };
        },5000);
        this.dd = dd;
    },
     stopLine() {
        this.accidentCarScrol = false;
    },
    keepLine() {
        this.accidentCarScrol = true;
    },
    // 违法事故环比同比, qoq环比，yoy同比
    accidentCompare(timer) {
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
          let tablevalue = TrafficAccidentAnalysis.acdRegionRank.data;
          let accidentCompareNumber = [];
          let area = [];
          let qoq = [];
          let yoy = [];
          let count = [];
          let length = tablevalue.length;
          let num = 0;
          for (let i = 1; i <= length; i++) {
            let result = tablevalue.find(t => t.rank === i);
			console.log("edited by brandy 此处之前没有对 result进行判断，造成界面渲染失败",result);
			if (result) {
				area.push(result.area);
				qoq.push(result.qoq);
				yoy.push(result.yoy);
				count.push(result.count);
				if(num < result.count) {
				    num = result.count
				}
			}
          }
          accidentCompareNumber.push(area);
          accidentCompareNumber.push(qoq);
          accidentCompareNumber.push(yoy);
          accidentCompareNumber.push(count);
          accidentCompareNumber.push([num,num,num,num,num,num,num,num]);
          this.accidentCompareNumber = accidentCompareNumber;
        //   console.log(accidentCompareNumber);
          this.$nextTick(()=>{
              this.Caketype2();
          })
    },
    // 事故天气类型分布
    accidentWeather(timer) {
          let req = TrafficAccidentAnalysis.weather.data;
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
              this.$showSimpleMessage("事故天气类型分布暂无数据","error")
          }
          
          this.weather = weather;
          this.$nextTick(()=>{
              this.lineColumns1("lineColumns1","事故天气类型分布（天）",this.weather,"天","事故天气类型分布统计");
          })
    },
    // 违法人员户口属地统计
    accidentPerson(timer) {
        
         let req = TrafficAccidentAnalysis.driverLocation.data;
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
          this.$nextTick(()=>{
          this.accidentPersonEarch();
          })
    },
    
    // 违法驾驶员性别
    accidentDriverSex(timer) {
          let req = TrafficAccidentAnalysis.sex.data;
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
          this.$nextTick(()=>{
            this.driverSex();
          })
        //   this.lineColumns1("sex","涉事驾驶员性别统计（人）",driverLocation,"人","涉事驾驶员性别统计");

    },
    // 违法驾驶员年龄统计
    illegalDriverAge(timer) {
          let req = TrafficAccidentAnalysis.age.data;
          let driverLocation = [];
          let count = [];
          let ageGroup = [];
          if(req.length > 0) {
              req.map(val => {
                count.push(val.count);
                ageGroup.push(val.ageGroup);
            });
          } else {
              this.$showSimpleMessage("涉事驾驶员年龄统计暂无数据","error");
          };          
          driverLocation.push(count);
          driverLocation.push(ageGroup);
          this.driverAgeArr = driverLocation;
          this.$nextTick(()=>{
          this.driverAge("涉事驾驶员年龄统计（人）","age",count,ageGroup);
          })
    },
    // 违法驾驶员违章次数统计
    illegalTime(timer) {
          let req = TrafficAccidentAnalysis.driverVioNum.data;
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
              this.$showSimpleMessage("涉事驾驶员违章次数统计暂无数据","error");
          };
          
          driverLocation.push(count);
          driverLocation.push(violation);
          this.illegalTimeArr = driverLocation;
          this.$nextTick(()=>{
          this.driverTime("num","涉事驾驶员违章次数统计（人）",count,violation,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"],"人");
          })
        // });
    },
    //违法驾驶员驾龄统计
    illDriverDriveAge(timer) {
          let req = TrafficAccidentAnalysis.driveage.data;
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
                            name:dd.driveAgeGroup,
                            max: num,
                            color: "#3ba7c9"
                        });
                    };
              });
          } else {
              this.$showSimpleMessage("涉事驾驶员驾龄统计暂无数据","error");
          };
          
          driverLocation.push(count);
          driverLocation.push(driveAgeGroup);
          this.driverDirveAgeArr = driverLocation;
          this.$nextTick(()=>{
              this.driverDirveAge('涉事驾驶员驾龄统计（人）',"driveAge", [
                {
                    value : count,
                    name : '涉事驾驶员驾龄统计（人）',
                    lineStyle: {
                        normal: {
                            color: "rgb(150,148,21)"
                        }
                    }
                }
            ],driveAgeGroup);
              })
        // });
    },
    // 事故驾驶员累计计分统计
    driverHistory(timer) {
        
          let req = TrafficAccidentAnalysis.score.data;
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
                            name:dd.scoreNum,
                            max: num,
                            color: "#3ba7c9"
                        });
                    };                    
                });
                // req.map(val => {
                //     dataS.push(val.count);
                //     dataY.push({
                //         name:val.scoreNum,
                //         max: num,
                //         color: "#3ba7c9"
                //     });
                // });
          } else {
              this.$showSimpleMessage("涉事驾驶员累计扣分统计暂无数据","error");
          };
          
          this.$nextTick(()=>{
              this.driverDirveAge('涉事驾驶员累计扣分统计（人）',"score", [
                        {
                            value : dataS,
                            name : '涉事驾驶员累计扣分统计（人）',
                            lineStyle: {
                                normal: {
                                    color: "rgb(150,148,21)"
                                }
                            }
                        }
                    ],dataY);
          })
        // });
    },
    // 事故驾驶员历史事故次数统计
    driverCount(timer) {
          let req = TrafficAccidentAnalysis.driverAcdNum.data;
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
              this.$showSimpleMessage("涉事驾驶员历史事故统计暂无数据","error");
          };
          this.$nextTick(()=>{
              this.driverTime("historyNum","涉事驾驶员历史事故统计（起）",dataS,dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"],"起");
          })
          
    },
    // 违法机动车类型统计
    driverCarType(timer) {
      let carTypeList = this.$store.state.carType;
          let req = TrafficAccidentAnalysis.carType.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          if(req.length > 0) {
                req.map(val => {
                    dataS.push(val.count);
                    let carType = carTypeList.find(t => t.id === val.vehicleType);
                    if(carType) {
                        dataY.push(carType.name)
                    } else {
                        dataY.push( "数据返回有问题");
                    }
                    
                });
          } else {
              this.$showSimpleMessage("涉事机动车类型统计暂无数据","error");
          };
          
          let dataO,dataT;
          let start = 0;
          let length = dataS.length;
          window.clearInterval(this.type);
          let type = setInterval(()=>{
              if(this.carNatureScroll) {
                if(start+5 >= length) {
                    start = 0
                } else {
                    start +=1;
                }
                dataO = this.$tools.deepCopy(dataS).splice(start, 5);
                dataT = this.$tools.deepCopy(dataY).splice(start, 5);
                this.driverAge("涉事机动车类型统计（辆）","carType",dataO,dataT,"辆");
              }
          },2000);
          this.type = type;
    },
    // 驾驶机动车颜色统计
    carColor(timer) {
          let req = TrafficAccidentAnalysis.vehicleColour.data;
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
              this.$showSimpleMessage("驾驶机动车颜色统计暂无数据","error");
          };
          
           let dataO,dataT;
          let start = 0;
          let length = dataS.length;
          window.clearInterval(this.car);
          let type = setInterval(()=>{
              if(this.carNatureScroll) {
                if(start+5 >= length) {
                    start = 0
                } else {
                    start +=1;
                }
                dataO = this.$tools.deepCopy(dataS).splice(start, 5);
                dataT = this.$tools.deepCopy(dataY).splice(start, 5);
                this.driverAge("驾驶机动车颜色统计（辆）","carColor",dataO,dataT,"辆");
              }
          },2000);
          this.car = type;
        //    this.driverAge("违法机动车类型统计","carColor",dataS,dataY);
    },
    // 违法机动车使用性质统计
    carUser(timer) {
      let allUseNature = this.$store.state.useNature;
          let req = TrafficAccidentAnalysis.useNature.data;
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
              this.$showSimpleMessage("涉事机动车使用性质统计暂无数据","error");
          };
          
          let start = 0;
          let length = dataS.length;
          let dataO,dataT;
           window.clearInterval(this.use);
          let use = setInterval(()=>{
              if(this.carNatureScroll) {
                  if(start+6 === length || start+6 > length) {
                    start = 0;
                } else {
                    start += 1;
                }
                dataO = this.$tools.deepCopy(dataS).splice(start,5);
                dataT = this.$tools.deepCopy(dataY).splice(start,5);
                this.driverAge("涉事机动车使用性质统计（辆）","carNature",dataO,dataT,"辆");
              };
          },2000);
          this.use = use;
    },
    stopCarNature() {
        this.carNatureScroll = false;
    },
    keepCarNature() {
        this.carNatureScroll = true;
    },
    // 违法机动车用途性质统计
    carProperties(timer) {
      let allVehicleUse = this.$store.state.vehicleUse;
          let req = TrafficAccidentAnalysis.vehicleUse.data;
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
              this.$showSimpleMessage("涉事机动车用途性质统计暂无数据","error");
          };

          this.$nextTick(()=>{
            
              this.driverAge("涉事机动车用途性质统计（辆）","carUse",dataS,dataY,"辆");
          })
    },
    // 违法机动车违法次数统计
    illNum(timer) {
          let req = TrafficAccidentAnalysis.carVioNum.data;
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
              this.$showSimpleMessage("涉事机动车违法次数统计暂无数据","error");
          };
          
          this.$nextTick(()=>{
              this.driverTime("illNum", "涉事机动车违法次数统计（辆）", dataS, dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
          })
    },
    // 违法机动车事故次数统计
    illAccidentNum(timer) {
          let req = TrafficAccidentAnalysis.carAcdNum.data;
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
              this.$showSimpleMessage("涉事机动车事故次数统计暂无数据","error");
          };
          
          this.$nextTick(()=>{
              this.driverTime("accidentNum", "涉事机动车事故次数统计（辆）", dataS, dataY,["#206fc0", "#20c09c", "#247e44", "#d18523", "#6b20c0"]);
          })
        // });
    },
    // 涉事机动车所有权统计结果
    carBlone(timer) {
      let ownershipList = this.$store.state.Ownership;
          let req = TrafficAccidentAnalysis.ownership.data;
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
              this.$showSimpleMessage("涉事机动车所有权统计暂无数据","error");
          };
          this.$nextTick(()=>{
          this.Ownership(dataY)
          })
    },
    Ownership(dataY){
            let myChart = this.$echarts.init(document.getElementById("belong"));
          let option = {
                title: {
                x: "left",
                text: " 涉事机动车所有权统计（辆）", // 主标题
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
                    radius: ['30%', '50%'],
                    data:dataY,
                    label: {
                        show: true,
                        position: "right",
                        color: "#fff"
                    },
                    labelLine: {
                        length: 5,
                        length2: 5
                    }
                }
                ]
            };
            myChart.setOption(option);
        // });
         
    },
    // 向上滚动
    scrollTop(range){
        let num = 0;
        let index = 0;
        let aa = setInterval(()=> {
            let ifstop = this.ifstop;
            let item = document.getElementsByClassName("el-table__body-wrapper")[0];
            // 取到敞口高度
            let height = document.getElementsByClassName("el-table__body-wrapper")[0].clientHeight;
            let scrollTopD = item.scrollTop;
            let total = (20*28) - (+num) - (+height);
            if(ifstop) {
                if(total > 0) {
                    let ss = setInterval(()=>{
                        let scrollTopD = item.scrollTop;
                        if(index <= +range){
                            num += 1;
                            item.scrollTo(100,num);
                            index += 1;
                        } else {
                            window.clearInterval(ss);
                            index = 0;
                        }            
                    },25)
                } else {
                    item.scrollTo(100,0);
                    num = 0;
                }
            }
        },3000)
        this.aa = aa;
    },
     stopScroll(){

        this.ifstop = false;
    },
    continueScroll() {
        this.ifstop = true;
    }
  },
  mounted() {
      if (this.$store.state.isExport) {
          let aa = this.$store.state.isExportParams;
          this.searchName[1].time = this.dataLaketimeConversion(this.$store.state.isExportParams.startTime);
          this.searchName[2].time = this.dataLaketimeConversion(this.$store.state.isExportParams.endTime);
          this.getTrafficDay(aa);
          this.accidentWeather(aa);
          this.accidentType(aa);
          this.accidentCar(aa);
          this.accidentCompare(aa);
          this.illegalDriverAge(aa);
          this.illDriverDriveAge(aa);
          this.illegalTime(aa);
          this.accidentPerson(aa);
          this.accidentDriverSex(aa);
          this.driverHistory(aa);
          this.driverCount(aa);
          this.driverCarType(aa);
          this.carColor(aa);
          this.carUser(aa);
          this.carProperties(aa);
          this.illNum(aa);
          this.illAccidentNum(aa);
          this.carBlone(aa);
          this.scrollTop(28);
          this.setIn = setInterval(()=>{
              window.clearInterval(this.ww);
              window.clearInterval(this.dd);
              window.clearInterval(this.use);
              window.clearInterval(this.type);
              window.clearInterval(this.car);
              if(this.timer !== "") {
                  let timer = this.timer;
                  this.getTrafficDay(aa);
                  this.accidentWeather(aa);
                  this.accidentType(aa);
                  this.accidentCar(aa);
                  this.accidentCompare(aa);
                  this.accidentPerson(aa);
                  this.accidentDriverSex(aa);
                  this.illegalDriverAge(aa);
                  this.illegalTime(aa);
                  this.illDriverDriveAge(aa);
                  this.driverHistory(aa);
                  this.driverCount(aa);
                  this.driverCarType(aa);
                  this.carColor(aa);
                  this.carUser(aa);
                  this.carProperties(aa);
                  this.illNum(aa);
                  this.illAccidentNum(aa);
                  this.carBlone(aa);
              } else {
                  this.getTrafficDay(aa);
                  this.accidentWeather(aa);
                  this.accidentType(aa);
                  this.accidentCar(aa);
                  this.accidentCompare(aa);
                  this.accidentPerson(aa);
                  this.accidentDriverSex(aa);
                  this.illegalDriverAge(aa);
                  this.illegalTime(aa);
                  this.illDriverDriveAge(aa);
                  this.driverHistory(aa);
                  this.driverCount(aa);
                  this.driverCarType(aa);
                  this.carColor(aa);
                  this.carUser(aa);
                  this.carProperties(aa);
                  this.illNum(aa);
                  this.illAccidentNum(aa);
                  this.carBlone(aa);
              }
          },180000)
          this.$store.state.isExport = false;
      } else {
          this.getTrafficDay(this.timer);
          this.accidentWeather(this.timer);
          this.accidentType(this.timer);
          this.accidentCar(this.timer);
          this.accidentCompare(this.timer);
          this.illegalDriverAge(this.timer);
          this.illDriverDriveAge(this.timer);
          this.illegalTime(this.timer);
          this.accidentPerson(this.timer);
          this.accidentDriverSex(this.timer);
          this.driverHistory(this.timer);
          this.driverCount(this.timer);
          this.driverCarType(this.timer);
          this.carColor(this.timer);
          this.carUser(this.timer);
          this.carProperties(this.timer);
          this.illNum(this.timer);
          this.illAccidentNum(this.timer);
          this.carBlone(this.timer);
          this.scrollTop(28);
          this.setIn = setInterval(()=>{
              window.clearInterval(this.ww);
              window.clearInterval(this.dd);
              window.clearInterval(this.use);
              window.clearInterval(this.type);
              window.clearInterval(this.car);
              if(this.timer !== "") {
                  let timer = this.timer;
                  this.getTrafficDay(timer);
                  this.accidentWeather(timer);
                  this.accidentType(timer);
                  this.accidentCar(timer);
                  this.accidentCompare(timer);
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
              } else {
                  this.getTrafficDay();
                  this.accidentWeather();
                  this.accidentType();
                  this.accidentCar();
                  this.accidentCompare();
                  this.accidentPerson();
                  this.accidentDriverSex();
                  this.illegalDriverAge();
                  this.illegalTime();
                  this.illDriverDriveAge();
                  this.driverHistory();
                  this.driverCount();
                  this.driverCarType();
                  this.carColor();
                  this.carUser();
                  this.carProperties();
                  this.illNum();
                  this.illAccidentNum();
                  this.carBlone();
              }
          },180000)
      }
    // this.getTrafficNumber();
   /* this.getTrafficDay(this.timer);
    this.accidentType(this.timer);
    this.accidentCar(this.timer);
    this.accidentCompare(this.timer);
    this.accidentWeather(this.timer);
    this.accidentPerson(this.timer);
    this.illegalDriverAge(this.timer);
    this.illDriverDriveAge(this.timer);
    this.illegalTime(this.timer);
    this.accidentDriverSex(this.timer);
    this.driverHistory(this.timer);
    this.driverCount(this.timer);
    this.driverCarType(this.timer);
    this.carColor(this.timer);
    this.carUser(this.timer);
    this.carProperties(this.timer);
    this.illNum(this.timer);
    this.illAccidentNum(this.timer);
    this.carBlone(this.timer);
    this.scrollTop(28);
    this.setIn = setInterval(()=>{
        window.clearInterval(this.ww);
        window.clearInterval(this.dd);
        window.clearInterval(this.use);
        window.clearInterval(this.type);
        window.clearInterval(this.car);
        // this.getTrafficNumber(timer);
        if(this.timer !== "") {
             let timer = this.timer;
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
        } else {
            this.getTrafficDay();
            this.accidentType();
            this.accidentCar();
            this.accidentCompare();
            this.accidentWeather();
            this.accidentPerson();
            this.accidentDriverSex();
            this.illegalDriverAge();
            this.illegalTime();
            this.illDriverDriveAge();
            this.driverHistory();
            this.driverCount();
            this.driverCarType();
            this.carColor();
            this.carUser();
            this.carProperties();
            this.illNum();
            this.illAccidentNum();
            this.carBlone();
        }
        
    },15*1000)*/
  },
  created() {
      this.firstData = this.$tools.deepCopy(this.tableData).splice(0,3);
      let etimer = new Date().getTime();
      let stimer = etimer - (1000 * 60 * 60 * 24 * 7);
      this.searchName[1].time = stimer; this.searchName[2].time = etimer;
      this.timer = { area: undefined, endTime: this.$tools.getDays(new Date(etimer)), startTime: this.$tools.getDays(new Date(stimer)) };
  },
  beforeDestroy() {
      window.clearInterval(this.aa);
       window.clearInterval(this.ww);
       window.clearInterval(this.dd);
        window.clearInterval(this.use);
        window.clearInterval(this.type);
        window.clearInterval(this.car);
        window.clearInterval(this.setIn);
  }
};
</script>

<style scoped>
    .mapHover /deep/ el-carousel .el-carousel__container{
        height: 100% !important; 
    }
</style>
<style>
    .mapHover .el-carousel__container {
        height: 100% !important; 
    }
    .mapHover /deep/ el-carousel .el-carousel__container{
        height: 100% !important; 
    }
    .zpEarch .el-carousel__container {
        height: 100% !important; 
    }
</style>