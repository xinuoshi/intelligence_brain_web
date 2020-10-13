/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 09:58:10
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2019-06-06 15:36:26
 */
import ol from "openlayers";
import "openlayers/css/ol.css";
import msgBox from "./msgBox.js"; // 引入公共提示信息窗
import linearrow from "@/assets/static/linearrow.png";
import scrappedvehiclesrun from "@/assets/eventIcon/scrappedvehiclesrun.png"; // 报废车辆上路行驶

import RoadTraffico from "@/assets/roadTraffico.png"; // 路口交通观测的图标（绿色图标）
import RoadTrafficp from "@/assets/roadTrafficp.png"; // 路口交通观测的图标（蓝色图标）
import DRoadTrafficp from "@/assets/static/roadTrafficp.png"; // 路口交通观测的图标（蓝色图标）偏离参数用
import TrafficJam from "@/assets/TrafficJam.png"; // 路口严重拥堵图标
import TrafficCompareJam from "@/assets/TrafficCompareJam.png"; // 路口中度拥堵图标
import MildJam from "@/assets/MildJam.png"; // 路口轻度拥堵图标
import TrafficSmooth from "@/assets/TrafficSmooth.png"; // 路口基本畅通图标
import TrafficLight from "@/assets/TrafficLight.png"; // 路口畅通图标

// 引入潮汐方向图标
import TidaldirectionIcon from "@/assets/static/TidaldirectionIcon.png"; // 潮汐方向图标

// 导出地图多个初始化类方法
export default {
    // 地图总绘制初始化
    TotalLayer(target, mapCenter, zoom, minZoom, maxZoom, args) {
        let map = "";
        // [117.3571000000,38.9375000000,117.3447132111,38.9370636460] // [117.384925, 38.998398]
        // edited by chaoliang 2020-07-30 限制地图可拖拽区域
		let maxExtent = ol.extent.boundingExtent([[150.8671000000,45.4475000000],[50.6747132111,30.4470636460]]);
        // console.log(maxExtent );
        let extent = []
        try {
            // 总图层
            map = new ol.Map({
                layers: [...args],
                target: target,
                view: new ol.View({
                    center: ol.proj.transform(mapCenter, "EPSG:4326", "EPSG:3857"),
                    zoom: zoom,
                    minZoom: minZoom,
                    maxZoom: maxZoom,
                    extent: ol.proj.transformExtent(maxExtent, 'EPSG:4326', 'EPSG:3857')
                })
            });
        } catch (error) {
            // msgBox.showSimpleMessage(error, "error");
            alert(error);
        }
        return map; // 底图层级
    },

    // 地图底图图层初始化
    BottomMapLayer(Mapurl) {
        let bottomMapLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: Mapurl,
                crossOrigin: "anonymous"
            })
            // source: new ol.source.OSM()
        });
        return bottomMapLayer;
    },

    // 地图比例尺控件初始化
    ScaleLineControl() {
        let scaleLineControl = new ol.control.ScaleLine({
            // 设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
            units: "metric"
        });
        return scaleLineControl;
    },

    // 地图鹰眼控件初始化
    OverViewMapControl(Mapurl) {
        let overviewMapControl = new ol.control.OverviewMap({
            className: "ol-overviewmap ol-custom-overviewmap",
            layers: [
                new ol.layer.Tile({
                    // source: new ol.source.OSM()
                    source: new ol.source.XYZ({
                        url: Mapurl,
                        crossOrigin: "anonymous"
                    })
                })
            ],
            collapseLabel: "\u00BB",
            label: "\u00AB",
            collapsed: false,
            collapsible: false
        });
        return overviewMapControl;
    },
    // 全屏控件
    FullScreen() {
        let fullScreen = new ol.control.FullScreen();
        return fullScreen;
    },
    // draw画笔层
    SetupDraw(map) {
        let draws = new ol.interaction.Draw({
            source: new ol.source.Vector(),
            type: "Point",
            freehand: false // 是否手绘
        });
        map.addInteraction(draws);
        return [map, draws];
    },

    // 地图根据坐标描点层(使用自定义图标代替)
    CoordinateTracingPointImg(coordinate, scale) {
        // 标记层
        let coordinateTracingPointImg = new ol.layer.Vector({
            source: new ol.source.Vector() 
        });
        let geometry = new ol.geom.LineString();
        // 检查当前点的位置是否为正确位置，如果不是正确位置则不渲染
        let isGoodPoint = true;
        coordinate.map(t => {
            if (t.point.length > 0) {
                let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                for (let j = 0; j < points.length; j++) {
                    if (typeof(points[j]) !== "number" || isNaN(points[j])) {
                        isGoodPoint = false;
                    }
                }
                if (isGoodPoint) {
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        id: t.id,
                        dataType: "coordinate",
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    let src = this.InitGisImg(t.intelligenceId);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.4, 0.8],
                            // opacity: 0.75,
                            src: src,
                            // size: [20, 20],
                            // color: "red"
                            scale: scale || 0.8
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateTracingPointImg.getSource().addFeature(anchor);
                } else {
                    isGoodPoint = true;
                }
            }
        });
        return coordinateTracingPointImg;
    },

    // 坐标数据变化初始化标记点(使用自定义图标代替)
    CoordinateChangePointImg(layer, coordinate) {
        let coordinateChangePointImg = layer; // 上一次描点的图层层级
        // 切换时重新设置layer层的source
        let LSsource = new ol.source.Vector();
        coordinateChangePointImg.setSource(LSsource);
        let geometry = new ol.geom.LineString();
        // 检查当前点的位置是否为正确位置，如果不是正确位置则不渲染
        let isGoodPoint = true;
        coordinate.map(t => {
            if (t.point.length > 0) {
                let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                for (let j = 0; j < points.length; j++) {
                    if (typeof(points[j]) !== "number" || isNaN(points[j])) {
                        isGoodPoint = false;
                    }
                }
                if (isGoodPoint) {
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        id: t.id,
                        dataType: "coordinate",
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    let src = this.InitGisImg(t.intelligenceId);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.4, 0.8],
                            opacity: 0.75,
                            src: src,
                            // size: [20, 20],
                            // color: "red"
                            scale: 0.5
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateChangePointImg.getSource().addFeature(anchor);
                } else {
                    isGoodPoint = true;
                }
            }
        });
        return coordinateChangePointImg;
    },

    // 坐标数据变化初始化标记点(使用自定义图标代替),情报告警专用
    QingbaoCoordinateTracingPointImg(coordinate) {
        // 标记层
        let coordinateTracingPointImg = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        let geometry = new ol.geom.LineString();
        // 检查当前点的位置是否为正确位置，如果不是正确位置则不渲染
        let isGoodPoint = true;
        coordinate.map(t => {
            if (t.point.length > 0) {
                let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                for (let j = 0; j < points.length; j++) {
                    if (isNaN(points[j])) {
                        isGoodPoint = false;
                    }
                }
                if (isGoodPoint) {
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        id: t.id,
                        dataType: "coordinate",
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    let src = this.InitGisImg(t.sTypeId, t.status);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.4, 0.8],
                            // opacity: 0.75,
                            src: src,
                            // size: [20, 20],
                            // color: "red"
                            scale: 0.35
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateTracingPointImg.getSource().addFeature(anchor);
                } else {
                    isGoodPoint = true;
                }
            }
        });
        return coordinateTracingPointImg;
    },
    // 坐标数据变化初始化标记点(使用自定义图标代替),情报告警专用
    QingbaoCoordinateChangePointImg(layer, coordinate) {
        let coordinateChangePointImg = layer; // 上一次描点的图层层级
        // 切换时重新设置layer层的source
        let LSsource = new ol.source.Vector();
        coordinateChangePointImg.setSource(LSsource);
        let geometry = new ol.geom.LineString();
        // 检查当前点的位置是否为正确位置，如果不是正确位置则不渲染
        let isGoodPoint = true;
        coordinate.map(t => {
            if (t.point.length > 0) {
                let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                for (let j = 0; j < points.length; j++) {
                    if (isNaN(points[j])) {
                        isGoodPoint = false;
                    }
                }
                if (isGoodPoint) {
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        id: t.id,
                        dataType: "coordinate",
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    let src = this.InitGisImg(t.sTypeId, t.status);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.4, 0.8],
                            // opacity: 0.75,
                            src: src,
                            // size: [20, 20],
                            // color: "red"
                            scale: 0.35
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateChangePointImg.getSource().addFeature(anchor);
                } else {
                    isGoodPoint = true;
                }
            }
        });
        return coordinateChangePointImg;
    },

    // 地图根据坐标描点层(不使用自定义图标代替)
    CoordinateTracingPoint(coordinate) {
        // 标记层
        let coordinateTracingPoint = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        let geometry = new ol.geom.LineString();
        if (coordinate.length > 0) {
            coordinate.map(t => {
                if (t.point.length > 0) {
                    let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        dataType: "coordinate",
                        id: t.id,
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 8,
                            stroke: new ol.style.Stroke({
                                color: "#FF0000"
                            }),
                            fill: new ol.style.Fill({
                                color: "#FF0000"
                            })
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateTracingPoint.getSource().addFeature(anchor);
                }
            });
        }
        // console.log(this.coordinateTracingPoint.getSource().getFeatureById(coordinate[0].id).removeFeature());
        return coordinateTracingPoint;
    },

    // 坐标数据变化初始化标记点(不使用自定义图标代替)
    CoordinateChangePoint(layer, coordinate) {
        let coordinateChangePoint = layer; // 上一次描点的图层层级
        // 切换时重新设置layer层的source
        let LSsource = new ol.source.Vector();
        coordinateChangePoint.setSource(LSsource);
        let geometry = new ol.geom.LineString();
        if (coordinate.length > 0) {
            coordinate.map(t => {
                if (t.point.length > 0) {
                    let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                    geometry.appendCoordinate(points);
                    // 创建一个Feature，并设置好在地图上的位置
                    let anchor = new ol.Feature({
                        geometry: new ol.geom.Point(points),
                        dataType: "coordinate",
                        id: t.id,
                        longitude: t.point[0],
                        latitude: t.point[1]
                    });
                    anchor.setId(t.id);
                    // 设置样式，在样式中就可以设置图标
                    anchor.setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 8,
                            stroke: new ol.style.Stroke({
                                color: "#FF0000"
                            }),
                            fill: new ol.style.Fill({
                                color: "#FF0000"
                            })
                        })
                    }));
                    // 添加到之前的创建的layer中去
                    coordinateChangePoint.getSource().addFeature(anchor);
                }
            });
        }
        return coordinateChangePoint;
    },

    // 连接坐标点描绘轨迹
    CoordinateLocus(coordinate, featureId, color, zIndex) {
        // 获取样式
            let styleFunction = function(feature) {
                // 线段样式
                let styles = [
                    new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: color || "#0044CC"
                        }),
                        stroke: new ol.style.Stroke({
                            // lineDash: [1, 3, 5],
                            width: 5,
                            color: color || "#0044CC"
                        })
                    })
                ];
                return styles;
            };
            let geometry = new ol.geom.LineString();
            if (coordinate.length > 0) {
                coordinate.map(t => {
                    let points = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                    geometry.appendCoordinate(points);
                });
            }
            let feature = new ol.Feature({
                geometry: geometry
            });
            if (featureId) {
                feature.setId(featureId);
            };
            // 标记数据集
            let source = new ol.source.Vector();
            source.addFeature(feature);
            // 标记点集
            let coordinateLocus = new ol.layer.Vector({
                zIndex: zIndex,
                source: source,
                style: styleFunction()
            });
            return coordinateLocus;
    },
    // 划线选择区域
    SelectionArea(map) {
        let source = new ol.source.Vector();
        let vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 255, 0.6)" // 填充颜色
                }),
                stroke: new ol.style.Stroke({
                    color: "red", // 边框颜色
                    width: 2 // 边框宽度
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: "#ffcc33"
                    })
                })
            }),
            updateWhileInteracting: true
        });
        map.addLayer(vector);
        vector.on("click", function(e) {
            map.removeLayer(vector);
        });
        // let snap = new ol.interaction.Snap({
        //     source: source
        // });
        // let modify = new ol.interaction.Modify({
        //     source: source,
        //     pixelTolerance: "10"
        // });
        let draws = new ol.interaction.Draw({
            source: source,
            type: "Polygon"
        });
        map.addInteraction(draws);
        // map.addInteraction(modify);
        // map.addInteraction(snap);
        return [map, draws, vector];
    },

    // 标记点位
    MarkPointPosition(map, coordinate) {
        let points = ol.proj.transform(coordinate.point, "EPSG:4326", "EPSG:3857");
        let point = new ol.Feature({
            geometry: new ol.geom.Point(points),
            // dataType: "coordinate",
            id: `${coordinate.id}PointPosition`,
            longitude: coordinate.point[0],
            latitude: coordinate.point[1]
        });
        // 设置点1的样式信息
        point.setStyle(new ol.style.Style({
            // 填充色
            fill: new ol.style.Fill({
                color: "#FF0000"
            }),
            // 边线颜色
            stroke: new ol.style.Stroke({
                color: "#FF0000",
                width: 2
            }),
            // 形状
            image: new ol.style.Circle({
                radius: 8,
                stroke: new ol.style.Stroke({
                    color: "#FF0000"
                }),
                fill: new ol.style.Fill({
                    color: "#FF0000"
                })
            })
        }));
        // 实例化一个矢量图层Vector作为绘制层
        let source = new ol.source.Vector({
            features: [point]
        });
        // 创建一个图层
        let vector = new ol.layer.Vector({
            source: source
        });
        // 将绘制层添加到地图容器中
        map.addLayer(vector);
        return [map, vector];
    },

    // 测距
    MapRanging(map) {
        let source = new ol.source.Vector();
        let vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 255, 0.6)" // 填充颜色
                }),
                stroke: new ol.style.Stroke({
                    color: "red", // 边框颜色
                    width: 4 // 边框宽度
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: "#ffcc33"
                    })
                })
            }),
            updateWhileInteracting: true
        });
        map.addLayer(vector);
        let draws = new ol.interaction.Draw({
            source: source,
            type: "LineString"
        });
        return [map, draws, vector];
    },

    // 地图画线(带箭头线区分方向)----绘制箭头线
    DrawArrowLine(map,zIndex) {
        // 创建一个矢量资源
        let source = new ol.source.Vector();
        // 设置线段样式
        let styleFunction = function(feature) {
            let geometry = feature.getGeometry();
            let styles = [
                // 设置线的样式
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "#007cf8",
                        width: 10
                    })
                })
            ];
            geometry.forEachSegment(function(start, end) {
                let dx = end[0] - start[0];
                let dy = end[1] - start[1];
                let rotation = Math.atan2(dy, dx);
                // arrows
                styles.push(new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        src: linearrow,
                        anchor: [0.75, 0.5],
                        rotateWithView: false,
                        rotation: -rotation,
                        scale: 0.5
                    })
                }));
            });
            return styles;
        };
        // 创建一个矢量图层，并添加矢量资源和设置起样式
        let vector = new ol.layer.Vector({
            zIndex: zIndex,
            source: source,
            style: styleFunction
        });
        map.addLayer(vector);
        let draws = new ol.interaction.Draw({
            source: source,
            type: ("LineString")
        });
        this.mapGis = map;
        return [map, draws, vector];
    },

    // 坐标绘制箭头线
    PiontCoordinateLocus(coordinate, linColor, linWitch, idName,zIndex) {
        // 标记数据集
        // 
        let source = new ol.source.Vector();
        // 获取样式
        let styleFunction = function() {
            // 线段样式
            let styles = [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: linColor || "#0044CC"
                    }),
                    stroke: new ol.style.Stroke({
                        // lineDash: [1, 3, 5],
                        width: linWitch || 2,
                        color: linColor || [0, 68, 204, 1]
                    })
                })
            ];
            return styles;
        };
        if (coordinate.length > 0) {
            coordinate.map(ele => {
                if (ele.locationPonitObj.length > 0) {
                    let geometry = new ol.geom.LineString();
                    ele.locationPonitObj.map(el => {
                        let points = ol.proj.transform(el.point, "EPSG:4326", "EPSG:3857");
                        geometry.appendCoordinate(points);
                    });
                    let feature = new ol.Feature({
                        geometry: geometry
                    });
                    if (idName) {
                        feature.setId(`${ele.id}${idName}`);
                    }
                    source.addFeature(feature);
                }
            });
        }
        // 标记点集
        let PiontCoordinateLocus = new ol.layer.Vector({
            source: source,
            style: styleFunction()
        });
        return PiontCoordinateLocus;
    },
    PiontDrawArrowLine(map, vector,zIndex) {
        // 创建一个矢量资源
        // let source = new ol.source.Vector();
        // 设置线段样式
        let styleFunction = function(feature) {
            feature.setId("coordinate");
            let geometry = feature.getGeometry();
            let styles = [
                // 设置线的样式
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: "#007cf8",
                        width: 10
                    })
                })
            ];
            geometry.forEachSegment(function(start, end) {
                let dx = end[0] - start[0];
                let dy = end[1] - start[1];
                let rotation = Math.atan2(dy, dx);
                // arrows
                styles.push(new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        src: linearrow,
                        anchor: [0.75, 0.5],
                        rotateWithView: false,
                        rotation: -rotation,
                        scale: 0.5
                    })
                }));
            });
            return styles;
        };
        // 创建一个矢量图层，并添加矢量资源和设置起样式
        // let vector = new ol.layer.Vector({
        //     source: source,
        //     style: styleFunction(),
        //     zIndex:zIndex
        // });
        vector.setStyle(styleFunction);
        // map.addLayer(vector);
        // this.draws = new ol.interaction.Draw({
        //     source: source,
        //     type: ("LineString")
        // });
        // return [this.mapGis, this.draws, vector, pointdara];
        return [map, vector];
    },

    // 绘制潮汐流
    TidalFlowRendering(coordinate,zIndex) {
        // 标记数据集
        let source = new ol.source.Vector();
        // 获取样式
        let styleFunction = function(feature) {
            // 线段样式
            let styles = [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: "#0044CC"
                    }),
                    stroke: new ol.style.Stroke({
                        // lineDash: [1, 3, 5],
                        width: 2,
                        color: [0, 68, 204, 1]
                    })
                })
            ];
            return styles;
        };
        // && coordinate.locationPonitObjp.length > 0
        if (coordinate.locationPonitObjo.length > 0) {
            if (coordinate.locationPonitObjo.length > 0) {
                let geometry = new ol.geom.LineString();
                coordinate.locationPonitObjo.map(t => {
                    if (t.point.length === 2) {
                        let point = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                        geometry.appendCoordinate(point);
                    }
                });
                let feature = new ol.Feature({
                    geometry: geometry,
                    dataType: "coordinate"
                });
                source.addFeature(feature);
            }
            if (coordinate.locationPonitObjp.length > 0) {
                let geometry = new ol.geom.LineString();
                coordinate.locationPonitObjp.map(t => {
                    if (t.point.length === 2) {
                        let point = ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857");
                        geometry.appendCoordinate(point);
                    }
                });
                let feature = new ol.Feature({
                    geometry: geometry,
                    dataType: "coordinate"
                });
                source.addFeature(feature);
            }
        }
        // 标记点集
        let TidalFlowRendering = new ol.layer.Vector({
            source: source,
            style: styleFunction(),
            zIndex:zIndex
        });
        return TidalFlowRendering;
    },
    // 潮汐流方向图标
    TidalCurrentDirection(map, vector, id, linColor, amount) {
        var ret = vector.getSource().getFeatures()[0]
        // 设置线段样式
        let styleFunction = function(feature) {
            feature.setId(id);
            let geometry = feature.getGeometry();
            let styles = [
                // 设置线的样式
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: linColor,
                        width: 8
                    })
                })
            ];// 潮汐流路线方向箭头
            var i = -1;
            geometry.forEachSegment(function(start, end) {
                // 
                i++;
                let aa = amount/3
                let bb = Math.ceil(aa)
                // let obja = {point: coordtransform.wgs84togcj02(t.longitude, t.latitude)};
                if(i % bb ==0){
                    // 
                    let dx = end[0] - start[0];
                    let dy = end[1] - start[1];
                    let rotation = Math.atan2(dy, dx);
                    // let rotation = 1;
                    // arrows
                    styles.push(new ol.style.Style({
                        geometry: new ol.geom.Point(end),
                        image: new ol.style.Icon({
                            src: linearrow,
                            anchor: [0.75, 0.5],
                            // anchor: [0.5, 0.5],
                            rotateWithView: false,
                            rotation: -rotation,
                            scale: 0.4
                        })
                    }));
                }
            });
            return styles;
        };
        vector.setStyle(styleFunction);
        return [map, vector];
    },

    // 潮汐流高亮的改变
    TidalHightColor(vector, id, linColor, amount) {
        // 设置线段样式
        let styleFunction = function(feature) {
            feature.setId(id);
            let geometry = feature.getGeometry();
            let styles = [
                // 设置线的样式
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: linColor,
                        width: 8
                    })
                })
            ];
            let i= -1;
            geometry.forEachSegment(function(start, end) {
                i++;
                let aa = amount/3
                let bb = Math.ceil(aa)
                // let obja = {point: coordtransform.wgs84togcj02(t.longitude, t.latitude)};
                if(i % bb ==0){
                let dx = end[0] - start[0];
                let dy = end[1] - start[1];
                let rotation = Math.atan2(dy, dx);
                // arrows
                styles.push(new ol.style.Style({
                    geometry: new ol.geom.Point(end),
                    image: new ol.style.Icon({
                        src: linearrow,
                        anchor: [0.75, 0.5],
                        rotateWithView: false,
                        rotation: -rotation,
                        scale: 0.5
                    })
                }));
            }
            });
            return styles;
        };
        vector.setStyle(styleFunction);
        return vector;
    },

    /*
     * 地图类方法之外的一些其他方法
     */
    // 定义坐标描点选择对应图片方法
    InitGisImg(type, status) {
        // status为事件的转态，0为开启状态，1为关闭转态
        // imgArrs图片地址集合
        let src = "";
        switch (type) {
            case "d_1": // 路口交通溢出拥堵
                src = status === "0" ? require("../assets/eventIcon/trafficoverflowcongestion.png")
                    : (status === "1" ? require("../assets/greyEventIcon/trafficoverflowcongestion.png")
                    : require("../assets/LieventIcon/trafficoverflowcongestion.png"));
                break;
            case "d_2": // 路段交通严重拥堵
                src = status === "0" ? require("../assets/eventIcon/severecongestion.png")
                    : (status === "1" ? require("../assets/greyEventIcon/severecongestion.png")
                    : require("../assets/LieventIcon/severecongestion.png"));
                break;
            case "d_3": // 车辆慢行
                // src = status === "0" ? ""
                //     : "";
                src = status === "0" ? require("../assets/eventIcon/severecongestion.png")
                    : (status === "1" ? require("../assets/eventIcon/severecongestion.png")
                    : require("../assets/LieventIcon/severecongestion.png"));
                break;
            case "d_4": // 信号灯不正常显示
                src = status === "0" ? require("../assets/eventIcon/semaphoreanomaly.png")
                    : (status === "1" ? require("../assets/greyEventIcon/semaphoreanomaly.png")
                    : require("../assets/LieventIcon/semaphoreanomaly.png"));
                break;
            case "d_5": // 交通事故
                src = status === "0" ? require("../assets/eventIcon/thetrafficaccident.png")
                    : (status === "1" ? require("../assets/greyEventIcon/thetrafficaccident.png")
                    : require("../assets/LieventIcon/thetrafficaccident.png"));
                break;
            case "d_6": // 车辆逆行
                src = status === "0" ? require("../assets/eventIcon/retrograde.png")
                    : (status === "1" ? require("../assets/greyEventIcon/retrograde.png")
                    : require("../assets/LieventIcon/retrograde.png"));
                break;
            case "d_7": // 不文明停车
                src = status === "0" ? require("../assets/eventIcon/uncivilizedparking.png")
                    : (status === "1" ? require("../assets/greyEventIcon/uncivilizedparking.png")
                    : require("../assets/LieventIcon/uncivilizedparking.png"));
                break;
            case "d_8": // 烟雾/火灾
                src = status === "0" ? require("../assets/eventIcon/firesmoke.png")
                    : (status === "1" ? require("../assets/greyEventIcon/firesmoke.png")
                    : require("../assets/LieventIcon/firesmoke.png"));
                break;
            case "d_9": // 道路积水
                src = status === "0" ? require("../assets/eventIcon/theroads.png")
                    : (status === "1" ? require("../assets/greyEventIcon/theroads.png")
                    : require("../assets/LieventIcon/theroads.png"));
                break;
            case "10001": // 道路积水
                src = status === "0" ? require("../assets/eventIcon/theroads.png")
                    : (status === "1" ? require("../assets/greyEventIcon/theroads.png")
                    : require("../assets/LieventIcon/theroads.png"));
                break;
            case "d_10": // 机动车闯红灯
                src = status === "0" ? require("../assets/eventIcon/thecarranaredlight.png")
                    : (status === "1" ? require("../assets/greyEventIcon/thecarranaredlight.png")
                    : require("../assets/LieventIcon/thecarranaredlight.png"));
                break;
            case "d_11": // 行人闯红灯
                src = status === "0" ? require("../assets/eventIcon/pedestriancrossngaredlight.png")
                    : (status === "1" ? require("../assets/greyEventIcon/pedestriancrossngaredlight.png")
                    : require("../assets/LieventIcon/pedestriancrossngaredlight.png"));
                break;
            case "d_12": // 行人翻越护栏
                src = status === "0" ? require("../assets/eventIcon/climboverfence.png")
                    : (status === "1" ? require("../assets/greyEventIcon/climboverfence.png")
                    : require("../assets/LieventIcon/climboverfence.png"));
                break;
            case "d_13": // 非机动车闯灯
                src = status === "0" ? require("../assets/eventIcon/nonmotorvehiclsrunredlights.png")
                    : (status === "1" ? require("../assets/greyEventIcon/nonmotorvehiclsrunredlights.png")
                    : require("../assets/LieventIcon/nonmotorvehiclsrunredlights.png"));
                break;
            case "d_14": // 路口车辆交通秩序混乱
                src = status === "0" ? require("../assets/eventIcon/trafficchaos.png")
                    : (status === "1" ? require("../assets/greyEventIcon/trafficchaos.png")
                    : require("../assets/LieventIcon/trafficchaos.png"));
                break;
            case "d_15": // 牌照无法识别
                src = status === "0" ? require("../assets/eventIcon/licenseplatecannotbeshown.png")
                    : (status === "1" ? require("../assets/greyEventIcon/licenseplatecannotbeshown.png")
                    : require("../assets/LieventIcon/licenseplatecannotbeshown.png"));
                break;
            case "d_16": // 状态异常车辆识别
                src = status === "0" ? require("../assets/eventIcon/abnormalvehicleidentification.png")
                    : (status === "1" ? require("../assets/greyEventIcon/abnormalvehicleidentification.png")
                    : require("../assets/LieventIcon/abnormalvehicleidentification.png"));
                break;
            case "d_17": // 车辆偏离路线
                src = status === "0" ? require("../assets/eventIcon/migrationroutes.png")
                    : (status === "1" ? require("../assets/greyEventIcon/migrationroutes.png")
                    : require("../assets/LieventIcon/migrationroutes.png"));
                break;
            case "d_18": // 交通流量异常
                src = status === "0" ? require("../assets/eventIcon/abnormaltrafficflow.png")
                    : (status === "1" ? require("../assets/greyEventIcon/abnormaltrafficflow.png")
                    : require("../assets/LieventIcon/abnormaltrafficflow.png"));
                break;
            case "d_19": // 车型构成异常
                src = status === "0" ? require("../assets/eventIcon/abnormalvehiclecomposition.png")
                    : (status === "1" ? require("../assets/greyEventIcon/abnormalvehiclecomposition.png")
                    : require("../assets/LieventIcon/abnormalvehiclecomposition.png"));
                break;
            case "d_20": // 违反限行
                src = status === "0" ? require("../assets/eventIcon/inviolationoftherestrictions.png")
                    : (status === "1" ? require("../assets/greyEventIcon/inviolationoftherestrictions.png")
                    : require("../assets/LieventIcon/inviolationoftherestrictions.png"));
                break;
            case "d_21": // 报废车辆上路行驶
                src = status === "0" ? require("../assets/eventIcon/scrappedvehiclesrun.png")
                    : (status === "1" ? require("../assets/greyEventIcon/scrappedvehiclesrun.png")
                    : require("../assets/LieventIcon/scrappedvehiclesrun.png"));
                break;
            case "d_22": // 逾期未检车辆上路行驶
                src = status === "0" ? require("../assets/eventIcon/vehiclenotinspectedintime.png")
                    : (status === "1" ? require("../assets/greyEventIcon/vehiclenotinspectedintime.png")
                    : require("../assets/LieventIcon/vehiclenotinspectedintime.png"));
                break;
            case "d_23": // 抛洒滴漏(车辆遗撒)
                src = status === "0" ? ""
                    : (status === "1" ? ""
                    : "");
                break;
            case "d_24": // 外地车数量异常
                src = status === "0" ? require("../assets/eventIcon/outoftownvehicleanomaly.png")
                    : (status === "1" ? require("../assets/greyEventIcon/outoftownvehicleanomaly.png")
                    : require("../assets/LieventIcon/outoftownvehicleanomaly.png"));
                break;
            case "d_25": // 外地车频繁通过(机动车频繁通过)
                src = status === "0" ? ""
                    : (status === "1" ? ""
                    : "");
                break;
            case "d_26": // 占道施工
                src = status === "0" ? require("../assets/eventIcon/presenceofconstruction.png")
                    : (status === "1" ? require("../assets/greyEventIcon/presenceofconstruction.png")
                    : require("../assets/LieventIcon/presenceofconstruction.png"));
                break;
            case "10023": // 占道施工
                src = status === "0" ? require("../assets/eventIcon/presenceofconstruction.png")
                    : (status === "1" ? require("../assets/greyEventIcon/presenceofconstruction.png")
                    : require("../assets/LieventIcon/presenceofconstruction.png"));
                break;
            case "d_27": // 自定义
                // src = status === "0" ? ""
                //     : "";
                src = status === "0" ? require("../assets/eventIcon/presenceofconstruction.png")
                    : (status === "1" ? require("../assets/greyEventIcon/presenceofconstruction.png")
                    : require("../assets/greyEventIcon/presenceofconstruction.png"));
                break;
            case "10018": // 警告
                src = scrappedvehiclesrun;
                break;
            case "110": // 路口交通观测的点位图标（绿色图标）
                src = RoadTraffico;
                break;
            case "d110": // 路口交通观测的点位图标（蓝色图标）
                src = RoadTrafficp;
                break;
            case "dd110": // 路口交通观测的点位图标（蓝色图标）偏离参数用
                src = DRoadTrafficp;
                break;
            case "4": // 路口严重拥堵
                src = TrafficJam;
                break;
            case "3": // 路口中度拥堵
                src = TrafficCompareJam;
                break;
            case "2": // 路口轻度
                src = MildJam;
                break;
            case "1": // 路口基本畅通
                src = TrafficSmooth;
                break;
            case "0": // 路口畅通
                src = TrafficLight;
                break;
            case "car_1": // 公交车
                src = require("../assets/vehicleIcon/Bus.png");
                break;
            case "car_2": // 大货车
                src = require("../assets/vehicleIcon/Bigtruck.png");
                break;
            case "car_3": // 危险品运输车
                src = require("../assets/vehicleIcon/Dangerouschemcalscar.png");
                break;
            case "car_4": // 大客车
                src = require("../assets/vehicleIcon/Bigbus.png");
                break;
            case "car_5": // 救护车
                src = require("../assets/vehicleIcon/Ambulance.png");
                break;
            case "car_6": // 消防车
                src = require("../assets/vehicleIcon/Fireengine.png");
                break;
            case "car_7": // 警车
                src = require("../assets/vehicleIcon/Policecar.png");
                break;
            case "000001-1": // 信号灯
                src = !status ? require("../assets/equipmentIcon/Signallamp.png")
                    : require("../assets/LiequipmentIcon/Signallamp.png");
                break;
            case "000001-2": // 信号机
                src = !status ? require("../assets/equipmentIcon/Signallingmachine.png")
                    : require("../assets/LiequipmentIcon/Signallingmachine.png");
                break;
            case "000002-1": // 信号配时
                src = !status ? require("../assets/equipmentIcon/Signaltiming.png")
                    : require("../assets/LiequipmentIcon/Signaltiming.png");
                break;
            case "000003-1": // 微波
                src = !status ? require("../assets/equipmentIcon/microwave.png")
                    : require("../assets/LiequipmentIcon/microwave.png");
                break;
            case "000003-2": // 地磁
                src = !status ? require("../assets/equipmentIcon/Geomagnetism.png")
                    : require("../assets/LiequipmentIcon/Geomagnetism.png");
                break;
            case "000003-3": // 视频检测
                src = !status ? require("../assets/equipmentIcon/Videodetection.png")
                    : require("../assets/LiequipmentIcon/Videodetection.png");
                break;
            case "000004-1": // 电子警察
                src = !status ? require("../assets/equipmentIcon/Electronicpolice.png")
                    : require("../assets/LiequipmentIcon/Electronicpolice.png");
                break;
            case "000004-2": // 卡口
                src = !status ? require("../assets/equipmentIcon/Bayonet.png")
                    : require("../assets/LiequipmentIcon/Bayonet.png");
                break;
            case "000004-3": // 违停
                src = !status ? require("../assets/equipmentIcon/Illegalparking.png")
                    : require("../assets/LiequipmentIcon/Illegalparking.png");
                break;
            case "000004-4": // 视频监控
                src = !status ? require("../assets/equipmentIcon/Videosurveillance.png")
                    : require("../assets/LiequipmentIcon/Videosurveillance.png");
                break;
            case "000005-1": // 诱导屏
                src = !status ? require("../assets/equipmentIcon/Inductionscreen.png")
                    : require("../assets/LiequipmentIcon/Inductionscreen.png");
                break;
            case "000007-1": // 标志
                src = !status ? require("../assets/equipmentIcon/sign.png")
                    : require("../assets/LiequipmentIcon/sign.png");
                break;
            case "000007-2": // 标线
                src = !status ? require("../assets/equipmentIcon/Markingline.png")
                    : require("../assets/LiequipmentIcon/Markingline.png");
                break;
            case "000007-3": // 护栏
                src = !status ? require("../assets/equipmentIcon/guardrail.png")
                    : require("../assets/LiequipmentIcon/guardrail.png");
                break;
        }
        return src;
    },

    // 测量距离
    formatLength(line) {
        let length, output;
        length = Math.round(line.getLength() * 100) / 100;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + " " + "km"; // 换算成KM单位
        } else {
            output = (Math.round(length * 100) / 100) + " " + "m"; // m为单位
        }
        return output;
    },
    
    // 百度坐标转高德坐标
    baiduTurnsTogoldenVirtue(bd_lng, bd_lat) {
        let X_PI = Math.PI * 3000.0 / 180.0;
        let x = bd_lng - 0.0065;
        let y = bd_lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
        let gg_lng = z * Math.cos(theta);
        let gg_lat = z * Math.sin(theta);
        // return {lng: gg_lng, lat: gg_lat}
        return [gg_lng, gg_lat];
    }
    
};
