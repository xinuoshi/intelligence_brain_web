<template>
    <div>
        <api>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                        :searchName="searchName"
                        @searchEvent="handlerSearchEvent" >
            </SearchPage>
             <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" class="operation">
                <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon" :buttonList="buttonList2" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList" @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
        <!-- 创建和编辑查看弹窗 -->
        <el-dialog :close-on-press-escape="false"  :title="title" v-dialogDrag :show-close="true" @close="closeNoneTips()"
                   :visible.sync="Dialog" class="tems_dialog intelligence" width="460px" :close-on-click-modal="false">
            <div class="scrollPart" id="scrollDPart">
                <el-form :disabled="(title === '查看自定义情报' ? true : false)" :class="{isDisable: title === '查看自定义情报'}"
                 :model="formValidate" :rules="ruleValidate" ref="formValidateEmpty" label-width="90px" class="demo-ruleForm">
                    <div :style="{'width': (item.province ? '100%' : 'auto'), 'display': 'flex','flex-direction': 'column','width': ((item.timeFunction === 'time' && item.tableProp==='startTime' || item.tableProp==='endTime') ? '50%' : 'auto')}" v-for="(item, index) in DialogList" :key="index">
                        <el-form-item v-if="item.option" :class="item.class ? item.class: ''" :label="item.tableName" :prop="item.tableProp">
                            <el-select class="tems_Input" v-model="formValidate[DialogList[index].tableProp]" filterable clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请选择...')">
                                <el-option v-for="(items, index) in item.option" :key="index" :label="items.label" :value="items.value" />
                            </el-select>
                        </el-form-item>                        
                        <el-form-item v-if="item.button" :class="item.class ? item.class: ''" :label="item.tableName" :prop="item.tableProp">
                            <div style="border:1px solid;border-radius: 15px;color: rgb(76, 195, 236);padding:0 15px;cursor: pointer;" @click="showMapGis">{{item.btnName}}</div>
                        </el-form-item>
                        <el-form-item v-if="item.timeFunction" style="margin: 0px;" :label-width="item.tableName === '至' ? '20px' : 'auto'" :class="item.class ? item.class: ''" :label="item.tableName"  :prop="item.tableProp">
                        </el-form-item>
                        <el-form-item v-if="item.timeFunction === 'timeAll'" :class="item.class ? item.class: ''" :label="''" label-width="0px" :prop="item.tableProp">
                            <el-date-picker v-if="item.timeFunction"
                                v-model="formValidate[DialogList[index].tableProp]"
                                editable unlink-panels = "true"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>     
                        <el-form-item v-if="item.timeFunction === 'time'"  class="DialogListTime" :class="item.class ? item.class: ''" :label="''" label-width="0px" :prop="item.tableProp">
                            <el-date-picker
                            v-model="formValidate[DialogList[index].tableProp]"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>                        
                        <el-form-item v-if="item.Inputbox" :class="item.class ? item.class: ''" :label="item.tableName" :prop="item.tableProp">
                            <el-autocomplete class="ass_Input"
                                @keyup.native="keyup(item.DariyListData)"                                            
                                            size="small" clearable 
                                            :trigger-on-focus="true" @select="handleSelect"
                                            v-model="formValidate[DialogList[index].tableProp]"
                                            :fetch-suggestions="querySearchAsyncdurableAry">
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item v-if="!item.button && !item.timeFunction && !item.option && !item.Inputbox" :class="item.class ? item.class: ''" :label="item.tableName" :prop="item.tableProp">
                            <el-input :maxlength="item.length || 30" class="tems_Input" v-model="formValidate[DialogList[index].tableProp]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="title === '查看自定义情报'" class="tems_Button inportBtn dic_closed" @click="closeNoneTips()">关 闭</div>
                    <div v-if="title !== '查看自定义情报'" class="tems_Button inportBtn dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '查看自定义情报'" class="tems_Button exportBtn dic_closed" @click="handleSubmit(formValidate)">保 存</div>
                </div>
            </div>
            <mapDialog ref="mapDialog" @showMapDialog = "showMapDialog" :dialogVisible = "dialogVisible"
                :mapDialogPoint="mapDialogPoint" :ifDisabled="ifDisabled" :LayermapDialog="LayermapDialog"
                @selectPoint="selectPoint" @removeLayermapDialog="removeLayermapDialog" :title ="title"></mapDialog>
        </el-dialog>
    </div>
</template>

<script>
    import mapDialog from "@/components/common/mapDialog"
    export default {
        name: "assetDictionary",
        components: {
            mapDialog
        },
        data() {
            return {
                // 按钮
                buttonList: [
                    {
                        title: "导出",
                        plain: true,
                        type: "primary",
                        size: "small",
                        class: "qiliang",
                        functionKeyName: "exportExcle"
                    }
                ],
                buttonList2: [
                    {
                        title: "查看",
                        plain: true,
                        size: "mini",
                        type: "primary",
                        disabled: false
                    }
                ],
                // 搜索传参
                searchName: [
                    { searchPlaceholder: "事件类型", id: "id", type: 2, url: "intelligence/?custom=custom", Sendkey: "intelligenceId", getDataKey: "name" },
                    { searchPlaceholder: "事件名称", id: 1, type: 0, url: "", Sendkey: "name" },
                    // { searchPlaceholder: "开始时间", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: "" },
                    // { searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: "" },
                    { searchPlaceholder: "发生时间", id: 0, url: "", type: 7, Sendkey: "startTime", time: "" },
                    { searchPlaceholder: "至",left:"0" , id: 0, url: "", type: 8, Sendkey: "endTime", time: "" },
                    { searchPlaceholder: "区域", type: 1, Sendkey: "area", data: [
                            { id: "八里台镇", name: "八里台镇" },
                            { id: "北闸口镇", name: "北闸口镇" },
                            { id: "葛沽镇", name: "葛沽镇" },
                            { id: "双港镇", name: "双港镇" },
                            { id: "双桥河镇", name: "双桥河镇" },
                            { id: "咸水沽镇", name: "咸水沽镇" },
                            { id: "小站镇", name: "小站镇" },
                            { id: "辛庄镇", name: "辛庄镇" }
                        ] }
                ],
                // 表格组件传参列表
                tableList: {
                    thisPageSize: 10,
                    getDataUrl: "",
                    params: [],
                    selection: false, // 是否有选中框
                    scope: "0", // 是否有操作栏
                    width: "100", // 操作宽度
                    index: true, // 是否有序号
                    // 表格表头名称和要加载的prop
                    // hover(是否显示表格鼠标划入有无弹窗)；
                    // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                    // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                    // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                    // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                    // keyChange里的pand（转换的列表）
                    list: [
                        { tableName: "事件类型", tableProp: "intelligenceName", width: 150  },
                        { tableName: "事件名称", tableProp: "name", hover: true },
                        { tableName: "事件开始时间", tableProp: "startTime", tableTime:"time" },
                        { tableName: "事件结束时间", tableProp: "endTime", tableTime:"time"},
                        { tableName: "区域", tableProp: "area"},
                        { tableName: "事件级别", tableProp: "level",replace:"级", width: 100 },
                        { tableName: "备注", tableProp: "remark" }
                    ]
                },
                DialogList: [
                    { tableName: "事件类型：", tableProp: "intelligenceId", option:[],
                    url:"intelligence/?custom=custom",
                    changName: "name",
                    changid: "id"
                    },
                    { tableName: "事件名称：", tableProp: "name" },
                    // { tableName: "事件起止时间", tableProp: "timeAll", timeFunction:"timeAll"  },
                    { tableName: "事件起止时间：", tableProp: "startTime", timeFunction:"time"  },
                    { tableName: "至", tableProp: "endTime", timeFunction:"time", class:"noneTipe kongColor" },
                    { tableName: "事件地点：", tableProp: "location", button:"button", btnName:"地图绘制", btnName2:"地图查看", btnName1:"地图绘制" },
                    { tableName: "区域：", tableProp: "area",
                        Inputbox: true,
                        DariyListData: ["tj_bound", "QH_NAME", "AREA_ID"]
                    },
                    { tableName: "事件级别：", tableProp: "level",option:[
                        {label:"1级", value:"1"},
                        {label:"2级", value:"2"},
                        {label:"3级", value:"3"},
                        {label:"4级", value:"4"}
                    ] },
                    { tableName: "备注：", tableProp: "remark" }
                ],
                RowId: "",
                title: "创建自定义情报",                
                ruleValidate: {
                    intelligenceId: this.$CommonRule.SelectRule,
                    name: this.$CommonRule.NotEmpty,
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
                // 当前页
                pageNum: 1,
                timedata: this.$filter.timesFormat(new Date()),
                // 选中的数据
                selectAry: [],
                payload: "", // 搜索回调传入的搜索参数
                // 刷新页面
                reFresh: false,
                // 显示地图弹窗
                dialogVisible: false,
                // 判断搜索回传的参数是否全是空的默认是全空
                Ifpayload: false,
                ifDisabled: false,
                LayermapDialog: false, // 控制mapDialog弹窗中的图层是否从地图上删除(当这个变为true时mapDialog中会把图层从地图上清除)
                mapDialogPoint: "" // mapDialog回显的坐标点集合
            };
        },
        methods: {   
            // 关闭无提示
            closeNoneTips() {
                this.Dialog = false;
                this.$refs["formValidateEmpty"].resetFields();
                this.formValidate = {};
            },
            selectPoint(item) {
                this.formValidate.location = item.toString();
            },
            // 地图绘制的按钮事件
            showMapGis() {
                this.dialogVisible = true;
                this.mapDialogPoint = this.formValidate.location;
                if (this.title === "查看自定义情报") {
                    this.ifDisabled = true;
                } else {
                    this.ifDisabled = false;
                }
            },
            showMapDialog() {
                this.dialogVisible = false;
            },
            // 页面条数变更
            tablePageNum(item) {
                this.tableList.thisPageSize = item;
            },
            // 搜索回调函数
            handlerSearchEvent(payload) {
                this.payload = payload;
                this.tableList.params = this.payload;
                this.tableList.params.pageSize = this.tableList.thisPageSize;
                
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
            //  选择成功
            handleSelect(item) {
                console.log(item)
            },        
            keyup(item) {
                this.DariyListData = item;
            },
            // 输入或选择
            querySearchAsyncdurableAry(queryString, cb) {
                if (queryString !== undefined && queryString !== "" && queryString !== null) {
                    let key = this.DariyListData[0];
                    let name = this.DariyListData[1];
                    let id = this.DariyListData[2];
                    let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><Or><PropertyIsLike wildCard=\"*\" singleChar=\".\" escapeChar=\"!\"><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
                    // let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><And><PropertyIsEqualTo><PropertyName>NAME</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></And></Filter></Query></GetFeature>";
                    let MapDataList = [];
                    geoAxios.get(testUrl).then(async (res) => {
                        if (res.data.totalFeatures === 0) {
                            this.$showSimpleMessage("未查询到数据", "error");
                        } else {
                            for (let i in res.data.features) {
                                MapDataList.push ({
                                    value: res.data.features[i].properties[name],
                                    id: res.data.features[i].properties[id]
                                });
                            }
                            this.MapDataList = await this.$tools.arrUnique(MapDataList, "value");
                            clearTimeout(this.timeout);
                            this.timeout = setTimeout(() => {
                                cb(this.MapDataList);
                            }, 100 * Math.random());
                        } 
                    }).catch(error => {
                        this.$showSimpleMessage(error, "error");
                    });
                }        
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
                    window.location.href = this.Ifpayload ? `/wit_harns_service/intelligenceCustom/import/intelligenceCustom/${data}&status=1&intelligenceStatus=0&currentTime=`+ this.$filter.timesFormat(new Date()): "/wit_harns_service/intelligenceCustom/import/intelligenceCustom/?status=1&intelligenceStatus=0&currentTime="+ this.$filter.timesFormat(new Date());
                    this.Ifpayload = false;
                }, null, "warning");
            },
            // 弹窗如果带按钮，按钮在不同状态有不同形式可以进行按钮转换
            // 在数据里按钮btnName,有转换时可以写btnName1,btnName2
            changBtn(data, btn) {
                for (let i in data) {
                    if (data[i].btnName) {
                        data[i].btnName = data[i][btn];
                    }
                }
            },
            // 表格操作变化
            selectArySlected(item) {
                if (item.id) {
                    switch (item.title) {
                        case "查看":
                            this.openDialog(item.id.id);
                            this.title = "查看自定义情报";
                            this.changBtn(this.DialogList,"btnName2");
                            break;
                    }
                } else {
                    this.selectAry = item;
                }
            },
            // 获取id集合
            pLGetArry() {
                let idAry = [];
                this.selectAry.forEach((value) => {
                    idAry.push(value.id);
                });
                return idAry;
            },
            // 打开弹窗
            operationDariy() {
                this.title = "创建自定义情报";
                this.Dialog = true;
            },
            // 打开弹窗
            openDialog(id) {
                this.operationDariy();
                this.RowId = id;
                axios.get("intelligenceCustom/" + this.RowId).then((res) => {
                    if (res.data.code === 0) {
                        let resData = res.data.data;
                        this.formValidate = resData;
                        this.formValidate.timeAll = [this.formValidate.startTime, this.formValidate.endTime]
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                    }
                }).catch(this.defaultHttpHandler);
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
            // 最外层弹窗关闭后mapDialog组件的回调
            removeLayermapDialog() {
                this.LayermapDialog = false;
            }
        },
            created() {
            // this.$set(this.tableList, "notchangurl", false);
            // // 处理按钮权限
            // let button1 = [];
            // let button2 = [];
            // let item = this.$store.state.authData.find(this.checkAdult);

            // let itemll = item.nextlevel.find(this.checkButton);
            // // let itemlll = itemll.nextlevel.find(this.checkButtondown);
            // button1 = itemll.nextlevel.find(this.checkButtondownl).button1;
            // button2 = itemll.nextlevel.find(this.checkButtondownl).button2;
            // let topList = [];
            // let operationList = [];
            // button1.map(val => {
            //     topList.push(val.name);
            // });
            // button2.map(val => {
            //     operationList.push(val.name);
            // });
            // this.buttonList.map(val => {
            //     if (!topList.includes(val.title)) {
            //         val.title = "";
            //         val.class = "kongSelf";
            //     }
            // });
            // this.buttonList2.map(val => {
            //     if (!operationList.includes(val.title)) {
            //         val.title = "";
            //         val.class = "kongSelf";
            //     }
            // });
            
            //由于直接放到上方time没用，所以用计算属性插入
            this.searchName[2].time = this.timestart();
            this.searchName[3].time = this.timeout();
        },
        mounted() {
            this.tableList.getDataUrl = "intelligenceCustom/?status=1&intelligenceStatus=0&currentTime=" + this.$filter.timesFormat(new Date());
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            this.getEardiry();
        }
    };
</script>

<style>
    .rightBody .dataTableCss .rightBody .subordinateSubject,
    .rightBody .dataTableCss .rightBody .lowerMenuBar{
        border: none !important;
    }
</style>
