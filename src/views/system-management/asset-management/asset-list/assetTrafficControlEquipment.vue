<template>
    <div>
        <api>
            <!-- 下级菜单栏 -->
            <div slot="lowerMenuBar" class="flexRow">
                <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="urlHref(index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.name}}</div>
                <div class="lowerMenuBarListActiveHr"></div>
            </div>
            <!-- 切换窗 -->
            <div slot="equipmentChangeName">
                <span class="equipmentChangeName" :class="{equipmentChangeNameActive: index === isActive}" @click="changEquipment(item),isActive = index" v-for="(item, index) in equipmentTypeList" :key="item.index">{{item.name}}</span>
            </div>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchData"
                @searchEvent="handlerSearchEvent"
                :initialComponent="initialComponent"
                @initialComponentover="initialComponentOver"
                :typeIndex="typeIndex" :reSet="reSet" @resetover="reSetOver" ></SearchPage>
            <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" v-if="equipmentTypeList" class="operation">
                <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon" :buttonList="buttonList2" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum"></tableCommon>
        </api>
        <!-- 弹窗 -->
        <editDialog ref="editDialog" @submitButton="submitButton" :EditDialogList="EditDialogList" @update:Edit-dialog-list="val=> EditDialogList = val" ></editDialog>
        <!-- <AssetValue ref="AssetValue" @submitButton="submitButtonValue" :SeeList="SeeList" @update:SeeList="val=> SeeList = val" ></AssetValue> -->
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import editDialog from "@/views/system-management/asset-management/asset-common/asset-editDialog";
// import AssetValue from "@/views/system-management/asset-management/asset-common/assetValue";
export default {
    name: "assetTrafficControlEquipment",
    components: {
        editDialog
        //  AssetValue
    },
    data() {
        return {
            intersectionsList: [],
            ManagementList: [],
            // 按钮
            buttonList2: [],
            buttonList: [],
            // 三级菜单切换
            upIsIndex: 0,
            // 切换窗是否切换
            isActive: 0,
            // 搜索列表
            searchNameList: [
                { searchPlaceholder: "点位级别", data: [{ id: 1, name: "1级" }, { id: 2, name: "2级" }, { id: 3, name: "3级" }], type: 1, Sendkey: "intersectionGrade" },
                { searchPlaceholder: "管辖单位",data:[], id: "administerDepartmentId", url: "", change: "url", type: 1, Sendkey: "administerDepartmentId", getDataKey: "administerDepartmentName" },
                // 除了信号配时000002-1
                { searchPlaceholder: "设备编号", data:[], url: "", type: 1, change: "url", Sendkey: "equipmentNumber", getDataKey: "equipmentNumber"},
                { searchPlaceholder: "设备名称", data:[], url: "", type: 1, change: "url", Sendkey: "equipmentName", getDataKey: "equipmentName"},
                { searchPlaceholder: "建设日期", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: "", tableTime: "day" },
                { searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: "", tableTime: "day" },
                // 信号灯000001-2
                { searchPlaceholder: "信号灯类型", data: [{ name: "机动车灯", id: 1 }, { name: "非机动车灯", id: 2 }, { name: "人行灯", id: 3 }], type: 1, Sendkey: "signalType" },
                // 信号配时000002-1
                { searchPlaceholder: "方案名称", data:[], url: "", change: "url", type: 1, Sendkey: "equipmentName" },
                { searchPlaceholder: "配时编号", data:[], url: "", change: "url", type: 1, Sendkey: "equipmentNumber" },
                // 视频检测000003-3//电子警察000004-1
                { searchPlaceholder: "相机IP", data:[], url: "", change: "url", type: 1, Sendkey: "equipmentIp" },
                // 视频监控000004-4
                { searchPlaceholder: "相机角度", type: 1, Sendkey: "cameraAngle", data:[{id: 1, name: "固定"},{id: 2, name: "可动"}] },
                // 标志000007-1、标线000007-2
                { searchPlaceholder: "指示方向", data:[], url: "code/?type=10001&status=1", type: 2, Sendkey: "detectionDirection", id: "id", getDataKey: "value" },
                // 违停000004-3
                { searchPlaceholder: "类型", data:[{id:"1", name:"指示标线"}, {id:"2", name:"禁止标线"}, {id:"3", name:"警示标线"}, {id:"4", name:"立面标记"}], url: "", type: 1, Sendkey: "types" },
                // 机房设施
                { searchPlaceholder: "机房编号", id: 1, url: "", type: 0, key: "name1" },
                { searchPlaceholder: "功能", data:[{id:1, name:"斑马线"}, {id:2, name:"双黄线"}, {id:3, name:"停车线"}, {id:4, name:"导流线"}, {id:5, name:"黄格线"}], url: "", type: 1, Sendkey: "functions" },
                { searchPlaceholder: "类型", data:[{id:"1", name:"路面中心护栏"}, {id:"2", name:"机非护栏"}, {id:"3", name:"其他"}], url: "", type: 1, Sendkey: "types" }
                
            ],
            searchData: [],
            // 搜索传参
            searchName: [],
            TABLE: [
                { tableName: "设备编号", tableProp: "equipmentNumber", hover: "flge"},
                { tableName: "配时编号", tableProp: "equipmentNumber", hover: "flge"},
                { tableName: "信号灯类型", tableProp: "signalType",width:150,
                    keyChange: { keyName: "id", keyValue: "value" },
                    pand:[
                        {id:1,value:"机动车灯"},
                        {id:2,value:"非机动车灯"},
                        {id:3,value:"人行灯"}
                    ] },
                { tableName: "设备名称", tableProp: "equipmentName", hover: "flge" },
                { tableName: "方案名称", tableProp: "equipmentName", hover: "flge" },
                { tableName: "点位级别", tableProp: "intersectionGrade", replace:"级",width:100 },
                { tableName: "类型", tableProp: "types", keyChange: { keyName: "id", keyValue: "name" },
                 pand: [{id:"1", name:"指示标线"}, {id:"2", name:"禁止标线"}, {id:"3", name:"警示标线"}, {id:"4", name:"立面标记"}]},
                { tableName: "功能", tableProp: "functions",keyChange: { keyName: "id", keyValue: "name" },
                 pand: [{id:1, name:"斑马线"}, {id:2, name:"双黄线"}, {id:3, name:"停车线"}, {id:4, name:"导流线"}, {id:5, name:"黄格线"}]
                },
                { tableName: "控制方向", tableProp: "controlDirectionName" , url:"code/?type=10001&status=1",
                    keyChange: { keyName: "id", keyValue: "value" },
                    pand: []},
                { tableName: "检测方向", tableProp: "detectionDirectionName"},
                { tableName: "指示方向", tableProp: "detectionDirectionName"},
                { tableName: "管辖单位", tableProp: "administerDepartmentName"},
                { tableName: "建设日期", tableProp: "constructionTime", tableTime:"day",width:150 },
                { tableName: "网络配置", tableProp: "equipmentIp",width:180 },
                { tableName: "相机IP", tableProp: "equipmentIp",width:180 },
                { tableName: "采集中心IP", tableProp: "acquisitionCenterIp",width:180 },
                { tableName: "设备状态",width:100,
                    tableProp: "status",
                    keyChange: { keyName: "name", keyValue: "value" },
                    pand: this.$store.state.statusList2
                },
                { tableName: "标线状态",width:100,
                    tableProp: "status",
                    keyChange: { keyName: "name", keyValue: "value" },
                    pand: this.$store.state.statusList2
                },
                { tableName: "护栏状态",width:100,
                    tableProp: "status",
                    keyChange: { keyName: "name", keyValue: "value" },
                    pand: this.$store.state.statusList2
                },
                { tableName: "视频检测状态",width:120,
                    tableProp: "status",
                    keyChange: { keyName: "name", keyValue: "value" },
                    pand: this.$store.state.statusList2
                },
                { tableName: "相机角度", tableProp: "cameraAngle",width:100,
                 keyChange: { keyName: "name", keyValue: "value" },
                    pand: [{name: 1, value: "固定"},{name: 2, value: "可动"}]},
                { tableName: "展示方向", tableProp: "controlDirectionName", url:"code/?type=10001&status=1",
                    keyChange: { keyName: "id", keyValue: "value" },
                    pand: [] },
                { tableName: "类型",width:200, tableProp: "types", keyChange: { keyName: "id", keyValue: "name" },
                 pand: [{id:"1", name:"路面中心护栏"}, {id:"2", name:"机非护栏"}, {id:"3", name:"其他"}]},
            ],
            // 表格组件传参列表
            tableList: {
                thisPageSize: 10,
                getDataUrl: "",
                params: [],
                selection: false, // 是否有选中框
                scope: "0", // 是否有操作栏
                index: "0", // 是否有序号
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // tableTime(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: []
            },
            // 下级导航菜单列表
            lowerMenuBarList: [],
            detectionDirectionId: "",
            // 切换窗分好类的设备列表
            equipmentTypeList: [],
            // 搜索管理单位(全部)
            ManagementListNotdiscontinued: [],
            // 运维单位 建设单位
            OperationList: [],
            // 当前页
            pageNum: 1,
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            // 弹窗所需传参
            EditDialogList: {
                RowId: "",
                EditDialog: false,
                equipmentTypeList: [],
                // 点位级别是否可用
                Usable: false,
                // 是创建还是编辑
                beforeTitle: "创建"
            },
            // SeeList: {
            //     RowId: "",
            //     EditDialog: false,
            //     equipmentTypeList: [],
            //     // 是创建还是编辑
            //     beforeTitle: "查看"
            // },
            reSet: false, // 重置搜索状态值(仅在需要多页使用同一个路由的情况下使用)
            typeIndex: 0, // 切换菜单时传入对应行号(仅在需要多页使用同一个路由的情况下使用)
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false,
            initialComponent: false,
            Ifpayload: false// 判断搜索回传的参数是否全是空的默认是全空
        };
    },
    methods: {
        operation(data) {
            let args = this.buttonList[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 打开创建
        operationDariy() {
            this.$set(this.EditDialogList, "RowId", "");
            this.EditDialogList.beforeTitle = "创建";
            this.openTanc();
        },
        // 打开弹窗
        openTanc() {
            this.EditDialogList.EditDialog = true;
            this.reFresh = !this.EditDialogList.EditDialog;
        },
        // 下级菜单切换
        urlHref(index) {
            if (index !== this.upIsIndex) {
                this.upIsIndex = index;
                this.isActive = 0;
            }
            this.tableList.getDataUrl = "";
            this.equipmentTypeList = this.lowerMenuBarList[this.upIsIndex].nextlevel;
            this.changEquipment(this.equipmentTypeList[this.isActive]);
        },
        reSetOver() {
            this.reSet = false;
        },
        // 四级菜单切换
        changEquipment(item) {
            this.tableList.getDataUrl = "equipment/?equipmentType=" + item.id;
            this.EditDialogList.equipmentTypeList = item;
            // this.SeeList.equipmentTypeList = item;
            this.paramsChange(item);           
            
            // 0：设备编号 1：配饰编号
            // 2：信号灯类型 3：设备名称 4：方案名称 5：点位级别 6：类型
            // 7：功能 8：控制方向 9：检测方向 10:指示方向 11:管辖单位
            // 12:建设日期 13:网络配置 14:相机IP 15:采集中心IP 16:设备状态 
            // 17:标线状态 18:护栏状态 19:视频检测状态 20:相机角度 21:展示方向
            // datadatadatadata
            // 信号机 0, 3, 5, 11, 12, 16
            // 信号灯 0, 2, 3, 5, 8, 11, 12, 16
            // 信号配时 1, 4, 5, 8, 11
            // 微波 0, 3, 5, 9, 11, 12, 13, 16
            // 地磁 0, 3, 5, 9, 11, 12, 15, 16
            // 视频检测 0, 3, 5, 9, 11, 12, 14, 19
            // 电子警察 0, 3, 5, 9, 11, 12, 14, 19
            // 卡口 0, 3, 5, 9, 11, 12, 14, 19
            // 违停 0, 3, 5, 9, 11, 12, 14, 19
            // 视频监控 0, 3, 5, 9, 11, 12, 14, 19, 20
            // 诱导屏 0, 3, 5, 21, 11, 12, 13, 16
            // 标志 0, 3, 5, 10, 11, 12, 16
            // 标线 0, 3, 5, 6, 7, 10, 11, 12, 16
            // 护栏 0, 3, 5, 22, 11, 12, 18
            let common = [2, 0, 3, 1, 4, 5];
            let list = [
                { id: "000001-1", table: [0, 2, 3, 5, 8, 11, 12, 16], search: [2, 0, 3, 1, 4, 5, 6] },
                { id: "000001-2", table: [0, 3, 5, 11, 12, 16], search: common },
                { id: "000002-1", table: [1, 4, 5, 8, 11], search: [8, 0, 7, 1] },
                { id: "000003-1", table: [0, 3, 5, 9, 11, 12, 13, 16], search: common },
                { id: "000003-2", table: [0, 3, 5, 9, 11, 12, 15, 16], search: common },
                { id: "000003-3", table: [0, 3, 5, 9, 11, 12, 14, 19], search: [2, 0, 3, 1, 4, 5, 9] },
                { id: "000004-1", table: [0, 3, 5, 9, 11, 12, 14, 19], search: [2, 0, 3, 1, 4, 5, 9] },
                { id: "000004-2", table: [0, 3, 5, 9, 11, 12, 14, 19], search: [2, 0, 3, 1, 4, 5, 9] },
                { id: "000004-3", table: [0, 3, 5, 9, 11, 12, 14, 19], search: [2, 0, 3, 1, 4, 5, 9] },
                { id: "000004-4", table: [0, 3, 5, 9, 11, 12, 14, 19, 20], search: [2, 0, 3, 1, 4, 5, 9, 10] },
                { id: "000005-1", table: [0, 3, 5, 21, 11, 12, 13, 16], search: common },
                { id: "000007-1", table: [0, 3, 5, 10, 11, 12, 16], search: [2, 0, 3, 1, 4, 5, 11] },
                { id: "000007-2", table: [0, 3, 5, 6, 7, 10, 11, 12, 16], search: [2, 12, 14, 0, 3, 1, 4, 5, 11] },
                { id: "000007-3", table: [0, 3, 5, 22, 11, 12, 18], search: [2, 15, 0, 3, 1, 4, 5] }
            ];
            for (let i = 0; i < list.length; i++) {
                if (item.id === list[i].id) {
                    this.searchGet(list[i]);
                    this.ListGet(list[i].table);
                }
            }
            this.buttonList = this.getButton(item, "button1");
            this.buttonList2 = this.getButton(item, "button2");
        },
        // 页面搜索列表更新,以及表格展示
        async searchGet(indexList) {
            let searchNList = this.searchNameList;
            let indexSearch = indexList.search;
            this.mapLoading = Loading.service({
                lock: true,
                background: "rgba(10, 40, 100, 0)"
            });
            await axios.get("equipment/?equipmentType=" + indexList.id).then((res) => {
                this.mapLoading.close();
                this.mapLoading = "";
                let searchName = [];
                this.searchName = [];
                let getUnitList = res.data.data;
                for (let i = 0; i < indexSearch.length; i++) {
                    let search = searchNList[indexSearch[i]];
                    if (search.change === "url") {
                        // this.$set(search, "url", "equipment/?equipmentType=" + indexList.id);
                        // if (search.id === "" || search.id === undefined) {
                        //     this.$set(search, "id", search.Sendkey);
                        // }
                        // if (search.getDataKey === "" || search.getDataKey === undefined) {
                        //     this.$set(search, "getDataKey", search.Sendkey);
                        // }
                        search.data = [];
                        for (let j = 0; j < getUnitList.length; j++) {
                            search.data.push({
                                id: getUnitList[j][search.Sendkey],
                                name: getUnitList[j][(search.getDataKey)?search.getDataKey : search.Sendkey]
                            });
                        }
                        // 去重
                        search.data = this.$tools.arrUnique(search.data, "id");
                    }
                    searchName.push(search);
                }
                this.searchName = searchName;
                this.searchData = this.searchName;
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
                this.mapLoading.close();
                this.mapLoading = "";
            });
        },
        ListGet(indexList) {
            this.$set(this.tableList, "list", []);
            let list = [];
            for (let i = 0; i < indexList.length; i++) {
                list.push(this.TABLE[indexList[i]]);
            }
            this.$nextTick(() => {
                this.$set(this.tableList, "list", list);
            });
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
                if (listName[i].title === "停用") {
                    listName[i].chang = {   
                        changSutusAll:[
                            ["停用", "erBtn", "status", "1","statusList2"],
                            ["启用", "suBtn", "status", "0","statusList2"],
                            ["", "buttonKong2", "status", "3","statusList2"]
                        ]                        
                    }
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
            }
            return listName;
        },
        // 导出
        export() {
            let url = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].export;
            let data = "?";
            let payload = this.tableList.params;
            if (payload.length < 3) {
                delete payload.pageNum;
                delete payload.pageSize;
            }
            Object.keys(payload).map(m => {
                if (payload[m] !== undefined && payload[m] !== null && payload[m] !== "") {
                    data = `${data}${m}=${payload[m]}&`;
                }
            });            
            this.$layerNotice("提示", "您确定要导出吗？", () => {
                window.location.href = "/wit_harns_service/equipment/" + url + `/export/${data}`;
            }, null, "warning");
        },
        // 查询条件变化
        paramsChange(item) {
            this.typeIndex = item;
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            this.reSet = true;
        },
        // 查看关闭按钮
        // submitButtonValue() {
        //     this.SeeList.EditDialog = false;
        //     this.reFresh = !this.SeeList.EditDialog;
        // },
        // 查看传参
        // openTancSee() {
        //     this.SeeList.EditDialog = true;
        //     this.reFresh = !this.SeeList.EditDialog;
        // },        
        // 保存编辑后搜索重置
        initialComponentOver() {
            this.initialComponent = false;
            setTimeout(() => {
                this.searchData = [...this.searchName];
            });
        },
        // 保存按钮
        submitButton() {
            this.initialComponent = true;
            this.EditDialogList.EditDialog = false;
            this.reFresh = !this.EditDialogList.EditDialog;
            this.searchData = [];
        },
        // 表格操作变化
        selectArySlected(item) {
            if (item.id) {
                switch (item.title) {
                    case "删除":
                        /* this.$layerNotice("提示", "您确定要删除吗？", () => {
                            if (item.id.status === "启用" || item.id.status === 1) {
                                this.$showSimpleMessage("启用状态不可删除", "error");
                            } else {
                                this.deleteEvent(item.title, item.id.id);
                                this.selectAry = item.id;
                            }
                        }, null, "warning"); */
                        if (item.id.status === "启用" || item.id.status === 1) {
                            this.$showSimpleMessage("启用状态不可删除", "error");
                        } else {
                            this.deleteEvent(item.title, item.id.id);
                            this.selectAry = item.id;
                        }
                        break;
                    case "编辑":
                        if (item.id.status === "启用" || item.id.status === 1) {
                            this.$showSimpleMessage("启用状态不可编辑", "error");
                        } else {
                            this.$set(this.EditDialogList, "RowId", item.id.id);
                            this.EditDialogList.beforeTitle = item.title;
                            this.openTanc();
                        }
                        break;
                    case "启用":
                        this.stopItAll(item.id);
                        break;
                    case "停用":
                        this.selectAry = item.id;
                        this.stopItAll(item.id);
                        break;
                    case "查看":
                        this.$set(this.EditDialogList, "RowId", item.id.id);
                        this.EditDialogList.beforeTitle = item.title;
                        this.openTanc();
                        // this.$set(this.SeeList, "RowId", item.id.id);
                        // this.openTancSee();
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
        // 全部启、停用
        stopItAll(status) {
            let juge = status.status;
            let mess = (juge !== undefined ? "" : "批量");
            let states = juge !== undefined ? ((juge === "停用" || juge === 0) ? "启用" : "停用") : (status === "1" ? (mess + "启用") : (mess + "停用"));
            let stateUrl = juge !== undefined ? ((juge === "停用" || juge === 0) ? "star" : "stop") : (status === "1" ? "star" : "stop");
            let idAry = (juge !== undefined ? status.id : this.pLGetArrystar(["status"], status));
            if (idAry.length === 0 && juge === undefined) {
                this.$showSimpleMessage("未发现可" + states + "设备", "error");
            } else {
                if (this.selectAry.isAI === 1 && this.selectAry.controlStatus === 1 && stateUrl === "stop") {
                    this.$showSimpleMessage("此时提示此设备正在被使用，无法停用，", "error");
                } else {
                    let messstates = (this.selectAry.isAI === 1 && this.selectAry.controlStatus === 0 && stateUrl === "stop") ? "此设备为AI设备，停用此设备？" : "您确定要" + states + "吗？";
                    this.$layerNotice("提示", messstates, () => {
                        axios.put("equipment/" + stateUrl, { id: idAry.toString() }).then((res) => {
                            if (res.data.code === 0) {
                                this.$showSimpleMessage(states + "成功", "success");
                                this.reFresh = !this.reFresh;
                            } else {
                                let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                                this.$showSimpleMessage(mess, "error");
                            }
                        }).catch(this.defaultHttpHandler);
                    }, null, "warning");
                }
            }
        },
        // 删除
        deleteAll() {
            let idAry = this.pLGetArry();
            if (idAry.length === 0) {
                this.$showSimpleMessage("未发现选中设备", "error");
                return;
            }
            this.deleteEvent("批量删除", idAry);
        },
        // 删除接口
        deleteEvent(mes, idAry) {
            if (this.selectAry.isAI === 1 && this.selectAry.controlStatus === 1) {           
                this.$showSimpleMessage("此时提示此设备正在被使用，无法删除，", "error");
            } else {
                let messstates = (this.selectAry.isAI === 1 && this.selectAry.controlStatus === 0) ? "此设备为AI设备，删除此设备？" : "您确定要" + mes + "用吗？";
                this.$layerNotice("提示", messstates, () => {
                    axios.put("equipment/delete/", {
                        id: idAry.toString() }).then((res) => {
                        if (res.data.code === 0) {
                            this.reFresh = !this.reFresh;
                            this.$showSimpleMessage(mes + "成功", "success");
                            this.initialComponent = true;
                            this.searchData = [];
                        } else {
                            this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                        }
                    }).catch(this.defaultHttpHandler);
                }, null, "warning");
            }
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            this.payload = payload;
            this.tableList.params = this.payload;
            this.tableList.params.pageSize = this.tableList.thisPageSize;
        },
        // 获取三级菜单数据
        getEquipmentType() {
            if (this.$store.state.authData.length > 0) {
                let datas = this.$store.state.authData.find(t => t.name === "系统配置");
                let data = this.$tools.deepCopy(datas);
                let list = data.nextlevel.find(t => t.name === "资产管理").nextlevel;
                let lowerMenuBarList = [];
                for (let i = 0; i < list.length; i++) {
                    if (list[i].nextlevel && list[i].type === 1) {
                        let parent = this.$store.state.equipmentType2.find(t => t.parent === list[i].name);
                        if (parent) {
                            let juge = parent.equipmentTypeList;
                            for (let j = 0; j < list[i].nextlevel.length; j++) {
                                if (list[i].nextlevel[j].type === 1 && list[i].nextlevel[j].nextlevel) {
                                    let KeyList = juge.find(t => t.name === list[i].nextlevel[j].name);
                                    this.$set(list[i].nextlevel[j], "id", KeyList.id);
                                    this.$set(list[i].nextlevel[j], "export", KeyList.enName);
                                }
                            }
                            lowerMenuBarList.push(list[i]);
                        }
                    }
                }
                this.lowerMenuBarList = lowerMenuBarList;
                this.urlHref(this.upIsIndex);
                this.reSetOver();
            }
        }, // 获取列表
        getAxios(element, val) {
            axios.get(val).then((res) => {
                let getUnitList = res.data.data;
                for (let i = 0; i < getUnitList.length; i++) {
                    let data = getUnitList[i];
                    for (let key in Object.keys(data)) {
                        let name = Object.keys(data)[key];
                        let value = data[name];
                        if (value === null || value === undefined) {
                            data[name] = "无数据";
                        }
                    }
                    this.$set(element, i, getUnitList[i]);
                }
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        },    
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        }
    },
    mounted() {
        this.getEquipmentType();
    }
};
</script>
