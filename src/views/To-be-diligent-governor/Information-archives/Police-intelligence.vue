<!--告警情报档案-->
<template>
    <div>
        <api>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                        :searchName="searchName"
                        @searchEvent="handlerSearchEvent" >
            </SearchPage>
            搜索栏 右边操作按钮
            <!--<div slot="searchBoxBar" class="operation">
                <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>-->
            <!--表格栏  -->
            <TableCommonPut slot="table" ref="tableCommon" :buttonList="buttonList2" :reFresh="reFresh" @update:reFresh="val=>reFresh = val" @selectArySlected="selectArySlected" :table-list="tableList" @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
        <!-- 创建和编辑查看弹窗 -->
        <el-dialog :close-on-press-escape="false"  :title="title" v-dialogDrag :show-close="true" @close="Dialog = false"
                   :visible.sync="Dialog" class="tems_dialog intelligence" width="470px" :close-on-click-modal="false">
            <div class="scrollPart changdu" id="scrollDPart">
                <el-form :disabled="(title === '告警情报详情' ? true : false)" :class="{isDisable: title === '告警情报详情'}"
                         :model="formValidate" :rules="ruleValidate" ref="formValidateEmpty" label-width="155px" class="demo-ruleForm" >
                    <div :style="{'width': (item.province ? '100%' : 'auto'), 'display': 'flex','flex-direction': 'column'}" v-for="(item, index) in DialogList" :key="index">
                        <el-form-item v-if="item.option" :class="item.class ? item.class: ''" :label="item.tableName+'：'" :prop="item.tableProp">
                            <el-select class="tems_Input" v-model="formValidate[DialogList[index].tableProp]" filterable clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请选择...')">
                                <el-option v-for="(items, index) in item.option" :key="index" :label="items.label" :value="items.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="item.button" :class="item.class ? item.class: ''" :label="item.tableName+'：'" :prop="item.tableProp">
                            <div style="border:1px solid;border-radius: 15px;color: rgb(76, 195, 236);padding:0 15px;cursor: pointer;" @click="showMapGis(item.tableProp)">{{item.btnName}}</div>
                        </el-form-item>
                        <el-form-item v-if="item.timeFunction" style="margin: 0px;" :class="item.class ? item.class: ''" :label="item.tableName+'：'">
                        </el-form-item>
                        <el-form-item v-if="item.timeFunction" :class="item.class ? item.class: ''" :label="''" label-width="0px" :prop="item.tableProp">
                            <el-date-picker v-if="item.timeFunction"
                                            v-model="formValidate[DialogList[index].tableProp]"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="!item.button && !item.timeFunction && !item.option" :class="item.class ? item.class: ''" :label="item.tableName+'：'" :prop="item.tableProp">
                            <el-input :title="formValidate[DialogList[index].tableProp]" :maxlength="item.length" class="tems_Input" v-model="formValidate[DialogList[index].tableProp]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!-- <div v-if="title === '视频'">
                 <video autoplay = "autoplay" loop="loop" :src="this.$store.state.videoUrl" style="position: absolute;" width="1000px" height = "500px">
                     &lt;!&ndash; your browser does not support the video tag &ndash;&gt;
                 </video>
             </div>-->
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="title === '告警情报详情'" class="tems_Button inportBtn dic_closed" @click="Dialog = false">关 闭</div>
                    <!--<div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="handleSubmit(formValidate)">保 存</div>-->
                </div>
            </div>
        </el-dialog>
        <!--查看视频弹窗-->
        <el-dialog :close-on-press-escape="false"  :title="title" v-dialogDrag :show-close="true" @close="Dialogll = false"
                    :visible.sync="Dialogll" class="tems_dialog intelligence" width="1000px" height = "500px" :close-on-click-modal="false">
            <div>
                <!-- this.$store.state.videoUrl -->
                <!-- <video controls="controls" autoplay = "autoplay" loop="loop" :src="'http://10.20.5.19/' + watchVideoUrl" width="1000px" height = "500px"> -->
                <video controls="controls" autoplay = "autoplay" loop="loop" :src="watchVideoUrl" width="1000px" height = "500px">
                    <!-- your browser does not support the video tag -->
                </video>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="title === '视频'" class="tems_Button inportBtn dic_closed" @click="Dialogll = false">关 闭</div>
                    <!--<div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="handleSubmit(formValidate)">保 存</div>-->
                </div>
            </div>
        </el-dialog>
        <el-dialog :close-on-press-escape="false" :title="titlel" v-dialogDrag :show-close="true" @close="DialogllP = false"
                    :visible.sync="DialogllP" class="tems_dialog intelligence" width="800px" height = "800px" :close-on-click-modal="false">
            <div>
               <img style="width:97%;min-height:200px;max-height:500px;padding:10px;" :src="picture"/>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="titlel === '查看缩略图'" class="tems_Button inportBtn dic_closed" @click="DialogllP = false">关 闭</div>
                    <div v-if="titlel === '查看现场图'" class="tems_Button inportBtn dic_closed" @click="DialogllP = false;">关 闭</div>
                    <!--<div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '告警情报详情'" class="tems_Button qiliang dic_closed" @click="handleSubmit(formValidate)">保 存</div>-->
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "assetDictionary",
        components: {
        },
        data() {
            return {
                guanxia: "",
                picture: "",
                // 当前时间转换
                timedata: this.$filter.timesFormat(new Date()),
                thistime: this.$tools.setTimeUse(this.timedata),
                thistimel: this.$tools.nowTime(this.timedata),
                // 视频地址
                watchVideoUrl: "",
                // 按钮
                buttonList: [
                    {
                        title: "导出",
                        plain: true,
                        type: "primary",
                        size: "small",
                        class: "qiliang",
                        functionKeyName: "exportExcle"
                    },
                    /* {
                         title: "创建",
                         plain: true,
                         type: "primary",
                         size: "small",
                         class: "qiliang",
                         functionKeyName: "operationDariy"
                     }*/
                ],
                buttonList2: [
                    {
                        title: "查看",
                        plain: true,
                        size: "mini",
                        type: "primary",
                        disabled: false
                    },
                    {
                        title: "视频",
                        plain: true,
                        size: "mini",
                        type: "primary",
                        disabled: false
                    },
                    {
                        title: "缩略图",
                        plain: true,
                        size: "mini",
                        type: "primary",
                        disabled: false
                    },
                ],
                searchName1:  {
                    currentTime: "1540280800000",
                    size: 60
                },
                // 搜索传参
                searchName: [
                    { searchPlaceholder: "事件编号", id: 1, type: 0, url: "", Sendkey: "incidentId" },
                    { searchPlaceholder: "事件类型", id: "name", type: 1, url: "", Sendkey: "incidentType", getDataKey: "name", data: this.$store.state.venteType},
                    { searchPlaceholder: "开始时间", id: "", type: 7, url: "", Sendkey: "incidentStart1", data: "", time: "",overToday: true },
                    { searchPlaceholder: "至", id: "", type: 8, url: "", Sendkey: "incidentStart2", data: "", time: "",overToday: true },
                    { searchPlaceholder: "事件地点", id: "id", type: 0, url: "", Sendkey:
                            "address", getDataKey: "address" },
                    { searchPlaceholder: "管辖单位", id: "id", url: "department/special/all", type: 2, Sendkey: "popedomId", getDataKey: "name" },
                    { searchPlaceholder: "区域", type: 9, Sendkey: "administrativeId", data: this.$store.state.area },
                    { searchPlaceholder: "事件状态", id: "id", type: 1, url: "", Sendkey: "flag", data: [{ id: 0, name:
                                "进行中" }, { id: 1, name: "已结束" }, { id: 2, name: "全部" }] },
                ],
                // 表格组件传参列表
                tableList: {
                    thisPageSize: 10,
                    getDataUrl: "/incidents/selectnew",//realtime/incidents
                    params: [],
                    selection: false, // 是否有选中框
                    scope: "0", // 是否有操作栏
                    width: "250", // 操作宽度
                    index: true, // 是否有序号
                    // 表格表头名称和要加载的prop
                    // hover(是否显示表格鼠标划入有无弹窗)；
                    // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                    // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                    // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                    // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                    // keyChange里的pand（转换的列表）
                    list: [
                        { tableName: "事件编号", tableProp: "incidentId", hover: true, },
                        { tableName: "事件类型",
                            tableProp: "incidentType",
                            hover: true,
                            keyChange: { keyName: "id", keyValue: "name" },
                            pand: this.$store.state.venteType
                        },
                        { tableName: "事件开始时间", width: 120, tableProp: "incidentStartTime", time:"time", hover: true, },
                        { tableName: "事件结束时间", width: 120, tableProp: "incidentEndTime", time:"time" , hover: true,},
                        { tableName: "事件级别", width: 60, tableProp: "incidentLevel" },
                        { tableName: "事件地点", tableProp: "address" },
                        { tableName: "管辖单位", tableProp: "popedomId" },
                        { tableName: "区域", width: 100,
                            tableProp: "administrativeId",
                            hover: true,
                            keyChange: { keyName: "id", keyValue: "name" },
                            pand: this.$store.state.area
                        },
                        { tableName: "事件状态", width: 60,
                            tableProp: "incidentStatus",
                            hover: true,
                            keyChange: { keyName: "id", keyValue: "name" },
                            pand: [{ id: "0", name: "发生中" }, { id: "1", name: "已结束" }]
                        }
                    ]
                },
                DialogList: [
                    { tableName: "事件id", tableProp: "incidentId" },
                    { tableName: "摄像头id", tableProp: "cameraId" },
                    { tableName: "车牌号码", tableProp: "plateNo" },
                    { tableName: "车牌类型", tableProp: "plateType" },
                    { tableName: "车辆类型", tableProp: "category" },
                    { tableName: "车辆型号", tableProp: "vehicleModel" },
                    { tableName: "车身颜色", tableProp: "vehiclelColor" },
                    { tableName: "车辆标识物", tableProp: "vehicleMark" },
                    { tableName: "性别", tableProp: "sex" },
                    { tableName: "民族", tableProp: "nation" },
                    { tableName: "年龄", tableProp: "age" },
                    { tableName: "头部特征", tableProp: "headFeature" },
                    { tableName: "上身衣服颜色", tableProp: "clothesColor" },
                    { tableName: "上身衣服纹理", tableProp: "clolthesTexture" },
                    { tableName: "目标姓名", tableProp: "targetName" },
                    { tableName: "目标身份证号", tableProp: "targetId" },
                    { tableName: "目标联系方式", tableProp: "targetTel" },
                    { tableName: "天气特征", tableProp: "weatherType" },
                    { tableName: "地点", tableProp: "address" },
                    { tableName: "出现时间", tableProp: "apprTime" },
                    { tableName: "现场图", tableProp: "originalFile", button:"button", btnName:"现场图"},
                    { tableName: "事件类型", tableProp: "incidentType", option:[],
                        url:"intelligence/?custom=custom",
                        changName: "name",
                        changid: "id"
                    },
                    { tableName: "事件处理类型", tableProp: "handleType" },
                    { tableName: "视频地址", tableProp: "videoAddr" },
                    { tableName: "文件名称", tableProp: "file" },
                    { tableName: "确认状态", tableProp: "confirmed" },
                    { tableName: "视频长度", tableProp: "timeLength" },
                    { tableName: "置信度", tableProp: "reliability" },
                    { tableName: "事件总时长", tableProp: "incidentLength" },
                    { tableName: "开始帧数", tableProp: "name" },
                    { tableName: "事件开始结束标识", tableProp: "flag" },
                    { tableName: "事件级别", tableProp: "incidentLevel",option:[
                            {label:"一级", value:"1"},
                            {label:"二级", value:"2"},
                            {label:"三级", value:"3"},
                            {label:"四级", value:"4"}
                        ] },
                    { tableName: "交通拥堵溢出方向", tableProp: "overFlow" },
                    { tableName: "拥堵里程", tableProp: "congestMileage" },
                    { tableName: "路段平均车速", tableProp: "speed" },
                    /*{ tableName: "轨迹编号", tableProp: "name" },*/
                    { tableName: "入方向", tableProp: "orient" },
                    { tableName: "出方向", tableProp: "direction" },
                    { tableName: "严重拥堵状态稳定时长", tableProp: "congestStableLength" },
                    { tableName: "严重拥堵消散持续时长", tableProp: "congestDissiplateLength" },
                    { tableName: "拥堵状态", tableProp: "congestStatus" },
                    { tableName: "拥堵类型", tableProp: "congestType" },
                    { tableName: "信号方向", tableProp: "signalDirection" },
                    { tableName: "现场撤离时间", tableProp: "evacuationSite" },
                    { tableName: "事故形态", tableProp: "incidentForm" },
                    { tableName: "闯红灯方向", tableProp: "redDirection" },
                    { tableName: "市", tableProp: "cityRegionId" },
                    { tableName: "区域", tableProp: "districtRegionId" },
                    { tableName: "路", tableProp: "roadRegionId" },
                    /* { tableName: "路口（点位）", tableProp: "name" },*/
                    { tableName: "辖区大队", tableProp: "popedomId" },
                    { tableName: "行政区域", tableProp: "administrativeId",option:[
                            { label: "咸水沽", value: "咸水沽" },
                            { label: "小站镇", value: "小站镇" },
                            { label: "北闸口镇", value: "北闸口镇" },
                            { label: "八里台镇", value: "八里台镇" },
                            { label: "双桥河镇", value: "双桥河镇" },
                            { label: "葛沽镇", value: "葛沽镇" },
                            { label: "双港镇", value: "双港镇" },
                            { label: "辛庄镇", value: "辛庄镇" }
                        ] },
                    { tableName: "异常车流量值", tableProp: "abnormalCount" },
                    { tableName: "历史同期车流量值", tableProp: "histooryAbnormalCount" },
                    { tableName: "异常车型构成值", tableProp: "abnormalCarValue" },
                    { tableName: "历史同期车型构成值", tableProp: "histooryAbnormalCarValue" },
                    { tableName: "经度", tableProp: "longitude" },
                    { tableName: "纬度", tableProp: "latitude" },
                    /*{ tableName: "事件起止时间", tableProp: "timeAll", timeFunction:"time"  },
                   */
                ],
                dataList: [/*{
                    "incidentId": "3",
                    "cameraId": "JN0006Q",
                    "carInfo": "cheliangxinxi",
                    "plateNo": "号牌号码",
                    "plateType": "号牌类型",
                    "category": "车辆类型",
                    "vehicleModel": "车辆型号",
                    "vehiclelColor": "车身颜色",
                    "vehicleMark": "车辆标识物",
                    "peopleInfo": "行人特征",
                    "sex": "性别",
                    "nation": "民族",
                    "age": "年龄",
                    "headFeature": "头部特征",
                    "clothesColor": "上身衣服颜色",
                    "clolthesTexture": "上身衣服纹理",
                    "targetName": "目标姓名",
                    "targetId": "目标身份证号",
                    "targetTel": "目标联系方式",
                    "weatherType": "天气特征",
                    "address": "地点",
                    "apprTime": "出现时间",
                    "shortCutFile": "缩略图",
                    "originalFile": "现场原图",
                    "incidentType": "事件类型",
                    "handleType": "事件处理类型",
                    "videoAddr": "视频地址",
                    "file": "文件名称",
                    "confirmed": "确认状态",
                    "timeLength": "视频长度",
                    "reliability": "置信度",
                    "incidentLength": "事件总时长",
                    "flag": "事件开始结束标识",
                    "incidentLevel": "事件级别",
                    "overFlow": "交通拥堵溢出方向",
                    "congestMileage": "拥堵里程",
                    "speed": "路段平均车速",
                    "orient": "入方向",
                    "direction": "出方向",
                    "fromDirection": "入方向",
                    "toDirection": "出方向",
                    "congestStableLength": "严重拥堵状态稳定时长",
                    "congestDissiplateLength": "严重拥堵消散持续时长",
                    "congestStatus": "拥堵状态",
                    "congestType": "拥堵类型",
                    "signalDirection": "信号方向",
                    "evacuationSite": "现场撤离时间",
                    "incidentForm": "事故形态",
                    "redDirection": "闯红灯方向",
                    "cityRegionId": "市",
                    "districtRegionId": "区",
                    "roadRegionId": "路",
                    "popedomId": "辖区大队",
                    "administrativeId": "行政区域",
                    "abnormalCount": "异常车流量值",
                    "histooryAbnormalCount": "历史同期车流量值",
                    "abnormalCarValue": "异常车型构成值",
                    "histooryAbnormalCarValue": "历史同期车型构成值",
                    "latitude": 44.58,
                    "longitude": 48.4
                }*/
                    {"index":"1","administrativeId":"咸水沽","apprTime":"2018-10-16 16:39:40","cameraId":"JN0006Q","districtRegionId":"120112101","file":"fileXXXXXX","flag":"0","incidentId":"ZFACFFYSIAPHX2WSLL05O65V7VE1BIAF","incidentType":"交通事故","latitude":44.58,"longitude":48.4,"originalFile":"originalXXXXXX","popedomId":"a单位","reliability":"89%","roadRegionId":"4","timeLength":7.16238542476781,"videoAddr":"videoXXXXXX"},
                    {"index":"2","administrativeId":"小站镇","apprTime":"2018-10-16 16:39:20","cameraId":"JN0006Q","districtRegionId":"120112107","file":"fileXXXXXX","flag":"1","incidentId":"CF6K3HZHWB1HAGRGSFLNW7DNK2YVU8RK","incidentType":"不文明停车","latitude":127.88,"longitude":253.95,"originalFile":"originalXXXXXX","popedomId":"b单位","reliability":"91%","roadRegionId":"5","shortCutFile":"XXXXXX","timeLength":8.402677073493084,"videoAddr":"videoXXXXXX"},
                    {"index":"3","administrativeId":"北闸口镇","apprTime":"2018-10-16 16:40:00","cameraId":"JN0002Q","districtRegionId":"120112104","file":"fileXXXXXX","flag":"1","incidentId":"657DM6TT98GU0FTHVHF7LL9OAHTW759Z","incidentType":"行人闯红灯","latitude":88.5,"longitude":89.26,"originalFile":"originalXXXXXX","popedomId":"c单位","reliability":"79%","roadRegionId":"2","timeLength":0.6086903674692834,"videoAddr":"videoXXXXXX"}
                ],
                RowId: "",
                scenePic: "",
                title: "创建自定义情报",
                titlel: "查看现场图",
                ruleValidate: {
                    intelligenceId: this.$CommonRule.SelectRule,
                    // name: this.$CommonRule.NotEmpty,
                    timeAll: this.$CommonRule.DateRuleNotTody,
                    startTime: this.$CommonRule.DateRule,
                    endTime: this.$CommonRule.DateRulelittleTody,
                    location: this.$CommonRule.SelectRule,
                    area: this.$CommonRule.SelectRule
                },
                // 弹窗表单
                formValidate: {},
                formValidateEmpty:{},
                // 弹窗显隐
                Dialog: false,
                Dialogll: false,
                DialogllP: false,
                // 当前页
                pageNum: 1,
                // 选中的数据
                selectAry: [],
                payload: "", // 搜索回调传入的搜索参数
                // 刷新页面
                reFresh: false,
                // 判断搜索回传的参数是否全是空的默认是全空
                Ifpayload: false
            };
        },
        methods: {
            timeOne() {
                //获取本月第一天零点零分零秒
                var data=new Date();
                data.setDate(1);
                data.setHours(0);
                data.setSeconds(0);
                data.setMinutes(0);
                // 返回当前时间到本月一号零点的秒数
                return (this.timedata-data.getTime())/1000;
            },
            timestart() {
                //时间戳转换
                function formatDateTime(inputTime) {
                    var date = new Date(inputTime);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
                };
                //获取本月第一天零点零分零秒
                var data=new Date();
                data.setDate(1);
                data.setHours(0);
                data.setSeconds(0);
                data.setMinutes(0);
                return formatDateTime(data.getTime());
            },
            timeout() {
                //时间戳转换
                    var date = new Date(this.timedata);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            checkAdult(item) {
                return item.name === "情指勤督";
            },
            checkButton(item) {
                return item.name === "情报档案";
            },
            checkButtondown(item) {
                return item.name === "自定义情报档案";
            },
            checkButtondownl(item) {
                return item.name === "告警情报档案";
            },
            // 地图绘制的按钮事件
            showMapGis(val) {
                // 取出点击图片的数据
                console.log(this.scenePic[val])
                // let shortCutFile = "data:image/gif;base64,"+this.scenePic[val];
                let shortCutFile = "http://192.168.31.88:80/event.png";
                this.picture = shortCutFile;
                this.DialogllP = true;
                this.titlel = "查看现场图";
               /* this.dialogVisible = true;
                this.mapDialogPoint = this.formValidate.location;
                if (this.title === "查看自定义情报") {
                    this.ifDisabled = true;
                } else {
                    this.ifDisabled = false;
                }*/
            },
            // 页面条数变更
            tablePageNum(item) {
                this.tableList.thisPageSize = item;
            },
            // 搜索回调函数
            handlerSearchEvent(payload) {
                console.log(payload)
                this.$set(this.tableList, "notchangurl", true);
                this.payload = payload;
                if(this.payload.incidentStart1 === undefined || this.payload.incidentStart2 === undefined){
                    this.$showSimpleMessage("请选择完整的时间区间", "warning");
                    return
                }
                if(this.payload.incidentStart1){
                    this.payload.incidentStart1 = this.payload.incidentStart1 ? this.$tools.setTimeUse(new Date(this.payload.incidentStart1)) : undefined;
                    this.payload.incidentStart2 = this.payload.incidentStart2 ? this.$tools.setTimeUse(new Date(this.payload.incidentStart2)) : undefined;
                    this.tableList.params.currentTime = undefined;
                    this.tableList.params.size = undefined;
                    this.tableList.params = this.payload;
                    this.tableList.params.pageSize = this.tableList.thisPageSize;
                }else{
                    this.tableList.params = this.payload;
                    this.tableList.params.pageSize = this.tableList.thisPageSize;
                    this.tableList.params.currentTime = this.thistime;
                    this.tableList.params.size = this.timeOne();
                }
            },
            // 判断是否有搜索参数
            Isreference(payload) {
                Object.keys(payload).map(t => {
                    if (t !== "pageNum" && t !== "pageSize") {
                        if (payload[t] !== undefined && payload[t] !== null && payload[t] !== "") {
                            this.Ifpayload = true; // 有一个参数不是空就调用搜索否则获取全部数据
                        }
                    }
                });
            },
            // 导出操作
            operation(data) {
                let args = this.buttonList[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            exportExcle() {
                this.Isreference(this.payload);
                let data = "?";
                if (this.Ifpayload) {
                    Object.keys(this.payload).map(m => {
                        if (this.payload[m] !== undefined && this.payload[m] !== null && this.payload[m] !== "") {
                            data = `${data}${m}=${this.payload[m]}&`;
                        }
                    });
                }
                this.$layerNotice("提示", "您确定要导出吗？", () => {
                    window.location.href = this.Ifpayload ? `/import/intelligenceCustom/${data}` : "/import/intelligenceCustom/";
                    this.Ifpayload = false;
                }, null, "warning");
            },

            // 表格操作变化
            selectArySlected(item) {
                if (item.id) {
                    switch (item.title) {
                        case "视频":
                            this.operationDariyll(item.id);
                            this.title = "视频";
                            break;
                        case "查看":
                            this.openDialog(item.id);
                            this.title = "告警情报详情";
                            break;
                        case "缩略图":
                            this.openPicture(item.id);
                            this.titlel = "查看缩略图";
                            break;
                        case "启用":
                            this.stopItAll(item.id);
                            break;
                        case "停用":
                            this.stopItAll(item.id);
                            break;
                        case "删除":
                            this.deleteAll(item.id);
                            break;
                        case "关闭事件":
                            this.closeFunction(item.id);
                            break;
                    }
                } else {
                    this.selectAry = item;
                }
            },
            // 关闭事件
            closeFunction(item) {
                this.$layerNotice("提示", "您确定要关闭事件吗？", () => {
                    axios.put("intelligenceCustom/close/" + item.id).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("关闭成功", "success");
                            this.reFresh = !this.reFresh;
                        } else {
                            let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(mess, "error");
                        }
                    }).catch(this.defaultHttpHandler);
                }, null, "warning");
            },
            // 获取id集合
            pLGetArry() {
                let idAry = [];
                this.selectAry.forEach((value) => {
                    idAry.push(value.id);
                });
                return idAry;
            },
            // 删除
            deleteAll(status) {
                let juge = status.id;
                let mess = juge ? "" : "批量";
                let _this = this;
                let id = juge || this.pLGetArry();
                if (id.length === 0) {
                    this.$showSimpleMessage("没有发现选中项", "error");
                } else {
                    this.$layerNotice("提示", "您确定要" + mess + "删除吗？", () => {
                        axios.delete("intelligenceCustom/" + status.id).then((res) => {
                            axiosDelete(res.data.code);
                        }).catch(this.defaultHttpHandler);
                    }, null, "warning");
                }
                function axiosDelete(status) {
                    
                    if (status === 0) {
                        _this.$showSimpleMessage(mess + "删除成功", "success");
                        _this.reFresh = !_this.reFresh;
                    } else {
                        let mess = _this.$store.state.codeStatus.find(t => t.code === status).name;
                        _this.$showSimpleMessage(mess, "error");
                    }
                }
            },
            // 打开弹窗
            operationDariy() {
                this.title = "创建自定义情报";
                this.Dialog = true;
            },
            // 打开视频
            operationDariyll(id) {
                // console.log(id.videoAddr);
                // let videoData = {
                //     videoAddr: id.videoAddr,
                //     destination: "/usr/local/nginx/html/file"
                // };
                // baseAxios.post("/sjhvi/realtime/VideoShow", videoData).then((res) => {
                //     if (res.data.code === 0) {
                        // this.watchVideoUrl = (res.data.video).substring(21, res.data.video.length); // 事件视频地址
                        this.watchVideoUrl = "http://47.105.212.6:80/event.mp4"; // 事件视频地址
                //     } else {
                //         this.watchVideoUrl = "";
                //         this.$showSimpleMessage("找不到该视频", "error");
                //     }
                // });
                this.Dialogll = true;
            },
            // 打开缩略图
            async openPicture(id){
                // console.log(id);
                let data = {
                    originalFile: id.originalFile
                };
                // baseAxios.post("/sjhvi/realtime/GetPicture", data).then((res) => {
                    // let shortCutFile = res.data.GetPicture; // 缩略图地址
                    // if (res.data.code === 0) {
                        // let shortCutFile = "data:image/gif;base64,"+ res.data.video; // 缩略图地址
                        let shortCutFile = "http://47.105.212.6:80/event.png"; // 缩略图地址
                        this.picture = shortCutFile;
                //     } else {
                //         this.picture = "";
                //         this.$showSimpleMessage("找不到该图片", "error");
                //     }
                // });
                this.DialogllP = true;
            },
            // 打开弹窗
            openDialog(id) {
                console.log(id)
                this.operationDariy();
                this.RowId = id;
                this.formValidate = id
                this.listjihe(id);
                this.scenePic = id
               /* axios.get("intelligenceCustom/" + this.RowId).then((res) => {
                    if (res.data.code === 0) {
                        let resData = res.data.data;
                        this.listjihe(id);
                        this.formValidate = this.dataList[id-1];
                        this.formValidate.timeAll = [this.formValidate.startTime, this.formValidate.endTime]
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                    }
                }).catch(this.defaultHttpHandler);*/
            },
            // 重置表单
            resetForm(formName, mess) {
                if (this.title === "查看" || mess) {
                    this.closeDialogData(formName, "关闭");
                } else {
                    this.closeDialogData(formName, "取消");
                }
            },
            // 弹窗关闭数据变化
            closeDialogData(formName, mes) {
                this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                    this.formValidate = {};
                    this.$refs[formName].resetFields();
                    this.Dialog = false;
                }, null, "warning");
            },
            // 提交
            handleSubmit(data) {
                data.location = "1,2";
                this.$refs["formValidateEmpty"].validate((valid) => {
                    if (valid) {
                        data.startTime = this.$filter.timesFormat(data.timeAll[0]);
                        data.endTime = this.$filter.timesFormat(data.timeAll[1]);
                        let dataNow = this.$filter.timesFormat(new Date());
                        if ( data.endTime < dataNow) {
                            this.$showSimpleMessage("结束日期应大于当前日期2", "warning");
                            return false;
                        }
                        delete data.timeAll;
                        if (this.RowId !== "") {
                            this.handleEditUnit(data);
                        } else {
                            this.handleAddUnit(data);
                        }
                    } else {
                        this.$showSimpleMessage("内容验证失败", "error");
                        return false;
                    }
                });
            },
            // 保存创建
            handleAddUnit(data) {
                this.$layerNotice("提示", "您确定要创建吗？", () => {
                    axios.post("intelligenceCustom/", data).then((res) => {
                        if (res.data.code === 0) {
                            this.Dialog = false;
                            this.$refs["formValidateEmpty"].resetFields();
                            this.$showSimpleMessage("保存成功", "success");
                            this.reFresh = !this.reFresh;
                        } else {
                            let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(mess, "error");
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
            },
            // 保存编辑
            handleEditUnit(data) {
                this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                    axios.put("intelligenceCustom/" + this.RowId,data).then((res) => {
                        if (res.data.code === 0) {
                            this.Dialog = false;
                            this.$refs["formValidateEmpty"].resetFields();
                            this.$showSimpleMessage("保存成功", "success");
                            this.reFresh = !this.reFresh;
                        } else {
                            let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(mess, "error");
                        }
                    }).catch(error => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
            },
            getOption(data) {
                let option = [];
                axios.get(data.url).then((res) => {
                    if (res.data.code === 0) {
                        let list = res.data.data;
                        for (let j = 0; j < list.length; j++) {
                            option.push({
                                label: list[j][data.changName],
                                value: list[j][data.changid]
                            });
                        }
                        this.$set(data, "option", option);
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                    }
                }).catch(this.defaultHttpHandler);
            },
            getEardiry() {
                let data = this.DialogList;
                for (let j in data) {
                    if (data[j].url) {
                        this.getOption(data[j]);
                    }
                }
            },
            listjihe(id) {
                let arroy = [];
                for(let i in id){
                    for(let j = 0; j < this.DialogList.length; j++){
                        if(this.DialogList[j].tableProp === i){
                            arroy.push(
                                this.DialogList[j]
                            )
                        }
                    }

                }
                this.DialogList = arroy;
            }
        },
        created() {
            this.$set(this.tableList, "notchangurl", false);
            // 处理按钮权限
            let button1 = [];
            let button2 = [];
            let item = this.$store.state.authData.find(this.checkAdult);

            let itemll = item.nextlevel.find(this.checkButton);
            // let itemlll = itemll.nextlevel.find(this.checkButtondown);
            button1 = itemll.nextlevel.find(this.checkButtondownl).button1;
            button2 = itemll.nextlevel.find(this.checkButtondownl).button2;
            let topList = [];
            let operationList = [];
            button1.map(val => {
                topList.push(val.name);
            });
            button2.map(val => {
                operationList.push(val.name);
            });
            this.buttonList.map(val => {
                if (!topList.includes(val.title)) {
                    val.title = "";
                    val.class = "kongSelf";
                }
            });
            this.buttonList2.map(val => {
                if (!operationList.includes(val.title)) {
                    val.title = "";
                    val.class = "kongSelf";
                }
            });
            //由于直接放到上方time没用，所以用计算属性插入
            this.searchName[2].time = this.timestart();
            this.searchName[3].time = this.timeout();
        },
        mounted() {
            /*axios.get("department/special/all").then((res) => {
                this.guanxia = res.data.data;
                console.log(this.guanxia)
                this.searchName[5].data= this.guanxia;
            });*/
            this.$set(this.tableList, "notchangurl", false);
            this.tableList.params = this.$filter.SearchEventl(this.searchName, this.pageNum, 10, 2);
            /*this.tableList.params.currentTime = this.thistime;
            this.tableList.params.size = this.timeOne();*/
            this.getEardiry();
           /* console.log(this.timestart())
            console.log(this.timeout())*/
        }
    };
</script>

<style scoped>
    .changdu {
        height: 463px;
    }
</style>
