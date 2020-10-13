<template>
    <div>
        <el-dialog title="情报详情" :close-on-press-escape="false"  :visible.sync="eventDetail" width="460px" :before-close="handleClose" :lock-scroll="true" v-dialogDrag :show-close="true" :close-on-click-modal="false" class="tems_dialog eveventDetail">
            <div style="max-height: 500px;overflow: auto;" v-if="this.tableData.intelligenceStatus === '1'">
                <el-form label-width="140px" class="demo-ruleForm">
                   <div class="infoItemInfo" style="text-align: left;color: #25d7fd;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                        <el-form-item class="infoItem" label="事件类型：">
                            <el-button :title="this.shijianTypeName" class="log_form_btn">{{this.shijianTypeName}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件名称：">
                            <el-button :title="this.tableData.name" class="log_form_btn">{{this.tableData.name}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件发生时间：">
                            <el-button :title="this.tableData.startTime || '无'" class="log_form_btn">{{this.tableData.startTime}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件结束时间：">
                            <el-button :title="this.tableData.endTime || '无'" class="log_form_btn">{{this.tableData.endTime}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="行政区域（镇）：">
                            <el-button :title="this.tableData.area || this.tableData.districtRegionId" class="log_form_btn">{{this.tableData.area || this.tableData.districtRegionId}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件级别：">
                            <el-button :title="this.tableData.level+'级' || '无'" class="log_form_btn">{{this.tableData.level+'级' || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件状态：">
                            <el-button :title="this.tableData.Status" class="log_form_btn">{{this.tableData.Status}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="备注：">
                            <el-button :title="this.tableData.remark || '无'" class="log_form_btn">{{this.tableData.remark || "无"}}</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>           
            
            <div style="max-height: 500px;overflow: auto;" v-if="this.tableData.incidentEndTime === null">
                <el-form label-width="140px" class="demo-ruleForm">
                    <!-- 事件详情显示公有部分 -->
                    <div class="infoItemInfo" style="text-align: left;color: #25d7fd;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                        <el-form-item class="infoItem" label="事件编号：">
                            <el-button :title="this.tableData.number || this.tableData.incidentId || '无'" class="log_form_btn">{{this.tableData.number || this.tableData.incidentId || "无"}}</el-button>
                        </el-form-item>
                    <!-- <div class="infoItemInfo" v-if="this.tableData.intelligenceStatus === '1'" style="text-align: left;color: #25d7fd;"> -->
                        <el-form-item class="infoItem" label="事件类型：">
                            <el-button :title="this.shijianTypeName" class="log_form_btn">{{this.shijianTypeName}}</el-button>
                        </el-form-item>
                    <!-- </div> -->
                        <!-- <el-form-item class="infoItem" label="缩略图：">
                            <el-button :title="this.tableData.shortCutFile || '无'" class="log_form_btn">{{this.tableData.shortCutFile || '无'}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="现场原图：">
                            <el-button :title="this.tableData.originalFile || '无'" class="log_form_btn">{{this.tableData.originalFile || '无'}}</el-button>
                        </el-form-item> -->
                        <!-- njc写的 -->
                        <el-form-item class="infoItem" label="摄像机id：">
                            <el-button :title="this.tableData.cameraId" class="log_form_btn">{{this.tableData.cameraId}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="置信度：">
                            <el-button :title="this.tableData.reliability" class="log_form_btn">{{this.tableData.reliability}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件发生时间：">
                            <el-button :title="this.tableData.startTime || '无'" class="log_form_btn">{{this.tableData.startTime}}</el-button>
                        </el-form-item>
<!--                        <el-form-item class="infoItem" label="事件结束时间：">
                            <el-button :title="this.tableData.endTime || '无'" class="log_form_btn">{{this.tableData.endTime}}</el-button>
                        </el-form-item> -->
                        <!-- <el-form-item class="infoItem" label="地区测试(经度)：">
                            <el-button :title="jingweidu2.longitude || '无'" class="log_form_btn">{{jingweidu2.longitude}}</el-button>
                        </el-form-item> -->
                        <el-form-item class="infoItem" label="经度：">
                            <el-button :title="this.tableData.longitude || '无'" class="log_form_btn">{{this.tableData.longitude || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="纬度：">
                            <el-button :title="this.tableData.latitude || '无'" class="log_form_btn">{{this.tableData.latitude || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="点位名称：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.eventPointname || '无'" class="log_form_btn">{{this.tableData.eventPointname || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="辖区大队：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.popedomId || '无'" class="log_form_btn">{{this.tableData.popedomId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="行政区域（镇）：">
                            <el-button :title="this.tableData.area || this.tableData.districtRegionId" class="log_form_btn">{{this.tableData.area || this.tableData.districtRegionId}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="天气特征：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.weatherType || '无'" class="log_form_btn">{{this.tableData.weatherType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件总时长：">
                            <el-button :title="this.tableData.incidentLength || '无'" class="log_form_btn">{{this.tableData.incidentLength || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件级别：">
                            <el-button :title="this.tableData.level || '无'" class="log_form_btn">{{this.tableData.level || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事件状态：">
                            <el-button :title="this.tableData.Status" class="log_form_btn">{{this.tableData.Status}}</el-button>
                        </el-form-item>
                        <!-- <el-form-item class="infoItem" label="视频地址：">
                            <el-button :title="this.tableData.videoAddr || '无'" class="log_form_btn">{{this.tableData.videoAddr || "无"}}</el-button>
                        </el-form-item> -->
                        <el-form-item class="infoItem" label="备注：">
                            <el-button :title="this.tableData.remark || '无'" class="log_form_btn">{{this.tableData.remark || "无"}}</el-button>
                        </el-form-item>
                        <!-- njc写的 -->
                        <!-- <el-form-item class="infoItem" label="事件类型状态：">
                            （显示，0不显示）
                            <el-button :title="this.tableData.alarmStatus" class="log_form_btn">{{this.tableData.alarmStatus}}</el-button>
                        </el-form-item> -->
                        <!-- <el-form-item class="infoItem" label="当前时间：">
                            当前时间不为空的时候 查询结束时间小于等于当前时间的数据（档案用）
                            <el-button :title="this.tableData.currentTime" class="log_form_btn">{{this.tableData.currentTime}}</el-button>
                        </el-form-item> -->
                        <!-- <el-form-item class="infoItem" label="事件名称：">
                            <el-button :title="this.tableData.name || '无'" class="log_form_btn">{{this.tableData.name || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="关闭事件时间：">
                            <el-button :title="this.tableData.closeTime" class="log_form_btn">{{this.tableData.closeTime}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="创建时间：">
                            <el-button :title="this.tableData.createdTime || '无'" class="log_form_btn">{{this.tableData.createdTime || "无"}}</el-button>
                        </el-form-item> -->
                    </div>
                    <!-- 事件详情显示特有部分 -->
                    <!-- 交通溢出拥堵 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '1'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="溢出方向：">
                            <el-button :title="this.tableData.overFlow || '无'" class="log_form_btn">{{this.tableData.overFlow || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 路段交通严重拥堵 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '2'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="拥堵里程：">
                            <el-button :title="this.tableData.congestMileage || '无'" class="log_form_btn">{{this.tableData.congestMileage || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="路段平均车速：">
                            <el-button :title="this.tableData.speed || '无'" class="log_form_btn">{{this.tableData.speed || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="严重拥堵状态稳定时长：">
                            <el-button :title="this.tableData.congestStableLength || '无'" class="log_form_btn">{{this.tableData.congestStableLength || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="严重拥堵消散持续时长：">
                            <el-button :title="this.tableData.congestDissiplateLength || '无'" class="log_form_btn">{{this.tableData.congestDissiplateLength || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="拥堵状态：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.congestStatus || '无'" class="log_form_btn">{{this.tableData.congestStatus || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="拥堵类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.congestType || '无'" class="log_form_btn">{{this.tableData.congestType || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 信号灯不正常显示 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '4'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="信号方向：">
                            <el-button :title="this.tableData.signalDirection || '无'" class="log_form_btn">{{this.tableData.signalDirection || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 交通事故 -->
                    <div class="infoItemInfo"  style="text-align: left;color: #25d7fd;">
                    <!-- <div class="infoItemInfo" v-if="this.tableData.incidentType === '5'" style="text-align: left;color: #25d7fd;"> -->
                        <el-form-item class="infoItem" label="现场撤离时间：">
                            <el-button :title="this.tableData.evacuationSite || '无'" class="log_form_btn">{{this.tableData.evacuationSite || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="事故形态：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.incidentForm || '无'" class="log_form_btn">{{this.tableData.incidentForm || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plaplateNoteNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 车辆逆行 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '6'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 不文明停车 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '7'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 烟雾/火灾 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '8'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 道路积水 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '9' || this.tableData.intelligenceId === '10001'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 机动车闯红灯 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '10'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 行人闯红灯 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '11'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="闯红灯方向：">
                            <el-button :title="this.tableData.redDirection || '无'" class="log_form_btn">{{this.tableData.redDirection || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="性别：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.sex || '无'" class="log_form_btn">{{this.tableData.sex || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="民族：">
                            <el-button :title="this.tableData.nation || '无'" class="log_form_btn">{{this.tableData.nation || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="年龄：">
                            <el-button :title="this.tableData.age || '无'" class="log_form_btn">{{this.tableData.age || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="头部特征：">
                            <el-button :title="this.tableData.headFeature || '无'" class="log_form_btn">{{this.tableData.headFeature || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="上身衣服颜色：">
                            <el-button :title="this.tableData.clothesColor || '无'" class="log_form_btn">{{this.tableData.clothesColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="上身衣服纹理：">
                            <el-button :title="this.tableData.clolthesTexture || '无'" class="log_form_btn">{{this.tableData.clolthesTexture || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 行人翻越护栏 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '12'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="性别：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.sex || '无'" class="log_form_btn">{{this.tableData.sex || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="民族：">
                            <el-button :title="this.tableData.nation || '无'" class="log_form_btn">{{this.tableData.nation || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="年龄：">
                            <el-button :title="this.tableData.age || '无'" class="log_form_btn">{{this.tableData.age || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="头部特征：">
                            <el-button :title="this.tableData.headFeature || '无'" class="log_form_btn">{{this.tableData.headFeature || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="上身衣服颜色：">
                            <el-button :title="this.tableData.clothesColor || '无'" class="log_form_btn">{{this.tableData.clothesColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="上身衣服纹理：">
                            <el-button :title="this.tableData.clolthesTexture || '无'" class="log_form_btn">{{this.tableData.clolthesTexture || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="目标联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 非机动车闯灯 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '13'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="闯红灯方向：">
                            <el-button :title="this.tableData.redDirection || '无'" class="log_form_btn">{{this.tableData.redDirection || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="非机动车特征：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="非机动车驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="非机动车驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="非机动车驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 牌照无法识别 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '15'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 状态异常车辆识别 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '16'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="行车轨迹：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="行驶方向：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="预计下一个出现地点：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 车辆偏离路线 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '17'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="行车轨迹：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="行驶方向：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="预计下一个出现地点：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="该车辆的预定行车路线和通过时间：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                    </div>
                    <!-- 交通流量异常 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '18'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="异常车流量值：">
                            <el-button :title="this.tableData.abnormalCount || '无'" class="log_form_btn">{{this.tableData.abnormalCount || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="历史同期车流量值：">
                            <el-button :title="this.tableData.histooryAbnormalCount || '无'" class="log_form_btn">{{this.tableData.histooryAbnormalCount || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 车型构成异常 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '19'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="异常车型构成值：">
                            <el-button :title="this.tableData.abnormalCarValue || '无'" class="log_form_btn">{{this.tableData.abnormalCarValue || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="历史同期车型构成值：">
                            <el-button :title="this.tableData.histooryAbnormalCarValue || '无'" class="log_form_btn">{{this.tableData.histooryAbnormalCarValue || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 违反限行 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '20'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="车辆行驶路径：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 报废车辆上路行驶 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '21'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="车辆行驶路径：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                    <!-- 逾期未检车辆上路行驶 -->
                    <div class="infoItemInfo" v-if="this.tableData.incidentType === '22'" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="车辆行驶路径：">
                            <el-button title="不知道" class="log_form_btn">不知道</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌号码：">
                            <el-button :title="this.tableData.plateNo || '无'" class="log_form_btn">{{this.tableData.plateNo || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="号牌类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.plateType || '无'" class="log_form_btn">{{this.tableData.plateType || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆类型：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.category || '无'" class="log_form_btn">{{this.tableData.category || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆型号：">
                            <!-- 可能需要转换 -->
                            <el-button :title="this.tableData.vehicleModel || '无'" class="log_form_btn">{{this.tableData.vehicleModel || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车身颜色：">
                            <el-button :title="this.tableData.vehiclelColor || '无'" class="log_form_btn">{{this.tableData.vehiclelColor || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="车辆标识物：">
                            <el-button :title="this.tableData.vehicleMark || '无'" class="log_form_btn">{{this.tableData.vehicleMark || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员姓名：">
                            <el-button :title="this.tableData.targetName || '无'" class="log_form_btn">{{this.tableData.targetName || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员身份证号：">
                            <el-button :title="this.tableData.targetId || '无'" class="log_form_btn">{{this.tableData.targetId || "无"}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="驾驶员联系方式：">
                            <el-button :title="this.tableData.targetTel || '无'" class="log_form_btn">{{this.tableData.targetTel || "无"}}</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum" style="line-height: 30px;color: #fff;">
                    <div class="tems_Button qiliang log_close" v-if="this.tableData.alarm" @click="clearWarn">取消告警</div>
                    <!-- <div class="tems_Button qiliang log_close" v-if="this.tableData.number !== '9' && this.tableData.number !== '26' " @click="watchVideo">查看视频</div> -->
                    <div class="tems_Button qiliang log_close" v-if="this.tableData.Videodisplay" @click="watchVideo">查看视频</div>
                    <!-- <div class="tems_Button qiliang log_close" @click="watchVideo">查看视频</div> -->
                    <div class="tems_Button inportBtn log_close" @click="handleClose">关 闭</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>
.flexNum {
  display: flex;
  justify-content: space-around;
}
</style>

<script>
export default {
    props: ["pointList", "equipmentList"],
    data() {
        return {
            eventDetail: false,
            detailsfData: {},
            tableData: {}
        }
    },
    watch: {
        "detailsfData": {
            immediate: true,
            handler: function (val, oldval) {
                
                console.log(this.detailsfData);
                console.log(val);
                
                this.detailsfData.level = this.detailsfData.level ? this.detailsfData.level : "无";
                // this.tableData = this.$tools.deepCopy(this.detailsfData); // 深复制对象
                this.tableData = val; // 深复制对象
                // 事件类型名称
                // if (this.tableData.intelligenceName) {
                //     this.shijianTypeName = this.tableData.intelligenceName;
                // } else if (this.tableData.incidentType) {
                //     this.shijianTypeName = this.$store.state.venteType.find(t => t.id === this.tableData.incidentType).name;
                // } else {
                //     this.shijianTypeName = "无";
                // }
                    //(njc写的,没成功)事件类型名称判定和地区提取经纬度
                if (this.tableData.intelligenceStatus === "1") {
                    this.shijianTypeName = this.tableData.intelligenceName;
                } else if (this.tableData.incidentType) {
                    this.shijianTypeName = this.$store.state.venteType.find(t => t.id == this.tableData.incidentType).name;
                } else {
                    this.shijianTypeName = "无";
                }
                // let jingweidu = this.tableData.location;
                // let jingweidu2 =JSON.parse(JSON.parse(jingweidu));
                // 事件备注
                this.tableData.remark = (typeof(this.tableData.remark) === "string") ? this.tableData.remark : "无";
                // 事件开始时间
                this.tableData.startTime = this.tableData.incidentStartTime ? this.$filter.formatDateTime(this.tableData.incidentStartTime) : (this.tableData.startTime ? this.$filter.formatDateTime(this.tableData.startTime) : "无");
                // 事件结束时间
                this.tableData.endTime = this.tableData.incidentEndTime ? this.tableData.incidentEndTime : (this.tableData.endTime ? this.$filter.formatDateTime(this.tableData.endTime) : "无");
                // 事件状态
                this.tableData.Status = this.tableData.intelligenceStatus ?  (this.tableData.intelligenceStatus === "1" ? "开启" : "关闭") : (this.tableData.incidentStatus === "0" ? "开启" : "关闭");
                // 事件等级
                this.tableData.level = this.tableData.level ? this.tableData.level : "无";

                // 查看视频// 取消告警
                if (this.tableData.hasOwnProperty("number") && (this.tableData.number === "9" || this.tableData.number === "26")) {
                    this.tableData.alarm = this.tableData.intelligenceStatus === "1" ? false : true;
                    this.tableData.Videodisplay = false; // 判断是否显示查看视频按钮自定义事件没有视频
                }
                if (this.tableData.hasOwnProperty("incidentType")) {
                    // this.tableData.alarm = this.tableData.incidentStatus === "1" ? false : true;
                    this.tableData.alarm = false;
                    this.tableData.Videodisplay = true; // 判断是否显示查看视频按钮自定义事件没有视频
                }
                // 事件点位名称
                if (this.tableData.cameraId) {
                    let item = this.equipmentList.find(t => t.id === this.tableData.cameraId);
                    this.tableData.eventPointname = item ? item.intersectionName : "无";
                } else {
                    this.tableData.eventPointname = "无";
                }
            },
            deep: true
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.eventDetail = false;
            this.$emit("showOrHide");
        },
        watchVideo() {
            this.$emit("showOrHide", this.tableData);
        },
        // 取消告警
        clearWarn() {
            this.$emit("eventDetailClearWarn", "eventDetailName");
        }
    }
}
</script>
<style>
.eveventDetail .log_form_btn {
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 11px 8px;
  color: #53d4f9;
  cursor: default;
}
.eveventDetail .el-form-item {
  margin-bottom: 0;
}
.eveventDetail .el-form-item .el-button {
    background-color: #071b35!important;
}
</style>

