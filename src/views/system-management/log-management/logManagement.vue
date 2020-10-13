<!--
   日志管理
   create 2018.08.30 to liujin
-->
<template>
    <div>
        <api>
            <div slot="header" class="word">{{columnHeadlines}}</div>
            <div slot="searchBoxBar" class="flexNum">
                <!-- 搜索栏 左边搜索 -->
                <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                        :searchName="searchName"
                        @searchEvent="handlerSearchEvent" ></SearchPage>
            </div>
            <div slot="searchBoxBar" class="operation">
                <bt class="bt flexNum" ref="bt" :buttonList="buttonListR" @operation="changeStatus"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon"  :buttonList = "buttonList2"  @update:button-list="val=>buttonList2 = val" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
        <!-- 创建和编辑查看弹窗 -->

        <el-dialog :close-on-press-escape="false"  :title="assemblyValue.title" v-dialogDrag :show-close="true" @close="closeDialog('formValidate')"
                   :visible.sync="EditDialog" class="tems_dialog logmanagement" width="700px" :close-on-click-modal="false">
            <div class="scrollPart" id="scrollDPart">
                <el-form :model="formValidate" ref="formValidate"
                         label-width="140px" class="demo-ruleForm">
                    <div class="infoItemInfo" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="日志编号：">
                            <el-button class="log_form_btn">{{this.assemblyValue.id}}</el-button>
                        </el-form-item>
                        <!--<el-form-item class="infoItem" label="数据主键ID：">
                           {{this.assemblyValue.deptId}}
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作数据表名称：">
                           {{this.assemblyValue.tableName}}
                        </el-form-item>-->
                        <el-form-item class="infoItem" label="操作时间：">
                            <el-button class="log_form_btn">{{this.assemblyValue.createdTime}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作者用户名：">
                            <el-button class="log_form_btn">{{this.assemblyValue.username}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作者姓名：">
                            <el-button class="log_form_btn">{{this.assemblyValue.accountName}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作类型：">
                            <el-button class="log_form_btn">{{this.assemblyValue.type}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作内容：">
                            <el-button class="log_form_btn">{{this.assemblyValue.tableName}}</el-button>
                        </el-form-item>
                        <el-form-item class="infoItem" label="操作IP：">
                            <el-button class="log_form_btn">{{this.assemblyValue.ip}}</el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <el-table
                        :data="assemblyValue.logContents"
                        class="rizhibiao" v-if="assemblyValue.type === '修改'">
                    <el-table-column
                            prop="logKeys"
                            label="修改字段">
                    </el-table-column>
                    <el-table-column
                            prop="oldValue"
                            label="旧值">
                    </el-table-column>
                    <el-table-column
                            prop="newValue"
                            label="新值">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="assemblyValue.title === '详情'" class="tems_Button inportBtn log_close" @click="EditDialog = false">关闭</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "@/components/common/api.vue";

    export default {
        name: "assetTrafficControlEquipment",
        components: {
            api
            // Assembly
        },
        data() {
            return {
                tableData3: [{
                    logKeys: "无数据",
                    oldValue: "无数据",
                    newValue: "无数据"
                }],
                searchName: [
                    { searchPlaceholder: "操作人", id: 1, type: 0, url: "", Sendkey: "username", data: ""},
                    // { searchPlaceholder: "操作人", type: 6, id: "ip", Sendkey: "ip", url: "//log/", getDataKey:"ip"},
                    { searchPlaceholder: "操作时间", id: 3, type: 7, url: "", Sendkey: "startTime", data: "", time: "" },
                    { searchPlaceholder: "至", id: 4, type: 8, url: "", Sendkey: "endTime", data: "", time: "" },
                    { searchPlaceholder: "操作ip", id: 1, type: 0, url: "", Sendkey: "ip" },
                    { searchPlaceholder: "操作类型", id: "name", type: 1, url: "", Sendkey: "type", getDataKey: "id", data: [{ id: "1", name: "新增" }, { id: "2", name: "删除" }, { id: "3", name: "修改" }, { id: "4", name: "启用" }, { id: "5", name: "停用" }, { name: "7", value: "查看详情" }, { id: "8", name: "登录" }, { id: "9", name: "退出登录" }, { id: "12", name: "AI控制状态：启用" }, { id: "13", name: "AI控制状态：停用" }, { id: "14", name: "设备绑定事件" }, { id: "15", name: "ai配置" }, { id: "16", name: "字典批量更新" }, { id: "17", name: "修改告警显示" },{ id: "18", name: "关闭事件" }] }
                ],
                buttonListR: [
                    {
                        title: "导出",
                        type: "primary",
                        size: "mini",
                        plain: true,
                        loading: false,
                        functionKeyName: "exportExcle",
                        class: "qiliang"
                    }
                ],
                // 表格组件传参列表
                tableList: {
                    thisPageSize: 10,
                    getDataUrl: "/log/",
                    params: [],
                    selection: false, // 是否有选中框
                    scope: "0", // 是否有操作栏
                    width: "300", // 操作宽度
                    index: "0", // 是否有序号
                    // 表格表头名称和要加载的prop
                    // hover(是否显示表格鼠标划入有无弹窗)；
                    // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                    // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                    // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                    // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                    // keyChange里的pand（转换的列表）
                    list: [
                        { tableName: "日志编号", tableProp: "id", hover: "flge" },
                        /* { tableName: "根据主键ID", tableProp: "deptId" },
                        { tableName: "操作数据表名称", tableProp: "tableName" },*/
                        { tableName: "操作时间", tableProp: "createdTime", tableTime: "falge" },
                        { tableName: "操作人", tableProp: "username" },
                        { tableName: "操作类型",
                            tableProp: "type",
                            keyChange: { keyName: "name", keyValue: "value" },
                            pand: [{ name: "1", value: "新增" }, { name: "2", value: "删除" }, { name: "3", value: "修改" }, { name: "4", value: "启用" }, { name: "5", value: "停用" }, { name: "7", value: "查看详情" }, { name: "8", value: "登录" }, { name: "9", value: "退出登录" }, { name: "10", value: "设为AI设备" }, { name: "11", value: "取消设备AI设备" }, { name: "12", value: "AI控制状态：启用" }, { name: "13", value: "AI控制状态：停用" }, { name: "14", value: "设备绑定事件" }, { name: "15", value: "ai配置" }, { name: "16", value: "字典批量更新" }, { name: "17", value: "修改告警显示" },{ name: "18", value: "关闭事件" }] },
                        { tableName: "操作IP",
                            tableProp: "ip"
                        }
                    ]
                },
                payload: "", // 搜索回调传入的搜索参数
                buttonList2: [{
                    title: "查看",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    disabled: false
                }],
                columnHeadlines: "交通信号方案",
                assemblyValue: { // 变化的
                    id: "",
                    createdTime: "",
                    deptId: "",
                    title: "",
                    userId: "",
                    username: "",
                    accountName: "",
                    type: "",
                    ip: "",
                    status: "",
                    remark: "",
                    tableId: "",
                    tableName: "",
                    logContents: [{}]
                },
                // 当前页
                pageNum: 1,
                // 当前页面显示数量
                pageSize: 10,
                // 数据总数
                allPageValue: 0,
                // 创建编辑弹窗
                EditDialog: false,
                // 创建编辑内容
                formValidate: {},
                // 判断搜索回传的参数是否全是空的默认是全空
                Ifpayload: false,
                ruleValidate:{},
                dataAll:""
            };
        },
        methods: {              
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
            // 搜索回调函数
            searchEvent(searchData) {
                this.tableData = searchData;
                this.datalength = searchData.length; // 总数据长度
                this.pageNum = 1;
                let data = searchData.filter(t => t.pageNum === this.pageNum);
                this.tableList.tableData = data; // 默认表格数据经过分页处理
            },
            // 打开编辑
            editDirect(data) {
                if (data.id.logContents === null || data.id.logContents.length > 0) {
                    this.assemblyValue.logContents = data.id.logContents;
                } else {
                    this.assemblyValue.logContents = this.tableData3;
                }
                this.assemblyValue.title = "详情";
                this.assemblyValue.id = data.id.id;
                this.assemblyValue.type = data.id.type;
                this.assemblyValue.deptId = data.id.deptId;

                this.assemblyValue.createdTime = data.id.createdTime;
                this.assemblyValue.username = data.id.username;
                this.assemblyValue.accountName = data.id.accountName;
                this.assemblyValue.tableName = data.id.tableName;
                this.assemblyValue.ip = data.id.ip;
                this.EditDialog = true;
            },
            // 关闭弹窗
            closeDialog(formName) {
                this.$refs[formName].resetFields();
                this.equipmentType = "";
                this.formValidate = {};
                this.rowID = "";
                this.assemblyValue.moduleList = [];
                this.EditDialog = false;// 创建编辑弹窗隐藏
            },
            // 页面顶部按钮组件回调
            changeStatus(data) {
                let args = this.buttonListR[data.index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 导出Excle表格
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
                    window.location.href = this.Ifpayload ? `/wit_harns_service/log/export/${data}` : "/wit_harns_service/log/export/";
                this.Ifpayload = false;
            }, null, "warning");
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
            // 表格操作变化
            selectArySlected(item) {
                if (item.id.type === "修改") {
                    axios.get("/log/" + item.id.id).then((res) => {
                        item.id.logContents = res.data.data.logContents;
                    this.editDirect(item);
                });
                } else {
                    this.editDirect(item);
                }
            }
        },
        mounted() {
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            axios.get("/log/").then(async (res) => {
                axios.get("/log/ipList").then(async (resall) => {
                    axios.get("/log/usernameList").then(async (resusername) => {
                        console.log(resusername)
                        let ips = resall.data.data;
                        let usernameall = resusername.data.data;
                        let ipss = [];
                        let usernamelist = [];
                        for (let j in usernameall) {
                            usernamelist.push({
                                name: usernameall[j],
                                id: usernameall[j]
                            })
                        }
                        for (let i in ips) {
                            ipss.push({
                                name: ips[i],
                                id: ips[i]
                            })
                        }
                        if (res.data.code === 0) {
                            this.dataAll = res.data.data.list;
                            this.dataAll.map(t => {
                                t.name = t.username;
                                t.id = t.username;
                            });
                            /*let ips = this.$tools.deepCopy(this.dataAll);
                            ips.map(t => {
                                t.name = t.ip;
                                t.id = t.ip;
                            });*/
                            // 去重
                            this.dataAll = await this.$tools.arrUnique(this.dataAll, "userId");
                            /*ips = await this.$tools.arrUnique(ips, "ip");*/
                            this.searchName = [
                                {searchPlaceholder: "操作人", type: 1, Sendkey: "username", getDataKey: "id", data: usernamelist},
                                // { searchPlaceholder: "操作人", type: 6, id: "ip", Sendkey: "ip", url: "//log/", getDataKey:"ip"},
                                {
                                    searchPlaceholder: "操作时间",
                                    id: 3,
                                    type: 7,
                                    url: "",
                                    Sendkey: "startTime",
                                    data: "",
                                    time: ""
                                },
                                {searchPlaceholder: "至", id: 4, type: 8, url: "", Sendkey: "endTime", data: "", time: ""},
                                // { searchPlaceholder: "ip", id: 1, type: 0, url: "", Sendkey: "ip" },
                                {searchPlaceholder: "操作ip", type: 1, Sendkey: "ip", getDataKey: "id", data: ipss},
                                {
                                    searchPlaceholder: "操作类型",
                                    id: "name",
                                    type: 1,
                                    url: "",
                                    Sendkey: "type",
                                    getDataKey: "id",
                                    data: [{id: "1", name: "新增"}, {id: "2", name: "删除"}, {id: "3", name: "修改"}, {
                                        id: "4",
                                        name: "启用"
                                    }, {id: "5", name: "停用"}, {id: "8", name: "登录"}, {id: "9", name: "退出登录"}, {
                                        id: "12",
                                        name: "AI控制状态：启用"
                                    }, {id: "13", name: "AI控制状态：停用"}, {id: "14", name: "设备绑定事件"}, {
                                        id: "15",
                                        name: "ai配置"
                                    }, {id: "16", name: "字典批量更新"}, {id: "17", name: "修改告警显示"}]
                                }
                            ]
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    })
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                })
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            })
        },
        watch: {
            "pageNum": function(val) {
                console.log(val)
            }
        }
    };
</script>
<style>
    .logmanagement .log_form_btn {
        background-color: #071B35 !important;
        border: none;
        padding: 11px 8px;
        color: #53D4F9;
        cursor: default;
    }
</style>

<style scoped>
    .rizhibiao {
        height: 150px;
        width: 100% !important;
    }
    .el-form-item {
        margin-bottom: 1px;
    }
    .el-form-item .el-button {
        background-color: #071B35 !important;
    }
    .infoItemInfo {
        text-align: left !important;
    }
    .rizhibiao{
        position: relative !important;
    }
    .log_close {
        border-radius: 3px;
    }
    .dialog-footer {
        text-align: center!important;
    }
</style>
