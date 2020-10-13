<template>
  <!-- 交通流管理评价 -->
  <div class="maincss">
    <div style="height:85vh;overflow: auto;position:relative;padding:0 15px 15px 15px;">
      <!-- <api> -->
        <SearchPage
          slot="searchBoxBar"
          class="search flexNum"
          ref="searchPage"
          :searchName="searchName"
          @searchEvent="searchEvent"
        >
    </SearchPage>
          <bt
            ref="bt"
            :buttonList="UnitTopButton"
            @operation="operation"
            style="position:absolute;top:0px; right:20px;"
          ></bt>
      <!-- <div class="mainone">
        <table
          class="mineTable"
          v-for="(item, index) in tablevalue"
          :key="index"
        >
          <tr style="height: 50px;">
            <td class="yangshi1">{{item.area}}<p>交通流管理评价指数</p>
            </td>
            <td class="yangshi2">{{item.tfmi.toFixed(2)}}</td>
          </tr>
        </table>
      </div> -->
      <div class="maintwo mainAllHeight">
        <div
          id="Columns1"
          class="zpEarch"
          style="width: 100%;height:100%"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading } from 'element-ui';
import html2canvas from "html2canvas";
import saveAs from "save-as";
export default {
  name: "SubjectPortrait",
  data() {
    return {
      tablevalue: [],
      area: [],
      tfmi: [],
      tfmiqoq: [],
      rankqoq: [],
      // 搜索传参
      searchName: [
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
      reqTimer:"",
      sTimer: "",
      eTimer: ""
    };
  },
  methods: {
    // 搜索回调
    searchEvent(payload) {
      if (payload.startTime !== undefined && payload.endTime !== undefined) {
        let timer = {
          startTime: this.$tools.setTimeUse(new Date(payload.startTime)),
          endTime: this.$tools.setTimeUse(new Date(payload.endTime))
        };
        clearInterval(this.reqTimer);
        this.getReq(timer);
        this.reqTimer = setInterval(() => {
            this.getReq(timer);
        }, 180000); 
      } else {
        this.$showSimpleMessage("请选择日期", "error");
      }
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
      let gis = document.getElementsByClassName("maintwo")[0];
      html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(canvas.msToBlob(), "交通流管理评价" + time + ".png");
        } else {
          canvas.toBlob(function (blob) { saveAs(blob, "交通流管理评价" + time + ".png"); });
        }
      });
    },
    // 绘制图形
    Columns1() {
      let _this = this;
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        title: {
            x:"left",
            left:12,
            top:8,
            text: '交通流管理评价指数及环比',                                // 主标题
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
            itemGap: 0                 //主副标题距离
        },
        legend: {
            show: false,
          type: "plain",
          top: 40,
          right: 200,
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
          left: "3%",
          top: 80
        }, // 整体位置
          xAxis: {
              data: this.area,
              nameRotate: 50,
              axisLabel: {
                  show: true,
                  textStyle: {
                      fontSize : 16      //更改坐标轴文字大小
                  }
              },
              axisLine: {
                  textStyle: {
                      fontSize: 16
                  },
                  lineStyle: {
                      color: "#147a86"
                  }
              } // x轴样式
          },
          yAxis: [
              {
                  type: "value",
                  minInterval: 0,
                  min:0,
                  axisLine: {
                      show: false,
                      lineStyle: {
                          color: "#147a86"
                      }
                  }, // y轴样式
                  splitLine: {
                      lineStyle: {
                          // 使用深浅的间隔色
                          color: ["#2c3459"]
                      }
                  } // y轴轴线样式
              },
        //   {
        //     type: "value",
        //     name: "环比/同比",
        //     nameTextStyle: {
        //       color: "rgb(44, 248, 255)"
        //     },
        //     position: "right",
        //     offset: 10,
        //     axisTick: {
        //       alignWithLabel: true
        //     },
        //     min: 0,
        //     max: 1,
        //     splitLine: {
        //       show: false,
        //       interval: 1,
        //       lineStyle: {
        //         color: ["#567195"],
        //         solid: "dashed"
        //       }
        //     },
        //     axisLine: {
        //       show: true,
        //       lineStyle: {
        //         color: "#1f73a7"
        //       }
        //     } // y轴样式
        //     //   type: "category",
        //   }
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        label: {
            show: true,
            position: "top",
            align: "center",
            formatter: function(value) {
                // console.log(value)
                return "{a|指数环比:" + _this.tfmiqoq[value.dataIndex] + "}\n{b|" + "指数:" + value.data + "}";
            },
            rich: {
                a: {
                    color: "#fff",
                    lineHeight: 18
                },
                b: {
                    color: "#fff",
                    lineHeight: 18
                }
            }
        },
        series: [
          {
            name: "交通流管理指数环比",
            type: "line",
            symbol: "none",
            data: this.tfmiqoq,
            color: "rgb(0,0,0,0)"
          },
        //   {
        //     name: "交通流管理指数排名环比",
        //     type: "line",
        //     symbol: "none",
        //     data: this.rankqoq,
        //     color: "rgb(0,0,0,0)"
        //   },
          {
            name: "交通流管理指数",
            type: "bar",
            barWidth: 50,
            data: this.tfmi,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
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
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    // 请求接口
    getReq(timer) {
      let params = {
        startTime: this.sTimer,
        endTime: this.eTimer
      };
      if (timer) {
        params = {
          startTime: timer.startTime,
          endTime: timer.endTime
        };
      }
      sjhAxios
        .post("sjh2/strategysupport/tfmi/areaIndex", params)
        .then(res => {
          if (res.data.result === "failure") {
            this.$showSimpleMessage(res.data.message, "success");
          } else {
            let tablevalue = res.data.data;
            // 指数环比
            let tfmiqoq = [];
            // 排名环比
            let rankqoq = [];
            // 指数
            let tfmi = [];
            let area = [];
            let length = tablevalue.length;
            for (let i = 1; i < length + 1; i++) {
              let result = tablevalue.find(t => t.rank === i);
              tfmiqoq.push(result.tfmiqoq.toFixed(2));
              rankqoq.push(result.rankqoq.toFixed(2));
              tfmi.push(result.tfmi.toFixed(2));
              area.push(result.area);
            }
            // tablevalue.map(val => {
            //     tfmiqoq.push(val.tfmiqoq);
            //     rankqoq.push(val.rankqoq);
            //     tfmi.push(val.tfmi);
            //     area.push(val.area);
            // })
            this.tablevalue = tablevalue;
            this.tfmiqoq = tfmiqoq;
            this.rankqoq = rankqoq;
            this.tfmi = tfmi;
            this.area = area;
            this.Columns1();
          }
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    }
  },
  mounted() {
    let _this = this;
    // 开始loading
    let mapLoading = Loading.service({
        lock: true,
        text: "正在整理所有视图，给您规划排版，请耐心等待...",
        spinner: "el-icon-loading"
        // background: "rgba(10, 40, 100, 0)"
    });
    let timer = this.$route.params.searchTimer;

    // 请求接口按条件查询
    // this.getReq();
    let params = {
      startTime: this.sTimer,
      endTime: this.eTimer
    };
    if (timer) {
      params = {
        startTime: timer.startTime,
        endTime: timer.endTime
      };
    }
    sjhAxios.post("sjh2/strategysupport/tfmi/areaIndex", params).then(res => {
      if (res.data.result === "failure") {
        this.$showSimpleMessage(res.data.message, "success");
      } else {
        let tablevalue = res.data.data;
        // 指数环比
        let tfmiqoq = [];
        // 排名环比
        let rankqoq = [];
        // 指数
        let tfmi = [];
        let area = [];
        let length = tablevalue.length;
        for (let i = 1; i < length + 1; i++) {
          let result = tablevalue.find(t => t.rank === i);
          tfmiqoq.push(result.tfmiqoq.toFixed(2));
          rankqoq.push(result.rankqoq.toFixed(2));
          tfmi.push(result.tfmi.toFixed(2));
          area.push(result.area);
        }
        // tablevalue.map(val => {
        //     tfmiqoq.push(val.tfmiqoq);
        //     rankqoq.push(val.rankqoq);
        //     tfmi.push(val.tfmi);
        //     area.push(val.area);
        // })
        this.tablevalue = tablevalue;
        this.tfmiqoq = tfmiqoq;
        this.rankqoq = rankqoq;
        this.tfmi = tfmi;
        this.area = area;
        this.Columns1();
        this.$nextTick(() => {
            setTimeout(async() => {
                let time = this.$tools.nowTime();
                let gis = document.getElementsByClassName("maintwo")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                  if (navigator.msSaveBlob) {
                    mapLoading.close();
                    _this.$router.go(-1);
                    navigator.msSaveBlob(canvas.msToBlob(), "交通流管理评价" + time + ".png");
                  } else {
                    mapLoading.close();
                    _this.$store.state.isExportParams = params;
                    _this.$store.state.isExport = true;
                    _this.$router.go(-1);
                    canvas.toBlob(function(blob) { saveAs(blob, "交通流管理评价" + time + ".png"); });
                  }
                });
            }, 2000);
        });
      }
    })
    .catch(error => {
      this.$showSimpleMessage(error, "error");
    });

    /* let reqTimer = setInterval(() => {
        this.getReq();
    }, 15*1000);
    this.reqTimer = reqTimer; */
  },
  created() {
    let etimer = new Date().getTime();
    let stimer = etimer - (1000 * 60 * 60 * 24 * 7);
    this.searchName[0].time = stimer; this.searchName[1].time = etimer;
    this.sTimer = this.$tools.setTimeUse(new Date(stimer));
    this.eTimer = this.$tools.setTimeUse(new Date(etimer));
  },
  beforeDestroy() {
      clearInterval(this.reqTimer);
  }
};
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
  width: 21%;
}
.mainone .yangshi1 {
  background-color: #193d6e;
  color: #ff8400;
  font-size: 16px;
  width: 110px;
  border-radius: 5px;
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
  /* background-color: #0d1e35; */
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
  /* height: 20%; */
  width: 90%;
  margin-left: 2%;
  margin-bottom: 3%;
}
.maintwo {
  display: flex;
  height: 96% !important;
  margin-right: 0 !important;
  /* margin-left: 2%;
  margin-top: 2%; */
}
</style>
