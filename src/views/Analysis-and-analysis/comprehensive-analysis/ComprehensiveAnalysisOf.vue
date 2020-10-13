<template>
  <!-- 综合分析 -->
  <div class="maincss" style="position:relative">
    <div style="height:85vh;overflow: auto;">
        <SearchPage
          slot="searchBoxBar"
          class="search flexNum"
          ref="searchPage"
          :searchName="searchName"
          @searchEvent="searchEvent"
          style="margin-left:15px;"
        ></SearchPage>
          <bt
            ref="bt"
            :buttonList="UnitTopButton"
            @operation="operation"
            style="right:15px;position:absolute;top:0;"
          ></bt>
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
import html2canvas from "html2canvas";
import saveAs from "save-as";
import trafficComposition from "../../../JSON/trafficComposition";
export default {
  name: "SubjectPortrait",
  data() {
    return {
      tablevalue: [],
      tcmiqoq: [],
      rankqoq: [],
      area: [],
      // 定时器刷新
      time:"",
      // 定时器时间传参
      timeBiography:{},
      tcmi: [],
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
      sTimer: "",
      eTimer: "",
      // 搜索回调时间
      searchTimer: ""
    };
  },
  methods: {
    // 搜索回调
    searchEvent(payload) {
      // console.log(payload)
      if (payload.startTime === undefined || payload.endTime === undefined) {
        this.$showSimpleMessage("请选择正确的起止时间！", "error");
        return;
      }
      let timer = {
        startTime: this.$tools.setTimeUse(new Date(payload.startTime)),
        endTime: this.$tools.setTimeUse(new Date(payload.endTime))
      };
      this.searchTimer = "";
      this.searchTimer = this.$tools.deepCopy(timer);
      
      this.getTcmi(timer);
    },
    // 按钮组件回调
    operation(data) {
      let args = this.UnitTopButton[data.index].functionKeyName.split(":");
      let fn = eval(`this.${args.shift()}`);
      fn.apply(this, args);
    },
    // 导出功能
    DerivedTables() {
      this.$router.push({
        name: "综合分析导出",
        params: {
            searchTimer: this.searchTimer
        }
      });
    },
    // 绘制图形
    Columns1() {
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        legend: {
            show:false,
          type: "plain",
          top: 20,
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
          top: 40,
          right: 20,
          bottom: 60
        }, // 整体位置
        xAxis: {
          data: this.area,
          nameRotate: 50,
          axisLine: {
            lineStyle: {
              color: "#147a86"
            }
          }, // x轴样式
          splitLine: {
              lineStyle:{
                  color: "#2c3459"
              }
          },
          axisLabel:{
              fontSize: 16,
              margin: 20
          }
        },
        yAxis: [
          {
            type: "value",
            minInterval: 0,
            min: 0,
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
        ],
        tooltip: {
          trigger: 'axis',
          show: true
        },
        series: [
          {
            name: "交通管理综合指数环比",
            type: "line",
            symbol: "none",
            data: this.tcmiqoq,
            color: "rgb(0,0,0,0)"
          },
          {
            name: "交通管理综合指数",
            type: "bar",
            barWidth: 50,
            data: this.tcmi,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#0cf0e4"
                  },
                  {
                    offset: 1,
                    color: "#0891d7"
                  }
                ])
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    // 全区交通管理综合指数按条件查询
    getTcmi(data) {
      let params = {
        startTime: this.sTimer,
        endTime: this.eTimer
      };
      if (data) {
        params = data;
      }
      this.timeBiography = params
    //   sjhAxios.post("sjh2/strategysupport/tcmi/area", params).then(res => {
    //     if (res.data.result === "failure") {
    //       this.$showSimpleMessage(res.area.message, "success");
    //     } else {
          let tablevalue = trafficComposition.area.data;
          // 指数环比
          let tcmiqoq = [];
          // 排名环比
          let rankqoq = [];
          // 指数
          let tcmi = [];
          let area = [];
          let length = tablevalue.length;
          for (let i = 1; i < length + 1; i++) {
            let result = tablevalue.find(t => t.rank === i);
            tcmiqoq.push(result.tcmiqoq.toFixed(2));
            rankqoq.push(result.rankqoq.toFixed(2));
            tcmi.push(result.tcmi.toFixed(2));
            area.push(result.area);
          };
          this.tablevalue = tablevalue;
          this.tcmiqoq = tcmiqoq;
          this.rankqoq = rankqoq;
          this.tcmi = tcmi;
          this.area = area;
          this.Columns1();
        // }
    //   });
    }
  },
  mounted() {
    if (this.$store.state.isExport) {
      
        this.searchName[0].time = new Date(this.$store.state.isExportParams.startTime.substring(0, 4) + "-" + this.$store.state.isExportParams.startTime.substring(4, 6) + "-" + this.$store.state.isExportParams.startTime.substring(6, 8) + " " + this.$store.state.isExportParams.startTime.substring(8, 10) + ":" + this.$store.state.isExportParams.startTime.substring(10, 12) + ":" + this.$store.state.isExportParams.startTime.substring(12, 14)).getTime();
        this.searchName[1].time = new Date(this.$store.state.isExportParams.endTime.substring(0, 4) + "-" + this.$store.state.isExportParams.endTime.substring(4, 6) + "-" + this.$store.state.isExportParams.endTime.substring(6, 8) + " " + this.$store.state.isExportParams.endTime.substring(8, 10) + ":" + this.$store.state.isExportParams.endTime.substring(10, 12) + ":" + this.$store.state.isExportParams.endTime.substring(12, 14)).getTime();
        this.getTcmi(this.$store.state.isExportParams);
        // 定时刷新图表
        this.time= setInterval(() => {
                      this.getTcmi(this.timeBiography);
                   },180000)
        this.$store.state.isExport = false;

    } else {
        this.getTcmi();
        // 定时刷新图表
        this.time= setInterval(() => {
                      this.getTcmi();
                   },180000)
    }
  },
  beforeDestroy (){
      clearInterval(this.time)
  },
  created() {
    let etimer = new Date().getTime();
    let stimer = etimer - (1000 * 60 * 60 * 24 * 7);
    this.searchName[0].time = stimer; this.searchName[1].time = etimer;
    this.sTimer = this.$tools.setTimeUse(new Date(stimer));
    this.eTimer = this.$tools.setTimeUse(new Date(etimer));
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
  margin-bottom: 3%;
}
.maintwo {
    display: flex;
    height: 93% !important;
    margin-left: 15px;
    margin-right: 15px;
}
</style>