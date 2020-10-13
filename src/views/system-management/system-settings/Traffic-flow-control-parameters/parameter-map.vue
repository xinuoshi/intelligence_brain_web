/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:13:43
 * @Last Modified by: chase
 * @Last Modified time: 2018-11-28 14:55:27
 */
 <template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false" title="选择设备" :visible.sync="showmap" v-dialogDrag @close="closeDialog" :close-on-click-modal="false" width="1400px" class="tems_dialog parameter-map_dialog">
        <div class="d_mapButton_div">
            <div class="qiliang d_mapButton" @click="selectionArea">绘制选择区域</div>
        </div>
        <div class="parameter-mapBox GIS_page">  
            <div class="tems_gis" id="tems_gis" style="width: 100%;height: 100%"></div>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum">
                <div class="tems_Button tems_errorButton qiliang dic_closed" @click="resetFormMap">取 消</div>
                <div class="tems_Button qiliang exportBtn" @click="handleSubmitMap">确 定</div>
                <!-- <bt ref="bt" :buttonList="ButtonArrs" @operation="operation"></bt> -->
            </div>
        </div>
    </el-dialog>
</template>
<script>
import ol from "openlayers";
import "openlayers/css/ol.css";
import saveAs from "save-as";
// 引入坐标转换
import coordtransform from "coordtransform";
// 引入gis初始化方法类集合
import GisClassMethod from "@/public/GisClassMethod";
// 引入element-ui的服务Loading
import { Loading } from 'element-ui';
// 引入地图右键图片
import mapClose from "@/assets/mapClose.png";

export default {
    name: "EditDialog",
    props: ["showmap", "SelectDeviceArray", "equipmentList"],
    model: {
        event: "submitButton"
    },
    data() {
        return {
            // mapCenter: [117.384925, 38.998398],
			mapCenter: [120.125347,32.540074],
            coordinateData: [],
            mapGis: "",
            coordinateTracingPointImg: "",
            status: "",
            returnSelectDeviceArray: [],
            mapLoading: ""
        };
    },
    watch: {
        "showmap": {
            handler: function(val, old) {
                if (val) {
                    // this.mapFullscreenLoding(); // 开启loding层
                    setTimeout(() => {
                        this.InitCarGis(); // 之前是初始化数据完成之后才开始初始化地图，但是设备太多，就不行了，会有延迟，给改一下
                        this.getGISData();
                    }, 200);
                } else {
                    this.returnSelectDeviceArray = [];
                }
            },
            immediate: true
        }
    },
    methods: {
        // 开启地图页全屏loding
        mapFullscreenLoding() {
            // 打开loding
            this.mapLoading = Loading.service({
                lock: true,
                text: "地图正在绘制，请稍候...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
        },
        // 处理坐标点,用于在地图上标记警告点使用
        InitGisData(dataSource) {
            return new Promise((resolve, reject) => {
                let data = [];
                for (let i = 0; i < dataSource.length; i++) {
                    let point = [];
                    point.push(dataSource[i].longitude, dataSource[i].latitude);
                    data.push({
                        id: dataSource[i].id, // 数据id
                        intelligenceId: dataSource[i].equipmentType, // 确定图片
                        point: point // 报警坐标
                    });
                }
                // 处理坐标点偏移问题
                // data.map(t => {
                //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
                // });
                resolve(data); // 返回参数
            });
        },
        // 获取坐标点数据
        async getGISData(data) {
            // axios.get("equipment/?cameraAngle=1&equipmentTypes=000004-1,000004-2,000003-3,000004-4").then(async (res) => {
            //     this.coordinateData = [...res.data.data];
            //     this.$store.commit("statuLoadingState", true); // 关闭缓冲图标
            //     let dataSource = await this.InitGisData(this.coordinateData);
            //     this.InitCarGisData(dataSource);
            // }).catch((error) => {
            //     this.$showSimpleMessage(error, "error");
            // });
            this.$store.commit("statuLoadingState", true); // 关闭缓冲图标
            let dataSource = await this.InitGisData(this.equipmentList);
            this.InitCarGisData(dataSource);
        },
        // 初始化地图
        InitCarGis() {
            // http://211.159.188.107:81/gaode_tianjin/{z}/{x}/{y}.png
                let Mapurl = "http://192.168.31.88:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
            // let Mapurl = "http://49.7.59.232:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
            let scaleLineControl = GisClassMethod.ScaleLineControl(); // 地图比例尺控件初始化
            let overviewMapControl = GisClassMethod.OverViewMapControl(Mapurl); // 地图鹰眼控件初始化
            let bottomMapLayer = GisClassMethod.BottomMapLayer(Mapurl); // 地图底图图层初始化
            let MapsArrs = [bottomMapLayer];
            this.mapGis = GisClassMethod.TotalLayer("tems_gis", this.mapCenter, 12, 11, 21, MapsArrs); // 地图总绘制初始化
            this.mapGis.addControl(scaleLineControl); this.mapGis.addControl(overviewMapControl); // 鹰眼，比例尺控件放进地图中
            // this.selectionArea();
            this.RightClickMap(); // 地图的点击事件(右击事件)
        },
        // 地图右键功能
        RightClickMap() {
            let map = this.mapGis;
            let measureTooltipElement = document.createElement("div");
            let element = "<div id='map_contextmenu_container' class='map_contextmenu'><ul><li><a href='#'><img style='width: 40px;' src='" + mapClose +"'></a></li></ul></div>";
            measureTooltipElement.innerHTML = element;
            let menu_overlay = new ol.Overlay({
                element: measureTooltipElement,
                positioning: "center-center"
            });
            menu_overlay.setMap(map);
            // map.addOverlay(menu_overlay);
            // 右击弹窗及操作
            let _this = this;
            $(map.getViewport()).on("contextmenu", function(e) {
                e.preventDefault();
                let pixel = _this.mapGis.getEventPixel(e.originalEvent);
                _this.mapGis.forEachFeatureAtPixel(pixel, function(feature, layer) {
                    // 点击到元素，判断元素不为点位时执行
                    if (feature && feature.get("dataType") !== "coordinate" && feature.getId() !== "coordinate") {
                        let coordinate = _this.mapGis.getEventCoordinate(e);
                        menu_overlay.setPosition(coordinate);
                        $("#map_contextmenu_container ul li").on("click", function() {
                            _this.mapGis.removeLayer(layer);
                            if (layer && (feature.getId() || feature.get("id"))) {
                                let overlay = feature.get("id") ? _this.mapGis.getOverlayById(feature.get("id")) : _this.mapGis.getOverlayById(feature.getId());
                                _this.mapGis.removeOverlay(overlay);
                            }
                            menu_overlay.setPosition(undefined);
                            // 删除画好的区域框，接着处理数据
                            let geo = feature.getGeometry(); // 得到层的Geometry信息
                            _this.equipmentList.map(t => {
                                let point = ol.proj.transform([t.longitude, t.latitude], "EPSG:4326", "EPSG:3857")
                                if (geo.intersectsCoordinate(point)) {
                                    let item = _this.returnSelectDeviceArray.find(e => e === t.id);
                                    if (item) {
                                        _this.returnSelectDeviceArray.splice(_this.returnSelectDeviceArray.indexOf(item), 1); // 删除对应的数据得到最后的返回数据
                                    }
                                }
                            });
                        });
                    }
                    return true;
                });
            });
            // 右击弹窗出现后左击任意位置可取消右击对话框
            $(map.getViewport()).on("click", function(e) {
                e.preventDefault();
                menu_overlay.setPosition(undefined);
            });
            this.mapGis = map;
        },
        // 绘制
        InitCarGisData(coordinate) {
            this.coordinateTracingPointImg = GisClassMethod.CoordinateTracingPointImg(coordinate, 0.3); // 地图根据坐标描点层(不使用自定义图标代替)
            this.mapGis.addLayer(this.coordinateTracingPointImg);
            setTimeout(() => {
                this.$store.commit("statuLoadingState", false); // 打开缓冲图标
            }, 2000);
            if (this.mapLoading) {
                this.mapLoading.close();
                this.mapLoading = "";
            }
        },
        InitCarGiso(coordinate) {
            this.coordinateTracingPointImg = GisClassMethod.CoordinateTracingPointImg(this.coordinateTracingPointImg, coordinate); // 地图根据坐标描点层(不使用自定义图标代替)
        },
        // 划线选择区域
        selectionArea() {
            this.status = "selectionArea";
            let selectionArea = GisClassMethod.SelectionArea(this.mapGis);
            this.mapGis = selectionArea[0]; this.draws = selectionArea[1];
            this.draws.on("drawend", (evt) => {
                let geo = evt.feature.getGeometry();
                let dataARRS = [];
                this.equipmentList.map(t => {
                    let point = ol.proj.transform([t.longitude, t.latitude], "EPSG:4326", "EPSG:3857")
                    if (geo.intersectsCoordinate(point)) {
                        dataARRS = [...dataARRS, t.id];
                    }
                });
                this.returnSelectDeviceArray = [...this.returnSelectDeviceArray, ...dataARRS];
            });
            this.draws.on("drawend", (evt) => {
                setTimeout(() => {
                    this.mapGis.removeInteraction(this.draws);
                }, 200);
            });
        },
        // 取消
        resetFormMap(formName) {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.$emit("closeDialogButton");
            }, null, "warning");
        },
        // 关闭
        closeDialog() {
            this.$emit("closeDialogButton");
        },
        // 确定
        handleSubmitMap(name) {
            console.log(this.returnSelectDeviceArray);
            if (this.returnSelectDeviceArray.length > 0) {
                this.$layerNotice("提示", "您确定要使用框选的设备吗？", () => {
                    let returnSelectDeviceArray = [...this.returnSelectDeviceArray, ...this.SelectDeviceArray];
                    this.returnSelectDeviceArray =  this.$tools.arrUnique(returnSelectDeviceArray); // 去重
                    this.$emit("submitButton", this.returnSelectDeviceArray);
                }, null, "warning");
            } else {
                this.$showSimpleMessage("地图未选择设备", "error");
            }
        }
    },
    created() {
        //
    },
    mounted() {
        //
    }
};  
</script>

<style>
.parameter-mapBox {
    height: 538px !important;
    overflow: hidden;
    /* position: relative; */
}
.parameter-map_dialog .el-dialog__body {
   margin: 5px;
   padding: 5px;
}
.dic_closed {
    border-radius: 3px;
}
.d_mapButton_div {
    width: 100%;
    height: 40px;
}
.d_mapButton {
    width: 126px !important;
    height: 34px !important;
    float: left;
    -webkit-box-shadow: 0px 0px 0px #0a1a2d;
    box-shadow: 0px 0px 0px #0a1a2d;
    line-height: 35px;
    /* position: absolute;
    top: 5px;
    z-index: 1;
    left: 42px; */
}
/* 地图右键样式 */
.map_contextmenu {
  position: absolute;
  /* padding: 12px 0; */
  z-index: 9;
  /* background-color: white; */
  width: 50px;
  border-radius: 4px;
}
.map_contextmenu ul {
  /* padding: 6px 2px 0 2px; */
  list-style: none;
}
.map_contextmenu > ul > li {
  text-align: center;
  /* padding: 5px 0; */
}
.map_contextmenu > ul > li> a {
  color:rgb(255, 0, 0);
  text-decoration: none;
}
/* .map_contextmenu > ul > li:hover {
  background-color: rgba(255, 0, 0, 0.5);
} */
</style>
