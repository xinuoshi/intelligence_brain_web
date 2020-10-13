<style>
.trafficView .el-input__inner {
  color: #3ba7c9;
}
.trafficCom .el-input__icon {
  line-height: 23px !important;
}
.fontS16 {
  font-size: 16px !important;
  color: rgb(44, 248, 255);
}
.leftSearchBox > div {
  margin-top: 1%;
  margin-bottom: 1%;
}
.trafficComtopSearch .leftSearchBox .el-input__inner {
  display: inline-block;
  height: 35px;
  margin-top: 5px;
}
#AIvideo {
    width: 100%;
    height: 100%;
}
.trafficComtopSearch .leftSearchBox .el-input__suffix {
  margin-top: 12px;
}
.trafficComtopSearch .leftSearchBox .el-input__prefix{
  margin-top: 12px;
}
.trafficComtopSearch .leftSearchBox .buttonTrafficCom {
  display: inline-block;
  height: 20px;
  margin-top: 5px;
}
.trafficViewsearch .el-input__inner{
  display: inline-block;
  height: 35px;
}
</style>

<template>
  <div style="display:flex;flex-direction:row;">
    <div
      class="leftButton"
      @click="hideHis"
      style="background-color: rgba(3, 8, 37, 0.9);color:#ffffff;"
    >》</div>
    <div class="trafficComBG flexColumn">
      <!-- 最顶部搜索 -->
      <div class="trafficComtopSearch flexRow">
        <div class="flexNum leftSearchBox">
          <el-select
            class="trafficComtopselect"
            v-model="roadPoints"
            placeholder="点位"
            @change="changePoint"
          >
            <el-option
            class="trafficComtopselectOption"
              v-for="(item, index) in point"
              :key="index"
              :label="item.intersectionName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-date-picker
            class="trafficTime"
            v-model="startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
          <el-date-picker
            class="trafficTime"
            v-model="endTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
          <div>
            <span
              class="buttonTrafficCom"
              @click="tiemDB()"
              style="color: #3ba7c9;width: 100%;display: inline-block;"
            >搜索</span>
          </div>
        </div>
        <div class="flexColumn" style="flex:0.7">
          <div class="flexNum" v-for="(item, index) in buttonList" :key="index">
            <span class="buttonName">{{item.name}}:</span>
            <div class="flexRow">
              <span
                :class="{buttonTrafficComActive: (itemUnder.buttonIs)}"
                @click="buttonEvent(itemUnder)"
                class="flexNum buttonTrafficCom"
                v-for="(itemUnder, i) in item.buttonName"
                :key="i"
              >{{itemUnder.title}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 折线图 -->
      <div class="trafficComLine">
        <div id="trafficComLineBody" v-show="data.length !== 0"></div>
        <div class="trafficComLineBodyMT" v-show="data.length === 0">
          正在请求数据，请等待
          <i class="el-icon-loading"></i>
        </div>
        <!-- <div class="trafficComLineBodyMT">
                请选择条件按钮
                <i class="el-icon-loading"></i>
        </div>-->
      </div>
      <!-- 视频区 -->
      <div class="trafficView flexNum flexColumn">
        <el-select class="trafficViewsearch" @change="aaa" v-model="equment" clearable placeholder="选择设备">
          <el-option
            v-for="(item, index) in equmentList"
            :key="index"
            :label="item.equipmentName"
            :value="item.rtspAddr"
          ></el-option>
        </el-select>
        <div class="trafficViewPart flexNum" id="video">
          <!-- <video
            v-if="equmentList.length > 0 && equment !== ''"
            class="video-js vjs-default-skin vjs-big-play-centered"
            autoplay="autoplay"
            loop="loop"
            :src="videoUrl"
            style="position: relative;"
            width="100%"
            height="100%"
          ></video> -->
         

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["point", "roadPoint"],
  data() {
    return {
      // 播放的直播
      video:"",
      aaaaa:true,
      timeSan: "",
      buttonList: [
        {
          name: "断面",
          buttonName: [
            { title: "东进口", functioName: "E", buttonIs: true },
            { title: "西进口", functioName: "W", buttonIs: true },
            { title: "南进口", functioName: "S", buttonIs: true },
            { title: "北进口", functioName: "N", buttonIs: true }
          ]
        },
        {
          name: "方向",
          buttonName: [
            { title: "直行", functioName: "S", buttonIs: false },
            { title: "掉头", functioName: "B", buttonIs: false },
            { title: "左转", functioName: "L", buttonIs: false },
            { title: "右转", functioName: "R", buttonIs: false }
          ]
        },
        {
          name: "车型",
          buttonName: [
            { title: "大型车", functioName: "B", buttonIs: false },
            { title: "中型车", functioName: "M", buttonIs: false },
            { title: "小型车", functioName: "S", buttonIs: false },
            { title: "非机动车", functioName: "N", buttonIs: false }
          ]
        }
      ],
      videoUrl: "",
      equment: "",
      equmentList: [],
      spottingNo: "",
      IstartTime: "",
      startTime: "",
      IendTime: "",
      endTime: "",
      // 路口交通定时器
      intersectionTime: "",
      data: [],
      xData: [],
      CarNumber: [],
      PolygonalChart: [],

      roadPoints: this.roadPoint
    };
  },
  methods: {
    aaa(val){
      let FatVideo = document.getElementById("video")
      let AIVideo = document.getElementById("AIvideo")
      if(AIVideo){
        this.$videojs(`#AIvideo`).dispose();
        FatVideo.innerHTML = ""
      }
      if(val==undefined){
        this.$showSimpleMessage("暂无该点位视频", "warning");
        }else{
          console.log(val)
        }
    },
    hideHis() {
      this.$emit("hideTrafficCom", false);
    },
    // 按钮点击数据变化，连带esrch数据变化
    buttonEvent(itemUnder) {
      this.video =""
      // this.$videojs();

      if (itemUnder) {
        itemUnder.buttonIs = !itemUnder.buttonIs;
      }
      let keyName = [[], [], []];
      let XdataName = [[], [], []];
      let kv = 0;
      for (let i in this.buttonList) {
        for (let j in this.buttonList[i].buttonName) {
          let buttonName = this.buttonList[i].buttonName[j];
          if (buttonName.buttonIs === true) {
            kv++;
            keyName[i][j] = buttonName.functioName;
            XdataName[i][j] = buttonName.title;
          }
        }
      }
      let valueEarch = [];
      if (this.data.length !== 0) {
        let XdataName2 = [];
        if (kv === 0) {
          for (let k in this.data) {
            for (let l in this.data[k]) {
              if ("all" === l) {
                console.log(this.data[k][l])
                valueEarch.push(this.data[k][l]);
              }
            }
          }
        } else {
          let valueOb = [];
          let section = keyName[0];
          if (section.length === 0) {
            section = ["a"];
          }
          let direction = keyName[1];
          if (direction.length === 0) {
            direction = ["a"];
          }
          let car = keyName[2];
          if (car.length === 0) {
            car = ["a"];
          }
          if (XdataName[0].length === 0) {
            XdataName[0] = [""];
          }
          if (XdataName[1].length === 0) {
            XdataName[1] = [""];
          }
          if (XdataName[2].length === 0) {
            XdataName[2] = [""];
          }
          XdataName[0].map(val => {
            XdataName[1].map(t => {
              XdataName[2].map(item => {
                XdataName2.push(val + "-" + t + "-" + item);
              });
            });
          });
          for (let i in XdataName2) {
            XdataName2[i] = XdataName2[i].replace("-", "").replace("-", "");
          }
          section.map(val => {
            direction.map(t => {
              car.map(item => {
                valueOb.push(val + "-" + t + "-" + item);
              });
            });
          });
          //  this.data.map((item,id)=>{
          //    let aaa = item.split(";")
          //    this.data.push(aaa)
          //  })

          for (let h in valueOb) {
            for (let k in this.data) {
              for (let l in this.data[k]) {
                // this.data.map((item,id)=>{
                if (valueOb[h] == l) {
                  // console.log(this.data);
                  // console.log(this.data[k]);
                  // console.log(this.data[k][l]);
                  if(typeof(this.data[k][l]) =="string"){

                    console.log(this.data[k][l])
                    console.log(this.data[k])
                    let aaa = this.data[k][l]
                    valueEarch.push(aaa.split(";"));
                  }else{
                    valueEarch.push(this.data[k][l])
                  }

                }

                // })
              }
            }
          }
        }
        if (XdataName2.length === 0) {
          XdataName2 = ["全部"];
        }
        this.earchEvent(valueEarch, XdataName2);
      }
    },
    // esrch数据
    earchEvent(valueEarch, name) {
      let series = [];
      let dataZoom = [];
      let symbolSize = 10;
      let colorList = [
        ["东进口直行大型车", "#ff0000"],
        ["东进口直行中型车", "#008500"],
        ["东进口直行小型车", "#ffd300"],
        ["东进口直行非机动车", "#613fcc"],
        ["东进口掉头大型车", "#a60000"],
        ["东进口掉头中型车", "#bfa730"],
        ["东进口掉头小型车", "#813fcc"],
        ["东进口掉头非机动车", "#00cc00"],
        ["东进口左转大型车", "#ff7373"],
        ["东进口左转中型车", "#a68900"],
        ["东进口左转小型车", "#3f8fcc"],
        ["东进口左转非机动车", "#269926"],
        ["东进口右转大型车", "#ff4040"],
        ["东进口右转中型车", "#ffe773"],
        ["东进口右转小型车", "#876ed7"],
        ["东进口右转非机动车", "#67e667"],
        ["西进口直行大型车", "#ff862d"],
        ["西进口直行中型车", "#1c9e91"],
        ["西进口直行小型车", "#7527ab"],
        ["西进口直行非机动车", "#fffb2d"],
        ["西进口掉头大型车", "#bf7b49"],
        ["西进口掉头中型车", "#bfbd49"],
        ["西进口掉头小型车", "#2d776f"],
        ["西进口掉头非机动车", "#623680"],
        ["西进口左转大型车", "#a64f0f"],
        ["西进口左转中型车", "#a6a30f"],
        ["西进口左转小型车", "#470d6f"],
        ["西进口左转非机动车", "#09675d"],
        ["西进口右转大型车", "#71cfc5"],
        ["西进口右转中型车", "#a359d5"],
        ["西进口右转小型车", "#ffbd8c"],
        ["西进口右转非机动车", "#e0df9b"],
        ["南进口直行大型车", "#2f82ff"],
        ["南进口直行中型车", "#ff1bba"],
        ["南进口直行小型车", "#c2ff1b"],
        ["南进口直行非机动车", "#ffab1b"],
        ["南进口掉头大型车", "#4a79bf"],
        ["南进口掉头中型车", "#bf3f98"],
        ["南进口掉头小型车", "#9dbf3f"],
        ["南进口掉头非机动车", "#c7c562"],
        ["南进口左转大型车", "#63a2ff"],
        ["南进口左转中型车", "#a60976"],
        ["南进口左转小型车", "#7ca609"],
        ["南进口左转非机动车", "#a66c09"],
        ["南进口右转大型车", "#ffd181"],
        ["南进口右转中型车", "#8dbbff"],
        ["南进口右转小型车", "#ff81d9"],
        ["南进口右转非机动车", "#bf903f"],
        ["北进口直行大型车", "#4dd7cc"],
        ["北进口直行中型车", "#a957dd"],
        ["北进口直行小型车", "#ffa25b"],
        ["北进口直行非机动车", "#fffd5b"],
        ["北进口掉头大型车", "#54a19c"],
        ["北进口掉头中型车", "#885aa6"],
        ["北进口掉头小型车", "#bfbe63"],
        ["北进口掉头非机动车", "#bf8b63"],
        ["北进口左转大型车", "#98ebe5"],
        ["北进口左转中型车", "#fffea5"],
        ["北进口左转小型车", "#cf9fee"],
        ["北进口左转非机动车", "#ffcca5"],
        ["北进口右转大型车", "#a6591e"],
        ["北进口右转中型车", "#a6a41e"],
        ["北进口右转小型车", "#631c8f"],
        ["北进口右转非机动车", "#198c83"]
      ];
      let startValue = "";
      let ValueId = this.xData.slice(-30, -29);
      ValueId.map(item => {
        startValue = item;
      });
      for (let i in valueEarch) {
        let kleng = name[i].length;
        let color = colorList.find(t => t[0].substring(0, kleng) === name[i]);
        series.push({
          name: name[i] ? name[i] : "全部",
          type: "line",
          smooth: false,
          data: valueEarch[i],
          connectNulls: true
          // yAxisIndex:[i]
        });
        if (color) {
          series[i].itemStyle = {
            color: color[1]
          };
        }
        dataZoom.push({
          show: true,
          type: "inside",
          startValue: startValue,
          filterMode: "empty"
        });
      }
      let naturalOption = {
        legend: {
          type: "scroll",
          width: "90%",
          right: 0,
          top: "20px",
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
        title: {
          text: "路口流量统计（辆）",
          textStyle: {
            color: "#3ba7c9",
            fontSize: 14
          }
        },
        tooltip: {
          show: true,
          axisPointer: {
            type: "cross"
            // label: {
            //   color: "#3ba7c9",
            //   backgroundColor: "#ffffff"
            // }
          },
          formatter: `{b}共{c}（辆）`
          // textStyle: "#3ba7c9"
        },
        grid: {
          top: "50px",
          left: "2.5%",
          right: 0,
          width: "95%",
          bottom: "0px",
          containLabel: true
        },
        yAxis: {
          type: "value",
          // splitNumber: 30,
          axisLine: {
            onZero: true,
            lineStyle: {
              color: "#3ba7c9"
            }
          },
          nameTextStyle: {
            color: "#3ba7c9"
          },
          splitLine: {
            show: true,
            interval: 1,
            lineStyle: {
              color: ["#184c5d"],
              solid: "dashed"
            }
          }
        },

        dataZoom: [
          {
            type: "slider",
            show: false,
            yAxisIndex: [0],

            left: "96%",
            bottom: "5%",
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          type: "category",
          minInterval: 10,
          // interval: 30,
          axisTick: {
            alignWithLabel: true
          },
          boundaryGap: false,
          axisLine: {
            onZero: true,
            lineStyle: {
              color: "#3ba7c9"
            }
          },
          nameTextStyle: {
            color: "#3ba7c9"
          },
          splitLine: {
            show: true,
            interval: 1,
            lineStyle: {
              color: ["#184c5d"],
              solid: "dashed"
            }
          },
          data: this.xData
        },
        dataZoom: dataZoom,
        series: series
      };
      // axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
      // naturalOption.xAxis[0].data.push(axisData);
      let myNaturalChart = this.$echarts.init(
        document.getElementById("trafficComLineBody")
      );
      myNaturalChart.setOption(naturalOption, true);
    },
    // 初始化数据选择，断面四个选中
    chushi() {
      for (let j in this.buttonList) {
        for (let i in this.buttonList[j].buttonName) {
          this.$set(
            this.buttonList[j].buttonName[i],
            "buttonIs",
            j === "0" ? true : false
          );
        }
      }
    },
    // 搜索点位
    searchPoint(val) {
      this.$emit("changeRoadPoint", val);
      // 
      if (val !== "") {
        axios
          .get("/intersection/" + val)
          .then(res => {
            this.spottingNo = res.data.data.id;
            this.equment = "";
            this.equmentList = [];
            let longitude = res.data.data.longitude;
            let latitude = res.data.data.latitude;
            let location = [
              {
                point: [longitude, latitude],
                id: res.data.data.id,
                intelligenceId: "110",
                move: true
              }
            ];
            // this.$emit("drawPoint", location);
            this.$emit("roadWatch", val);
          })
          .catch(error => {
            this.$showSimpleMessage(error, "error");
          });
      } else {
        this.$showSimpleMessage("请选择点位", "error");
      }
    },
    // 获取设备列表
    getElement(id) {
      this.equment = "";
      let FatVideo = document.getElementById("video")
      let AIVideo = document.getElementById("AIvideo")
      if(AIVideo){
        this.$videojs(`#AIvideo`).dispose();
        FatVideo.innerHTML = ""
      }
      
      // axios.get("equipment/?equipmentTypes=000004-1,000004-2,000003-3,000004-4,000004-3&intersectionId=" + id + "&orderBy=CONTROL_STATUS DESC,STATUS DESC,CREATED_TIME DESC").then((res) => {
      axios
        .get("equipment/?intersectionId=" + id)
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            this.equment = "";
            this.equmentList = []
            this.equmentList = data;
          } else {
            this.$showSimpleMessage(
              this.$store.state.codeStatus.find(t => t.code === res.data.code)
                .name,
              "error"
            );
          }
        })
        .catch(this.defaultHttpHandler);
    },
    EchartsWatch(spottingNo) {
      this.timeSan = spottingNo;
      this.data = [];
      if (spottingNo !== "") {
        // let changBig = [["B", 3], ["M", 1.2], ["S", 1], ["N", 0.4]];
        let changBig = [["B", 1], ["M", 1], ["S", 1], ["N", 1]];
        this.xData = [];
        this.data = [];
        if (
          this.IstartTime !== "" &&
          this.IendTime !== "" &&
          this.IstartTime !== null &&
          this.IendTime !== null
        ) {
          let start = this.$filter.timesFormat(this.IstartTime);
          // let end = this.$filter.timesFormat(this.IendTime);
          var end = new Date().valueOf();
          let timeJg = (end - start).toFixed(0);
          let length = 1;
          length = (timeJg / 180000).toFixed(0);
          timeJg = 180000;
          for (let i = 0; i < length; i++) {
            let everTime = start + timeJg * (i + 1);
            // let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            // this.xData.push(this.$filter.formatDateTimeHMS(everTime).substring(0, 5));
            this.xData.push(
              this.$filter.formatDateTimeHMS(everTime).substring(0, 5)
            );
          }
        } else {
          // 
          let Datekey = new Date().getTime();
          let todyZore = new Date(
            this.$filter.formatDateTimeDay(Datekey) + " 00:00:00"
          );
          let nowDate = new Date();
          this.IstartTime = todyZore;
          this.IendTime = nowDate;
          this.$showSimpleMessage("默认为当前日期凌晨到现在时间段", "success");
          let jgTime = ((nowDate - todyZore) / 180000).toFixed(0);
          for (let i = 0; i < jgTime; i++) {
            let everTime = this.$filter.timesFormat(todyZore) + 180000 * i;
            this.xData.push(
              this.$filter.formatDateTimeHMS(everTime).substring(0, 5)
            );
          }
        }
        this.startTime = "";
        this.endTime = "";
        axios
          .post(`/operations/getRealTimePage?spottingNo=${spottingNo}`)
          .then(res => {
            
            let obj = res.data.data;
            var arr = [];
            for (let i in obj) {
              let o = {};
              o[i] = obj[i];
              arr.push(o);
            }
            var reArr = arr.splice(0, 2);
            if (res.data.result === "failure" || res.data.message) {
              this.$showSimpleMessage("数据错误", "error");
              return false;
            } else {
              let aa = [];
              let valueCar = this.CarNumber;
              let data = this.cancelData();
              let resData = arr;
              this.data = arr;
              this.data.push(this.handelAllNumber(arr, changBig));
              data.map(value => {
                resData.map(rEver => {
                  let val = Object.keys(rEver)[0];
                  // let item = valueCar.find(t=>t===val)
                  // let aa= rEver.item
                  let list = [
                    val[0] + "-a-a",
                    "a-" + val[2] + "-a",
                    "a-a-" + val[4],
                    val[0] + "-" + val[2] + "-a",
                    "a-" + val[2] + "-" + val[4],
                    val[0] + "-a-" + val[4]
                  ];
                  list.map(list => {
                    if (Object.keys(value)[0] === list) {
                      let aa = rEver[val];
                      let ss = aa.split(";");
                      for (let j in ss) {
                        value[list][j] = value[list][j] ? value[list][j] : 0;
                        if (list[4] === "a") {
                          let chang = changBig.find(t => t[0] === val[4])[1];
                          value[list][j] = Math.round(
                            value[list][j] + ss[j] * chang * 1
                          );
                        } else {
                          value[list][j] = Math.round(
                            value[list][j] + ss[j] * 1
                          );
                        }
                      }
                    }
                  });
                });
                this.data.push(value);
              });
              let CarData = this.data;
              for (let k in CarData) {
                for (let l in CarData[k]) {
                  let str = typeof CarData[k][l];
                  if (str == "string") {
                    let aa = CarData[k][l].split(";");
                    for (let m in aa) {
                      let as = parseInt(aa[m]);
                      as = as.toFixed(2);
                    }
                  } else {
                    let aa = CarData[k][l];
                    for (let m in aa) {
                      let as = parseInt(aa[m]);
                      as = as.toFixed(2);
                    }
                  }
                }
              }
              if (this.data.length > 0) {
                this.buttonEvent();
                this.$store.commit("statuLoadingState", false);
              }
            }
          });
      }
    },

    // 获取图表走接口
    async getDataEarch(spottingNo) {
      if (spottingNo !== "") {
        let changBig = [["B", 3], ["M", 1.2], ["S", 1], ["N", 0.4]];
        // let changBig = [["B", 1], ["M", 1], ["S", 1], ["N", 1]];
        this.xData = [];
        this.data = [];
        if (
          this.startTime !== "" &&
          this.endTime !== "" &&
          this.startTime !== null &&
          this.endTime !== null
        ) {
          let start = this.$filter.timesFormat(this.startTime);
          let end = this.$filter.timesFormat(this.endTime);
          let timeJg = (end - start).toFixed(0);
          let length = 1;
          length = (timeJg / 180000).toFixed(0);
          timeJg = 180000;
          for (let i = 0; i < length; i++) {
            let everTime = start + timeJg * (i + 1);
            this.xData.push(
              this.$filter.formatDateTimeHMS(everTime).substring(0, 5)
            );
          }
        } else {
          let Datekey = new Date().getTime();
          let todyZore = new Date(
            this.$filter.formatDateTimeDay(Datekey) + " 00:00:00"
          );
          let nowDate = new Date();
          this.startTime = todyZore;
          this.endTime = nowDate;
          this.$showSimpleMessage("默认为当前日期凌晨到现在时间段", "success");
          let jgTime = ((nowDate - todyZore) / 180000).toFixed(0);
          for (let i = 0; i < jgTime; i++) {
            let everTime = this.$filter.timesFormat(todyZore) + 180000 * i;
            this.xData.push(
              this.$filter.formatDateTimeHMS(everTime).substring(0, 5)
            );
          }
        }
        let parm = {
          startTime: this.$tools.getTimeInt(this.startTime),
          endTime: this.$tools.getTimeInt(this.endTime),
          spottingNo: spottingNo
        };
        await sjhAxios
          .post("sjh2/strategysupport/trafficFlow/realTimeSelect", parm)
          .then(res => {
            if (res.data.result === "failure" || res.data.message) {
              this.$showSimpleMessage("数据错误", "error");
              return false;
            } else {
              let data = this.cancelData();
              let resData = res.data.data;
              this.data = res.data.data;
              this.data.push(this.handelAllNumber(res.data.data, changBig));
              // for(let i in this.data){
              //   let arry = Object.keys(this.data[i])[0];
              //   let aa = this.data[m][arry];
              //   let carN = aa.split(";");
              //   this.data[m][arry] = [...carN];
              // }
              data.map(value => {
                resData.map(rEver => {
                  let val = Object.keys(rEver)[0];
                  let list = [
                    val[0] + "-a-a",
                    "a-" + val[2] + "-a",
                    "a-a-" + val[4],
                    val[0] + "-" + val[2] + "-a",
                    "a-" + val[2] + "-" + val[4],
                    val[0] + "-a-" + val[4]
                  ];
                  list.map(list => {
                    
                    if (Object.keys(value)[0] === list) {
                      for (let j in rEver[val]) {
                        value[list][j] = value[list][j] ? value[list][j] : 0;
                        if (list[4] === "a") {
                          let chang = changBig.find(t => t[0] === val[4])[1];
                          value[list][j] =
                            value[list][j] + rEver[val][j] * chang * 1;
                        } else {
                          value[list][j] = value[list][j] + rEver[val][j] * 1;
                        }
                      }
                    }
                  });
                });
                this.data.push(value);
              });
              for (let k in this.data) {
                for (let l in this.data[k]) {
                  for (let m in this.data[k][l]) {
                    this.data[k][l][m] = this.data[k][l][m].toFixed(2);
                  }
                }
              }
              if (this.data.length > 0) {
                this.buttonEvent();
                this.$store.commit("statuLoadingState", false);
              }
            }
          })
          .catch(error => {
            // this.$showSimpleMessage(error, "error");
          });
      }
    },
    // 开始时间和结束时间大小判断，以及走接口获取数据
    tiemDB() {
      let startTime = this.startTime;
      let endTime = this.endTime;
      let nowTime = new Date().getTime();
      if (
        startTime !== null &&
        startTime !== "" &&
        startTime !== undefined &&
        endTime !== null &&
        endTime !== "" &&
        endTime !== undefined
      ) {
        startTime = this.$filter.timesFormat(startTime);
        endTime = this.$filter.timesFormat(endTime);
        if (endTime < startTime) {
          this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
          return false;
        } else if (endTime > nowTime) {
          this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
          return false;
        } else {
          // 接口走数据
          this.getDataEarch(this.spottingNo);
          this.getElement(this.spottingNo);
        }
      } else {
        if (startTime === null && endTime === null) {
          this.getDataEarch(this.spottingNo);
          this.getElement(this.spottingNo);
        }
      }
    },
    changePoint(val) {
      this.$emit("changeRoadPoint", val);
    },
    // 处理每次请求的数据,一条线的
    handelAllNumber(num, changBig) {
      let carNumbox = [];
      let carNum = [];
      for (let m in num) {
        let arry = Object.keys(num[m])[0];
        let mup = changBig.find(t => t[0] === arry[4])[1];
        let aa = num[m][arry];
        let carN = aa.split(";");
        this.PolygonalChart = [...carN];
        for (let k in carN) {
          let value = (parseInt(carN[k]) * mup).toFixed(1);
          if (m === "0") {
            carNum.push(value);
          } else {
            carNum[k] = parseInt(carNum[k]) + parseInt(value);
          }
        }
      }
      carNumbox["all"] = carNum;
      return carNumbox;
    },
    //处理数组
    aaaa(aaa){
      console.log(aaa)
      let FatVideo = document.getElementById("video")
      let AIVideo = document.getElementById("AIvideo")
      if(AIVideo){
        this.$videojs(`#AIvideo`).dispose();
        FatVideo.innerHTML = ""
      }
    },
    // 处理数据;
    cancelData() {
      let data = [];
      let section = ["E", "W", "S", "N"];
      let direction = ["-S-", "-B-", "-L-", "-R-"];
      let car = ["B", "M", "S", "N"];
      let valueOb = [[section, direction, car], [[], [], []]];
      let valueCar = [];
      section.map(val => {
        direction.map(t => {
          car.map(id => {
            valueCar.push(val + t + id);
          });
        });
      });
      this.CarNumber = valueCar;
      section.map(val => {
        direction.map(t => {
          valueOb[1][0].push(val + t);
        });
      });
      direction.map(t => {
        car.map(item => {
          valueOb[1][1].push(t + item);
        });
      });
      section.map(val => {
        car.map(item => {
          valueOb[1][2].push(val + item);
        });
      });
      for (let k in valueOb) {
        let addName = "a";
        for (let m in valueOb[k]) {
          for (let j in valueOb[k][m]) {
            let dataName = valueOb[k][m][j];
            for (let h = 0; h < 2 - k; h++) {
              switch (m) {
                case "0":
                  if (k === "0") {
                    dataName = dataName + "-" + addName;
                  } else {
                    dataName = dataName + addName;
                  }
                  break;
                case "1":
                  if (h === 1) {
                    dataName = dataName + addName;
                  } else {
                    dataName = addName + dataName;
                  }
                  break;
                case "2":
                  if (k === "0") {
                    dataName = addName + "-" + dataName;
                  } else {
                    dataName = dataName[0] + "-" + addName + "-" + dataName[1];
                  }
                  break;
              }
            }
            let name2 = {};
            name2[dataName] = [];
            data.push(name2);
          }
        }
      }
      return data;
    },
    timeJGSan() {
      // this.intersectionTime = setInterval(() => {
      //   this.EchartsWatch(this.timeSan);
      //   // },3000);
      //   // 
      // }, 180000);
    }
  },
  watch: {
    point: function(val) {},
    equment: function(val) {
        
      let video = "";
      let FatVideo = document.getElementById("video")
      FatVideo.innerHTML = `<video id="AIvideo" class="video-js  vjs-default-skin vjs-big-play-centered"></video>`
        setTimeout(() => {
                        video = this.$videojs(`#AIvideo`, {
                            controls: false,
                            height: 540,
                            width: 960,
                            loop:true,
                            controlBar: {
                                progressControl: false,
                                remainingTimeDisplay: false
                            },
                            autoplay: true,
                            preload: "auto",
                            sources: [
                                {
                                src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${val}`,
                                type: "video/mp4",
                                }
                            ],
                        });
                        this.video = video;
                    },200);    
      // 选择设备视频更改;
      // this.videoUrl = "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov";
      // 播放地址格式
    },
    roadPoints: function(val) {
      if (val) {
        this.searchPoint(val);
      }
    },
    spottingNo: function(val, old) {
      this.timeSan = val;
      this.chushi();
      this.EchartsWatch(val);
      this.getElement(val);

      if (val !== "" && old == "") {
        this.timeJGSan(val);
      } else {
        this.equment = "";
      }
    },
    roadPoint: function(val) {
      this.roadPoints = val;
    }
  },
  computed: {
    // "roadPoints": function () {
    //     return this.roadPoint;
    // }
  },
  // "aaaaa":{
  //    handler: function(){
  //     
  //     let AIVideo = document.getElementById("AIvideo")
  //     if(AIVideo){
  //       this.$videojs(`#AIvideo`).dispose();
  //       FatVideo.innerHTML = ""
  //     }
  //   }
  // },
  created() {},
  mounted() {
    this.getDataEarch(this.spottingNo);
  },
  beforeDestroy: function() {
    clearInterval(this.intersectionTime);
    this.intersectionTime = "";
    this.carTimer = "";
    
  }
};
</script>

