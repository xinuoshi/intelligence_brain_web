<style>
.trafficLowRight .el-carousel__container {
  flex: 1;
}
.borderClass {
  border-bottom: 0.1px solid #fff;
}
.backC2 > div > div > div {
  background: rgba(6, 21, 57, 0.8);
}
.backC2 > div > div:last-child {
  margin: 5px 0 40px;
}
.tableTraffivLow > div + div {
  margin-left: 5px;
}
#trafficFlowLowEarchLine {
  margin-right: 5px;
}
.barTitleTrafficLow {
  border: 1px solid #3ba7c9;
  padding: 2px 0px;
  margin-bottom: 10px;
  display: inline-block;
  width: 100px;
  text-align: center;
  cursor: pointer;
}
.barTitleTrafficLowActive {
  background: #3ba7c9;
  color: #fff;
}
.barTitleTrafficLowBox {
  text-align: left;
}
.titleBarBottomTrafficLow {
  text-align: left;
  padding: 3%;
  color: #3ba7c9 !important;
  font-size: 14px !important;
}
.trafficLowRight .el-carousel__button {
  opacity: 0.48;
  width: 10px;
  height: 10px;
  border-radius: 50px;
}
.backC2 .el-table__empty-block {
  background: #09183b;
}
.backC2 .el-table td,
.backC2 .el-table th {
  height: auto !important;
}
.backC2 .el-table .cell,
.heightClass1 .el-table .el-tag {
  vertical-align: middle;
}
.backC2 .el-table__body-wrapper,
.backC2 table,
.backC2 .el-table {
  height: 100%;
}
</style>


<template>
  <div class="backC2 flexColumn"
       style="box-sizing: border-box;padding: 10px 20px;background-color: rgba(3,8,37,0.85) !important;width:100%;height:100%;z-index:2">
    <ul class="barTitleTrafficLowBox">
      <li class="barTitleTrafficLow"
          :class="{barTitleTrafficLowActive:barTitleTrafficLowActive === index}"
          @click="barTitleTrafficLowActive = index,changDataType(item)"
          v-for="(item,index) in dataType"
          :key="index">{{item}}</li>
    </ul>
    <!-- <div class="flexColumn flexNum exportDownLow">
            <div class="flexNum  flexRow">
                <div style="flex:2;line-height: 4;text-align: left;padding-left: 10px;box-sizing: border-box;font-size: 14px;"  id="trafficFlowLowEarchLine">日均拥堵指数</div>
                <div class="flexNum borderClass" v-for="(item, index) in 3" :key="index" :id="'trafficFlowLowEarchPie'+parseInt(index+5)"></div>
            </div>
            <div class="flexNum  flexRow">
                <div class="flexNum borderClass" v-for="(item, index) in 5" :key="index" :id="'trafficFlowLowEarchPie'+index"></div>
            </div>
            <div class="flexRow" style="flex:1.5">
                <div class="flexNum flexColumn" v-for="(item, index) in peakList" :key="index">
                    <span class="titleBarBottomTrafficLow">{{item.name}}拥堵指数排行榜</span>
                    <div class="flexNum" style="position:relative;" >
                        <el-table :data="item.tableData" style="width:94% !important;margin-left:3%">
                            <el-table-column prop="Rank" label="排行" width="50"> </el-table-column>
                            <el-table-column prop="name" label="区域" width="80"> </el-table-column>
                            <el-table-column prop="seed" label="平均行驶速度(km/h)"> </el-table-column>
                            <el-table-column prop="TPI" label="拥堵指数" width="60"> </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
    </div>-->
    <div class="flexColumn flexNum">
      <div class="flexNum flexRow">
        <div style="flex:2;line-height: 4;text-align: left;padding-left: 10px;box-sizing: border-box;font-size: 14px;"
             id="trafficFlowLowEarchLine">日均拥堵指数</div>
        <el-carousel class="flexNum trafficLowRight flexColumn">
          <el-carousel-item class="flexNum"
                            v-for="(item, index) in distictListAll"
                            :key="index"
                            :id="'trafficFlowLowEarchPie'+index"></el-carousel-item>
        </el-carousel>
      </div>
      <div class="flexNum tableTraffivLow flexRow">
        <div class="flexNum flexColumn"
             v-for="(item, index) in peakList"
             :key="index">
          <span class="titleBarBottomTrafficLow">{{item.name}}拥堵指数排行榜</span>
          <div class="flexNum"
               style="position:relative;">
            <el-table :data="item.tableData"
                      style="width:94% !important;margin-left:3%">
              <el-table-column prop="Rank"
                               label="排行"
                               width="50"></el-table-column>
              <el-table-column prop="name"
                               label="区域"
                               width="80"></el-table-column>
              <el-table-column prop="seed"
                               label="平均行驶速度(km/h)"></el-table-column>
              <el-table-column prop="TPI"
                               label="拥堵指数"
                               width="60"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../public/store/store'
import mapGis from '../../JSON/map_gis'
export default {
  name: 'trafficFlowLow',
  props: ['pageStatus', 'mapLoading'],
  data() {
    return {
      barTitleTrafficLowActive: 0,
      dataType: ['工作日', '非工作日'],
      arrowDirection: '  》 ',
      // 高峰下拉框
      peakList: [
        {
          name: '早高峰',
          tableData: [],
          props: ['areaName', 'avgSpeedMorning', 'avgTPIMorning', 'morningRank']
        },
        {
          name: '晚高峰',
          tableData: [],
          props: ['areaName', 'avgSpeedEvening', 'avgTPIEvening', 'eveningRank']
        },
        {
          name: '高峰',
          tableData: [],
          props: ['areaName', 'highSpeed', 'highTPI', 'highRank']
        },
        {
          name: '日均',
          tableData: [],
          props: ['areaName', 'avgSpeed', 'avgTPI', 'todayRank']
        }
      ],
      // 定时器
      time: '',
      // 三分钟刷新定时器
      timeSan: '',
      // 所有区域下拉框
      distictListAll: this.$store.state.area
    }
  },
  methods: {
    filter(val) {
      val = val
      return val
    },
    changDataType(dataType) {
      this.$nextTick(() => {
        // 日均拥堵指数
        this.earchEvent(dataType)
        // 全区域几个区域日均交通构成
        this.getDIS(dataType)
        // 全区域及各区域高峰时段拥堵指数排行榜
        this.chushi(dataType)
      })
    },
    // 日均拥堵指数
    earchEvent(val, Rname) {
      let series = []
      let dataZoom = []
      if (mapGis.daylaw.data.length === 0) {
        this.$showSimpleMessage('日拥堵指数数据返回为空', 'error')
        return
      }
      if (mapGis.daylaw.length === 1) {
        this.$showSimpleMessage('日拥堵指数数据返回为空', 'error')
        this.getEarch(series, dataZoom, 1)
      }
      series.push(
        {
          name: '日均拥堵指数',
          type: 'line',
          itemStyle: {
            color: '#3d97be'
          },
          offset: 0,
          data: [],
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(4,187,255,1)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(4,187,255,0.2)' // 100% 处的颜色
                }
              ]
            }
          }
        },
        {
          name: '日均拥堵指数',
          type: 'bar',
          data: [],
          offset: 1,
          barWidth: 1,
          itemStyle: {
            color: '#3d97be'
          },
          label: {
            show: false,
            position: 'top',
            formatter: '{b}'
          },
          markLine: {
            data: [],
            label: {
              normal: {
                show: true,
                position: 'middle'
              }
            },
            lineStyle: {
              normal: {
                type: 'solid',
                color: '#3d97be'
              }
            }
          }
        }
      )
      dataZoom.push({
        show: true,
        type: 'inside',
        filterMode: 'empty',
        xAxisIndex: 0
      })
      let data2 = mapGis.daylaw.data
      let length = data2.length
      let m = ''
      let e = ''
      let serData = []
      let data = []
      for (let j = 0; j < 24; j++) {
        data.push({
          avgValue: 0,
          hour: j.toString(),
          mess: '日均拥堵指数' + j + '：00数据未返回，默认为0'
        })
        for (let i = 0; i < length; i++) {
          if (data2[i].hour === j.toString()) {
            data[j] = data2[i]
          }
          if (data2[i].morningHigh) {
            m = data2[i].morningHigh.split('-')
            e = data2[i].eveningHigh.split('-')
          }
        }
        if (data[j].mess) {
          // this.$showSimpleMessage(data[j].mess, "error");
        }
      }
      // m = ["1:00","2:00"]
      // e = ["3:30","4:30"]
      for (let i = 0; i < data.length; i++) {
        let hour = data[i].hour
        let avgValue = data[i].avgValue.toFixed(2)
        serData.push(avgValue)
        series[0].data.push([hour, avgValue])
        for (let kk = 0; kk < 2; kk++) {
          pushDxD(m[kk], '早高峰')
          pushDxD(e[kk], '晚高峰')
        }
        // 处理高峰数据
        function pushDxD(e_m, nameGF) {
          let k = e_m.length > 4 ? 2 : 1
          let e_mS = e_m.substring(0, k).toString()
          e_mS = e_mS === '24' ? '23' : e_mS
          if (e_mS === hour) {
            let e_mStr = e_m.toString()
            let emPoint = e_mStr.replace(':', '.').replace('.00', '')
            if (e_mStr !== hour + ':00') {
              let dataNext =
                i + 1 < 24 ? data[i + 1].avgValue : data[i].avgValue
              let value = ((data[i].avgValue + dataNext) / 2).toFixed(2)
              series[0].data.push([emPoint, value])
              series[1].data.push({
                name: nameGF,
                value: [emPoint]
              })
            } else {
              series[1].data.push({
                name: nameGF,
                value: [emPoint]
              })
            }
          }
        }
      }
      // 数据排序
      for (let i in series[0].data) {
        let valueD = series[0].data[i][0]
        if (valueD.length > 3) {
          let Lv = valueD.length - valueD.split('.')[1].length
          let point = valueD.substring(Lv, valueD.length)
          let replacePoint = (point / 60)
            .toString()
            .substring(2, (point / 60).length)
          series[0].data[i][0] = valueD.replace(point, replacePoint)
        }
      }
      for (let i in series[1].data) {
        let valueD = series[1].data[i].value[0]
        if (valueD.length > 3) {
          let Lv = valueD.length - valueD.split('.')[1].length
          let point = valueD.substring(Lv, valueD.length)
          let replacePoint = (point / 60)
            .toString()
            .substring(2, (point / 60).length)
          series[1].data[i].value[0] = valueD.replace(point, replacePoint)
        }
      }
      series[0].data = series[0].data.sort(function(a, b) {
        return a[0] - b[0]
      })
      let max =
        parseInt(
          serData.sort(function(a, b) {
            return b - a
          })[0]
        ) + 1
      max = parseInt(max) === 0 ? 1 : parseInt(max) + 1
      for (let mk in series[1].data) {
        series[1].data[mk].value[1] = max
      }
      series[1].markLine.data.push(
        [
          {
            name: '早高峰',
            xAxis: series[1].data[0].value[0],
            yAxis: max.toString(),
            symbol: 'arrow'
          },
          {
            xAxis: series[1].data[1].value[0],
            yAxis: max.toString(),
            symbol: 'arrow'
          }
        ],
        [
          {
            name: '晚高峰',
            xAxis: series[1].data[2].value[0],
            yAxis: max.toString(),
            symbol: 'arrow'
          },
          {
            xAxis: series[1].data[3].value[0],
            yAxis: max.toString(),
            symbol: 'arrow'
          }
        ]
      )

      this.$nextTick(() => {
        this.getEarch(series, dataZoom, 1)
      })
      if (Rname) {
        this.mapLoading.close()
        this.$emit('trafficLowLoading')
      }
    },
    // 日拥堵指数折现图
    getEarch(series, dataZoom, k) {
      let naturalOption1 = {
        grid: {
          top: '80px',
          left: '3%',
          right: '2%',
          bottom: '3%',
          width: '95%',
          containLabel: true
        },
        title: {
          text: '日均拥堵指数',
          left: '3%',
          top: '15px',
          textStyle: {
            color: '#3ba7c9',
            fontSize: 14
          }
        },
        legend: { show: false },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              onZero: true,
              lineStyle: {
                color: 'rgb(44, 248, 255)'
              }
            },
            min: 0,
            max: 24,
            axisLabel: {
              formatter: function(value, index) {
                var texts = ''
                if (value % 1 !== 0) {
                  let point = parseInt(value * 60 - parseInt(value) * 60)
                  texts = parseInt(value) + ':' + point
                } else {
                  texts = value + ':00'
                }
                return texts
              }
            },
            minInterval: 0.1,
            maxInterval: 1,
            nameLocation: 'start',
            nameTextStyle: {
              color: 'rgb(44, 248, 255)'
            },
            splitLine: {
              show: false,
              interval: 1,
              lineStyle: {
                color: ['#567195'],
                solid: 'dashed'
              }
            }
          }
        ],
        tooltip: {
          show: true,
          formatter: function(params, ticket, callback) {
            var texts = ''
            let data = params.data
            let value = params.value
            if (
              data[0] % 1 !== 0 ||
              params.value[0] % 1 !== 0 ||
              params.data.coord
            ) {
              let point = ''
              if (value) {
                point = parseInt(value[0] * 60 - parseInt(value[0]) * 60)
                point = point === 0 ? '00' : point
                texts = parseInt(value[0]) + ':' + point + '指数' + value[1]
              } else {
                if (params.data.coord[0] % 1 !== 0) {
                  point = parseInt(
                    params.data.coord[0] * 60 -
                      parseInt(params.data.coord[0]) * 60
                  )
                  point = point === 0 ? '00' : point
                  texts =
                    parseInt(params.data.coord[0]) +
                    ':' +
                    point +
                    '指数' +
                    params.data.coord[1]
                } else {
                  point = parseInt(
                    data.coord[0] * 60 - parseInt(data.coord[0]) * 60
                  )
                  point = point === 0 ? '00' : point
                  texts =
                    parseInt(data.coord[0]) +
                    ':' +
                    point +
                    '指数' +
                    data.coord[1]
                }
              }
            } else {
              texts = data[0] + ':00 指数' + data[1]
            }
            return texts
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              onZero: true,
              lineStyle: {
                color: 'rgb(44, 248, 255)'
              }
            },
            nameLocation: 'start',
            nameTextStyle: {
              color: 'rgb(44, 248, 255)'
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ['#567195'],
                solid: 'dashed'
              }
            }
          }
        ],
        dataZoom: dataZoom,
        series: series
      }
      setTimeout(() => {
        let myNaturalChart = this.$echarts.init(
          document.getElementById('trafficFlowLowEarchLine')
        )
        myNaturalChart.setOption(naturalOption1, true)
      })
    },
    // 全区域及各区域高峰时段拥堵指数排行榜
    chushi(val) {
      let data = mapGis.heightlaw.data
      if (data.length === 0) {
        this.$showSimpleMessage(
          '全区域及各区域高峰时段拥堵指数排行榜数据返回为空',
          'error'
        )
        return
      }
      let list = Object.keys(data)
      for (let j in this.peakList) {
        let val = this.peakList[j]
        val.tableData = []
        let length = list.length > 7 ? list.length : 8
        for (let i = 0; i < length; i++) {
          if (list[i]) {
            if (list[i] !== '津南区') {
              let dataI = data[list[i]]
              val.tableData.push({
                name: list[i],
                seed: dataI[val.props[1]]
                  ? dataI[val.props[1]].toFixed(0)
                  : '——',
                TPI: dataI[val.props[2]]
                  ? dataI[val.props[2]].toFixed(2)
                  : '——',
                Rank: dataI[val.props[3]] ? dataI[val.props[3]] : '——'
              })
            }
          } else {
            val.tableData.push({
              name: '——',
              seed: '——',
              TPI: '——',
              Rank: '——'
            })
          }
        }
        val.tableData.sort(function(a, b) {
          return a.Rank - b.Rank
        })
      }
      this.mapLoading.close()
      this.$emit('trafficLowLoading')
    },
    // 全区域几个区域日均交通构成
    getDIS(val) {
      if (mapGis.rule.data.length === 0) {
        this.$showSimpleMessage(
          '全区域几个区域日均交通构成数据返回为空',
          'error'
        )
        return
      }
      for (let i in mapGis.rule.data) {
        let distictValue = mapGis.rule.data[i]
        let data = []
        data.push(
          {
            value: distictValue.arriveTrafficFlow,
            name: '到达交通比例',
            itemStyle: {
              color: '#c0a020'
            }
          },
          {
            value: distictValue.leaveTrafficFlow,
            name: '驶离交通比例',
            itemStyle: {
              color: '#206fc0'
            }
          },
          {
            value: distictValue.interTrafficFlow,
            name: '内部交通比例',
            itemStyle: {
              color: '#20c0be'
            }
          },
          {
            value: distictValue.transitTrafficFlow,
            name: '过境交通比例',
            itemStyle: {
              color: '#00c645'
            }
          }
        )
        let naturalOption = {
          title: {
            text: distictValue.areaId + '日均交通构成',
            top: '15px',
            left: '3%',
            textStyle: {
              color: '#3ba7c9',
              fontSize: 14
            }
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b} :<br> {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            top: '20%',
            width: '90%',
            textStyle: {
              color: 'rgb(44, 248, 255)',
              fontSize: 14
            },
            data: [
              {
                name: '到达交通比例',
                textStyle: {
                  color: '#c0a020'
                }
              },
              {
                name: '驶离交通比例',
                textStyle: {
                  color: '#206fc0'
                }
              },
              {
                name: '内部交通比例',
                textStyle: {
                  color: '#20c0be'
                }
              },
              {
                name: '过境交通比例',
                textStyle: {
                  color: '#00c645'
                }
              }
            ],
            orient: 'horizontal',
            inactiveColor: '#ccc',
            selectedMode: 'multiple',
            pageIconColor: '#ffffff'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              center: ['50%', '60%'],
              data: data,
              label: {
                normal: {
                  formatter: '{b}\n{c}({d}%)'
                }
              },
              labelLine: {
                length: 0,
                length2: 10
              }
            }
          ]
        }
        // if ($(".exportDownLow")){
        //     naturalOption.tooltip.show = false;
        //     naturalOption.legend.show = false;
        //     naturalOption.series[0].radius = "65%";
        //     naturalOption.series[0].center = ["50%","50%"];
        // }
        let myNaturalChart1 = this.$echarts.init(
          document.getElementById('trafficFlowLowEarchPie' + i)
        )
        myNaturalChart1.setOption(naturalOption)
      }
    },
    // 图表定时
    timeJGSan(val) {
      this.timeSan = setInterval(() => {
        this.earchEvent(this.dataType[this.barTitleTrafficLowActive], 'ti')
      }, 180000)
    },
    // 隐藏
    hideHis() {
      var dom = document.getElementsByClassName('out')[0]
      let claN = dom.className
      if (claN.includes('hide')) {
        dom.className = 'out trafficCom showss'
        this.arrowDirection = '  》 '
      } else {
        dom.className = 'out trafficCom hide'
        this.arrowDirection = ' 《  '
      }
    }
  },
  mounted() {
    this.changDataType('工作日')
    this.timeJGSan(this.pageStatus)
  },
  beforeDestroy: function() {
    clearInterval(this.timeSan)
  }
}
</script>
