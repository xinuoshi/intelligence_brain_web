<template>
    <!-- 交通违法分析 -->
    <div class="maincss">
        <div style="position:absolute;top:120px;bottom:0px;overflow: auto">
            <api>
                <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage" :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
                <div slot="searchBoxBar" class="operation">
                    <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
                </div>
            </api>
            <div class="mainone">
                <table class="mineTable" v-for="(item, index) in tablevalue" :key="index">
                    <tr style="height: 50px;">
                        <td class="yangshi1">{{item.name}}<p>交通违法数量</p>
                        </td>
                        <td class="yangshi2">{{item.count}}</td>
                    </tr>
                </table>
            </div>
            <div class="maintwo">
                <div id="Columns1" class="zpEarch" style="width: 66%;height:100%"></div>
                <div id="Columns2" class="zpEarch" style="width: 33%;height:100%"></div>
            </div>
            <div class="mainthree">
                <div id="Caketype1" class="zpEarch" style="width: 32.7%;height:400px"></div>
                <div id="Caketype2" class="zpEarch" style="width: 66.3%;height:400px"></div>
            </div>
            <div class="mainfour">
                <div id="lineColumns1" class="zpEarch" style="width: 32.7%;height:100%"></div>
                <div id="lineColumns2" class="zpEarch" style="width: 32.7%;height:100%"></div>
                <div id="driverSex" class="zpEarch" style="width: 32.7%;height:100%"></div>
            </div>
            <div class="mainfive">
                <div id="driverAge" class="zpEarch"></div>
                <div id="driverDirveAge" class="zpEarch"></div>
                <div id="driverTime" class="zpEarch"></div>
            </div>
            <div class="mainfive">
                <div id="driverHistory" class="zpEarch"></div>
                <div id="driverCount" class="zpEarch"></div>
                <div id="driverCarType" class="zpEarch"></div>
            </div>
            <div class="mainfive">
                <div id="carColor" class="zpEarch"></div>
                <div id="carUser" class="zpEarch"></div>
                <div id="carProperties" class="zpEarch"></div>
            </div>
            <div class="mainfive">
                <div id="illNum" class="zpEarch"></div>
                <div id="illAccidentNum" class="zpEarch"></div>
                <div id="carBlone" class="zpEarch"></div>
            </div>
            <div class="mainfive mainList">
                <div class="list zpEarch">
                    <div class="listtitle">企业违法排行榜</div>
                    <div class="table">
                        <el-table :data="tableData" style="width: 100%" id="table">
                            <el-table-column prop="index" label="排名">
                            </el-table-column>
                            <el-table-column prop="name" width="180" label="企业名称">
                            </el-table-column>
                            <el-table-column prop="address" label="行政区域">
                            </el-table-column>
                            <el-table-column prop="num" label="违法数量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
// import TrafficOrderAnalysis from "../../../JSON/TrafficOrderAnalysis";
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
      // 涉事人员年龄分布
      driverAgeArr: [],
      // 涉事人员违章次数统计
      illegalTimeArr: [],
      // 涉事人员的驾龄统计
      driverDirveAgeArr: [],
      tableData: [
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
          name: "光源通物流有限公司",
          address: "区域2",
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
      ]
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
    },
    // 24小时违法数量统计
    Columns1() {
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        title: {
          x: "left",
          text: "24小时违法数量统计",
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "_________________________________________________________________________",
          subtextStyle: {
            color: "#3ba7c9"
          },
          itemGap: 0
        },
        tooltip: {},
        dataset: {
          source: [
            [
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
            this.twentyFour
          ]
        },
        grid: {
          left: "3%",
          top: "80px",
          width: "80%"
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
            itemStyle: {
              normal: {
                color: "red"
              }
            }, // 渐变
            name: "违法数量",
            type: "line",
            symbolSize: function(val) {
              return val[2] * 2;
            },
            seriesLayoutBy: "row"
          }
        ]
      };
      myChart.setOption(option);
    },
    // 违法行为分布统计
    Columns2() {
      let myChart = this.$echarts.init(document.getElementById("Columns2"));
      let option = {
        title: {
          x: "left",
          text: "违法行为分布（起）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "_________________________________________________________________________", // 副标题
          subtextStyle: {
            color: "#3ba7c9"
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
          left: "50%",
          width: 50,
          top: "80",
          //   bottom: 10,
          data: this.legend,
          textStyle: {
            width: 50,
            overflow: "hidden"
          },
          pageButtonPosition: "end",
          animation: true
        },
        label: {
          show: true,
          position: "right",
          color: "#fff"
        }, // 标签字
        series: [
          {
            name: "销量",
            type: "pie",
            center: ["25%", "60%"],
            color: [
              "#206fc0",
              "#23b6d1",
              "#20c09c",
              "#20a8c0",
              "#204dc0",
              "#6bc020",
              "#c0a020"
            ],
            radius: "90",
            // roseType: "area",
            label: {
              show: false,
              position: "inside"
            },
            data: this.accidentTypeNumber,
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
    },
    // 违法车辆号牌属地统计
    Caketype1() {
      let myChart = this.$echarts.init(document.getElementById("lineColumns2"));
      let option = {
        title: {
          x: "left",
          text: "违法机动车属地统计（辆）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "_________________________________________________________________________", // 副标题
          subtextStyle: {
            color: "#3ba7c9"
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
          data: this.accidentCarNumber
        },
        series: [
          {
            name: "设施车辆号牌所属地",
            type: "pie",
            roseType: "angle",
            // minAngle: 60,           //最小角度
            center: ["30%", "50%"], //圆心位置
            radius: ["30", "120"], //内半径外半径
            label: {
              //内饰标签
              show: true,
              position: "inside"
            },
            data: this.accidentCarNumber
          }
        ]
      };
      myChart.setOption(option);
    },
    // 违法事故环比同比
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
          left: "8%",
          top: "80px",
          width:"80%",
          height:"80%"
        },
        title: {
          text: "违法事故环比同比",
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
          subtext:
            "_________________________________________________________________________", // 副标题
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
          selectedMode: false,
          data: ["环比", "同比", "各行政区违法数量"]
        },
        xAxis: {
          type: "category",
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
          },
          data: this.accidentCompareNumber[0]
        },
        yAxis: [
          {
            // type: "value",
            // name: "违法数量",
            maxInterval: 20,

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
            name: "环比",
            position: "right",
            offset: 20,
            max: 1,
            min: -1,
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
          },
          {
            type: "value",
            name: "同比",
            position: "right",
            offset: 50,
            max: 1,
            min: -1,
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
            itemStyle: {
              normal: {
                color: "#01ffff"
              }
            },
            name: "违法数量",
            type: "bar",
            barWidth: 26,
            data: this.accidentCompareNumber[3]
          },
          {
            color: "#57c8f5",
            name: "环比",
            type: "line",
            data: this.accidentCompareNumber[1]
          },
          {
            color: "#d14a61",
            name: "同比",
            type: "line",
            data: this.accidentCompareNumber[2]
          },
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
            data: [60, 60, 60, 60, 60, 60, 60, 60]
          }
        ]
      };
      myChart.setOption(option);
    },
    // 违法天气类型分布统计
    lineColumns1() {
      let myChart = this.$echarts.init(document.getElementById("lineColumns1"));
      let option = {
        title: {
          x: "left",
          text: "违法天气类型分布统计", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "_________________________________________________________________________", // 副标题
           subtextStyle: {
            color: "#3ba7c9"
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
          data: this.weather
        },
        series: [
          {
            name: "违法天气类型分布统计",
            type: "pie",
            roseType: "angle",
            // minAngle: 60,           //最小角度
            center: ["30%", "50%"], //圆心位置
            radius: ["30", "120"], //内半径外半径
            label: {
              //内饰标签
              show: true,
              position: "inside"
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
          text: "违法人员属地统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "___________________________________________________________________________________", // 副标题
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
    driverSex() {
      let option = {
        title: {
          x: "left",
          text: "违法驾驶员性别统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "___________________________________________________________________________________", // 副标题
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
          data: this.driverLocation[1]
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
            data: this.driverLocation[0],
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("driverSex"));
      myChart.setOption(option);
    },
    // 违法驾驶员年龄统计
    driverAge() {
      let option = {
        title: {
          x: "left",
          text: "违法驾驶员年龄统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "___________________________________________________________________________________", // 副标题
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
          data: this.driverAgeArr[1]
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
            data: this.driverAgeArr[0],
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("driverAge"));
      myChart.setOption(option);
    },
    // 违法驾驶员驾龄统计
    driverDirveAge() {
      let option = {
        title: {
          x: "left",
          text: "违法驾驶员驾龄统计", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "___________________________________________________________________________________", // 副标题
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
          data: this.driverDirveAgeArr[1]
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
            type: "bar",
            barWidth: "10px",
            z: 10,
            data: this.driverDirveAgeArr[0],
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
          }
        ]
      };
      let myChart = this.$echarts.init(
        document.getElementById("driverDirveAge")
      );
      myChart.setOption(option);
    },
    // 违法驾驶员违章次数统计
    driverTime() {
      let option = {
        title: {
          x: "left",
          text: "违法驾驶员违章次数统计（人）", // 主标题
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "#3ba7c9",
            fontFamily: "PingFangSC-Regular"
          },
          left: "10",
          top: "10",
          subtext:
            "___________________________________________________________________________________", // 副标题
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
          data: this.illegalTimeArr[1]
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
            data: this.illegalTimeArr[0],
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
            // barGap: '100%'
          }
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("driverTime"));
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
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/illRegionRank",
          this.getParams(timer)
        )
        .then(res => {
          let tablevalue = res.data.data;
          tablevalue.map(val => {
            val.name = val.area;
          });
          this.tablevalue = tablevalue;
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 24小时统计
    getTrafficDay(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/duration",
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
          this.Columns1();
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 违法类型分布统计
    accidentType(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/illType",
          this.getParams(timer)
        )
        .then(res => {
          let eventType = res.data.data;
          let accidentTypeNumber = [];
          let legend = [];
          let illegalList = this.$store.state.illegal;
          eventType.map(val => {
            let item = illegalList.find(t => t.id === val.illegalBehavior);
            accidentTypeNumber.push({
              name: item.name,
              value: val.count,
              textStyle: {
                color: "#fff"
              }
            });
          });
          this.legend = accidentTypeNumber;
          this.accidentTypeNumber = accidentTypeNumber;
          this.Columns2();
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 违法车辆号牌属地统计
    accidentCar(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/vehicleLocation",
          this.getParams(timer)
        )
        .then(res => {
          let accidentCarNumber = [];
          let req = res.data.data;
          req.map(val => {
            accidentCarNumber.push({
              name: val.area,
              value: val.count,
              textStyle: {
                color: "#fff"
              }
            });
          });
          this.accidentCarNumber = accidentCarNumber;
          this.Caketype1();
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
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
      sjhAxios
        .post("sjh2/strategysupport/safty/illAnalysis/illRegionRank", params)
        .then(res => {
          let tablevalue = res.data.data;
          let accidentCompareNumber = [];
          let area = [];
          let qoq = [];
          let yoy = [];
          let count = [];
          let length = tablevalue.length;
          for (let i = 1; i <= length; i++) {
            let result = tablevalue.find(t => t.rank === i);
            area.push(result.area);
            qoq.push(result.qoq);
            yoy.push(result.yoy);
            count.push(result.count);
          }
          accidentCompareNumber.push(area);
          accidentCompareNumber.push(qoq || "");
          accidentCompareNumber.push(yoy || "");
          accidentCompareNumber.push(count || "");
          this.accidentCompareNumber = accidentCompareNumber;
          console.log(accidentCompareNumber);
          this.Caketype2();
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 违法天气类型分布统计
    accidentWeather(timer) {
    //   sjhAxios
    //     .post(
    //       "sjh2/strategysupport/safty/illAnalysis/weather",
    //       this.getParams(timer)
    //     )
    //     .then(res => {
          let req = TrafficAccidentAnalysis.weather.data;
          let weather = [];
          let allWeather = this.$store.state.weather;
          req.map(val => {
            let item = {};
            let chose = allWeather.find(t => t.id === val.weatherType);
            item = {
              name: chose.name,
              value: val.count,
              textStyle: {
                color: "#fff"
              }
            };
            weather.push(item);
          });
          this.weather = weather;
          this.lineColumns1();
        // });
    },
    // 违法人员户口属地统计
    accidentPerson(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/driverLocation",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let driver = [];
          req.map(val => {
            count.push(val.count);
            driver.push(val.area);
          });
          driverLocation.push(count);
          driverLocation.push(driver);
          this.driverLocation = driverLocation;
          this.lineColumns2();
        });
    },
    // 违法驾驶员性别
    accidentDriverSex(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/sex",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let sex = [];
          req.map(val => {
            count.push(val.count);
            let sexs = val.sex === "1" ? "男" : "女";
            sex.push(sexs);
          });
          driverLocation.push(count);
          driverLocation.push(sex);
          this.driverLocation = driverLocation;
          this.driverSex();
        });
    },
    // 违法驾驶员年龄统计
    illegalDriverAge(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/acdAnalysis/age",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let ageGroup = [];
          req.map(val => {
            count.push(val.count);
            ageGroup.push(val.ageGroup);
          });
          driverLocation.push(count);
          driverLocation.push(ageGroup);
          this.driverAgeArr = driverLocation;
          this.driverAge();
        });
    },
    // 违法驾驶员违章次数统计
    illegalTime(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/driverVioNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let violation = [];
          req.map(val => {
            count.push(val.count);
            violation.push(val.violation);
          });
          driverLocation.push(count);
          driverLocation.push(violation);
          this.illegalTimeArr = driverLocation;
          this.driverTime();
        });
    },
    //违法驾驶员驾龄统计
    illDriverDriveAge(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/driveage",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let count = [];
          let driveAgeGroup = [];
          req.map(val => {
            count.push(val.count);
            driveAgeGroup.push(val.driveAgeGroup);
          });
          driverLocation.push(count);
          driverLocation.push(driveAgeGroup);
          this.driverDirveAgeArr = driverLocation;
          this.driverDirveAge();
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
          subtext:
            "___________________________________________________________________________________", // 副标题
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
    // 违法驾驶员历史违法统计
    driverHistory(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/score",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataS = [];
          let dataY = [];
          req.map(val => {
            dataS.push(val.count);
            dataY.push(val.scoreNum);
          });
          this.barCanvas(
            "违法驾驶员累计扣分统计",
            dataY,
            dataS,
            "driverHistory",
            "#8463f8",
            "#eb6fe9"
          );
        });
    },
    // 违法驾驶员累计扣分统计
    driverCount(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/driverAcdNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataS = [];
          let dataY = [];
          req.map(val => {
            dataS.push(val.count);
            dataY.push(val.accident);
          });
          this.barCanvas(
            "违法驾驶员历史事故次数统计",
            dataY,
            dataS,
            "driverCount",
            "#8463f8",
            "#eb6fe9"
          );
        });
    },
    // 违法机动车类型统计
    driverCarType(timer) {
      let carTypeList = this.$store.state.carType;
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/carType",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            let carType = carTypeList.find(t => t.id === val.carType);
            dataY.push(carType.name);
          });
          this.barCanvas(
            "违法机动车类型统计",
            dataY,
            dataS,
            "driverCarType",
            "#8463f8",
            "#eb6fe9"
          );
        });
    },
    // 驾驶机动车颜色统计
    carColor(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/vehicleColour",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            dataY.push(val.vehicleColour);
          });
          this.barCanvas("驾驶机动车颜色统计", dataY, dataS, "carColor");
        });
    },
    // 违法机动车使用性质统计
    carUser(timer) {
      let allUseNature = this.$store.state.useNature;
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/useNature",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            let useNature = allUseNature.find(t => t.id === val.useNature);
            dataY.push(useNature.name);
          });
          this.barCanvas("违法机动车使用性质统计（辆）", dataY, dataS, "carUser");
        });
    },
    // 违法机动车用途性质统计
    carProperties(timer) {
      let allVehicleUse = this.$store.state.vehicleUse;
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/vehicleUse",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            let vehicleUse = allVehicleUse.find(t => t.id === val.vehicleUse);
            dataY.push(vehicleUse.name);
          });
          this.barCanvas(
            "违法机动车用途性质统计（辆）",
            dataY,
            dataS,
            "carProperties"
          );
        });
    },
    // 违法机动车违法次数统计
    illNum(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/carVioNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            dataY.push(val.violation);
          });
          this.barCanvas(
            "违法机动车违法次数统计",
            dataY,
            dataS,
            "illNum",
            "#8463f8",
            "#eb6fe9"
          );
        });
    },
    // 违法机动车事故次数统计
    illAccidentNum(timer) {
      sjhAxios
        .post(
          "sjh2/strategysupport/safty/illAnalysis/carAcdNum",
          this.getParams(timer)
        )
        .then(res => {
          let req = res.data.data;
          let driverLocation = [];
          let dataY = [];
          let dataS = [];
          req.map(val => {
            dataS.push(val.count);
            dataY.push(val.accident);
          });
          this.barCanvas(
            "违法机动车事故次数统计",
            dataY,
            dataS,
            "illAccidentNum",
            "#8463f8",
            "#eb6fe9"
          );
        });
    },
    // 机动车所有权统计结果
    carBlone(timer) {
      let ownershipList = this.$store.state.Ownership;
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
          req.map(val => {
            dataS.push(val.count);
            let ownership = ownershipList.find(t => t.id === +val.ownership);
            dataY.push(ownership.name);
          });
          this.barCanvas(
            "涉事机动车所有权统计结果",
            dataY,
            dataS,
            "carBlone",
            "#8463f8",
            "#eb6fe9"
          );
        });
    }
  },
  created() {},
  mounted() {
    this.getTrafficNumber();
    this.getTrafficDay();
    this.accidentType();
    this.accidentCar();
    this.accidentCompare();
    this.accidentWeather();
    this.accidentPerson();
    this.illegalDriverAge();
    this.illDriverDriveAge();
    this.illegalTime();
    this.accidentDriverSex();
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
};
</script>

<style>
.maincss .subordinateSubject {
  border: none;
  position: relative;
}
</style>

<style scoped>
.maincss {
  background-color: #081f3f !important;
}
.maintwo {
  margin-right: 0.5%;
}
.mainone {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100% !important;
  margin-left: 0 !important;
  padding: 0;
}
.mainone .yangshi1 {
  background-color: #193d6e;
  color: #ff8400;
  font-size: 16px;
  width: 110px;
  border-radius: 5px;
}
.mineTable {
  width: 21%;
}
.mainone .yangshi1 p {
  font-size: 8px;
}
.mainone .yangshi2 {
  background-color: #09132d;
  font-size: 20px;
  width: 80px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.maincss {
  background-color: #0d1e35;
}
hr {
  margin: 0 40px 35px 40px;
  border: 1px solid;
  background-color: #33a5ff;
  color: #33a5ff;
}
.mainone {
  font-family: "PingFangSC-Regular";
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;
  margin-left: 2%;
  margin-bottom: 1%;
}
.maintwo {
  display: flex;
  height: 34%;
  margin-bottom: 1%;
  justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
}
.mainthree {
  display: flex;
  /* margin-right: 0.5%; */
  margin-bottom: 1%;
  justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
}
.mainfour {
  display: flex;
  height: 45%;
  justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 1%;
}
.mainfive {
  display: flex;
  height: 400px;
  margin-bottom: 20px;
  justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
}
.mainfive > div {
  width: 32.7%;
  height: 100%;
}
.mainList {
  display: flex;
  height: 500px;
  margin-bottom: 20px;
  justify-content: space-around;
}
.listtitle {
 width: 100%;
  border-bottom: 2px solid #5abdfc;
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 18px;
  color: #5abdfc;
  padding-left: 10px;
  box-sizing: border-box;
}
.table {
  width: 100%;
  height: 420px;
  margin-top: 5px;
  margin-bottom: 10px;
}
#table {
  position: relative !important;
}
</style>