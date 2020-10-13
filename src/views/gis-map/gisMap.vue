/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 09:57:54
 * @Last Modified by: lucas.liujin
 * @Last Modified time: 2019-06-18 18:31:32
 */
<template>
  <div class="GIS_page" style="position: relative;">
	  <!-- <div>
		  <img style="width: 100%; height: inherit;" v-if="!showMapHd" src="../../assets/static/LoginBackground.jpg" />
	  </div> -->
	  <div v-show="!showMapHd" style="font-size: 0px; position: absolute;z-index: 200;">
		  <hdemulate></hdemulate>
	  </div>
    <!-- 地图闪烁点div -->
    <!-- <div id="css_animationo"></div> -->
    <!-- <div id="css_animationp"></div> -->
    <!-- 地图右键事件节点 -->
    <div id="map_contextmenu_container" class="map_contextmenu" style="display:none;">
      <ul>
        <li>
          <a href="#">
            <img src />
          </a>
        </li>
      </ul>
    </div>
    <div class="tems_gis" id="tems_gis" v-show="true" style="position: relative;"></div>
    <div id="controlLayer">
      <img
        class="Iconimg"
        v-for="(t, i) in icons"
        :key="i"
        :title="t.title"
        :src="t.url"
        @click="operation(t)"
      />
    </div>
    <!-- 左侧的图层控制 -->
    <div class="gisLeft" id="gisLeft">
      <div class="layerControlForm">
<!--         <div class="layerControlFormTitle">图层控制</div>-->
        <div class="layerControlFormBody">
          <!-- 情报 -->
          <layerCheck
            ref="layerCheck"
            :title="titleOne"
            :type-name="'intelligence'"
            :data="news"
            :pageStatus="pageStatus"
            :newslist="news"
            @inChange="inChange"
          ></layerCheck>
        </div>
        <div class="layerControlFormBody">
          <!-- 设备 -->
          <layerCheck
            ref="layerChecks"
            :title="titleTwo"
            :type-name="'equipment'"
            :data="equipment"
            :pageStatus="pageStatus"
            @eqChange="eqChange"
          ></layerCheck>
        </div>
        <div class="layerControlFormBody" v-show="pageStatus !== 'roadWatch'">
          <!-- 点位 -->
          <layerCheck
            ref="layerCheckes"
            :title="'点位'"
            :type-name="'Pointposition'"
            :pageStatus="pageStatus"
            @ppChange="ppChange"
          ></layerCheck>
        </div>
      </div>
      <div class="layerControl" @click="showLayerControl">图层控制</div>
    </div>

    <!-- 上半段右侧的事件公告栏 -->
    <div class="eventBulletinmax" v-if="ifEventBulletin">
      <div v-if="ifEventBulletin" class="eventBulletin">
        <div class="eventBullentinTitle">自定义事件公告</div>
        <div class="eventListNode tipsGisRight" style="background: #2158a4">
          <span style="width: 42%;color: #ffffff" class="tipsGisRight">开始时间</span>
          <span style="color: #fff" class="tipsGisRight">事件区域</span>
          <span style="color: #fff" class="tipsGisRight">事件类型</span>
          <!-- <span style="width: 20%" class="eventListNodeBtn" @click="eventDetail(item)">详情</span> -->
        </div>
        <div class="eventBullentinList" style="margin-top: 5px" v-ifScroll>
          <div
            v-if="topInformationPagingArr.length === 0"
            class="eventListNode"
            style="height:100%;font-size:30px;line-height:13"
          >暂无数据</div>
          <div
            v-for="item in topInformationPagingArr"
            :key="item.id"
            class="eventListNode list-display tipsGisRight"
            @click="topeventDetail(item)"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.startTime | dateTime"
              placement="top-start"
              @click="openDialog(item.id)"
            >
              <span style="width: 42%" class="tipsGisRight">{{item.startTime | dateTime}}</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="item.area" placement="top-start">
              <span class="tipsGisRight">{{item.area}}</span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.intelligenceName"
              placement="top-start"
            >
              <span class="tipsGisRight">{{item.intelligenceName}}</span>
            </el-tooltip>
            <!-- <span style="width: 20%" class="eventListNodeBtn" @click="eventDetail(item)">详情</span> -->
          </div>
        </div>
        <div v-if="ifEventBulletin" class="pageEventBulletin">
          <el-pagination
            small
            background
            @current-change="tophandleCurrentChange"
            :current-page.sync="topintelligencePage"
            :page-size="10"
            :pager-count="5"
            layout="prev, pager, next"
            :total="toprecordCount"
          ></el-pagination>
        </div>
      </div>
      <!-- 分页 -->
      <!-- 右侧的事件公告栏 -->
      <div v-if="ifEventBulletin" class="eventBulletin eventBulletin-1">
        <div class="eventBullentinTitle">告警事件公告</div>
        <div class="eventListNode tipsGisRight" style="background: #2158a4">
          <span style="width: 42%;color: #fff" class="tipsGisRight">开始时间</span>
          <span style="color: #fff" class="tipsGisRight">事件区域</span>
          <span style="color: #fff" class="tipsGisRight">事件类型</span>
          <!-- <span style="width: 20%" class="eventListNodeBtn" @click="eventDetail(item)">详情</span> -->
        </div>
        <div class="eventBullentinList" style="margin-top: 5px" v-ifScroll>
          <div
            v-if="InformationPagingArr.length === 0"
            class="eventListNode"
            style="height:100%;font-size:30px;line-height:13"
          >暂无数据</div>
          <div
            v-for="item in InformationPagingArr"
            :key="item.id"
            class="eventListNode tipsGisRight"
            @click="eventDetail(item)"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.incidentStartTime | dateTime"
              placement="top-start"
            >
              <span style="width: 42%" class="tipsGisRight">{{item.incidentStartTime | dateTime}}</span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.districtRegionId"
              placement="top-start"
            >
              <span class="tipsGisRight">{{item.districtRegionId}}</span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              :content="d_venteType.find(t => t.id === item.incidentType).name"
              placement="top-start"
            >
              <span class="tipsGisRight">{{d_venteType.find(t => t.id === item.incidentType).name}}</span>
            </el-tooltip>
            <!-- <span style="width: 20%" class="eventListNodeBtn" @click="eventDetail(item)">详情</span> -->
          </div>
        </div>
        <div v-if="ifEventBulletin" class="pageEventBulletin pageEventBulletin-1">
          <el-pagination
            small
            background
            @current-change="handleCurrentChange"
            :current-page.sync="intelligencePage"
            :page-size="10"
            layout="prev, pager, next"
            :pager-count="5"
            :total="recordCount"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 特殊事件提示框 -->
    <div class="d_tooltip" style="display:none;">
      <div class="tooltip tooltip-measure" style="height: 120px;">
        <div class="d_closeTooltip" @click="SpecialeventsremoveTooltip">x</div>
        <div class="tooltipContent" style="text-align: center">事件视频</div>
        <div class="tooltipContent">检测到特殊事件</div>
        <div class="tooltipBtn">
          <span class="d_specialViewSidebar" @click.native="specialViewSidebar">查看视频</span>
        </div>
      </div>
    </div>
    <!-- 底部的操作按钮 -->
    <div class="bottomBtn Map_bottomBtn" style="z-index: 201;">
      <!-- 第一版 -->
      <!-- <span class="bottomBtnNode" v-for="item in bottomBtn" :key="item.name" @click="analays(item.method)">
                {{item.name}}
      </span>-->

      <!-- 第二版 -->
      <!-- <div v-for="item in bottomBtn" :key="item.id" :class="{'d_bottomBtn': true, 'd_bottomBtn_low': item.name !== '规律'}">
                <el-button :class="item.checked === true?'checked':'bottomBtnNode'"  @click="analays(item)" type="primary" size="mini">{{item.name}}</el-button>
      </div>-->

      <!-- 第三版 -->
      <!-- <div v-for="item in bottomBtn" :key="item.id" class="d_bottomBtn_low">
                <el-tooltip class="item" effect="dark" :content="item.name" placement="top-start">
                    <img class="img_wd" :src="item.checked ? item.srcJ : item.srcP"  @click="analays(item)">
                </el-tooltip>
      </div>-->

      <div v-for="item in bottomBtn" :key="item.id" class="d_bottomBtn_low">
        <!-- 第四版 -->
        <!-- <el-popover v-if="item.children" class="item" trigger="hover" placement="top" style="padding: 0">
                    <el-tooltip  v-for="(t, index) in item.children" :key="index"  class="item" effect="dark" :content="t.name" placement="right">
                        <div class="dj_img_wd">
                            <img class="img_wd" :src="t.srcJ" @click="analays(t, item)">
                        </div>
                    </el-tooltip>
                    <img class="img_wd" slot="reference" :src="item.src">
                </el-popover>
                <el-tooltip v-else class="item" effect="dark" :content="item.name" placement="top-start">
                    <img class="img_wd" :src="item.checked ? item.srcJ : item.srcP"  @click="analays(item)">
        </el-tooltip>-->

        <!-- <el-popover v-if="item.children" class="item" trigger="hover" placement="top" style="padding: 0">
                    <el-tooltip  v-for="(t, index) in item.children" :key="index"  class="item" effect="dark" :content="t.name" placement="right">
                        <div class="dj_img_wd">
                            <img class="img_wd" :src="t.srcJ" @click="analays(t, item)">
                        </div>
                    </el-tooltip>
                    <img class="img_wd" slot="reference" :src="item.src">
        </el-popover>-->

        <!-- 第五版 -->
        <div v-if="item.children" class="dj_fatit_div">
          <div class="dj_tit_div">
            <!-- 第六次修改 -->
            <!-- <el-tooltip  v-for="(t, index) in item.children" :key="index"  class="item" effect="dark" :content="t.name" placement="right">
                            <div class="dj_img_wd">
                                <img class="img_wd" :src="t.srcJ" @click="analays(t, item)">
                            </div>
            </el-tooltip>-->

            <!-- 第七次修改 -->
            <el-popover
              v-for="(t, index) in item.children"
              :key="index"
              placement="right"
              trigger="manual"
              width="85px"
              :content="t.name"
              v-model="btn_visible"
            >
              <div class="dj_img_wd" slot="reference">
                <img class="img_wd" :src="t.src" @click="analays(t, item)" />
              </div>
            </el-popover>
          </div>
          <img class="img_wd" :src="item.src" />
        </div>
        <el-tooltip
          v-if="!item.children"
          class="item"
          effect="dark"
          :content="item.name"
          placement="top-start"
        >
          <img v-if="item.name!= '交通构成观测'"
			class="img_wd" :src="item.checked ? item.srcJ : item.srcP" @click="analays(item)" />
		  <img v-else
			class="img_wd" :src="item.checked ? item.srcJ : item.srcP" @click="hdAnalays(item)" />
        </el-tooltip>
      </div>
    </div>

    <!-- 右侧的交通状态观测数据 -->
    <div class></div>
    <!-- 右侧的查看视频 -->
    <watchVideo
      ref="watchVideo"
      v-if="ifEventVideo"
      :watchVideoUrl="watchVideoUrl"
      :realTimeVideoAddress="realTimeVideoAddress"
      @showOrHide="showOrHide"
      class="eventVideo"
      id="eventVideo"
    ></watchVideo>
    <!-- 左上角的内容 -->
    <leftTop
      ref="leftTop"
      class="leftTop"
      @searchEvent="searchEvent"
      @handleCheckedCitiesChange="handleCheckedCitiesChange"
      @tidalsearchEvent="tidalsearchEvent"
      @changePageStatus="changePageStatus"
      @carsearchEvent="carsearchEvent"
      @handleCheckedCarChange="handleCheckedCarChange"
      :point="pointList"
      :pageStatus="pageStatus"
      @drawPoint="drawPoint"
      @changeRoadPoint="changeRoadPoint"
      :roadPoint="roadPoint"
      @trafficFlow="trafficFlow"
      @ODwatch="ODwatch"
      @trafficWatch="trafficWatch"
      @roadWatch="roadWatch"
      @ODTimerChange="ODTimerChange"
      @moveToCenter="moveToCenter"
      :roadsKey="roadsKey"
      :roadColor="roadColor"
      @ODLowTimerChange="ODLowTimerChange "
      :mapSearchLayer="mapSearchLayer"
      :mapGis="mapGis"
      :coordinateTracingPointImg="coordinateTracingPointImg"
      @handleCheckedCitiesChangeTimer="handleCheckedCitiesChangeTimer"
    ></leftTop>
    <!-- 自定义详细信息 -->
    <!-- <topeventDetail
      ref="topeventDetail"
      @eventDetailClearWarn="clearWarn"
      :pointList="pointList"
      :equipmentList="equipmentList"
    ></topeventDetail>-->

    <!-- 公告详细信息 -->
    <eventDetail
      ref="eventDetail"
      @showOrHide="watchVideos"
      @eventDetailClearWarn="clearWarn"
      :pointList="pointList"
      :equipmentList="equipmentList"
    ></eventDetail>
    <trafficCom
      ref="trafficCom"
      class="trafficCom"
      :point="pointList"
      @drawPoint="drawPoint"
      :roadPoint="roadPoint"
      v-show="ifTrafficCom"
      @changeRoadPoint="changeRoadPoint"
      @roadWatch="roadWatch"
      @hideTrafficCom="hideTrafficCom"
    ></trafficCom>
    <!-- 交通状态观测侧边栏 -->
    <trafficFlowLow
      ref="trafficFlowLow"
      v-if="pageStatus === 'trafficFlow'"
      :pageStatus="pageStatus"
      class="trafficCom"
    ></trafficFlowLow>
    <trafficLow
      ref="trafficFlowLow"
      v-if="pageStatus === 'trafficLow'"
      :pageStatus="pageStatus"
      :mapLoading="mapLoading"
      @trafficLowLoading="trafficLowLoading"
      class="trafficComT"
    ></trafficLow>
    <!-- 营运车辆规律侧边栏 -->
    <operatingSide
      ref="operatingSide"
      v-if="pageStatus === 'carLow'"
      :operatingData="operatingData"
    ></operatingSide>
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
            <td>{{item.startTimelittile || "无"}}</td>
            <td>{{item.area || "无"}}</td>
            <td>{{item.intelligenceName || "无"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 交通构成的默认展示八个镇的Overlay层 -->
    <div
      class="d_trafficWatchEarch"
      style="color: #4cbfe7 !important;font-weight: bold;font-size: 14px;display:none;"
    >
      <div
        id="trafficWatchEarchBody"
        class="d_trafficWatchEarchBody"
        style="width:350px;height:200px;"
      ></div>
    </div>
    <!-- 移入事件 -->
    <div id="popup" class="mapDialogHover" style="z-index:9;">
      <div style="color: #4cbfe7 !important;font-weight: bold;font-size: 14px;">
        <div id="popup-content"></div>
      </div>
      <div
        v-if="pageStatus === 'trafficWatch'"
        id="trafficWatchEarch"
        style="color: #4cbfe7 !important;font-weight: bold;font-size: 14px;"
      >
        <div class="trafficWatchLeftTitle">{{trafficComNumber.name}}</div>
        <div
          id="trafficWatchEarchBody"
          class="trafficWatchEarchBody"
          style="width:350px;height:200px;"
        >
          <!-- <div  style="width:100% !important;height:100px;text-align:center">
          </div>-->
          <!-- <div v-for="(item, index) in trafficComNumber.color" :key="index" style="width:140px !important;height:100px;text-align:center">
                        <el-progress type="circle" :width="70" :percentage="trafficComNumber.value[index]" :color="item"></el-progress>
                        <div style="font-size:14px;text-align:center;height: 20px;line-height: 20px;">{{trafficComNumber.keyName[index]}}</div>
          </div>-->
        </div>
      </div>
      <!-- <div style="color: #4cbfe7 !important;font-weight: bold;font-size: 14px;"
        v-if="pageStatus =='ODwatch'||pageStatus =='ODLow'"
      >
      <div id="ODwatch"></div>
      </div>
      <div
        v-if="pageStatus == 'trafficFlow'"
        style="color: #4cbfe7 !important;font-weight: bold;font-size: 14px;"
      >
        v-if="pageStatus !== 'trafficFlow' && pageStatus !== 'trafficWatch'"
        <div id="trafficFlowChoseId">

        </div>
      </div>-->
    </div>

    <!-- 特殊事件视频弹窗 -->
    <el-dialog
      :close-on-press-escape="false"
      title="事件视频"
      :visible.sync="specialShowVideo"
      width="800px"
      style="padding:10px"
      :before-close="specialhandleClose"
      :lock-scroll="true"
      v-dialogDrag
      :show-close="true"
      :close-on-click-modal="false"
      class="tems_dialog eventDetail"
    >
      <video
        autoplay="autoplay"
        controls="controls"
        loop="loop"
        id="specialVideo"
        :src="this.$store.state.videoUrl"
        style="position: relative;padding-bottom:10px"
        width="780px"
      ></video>
    </el-dialog>

    <!-- 事件重叠时一个特殊的弹窗 -->
    <el-dialog
      :close-on-press-escape="false"
      title="展开详情列表"
      :visible.sync="launchDetails"
      width="600px"
      style="padding:10px"
      :before-close="launchDetailsClose"
      :lock-scroll="true"
      v-dialogDrag
      :show-close="true"
      :close-on-click-modal="false"
      class="tems_dialog eventDetail"
    >
      <div style="max-height: 400px;overflow: auto;">
        <div class="qbTitle" v-if="dintelligenceCollection.length > 0">情报</div>
        <el-form class="demo-ruleForm d_ruleForm" v-if="dintelligenceCollection.length > 0">
          <div class="stc_content">
            <div class="tc_content">
              <div class="d_form_btn d_div">事件类型</div>
              <div class="d_form_btn d_div">事件区域</div>
              <div class="d_form_btn d_div lasttitle_d_div">操作</div>
            </div>
            <div class="tc_content" v-for="(item, index) in dintelligenceCollection" :key="index">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.incidentType ? d_venteType.find(t => t.id === item.incidentType).name : item.intelligenceName"
                placement="top-start"
              >
                <div
                  class="d_form_btn d_div"
                >{{item.incidentType ? d_venteType.find(t => t.id === item.incidentType).name : item.intelligenceName}}</div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.districtRegionId || item.area"
                placement="top-start"
              >
                <div class="d_form_btn d_div">{{item.districtRegionId || item.area}}</div>
              </el-tooltip>
              <div class="d_form_btn d_div lasttitle_d_div" style="line-height: 28px;">
                <span
                  style="position: relative;top: 1px;"
                  v-if="!item.incidentType && item.intelligenceStatus === '1'"
                  class="d_form_btn clearn_btn"
                  @click="clearWarn(item.id)"
                >取消告警</span>
                <span
                  style="position: relative;top: 1px;"
                  v-if="item.incidentType"
                  class="d_form_btn watchVideo_btn"
                  @click="launchDetailsTv(item)"
                >查看视频</span>
                <span
                  style="position: relative;top: 1px;"
                  class="d_form_btn showDetail_btn"
                  @click="launchDetailseventDetail(item)"
                >查看详情</span>
              </div>
            </div>
          </div>
          <!-- <div class="stc_content" v-else>
                        <div class="tc_content">
                            <div class="d_form_btn d_div_dw zu_btn">暂无...</div>
                        </div>
          </div>-->
        </el-form>
        <div class="sbTitle" v-if="ddeviceSet.length > 0">设备</div>
        <el-form class="demo-ruleForm d_ruleForm" v-if="ddeviceSet.length > 0">
          <div class="stc_content">
            <div class="tc_content">
              <div class="d_form_btn d_div">设备编号</div>
              <div class="d_form_btn d_div">设备类型</div>
              <div class="d_form_btn d_div">设备名称</div>
              <div class="d_form_btn d_div">设备状态</div>
            </div>
            <div class="tc_content" v-for="(item, index) in ddeviceSet" :key="index">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.equipmentNumber"
                placement="top-start"
              >
                <div class="d_form_btn d_div">{{item.equipmentNumber}}</div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.equipmentTypeName"
                placement="top-start"
              >
                <div class="d_form_btn d_div">{{item.equipmentTypeName}}</div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.equipmentName"
                placement="top-start"
              >
                <div class="d_form_btn d_div">{{item.equipmentName}}</div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.status === 1 ? '正常' : (item.status === 0 ? '禁用' : '删除')"
                placement="top-start"
              >
                <div
                  class="d_form_btn d_div"
                >{{item.status === 1 ? "正常" : (item.status === 0 ? "禁用" : "删除")}}状态</div>
              </el-tooltip>
            </div>
          </div>
          <!-- <div class="stc_content" v-else>
                        <div class="tc_content">
                            <div class="d_form_btn d_div_dw zu_btn">暂无...</div>
                        </div>
          </div>-->
        </el-form>
        <div class="dwTitle" v-if="dpointSet.length > 0">点位</div>
        <el-form class="demo-ruleForm d_ruleForm" v-if="dpointSet.length > 0">
          <div class="stc_content">
            <div class="tc_content">
              <div class="d_form_btn d_div_dw">点位名称</div>
              <div v-if="pageStatus === 'roadWatch'" class="d_form_btn showDetail_btn">操作</div>
            </div>
            <div class="tc_content" v-for="(item, index) in dpointSet" :key="index">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.intersectionName"
                placement="top-start"
              >
                <div class="d_form_btn d_div_dw">{{item.intersectionName}}</div>
              </el-tooltip>
              <span
                v-if="pageStatus === 'roadWatch'"
                class="d_form_btn showDetail_btn"
                @click="showRoad(item)"
              >查看详情</span>
            </div>
          </div>
          <!-- <div class="stc_content" v-else>
                        <div class="tc_content">
                            <div class="d_form_btn d_div_dw zu_btn">暂无...</div>
                        </div>
          </div>-->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer flexRow">
        <div class="flexNum" style="line-height: 30px;color: #fff;">
          <div class="tems_Button inportBtn log_close" @click="launchDetailsClose">关 闭</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style>

/* 鼠标划入事件外边框  */
.mapDialogHover {
  max-width: 500px;
  min-width: 0px;
  position: absolute;
  top: 0px;
  background-color: rgba(3, 8, 37, 0.7);
  display: none;
  border-radius: 5px;
}
/* 鼠标划入事件内容 */
.mapDialogHover > #popup-content {
  width: 0px;
  height: 0px;
  color: white;
  text-align: center;
}
.margin{
  margin: 15px;
}
.mapDialogHover > #trafficWatchEarch {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
}
.mapDialogHover > #trafficWatchEarch > .trafficWatchLeftTitle {
  /* border-right: 1px solid #fff; */
  font-size: 16px;
  padding: 0;
  /* -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl; */
}
.mapDialogHover > #trafficWatchEarch > .trafficWatchEarchBody {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
/* .mapDialogHover > #trafficWatchEarch > .trafficWatchEarchBody > div {
  width: 100px !important;
  height: 90px !important;
  overflow: hidden;
} */
/* 交通构成的默认八个镇样式 */
.d_trafficWatchEarch {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
}
.d_trafficWatchEarch > .trafficWatchLeftTitle {
  /* border-right: 1px solid #fff; */
  font-size: 16px;
  padding: 0;
  /* -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl; */
}
.d_trafficWatchEarch > .d_trafficWatchEarchBody {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
/* 交通构成的默认八个镇样式 */
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
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-around;
}
/* .mapDialogHover > #popup-content > .carWatchEarch1 > div {
  width: 200px !important;
  height: 200px !important;
  overflow: hidden;
} */
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
  z-index: 2;
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
.tooltip {
  position: relative;
  background: rgba(3, 8, 37, 0.7);
  border-radius: 4px;
  color: #4cbfe7 !important;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}
.tooltip-measure {
  opacity: 1;
  font-weight: bold;
  width: 230px;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.tooltipContent {
  width: 100%;
  height: 30px;
  font-size: 14px;
  /* line-height: 50px; */
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.eventBulletinmax {
  height: 70%;
  position: fixed;
  width: 15%;
  background-color: #060a27;
  right: 0;
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
.font {
  font-weight: bold;
}
.ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 300px;
}
.ol-custom-overviewmap,
.ol-custom-overviewmap.ol-uncollapsible {
  border: 1px solid #191e37;
}
/* 事件公告 */
.GIS_page .eventBulletin-1 {
  /* margin-top: 474px;
  bottom: 180px; */
  background-color: rgba(3, 8, 37, 0.9);
  padding-top: 16px;
}
/* .GIS_page .pageEventBulletin-1 {
  margin-top:410px;
  bottom: 160px;
  height:4%;
} */

.pageEventBulletin {
  box-sizing: border-box;
  /* width: 310px;
  position: absolute;
  bottom: 630px;
  height: 36px;
  right: -310px; */
  background-color: #060a27;
  animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  -webkit-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -moz-animation-fill-mode: forwards;
  -o-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -o-animation-fill-mode: forwards;
  /* background-image: url(./border.png); */
  background-size: 100% 100%;
  padding: 8px;
}
.pageEventBulletin .el-pagination {
  padding: 0 !important;
  text-align: center;
}
.eventBulletin {
  /* background-color: #060A27; */
  box-sizing: border-box;
  /* width: 310px;
  position: absolute;
  top: 0; */
  /* bottom: 160px; */
  /* bottom: 196px;
  right: -310px; */
  width: 100%;
  height: 50%;
  background-color: rgba(3, 8, 37);
  animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  animation-fill-mode: forwards;
  -webkit-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -moz-animation-fill-mode: forwards;
  -o-animation: showEnentBulletin 0.5s ease-in-out 0.2s;
  -o-animation-fill-mode: forwards;
  /* background-image: url(./border.png); */
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
  /* height: 40px;
  line-height: 40px; */
  font-size: 20px;
  /* padding-bottom: 8px; */
  color: #12f8f5;
}
.eventBullentinList {
  /* position: absolute; */
  /* top: 40px; */
  width: 100%;
  /* bottom: 15px; */
  overflow: hidden;
  height: 80%;
}
.eventListNode > span {
  display: block;
  font-size: 12px !important;
  overflow: hidden;
  width: 33%;
  text-align: center;
}
.eventBullentinList > .eventListNode {
  height: 10%;
}
.eventListNode {
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #4cbfe7 !important;
  height: 27px;
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
  /* width: 400px; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* bottom: 0px; */
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
  /* width: 400px; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* bottom: 0px; */
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
  z-index: 3;
}
.bottomBtn .d_bottomBtn {
  width: 100%;
  height: 100%;
  /* margin-left: 15px; */
  border-radius: 5px;
  background: -webkit-linear-gradient(
    90deg,
    #0e66d8,
    #00ebfb,
    #00ebfb,
    #0e66d8
  );
  background: -moz-linear-gradient(90deg, #0e66d8, #00ebfb, #00ebfb, #0e66d8);
  background: -o-linear-gradient(90deg, #0e66d8, #00ebfb, #00ebfb, #0e66d8);
  background: linear-gradient(90deg, #0e66d8, #00ebfb, #00ebfb, #0e66d8);
}
.d_bottomBtn_low {
  margin-left: 15px;
}
.img_wd {
  width: 35px;
  height: 35px;
}
.bottomBtnNode {
  padding: 5px 10px;
  font-size: 15px;
  margin: 2px;
  background-color: #040726;
  color: #66d2d5;
  /* border: 2px solid #34598d;*/
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
}
.checked {
  padding: 5px 10px;
  font-size: 15px;
  margin: 2px;
  /* background-color: #040726; */
  color: #66d2d5;
  /* border: 2px solid #34598d;*/
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
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
  width: 35%;
  /* height: 100%; */
  top: 50%;
  transform: translateX(-100%);
  left: 20px;
  z-index: 2;
}
.gisLeftT {
  position: absolute;
  width: 35%;
  /* height: 100%; */
  top: 50%;
  z-index: 2;
}
.layerControl {
  width: 20px;
  height: 100px;
  line-height: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  /* background-color: #f1f1dcb3; */
  background-color: rgba(3, 8, 37, 0.9);
  word-wrap: break-word;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.layerControlForm {
  width: calc(100% - 20px);
  background: rgba(3, 8, 37, 0.9);
  /* height: 100%; */
  float: left;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #000000;
  color: #ffffff;
  font-size: 14px;
  /* background-image: url(./border.png); */
  background-size: 100% 100%;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  padding-left: 0px;
  margin-left: -11px;
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
.closeTooltip,
.d_closeTooltip {
  position: absolute;
  top: 5px;
  right: 15px;
  width: 16px;
  font-size: 20px;
  font-weight: 100;
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
.d_closeTooltip:hover {
  color: #54d5ff;
}
.clearWarn,
.pointViewSidebar {
  /* background-color: rgb(19, 102, 33, 0.85); */
  color: #00ff00;
  border: 1px solid #00ff00 !important;
}
.d_specialViewSidebar {
  color: #00ff00;
  border: 1px solid #00ff00 !important;
}
.watchVideo {
  /* background-color: rgb(159, 122, 9, 0.85); */
  color: #d8ff00;
  border: 1px solid #d8ff00 !important;
}
.showDetail {
  /* background-color: rgb(16, 41, 107, 0.85); */
  color: #00ccff;
  border: 1px solid #00ccff !important;
}
/* 左上角的功能区域 */
.leftTop {
  position: absolute;
  top: 0;
  padding: 12px 0 0 10px;
  width: 320px;
}
/* 地图闪烁点样式 */
/* 频繁闪烁点 */
#css_animationo {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.9);
  transform: scale(0);
  animation: myfirsto 0.6s;
  animation-iteration-count: infinite;
}
@keyframes myfirsto {
  to {
    transform: scale(2);
    background: rgba(0, 0, 0, 0);
  }
}
/* 缓慢闪烁点 */
#css_animationp {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: rgba(255, 0, 0, 0.9);
  transform: scale(0);
  animation: myfirstp 1s;
  animation-iteration-count: infinite;
}
@keyframes myfirstp {
  to {
    transform: scale(2);
    background: rgba(0, 0, 0, 0);
  }
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
.map_contextmenu > ul > li > a {
  color: rgb(255, 0, 0);
  text-decoration: none;
}
/* .map_contextmenu > ul > li:hover {
  background-color: rgba(255, 0, 0, 0.5);
} */
/* 交通构成观测 */
.trafficCom {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 695px;
  /* background-color: rgb(3, 8, 37, 0.85); */
}
.trafficComT {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.pointInput {
  white-space: inherit;
  word-wrap: break-word;
  word-break: break-all;
}
/* 设备集合样式 */
.qbTitle,
.sbTitle,
.dwTitle {
  color: #4cbfe7;
  font-size: 18px;
  text-align: left;
  margin-left: 44px;
}
.d_ruleForm {
  padding: 0 38px 0 38px;
  padding-bottom: 10px;
}
.stc_content {
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 5px;
  border: 1px solid #4cbfe7;
}
.tc_content {
  text-align: left;
  color: #4cbfe7;
  padding: 10px;
  border-bottom: 1px solid #4cbfe7;
}
.d_form_btn {
  margin: 0 10px 0 10px;
}
.clearn_btn {
  color: #00ff00;
  border: 1px solid #00ff00;
  border-radius: 4px;
  padding: 4px;
  position: relative;
  top: -3px;
  cursor: pointer;
}
.showDetail_btn {
  color: #00ccff;
  border: 1px solid #00ccff;
  border-radius: 4px;
  padding: 4px;
  position: relative;
  top: -3px;
  cursor: pointer;
}
.watchVideo_btn {
  color: #d8ff00;
  border: 1px solid #d8ff00;
  border-radius: 4px;
  padding: 4px;
  position: relative;
  top: -3px;
  cursor: pointer;
}
.d_div {
  display: inline-block;
  min-width: 100px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
}
.lasttitle_d_div {
  min-width: 220px;
  max-width: 220px;
}
.d_div_dw {
  display: inline-block;
  width: 70%;
  cursor: pointer;
}
.zu_btn {
  font-size: 18px;
  text-align: center;
}
/* 底部按钮新增样式 */
/* .el-popover {
    min-width: 30px !important;
}
.dj_img_wd {
    float: left;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
} */
.dj_fatit_div {
  position: relative;
  padding-left: 3px;
  padding-right: 3px;
  border: 1px solid rgba(0, 0, 0, 0);
}
.dj_fatit_div:hover .dj_tit_div {
  display: block;
}
.dj_tit_div {
  padding-left: 3px;
  padding-right: 3px;
  position: absolute;
  bottom: 40px;
  left: 0px;
  display: none;
}
.Map_bottomBtn .el-popper {
  margin-left: 40px;
  min-width: 101px !important;
  line-height: 0;
  color: #ffffff;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
  background: #303133 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.tooltip-editable {
  position: static !important;
  overflow-y: auto;
  min-height: 180px;
  height: auto !important;
}
</style>

<script>

import trafficComposition from "../../JSON/trafficComposition";// 引入交通构成观测JSON数据
import ol from "openlayers";
import "openlayers/css/ol.css";
import saveAs from "save-as";
// 引入element-ui的服务Loading
import { Loading } from "element-ui";
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

import Fullscreen from "@/assets/static/Fullscreen.png"; // 全屏按钮
import exitFullScreen from "@/assets/static/exitFullScreen.png"; // 退出全屏按钮
import Big from "@/assets/static/big.png";
import Small from "@/assets/static/small.png";
import { setTimeout } from "timers";
// 导入底部按钮选中
import eventBulletinImg from "@/assets/gisCheckbutton/eventBulletin.png"; // 选中情报告警
import trafficFlowImg from "@/assets/gisCheckbutton/trafficFlow.png"; // 选中交通状态观测
import trafficLowImg from "@/assets/gisCheckbutton/trafficLow.png"; // 选中拥堵规律分析
import ODwatchImg from "@/assets/gisCheckbutton/ODwatch.png"; // 选中OD观测
import ODLowImg from "@/assets/gisCheckbutton/ODLow.png"; // 选中OD规律
import tidalWatchImg from "@/assets/gisCheckbutton/tidalWatch.png"; // 选中潮汐流观测
import tidalLowImg from "@/assets/gisCheckbutton/tidalLow.png"; // 选中潮汐流规律
import trafficWatchImg from "@/assets/gisCheckbutton/trafficWatch.png"; // 选中交通构成观测
import carWatchImg from "@/assets/gisCheckbutton/carWatch.png"; // 选中营运车辆观测
import carLowImg from "@/assets/gisCheckbutton/carLow.png"; // 选中营运车辆规律
import roadWatchImg from "@/assets/gisCheckbutton/roadWatch.png"; // 选中路口交通观测
// 导入底部按钮未选中
import UneventBulletinImg from "@/assets/gisUncheckbutton/UNeventBulletin.png"; // 未选中情报告警
import UntrafficFlowImg from "@/assets/gisUncheckbutton/UNtrafficFlow.png"; // 未选中交通状态观测
import UntrafficLowImg from "@/assets/gisUncheckbutton/UNtrafficLow.png"; // 未选中拥堵规律分析
import UnODwatchImg from "@/assets/gisUncheckbutton/UNODwatch.png"; // 未选中OD观测
import UnODLowImg from "@/assets/gisUncheckbutton/UNODLow.png"; // 未选中OD规律
import UntidalWatchImg from "@/assets/gisUncheckbutton/UNtidalWatch.png"; // 未选中潮汐流观测
import UntidalLowImg from "@/assets/gisUncheckbutton/UNtidalLow.png"; // 未选中潮汐流规律
import UntrafficWatchImg from "@/assets/gisUncheckbutton/UNtrafficWatch.png"; // 未选中交通构成观测
import UncarWatchImg from "@/assets/gisUncheckbutton/UNcarWatch.png"; // 未选中营运车辆观测
import UncarLowImg from "@/assets/gisUncheckbutton/UNcarLow.png"; // 未选中营运车辆规律
import UnroadWatchImg from "@/assets/gisUncheckbutton/UNroadWatch.png"; // 未选中路口交通观测
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
// 引入拥堵规律分析
import trafficLow from "./trafficLow";
// 引入营运车辆规律侧边栏
import operatingSide from "./operatingSide";
import html2canvas from "html2canvas";
import RoadTraffico from "@/assets/roadTraffico.png"; // 路口交通观测的图标（绿色图标）
import RoadTrafficp from "@/assets/roadTrafficp.png"; // 路口交通观测的图标（蓝色图标）
import domtoimage from "dom-to-image"; // 保存成图片
import Qs from "qs";
import hdemulate from "./hd/hdEmulate"
// 引入地图右键图片
import mapClose from "@/assets/mapClose.png";
export default {
  components: {
    layerCheck,
    leftTop,
    eventDetail,
    watchVideo,
    trafficCom,
    trafficFlowLow,
    operatingSide,
    trafficLow,
    hdemulate,
  },
  data() {
    return {
		// added by brandy
		showMapHd: true,
      aa: "",
      bb: "",
      // 确定loding的显示，隐藏，app里面那个有问题，好无奈啊
      // fullscreenLoading: false,
      // 地图页全屏loding存储
      mapLoading: "",
      // 存一下dom节点,特殊事件
      SaveDom: "",
      // 存一份交通构成默认弹窗的节点，后面会使用
      trafficWatchSaveDom: "",
      // 底部按钮右侧默认显示文字弹窗
      btn_visible: true,
      // 事件类型集合
      d_venteType: this.$store.state.venteType,
      // 当前时间转换
      timedata: this.$filter.timesFormat(new Date()),
      thistime: this.$tools.setTimeUse(this.timedata),
      // 地图中心点
      mapCenter: [117.384925, 38.998398],
	  // mapCenter: [120.125347,32.540074],
    //   mapCenter: [117.210813092,39.1439299033 ],
      icons: [
        { title: "放大", url: Big, correspondingEvent: "enlarge" },
        { title: "缩小", url: Small, correspondingEvent: "reduce" },
        {
          title: "选择区域",
          url: Boxselection,
          correspondingEvent: "selectionArea"
        },
        { title: "标记", url: sign, correspondingEvent: "markPointPosition" },
        { title: "测距", url: measure, correspondingEvent: "mapRanging" },
        {
          title: "保存",
          url: Preservation,
          correspondingEvent: "mapPreservation"
        },
        // { title: "导出", url: Export, correspondingEvent: "mapExport" },
        { title: "全屏", url: Fullscreen, correspondingEvent: "fullScreen" }
      ],
      masking: true,
      // 全局的map地图
      mapGis: "",
      // 地图底层图层
      bottomMapLayer: "",
      // 设备图层
      equipmentLayers: "",
      // 点位图层
      pointPositionLayers: "",
      // 根据坐标描点层(使用自定义图标层)
      coordinateTracingPointImg: "",
      QingbaocoordinateTracingPointImg: "", // 情报告警坐标描点层
      TidalFlowRendering: "", // 潮汐流图层(应该是用不上)
      ErrorData: [], // 坐标点集合
      // 地图控件
      controls: [],
      // 全局的draw
      draws: "",
      // 判断是不是初始化潮汐流规律
      Initialization: "",
      // 全局状态
      status: "",
      // 图层控制
      titleOne: "情报",
      // 情报种类的数据
      news: [],
      titleTwo: "设备",
      // 设备的种类
      equipment: "",
      // 判定路段观测
      trafficFlowList: [],
      trafficFlowListTop: [],
      // 当前操作的动作的元素的id
      ids: "",
      TidalCurrent: "",
      // 底部的操作按钮
      bottomBtn: [],
      // 右侧的事件公告是否存在
      ifEventBulletin: "",
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
      // 判断潮汐流规律是否点击查询
      TidalCurrentQuery: true,
      // 交通构成观测是否显示
      ifTrafficCom: false,
      // 交通构成获取的数据
      trafficWatchList: [],
      // 交通构成的鼠标移入获得的数据
      trafficComNumber: {
        name: "双港镇",
        color: ["#ee70e9", "#3ad1bf", "#6cd13a", "#fe69a8"],
        value: [],
        keyName: [
          "到达交通比例",
          "驶离交通比例",
          "内部交通比例",
          "过境交通比例"
        ]
      },
      // 左上角的按钮
      pageStatus: "",
      typeIndex1: 1,
      typeIndex2: 1,
      // 所有事件类型的数据集合
      intelligence: [],
      PiontCoordinateLocus: "", // 坐标描线段层
      // OD数据
      ODnumber: [],
      // OD的工作日，双休日， 法定节假日
      ODTimer: "工作日",
      ODLowTime: 0,
      TimeType: [
        { name: "工作日", flag: 1 },
        { name: "双休日", flag: 1 },
        { name: "节假日", flag: 1 }
      ],
      // 潮汐流等级假数据
      TidalGrade: [],

      // 潮汐流假数据
      tidalWatchdata: [],
      // 营运车辆规律指标数据
      operatingIndexdata: [],
      // 营运车辆假数据
      operatingVehicles: [],
      tidalCheckLists: [1, 2, 3, 4],
      operatinglaw: [],
      // 交通状态观测的假数据
      trafficFlowNumber: [],
      // 交通状态观测的移入事件数据
      trafficFlowChose: {},
      // 点位列表
      pointList: [],
      operatingVehiclesData: [],
      // 潮汐流高亮方向箭头减少
      amount: 0,
      // 设备列表
      equipmentList: [],
      // 路口交通观测选择的点位
      roadPoint: "",
      // 移动时的提示框
      moveTip: "",
      // 弹窗类型
      tipTypeName: "",
      // 情报视频地址
      watchVideoUrl: "",
      // 实时视频地址
      realTimeVideoAddress: "",
      // 事件重叠时需要弹窗控制字段
      launchDetails: false,
      // 重叠的事件集合
      dintelligenceCollection: [],
      // 重叠的设备集合
      ddeviceSet: [],
      // 重叠的点位集合
      dpointSet: [],
      // 特殊事件视频弹窗状态
      specialShowVideo: false,
      // 结合静态存储使用特定事件集合
      specialEventSet: [],
      // 特殊事件url
      specialVideoUrl: "",
      // 情报特定事件弹窗数组
      Videoarray: [],
      // 情报闪烁点的延时器
      Flickertiming: "",
      // 情报闪烁点集合
      FlickerData: [],
      // 交通状态观测判定
      stop: 1,
      // 情报定时器
      eventBulletinTimer: "",
      // 地图拖动，缩放延时请求延时器
      moveRequestTiming: "",
      // 潮汐流默认日期类型
      dayNature: "工作日",
      dayNatrue: "工作日",
      // 潮汐流规律默认级别
      MsgData: [1, 2, 3, 4],
      // 潮汐流规律接口返回数组深复制数组
      tidalCopeArr: [],
      // 潮汐流定时器
      tidalTimer: "",
      hoverArr: 1,
      // 获取当前时间以便提供情报闪烁点筛选使用
      dintelligenceTime: "",
      // 情报告警url参数，用于定时器更新数据时确定url使用，从下层传回
      MapGlobalUrlData: {},
      // 图层控制情报筛选结果数组
      intelligenceeventList: [],
      // 情报分页数据展示数据
      InformationPagingArr: [],
      topInformationPagingArr: [],
      // 记录情报公告显示的当前页码数
      topintelligencePage: 1,
      intelligencePage: 1,
      // 情报公告每页展示数据量
      intelligenceBulletinNumber: 10,
      // 营运规律查询判定
      LowQueryDetermine: 1,
      // 情报总数据量
      toprecordCount: 0,
      toprecordCountcope: 0,
      recordCount: 0,
      tidalLewData: [],
      recordCountcope: 0,
      // 潮汐流规律数据湖数据
      SjhArr: {},
      formdata: {
        id: "",
        // 事件类型
        intelligenceName: "",
        // 事件名称
        name: "",
        // 起始时间
        startTime: "",
        // 结束时间
        endTime: "",
        // 事件地点
        location: "",
        // 区域
        area: "",
        // 事件级别
        level: "",
        // 备注
        remark: ""
      },
      // 全局情报图层控制参数
      intelligenceLayerparameters: [],
      // 潮汐流url参数，用于定时器更新数据时确当url使用，从下层传回
      TidalUrlData: "",
      // 营运车辆url参数，用于定时器更新数据时确当url使用，从下层传回
      CarUrlData: "",
      // 营运车辆轨迹图层
      operationVehiclelayers: "",
      // 营运车辆观测数据集合
      carList: [],
      // 营运车辆规律统计峰值集合
      operatingData: [],
      operatingDataArrs: [],
      // 营运车辆定时器
      carTimer: "",
      RTtime: "", // 营运车辆整点时间
      content: {},
      // 交通状态观测定时器
      trafficFlowTimer: "",
      // 交通状态观测的高亮
      trafficFlowLight: "",
      trafficFlowLightFeature: "",
      // OD规律的定时器
      ODwatchTimer: "",
      // 交通构成的定时器
      trafficWatchTimer: "",
      // 交通构成移入后的高亮
      lightHight: "",
      // OD移入的高亮
      ODLowHight: "",
      // 营运车辆轨迹移入高亮
      operationVehiclelayerHight: "",
      // 潮汐流移入高亮
      tidalLayerHight: "",
      // OD规律的时间段
      roadsKey: [],
      // OD规律的时间段的对应颜色
      roadColor: [
        {
          name: "0点到3点",
          colorA: "158,0,0",
          colorB: "#ff1919",
          class: "ODClass1",
          flag: 1,
          index: 1
        },
        {
          name: "3点到6点",
          colorA: "219,51,0",
          colorB: "#cbff72",
          class: "ODClass2",
          flag: 1,
          index: 2
        },
        {
          name: "6点到9点",
          colorA: "1,68,169",
          colorB: "#3b89fe",
          class: "ODClass3",
          flag: 1,
          index: 3
        },
        {
          name: "9点到12点",
          colorA: "0,162,149",
          colorB: "#36f1e2",
          class: "ODClass4",
          flag: 1,
          index: 4
        },
        {
          name: "12点到15点",
          colorA: "147,6,109",
          colorB: "#93066d",
          class: "ODClass5",
          flag: 1,
          index: 5
        },
        {
          name: "15点到18点",
          colorA: "117,0,177",
          colorB: "#b632fa",
          class: "ODClass6",
          flag: 1,
          index: 6
        },
        {
          name: "18点到21点",
          colorA: "146,222,16",
          colorB: "#cbff72",
          class: "ODClass7",
          flag: 1,
          index: 7
        },
        {
          name: "21点到24点",
          colorA: "4,170,0",
          colorB: "#3ef63a",
          class: "ODClass8",
          flag: 1,
          index: 8
        }
      ],
      // OD规律的数据
      ODLowRoads: "",
      // 八个区域对应的颜色
      colors: [
        {
          name: "双港镇",
          color: "65,122,255"
        },
        {
          name: "北闸口镇",
          color: "255,99,99"
        },
        {
          name: "葛沽镇",
          color: "255,162,83"
        },
        {
          name: "辛庄镇",
          color: "78,255,50"
        },
        {
          name: "八里台镇",
          color: "255,228,70"
        },
        {
          name: "双桥河镇",
          color: "59,186,255"
        },
        {
          // 68,78,255 111,142,243
          name: "小站镇",
          color: "111,142,243"
        },
        {
          name: "咸水沽镇",
          color: "223,125,255"
        }
      ],
      movecar: [],
      // 设置改变od规律是否清空
      clear: 1,
      newwatch: [],
      operatingCar: [],
      // 全局存一个图片的src后面切换会用到
      quanjuSrcP: { src: "" },
      // OD参数存储
      ODsearcher: "",
      // 记录页面是是首次进入，默认首次进入
      mapFirstIn: true,
      // 地图当前缩放层级默认12级
      MapZoomLevel: 12,
      // 地图当前四角坐标
      MapFourAngleCoordinate: "",
      // 地图基础搜索功能图层
      mapSearchLayer: "",
      // OD规律的时间段
      timeInter: "",
      // OD规律和OD观测的最大车辆数
      carCount: "",
      //交通状态观测的点位层
      coordinateTraficingPointImg: "",
      choseLevel: [],
      carMoren: false,
      // 存放标记点位，测距，绘制区域图层的数组，用于自动刷新后图层的重新添加
      drawLayersArr: [],
      // 测距,点位的Overlay层数组
      drawLayersOverlayArr: [],
      // 交通构成Overlay层数组
      trafficWatchOverlayArr: [],
      // 交通观测使用的椰分页对象
      trafficObservePage: 1
    };
  },
  directives: {
    // 跟随鼠标移动指令
    drag(el, bindings) {
      el.onmousedown = e => {
        let parentWidth = el.parentNode.offsetWidth;
        let parentHeight = el.parentNode.offsetHeight;
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        let disx = e.pageX - el.offsetLeft;
        let disy = e.pageY - el.offsetTop;
        document.onmousemove = e => {
          //获取移动后div的位置：鼠标位置-disx/disy
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
    // 监听是否切换按钮
    pageStatus: {
      handler: function(val, oldval) {
        if(val === "tidalLow"){
                this.$refs.leftTop.tidalTimeIntervalCheckList =  [
        "0点到3点",
        "3点到6点",
        "6点到9点",
        "9点到12点",
        "12点到15点",
        "15点到18点",
        "18点到21点",
        "21点到24点"
      ]
        }
        if (oldval == "roadWatch") {
          let Time = this.$refs.trafficCom.intersectionTime;
          clearInterval(Time);
          this.$refs.trafficCom.intersectionTime = "";
          // if(AIVideo){-
          //   this.$refs.trafficCom.aaaaa = false;
          // }else{
          //   this.$refs.trafficCom.aaaaa = true;
          // }
          // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
          // this.mapGis.getOverlays().clear(); // 清除所有的Overlay层
          // this.drawLayersArr = []; // 清空图层数组
          // this.eraseTimer(); //清除定时器
          // this.drawLayersOverlayArr = []; // 清空图层的Overlay数组
          // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          this.$refs.trafficCom.aaaa("调用方法");
        } else {
        }
        if (val == "eventBulletin") {
          this.ifEventBulletin = true; // 打开右侧情报列表
        } else {
          this.ifEventBulletin = false; // 关闭右侧情报列表
        }
        this.$refs.leftTop.pageChange = false;
        this.roadPoint = "";
        this.coordinateTracingPointImg = "";
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.getOverlays().clear(); // 清除所有的Overlay层
        this.drawLayersArr = []; // 清空图层数组
        this.eraseTimer(); //清除定时器
        this.drawLayersOverlayArr = []; // 清空图层的Overlay数组
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
        // if (this.moveTip) {
        //     this.mapGis.addOverlay(this.moveTip); // 再添加一次鼠标滑动显示弹窗的Overlay层
        // }
        this.specialEventSet = []; // 本地清空特殊事件
        this.$store.commit("setSpecialEventSet", this.specialEventSet); // 全局存储特殊事件

        if (this.typeIndex2 === this.typeIndex1) {
          // 如果等于说明处于同一个模块下的分析和规律，切换后会把叠加的图层还原
          if (this.QingbaocoordinateTracingPointImg) {
            this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
          }
          if (this.PiontCoordinateLocus) {
            this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
          }
          if (this.equipmentLayers) {
            this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
          }
          if (this.pointPositionLayers && this.pageStatus !== "roadWatch") {
            this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
          }
        } else {
          // 不等于时重新赋值，并且把之前叠加保存的图层全部置空
          this.typeIndex2 = this.typeIndex1;
          this.QingbaocoordinateTracingPointImg = "";

          this.PiontCoordinateLocus = "";
          this.equipmentLayers = "";
          this.pointPositionLayers = "";

          this.$refs.layerCheck.checkedNews = []; // 清空layerCheck组件中选择的情报类型
          // 重置清空layerCheck组件中事件全选的状态
          this.$refs.layerCheck.checkAll = false;
          this.$refs.layerCheck.isIndeterminate = false;
          this.intelligenceLayerparameters = []; // 重置情报图层控制筛选结果��组
          this.intelligenceeventList = []; // 重置情报图层控制筛选结果数组
          // 重置清空layerCheck组件中设备全选的状态
          this.$refs.layerChecks.checkAll = false;
          this.$refs.layerChecks.isIndeterminate = false;
          this.$refs.layerChecks.checkedEquipment = []; // 清空layerCheck组件中选择的设备类型
          // 重置清空layerCheck组件中点位全选的状态
          this.$refs.layerCheckes.checkedPoint = false;
          this.$refs.layerCheckes.isIndeterminate = false;
        }

        // 切换模块时，默认清空情报闪烁延时器，好像有问题，管他呢
        clearTimeout(this.Flickertiming);
        this.Flickertiming = "";

        // this.$refs.layerCheck.checkedNews = []; // 清空layerCheck组件中选择的情报类型
        // // 重置清空layerCheck组件中事件全选的状态
        // this.$refs.layerCheck.checkAll = false; this.$refs.layerCheck.isIndeterminate = false;
        // this.intelligenceLayerparameters = [] // 重置情报图层控制筛选结果数组
        // this.intelligenceeventList = []; // 重置情报图层控制筛选结果数组
        // // 重置清空layerCheck组件中设备全选的状态
        // this.$refs.layerChecks.checkAll = false; this.$refs.layerChecks.isIndeterminate = false;
        // this.$refs.layerChecks.checkedEquipment = []; // 清空layerCheck组件中选择的设备类型
        // // 重置清空layerCheck组件中点位全选的状态
        // this.$refs.layerCheckes.checkedPoint = false; this.$refs.layerCheckes.isIndeterminate = false;

        // 监听到变化后调用函数首先清除所有的定时器，然后在各自的函数中再打开对应的定时器
        this.eraseTimer();

        this.echoPromptBox();
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
    // 回显提示框
    echoPromptBox() {
      // 移动提示框
      setTimeout(() => {
        if (this.moveTip) {
          this.mapGis.addOverlay(this.moveTip); // 再添加一次鼠标滑动显示弹窗的Overlay层
        }
        let container = document.getElementById("popup");
        let pageStatus = this.pageStatus;
        if (pageStatus === "trafficWatch") {
          container.style.width = "370px";
        } else if (pageStatus === "carWatch") {
          this.eraseTimer();
          container.style.width = "400px";
        } else if (pageStatus === "tidalWatch" || pageStatus === "tidalLow") {
          container.style.width = "310px";
        } else if (pageStatus === "carLow") {
          container.style.width = "auto";
        } else {
          container.style.width = "10vw";
        }
        if (this.moveTip) return;
        // let container = document.getElementById('popup');
        container.style.display = "block";
        // let content = document.getElementById("popup-content");
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
      }, 1000);
    },
    //
    hideTrafficCom(val) {
      this.ifTrafficCom = val;
    },
    // 拥堵分析回传函数修改mapLoading
    trafficLowLoading() {
      this.mapLoading = "";
    },
    // 开启地图页全屏loding
    mapFullscreenLoding() {
      // 打开loding
      this.mapLoading = Loading.service({
        lock: true,
        // text: "请稍候...",
        // spinner: "el-icon-loading",
        background: "rgba(10, 40, 100, 0)"
      });
      // setTimeout(() => {
      //     // 如果接口错误或者其他的什么错的，默认等待1分钟左右loding自动关闭
      //     console.log("超时自动关闭弹窗");
      //     if (this.mapLoading) {
      //         console.log("开始超时自动关闭弹窗");
      //         this.mapLoading.close();
      //         this.mapLoading = "";
      //     }
      //     // clearTimeout(this.mapLoading);
      // }, 1000 * 60 * 1);
    },
    // 全局处理关闭本页手动打开的特有loding圈圈
    mapFullClosedscreenLoding() {
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },
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
          endTime: t.endTime, // 事件结束时间
          closeTime: t.closeTime, // 事件手动结束时间
          quyu: t.quyu // 事件区域
        });
      });
      // 处理坐标点偏移问题
      // data.map(t => {
      //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
      // });
      // if (!type || name) {
      //     this.QingbaoInitializationLayer(data); // 初始化标点图层
      // } else {
      //     this.QingbaoInitializationLayero(data); // 地图点位变化时重新汇点
      // }
      this.ScintillationPoint(data, startti, type, name); // 地图闪烁点,并且绘制图形
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
              statTime: t.incidentStartTime, // 事件开始时间
              endTime: t.incidentEndTime, // 事件结束时间
              closeTime: t.closeTime || "", // 事件手动结束时间
              quyu: t.districtRegionId // 事件区域
            });
          } else {
            if (t.closeTime && t.closeTime === t.endTime) {
              // closeTime代表手动关闭时间，如果自定义事件的手动关闭时间和自动结束不一致，则这个事件不需要在地图上显示绘制出来，这里判断一下
              let locationPonit = JSON.parse(t.location);
              if (locationPonit.length > 1) {
                // locationPonit多个对象时，需要绘制箭头线
                let locationPonitObj = { locationPonitObj: [...locationPonit] };
                wheadlayerdataSource = [
                  ...wheadlayerdataSource,
                  locationPonitObj
                ];
                PonitdataSource.push({
                  id: t.id,
                  sTypeId: t.intelligenceId,
                  // sTypeId: `d_${t.number}`,
                  status: t.intelligenceStatus === "1" ? "0" : "1",
                  longitude: locationPonit[locationPonit.length - 1].longitude,
                  latitude: locationPonit[locationPonit.length - 1].latitude,
                  statTime: t.startTime, // 事件开始时间
                  endTime: t.endTime, // 事件结束时间
                  closeTime: t.closeTime || "", // 事件手动结束时间
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
                    status: t.intelligenceStatus === "1" ? "0" : "1",
                    longitude: locationPonit[0].longitude,
                    latitude: locationPonit[0].latitude,
                    statTime: t.startTime, // 事件开始时间
                    endTime: t.endTime, // 事件结束时间
                    closeTime: t.closeTime || "", // 事件手动结束时间
                    quyu: t.area // 事件区域
                  }
                ];
              }
            }
          }
        }
      });
      // 点处理完后，调用函数对坐标进行拼凑
      this.InitGisPointData(PonitdataSource, type, name, startti); // 处理坐标点,用于在地图上标记警告点使用
      this.InitGiswheadlayerData(wheadlayerdataSource, type); // 处理坐标点,用于在地图上标记警告点使用
    },

    // 初始化地图
    InitCarGis(coordinate) {
      // "http://211.159.188.107:81/map_net/googlemaps/roadmap/{z}/{x}/{y}.png"
      // "http://211.159.188.107:81/map_beijing/googlemaps/roadmap/{z}/{x}/{y}.png"
      // "http://211.159.188.107:81/1_google_tianjin/{z}/{x}/{y}.png"
      // http://211.159.188.107:81/map_net/googlemaps/roadmap/{z}/{x}/{y}.png
      // http://211.159.188.107:81/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png
      let Mapurl =
        "http://47.105.212.6:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
        // "http://49.7.59.232:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
      let scaleLineControl = GisClassMethod.ScaleLineControl(); // 地图比例尺控件初始化
      let overviewMapControl = GisClassMethod.OverViewMapControl(Mapurl); // 地图鹰眼控件初始化
      // let fullScreens = GisClassMethod.FullScreen();
      this.bottomMapLayer = GisClassMethod.BottomMapLayer(Mapurl); // 地图底图图层初始化
      let MapsArrs = [this.bottomMapLayer];
      this.mapGis = GisClassMethod.TotalLayer(
        "tems_gis",
        this.mapCenter,
        12,
        8,
        21,
        MapsArrs
      ); // 地图总绘制初始化
      // this.mapGis.addControl(fullScreens); // 全屏控件
      this.mapGis.addControl(scaleLineControl);
      this.mapGis.addControl(overviewMapControl); // 鹰眼，比例尺控件放进地图中
      this.mapGis.on("click", this.Mapclick); // 地图的点击事件(左击事件)
      this.mapGis.on("pointermove", this.Mapmove); // 地图的鼠标移动事件(左击事件)
      this.RightClickMap(); // 地图的点击事件(右击事件)
      this.mapGis.on("movestart", this.Mapmovestart); // 地图拖动，缩放出发事件（动作开始时出发）
      this.mapGis.on("moveend", this.Mapmoveend); // 地图拖动，缩放出发事件（动作结束时出发）
    },

    // 初始化标点图层
    InitializationLayer(coordinate, scale) {
      this.coordinateTracingPointImg = GisClassMethod.CoordinateTracingPointImg(
        coordinate,
        scale
      ); // 地图根据坐标描点层(自定义图标代替)
      this.mapGis.addLayer(this.coordinateTracingPointImg);
    },
    // 交通状态观测的路口标点图层
    InitializationLayerTraffic(coordinate, scale) {
      this.coordinateTraficingPointImg = GisClassMethod.CoordinateTracingPointImg(
        coordinate,
        scale
      ); // 地图根据坐标描点层(自定义图标代替)
      this.mapGis.addLayer(this.coordinateTraficingPointImg);
    },
    // 情报告警初始化标点图层
    QingbaoInitializationLayer(coordinate, scale) {
      this.QingbaocoordinateTracingPointImg = GisClassMethod.QingbaoCoordinateTracingPointImg(
        coordinate,
        scale
      ); // 地图根据坐标描点层(自定义图标代替)
      this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg);
    },
    // 初始化箭头线图层
    Initarrowheadlayer(coordinate) {
      this.PiontCoordinateLocus = GisClassMethod.PiontCoordinateLocus(
        coordinate
      );
      this.mapGis.addLayer(this.PiontCoordinateLocus); // 添加新的箭头线图层
      let PiontDrawArrowLine = GisClassMethod.PiontDrawArrowLine(
        // s设置图层优先级
        this.mapGis,
        this.PiontCoordinateLocus
      ); // 添加箭头图标
      this.mapGis = PiontDrawArrowLine[0];
      this.PiontCoordinateLocus = PiontDrawArrowLine[1];
      setTimeout(() => {
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },
    // 地图点位变化时重新汇点
    InitializationLayero(coordinate) {
      this.coordinateTracingPointImg = GisClassMethod.CoordinateChangePointImg(
        // this.coordinateTracingPointImg,
        coordinate
      ); // 地图根据坐标描点层(自定义图标代替)
    },
    // 情报告警地图点位变化时重新汇点
    QingbaoInitializationLayero(coordinate) {
      // this.mapGis.removeLayer(this.QingbaocoordinateTracingPointImg); // 先删除上一次画出的箭头线图层，
      this.QingbaocoordinateTracingPointImg = GisClassMethod.QingbaoCoordinateChangePointImg(
        this.QingbaocoordinateTracingPointImg,
        coordinate
      ); // 地图根据坐标描点层(自定义图标代替)
      // this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
    },
    // 箭头线数据变化时重新绘制
    Initarrowheadlayero(coordinate) {
      this.mapGis.removeLayer(this.PiontCoordinateLocus); // 先删除上一次画出的箭头线图层
      this.PiontCoordinateLocus = GisClassMethod.PiontCoordinateLocus(
        coordinate
      );
      this.mapGis.addLayer(this.PiontCoordinateLocus); // 添加新的箭头线图层
      let PiontDrawArrowLine = GisClassMethod.PiontDrawArrowLine(
        this.mapGis,
        this.PiontCoordinateLocus
      ); // 地图根据坐标描点层(不使用自定义图标代替)
      this.mapGis = PiontDrawArrowLine[0];
      this.PiontCoordinateLocus = PiontDrawArrowLine[1];
      setTimeout(() => {
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },

    // 地图闪烁点
    ScintillationPoint(coordinate, startti, type, name) {
      let currentTime = this.dintelligenceTime; // 当前时间
      // startti为true当前时间减少16秒确定需要闪烁的点（考虑到定时器延迟） // startti为false当前时间减少5秒确定需要闪烁的点
      let currentTimeJ = startti
        ? currentTime - 1000 * 15
        : currentTime - 1000 * 6;
      let FlickerData = []; // 所有需要闪烁的点（包括开启和关闭的）
      let FlickerCloseData = []; // 只是关闭需要闪烁的点
      // console.log(coordinate);
      coordinate.map((t, i) => {
        // this.dataLaketimeConversion(t.statTime)
        if (t.status === "0") {
          // 事件为开启状态
          let timers = this.$filter.timesFormat(t.statTime); // 事件开始时间
          if (timers >= currentTimeJ && timers <= currentTime) {
            let clonetObj = this.$tools.deepCopy(t); // 先深克隆一份对象
            coordinate.splice(i, 1); // 删除原有的那个对象
            FlickerData = [...FlickerData, clonetObj]; // 使用深克隆出的这份儿对象，因为之前的已经删掉了
          }
        }
        if (t.status === "1") {
          // 事件为关闭状态
          if (
            !t.hasOwnProperty("closeTime") ||
            t.closeTime === "" ||
            t.closeTime === t.endTime
          ) {
            // 事件没有手动结束时间或者手动结束时间等于自动时间说明是刷新时间内增加的关闭事件，排除手动关闭的事件
            let timers = t.endTime; // 事件结束时间
            if (timers >= currentTimeJ && timers <= currentTime) {
              let clonetObj = this.$tools.deepCopy(t); // 先深克隆一份对象
              coordinate.splice(i, 1); // 删除原有的那个对象
              FlickerData = [...FlickerData, clonetObj]; // 使用深克隆出的这份儿对象，因为之前的已经删掉了
              FlickerCloseData = [...FlickerCloseData, clonetObj]; // 使用深克隆出的这份儿对象，因为之前的已经删掉了
            }
          }
        }
      });
      // console.log(coordinate);
      // this.intelligenceeventList.find(t => t.id === coordinate[2].id)
      // this.Videoarray = [this.intelligenceeventList.find(t => t.id === coordinate[0].id), this.intelligenceeventList.find(t => t.id === coordinate[1].id)]; // 先给一个假的值测试
      // console.log(this.Videoarray);
      // console.log(FlickerData);

      // 重新组合点位绘制图形
      let coordinateData =
        FlickerData.length > 0
          ? [...coordinate, ...FlickerData]
          : [...coordinate]; // 重新组合新的情报点位组合，目的是让新出的点位绘制在原先已经存在的点位上面，方便查看
      // console.log(coordinateData);
      if (!type || name) {
        this.QingbaoInitializationLayer(coordinateData); // 初始化标点图层
      } else {
        this.QingbaoInitializationLayero(coordinateData); // 地图点位变化时重新汇点
      } // 绘制结束开始初始闪烁点
      this.FlickerData = [...FlickerData]; // 为了预防延时清除闪烁点取不到数组的情况每次在全局存一下闪烁点集合
      if (FlickerData.length > 0) {
        FlickerData.map((t, i) => {
          t.did = `${new Date().getTime()}${i}`;
          let point_div = document.createElement("div");
          // status === "0"事件为开启状态;status === "1"事件为关闭状态
          point_div.innerHTML =
            t.status === "0"
              ? "<div id='css_animationo'></div>"
              : "<div id='css_animationp'></div>";
          let point_overlay = new ol.Overlay({
            element: point_div,
            offset: [-20, 12],
            positioning: "bottom-left",
            position: ol.proj.transform(t.point, "EPSG:4326", "EPSG:3857"),
            // stopEvent: false,
            id: t.did
          });
          this.mapGis.addOverlay(point_overlay);
          point_div.parentNode.className = "scintillationPoint";
        });
        this.Flickertiming = setTimeout(() => {
          // this.FlickerData .map(t => {
          //     // if (t.status === "0") {

          //     // }
          //     // 删除对应点位的overlayer
          //     let overlay = this.mapGis.getOverlayById(t.did);
          //     if (overlay) {
          //         this.mapGis.removeOverlay(overlay);
          //     }
          // });
          let FlickerDataLength = this.FlickerData.length;
          for (let i = 0; i < FlickerDataLength; i++) {
            function sleep(numberMillis) {
              let nowTime = new Date();
              let exitTime = nowTime.getTime() + numberMillis;
              while (true) {
                nowTime = new Date();
                if (nowTime.getTime() > exitTime) return;
              }
            }
            // 删除对应点位的overlayer
            let overlay = this.mapGis.getOverlayById(this.FlickerData[i].did);
            if (overlay) {
              this.mapGis.removeOverlay(overlay);
            }
            // 断掉循环1.5s，js的for太快，等不到ol的API返回图层就执行后面了，内心毫无波澜，甚至还想加点儿定时器时长
            sleep(1500);
          }
          // 这一段其实我是不想加的，但是这个闪烁层总是删不干净，被逼无奈，哎，智障程序
          let overlaycontainerNodes = document.getElementsByClassName(
            "ol-overlaycontainer"
          ); // 获取所有的ol-overlaycontainer节点
          for (let c = 0; c < overlaycontainerNodes.length; c++) {
            let childs = overlaycontainerNodes[c].childNodes; // 获取所有子节点
            if (childs && childs.length !== 0) {
              overlaycontainerNodes[c].removeChild(childs[i]);
            }
          }
        }, 180000);
      }
      // 关闭刷新出关闭的特殊事件弹窗
      FlickerCloseData.map(t => {
        let itema = this.intelligenceeventList.find(e => e.id === t.id);
        let itemb = this.specialEventSet.find(
          el => el.incidentId === itema.incidentId
        );
        if (itemb) {
          let videoOverlay = this.mapGis.getOverlayById(itemb.incidentId);
          this.mapGis.removeOverlay(videoOverlay);
          this.specialEventSet.splice(this.specialEventSet.indexOf(itemb), 1);
          this.$store.commit("setSpecialEventSet", this.specialEventSet); // 全局存储特殊事件
        }
      });
      this.SpecialeventOperation(FlickerData); // 调用特殊事件处理func
    },
    // 特殊事件操作
    SpecialeventOperation(FlickerData) {
      this.Videoarray = []; // 先清空需要显示的特殊事件
      // console.log(FlickerData);
      if (FlickerData.length > 0) {
        FlickerData.map(t => {
          if (t.status === "0") {
            // 开启的特殊事件
            let item = this.intelligenceeventList.find(e => e.id === t.id);
            // console.log(item);
            if (
              item.hasOwnProperty("incidentType") &&
              (item.incidentType === "5" || item.incidentType === "8")
            ) {
              this.Videoarray = [...this.Videoarray, item];
            }
          }
        });
      }
      // console.log(this.Videoarray);
      // 添加实时视频弹窗intelligenceeventList
      this.Videoarray.map((t, i) => {
        // t.did = `${new Date().getTime()}${i}`;
        if (t.hasOwnProperty("location")) {
          let location = JSON.parse(t.location);
          t.longitude = location[0].longitude;
          t.latitude = location[0].latitude;
        }
        this.eventTip(
          ol.proj.transform(
            [t.longitude, t.latitude],
            "EPSG:4326",
            "EPSG:3857"
          ),
          this.mapGis,
          t.incidentId,
          "视频"
        );
      });
      // this.eventTip(this.Videoarray, this.mapGis, null, "视频");

      this.specialEventSet = [...this.specialEventSet, ...this.Videoarray]; // 本地先存储一下
      this.$store.commit("setSpecialEventSet", this.specialEventSet); // 全局存储特殊事件
    },

    // 地图绑定点击事件,点击元素时显示操作
    Mapclick(envt) {
      let pixel = this.mapGis.getEventPixel(envt.originalEvent);
      let _this = this;
      let status = this.status;
      let featureArrs = [];
      let feature = this.mapGis.forEachFeatureAtPixel(pixel, function(
        feature,
        layer
      ) {
        // if (feature.get("id")) {
        featureArrs.push(feature);
        // }
        // return feature;
      });
      // 点击到元素，判断元素是点位时执行
      // feature && feature.get("dataType") === "coordinate" && status !== "mapRanging" && status !== "selectionArea" && status !== "markPointPosition"
      // feature && feature.get("dataType") === "coordinate"
      // 当点击获取到一个feature层时执行
      if (
        featureArrs.length === 1 &&
        featureArrs[0].get("dataType") === "coordinate"
      ) {
        // if (_this.pageStatus !== "eventBulletin" && _this.pageStatus !== "roadWatch") {
        //     return;
        // }
        let feature = featureArrs[0];
        this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        // 获取到对应点位的id
        let ids = feature.get("id");
        let coordinate = {
          longitude: feature.get("longitude"),
          latitude: feature.get("latitude")
        };
        let item = _this.ErrorData.find(t => t.id === ids); // 情报点
        // let item = _this.ErrorData.map(t => {
        //     if (t) {
        //         if (t.location) {
        //             let position = JSON.parse(t.location);
        //             if (position[0] && position.length === 1) {
        //                 if (t.longitude === position[0].longitude && t.latitude === position[0].latitude) {
        //                     return t;
        //                 }
        //             }
        //         }
        //     }
        // });
        if (item) {
          let position = envt.coordinate;
          // 删除对应点位的overlayer
          let overlay;
          let videoOverlay;
          if (_this.tooltip.id) {
            overlay = _this.mapGis.getOverlayById(_this.tooltip.id);
          }
          if (overlay) {
            _this.mapGis.removeOverlay(overlay);
          }
          if (ids) {
            // 判断是否有查看视频弹窗
            let i = _this.intelligenceeventList.find(t => t.id === ids);
            let o = _this.Videoarray.find(t => t.id === i.id);
            if (o) {
              videoOverlay = _this.mapGis.getOverlayById(o.incidentId);
            }
          }
          if (videoOverlay) {
            // 有查看视频弹窗删除
            _this.mapGis.removeOverlay(videoOverlay);
          }
          // 添加对应点位的overlayer
          _this.tipTypeName = "事件";
          _this.eventTip(position, _this.mapGis, ids, _this.tipTypeName);
          // 对应点位的overlayer内容
          _this.tooltip.id = ids;
          // _this.tooltip = this.eventList.find()
          this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
        } else {
          let equipmentItem = _this.equipmentList.find(t => t.id === ids); // 设备点
          let pointPositionItem = _this.pointList.find(t => t.id === ids); // 点位点
          if (equipmentItem || pointPositionItem) {
            // 如果点击的是设备点或者点位点
            let position = envt.coordinate;
            // 删除对应设备或者点位的overlayer
            let overlay;
            if (_this.tooltip.id) {
              overlay = _this.mapGis.getOverlayById(_this.tooltip.id);
            }
            if (overlay) {
              _this.mapGis.removeOverlay(overlay);
            }
            _this.tipTypeName = equipmentItem ? "设备" : "点位";
            // 对应设备或者点位的overlayer内容
            // _this.tooltip.id = ids;
            if (pointPositionItem) {
              _this.tooltip = _this.$tools.deepCopy(pointPositionItem);
            }
            // 如果是路口页面，直接出现侧边栏
            if (_this.pageStatus === "roadWatch") {
              _this.pointViewSidebar();
              return;
            }
            // 添加对应设备或者点位的overlayer
            _this.eventTip(position, _this.mapGis, ids, _this.tipTypeName);
          } else {
            if (_this.pageStatus === "roadWatch") {
              _this.ifTrafficCom = !_this.ifTrafficCom;
              return;
            }
          }
          this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
        }
      } else if (featureArrs.length > 1) {
        // 当点击获取到多个feature层时执行
        this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        // 随便使用第一个feature层的坐标来确定位置
        let coordinate = {
          longitude: featureArrs[0].get("longitude"),
          latitude: featureArrs[0].get("latitude")
        };
        // 循环获取到对应点位的id
        let intelligenceCollection = []; // 情报集合
        let deviceSet = []; // 设备集合
        let pointSet = []; // 点位集合
        featureArrs.map(e => {
          let ids = e.get("id");
          let itema = _this.ErrorData.find(t => t.id === ids); // 情报点
          if (itema) {
            // 找到情报点
            intelligenceCollection = [...intelligenceCollection, itema];
          } else {
            let itemb = _this.equipmentList.find(t => t.id === ids); // 设备点
            if (itemb) {
              // 找到设备点
              deviceSet = [...deviceSet, itemb];
            } else {
              let itemc = _this.pointList.find(t => t.id === ids); // 点位点
              if (itemc) {
                // 找到点位点
                pointSet = [...pointSet, itemc];
              }
            }
          }
        });
        this.dintelligenceCollection = [...intelligenceCollection];
        this.ddeviceSet = [...deviceSet];
        this.dpointSet = [...pointSet];
        if (
          _this.pageStatus === "roadWatch" &&
          intelligenceCollection.length === 0 &&
          deviceSet.length === 0
        ) {
          this.tooltip = this.$tools.deepCopy(this.dpointSet[0]);
          _this.pointViewSidebar();
          return;
        }
        // 找完所有重叠的情报，设备，点位点
        if (
          intelligenceCollection.length !== 0 ||
          deviceSet.length !== 0 ||
          pointSet.length !== 0
        ) {
          // 开始创建弹窗
          let position = envt.coordinate;
          // 删除对应点位的overlayer(之前如果有点击出弹窗的先关闭)
          let overlay;
          let videoOverlay;
          if (_this.tooltip.id) {
            overlay = _this.mapGis.getOverlayById(_this.tooltip.id);
          }
          if (overlay) {
            _this.mapGis.removeOverlay(overlay);
          }
          // 我是实在不想在找到多层后还得去删除一次视频弹窗，嗯。不删了，对
          // intelligenceCollection.map(el => {
          //     let o = _this.Videoarray.find(t => t.incidentId === el.incidentId);
          //     if (o) {
          //         videoOverlay = _this.mapGis.getOverlayById(o.incidentId);
          //     }
          //     if (videoOverlay) {
          //         // 有查看视频弹窗删除
          //         _this.mapGis.removeOverlay(videoOverlay);
          //     }
          // });
          // 添加多个点位的overlayer
          // _this.tipTypeName = "事件";
          // _this.eventTip(position, _this.mapGis, ids, _this.tipTypeName);

          // 直接启动弹窗吧
          this.launchDetailsOpen();
          this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
        }
      } else {
        // 点击空白处关闭图层控制
        let controlForm = document.getElementById("gisLeft");
        let classValue = controlForm.className;
        if (classValue.includes("showLayerControl")) {
          controlForm.className = "gisLeftT hideLayerControl";
        }
      }
      // 取消告警
      let AlarmButton = document.getElementsByClassName("clearWarn")[0];
      if (AlarmButton) {
        AlarmButton.onclick = function() {
          _this.clearWarn();
        };
      }

      // 查看视频
      let watchVideoButton = document.getElementsByClassName("watchVideo")[0];
      if (watchVideoButton) {
        watchVideoButton.onclick = function() {
          _this.watchVideoss();
        };
      }

      // 路口查看侧边栏
      let pointViewSidebarButton = document.getElementsByClassName(
        "pointViewSidebar"
      )[0];
      if (pointViewSidebarButton) {
        pointViewSidebarButton.onclick = function() {
          _this.pointViewSidebar();
        };
      }

      // 查看详情
      let showDetail = document.getElementsByClassName("showDetail")[0];
      if (showDetail) {
        showDetail.onclick = function() {
          _this.MapeventDetail();
        };
      }

      // 删除提示框
      let closeTooltip = document.getElementsByClassName("closeTooltip")[0];
      if (closeTooltip) {
        closeTooltip.onclick = function() {
          // let videoId = closeTooltip.getAttribute("id");
          // console.log(videoId);
          _this.removeTooltip();
        };
      }
    },
    // 路口观测的点击，重叠点位，点击查看信息
    showRoad(item) {
      this.launchDetails = false;
      this.tooltip = item;
      this.pointViewSidebar();
    },
    // 重叠事件展开弹窗
    launchDetailsOpen() {
      this.launchDetails = true;
    },
    // 关闭重叠事件弹窗
    launchDetailsClose() {
      this.ifEventVideo = false; // 关闭右侧视频
      this.ifEventBulletin = true; // 打开右侧情报列表
      this.launchDetails = false;
    },

    // 营运车辆的鼠标移入的提示框的echart
    Columns1(itemData, type) {
      let tymeName = type ? "早高峰 km/h" : "km/h";
      let myChart = this.$echarts.init(document.getElementById("Columns1"));
      let option = {
        // title: {
        //     x: "left",
        //     text: "{value}", // 主标题
        //     textStyle: {
        //         fontSize: 14,
        //         fontWeight: "normal",
        //         color: "#fff",
        //         fontFamily: "PingFangSC-Regular"
        //     },
        //     /* subtext: '_________________________________________________________________________', // 副标题*/
        //     subtextStyle: {
        //         color: "#fff"
        //     },
        //     itemGap: 0 //主副标题距离
        // },
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
            data: [{ value: itemData || 0, name: tymeName }],
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#4cbfe7"
            },
            radius: "95%",
            startAngle: 225,
            endAngle: -45,
            clockwise: true,
            min: 0,
            max: 120,
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                width: 5
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
    Columns2(itemData, type) {
      let tymeName = type ? "晚高峰 km/h" : "km/h";
      let myChart = this.$echarts.init(document.getElementById("Columns2"));
      let option = {
        // title: {
        //     x: "left",
        //     text: "{value}", // 主标题
        //     textStyle: {
        //         fontSize: 14,
        //         fontWeight: "normal",
        //         color: "#fff",
        //         fontFamily: "Pin gFangSC-Regular"
        //     }, // 副标题
        // /*subtext: '_________________________________________________________________________', */ subtextStyle: {
        //         color: "#fff"
        //     },
        //     itemGap: 0 //主副标题距离
        // },
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
            data: [{ value: itemData || 0, name: tymeName }],
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#4cbfe7"
            },
            radius: "95%",
            startAngle: 225,
            endAngle: -45,
            clockwise: true,
            min: 0,
            max: 120,
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                width: 5
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
    Columns3(itemData) {
      let myChart = this.$echarts.init(document.getElementById("Columns3"));
      let option = {
        // title: {
        //     x: "left",
        //     text: "{value}", // 主标题
        //     textStyle: {
        //         fontSize: 14,
        //         fontWeight: "normal",
        //         color: "#fff",
        //         fontFamily: "PingFangSC-Regular"
        //     },
        //     /* subtext: '_________________________________________________________________________', // 副标题*/
        //     subtextStyle: {
        //         color: "#fff"
        //     },
        //     itemGap: 0 //主副标题距离
        // },
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
            data: [{ value: itemData || 0, name: "夜低峰 km/h" }],
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#4cbfe7"
            },
            radius: "95%",
            startAngle: 225,
            endAngle: -45,
            clockwise: true,
            min: 0,
            max: 120,
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                width: 5
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
    Columns4(itemData) {
      let option = {
        // title: {
        //     x: "left",
        //     text: "{value}", // 主标题
        //     textStyle: {
        //         fontSize: 14,
        //         fontWeight: "normal",
        //         color: "#fff",
        //         fontFamily: "PingFangSC-Regular"
        //     },
        //     /* subtext: '_________________________________________________________________________', // 副标题*/
        //     subtextStyle: {
        //         color: "#fff"
        //     },
        //     itemGap: 0 //主副标题距离
        // },
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
            data: [{ value: itemData || 0, name: "日平峰 km/h" }],
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#4cbfe7"
            },
            radius: "95%",
            startAngle: 225,
            endAngle: -45,
            clockwise: true,
            min: 0,
            max: 120,
            splitNumber: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: [[0.2, "#91c7ae"], [0.8, "#63869e"], [1, "#c23531"]],
                width: 5
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
    Columns5(dataArr) {
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
          itemGap: 0 // 主副标题距离
        },
        tooltip: {},
        legend: {
          show: false,
          data: ["峰值"]
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
          data: ["早高峰", "晚高峰", "日平峰", "夜低峰"]
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
            name: "峰值",
            barWidth: "10px",
            type: "bar",
            z: 10,
            data: [5, 20, 36, 10],
            label: {
              show: true,
              position: "right",
              color: "#fff"
            }
          },
          {
            name: "峰值",
            barWidth: "10px",
            type: "bar",
            data: [40, 40, 40, 40],
            color: "#192A41",
            barGap: "-100%"
          }
        ]
      };
      myChart.setOption(option);
    },
    // 交通构成的移入事件
    trafficEcharts() {
      let myChart = this.$echarts.init(
        document.getElementById("trafficWatchEarchBody")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: true,
          orient: "vertical",
          // x: 'left',
          left: 0,
          bottom: "20%",
          top: "20%",
          data: [
            "到达交通比例",
            "驶离交通比例",
            "内部交通比例",
            "过境交通比例"
          ],
          textStyle: {
            color: "#20c0be"
          }
        },
        color: ["#c0a020", "#206fc0", "#20c0be", "#00c645"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            center: ["65%", "50%"],
            radius: ["50%", "70%"],
            // avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{c}%"
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 5
              }
            },
            // itemStyle:{
            //     color:["#c0a020","#206fc0","#20c0be","#00c645"]
            // },
            data: [
              { value: this.trafficComNumber.value[0], name: "到达交通比例" },
              { value: this.trafficComNumber.value[1], name: "驶离交通比例" },
              { value: this.trafficComNumber.value[2], name: "内部交通比例" },
              { value: this.trafficComNumber.value[3], name: "过境交通比例" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },

    // 地图绑定的鼠标移动事件
    Mapmove(event) {
      let pixel = this.mapGis.getEventPixel(event.originalEvent);
      let _this = this;
      this.content = document.getElementById("popup-content");
      if (this.content) {
        this.content.innerHTML = "";
      }
      if (this.moveTip) {
        this.mapGis.addOverlay(this.moveTip); // 再添加一次鼠标滑动显示弹窗的Overlay层
      }
      let centercolor = "";
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
      ) {
        return;
      }
      let ODFeatures = [];
      let tidalLayer = ""; // 潮汐流layer层
      let features = this.mapGis.forEachFeatureAtPixel(pixel, function(
        feature,
        layer
      ) {
        tidalLayer = layer;
        if (pageStatus === "ODwatch" || pageStatus === "ODLow") {
          let ids = feature.getId();
          if (ids.toString().startsWith("m")) {
            ODFeatures.push(feature);
          }
        } else {
          return feature;
        }
      });
      if (features || ODFeatures.length !== 0) {
        let ids = "";
        if (features) {
          ids = features.getId();
          if (ids) {
            if (ids.toString().startsWith("m")) {
              return;
            }
          }
        }
        let eventItem = this.intelligenceeventList.find(t => t.id === ids); // 检测当前的位置在情报数据里有没有，如果有则没有鼠标悬浮弹窗
        let equipmentItem = this.equipmentList.find(t => t.id === ids); // 检测当前的位置在设备数据里有没有，如果有则没有鼠标悬浮弹窗
        let pointPositionItem = this.pointList.find(t => t.id === ids); // 检测当前的位置在点位数据里有没有，如果有则没有鼠标悬浮弹窗
		if (
          !eventItem &&
          !equipmentItem &&
          !pointPositionItem &&
          ids !== "coordinate"
        ) {
          // OD观测和规律移入事件
          if (pageStatus === "ODwatch" || pageStatus === "ODLow") {
            let count = 0;
            let bigMount = "";
            // let timer = "";
            let timer = [];
            ODFeatures.map(val => {
              let item = _this.ODnumber.find(t => t.id === val.getId());
              centercolor = item;
              if (!item) {
                return;
              }
              if (bigMount !== "") {
                if (item.carCount > bigMount.carCount) {
                  // bigMount = item;
                }
              } else {
                if (timer == "") {
                  bigMount = item;
                  let times = item.timer;
                  timer = times;
                }
              }
              count = count + item.carCount;
            });
            let html = "";
            if (pageStatus === "ODwatch") {
              html = `<p class="margin">车辆数：${count}(辆)</p>`;
            } else if (pageStatus === "ODLow") {
              html = `<div  class="margin"><p>时间段：${timer}</p>
                     <p>车辆数：${bigMount.carCount}(辆)</p></div>`;
            }
            this.content = document.getElementById("popup-content");
            this.content.innerHTML = html;
            if (pageStatus === "ODwatch") {
              let ODLowHight = ODFeatures.find(t => t.getId() === bigMount.id);
              let ODLowDataColor = "#2960ff";
              if (this.ODLowHight !== "" && this.ODLowHight !== ODLowHight) {
                let ODLowData = _this.ODnumber.find(
                  t => t.id === this.ODLowHight.getId()
                );
                if (ODLowData) {
                  let color = ODLowData.color;
                  this.ODLowHight.setStyle(
                    new ol.style.Style({
                      fill: new ol.style.Fill({
                        color: color
                      }),
                      stroke: new ol.style.Stroke({
                        // lineDash: [1, 3, 5],
                        width: 5,
                        color: color
                      })
                    })
                  );
                }
              }
              ODLowHight.setStyle(
                new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: ODLowDataColor
                  }),
                  stroke: new ol.style.Stroke({
                    // lineDash: [1, 3, 5],
                    color: ODLowDataColor,
                    width: 5
                  })
                })
              );
              this.ODLowHight = ODLowHight;
            }
            if (pageStatus === "ODLow") {
              // 高亮数量最大的那条线
              let ODLowHight = ODFeatures.find(t => t.getId() === bigMount.id);
              let ODLowDataColor = "";
              if (timer == "0点到3点") {
                ODLowDataColor = "#e10200";
              } else if (timer == "3点到6点") {
                ODLowDataColor = " #a6614c";
              } else if (timer == "6点到9点") {
                ODLowDataColor = "#1a97f7";
              } else if (timer == "9点到12点") {
                ODLowDataColor = "#11f0ee";
              } else if (timer == "12点到15点") {
                ODLowDataColor = "#ea04aa";
              } else if (timer == "15点到18点") {
                ODLowDataColor = "#b866ff";
              } else if (timer == "18点到21点") {
                ODLowDataColor = "#cbff72";
              } else {
                ODLowDataColor = "#10f00b";
              }
              ODLowHight.setStyle(
                new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: ODLowDataColor
                  }),
                  stroke: new ol.style.Stroke({
                    // lineDash: [1, 3, 5],
                    color: ODLowDataColor,
                    width: 5
                  })
                })
              );
              if (this.ODLowHight !== "" && this.ODLowHight !== ODLowHight) {
                let ODLowData = _this.ODnumber.find(
                  t => t.id === this.ODLowHight.getId()
                );
                if (ODLowData) {
                  let color = "rgb(" + ODLowData.colorA + ")";
                  this.ODLowHight.setStyle(
                    new ol.style.Style({
                      fill: new ol.style.Fill({
                        color: color
                      }),
                      stroke: new ol.style.Stroke({
                        // lineDash: [1, 3, 5],
                        width: 5,
                        color: color
                      })
                    })
                  );
                }
              }
              this.ODLowHight = ODLowHight;
            }
            overlay.setPosition(event.coordinate);
          }
          /*  */
          // 潮汐流观测和规律移入事件
          if (pageStatus === "tidalWatch" || pageStatus === "tidalLow") {
            let item = _this.tidalWatchdata.find(t => t.id === ids);
            //  _this.tidalWatchdata.map(item=>{
            if (item) {
              let forwardTraffic = item.forwardTraffic
                ? Number(item.forwardTraffic).toFixed(0)
                : "无";
              let reverseTrafficFlow = item.reverseTrafficFlow
                ? Number(item.reverseTrafficFlow).toFixed(0)
                : "无";
              let currentCXI = item.currentCXI
                ? Number(item.currentCXI).toFixed(2)
                : "无";
              let expectedSymPerCXI = item.expectedSymPerCXI
                ? Number(item.expectedSymPerCXI).toFixed(2)
                : "无";
              let html = "";
              if (pageStatus === "tidalWatch") {
                html = `<div class="margin"><p>正向流量（辆/小时）：${forwardTraffic}</p>
                                    <p>反向流量（辆/小时）：${reverseTrafficFlow}</p>
                                    <p>当前CXI：${currentCXI}</p>
                                    <p>预计对称时段CXI：${expectedSymPerCXI}</p>
                                    <p>日期类型：${this.dayNature}</p></div>`;
              } else {
                // <p>日期类型：${this.dayNature}</p>
                html = `<div class="margin"><p>正向流量（辆/小时）：${forwardTraffic}</p>
                                <p>反向流量（辆/小时）：${reverseTrafficFlow}</p>
                                <p>持续时段：${item.tidalFlowStartTime ||
                                  "无"} 至 ${item.tidalFlowEndTime ||
                  "无"}</p></div>`;
              }
              _this.content = document.getElementById("popup-content");
              _this.content.innerHTML = html;
              overlay.setPosition(event.coordinate);

              // 潮汐流移入高亮
              if (tidalLayer) {
                // .getFeatureById(`${ids}`)
                let tidalLayerHight = tidalLayer; // 找到对应的潮汐流Layer层
                let path = [];
                item.trace.map(i => {
                  i.path.map(y => {
                    path.push(y.point);
                  });
                });
                this.amount = path.length;
                if (
                  this.tidalLayerHight !== "" &&
                  this.tidalLayerHight !== tidalLayerHight
                ) {
                  let HightId = this.tidalLayerHight
                    .getSource()
                    .getFeatures()[0]
                    .getId();
                  let otem = this.tidalWatchdata.find(t => t.id === HightId);
                  let linColor = ""; //、、、
                  if (otem.tidalFlowLevel === 1) {
                    linColor = "#cd0a0a";
                  } else if (otem.tidalFlowLevel === 2) {
                    linColor = "#b85be4";
                  } else if (otem.tidalFlowLevel === 3) {
                    linColor = "#2f82ff";
                  } else if (otem.tidalFlowLevel === 4) {
                    linColor = "#2afbea";
                  } else {
                    linColor = "#2bdf27";
                  }
                  this.tidalLayerHight = GisClassMethod.TidalHightColor(
                    this.tidalLayerHight,
                    HightId,
                    linColor,
                    this.amount
                  );
                }
                if (tidalLayerHight) {
                  let tidalHightColor = "";
                  if (item.tidalFlowLevel === 1) {
                    tidalHightColor = "#980b0b";
                  } else if (item.tidalFlowLevel === 2) {
                    tidalHightColor = "#8600c4";
                  } else if (item.tidalFlowLevel === 3) {
                    tidalHightColor = "#003c96";
                  } else if (item.tidalFlowLevel === 4) {
                    tidalHightColor = "#009084";
                  } else {
                    tidalHightColor = "#038a00";
                  }
                  tidalLayerHight = GisClassMethod.TidalHightColor(
                    tidalLayerHight,
                    ids,
                    tidalHightColor,
                    this.amount
                  );
                  this.tidalLayerHight = tidalLayerHight;
                }
              }
            }
            //  })
          }

          // 营运车辆观测移入事件
          if (pageStatus === "carWatch") {
            //qqqq
            if (ids) {
              let ress = this.carList;
              ress.map(item => {
                if (item.id === ids) {
                  // if (items) {
                  let html = `<div  class="margin"><p style="margin-bottom: 15px">车型：${
                    item.name
                  }-${item.plateNo || "无"}</p>
                                            <div class="carWatchEarch1" style="display: flex">
                                            <div style="flex: 1"><div id="Columns1"  style="width: 180px;height:180px"></div>
                                            <div>轨迹平均行程速度</div></div>
                                            <div><div id="Columns2" style="width: 180px;height:180px"></div>
                                            <div>平均行程速度</div></div>
                                            </div></div>`;
                  _this.content = document.getElementById("popup-content");
                  _this.content.innerHTML = html;
                  this.Columns1(parseInt(item.traceSpeed)); // 轨迹平均车速
                  this.Columns2(parseInt(item.nowSpeed)); // 平均行程车速
                  overlay.setPosition(event.coordinate);
                  // }
                }
              });
              // 高亮对应的轨迹线段
              let operationVehiclelayerHight = "";
              if (!ids.endsWith("op")) {
                operationVehiclelayerHight = this.operationVehiclelayers
                  .getSource()
                  .getFeatureById(`${ids}op`); // 找到对应的轨迹层
              }
              if (
                this.operationVehiclelayerHight !== "" &&
                this.operationVehiclelayerHight !== operationVehiclelayerHight
              ) {
                this.operationVehiclelayerHight.setStyle(
                  new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: "#e64141"
                    }),
                    stroke: new ol.style.Stroke({
                      width: 5,
                      color: "#e64141"
                    })
                  })
                );
              }
              if (operationVehiclelayerHight) {
                operationVehiclelayerHight.setStyle(
                  new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: "#4c0505"
                    }),
                    stroke: new ol.style.Stroke({
                      width: 5,
                      color: "#4c0505"
                    })
                  })
                );
                this.operationVehiclelayerHight = operationVehiclelayerHight;
              }
            }
          }

          // 营运车辆规律移入事件
          if (pageStatus === "carLow") {
            if (ids) {
              let item = _this.operatinglaw;
              item.map(data => {
                if (data.id === ids) {
                  let html = `<div  class="margin"><p style="margin-bottom: 15px">车型：${data.name}</p>
                              <div class="carWatchEarch1" style="display: flex">
                              <div style="flex: 1"><div id="Columns1" style="width: 180px;height:180px"></div>
                              <div>轨迹速度</div></div>
                              </div></div>`;
                  this.content = document.getElementById("popup-content");
                  this.content.innerHTML = html;

                  this.Columns1(parseInt(data.traceSpeed)); // 轨迹车速
                  overlay.setPosition(event.coordinate);
                }
              });

              // 高亮对应的轨迹线段
              let operationVehiclelayerHight = "";
              if (!ids.endsWith("op")) {
                operationVehiclelayerHight = this.operationVehiclelayers
                  .getSource()
                  .getFeatureById(`${ids}op`); // 找到对应的轨迹层
              }
              if (
                this.operationVehiclelayerHight !== "" &&
                this.operationVehiclelayerHight !== operationVehiclelayerHight
              ) {
                this.operationVehiclelayerHight.setStyle(
                  new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: "#e64141"
                    }),
                    stroke: new ol.style.Stroke({
                      width: 5,
                      color: "#e64141"
                    })
                  })
                );
              }
              if (operationVehiclelayerHight) {
                operationVehiclelayerHight.setStyle(
                  new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: "#4c0505"
                    }),
                    stroke: new ol.style.Stroke({
                      width: 5,
                      color: "#4c0505"
                    })
                  })
                );
                this.operationVehiclelayerHight = operationVehiclelayerHight;
              }
              // let html = `<p>顺时针车流量：${item.pp}辆/小时</p>
              //         <div class="carWatchEarch">
              //         <div id="Columns1" style="width: 10px;height:10px"></div>
              //         <div id="Columns2" style="width: 10px;height:10px"></div>
              //         <div id="Columns3" style="width: 10px;height:10px"></div>
              //         <div id="Columns4" style="width: 10px;height:10px"></div>
              //         </div>
              //         <div id="Columns5" style="width: 300px;height:200px"></div>`;
              // content.innerHTML = html;
              // this.Columns1(parseInt(item.morningAvgSpeed), "早高峰平均速度"); // 早高峰平均速度
              // this.Columns2(parseInt(item.eveningAvgSpeed), "晚高峰平均速度"); // 晚高峰平均速度
              // this.Columns3(parseInt(item.normalAvgSpeed)); // 日平峰平均速度
              // this.Columns4(parseInt(item.lowAvgSpeed)); // 夜低峰平均速度
              // // 早高峰,晚高峰,日平峰,夜低峰交通延时指数
              // this.Columns5([
              //     parseInt(item.morningAvgDelay),
              //     parseInt(item.eveningAvgDelay),
              //     parseInt(item.normalAvgDelay),
              //     parseInt(item.lowAvgDelay)
              // ]);
              // overlay.setPosition(event.coordinate);
            }
          }

          // 交通构成移入事件 earch图表
          if (pageStatus === "trafficWatch") {
            let name = "";
            switch (ids) {
                case "tj_bound2.1":
                name = "咸水沽镇";
                break;
                case "tj_bound2.2":
                name = "双港镇";
                break;
                case "tj_bound2.3":
                name = "葛沽镇";
                break;
                case "tj_bound2.4":
                name = "辛庄镇";
                break;
                case "tj_bound2.5":
                name = "北闸口镇";
                break;
                case "tj_bound2.6":
                name = "辛庄镇";
                break;
                case "tj_bound2.7":
                name = "小站镇";
                break;
                case "tj_bound2.8":
                name = "八里台镇";
                break;
                case "tj_bound2.9":
                name = "双桥河镇";
                break;
                case "tj_bound2.10":
                name = "双港镇";
                break;
                case "tj_bound2.11":
                name = "八里台镇";
                break;
                case "tj_bound2.12":
                name = "双桥河镇";
                break;
                case "tj_bound2.13":
                name = "双港镇";
                break;
            };
            let item = this.$store.state.area.find(t => t.name === name);
            if(!item) return;
            let chose = _this.trafficWatchList.find(t => t.areaId === item.id);
            console.log(chose);
            if(!chose) {
                chose = _this.trafficWatchList.find(t => t.areaId === name);
            }
            if(!chose) {
                chose = {
                    arriveTrafficProp:0,
                    leaveTrafficProp:0,
                    interTrafficProp:0,
                    transitTrafficProp:0
                }
            }
            let trafficComNumber ={
                name: name,
                color: ["#ee70e9", "#3ad1bf", "#6cd13a", "#fe69a8"],
                value: [(chose.arriveTrafficProp*100).toFixed(1), (chose.leaveTrafficProp*100).toFixed(1), (chose.interTrafficProp*100).toFixed(1), (chose.transitTrafficProp*100).toFixed(1)],
                keyName: ["到达交通比例", "驶离交通比例", "内部交通比例", "过境交通比例"]
            };
            this.trafficComNumber=trafficComNumber;
            this.trafficEcharts();
            // content = document.getElementById("popup-content");
            overlay.setPosition(event.coordinate);
            // 移入高亮
            let lightHight = this.lightHight;
            let lightHeightColor = this.colors.find(t => t.name === item.name).color;
            features.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba('+ lightHeightColor +',0.8)'
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
                }),
                text : new ol.style.Text({
                    font: '13px Microsoft YaHei',
                    text:  item.name,
                    fill: new ol.style.Fill({
                        color: '#444546'
                    })
                })
            }));
            if(lightHight !== "" && lightHight !== features ) {
                let nextName = "";
                switch (lightHight.getId()) {
                    case "tj_bound2.1":
                    nextName = "咸水沽镇";
                    break;
                    case "tj_bound2.2":
                    nextName = "双港镇";
                    break;
                    case "tj_bound2.3":
                    nextName = "葛沽镇";
                    break;
                    case "tj_bound2.4":
                    nextName = "辛庄镇";
                    break;
                    case "tj_bound2.5":
                    nextName = "北闸口镇";
                    break;
                    case "tj_bound2.6":
                    nextName = "辛庄镇";
                    break;
                    case "tj_bound2.7":
                    nextName = "小站镇";
                    break;
                    case "tj_bound2.8":
                    nextName = "八里台镇";
                    break;
                    case "tj_bound2.9":
                    nextName = "双桥河镇";
                    break;
                    case "tj_bound2.10":
                    nextName = "双港镇";
                    break;
                    case "tj_bound2.11":
                    nextName = "八里台镇";
                    break;
                    case "tj_bound2.12":
                    nextName = "双桥河镇";
                    break;
                    case "tj_bound2.13":
                    nextName = "双港镇";
                    break;
                };
                let lightHeightColors = this.colors.find(t => t.name === nextName).color;
                lightHight.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba('+ lightHeightColors +',0.6)'
                    }),
                    text : new ol.style.Text({
                        font: '13px Microsoft YaHei',
                        text:  nextName,
                        fill: new ol.style.Fill({
                            color: '#444546'
                        })
                    })
                }));
            }
            this.lightHight = features;
          }
          //           <div v-if="trafficFlowChose.carCount">
          //   车辆数：{{trafficFlowChose.carCount}}
          //   <br />
          //   道路状态等级：{{trafficFlowChose.roadLevel === "0" ? "畅通" : (trafficFlowChose.roadLevel === "1" ? "基本畅通" : (trafficFlowChose.roadLevel === "2" ? "轻度拥堵" : (trafficFlowChose.roadLevel === "3" ? "中度拥堵" : (trafficFlowChose.roadLevel === "4" ? "重度拥堵" : ""))))}}
          // </div>
          // <div v-else>
          //   <span>路口状态等级：{{trafficFlowChose.crossingLevel === "0" ? "畅通" : (trafficFlowChose.crossingLevel === "1" ? "基本畅通" : (trafficFlowChose.crossingLevel === "2" ? "轻度拥堵" : (trafficFlowChose.crossingLevel === "3" ? "中度拥堵" : (trafficFlowChose.crossingLevel === "4" ? "重度拥堵" : ""))))}}</span>
          //   <br />
          //   <span>路口指数：{{(parseInt(trafficFlowChose.crossingTPI)).toFixed(2)}}</span>
          // </div>
          // 交通状态的移入事件trafficFlowCheckBox
          //           if (pageStatus === "ODwatch") {
          //   // this.content.tabIndex = 1;
          //   this.content.innerHTML = "车辆数：" + count + "(辆)";

          // } else if (pageStatus === "ODLow") {
          //   this.content.innerHTML =
          //     "时间段：" +
          //     timer +
          //     "</br>车辆数：" +
          //     bigMount.carCount +
          //     "(辆)";
          // }
          // 路口交通观测移入事件
          if (pageStatus === "trafficFlow") {
            // let content = document.getElementById("trafficFlowChoseId");
            let trafficFlowCheckBox = this.$refs.leftTop.trafficFlowCheckBox;
            let chose = _this.trafficFlowNumber.find(t => t.id === ids);
            if (chose) {
              let html = "";
              if (chose.crossingTPI) {
                let crossingLevel = trafficFlowCheckBox.find(
                  t => t.value == chose.crossingLevel
                );
                html = `<div class="margin">路口状态等级：${crossingLevel.label}<br/>
                                路口指数：${parseInt(chose.crossingTPI).toFixed(
                                  2
                                )}`;
              } else {
                let crossingLevel = trafficFlowCheckBox.find(
                  t => t.value == chose.roadLevel
                );
                html = `<div class="margin">车辆数：${chose.carCount}<br/>
                                道路状态等级：${crossingLevel.label}</div>`;
              }
              this.content = document.getElementById("popup-content");
              this.content.innerHTML = html;
              if (!chose) return;
              _this.trafficFlowChose = chose || "";
              overlay.setPosition(event.coordinate);
              let color = "";
              switch (chose.roadLevel) {
                case "0":
                  color = "#038a00";
                  break;
                case "1":
                  color = "#009084";
                  break;
                case "2":
                  color = "#003c96";
                  break;
                case "3":
                  color = "#8600c4";
                  break;
                case "4":
                  color = "#980b0b";
                  break;
              }
              if (chose.trace) {
                if (this.trafficFlowLight === features) {
                  return;
                }
                let trafficFlowLightFeature = features.getStyle();
                features.setStyle(
                  new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: color
                    }),
                    stroke: new ol.style.Stroke({
                      // lineDash: [1, 3, 5],
                      width: 5,
                      color: color
                    })
                  })
                );
                if (this.trafficFlowLightFeature !== "") {
                  this.trafficFlowLight.setStyle(this.trafficFlowLightFeature);
                }
                this.trafficFlowLight = features;
                this.trafficFlowLightFeature = trafficFlowLightFeature;
              } else {
                if (
                  this.trafficFlowLightFeature !== "" &&
                  this.trafficFlowLight !== ""
                ) {
                  this.trafficFlowLight.setStyle(this.trafficFlowLightFeature);
                }
              }
            }
          } else {
            return;
          }
        } else {
          overlay.setPosition(undefined);
        }
      } else {
        overlay.setPosition(undefined);

        // 清除交通构成的移入高亮
        // if (_this.lightHight !== "") {
        //     let nextName = "";
        //             switch (_this.lightHight.getId()) {
        //                 case "tj_bound2.1":
        //                 nextName = "咸水沽镇";
        //                 break;
        //                 case "tj_bound2.2":
        //                 nextName = "双港镇";
        //                 break;
        //                 case "tj_bound2.3":
        //                 nextName = "葛沽镇";
        //                 break;
        //                 case "tj_bound2.4":
        //                 nextName = "辛庄镇";
        //                 break;
        //                 case "tj_bound2.5":
        //                 nextName = "北闸口镇";
        //                 break;
        //                 case "tj_bound2.6":
        //                 nextName = "辛庄镇";
        //                 break;
        //                 case "tj_bound2.7":
        //                 nextName = "小站镇";
        //                 break;
        //                 case "tj_bound2.8":
        //                 nextName = "八里台镇";
        //                 break;
        //                 case "tj_bound2.9":
        //                 nextName = "双桥河镇";
        //                 break;
        //                 case "tj_bound2.10":
        //                 nextName = "双港镇";
        //                 break;
        //                 case "tj_bound2.11":
        //                 nextName = "八里台镇";
        //                 break;
        //                 case "tj_bound2.12":
        //                 nextName = "双桥河镇";
        //                 break;
        //                 case "tj_bound2.13":
        //                 nextName = "双港镇";
        //                 break;
        //             };
        //             let lightHeightColors = this.colors.find(t => t.name === nextName).color;
        //             _this.lightHight.setStyle(new ol.style.Style({
        //                 fill: new ol.style.Fill({
        //                     color: 'rgba('+ lightHeightColors +',0.6)'
        //                 }),
        //                 text : new ol.style.Text({
        //                     font: '13px Microsoft YaHei',
        //                     text:  nextName,
        //                     fill: new ol.style.Fill({
        //                         color: '#444546'
        //                     })
        //                 })
        //             }));
        // };
        //清除交通状态的移入高亮
        if (
          this.trafficFlowLightFeature !== "" &&
          this.trafficFlowLight !== ""
        ) {
          this.trafficFlowLight.setStyle(this.trafficFlowLightFeature);
          this.trafficFlowLightFeature = "";
          this.trafficFlowLight = "";
        }

        // 清除潮汐流的移入高亮
        if (this.tidalLayerHight !== "") {
          let HightId = this.tidalLayerHight
            .getSource()
            .getFeatures()[0]
            .getId();
          let otem = this.tidalWatchdata.find(t => t.id === HightId);
          let linColor = "";
          if (otem.tidalFlowLevel === 1) {
            linColor = "#cd0a0a";
          } else if (otem.tidalFlowLevel === 2) {
            linColor = "#b85be4";
          } else if (otem.tidalFlowLevel === 3) {
            linColor = "#2f82ff";
          } else if (otem.tidalFlowLevel === 4) {
            linColor = "#2afbea";
          } else {
            linColor = "#2bdf27";
          }
          this.tidalLayerHight = GisClassMethod.TidalHightColor(
            this.tidalLayerHight,
            HightId,
            linColor,
            this.amount
          );
          this.tidalLayerHight = "";
        }
        // 清除营运车辆的移入高亮
        if (this.operationVehiclelayerHight !== "") {
          this.operationVehiclelayerHight.setStyle(
            new ol.style.Style({
              fill: new ol.style.Fill({
                color: "#e64141"
              }),
              stroke: new ol.style.Stroke({
                width: 5,
                color: "#e64141"
              })
            })
          );
          this.operationVehiclelayerHight = "";
        }
        // 清除OD的移入高亮
        if (this.ODLowHight !== "") {
          let ODLowData = _this.ODnumber.find(
            t => t.id == this.ODLowHight.getId()
          );
          if (pageStatus === "ODwatch") {
            let color = ODLowData.color;
            this.ODLowHight.setStyle(
              new ol.style.Style({
                fill: new ol.style.Fill({
                  color: color
                }),
                stroke: new ol.style.Stroke({
                  // lineDash: [1, 3, 5],
                  width: 5,
                  color: color
                })
              })
            );
            return;
          }
          if (ODLowData) {
            let color = "rgb(" + ODLowData.colorA + ")";
            this.ODLowHight.setStyle(
              new ol.style.Style({
                fill: new ol.style.Fill({
                  color: color
                }),
                stroke: new ol.style.Stroke({
                  // lineDash: [1, 3, 5],
                  width: 5,
                  color: color
                })
              })
            );
          }
          this.ODLowHight = "";
        }

        // if (ODLowHight !== "") {
        //   // let ODLowData = _this.ODnumber.find(
        //   //   t => t.id === ODLowHight.getId()
        //   // );
        //   if (ODLowData) {
        //     let color =
        //       "rgb(" +
        //       ODLowData.colorA +
        //       ")";
        //     ODLowHight.setStyle(
        //       new ol.style.Style({
        //         fill: new ol.style.Fill({
        //           color: color
        //         }),
        //         stroke: new ol.style.Stroke({
        //           // lineDash: [1, 3, 5],
        //           width: 5,
        //           color: color
        //         })
        //       })
        //       // null
        //     );
        //   }
        //   this.ODLowHight = "";
        // }
        this.content = document.getElementById("popup-content");
        if (this.content) {
          this.content.innerHTML = "";
        }
      }

      // overlay.setPosition(undefined);
    },
    // 地图右击事件
    RightClickMap() {
      let map = this.mapGis;
      let measureTooltipElement = document.createElement("div");
      let element =
        "<div id='map_contextmenu_container' class='map_contextmenu'><ul><li><a href='#'><img style='width: 40px;' src='" +
        mapClose +
        "'></a></li></ul></div>";
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
          // feature.get("dataType") !== "coordinate"
          // feature.getId() !== "coordinate"
          // console.log(feature);
          // console.log(feature.get("dataType"));
          // console.log(feature.get("id"));
          // console.log(feature.getId());
          if (
            feature &&
            !feature.get("dataType") &&
            (!feature.getId() ||
              feature.getId().endsWith("selectionArea") ||
              feature.getId().endsWith("Ranging") ||
              feature.getId().endsWith("PointPosition"))
          ) {
            let coordinate = _this.mapGis.getEventCoordinate(e);
            menu_overlay.setPosition(coordinate);
            $("#map_contextmenu_container ul li").on("click", async function() {
              _this.mapGis.removeLayer(layer);
              if (layer && (feature.getId() || feature.get("id"))) {
                let overlay = feature.get("id")
                  ? _this.mapGis.getOverlayById(feature.get("id"))
                  : _this.mapGis.getOverlayById(feature.getId());
                _this.mapGis.removeOverlay(overlay);
              }
              menu_overlay.setPosition(undefined);
              // 循环drawLayersArr数组删除已经去掉的图层
              if (feature.getId()) {
                let LayersArr = await _this.deleteDrawLayersArrItem(
                  feature.getId()
                );
                let drawLayersArr = LayersArr[0];
                let drawLayersOverlayArr = LayersArr[1];
                // 筛选完毕后再把数据赋值回去
                _this.drawLayersArr = [...drawLayersArr];
                _this.drawLayersOverlayArr = [...drawLayersOverlayArr];
              }
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
    // 右键删除后还得删除drawLayersArr中存放的图层和drawLayersOverlayArr中存放的Overlay
    deleteDrawLayersArrItem(id) {
      return new Promise((resolve, reject) => {
        let drawLayersArr = [];
        let drawLayersOverlayArr = [];
        this.drawLayersArr.map(t => {
          if (
            t
              .getSource()
              .getFeatures()[0]
              .getId() !== id
          ) {
            // 如果不id等于
            drawLayersArr = [...drawLayersArr, t]; // 添加到一个新数组中
          }
        });
        this.drawLayersOverlayArr.map(t => {
          if (t.tooltip.getId() !== id) {
            // 如果不id等于
            drawLayersOverlayArr = [...drawLayersOverlayArr, t]; // 添加到一个新数组中
          }
        });
        resolve([drawLayersArr, drawLayersOverlayArr]); // 返回参数
      });
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
      let vector = selectionArea[2];
      let sketch;
      this.draws.on("drawstart", evt => {
        let ids = new Date().getTime();
        sketch = evt.feature; // 绘制要素,鼠标位置的信息
        sketch.setId(`${ids}selectionArea`);
      });
      this.draws.on("drawend", evt => {
        setTimeout(() => {
          this.mapGis.removeInteraction(this.draws);
          this.drawLayersArr.push(vector); // 把画好的图层存起来用于下一次的使用
          // console.log(vector.getSource().getFeatures()[0].getId());
          // console.log(this.drawLayersArr);
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
      document.getElementsByClassName("GIS_page")[0].onclick = function(evt) {
        if (this.status !== "markPointPosition") return;
        let ids = new Date().getTime();
        this.ids = ids;
        let tooltipCoord = ol.proj.toLonLat(
          this.mapGis.getEventCoordinate(evt)
        );
        // console.log(tooltipCoord);
        let eventPoint = { id: this.ids, point: tooltipCoord };
        let markPointPosition = GisClassMethod.MarkPointPosition(
          this.mapGis,
          eventPoint
        );
        this.mapGis = markPointPosition[0];
        this.vector = markPointPosition[1];
        this.vector
          .getSource()
          .getFeatures()[0]
          .setId(`${ids}PointPosition`);
        // 设置标签
        measureTooltipElement = document.createElement("div");
        measureTooltipElement.contentEditable = "true";
        measureTooltipElement.className =
          "tooltip tooltip-editable tooltip-measure pointInput";
        measureTooltip = new ol.Overlay({
          element: measureTooltipElement,
          offset: [0, -10],
          position: ol.proj.transform(
            [tooltipCoord[0], tooltipCoord[1]],
            "EPSG:4326",
            "EPSG:3857"
          ),
          positioning: "bottom-center",
          id: `${this.ids}PointPosition`
        });
        // measureTooltipElement.value = ol.proj.toLonLat(
        //     this.mapGis.getEventCoordinate(evt)
        // );
        this.mapGis.addOverlay(measureTooltip);
        this.drawLayersArr.push(this.vector); // 把画好的图层存起来用于下一次的使用
        this.drawLayersOverlayArr.push({
          tooltip: measureTooltip,
          tooltipCoord: tooltipCoord
        }); // 把画好的图层的Overlay存起来用于下一次的使用
        // console.log(this.drawLayersArr);
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
      let listener,
        output,
        sketch,
        measureTooltipElement,
        measureTooltip,
        tooltipCoordp;
      this.draws.on("drawstart", evt => {
        let ids = new Date().getTime();
        this.ids = ids;
        createMeasureTooltip();
        sketch = evt.feature; // 绘制要素,鼠标位置的信息
        sketch.setId(`${ids}Ranging`);
        let tooltipCoord = evt.coordinate; // 坐标undefined
        listener = sketch.getGeometry().on(
          "change",
          function(evt) {
            let geom = evt.target; // 绘制几何要素
            output = GisClassMethod.formatLength(geom); // 长度值
            tooltipCoord = geom.getLastCoordinate();
            tooltipCoordp = ol.proj.toLonLat(tooltipCoord);
            measureTooltipElement.innerHTML = output; // 将测量值设置到测量工具提示框中显示
            measureTooltip.setPosition(
              ol.proj.transform(
                [tooltipCoordp[0], tooltipCoordp[1]],
                "EPSG:4326",
                "EPSG:3857"
              )
            );
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
          this.drawLayersArr.push(vector); // 把画好的图层存起来用于下一次的使用
          // console.log(this.drawLayersArr);
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
          id: `${this.ids}Ranging`
        });
        this.mapGis.addOverlay(measureTooltip);
        this.drawLayersOverlayArr.push({
          tooltip: measureTooltip,
          tooltipCoord: tooltipCoordp
        }); // 把画好的图层的Overlay存起来用于下一次的使用
      };
      this.mapGis.addInteraction(this.draws);
    },
    // 保存
    mapPreservation() {
      event.stopPropagation();
      let time = this.$tools.nowTime();
      this.mapGis.removeInteraction(this.draws);
      let gis = document.getElementsByClassName("GIS_page")[0];
      // this.mapGis.once("postcompose", function(event) {
      //   // let canvas = event.context.canvas;
      //   // let gis = document.getElementsByClassName("GIS_page")[0];
      //   let ww = gis.offsetWidth;
      //   let hh = gis.offsetHeight;
      //   html2canvas(gis, {
      //     async: true,
      //     useCORS: true,
      //     foreignObjectRendering: true,
      //     width: ww,
      //     height: hh,
      //     WINDOWWIDTH: ww,
      //     WINDOWHEIGHT: hh
      //   }).then(function(canvas) {
      //     if (navigator.msSaveBlob) {
      //       navigator.msSaveBlob(canvas.msToBlob(), "map" + time + ".png");
      //     } else {
      //       canvas.toBlob(function(blob) {
      //         saveAs(blob, "map" + time + ".png");
      //       });
      //     }
      //   });
      //   // domtoimage.toBlob(gis,{style:"::-webkit-scrollbar"}).then(function (blob) {
      //   //     saveAs(blob, "map" + time + ".png");
      //   // });
      // });
      // this.mapGis.renderSync();
      html2canvas(gis).then(function(canvas) {
        canvas.toBlob(function(blob) {
          saveAs(blob, "map" + time + ".png");
        });
      });
      // };
    },
    // 导出
    mapExport() {
      event.stopPropagation();
      this.exportTable("tableData");
    },
    // 全屏
    fullScreen() {
      // this.$router.push({
      //     path: "/fullScreenGis"
      // });
      // let docElm = document.getElementsByClassName("GIS_page")[0];
      let docElm = document.documentElement;
      let aa = document.getElementsByClassName("topHeadBar")[0];
      let bb = document.getElementsByClassName("leftNavigation")[0];
      this.aa = aa;
      this.bb = bb;
      aa.style.display = "none";
      bb.style.display = "none";
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      // document.onexitfullscreen = function() {
      //     if (docElm.requestFullscreen) {
      //         docElm.requestFullscreen();
      //     } else if (docElm.mozRequestFullScreen) {
      //         docElm.mozRequestFullScreen();
      //     } else if (docElm.webkitRequestFullScreen) {
      //         docElm.webkitRequestFullScreen();
      //     } else if (docElm.msRequestFullscreen) {
      //         docElm.msRequestFullscreen();
      //     }
      //     if (docElm.exitFullscreen) {
      //         docElm.exitFullscreen();
      //     } else if (docElm.mozCancelFullScreen) {
      //         docElm.mozCancelFullScreen();
      //     } else if (docElm.webkitCancelFullScreen) {
      //         docElm.webkitCancelFullScreen();
      //     } else if (docElm.msExitFullscreen) {
      //         docElm.msExitFullscreen();
      //     }
      // }
      this.icons = [
        { title: "放大", url: Big, correspondingEvent: "enlarge" },
        { title: "缩小", url: Small, correspondingEvent: "reduce" },
        {
          title: "选择区域",
          url: Boxselection,
          correspondingEvent: "selectionArea"
        },
        { title: "标记", url: sign, correspondingEvent: "markPointPosition" },
        { title: "测距", url: measure, correspondingEvent: "mapRanging" },
        {
          title: "保存",
          url: Preservation,
          correspondingEvent: "mapPreservation"
        },
        // { title: "导出", url: Export, correspondingEvent: "mapExport" },
        {
          title: "退出全屏",
          url: exitFullScreen,
          correspondingEvent: "MapexitFullScreen"
        }
      ];
    },
    // 退出全屏
    MapexitFullScreen(name) {
      // this.$router.push({
      //     path: "/gisMap"
      // });
      let docElm = document;
      // let aa = document.getElementsByClassName("topHeadBar")[0];
      //     let bb = document.getElementsByClassName("leftNavigation")[0];
      if (name) {
        // this.fullScreen();
        this.bottomMapLayer.setZIndex(-1);
        this.mapGis.addLayer(this.bottomMapLayer);
      }
      if (this.aa && this.bb) {
        this.aa.style.display = "flex";
        this.bb.style.display = "block";
      }
      if (docElm.exitFullscreen) {
        docElm.exitFullscreen();
      } else if (docElm.mozCancelFullScreen) {
        docElm.mozCancelFullScreen();
      } else if (docElm.webkitCancelFullScreen) {
        docElm.webkitCancelFullScreen();
      } else if (docElm.msExitFullscreen) {
        docElm.msExitFullscreen();
      }
      this.icons = [
        { title: "放大", url: Big, correspondingEvent: "enlarge" },
        { title: "缩小", url: Small, correspondingEvent: "reduce" },
        {
          title: "选择区域",
          url: Boxselection,
          correspondingEvent: "selectionArea"
        },
        { title: "标记", url: sign, correspondingEvent: "markPointPosition" },
        { title: "测距", url: measure, correspondingEvent: "mapRanging" },
        {
          title: "保存",
          url: Preservation,
          correspondingEvent: "mapPreservation"
        },
        // { title: "导出", url: Export, correspondingEvent: "mapExport" },
        { title: "全屏", url: Fullscreen, correspondingEvent: "fullScreen" }
      ];
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
      }
    },

    // 地图拖动，缩放开始时触发函数
    Mapmovestart() {
      if (this.moveRequestTiming !== "") {
        // console.log("清除set");
        // 延时器存在，就清除延时器，确保最后请求时只有一个延时器触发
        window.clearInterval(this.moveRequestTiming); // 清除延时器
        this.moveRequestTiming = "";
      }
    },
    // 地图拖动，缩放结束时触发函数
    Mapmoveend() {
      // if (this.pageStatus === "trafficWatch") {
      //   let MapZoomLevel = this.getMapmessing(); // 得到地图的层级和四角坐标
      //   if (MapZoomLevel !== this.MapZoomLevel) {
      //     this.MapZoomLevel = MapZoomLevel;
      //     // 增加一个层级判断
      //     //   console.log(this.MapZoomLevel);
      //     if (MapZoomLevel <= 12) {
      //       setTimeout(() => {
      //         // 交通构成观测
      //         // this.mapGis.getOverlays().clear(); // 清除所有的Overlay层
      //         if (this.trafficWatchOverlayArr.length > 0) {
      //           this.trafficWatchOverlayArr.map(ele => {
      //             this.mapGis.removeOverlay(ele);
      //           });
      //         }
      //         this.trafficWatchAllcharts();
      //       }, 500);
      //     }
      //   }
      //   return;
      // }
      // 地图拖动后，缩放后等待3秒执行，防止用户连续的拖动的和缩放，造成不必要的请求，增大访问压力
      this.moveRequestTiming = setInterval(() => {
        this.getMapmessing(); // 得到地图的层级和四角坐标
        // 增加一个层级判断
        // console.log(this.MapZoomLevel);
        if (!this.mapFirstIn && this.MapZoomLevel <= 12) {
          if (this.pageStatus === "eventBulletin") {
            // 情报
            // this.searchEvent(this.MapGlobalUrlData);
          }
          if (this.pageStatus === "ODwatch") {
            // OD观测
            // this.ODwatch();
            // 情报层
            if (this.intelligenceLayerparameters.length !== 0) {
              this.requestInitializationIntelligence("s", null, "kq");
            }
          }
          if (this.pageStatus === "ODLow") {
            // OD规律
            if (this.ODsearcher !== "") {
              // this.ODwatch(this.ODsearcher, "Rname");
              // } else {
              //   this.ODLow("move");
            }
            // 情报层
            if (this.intelligenceLayerparameters.length !== 0) {
              this.requestInitializationIntelligence("s", null, "kq");
            }
          }
          if (
            this.pageStatus === "tidalWatch" ||
            this.pageStatus === "tidalLow"
          ) {
            // 潮汐流观测和潮汐流规律
            // this.handleCheckedCitiesChange(this.TidalUrlData, "拖动");
            // 情报层
            if (this.intelligenceLayerparameters.length !== 0) {
              this.requestInitializationIntelligence("s", null, "kq");
            }
          }
          if (this.pageStatus === "carWatch") {
            // 营运车辆观测
            // this.handleCheckedCarChange(this.CarUrlData, "定时器");
            // 情报层
            if (this.intelligenceLayerparameters.length !== 0) {
              // this.requestInitializationIntelligence("s", null, "kq");
            }
          }
          if (this.pageStatus === "carLow") {
            // 营运车辆规律
            // this.handleCheckedCarChange(this.CarUrlData, "拖动");
            // 情报层
            if (this.intelligenceLayerparameters.length !== 0) {
              this.requestInitializationIntelligence("s", null, "kq");
            }
          }
          // 交通状态观测
          if (this.pageStatus === "trafficFlow") {
            let leftchose = {
              choseLevel: this.choseLevel
            };
            // this.trafficFlow(leftchose, "sss");
          }
        }
        if (this.mapFirstIn) {
          this.mapFirstIn = false; // 改变后这个值就不在改变仅仅在切换模块时重新设置
        }
        window.clearInterval(this.moveRequestTiming); // 执行延时器后手动清除延时器
        this.moveRequestTiming = "";
      }, 1000);
    },
    // 得到地图的层级和四角坐标
    getMapmessing() {
      if (this.pageStatus === "trafficWatch") {
        // 如果是交通构成直接返回先不赋值
        let MapZoomLevel = this.mapGis.getView().getZoom(); // 地图缩放等级
        return MapZoomLevel;
      }
      // 地图窗口四个角和中心点
      let mapExtent = this.mapGis
        .getView()
        .calculateExtent(this.mapGis.getSize());
	  console.log(this.mapGis.getSize(),"mapExtent ========================", mapExtent);
      // let centerPoint = ol.extent.getCenter(mapExtent); // 应该不需要了
      // centerPoint = ol.proj.transform([centerPoint[0], centerPoint[1]], 'EPSG:3857', 'EPSG:4326'); // 地图中心点
      let TopLeftPoint = ol.proj.toLonLat(ol.extent.getTopLeft(mapExtent)); // 左上点
      let TopRightPoint = ol.proj.toLonLat(ol.extent.getTopRight(mapExtent)); // 右上点
      let BottomLeftPoint = ol.proj.toLonLat(
        ol.extent.getBottomLeft(mapExtent)
      ); // 左下点
      let BottomRightPoint = ol.proj.toLonLat(
        ol.extent.getBottomRight(mapExtent)
      ); // 右下点
      this.MapZoomLevel = this.mapGis.getView().getZoom(); // 地图缩放等级

      this.MapFourAngleCoordinate = `${TopLeftPoint[0]}-${TopLeftPoint[1]},${
        TopRightPoint[0]
      }-${TopRightPoint[1]},${BottomRightPoint[0]}-${BottomRightPoint[1]},${
        BottomLeftPoint[0]
      }-${BottomLeftPoint[1]}`;
      // console.log(this.MapZoomLevel);
      // console.log(this.MapFourAngleCoordinate);
	  console.log("getMapmessing finished.....");
    },

    // 图层选择情报
    inChange(data) {
      this.intelligenceLayerparameters = [];
      data.map((t, i) => {
        let item = this.$store.state.venteType.find(e => e.name === t).id;
        this.intelligenceLayerparameters = [
          ...this.intelligenceLayerparameters,
          item
        ]; // 记录情报图层选择的情报类型
      });

      // 想换成传的是事件编号来着算了
      // this.intelligenceLayerparameters = [...this.intelligenceLayerparameters, ...data];

      // 清除特殊事件的视频弹窗
      this.Videoarray.map(t => {
        let videoOverlay = this.mapGis.getOverlayById(t.did);
        if (videoOverlay) {
          this.mapGis.removeOverlay(videoOverlay);
        }
      });
      if (this.pageStatus === "eventBulletin") {
        this.intelligenceeventList = [];
        // 如果记录的情报图层选择情报类型有值得话，筛选一下数据
        if (this.intelligenceLayerparameters.length !== 0) {
          this.intelligenceLayerparameters.map(t => {
            // if (t === "9" && t === "26") {
            //     this.intelligenceeventList = [...this.intelligenceeventList, ...this.eventList.filter(e => e.incidentType === t)];
            // }
            this.intelligenceeventList = [
              ...this.intelligenceeventList,
              ...this.eventList.filter(e => e.incidentType === t)
            ];
            if (t === "9") {
              this.intelligenceeventList = [
                ...this.intelligenceeventList,
                ...this.eventList.filter(e => e.intelligenceId === "10001")
              ];
            }
            if (t === "26") {
              this.intelligenceeventList = [
                ...this.intelligenceeventList,
                ...this.eventList.filter(e => e.intelligenceId === "10023")
              ];
            }
          });
        } else {
          // this.intelligenceeventList = [...this.eventList];
          this.intelligenceeventList = [];
        }
        // 筛选数据完毕
        if (this.intelligenceeventList.length === 0) {
          this.$showSimpleMessage("暂无数据", "error");
        }
        if (this.tooltip.id) {
          this.removeTooltip();
        }
        this.intelligenceeventList.map((t, i) => {
          if (t.hasOwnProperty("createdTime")) {
            t.createdTime = t.createdTime
              ? this.$filter.formatDateTime(t.createdTime)
              : "";
          }
          if (t.hasOwnProperty("startTime")) {
            t.startTime = t.startTime
              ? this.$filter.formatDateTime(t.startTime)
              : "";
            t.startTimelittile = t.startTime.split(" ")[1];
          }
          if (!t.hasOwnProperty("startTime")) {
            let times = t.incidentStartTime.split(" ")[1];
            t.startTime = t.incidentStartTime;
            t.startTimelittile = `${times.split(":")[0]}:${
              times.split(":")[1]
            }`;
          }
          if (!t.hasOwnProperty("intelligenceName")) {
            t.intelligenceName = this.$store.state.venteType.find(
              e => e.id === t.incidentType
            ).name;
          }
          if (!t.hasOwnProperty("id")) {
            t.id = `${new Date().getTime()}${i}`;
          }
        });
        this.getGISData(this.intelligenceeventList, "shaixuan");
      } else {
        // 其他模块叠加情报
        // 清除提示框
        if (this.tooltip.id) {
          this.removeTooltip();
        }
        if (this.intelligenceLayerparameters.length === 0) {
          // 清除定时器
          this.eraseTimer();
          this.eventList = [];
          this.getGISData([], "shaixuan");
          this.mapGis.removeLayer(this.QingbaocoordinateTracingPointImg); // 清除情报图层
        } else {
          if (this.eventList.length === 0) {
            // 重新请求接口
            this.requestInitializationIntelligence(
              "其他模块叠加情报",
              "eventList",
              "kq"
            );
            this.eventBulletinTimes(); // 重新启动情报告警定时器
          } else {
            this.intelligenceeventList = [];
            // 清除定时器
            this.eraseTimer();
            this.intelligenceLayerparameters.map(t => {
              // if (t === "9" && t === "26") {
              //     this.intelligenceeventList = [...this.intelligenceeventList, ...this.eventList.filter(e => e.incidentType === t)];
              // }
              this.intelligenceeventList = [
                ...this.intelligenceeventList,
                ...this.eventList.filter(e => e.incidentType === t)
              ];
              if (t === "9") {
                this.intelligenceeventList = [
                  ...this.intelligenceeventList,
                  ...this.eventList.filter(e => e.intelligenceId === "10001")
                ];
              }
              if (t === "26") {
                this.intelligenceeventList = [
                  ...this.intelligenceeventList,
                  ...this.eventList.filter(e => e.intelligenceId === "10023")
                ];
              }
            });
            // 筛选数据完毕
            if (this.intelligenceeventList.length === 0) {
              this.$showSimpleMessage("暂无数据", "error");
              if (this.tooltip.id) {
                this.removeTooltip();
              }
            }
            this.intelligenceeventList.map((t, i) => {
              if (t.hasOwnProperty("createdTime")) {
                t.createdTime = t.createdTime
                  ? this.$filter.formatDateTime(t.createdTime)
                  : "";
              }
              if (t.hasOwnProperty("startTime")) {
                t.startTime = t.startTime
                  ? this.$filter.formatDateTime(t.startTime)
                  : "";
                t.startTimelittile = t.startTime.split(" ")[1];
              }
              if (!t.hasOwnProperty("startTime")) {
                let times = t.incidentStartTime.split(" ")[1];
                t.startTime = t.incidentStartTime;
                t.startTimelittile = `${times.split(":")[0]}:${
                  times.split(":")[1]
                }`;
              }
              if (!t.hasOwnProperty("intelligenceName")) {
                t.intelligenceName = this.$store.state.venteType.find(
                  e => e.id === t.incidentType
                ).name;
              }
              if (!t.hasOwnProperty("id")) {
                t.id = `${new Date().getTime()}${i}`;
              }
            });
            this.getGISData(this.intelligenceeventList, "shaixuan");
          }
        }
      }
    },
    // 图层选择设备
    eqChange(data) {
      let params = { equipmentTypes: "" };
      let num = data.length - 1;
      data.map((t, i) => {
        params.equipmentTypes =
          i !== num
            ? `${params.equipmentTypes}${t},`
            : `${params.equipmentTypes}${t}`;
      });
      if (params.equipmentTypes) {
        this.mapFullscreenLoding(); // 打开全屏loding
        // 获取设备列表
        axios
          .get("/equipment/?status=1", { params })
          .then(res => {
            if (res.data.data) {
              this.equipmentList = res.data.data ? res.data.data : [];
            }
            if (this.equipmentList.length === 0 && data.length !== 0) {
              this.$showSimpleMessage("暂无数据", "error");
            }
            if (this.tooltip.id) {
              this.removeTooltip();
            }
            this.equipmentLayersDraw(this.equipmentList);
            this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          })
          .catch(error => {
            this.equipmentList = [];
            this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // this.$showSimpleMessage(error, "error");
          });
      } else {
        this.equipmentList = [];
        if (this.tooltip.id) {
          this.removeTooltip();
        }
        this.equipmentLayersDraw(this.equipmentList);
      }
    },
    // 点位图层叠加
    ppChange(data) {
      let pointList = data ? [...this.pointList] : [];
      if (pointList.length === 0 && data) {
        this.$showSimpleMessage("暂无数据", "error");
      }
      if (this.tooltip.id) {
        this.removeTooltip();
      }
      this.pointPositionLayersDraw(pointList);
    },

	hdAnalays(data, item) {
		// added by brandy begin <<<<<<<
		for (var x = 0; x < this.bottomBtn.length; x ++) {
			var val = this.bottomBtn[x];
			val.checked = false;

			if (val.children) {
			  val.children.map(v => {
			    if (v.checked) {
			      // let quanjuSrcP = this.$tools.deepCopy(this.quanjuSrcP);
			      val.src = v.srcP;
			    }
			    v.src = v.srcP;
			    v.checked === false;
			  });
			} else {
			  val.checked === false;
			}

		}
		this.showMapHd = true;
		if (data.name == "交通构成观测") {

			data.checked = true;
			this.showMapHd = false;
			// alert("ccccc");
			return;
		}

		// end >>>>>>>>>>>>>>>>>>
	},
    // 点击底部的按钮事件 data 为item
    analays(data, item) {
		// added by brandy <<<<<<<<<<<<
		console.log("【btn clk】Func analays data -----", JSON.stringify(data));
		console.log("【btn clk】Func analays item -----", JSON.stringify(item));
		console.log("【btn clk】func analays pageStatus -----", this.pageStatus);
		console.log("【btn clk】func analays data.method-----", data.method);

		for (var x = 0; x < this.bottomBtn.length; x ++) {
			var xitem = this.bottomBtn[x];
			if (xitem.name == data.name) {
				xitem.checked = true;
			}
			if (xitem.name == "交通构成观测") {
				xitem.checked = false;
			}
		}
		this.showMapHd = true;
		// >>>>>>>>>>>>>>>>>>>>>

      this.SjhLow();

      // changePageStatus
      // this.pageStatus = data.method;
      if (this.pageStatus !== data.method) {
        this.bottomBtn.map(val => {
          val.checked = false;
          if (val.children) {
            val.children.map(v => {
              if (v.checked) {
                // let quanjuSrcP = this.$tools.deepCopy(this.quanjuSrcP);
                val.src = v.srcP;
              }
              v.src = v.srcP;
              v.checked === false;
            });
          } else {
            val.checked === false;
          }
        });
        let choose = "";
        if (!item) {
          choose = this.bottomBtn.find(t => t === data);
          choose.checked = true;
        } else {
          let o = this.bottomBtn.find(t => t === item);
          let p = o.children.find(e => e === data);
          p.checked = true;
          p.src = p.srcJ;
          this.quanjuSrcP.src = data.srcP;
          item.src = data.srcJ;
        }
        // this.$refs.layerCheck.checkedNews = []; // 清空layerCheck组件中选择的情报类型
        // // 重置清空layerCheck组件中事件全选的状态
        // this.$refs.layerCheck.checkAll = false; this.$refs.layerCheck.isIndeterminate = false;
        // this.intelligenceLayerparameters = [] // 重置情报图层控制筛选结果数组
        // this.intelligenceeventList = []; // 重置情报图层控制筛选结果数组
        // // 重置清空layerCheck组件中设备全选的状态
        // this.$refs.layerChecks.checkAll = false; this.$refs.layerChecks.isIndeterminate = false;
        // this.$refs.layerChecks.checkedEquipment = []; // 清空layerCheck组件中选择的设备类型
        // // 重置清空layerCheck组件中点位全选的状态
        // this.$refs.layerCheckes.checkedPoint = false; this.$refs.layerCheckes.isIndeterminate = false;

        // 点击空白处关闭图层控制
        let controlForm = document.getElementById("gisLeft");
        let classValue = controlForm.className;
        if (classValue.includes("showLayerControl")) {
          controlForm.className = "gisLeftT hideLayerControl";
        }
        // 清空营运车辆统计图数据
        this.operatingData = [];



        // 切换页面的状态
        this.typeIndex1 = data.typeIndex;
        let prePage = this.pageStatus;
        this.pageStatus = data.method;
        this.ifTrafficCom = false;
        if (this.pageStatus === "eventBulletin") {
          this.ifEventBulletin = true;
        } else {
          this.eventList = [];
          this.ifEventBulletin = false;
        }
        // 清除提示框
        if (this.tooltip.id) {
          this.removeTooltip();
        }

        // 切换重新设置地图层级
        this.mapGis.getView().setZoom(12);
        let center = ol.proj.fromLonLat([
          117.39026557151529, 38.96726240534392
		  // 120.125347,32.540074
        ]);
        this.mapGis.getView().setCenter(center);
        this.mapFirstIn = true; // 重新设置假设是第一次进入
        this.getMapmessing(); // 重新得到坐标和层级
        // this.mapFullscreenLoding(); // 调用loding函数
        if (
          data.method === "trafficFlow" &&
          data.method === "trafficLow" &&
          data.method === "ODwatch" &&
          data.method === "ODLow" &&
          data.method === "tidalWatch" &&
          data.method === "tidalLow" &&
          data.method === "carWatch" &&
          data.method === "carLow"
        ) {
          // 切换页面状态的时候，清空左上角的选择
          this.$refs.leftTop.pageChange = false;
        }
        if (data.method === "trafficWatch") {
          this.mapGis.getView().setMinZoom(12);
          this.mapGis.getView().setMaxZoom(13);
        } else {
          this.mapGis.getView().setMinZoom(8);
          this.mapGis.getView().setMaxZoom(21);
        }
        if (data.method !== "trafficLow") {
          let method =
            data.method === "tidalLow"
              ? "tidalWatch:1"
              : data.method === "carLow"
              ? "carWatch:1"
              : data.method;
          let args = method.split(":");
          let fn = eval(`this.${args.shift()}`);
          if (
            prePage !== this.pageStatus &&
            this.pageStatus !== "trafficFlow"
          ) {
            fn.apply(this, args);
          }
          // let fn = eval(`this.${data.method}`);
          // fn.apply(this);
        }
      }
    },

    // 模块定时刷新后重新添加绘制的标记，测距，区域图层和覆盖层
    reAddingLayer(nameO, nameP) {
      if (!nameO) {
        if (this.drawLayersArr.length > 0) {
          // 重新添加层
          this.drawLayersArr.map(t => {
            this.mapGis.addLayer(t);
          });
        }
      }
      if (!nameP) {
        if (this.drawLayersOverlayArr.length > 0) {
          // 重新添加覆盖层
          this.drawLayersOverlayArr.map(t => {
            this.mapGis.addOverlay(t.tooltip);
          });
        }
      }
    },

    // 情报告警的按钮
    eventBulletin() {
      this.pageStatus = "eventBulletin";
      this.ifEventBulletin = true;
      this.ifEventVideo = false;
      setTimeout(() => {
        // 情报页默认全选
        this.news.map((t, i) => {
          let item = this.$store.state.venteType.find(e => e.name === t.name)
            .id;
          this.intelligenceLayerparameters = [
            ...this.intelligenceLayerparameters,
            item
          ]; // 记录情报图层选择的情报类型
        });
        this.searchEvent(this.MapGlobalUrlData, "type");
        if (this.eventBulletinTimer === "") {
          this.eraseTimer(); // 清除定时器
          this.eventBulletinTimes(); // 切换到情报告警后打开定时器
        }
      });
    },
    // 情报定时器，爱的魔力转圈圈之总开关与时长
    eventBulletinTimes() {
      this.eventBulletinTimer = setInterval(() => {
        if (this.pageStatus === "eventBulletin") {
          console.log("情报开始执行定时1");
          this.searchEvent(this.MapGlobalUrlData, null, "startti");
        } else {
          console.log("情报开始执行定时2");
          // this.requestInitializationIntelligence(
          //   "其他模块叠加情报",
          //   null,
          //   "ka"
          // );
        }
      }, 1000 * 30);
      // // 道路状态观测定时
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
    async searchEvent(data, type, startti, inChange) {
      // this.mapFullscreenLoding(); // 打开全屏loding
      // if (!type) {
      //     this.MapGlobalUrlData = data;
      // }
      let intelligenceeventList = [];
      // this.intelligenceeventList = [];
      // 清除特殊事件的视频弹窗
      // this.Videoarray.map(t => {
      //     let videoOverlay = this.mapGis.getOverlayById(t.incidentId);
      //     if (videoOverlay) {
      //         this.mapGis.removeOverlay(videoOverlay);
      //     } 现在不要了，，，，
      // });
      this.MapGlobalUrlData = data;
      // 请求前获取当前时间
      this.dintelligenceTime = this.$filter.timesFormat(new Date());
      let CustomEventsMsg = await this.CustomEvents(data); // 筛选事件自定义的事件;
      this.ShujuhuintelligenceEventsPaging();
      this.topShujuhuintelligenceEventsPaging();
      let ShujuhuinformationTransmissionMsg = await this.ShujuhuinformationTransmission(); // 请求数据数据的传参
      let ShujuhuintelligenceEventsMsgflagO = await this.ShujuhuintelligenceEvents(
        ShujuhuinformationTransmissionMsg,
        "0",
        data
      ); // 数据湖正常事件数据
      let ShujuhuintelligenceEventsMsgflagP = await this.ShujuhuintelligenceEvents(
        ShujuhuinformationTransmissionMsg,
        "1",
        data
      ); // 数据湖关闭需要显示事件数据
      this.$store.commit("statuLoadingState", true); // 打开缓冲图标
      this.$nextTick(() => {
        this.eventList = [];
        let ShujuhuintelligenceEventsMsgflagOs = []; // 没处理过的flag为0的数据
        let ShujuhuintelligenceEventsMsgflagPs = []; // 处理好的flag为1的数据
        this.$store.state.venteType.map(t => {
          if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
            ShujuhuintelligenceEventsMsgflagOs = [
              ...ShujuhuintelligenceEventsMsgflagOs,
              ...ShujuhuintelligenceEventsMsgflagO[t.id]
            ];
          }
          if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
            ShujuhuintelligenceEventsMsgflagPs = [
              ...ShujuhuintelligenceEventsMsgflagPs,
              ...ShujuhuintelligenceEventsMsgflagP[t.id]
            ];
          }
        });
        let ShujuhuintelligenceEventsMsgflagOremoval = []; // 处理好的flag为0的数据
        ShujuhuintelligenceEventsMsgflagOs.map(t => {
          let item = ShujuhuintelligenceEventsMsgflagPs.find(
            e => e.incidentId === t.incidentId
          );
          if (!item) {
            ShujuhuintelligenceEventsMsgflagOremoval = [
              ...ShujuhuintelligenceEventsMsgflagOremoval,
              t
            ];
          }
        });
        // this.$store.state.venteType.map(t => {
        //     if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
        //         this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagP[t.id]];
        //     }
        //     if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
        //         this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagO[t.id]];
        //     }
        // });
        // this.eventList = [...this.eventList, ...CustomEventsMsg];
        this.eventList = [
          ...this.eventList,
          ...ShujuhuintelligenceEventsMsgflagOremoval,
          ...ShujuhuintelligenceEventsMsgflagPs,
          ...CustomEventsMsg
        ];
        // 如果页面上有提示框则删除  （判断页面的提示框是否需要删除）
        if (this.tooltip.id && this.tipTypeName === "事件") {
          // 先找到处理过数据中对应的那一条数据
          let itemO = this.tooltip.hasOwnProperty("incidentId")
            ? this.intelligenceeventList.find(
                t => t.incidentId === this.tooltip.incidentId
              )
            : this.intelligenceeventList.find(t => t.id === this.tooltip.id);
          let itemP = "";
          if (itemO) {
            // 再从新获取数据中找到对应的数据可能会没有
            itemP = itemO.hasOwnProperty("incidentId")
              ? this.eventList.find(t => t.incidentId === itemO.incidentId)
              : this.eventList.find(t => t.id === itemO.id);
          }
          if (!itemP) {
            console.log("删除提示框");
            // 如果新数据中没找到，说明这条数据刷新后不存在了
            this.removeTooltip();
          }
        }
        // 如果记录的情报图层选择情报类型有值得话，筛选一下数据
        if (this.intelligenceLayerparameters.length !== 0) {
          this.intelligenceLayerparameters.map(t => {
            // if (t === "9" && t === "26") {
            //     this.intelligenceeventList = [...this.intelligenceeventList, ...this.eventList.filter(e => e.incidentType === t)];
            // }
            intelligenceeventList = [
              ...intelligenceeventList,
              ...this.eventList.filter(e => e.incidentType === t)
            ];
            if (t === "9") {
              intelligenceeventList = [
                ...intelligenceeventList,
                ...this.eventList.filter(e => e.intelligenceId === "10001")
              ];
            }
            if (t === "26") {
              intelligenceeventList = [
                ...intelligenceeventList,
                ...this.eventList.filter(e => e.intelligenceId === "10023")
              ];
            }
          });
          this.intelligenceeventList = [...intelligenceeventList]; // 重新赋值，避免数据重复
          // 筛选数据完毕
        } else {
          // this.intelligenceeventList = [...this.eventList]; // 筛选数据完毕
          this.intelligenceeventList = [];
        }
        if (this.intelligenceeventList.length === 0) {
          //   this.$showSimpleMessage("暂无数据", "error");
          //   if (this.tooltip.id) {
          //     this.removeTooltip();
          //   }
          // } else
          // {
          this.intelligenceeventList.map((t, i) => {
            if (t.hasOwnProperty("createdTime")) {
              t.createdTime = t.createdTime
                ? this.$filter.formatDateTime(t.createdTime)
                : "";
            }
            if (t.hasOwnProperty("startTime")) {
              t.startTime = t.startTime
                ? this.$filter.formatDateTime(t.startTime)
                : "";
              t.startTimelittile = t.startTime.split(" ")[1];
            }
            if (!t.hasOwnProperty("startTime")) {
              let times = t.incidentStartTime.split(" ")[1];
              t.startTime = t.incidentStartTime;
              t.startTimelittile = `${times.split(":")[0]}:${
                times.split(":")[1]
              }`;
            }
            if (!t.hasOwnProperty("intelligenceName")) {
              t.intelligenceName = this.$store.state.venteType.find(
                e => e.id === t.incidentType
              ).name;
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

        this.getGISData(this.intelligenceeventList, "sousuo", type, startti);

        // 弹窗打开时重置弹窗里面的值
        if (this.launchDetails) {
          let deleArrs = []; // 重新找对情报重叠数组值
          this.dintelligenceCollection.map(t => {
            // 告警情报或者自定义情报
            // incidentId为告警情报，没有则为自定义情报
            let item = t.hasOwnProperty("incidentId")
              ? this.intelligenceeventList.find(
                  e => e.incidentId === t.incidentId
                )
              : this.intelligenceeventList.find(e => e.id === t.id);
            if (item) {
              deleArrs = [...deleArrs, item];
            }
          });
          this.dintelligenceCollection = [...deleArrs]; // 重置完成
        }

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
      this.$layerNotice(
        "提示",
        "您确定要取消告警吗？",
        () => {
          let ids = this.launchDetails ? eventDetailName : this.tooltip.id;
          axios
            .put("/intelligenceCustom/close/" + ids)
            .then(res => {
              if (res.data.code === 0) {
                this.searchEvent(this.MapGlobalUrlData);
                if (eventDetailName) {
                  this.$refs.eventDetail.eventDetail = false;
                }
                setTimeout(() => {
                  if (this.tooltip.id) {
                    this.removeTooltip(); // 手动取消告警，没关闭弹窗，在这里手动关一下
                  }
                }, 3000);
              } else {
                this.$showSimpleMessage(
                  this.$store.state.codeStatus.find(
                    t => t.code === res.data.code
                  ).name,
                  "error"
                );
              }
            })
            .catch(error => {
              // this.$showSimpleMessage(error, "error");
            });
        },
        null,
        "warning"
      );
    },
    // 情报告警获取数据湖21种事件的接口数据
    ShujuhuintelligenceEvents(Msg, flagMsg, sousuoMsg) {
      let _this = this;
      // 情报告警，请求数据湖接口
      let params = {
        flag: flagMsg,
        incidentType: Msg
      };
      if (flagMsg === "1") {
        let newdata = new Date().getTime(); // 当前时间
        params.incidentEnd2 = this.$tools.setTimeUse(new Date(newdata)); // 事件结束时间的结束时��
        params.incidentEnd1 = this.$tools.setTimeUse(
          new Date(newdata - 5 * 1000 * 60)
        ); // 事件结束时间的开始时间
        if (sousuoMsg && sousuoMsg.startTime && sousuoMsg.endTime) {
          let endTime = `${sousuoMsg.endTime[0]}${sousuoMsg.endTime[1]}${
            sousuoMsg.endTime[2]
          }${sousuoMsg.endTime[3]}-${sousuoMsg.endTime[4]}${
            sousuoMsg.endTime[5]
          }-${sousuoMsg.endTime[6]}${sousuoMsg.endTime[7]} ${
            sousuoMsg.endTime[8]
          }${sousuoMsg.endTime[9]}:${sousuoMsg.endTime[10]}${
            sousuoMsg.endTime[11]
          }:${sousuoMsg.endTime[12]}${sousuoMsg.endTime[13]}`;
          params.incidentEnd2 = sousuoMsg.endTime; // 事件结束时间的结束时间
          params.incidentEnd1 = this.$tools.setTimeUse(
            new Date(this.$filter.timesFormat(endTime) - sousuoMsg.startTime)
          ); // 事件结束时间的开始时间
        }
      } else {
        params.currentTime = this.$tools.setTimeUse();
        // 3600 * 24
        params.size = parseInt(new Date().getTime() / 1000);
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
      // 添加地图层级和四角坐标
      params.scale = this.MapZoomLevel; // 地图当前层级
      params.windowLocation = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      return new Promise((resolve, reject) => {
        //   11.19修改交通构成观测
        // sjhAxios
        //   .post("sjh1/realtime/incidents/selectnew", params)
        //   .then(res => {
        //     resolve(res.data.data[0]); // 返回参数
        //     // console.log(res)
        //   })
        //   .catch(error => {
        //     _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        //     // _this. $showSimpleMessage(error, "error");
        //   });
      });
    },
    // 情报告警获取参数显示不显示数据用于请求数据湖数据传参
    ShujuhuinformationTransmission() {
      let _this = this;
      return new Promise((resolve, reject) => {
        axios
          .get("/intelligence/")
          .then(res => {
			  console.log("Func ShujuhuinformationTransmission",res.data.data);
            let missionMsg = res.data.data.filter(t => t.status === 1);
            let missionMsgData = [];
            missionMsg.map(t => {
              let item = this.$store.state.venteType.find(
                e => e.name === t.name
              );
              if (item) {
                missionMsgData = [...missionMsgData, item.id];
              }
            });
            let bianHao = "";
            missionMsgData.map((t, i) => {
              bianHao =
                i === 0
                  ? `${t},`
                  : i !== missionMsgData.length - 1
                  ? `${bianHao}${t},`
                  : `${bianHao}${t}`;
            });
            resolve(bianHao); // 返回参数
          })
          .catch(error => {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this. $showSimpleMessage(error, "error");
          });
      });
    },
    // 情报告警获取自定义的两种事件接口数据
    CustomEvents(sousuoMsg) {

      let _this = this;
      let data =  _this.InformationPagingArr;
      if (sousuoMsg) {
        data = this.$tools.deepCopy(sousuoMsg);
      }
      let msg = {};
      if (
        data.hasOwnProperty("startTime") &&
        data.hasOwnProperty("endTime") &&
        data.startTime &&
        data.endTime
      ) {
        let endTime = `${data.endTime[0]}${data.endTime[1]}${data.endTime[2]}${
          data.endTime[3]
        }-${data.endTime[4]}${data.endTime[5]}-${data.endTime[6]}${
          data.endTime[7]
        } ${data.endTime[8]}${data.endTime[9]}:${data.endTime[10]}${
          data.endTime[11]
        }:${data.endTime[12]}${data.endTime[13]}`;
        msg.endTime = this.$filter.timesFormat(endTime);
        msg.startTime = msg.endTime - data.startTime;
      } else {
        // 如果没有时间增加一个刷新当前事件的事件戳
        // msg.startTime = new Date().getTime();
      }
      if (data.hasOwnProperty("area") && data.area) {
        msg.area = this.$store.state.area.find(t => t.id === data.area).name;
        this.MapGlobalUrlData = "";
      }
      return new Promise((resolve, reject) => {
        axios
          .get("/intelligenceCustom/gis/", { params: msg })
          .then(res => {
            resolve(res.data.data); // 返回参数
          })
          .catch(error => {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this.$showSimpleMessage(error, "error");
          });
      });
    },
    // 上半部分页接口请求
    async topShujuhuintelligenceEventsPaging() {
      let _this = this;
      // 请求自定义事件分页数据
      let topInformationPagingArr = [];

      const res = await axios
        .get(
          `/intelligenceCustom/?pageNum=${this.topintelligencePage}&pageSize=${this.intelligenceBulletinNumber}&intelligenceStatus=1`
        )
        .then(res => {
          this.toprecordCount = res.data.data.total; // 情报总数据量
          res.data.data.list.map(t => {
            if (t.hasOwnProperty("startTime") && t.startTime) {
              t.dstartTime = _this.$filter.formatDateTime(t.startTime);
            }
          });
          _this.topInformationPagingArr = res.data.data.list;
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // $showSimpleMessage(error, "error");
        });
      //   console.log(_this.topInformationPagingArr);

      // .then(res => {
      //     _this.toprecordCount = res.data.data.total // 情报总数据量
      //     res.data.data.list.map(t => {
      //         if (t.hasOwnProperty("startTime") && t.startTime) {
      //             t.dstartTime = _this.$filter.formatDateTime(t.startTime);
      //         }
      //     });
      //     topInformationPagingArr = res.data.data.list.length > 0 ? [...res.data.data.list] : [];
      // consloe.log(this.topInformationPagingArr)
      // }).catch(error => {
      //     _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
      //     _this. $showSimpleMessage(error, "error");
      // });
    },

    // for(let i=0;i<=5;i++){
    //     setTimeout(
    //         function(){
    //             console.log(i)
    //             },2000*i)
    //     }

    // 情报公告改变页码时
    tophandleCurrentChange(val) {
      this.topintelligencePage = val;
      this.topShujuhuintelligenceEventsPaging();
    },
    // 情报分页接口请求数据
    async ShujuhuintelligenceEventsPaging() {
      let _this = this;
      // 情报告警，请求数据湖接口
      let params = {
        currentTime: this.$tools.setTimeUse(), // 当前时间
        size: parseInt(new Date().getTime() / 1000), // 查询粒度，往前查询多久
        currentPage: this.intelligencePage, // 当前页码数
        pageSize: this.intelligenceBulletinNumber, // 当前页码展示数据量
        minutes: 5 // 情报结束后默认展示时间
      };
      //   if (this.MapGlobalUrlData && this.MapGlobalUrlData.area) {
      //     // params.administrativeId = this.MapGlobalUrlData.area; // 区域id
      //   }
        // return new Promise((resolve, reject) => {
        //   11.19修改交通构成观测
      let res = axios
        .post("/incidents/selectnew", params)
        .then(res => {
          // resolve(res.data.data); // 返回参数
          _this.recordCount = res.data.data.size; // 情报总数据量
          //   console.log(res.data.data)
          if (res.data.data.length > 0) {
            res.data.data.map(t => {
              if (!t.hasOwnProperty("intelligenceName")) {
                t.intelligenceName = t.incidentType;
              }
              if (t.hasOwnProperty("incidentStartTime")) {
                t.startTime = _this.$filter.timesFormat(t.incidentStartTime);
              }
            });
          }
          _this.InformationPagingArr = res.data.data.list;
          // console.log("ssssssssssssssssssssssss", _this.InformationPagingArr)
          // 数据排序
          // 事件从大到小排序
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });
        // });
    },
    // 情报公告改变页码时
    handleCurrentChange(val) {
      this.intelligencePage = val;
      this.ShujuhuintelligenceEventsPaging();
    },

    // 交通状态观测
    trafficFlow(leftchose, Rname) {
      this.trafficFlowList = this.$refs.leftTop.trafficFlowList;
      // if (Rname) {
      // }
      if (this.pageStatus !== "trafficFlow") return;
      let chose;
      if (leftchose) {
        chose = leftchose.choseLevel;
        this.choseLevel = chose;
        // if (leftchose.choseLevel.length === 0) {
        //     chose = ["0", "1", "2", "3", "4"];
        // }
      } else {
        chose = ["0", "1", "2", "3", "4"];
      }
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.getOverlays().clear();
      this.echoPromptBox();
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      // this.reAddingLayer(); // 再次添加标记，测距，区域图层和覆盖层
      if (Rname) {
        // 如果有值说明是定时刷新调用的本函数，判断是否再次加入图层
        // if (this.QingbaocoordinateTracingPointImg) {
        //   this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
        // }
        // if (this.PiontCoordinateLocus) {
        //   this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
        // }
        // if (this.equipmentLayers) {
        //   this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
        // }
        // if (this.pointPositionLayers) {
        //   this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
        // }
        // if (this.coordinateTracingPointImg) {
        //   this.mapGis.addLayer(this.coordinateTracingPointImg); // 再次添加地图基本搜索画出的点位图层
        // }
      }

      let _this = this;
      this.trafficFlowListTop = trafficFlowList;
      let trafficFlowList = this.$refs.leftTop.trafficFlowList;
      let trafficFlowCheckBox = this.$refs.leftTop.trafficFlowCheckBox;
      trafficFlowCheckBox.map(item => {
        item.flag = 0;
        chose.map(road => {
          if (road === item.value) {
            item.flag = 1;
          }
        });
      });
      let currentTime = this.$tools.getTimeInt();
      _this.trafficFlowNumber = [];
      let currentPage = 1;
      let point = [];
      this.drawTrafficObserveData(chose, point);
      let stop = this.$refs.leftTop.stop;
      trafficFlowList.map(item => {
        this.RoadTrafficObserveData(chose, item, currentPage, stop);

        // 判断定时器是否开启
        if (this.trafficFlowTimer === "") {
          this.trafficFlowTimes();
        }
        // // 处理坐标点偏移问题
        // data.map(t => {
        //         t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
        // });
        // if(res.data.data!==null){
        //         currentPage++;
        //     aaa();
        // }else{
        //         return;
        // }
      });
    },
    // 绘制路段交通轨迹（轨迹）
    RoadTrafficObserveData(chose, item, currentPage, stop) {
      let RoadTPI = "RoadTPI" + item;
      // let currentPage = 0;
      let _this = this;
      axios
        .get(
          `operations/roadTPI`
        )
        .then(res => {

          if (this.pageStatus !== "trafficFlow") {
              this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            this.trafficFlowList = this.trafficFlowListTop;
          } else {
              let trafficFlowCheckBox = this.$refs.leftTop.trafficFlowCheckBox;
            let tt = trafficFlowCheckBox.find(t => t.value === item);
            let isJumpOut = tt.flag === 0;
            if (isJumpOut) {
                this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              return;
            }
            let roads1 = res.data.data;
            // let roads = JSON.parse(roads1);
            if (roads1 == null) {
              _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              currentPage = 0;
            } else {
              let roads1 = res.data.data;
            //   let roads = JSON.parse(roads1);
            //   if (!roads) {
            //     this.$showSimpleMessage("暂无数据", "error");
            //     // if (_this.mapLoading) {
            //     //     _this.mapLoading.close();
            //     //     _this.mapLoading = "";
            //     // }
            //     _this.mapFullClosedscreenLoding();
            //     return;
            //   }
              if (roads1.length > 0) {
                roads1.map((val, index) => {
                  // if (choseArea && choseArea.includes(val.trace[0].districtId)) {
                  let roadsdata =  JSON.parse(val.trace);
                //   let roads4 = JSON.parse(JSON.parse(roadsdata));
                  let trace = roadsdata;
                  let color = _this.choseColor(val.roadLevel);
                  let nowId = new Date().getTime() + index;
                  // console.log(trace);
                  val.id = nowId;
                  if (
                    val.roadLevel &&
                    chose.includes(val.roadLevel) &&
                    trace !== undefined &&
                    trace.length > 0
                  ) {
                    val.points = [];
                    trace.map(item => {
                      if (item.path) {
                        item.path.map(i => {
                          let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                            i.point[0],
                            i.point[1]
                          );
                          let pointer = { point: pointArr };
                          val.points.push(pointer);
                        });
                      }
                    });
                    if (val.points.length > 0) {
                      _this.trafficFlowNumber.push(val);
                      let vector = GisClassMethod.CoordinateLocus(
                        val.points,
                        nowId,
                        color,
                        val.roadLevel
                      );
                      this.mapGis.addLayer(vector);
                    }
                    // 关闭全屏loding
                    if (_this.mapLoading) {
                      _this.mapLoading.close();
                      _this.mapLoading = "";
                    }
                  }
                });
                _this.mapFullClosedscreenLoding();
              } else {
                if (_this.mapLoading) {
                  _this.mapLoading.close();
                  _this.mapLoading = "";
                }
                _this.mapFullClosedscreenLoding();
              }
              currentPage++;
              _this.RoadTrafficObserveData(chose, i, currentPage);
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });
      // }
    },
    // 路口交通观测（点位）
    drawTrafficObserveData(chose, point) {
      let _this = this;
      axios
        .post(
          `/operations/getRedisPage?keys=${"CrossingTPI"}&currentPage=${
            this.trafficObservePage
          }`
        )
        .then(res => {
          if (this.pageStatus !== "trafficFlow") {
            return;
          } else {
            //   isJumpAway = true;
            let retData = res.data.data;
            if (res.data.data == null) {
              _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              _this.trafficObservePage = 1;
            } else {
              let trafficFlowCheckBox = this.$refs.leftTop.trafficFlowCheckBox;
              chose.map(item => {
                let tt = trafficFlowCheckBox.find(t => t.value === item);
                let isJumpOut = tt.flag === 0;
                if (isJumpOut) {
                  this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
                  return;
                }
              });
              let location1 = res.data.data;
              let location = JSON.parse(location1);
              if (!location) {
                this.$showSimpleMessage("暂无数据", "error");
                return;
              }
              //   let point = [];
              if (location.length > 0) {
                location.map((item, index) => {
                  item.crossingLevel += "";
                  let isSuccess = chose.includes(item.crossingLevel);
                  if (
                    item.crossingLevel &&
                    chose.includes(item.crossingLevel) &&
                    item.longitude !== undefined &&
                    item.latitude !== undefined
                  ) {
                    let nowId = new Date().getTime() + index;
                    item.id = nowId;
                    item.point = [item.longitude, item.latitude];
                    item.intelligenceId = item.crossingLevel;
                    point.push(item);
                    _this.trafficFlowNumber.push(item);
                  }
                  // console.log(point)
                  if (point.length > 0) {
                    _this.drawPoints(point, 0.8);
                  }
                });

                _this.trafficObservePage++;
                _this.drawTrafficObserveData(chose, point);
              }
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          //   this. $showSimpleMessage(error, "error");
        });
    },
    OdSjhLaw(searcher, Rname) {
      if (searcher) {
        this.ODsearcher = searcher; // 全局存参数
      }
      if (Rname || searcher) {
        this.mapFullscreenLoding(); // 打开全屏loding
      }
      let _this = this;
      this.ODnumber = [];
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.getOverlays().clear();
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      this.echoPromptBox();
      this.reAddingLayer(); // 再次添加标记，测距，区域图层和覆盖层
      if (Rname || searcher) {
        // 如果有值说明是定时刷新调用的本函数，判断是否再次加入图层
        if (this.QingbaocoordinateTracingPointImg) {
          this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
        }
        if (this.PiontCoordinateLocus) {
          this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
        }
        if (this.equipmentLayers) {
          this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
        }
        if (this.pointPositionLayers) {
          this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
        }
        if (!searcher && this.coordinateTracingPointImg) {
          this.mapGis.addLayer(this.coordinateTracingPointImg); // 再次添加地图基本搜索画出的点位图层
        }
        if (!searcher && this.mapSearchLayer) {
          this.mapGis.addLayer(this.mapSearchLayer); // 再次添加地图基本搜索画出的区域图层
        }
      }

      // 添加地图层级和四角坐标
      searcher["scale"] = this.MapZoomLevel; // 地图当前层级
      searcher["windowLocation"] = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      sjhAxios
        .post("sjh2/strategysupport/oddata/", searcher)
        .then(res => {
          if (res.data.data) {
            let roads = res.data.data;
            this.ODLowRoads = roads;
            let roadColor = [];
            // if(this.timeInter.length > 0) {
            this.timeInter.map(val => {
              let tt = this.roadColor.find(t => t.name === val);
              roadColor.push(tt);
            });
            // } else {
            //     roadColor = this.roadColor;
            // }
            roadColor.map((road, idx) => {
              let newRodw = roads[`${_this.ODTimer}`][`${road.name}`];
              if (newRodw) {
                let carCount = 0;
                newRodw.map((val, index) => {
                  if (val.carCount > carCount) {
                    carCount = val.carCount;
                    this.carCount = carCount;
                  }
                  let trace = val.trace;
                  let idxx = _this.roadColor.findIndex(
                    t => t.name === road.name
                  );
                  let colorA = _this.roadColor[idxx].colorA;
                  // val.carCount / this.carCount*0.8
                  // val.carCount / 1000
                  let color = "rgb(" + colorA + ")";
                  let nowId = "m" + new Date().getTime() + index;
                  val.id = nowId;
                  val.colorA = colorA;
                  val.colorB = _this.roadColor[idxx].colorB;
                  val.timer = road.name;
                  _this.ODnumber.push(val);
                  if (trace !== undefined) {
                    val.points = [];
                    trace.map(item => {
                      if (item.path) {
                        item.path.map(i => {
                          let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                            i.point[0],
                            i.point[1]
                          );
                          let pointer = { point: pointArr };
                          val.points.push(pointer);
                        });
                      }
                    });
                    if (val.points.length > 0) {
                      let vector = GisClassMethod.CoordinateLocus(
                        val.points,
                        nowId,
                        color
                      );
                      this.mapGis.addLayer(vector);
                    }
                  }
                });
              }
            });
            // 关闭全屏loding
            if (_this.mapLoading) {
              _this.mapLoading.close();
              _this.mapLoading = "";
            }
          } else {
            // _this.$showSimpleMessage("暂无数据", "error");
            if (_this.mapLoading) {
              _this.mapLoading.close();
              _this.mapLoading = "";
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });
    },
    // OD观测
    async ODwatch(searcher, Rname) {
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.getOverlays().clear();
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      // 有参数的时候，是OD规律的搜索
      if (searcher) {
        this.OdSjhLaw(searcher, Rname);
      } else {
        let currentPage = 1;
        this.ODobservation(currentPage);
        setTimeout(() => {
          if (this.ODwatchTimer === "") {
            this.ODwatchTime();
          }
        });
      }
    },
    // 交通状态观测的定时器
    trafficFlowTimes() {
      // 道路状态观测定时器
      let _this = this;
      this.trafficFlowTimer = setInterval(() => {
        let choseArea = _this.$refs.leftTop.serchContent;
        let choseLevel = _this.$refs.leftTop.trafficFlowList;
        let params = {
          choseLevel: choseLevel,
          choseArea: choseArea
        };
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
        this.$refs.leftTop.choseSome = "";
        _this.trafficFlow(params, "ti");
      }, 180000);
    },
    // OD观测定时器
    ODwatchTime() {
      setTimeout(() => {
        this.ODwatchTimer = setInterval(() => {
          this.$refs.leftTop.choseSome = "";
          this.ODwatch(null, "ti");
        }, 180000);
      });
    },
    // 潮汐流观测定时器
    tidalTimers() {
      setTimeout(() => {
        this.tidalTimer = setInterval(() => {
          this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
          this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          this.$refs.leftTop.choseSome = "";
          this.TidalcurrentgradeData();
        }, 180000);
      });
    },
    // 营运车辆定时器
    operatingVehiclesTimers() {
      // setTimeout(() => {
      this.OperatingFor(); // 调用营运车辆观测请求
      this.eventBulletinTimer = setTimeout(() => {
        this.$refs.leftTop.choseSome = "";
        this.operatingVehiclesTimers();
      }, 180000);
      // });
    },
    // od观测
    async ODobservation(currentPage) {
      let _this = this;
      await axios
        .get(
          `operations/selectall`
        )
        .then(res => {
          if (this.pageStatus !== "ODwatch") {
            // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            return;
          } else {
            let roads1 = res.data.data;
            // let roads4 = JSON.parse(roads1);
            // let roads = JSON.parse(roads1);
            // console.log(roads)
            if (roads1 == null || currentPage >= 10) {
              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              currentPage = 1;
              this.$showSimpleMessage("加载完成", "success");
            } else {
              if (roads1.length === 0) {
                this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
                return;
              }
              let carCount = 0;
              roads1.map(val => {
                if (val.carCount > carCount) {
                  carCount = val.carCount;
                  _this.carCount = carCount;
                }
              });
              roads1.map((val, index) => {
                let trace1 = val.trace;
                let trace = JSON.parse(trace1);

                // console.log(trace)
                // let color = _this.choseColor(val.roadLevel);
                let color =
                  "rgb(252, 3, 32," +
                  (val.carCount / _this.carCount) * 0.8 +
                  ")";
                let nowId = "m" + new Date().getTime() + index;
                val.id = nowId;
                val.color = color;
                _this.ODnumber.push(val);
                if (trace !== undefined && trace.length > 0) {
                  val.points = [];
                  trace.map(item => {
                    if (item.path) {
                      item.path.map(i => {
                        let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                          i.point[0],
                          i.point[1]
                        );
                        let pointer = { point: pointArr };
                        val.points.push(pointer);
                      });
                    }
                  });
                  if (val.points.length > 0) {
                    let vector = GisClassMethod.CoordinateLocus(
                      val.points,
                      nowId,
                      color
                    );
                    this.mapGis.addLayer(vector);
                  }
                }
              });
              // 关闭全屏loding
              if (_this.mapLoading) {
                _this.mapLoading.close();
                _this.mapLoading = "";
              }
              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              currentPage++;
              _this.ODobservation(currentPage);
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          _this.$showSimpleMessage("暂无数据", "error");
        });
    },
    // OD规律gzw
    ODLow(move, id) {
      let currentPage = 1;
      this.ODsearcher = "";
      this.mapFullscreenLoding(); // 打开全屏loding
      let _this = this;
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      this.reAddingLayer(null, "ODLow"); // 再次添加标记，测距，区域图层和覆盖层
      if (this.QingbaocoordinateTracingPointImg) {
        this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      }
      if (this.PiontCoordinateLocus) {
        this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      }
      if (this.equipmentLayers) {
        this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      }
      if (this.pointPositionLayers) {
        this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      }
      let roadKey = [];
      if (!move) {
        this.roadColor.map(val => {
          roadKey.push(val.name);
        });
        this.$refs.leftTop.roadKey = roadKey;
        this.timeInter = [];
        this.roadColor.map(val => {
          this.timeInter.push(val.name);
        });
      }
      // this.timeInter = this.roadColor;
      this.ODFor();
    },
    // 循环调用od规律时间段
    ODFor() {
      let roadColor = this.roadColor;
      let timeInter = this.timeInter;
      roadColor.map(item => {
        item.flag = 0;
        timeInter.map(road => {
          if (road === item.name) {
            item.flag = 1;
          }
        });
      });
      this.timeInter.map(val => {
        let tt = this.roadColor.find(t => t.name === val);
        let TimeSlot = tt.name;
        let ODTime = this.ODLowTime;
        let currentPage = 1;
        this.ODRegularPaging(currentPage, TimeSlot, ODTime);
      });
    },
    //调用od规律接口
    ODRegularPaging(currentPage, TimeSlot, ODTime) {
      let _this = this;
      axios
        .post(
          `/operations/getOddataPage?timeDuan=${TimeSlot}&state=${ODTime}&currentPage=${currentPage}&pageSize=50`
        )
        .then(res => {
          if (this.pageStatus !== "ODLow") {
            // source.clear();
            // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            return;
          } else {
            //xxxxx
            let tt = this.roadColor.find(t => t.name === TimeSlot);
            let isJumpOut = tt.flag === 0;
            if (isJumpOut) {
              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              return;
            }
            let _this = this;
            let roads = res.data.data.pageList;
            if (roads.length === 0 || currentPage >= 10) {
              currentPage = 1;
              this.mapFullClosedscreenLoding();
            } else {
              // console.log(roads);
              if (!roads) {
                this.$showSimpleMessage("暂无数据！", "error");
                // 关闭全屏loding
                if (_this.mapLoading) {
                  _this.mapLoading.close();
                  _this.mapLoading = "";
                }
                this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
                return;
              }
              this.ODLowRoads = roads;
              let roadColors = [];
              let tt = this.roadColor.find(t => t.name === TimeSlot);
              roadColors.push(tt);
              currentPage++;
              this.ODRegularPaging(currentPage, TimeSlot, ODTime);
              roadColors.map(road => {
                // for(let i = 0;i<roadColor.length;i++){
                // let road = roadColor[i];
                // let newRode = roads[`${_this.ODTimer}`][`${road.name}`];
                let newRode = roads;
                if (newRode && newRode.length > 0) {
                  let carCount = 0;
                  newRode.map((val, index) => {
                    if (val.carCount > carCount) {
                      carCount = val.carCount;
                      this.carCount = carCount;
                    }
                    let idxx = _this.roadColor.findIndex(
                      t => t.name === road.name
                    );
                    let trace = val.trace;
                    let colorA = road.colorA;
                    let zIndex = road.index;
                    let color = "rgb(" + colorA;
                    (")");
                    let nowId = "m" + new Date().getTime() + index;
                    if (this.$refs.leftTop.OdSjh === true) {
                      return;
                      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
                      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
                    }
                    val.id = nowId;
                    val.colorA = colorA;
                    val.colorB = _this.roadColor[idxx].colorB;
                    val.timer = TimeSlot;
                    val.zIndex = zIndex;

                    _this.ODnumber.push(val);
                    let traces = JSON.parse(trace);
                    let tracess = traces;
                    if (traces !== undefined && tracess.length > 0) {
                      // if (trace !== undefined) {
                      val.points = [];
                      tracess.map(item => {
                        if (item.path) {
                          item.path.map(i => {
                            let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                              i.point[0],
                              i.point[1]
                            );
                            let pointer = { point: pointArr };
                            val.points.push(pointer);
                          });
                        }
                      });
                      if (val.points.length > 0) {
                        let vector = GisClassMethod.CoordinateLocus(
                          val.points,
                          nowId,
                          color,
                          zIndex
                        );
                        this.mapGis.addLayer(vector);
                      }
                    }
                  });
                }
              });

              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈

              // 关闭全屏loding
              if (_this.mapLoading) {
                _this.mapLoading.close();
                _this.mapLoading = "";
                this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              }
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          //   _this. $showSimpleMessage(error, "error");
        });
    },
    // 绘制od规律数据湖轨迹
    OdLawDraw(data) {
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      let _this = this;
      let roads = this.ODLowRoads;
      let roadColor = [];
      this.timeInter.map(val => {
        let tt = this.roadColor.find(t => t.name === val);
        roadColor.push(tt);
      });
      let isNull = true;
      roadColor.map((road, idx) => {
        let newRodw = roads[`${_this.ODTimer}`][`${road.name}`];
        if (newRodw.length !== 0) {
          isNull = false;
          let carCount = 0;
          newRodw.map((val, index) => {
            if (val.carCount > carCount) {
              carCount = val.carCount;
              this.carCount = carCount;
            }
            let trace = val.trace;
            let idxx = _this.roadColor.findIndex(t => t.name === road.name);
            let colorA = _this.roadColor[idxx].colorA;
            // val.carCount / this.carCount*0.8
            // val.carCount / 1000
            let color = "rgb(" + colorA;
            (")");
            let nowId = "m" + new Date().getTime() + index;
            val.id = nowId;
            val.colorA = colorA;
            val.colorB = _this.roadColor[idxx].colorB;
            val.timer = road.name;
            _this.ODnumber.push(val);
            if (trace !== undefined) {
              val.points = [];
              trace.map(item => {
                if (item.path) {
                  item.path.map(i => {
                    let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                      i.point[0],
                      i.point[1]
                    );
                    let pointer = { point: pointArr };
                    val.points.push(pointer);
                  });
                }
              });
              if (val.points.length > 0) {
                let vector = GisClassMethod.CoordinateLocus(
                  val.points,
                  nowId,
                  color
                );
                this.mapGis.addLayer(vector);
              }
            }
          });
        }
      });
      if (isNull) {
        _this.$showSimpleMessage("暂无数据", "error");
      }
      // 关闭全屏loding
      if (_this.mapLoading) {
        _this.mapLoading.close();
        _this.mapLoading = "";
      } else {
        // _this.$showSimpleMessage("暂无数据", "error");
        if (_this.mapLoading) {
          _this.mapLoading.close();
          _this.mapLoading = "";
        }
      }
    },
    // OD规律选择工作日，非工作日
    ODTimerChange(data, id) {
      this.mapFullscreenLoding(); // 打开全屏loding
      this.ODTimer = data;
      // this.ODLow(move,id);
      let _this = this;
      //  let roadKey = [];
      // this.roadColor.map(val => {
      //     roadKey.push(val.name);
      // });
      // this.$refs.leftTop.roadKey = roadKey;
      // this.timeInter = this.roadColor;
      // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层

      // let _this = this;
      if (this.$refs.leftTop.OdSjh !== false) {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
        this.OdLawDraw();
      } else {
        if (data == "工作日") {
          this.ODLowTime = 0;
          this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
          this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          this.ODFor();
        } else {
          this.ODLowTime = 1;
          this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
          this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          this.ODFor();
        }
      }

      // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      // this.reAddingLayer(null, "ODTimerChange"); // 再次添加标记，测距，区域图层和覆盖层
      // if (this.QingbaocoordinateTracingPointImg) {
      //   this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      // }
      // if (this.PiontCoordinateLocus) {
      //   this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      // }
      // if (this.equipmentLayers) {
      //   this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      // }
      // if (this.pointPositionLayers) {
      //   this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      // }
      // let roadColor = [];
      // this.timeInter.map(val => {
      //   let tt = this.roadColor.find(t => t.id === val);
      //   roadColor.push(tt);
      // });
      // roadColor.map((road, idx) => {
      //   let newRode = this.ODLowRoads[`${_this.ODTimer}`][`${road.id}`];
      //   if (newRode) {
      //     newRode.map((val, index) => {
      //       let trace = val.trace;
      //       let colorA = road.colorA;
      //       let color =
      //         "rgb(" +
      //         colorA +
      //         "," +
      //         (val.carCount / this.carCount) * 0.8 +
      //         ")";
      //       let nowId = "m" + new Date().getTime() + index;
      //       val.id = nowId;
      //       val.colorA = colorA;
      //       val.colorB = road.colorB;
      //       val.timer = road.name;
      //       _this.ODnumber.push(val);
      //       if (trace !== undefined && trace.length > 0) {
      //         // if (trace !== undefined) {
      //         val.points = [];
      //         trace.map(item => {
      //           if (item.path) {
      //             item.path.map(i => {
      //               let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
      //                 i.point[0],
      //                 i.point[1]
      //               );
      //               let pointer = { point: pointArr };
      //               val.points.push(pointer);
      //             });
      //           }
      //         });
      //         if (val.points.length > 0) {
      //           let vector = GisClassMethod.CoordinateLocus(
      //             val.points,
      //             nowId,
      //             color
      //           );
      //           this.mapGis.addLayer(vector);
      //         }
      //       }
      //     });
      //   }
      // });
      // // 关闭全屏loding
      // if (this.mapLoading) {
      //   this.mapLoading.close();
      //   this.mapLoading = "";
      // }
      // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
    },
    // OD规律的时间段切换
    ODLowTimerChange(timeInter) {
      let timeInters = this.timeInter;
      this.timeInter = timeInter;
      this.mapFullscreenLoding(); // 打开全屏loding
      let _this = this;
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      // this.reAddingLayer(null, "ODLowTimerChange"); // 再次添加标记，测距，区域图层和覆盖层
      // if (this.QingbaocoordinateTracingPointImg) {
      //   this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      // }
      // if (this.PiontCoordinateLocus) {
      //   this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      // }
      // if (this.equipmentLayers) {
      //   this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      // }
      // if (this.pointPositionLayers) {
      //   this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      // }
      if (this.$refs.leftTop.OdSjh !== false) {
        this.OdLawDraw();
      } else {
        this.ODFor();
      }
      if (timeInter == "") {
        this.$showSimpleMessage("请选择时间段", "error");
        this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
      }
      // if(timeInter.length === 0) {
      //     this.roadColor.map((road,idx) => {
      //         let newRode = this.ODLowRoads[`${_this.ODTimer}`][`${road.name}`];
      //         if(newRode) {
      //             newRode.map((val, index) => {
      //                 let trace = val.trace;
      //                 let colorA = road.colorA;
      //                 let color = "rgb(" + colorA + "," + val.carCount / this.carCount*0.8 + ")";
      //                 let nowId = "m" + new Date().getTime() + index;
      //                 val.id = nowId;
      //                 val.colorA = colorA;
      //                 val.colorB = road.colorB;
      //                 val.timer = road.name;
      //                 _this.ODnumber.push(val);
      //                 if (trace !== undefined) {
      //                     // if (trace !== undefined) {
      //                     val.points = [];
      //                     trace.map(item => {
      //                         let pointer = {point: [item.longitude, item.latitude]};
      //                         val.points.push(pointer);
      //                     });
      //                     let vector = GisClassMethod.CoordinateLocus(val.points, nowId, color);
      //                     this.mapGis.addLayer(vector);
      //                 }
      //             });
      //         };
      //     })
      // } else {
      // timeInter.map((road, idx) => {
      //   let newRode = this.ODLowRoads[`${_this.ODTimer}`][`${road}`];
      //   if (newRode) {
      //     newRode.map((val, index) => {
      //       let trace = val.trace;
      //       let colorA = this.roadColor.find(t => t.name === road).colorA;
      //       let color =
      //         "rgb(" +
      //         colorA +
      //         "," +
      //         (val.carCount / this.carCount) * 0.8 +
      //         ")";
      //       let nowId = "m" + new Date().getTime() + index;
      //       val.id = nowId;
      //       val.colorA = colorA;
      //       val.colorB = this.roadColor.find(t => t.name === road).colorB;
      //       val.timer = this.roadColor.find(t => t.name === road).name;
      //       _this.ODnumber.push(val);
      //       if (trace !== undefined) {
      //         val.points = [];
      //         trace.map(item => {
      //           if (item.path) {
      //             item.path.map(i => {
      //               let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
      //                 i.point[0],
      //                 i.point[1]
      //               );
      //               let pointer = { point: pointArr };
      //               val.points.push(pointer);
      //             });
      //           }
      //         });
      //         if (val.points.length > 0) {
      //           let vector = GisClassMethod.CoordinateLocus(
      //             val.points,
      //             nowId,
      //             color
      //           );
      //           this.mapGis.addLayer(vector);
      //         }
      //       }
      //     });
      //   }
      // });
      // };
      // 关闭全屏loding
      // if (this.mapLoading) {
      //   this.mapLoading.close();
      //   this.mapLoading = "";
      // }
      // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
    },

    // 潮汐流观测/规律
    tidalWatch(typeData) {
      this.eraseTimer();
      this.TidalcurrentgradeData(); // 调用接口获取潮汐流等级
      // setTimeout(async () => {
      //   if (!typeData) {
      //     this.pageStatus = "tidalWatch";
      //   }
      if (this.pageStatus === "tidalWatch") {
        //     this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        //     // if (tidalWatchdata.length >= 20) {
        //     //     // 太多了，先画20个
        //     //     for (let i = 0; i < 18; i++) {
        //     //         this.tidalWatchdata = [...this.tidalWatchdata, tidalWatchdata[i]];
        //     //     }
        //     // } else {
        //     //     this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        //     // }
        //     // if (this.tidalWatchdata.length === 0) {
        //     //   this.$showSimpleMessage("暂无数据", "error");
        //     // }
        //     // this.tidalFlowRenderinglayers(this.tidalWatchdata); // 拼凑潮汐流点位数据
        //     if (this.tidalTimer === "") {
        this.tidalTimers(); // 启动潮汐流定时器
        //     }
      } else {
        //     // 调用潮汐流规律接口
        this.eraseTimer(); // 清除定时器
        //     this.$refs.leftTop.tidalTimeIntervalCheckList = [
        //       "0点到3点",
        //       "3点到6点",
        //       "6点到9点",
        //       "9点到12点",
        //       "12点到15点",
        //       "15点到18点",
        //       "18点到21点",
        //       "21点到24点"
        //     ];
        //     let tidalWatchdata = await this.ShujuhuitidalLawData();
        //     this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        //     this.tidalWatchdata = [];
        //     if (tidalWatchdata.length >= 20) {
        //       // 太多了，先画20个
        //       for (let i = 0; i < 18; i++) {
        //         this.tidalWatchdata = [...this.tidalWatchdata, tidalWatchdata[i]];
        //       }
        //     } else {
        //       this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        //     }
        //     // this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        //     //   console.log(this.tidalWatchdata);
        //     if (this.tidalWatchdata.length === 0) {
        //       this.$showSimpleMessage("暂无数据", "error");
        //     }
        //     this.tidalFlowRenderinglayers(this.tidalWatchdata); // 拼凑潮汐流点位数据
      }
      // });
    },
    // 潮汐流规律左上角搜索
    async tidalsearchEvent(data, typeName) {
      // this.mapFullscreenLoding(); // 打开全屏loding
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
      this.MsgData = data.tidalCheckList;
      if (data.tidalserchTime =="") {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        let dayNature = data.dayNatrue;
        this.TidalCurrentQuery = true;
        this.dayNatrue = dayNature;
        let MsgData = data.tidalCheckList;

        let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
        this.ServationFor(MsgData, timeIntervals, dayNature);
      } else {
        this.TidalCurrentQuery = false;
        this.reAddingLayer(null, "tidalsearchEvent"); // 再次添加标记，测距，区域图层和覆盖层
        if (this.QingbaocoordinateTracingPointImg) {
          this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
        }
        if (this.PiontCoordinateLocus) {
          this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
        }
        if (this.equipmentLayers) {
          this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
        }
        if (this.pointPositionLayers) {
          this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
        }

        let params = {};
        if (data.tidalareaval) {
          // 潮汐流规律行政区域起止点
          params.originArea = data.tidalareaval;
          params.destinationArea = data.tidalareaval;
        }
        if (data.tidalserchTime) {
          // 潮汐流规律开始结束时间
          params.startTime = data.tidalserchTime[0]
            ? this.$tools.setTimeUse(
                new Date(this.$filter.timesFormat(data.tidalserchTime[0]))
              )
            : "";
          params.endTime = data.tidalserchTime[1]
            ? this.$tools.setTimeUse(
                new Date(this.$filter.timesFormat(data.tidalserchTime[1]))
              )
            : "";
        }
        if (data.startTime) {
          // 潮汐流规律开始时间
          params.startTime = data.startTime || "";
        }
        if (data.endTime) {
          // 潮汐流规律结束时间
          params.endTime = data.endTime || "";
        }
        if (data.dayNatrue || data.dayNature) {
          // 潮汐流规律日期类型
          params.dayNature = data.dayNatrue || data.dayNature;
          this.dayNature = data.dayNatrue || data.dayNature; // 重新赋值给全局的日期类型
        }
        if (data.tidalCheckList && data.tidalCheckList.length !== 0) {
          // 潮汐流规律等级
          let MsgData = "";
          let num = data.tidalCheckList.length - 1;
          data.tidalCheckList.map((t, i) => {
            MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}`;
          });
          params.tidalFlowLevel = MsgData;
        } else if (data.tidalFlowLevel) {
          params.tidalFlowLevel = data.tidalFlowLevel;
        } else {
          if (!typeName) {
            params.tidalFlowLevel = "-1"; // 表示没有选择潮汐流等级
          }
        }
        let tidalWatchdata = await this.ShujuhuitidalLawData(params);
        this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        this.tidalWatchdata = tidalWatchdata;
        // if (tidalWatchdata.length >= 20) {
        //   // 太多了，先画20个
        //   for (let i = 0; i < 18; i++) {
        //     this.tidalWatchdata = [...this.tidalWatchdata, tidalWatchdata[i]];
        //   }
        // } else {
        //   this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        // }
        // // this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        // if (this.tidalWatchdata.length === 0) {
        //   this.$showSimpleMessage("暂无数据", "error");
        // }
        let dayNature = data.dayNatrue;
        let MsgData = data.tidalCheckList;
        let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
        this.tidalFlowRenderinglayers(
          this.tidalWatchdata,
          dayNature,
          MsgData,
          timeIntervals
        ); // 再次重新绘制潮汐流
      }
    },

    // 潮汐流等级选择后重绘
    async handleCheckedCitiesChange(data, typeName) {
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.getOverlays().clear();
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
      this.echoPromptBox();
      // this.reAddingLayer(); // 再次添加标记，测距，区域图层和覆盖层
      // if (this.QingbaocoordinateTracingPointImg) {
      //   this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      // }
      // if (this.PiontCoordinateLocus) {
      //   this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      // }
      // if (this.equipmentLayers) {
      //   this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      // }
      // if (this.pointPositionLayers) {
      //   this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      // }
      // if (data.type === "tidalWatch" && this.coordinateTracingPointImg) {
      //   this.mapGis.addLayer(this.coordinateTracingPointImg); // 再次添加地图基本搜索画出的点位图层
      // }
      // if (data.type === "tidalWatch" && this.mapSearchLayer) {
      //   this.mapGis.addLayer(this.mapSearchLayer); // 再次添加地图基本搜索画出的区域图层
      // }
      let MsgDatas = data.tidalCheckList;
      this.MsgData = MsgDatas;
      this.tidalCheckLists = data.tidalCheckList;
      if (data.type === "tidalWatch" || !data.type) {
        this.$refs.leftTop.choseSome = "";
        this.mapFullscreenLoding(); // 打开全屏loding
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.getOverlays().clear();
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        // 调用潮汐流观测接口
        this.tidalWatchdata = [];
        if (MsgDatas.length === 0) {
          this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          this.$showSimpleMessage("请选择潮汐流级别", "error");
        }
        this.Initialization = 0;
        if (
          data.tidalCheckList &&
          data.tidalCheckList.length !== 0 &&
          data.tidalCheckList instanceof Array
        ) {
          let num = data.tidalCheckList.length - 1;
          data.tidalCheckList.map((t, i) => {
            MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}`;
          });
        } else if (
          data.hasOwnProperty("tidalFlowLevel") &&
          data.tidalFlowLevel
        ) {
          MsgData = data.tidalFlowLevel;
        } else {
          if (!typeName) {
            MsgData = "-1"; // 表示没有选择潮汐流等级
          }
        }
        this.ServationFor(MsgDatas);
        // let tidalWatchdata = await this.ShujuhuitidalObservationData(MsgData);
        this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        this.tidalWatchdata = [];
        this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        let dayNature = data.dayNatrue;
        let MsgData = data.tidalCheckList;
        let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
        if (this.tidalWatchdata.length === 0) {
          this.$showSimpleMessage("暂无数据", "error");
        }
        // this.tidalFlowRenderinglayers(
        //   this.tidalWatchdata,
        //   dayNature,
        //   MsgData,
        //   timeIntervals
        // ); // 再次重新绘制潮汐流
      } else {
        // 潮汐流规律时调用潮汐流搜索
        // this.tidalsearchEvent(data, typeName);
        let aaa = [];
        if (this.$refs.leftTop.DataLakeLow !== false) {
          data.tidalCheckList.map(ref => {
            this.tidalWatchdata.map((item, id) => {
              if (ref == item.tidalFlowLevel) {
                aaa.push(item);
              }
            });
          });
          let dayNature = data.dayNatrue;
          let MsgData = data.tidalCheckList;
          let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
          this.tidalFlowRenderinglayers(aaa, dayNature, MsgData, timeIntervals);
        } else {
          let dayNature = data.dayNatrue;
          let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList; // 潮汐流时间段
          this.ServationFor(MsgDatas, timeIntervals, dayNature);
        }
      }
    },
    // 潮汐流时段选择后回调
    async handleCheckedCitiesChangeTimer(data) {
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.getOverlays().clear();
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
      this.echoPromptBox();
      let abc = [];
      // this.reAddingLayer(); // 再次添加标记，测距，区域图层和覆盖层
      // if (this.QingbaocoordinateTracingPointImg) {
      //   this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      // }
      // if (this.PiontCoordinateLocus) {
      //   this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      // }
      // if (this.equipmentLayers) {
      //   this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      // }
      // if (this.pointPositionLayers) {this.TidalGrade
      //   this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      // }
      let listArr = [];
      if (this.$refs.leftTop.DataLakeLow !== false) {
        this.$refs.leftTop.tidalTimeIntervalCheckList.map(ele => {
          if (this.SjhArr[ele]) {
            let TimeArr = this.SjhArr[ele];
            TimeArr.map((item, id) => {
              if (id < 4) {
                listArr.push(item);
              } else {
                return;
              }
            });
          }
        });

        let abclistArr = listArr;

        // if (listArr.length >= 20) {
        //   // 太多了，先画20个
        //   for (let i = 0; i < 18; i++) {
        //     abclistArr = [...abclistArr, listArr[i]];
        //   }
        // } else {
        //   abclistArr = [...abclistArr, ...listArr];
        // }
        abclistArr.map((t, i) => {
          t.id = `${new Date().getTime()}${i}`;
          if (t.hasOwnProperty("trace") && t.trace.length > 0) {
            t.trace.map(e => {
              if (e.path) {
                e.path.map(el => {
                  let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                    el.point[0],
                    el.point[1]
                  );
                  if (
                    t.forwardTraffic &&
                    t.reverseTrafficFlow &&
                    t.reverseTrafficFlow > t.forwardTraffic
                  ) {
                    // 反向流量大于正向流量时
                    t.crossIdOnetude = t.crossIdOnetude
                      ? [
                          {
                            longitude: pointArr[0],
                            latitude: pointArr[1]
                          },
                          ...t.crossIdOnetude
                        ]
                      : [
                          {
                            longitude: pointArr[0],
                            latitude: pointArr[1]
                          }
                        ];
                  } else {
                    // 正向流量大于反向流量时
                    t.crossIdOnetude = t.crossIdOnetude
                      ? [
                          ...t.crossIdOnetude,
                          {
                            longitude: pointArr[0],
                            latitude: pointArr[1]
                          }
                        ]
                      : [
                          {
                            longitude: pointArr[0],
                            latitude: pointArr[1]
                          }
                        ];
                  }
                  // t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                });
              }
            });
            t.area = t.trace[0].districtId;
          }
        });
        // let tidalWatchdata=abclistArr;
        this.tidalWatchdata = abclistArr;
        // if (tidalWatchdata.length >= 20) {
        //   // 太多了，先画20个
        //   for (let i = 0; i < 18; i++) {
        //     this.tidalLewData = [...this.tidalLewData, tidalWatchdata[i]];
        //   }
        // } else {
        //   this.tidalLewData = [...this.tidalLewData, ...tidalWatchdata];
        // }
        // this.tidalWatchdata = [...this.tidalWatchdata, ...tidalWatchdata];
        // if (tidalWatchdata.length === 0) {
        //   this.$showSimpleMessage("暂无数据", "error");
        // }
        let dayNature = this.$refs.leftTop.tidalLowRadiodataType;
        let MsgData = this.MsgData;
        let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
        // tidalWatchdata.map(item=>{
        //   this.tidalWatchdata.map(i=>{
        //     if(item.id==i.id){
        //       this.tidalLewData.push(item)
        //     }
        //   })
        // })
        // console.log(this.tidalLewData)
        this.tidalFlowRenderinglayers(
          this.tidalWatchdata,
          dayNature,
          MsgData,
          timeIntervals
        ); // 再次重新绘制潮汐流
      } else {
        let ref = this.$refs.leftTop.sjhTide;
        if (ref === 1) {
          let dayNatrue = this.dayNatrue;
          let tidalCheckList = this.MsgData;
          let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList;
          this.ServationFor(tidalCheckList, timeIntervals, dayNatrue);
        } else {
          let tidalCopeArr = this.$tools.deepCopy(this.tidalCopeArr); // 再次深复制一份数据保持之前的数据没有改变
          let dataArr = [];
          data.map(ele => {
            if (tidalCopeArr[ele]) {
              dataArr = [...dataArr, ...tidalCopeArr[ele]];
            }
          });
          if (dataArr.length === 0) {
            this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // this.$showSimpleMessage("暂无数据", "error");
            return;
          }
          let abclistArr = [];
          if (dataArr.length >= 20) {
            // 太多了，先画20个
            for (let i = 0; i < 18; i++) {
              abclistArr = [...abclistArr, dataArr[i]];
            }
          } else {
            abclistArr = [...abclistArr, ...dataArr];
          }
          // abclistArr = [...abclistArr, ...dataArr];
          await abclistArr.map((t, i) => {
            t.id = `${new Date().getTime()}${i}`;
            if (t.hasOwnProperty("trace") && t.trace.length > 0) {
              t.trace.map(e => {
                if (e.path) {
                  e.path.map(el => {
                    let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                      el.point[0],
                      el.point[1]
                    );
                    if (
                      t.forwardTraffic &&
                      t.reverseTrafficFlow &&
                      t.reverseTrafficFlow > t.forwardTraffic
                    ) {
                      // 反向流量大于正向流量时
                      t.crossIdOnetude = t.crossIdOnetude
                        ? [
                            { longitude: pointArr[0], latitude: pointArr[1] },
                            ...t.crossIdOnetude
                          ]
                        : [{ longitude: pointArr[0], latitude: pointArr[1] }];
                    } else {
                      // 正向流量大于反向流量时
                      t.crossIdOnetude = t.crossIdOnetude
                        ? [
                            ...t.crossIdOnetude,
                            { longitude: pointArr[0], latitude: pointArr[1] }
                          ]
                        : [{ longitude: pointArr[0], latitude: pointArr[1] }];
                    }
                    // t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                  });
                }
              });
              t.area = t.trace[0].districtId;
            }
          });
          this.$refs.leftTop.sjhTide = 1;
          this.tidalWatchdata = [];
          this.tidalWatchdata = [...this.tidalWatchdata, ...abclistArr];
          //   console.log(this.tidalWatchdata);
          this.tidalFlowRenderinglayers(this.tidalWatchdata); // 拼凑潮汐流点位数据
          this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        }
      }
    },
    // 获取潮汐流等级
    TidalcurrentgradeData() {
      axios
        .get("tideSunsetRestrict/")
        .then(res => {
          let tidalCurrentGrade = [];
          let tideSunsetRestricts = [];
          for (let i = 1; i <= res.data.data.length; i++) {
            tideSunsetRestricts.push(i);
            let className = "";
            let name = "";
            switch (i) {
              case 1:
                className = "tidalClassA";
                name = "一级潮汐流";
                break;
              case 2:
                className = "tidalClassB";
                name = "二级潮汐流";
                break;
              case 3:
                className = "tidalClassC";
                name = "三级潮汐流";
                break;
              case 4:
                className = "tidalClassD";
                name = "四级潮汐流";
                break;
              case 5:
                className = "tidalClassE";
                name = "五级潮汐流";
                break;
            }
            tidalCurrentGrade = [
              ...tidalCurrentGrade,
              { label: name, value: name, class: className }
            ];
          }
          let dayNatrue = "工作日"; //时间类型dayNature
          // let tidalCheckLists = [1, 2, 3, 4, 5]; // 潮汐流级别
          this.MsgData = tideSunsetRestricts;
          this.tidalWatchdata = [];
          let timeIntervals = this.$refs.leftTop.tidalTimeIntervalCheckList; // 潮汐流时间段
          this.Initialization = 1;
          this.TidalCurrentQuery = true;
          this.ServationFor(tideSunsetRestricts, timeIntervals, dayNatrue); //调用潮汐流观测/规律
          this.$refs.leftTop.tidalCurrentGrade = [...tidalCurrentGrade];
          // 潮汐流级别默认全选，默认接口里没级别参数
          this.$refs.leftTop.tidalCheckList = [];
          tidalCurrentGrade.map(t => {
            this.$refs.leftTop.tidalCheckList.push(t.value);
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    // 等级重新拼凑
    Tidallevelup() {
      return new Promise((resolve, reject) => {
        let tidalCheckList = [];
        this.$refs.leftTop.tidalCheckList.map(t => {
          switch (t) {
            case "一级潮汐流":
              tidalCheckList = [...tidalCheckList, 1];
              break;
            case "二级潮汐流":
              tidalCheckList = [...tidalCheckList, 2];
              break;
            case "三级潮汐流":
              tidalCheckList = [...tidalCheckList, 3];
              break;
            case "四级潮汐流":
              tidalCheckList = [...tidalCheckList, 4];
              break;
            case "五级潮汐流":
              tidalCheckList = [...tidalCheckList, 5];
              break;
          }
        });
        // console.log(tidalCheckList);
        // 调用潮汐流观测接口
        resolve(tidalCheckList); // 返回参数
      });
    },
    // 循环调用潮汐流观测/规律
    ServationFor(tidalCheckList, timeIntervals, dayNatrue) {
      // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
      let tidalCheckLists = "";
      let currentPage = 1;
      let ref = tidalCheckList;
      // for( let i = 1;i<=4;i+++){
      // for(let i = 1;i<=2;i++){TimeType
      // 判断当前页面是潮汐流观测/规律
      if (this.pageStatus === "tidalWatch") {
        ref.map(item => {
          let tidalFlowLevel = item;
          this.tidalObservationData(tidalFlowLevel, currentPage);
        });
      } else {
        // let tidalLowRadiodataType = this.$refs.leftTop.tidalLowRadiodataType;// 潮汐流时间段
        let TimeType = this.TimeType;
        TimeType.map(item => {
          item.flag = 0;
          if (dayNatrue === item.name) {
            item.flag = 1;
          }
        });

        setTimeout(() => {
          this.TidalCurrentLaw(
            tidalCheckList,
            currentPage,
            timeIntervals,
            dayNatrue
          );
        });
        // })
      }
      // }
    },

    // 调用潮汐流观测数据
    tidalObservationData(tidalFlowLevel, currentPage) {
      let _this = this;
      // let params = {
      //   searchTime: 3
      // };
      // if (data) {
      //   params.tidalFlowLevel = data;
      // }
      // // 添加地图层级和四角坐标
      // params.scale = this.MapZoomLevel; // 地图当前层级
      // params.windowLocation = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      // this.TidalUrlData = this.$tools.deepCopy(params); // 重新赋值参数
      // this.TidalUrlData.type = "tidalWatch";
      // if ((data && !data.tidalFlowLevel) || !data) {
      //     this.TidalUrlData.tidalCheckList = await this.Tidallevelup(); // 等级重新赋值一下，不然默认没选定时刷新和拖动重新请求会出问题
      // }
      // return new Promise((resolve, reject) => {
      axios
        .get(
          `operations/flowObser?tidalFlowLevel=${tidalFlowLevel}`
        )
        .then(res => {
          let ref = res.data.data;
          if (ref.length === 0) {
            currentPage = 1;
            this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          } else {
            let roads = ref;
            if (roads) {
              roads.map((t, i) => {
                t.id = `${new Date().getTime()}${i}`;
                // t.trace = JSON.parse(t.trace)
                if (t.hasOwnProperty("trace") && t.trace.length > 0) {
                  let refs = JSON.parse(t.trace);
                  t.trace = refs;
                  refs.map(e => {
                    if (e.path) {
                      e.path.map(el => {
                        let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                          el.point[0],
                          el.point[1]
                        );
                        if (
                          t.forwardTraffic &&
                          t.reverseTrafficFlow &&
                          t.reverseTrafficFlow > t.forwardTraffic
                        ) {
                          // 反向流量大于正向流量时
                          t.crossIdOnetude = t.crossIdOnetude
                            ? [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                },
                                ...t.crossIdOnetude
                              ]
                            : [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ];
                        } else {
                          // 正向流量大于反向流量时
                          t.crossIdOnetude = t.crossIdOnetude
                            ? [
                                ...t.crossIdOnetude,
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ]
                            : [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ];
                        }
                        // t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                      });
                    }
                  });
                  t.area = refs[0].districtId;
                }
              });
              // this.tidalWatchdata = [];
              this.tidalWatchdata = [...this.tidalWatchdata, ...roads];
              this.TidalWatchRenderinglayers(this.tidalWatchdata);
            } else {
              resolve([]);
            }
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });
      // });
    },
    // 调用潮汐流规律
    TidalCurrentLaw(tidalFlowLevel, currentPage, timeIntervals, dayNatrue) {
      // http://211.159.188.107:8080/wit_harns_service/operations/getRedisPage?currentPage=1&keys=TidalFlowrule工作日6点到9点1
      // let aa= Qs.stringify({timeIntervals: ['0点到3点']},{arrayFormat: 'brackets'})
      let tidalFlowLevels = JSON.stringify(tidalFlowLevel);
      let timeInterval = JSON.stringify(timeIntervals);
      // this.mapFullscreenLoding(); // 打开全屏loding
      let TimeInterval = this.$refs.leftTop.tidalTimeIntervalCheckList; //获取潮汐流规律时间段
      let tidalLowRadiodataType = this.$refs.leftTop.tidalLowRadiodataType; // 获取潮汐流规律单选框

      let item = {
        tidalFlowLevels: tidalFlowLevels,
        timeIntervals: timeInterval,
        // tidalFlowLevels : tidalFlowLevel,
        dayNatures: dayNatrue,
        // currentPage: currentPage
      };
      if (tidalFlowLevel.length == 0) {
        // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        this.$showSimpleMessage("请选择重新潮汐流级别", "error");
        return;
      }
      if (timeIntervals.length == 0) {
        // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        this.$showSimpleMessage("请选择重新时间段", "error");
        return;
      }

      if (tidalLowRadiodataType !== dayNatrue) {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
        return;
      } else {
        // if (TidalCurrent!==tidalFlowLevels) {
        //   this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        //   return;
        // }
        axios
          .get("/operations/tidalFlowrule",
        //   {params:item}
          ).then(res => {
            if (this.pageStatus !== "tidalLow") {
              this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
            } else {
              let ref = res.data.data;
              let TidalCurrent = this.TidalCurrent;
              if (ref.length == 0 && currentPage == 1) {
                this.$showSimpleMessage("暂无数据", "error");
                return;
              }
                let abclistArr = ref;
                ref.map((t,i) => {
                //   let roads = item;
                  let Lowarr = [];
                  if (t) {

                    this.tidalCopeArr = this.$tools.deepCopy(res.data.data); // 深复制一份数据
                    let listArr = [];
                      t.id = `${new Date().getTime()}${i}`;
                      let ref = JSON.parse(t.trace);
                      if (t.hasOwnProperty("trace") && ref.length > 0) {
                        ref.map(e => {
                          if (e.path) {
                            e.path.map(el => {
                              let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                                el.point[0],
                                el.point[1]
                              );
                              if (
                                t.forwardTraffic &&
                                t.reverseTrafficFlow &&
                                t.reverseTrafficFlow > t.forwardTraffic
                              ) {
                                // 反向流量大于正向流量时
                                t.crossIdOnetude = t.crossIdOnetude
                                  ? [
                                      {
                                        longitude: pointArr[0],
                                        latitude: pointArr[1]
                                      },
                                      ...t.crossIdOnetude
                                    ]
                                  : [
                                      {
                                        longitude: pointArr[0],
                                        latitude: pointArr[1]
                                      }
                                    ];
                              } else {
                                // 正向流量大于反向流量时
                                t.crossIdOnetude = t.crossIdOnetude
                                  ? [
                                      ...t.crossIdOnetude,
                                      {
                                        longitude: pointArr[0],
                                        latitude: pointArr[1]
                                      }
                                    ]
                                  : [
                                      {
                                        longitude: pointArr[0],
                                        latitude: pointArr[1]
                                      }
                                    ];
                              }
                            });
                          }
                        });
                        t.area = ref[0].districtId;
                        t.trace = ref;
                      }
                      try {

                          this.tidalWatchdata = [
                            ...abclistArr
                          ];
                      } catch (error) {
                          console.log(error);

                      }

                    // setTimeout(() => {
                      this.tidalFlowRenderinglayers(
                        abclistArr,
                        dayNatrue,
                        tidalFlowLevel,
                        timeIntervals
                      );
                    // }, 1000);
                  } else {
                    this.tidalCopeArr = [];
                    resolve([]);
                  }
                });
            }
          })
          .catch(error => {
            // _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // this. $showSimpleMessage("暂无数据", "error");
          });
      }
    },
    // 点击搜索调用数据湖的潮汐流规律接口
    async ShujuhuitidalLawData(data) {
      let _this = this;
      let params = {};
      if (!data) {
        params.dayNature = this.dayNature;
      } else {
        params = data;
      }
      // 添加地图层级和四角坐标
      params.scale = this.MapZoomLevel; // 地图当前层级
      params.windowLocation = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      this.TidalUrlData = this.$tools.deepCopy(params); // 重新赋值参数
      this.TidalUrlData.type = "tidalLow";
      // if ((data && !data.tidalFlowLevel) || !data) {
      //     this.TidalUrlData.tidalCheckList = await this.Tidallevelup(); // 等级重新赋值一下，不然默认没选定时刷新和拖动重新请求会出问题
      // }
      return new Promise((resolve, reject) => {
        sjhAxios
          .post("sjh2/strategysupport/tidalFlow/rule", params)
          .then(res => {
            // console.log(res);
            this.SjhArr = res.data.data;
            if (res.data.data) {
              this.tidalCopeArr = this.$tools.deepCopy(res.data.data); // 深复制一份数据
              let listArr = [];
              if (
                this.$refs.leftTop.tidalTimeIntervalCheckList.length > 0 &&
                this.$refs.leftTop.tidalTimeIntervalCheckList.length <= 8
              ) {
                // 长度大于0小于8或者等于8说明有选择时段
                let isNull = true;
                this.$refs.leftTop.tidalTimeIntervalCheckList.map(ele => {
                  if (res.data.data[ele]) {
                    let TimeArr = res.data.data[ele];
                    if (TimeArr.length !== 0) {
                      isNull = false;
                    }
                    TimeArr.map((item, id) => {
                      if (id < 4) {
                        listArr.push(item);
                      } else {
                        return;
                      }
                    });
                  }
                });
                if (isNull == true) {
                  _this.$showSimpleMessage("暂无数据", "error");
                }
              } else if (
                this.$refs.leftTop.tidalTimeIntervalCheckList.length === 0
              ) {
                // 长度为0说明没有选择时段
                listArr = [];
              }
              let abclistArr = listArr;
              // if (listArr.length >= 20) {
              //   // 太多了，先画20个
              //   for (let i = 0; i < 18; i++) {
              //     abclistArr = [...abclistArr, listArr[i]];
              //   }
              // } else {
              //   abclistArr = [...abclistArr, ...listArr];
              // }
              // abclistArr = [...abclistArr, ...listArr];
              //   console.log(abclistArr);
              abclistArr.map((t, i) => {
                t.id = `${new Date().getTime()}${i}`;
                if (t.hasOwnProperty("trace") && t.trace.length > 0) {
                  t.trace.map(e => {
                    if (e.path) {
                      e.path.map(el => {
                        let pointArr = GisClassMethod.baiduTurnsTogoldenVirtue(
                          el.point[0],
                          el.point[1]
                        );
                        t.crossIdOnetude = []
                        if (
                          t.forwardTraffic &&
                          t.reverseTrafficFlow &&
                          t.reverseTrafficFlow > t.forwardTraffic
                        ) {
                          // 反向流量大于正向流量时
                          t.crossIdOnetude = t.crossIdOnetude
                            ? [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                },
                              ]
                            : [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ];
                        } else {
                          // 正向流量大于反向流量时
                          t.crossIdOnetude = t.crossIdOnetude
                            ? [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ]
                            : [
                                {
                                  longitude: pointArr[0],
                                  latitude: pointArr[1]
                                }
                              ];
                        }
                        // t.crossIdTwotude = t.crossIdTwotude ? [{ longitude: e.longitude, latitude: e.latitude }, ...t.crossIdTwotude] : [{ longitude: e.longitude, latitude: e.latitude }];
                      });
                    }
                  });
                  t.area = t.trace[0].districtId;
                }
              });
              resolve(abclistArr);
            } else {
              this.tidalCopeArr = [];
              resolve([]);
            }
          })
          .catch(error => {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this. $showSimpleMessage(error, "error");
          });
      });
    },
    TidalWatchRenderinglayers(dataArrs) {
      if (this.pageStatus !== "tidalWatch") {
        // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        return;
      }
      // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈

      let data = [];
      dataArrs.map(ele => {
        //  && ele.crossIdTwotude
        if (ele.crossIdOnetude) {
          let obj = {};
          let cc = [];
          let locationPonitObjo = [];
          let locationPonitObjp = [];
          let locationPonitObjcrossIdOnetudeArrs = ele.crossIdOnetude;
          // let locationPonitObjcrossIdTwotudeArrs = ele.crossIdTwotude;
          locationPonitObjcrossIdOnetudeArrs.map((item, id) => {
            let obja = { point: [item.longitude, item.latitude] };
            locationPonitObjo.push(obja);
          });
          obj.locationPonitObjo = locationPonitObjo;
          // obj.locationPonitObjp = locationPonitObjp;
          obj.locationPonitObjp = [];
          obj.tidalFlowLevel = ele.tidalFlowLevel; // 潮汐流级别
          obj.id = ele.id;
          data.push(obj);
        }
      });
      // 开始绘制潮汐流图层
      data.map(async t => {
        let zIndex = t.tidalFlowLevel;
        if (zIndex == 1) {
          zIndex = 4;
        } else if (zIndex == 2) {
          zIndex = 3;
        } else if (zIndex == 3) {
          zIndex = 2;
        } else {
          zIndex = 1;
        }
        let TidalFlowRendering = await GisClassMethod.TidalFlowRendering(
          t,
          zIndex
        );
        let linColor = "";
        if (t.tidalFlowLevel === 1) {
          linColor = "#cd0a0a";
        } else if (t.tidalFlowLevel === 2) {
          linColor = "#b85be4";
        } else if (t.tidalFlowLevel === 3) {
          linColor = "#2f82ff";
        } else if (t.tidalFlowLevel === 4) {
          linColor = "#2afbea";
        } else {
          linColor = "#2bdf27";
        }
        var amount = t.locationPonitObjo.length;
        this.amount = amount;
        // deb??ugger
        let TidalCurrentDirection = GisClassMethod.TidalCurrentDirection(
          this.mapGis,
          TidalFlowRendering,
          t.id,
          linColor,
          amount
        ); // 添加箭头图标
        this.mapGis = TidalCurrentDirection[0];
        TidalFlowRendering = TidalCurrentDirection[1];
        this.mapGis.addLayer(TidalFlowRendering); // 添加新的箭头线图层
      });
      setTimeout(() => {
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },
    // 拼凑数据然后绘制潮汐流规律图层
    async tidalFlowRenderinglayers(
      dataArrs,
      dayNatrue,
      tidalFlowLevel,
      timeIntervals
    ) {
      // 拼凑潮汐流点位数据
      // let TimeType = this.TimeType
      // let tt = TimeType.find(t => t.name === dayNatrue);
      // let isJumpOut = tt.flag === 0;
      // if (isJumpOut) {
      //   // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
      //   return;
      // }
      if (this.pageStatus !== "tidalLow") {
        // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        return;
      }
      // this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈

      let data = [];
      await dataArrs.map(ele => {
        //  && ele.crossIdTwotude
        if (ele.crossIdOnetude) {
          let obj = {};
          let cc = [];
          let locationPonitObjo = [];
          let locationPonitObjp = [];
          let locationPonitObjcrossIdOnetudeArrs = ele.crossIdOnetude;
        //   let locationPonitObjcrossIdTwotudeArrs = ele.crossIdTwotude;
          locationPonitObjcrossIdOnetudeArrs.map((item, id) => {
            let obja = { point: [item.longitude, item.latitude] };
            locationPonitObjo.push(obja);
          });
        //   locationPonitObjcrossIdTwotudeArrs.map(t => {
        //       let objb = {point: coordtransform.wgs84togcj02(t.longitude, t.latitude)};
        //       locationPonitObjp.push(objb);
        //   });
          obj.locationPonitObjo = locationPonitObjo;
        //   obj.locationPonitObjp = locationPonitObjp;
          obj.locationPonitObjp = [];
          obj.tidalFlowLevel = ele.tidalFlowLevel; // 潮汐流级别
          obj.id = ele.id;
          data.push(obj);
        }
      });
      if (this.pageStatus == "tidalLow") {
        let tidalLowRadiodataType = this.$refs.leftTop.tidalLowRadiodataType; // 潮汐流时间段
        let timeInterval = this.$refs.leftTop.tidalTimeIntervalCheckList; //获取潮汐流规律时间段
        if (
          tidalLowRadiodataType !== dayNatrue ||
          this.MsgData.length !== tidalFlowLevel.length ||
          timeInterval.length !== timeIntervals.length
        ) {
          // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
          this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          return;
        }
      } else {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层asdfg
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      }

      // 开始绘制潮汐流图层
      data.map( t => {
        let zIndex = t.tidalFlowLevel;
        if (zIndex == 1) {
          zIndex = 4;
        } else if (zIndex == 2) {
          zIndex = 3;
        } else if (zIndex == 3) {
          zIndex = 2;
        } else {
          zIndex = 1;
        }
            let TidalFlowRendering =  GisClassMethod.TidalFlowRendering(
                t,
              zIndex
            );
        let linColor = "";
        if (t.tidalFlowLevel === 1) {
          linColor = "#cd0a0a";
        } else if (t.tidalFlowLevel === 2) {
          linColor = "#b85be4";
        } else if (t.tidalFlowLevel === 3) {
          linColor = "#2f82ff";
        } else if (t.tidalFlowLevel === 4) {
          linColor = "#2afbea";
        } else {
          linColor = "#2bdf27";
        }
        var amount = t.locationPonitObjo.length;
        this.amount = amount;
        let TidalCurrentDirection = GisClassMethod.TidalCurrentDirection(
          this.mapGis,
          TidalFlowRendering,
          t.id,
          linColor,
          amount
        ); // 添加箭头图标
        this.mapGis = TidalCurrentDirection[0];
        TidalFlowRendering = TidalCurrentDirection[1];
        this.mapGis.addLayer(TidalFlowRendering); // 添加新的箭头线图层
      });
      setTimeout(() => {
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },

    // 交通构成观测
    trafficWatch(pra) {
      let _this = this;
      if (!pra) {
        // let mapGis = this.mapGis;
        // this.mapGis.getView().setMinZoom(12);
        // this.mapGis.getView().setMaxZoom(12);
        // let pan = getPan();
        // //false：当前地图不可拖动。true：可拖动
        // pan.setActive(false);
        // function getPan() {
        //     let pan;
        //     mapGis.getInteractions().forEach(function(element, index, array) {
        //         if(element instanceof ol.interaction.DragPan) {
        //             pan = element;
        //         }
        //     })
        //     return pan;
        // };
        // 117.39026557151529, 38.96726240534392
        this.mapGis.getView().setZoom(12);
        let center = ol.proj.fromLonLat([
          // 117.39026557151529,
          // 38.96726240534392
		  120.125347,32.540074
        ]);
        this.mapGis.getView().setCenter(center);
        let area = this.$store.state.area;
        // 绘画八个区域
        store.commit("statuLoadingState", true);
        //  area.map(val => {
        let searchType = "tj_bound2";
        let name = "Layer";
        // let queryString = val.name;
        let testUrl =
          "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
          searchType +
          '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
          searchType +
          '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
          name +
          "</PropertyName><Literal>" +
          "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
          name +
          "</PropertyName><Literal>" +
          "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
        geoAxios
          .get(testUrl)
          .then(async res => {
            // store.commit("statuLoadingState", true);
            let coordinates = res.data.features;
            // let aa = coordinates[0].geometry.coordinates[0];
            // aa = aa.splice(0,1);
            // coordinates[0].geometry.coordinates = [aa];
            let layer1 = "";
            let layer2 = "";
            let layer3 = "";
            let layer4 = "";
            let layer5 = "";
            let layer6 = "";
            let layer7 = "";
            let layer8 = "";

            coordinates.map(val => {
              switch (val.id) {
                case "tj_bound2.1":
                  if (layer1 === "") {
                    layer1 = val;
                  } else {
                    layer1.geometry.coordinates[0][0] = [
                      ...layer1.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.2":
                  if (layer2 === "") {
                    layer2 = val;
                  } else {
                    layer2.geometry.coordinates[0][0] = [
                      ...layer2.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.3":
                  if (layer3 === "") {
                    layer3 = val;
                  } else {
                    layer3.geometry.coordinates[0][0] = [
                      ...layer3.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.4":
                  if (layer4 === "") {
                    layer4 = val;
                  } else {
                    layer4.geometry.coordinates[0][0] = [
                      ...layer4.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.5":
                  if (layer5 === "") {
                    layer5 = val;
                  } else {
                    layer5.geometry.coordinates[0][0] = [
                      ...layer5.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.6":
                  if (layer4 === "") {
                    layer4 = val;
                  } else {
                    layer4.geometry.coordinates[0][0] = [
                      ...layer4.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.7":
                  if (layer6 === "") {
                    layer6 = val;
                  } else {
                    layer6.geometry.coordinates[0][0] = [
                      ...layer6.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0]
                    ];
                  }
                  break;
                case "tj_bound2.8":
                  if (layer7 === "") {
                    layer7 = val;
                  } else {
                    layer7.geometry.coordinates[0][0] = [
                      ...layer7.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer7.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
                case "tj_bound2.9":
                  if (layer8 === "") {
                    layer8 = val;
                  } else {
                    layer8.geometry.coordinates[0][0] = [
                      ...layer8.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer8.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
                case "tj_bound2.10":
                  if (layer2 === "") {
                    layer2 = val;
                  } else {
                    layer2.geometry.coordinates[0][0] = [
                      ...layer2.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer2.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
                case "tj_bound2.11":
                  if (layer7 === "") {
                    layer7 = val;
                  } else {
                    layer7.geometry.coordinates[0][0] = [
                      ...layer7.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer7.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
                case "tj_bound2.12":
                  if (layer8 === "") {
                    layer8 = val;
                  } else {
                    layer8.geometry.coordinates[0][0] = [
                      ...layer8.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer8.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
                case "tj_bound2.13":
                  if (layer2 === "") {
                    layer2 = val;
                  } else {
                    layer2.geometry.coordinates[0][0] = [
                      ...layer2.geometry.coordinates[0][0],
                      ...val.geometry.coordinates[0][0],
                      layer2.geometry.coordinates[0][0][0]
                    ];
                  }
                  break;
              }
            });
            let arr = [
              layer1,
              layer2,
              layer3,
              layer4,
              layer5,
              layer6,
              layer7,
              layer8
            ];
            arr.map((val, index) => {
              let pointArr = [];
              val.geometry.coordinates[0][0].map(item => {
                let points = [];
                points = coordtransform.wgs84togcj02(item[0], item[1]);
                pointArr.push(points);
              });
              val.geometry.coordinates[0][0] = pointArr;
              let layerName = "";
              switch (index) {
                case 0:
                  layerName = "咸水沽镇";
                  break;
                case 1:
                  layerName = "双港镇";
                  break;
                case 2:
                  layerName = "葛沽镇";
                  break;
                case 3:
                  layerName = "辛庄镇";
                  break;
                case 4:
                  layerName = "北闸口镇";
                  break;
                case 5:
                  layerName = "小站镇";
                  break;
                case 6:
                  layerName = "八里台镇";
                  break;
                case 7:
                  layerName = "双桥河镇";
                  break;
              }
              let geojsonObject = {
                type: "FeatureCollection",
                totalFeatures: 1,
                features: [val],
                crs: {
                  type: "name",
                  properties: {
                    name: "EPSG:4326"
                  }
                }
              };

              setTimeout(() => {
                let vectorSource = new ol.source.Vector({
                  features: new ol.format.GeoJSON({
                    featureProjection: "EPSG:3857"
                  }).readFeatures(geojsonObject)
                });
                if (this.pageStatus !== "trafficWatch") {
                  return;
                }
                let color = this.colors.find(t => t.name === layerName).color;
                let layer = new ol.layer.Vector({
                  source: vectorSource,
                  style: new ol.style.Style({
                    fill: new ol.style.Fill({
                      color: "rgba(" + color + ",0.7)"
                    }),
                    // stroke: new ol.style.Stroke({
                    //     color: "#0087e6",
                    //     width: 2
                    // }),
                    // image: new ol.style.Circle({
                    //     radius: 10,
                    //     fill: new ol.style.Fill({
                    //     color: "#ffcc33"
                    //     })
                    // }),
                    text: new ol.style.Text({
                      font: "13px Microsoft YaHei",
                      // text:  layerName,
                      fill: new ol.style.Fill({
                        color: "#444546"
                      })
                    })
                  })
                });
                this.mapGis.addLayer(layer);
                // 关闭全屏loding
                if (_this.mapLoading) {
                  _this.mapLoading.close();
                  _this.mapLoading = "";
                }
              }, 200);
            });
          })
          .catch(error => {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this. $showSimpleMessage(error, "error");
          });
        // });
        setTimeout(() => {
          store.commit("statuLoadingState", false);
        }, 200);

        // 请求八个区域的数据
        let result = [];
        // sjhAxios
        //   .post("sjh2/strategysupport/trafficComposition/obser", {
        //     timeStr: this.$tools.setTimeUse()
        //   })
        //   .then(res => {
            result = trafficComposition.trafficComposition.data;
            this.trafficWatchList = result;
            this.trafficWatchAllcharts(); // 调用函数绘制全部echarts图表
        //   })
        //   .catch(error => {
        //     // this. $showSimpleMessage(error, "error");
        //   });
        if (this.trafficWatchTimer === "") {
          this.trafficWatchTime();
        }
        return;
      }
      if (pra.result.length > 0) {
        this.trafficWatchList = pra.result;
        let area = pra.area;
        let data = pra.result.find(t => t.areaId === area);
        let trafficComNumbername = this.$store.state.area.find(
          t => t.id === area
        );
        if (trafficComNumbername) {
          this.trafficComNumber.name = trafficComNumbername.name;
        } else {
          this.trafficComNumber.name = this.$store.state.area.find(
            t => t.name === area
          ).name;
        }
        if (data) {
          this.trafficComNumber.value = [
            (data.arriveTrafficProp * 100).toFixed(1),
            (data.leaveTrafficProp * 100).toFixed(1),
            (data.interTrafficProp * 100).toFixed(1),
            (data.transitTrafficProp * 100).toFixed(1)
          ];
        }
      }
      setTimeout(() => {
        // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
        //  if (this.QingbaocoordinateTracingPointImg) {
        //     this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
        // }
        // if (this.PiontCoordinateLocus) {
        //     this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
        // }
        // if (this.equipmentLayers) {
        //     this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
        // }
        // if (this.pointPositionLayers) {
        //     this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
        // }
        let pointArr = [];
        let mapShow = this.$tools.deepCopy(pra);
        mapShow.coordinates[0].geometry.coordinates[0][0].map(item => {
          let points = [];
          points = coordtransform.wgs84togcj02(item[0], item[1]);
          pointArr.push(points);
        });
        mapShow.coordinates[0].geometry.coordinates[0][0] = pointArr;
        let geojsonObject = {
          type: "FeatureCollection",
          totalFeatures: 1,
          features: mapShow.coordinates,
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
        this.mapSearchLayer = new ol.layer.Vector({
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
        this.mapGis.addLayer(this.mapSearchLayer);
      });
    },
    // 交通构成的定时
    trafficWatchTime() {
      let _this = this;
      setTimeout(() => {
        this.trafficWatchTimer = setInterval(() => {
          this.mapFullscreenLoding(); // 打开全屏loding
          // 请求八个区域的数据
          let result = [];
          sjhAxios
            .post("sjh2/strategysupport/trafficComposition/obser", {
              timeStr: this.$tools.setTimeUse()
            })
            .then(res => {
              result = res.data.data;
              this.trafficWatchList = result;

              // 数据刷新完毕后重新绘制图表
              // _this.mapGis.getOverlays().clear(); // 清除所有的Overlay层
              // _this.reAddingLayer("trafficWatchTime"); // 再次添加标记，测距，区域图层和覆盖层
              if (_this.trafficWatchOverlayArr.length > 0) {
                _this.trafficWatchOverlayArr.map(ele => {
                  _this.mapGis.removeOverlay(ele);
                });
              }
              _this.trafficWatchAllcharts();
              // 关闭全屏loding
              if (_this.mapLoading) {
                _this.mapLoading.close();
                _this.mapLoading = "";
              }
            })
            .catch(error => {
              _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              //   _this. $showSimpleMessage(error, "error");
            });
        }, 3 * 60 * 1000);
      });
    },
    // 当进入交通构成绘制区域完成，并且获取到八个镇的时候后调用，一次全部绘制完八个镇的图表
    trafficWatchAllcharts() {
      this.trafficWatchOverlayArr = [];
      if (this.trafficWatchList && this.trafficWatchList.length > 0) {
        this.trafficWatchList.map((t, i) => {
          let measureTooltipElement, measureTooltip, position, radiusA, radiusB;
          let Nodea = this.trafficWatchSaveDom.cloneNode(true);
          Nodea.style.display = "block"; // 把节点的display属性改为block，之前是在周期里改，出问题了哈哈哈哈id="trafficWatchEarchBody"
          let Nodeb = Nodea.getElementsByClassName(
            "d_trafficWatchEarchBody"
          )[0];
          if (this.MapZoomLevel === 12) {
            Nodeb.style.width = "180px";
            Nodeb.style.height = "100px";
            radiusA = ["50%", "70%"];
            radiusB = ["20%", "10%"];
          } else if (this.MapZoomLevel === 13) {
            Nodeb.style.width = "230px";
            Nodeb.style.height = "150px";
            radiusA = ["55%", "75%"];
            radiusB = ["25%", "15%"];
          } else {
            Nodeb.style.width = "180px";
            Nodeb.style.height = "100px";
            radiusA = ["50%", "70%"];
            radiusB = ["20%", "10%"];
          }
          Nodeb.setAttribute("id", `trafficWatchEarchBody${i + 1}`);
          measureTooltipElement = Nodea;
          measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [-10, 0],
            // autoPan: true,
            // autoPanAnimation: {
            //     duration: 20
            // },
            positioning: "bottom-center",
            id: t.areaId
          });
          this.mapGis.addOverlay(measureTooltip);
          // 设置中心点
          switch (t.areaId) {
            case "北闸口镇":
              position = ol.proj.transform(
                [117.39561080932616, 38.92910179895563],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "双桥河镇":
              position = ol.proj.transform(
                [117.4459593811035, 38.9835649959648],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "八里台镇":
              position = ol.proj.transform(
                [117.32522964477538, 38.91120524619657],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "辛庄镇":
              position = ol.proj.transform(
                [117.34891891479488, 39.001443286246825],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "小站镇":
              position = ol.proj.transform(
                [117.44607925415036, 38.89891544746976],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "双港镇":
              position = ol.proj.transform(
                [117.29158401489256, 39.026518647020055],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "咸水沽镇":
              position = ol.proj.transform(
                [117.38995413208006, 38.97435903515612],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
            case "葛沽镇":
              position = ol.proj.transform(
                [117.5089073181152, 38.96221186837823],
                "EPSG:4326",
                "EPSG:3857"
              );
              break;
          }
          measureTooltip.setPosition(position);
          // 调用函数初始化echarts图表
          let trafficComNumber = [
            (t.arriveTrafficProp * 100).toFixed(1),
            (t.leaveTrafficProp * 100).toFixed(1),
            (t.interTrafficProp * 100).toFixed(1),
            (t.transitTrafficProp * 100).toFixed(1)
          ];
          this.trafficAllEcharts(
            `trafficWatchEarchBody${i + 1}`,
            trafficComNumber,
            t.areaId,
            radiusA,
            radiusB
          );
          this.trafficWatchOverlayArr.push(measureTooltip);
        });
      }
    },
    // 交通构成的移入事件默认展示所有
    trafficAllEcharts(idName, dataArr, qyname, radiusA, radiusB) {
      let myChart = this.$echarts.init(document.getElementById(idName));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {d}%"
        },
        color: ["#c0a020", "#206fc0", "#20c0be", "#00c645"],
        series: [
          {
            name: qyname,
            type: "pie",
            center: ["55%", "50%"],
            radius: radiusA,
            // avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{c}%",
                color: "#403d3d",
                fontWeight: "bold"
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 5,
                lineStyle: {
                  color: "#403d3d"
                }
              }
            },
            // itemStyle:{
            //     color:["#c0a020","#206fc0","#20c0be","#00c645"]
            // },
            data: [
              { value: dataArr[0], name: "到达交通比例" },
              { value: dataArr[1], name: "驶离交通比例" },
              { value: dataArr[2], name: "内部交通比例" },
              { value: dataArr[3], name: "过境交通比例" }
            ]
          },
          {
            name: qyname,
            type: "pie",
            center: ["55%", "40%"],
            radius: radiusB,
            label: {
              normal: {
                show: true,
                color: "#403d3d",
                fontWeight: "bold",
                position: "inner"
              }
            },
            data: [{ value: 0, name: qyname }],
            tooltip: {
              show: false
            },
            itemStyle: {
              color: "transparent"
            }
          }
        ]
      };
      myChart.setOption(option);
    },

    // 营运车辆观测/规律
    carWatch(typeData) {
      this.eraseTimer(); // 清除定时器
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
      if (this.pageStatus === "carWatch") {
        // this.eraseTimer(); // 清除定时器
        let _this = this;
        this.operatingVehiclesTimers(); // 启动营运车辆定时器
      } else {
        this.eraseTimer(); // 清除定时器
      }
      setTimeout(async () => {
        // 营运车辆类型默认全选，默认接口里没车辆类型参数
        this.$refs.leftTop.carCheckList = [];
        this.$refs.leftTop.carCheckList = ["7", "1", "2", "4", "5", "6", "3"];

        // if (!typeData) {
        //   this.pageStatus = "carWatch";
        // }
        if (this.pageStatus === "carWatch") {
          // 调用营运车辆观测数据湖接口
          this.operatingVehicles = await this.OperatingVehicle();
          this.$store.commit("statuLoadingState", true); // 打开缓冲图标
          if (this.operatingVehicles.length === 0) {
            this.$showSimpleMessage("暂无数据", "error");
          }
        //   this.operationVehiclelayer(this.operatingVehicles); // 拼凑营运车辆点位数据
          // this.operatingVehiclesTimers(); // 启动营运车辆定时器
          // if (this.carTimer === "") {
          // }
        } else {
          this.eraseTimer(); // 清除定时器
          // 调用营运车辆规律默认接口
          // 营运规律柱形图
          this.OperatingLawFor();
          let data = await this.LawColumnDiagram();

          this.operatingIndexdata = data.operatingIndexdata;
          this.operatingDataArrs = [...this.operatingIndexdata]; // 全局存一下
          this.operatingData = [...this.operatingIndexdata]; // 传给图表组件渲染
          this.$store.commit("statuLoadingState", true); // 打开缓冲图标
          this.operatingVehicles = [];
          // 营运规律点位数据

        //   if (operatingVehicles.length >= 18) {
        //     // 太多了，先画20个
        //     for (let i = 0; i < 18; i++) {
        //       this.operatingVehicles = [
        //         ...this.operatingVehicles,
        //         operatingVehicles[i]
        //       ];
        //     }
        //   } else {
        //     this.operatingVehicles = [
        //       ...this.operatingVehicles,
        //       ...operatingVehicles
        //     ];
        //   }
        //   this.operatingVehicles = [
        //     ...this.operatingVehicles,
        //     ...operatingVehicles
        //   ];
          //   console.log(this.operatingVehicles);
          //   console.log(this.operatingIndexdata);
          this.operatingDataArrs = [...this.operatingIndexdata]; // 全局存一下
          this.operatingData = [...this.operatingIndexdata]; // 传给图表组件渲染
          this.operationVehiclelayer(this.operatingVehicles); // 拼凑营运车辆点位数据
        }
      });
    },

    // 营运车辆规律左上角搜索
    async carsearchEvent(data, typeName) {
      this.mapFullscreenLoding(); // 打开全屏loding
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
      this.reAddingLayer(null, "carsearchEvent"); // 再次添加标记，测距，区域图层和覆盖层
      if (this.QingbaocoordinateTracingPointImg) {
        this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
      }
      if (this.PiontCoordinateLocus) {
        this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
      }
      if (this.equipmentLayers) {
        this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
      }
      if (this.pointPositionLayers) {
        this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
      }
      this.LowQueryDetermine = 0;
      let params = {};
      if (
        !data.carserchTime &&
        !data.region &&
        !data.startTime &&
        !data.endTime &&
        !data.useNature &&
        (!data.useNatures || data.useNatures.length === 0)
      ) {
        // 所有搜索条件为空时，调用默认营运车辆规律接口
        let operatingVehiclesData = await this.OperatingVehiclecarLow();
        this.$store.commit("statuLoadingState", true); // 打开缓冲图标
        let operatingVehicles = operatingVehiclesData.operatingvehicles;
        this.operatingIndexdata = operatingVehiclesData.operatingIndexdata;
        this.operatingVehicles = [];
        if (
          this.$refs.leftTop.carCheckList &&
          this.$refs.leftTop.carCheckList.length > 0
        ) {
          // 太多了，先画20个
          // if (operatingVehicles.length >= 18) {
          //     for (let i = 0; i < 18; i++) {
          //         this.operatingVehicles = [...this.operatingVehicles, operatingVehicles[i]];
          //     }
          // } else {
          //     this.operatingVehicles = [...this.operatingVehicles, ...operatingVehicles];
          // }
          this.operatingVehicles = [
            ...this.operatingVehicles,
            ...operatingVehicles
          ];
        }
        if (this.operatingVehicles.length === 0) {
          this.$showSimpleMessage("暂无数据", "error");
        }
        this.operatingDataArrs = [...this.operatingIndexdata]; // 全局存一下
        this.operatingData = [...this.operatingIndexdata]; // 传给图表组件渲染
        this.operationVehiclelayer(this.operatingVehicles); // 拼凑营运车辆点位数据
      } else {
        if (data.region) {
          // 营运车辆规律区域起止点
          params.startRegion = data.region;
          params.endRegion = data.region;
        }
        if (data.carserchTime) {
          // 营运车辆规律开始结束时间
          params.startTime = data.carserchTime[0]
            ? this.$tools.setTimeUse(
                new Date(this.$filter.timesFormat(data.carserchTime[0]))
              )
            : "";
          params.endTime = data.carserchTime[1]
            ? this.$tools.setTimeUse(
                new Date(this.$filter.timesFormat(data.carserchTime[1]))
              )
            : "";
        }
        if (data.startTime) {
          // 营运车辆规律开始时间
          params.startTime = data.startTime || "";
        }
        if (data.endTime) {
          // 营运车辆规律结束时间
          params.endTime = data.endTime || "";
        }
        if (data.useNatures && data.useNatures.length !== 0) {
          // 营运车辆规律等级
          let MsgData = "";
          let num = data.useNatures.length - 1;
          data.useNatures.map((t, i) => {
            MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}`;
          });
          params.useNature = MsgData;
        } else if (data.useNature) {
          params.useNature = data.useNature;
        } else {
          if (!typeName) {
            params.useNature = "-1"; // 表示没有选择车辆类型
          }
        }
        if (
          !params.hasOwnProperty("startTime") ||
          !params.hasOwnProperty("endTime")
          // !params.startTime ||
          // !params.endTime
        ) {
          this.$showSimpleMessage("请选择开始结束时间", "error");
          // 关闭全屏loding
          if (this.mapLoading) {
            this.mapLoading.close();
            this.mapLoading = "";
          }
          this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
          return;
        }
        this.OperatingVehiclecarLowselect(params);
      }
    },
    // 营运车辆选择车辆类型后重绘
    async handleCheckedCarChange(data, typeName) {
      let carArr = [];
      let LowArr = data.useNatures;
      let bbb = this.operatingVehicles;
      let operatingIndexdata = [];
      let operatingvehicles = [];
      let operatingvehiclesObj = {};
      let CarArr = this.operatingCar.allTrace;
      if (this.$refs.leftTop.CarSjhLew !== false) {
        LowArr.map(t => {
          let cars = this.$store.state.Operatingvehicles;
          let tt = cars.find(i => i.id === t);
          if (CarArr[t]) {
            CarArr[t].map((e, i) => {
              operatingvehiclesObj = {};
              operatingvehiclesObj.id = `${new Date().getTime()}${i}`;
              operatingvehiclesObj.useNature = t;
              operatingvehiclesObj.trace = e.trace;
              operatingvehiclesObj.traceSpeed = e.traceSpeed;
              operatingvehiclesObj.name = tt.name;
              operatingvehicles = [...operatingvehicles, operatingvehiclesObj];
            });
          }
        });

        // let operatingObj = {
        //   operatingvehicles: operatingvehicles
        // };
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.getOverlays().clear();
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        this.operationVehiclelayer(operatingvehicles); // 拼凑营���车辆点位数据
      } else {
        if (typeName && typeName !== "拖动") {
          this.mapFullscreenLoding(); // 打开全屏loding
        }
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        this.mapGis.getOverlays().clear();
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        this.echoPromptBox();
        this.reAddingLayer(); // 再次添加标记，测距，区域图层和覆盖层
        if (this.QingbaocoordinateTracingPointImg) {
          this.mapGis.addLayer(this.QingbaocoordinateTracingPointImg); // 再次添加情报点位图层
        }
        if (this.PiontCoordinateLocus) {
          this.mapGis.addLayer(this.PiontCoordinateLocus); // 再次添加情报点位箭头线段图层
        }
        if (this.equipmentLayers) {
          this.mapGis.addLayer(this.equipmentLayers); // 再次添加设备图层
        }
        if (this.pointPositionLayers) {
          this.mapGis.addLayer(this.pointPositionLayers); // 再次添加点位图层
        }
        if (data.type === "carWatch" && this.coordinateTracingPointImg) {
          this.mapGis.addLayer(this.coordinateTracingPointImg); // 再次添加地图基本搜索画出的点位图层
        }
        if (data.type === "carWatch" && this.mapSearchLayer) {
          this.mapGis.addLayer(this.mapSearchLayer); // 再次添加地图基本搜索画出的区域图层
        }

        if (data.type === "carWatch" || data.type === "carLow") {
          let MsgData = data;
          if (data.type == "carlow") {
            this.OperatingLawFor();
            return;
            // 营运车辆规律时调用营运车辆搜索
            // this.carsearchEvent(data, typeName);
          }
          // let MsgData = "";
          // if (
          //   data.useNatures &&
          //   data.useNatures.length !== 0 &&
          //   data.useNatures instanceof Array
          // ) {
          //   let num = data.useNatures.length - 1;
          //   data.useNatures.map((t, i) => {
          //     MsgData = i !== num ? `${MsgData}${t},` : `${MsgData}${t}`;

          //   });
          // } else if (data.hasOwnProperty("useNature") && data.useNature) {
          //   MsgData.useNature = data.useNature;
          //   MsgData.name = data.type;
          // }
          if (typeName) {
            // 定时器调用请求接口
            let operatingVehicles = await this.OperatingVehicle();
            this.$store.commit("statuLoadingState", true); // 打开缓冲图标
            if (MsgData) {
              // 车辆类型有选择
              this.OperationVehiclescreening(MsgData);
              // this.operatingVehicles =this.newwatch;
            } else {
              // 无车辆类型选择
              // this.operatingVehicles = operatingVehicles;
              this.operatingVehicles = [];
            }
            if (this.operatingVehicles.length === 0) {
              // this.$showSimpleMessage("暂无数据", "error");
            }
            this.operationVehiclelayer(this.operatingVehicles); // 拼凑营运车辆点位数据
          } else {
            // 只是选择了车辆类型，只需要手动筛选车辆类型就行
            // 调用营运车辆手动筛选数据函数
            // this.$store.commit("statuLoadingState", true); // 打开缓冲图标
            // this.CarUrlData.useNature = MsgData; // 重新赋值参数

            if (MsgData) {
              // 车辆类型有选择
              this.OperationVehiclescreening(MsgData);
              // this.operatingVehicles =this.newwatch;
            } else {
              // 无车辆类型选择
              this.operatingVehicles = [];
            }
            if (this.operatingVehicles.length === 0) {
              // this.$showSimpleMessage("暂无数据", "error");
            }
            this.operationVehiclelayer(this.operatingVehicles); // 再次重新绘制营运车辆
          }
          this.CarUrlData.useNatures = data.useNatures; // 重新赋值一下选择的车辆类型
        }
      }
    },
    // OperationCarFor(){
    //   this.
    // }
    // 营运车辆观测请求数据湖数据传参
    OperatingVehicle() {
      let _this = this;
      let times = this.$tools.setTimeUse(new Date(new Date().getTime()));
      let time = times[10] + times[11];
      if (time % 3 === 0) {
        // 刚好在整点上时
        times = `${times.slice(0, 12)}00`;
      } else {
        // 没在整点上时
        this.carTimers(Number(time));
        let dtimer = this.RTtime < 10 ? `0${this.RTtime}` : `${this.RTtime}`;
        times = `${times.slice(0, 10)}${dtimer}00`;
      }
      let params = {
        currentTime: times
      };
      this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      // 添加地图层级和四角坐标
      params.scale = this.MapZoomLevel; // 地图当前层级
      params.windowLocation = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      this.CarUrlData = this.$tools.deepCopy(params); // 重新赋值参数
      this.CarUrlData.type = "carWatch";
      if (!this.CarUrlData.useNature) {
        this.CarUrlData.useNatures = this.$refs.leftTop.carCheckList; // 车辆类型重新赋值一下，不然默认没选定时刷新和拖动重新请求会出问题
      }
      return new Promise((resolve, reject) => {
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        this.OperatingFor(); // 调用营运车辆观测请求
      });
    },
    // 循环调用营运车辆观测接口
    OperatingFor() {
      let ref = this.$refs.leftTop.carCheckList;
      let vehicleIconArray = this.$refs.leftTop.vehicleIconArray;
      vehicleIconArray.map(item => {
        item.flag = 0;
        ref.map(road => {
          if (road === item.id) {
            item.flag = 1;
          }
        });
      });
      ref.map((item, id) => {
        let CarId = item;
        let currentPage = 1;
        this.OperatingCarOb(CarId, currentPage);
      });
      // for (let i = 1; i <= 7; i++) {
      //   let currentPage = 1;
      //   let CarId = i;
      //   this.OperatingCarOb(CarId, currentPage);
      // }
    },
    // 调用营运车辆观测接口
    OperatingCarOb(CarId, currentPage) {
		var  _this = this
      axios
        .get(
          `/operations/selecttracenew?math=${CarId}`
        )
        .then(res => {
          let ref = this.$refs.leftTop.vehicleIconArray;
          let tt = ref.find(t => t.id === CarId);
          let isJumpOut = tt.flag === 0;
          if (isJumpOut) {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            return;
          }
          let IfNull = res.data.data;
          let resdata = IfNull;
          let carLists = resdata

            // this.carList = [];
            let carList = [];
            // currentPage++;
            // this.OperatingCarOb(CarId, currentPage);
            if (res.data.data) {
              this.carList = [...carLists,...this.carList];
              let car = this.$store.state.Operatingvehicles;
              let tt = ref.find(t => t.id == CarId);
              car.map(t => {
                carLists.map(item=>{
                //   let Jsoncar = item.trace;
                //   let Jsoncars = JSON.parse(Jsoncar);
                if (carLists) {
                  carLists.map(e => (e.id = t.id));
                  carList = [...carList, ...carLists];
                }
                });
              });
              carLists.map((t, i) => {
                t.nowLocation = CarId;
                t.id = `${new Date().getTime()}${i}`;
                t.name = tt.name;
              });

              this.carList = [...this.carList, ...carLists];
              // carList = this.carList;
              // resolve(carList); // 返回参数
              this.operationVehiclelayer(this.carList); // 拼凑营运车辆点位数据
            } else {
              //aaaaa
              // this.$showSimpleMessage("暂无数据", "error");
              resolve(carList); // 返回参数
            }
        })
        .catch(error => {
          this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // this.$showSimpleMessage(error, "error");
        });
    },
    // 营运车辆观测数据湖不给写筛选车辆的接口，人生无奈自己筛
    // OperationVehiclescreening(msg) {
    //       // return new Promise((resolve, reject) => {
    //         let carList = [];
    //         if (msg.length === 0) {
    //           // 选择的车辆类型为空
    //           this.$store.state.Operatingvehicles.map(t => {
    //             if (this.carList[t.id]) {
    //               this.carList[t.id].map(e => (e.useNature == t.id));
    //               carList = [...carList, ...this.carList[t.id]];
    //             }
    //           });
    //           this.newwatch = carList; // 返回参数
    //         } else {
    //           if(this.pageStatus === "carWatch"){
    //             this. OperatingFor();
    //             let msgArr = msg.split(",");
    //             console.log(this.carList)
    //             let tt= this.carList;
    //             let aaa="";
    //             msgArr.map(t => {
    //               if (tt) {
    //                 // let tt = ref.find(t => t.id == CarId);
    //                  tt.map(e => {
    //                    if(e.nowLocation == t){
    //                      carList = [...carList, ...e];

    //                    }

    //                    });
    //               }
    //             });
    //             this.newwatch = carList; // 返回参数
    //           }else if(this.pageStatus === "carLow"){
    //             this.OperatingLawFor()
    //           }
    //         }
    //       // });
    //     },
    // 营运车辆观测数据湖不给写筛选车辆的接口，人生无奈自己筛
    OperationVehiclescreening(msg) {
      // return new Promise((resolve, reject) => {
      let carList = [];
      let msgs = msg.useNatures;
      if (msgs.length === 0) {
        // 选择的车辆类型为空
        this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
        this.$showSimpleMessage("重新请选择营运车型", "error");
        // this.$store.state.Operatingvehicles.map(t => {
        //   if (this.carList[t.id]) {
        //     this.carList[t.id].map(e => (e.useNature = t.id));
        //     carList = [...carList, ...this.carList[t.id]];
        //   }
        // });
        // resolve(carList); // 返回参数
      } else {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        // this.mapGis.getOverlays().clear();
        this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
        this.carList = [];
        // let msgArr = msg.split(",");

        if (msg.type === "carWatch") {
          this.$refs.leftTop.choseSome = "";
          this.OperatingFor();
        } else if (msg.type === "carLow") {
          this.OperatingLawFor();
        }

        // resolve(carList); // 返回参数
      }
      // });
    },
    // 营运车辆规律数据湖接口请求
    OperatingVehiclecarLow() {
      let _this = this;

      let timers = this.$tools.setTimeUse(new Date(new Date().getTime()));
      timers = `${timers.slice(0, 8)}230000`;
      // `20181122230000`
      let params = {
        timeStr: `20181224230000`
      };
      // 添加地图层级和四角坐标
      params.scale = this.MapZoomLevel; // 地图当前层级
      params.windowLocation = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      this.CarUrlData = this.$tools.deepCopy(params); // 重新赋值参数
      this.CarUrlData.type = "carLow";
      // if (!this.CarUrlData.useNature) {
      //     this.CarUrlData.useNatures = this.$refs.leftTop.carCheckList; // 车辆类型重新赋值一下，不然默认没选定时刷新和拖动重新请求会出问题
      // }
      return new Promise((resolve, reject) => {
        this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
        sjhAxios
          .post("sjh2/strategysupport/servicecar/servicecarlawnew", params)
          .then(res => {
            if (res.data) {
              let operatingvehicles = [];
              let operatingIndexdata = [];
              let operatingvehiclesObj = {};
              this.$store.state.Operatingvehicles.map(t => {
                if (res.data.allTrace[t.id]) {
                  res.data.allTrace[t.id].map((e, i) => {
                    operatingvehiclesObj = {};
                    operatingvehiclesObj.id = `${new Date().getTime()}${i}`;
                    operatingvehiclesObj.useNature = t.id;
                    operatingvehiclesObj.trace = e.trace;
                    operatingvehiclesObj.traceSpeed = e.traceSpeed;
                    operatingvehicles = [
                      ...operatingvehicles,
                      operatingvehiclesObj
                    ];
                  });
                }
              });
              operatingIndexdata = [...res.data.data];
              let operatingObj = {
                operatingvehicles: operatingvehicles,
                operatingIndexdata: operatingIndexdata
              };
              resolve(operatingObj); // 返回参数
            } else {
              this.$showSimpleMessage("暂无数据", "error");
              resolve({ operatingvehicles: [], operatingIndexdata: [] }); // 返回参数
            }
          })
          .catch(error => {
            _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this. $showSimpleMessage(error, "error");
          });
      });
    },
    // 循环调用营运车辆规律接口
    OperatingLawFor() {
      let carCheckList = this.$refs.leftTop.carCheckList;
      let ref = this.$refs.leftTop.vehicleIconArray;
      ref.map(item => {
        item.flag = 0;
        carCheckList.map(road => {
          if (road === item.id) {
            item.flag = 1;
          }
        });
      });
      ref.map((item, id) => {
        let CarId = item.id;
        let currentPage = 1;
        this.OperationalCarTrajectory(CarId, currentPage);
      });
    },
    // 调用营运车辆规律接口
    OperationalCarTrajectory(CarId, currentPage) {
      // let _this = this;
      // return new Promise((resolve, reject) => {
      axios
        .get(
          `/operations/allTraces?math=${CarId}`
        )
        .then(res => {
          if (this.pageStatus !== "carLow" || this.LowQueryDetermine === 0) {
            // if (this.pageStatus !== "carLow" || this.LowQueryDetermine === 0) {
            // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
          } else {
            let ref = this.$refs.leftTop.vehicleIconArray;
            let tt = ref.find(t => t.id === CarId);
            let isJumpOut = tt.flag === 0;
            if (isJumpOut) {
              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              return;
            }
            // if( currentPage>=10){
            let roads =  res.data.data;
              currentPage = 1;
            //   currentPage++;
            //   this.OperationalCarTrajectory(CarId, currentPage);
              // 营运车辆规律轨迹
              let operatingvehicles = [];
              let operatingvehiclesObj = {};
              // this.$store.state.Operatingvehicles.map(t => {
              let cars = this.$store.state.Operatingvehicles;
              let aa = cars.find(t => t.id === CarId);
              roads.map((item, i) => {
                //  cardata.map((e, i) => {
                operatingvehiclesObj = {};
                operatingvehiclesObj.id = `${new Date().getTime()}${i}`;
                operatingvehiclesObj.nowLocation = CarId;
                operatingvehiclesObj.trace = item.trace;
                operatingvehiclesObj.traceSpeed = item.traceSpeed;
                operatingvehiclesObj.name = aa.name;
                operatingvehicles = [
                  ...operatingvehicles,
                  operatingvehiclesObj
                ];
              });
              // resolve(operatingvehicles); // 返回参数

              this.operationVehiclelayer(operatingvehicles);

          }
        })
        .catch(error => {
          this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });

      // });
      // })
      // })
    },

    // 营运规律柱形图
    LawColumnDiagram() {
      return new Promise((resolve, reject) => {
        let currentPage = 1;
        axios
          .get(
            `/operations/servicecarlawselectNew`
          )
          .then(res => {
            let roadss = res.data.data;
            // 营运车辆柱形图
            let operatingIndexdata = [];
            let roads = roadss;
            if (roads) {
              operatingIndexdata = [...roads];
              let operatingObj = {
                operatingIndexdata: operatingIndexdata
              };
              resolve(operatingObj); // 返回参数
            } else {
              this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
              this.$showSimpleMessage("暂无数据", "error");
            }
          })
          .catch(error => {
            this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
            // _this. $showSimpleMessage(error, "error");
          });
      });
    },
    // 营运车辆规律按条件查询数据湖接口
    OperatingVehiclecarLowselect(msg) {
      let _this = this;
      // 添加地图层级和四角坐标
      msg["scale"] = this.MapZoomLevel; // 地图当前层级
      msg["windowLocation"] = this.MapFourAngleCoordinate; // 地图当前窗口的四角坐标
      this.CarUrlData = this.$tools.deepCopy(msg); // 重新赋值参数
      this.CarUrlData.type = "carLow";
      // if (!this.CarUrlData.useNature) {
      //     this.CarUrlData.useNatures = this.$refs.leftTop.carCheckList; // 车辆类型重新赋值一下，不然默认没选定时刷新和拖动重新请求会出问题
      // }
      // return new Promise((resolve, reject) => {
      sjhAxios
        .post("sjh2/strategysupport/servicecar/servicecarlawselect", msg)
        .then(res => {
          if (res.data) {
            let operatingvehicles = [];
            let operatingIndexdata = [];
            let operatingvehiclesObj = {};
            this.operatingCar = res.data;
            this.$store.state.Operatingvehicles.map(t => {
              if (res.data.allTrace[t.id]) {
                res.data.allTrace[t.id].map((e, i) => {
                  operatingvehiclesObj = {};
                  operatingvehiclesObj.id = `${new Date().getTime()}${i}`;
                  operatingvehiclesObj.useNature = t.id;
                  operatingvehiclesObj.name = t.name;
                  operatingvehiclesObj.trace = e.trace;
                  operatingvehiclesObj.traceSpeed = e.traceSpeed;
                  operatingvehicles = [
                    ...operatingvehicles,
                    operatingvehiclesObj
                  ];
                });
              }
            });
            operatingIndexdata = [...res.data.data];
            let operatingObj = {
              operatingvehicles: operatingvehicles,
              operatingIndexdata: operatingIndexdata
            };
            // resolve(operatingObj); // 返回参数
            this.operatingVehiclesData = operatingObj;
            let operatingVehiclesData = this.operatingVehiclesData;
            let operatingVehicles = operatingVehiclesData.operatingvehicles;
            this.operatingIndexdata = operatingVehiclesData.operatingIndexdata;
            this.operatingVehicles = [];
            // 太多了，先画20个
            // if (operatingVehicles.length >= 18) {
            //     for (let i = 0; i < 18; i++) {
            //         this.operatingVehicles = [...this.operatingVehicles, operatingVehicles[i]];
            //     }
            // } else {
            //     this.operatingVehicles = [...this.operatingVehicles, ...operatingVehicles];
            // }
            this.operatingVehicles = [
              ...this.operatingVehicles,
              ...operatingVehicles
            ];
            this.operatingData = [...this.operatingDataArrs.filter(t => t.useNature === params.useNature)]; // 筛选一下峰值数据重新绘制图表
            this.$store.commit("statuLoadingState", true); // 打开缓冲图标
            if (this.operatingVehicles.length === 0) {
              this.$showSimpleMessage("暂无数据", "error");
            }
            this.operatingDataArrs = [...this.operatingIndexdata]; // 全局存一下
            this.operatingData = [...this.operatingIndexdata]; // 传给图表组件渲染
            this.operationVehiclelayer(this.operatingVehicles); // 拼凑营运车辆点位数据
          } else {
            this.$showSimpleMessage("暂无数据", "error");
            // resolve({ operatingvehicles: [], operatingIndexdata: [] }); // 返回参数
          }
        })
        .catch(error => {
          _this.mapFullClosedscreenLoding(); // 关闭手动打开的特有loding圈
          // _this. $showSimpleMessage(error, "error");
        });
      // });
    },
    // 营运车辆算时间整点方法
    carTimers(time) {
      if (time % 3 !== 0) {
        time = time - 1;
        this.carTimers(time);
      } else {
        this.RTtime = time;
      }
    },
    // 拼凑数据然后绘制营运车辆图层
    operationVehiclelayer(dataArrs, LewArr) {
      // 拼凑营运车辆数据
      let data = [];
      let lewArr = [];
      let pointData = [];
      dataArrs.map(item => {
          this.operatinglaw.push(item)
        if (item.hasOwnProperty("trace")) {
          let obj = {};
          let locationPonitObj = [];
          let OperationCars = [];
          let OperationCar = item.trace;
          if (this.$refs.leftTop.CarSjhLew == false) {
            OperationCars = JSON.parse(OperationCar);
          } else {
            // if(LewArr){
            //   LewArr.map(id=>{
            //     OperationCar.map(item=>{
            //       if(id==item.roadLevel){
            //         lewArr.push(item)
            //       }
            //     })
            //   })
            //   OperationCars = lewArr;

            // }else{
            OperationCars = OperationCar;
            // }
          }
          if (OperationCars.length === 0 && this.mapLoading) {
            // 关闭全屏loding
            if (this.mapLoading) {
              this.mapLoading.close();
              this.mapLoading = "";
            }
            this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
          }
          OperationCars.map(el => {
            if (el.path) {
              el.path.map(e => {
                // let point = [];
                // point.push(e.point); // 报警坐标
                let point = GisClassMethod.baiduTurnsTogoldenVirtue(
                  e.point[0],
                  e.point[1]
                ); // 转换坐标
                locationPonitObj.push({ point: point });
              });
            }
          });
          obj.locationPonitObj = locationPonitObj;
          obj.id = item.id;
          if (this.$refs.leftTop.CarSjhLew == false) {
            obj.useNature = `car_${item.nowLocation}`;
          } else {
            obj.useNature = `car_${item.useNature}`;
          }
          data.push(obj);
        }
      });
      data.map((t, i) => {
        pointData.push({
          id: t.id,
          point:
            t.locationPonitObj.length > 0
              ? t.locationPonitObj[t.locationPonitObj.length - 1].point
              : [],
          intelligenceId: t.useNature
        });
      });
      this.operationVehiclelayers = GisClassMethod.PiontCoordinateLocus(
        data,
        "#e64141",
        5,
        "op"
      );
      this.mapGis.addLayer(this.operationVehiclelayers); // 添加新的营运车辆图层

      let operatingVehicleIcon = GisClassMethod.CoordinateTracingPointImg(
        pointData,
        0.6
      );
      this.mapGis.addLayer(operatingVehicleIcon); // 添加新的营运车辆图标层
      setTimeout(() => {
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },

    // 路口交通观测
    roadWatch(data) {
      //       this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
      // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层 // 移动时的提示框
      //初始时，绘画所有的点位
      let pointList = this.pointList;
      pointList.map(val => {
        val.point = [val.longitude, val.latitude];
        val.intelligenceId = "d110";
        if (val.id === data) {
          val.intelligenceId = "110";
        }
      });
      if (this.pageStatus === "roadWatch") {
      } else {
        let intersectionTime = this.$refs.leftTop.intersectionTime;
        clearInterval(intersectionTime);
        intersectionTime = "";
      }
      setTimeout(() => {
        this.drawPoint(pointList, 0.8);
      });
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }

      // sjhAxios.post("sjh2/strategysupport/trafficFlow/realTimeNew", {spottingNo: val, currentTime: this.$tools.setTimeUse()}).then();
    },
    // 路口交通点击查看观看侧边栏
    pointViewSidebar() {
      this.ifEventBulletin = false; // 关闭右侧情报列表
      this.ifTrafficCom = true;
      let coordinateTracingPointImg = this.coordinateTracingPointImg.getSource();
      let newFeature = coordinateTracingPointImg.getFeatureById(
        this.tooltip.id
      );
      if (this.roadPoint !== this.tooltip.id) {
        newFeature.setStyle(
          new ol.style.Style({
            image: new ol.style.Icon({
              scale: 0.8,
              anchor: [0.4, 0.8],
              src: RoadTraffico
            })
          })
        );
      }
      let oldFeature = "";
      if (this.roadPoint !== "" && this.roadPoint !== this.tooltip.id) {
        oldFeature = coordinateTracingPointImg.getFeatureById(this.roadPoint);
        oldFeature.setStyle(
          new ol.style.Style({
            image: new ol.style.Icon({
              scale: 0.8,
              anchor: [0.4, 0.8],
              src: RoadTrafficp
            })
          })
        );
      }
      this.roadPoint = this.tooltip.id;
      this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      // 关闭全屏loding
      if (this.mapLoading) {
        this.mapLoading.close();
        this.mapLoading = "";
      }
    },

    // 画点位
    drawPoint(point, scale) {
      let _this = this;
      if (point[0].move) {
        // 清除提示框
        if (this.tooltip.id) {
          this.removeTooltip();
        }
        let position = point[0].point;
        let view = this.mapGis.getView();
        let zoom = view.getZoom();
        let center = ol.proj.fromLonLat(position);
        view.setCenter(center);
        // view.setZoom(zoom);
      }
      this.mapGis.removeLayer(this.coordinateTracingPointImg);
      this.InitializationLayer(point, scale);
    },
    // 交通状态观测的画点位
    drawPoints(point, scale) {
      let _this = this;
      if (point[0].move) {
        // 清除提示框
        if (this.tooltip.id) {
          this.removeTooltip();
        }
        let position = point[0].point;
        let view = this.mapGis.getView();
        let zoom = view.getZoom();
        let center = ol.proj.fromLonLat(position);
        view.setCenter(center);
        // view.setZoom(zoom);
      }
      this.mapGis.removeLayer(this.coordinateTraficingPointImg);
      this.InitializationLayerTraffic(point, scale);
    },
    moveToCenter(point) {
      let position = point;
      let view = this.mapGis.getView();
      let center = ol.proj.fromLonLat(position);
      view.setCenter(center);
      // view.setZoom(12);
    },
    // OD选择的点位信息和路口交通观测选择点位时，改变点位信息
    changeRoadPoint(val) {
      this.roadPoint = val;
    },

    // 切换页面状态
    changePageStatus(data) {
      // this.mapFullscreenLoding(); // 打开全屏loding
      this.pageStatus = data;
      // 切换页面状态的时候，清空左上角的选择
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
        this.carList = [];
        this.carWatch(data);
      }
      // 拥堵规律
      if (data === "trafficFlow" || data === "trafficLow") {
        this.trafficFlow();
      }
    },
    // 上半段事件公告弹出框
    topeventDetail(data) {
      if (this.tooltip.hasOwnProperty("id") && this.tooltip.id) {
        this.removeTooltip(); // 右侧查看详情时，不管地图上有没有Tooltip默认删除一次
      }
      if (data.hasOwnProperty("id")) {
        let detailsfData = this.topInformationPagingArr.find(
          t => t.id === data.id
        );
        if (
          detailsfData.hasOwnProperty("intelligenceId") &&
          detailsfData.intelligenceId === "10001"
        ) {
          // 事件已关闭，不出现取消告警按钮
          detailsfData.alarm = detailsfData.intelligenceStatus !== "0";
        }
        this.$refs.eventDetail.detailsfData = detailsfData;
        //   } else if (data.hasOwnProperty("incidentId")) {
        //     this.$refs.eventDetail.detailsfData = this.topInformationPagingArr.find(
        //       t => t.incidentId === data.incidentId
        //     );
      }

      this.tooltip = this.$refs.eventDetail.detailsfData;
      this.$refs.eventDetail.eventDetail = true;
    },
    // 事件详情, date列表循环的数据
    eventDetail(data) {
      if (this.tooltip.hasOwnProperty("id") && this.tooltip.id) {
        this.removeTooltip(); // 右侧查看详情时，不管地图上有没有Tooltip默认删除一次
      }
      if (data.hasOwnProperty("id")) {
        let detailsfData = this.InformationPagingArr.find(
          t => t.id === data.id
        );
        if (
          detailsfData.hasOwnProperty("intelligenceId") &&
          (detailsfData.intelligenceId === "10001" ||
            detailsfData.intelligenceId === "10023")
        ) {
          // 事件已关闭，不出现取消告警按钮
          detailsfData.alarm = detailsfData.intelligenceStatus !== "0";
          this.$refs.eventDetail.detailsfData = detailsfData;
        }
      }
          this.$refs.eventDetail.detailsfData = this.InformationPagingArr.find(
              t => t.incidentId === data.incidentId
        );
    //   console.log(this.$refs.eventDetail.detailsfData);
    //   console.log(this.InformationPagingArr);
      this.tooltip = this.$refs.eventDetail.detailsfData;
      this.$refs.eventDetail.eventDetail = true;
    },
    // 地图点击查看详情
    MapeventDetail() {
      if (this.tooltip.hasOwnProperty("id")) {
        this.$refs.eventDetail.detailsfData = this.intelligenceeventList.find(
          t => t.id === this.tooltip.id
        );
      } else if (this.tooltip.hasOwnProperty("incidentId")) {
        this.$refs.eventDetail.detailsfData = this.intelligenceeventList.find(
          t => t.incidentId === this.tooltip.incidentId
        );
      }
      this.$refs.eventDetail.eventDetail = true;
    },
    // 事件重叠弹窗中打开事件详情
    launchDetailseventDetail(data) {
      if (data.hasOwnProperty("incidentId")) {
        // 告警情报
        this.$refs.eventDetail.detailsfData = this.intelligenceeventList.find(
          t => t.incidentId === data.incidentId
        );
      } else {
        // 自定义情报
        this.$refs.eventDetail.detailsfData = this.intelligenceeventList.find(
          t => t.id === data.id
        );
      }
      this.$refs.eventDetail.eventDetail = true;
    },

    // 打开地图弹窗
    showMapDialog() {
      this.dialogVisible = true;
    },

    // 点击元素，添加事件的窗口提示
    eventTip(position, map, ids, typeName) {
      let html, measureTooltipElement, measureTooltip;
      if (typeName === "事件") {
        let tooltip = this.intelligenceeventList.find(t => t.id === ids);
        if (!tooltip) {
          tooltip = this.intelligenceeventList.find(t => t.incidentId === ids);
        }
        this.tooltip = this.$tools.deepCopy(tooltip);
        // 自定义事件
        // if (this.tooltip.hasOwnProperty("number") && (this.tooltip.number === "9" || this.tooltip.number === "26")) {
        if (
          this.tooltip.hasOwnProperty("intelligenceId") &&
          (this.tooltip.intelligenceId === "10001" ||
            this.tooltip.intelligenceId === "10023")
        ) {
          // 事件已关闭，不出现取消告警按钮
          this.tooltip.alarm = this.tooltip.intelligenceStatus !== "0";
          this.tooltip.Videodisplay = false; // 判断是否显示查看视频按钮自定义事件没有视频
          html =
            '<div  id="tooltip" style="display:block;"><div class="tooltip tooltip-measure" style="width: 255px"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent" style="text-align: center">自定义情报</div>' +
            '<div class="tooltipContent" title="' +
            this.tooltip.intelligenceName +
            '">' +
            `事件类型：${this.tooltip.intelligenceName}` +
            '</div><div class="tooltipContent" title="' +
            this.tooltip.area +
            '">' +
            `事件区域：${this.tooltip.area}` +
            '</div><div class="tooltipContent" title="' +
            this.tooltip.startTime +
            '">' +
            `事件开始时间：${this.$filter.formatDateTime(
              this.tooltip.startTime
            )}` +
            '</div><div class="tooltipBtn">';
          if (this.tooltip.alarm) {
            html +=
              '<span class="clearWarn" @click.native="clearWarn">取消告警</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div></div>';
          } else {
            html +=
              '<span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div></div>';
          }
        } else if (this.tooltip.hasOwnProperty("incidentType")) {
          // AI检测事件
          // AI检测事件，不出现取消告警按钮
          // this.tooltip.alarm = this.tooltip.incidentStatus === "1" ? false : true;
          this.tooltip.alarm = false;
          this.tooltip.Videodisplay = true; // 判断是否显示查看视频按钮自定义事件没有视频
          html =
            '<div  id="tooltip" style="display:block;"><div class="tooltip tooltip-measure" style="width: 255px"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent">告警情报</div>' +
            '<div class="tooltipContent" title="' +
            this.$store.state.venteType.find(
              t => t.id === this.tooltip.incidentType
            ).name +
            '">' +
            `事件类型：${
              this.$store.state.venteType.find(
                t => t.id === this.tooltip.incidentType
              ).name
            }` +
            '</div><div class="tooltipContent" title="' +
            this.tooltip.districtRegionId +
            '">' +
            `事件区域：${this.tooltip.districtRegionId}` +
            '</div><div class="tooltipContent" title="' +
            this.tooltip.incidentStartTime +
            '">' +
            `事件开始时间：${this.$filter.formatDateTime(
              this.tooltip.incidentStartTime
            )}` +
            '</div><div class="tooltipBtn">';
          if (this.tooltip.alarm) {
            html +=
              '<span class="clearWarn" @click.native="clearWarn">取消告警</span><span class="watchVideo" @click.native="watchVideoss">查看视频</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div></div>';
          } else {
            html +=
              '<span class="watchVideo" @click.native="watchVideoss">查看视频</span><span class="showDetail" @click.native="MapeventDetail">展示详情</span></div></div></div>';
          }
        }
      } else if (typeName === "设备") {
        this.tooltip = this.$tools.deepCopy(
          this.equipmentList.find(t => t.id === ids)
        );
        let statusName =
          this.tooltip.status === 1
            ? "正常"
            : this.tooltip.status === 0
            ? "禁用"
            : "删除";
        html =
          '<div  id="tooltip" style="display:block;"><div class="tooltip tooltip-measure"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent" style="text-align: center">设备信息</div>' +
          '<div class="tooltipContent" title="' +
          this.tooltip.equipmentNumber +
          '">' +
          `设备编号：${this.tooltip.equipmentNumber}` +
          '</div><div class="tooltipContent" title="' +
          this.tooltip.equipmentTypeName +
          '">' +
          `设备类型：${this.tooltip.equipmentTypeName}` +
          '</div><div class="tooltipContent" title="' +
          this.tooltip.equipmentName +
          '">' +
          `设备名称：${this.tooltip.equipmentName}` +
          '</div><div class="tooltipContent">' +
          `设备状态：${statusName}` +
          "</div></div>";
      } else if (typeName === "点位") {
        this.tooltip = this.$tools.deepCopy(
          this.pointList.find(t => t.id === ids)
        );
        html =
          '<div id="tooltip" style="display:block;"><div class="tooltip tooltip-measure" style="height: 120px;"><div class="closeTooltip" @click="removeTooltip">x</div><div class="tooltipContent" style="text-align: center">点位信息</div>' +
          '<div class="tooltipContent" title="' +
          this.tooltip.intersectionName +
          '">' +
          `点位名称：${this.tooltip.intersectionName}` +
          "</div>";
        if (this.pageStatus === "roadWatch") {
          html += `<div class="tooltipBtn"><span class="pointViewSidebar" @click.native="pointViewSidebar">查看</span></div></div></div>`;
        } else {
          html += `</div>`;
        }
      } else if (typeName === "视频") {
        // html = a;
        // html =
        //     '<div id="tooltip" style="display:block;"><div class="tooltip tooltip-measure" style="height: 120px;"><div class="closeTooltip" id="'+ ids +'" @click="removeTooltip">x</div><div class="tooltipContent" style="text-align: center">事件视频</div>' +
        //     '<div class="tooltipContent">' +
        //     `检测到特殊事件` +
        //     '</div><div class="tooltipBtn">' +
        //     '<span class="d_specialViewSidebar" @click.native="d_specialViewSidebar">查看视频</span></div></div></div>';
        let Nodea = this.SaveDom.cloneNode(true);
        Nodea.style.display = "block"; // 把节点的display属性改为block，之前是在周期里改，出问题了哈哈哈哈
        let Nodeb = Nodea.getElementsByClassName("d_closeTooltip")[0];
        let Nodec = Nodea.getElementsByClassName("d_specialViewSidebar")[0];
        Nodeb.setAttribute("id", ids);
        Nodec.setAttribute("class", `${Nodec.getAttribute("class")} ${ids}`);
        Nodec.setAttribute("ids", ids);
        measureTooltipElement = Nodea;
        measureTooltip = new ol.Overlay({
          element: measureTooltipElement,
          offset: [2, -48],
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
        document.getElementById(ids).onclick = function(e) {
          this.SpecialeventsremoveTooltip(e);
        }.bind(this);
        document.getElementsByClassName(ids)[0].onclick = function(e) {
          this.specialViewSidebar(e);
        }.bind(this);
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      }
      if (typeName !== "视频") {
        // let node = document.getElementById("tooltip");
        // measureTooltipElement = node.cloneNode(true);
        measureTooltipElement = document.createElement("div");
        measureTooltipElement.innerHTML = html;
        // measureTooltipElement.style.display = "block";
        measureTooltip = new ol.Overlay({
          element: measureTooltipElement,
          offset: typeName === "视频" ? [2, -48] : [0, -35],
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
        this.$store.commit("statuLoadingState", false); // 关闭缓冲图标
      }
    },

    // 查看视频
    watchVideos(data) {
      // this.ifEventBulletin = false; // 关闭右侧情报列表
      if (this.ifEventVideo) {
        this.ifEventVideo = false;
        this.ifEventBulletin = true; // 关闭右侧情报列表
      } else {
        if (this.$refs.eventDetail.eventDetail === false && !data) {
        } else {
          this.ifEventVideo = true;
          this.ifEventBulletin = false; // 关闭右侧情报列表

          // this.realTimeVideoAddress = this.equipmentList.find(t => t.id === data.cameraId).rtspAddr; // 实时视频地址
          this.realTimeVideoAddress = data.videoAddr; // 实时视频地址
          // this.realTimeVideoAddress = "xxx";
          // let videoAddr = (JSON.parse(data.videoAddr)).filename
          let videoData = {
            videoAddr: data.videoAddr,
            destination: "/usr/local/nginx/html/file"
          };
          // baseAxios
          // .post(`/sjhvi/realtime/VideoShow`, videoData)
          // .then(res => {
          // if (res.data.code === 0) {
          // this.watchVideoUrl = res.data.video.substring(21,res.data.video.length); // 事件视频地址
          this.watchVideoUrl = "http://47.105.212.6:80/event.mp4"; // 事件视频地址
          // } else {
          //   this.watchVideoUrl = "";
          //   this.$showSimpleMessage("找不到该视频", "error");
          // }
          // })
          // .catch(error => {
          //   //   this. $showSimpleMessage(error, "error");
          // });
        }
      }
    },
    watchVideoss() {
      if (this.ifEventVideo) {
        this.ifEventVideo = false;
      } else {
        this.ifEventVideo = true;
        // this.realTimeVideoAddress = this.equipmentList.find(t => t.id === this.tooltip.cameraId).rtspAddr; // 实时视频地址
        this.realTimeVideoAddress = this.tooltip.videoAddr; // 实时视频地址
        // this.realTimeVideoAddress = "xxx";
        // let videoAddr = (JSON.parse(this.tooltip)).filename

        let videoData = {
          videoAddr: this.tooltip,
          // videoAddr: videoAddr,
          destination: "/usr/local/nginx/html/file"
        };
        // baseAxios
        //   .post(`/sjhvi/realtime/VideoShow`, videoData)
        //   .then(res => {
        //     if (res.data.code === 0) {
        // this.watchVideoUrl = res.data.video.substring(21,res.data.video.length); // 事件视频地址
        this.watchVideoUrl = "http://47.105.212.6:80/event.mp4"; // 事件视频地址
        // } else {
        //   this.watchVideoUrl = "";
        //   this.$showSimpleMessage("找不到该视频", "error");
        // }
        // })
        // .catch(error => {
        //   // this. $showSimpleMessage(error, "error");
        // });
        // this.tooltip.file;
      }
    },
    // 重叠弹窗中点击查看视频
    launchDetailsTv(data) {
      if (this.ifEventVideo) {
        this.ifEventBulletin = true; // 打开右侧情报列表

        this.ifEventVideo = false;
      } else {
        this.ifEventBulletin = false; // 关闭右侧情报列表
        this.ifEventVideo = true;
        // this.realTimeVideoAddress = this.equipmentList.find(t => t.id === data.cameraId).rtspAddr; // 实时视频地址
        this.realTimeVideoAddress = data.videoAddr; // 实时视频地址
        // this.realTimeVideoAddress = "xxx";
        // let videoAddr = (JSON.parse(data.videoAddr)).filename

        let videoData = {
          videoAddr: data.videoAddr,
          destination: "/usr/local/nginx/html/file"
        };
        // baseAxios
        //   .post(`/sjhvi/realtime/VideoShow`, videoData)
        //   .then(res => {
        //     if (res.data.code === 0) {
        // this.watchVideoUrl = res.data.video.substring(21,res.data.video.length); // 事件视频地址
        this.watchVideoUrl = "http://47.105.212.6:80/event.mp4"; // 事件视频地址
        //   } else {
        //     this.watchVideoUrl = "";
        //     this.$showSimpleMessage("找不到该视频", "error");
        //   }
        // })
        // .catch(error => {
        //   // this. $showSimpleMessage(error, "error");
        // });
      }
    },

    // 删除特殊事件的弹窗
    SpecialeventsremoveTooltip(e) {
      let id = e.path[0].getAttribute("id");
      let videoOverlay = this.mapGis.getOverlayById(id);
      this.mapGis.removeOverlay(videoOverlay);
      // 清除缓存的特殊事件集合
      let item = this.specialEventSet.find(t => t.incidentId === id);
      if (item) {
        this.specialEventSet.splice(this.specialEventSet.indexOf(item), 1);
        this.$store.commit("setSpecialEventSet", this.specialEventSet); // 全局存储特殊事件
      }
    },
    // 特殊事件查看视频
    specialViewSidebar(e) {
      // let ids = e.path[0].getAttribute("ids");
      // let itema = this.Videoarray.find(t =>t.incidentId === ids);
      // // let itemb = this.intelligenceeventList.find(t => t.incidentId === itema.incidentId);
      // let itemb = "";
      // if (!itema) {
      //     itemb = this.$store.state.specialEventSet.find(t => t.incidentId === ids);
      // }
      // let videoData = {
      //     videoAddr: itema ? itema.videoAddr : itemb.videoAddr,
      //     destination: ""
      // };
      // this.specialShowVideo = true; // 打开查看视频弹窗
      // baseAxios.post("http://10.20.5.13:8080/realtime/VideoShow", videoData).then((res) => {
      //     this.specialVideoUrl = res.data.video; // 事件视频地址
      // });
      // this.specialVideoUrl = itema ? itema.file : itemb.file;
      // document.getElementById("specialVideo").play();
      if (this.ifEventVideo) {
        this.ifEventVideo = false;
      } else {
        let ids = e.path[0].getAttribute("ids");
        let itema = this.Videoarray.find(t => t.incidentId === ids);
        // let itemb = this.intelligenceeventList.find(t => t.incidentId === itema.incidentId);
        let itemb = "";
        if (!itema) {
          itemb = this.$store.state.specialEventSet.find(
            t => t.incidentId === ids
          );
        }
        this.realTimeVideoAddress = itema ? itema.videoAddr : itemb.videoAddr; // 实时视频地址
        // this.realTimeVideoAddress = "xxx";
        let videoData = {
          videoAddr: itema ? itema.videoAddr : itemb.videoAddr,
          destination: "/usr/local/nginx/html/file"
        };
        // baseAxios
        //   .post("/sjhvi/realtime/VideoShow", videoData)
        //   .then(res => {
        //     if (res.data.code === 0) {
        this.watchVideoUrl = "http://47.105.212.6:80/event.mp4"; // 事件视频地址
        // this.watchVideoUrl = res.data.video.substring(21,res.data.video.length); // 事件视频地址
        //   } else {
        //     this.watchVideoUrl = "";
        //     this.$showSimpleMessage("找不到该视频", "error");
        //   }
        // })
        // .catch(error => {
        //   // this. $showSimpleMessage(error, "error");
        // });
        this.ifEventVideo = true;
      }
    },
    // 特殊事件查看视频弹窗关闭
    specialhandleClose() {
      document.getElementById("specialVideo").pause();
      this.specialShowVideo = false; // 关闭查看视频弹窗
    },

    // 显示或隐藏右侧的视频
    showOrHide() {
      if (this.$refs.eventDetail.eventDetail === false) {
        this.ifEventBulletin = true; // 打开右侧情报列表
        this.ifEventVideo = false;
      } else {
        this.ifEventBulletin = true; // 打开右侧情报列表

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
        // 获取浏览器
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
          let oXl = new ActiveXObject("Excel.Application"); // 创建AX对象excel
          let oWB = oXL.Workbooks.Add(); // 获取workbook对象
          let xlsheet = oWB.Worksheets(1); // 激活当前sheet
          let sel = document.body.createTextRange();
          sel.moveToElementText(curTbl); // 把表格中的内容移到TextRange中
          sel.select; // 全选TextRange中内容
          sel.execCommand("Copy"); // 复制TextRange中内容
          xlsheet.Paste(); // 粘贴到活动的EXCEL中
          oXL.Visible = true; // 设置excel可见属性
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
            oXL = null; // 结束excel进程，退出完成
            timer = window.setInterval("Cleanup();", 1);
          }
        } else {
          tableToExcel("tables");
        }
      }
      function Cleanup() {
        window.clearInterval(timer);
        CollectGarbage(); // CollectGarbage,是IE的一个特有属性,用于释放内存的
      }
      let tableToExcel = (function() {
        let uri = "data:application/vnd.ms-excel;base64,",
          template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
          },
          format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
            });
          };
        return function(table, name) {
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
      let timerst =
        at[0] +
        at[1] +
        at[2] +
        at[3] +
        "-" +
        at[4] +
        at[5] +
        "-" +
        at[6] +
        at[7] +
        " " +
        at[8] +
        at[9] +
        ":" +
        at[10] +
        at[11] +
        ":" +
        at[12] +
        at[13];
      return timerst;
    },
    // 请求区域的地图数据,传参为区域名称
    areaShow(data, color) {
      let key = "tj_bound";
      let name = "QH_NAME";
      let queryString = data.districtRegionId;
      let testUrl =
        "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
        key +
        '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
        key +
        '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
        name +
        "</PropertyName><Literal>" +
        queryString +
        "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
        name +
        "</PropertyName><Literal>" +
        queryString +
        "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
      geoAxios.get(testUrl).then(async res => {
        let features = res.data.features;
        features[0].id = data.id;
        let geojsonObject = {
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
      });
    },
    // 根据等级选颜色
    choseColor(date) {
      let color;
      if (date === "0") {
        color = "#2bdf27";
      }
      if (date === "1") {
        color = "#2afbea";
      }
      if (date === "2") {
        color = "#2f82ff";
      }
      if (date === "3") {
        color = "#b85be4";
      }
      if (date === "4") {
        color = "#cd0a0a";
      }
      return color;
    },
    SjhLow() {
      this.LowQueryDetermine = 1;
      this.$refs.leftTop.OdSjh = false;
      this.$refs.leftTop.CarSjhLew = false;
      this.$refs.leftTop.DataLakeLow = false;
    },
    // 清除所有的定时器
    eraseTimer() {
      // 清除情报告警定时器
      clearInterval(this.eventBulletinTimer);
      this.eventBulletinTimer = "";
      // 清除潮汐流定时器
      clearInterval(this.tidalTimer);
      this.tidalTimer = "";
      // 清除营运车辆定时器
      clearInterval(this.carTimer);
      this.carTimer = "";
      // 清除状态观测的定时器（绘画）
      clearInterval(this.trafficFlowTimer);
      this.trafficFlowTimer = "";
      // 清除OD观测的定时器
      clearInterval(this.ODwatchTimer);
      this.ODwatchTimer = "";
      // 清除交通构成的定时器
      clearInterval(this.trafficWatchTimer);
      this.trafficWatchTimer = "";
      // 清除地图拖动的定时器
      if (this.moveRequestTiming) {
        clearInterval(this.moveRequestTiming);
        this.moveRequestTiming = "";
      }
    },

    // 请求情报，设备，点位列表
    async pointListofIntelligenceEquipment() {
		var _this = this;
      // 请求24种情报
      await axios
        .get("/intelligence/")
        .then(res => {
			console.log("Func pointListofIntelligenceEquipment",res.data.data);
          _this.news = res.data.data.filter(t => t.status === 1);
          _this.news.map(e => {
            e.imgSrc = GisClassMethod.InitGisImg(`d_${e.number}`, "2");
          });
          _this.intelligenceLayerparameters = [];
          _this.news.map((t, i) => {
            t.name =
              t.name === "外地车异常占比波动报警阈值"
                ? "外地车数量异常"
                : t.name === "大型车流量占比波动阈值"
                ? "车型构成异常"
                : t.name;
            let item = _this.$store.state.venteType.find(e => e.name === t.name)
              .id;
            _this.intelligenceLayerparameters = [
              ..._this.intelligenceLayerparameters,
              item
            ]; // 记录情报图层选择的情报类型
          });
        })
        .catch(error => {
          //   this. $showSimpleMessage(error, "error");
        });
      // 请求设备
      await axios
        .get("/equipmentType/")
        .then(res => {
          // let equipment = res.data.data;
          // this.equipment = equipment;
		  console.log("Func pointListofIntelligenceEquipment => /equipmentType/",res.data.data);
          _this.equipment = res.data.data.filter(
            t =>
              t.name !== "服务器" &&
              t.name !== "交换机" &&
              t.name !== "硬盘存储" &&
              t.name !== "校时服务器"
          );
          _this.equipment.map(e => {
            e.imgSrc = GisClassMethod.InitGisImg(`${e.id}`, "1");
          });
        })
        .catch(error => {
          //   this. $showSimpleMessage(error, "error");
        });
    },

    // 页面初始化请求情报并渲染
    async requestInitializationIntelligence(type, name, kq) {
      // this.mapFullscreenLoding(); // 打开全屏loding
      this.intelligenceeventList = [];
      // 请求前获取当前时间
      this.dintelligenceTime = this.$filter.timesFormat(new Date());
      if (!kq) {
        setTimeout(() => {
          // this.eventBulletinTimes(); // 启动情报告警定时器
        });
      }
      // 请求情报分页数据(公告展示)
      this.ShujuhuintelligenceEventsPaging();
      this.topShujuhuintelligenceEventsPaging();
      // 请求情报数据(地图展示)
      let CustomEventsMsg = await this.CustomEvents(); // 自定义的事件
	  console.log("requestInitializationIntelligence ... 【running】");
      let ShujuhuinformationTransmissionMsg = await this.ShujuhuinformationTransmission(); // 请求数据湖数据的传参
    //   let ShujuhuintelligenceEventsMsgflagO = await this.ShujuhuintelligenceEvents(
    //     ShujuhuinformationTransmissionMsg,
    //     "0"
    //   ); // 数据湖正常事件数据
    //   let ShujuhuintelligenceEventsMsgflagP = await this.ShujuhuintelligenceEvents(
    //     ShujuhuinformationTransmissionMsg,
    //     "1"
    //   ); // 数据湖关闭需要显示事件数据
      // this.$store.commit("statuLoadingState", true); // 打开缓冲图标
      let ShujuhuintelligenceEventsMsgflagOs = []; // 没处理过的flag为0的数据
      let ShujuhuintelligenceEventsMsgflagPs = []; // 处理好的flag为1的数据
    //   this.$store.state.venteType.map(t => {
    //     if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
    //       ShujuhuintelligenceEventsMsgflagOs = [
    //         ...ShujuhuintelligenceEventsMsgflagOs,
    //         ...ShujuhuintelligenceEventsMsgflagO[t.id]
    //       ];
    //     }
    //     if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
    //       ShujuhuintelligenceEventsMsgflagPs = [
    //         ...ShujuhuintelligenceEventsMsgflagPs,
    //         ...ShujuhuintelligenceEventsMsgflagP[t.id]
    //       ];
    //     }
    //   });
      let ShujuhuintelligenceEventsMsgflagOremoval = []; // 处理好的flag为0的数据
    //   ShujuhuintelligenceEventsMsgflagOs.map(t => {
    //     let item = ShujuhuintelligenceEventsMsgflagPs.find(
    //       e => e.incidentId === t.incidentId
    //     );
    //     if (!item) {
    //       ShujuhuintelligenceEventsMsgflagOremoval = [
    //         ...ShujuhuintelligenceEventsMsgflagOremoval,
    //         t
    //       ];
    //     }
    //   });
      // this.$store.state.venteType.map(t => {
      //     if (ShujuhuintelligenceEventsMsgflagP[t.id]) {
      //         this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagP[t.id]];
      //     }
      //     if (ShujuhuintelligenceEventsMsgflagO[t.id]) {
      //         this.eventList = [...this.eventList, ...ShujuhuintelligenceEventsMsgflagO[t.id]];
      //     }
      // });
      // this.eventList = [...this.eventList, ...CustomEventsMsg];
      if (this.pageStatus == "eventBulletin") {
        this.eventList = [
          ...this.eventList,
          ...ShujuhuintelligenceEventsMsgflagOremoval,
          ...ShujuhuintelligenceEventsMsgflagPs,
          ...CustomEventsMsg
        ];
      }
      if (!type) {
        this.intelligenceeventList = [...this.eventList];
      } else {
        // 其他模块叠加显示情报
        this.intelligenceLayerparameters.map(t => {
          // if (t === "9" && t === "26") {
          //     this.intelligenceeventList = [...this.intelligenceeventList, ...this.eventList.filter(e => e.incidentType === t)];
          // }
          this.intelligenceeventList = [
            ...this.intelligenceeventList,
            ...this.eventList.filter(e => e.incidentType === t)
          ];
          if (t === "9") {
            this.intelligenceeventList = [
              ...this.intelligenceeventList,
              ...this.eventList.filter(e => e.intelligenceId === "10001")
            ];
          }
          if (t === "26") {
            this.intelligenceeventList = [
              ...this.intelligenceeventList,
              ...this.eventList.filter(e => e.intelligenceId === "10023")
            ];
          }
        });
        // 筛选数据完毕
      }
      if (this.intelligenceeventList.length === 0) {
        // this.$showSimpleMessage("暂无数据", "error");
        if (this.tooltip.id) {
          this.removeTooltip();
        }
      } else {
        this.intelligenceeventList.map((t, i) => {
          if (t.hasOwnProperty("createdTime")) {
            t.createdTime = t.createdTime
              ? this.$filter.formatDateTime(t.createdTime)
              : "";
          }
          if (t.hasOwnProperty("startTime")) {
            t.startTime = t.startTime
              ? this.$filter.formatDateTime(t.startTime)
              : "";
            t.startTimelittile = t.startTime.split(" ")[1];
          }
          if (!t.hasOwnProperty("startTime")) {
            let times = t.incidentStartTime.split(" ")[1];
            t.startTime = t.incidentStartTime;
            t.startTimelittile = `${times.split(":")[0]}:${
              times.split(":")[1]
            }`;
          }
          if (!t.hasOwnProperty("intelligenceName")) {
            t.intelligenceName = this.$store.state.venteType.find(
              e => e.id === t.incidentType
            ).name;
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
      if (!name) {
        this.getGISData(this.intelligenceeventList, type); // 初始化地图情报数据并且绘制图层
      } else {
        this.getGISData(this.intelligenceeventList); // 初始化地图情报数据并且绘制图层
      }
      // console.log(this.intelligenceeventList);
    },

    // 设备图层绘制
    equipmentLayersDraw(equipmentList) {
      let data = [];
      equipmentList.map(t => {
        let point = [];
        point.push(t.longitude, t.latitude);
        data.push({
          // coordtransform.wgs84togcj02(point[0], point[1])
          point: point, // 设备坐标
          id: t.id, // 数据id
          intelligenceId: t.equipmentType // 设备类型
        });
      });
      this.mapGis.removeLayer(this.equipmentLayers); // 先删除上一次画出的设备图层
      this.equipmentLayers = GisClassMethod.CoordinateTracingPointImg(
        data,
        0.35
      ); // 初始化设备图层
      this.mapGis.addLayer(this.equipmentLayers); // 添加新的设备图层
    },
    // 绘制点位图层
    pointPositionLayersDraw(pointList) {
      let data = [];
      pointList.map(t => {
        let point = [];
        point.push(t.longitude, t.latitude);
        data.push({
          // coordtransform.wgs84togcj02(point[0], point[1])
          point: point, // 点位坐标
          id: t.id, // 数据id
          intelligenceId: "d110" // 点位图标选择
        });
      });
      this.mapGis.removeLayer(this.pointPositionLayers); // 先删除上一次画出的设备图层
      this.pointPositionLayers = GisClassMethod.CoordinateTracingPointImg(
        data,
        0.9
      ); // 初始化设备图层
      this.mapGis.addLayer(this.pointPositionLayers); // 添加新的设备图层
    },
    // 点击工具箱，出现或隐藏
    kitShowOrHide() {}
  },
  async mounted() {
	  console.log("Start 【mounted】 ......");
    // 登录再执行
    if (this.$store.state.userLogin) {
      await this.InitCarGis([]); // 初始化地图底层
      // 地图初始化完毕之后先拿到层级和四角坐标
      this.getMapmessing();
      // 监听路由变化看是否是从一级跳转到本路由还是从交通流分析二级路由跳转到本路由
      let code = this.$route.query.pageStatus;
      if (!code) {
        // 如果传参为空则是第一次登陆或者从其他一级路由跳转过来
        let power = this.$store.state.loginModel;
        let infoAnalysis = power.find(val => val.t.name === "情指勤督");
        if (infoAnalysis) {
			console.log("【mounted】requestInitializationIntelligence ");
          this.requestInitializationIntelligence();
        }
      } else {
        // 如果传参不为空则是交通流分析二级路由跳转到本路由
        // let codeName = "";
        // switch (code) {
        //     case "trafficFlow":
        //         codeName = "trafficLow";
        //         break;
        //     case "tidalWatch":
        //         codeName = "tidalLow";
        //         break;
        //     case "ODwatch":
        //         codeName = "ODLow";
        //         break;
        //     case "carWatch":
        //         codeName = "carLow";
        //         break;
        // }
        this.changePageStatus(code); // 调用切换状态函数
      }
      this.SaveDom = document.getElementsByClassName("d_tooltip")[0]; // 取到特殊事件弹窗的节点，默认写在dom数里，为后面深复制节点使用
      this.trafficWatchSaveDom = document.getElementsByClassName(
        "d_trafficWatchEarch"
      )[0]; // 取到交通构成默认弹窗的节点，默认写在dom数里，为后面深复制节点使用

      // 浏览默认点击退出全屏或者点击esc退出全屏监听
      window.onresize = function() {
        function checkFull() {
          // document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
          // document.fullScreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
          let isFull =
            document.fullScreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
          //to fix : false || undefined == undefined
          if (isFull === undefined || isFull === null) {
            isFull = false;
          }
          return isFull;
        }
        if (!checkFull()) {
          // 要执行的动作
          this.mapGis.removeLayer(this.bottomMapLayer); // 清除所有图层包括底层图层
          this.MapexitFullScreen("anme");
        }
      }.bind(this);
	  console.log("【mounted】finished ......");
    }
  },

  //TODO 底部栏的11个位置名称
  created() {
    this.eraseTimer(); // 每次进入最先关闭所有定时器，热刷新好像关不掉定时器
    // （登录了再执行）
    if (!this.$store.state.userLogin) {
      this.$router.push({
        path: "/login"
      });
    } else {
      this.specialEventSet = [];
      this.$store.commit("setSpecialEventSet", []); // 清空特殊事件缓存
      let power = this.$store.state.loginModel;
      let infoAnalysis = power.find(val => val.t.name === "情指勤督");
      let trafficFlow = power.find(val => val.t.name === "交通流管控");
      let bottomBtn = [];
      if (infoAnalysis) {
        bottomBtn.push({
          name: "情报告警",
          id: 1,
          method: "eventBulletin",
          typeIndex: 1,
          checked: false,
          srcJ: eventBulletinImg, // 选中
          srcP: UneventBulletinImg // 未选中
        });
      }
      if (trafficFlow) {
        bottomBtn.push(
          {
            name: "交通状态观测",
            id: 2,
            method: "trafficFlow",
            typeIndex: 2,
            checked: false,
            src: UntrafficFlowImg, // 未选中
            srcJ: trafficFlowImg, // 选中
            srcP: UntrafficFlowImg, // 未选中
            children: [
              {
                name: "交通状态观测",
                id: 2,
                method: "trafficFlow",
                typeIndex: 2,
                checked: false,
                src: UntrafficFlowImg,
                srcJ: trafficFlowImg, // 选中
                srcP: UntrafficFlowImg // 未选中
              },
              {
                name: "拥堵规律分析",
                id: 3,
                method: "trafficLow",
                typeIndex: 2,
                checked: false,
                src: UntrafficLowImg,
                srcJ: trafficLowImg, // 选中
                srcP: UntrafficLowImg // 未选中
              }
            ]
          },
          {
            name: "OD观测",
            id: 4,
            method: "ODwatch",
            typeIndex: 3,
            checked: false,
            src: UnODwatchImg, // 未选中
            srcJ: ODwatchImg, // 选中
            srcP: UnODwatchImg, // 未选中
            children: [
              {
                name: "OD观测",
                id: 4,
                method: "ODwatch",
                typeIndex: 3,
                checked: false,
                src: UnODwatchImg,
                srcJ: ODwatchImg, // 选中
                srcP: UnODwatchImg // 未选中
              },
              {
                name: "OD规律",
                id: 5,
                method: "ODLow",
                typeIndex: 3,
                checked: false,
                src: UnODLowImg,
                srcJ: ODLowImg, // 选中
                srcP: UnODLowImg // 未选中
              }
            ]
          },
          {
            name: "潮汐流观测",
            id: 6,
            method: "tidalWatch",
            typeIndex: 4,
            checked: false,
            src: UntidalWatchImg, // 未选中
            srcJ: tidalWatchImg, // 选中
            srcP: UntidalWatchImg, // 未选中
            children: [
              {
                name: "潮汐流观测",
                id: 6,
                method: "tidalWatch",
                typeIndex: 4,
                checked: false,
                src: UntidalWatchImg,
                srcJ: tidalWatchImg, // 选中
                srcP: UntidalWatchImg // 未选中
              },
              {
                name: "潮汐流规律",
                id: 7,
                methodName: "tidalLow",
                typeIndex: 4,
                method: "tidalLow",
                checked: false,
                src: UntidalLowImg,
                srcJ: tidalLowImg, // 选中
                srcP: UntidalLowImg // 未选中
              }
            ]
          },
          {
            name: "交通构成观测",
            id: 8,
            method: "trafficWatch",
            typeIndex: 5,
            checked: false,
            srcJ: trafficWatchImg, // 选中
            srcP: UntrafficWatchImg // 未选中
          },
          {
            name: "营运车辆观测",
            id: 9,
            method: "carWatch",
            typeIndex: 6,
            checked: false,
            src: UncarWatchImg, // 未选中
            srcJ: carWatchImg, // 选中
            srcP: UncarWatchImg, // 未选中
            children: [
              {
                name: "营运车辆观测",
                id: 9,
                method: "carWatch",
                typeIndex: 6,
                checked: false,
                src: UncarWatchImg,
                srcJ: carWatchImg, // 选中
                srcP: UncarWatchImg // 未选中
              },
              {
                name: "营运车辆规律",
                id: 10,
                methodName: "carLow",
                typeIndex: 6,
                method: "carLow",
                checked: false,
                src: UncarLowImg,
                srcJ: carLowImg, // 选中
                srcP: UncarLowImg // 未选中
              }
            ]
          },
          {
            name: "路口交通观测",
            id: 11,
            method: "roadWatch",
            typeIndex: 7,
            checked: false,
            srcJ: roadWatchImg, // 选中
            srcP: UnroadWatchImg // 未选中
          }
        );
      }
      // 监听路由变化看是否是从一级跳转到本路由还是从交通流分析二级路由跳转到本路由
      let code = this.$route.query.pageStatus;
      if (!code) {
        // 如果传参为空则是第一次登陆或者从其他一级路由跳转过来
        bottomBtn[0].checked = true;
        this.bottomBtn = bottomBtn;
        this.ifEventBulletin = true; // 打开右侧情报列表
        this.pageStatus = "eventBulletin"; // 默认展示情报告警
      } else {
        // 如果传参不为空则是交通流分析二级路由跳转到本路由
        let item = "";
        bottomBtn.map(t => {
          if (t.children) {
            t.children.map(e => {
              if (e.method === code) {
                t.src = e.srcJ;
                e.src = e.srcJ;
                item = e;
              }
            });
          }
        });
        item.checked = true;
        this.ifEventBulletin = false; // 关闭右侧情报列表
        this.bottomBtn = bottomBtn;
      }
      // 开启设备接口
      // sjhAxios.post("sjh5/realtime/realtimeSwitch", {}).then((res) => {

      // })
		console.log("【created】pointListofIntelligenceEquipment");
      this.pointListofIntelligenceEquipment(); // 请求情报，设备，点位列表

      // 获取点位列表
      axios
        .get("/intersection/?status=1&monitor=0")
        .then(res => {
          this.pointList = res.data.data;
          // console.log(this.pointList);
        })
        .catch(error => {
          this.pointList = [];
          //   this. $showSimpleMessage(error, "error");
        });
      // 获取设备列表
      // axios.get("/equipment/?status=1").then(res => {
      //     this.equipmentList = res.data.data;
      //     // console.log(this.equipmentList);
      // }).catch(error => {
      //     this.equipmentList = [];
      //     this. $showSimpleMessage(error, "error");
      // });
    }
  },
  beforeDestroy() {
    this.$store.commit("setSpecialEventSet", []); // 清空特殊事件缓存
    // 组件状态销毁时清除所有的定时器
    // clearInterval(this.eventBulletinTimer);
    this.eraseTimer();
    // 清除本页的特有的loding实例
    if (this.mapLoading) {
      this.mapLoading.close();
      this.mapLoading = "";
    }
  }
};
</script>


