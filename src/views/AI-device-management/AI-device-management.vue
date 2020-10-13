<template>
    <div>
        <api>
            <div slot="lowerMenuBar" class="flexRow">
                <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="urlHref(item, index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.parent}}</div>
                <div class="lowerMenuBarListActiveHr">
                    <div></div>
                    <el-switch v-model="pagination"
                        active-text="否"
                        inactive-color="#13ce66"
                        inactive-text="分页">
                    </el-switch>
                </div>
            </div>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchName"
                @searchEvent="handlerSearchEvent"
                :typeIndex="typeIndex"
                :reSet="reSet" @resetover="reSetOver">
            </SearchPage>
            <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" class="operation">
                 <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon"  :reFresh="reFresh" :buttonList = "buttonList2"  @update:button-list="val=>buttonList2 = val" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum"/>
        </api>
        <shuttle ref="shuttle" @submintButton="submintButton"  :shuttleList="shuttleList"  @update:shuttle-list="val => shuttleList =val" @ifStartAll="ifStartAll" ></shuttle>
        <Wire @ifStartAll="ifStartAll" ref="Wire" @WireButton="WireButton" :rtspAddr="rtspAddr" :WireList="WireList" @update:Wire-list="val => WireList =val" :incident-num="incidentNum" @update:incident-num="val => incidentNum =val" ></Wire>
        <!-- v-if="WireList.ifshow" -->
        <el-dialog :title="title" v-dialogDrag :visible.sync="startResult" :close-on-press-escape="false" class="tems_dialog startResult" :before-close="closeDialog" width="737px" :close-on-click-modal="false">
            <div class="succeedOrErr">
                <div class="succeed">成功：{{succeed}}</div>
                <div class="err">失败：{{err}}</div>
            </div>
            <div style="height:250px;">
                <el-table :data="tableData" max-height="250" border :resizable="false" style="width: 100%">
                    <el-table-column prop="name" label="设备名称"></el-table-column>
                    <el-table-column prop="result" label="结果" width="180"></el-table-column>
                    <el-table-column prop="reason" label="失败原因" width="180"></el-table-column>
                </el-table>
            </div>
            <div class="tems_Button dic_closed" @click="closeDialog">关闭</div>
        </el-dialog>
    </div>
</template>

<script>
import shuttle from "@/views/AI-device-management/shuttle.vue";
import Wire from "@/views/AI-device-management/Wire-frame-configuration1.vue";
export default {
    name: "AIDeviceManagement",
    components: {
        shuttle, Wire
    },
    data() {
        return {
            // 是否分页
            pagination: true,
            // 三级菜单
            upIsIndex: 0,
            // 当前页
            pageNum: 1,
            lowerMenuBarList: [
                { parent: "固定相机", getDataUrl: "equipment/?cameraAngle=1&equipmentTypes=000004-1,000004-2,000003-3,000004-4&orderBy=CONTROL_STATUS DESC,STATUS DESC,CREATED_TIME DESC", isLineation: 1 },
                { parent: "可动相机", getDataUrl: "equipment/?cameraAngle=2&equipmentTypes=000004-3,000004-4&orderBy=CONTROL_STATUS DESC,STATUS DESC,CREATED_TIME DESC", isLineation: 0 }
            ],
            WireList: { ifshow: false, id: "", title: "线框配置", refesh: false, tablist: [], numbers: [] },
            shuttleList: { ifshow: false, id: "", title: "", typeName: "" },
            buttonList2: [],
            rtspAddr:"",
            // 按钮
            buttonList: [],
            // 搜索传参
            searchName: [
                { searchPlaceholder: "设备编号", id: "", url: "", type: 0, Sendkey: "equipmentNumber" },
                { searchPlaceholder: "设备名称", id: "", url: "", type: 0, Sendkey: "equipmentName" },
                { searchPlaceholder: "设备类型", type: 1, data: [], Sendkey: "equipmentType" },
                { searchPlaceholder: "管辖单位", id: "id", url: "department/special/all", type: 2, Sendkey: "administerDepartmentId", getDataKey: "name" },
                { searchPlaceholder: "区域", type: 1, Sendkey: "districtId", data: [
                                        { id: "八里台镇", name: "八里台镇" },
                                        { id: "北闸口镇", name: "北闸口镇" },
                                        { id: "葛沽镇", name: "葛沽镇" },
                                        { id: "双港镇", name: "双港镇" },
                                        { id: "双桥河镇", name: "双桥河镇" },
                                        { id: "咸水沽镇", name: "咸水沽镇" },
                                        { id: "小站镇", name: "小站镇" },
                                        { id: "辛庄镇", name: "辛庄镇" }
                                    ] },
                { searchPlaceholder: "AI配置", data: [{ id: 1, name: "已完成" }, { id: 0, name: "未完成" }], type: 1, Sendkey: "isAI" },
                { searchPlaceholder: "AI状态", data: [{ id: 1, name: "启用" }, { id: 0, name: "停用" }], type: 1, Sendkey: "controlStatus" }
            ],
            searchNameList: [
                {
                    data: [
                        { id: "000004-1", name: "电子警察" },
                        { id: "000004-2", name: "卡口" },
                        { id: "000003-3", name: "视频检测"},
                        { id: "000004-4,1", name: "视频监控(固定角度)" }
                    ]
                },
                {
                    data: [
                        { id: "000004-3", name: "违停" },
                        { id: "000004-4,2", name: "视频监控(可动角度)" }
                    ]
                }
            ],
            tableList: {
                thisPageSize: 10,
                getDataUrl: "",
                params: [],
                selection: "0", // 是否有选中框
                scope: "0", // 是否有操作栏
                index: "0", // 是否有序号

                // 表格表头名称和要加载的prop
                // width:(表格宽度)
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    { tableName: "设备编号", tableProp: "equipmentNumber" },
                    { tableName: "设备名称", tableProp: "equipmentName",hover:"true" },
                    { tableName: "设备类型", tableProp: "equipmentTypeName",width:150 },
                    { tableName: "管辖单位", tableProp: "administerDepartmentName"},
                    { tableName: "AI配置", width: 100,
                        tableProp: "isAI",
                        keyChange: { keyName: "name", keyValue: "value" },
                        pand: this.$store.state.statusList3
                    },
                    { tableName: "AI状态", width: 100,
                        tableProp: "controlStatus",
                        keyChange: { keyName: "name", keyValue: "value" },
                        pand: this.$store.state.statusList2
                    }
                ]
            },
            // 搜索管理单位(全部)
            ManagementListNotdiscontinued: [],
            // 运维单位 建设单位
            OperationList: [],
            // 选择数据
            selectAryList:[],
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false,
            typeIndex: "",
            reSet: false,
            incidentNum: "",
            // 启用成功弹窗
            startResult: false,
            // 启用结果
            tableData:[],
            succeed: 0,
            err: 0,
            title:"批量启用结果"
        };
    },
    methods: {
        // 三级菜单是否选中状态
        urlHref(data, index) {
            this.$set(this.searchName[2], "data", []);
            this.$set(this.tableList, "getDataUrl", data.getDataUrl);
            this.upIsIndex = index;
            this.$set(this.searchName[2], "data", this.searchNameList[index].data);
            this.paramsChange(data);
        },
        // 按钮权限
        getButton(item, buttonName) {
            let button = item[buttonName];
            let buttonListLength = button.length;
            let listName = [];
            let functionList = this.$store.state.functionList;
            for (let i = 0; i < buttonListLength; i++) {
                listName.push({
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false
                });
                this.$set(listName[i], "title", button[i].name);
                let fnameList = functionList.function[buttonName].find(t => t.enName === button[i].enName);
                let fname = fnameList ? fnameList.functionName : "";
                this.$set(listName[i], "functionKeyName", fname);
                let fnameClass = fnameList ? fnameList.class : "";
                fnameClass = fnameClass || "";
                this.$set(listName[i], "class", fnameClass);
                let fnameChang = fnameList || "";
                if (fnameChang.chang) {
                    this.$set(listName[i], "chang", fnameChang.chang);
                    this.$set(listName[i].chang, "prop", "status");
                }
                switch (buttonName) {
                    case "button2":
                        this.$set(listName[i], "group", true);
                        this.tableList.width = buttonListLength * 70;
                        break;
                    case "button1":
                        this.$set(listName[i], "class", "qiliang");
                        break;
                };
                if (listName[i].title === "停用") {
                    listName[i].chang = {   
                        status: 1,
                        prop: "controlStatus",
                        changStop: ["停用", "erBtn"],
                        changStar: ["启用", "suBtn"],
                        changSutus: ["", "buttonKong", "isAI", "已完成"]        
                    }
                }
                if (listName[i].title === "批量AI配置") {
                    listName[i].functionKeyName = "ifshowEvent:true";
                }
            }
            return listName;
        },
        // 搜索判断
        paramsChange(item) {
            this.reSet = true;
            this.typeIndex = item;
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum);
            this.isFenye();
        },
        reSetOver() {
            this.reSet = false;
        },
        // 搜索栏按钮事件
        operation(data) {
            let args = this.buttonList[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },        
        // 事件配置弹窗数据传输
        ifshowEvent(item) {
            this.shuttleList.typeName = this.lowerMenuBarList[this.upIsIndex].isLineation;
            let equipmentAddons = [];
            let data = {
                id: "",
                rightUp: "", // 右上角坐标
                rightDown: "", // 右下上角坐标
                leftDown: "", // 左下角坐标
                leftUp: "", // 左上角坐标
                fromDirection: ""
            };
            if (item === "true") {    
                //             
                let idList = this.selectAryList;
                if (idList.length === 0) {
                    this.$showSimpleMessage("未发现选中设备", "error");
                    return false;
                } else {
                    for (let i = 0; i < idList.length; i++) {
                        if (idList[i].controlStatus === "启用" || idList[i].controlStatus === "1") {
                            this.$showSimpleMessage("选择了AI配置为已完成且AI状态为已启用的设备，不能进行配置，请重新选择", "error");
                            return false;
                        }
                        data.id = idList[i].id;
                        equipmentAddons.push(JSON.stringify(data));
                    }
                    this.$set(this.shuttleList, "id", equipmentAddons);
                }
            } else {
                data.id = item;
                equipmentAddons.push(JSON.stringify(data));
                this.$set(this.shuttleList, "id", equipmentAddons);
                // this.reFresh = !this.reFresh;
            }
            this.relationShip(this.shuttleList, true);
        },
        // 画框事件弹窗数据传输
        WireListEvent(item) {
            this.rtspAddr = item.rtspAddr;
            this.WireList.tablist = this.selectAry;
            this.WireList.title = "线框配置";
            this.WireList.id = item.id;
            this.WireList.hl = item.hl;
            this.WireList.hl2 = item.hl2;
            let shuttleId = item.incidentNum;
            this.incidentNum = shuttleId;
            let numbers = [];
            item.data.map(val => {
                if (shuttleId.includes(val.id)) {
                    numbers.push(val);
                }
            });
            this.WireList.numbers = numbers;
            this.relationShip(this.WireList, true);
        },
        // 点击事件配置下一步按钮获取数据并传输给画窗事件弹窗
        submintButton(item) {
            // 是否是画框事件
            if (item) {
                this.WireListEvent(item);
            } else {
                this.reFresh = !this.reFresh;
            }
            this.relationShip(this.shuttleList, false);
        },
        // 画窗事件按钮点击触发
        WireButton() {
            this.relationShip(this.WireList, false);
            this.reFresh = !this.reFresh;
            this.WireList.tablist = [];
        },
        // 弹窗显示和页面是否刷新的方法以及关系
        relationShip(item, isPan) {
            this.shuttleList.refesh = !isPan;
            item.ifshow = isPan;
        },
        // 获取id集合
        pLGetArry() {
            let idAry = [];
            this.selectAryList.forEach((value) => {
                idAry.push(value.id);
            });
            return idAry;
        },
        // 启用停用按钮判断相关
        pLGetArrystar(item, status) {
            let idAry = [];
            let juge1 = ["正常", "启用", "1", 1, "已完成"];
            let juge2 = ["异常", "停用", "0", 0, "已完成"];
            let juge = (juge1.filter(t => t === status).length === 0 ? juge1 : juge2);
            let idList = this.selectAry;
            for (let j = 0; j < idList.length; j++) {
                let pdList = [];
                for (let i = 0; i < item.length; i++) {
                    let pd = juge.filter(t => t === idList[j][item[i]]);
                    if (pd.length > 0) {
                        pdList.push(pd);
                        if (pdList.length === item.length) {
                            idAry.push(idList[j].id);
                        }
                    }
                }
            }
            return idAry;
        },
        // 表格操作变化，各种按钮点击事件走方法判断
        selectArySlected(item) {
            if (item.id) {
                this.selectAry = [];
                this.selectAryList = [];
                switch (item.title) {
                    case "AI配置":
                        if (item.id.controlStatus === "启用" || item.id.controlStatus === "1") {
                            this.$showSimpleMessage("改AI配置为已完成且AI状态为已启用的设备，不能进行配置", "error");
                            return false;
                        }
                        this.selectAry = [item.id];
                        this.ifshowEvent(item.id.id);
                        break;
                    case "启用":
                        this.stopItAll(item.id);
                        break;
                    case "停用":
                        this.stopItAll(item.id);
                        break;
                }
            } else {
                this.selectAry = item;
                this.selectAryList = item;
            }
        },
        // 全部启、停用
        stopItAll(status) {
            let juge = status.controlStatus;
            let mess = (juge ? "" : "批量");
            let states = juge ? (juge === "停用" ? "启用" : "停用") : (status === "1" ? (mess + "启用") : (mess + "停用"));
            let stateUrl = juge ? (juge === "停用" ? "star" : "stop") : (status === "1" ? "star" : "stop");
            let idAry = juge ? status.id : this.pLGetArrystar(["isAI", "controlStatus"], status);
            if (idAry.length === 0 && juge === undefined) {
                this.$showSimpleMessage("未发现可" + states + "设备", "error");
                return false;
            } else {
                if (status.isAI === "未完成") {
                    this.$showSimpleMessage("配置未完成不可启/停用", "error");
                    return false;
                } else {
                    let statesIN = !status.AIstar ? "您确定要" + states + "吗？" : "是否开启AI状态?";
                    stateUrl = status.AIstar ? "star" : stateUrl;
                    states = status.AIstar ? "启用" : states;
                    // 单个操作
                    if (!status.AIstar) {
                        this.$layerNotice("提示", statesIN, () => {
                            axios.put("equipment/addon/" + stateUrl + "/control/", { id: idAry.toString() }).then((res) => {
                                if (res.data.code === 0) {
                                    if(states === "启用") {
                                        this.startResult = true;
                                        this.title = "启用结果";
                                        this.makeStartResult(res.data);
                                    } else {
                                        // console.log(res);
                                        // this.startResult = true;
                                        // this.title = "停用结果";
                                        // this.makeStartResult(res.data);
                                        this.$showSimpleMessage(states + "成功", "success");
                                    };
                                    // this.startResult = true;
                                    this.reFresh = !this.reFresh;
                                } else {
                                    let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                                    this.$showSimpleMessage(mess, "error");
                                }
                            }).catch(this.defaultHttpHandler);
                        }, null, "warning");
                    } else {
                        // 批量操作
                        this.$layerNotice("提示", statesIN, () => {
                            axios.put("equipment/addon/" + stateUrl + "/control/", { id: idAry.toString() }).then((res) => {
                                if (res.data.code === 0) {
                                    if(states === "启用") {
                                        this.startResult = true;
                                        this.title = "批量启用结果";
                                        this.makeStartResult(res.data);
                                    } else {
                                        // console.log(res);
                                        // this.startResult = true;
                                        // this.title = "批量停用结果";
                                        // this.makeStartResult(res.data);
                                        this.$showSimpleMessage(states + "成功", "success");
                                    };
                                    this.reFresh = !this.reFresh;
                                } else {
                                    let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                                    this.$showSimpleMessage(mess, "error");
                                }
                            }).catch(this.defaultHttpHandler);
                        }, null, "warning");
                    }
                }
            }
        },
        // 处理启用结果
        makeStartResult(data) {
            let succeed = data.succeed;
            let failure = data.err;
            let tableData = data.totalResults;
            tableData.map(val => {
                val.name = val.cameraName;
                switch(+val.result) {
                    case 0:
                    val.result = "成功";
                    val.reason = "";
                    break;
                    case -1:
                    val.result = "失败";
                    val.reason = "硬件资源限制";
                    break;
                    case -2:
                    val.result = "失败";
                    val.reason = "有相同的AI设备存在";
                    break;
                };
            });
            this.tableData = tableData;
            if (this.selectAryList.length > 0 && this.selectAry.length > 0) {
                this.title = "批量启用结果"
            } else {
                this.title = "启用结果"
            }
            this.succeed = succeed;
            this.err = failure;
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            this.payload = payload;
            if (this.payload.equipmentType) {
                this.payload.equipmentType = this.payload.equipmentType.split(",")[0];
                if (this.payload.equipmentType === "000004-4" && this.upIsIndex === 0) {
                    this.payload.cameraAngle = 1;
                } else {
                    this.payload.cameraAngle = 2;
                }
            }
            this.tableList.params = this.payload;
            this.tableList.params.pageSize = this.tableList.thisPageSize;
        },
        // 画框后全部启用
        ifStartAll(data) {
            // let arrids = [];
            // data.map(val => {
            //     if (val.leftDown && val.leftUp) {
            //         arrids.push(val.id);
            //     }
            //     if (!val.leftDown) {
            //         arrids.push(val.id);
            //     }
            //     this.WireList.tablist = [];
            // });
            this.stopItAll({ controlStatus: "1", id: data, AIstar: "1" });
        },
        // 分页
        fenye() {
            this.pagination = false;
            this.urlHref(this.lowerMenuBarList[0], 0);
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum);
            this.reSet = false;
        },
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        },
        // 是否有分有分页进行传参pagination
        isFenye() {
            if (this.pagination === false) {
                this.$set(this.tableList.params, "pageSize", 10);
            } else {
                this.$set(this.tableList.params, "pageSize", 100000);
            }
            this.$set(this.tableList, "pagination", this.pagination);
        },
        // 显示开启设备结果弹窗
        showStartResult() {
            this.startResult = true;
        },
        // 关闭开启设备结果弹窗
        closeDialog() {
            this.$layerNotice("提示", "您确定关闭弹窗？", () => {
                this.startResult = false;
            }, null, "warning");
        }
    },
    created() {
        this.fenye();
    },
    mounted() {
        this.fenye();
        let AIbutn = this.$store.state.authData.find(t => t.name === "AI配置");
        this.buttonList = this.getButton(AIbutn, "button1");
        this.buttonList2 = this.getButton(AIbutn, "button2");
    },
    watch: {
        "pagination": function(val) {
            this.isFenye();
            this.reFresh = !this.reFresh;
        }
    }
};
</script>

<style>
.startResult > .el-dialog {
    height: 420px;
}
.succeedOrErr{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom:2px;
    color: #03a6de;
}
.succeed{
    float: left;
    width: 100px;
    text-align: center;
    font-size: 14px;
    /* border-top: 1px solid #53D4F9;
    border-bottom: 1px solid #53D4F9; */
}
.err{
    float: left;
    width: 100px;
    text-align: center;
    font-size: 14px;
    /* border: 1px solid #53D4F9; */
}
</style>
