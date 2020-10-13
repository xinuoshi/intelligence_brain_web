/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:13:43
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2018-12-26 15:50:36
 */
<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false"  :title="EditDialogList.Title" v-dialogDrag :show-close="true" :before-close="handleClose" :visible.sync="EditDialogList.EditDialog" class="tems_dialog unitManagement" width="480px" :close-on-click-modal="false">
        <div id="scrollDPart">
            <el-form :disabled="Isdisable" :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="120px" class="demo-ruleForm">
                <!-- 设备类型 -->
                <div class="infoItemInfoAll">
                    <div class="infoItem">
                        <el-form-item label="单位名称：" prop="name">
                            <el-input :disabled="Isdisable" :title="formValidate.name" class="tems_Input" v-model="formValidate.name" clearable size="small" placeholder="请输入单位名称" />
                        </el-form-item>
                        <el-form-item label="联系方式：" prop="contactPhone">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.contactPhone" clearable size="small" placeholder="请输入电话号码" />
                        </el-form-item>
                        <el-form-item label="通信方式：" prop="contactEmail">
                            <el-input :disabled="Isdisable" class="tems_Input" v-model="formValidate.contactEmail" clearable size="small" placeholder="请输入邮箱地址" />
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum">
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
            ruleValidate: {
                name: this.$CommonRule.numberChineseEnglish,
                contactPhone: this.$CommonRule.phoneRuleAndPhone,
                contactEmail: this.$CommonRule.emailRule
            },
            // 按钮组件传入参数
            topButton: [
                { title: "取消", type: "primary", size: "small", class: "inportBtn", functionKeyName: "resetForm:formValidate" },
                { title: "确定", type: "primary", size: "small", class: "exportBtn", functionKeyName: "handleSubmit:formValidate" }
            ],
            disableTopButton: [{ title: "关闭", type: "primary", size: "small", class: "inportBtn", functionKeyName: "closedForm:formValidate" }],
            ButtonArrs: []
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
            let data = {
                name: this.formValidate.name,
                parentId: this.EditDialogList.typeof ? "0" : this.EditDialogList.parentId,
                level: this.EditDialogList.typeof ? "0" : (Number(this.EditDialogList.level) + 1).toString(),
                contact: "无",
                contactPhone: this.formValidate.contactPhone,
                contactEmail: this.formValidate.contactEmail,
                province: "无",
                city: "无",
                district: "无",
                detailAddress: "无",
                remark: "无"
            };
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("/department/", data).then((res) => {
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
            let data = {
                name: this.formValidate.name,
                parentId: this.EditDialogList.parentId,
                level: this.EditDialogList.level,
                contact: "无",
                contactPhone: this.formValidate.contactPhone,
                contactEmail: this.formValidate.contactEmail,
                province: "无",
                city: "无",
                district: "无",
                detailAddress: "无",
                remark: "无"
            };
            this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                axios.put(`/department/${this.EditDialogList.id}`, data).then((res) => {
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
        // 打开编辑
        editDirect() {
            if (this.formValidate.id) {
                //
            }
        },
        // 按钮组件回调
        operation(data) {
            let args = this.ButtonArrs[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        }
    },
    created() {
        //
    },
    mounted() {
        //
    }
};
</script>

<style>
.unitManagement button{
    line-height: 1 !important;
}
</style>
