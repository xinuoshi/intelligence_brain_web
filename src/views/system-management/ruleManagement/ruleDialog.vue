/*
import { error } from 'util';
 * @Author: chase
 * @Date: 2018-09-06 15:51:02
 * @Last Modified by: chase
 * @Last Modified time: 2018-12-20 14:36:40
 */
<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false"  :title="title" :lock-scroll="true" ref="form" v-dialogDrag :show-close="true" :visible.sync="EditDialogList.ifshow" class="tems_dialog cwl" width="600px" :close-on-click-modal="false" :before-close="closeDialog">
        <!-- <el-dialog :title="title" :lock-scroll="true" ref="form" v-dialogDrag :show-close="true" :visible.sync="showCheck" class="tems_dialog cwl" width="1150px" style="z-index:3000" :close-on-click-modal="false" :before-close="closeDialog">
        <div style="overflow: scroll;text-align:left;padding-left: 10px;">
            <el-form>
                <el-checkbox-group v-for="item in allData" :key="item.id" :class="classNameList[item.level]" v-model="chose">
                    <el-checkbox v-if="item.name" :label="item"><div @click.prevent="show(item)">{{item.name}}</div> </el-checkbox>
                    <el-checkbox-group :class="classNameList[item[0].level]" v-else  style="display: flex">
                        <el-checkbox v-for=" val in item" :key="val.id" :label="val"><div @click.prevent="show(val)">{{val.name}}</div> </el-checkbox>
                    </el-checkbox-group>
                </el-checkbox-group>
            </el-form>
        </div>
    </el-dialog> -->
        <div class="scrollPart" id="scrollDPart">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item class="item" label="角色名称" prop="name" >
                    <el-input size="medium" class="tems_Input inputWidth roleName" maxlength="20" minlength="6" clearable :disabled="EditDialogList.disable" v-model="EditDialogList.name"></el-input>
                </el-form-item>
                <el-form-item class="item" label="所属单位" prop="unit" maxheight="300">
                    <el-button @click="showCheckBox('unit')" class="qiliang" size="mini" style="float:left;margin-left:10px;">{{EditDialogList.disable? "查看单位":"编辑单位"}} </el-button>
                </el-form-item>
                <el-form-item class="item" label="分配权限" prop="power">
                    <el-button  @click="showCheckBox('power')" class="qiliang" size="mini" style="float:left;margin-left:10px;">{{EditDialogList.disable? "查看权限":"编辑权限"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
         <div slot="footer" class="dialog-footer flexRow buttonBottom">
            <div class="flexNum">
                 <btn ref="btn" v-if="EditDialogList.disable === false" :button-list="buttonList"  @operation="operation"></btn>
                 <btn ref="btn" v-else :button-list="buttonListT"  @operation="operation"></btn>
            </div>
        </div>
        <checkBox :allData="allData" :chose="chose" :department="department" :showCheck="showCheck" @changeCheck="changeCheck" :buttonList="EditDialogList.disable ? buttonListT:buttonList" @hasChose="hasChose" :dis="EditDialogList.disable" style="z-index:3000" :title="checkTitle"></checkBox>
    </el-dialog>
</template>
<style scoped>
.item {
  line-height: 40px;
  padding-top: 10px;
}
.roleName {
  width: 200px !important;
  float: left;
  margin-left: 10px;
}
.subordinateUnit {
  width: 200px !important;
  float: left;
}
.el-input__suffix {
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -o-transform: translateY(-50%);
}
.allocationPermissions {
  display: flex;
  margin-left: 10px;
}
.scrollPart {
  overflow: visible !important;
}
.cwl /deep/ .el-dialog {
  padding: 0 0vw !important;
  height: 325px;
  /* overflow: hidden; */
}
.cwl /deep/ .el-dialog .el-dialog__body {
  margin-left: 3vw;
}
.cwl /deep/ .el-dialog::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -3px;
    background: -webkit-gradient(linear,left top, left bottom,from(#0e66d8),color-stop(#00ebfb),to(#0e66d8));
    background: linear-gradient(#0e66d8,#00ebfb,#0e66d8);
    content: '';
    z-index: -1;
    border-radius: 10px;
}
.buttonBottom {
  position: absolute;
  bottom: 8px;
  right: 50%;
  transform: translateX(50%);
}
.treeTable {
  height: 100px;
}
.first {
  margin-left: 30px;
}
.second {
  margin-left: 60px;
}
.third {
  margin-left: 90px;
}
.four {
  margin-left: 120px;
}
.five {
  margin-left: 150px;
}
.six {
  margin-left: 180px;
}
</style>
<style>

.cwl .el-form-item__error {
    margin-left: 10px;
}
.cwl .exportBtn {
    line-height: 13px !important;
}
.cwl .inportBtn {
    line-height: 13px !important;
}
</style>

<script>
import checkBox from "./checkBox.vue";
export default {
    props: ["EditDialogList"],
    components: {
        checkBox
    },
    data() {
        return {
            title: "创建角色",
            input: "",
            form: {
                name: this.EditDialogList.name,
                unit: this.EditDialogList.unit,
                power: this.EditDialogList.power
            },
            buttonList: [
                {
                    title: "取消", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "qiliang inportBtn"
                },
                {
                    title: "保存", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "qiliang exportBtn"
                }
            ],
            // 查看时的按钮
            buttonListT: [
                {
                    title: "关闭", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "qiliang inportBtn"
                },
                {
                    title: "", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "kongSelf"
                }
            ],
            // 我的全部权限
            myPower: [],
            // 显示的权限
            powerDetail: [],
            // 显示的部门
            unitDetail: [],
            // 创建角色时的部门列表
            department: [], // 单位数据
            rules: {
                name: this.$CommonRule.numberChineseEnglish,
                unit: this.$CommonRule.NotEmpty3,
                power: this.$CommonRule.NotEmpty3
            },
            classNameList: ["first", "second", "third", "four", "five", "six"],
            // 选择权限和单位时，展示的数据
            allData: "",
            // 选择权限和单位时，选择的数据
            chose: [],
            showCheck: false,
            // 选择权限和单位时的title
            checkTitle: "编辑权限"
        };
    },
    async created() {
    // 处理部门数据
        let department = await this.$filter.Axios("GET", "/department/tree?status=1");
        this.department = department.data.data;
        this.depart(this.department);
        // this.unitDetail.push(this.department.children);
        this.unitDetail = this.doUnit(this.department, this.unitDetail);
        // 权限
        const myPower = this.$store.state.authData;
        let powerDetail = [];
        powerDetail.push(myPower);
        this.powerDetail = powerDetail;
        // this.myPower = myPower;
        let myNewPower = [];
        myNewPower = this.doPower(myPower, myNewPower);
        this.myPower = myNewPower;
    },
    methods: {
    // 处理所属单位的数据
        depart(data) {
            let department = data.children;
            department.map(val => {
                val.level = val.t.level;
                val.name = val.t.name;
                val.id = val.id;
                if (val.hasChildren === true) {
                    this.depart(val);
                } else {
                    val.children = null;
                }
            });
            this.department = department;
        },
        // 处理权限的数据格式，进行布局
        doPower(data, arr) {
            data.map(val => {
                if (val.nextlevel) {
                    let len = val.nextlevel.length;
                    for (let i = 0; i < len; i++) {
                        if (val.nextlevel[i].nextlevel) {
                            arr.push(val);
                            this.doPower(val.nextlevel, arr);
                            return;
                        }
                    }
                    arr.push(val);
                    arr.push(val.nextlevel);
                } else {
                    arr.push(val);
                }
            });
            return arr;
        },
        // 处理单位的数据格式，进行布局
        doUnit(data, arr) {
            data.map(val => {
                if (val.hasChildren) {
                    arr.push(val);
                     this.doUnit(val.children, arr);
                    // arr.push(val.children);
                } else {
                    arr.push(val);
                }
            });
            return arr;
        },
        // 创建角色
        onSubmit() {
            let moduleIds = [];
            let deptIds = [];
            // console.log(this.EditDialogList.power);
            this.EditDialogList.power.map(val => {
                moduleIds.push(val.id);
            });

            this.EditDialogList.unit.map(val => {
                deptIds.push(val.id);
            });
            let params = {
                name: this.EditDialogList.name,
                deptIds: deptIds.toString(),
                moduleIds: moduleIds.toString(),
                id: ""
            };
            let len = 0;
            for (let i = 0; i < params.name.length; i++) {
                let a = params.name.charAt(i);
                if (a.match(/[^\x00-\xff]/gi) != null) {
                    len = len + 2;
                } else {
                    len += 1;
                }
            }
            this.$refs["form"].validate(result => {
                if (!result) {
                    this.$showSimpleMessage("内容验证失败", "error");
                } else {
                    if (this.EditDialogList.title === 0) {
                        this.$layerNotice(
                            "提示",
                            "您确定要创建角色吗？",
                            () => {
                                axios
                                    .post("/role/", params)
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.$showSimpleMessage("保存成功", "success");
                                            this.$emit("requestList");
                                            this.changeStatus();
                                        } else {
                                            this.$showSimpleMessage(
                                                this.$store.state.codeStatus.find(
                                                    t => t.code === res.data.code
                                                ).name,
                                                "error"
                                            );
                                        }
                                    })
                                    .catch(err => {
                                        this.$showSimpleMessage(err, "error");
                                    });
                            },
                            null,
                            "warning"
                        );
                    } else {
                        params.id = this.EditDialogList.roleId;
                        this.$layerNotice(
                            "提示",
                            "您确定要更新角色吗？",
                            () => {
                                axios
                                    .put("/role/" + this.EditDialogList.roleId, params)
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.$showSimpleMessage("保存成功", "success");
                                            this.$emit("requestList");
                                            this.changeStatus();
                                        } else {
                                            this.$showSimpleMessage(
                                                this.$store.state.codeStatus.find(
                                                    t => t.code === res.data.code
                                                ).name,
                                                "error"
                                            );
                                        }
                                    })
                                    .catch(err => {
                                        this.$showSimpleMessage(err, "error");
                                    });
                            },
                            null,
                            "warning"
                        );
                    }
                }
            });
        },
        // 显示多选框，选择单位或者权限
        showCheckBox(data) {
            if (data === "unit") {
                if (this.EditDialogList.disable) {
                    this.checkTitle = "查看单位";
                } else {
                    this.checkTitle = "编辑单位";
                }
                this.allData = this.unitDetail;
                this.chose = this.EditDialogList.unit;
                this.showCheck = true;
            } else if (data === "power") {
                if (this.EditDialogList.disable) {
                    this.checkTitle = "查看权限";
                } else {
                    this.checkTitle = "编辑权限";
                }
                this.allData = this.myPower;
                this.chose = this.EditDialogList.power;
                this.showCheck = true;
            }
        },
        // 关闭多选框的弹窗
        changeCheck() {
            this.showCheck = false;
        },
        // 关闭多选框弹窗时，保存选择的内容
        hasChose(data) {
            if (this.checkTitle === "编辑单位") {
                this.EditDialogList.unit = data;
            } else if (this.checkTitle === "编辑权限") {
                this.EditDialogList.power = data;
            }
        },
        changeStatus() {
            this.$emit("opration");
            this.clearData();
        },
        operation(data) {
            if (data.index === 1) {
                this.onSubmit();
            }
            if (data.index === 0) {
                if (this.EditDialogList.disable === true) {
                    // 查看时，关闭弹窗不提示
                    // this.$layerNotice("提示", "您确定关闭吗？", () => {
                    //     this.changeStatus();
                    // }, null, "warning");
                    this.changeStatus();
                } else {
                    this.$layerNotice(
                        "提示",
                        "您确定要取消吗？",
                        () => {
                            this.changeStatus();
                        },
                        null,
                        "warning"
                    );
                }
            }
        },
        // 显示下一级
        show(data) {
            let powerDetail = this.powerDetail;
            let pl = powerDetail.length;
            if (data.nextlevel) {
                for (let i = 0; i < pl; i++) {
                    if (data.nextlevel[0].level === powerDetail[i][0].level) {
                        powerDetail[i] = data.nextlevel;
                        this.powerDetail = powerDetail.slice(0, i + 1);
                        return false;
                    }
                }
                powerDetail.push(data.nextlevel);
            } else {
                for (let i = 0; i < pl; i++) {
                    if (powerDetail[i] && powerDetail[i][0].level > data.level) {
                        powerDetail.splice(i, 1);
                        i--;
                    }
                }
            }
        },
        showDepart(data) {
            let unitDetail = this.unitDetail;
            let pl = unitDetail.length;
            if (data.children) {
                for (let i = 0; i < pl; i++) {
                    if (data.children[0].level === unitDetail[i][0].level) {
                        unitDetail[i] = data.children;
                        this.unitDetail = unitDetail.slice(0, i + 1);
                        return false;
                    }
                }
                unitDetail.push(data.children);
            } else {
                for (let i = 0; i < pl; i++) {
                    if (unitDetail[i]) {
                        if (unitDetail[i][0].level > data.level) {
                            unitDetail.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        },
        // 选中父级，子级全部选中
        childPower(data) {
            if (data.nextlevel) {
                data.nextlevel.map(val => {
                    if (
                        val.name === "单位删除" ||
            val.name === "单位编辑" ||
            val.name === "单位创建" ||
            val.name === "单位启用" ||
            val.name === "单位停用"
                    ) {
                    } else {
                        this.EditDialogList.power.push(val);
                    }
                    if (val.nextlevel) {
                        this.childPower(val);
                    }
                });
            }
            // this.show(data);
        },
        childUnit(data) {
            if (data.children) {
                data.children.map(val => {
                    this.EditDialogList.unit.push(val);
                    if (val.children) {
                        this.childUnit(val);
                    }
                });
            }
            // this.showDepart(data);
        },
        // 选中子级同时选中父级
        parentPower(data) {
            let power = this.EditDialogList.power;
            // 获取现在选中的权限的id
            let parentID = [];
            power.map(val => {
                parentID.push(val.id);
            });
            let powerDetail = this.powerDetail;
            if (!parentID.includes(data.parentId)) {
                powerDetail.map(val => {
                    val.map(e => {
                        if (e.id === data.parentId) {
                            power.push(e);
                            this.parentPower(e);
                        }
                    });
                });
            }
        },
        parentUnit(data) {
            let power = this.EditDialogList.unit;
            // 获取现在选中的权限的id
            let parentID = [];
            power.map(val => {
                parentID.push(val.id);
            });
            let unitDetail = this.unitDetail;
            if (!parentID.includes(data.parentId)) {
                unitDetail.map(val => {
                    val.map(e => {
                        if (e.id === data.parentId) {
                            power.push(e);
                            this.parentUnit(e);
                        }
                    });
                });
            }
        },
        // 清空填写的数据
        clearData() {
            this.EditDialogList.name = "";
            this.EditDialogList.unit = [];
            this.EditDialogList.power = [];
            this.$refs["form"].resetFields();
        },
        // 关闭编辑框
        closeDialog() {
            if (this.EditDialogList.disable === true) {
                // 查看时，关闭弹窗不提示
                this.changeStatus();
            } else {
                this.$layerNotice(
                    "提示",
                    "确定要取消吗？",
                    () => {
                        this.changeStatus();
                    },
                    null,
                    "warning"
                );
            }
        },
        // 展开/收缩树
        handlerExpand(m) {
            m.isExpand = !m.isExpand;
        }
    },
    watch: {
        "EditDialogList.unit": function(val) {
            this.form.unit = val;
        },
        "EditDialogList.name": function(val) {
            this.form.name = val;
        },
        "EditDialogList.power": function(val) {
            this.form.power = val;
        }
    }
};
</script>
