/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:14:48
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2018-12-26 15:54:41
 */
<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false"  :title="EditDialogList.Title" v-dialogDrag :show-close="true" :before-close="handleClose" :visible.sync="EditDialogList.EditDialog" class="tems_dialog collaborativeunitmanagement" width="500px" :close-on-click-modal="false">
        <div id="scrollDPart">
            <el-form :disabled="Isdisable" :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="120px" class="demo-ruleForm xtdw">
                <!-- 设备类型 -->
                <div class="infoItemInfoAll">
                    <div class="infoItem">
                        <el-form-item label="单位名称：" prop="name">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.name" clearable size="small" placeholder="请输入单位名称" />
                        </el-form-item>
                        <el-form-item label="单位类型：" prop="typeId">
                            <el-select class="tems_Input" v-model="formValidate.typeId" clearable size="small" placeholder="请选择单位类型...">
                                <el-option class="" v-for="(item, index) in UnitselectData" :key="index" :value="item.id" :label="item.name">
                                    {{item.name}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系方式：" prop="serviceTelephone">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.serviceTelephone" clearable size="small" placeholder="请输入电话号码" />
                        </el-form-item>
                        <el-form-item label="通信方式：" prop="serviceEmail">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.serviceEmail" clearable size="small" placeholder="请输入邮箱地址" />
                        </el-form-item>
                        <el-form-item label="传真：" prop="fax">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.fax" clearable size="small" placeholder="请输入传真" />
                        </el-form-item>
                        <!-- <el-form-item label="警务终端：" prop="device">
                            <el-input class="tems_Input" v-model="formValidate.device" clearable size="small" placeholder="请输入" />
                        </el-form-item>
                        <el-form-item label="通勤时间：" prop="workTime">
                            <el-input class="tems_Input" v-model="formValidate.workTime" clearable size="small" placeholder="请输入通勤时间" />
                        </el-form-item> -->
                        <el-form-item label="单位地址：" prop="province">
                            <el-cascader
                                class="danwei"
                                expand-trigger="hover"
                                :options="options"
                                v-model="formValidate.province"
                                filterable clearable size="small">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="单位详细地址：" prop="detailedAddress">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.detailedAddress" clearable size="small" placeholder="请输入地址" />
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum footer">
                <!-- <div class="tems_Button tems_errorButton" @click="resetForm('formValidate')">取 消</div>
                <div class="tems_Button" @click="handleSubmit('formValidate')">保 存</div> -->
                <bt ref="bt" :buttonList="ButtonArrs" @operation="operation"></bt>
            </div>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "EditDialog",
    props: ["EditDialogList", "formValidate", "Isdisable"],
    model: {
        event: "submitButton"
    },
    data() {
        return {
            options: [], // 省市区列表
            ruleValidate: {
                name: this.$CommonRule.numberChineseEnglish,
                typeId: this.$CommonRule.SelectRule,
                serviceTelephone: this.$CommonRule.phoneRuleAndPhone,
                serviceEmail: this.$CommonRule.emailRule,
                fax: this.$CommonRule.fixedLinePhone,
                // device: this.$CommonRule.NotEmpty,
                // workTime: this.$CommonRule.NotEmpty,
                province: this.$CommonRule.NotEmpty,
                detailedAddress: this.$CommonRule.numberChineseEnglish
            },
            // 按钮组件传入参数
            topButton: [
                { title: "取消", type: "primary", size: "small", class: "inportBtn", functionKeyName: "resetForm:formValidate" },
                { title: "保存", type: "primary", size: "small", class: "exportBtn", functionKeyName: "handleSubmit:formValidate" }
            ],
            disableTopButton: [{ title: "关闭", type: "primary", size: "small", class: "inportBtn", functionKeyName: "closedForm:formValidate" }],
            ButtonArrs: [],
            // 单位类型(静态数据)
            UnitselectData: [
                // {id: "1", name: "医疗"},
                // {id: "2", name: "教育"},
                // {id: "3", name: "消防"},
                // {id: "4", name: "环保"},
                // {id: "5", name: "运营"},
                // {id: "6", name: "交管"},
                // {id: "7", name: "公路"},
                // {id: "8", name: "企业"},
                // {id: "9", name: "学校"},
                // {id: "10", name: "其他"}
            ]
        };
    },
    watch: {
        "Isdisable": {
            immediate: true,
            handler: function(val, old) {
                if (val) {
                    this.ButtonArrs = [...this.disableTopButton];
                } else {
                    this.ButtonArrs = [...this.topButton];
                }
            }
        }
    },
    methods: {
        // 重置表单
        resetForm(formName) {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.closeDialog(formName);
            }, null, "warning");
        },
        // 省市区列表
        getProveList(list) {
            function provinceGet(data) {
                let tableDataU = [];
                for (let key in Object.keys(data)) {
                    let value = Object.keys(data)[key];
                    let label = data[value].name ? data[value].name : data[value];
                    tableDataU.push({ "value": label, "label": label });
                    let children = data[value].child;
                    if (children) {
                        tableDataU[key].children = provinceGet(children);
                    }
                }
                return tableDataU;
            }
            this.options = provinceGet(this.GLOBAL.province);
        },
        // 查看关闭
        closedForm(formName) {
            this.closeDialog(formName);
        },
        // 关闭弹窗
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.EditDialogList.EditDialog = false;// 创建编辑弹窗隐藏
            this.$emit("closeDialogButton");
        },
        // 关闭弹窗回调
        handleClose(done) {
            if (!this.Isdisable) {
                this.$confirm("确定要取消吗？", "提示", { type: "warning" }).then(() => {
                    done();
                    this.handleClosedDo();
                }).catch(() => {});
            } else {
                done();
                this.handleClosedDo();
            }
        },
        // 关闭回调后清理
        handleClosedDo() {
            this.$refs["formValidate"].resetFields();
        },
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate((result) => {
                if (!result) {
                    this.$message.error("内容验证失败");
                    return false;
                } else {
                    if (this.EditDialogList.titleType === 0) {
                        this.handleAddUnit(this.formValidate);
                    } else {
                        this.handleEditUnit(this.formValidate);
                    }
                }
            });
        },
        // 保存创建
        handleAddUnit() {
            let province = `${this.formValidate.province[0]}-${this.formValidate.province[1]}-${this.formValidate.province[2]}`;
            let data = {
                name: this.formValidate.name,
                parentId: this.EditDialogList.typeof ? "0" : this.EditDialogList.parentId,
                level: this.EditDialogList.typeof ? "0" : (Number(this.EditDialogList.level) + 1).toString(),
                typeId: this.formValidate.typeId,
                serviceTelephone: this.formValidate.serviceTelephone,
                serviceEmail: this.formValidate.serviceEmail,
                fax: this.formValidate.fax,
                device: "0",
                workTime: "0",
                address: `${province}:${this.formValidate.detailedAddress}`,
                commandTelephone: "无"
            };
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("/syndept/", data).then((res) => {
                    // if (res.data.code === 1) {
                    //     this.$showSimpleMessage("数据重复", "error");
                    // } else if (res.data.code === 2) {
                    //     this.$showSimpleMessage("当前单位已停用，禁止添加子单位", "error");
                    // } else if (res.data.code === 6) {
                    //     this.$showSimpleMessage("子数据有重复信息", "error");
                    // } else {
                    //     this.EditDialogList.EditDialog = false;// 创建编辑弹窗隐藏
                    //     this.$emit("submitButton");
                    //     this.$showSimpleMessage("创建成功", "success");
                    // }
                    if (res.data.code === 0) {
                        this.EditDialogList.EditDialog = false;// 创建编辑弹窗隐藏
                        this.$emit("submitButton");
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
        handleEditUnit() {
            let province = `${this.formValidate.province[0]}-${this.formValidate.province[1]}-${this.formValidate.province[2]}`;
            let data = {
                name: this.formValidate.name,
                parentId: this.EditDialogList.parentId,
                level: this.EditDialogList.level,
                typeId: this.formValidate.typeId,
                serviceTelephone: this.formValidate.serviceTelephone,
                serviceEmail: this.formValidate.serviceEmail,
                fax: this.formValidate.fax,
                device: "0",
                workTime: "0",
                address: `${province}:${this.formValidate.detailedAddress}`,
                commandTelephone: "无"
            };
            this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                axios.put(`/syndept/${this.EditDialogList.id}`, data).then((res) => {
                    // if (res.data.code === 1) {
                    //     this.$showSimpleMessage("数据重复", "error");
                    // } else if (res.data.code === 6) {
                    //     this.$showSimpleMessage("子数据有重复信息", "error");
                    // } else {
                    //     this.EditDialogList.EditDialog = false;
                    //     this.$emit("submitButton");
                    //     this.$showSimpleMessage("编辑成功", "success");
                    // }
                    if (res.data.code === 0) {
                        this.EditDialogList.EditDialog = false;
                        this.$emit("submitButton");
                        this.$showSimpleMessage("保存成功", "success");
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 按钮组件回调
        operation(data) {
            let args = this.ButtonArrs[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        }
    },
    created() {
        this.getProveList();
        // 获取单位类型
        axios.get("/syndept/type").then((res) => {
            this.UnitselectData = res.data.data;
        });
    },
    mounted() {
        //
    }
};
</script>
<style scoped>
.danwei /deep/ .el-cascader__label{
    padding: 0 25px 0 28px;
}

</style>
<style>
.collaborativeunitmanagement button{
    line-height: 1 !important;
}
</style>
