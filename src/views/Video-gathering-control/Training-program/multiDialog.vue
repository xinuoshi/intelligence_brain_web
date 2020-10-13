<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false"  :title="dialogTitle" v-dialogDrag :show-close="true" @close="closeNoneTips()"
                :visible="dialogVisible === 'multi'" class="tems_dialog trainingPg" width="700px" :close-on-click-modal="false">
        <div class="scrollPart" id="scrollDPart">
            <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="140px" class="demo-ruleForm">
                <div class="dialog">
                    <el-form-item label="轮巡名称：" prop="name">
                        <el-input maxlength="20" class="tems_Input" placeholder="请输入..." v-model="formValidate.name" :disabled="(dialogTitle === '查看轮巡计划' ? true : false)" :clearable="dialogTitle !== '查看轮巡计划'" size="small" />
                    </el-form-item>
                    <div style="display: flex">
                        <el-form-item label="轮巡时间：" prop="startTime">
                            <div class="itemData">
                                <el-date-picker type="datetime" class="tems_Input" v-model="formValidate.startTime" size="small" placeholder="选择时间" :disabled="(dialogTitle === '查看轮巡计划' ? true : false)" :clearable="dialogTitle !== '查看轮巡计划'" />
                            </div>
                        </el-form-item>
                        <span class="zhiclass">至</span>
                        <el-form-item prop="endTime" label-width="0px" class="endDates">
                            <div class="itemData">
                                <el-date-picker type="datetime" class="tems_Input" v-model="formValidate.endTime" size="small" placeholder="选择时间" :disabled="(dialogTitle === '查看轮巡计划' ? true : false)" :clearable="dialogTitle !== '查看轮巡计划'" />
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="轮巡组：">
                            <div style="display: flex; margin: 5px;">
                                <el-button class="AIbtn" size="mini" v-if="dialogTitle !== '查看轮巡计划'" @click="singleChoose">{{"从单组计划添加"}}</el-button>
                                <el-button class="AIbtn" size="mini" v-if="dialogTitle !== '查看轮巡计划'" @click="singleOpen('c', '')">{{"创建单组计划"}}</el-button>
                            </div>
                            <singleDialog class="sAddDialog" :dialogVisible="sdialogVisible" :dialogTitle="sdialogTitle" :dialogData="sdialogData" @controlShow="controlShow" :isMulti="true"></singleDialog>
                            <div>
                                <div class="flexRow">
                                    <div class="flexNum devLineTable">序号</div>
                                    <div class="flexNum devLineTable">轮巡名称</div>
                                    <div class="flexNum devLineTable">操作</div>
                                </div>
                                <div class="flexColumn" >
                                    <div class="flexRow" v-for="(item, index) in formValidate.turnsInspectionSonIds" :key="index">
                                        <div class="flexNum devLineTable">{{index + 1}}</div>
                                        <div class="flexNum devLineTable">{{item.name}}</div>
                                        <div class="flexNum devLineTable">
                                            <el-button class="clearBtn" size="mini" @click="singleOpen('s', item.id)">{{"查看"}}</el-button>
                                            <el-button class="erBtn" size="mini" v-if="dialogTitle !== '查看轮巡计划'" @click="singleDel(index)">{{"删除"}}</el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 选择单组弹窗 -->
                            <el-dialog :close-on-press-escape="false"  title="从单组计划添加" v-dialogDrag :show-close="false" class="tems_dialog sAddListDialog" width="705px" :visible.sync="sAddVisible" :close-on-click-modal="false" append-to-body>
                                <el-transfer
                                    ref="transFromS"
                                    :titles="['未选中', '已选中']"
                                    :props="{ key: 'id', label: 'name' }"
                                    v-model="sAddSeleted"
                                    filterable
                                    target-order="push"
                                    :data="sAddData">
                                </el-transfer>
                                <div slot="footer" class="dialog-footer flexRow">
                                    <div class="flexNum">
                                        <div class="tems_Button qiliang dic_closed" @click="sAddClose">取 消</div>
                                        <div class="tems_Button exportBtn" @click="sAddSubmit">保 存</div>
                                    </div>
                                </div>
                            </el-dialog>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum">
                <div v-if="dialogTitle === '查看轮巡计划'" class="tems_Button inportBtn dic_closed" @click="closeNoneTips()">关 闭</div>
                <div v-if="dialogTitle !== '查看轮巡计划'" class="tems_Button inportBtn dic_closed" @click="resetForm('formValidate')">取 消</div>
                <div v-if="dialogTitle !== '查看轮巡计划'" class="tems_Button exportBtn" @click="handleSubmit('formValidate')">保 存</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import singleDialog from "./singleDialog.vue";

export default {
    props: ["dialogVisible", "dialogTitle", "dialogData"],
    components: {
        singleDialog
    },
    data() {
        return {
            // 弹窗表单
            formValidate: {
                name: "",
                startDate: "",
                endDate: "",
                turnsInspectionSonIds: []
            },
            ruleValidate: {
                name: this.$CommonRule.NotEmpty,
                startTime: this.$CommonRule.DateRule,
                endTime: this.$CommonRule.DateRule
            },
            // 单组创建弹窗显隐
            sdialogVisible: false,
            // 单组弹窗标题
            sdialogTitle: "",
            // 单组数据
            sdialogData: {
                id: ""
            },
            // 单组选择显隐
            sAddVisible: false,
            // 单组计划的数据
            sAddData: [],
            sAddSeleted: []
        };
    },
    methods: {
        // 获取弹窗详情
        getData() {
            this.formValidate.turnsInspectionSonIds = [];
            axios.get("turnsInspection/" + this.dialogData.id).then((res) => {
                let data = res.data.data;
                let sAddSelet = [];
                axios.get("turnsInspection/?type=1").then((res) => {
                    if (res.data.code === 0) {
                        this.sAddData = res.data.data;
                        data.turnsInspectionRelationshipViewList.forEach((id) => {
                            this.sAddData.forEach((e) => {
                                if (id.turnsInspectionSongId === e.id) {
                                    this.formValidate.turnsInspectionSonIds.push(e);
                                    sAddSelet.push(e.id);
                                }
                            });
                        });
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
                this.$set(this.formValidate, "name", data.name);
                this.formValidate.number = data.number;
                let sTime = new Date(data.startTime);
                let eTime = new Date(data.endTime);
                this.$set(this.formValidate, "startTime", new Date(sTime.getFullYear(), sTime.getMonth(), sTime.getDate(), sTime.getHours(), sTime.getMinutes(), sTime.getSeconds()));
                this.$set(this.formValidate, "endTime", new Date(eTime.getFullYear(), eTime.getMonth(), eTime.getDate(), eTime.getHours(), eTime.getMinutes(), eTime.getSeconds()));
                // this.$set(this.formValidate, "startTime", this.$filter.formatDateTime(data.startTime));
                // this.$set(this.formValidate, "endTime", this.$filter.formatDateTime(data.endTime));
                this.sAddSeleted = sAddSelet;
                // console.log(this.sAddSeleted)
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 时间起止时间判定（njc写的）
        tiemDB() {
                let startTime = this.formValidate.startTime;
                let endTime = this.formValidate.endTime;
            if (startTime !== null && startTime !== "" && startTime !== undefined && endTime !== null && endTime !== "" && endTime !== undefined) {
                startTime = this.$filter.timesFormat(startTime);
                endTime = this.$filter.timesFormat(endTime);
                let nowData = this.$filter.timesFormat(new Date());
                if (endTime < startTime) {
                    this.formValidate.endTime = nowData > endTime ? new Date() :  startTime + 60000;
                    this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                }
            }
        },
        // 关闭无提示
        closeNoneTips() {
            if (this.dialogVisible === "multi") {
                if (this.dialogTitle === "查看轮巡计划") {
                    // 查看时，关闭弹窗不提示
                    this.$emit("controlShow", "");
                    this.$refs["formValidate"].resetFields();
                    this.formValidate = {};
                    this.sAddSeleted = [];
                } else {
                    this.$layerNotice("提示", "您确定要取消吗？", () => {
                        this.$emit("controlShow", "");
                        this.$refs["formValidate"].resetFields();
                        this.formValidate = {};
                        this.sAddSeleted = [];
                    }, null, "warning");
                }
            }
        },
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                this.formValidate = {};
                this.$refs[formName].resetFields();
                this.sAddSeleted = [];
                this.$emit("controlShow", "");
            }, null, "warning");
        },
        // 取消重置表单
        resetForm(formName, mess) {
            if (this.title === "查看" || mess) {
                this.closeDialogData(formName, "关闭");
            } else {
                this.closeDialogData(formName, "取消");
            }
        },
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate((result) => {
                let startTime = this.formValidate.startTime.getTime();
                let endTime = this.formValidate.endTime.getTime();
                if (!result) {
                    this.$showSimpleMessage("内容验证失败", "error");
                    return false;
                } else if (this.sAddSeleted.length === 0) {
                    this.$showSimpleMessage("请添加单组计划", "error");
                    return false;
                } else if (startTime >= endTime) {
                    this.$showSimpleMessage("轮巡结束时间应大于开始时间", "error");
                    return false;
                } else {
                    if (this.dialogTitle === "创建组间轮巡计划") {
                        this.handleAdd(this.formValidate);
                    } else {
                        this.handleEdit(this.formValidate);
                    }
                }
            });
        },
        // 保存创建
        handleAdd(formData) {
            let addIds = this.formValidate.turnsInspectionSonIds.map(e => e.id);
            let data = {
                name: this.formValidate.name,
                startTime: this.formValidate.startTime.getTime(),
                endTime: this.formValidate.endTime.getTime(),
                type: "2",
                turnsInspectionSonIds: addIds.toString()
            };
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("turnsInspection/", data).then((res) => {
                    if (res.data.code === 0) {
                        this.$emit("controlShow", "");// 创建编辑弹窗隐藏
                        this.formValidate = {};
                        this.$refs["formValidate"].resetFields();
                        this.eqSeleted = [];
                        this.$emit("refreshPage");
                        this.$showSimpleMessage("创建成功", "success");
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 保存编辑
        handleEdit(formData) {
            let addIds = this.formValidate.turnsInspectionSonIds.map(e => e.id);
            let data = {
                name: this.formValidate.name,
                number: this.formValidate.number,
                startTime: this.formValidate.startTime.getTime(),
                endTime: this.formValidate.endTime.getTime(),
                type: "2",
                turnsInspectionSonIds: addIds.toString()
            };
            this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                axios.put("turnsInspection/" + this.dialogData.id, data).then((res) => {
                    if (res.data.code === 0) {
                        this.$emit("controlShow", "");// 创建编辑弹窗隐藏
                        this.formValidate = {};
                        this.$refs["formValidate"].resetFields();
                        this.eqSeleted = [];
                        this.$emit("refreshPage");
                        this.$showSimpleMessage("保存成功", "success");
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 弹窗状态改变
        controlShow(status) {
            this.sdialogVisible = status;
        },
        // 打开单组创建
        singleOpen(type, data) {
            if (type === "c") {
                this.sdialogTitle = "创建单组轮巡计划";
                this.sdialogData = {};
                this.$set(this.sdialogData, "id", data);
            } else if (type === "s") {
                this.sdialogTitle = "查看轮巡计划";
                this.sdialogData = {};
                this.$set(this.sdialogData, "id", data);
            }
            this.sdialogVisible = "single";
        },
        // 打开单组选择
        singleChoose() {
            axios.get("turnsInspection/?type=1").then((res) => {
                if (res.data.code === 0) {
                    // 清除左侧列表选中状态
                    if(this.$refs.transFromS) {  
                        this.$refs.transFromS.$children["0"]._data.checked = [];
                    }
                    this.sAddData = res.data.data;
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
            this.sAddVisible = true;
        },
        // 单组删除
        singleDel(index) {
            this.formValidate.turnsInspectionSonIds.splice(index, 1);
            this.sAddSeleted.splice(index, 1);
        },
        // 单组选择弹窗取消
        sAddClose() {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.sAddVisible = false;
                this.$refs.transFromS.clearQuery("left");
                this.$refs.transFromS.clearQuery("right");
            }, null, "warning");
        },
        // 单组选择选择确定
        sAddSubmit() {
            this.$layerNotice("提示", "您确定要保存吗？", () => {
                this.sAddVisible = false;
                this.$refs.transFromS.clearQuery("left");
                this.$refs.transFromS.clearQuery("right");
                this.formValidate.turnsInspectionSonIds = [];
                this.sAddSeleted.forEach((id) => {
                    this.sAddData.forEach((e) => {
                        if (id === e.id) {
                            this.formValidate.turnsInspectionSonIds.push(e);
                        }
                    });
                });
            }, null, "warning");
        }
    },
    watch: {
        /* "dialogPropData": {
            handler: function(val, old) {
                console.log(val)
                // this.dialogData = val;
            },
            deep: true
        }, */
        "formValidate.startTime":function(val) {
            this.tiemDB();
        },
        "formValidate.endTime":function(val) {
            this.tiemDB();
        },
        "dialogData.id": {
            handler: function(val, old) {
                if (val) {
                    this.getData();
                } else {
                    this.formValidate = {
                        equipmentIds: []
                    };
                }
            },
            deep: true
        }
    },
    created() {
    },
    mounted() {
    }
};
</script>

<style>
    .sAddDialog {
        text-align: center;
    }
    .sAddListDialog .el-transfer-panel__filter {
        margin: 0 !important;
    }
</style>

<style scoped>
    .el-form-item .el-button {
        background-color: #071B35 !important;
    }
    .dialog {
        display: flex;
        flex-direction: column;
    }
    .dialog .zhiclass {
        color:rgb(67, 212, 224);
        padding:10px 15px 0 0;
    }
    .devLineTable {
        color: #06a2de;
        /* height: 30px; */
        line-height: 30px;
        border: 1px solid #53d3fe;
    }
    .sAddListDialog  /deep/ .el-dialog__header{
        text-align: center;
    }
    .sAddListDialog  /deep/.el-transfer-panel .el-transfer-panel__header {
        height: 48px;
    }
    .sAddListDialog /deep/ .el-dialog__body{
        padding: 0 25px 25px !important;
    }
    .sAddListDialog /deep/ .el-transfer-panel__filter .el-input__inner {
        margin-top: 4px;
        width: 95%;
        height: 28px;
    }
    .sAddListDialog /deep/ .el-transfer-panel__list.is-filterable {
        height: 220px;
    }
    .AIbtn {
        width: 140px !important;
    }
    .clearBtn {
        color: #06a2de !important;
    }
    .sAddListDialog /deep/ .el-transfer__buttons .el-button {
        margin-left: 0px;
    }
</style>
