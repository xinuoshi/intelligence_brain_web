<template>
  <div class="out">
    <div
      class="leftButton"
      @click="hideHis"
      style="background-color: rgba(3, 8, 37, 0.9);color:#ffffff;"
    >{{arrowDirection}}</div>
    <div class="backC" style="background-color: rgba(3, 8, 37, 0.85) !important;">
      <!-- 状态观测 -->
      <div v-show="pageStatus === 'trafficFlow'" class="trafficFlowLow flexColumn">
        <div
          v-if="trafficFlowLowEarchLineShow"
          id="trafficFlowLowEarchLine0"
          style="width:620px;height:400px"
        ></div>
        <div
          v-if="!trafficFlowLowEarchLineShow"
          style="width:620px;height:400px;text-align: center;"
        >
          正在请求数据，请等待
          <i class="el-icon-loading"></i>
        </div>
        <el-carousel class="flexNum flexColumn" @change="topchange" :autoplay="false">
          <el-carousel-item v-for="item in 4" :key="item" :autoplay="false">
            <div v-if="item === 1" class="heightClass" :initial-index="0">
              <span class="spanTitle">区域延时排行榜</span>
              <el-table :data="tableDataP" height="80%">
                <el-table-column prop="rank" label="排行" width="50px"></el-table-column>
                <el-table-column prop="districtRegionId" label="区域"></el-table-column>
                <el-table-column prop="avgSpeed" label="平均行驶速度(km/h)"></el-table-column>
                <el-table-column prop="delayValue" label="拥堵延时指数"></el-table-column>
              </el-table>
            </div>
            <div v-if="item === 2" class="heightClass" :initial-index="1">
              <el-backtop target=".roadNameInner"></el-backtop>
              <span class="spanTitle">路段延时排行榜</span>
              <div style="overflow: scroll">
                <el-table
                  :data="tableDataL"
                  @scroll.native="handleScroll(tableDataL)"
                  ref="table"
                  class="aaaa"
                  max-height="300px"
                >
                  <!-- row-class-name="table-row-class"
                  @row-click="rowClick"-->
                  <el-table-column prop="rank" label="排行" width="50px"></el-table-column>
                  <el-table-column prop="roadName1" label="起点">
                    <div slot-scope="scope">
                      <el-popover trigger="hover" placement="right" class="hover" open-delay="30">
                        <p style="color: #fff">{{scope.row.roadName1}}</p>
                        <div slot="reference" class="tems_popover">
                          <el-tag class="roadNameInner" size="medium">{{scope.row.roadName1}}</el-tag>
                        </div>
                      </el-popover>
                    </div>
                  </el-table-column>
                  <el-table-column prop="roadName2" label="终点">
                    <div slot-scope="scope" class="abc">
                      <el-popover trigger="hover" placement="right" class="hover">
                        <p style="color: #fff">{{scope.row.roadName2}}</p>
                        <div slot="reference" ref="table" class="tems_popover">
                          <el-tag class="roadNameInner" size="medium">{{scope.row.roadName2}}</el-tag>
                        </div>
                      </el-popover>
                    </div>
                  </el-table-column>
                  <el-table-column prop="avgSpeed" label="平均行驶速度(km/h)" width="135"></el-table-column>
                  <el-table-column prop="delayValue" label="延时指数" width="80"></el-table-column>
                </el-table>
              </div>
            </div>
            <div v-if="item === 3" class="heightClass trafficFlowLowEarchHline" :initial-index="2">
              <span class="spanTitle">路口拥堵排行榜</span>
              <el-table
                :data="tableDataT"
                height="80%"
                style="width: 100% !important;height: 80% !important;"
              >
                <el-table-column prop="rank" width="50" label="排行"></el-table-column>
                <el-table-column prop="crossingName" width="200" label="路口"></el-table-column>
                <el-table-column label="路口拥堵指数">
                  <div slot-scope="scope">
                    <el-progress
                      :show-text="false"
                      :stroke-width="20"
                      :percentage="scope.row.crossingTPI*10 || 0"
                      color="rgb(38,211,200)"
                    ></el-progress>
                    <div class="tipsTrafficFlowLow" id="bbb">{{scope.row.crossingTPI || 0}}</div>
                  </div>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="item === 4" class="heightClass trafficFlowLowEarchHline" :initial-index="3">
              <span class="spanTitle">路口失衡排行榜</span>
              <el-table
                :data="tableDataF"
                height="80%"
                style="width: 100% !important;height: 80% !important;"
                id="ccc"
              >
                <el-table-column prop="rank" width="50" label="排行"></el-table-column>
                <el-table-column prop="crossingName" width="200" label="路口"></el-table-column>
                <el-table-column label="路口失衡指数">
                  <template slot-scope="scope">
                    <el-progress
                      :show-text="false"
                      :stroke-width="20"
                      :percentage="scope.row.crossingImbalance*10 || 0"
                      color="rgb(38,211,200)"
                    ></el-progress>
                    <div class="tipsTrafficFlowLow">{{scope.row.crossingImbalance || 0}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<style scoped>
.trafficCom {
  display: none;
}
.aaaa {
  /* display: none !important; */
  height: 80% !important ;
}
.backC {
  background-color: rgb(3, 8, 37, 0.85) !important;
  overflow: auto;
  padding: 10px 23px;
  /* display: none */
}
.backC .el-table .cell,
.backC .el-table .el-tag {
  line-height: 30px;
}
.out {
  display: flex !important;
  flex-direction: row;
}
.hover {
  width: 100px;
  height: 100px;
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
.leftButton {
  width: 30px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #ffffff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.el-table .cell,
.el-tag {
  height: 100%;
}
.trafficCom {
  display: inline;
  overflow: hidden;
  display: none;
  padding: 0;
}
.tipsTrafficFlowLow {
  position: absolute;
  z-index: 100;
  color: #ffffff;
  left: 10px;
  top: 2px;
  overflow: hidden;
}
.trafficFlowLow {
  padding: 0 !important;
  height: 100%;
}
.trafficFlowLow > div {
  position: relative;
  width: 100%;
  height: 350px;
  text-align: left;
}
.trafficFlowLow .spanTitle {
  font-size: 16px;
  font-weight: 800;
  color: #3ba7c9;
}
.trafficFlowLow .spanTitle {
  margin: 15px 0 15px 0;
  display: inline-block;
}
</style>
<style>
.backC .el-carousel__container {
  flex: 1;
}
.trafficCom th .cell {
  color: #c06d29;
}
.trafficCom .el-table .cell,
.trafficCom .el-tag {
  height: 100% !important;
  line-height: 31px;
}
.trafficFlowLowEarchHline .el-progress-bar__innerText {
  position: absolute;
  right: -35px;
  line-height: 1.5;
}
.trafficFlowLow .el-table td,
.trafficFlowLow .el-table th {
  height: 30px;
}
.trafficFlowLowEarchHline .el-progress-bar__outer,
.trafficFlowLowEarchHline .el-progress-bar__inner {
  border-radius: 0px;
  margin: 0 -7px;
}
.trafficFlowLowEarchHline .el-progress__text {
  position: absolute;
  right: 10px;
  color: #fff;
  font-size: 10px;
  line-height: 32px;
}
.trafficFlowLowEarchHline .el-progress-bar__outer {
  background-color: rgba(0, 169, 158, 0.1);
  margin: 5px;
}
.trafficFlowLowEarchHline .el-progress-bar {
  margin-right: 0px;
  padding-right: 0px;
}
</style>

<script>
import investigationState from "../../JSON/investigationState";
import store from "../../public/store/store";
import { setTimeout } from "timers";
export default {
  name: "trafficFlowLow",
  props: ["pageStatus"],
  data() {
    return {
      arrowDirection: "  》 ",
      // 正在请求数据，请等待
      trafficFlowLowEarchLineShow: false,
      tableDataY: [],
      dataY: [],
      // 区域延时排行榜
      tableDataP: [],
      dataP: [],
      // 路段延时排行榜
      tableDataL: [],
      dataT: [],
      // 路口拥堵排行榜
      tableDataT: [],
      dataT: [],
      // 路口失衡排行榜
      tableDataF: [],
      dataF: [],
      // 定时器
      time: "",
      // 三分钟刷新定时器
      timeSan: "",
      dom: "",
      hoverP: {}
    };
  },

  methods: {
    filter(val) {
      val = val;
      return val;
    },
    topchange(next, end) {
      
      console.log(next, end);
      // this.dom = 565;
      if (end == 1) {
        this.dataP = this.tableDataP;
        this.tableDataP = [];
        setTimeout(() => {
          this.tableDataP = this.dataP;
        });
        this.dataT = this.tableDataT;
        this.tableDataT = [];
        setTimeout(() => {
          this.tableDataT = this.dataT;
        });
      } else if (end == 2) {
        this.dataL = this.tableDataL;
        this.tableDataL = [];
        setTimeout(() => {
          this.tableDataL = this.dataL;
        });
        this.dataF = this.tableDataF;
        this.tableDataF = [];
        setTimeout(() => {
          this.tableDataF = this.dataF;
        });
      } else if (end == 3) {
        this.dataT = this.tableDataT;
        this.tableDataT = [];
        setTimeout(() => {
          this.tableDataT = this.dataT;
        });
        this.dataL = this.tableDataL;
        this.tableDataL = [];
        setTimeout(() => {
          this.tableDataL = this.dataL;
        });
      } else if (end == 0) {
        this.dataF = this.tableDataF;
        this.tableDataF = [];
        setTimeout(() => {
          this.tableDataF = this.dataF;
        });
        this.dataL = this.tableDataL;
        this.tableDataL = [];
        setTimeout(() => {
          this.tableDataL = this.dataL;
        });
      }

      // let aa =  document.getElementsByClassName("hover")

      // // this.dom =this.$refs.table.bodyWrapper
      // this.dom.addEventListener('scroll', () => {
      // // 滚动距离
      // let scrollTop = this.dom.scrollTop
      // // 变量windowHeight是可视区的高度
      // let windowHeight = this.dom.clientHeight || this.dom.clientHeight
      // // 变量scrollHeight是滚动条的总高度
      // let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
      // })
      // .tipsTrafficFlowLow.scrollTop =0
      // this.$refs.table.bodyWrapper.scrollTop =0;
      // aa=0;
      // console.log(aa)
      // console.log(bb)
      // document.getElementById("ccc").offsetTop =0
    },

    async earchEvent(val) {
      this.trafficFlowLowEarchLineShow = false;
      let series = [];
      let dataZoom = [];
      let distictList = [
		  /* edited by brandy */
        { name: "淤溪镇", color: "#8363f9", data: [] },
        { name: "溱潼镇", color: "#04bbff", data: [] },
        { name: "沈高镇", color: "#0451ff", data: [] },
        { name: "张甸镇", color: "#ff8604", data: [] },
        { name: "顾高镇", color: "#00d591", data: [] },
        { name: "大土仑镇", color: "#58a92c", data: [] },
        { name: "俞垛镇", color: "#c6c845", data: [] },
        { name: "白米镇", color: "#bf2929", data: [] }
      ];
      let Datekey = new Date().getTime();
      let jgTime = 0;
      let todyZore = new Date(
        this.$filter.formatDateTimeDay(Datekey) + " 00:00:00"
      );
      let nowDate = new Date(
        this.$filter.formatDateTimeHourse(Datekey) + ":00:00"
      );
      jgTime = (nowDate - todyZore) / 3600000;
      store.commit("statuLoadingState", true);
      let everTime = Number(todyZore) + 3600000 * i;
      let timestamp4 = new Date(everTime);
      let currentdate = this.$tools.setTimeUse(new Date(everTime));
          let roads1 = investigationState.areaTPI.data;
        //   roads1.map((item, id) => {
              
              let todyZores = new Date(
                this.$filter.formatDateTimeDay(Datekey) + " 00:00:00"
              );
                let data = roads1;
                // for (let (j) in distictList) {
                    distictList.map((res,id)=>{

                    let value = data.find(
                        t => t.districtRegionId === res.name
                  );
                  if (value) {
                      value.districtTpi.map((val,id)=>{
                                              let everTime1 = Number(todyZores) + 3600000 * id;
                    let thisTime = this.$filter.formatDateTimeHMS(everTime1);
                          res.data[id] = [
                            thisTime,
                            val.toFixed(2)
                          ];
                      })
                    // console.log(everTime)
                  } else {
                    // this.$showSimpleMessage("区域运行指数" + distictList[j].name + thisTime + "数据未返回,默认数据为0", "error");
                    // distictList[j].data[i] = [thisTime, "0.00"]
                  }
                })
        //   });
      for (let i in distictList) {
        series.push({
          name: distictList[i].name,
          type: "line",
          data: distictList[i].data,
          smooth: false,
          itemStyle: {
            color: distictList[i].color
          }
        });
        if (i === 0) {
          series[i].xAxisIndex = 1;
        }
        dataZoom.push({
          show: true,
          type: "inside",
          // filterMode: "empty",
          xAxisIndex: 0
          // yAxisIndex: 0
        });
      }
      if (distictList.length === 0) {
        this.$showSimpleMessage("区域运行指数数据为空", "error");
        return;
      }
      store.commit("statuLoadingState", false);
      this.time = setInterval(() => {
        this.trafficFlowLowEarchLineShow = false;
        if (series.length > 0 && dataZoom.length > 0) {
          this.trafficFlowLowEarchLineShow = true;
          this.getEarch(series, dataZoom, 0);
          clearInterval(this.time);
        }
      }, 5000);
    },
    getEarch(series, dataZoom, k) {
      let nameList = ["区域交通运行指数", "日拥堵指数"];
      let naturalOption1 = {
        grid: {
          top: "100px",
          left: "3%",
          right: "2%",
          bottom: "3%",
          width: "90%",
          containLabel: true
        },
        title: {
          text: nameList[k],
          left: 0,
          textStyle: {
            color: "#3ba7c9",
            fontSize: 16
          }
        },
        legend: {
          type: "scroll",
          width: "90%",
          right: 0,
          top: "50px",
          orient: "horizontal",
          padding: [0, 20, 0, 0],
          textStyle: {
            color: "#ffffff",
            fontSize: "14px",
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
          icon: "circle",
          itemWidth: 15
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            boundaryGap: false,
            axisLine: {
              onZero: true,
              lineStyle: {
                color: "rgb(44, 248, 255)"
              }
            },
            nameTextStyle: {
              color: "rgb(44, 248, 255)"
            },
            nameLocation: "start"
          }
        ],
        tooltip: {
          show: true,
          axisPointer: {
            type: "cross",
            label: {
              color: "#239892",
              backgroundColor: "#ffffff"
            }
          }
          // textStyle: "#239892"
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              onZero: true,
              lineStyle: {
                color: "rgb(44, 248, 255)"
              }
            },
            nameLocation: "start",
            nameTextStyle: {
              color: "rgb(44, 248, 255)"
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#567195"],
                solid: "dashed"
              }
            }
          }
        ],
        dataZoom: dataZoom,
        series: series
      };
      if (k === 1) {
        let data = naturalOption1.series[0].data;
        let l = 0;
        for (let b in data) {
          if (data[b] !== "0") {
            l++;
          }
        }
        if (l === 0) {
          naturalOption1.yAxis[0].minInterval = 1;
        }
      }
      setTimeout(() => {
        let myNaturalChart = this.$echarts.init(
          document.getElementById("trafficFlowLowEarchLine" + k)
        );
        myNaturalChart.setOption(naturalOption1, true);
      });
    },
    chushi() {
      let todaty = this.$tools.getTimeInt(new Date());

      // this.$tools.setTimeUse(new Date()).substring(0, 8) + "000000";
      // 区域延时排行榜
    //   sjhAxios
    //     .post("sjh2/strategysupport/status/areadelay", { currentTime: todaty })
    //     .then(res => {
    //       if (res.data.data.length === 0) {
    //         this.$showSimpleMessage("区域延时排行榜数据返回为空", "error");
    //         return;
    //       }
          this.tableDataP = this.$filter.backFloat({
            list: investigationState.areadelay.data,
            num: 2,
            SpecialTreatment: { avgSpeed: 0 }
          });
          if (this.tableDataP.length < 8) {
            for (let i = 0; i < 8 - this.tableDataP.length; i++) {
              this.tableDataP.push({
                avgSpeed: "——",
                delayValue: "——",
                districtRegionId: "——",
                rank: "——"
              });
            }
          }
        // })
        // .catch(error => {
        //   // this.$showSimpleMessage("未接入后台数据", "error");
        // });
      // 路段延时排行榜
    //   sjhAxios
    //     .post("sjh2/strategysupport/status/roaddelay", { currentTime: todaty })
    //     .then(res => {
    //       if (res.data.data.length === 0) {
    //         this.$showSimpleMessage("路段延时排行榜数据返回为空", "error");
    //         return;
    //       }
          this.tableDataL = this.$filter.backFloat({
            list: investigationState.roaddelay.data,

            SpecialTreatment: { avgSpeed: 0, delayValue: 2 }
          });
          for (let j in this.tableDataL) {
            this.tableDataL[j].roadName1 = this.tableDataL[j].fromSpottingName;
            this.tableDataL[j].roadName2 = this.tableDataL[j].toSpottingName;
          }
        // })
        // .catch(error => {
        //   // this.$showSimpleMessage("未接入后台数据", "error");
        // });
      // 路口拥堵排行榜
    //   sjhAxios
    //     .post("sjh2/strategysupport/status/crossingTPIrank", {
    //       currentTime: todaty
    //     })
    //     .then(res => {
    //       if (res.data.data.length === 0) {
    //         this.$showSimpleMessage("路口拥堵排行榜数据返回为空", "error");
    //         return;
    //       }
          this.tableDataT = this.$filter.backFloat({
            list: investigationState.crossingTPIrank.data,
            SpecialTreatment: { crossingTPI: 2 }
          });
        // })
        // .catch(error => {
        //   // this.$showSimpleMessage("未接入后台数据", "error");
        // });
      // 路口失衡排行榜
    //   sjhAxios
    //     .post("sjh2/strategysupport/status/crossingimbalance", {
    //       currentTime: todaty
    //     })
    //     .then(res => {
    //       if (res.data.data.length === 0) {
    //         this.$showSimpleMessage("路口失衡排行榜数据返回为空", "error");
    //         return;
    //       }
          this.tableDataF = this.$filter.backFloat({
            list: investigationState.crossingimbalance.data,
            SpecialTreatment: { crossingImbalance: 2 }
          });
        // })
        // .catch(error => {
        //   // this.$showSimpleMessage("未接入后台数据", "error");
        // });
    },
    handleScroll() {
      let aaa = document.getElementsByClassName("el-popover");
      for (let i = 0; i <= aaa.length; i++) {
        let a = aaa[i];
        a.style.zIndex = -1;
      }
    },

    // 图表定时
    timeJGSan(val) {
      this.timeSan = setInterval(() => {
        this.earchEvent(val);
        this.chushi();
      }, 180000);
    },
    // 隐藏
    hideHis() {
      var dom = document.getElementsByClassName("out")[0];
      let claN = dom.className;
      if (claN.includes("hide")) {
        dom.className = "out trafficCom showss";
        this.arrowDirection = "  》 ";
      } else {
        dom.className = "out trafficCom hide";
        this.arrowDirection = " 《  ";
      }
    }
  },
  mounted() {
    this.chushi();
    this.earchEvent(this.pageStatus);
    this.timeJGSan(this.pageStatus);
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function() {
    clearInterval(this.timeSan);
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    pageStatus: function(val) {
      clearInterval(this.timeSan);
      this.earchEvent(val);
      this.timeJGSan(val);
    }
  }
};
</script>

