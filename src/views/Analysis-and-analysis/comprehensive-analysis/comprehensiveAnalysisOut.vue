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
import { Loading } from 'element-ui';
import html2canvas from "html2canvas";
import saveAs from "save-as";
export default {
  name: "SubjectPortrait",
  data() {
    return {
      tablevalue: [],
      tcmiqoq: [],
      rankqoq: [],
      area: [],
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
      eTimer: ""
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
      let time = this.$tools.nowTime();
      let gis = document.getElementsByClassName("maintwo")[0];
      html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(canvas.msToBlob(), "综合分析" + time + ".png");
        } else {
          canvas.toBlob(function (blob) { saveAs(blob, "综合分析" + time + ".png"); });
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
            text: '综合分析指数及环比', // 主标题
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
          top: 80,
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
        label: {
            show: true,
            position: "top",
            align: "center",
            formatter: function(value) {
                return "{a|指数环比:" + _this.tcmiqoq[value.dataIndex] + "}\n{b|" + "指数:" + value.data + "}";
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
      sjhAxios.post("sjh2/strategysupport/tcmi/area", params).then(res => {
        if (res.data.result === "failure") {
          this.$showSimpleMessage(res.data.message, "success");
        } else {
          let tablevalue = res.data.data;
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
        }
      });
    }
  },
  async mounted() {
    let _this = this;
    // 开始loading
    let mapLoading = Loading.service({
        lock: true,
        text: "正在整理所有视图，给您规划排版，请耐心等待...",
        spinner: "el-icon-loading",
    });
    let timer = this.$route.params.searchTimer;

    // 全区交通管理综合指数按条件查询
    let params = {
      startTime: this.sTimer,
      endTime: this.eTimer
    };
    if (timer) {
      params = timer;
    }
    sjhAxios.post("sjh2/strategysupport/tcmi/area", params).then(res => {
      if (res.data.result === "failure") {
        this.$showSimpleMessage(res.data.message, "success");
      } else {
        let tablevalue = res.data.data;
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
        this.$nextTick(() => {
            setTimeout(async() => {
                let time = this.$tools.nowTime();
                let gis = await document.getElementsByClassName("maintwo")[0];
                await html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function(canvas) {
                  if (navigator.msSaveBlob) {
                    mapLoading.close();
                    _this.$store.state.isExportParams = params;
                    _this.$store.state.isExport = true;
                    _this.$router.go(-1);
                    navigator.msSaveBlob(canvas.msToBlob(), "综合分析" + time + ".png");
                  } else {
                    canvas.toBlob(function(blob) {
                        mapLoading.close();
                        _this.$store.state.isExportParams = params;
                        _this.$store.state.isExport = true;
                        _this.$router.go(-1);
                        saveAs(blob, "综合分析" + time + ".png");
                    });
                  }
                });
            }, 2000);
        });
      }
    });
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