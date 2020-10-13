<template>
    <el-dialog :close-on-press-escape="false" append-to-body v-dialogDrag :visible.sync="dialogVisible" :before-close="handleClose" class="tems_dialog WireFrame" width="1400px">
        <div class="zGIS_page">
            <div class="tems_giso" id="tems_giso"></div>
            <div id="controlLayer" :style="{display: ifDisabled ? 'none' : 'block'}">
                <img class="Iconimg" v-for="(t, i) in icons" :key="i" :title="t.title" :src="t.url" @click="operation(t)">
            </div>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <!-- <div class="notesBottom">
                注：绿色为起始点，红色为终止点；
            </div> -->
            <div class="flexNum footer" style="text-align: center">
                <div v-if="title === '查看自定义情报'" class="tems_Button inportBtn" @click="handleClose()">关 闭</div>
                <div v-if="title !== '查看自定义情报'" class="tems_Button inportBtn" @click="handleClose()">取 消</div>
                <div v-if="title !== '查看自定义情报'" class="tems_Button exportBtn" @click="handleSubmit()">保 存</div>
            </div>
        </div>
    </el-dialog>
</template>
<style>
.zGIS_page {
  width: 96% !important;
  margin: 5px 2% !important;
  height: 550px !important;
  position: relative !important;
}
.zGIS_page #controlLayer {
  top: 0 !important;
  /* left: 540px !important; */
  left: 50% !important;
  transform: translateX(-50%);
  position: absolute;
  width: 100px;
  height: 35px;
  border: 1px solid #80f6f8;
  background-color: #000;
  opacity: 0.6;
  border-radius: 5px;
}
.zGIS_page #controlLayer:hover {
  top: 0 !important;
  /* left: 540px !important; */
  left: 50% !important;
  transform: translateX(-50%);
  position: absolute;
  width: 100px;
  height: 35px;
  border: 1px solid #80f6f8;
  background-color: #000;
  opacity: 0.6;
  border-radius: 5px;
}
</style>

<style scoped>
.WireFrame /deep/ .el-dialog__title {
  display: none;
}
.tems_giso {
  width: 100%;
  height: 100%;
}
.Iconimg {
  width: 25px;
  height: 25px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0px 12px -2px 12px;
}
.Iconimg:hover {
  cursor: pointer;
}
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}

.tooltip-measure {
  opacity: 1;
  font-weight: bold;
}

.tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}

.tooltip-measure:before,
.tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}

.tooltip-static:before {
  border-top-color: #ffcc33;
}
#length {
  color: red;
  font-weight: bold;
}
.ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 300px;
}
/* 时间公告 */
</style>

<script>
import ol from "openlayers";
import "openlayers/css/ol.css";
import saveAs from "save-as";
// 引入坐标转换
import coordtransform from "coordtransform";
// 引入gis初始化方法类集合
import GisClassMethod from "@/public/GisClassMethod";
// 导入图片
import drag from "@/assets/static/drag.png";
import Boxselection from "@/assets/static/Boxselection.png";
import sign from "@/assets/static/sign.png";
import measure from "@/assets/static/drowMapIco.png";
import Preservation from "@/assets/static/Preservation.png";
import Export from "@/assets/static/export.png";
import Fullscreen from "@/assets/static/Fullscreen.png";
import { setTimeout } from "timers";

export default {
    props: ["dialogVisible", "mapDialogPoint", "ifDisabled", "title"],
    model: {
        event: ["selectPoint", "LayermapDialog"]
    },
    data() {
        return {
            // mapCenter: [117.384925, 38.998398],
			mapCenter: [120.125347,32.540074],
            icons: [
                // { title: "选择区域", url: Boxselection, correspondingEvent: "selectionArea" },
                { title: "标记", url: sign, correspondingEvent: "markPointPosition" },
                // { title: "路段", url: measure, correspondingEvent: "mapRanging" },
                { title: "路段", url: measure, correspondingEvent: "drawArrowLine" },
                // { title: "保存", url: Preservation, correspondingEvent: "mapPreservation" },
                // { title: "导出", url: Export, correspondingEvent: "mapExport" },
                // { title: "全屏", url: Fullscreen, correspondingEvent: "fullScreen" }
            ],
            masking: true,
            // 全局的map地图
            mapGis: "",
            // 根据坐标描点层
            coordinateTracingPoint: "",
            ErrorData: [], // 坐标点集合
            // 地图控件
            controls: [],
            // 全局的draw
            draws: "",
            // 全局状态
            status: "",
            // 地图上点击的事件，元素
            eventFeature: [],
            // 点击的经纬度
            eventPoint: [],
            vector: "" // 全局添加的图层
        }
    },
    watch: {
        "dialogVisible": function (val, oldVal) {
            if (val) {
                setTimeout(() => {
                    let mapDialogPoint = [];
                    if (this.mapDialogPoint) {
                        mapDialogPoint = JSON.parse(this.mapDialogPoint);
                    }
                    // console.log(mapDialogPoint);
                    this.eventPoint = [...mapDialogPoint];
                    this.InitCarGis(mapDialogPoint);
                });
            } else {
                if (this.mapGis) {
                    if (this.vector) {
                        this.mapGis.removeLayer(this.vector);
                    }
                    if (this.coordinateTracingPoint) {
                        this.mapGis.removeLayer(this.coordinateTracingPoint);
                    }
                }
            }
        },
        "LayermapDialog": {
            immediate: true,
            handler: function(val) {
                if (val) {
                    // LayermapDialog为真时，把绘制的图层从地图上删除
                    if (this.vector) {
                        this.mapGis.removeLayer(this.vector);
                        this.vector = "";
                    }
                    if (this.coordinateTracingPoint) {
                        this.mapGis.removeLayer(this.coordinateTracingPoint);
                        this.coordinateTracingPoint = "";
                    }
                    this.eventPoint = [];
                    this.$emit("removeLayermapDialog");
                }
            }
        }
    },
    computed: {
        //
    },
    created() {
        //
    },
    mounted() {
        //
    },
    methods: {
        handleClose() {
            this.$emit("showMapDialog");
        },
        // 处理坐标点,用于在地图上标记警告点使用
        InitGisData(dataSource) {
            let data = [];
            for (let i = 0; i < dataSource.length; i++) {
                let point = [];
                point.push(dataSource[i].longitude, dataSource[i].latitude);
                data.push({
                    point: point, // 报警坐标
                    id: dataSource[i].id
                });
            }
            // 处理坐标点偏移问题
            // data.map(t => {
            //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
            // });
            return data;
        },
        // 获取坐标点数据
        getGISData(data) {
            this.ErrorData = [...data];
            let dataSource = this.InitGisData(this.ErrorData);
            if (data.length > 1) {
                this.Initarrowheadlayer(dataSource);
            } else {
                this.InitializationLayer(dataSource);
            }
        },
        // 中间函数调用对应函数
        operation(data) {
            let args = data.correspondingEvent.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 初始化地图
        InitCarGis(coordinate) {
            if (!this.mapGis) {
				//TODO map_gaode
                let Mapurl = "http://47.105.212.6:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
				// let Mapurl = "http://192.168.31.88:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
                let scaleLineControl = GisClassMethod.ScaleLineControl(); // 地图比例尺控件初始化
                let overviewMapControl = GisClassMethod.OverViewMapControl(Mapurl); // 地图鹰眼控件初始化
                let bottomMapLayer = GisClassMethod.BottomMapLayer(Mapurl); // 地图底图图层初始化
                let MapsArrs = [bottomMapLayer];
                this.mapGis = GisClassMethod.TotalLayer("tems_giso", this.mapCenter, 12, 11, 21, MapsArrs); // 地图总绘制初始化
                this.mapGis.addControl(scaleLineControl);
                this.mapGis.addControl(overviewMapControl); // 鹰眼，比例尺控件放进地图中
                // 地图的点击事件
                // this.mapGis.on("click", this.Mapclick);
            }
            // if (coordinate.length !== 0) {
            //     this.getGISData(coordinate); // 初始化数据
            // }
            this.getGISData(coordinate); // 初始化数据
        },
        // 初始化标点图层
        InitializationLayer(coordinate) {
            this.coordinateTracingPoint = GisClassMethod.CoordinateTracingPoint(coordinate); // 地图根据坐标描点层(不使用自定义图标代替)
            this.vector = this.coordinateTracingPoint;
            this.mapGis.addLayer(this.coordinateTracingPoint);
        },
        // 初始化箭头线图层
        Initarrowheadlayer(coordinate) {
            let vector = GisClassMethod.CoordinateLocus(coordinate);
            this.mapGis.addLayer(vector);
            this.vector = vector;
            let PiontDrawArrowLine = GisClassMethod.PiontDrawArrowLine(this.mapGis, vector); // 地图根据坐标描点层(不使用自定义图标代替)
            this.mapGis = PiontDrawArrowLine[0];
            this.vector = PiontDrawArrowLine[1];
        },
        // 标记点位
        markPointPosition() {
            // 标记点
            event.stopPropagation();
            this.status = "markPointPosition";
            this.mapGis.removeInteraction(this.draws);
            this.mapGis.removeLayer(this.vector);
            this.mapGis.removeLayer(this.coordinateTracingPoint);
            let SetupDraw = GisClassMethod.SetupDraw(this.mapGis);
            this.mapGis = SetupDraw[0];
            this.draws = SetupDraw[1];
            document.getElementsByClassName("zGIS_page")[0].onmousedown = function (evt) {
                if (this.status !== "markPointPosition") return;
                let markPointPositionabc = false;
                if (evt.which === 1) {
                    document.getElementsByClassName("zGIS_page")[0].onmousemove = function () {
                        if (this.status !== "markPointPosition") return;
                        markPointPositionabc = true;
                    }
                    document.getElementsByClassName("zGIS_page")[0].onmouseup = function (evnt) {
                        if (this.status !== "markPointPosition") return;
                        document.getElementsByClassName("zGIS_page")[0].removeEventListener("onmousemove", function() {}, false);
                        if (!markPointPositionabc) {
                            let ids = new Date().getTime();
                            this.ids = ids;
                            let tooltipCoord = ol.proj.toLonLat(this.mapGis.getEventCoordinate(evnt));
                            let eventPoint = { id: this.ids, point: tooltipCoord };
                            let markPointPosition = GisClassMethod.MarkPointPosition(this.mapGis, eventPoint);
                            this.mapGis = markPointPosition[0];
                            this.vector = markPointPosition[1];
                            this.eventPoint = [{ longitude: tooltipCoord[0], latitude: tooltipCoord[1] }];
                        } else {
                            markPointPositionabc = false;
                        }
                    }.bind(this);
                }
            }.bind(this);
            this.draws.on("drawend", (evt) => {
                setTimeout(() => {
                    this.status = "";
                    this.mapGis.removeInteraction(this.draws);
                }, 100);
            });
        },
        // 地图画线(带箭头线区分方向)----绘制箭头线
        drawArrowLine() {
            event.stopPropagation();
            this.status = "drawArrowLine";
            this.eventPoint = [];
            this.mapGis.removeInteraction(this.draws);
            this.mapGis.removeLayer(this.vector);
            this.mapGis.removeLayer(this.coordinateTracingPoint);
            let drawArrowLine = GisClassMethod.DrawArrowLine(this.mapGis);
            this.mapGis = drawArrowLine[0];
            this.draws = drawArrowLine[1];
            this.vector = drawArrowLine[2];
            // document.getElementsByClassName("zGIS_page")[0].onmousedown = function (evt) {
            //     if (this.status !== "drawArrowLine") return;
            //     let drawArrowLineabc = false;
            //     if (evt.which === 1) {
            //         document.getElementsByClassName("zGIS_page")[0].onmousemove = function () {
            //             drawArrowLineabc = true;
            //         }
            //         document.getElementsByClassName("zGIS_page")[0].onmouseup = function (evnt) {
            //             // document.getElementsByClassName("zGIS_page")[0].removeEventListener("onmousemove", function() {}, false);
            //             if (!drawArrowLineabc) {
            //                 let tooltipCoord = ol.proj.toLonLat(this.mapGis.getEventCoordinate(evnt));
            //                 // this.eventPoint = [...this.eventPoint, { longitude: tooltipCoord[0], latitude: tooltipCoord[1] }];
            //                 this.eventPoint.push({ longitude: tooltipCoord[0], latitude: tooltipCoord[1] });
            //                 console.log(this.eventPoint)
            //             } else {
            //                  drawArrowLineabc = false;
            //             }
            //         }.bind(this);
            //     }
            // }.bind(this);
            this.draws.on("drawend", (evt) => {
                setTimeout(() => {
                    let point = [];
                    let geometry = this.vector.getSource().getFeatures()[0].getGeometry();
                    point = geometry.getCoordinates();
                    let eventPoint = []
                    point.map(val=>{
                        eventPoint.push(ol.proj.toLonLat(val));
                    });
                    eventPoint.map(val => {
                        this.eventPoint = [...this.eventPoint, { longitude: val[0], latitude: val[1] }]
                    });
                    this.mapGis.removeInteraction(this.draws);
                }, 200);
            });
            this.mapGis.addInteraction(this.draws);
        },
        handleSubmit() {
            if (this.eventPoint.length > 1 && this.draws) {
                // this.eventPoint.splice(-1, 1);
            }
            // console.log(this.eventPoint);
            this.$emit("selectPoint", this.eventPoint);
            this.handleClose();
            if (this.draws) {
                this.draws = "";
            }
            this.eventPoint = [];
        }
    }
}
</script>

