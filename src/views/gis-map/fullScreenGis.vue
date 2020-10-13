/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 09:57:54
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2019-02-22 18:00:51
 */
<template>
    <div class="GIS_page">
        <!-- 地图闪烁点div -->
        <!-- <div id="css_animation"></div> -->
        <!-- 地图右键事件节点 -->
        <div id="map_contextmenu_container" class="map_contextmenu" style="display:none;">
            <ul>
                <li><a href="#">删除</a></li>
            </ul>
        </div>
        <div class="tems_gis" id="tems_gis"></div>
        <div id="controlLayer">
            <img class="Iconimg" v-for="(t, i) in icons" :key="i" :title="t.title" :src="t.url" @click="operation(t)">
        </div>
        <!-- 左侧的图层控制 -->
        <div class="gisLeft" id="gisLeft">
            <div class="layerControlForm">
                <div class="layerControlFormTitle">图层控制</div>
                <div class="layerControlFormBody">
                    <layerCheck :title="titleOne" :data="news"></layerCheck>
                </div>
                <div class="layerControlFormBody">
                    <layerCheck :title="titleTwo" :data="equipment"></layerCheck>
                </div>
            </div>
            <div class="layerControl" @click="showLayerControl">图层控制</div>
        </div>
        <!-- 右侧的时间公告栏 -->
        <div v-if="ifEventBulletin" class="eventBulletin">
            <div class="eventBullentinTitle">事件公告</div>
            <div class="eventBullentinList" v-ifScroll>
                <div v-if="eventList.length === 0" class="eventListNode" style="height:100%;font-size:30px;line-height:20">
                    暂无数据
                </div>
                <div v-for="item in eventList" :key="item.id" class="eventListNode">
                    <el-tooltip class="item" effect="dark" :content="item.createdTimelittile || '暂无'" placement="top-start">
                        <span class="tipsGisRight">{{item.createdTimelittile || "暂无"}}</span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="item.area || item.districtRegionId || '无'" placement="top-start">
                        <span class="tipsGisRight">{{item.area || item.districtRegionId || "无"}}</span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="item.intelligenceName || '无'" placement="top-start">
                        <span>{{item.intelligenceName || "无"}}</span>
                    </el-tooltip>
                    <span class="eventListNodeBtn" @click="eventDetail(item)">查看详情</span>
                </div>
            </div>
        </div>
        <!-- 元素的提示框 -->
        <div class="" id="tooltip" style="display:none;">
            <div class="tooltip tooltip-measure">
                <div class="closeTooltip" @click="removeTooltip">x</div>
                <div class="tooltipContent">{{tooltip.intelligenceName}}</div>
                <div class="tooltipContent">{{tooltip.area}}</div>
                <div class="tooltipContent">{{tooltip.createdTime}}</div>
            </div>
            <div class="tooltipBtn">
                <span class="clearWarn" v-if="tooltip.alarm" @click.native="clearWarn">取消告警</span>
                <!-- <span class="watchVideo" v-if="tooltip.number !== '9' && tooltip.number !== '26' " @click.native="watchVideos">查看视频</span> -->
                <span class="watchVideo" v-if="tooltip.Videodisplay" @click.native="watchVideos">查看视频</span>
                <span class="showDetail" @click.native="MapeventDetail">展示详情</span>
            </div>
        </div>
        <!-- 底部的操作按钮 -->
        <div class="bottomBtn">
            <!-- <span class="bottomBtnNode" v-for="item in bottomBtn" :key="item.name" @click="analays(item.method)">
                {{item.name}}
            </span> -->
            <el-button :class="item.checked === true?'checked':'bottomBtnNode'" v-for="item in bottomBtn" :key="item.name" @click="analays(item)" type="primary" size="mini">{{item.name}}</el-button>
        </div>

        <!-- 右侧的交通状态观测数据 -->
        <div class=""></div>
        <!-- 右侧的查看视频 -->
        <watchVideo ref="watchVideo" v-if="ifEventVideo" @showOrHide="showOrHide" class="eventVideo" id="eventVideo"></watchVideo>
        <!-- 左上角的内容 -->
        <leftTop ref="leftTop" class="leftTop" @searchEvent="searchEvent" @handleCheckedCitiesChange="handleCheckedCitiesChange" @tidalsearchEvent="tidalsearchEvent" @changePageStatus="changePageStatus" :point="point" :pageStatus="pageStatus" @drawPoint="drawPoint" @changeRoadPoint="changeRoadPoint" :roadPoint="roadPoint" @trafficFlow="trafficFlow" @ODwatch="ODwatch" @trafficWatch="trafficWatch"  @roadWatch="roadWatch" @ODTimerChange="ODTimerChange"></leftTop>
        <!-- 公告详细信息 -->
        <eventDetail ref="eventDetail" @showOrHide="watchVideos" @eventDetailClearWarn="clearWarn"></eventDetail>
        <trafficCom ref="trafficCom" class="trafficCom" :point="point" @drawPoint="drawPoint" :roadPoint="roadPoint" v-show="ifTrafficCom" @changeRoadPoint="changeRoadPoint"  @roadWatch="roadWatch"></trafficCom>
        <!-- 交通状态观测侧边栏 -->
        <trafficFlowLow ref="trafficFlowLow" v-if="pageStatus === 'trafficLow' || pageStatus === 'trafficFlow'" :pageStatus="pageStatus" class="trafficCom"></trafficFlowLow>
        <!-- 导出的列表 -->
        <div style="display:none">
            <table id="tableData">
                <!-- <caption>不正经的统计表</caption>可以生成表格的标题 -->
                <thead>
                    <tr>
                        <th>报警时间</th>
                        <th>区域</th>
                        <th>报警类型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in eventList" :key="key">
                        <td>{{item.createdTimelittile || "无"}}</td>
                        <td>{{item.area || "无"}}</td>
                        <td>{{item.intelligenceName || "无"}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="popup" class="mapDialogHover">
            <div id="trafficWatchEarch" v-if="pageStatus === 'trafficWatch'">
                <div class="trafficWatchLeftTitle">{{trafficComNumber.name}}</div>
                <div class="trafficWatchEarchBody">
                    <div v-for="(item, index) in trafficComNumber.color" :key="index" style="width:140px !important;height:100px;text-align:center">
                        <el-progress type="circle" :width="70" :percentage="trafficComNumber.value[index]" :color="item"></el-progress>
                        <div style="font-size:14px;text-align:center;">{{trafficComNumber.keyName[index]}}</div>
                    </div>
                </div>
            </div>
            <div v-if="pageStatus === 'trafficFlow'" id="trafficFlowChoseId">
                <div v-if="trafficFlowChose.carCount">
                    车辆数：{{trafficFlowChose.carCount}}
                </div>
                <div v-else>区域指数</div>
            </div>
            <div v-else id="popup-content"></div>
        </div>
    </div>
</template>

<style>
/* 鼠标划入事件外边框  */
.mapDialogHover {
  max-width: 500px;
  min-width: 150px;
  position: absolute;
  top: 0px;
  background-color: black;
  display: none;
  border-radius: 5px;
  padding: 15px;
}
/* 鼠标划入事件内容 */
.mapDialogHover > #popup-content {
  width: 100%;
  color: white;
  text-align: center;
}
.mapDialogHover > #trafficWatchEarch {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
}
.mapDialogHover > #trafficWatchEarch > .trafficWatchLeftTitle {
  border-right: 1px solid #fff;
  font-size: 25px;
  padding: 0;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
}
.mapDialogHover > #trafficWatchEarch > .trafficWatchEarchBody {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.mapDialogHover > #trafficWatchEarch > .trafficWatchEarchBody > div {
  width: 100px !important;
  height: 90px !important;
  overflow: hidden;
}
.mapDialogHover > #popup-content > .carWatchEarch {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.mapDialogHover > #popup-content > .carWatchEarch > div {
  width: 150px !important;
  height: 160px !important;
}
.mapDialogHover > #popup-content > .carWatchEarch1 {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.mapDialogHover > #popup-content > .carWatchEarch1 > div {
  width: 170px !important;
  height: 200px !important;
  overflow: hidden;
}
.GIS_page {
  width: 100%;
  height: 100%;
  position: relative;
}
.tems_gis {
  width: 100%;
  height: 100%;
}
#controlLayer {
  width: 420px;
  height: 35px;
  border: 1px solid #80f6f8;
  background-color: #000;
  opacity: 0.6;
  border-radius: 5px;
  position: absolute;
  top: -30px;
  left: 33vw;
  z-index: 100;
}
#controlLayer:hover {
  cursor: move;
  width: 420px;
  height: 35px;
  border: 1px solid #80f6f8;
  background-color: #000;
  opacity: 0.6;
  border-radius: 5px;
  position: absolute;
  top: 0px;
  left: 33vw;
}
/* 隐藏 放大缩小键 */
.ol-zoom {
  left: -50px;
  top: -80px;
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
#tooltip {
  overflow: hidden;
}
.tooltip {
  position: relative;
  background: rgb(3, 8, 37, 0.85);
  border-radius: 4px;
  color: #4cbfe7 !important;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}
.tooltipContent {
  font-size: 14px;
}
.tooltip-measure {
  opacity: 1;
  font-weight: bold;
  width: 230px;
  height: 160px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.tooltipContent {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
}
.tooltipBtn {
  display: flex;
  justify-content: space-around;
  position: relative;
  bottom: 0;
  top: 10px;
  height: 40px;
  line-height: 40px;
}
.tooltipBtn span {
  text-align: center;
  margin: 0 5px 0 0px;
  display: block;
  border: 1px solid;
  border-radius: 5px;
  height: 25px;
  /* width: 60px; */
  padding: 0 8px;
  line-height: 25px;
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
.eventBulletin {
  box-sizing: border-box;
  width: 310px;
  position: absolute;
  top: 0;
  bottom: 160px;
  right: -310px;
  background-color: rgba(3, 8, 37, 0.9);
  animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  -webkit-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -moz-animation-fill-mode: forwards;
  -o-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -o-animation-fill-mode: forwards;
  background-image: url(./border.png);
  background-size: 100% 100%;
  padding-bottom: 10px;
}
@keyframes showEnentBulletin {
  0% {
    right: -310px;
  }
  100% {
    right: 0px;
  }
}
@-o-keyframes showEnentBulletin {
  0% {
    right: -310px;
  }
  100% {
    right: 0px;
  }
}
@-moz-keyframes showEnentBulletin {
  0% {
    right: -310px;
  }
  100% {
    right: 0px;
  }
}
@-webkit-keyframes showEnentBulletin {
  0% {
    right: -310px;
  }
  100% {
    right: 0px;
  }
}
.eventBullentinTitle {
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #12f8f5;
}
.eventBullentinList {
  position: absolute;
  top: 40px;
  width: 100%;
  bottom: 15px;
  overflow: auto;
}
.eventListNode > span {
  display: block;
  font-size: 12px !important;
  overflow: hidden;
  width: 24%;
  text-align: center;
}
.eventListNode {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #4cbfe7 !important;
  height: 30px;
  line-height: 30px;
}
.eventListNodeBtn {
  color: #13f95b;
}
.eventListNodeBtn:hover {
  cursor: pointer;
}
/* 查看视频 */
.eventVideo {
  box-sizing: border-box;
  width: 345px;
  position: absolute;
  top: 0;
  bottom: 0px;
  right: -310px;
  z-index: 2030;
  /* background-color: rgba(255, 255, 255, 0.8); */
  animation: showEventVideo 0.5s ease-in-out;
  animation-fill-mode: forwards;
  -webkit-animation: showEventVideo 0.5s ease-in-out;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showEventVideo 0.5s ease-in-out;
  -moz-animation-fill-mode: forwards;
  -o-animation: showEventVideo 0.5s ease-in-out;
  -o-animation-fill-mode: forwards;
  z-index: 3000 !important;
}
.eventVideoT {
  z-index: 3000 !important;
  box-sizing: border-box;
  width: 345px;
  position: absolute;
  top: 0;
  bottom: 0px;
  right: 0px;
  /* background-color: rgba(255, 255, 255, 0.8); */
  animation: showEventVideoT 0.5s ease-in-out;
  animation-fill-mode: forwards;
  -webkit-animation: showEventVideoT 0.5s ease-in-out;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showEventVideoT 0.5s ease-in-out;
  -moz-animation-fill-mode: forwards;
  -o-animation: showEventVideoT 0.5s ease-in-out;
  -o-animation-fill-mode: forwards;
}
@keyframes showEventVideo {
  0% {
    right: -345px;
  }
  100% {
    right: 0px;
  }
}
@-webkit-keyframes showEventVideo {
  0% {
    right: -345px;
  }
  100% {
    right: 0px;
  }
}
@-o-keyframes showEventVideo {
  0% {
    right: -345px;
  }
  100% {
    right: 0px;
  }
}
@-moz-keyframes showEventVideo {
  0% {
    right: -345px;
  }
  100% {
    right: 0px;
  }
}
@keyframes showEventVideoT {
  0% {
    right: 0px;
  }
  100% {
    right: -345px;
  }
}
@-webkit-keyframes showEventVideoT {
  0% {
    right: 0px;
  }
  100% {
    right: -345px;
  }
}
@-o-keyframes showEventVideoT {
  0% {
    right: 0px;
  }
  100% {
    right: -345px;
  }
}
@-moz-keyframes showEventVideoT {
  0% {
    right: 0px;
  }
  100% {
    right: -345px;
  }
}
/* 底部按钮 */
.bottomBtn {
  display: flex;
  position: absolute;
  bottom: 8px;
  height: 40px;
}
.bottomBtnNode {
  padding: 5px 10px;
  font-size: 15px;
  margin-left: 15px;
  background-color: #040726;
  color: #66d2d5;
  border: 1px solid #34598d;
  border-radius: 5px;
  display: inline-block;
  line-height: 28px;
}
.checked {
  padding: 5px 10px;
  font-size: 15px;
  margin-left: 15px;
  /* background-color: #040726; */
  color: #66d2d5;
  /* border: 1px solid #34598d; */
  border-radius: 5px;
  display: inline-block;
  line-height: 28px;
  background-color: #66d2d5 !important;
  color: #fff !important;
  border: none;
}
/* 鹰眼位置 */
.ol-custom-overviewmap,
.ol-custom-overviewmap.ol-uncollapsible {
  bottom: 0;
  left: auto;
  right: 0;
  top: auto;
}
.ol-scale-line {
  bottom: 60px;
  left: 15px;
}
.ol-attribution {
  display: none;
}
.gisLeft {
  position: absolute;
  width: 40%;
  height: 100%;
  transform: translateX(-100%);
  left: 20px;
  z-index: 2;
  top: 0;
}
.gisLeftT {
  position: absolute;
  width: 40%;
  height: 100%;
  z-index: 2;
  top: 0;
}
.layerControl {
  width: 20px;
  height: 100px;
  line-height: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: beige;
  word-wrap: break-word;
  font-size: 15px;
  text-align: center;
  color: black;
  cursor: pointer;
}
.layerControlForm {
  width: calc(100% - 20px);
  background: rgb(3, 8, 37, 0.9);
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #000000;
  color: #03082548;
  font-size: 14px;
  background-image: url(./border.png);
  background-size: 100% 100%;
  padding: 10px;
}
.showLayerControl {
  animation: showLayerControl 0.5s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  -webkit-animation: showLayerControl 0.5s ease-in-out 0.2s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showLayerControl 0.5s ease-in-out 0.2s;
  -moz-animation-fill-mode: forwards;
  -o-animation: showLayerControl 0.5s ease-in-out 0.2s;
  -o-animation-fill-mode: forwards;
}
.hideLayerControl {
  animation: hideLayerControl 0.5s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  -webkit-animation: hideLayerControl 0.5s ease-in-out 0.2s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: hideLayerControl 0.5s ease-in-out 0.2s;
  -moz-animation-fill-mode: forwards;
  -o-animation: hideLayerControl 0.5s ease-in-out 0.2s;
  -o-animation-fill-mode: forwards;
}
@keyframes hideLayerControl {
  0% {
    transform: translateX(0%);
    left: 0px;
  }
  100% {
    transform: translateX(-100%);
    left: 20px;
  }
}
@-o-keyframes hideLayerControl {
  0% {
    transform: translateX(0%);
    left: 0px;
  }
  100% {
    transform: translateX(-100%);
    left: 20px;
  }
}
@-webkit-keyframes hideLayerControl {
  0% {
    transform: translateX(0%);
    left: 0px;
  }
  100% {
    transform: translateX(-100%);
    left: 20px;
  }
}
@-moz-keyframes hideLayerControl {
  0% {
    transform: translateX(0%);
    left: 0px;
  }
  100% {
    transform: translateX(-100%);
    left: 20px;
  }
}
@keyframes showLayerControl {
  0% {
    transform: translateX(-100%);
    left: 20px;
  }
  100% {
    transform: translateX(0%);
    left: 0px;
  }
}
@-moz-keyframes showLayerControl {
  0% {
    transform: translateX(-100%);
    left: 20px;
  }
  100% {
    transform: translateX(0%);
    left: 0px;
  }
}
@-webkit-keyframes showLayerControl {
  0% {
    transform: translateX(-100%);
    left: 20px;
  }
  100% {
    transform: translateX(0%);
    left: 0px;
  }
}
@-o-keyframes showLayerControl {
  0% {
    transform: translateX(-100%);
    left: 20px;
  }
  100% {
    transform: translateX(0%);
    left: 0px;
  }
}
.layerControlFormTitle {
  width: 100%;
  height: 4%;
  /* background: rgb(167, 166, 164, 0.6); */
  /* color: #000; */
  text-align: left;
  font-size: 25px;
  color: #4cbfe7;
}
.layerControlFormBody {
  width: 100%;
  /* height: 48%; */
  height: auto;
  /* border-top: 1px solid #000000; */
  /* border-bottom: 1px solid #fff; */
  text-align: left;
  padding: 15px;
  box-sizing: border-box;
  color: #000;
}
/* 选择区域关闭按钮样式tooltip-measure */
.closedTooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  white-space: nowrap;
  cursor: pointer;
}
.closeTooltip {
  position: absolute;
  top: 5px;
  right: 15px;
  width: 16px;
  font-size: 25px;
  height: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
}
.closeTooltip:hover {
  color: #54d5ff;
}
.clearWarn {
  background-color: rgb(19, 102, 33, 0.85);
  color: #fff;
}
.watchVideo {
  background-color: rgb(159, 122, 9, 0.85);
  color: #fff;
}
.showDetail {
  background-color: rgb(16, 41, 107, 0.85);
  color: #fff;
}
/* 左上角的功能区域 */
.leftTop {
  position: absolute;
  top: 0;
  /* left: 35px; */
  padding: 40px 15px 0;
}
/* 地图闪烁点样式 */
#css_animation {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.9);
  transform: scale(0);
  animation: myfirst 1s;
  animation-iteration-count: infinite;
}
@keyframes myfirst {
  to {
    transform: scale(2);
    background: rgba(0, 0, 0, 0);
  }
}
/* 地图右键样式 */
.map_contextmenu {
  position: absolute;
  padding: 12px 0;
  z-index: 9;
  background-color: white;
  width: 120px;
  border-radius: 4px;
}
.map_contextmenu ul {
  padding: 6px 2px 0 2px;
  list-style: none;
}
.map_contextmenu > ul > li {
  text-align: center;
  padding: 5px 0;
}
.map_contextmenu > ul > li:hover {
  background-color: rgba(255, 0, 0, 0.5);
}
/* 交通构成观测 */
.trafficCom {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  background-color: rgb(3, 8, 37, 0.85);
}
</style>

<script>
import ol from "openlayers";
import "openlayers/css/ol.css";
import saveAs from "save-as";
import store from "@/public/store/store";
// 引入坐标转换
import coordtransform from "coordtransform";
// 引入gis初始化方法类集合
import GisClassMethod from "@/public/GisClassMethod";
// 导入图片
import drag from "@/assets/static/drag.png";
import Boxselection from "@/assets/static/Boxselection.png";
import sign from "@/assets/static/sign.png";
import measure from "@/assets/static/measure.png";
import Preservation from "@/assets/static/Preservation.png";
import Export from "@/assets/static/export.png";
import exitFullScreen from "@/assets/static/exitFullScreen.png";
import Big from "@/assets/static/big.png";
import Small from "@/assets/static/small.png";
import { setTimeout } from "timers";
// 导入左侧的选择框
import layerCheck from "./layerCheck";
// 引入左上角的功能部分
import leftTop from "./leftTop";
// 引入事件详情的弹窗
import eventDetail from "./eventDetail";
// 引入查看视频的侧边栏
import watchVideo from "./watchVideo";
// 引入交通构成右侧侧边栏
import trafficCom from "./trafficCom";
// 引入交通状态观测的侧边栏
import trafficFlowLow from "./trafficFlowLow";
import html2canvas from "html2canvas";

export default {
    components: {
        layerCheck,
        leftTop,
        eventDetail,
        watchVideo,
        trafficCom,
        trafficFlowLow
    },
    data() {
        return {
            // 当前时间转换
            timedata: this.$filter.timesFormat(new Date()),
            thistime: this.$tools.setTimeUse(this.timedata),
            // 地图中心点
            //mapCenter: [117.384925, 38.998398],
			mapCenter: [120.125347,32.540074],
            icons: [
                { title: "放大", url: Big, correspondingEvent: "enlarge" },
                { title: "缩小", url: Small, correspondingEvent: "reduce" },
                { title: "选择区域", url: Boxselection, correspondingEvent: "selectionArea" },
                { title: "标记", url: sign, correspondingEvent: "markPointPosition" },
                { title: "测距", url: measure, correspondingEvent: "mapRanging" },
                { title: "保存", url: Preservation, correspondingEvent: "mapPreservation" },
                { title: "导出", url: Export, correspondingEvent: "mapExport" },
                { title: "退出全屏", url: exitFullScreen, correspondingEvent: "exitFullScreen" }
            ],
            masking: true,
            // 全局的map地图
            mapGis: "",
            // 地图底层图层
            bottomMapLayer: "",
            // 根据坐标描点层(使用自定义图标层)
            coordinateTracingPointImg: "",
            QingbaocoordinateTracingPointImg: "", // 情报告警坐标描点层
            TidalFlowRendering: "", // 潮汐流图层(应该是用不上)
            ErrorData: [], // 坐标点集合
            // 地图控件
            controls: [],
            // 全局的draw
            draws: "",
            // 全局状态
            status: "",
            // 图层控制
            titleOne: "情报",
            // 情报种类的数据
            news: [],
            titleTwo: "设备",
            // 设备的种类
            equipment: "",
            // 当前操作的动作的元素的id
            ids: "",
            // 底部的操作按钮
            bottomBtn: [],
            // 右侧的事件公告是否存在
            ifEventBulletin: true,
            // 事件公告列表
            eventList: [],
            // 是否显示地图弹窗
            dialogVisible: false,
            // 当前选中的点位信息
            tooltip: {},
            // 右侧的查看视频是否存在
            ifEventVideo: false,
            // 右侧的查看视频的数据
            eventVideo: [],
            // websockt改变时请求的url
            url: "",
            // 交通构成观测是否显示
            ifTrafficCom: false,
            // 交通构成获取的数据
            trafficWatchList: [],
            // 交通构成的鼠标移入获得的数据
            trafficComNumber: {
                name: "",
                color: ["#ee70e9", "#3ad1bf", "#6cd13a", "#fe69a8"],
                value: [],
                keyName: ["到达交通比例", "驶离交通比例", "内部交通比例", "过境交通比例"]
            },
            // 左上角的按钮
            pageStatus: "eventBulletin",
            // 所有事件类型的数据集合
            intelligence: [],
            PiontCoordinateLocus: "", // 坐标描线段层
            // OD数据
            ODnumber: [],
            // OD的工作日，双休日， 法定节假日
            ODTimer: "工作日",
            // 潮汐流假数据
            tidalWatchdata: [],
            // tidalWatchdata: [
            //     {
            //         id: "26545",
            //         crossIdOne: "2",
            //         crossIdTwo: "4",
            //         crossIdOnetude:
            //             '[{"longitude": 117.25982666015625, "latitude": 38.96986970684915},{"longitude": 117.26600646972658, "latitude": 38.994956257094174},{"longitude": 117.2735595703125, "latitude": 39.01843348136694},{"longitude": 117.28248596191406, "latitude": 39.042169566357444}]',
            //         crossIdTwotude:
            //             '[{"longitude": 117.28248596191406, "latitude": 39.042169566357444},{"longitude": 117.2735595703125, "latitude": 39.01843348136694},{"longitude": 117.26600646972658, "latitude": 38.994956257094174},{"longitude": 117.25982666015625, "latitude": 38.96986970684915}]',
            //         forwardTraffic: 65,
            //         reverseTrafficFlow: 58,
            //         currentCXI: 0.666,
            //         expectedSymPerCXI: 1.589,
            //         tidalFlowLevel: 1,
            //         area: "咸水沽"
            //     },
            //     {
            //         id: "78485",
            //         crossIdOne: "2",
            //         crossIdTwo: "4",
            //         crossIdOnetude:
            //             '[{"longitude": 117.42633819580078, "latitude": 38.96319625563555},{"longitude": 117.38925933837889, "latitude": 38.963730154867875},{"longitude": 117.34943389892578, "latitude": 38.966399590677185},{"longitude": 117.32334136962889, "latitude": 38.96746733683622}]',
            //         crossIdTwotude:
            //             '[{"longitude": 117.32334136962889, "latitude": 38.96746733683622},{"longitude": 117.34943389892578, "latitude": 38.966399590677185},{"longitude": 117.38925933837889, "latitude": 38.963730154867875},{"longitude": 117.42633819580078, "latitude": 38.96319625563555}]',
            //         forwardTraffic: 25,
            //         reverseTrafficFlow: 35,
            //         currentCXI: 0.6646,
            //         expectedSymPerCXI: 1.515,
            //         tidalFlowLevel: 2,
            //         area: "咸水沽"
            //     },
            //     {
            //         id: "594854",
            //         crossIdOne: "2",
            //         crossIdTwo: "4",
            //         crossIdOnetude:
            //             '[{"longitude": 117.47783660888672, "latitude": 38.98188033470262},{"longitude": 117.44522094726561, "latitude": 38.98828516993382},{"longitude": 117.41638183593751, "latitude": 38.99308841607217},{"longitude": 117.38273620605469, "latitude": 39.00562868860922}]',
            //         crossIdTwotude:
            //             '[{"longitude": 117.38273620605469, "latitude": 39.00562868860922},{"longitude": 117.41638183593751, "latitude": 38.99308841607217},{"longitude": 117.44522094726561, "latitude": 38.98828516993382},{"longitude": 117.47783660888672, "latitude": 38.98188033470262}]',
            //         forwardTraffic: 52,
            //         reverseTrafficFlow: 53,
            //         currentCXI: 0.6566,
            //         expectedSymPerCXI: 1.58,
            //         tidalFlowLevel: 3,
            //         area: "小站镇"
            //     },
            //     {
            //         id: "235695",
            //         crossIdOne: "2",
            //         crossIdTwo: "4",
            //         crossIdOnetude:
            //             '[{"longitude": 117.53517150878906, "latitude": 38.972271995383295},{"longitude": 117.54478454589842, "latitude": 38.99682404881736},{"longitude": 117.55233764648436, "latitude": 39.01950044278064},{"longitude": 117.55748748779295, "latitude": 39.03576960931062}]',
            //         crossIdTwotude:
            //             '[{"longitude": 117.55748748779295, "latitude": 39.03576960931062},{"longitude": 117.55233764648436, "latitude": 39.01950044278064},{"longitude": 117.54478454589842, "latitude": 38.99682404881736},{"longitude": 117.53517150878906, "latitude": 38.972271995383295}]',
            //         forwardTraffic: 26,
            //         reverseTrafficFlow: 36,
            //         currentCXI: 0.6666,
            //         expectedSymPerCXI: 1.55,
            //         tidalFlowLevel: 4,
            //         area: "北闸口镇"
            //     }
            // ],
            // 营运车辆假数据
            operatingVehicles: [
                {
                    id: "4514514",
                    location: [
                        { longitude: 117.27527618408203, latitude: 38.98064183291049 },
                        { longitude: 117.28729248046876, latitude: 38.9945184862778 },
                        { longitude: 117.31990814208983, latitude: 39.00652493282132 },
                        { longitude: 117.34737396240234, latitude: 39.01559511891281 }
                    ],
                    pp: "ninin"
                },
                {
                    id: "4584584",
                    location: [
                        { longitude: 117.45208740234374, latitude: 38.963559140707986 },
                        { longitude: 117.41432189941408, latitude: 38.96302524018694 },
                        { longitude: 117.36454010009764, latitude: 38.96382608945973 },
                        { longitude: 117.30995178222656, latitude: 38.96863099498606 }
                    ],
                    pp: "sdsdsd"
                },
                {
                    id: "74848541",
                    location: [
                        { longitude: 117.49088287353516, latitude: 38.97557083870072 },
                        { longitude: 117.46238708496094, latitude: 38.99024903652267 },
                        { longitude: 117.43629455566408, latitude: 38.98864792646387 },
                        { longitude: 117.41054534912111, latitude: 38.99585263650661 }
                    ],
                    pp: "iiikik"
                }
            ],
            // 交通状态观测的假数据
            trafficFlowNumber: [],
            // 交通状态观测的移入事件数据
            trafficFlowChose: {},
            // 点位列表
            point: [],
            // 路口交通观测选择的点位
            roadPoint: "",
            // 移动时的提示框
            moveTip: "",
            // 情报定时器
            eventBulletinTimer: "",
            // 潮汐流定时器
            tidalTimer: "",
            // 情报告警url参数，用于定时器更新数据时确定url使用，从下层传回
            MapGlobalUrlData: "",
            // 潮汐流url参数，用于定时器更新数据时确当url使用，从下层传回
            TidalUrlData: "",
            // 交通状态观测定时器
            trafficFlowTimer: ""
        };
    },
    directives: {
        // 跟随鼠标移动指令
        drag(el, bindings) {
            el.onmousedown = e => {
                let parentWidth = el.parentNode.offsetWidth;
                let parentHeight = el.parentNode.offsetHeight;
                let disx = e.pageX - el.offsetLeft;
                let disy = e.pageY - el.offsetTop;
                document.onmousemove = e => {
                    let left = e.pageX - disx;
                    let top = e.pageY - disy;
                    if (left < 0 && top < 0) {
                        el.style.left = 0 + "px";
                        el.style.top = 0 + "px";
                    } else if (left < 0) {
                        el.style.left = 0 + "px";
                        el.style.top = top + "px";
                    } else if (top < 0) {
                        el.style.left = left + "px";
                        el.style.top = 0 + "px";
                    } else if (top > parentHeight - 40) {
                        el.style.left = left + "px";
                        el.style.top = parentHeight - 40 + "px";
                    } else if (left > parentWidth - 400) {
                        el.style.left = parentWidth - 400 + "px";
                        el.style.top = top + "px";
                    } else {
                        el.style.left = left + "px";
                        el.style.top = top + "px";
                    }
                };
                document.onmouseup = () => {
                    document.onmousemove = document.onmouseup = null;
                };
            };
        }
    },
    watch: {
        // changes: function() {
        //     if (this.pageStatus === "eventBulletin") {
        //         let url = this.url ? this.url : "/intelligenceCustom/?status=1&intelligenceStatus=1&alarmStatus=1";
        //         this.searchEvent(url);
        //     }
        // },
        // 监听是否切换按钮
        pageStatus: {
            handler: function (val, oldval) {
                this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
                this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框

                // 监听到变化后调用函数首先清除所有的定时器，然后在各自的函数中再打开对应的定时器
                this.eraseTimer();

                // 移动提示框
                let container = document.getElementById("popup");
                let pageStatus = this.pageStatus;
                if (pageStatus === "trafficWatch") {
                    container.style.width = "320px";
                } else if (pageStatus === "carWatch") {
                    container.style.width = "350px";
                } else if (pageStatus === "tidalWatch" || pageStatus === "tidalLow") {
                    container.style.width = "450px";
                } else if (pageStatus === "carLow") {
                    container.style.width = "400px";
                } else {
                    container.style.width = "10vw";
                }
                if (this.moveTip) return;
                // let container = document.getElementById('popup');
                container.style.display = "block";
                let content = document.getElementById("popup-content");
                // let closer = document.getElementById('popup-closer');
                let overlay = new ol.Overlay({
                    element: container,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 20
                    },
                    offset: [5, 10]
                });
                this.moveTip = overlay;
                this.mapGis.addOverlay(overlay);
            }
        }
    },
    computed: {
        // websockt 的改变
        // changes: function() {
        //     return this.$store.state.intelligenceRef;
        // }
    },
    methods: {
        // 处理坐标点,用于在地图上标记警告点使用
        InitGisPointData(dataSource, type, name, startti) {
            let data = [];
            dataSource.map(t => {
                let point = [];
                point.push(t.longitude, t.latitude);
                data.push({
                    point: point, // 报警坐标
                    id: t.id, // 事件id
                    sTypeId: t.sTypeId, // 事件编号
                    status: t.status, // 事件状态
                    statTime: t.statTime, // 事件开始时间
                    quyu: t.quyu // 事件区域
                });
            });
            // 处理坐标点偏移问题
            // data.map(t => {
            //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
            // });
            if (!type || name) {
                this.QingbaoInitializationLayer(data); // 初始化标点图层
            } else {
                this.QingbaoInitializationLayero(data); // 地图点位变化时重新汇点
            }
            this.ScintillationPoint(data, startti); // 地图闪烁点
            // return data;
        },
        // 处理多个坐标点集合，用于地图箭头线的绘制
        InitGiswheadlayerData(dataSource, type) {
            let data = [];
            dataSource.map(ele => {
                let obj = {};
                let locationPonitObj = [];
                ele.locationPonitObj.map(el => {
                    let point = [];
                    point.push(el.longitude, el.latitude); // 报警坐标
                    locationPonitObj.push({ point: point });
                });
                obj.locationPonitObj = locationPonitObj;
                data.push(obj);
            });
            // 处理坐标点偏移问题
            // data.map(t => {
            //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
            // });
            if (!type) {
                this.Initarrowheadlayer(data); // 初始化箭头线图层
            } else {
                this.Initarrowheadlayero(data); // 箭头线数据变化时重新绘制
            }
            // return data;
        },
        // 获取坐标点数据用于情报告警
        getGISData(data, type, name, startti) {
            this.ErrorData = [...data];
            let PonitdataSource = []; // 点坐标集合
            let wheadlayerdataSource = []; // 线坐标集合
            this.ErrorData.map(t => {
                if (t) {
                    if (!t.location) {
                        PonitdataSource.push({
                            id: t.id,
                            sTypeId: `d_${t.incidentType}`,
                            status: `${t.incidentStatus}`,
                            longitude: t.longitude,
                            latitude: t.latitude,
                            statTime: t.incidentStartTime,
                            quyu: t.districtRegionId // 事件区域
                        });
                    } else {
                        let locationPonit = JSON.parse(t.location);
                        if (locationPonit.length > 1) {
                            // locationPonit多个对象时，需要绘制箭头线
                            let locationPonitObj = { locationPonitObj: [...locationPonit] };
                            wheadlayerdataSource = [...wheadlayerdataSource, locationPonitObj];
                            PonitdataSource.push({
                                id: t.id,
                                sTypeId: t.intelligenceId,
                                // sTypeId: `d_${t.number}`,
                                status: t.intelligenceStatus === "1" ? `0` : `1`,
                                longitude: locationPonit[locationPonit.length - 1].longitude,
                                latitude: locationPonit[locationPonit.length - 1].latitude,
                                statTime: t.startTime,
                                quyu: t.area // 事件区域
                            });
                        } else if (locationPonit.length === 1) {
                            // locationPonit一个对象时，绘制点图标
                            PonitdataSource = [
                                ...PonitdataSource,
                                {
                                    id: t.id,
                                    // sTypeId: `d_${t.number}`,
                                    sTypeId: t.intelligenceId,
                                    status: t.intelligenceStatus === "1" ? `0` : `1`,
                                    longitude: locationPonit[0].longitude,
                                    latitude: locationPonit[0].latitude,
                                    statTime: t.startTime,
                                    quyu: t.area // 事件区域
                                }
                            ];
                        }
                    }
                }
            });
            store.commit("loadingState", true); // 打开缓冲图标
            // 点处理完后，调用函数对坐标进行拼凑
            this.InitGisPointData(PonitdataSource, type, name, startti); // 处理坐标点,用于在地图上标记警告点使用
            this.InitGiswheadlayerData(wheadlayerdataSource, type); // 处理坐标点,用于在地图上标记警告点使用
        },

        // 初始化地图
        InitCarGis(coordinate) {
            // let Mapurl = "http://211.159.188.107:81/gaode_tianjin/{z}/{x}/{y}.png"; // 地图底图链接
            let scaleLineControl = GisClassMethod.ScaleLineControl(); // 地图比例尺控件初始化
            let overviewMapControl = GisClassMethod.OverViewMapControl(Mapurl); // 地图鹰眼控件初始化
            let fullScreens = GisClassMethod.FullScreen();
            this.bottomMapLayer = GisClassMethod.BottomMapLayer(Mapurl); // 地图底图图层初始化
            let MapsArrs = [this.bottomMapLayer];
            this.mapGis = GisClassMethod.TotalLayer("tems_gis", this.mapCenter, 12, 5, 21, MapsArrs); // 地图总绘制初始化
            // this.mapGis.addControl(fullScreens); // 全屏控件
            this.mapGis.addControl(scaleLineControl);
            this.mapGis.addControl(overviewMapControl); // 鹰眼，比例尺控件放进地图中
            this.mapGis.on("click", this.Mapclick); // 地图的点击事件(左击事件)
            this.mapGis.on("pointermove", this.Mapmove); // 地图的鼠标移动事件(左击事件)
            this.RightClickMap(); // 地图的点击事件(右击事件)
        },

        // 初始化标点图层
        InitializationLayer(coordinate, scale) {
            this.coordinateTracingPointImg = GisClassMethod.CoordinateTracingPointImg(coordinate, scale); // 地图根据坐标描点层(自定义图标代替)
            this.mapGis.addLayer(this.coordinateTracingPointImg);
        },
        // 情报告警初始化标点图层
        QingbaoInitializationLayer(coordinate, scale) {
            this.QingbaocoordinateTracingPointImg = GisClassMethod.QingbaoCoordinateTracingPointImg(coordinate, scale); // 地图根据坐标描点层(自定义图标代替)
            this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg);
        },
        // 初始化箭头线图层
        Initarrowheadlayer(coordinate) {
            this.PiontCoordinateLocus = GisClassMethod.PiontCoordinateLocus(coordinate);
            this.mapGis.addLayer(this.PiontCoordinateLocus); // 添加新的箭头线图层
            let PiontDrawArrowLine = GisClassMethod.PiontDrawArrowLine(this.mapGis, this.PiontCoordinateLocus); // 添加箭头图标
            this.mapGis = PiontDrawArrowLine[0];
            this.PiontCoordinateLocus = PiontDrawArrowLine[1];
            store.commit("loadingState", false); // 关闭缓冲图标
        },
        // 地图点位变化时重新汇点
        InitializationLayero(coordinate) {
            this.coordinateTracingPointImg = GisClassMethod.CoordinateChangePointImg(this.coordinateTracingPointImg, coordinate); // 地图根据坐标描点层(自定义图标代替)
        },
        // 情报告警地图点位变化时重新汇点
        QingbaoInitializationLayero(coordinate) {
            // this.mapGis.removeLayer(this.QingbaocoordinateTracingPointImg); // 先删除上一次画出的箭头线图层，
            this.QingbaocoordinateTracingPointImg = GisClassMethod.QingbaoCoordinateChangePointImg(this.QingbaocoordinateTracingPointImg, coordinate); // 地图根据坐标描点层(自定义图标代替)
        },
        // 箭头线数据变化时重新绘制
        Initarrowheadlayero(coordinate) {
            this.mapGis.removeLayer(this.PiontCoordinateLocus); // 先删除上一次画出的箭头线图层
            this.PiontCoordinateLocus = GisClassMethod.PiontCoordinateLocus(coordinate);
            this.mapGis.addLayer(this.PiontCoordinateLocus); // 添加新的箭头线图层
            let PiontDrawArrowLine = GisClassMethod.PiontDrawArrowLine(this.mapGis, this.PiontCoordinateLocus); // 地图根据坐标描点层(不使用自定义图标代替)
            this.mapGis = PiontDrawArrowLine[0];
            this.PiontCoordinateLocus = PiontDrawArrowLine[1];
            store.commit("loadingState", false); // 关闭缓冲图标
        },

        // 地图闪烁点
        ScintillationPoint(coordinate, startti) {
            let currentTime = this.$filter.timesFormat(new Date()); // 当前时间
            // startti为true当前时间减少15秒确定需要闪烁的点 // startti为false当前时间减少5秒确定需要闪烁的点
            let currentTimeJ = startti ? currentTime - 1000 * 15 : currentTime - 1000 * 5;
            let FlickerData = [];
            coordinate.map(t => {
                // this.dataLaketimeConversion(t.statTime)
                let timers = this.$filter.timesFormat(t.incidentStartTime); // 事件开始时间
                if (timers >= currentTimeJ && timers <= currentTime) {
                    FlickerData = [...FlickerData, t];
                }
            });
            if (FlickerData.length > 0) {
                FlickerData.map(t => {
                    if (t.status === "0") {
                        // 事件为开启状态
                        let point_div = document.createElement("div");
                        point_div.innerHTML = "<div id='css_animation'></div>";
                        let point_overlay = new ol.Overlay({
                            element: point_div,
                            offset: [-20, 12],
                            positioning: "bottom-left",
                            position: ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857"),
                            stopEvent: false,
                            id: t.id
                        });
                        this.mapGis.addOverlay(point_overlay);
                        point_div.parentNode.className = "scintillationPoint";
                    }
                });
                setTimeout(() => {
                    FlickerData.map(t => {
                        if (t.status === "0") {
                            // 删除对应点位的overlayer
                            let overlay = this.mapGis.getOverlayById(t.id);
                            this.mapGis.removeOverlay(overlay);
                        }
                    });
                }, 3000);
            }
        },

        // 地图绑定点击事件,点击元素时显示操作
        Mapclick(envt) {
            let pixel = this.mapGis.getEventPixel(envt.originalEvent);
            let _this = this;
            let status = this.status;
            this.mapGis.forEachFeatureAtPixel(pixel, function (feature, layer) {
                // 点击到元素，判断元素是点位时执行
                if (feature && feature.get("dataType") === "coordinate" && status !== "mapRanging" && status !== "selectionArea" && status !== "markPointPosition") {
                    if (_this.pageStatus !== "eventBulletin" && _this.pageStatus !== "roadWatch") return;
                    if (_this.pageStatus === "roadWatch") {
                        _this.ifTrafficCom = !_this.ifTrafficCom;
                        return;
                    }
                    store.commit("loadingState", true); // 打开缓冲图标
                    let coordinate = {
                        longitude: feature.get("longitude"),
                        latitude: feature.get("latitude")
                    };
                    // let item = _this.ErrorData.find(t => t.longitude === coordinate.longitude && t.latitude === coordinate.latitude);
                    let item = _this.ErrorData.map(t => {
                        if (t) {
                            if (t.location) {
                                let position = JSON.parse(t.location);
                                if (position[0] && position.length === 1) {
                                    if (t.longitude === position[0].longitude && t.latitude === position[0].latitude) {
                                        return t;
                                    }
                                }
                            }
                        }
                    });
                    if (item) {
                        let position = envt.coordinate;
                        // 获取到对应点位的id
                        let ids = feature.get("id");
                        // 删除对应点位的overlayer
                        let overlay;
                        if (_this.tooltip.id) {
                            overlay = _this.mapGis.getOverlayById(_this.tooltip.id);
                        }
                        if (overlay) {
                            _this.mapGis.removeOverlay(overlay);
                        }
                        // 添加对应点位的overlayer
                        _this.eventTip(position, _this.mapGis, ids);
                        // 对应点位的overlayer内容
                        _this.tooltip.id = ids;
                        // _this.tooltip = this.eventList.find()
                    } else {
                        store.commit("loadingState", false); // 关闭缓冲图标
                    }
                }
            });
            // 取消告警
            let AlarmButton = document.getElementsByClassName("clearWarn")[0];
            if (AlarmButton) {
                AlarmButton.onclick = function () {
                    _this.clearWarn();
                };
            }

            // 查看视频
            let watchVideoButton = document.getElementsByClassName("watchVideo")[0];
            if (watchVideoButton) {
                watchVideoButton.onclick = function () {
                    _this.watchVideoss();
                };
            }

            // 查看详情
            document.getElementsByClassName("showDetail")[0].onclick = function () {
                _this.MapeventDetail();
            };
            // 删除提示框
            document.getElementsByClassName("closeTooltip")[0].onclick = function () {
                _this.removeTooltip();
            };
        },

        // 营运车辆的鼠标移入的提示框的echart
        Columns1() {
            let myChart = this.$echarts.init(document.getElementById("Columns1"));
            let option = {
                title: {
                    x: "left",
                    text: "{value}", // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    },
                    /* subtext: '_________________________________________________________________________', // 副标题*/
                    subtextStyle: {
                        color: "#3ba7c9"
                    },
                    itemGap: 0 //主副标题距离
                },
                tooltip: {},
                // 详情
                detail: {
                    offsetCenter: [0, "10%"],
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 10
                    }
                },
                series: [
                    {
                        type: "gauge",
                        data: [{ value: 20, name: "完成率" }],
                        radius: "75%",
                        startAngle: 225,
                        endAngle: -45,
                        clockwise: true,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                                width: 10
                            }
                        },
                        // 仪表盘分割线
                        splitLine: {
                            show: true,
                            length: 10
                        },
                        // 仪表盘刻度标签
                        axisTick: {
                            show: true,
                            splitNumber: 5,
                            length: 8
                        },
                        // 仪表盘指针
                        pointer: {
                            show: true,
                            length: "50%",
                            width: 5
                        },
                        // 刻度标签
                        axisLabel: {
                            show: true,
                            distance: 5
                        }
                    }
                ]
            };

            myChart.setOption(option);
        },
        Columns2() {
            let myChart = this.$echarts.init(document.getElementById("Columns2"));
            let option = {
                title: {
                    x: "left",
                    text: "{value}", // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    }, // 副标题
                /*subtext: '_________________________________________________________________________', */ subtextStyle: {
                        color: "#3ba7c9"
                    },
                    itemGap: 0 //主副标题距离
                },
                tooltip: {},
                // 详情
                detail: {
                    offsetCenter: [0, "10%"],
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 10
                    }
                },
                series: [
                    {
                        type: "gauge",
                        data: [{ value: 20, name: "完成率" }],
                        radius: "75%",
                        startAngle: 225,
                        endAngle: -45,
                        clockwise: true,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                                width: 10
                            }
                        },
                        // 仪表盘分割线
                        splitLine: {
                            show: true,
                            length: 10
                        },
                        // 仪表盘刻度标签
                        axisTick: {
                            show: true,
                            splitNumber: 5,
                            length: 8
                        },
                        // 仪表盘指针
                        pointer: {
                            show: true,
                            length: "50%",
                            width: 5
                        },
                        // 刻度标签
                        axisLabel: {
                            show: true,
                            distance: 5
                        }
                    }
                ]
            };

            myChart.setOption(option);
        },
        Columns3() {
            let myChart = this.$echarts.init(document.getElementById("Columns3"));
            let option = {
                title: {
                    x: "left",
                    text: "{value}", // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    }, // 副标题
                /*subtext: '_________________________________________________________________________',*/ subtextStyle: {
                        color: "#3ba7c9"
                    },
                    itemGap: 0 //主副标题距离
                },
                tooltip: {},
                // 详情
                detail: {
                    offsetCenter: [0, "10%"],
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 10
                    }
                },
                series: [
                    {
                        type: "gauge",
                        data: [{ value: 20, name: "完成率" }],
                        radius: "75%",
                        startAngle: 225,
                        endAngle: -45,
                        clockwise: true,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                                width: 10
                            }
                        },
                        // 仪表盘分割线
                        splitLine: {
                            show: true,
                            length: 10
                        },
                        // 仪表盘刻度标签
                        axisTick: {
                            show: true,
                            splitNumber: 5,
                            length: 8
                        },
                        // 仪表盘指针
                        pointer: {
                            show: true,
                            length: "50%",
                            width: 5
                        },
                        // 刻度标签
                        axisLabel: {
                            show: true,
                            distance: 5
                        }
                    }
                ]
            };

            myChart.setOption(option);
        },
        Columns4() {
            let myChart = this.$echarts.init(document.getElementById("Columns4"));
            let option = {
                title: {
                    x: "left",
                    text: "{value}", // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    }, // 副标题
                /*subtext: '_________________________________________________________________________',*/ subtextStyle: {
                        color: "#3ba7c9"
                    },
                    itemGap: 0 //主副标题距离
                },
                tooltip: {},
                // 详情
                detail: {
                    offsetCenter: [0, "10%"],
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 10
                    }
                },
                series: [
                    {
                        type: "gauge",
                        data: [{ value: 20, name: "完成率" }],
                        radius: "75%",
                        startAngle: 225,
                        endAngle: -45,
                        clockwise: true,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                                width: 10
                            }
                        },
                        // 仪表盘分割线
                        splitLine: {
                            show: true,
                            length: 10
                        },
                        // 仪表盘刻度标签
                        axisTick: {
                            show: true,
                            splitNumber: 5,
                            length: 8
                        },
                        // 仪表盘指针
                        pointer: {
                            show: true,
                            length: "50%",
                            width: 5
                        },
                        // 刻度标签
                        axisLabel: {
                            show: true,
                            distance: 5
                        }
                    }
                ]
            };

            myChart.setOption(option);
        },
        Columns5() {
            let myChart = this.$echarts.init(document.getElementById("Columns5"));
            let option = {
                title: {
                    x: "left",
                    text: "{value}", // 主标题
                    textStyle: {
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#3ba7c9",
                        fontFamily: "PingFangSC-Regular"
                    },
                    subtext:
                        "_________________________________________________________________________", // 副标题
                    subtextStyle: {
                        color: "#3ba7c9"
                    },
                    itemGap: 0 //主副标题距离
                },
                tooltip: {},
                legend: {
                    show: false,
                    data: ["销量"]
                }, // 图例组件
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: "#147a86"
                        }
                    }, // y轴样式
                    type: "category",
                    data: ["衬衫", "羊毛衫", "高跟鞋", "袜子"]
                },

                series: [
                    {
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
                        },
                        name: "销量",
                        type: "bar",
                        barWidth:"10px",
                        z: 10,
                        data: [5, 20, 36, 10],
                        label: {
                            show: true,
                            position: "right",
                            color: "#fff"
                        }
                    },
                    {
                        name: "销量",
                        type: "bar",
                        barWidth:"10px",
                        data: [40, 40, 40, 40],
                        color: "#192A41",
                        barGap: "-100%"
                    }
                ]
            };
            myChart.setOption(option);
        },

        // 地图绑定的鼠标移动事件
        Mapmove(event) {
            let pixel = this.mapGis.getEventPixel(event.originalEvent);
            let _this = this;
            let content = document.getElementById("popup-content");
            let overlay = this.moveTip;
            let pageStatus = this.pageStatus;
            if (
                pageStatus !== "ODwatch" &&
                pageStatus !== "ODLow" &&
                pageStatus !== "tidalWatch" &&
                pageStatus !== "tidalLow" &&
                pageStatus !== "trafficWatch" &&
                pageStatus !== "carWatch" &&
                pageStatus !== "carLow" &&
                pageStatus !== "trafficFlow"
            )
                return;
            let features = this.mapGis.forEachFeatureAtPixel(pixel, function (
                feature,
                layer
            ) {
                return feature;
            });
            if (features) {
                let ids = features.getId();
                if (pageStatus === "ODwatch" || pageStatus === "ODLow") {
                    let item = _this.ODnumber.find(t => t.id === ids);
                    content.innerHTML = "车辆数：" + item.carCount;
                    overlay.setPosition(event.coordinate);
                }
                if (pageStatus === "tidalWatch" || pageStatus === "tidalLow") {
                    let item = _this.tidalWatchdata.find(t => t.id === ids);
                    let forwardTraffic = item.forwardTraffic ? Number(item.forwardTraffic).toFixed(2) : "无";
                    let reverseTrafficFlow = item.reverseTrafficFlow ? Number(item.reverseTrafficFlow).toFixed(2) : "无";
                    let currentCXI = item.currentCXI ? Number(item.currentCXI).toFixed(2) : "无";
                    let expectedSymPerCXI = item.expectedSymPerCXI ? Number(item.expectedSymPerCXI).toFixed(2) : "无";
                    let html = `<p>正常流量（辆/小时）：${forwardTraffic}</p>
                            <p>反向流量（辆/小时）：${reverseTrafficFlow}</p>
                            <p>当前CXI：${currentCXI}</p>
                            <p>预计对称时段CXI：${expectedSymPerCXI}</p>
                            <p>日期类型：${item.expectedSymPerCXI || "无"}</p>`;
                    if (pageStatus === "tidalLow") {
                        html = `${html}<p>日均此状态潮汐流持续状态时段：${item.tidalFlowStartTime || "无"} 至 ${item.tidalFlowEndTime || "无"}</p>`
                    }
                    content.innerHTML = html;
                    overlay.setPosition(event.coordinate);
                }
                if (pageStatus === "carWatch") {
                    let item = _this.operatingVehicles.find(t => t.id === ids);
                    content = document.getElementById("popup-content");
                    let html = `<p>顺时针车流量：${item.pp}辆/小时</p>
                        <div class="carWatchEarch">
                        <div id="Columns1" class="zpEarch" style="width: 10px;height:10px"></div>
                        <div id="Columns2" class="zpEarch" style="width: 10px;height:10px"></div>
                        <div id="Columns3" class="zpEarch" style="width: 10px;height:10px"></div>
                        <div id="Columns4" class="zpEarch" style="width: 10px;height:10px"></div>
                        </div>
                        <div id="Columns5" class="zpEarch" style="width: 300px;height:200px"></div>`;

                    content.innerHTML = html;
                    this.Columns1();
                    this.Columns2();
                    this.Columns3();
                    this.Columns4();
                    this.Columns5();
                    overlay.setPosition(event.coordinate);
                }
                if (pageStatus === "carLow") {
                    let item = _this.operatingVehicles.find(t => t.id === ids);
                    content = document.getElementById("popup-content");
                    let html = `<p>顺时针车流量：${item.pp}辆/小时</p>
                        <div class="carWatchEarch1">
                        <div id="Columns1" class="zpEarch" style="width: 10px;height:10px"></div>
                        <div id="Columns2" class="zpEarch" style="width: 10px;height:10px"></div>
                        </div>`;
                    content.innerHTML = html;
                    this.Columns1();
                    this.Columns2();
                    overlay.setPosition(event.coordinate);
                }
                // 交通构成 的移入事件 earch图表
                if (pageStatus === "trafficWatch") {
                    content = document.getElementById("trafficWatchEarch");
                    overlay.setPosition(event.coordinate);
                }
                // 交通状态的移入事件
                if (pageStatus === "trafficFlow") {
                    let chose = _this.trafficFlowNumber.find(t => t.id === ids);
                    _this.trafficFlowChose = chose || "";
                    content = document.getElementById("trafficFlowChoseId");
                    overlay.setPosition(event.coordinate);
                }
            } else {
                overlay.setPosition(undefined);
            }
            // overlay.setPosition(undefined);
        },
        // 地图右击事件
        RightClickMap() {
            let map = this.mapGis;
            let measureTooltipElement = document.createElement("div");
            let element =
                "<div id='map_contextmenu_container' class='map_contextmenu'><ul><li><a href='#'>删除</a></li></ul></div>";
            measureTooltipElement.innerHTML = element;
            let menu_overlay = new ol.Overlay({
                element: measureTooltipElement,
                positioning: "center-center"
            });
            menu_overlay.setMap(map);
            // 右击弹窗及操作
            let _this = this;
            $(map.getViewport()).on("contextmenu", function (e) {
                e.preventDefault();
                let pixel = _this.mapGis.getEventPixel(e.originalEvent);
                _this.mapGis.forEachFeatureAtPixel(pixel, function (feature, layer) {
                    // 点击到元素，判断元素不为点位时执行
                    if (
                        feature &&
                        feature.get("dataType") !== "coordinate" &&
                        feature.getId() !== "coordinate"
                    ) {
                        let coordinate = _this.mapGis.getEventCoordinate(e);
                        menu_overlay.setPosition(coordinate);
                        $("#map_contextmenu_container ul li").on("click", function () {
                            _this.mapGis.removeLayer(layer);
                            if (layer && (feature.getId() || feature.get("id"))) {
                                let overlay = feature.get("id")
                                    ? _this.mapGis.getOverlayById(feature.get("id"))
                                    : _this.mapGis.getOverlayById(feature.getId());
                                _this.mapGis.removeOverlay(overlay);
                            }
                            menu_overlay.setPosition(undefined);
                        });
                    }
                    return true;
                });
            });
            // 右击弹窗出现后左击任意位置可取消右击对话框
            $(map.getViewport()).on("click", function (e) {
                e.preventDefault();
                menu_overlay.setPosition(undefined);
            });
            this.mapGis = map;
        },
        // 放大
        enlarge() {
            let zoom = this.mapGis.getView().getZoom();
            this.mapGis.getView().setZoom(zoom + 1);
        },
        // 缩小
        reduce() {
            let zoom = this.mapGis.getView().getZoom();
            this.mapGis.getView().setZoom(zoom - 1);
        },
        // 划线选择区域
        selectionArea() {
            event.stopPropagation();
            this.status = "selectionArea";
            this.mapGis.removeInteraction(this.draws);
            let selectionArea = GisClassMethod.SelectionArea(this.mapGis);
            this.mapGis = selectionArea[0];
            this.draws = selectionArea[1];
            this.draws.on("drawend", evt => {
                setTimeout(() => {
                    this.mapGis.removeInteraction(this.draws);
                }, 200);
                let geo = evt.feature.getGeometry();
                let dataARRS = [];
                this.ErrorData.map(t => {
                    let point = ol.proj.transform(
                        [t.longitude, t.latitude],
                        "EPSG:4326",
                        "EPSG:3857"
                    );
                    if (geo.intersectsCoordinate(point)) {
                        dataARRS = [...dataARRS, t];
                    }
                });
            });
        },
        // 标记点位
        markPointPosition() {
            event.stopPropagation();
            // 标记点
            this.status = "markPointPosition";
            this.mapGis.removeInteraction(this.draws);
            let SetupDraw = GisClassMethod.SetupDraw(this.mapGis);
            this.mapGis = SetupDraw[0];
            this.draws = SetupDraw[1];
            let measureTooltipElement, measureTooltip;
            document.getElementsByClassName("GIS_page")[0].onclick = function (evt) {
                if (this.status !== "markPointPosition") return;
                let ids = new Date().getTime();
                this.ids = ids;
                let tooltipCoord = ol.proj.toLonLat(
                    this.mapGis.getEventCoordinate(evt)
                );
                let eventPoint = { id: this.ids, point: tooltipCoord };
                let markPointPosition = GisClassMethod.MarkPointPosition(
                    this.mapGis,
                    eventPoint
                );
                this.mapGis = markPointPosition[0];
                this.vector = markPointPosition[1];
                // 设置标签
                measureTooltipElement = document.createElement("div");
                measureTooltipElement.className = "tooltip tooltip-measure";
                measureTooltip = new ol.Overlay({
                    element: measureTooltipElement,
                    offset: [0, -50],
                    position: this.mapGis.getEventCoordinate(evt),
                    positioning: "bottom-center",
                    id: this.ids
                });
                measureTooltipElement.value = ol.proj.toLonLat(
                    this.mapGis.getEventCoordinate(evt)
                );
                this.mapGis.addOverlay(measureTooltip);
            }.bind(this);
            this.draws.on("drawend", evt => {
                setTimeout(() => {
                    this.status = "";
                    this.mapGis.removeInteraction(this.draws);
                }, 100);
            });
        },
        // 测距
        mapRanging() {
            event.stopPropagation();
            this.status = "mapRanging";
            this.mapGis.removeInteraction(this.draws);
            let mapRanging = GisClassMethod.MapRanging(this.mapGis);
            this.mapGis = mapRanging[0];
            this.draws = mapRanging[1];
            let vector = mapRanging[2];
            let listener, output, sketch, measureTooltipElement, measureTooltip;
            this.draws.on("drawstart", evt => {
                let ids = new Date().getTime();
                this.ids = ids;
                createMeasureTooltip();
                sketch = evt.feature; // 绘制要素,鼠标位置的信息
                sketch.setId(ids);
                let tooltipCoord = evt.coordinate; // 坐标undefined
                listener = sketch.getGeometry().on(
                    "change",
                    function (evt) {
                        let geom = evt.target; // 绘制几何要素
                        output = GisClassMethod.formatLength(geom); // 长度值
                        tooltipCoord = geom.getLastCoordinate();
                        measureTooltipElement.innerHTML = output; // 将测量值设置到测量工具提示框中显示
                        measureTooltip.setPosition(tooltipCoord);
                    },
                    this
                );
            });
            this.draws.on("drawend", evt => {
                sketch = null;
                measureTooltipElement.className = "tooltip tooltip-static"; // 设置测量提示框的样式
                measureTooltip.setOffset([0, -7]);
                // 置空测量工具提示框对象
                measureTooltipElement = null;
                // createMeasureTooltip(); // 重新创建一个测试工具提示框显示结果
                // ol.Observable.unByKey(listener);
                setTimeout(() => {
                    this.status = "";
                    this.mapGis.removeInteraction(this.draws);
                }, 200);
            });
            let createMeasureTooltip = () => {
                if (measureTooltipElement) {
                    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
                }
                measureTooltipElement = document.createElement("div");
                measureTooltipElement.className = "tooltip tooltip-static";
                measureTooltip = new ol.Overlay({
                    element: measureTooltipElement,
                    offset: [0, -15],
                    positioning: "bottom-center",
                    id: this.ids
                });
                this.mapGis.addOverlay(measureTooltip);
            };
            this.mapGis.addInteraction(this.draws);
        },
        // 保存
        mapPreservation() {
            event.stopPropagation();
            this.mapGis.removeInteraction(this.draws);
            this.mapGis.once("postcompose", function (event) {
                // let canvas = event.context.canvas;
                let gis = document.getElementsByClassName("GIS_page")[0];
                html2canvas(gis, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(canvas.msToBlob(), "map.png");
                    } else {
                        canvas.toBlob(function (blob) {
                            saveAs(blob, "map.png");
                        });
                    }
                });
            });
            this.mapGis.renderSync();
        },
        // 导出
        mapExport() {
            // alert("导出");
            event.stopPropagation();
            this.exportTable("tableData");
        },
        // 退出全屏
        exitFullScreen() {
            this.$router.push({
                path: "/gisMap"
            });
        },
        // 中间函数调用对应函数
        operation(data) {
            let args = data.correspondingEvent.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 点击'图层控制'按钮,显示或隐藏
        showLayerControl() {
            let controlForm = document.getElementById("gisLeft");
            let classValue = controlForm.className;
            if (classValue.includes("showLayerControl")) {
                controlForm.className = "gisLeftT hideLayerControl";
            } else {
                controlForm.className = "gisLeft showLayerControl";
                // 请求24种情报
                axios
                    .get("/intelligence/")
                    .then(res => {
                        this.news = res.data.data;
                    })
                    .catch(error => {
                        // this.$showSimpleMessage(error, "error");
                    });
                // 请求设备
                axios
                    .get("/equipmentType/")
                    .then(res => {
                        let equipment = res.data.data;
                        this.equipment = equipment;
                    })
                    .catch(error => {
                        // this.$showSimpleMessage(error, "error");
                    });
            }
        },
        // 点击底部的按钮事件 data 为item
        analays(data) {
            let choose = this.bottomBtn.find(t => t === data);
            this.bottomBtn.map(val => {
                val.checked = false;
            });
            // 切换页面的状态
            this.pageStatus = data.method;
            this.$refs.leftTop.pageChange = false;
            this.ifTrafficCom = false;
            if (this.pageStatus === "eventBulletin") {
                this.ifEventBulletin = true;
            } else {
                this.ifEventBulletin = false;
            }
            // 清除提示框
            if (this.tooltip.id) {
                this.removeTooltip();
            }
            choose.checked = true;
            let fn = eval(`this.${data.method}`);
            fn.apply(this);
        },

        // 情报告警的按钮
        eventBulletin() {
            this.pageStatus = "eventBulletin";
            this.ifEventBulletin = true;
            this.ifEventVideo = false;
            this.searchEvent(this.MapGlobalUrlData, "type");
            setTimeout(() => {
                if (this.eventBulletinTimer === "") {
                    this.eventBulletinTimes(); // 切换到情报告警后打开定时器
                }
            });
        },
        // 情报定时器
        eventBulletinTimes() {
            // this.eventBulletinTimer = setInterval(() => {
            //     console.log("定时执行");
            //     // this.searchEvent(this.MapGlobalUrlData, null, "startti");
            // }, 1000 * 15);
            // 道路状态观测定时
            // let _this = this;
            // this.trafficFlowTimer = setInterval(() => {
            //     let choseArea = _this.$refs.leftTop.serchContent;
            //     let choseLeval = _this.$refs.leftTop.trafficFlowList;
            //     let params = {
            //         choseLeval: choseLeval,
            //         choseArea: choseArea
            //     }
            //     _this.trafficFlow(params)
            // }, 3 * 60 * 1000)
        },
        // 情报告警左上角的搜索
        async searchEvent(data, type, startti) {
            if (!type) {
                this.MapGlobalUrlData = data
            }
            // 如果页面上有提示框则删除
            if (this.tooltip.id) {
                this.removeTooltip();
            }
            let CustomEventsMsg = await this.CustomEvents(data); // 自定义的事件
            let ShujuhuinformationTransmissionMsg = await this.ShujuhuinformationTransmission(); // 请求数据数据的传参
            let ShujuhuintelligenceEventsMsgflagO = await this.ShujuhuintelligenceEvents(ShujuhuinformationTransmissionMsg, "0", data); // 数据湖正常事件数据
            let ShujuhuintelligenceEventsMsgflagP = await this.ShujuhuintelligenceEvents(ShujuhuinformationTransmissionMsg, "1", data); // 数据湖关闭需要显示事件数据
            this.$nextTick(() => {
                this.eventList = [];
                this.$store.state.venteType.map(t => {
                    if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
                        this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagO[t.id]];
                    }
                    if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
                        this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagP[t.id]];
                    }
                });
                this.eventList = [...this.eventList, ...CustomEventsMsg];
                if (this.eventList.length === 0) {
                    this.$showSimpleMessage("暂无数据", "error");
                    if (this.tooltip.id) {
                        this.removeTooltip();
                    }
                } else {
                    this.eventList.map((t, i) => {
                        if (t.hasOwnProperty("createdTime")) {
                            t.createdTime = t.createdTime ? this.$filter.formatDateTimeMinute(t.createdTime) : "";
                            t.createdTimelittile = t.createdTime.substring(t.createdTime.length - 14);
                        }
                        if (!t.hasOwnProperty("createdTime")) {
                            let times = t.incidentStartTime.split(" ")[1];
                            t.createdTimelittile = `${times.split(":")[0]}:${times.split(":")[1]}`;
                        }
                        if (!t.hasOwnProperty("intelligenceName")) {
                            t.intelligenceName = this.$store.state.venteType.find(e => e.id === t.incidentType).name;
                        }
                        if (!t.hasOwnProperty("id")) {
                            t.id = `${new Date().getTime()}${i}`;
                        }
                    });
                }
                this.$set(this.eventList); // 数据改变出发v-for进行重新循环渲染
                // 先默认画20个吧,太卡了
                // let abc = [];
                // for (let i = 0; i < 20; i++) {
                //     abc = [...abc, this.eventList[i]];
                // }
                this.getGISData(this.eventList, "sousuo", type, startti);
                // 移动到搜索点的中心（搜索出来的第一个点位）
                // if (this.eventList[0]) {
                //     let data = this.eventList[0];
                //     let position = data.location ? JSON.parse(data.location) : [data.longitude, data.latitude];
                //     let view = this.mapGis.getView();
                //     let zoom = view.getZoom();
                //     let center = ol.proj.fromLonLat([
                //         position[0].longitude,
                //         position[0].latitude
                //     ]);
                //     view.setCenter(center);
                //     view.setZoom(zoom);
                // }
            });
        },
        // 取消告警/弹窗取消告警回调
        clearWarn(eventDetailName) {
            this.$layerNotice("提示", "您确定要取消告警吗？", () => {
                axios.put("/intelligenceCustom/close/" + this.tooltip.id).then(res => {
                    if (res.data.code === 0) {
                        this.searchEvent(this.MapGlobalUrlData);
                        if (eventDetailName) {
                            this.$refs.eventDetail.eventDetail = false;
                        }
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                    }
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 情报告警获取数据湖21种事件的接口数据
        ShujuhuintelligenceEvents(Msg, flagMsg, sousuoMsg) {
            // 情报告警，请求数据湖接口
            let params = {
                flag: flagMsg,
                incidentType: Msg
            };
            if (flagMsg === "1") {
                let newdata = new Date().getTime(); // 当前时间
                params.incidentEnd2 = this.$tools.setTimeUse(new Date(newdata)); // 事件结束时间的结束时间
                params.incidentEnd1 = this.$tools.setTimeUse(new Date(newdata - (5 * 1000 * 60))); // 事件结束时间的开始时间
            } else {
                params.currentTime = this.$tools.setTimeUse();
                params.size = 3600 * 24;
                // 搜索有时间参数时
                if (sousuoMsg && sousuoMsg.startTime && sousuoMsg.endTime) {
                    params.currentTime = sousuoMsg.endTime;
                    // params.currentTime = this.$tools.setTimeUse();
                    params.size = sousuoMsg.startTime;
                }
            }
            if (sousuoMsg) {
                params.administrativeId = sousuoMsg.area; // 区域id
            }
            return new Promise((reslove, reject) => {
                sjhAxios.post("sjh1/realtime/incidents/selectnew", params).then(res => {
                    reslove(res.data.data[0]); // 返回参数
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },
        // 情报告警获取参数显示不显示数据用于请求数据湖数据传参
        ShujuhuinformationTransmission() {
            return new Promise((reslove, reject) => {
                axios.get("/intelligence/").then(res => {
                    let missionMsg = res.data.data.filter(t => t.status === 1);
                    let missionMsgData = [];
                    missionMsg.map(t => {
                        let item = this.$store.state.venteType.find(e => e.name === t.name);
                        if (item) {
                            missionMsgData = [...missionMsgData, item.id];
                        }
                    });
                    let bianHao = "";
                    missionMsgData.map((t, i) => {
                        bianHao = i === 0 ? `${t},` : (i !== missionMsgData.length - 1 ? `${bianHao}${t},` : `${bianHao}${t}`);
                    });
                    reslove(bianHao); // 返回参数
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },
        // 情报告警获取自定义的两种事件接口数据
        CustomEvents(sousuoMsg) {
            let data = "";
            if (sousuoMsg) {
                data = sousuoMsg;
            }
            // /intelligenceCustom/?status=1&intelligenceStatus=1&alarmStatus=1
            return new Promise((reslove, reject) => {
                axios.get("/intelligenceCustom/gis/", { params: data }).then(res => {
                    reslove(res.data.data); // 返回参数
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },

        // 交通状态观测
        trafficFlow(leftchose) {
            if (this.pageStatus !== "trafficFlow") return;
            let choseLeval;
            let chose;
            if (leftchose) {
                chose = leftchose.choseLevel;
                if (leftchose.choseLevel.length === 0) {
                    chose = ["0", "1", "2", "3", "4"];
                }
            } else {
                chose = ["0", "1", "2", "3", "4"];
            }
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框

            let _this = this;
            setTimeout(() => {
                let currentTime = this.$tools.getTimeInt();
                let params = {
                    currentTime: currentTime
                };

                // 区域交通等级显示
                // sjhAxios.post("sjh2/strategysupport/status/areaTPI", params).then(res => {
                //     // console.log(res.data.data)
                //     let area = res.data.data;
                //     area.map((val, index) => {
                //         let nowId = new Date().getTime() + index;
                //         val.id = nowId;
                //         let color = _this.choseColor(val.districtRank);
                //         if (chose.includes(val.districtRank)) {
                //             _this.trafficFlowNumber.push(val);
                //             _this.areaShow(val, color);
                //         }
                //     })
                // }).catch((error) => {
                //     this.$showSimpleMessage(error, "error");
                // });
                // 路口交通等级显示
                sjhAxios.post("sjh2/strategysupport/status/crossingTPI", params).then((res) => {
                    let location = res.data.data;
                    let point = [];
                    location.map((item, index) => {
                        if (item.crossingLevel && chose.includes(item.crossingLevel) && item.longitude !== undefined && item.latitude !== undefined) {
                            let nowId = new Date().getTime() + index;
                            item.id = nowId;
                            item.point = [item.longitude, item.latitude];
                            item.intelligenceId = item.crossingLevel;
                            point.push(item);
                            _this.trafficFlowNumber.push(item);
                        }
                        this.drawPoint(point, 0.8);
                    });
                }).catch((error) => {
                    // this.$showSimpleMessage(error, "error");
                })
                // 路段交通状态等级显示
                sjhAxios.post("sjh2/strategysupport/status/roadTPI", params).then((res) => {
                    let roads = res.data.data;
                    roads.map((val, index) => {
                        // if (choseArea && choseArea.includes(val.trace[0].districtId)) {
                        let trace = val.trace;
                        let color = _this.choseColor(val.roadLevel);
                        let nowId = new Date().getTime() + index;
                        val.id = nowId;
                        if (val.roadLevel && chose.includes(val.roadLevel) && trace !== undefined) {
                            val.points = [];
                            trace.map(item => {
                                let pointer = {
                                    point: [item.longitude, item.latitude]
                                }
                                val.points.push(pointer);
                            })
                            _this.trafficFlowNumber.push(val);
                            let vector = GisClassMethod.CoordinateLocus(val.points, nowId, color);
                            this.mapGis.addLayer(vector);
                        }
                        // }
                    })
                }).catch((error) => {
                    // this.$showSimpleMessage(error, "error");
                })
                // 处理坐标点偏移问题
                // data.map(t => {
                //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
                // });
            });
        },

        // OD观测
        async ODwatch(searcher) {
            
            let _this = this;
            this.ODnumber = []
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            if (searcher) {
                sjhAxios.post("sjh2/strategysupport/oddata/", searcher).then((res) => {
                    let roads = res.data.data;
                    roads.map((val, index) => {
                        let trace = val.trace;
                        // let color = _this.choseColor(val.roadLevel);
                        let color = "rgb(252, 3, 32," + val.carCount / 10 + ")";
                        let nowId = new Date().getTime() + index;
                        val.id = nowId;
                        _this.ODnumber.push(val);
                        if (trace !== undefined && val.dayNature === _this.ODTimer) {
                            val.points = [];
                            trace.map(item => {
                                let pointer = {
                                    point: [item.longitude, item.latitude]
                                }
                                val.points.push(pointer);
                            })
                            let vector = GisClassMethod.CoordinateLocus(val.points, nowId, color);
                            this.mapGis.addLayer(vector);
                        }
                    })
                })
                return;
            }
            await sjhAxios.post("sjh2/strategysupport/oddata/selectall", { currentTime: this.$tools.getTimeHour(new Date()) }).then((res) => {
                let roads = res.data.data;
                roads.map((val, index) => {
                    let trace = val.trace;
                    // let color = _this.choseColor(val.roadLevel);
                    let color = "rgb(252, 3, 32," + val.carCount / 10 + ")";
                    let nowId = new Date().getTime() + index;
                    val.id = nowId;
                    _this.ODnumber.push(val);
                    if (trace !== undefined) {
                        val.points = [];
                        trace.map(item => {
                            let pointer = {
                                point: [item.longitude, item.latitude]
                            }
                            val.points.push(pointer);
                        })
                        let vector = GisClassMethod.CoordinateLocus(val.points, nowId, color);
                        this.mapGis.addLayer(vector);
                    }
                })
            })
        },
        // OD规律
        ODLow() {
            let _this = this;
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            sjhAxios.post("sjh2/strategysupport/oddata/odlaw", { timeStr: this.$tools.getTwoThree() }).then((res) => {
                let roads = res.data.data;
                roads.map((val, index) => {
                    let trace = val.trace;
                    // let color = _this.choseColor(val.roadLevel);
                    let color = "rgb(252, 3, 32," + val.carCount / 10 + ")";
                    let nowId = new Date().getTime() + index;
                    val.id = nowId;
                    _this.ODnumber.push(val);
                    if (trace !== undefined && val.dayNature === _this.ODTimer) {
                        val.points = [];
                        trace.map(item => {
                            let pointer = {
                                point: [item.longitude, item.latitude]
                            }
                            val.points.push(pointer);
                        })
                        let vector = GisClassMethod.CoordinateLocus(val.points, nowId, color);
                        this.mapGis.addLayer(vector);
                    }
                })
            })
        },
        // OD规律选择工作日，双休日，法定节假日
        ODTimerChange(data) {
            this.ODTimer = data;
            let _this = this;
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            this.ODnumber.map(val => {
                let color = "rgb(252, 3, 32," + val.carCount / 10 + ")";
                let trace = val.trace;
                if (trace !== undefined && val.dayNature === data) {
                    val.points = [];
                    trace.map(item => {
                        let pointer = {
                            point: [item.longitude, item.latitude]
                        }
                        val.points.push(pointer);
                    })
                    let vector = GisClassMethod.CoordinateLocus(val.points, val.id, color);
                    this.mapGis.addLayer(vector);
                }
            })
        },

        // 潮汐流观测/规律
        tidalWatch(typeData) {
            setTimeout(async () => {
                if (!typeData) {
                    this.pageStatus = "tidalWatch";
                }
                if (this.pageStatus === "tidalWatch") {
                    // 调用潮汐流观测接口
                    this.tidalWatchdata = await this.ShujuhuitidalObservationData();
                    if (this.tidalWatchdata.length === 0) {
                        this.$showSimpleMessage("暂无数据", "error");
                    }
                    this.tidalFlowRenderinglayers(this.tidalWatchdata); // 拼凑潮汐流点位数据
                    if (this.tidalTimer === "") {
                        this.tidalTimers(); // 启动潮汐流定时器
                    }
                } else {
                    // 调用潮汐流规律接口
                    this.eraseTimer(); // 清除定时器
                    this.tidalWatchdata = await this.ShujuhuitidalLawData();
                    if (this.tidalWatchdata.length === 0) {
                        this.$showSimpleMessage("暂无数据", "error");
                    }
                    this.tidalFlowRenderinglayers(this.tidalWatchdata); // 拼凑潮汐流点位数据
                }
            });
            this.TidalcurrentgradeData(); // 调用接口获取潮汐流等级
        },
        // 潮汐流定时器
        tidalTimers() {
            // this.tidalTimer = setInterval(() => {
            //     console.log("定时执行");
            //     this.handleCheckedCitiesChange(this.TidalUrlData);
            // }, 5000);
        },
        // 潮汐流规律左上角搜索
        async tidalsearchEvent(data) {
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
            this.TidalUrlData = data; // 重新赋值参数
            let params = {};
            if (data.tidalareaval) {
                // 潮汐流规律行政区域起止点
                params.originArea = data.tidalareaval;
                params.destinationArea = data.tidalareaval;
            }
            if (data.tidalserchTime) {
                // 潮汐流规律开始结束时间
                params.startTime = this.$tools.setTimeUse(new Date(this.$filter.timesFormat(data.tidalserchTime[0])));
                params.endTime = this.$tools.setTimeUse(new Date(this.$filter.timesFormat(data.tidalserchTime[1])));
            }
            if (data.dayNatrue) {
                // 潮汐流规律日期类型
                params.dayNatrue = data.dayNatrue;
            }
            if (data.tidalCheckList && data.tidalCheckList.length !== 0) {
                // 潮汐流规律等级
                let MsgData = "";
                let num = data.tidalCheckList.length - 1;
                data.tidalCheckList.map((t, i) => { MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}` });
                params.tidalFlowLevel = MsgData;
            }
            this.tidalWatchdata = await this.ShujuhuitidalLawData(params);
            if (this.tidalWatchdata.length === 0) {
                this.$showSimpleMessage("暂无数据", "error");
            }
            this.tidalFlowRenderinglayers(this.tidalWatchdata); // 再次重新绘制潮汐流
        },
        // 潮汐流等级选择后重绘
        async handleCheckedCitiesChange(data) {
            this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
            this.TidalUrlData = data; // 重新赋值参数
            if (data.type === "tidalWatch" || !data.type) {
                // 调用潮汐流观测接口
                let MsgData = "";
                if (data.tidalCheckList && data.tidalCheckList.length !== 0) {
                    let num = data.tidalCheckList.length - 1;
                    data.tidalCheckList.map((t, i) => { MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}` });
                }
                this.tidalWatchdata = await this.ShujuhuitidalObservationData(MsgData);
                if (this.tidalWatchdata.length === 0) {
                    this.$showSimpleMessage("暂无数据", "error");
                }
                this.tidalFlowRenderinglayers(this.tidalWatchdata); // 再次重新绘制潮汐流
            } else {
                // 潮汐流规律时调用潮汐流搜索
                this.tidalsearchEvent(data);
            }
        },
        // 获取潮汐流观测数据湖数据
        ShujuhuitidalObservationData(data) {
            let params = {
                searchTime: 100
            };
            if (data) {
                params.tidalFlowLevel = data;
            }
            return new Promise((reslove, reject) => {
                sjhAxios.post("sjh2/strategysupport/tidalFlow/obser", params).then(res => {
                    res.data.data.map((t, i) => {
                        t.id = `${new Date().getTime()}${i}`;
                        if (t.hasOwnProperty("trace")) {
                            t.trace.map(e => {
                                t.crossIdOnetude = t.crossIdOnetude ? [...t.crossIdOnetude, { longitude: e.longitude, latitude: e.latitude }] : [{ longitude: e.longitude, latitude: e.latitude }];
                                t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                            });
                            t.area = t.trace[0].districtId;
                        }
                    });
                    reslove(res.data.data);
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },
        // 获取潮汐流规律数据湖数据
        ShujuhuitidalLawData(data) {
            let params = {};
            if (!data) {
                params.dayNature = "工作日";
            } else {
                params = data;
            }
            return new Promise((reslove, reject) => {
                sjhAxios.post("sjh2/strategysupport/tidalFlow/rule", params).then(res => {
                    res.data.data.map((t, i) => {
                        t.id = `${new Date().getTime()}${i}`;
                        if (t.hasOwnProperty("trace")) {
                            t.trace.map(e => {
                                t.crossIdOnetude = t.crossIdOnetude ? [...t.crossIdOnetude, { longitude: e.longitude, latitude: e.latitude }] : [{ longitude: e.longitude, latitude: e.latitude }];
                                t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                            });
                            t.area = t.trace[0].districtId;
                        }
                    });
                    reslove(res.data.data);
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },
        // 获取潮汐流等级
        TidalcurrentgradeData() {
            axios.get("tideSunsetRestrict/").then(res => {
                let tidalCurrentGrade = [];
                for (let i = 1; i <= res.data.data.length; i++) {
                    let className = "";
                    let name = "";
                    switch (i) {
                        case 1:
                            className = "tidalClassA";
                            name = "一级";
                            break;
                        case 2:
                            className = "tidalClassB";
                            name = "二级";
                            break;
                        case 3:
                            className = "tidalClassC";
                            name = "三级";
                            break;
                        case 4:
                            className = "tidalClassD";
                            name = "四级";
                            break;
                        case 5:
                            className = "tidalClassE";
                            name = "五级";
                            break;
                    }
                    tidalCurrentGrade = [...tidalCurrentGrade, { label: name, value: name, class: className }];
                }
                this.$refs.leftTop.tidalCurrentGrade = [...tidalCurrentGrade];
            }).catch(err => {
                this.$message.error(err);
            });
        },
        //拼凑数据然后绘制潮汐流图层
        tidalFlowRenderinglayers(dataArrs) {
            // 拼凑潮汐流点位数据
            let data = [];
            dataArrs.map(ele => {
                if (ele.crossIdOnetude && ele.crossIdTwotude) {
                    let obj = {};
                    let locationPonitObjo = [];
                    let locationPonitObjp = [];
                    let locationPonitObjcrossIdOnetudeArrs = ele.crossIdOnetude;
                    let locationPonitObjcrossIdTwotudeArrs = ele.crossIdTwotude;
                    // coordtransform.wgs84togcj02(t.longitude, t.latitude)
                    locationPonitObjcrossIdOnetudeArrs.map(t => {
                        // let obja = {point: coordtransform.wgs84togcj02(t.longitude, t.latitude)};
                        let obja = { point: [t.longitude, t.latitude] };
                        locationPonitObjo.push(obja);
                    });
                    locationPonitObjcrossIdTwotudeArrs.map(t => {
                        let objb = { point: coordtransform.wgs84togcj02(t.longitude, t.latitude) };
                        locationPonitObjp.push(objb);
                    });
                    obj.locationPonitObjo = locationPonitObjo;
                    obj.locationPonitObjp = locationPonitObjp;
                    obj.tidalFlowLevel = ele.tidalFlowLevel; // 潮汐流级别
                    obj.id = ele.id;
                    data.push(obj);
                }
            });
            // 开始绘制潮汐流图层
            data.map(t => {
                let TidalFlowRendering = GisClassMethod.TidalFlowRendering(t);
                this.mapGis.addLayer(TidalFlowRendering); // 添加新的箭头线图层
                let linColor = "";
                if (t.tidalFlowLevel === 1) {
                    linColor = "#ff061d";
                } else if (t.tidalFlowLevel === 2) {
                    linColor = "#ff5a00";
                } else if (t.tidalFlowLevel === 3) {
                    linColor = "#d98f05";
                } else if (t.tidalFlowLevel === 4) {
                    linColor = "#aad32e";
                } else {
                    linColor = "#12ff00";
                }
                let TidalCurrentDirection = GisClassMethod.TidalCurrentDirection(this.mapGis, TidalFlowRendering, t.id, linColor); // 添加箭头图标
                this.mapGis = TidalCurrentDirection[0];
                TidalFlowRendering = TidalCurrentDirection[1];
            });
        },

        // 交通构成观测
        trafficWatch(pra) {
            if (!pra) return;
            this.trafficWatchList = pra.result;
            let area = pra.area;
            this.trafficComNumber.name = pra.area;
            let data = pra.result.find(t => t.areaId === pra.area);
            if (data) {
                this.trafficComNumber.value = [
                    data.arriveTrafficProp,
                    data.leaveTrafficProp,
                    data.interTrafficProp,
                    data.transitTrafficProp
                ];
            }
            setTimeout(() => {
                this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
                this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
                var geojsonObject = {
                    type: "FeatureCollection",
                    totalFeatures: 1,
                    features: pra.coordinates,
                    crs: {
                        type: "name",
                        properties: {
                            name: "EPSG:4326"
                        }
                    }
                };
                let vectorSource = new ol.source.Vector({
                    features: new ol.format.GeoJSON({
                        featureProjection: "EPSG:3857"
                    }).readFeatures(geojsonObject)
                });
                let layer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        // fill: new ol.style.Fill({
                        //     color: 'red'
                        // }),
                        stroke: new ol.style.Stroke({
                            color: "#0087e6",
                            width: 2
                        }),
                        image: new ol.style.Circle({
                            radius: 10,
                            fill: new ol.style.Fill({
                                color: "#ffcc33"
                            })
                        })
                    })
                });
                this.mapGis.addLayer(layer);
            });
        },

        // 营运车辆观测
        carWatch(typeData) {
            setTimeout(async () => {
                if (!typeData) {
                    this.pageStatus = "carWatch";
                }
                let caraa = await this.OperatingVehicles();
                this.operationVehiclelayer(caraa); // 拼凑潮汐流点位数据
            });
        },
        //拼凑数据然后绘制营运车辆图层
        operationVehiclelayer(dataArrs) {
            // 拼凑潮汐流点位数
            let data = [];
            let pointData = [];
            dataArrs.map(ele => {
                let obj = {};
                let locationPonitObj = [];
                ele.trace.map(el => {
                    let point = [];
                    point.push(el.longitude, el.latitude); // 报警坐标
                    locationPonitObj.push({ point: point });
                });
                obj.locationPonitObj = locationPonitObj;
                obj.id = ele.id;
                data.push(obj);
            });
            data.map(t => {
                pointData.push({
                    id: t.id,
                    point: t.locationPonitObj[t.locationPonitObj.length - 1].point
                });
            });
            let operationVehiclelayer = GisClassMethod.PiontCoordinateLocus(
                data,
                "red",
                5
            );
            this.mapGis.addLayer(operationVehiclelayer); // 添加新的营运车辆图层
            let operatingVehicleIcon = GisClassMethod.CoordinateTracingPoint(
                pointData
            );
            this.mapGis.addLayer(operatingVehicleIcon); // 添加新的营运车辆图标层
        },
        // 营运车辆观测请求数据湖数据传参
        OperatingVehicles() {
            let params = {
                currentTime: "20181108171200",
                /* currentTime: this.thistime*/
            };
            return new Promise((reslove, reject) => {
                sjhAxios.post("sjh2/strategysupport/servicecar/selecttracenew2", params).then(res => {
                    let missionMsg = res.data.data;
                    reslove(missionMsg); // 返回参数
                }).catch(error => {
                    // this.$showSimpleMessage(error, "error");
                });
            });
        },

        // 路口交通观测
        roadWatch(val) {
            if (!val) return;
            sjhAxios.post("sjh2/strategysupport/trafficFlow/realTimeNew", { spottingNo: val, currentTime: this.$tools.setTimeUse() }).then()
        },

        // 画点位
        drawPoint(point, scale) {
            this.mapGis.removeLayer(this.coordinateTracingPointImg);
            this.InitializationLayer(point, scale);
        },
        // OD选择的点位信息和路口交通观测选择点位时，改变点位信息
        changeRoadPoint(val) {
            this.roadPoint = val;
        },

        // 切换页面状态
        changePageStatus(data) {
            this.pageStatus = data;
            //切换页面状态的时候，清空左上角的选择
            this.$refs.leftTop.pageChange = false;
            // 切换OD规律的时候，假的
            if (data === "ODwatch") {
                this.ODwatch();
            }
            if (data === "ODLow") {
                this.ODLow();
            }
            // 潮汐流规律
            if (data === "tidalWatch" || data === "tidalLow") {
                this.tidalWatch(data);
            }
            // 营运车辆规律
            if (data === "carWatch" || data === "carLow") {
                this.carWatch(data);
            }
            // 营运车辆规律
            if (data === "trafficFlow" || data === "trafficLow") {
                this.trafficFlow();
            }
        },

        // 事件详情, date列表循环的数据
        eventDetail(data) {
            if (data.hasOwnProperty("id")) {
                this.$refs.eventDetail.detailsfData = this.eventList.find(t => t.id === data.id);
            } else if (data.hasOwnProperty("incidentId")) {
                this.$refs.eventDetail.detailsfData = this.eventList.find(t => t.incidentId === data.incidentId);
            }
            this.tooltip = this.$refs.eventDetail.detailsfData;
            this.$refs.eventDetail.eventDetail = true;
        },
        // 地图点击查看详情
        MapeventDetail() {
            if (this.tooltip.hasOwnProperty("id")) {
                this.$refs.eventDetail.detailsfData = this.eventList.find(t => t.id === this.tooltip.id);
            } else if (this.tooltip.hasOwnProperty("incidentId")) {
                this.$refs.eventDetail.detailsfData = this.eventList.find(t => t.incidentId === this.tooltip.incidentId);
            }
            this.$refs.eventDetail.eventDetail = true;
        },

        // 打开地图弹窗
        showMapDialog() {
            this.dialogVisible = true;
        },

        // 点击元素，添加事件的窗口提示
        eventTip(position, map, ids) {
            let tooltip = this.eventList.find(t => t.id === ids);
            if (!tooltip) {
                tooltip = this.eventList.find(t => t.incidentId === ids);
            }
            this.tooltip = tooltip;
            let html;
            // 自定义事件
            // if (this.tooltip.hasOwnProperty("number") && (this.tooltip.number === "9" || this.tooltip.number === "26")) {
            if (this.tooltip.hasOwnProperty("intelligenceId") && (this.tooltip.intelligenceId === "10001" || this.tooltip.intelligenceId === "10002")) {
                // 事件已关闭，不出现取消告警按钮
                this.tooltip.alarm = this.tooltip.intelligenceStatus === "0" ? false : true;
                this.tooltip.Videodisplay = false; // 判断是否显示查看视频按钮自定义事件没有视频
                html =
                    '<div  id="tooltip" style="display:block;"><div class="tooltip tooltip-measure"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent">自定义情报</div><div class="tooltipContent">' +
                    this.tooltip.intelligenceName +
                    '</div><div class="tooltipContent">' +
                    this.tooltip.area +
                    '</div><div class="tooltipContent">' +
                    this.tooltip.createdTime +
                    '</div></div><div class="tooltipBtn">'
                if (this.tooltip.alarm) {
                    html += '<span class="clearWarn" @click.native="clearWarn">取消告警</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div>';
                } else {
                    html += '<span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div>';
                }
            } else if (this.tooltip.hasOwnProperty("incidentType")) {
                // AI检测事件
                //AI检测事件，不出现取消告警按钮
                // this.tooltip.alarm = this.tooltip.incidentStatus === "1" ? false : true;
                this.tooltip.alarm = false;
                this.tooltip.Videodisplay = true; // 判断是否显示查看视频按钮自定义事件没有视频
                html =
                    '<div  id="tooltip" style="display:block;"><div class="tooltip tooltip-measure"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent">告警情报</div><div class="tooltipContent">' +
                    this.$store.state.venteType.find(t => t.id === this.tooltip.incidentType).name +
                    '</div><div class="tooltipContent">' +
                    this.tooltip.districtRegionId +
                    '</div><div class="tooltipContent">' +
                    this.tooltip.incidentStartTime +
                    '</div></div><div class="tooltipBtn">'
                if (this.tooltip.alarm) {
                    html += '<span class="clearWarn" @click.native="clearWarn">取消告警</span><span class="watchVideo" @click.native="watchVideoss">查看视频</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div>';
                } else {
                    html += '<span class="watchVideo" @click.native="watchVideoss">查看视频</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div>';
                }
            }
            let measureTooltipElement, measureTooltip;
            // let node = document.getElementById("tooltip");
            // measureTooltipElement = node.cloneNode(true);
            measureTooltipElement = document.createElement("div");
            measureTooltipElement.innerHTML = html;
            // measureTooltipElement.style.display = "block";
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -20],
                // position: position,
                autoPan: true,
                autoPanAnimation: {
                    duration: 20
                },
                positioning: "bottom-center",
                id: ids
            });
            map.addOverlay(measureTooltip);
            measureTooltip.setPosition(position);
            store.commit("loadingState", false); // 关闭缓冲图标
        },

        // 查看视频 
        watchVideos(data) {
            if (this.ifEventVideo) {
                this.ifEventVideo = false;
            } else {
                if (this.$refs.eventDetail.eventDetail === false && !data) {
                    return;
                } else {
                    this.ifEventVideo = true;
                }
            }
        },
        watchVideoss() {
            if (this.ifEventVideo) {
                this.ifEventVideo = false;
            } else {
                this.ifEventVideo = true;
            }
        },

        // 显示或隐藏右侧的视频
        showOrHide() {
            
            if (this.$refs.eventDetail.eventDetail === false) {
                this.ifEventVideo = false;
            } else {
                let video = document.getElementById("eventVideo");
                let videoClass = video.className;
                if (videoClass === "eventVideo") {
                    this.ifEventVideo = false;
                } else {
                    this.ifEventVideo = true;
                }
                // if(this.$refs.watchVideo.leftRight === "《") {
                //     this.$refs.watchVideo.leftRight = "》"
                // } else {
                //     this.$refs.watchVideo.leftRight = "《"
                //     this.ifEventVideo = false;
                // }
            }
        },
        // 删除当前的提示窗
        removeTooltip() {
            // 删除对应点位的overlayer
            let overlay = this.mapGis.getOverlayById(this.tooltip.id);
            this.mapGis.removeOverlay(overlay);
            this.showOrHide();
        },
        // 导出表格
        exportTable(table) {
            let timer;
            function getExplorer() {
                //获取浏览器
                let explorer = window.navigator.userAgent;
                if (
                    explorer.indexOf("MSIE") >= 0 ||
                    (explorer.indexOf("Windows NT 6.1;") >= 0 &&
                        explorer.indexOf("Trident/7.0;") >= 0)
                ) {
                    return "ie";
                } else if (explorer.indexOf("Firefox") >= 0) {
                    return "Firefox";
                } else if (explorer.indexOf("Chrome") >= 0) {
                    return "Chrome";
                } else if (explorer.indexOf("Opera") >= 0) {
                    return "Opera";
                } else if (explorer.indexOf("Safari") >= 0) {
                    return "Safari";
                }
            }
            function excels(table) {
                if (getExplorer() == "ie") {
                    let curTbl = document.getElementById(table);
                    let oXl = new ActiveXObject("Excel.Application"); //创建AX对象excel
                    let oWB = oXL.Workbooks.Add(); //获取workbook对象
                    let xlsheet = oWB.Worksheets(1); //激活当前sheet
                    let sel = document.body.createTextRange();
                    sel.moveToElementText(curTbl); //把表格中的内容移到TextRange中
                    sel.select; //全选TextRange中内容
                    sel.execCommand("Copy"); //复制TextRange中内容
                    xlsheet.Paste(); //粘贴到活动的EXCEL中
                    oXL.Visible = true; //设置excel可见属性
                    try {
                        let filename = oXL.Application.GetSaveAsFilename(
                            "Excel.xls",
                            "Excel Spreadsheets (*.xls), *.xls"
                        );
                    } catch (e) {
                        window.print("Nested catch caught " + e);
                    } finally {
                        oWB.SaveAs(filename);
                        oWB.Close((savechanges = false));
                        oXL.Quit();
                        oXL = null; //结束excel进程，退出完成
                        timer = window.setInterval("Cleanup();", 1);
                    }
                } else {
                    tableToExcel("tables");
                }
            }
            function Cleanup() {
                window.clearInterval(timer);
                CollectGarbage(); //CollectGarbage,是IE的一个特有属性,用于释放内存的
            }
            let tableToExcel = (function () {
                let uri = "data:application/vnd.ms-excel;base64,",
                    template =
                        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                    base64 = function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)));
                    },
                    format = function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        });
                    };
                return function (table, name) {
                    if (!table.nodeType) table = document.getElementById("tableData");
                    let ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
                    window.location.href = uri + base64(format(template, ctx));
                };
            })();
            excels(table);
        },

        // 用户把数据湖的时间格式转成常用的事件格式（如2018-10-23 15:58:00）,方便转成时间戳用
        dataLaketimeConversion(timer) {
            let at = timer.split("");
            let timerst = at[0] + at[1] + at[2] + at[3] + "-" + at[4] + at[5] + "-" + at[6] + at[7] + " " + at[8] + at[9] + ":" + at[10] + at[11] + ":" + at[12] + at[13];
            return timerst;
        },
        // 请求区域的地图数据,传参为区域名称
        areaShow(data, color) {
            let key = "tj_bound";
            let name = "QH_NAME";
            let queryString = data.districtRegionId;
            let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><Or><PropertyIsLike wildCard=\"*\" singleChar=\".\" escapeChar=\"!\"><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
            geoAxios.get(testUrl).then(async (res) => {
                let features = res.data.features;
                features[0].id = data.id;
                var geojsonObject = {
                    type: "FeatureCollection",
                    totalFeatures: 1,
                    features: features,
                    crs: {
                        type: "name",
                        properties: {
                            name: "EPSG:4326"
                        }
                    }
                };
                let vectorSource = new ol.source.Vector({
                    features: new ol.format.GeoJSON({
                        featureProjection: "EPSG:3857"
                    }).readFeatures(geojsonObject)
                });
                let layer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: color
                        }),
                        stroke: new ol.style.Stroke({
                            color: "#0087e6",
                            width: 2
                        }),
                        image: new ol.style.Circle({
                            radius: 10,
                            fill: new ol.style.Fill({
                                color: "#ffcc33"
                            })
                        })
                    })
                });
                this.mapGis.addLayer(layer);
            })
        },
        // 根据等级选颜色
        choseColor(date) {
            let color;
            if (date === "0") {
                color = "#12ff00";
            }
            if (date === "1") {
                color = "#aad32e";
            }
            if (date === "2") {
                color = "#d98f05";
            }
            if (date === "3") {
                color = "#ff3c00";
            }
            if (date === "4") {
                color = "#ff061d";
            }
            return color;
        },

        // 清除所有的定时器
        eraseTimer() {
            // 清除情报告警定时器
            clearInterval(this.eventBulletinTimer);
            this.eventBulletinTimer = "";
            // 清除潮汐流定时器
            clearInterval(this.tidalTimer);
            this.tidalTimer = "";
        }
    },
    async mounted() {
        // 登录再执行
        if (this.$store.state.userLogin) {
            this.InitCarGis([]); // 初始化地图底层
            this.eventBulletinTimes(); // 启动定时器

            // 请求情报数据
            let CustomEventsMsg = await this.CustomEvents(); // 自定义的事件
            let ShujuhuinformationTransmissionMsg = await this.ShujuhuinformationTransmission(); // 请求数据湖数据的传参
            let ShujuhuintelligenceEventsMsgflagO = await this.ShujuhuintelligenceEvents(ShujuhuinformationTransmissionMsg, "0"); // 数据湖正常事件数据
            let ShujuhuintelligenceEventsMsgflagP = await this.ShujuhuintelligenceEvents(ShujuhuinformationTransmissionMsg, "1"); // 数据湖关闭需要显示事件数据
            this.$store.state.venteType.map(t => {
                if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
                    this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagO[t.id]];
                }
            });
            this.$store.state.venteType.map(t => {
                if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
                    this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagP[t.id]];
                }
            });
            this.eventList = [...this.eventList, ...CustomEventsMsg];
            if (this.eventList.length === 0) {
                this.$showSimpleMessage("暂无数据", "error");
                if (this.tooltip.id) {
                    this.removeTooltip();
                }
            } else {
                this.eventList.map((t, i) => {
                    if (t.hasOwnProperty("createdTime")) {
                        t.createdTime = t.createdTime ? this.$filter.formatDateTimeMinute(t.createdTime) : "";
                        t.createdTimelittile = t.createdTime.substring(t.createdTime.length - 14);
                    }
                    if (!t.hasOwnProperty("createdTime")) {
                        let times = t.incidentStartTime.split(" ")[1];
                        t.createdTimelittile = `${times.split(":")[0]}:${times.split(":")[1]}`;
                    }
                    if (!t.hasOwnProperty("intelligenceName")) {
                        t.intelligenceName = this.$store.state.venteType.find(e => e.id === t.incidentType).name;
                    }
                    if (!t.hasOwnProperty("id")) {
                        t.id = `${new Date().getTime()}${i}`;
                    }
                });
            }
            // 先默认画20个吧, 太卡了
            // let abc = [];
            // for (let i = 0; i < 20; i++) {
            //     abc = [...abc, this.eventList[i]];
            // }
            this.getGISData(this.eventList); // 初始化地图情报数据并且绘制图层
        }
    },
    created() {
        // （登录了再执行）
        if (!this.$store.state.userLogin) {
            this.$router.push({
                path: "/login"
            });
        } else {
            let power = this.$store.state.loginModel;
            let infoAnalysis = power.find(val => val.t.name === "情指勤督");
            let trafficFlow = power.find(val => val.t.name === "交通流管控");
            if (infoAnalysis) {
                this.bottomBtn.push({
                    name: "情报告警",
                    id: 1,
                    method: "eventBulletin",
                    checked: true
                });
            }
            if (trafficFlow) {
                this.bottomBtn.push(
                    {
                        name: "交通状态观测",
                        id: 2,
                        method: "trafficFlow",
                        checked: false
                    },
                    {
                        name: "OD观测",
                        id: 3,
                        method: "ODwatch",
                        checked: false
                    },
                    {
                        name: "潮汐流观测",
                        id: 4,
                        method: "tidalWatch",
                        checked: false
                    },
                    {
                        name: "交通构成观测",
                        id: 5,
                        method: "trafficWatch",
                        checked: false
                    },
                    {
                        name: "营运车辆观测",
                        id: 6,
                        method: "carWatch",
                        checked: false
                    },
                    {
                        name: "路口交通观测",
                        id: 7,
                        method: "roadWatch",
                        checked: false
                    }
                );
            }
            // 请求点位信息
            axios.get("/intersection/").then(res => {
                this.point = res.data.data;
            });
            // 开启设备接口
            // sjhAxios.post("sjh5/realtime/realtimeSwitch", {}).then((res) => {

            // })
        }
    },
    beforeDestroy() {
        // 组件状态销毁时清除所有的定时器
        clearInterval(this.eventBulletinTimer);
    }
}
</script>


