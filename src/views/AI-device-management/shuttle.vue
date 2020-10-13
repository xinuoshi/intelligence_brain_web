/*
 * @Author: chase
 * @Date: 2018-09-08 11:03:38
 * @Last Modified by: Eco.dujun
 * @Last Modified time: 2019-01-18 17:25:36
 * shullet
 */

<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :title="title" v-dialogDrag :visible.sync="shuttleList.ifshow" :close-on-press-escape="false" class="tems_dialog shuttle" :before-close="closeDialog" width="737px" :close-on-click-modal="false">
        <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="140px" class="demo-ruleForm">
            <el-transfer ref="transEq" :titles="['未选中', '已选中']" :props="{ key: 'number', label: 'name'  }" v-model="valueSeleted" :data="data"></el-transfer>
        </el-form>
        <div class="notesBottom">
            注：为保证功能配置的顺利，需确保勾选想要配置的选项
        </div>
        <div slot="footer" class="dialog-footer flexRow">

            <div class="flexNum footer">
                <div v-if="shuttleList.typeName === 0" class="tems_Button exportBtn" @click="changeStatus">完 成</div>
                <div v-if="shuttleList.typeName === 1" class="tems_Button exportBtn" @click="changeStatus">下 一 步</div>
                <div class="tems_Button dic_closed" @click="changeStatus2">取 消</div>
            </div>
        </div>
    </el-dialog>
</template>
<style scoped>
.shuttle /deep/ .el-transfer {
    height: 358px;
}
.shuttle /deep/ .el-transfer-panel__body {
    height: 312px;
}
.shuttle /deep/ .el-transfer-panel__list {
    height: 314px;
}
</style>

<script>
export default {
    name: "shuttle",
    props: ["shuttleList"],
    model: {
        click: "submintButton" },
    data() {
        return {
            // 行Id
            RowId: "",
            // 弹窗名称
            title: "事件配置",
            // 提交数据
            ruleValidate: {},
            formValidate: {},
            // 穿梭狂所有数据
            data: [],
            // 穿梭狂选中数据
            valueSeleted: [],
            rtspAddr:"",
            // 事件数据是否为画框判断集合
            linsvalueSeleted: []
        };
    },
    methods: {
        changeStatus2() {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.$emit("submintButton");
            }, null, "warning");
        },
        // 下一步按钮
        changeStatus() {
            if (this.valueSeleted.length > 0) {
                // 画框
                if (this.shuttleList.typeName === 1) {
                    let datalength = this.data.length;
                    let linsvalueSeleted = [];
                    this.linsvalueSeleted =[];
                    let hl2 = false;
                    let hl = false;
                    let valueSeletedLength = this.valueSeleted.length;
                    for (let j = 0; j < valueSeletedLength; j++) {
                        for (let i = 0; i < datalength; i++) {
                            if (this.data[i].number === this.valueSeleted[j]) {
                                this.linsvalueSeleted.push(this.data[i].id);
                                // 不画框
                                if (this.data[i].isLineation === 0) {
                                    linsvalueSeleted.push(this.valueSeleted[j]);
                                } else if (this.data[i].isLineation === 1) {
                                    hl2 = true;
                                } else if (this.data[i].isLineation === 2) {
                                    hl = true;
                                } else {
                                    linsvalueSeleted.push(this.valueSeleted[j]);
                                }
                            }
                        }
                    }
                    if (linsvalueSeleted.length !== valueSeletedLength) {
                        let params = {
                            rtspAddr:this.rtspAddr,
                            RowId: this.RowId, // 行ID
                            data: this.data, // 画框所有数据
                            incidentNum: this.linsvalueSeleted, // 画框选中事件Id,
                            hl: hl,
                            hl2: hl2
                        };
                        this.$emit("submintButton", params);
                    } else {
                        this.valueSeleted = linsvalueSeleted;
                        this.getUrl();
                    }
                } else {
                    this.getUrl();
                }
            } else {
                this.$showSimpleMessage("选择设备才能点击", "error");
            }
        },
        // 不画框走接口
        getUrl() {
            // 不画框走接口
            let data = {
                equipmentAddons: ("[" + this.shuttleList.id.toString() + "]").toString(), // id和其他空数据
                incidentNum: this.valueSeleted.toString() // 事件Number集合
            };
            this.$layerNotice("提示", "您确定要配置吗？", () => {
                axios.post("/equipment/addon/ai", data).then((res) => {
                    if (res.data.code === 0) {
                        this.$emit("submintButton");
                        this.$showSimpleMessage("事件配置成功", "success");
                        let ids = res.data.ids;
                        if(ids !== "") {
                            this.$emit("ifStartAll", ids);
                        }
                    } else if(res.data.code === -3) {
                            this.$showSimpleMessage("数据湖接口有问题", "error");
                        } 
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 获取数据
        getData() {
            let isLineation = this.shuttleList.typeName === 0 ? "0" : "0,1,2,3";
            axios.get("intelligence/", { params: { isLineations: isLineation } }).then((res) => {
                let data = res.data.data;
                if (data) {
                    // 清除左侧列表选中状态
                    if(this.$refs.transEq) {  
                        this.$refs.transEq.$children["0"]._data.checked = [];
                    }
                    this.data = data;
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 右边数据
        rightGetData(val) {
            axios.get("equipment/" + val).then((res) => {
                if (!res.data.data) {
                    this.$showSimpleMessage("找不到该设备", "error");
                    return;
                }
                this.rtspAddr = res.data.data.rtspAddr;
                let data = res.data.data.incidentNum;
                if (data) {
                    this.valueSeleted = [];
                    let incidentNum = data.split(",");
                    let valueSeleted = [];
                    for (let i = 0; i < incidentNum.length; i++) {
                        valueSeleted.push(incidentNum[i]);
                    }
                    this.valueSeleted = valueSeleted;
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        closeDialog() {
            this.$layerNotice("提示", "您确定放弃当前配置？", () => {
                this.shuttleList.ifshow = false;
            }, null, "warning");
        }
    },
    watch: {
        "valueSeleted":{
            handler: function(val, oldVal) {
                if (val.length > 0) {
                    let key = 0
                    val.forEach(value => {
                        if (this.data.find(t=>t.number === value)) {
                            if (this.data.find(t=>t.number === value).isLineation !== 0) {
                                key++;
                            }
                        }                        
                    });                    
                    if (key > 0) {
                        this.shuttleList.typeName = 1;// 下一步
                    } else {
                        this.shuttleList.typeName = 0;// 完成
                    }
                } else {                    
                    this.shuttleList.typeName = 3;// 不显示
                }
            }
        },
        "shuttleList.id": {
            handler: function(val, oldVal) {
                if (val) {
                    this.getData();
                    this.shuttleList.id = val;
                    this.valueSeleted = [];
                    let pand = val;
                    if (pand.length > 1) {
                        this.title = "批量事件配置";
                        this.RowId = JSON.parse(pand[0]).id;
                    } else {
                        this.title = "事件配置";
                        pand = JSON.parse(val[0]);
                        this.rightGetData(pand.id);
                        this.RowId = pand.id;
                    }
                }
            }
        },
        "shuttleList.refesh": {
            handler: function(val, oldVal) {
                if (val) {
                    this.valueSeleted = [];
                    this.rightGetData(this.shuttleList.id);
                }
            }
        }
    }
};
</script>
