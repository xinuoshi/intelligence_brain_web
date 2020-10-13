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
                <bt ref="bt" :buttonList="buttonList1" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon" :buttonList="buttonList2" @update:button-list="val=>buttonList2 = val" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList" @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
        <!-- 创建和编辑查看弹窗 -->
        <!-- 单组 -->
        <singleDialog v-if="dialogVisible === 'single'" :dialogVisible="dialogVisible" :dialogTitle="dialogTitle" :dialogData="dialogData" @controlShow="controlShow" @refreshPage="refreshPage" :isMulti="false"></singleDialog>
        <!-- 组间 -->
        <multiDialog v-if="dialogVisible === 'multi'" :dialogVisible="dialogVisible" :dialogTitle="dialogTitle" :dialogData="dialogData" @controlShow="controlShow" @refreshPage="refreshPage"></multiDialog>
    </div>
</template>

<script>
import singleDialog from "./singleDialog.vue";
import multiDialog from "./multiDialog.vue";

export default {
    name: "trainingProgram",
    components: {
        singleDialog,
        multiDialog
    },
    data() {
        return {
            // 搜索传参
            searchName: [
                { searchPlaceholder: "轮巡名称", id: 1, type: 0, url: "", Sendkey: "name" },
                { searchPlaceholder: "计划类型", id: "", type: 1, url: "", data: [{ id: 1, name: "单组计划" }, { id: 2, name: "组间计划" }], Sendkey: "type" },
                { searchPlaceholder: "计划状态", id: "", type: 1, url: "", data: [{ id: 2, name: "启用" }, { id: 1, name: "停用" }], Sendkey: "status" }
            ],
            // 表格组件传参列表
            tableList: {
                thisPageSize: 10,
                getDataUrl: "turnsInspection/",
                params: [],
                selection: false, // 是否有选中框
                scope: "0", // 是否有操作栏
                width: "450", // 操作宽度
                index: true, // 是否有序号
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    // { tableName: "序号", tableProp: "index", hover: true },
                    { tableName: "计划编号", tableProp: "number", hover: true },
                    { tableName: "计划类型", tableProp: "type", keyChange: { keyName: "name", keyValue: "value" }, pand: [{ name: "1", value: "单组计划" }, { name: "2", value: "组间计划" }] },
                    { tableName: "轮巡名称", tableProp: "name", hover: true },
                    { tableName: "计划状态", tableProp: "status", keyChange: { keyName: "name", keyValue: "value" }, pand: [{ name: "1", value: "停用" }, { name: "2", value: "启用" }] }
                ]
            },
            // 按钮
            buttonList1: [],
            buttonList2: [],
            // 弹窗标题
            dialogTitle: "",
            // 弹窗表单
            formValidate: {},
            // 弹窗显隐状态
            dialogVisible: "",
            // 弹窗数据
            dialogData: {
                id: ""
            },
            // 当前页
            pageNum: 1,
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false,
            // 判断搜索回传的参数是否全是空的默认是全空
            Ifpayload: false
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
        // 刷新页面数据
        refreshPage() {
            this.reFresh = !this.reFresh;
        },
        // 上部操作
        operation(op) {
            switch (op.title) {
                case "单组创建":
                    this.dialogTitle = "创建单组轮巡计划";
                    this.openDialog("", "single");
                    break;
                case "组间创建":
                    this.dialogTitle = "创建组间轮巡计划";
                    this.openDialog("", "multi");
                    break;
            }
        },
        // 表格操作变化
        selectArySlected(item) {
            if (item.id) {
                switch (item.title) {
                    case "编辑":
                        if (item.id.status === "启用" || item.id.status === 2) {
                            this.$showSimpleMessage("启用状态不可编辑", "error");
                        } else {
                            this.dialogTitle = "编辑轮巡计划";
                            this.openDialog(item.id.id, item.id.type === "单组计划" ? "single" : "multi");
                        }
                        break;
                    case "查看":
                        this.dialogTitle = "查看轮巡计划";
                        this.openDialog(item.id.id, item.id.type === "单组计划" ? "single" : "multi");
                        break;
                    case "启用":
                        this.stopItAll(item.id);
                        break;
                    case "停用":
                        this.stopItAll(item.id);
                        break;
                    case "删除":
                        this.$layerNotice("提示", "您确定要删除吗？", () => {
                        if (item.id.status === "启用" || item.id.status === 2) {
                            this.$showSimpleMessage("启用状态不可删除", "error");
                        } else {
                            this.deleteAll(item.id);
                        }
                        }, null, "warning");
                        break;
                }
            } else {
                this.selectAry = item;
            }
        },
        // 启、停用
        stopItAll(status) {
            // console.log(status)
            let juge = status.status;
            let mess = (juge ? "" : "批量");
            let states = juge ? (juge === "停用" ? "启用" : "停用") : (status === "0" ? (mess + "启用") : (mess + "停用"));
            let stateUrl = juge ? (juge === "停用" ? "usr" : "star") : (status === "1" ? "star" : "stop");
            let idAry = juge ? status.id : this.pLGetArrystar(["status"], status);
            if (idAry.length === 0 && juge === undefined) {
                this.$showSimpleMessage("未发现可" + states + "计划", "error");
            } else {
                this.$layerNotice("提示", "您确定要" + states + "吗？", () => {
                    axios.put("turnsInspection/" + stateUrl, { id: idAry.toString() }).then((res) => {
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
                    axios.put("turnsInspection/delete", { id: id.toString() }).then((res) => {
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
        pLGetArry() {
            let idAry = [];
            this.selectAry.forEach((value) => {
                idAry.push(value.id);
            });
            return idAry;
        },
        // 打开弹窗
        openDialog(data, winType) {
            // this.$set(this.dialogData, "id", data);
            this.dialogData = {};
            this.dialogVisible = winType;
            setTimeout(() => {
                this.$set(this.dialogData, "id", data);
            });
        },
        // 弹窗状态改变
        controlShow(status) {
            this.dialogVisible = status;
        },
        // 关闭无提示
        closeNoneTips() {
            this.dialogVisible = false;
            this.$refs["formValidate"].resetFields();
            this.formValidate = {};
        },
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                this.formValidate = {};
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
            }, null, "warning");
        },
        // 重置表单
        resetForm(formName, mess) {
            if (this.title === "查看" || mess) {
                this.closeDialogData(formName, "关闭");
            } else {
                this.closeDialogData(formName, "取消");
            }
        }
    },
    created() {
        // 先获取权限
        let authData = this.$store.state.authData;
        let button1 = {
            title: "",
            plain: true,
            type: "primary",
            size: "small",
            class: "qiliang",
            functionKeyName: ""
        };
        let button2 = {
            title: "",
            plain: true,
            size: "mini",
            type: "primary",
            disabled: false
        };
        authData.forEach((t1) => {
            if (t1.name === "视频集控") {
                t1.nextlevel.forEach((t2) => {
                    if (t2.name === "轮巡计划") {
                        // b1
                        if (t2.button1.length !== 0) {
                            for (let i = 0; i < t2.button1.length; i++) {
                                let bt = this.$tools.deepCopy(button1);
                                bt.title = t2.button1[i].name;
                                this.buttonList1.push(bt);
                            };
                        }
                        // b2
                        if (t2.button2.length !== 0) {
                            for (let j = 0; j < t2.button2.length; j++) {
                                let bt = this.$tools.deepCopy(button2);
                                if (t2.button2[j].enName === "stop" || t2.button2[j].enName === "delete") {
                                    bt.class = "erBtn";
                                    if (t2.button2[j].enName === "stop") {
                                        bt.chang = {
                                            status: 1,
                                            prop: "status",
                                            changStop: ["停用", "erBtn"],
                                            changStar: ["启用", "suBtn"]
                                            // changSutus: ["", "buttonKong", "status", "2"]
                                            // changSutus: ["", "buttonKong", "status", "2"]
                                        };
                                    }
                                }
                                bt.title = t2.button2[j].name;
                                this.buttonList2.push(bt);
                            };
                        }
                    }
                });
            }
        });
    },
    mounted() {
        this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
    }
};
</script>


<style scoped>
    .dialog {
        display: flex;
        flex-direction: column;
    }
</style>
