/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
* @Last Modified by:lijin
* @Last Modified time: 2018-10-08 13:38:19
*/
<template>
    <div class="box">
        <div class="border">
            <table>
                <tr>
                    <th class="leftmenu"><h2>情报名</h2></th>
                    <th class="rightmenu"><h2>检测间隔</h2></th>
                </tr>
                <tr v-for="(tab, index) in dataList" >
                    <td class="leftmenu"><span class="span_seach">{{tab.name}}:</span></td>
                    <el-checkbox v-model="checked[index]">实时</el-checkbox>
                    <td class="rightmenu" v-if="checked[index]"><el-input size="small" class="tems_Input inputWidth" placeholder="请输入..." clearable v-model="tab.intervals"/></td>
                    <td class="rightmenu" v-else><el-select size="small" class="tems_Input inputWidth" v-model="tab.intervals" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select></td>
                </tr>
               <!-- <tr>
                    <td class="leftmenu"><span class="span_seach">路口交通溢出拥堵:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">路段交通严重拥堵:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">信号灯不正常显示:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">交通事故:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">车辆逆行:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">不文明停车:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">烟雾、火灾:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">道路积水:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">机动车闯红灯:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">行人闯红灯:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
            </table>
        </div>
        <div class="border1">
            <table>
                <tr>
                    <th class="leftmenu"><h1>情报名</h1></th>
                    <th class="rightmenu"><h1>检测间隔</h1></th>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">行人翻越护栏:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" v-model="value" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">非机动车闯灯:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">路口车辆交通秩序混乱:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">牌照无法识别:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">状态异常车辆识别:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">车辆偏离路线:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">交通流量异常:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">车型构成异常:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">违反限行:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">报废车辆上路行驶:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">逾期未检车辆上路行驶:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>
                <tr>
                    <td class="leftmenu"><span class="span_seach">外地车数量异常:</span></td>
                    <td class="rightmenu"><el-select size="small" class="tems_Input inputWidth" filterable placeholder="请选择..." clearable>
                        <el-option v-for="item in equipment" :key="item.id" :label="item.label" :value="value">
                        </el-option>
                    </el-select></td>
                </tr>-->
            </table>
        </div>
        <div class="titlePart">
            <span class="tems_Button" @click="postData()">确认修改</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked: [],
            intelligenceDetectionIntervals: "",
            dataList: "",
            value: "",
            equipment: [
                /* {label: "实时" ,value: 0 }, */
                { label: "3分钟", value: 3 },
                { label: "10分钟", value: 10 },
                { label: "30分钟", value: 30 },
                { label: "60分钟", value: 60 }
            ]
        };
    },
    created() {
        axios.get("intelligence/").then((res) => {
            this.dataList = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
                let equipment = res.data.data[i].intervals;
                if (equipment !== 3 && equipment !== 10 && equipment !== 30 && equipment !== 60) {
                    this.checked[i] = true;
                } else {
                    this.checked[i] = false;
                }
            }
        }).catch((err) => {
            this.$message.error(err);
        });
    },
    methods: {
        postData() {
            let dataLL = this.$tools.deepCopy(this.dataList);
            this.intelligences = JSON.stringify(dataLL);
            let data = {
                intelligences: this.intelligences
            };
            axios.put("intelligence/", data).then(() => {
                this.$showSimpleMessage("修改成功", "success");
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        }
    }
};
</script>
<style scoped>
    .tems_Input {
        width: 100px !important;
    }
    .border {
        width: 400px;
        height: 500px;
        overflow-y: auto;
    }
    .border1 {
        margin-left: 50px;
        width: 300px;
    }
    .box {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 20%;
        margin-top: 1%;
    }
    .leftmenu {
        width: 180px;
        text-align: right;
    }
    .rightmenu {
        width: 150px;
        text-align: right;
    }
    tr {
        line-height: 40px;
    }
    .tems_Button {
        margin-left: 200px;
        margin-top: 20px;
    }
</style>
