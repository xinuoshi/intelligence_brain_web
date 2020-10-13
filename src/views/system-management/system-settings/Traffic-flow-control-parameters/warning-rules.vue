/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
* @Last Modified by:lijin
* @Last Modified time: 2018-10-08 13:38:19
*/
<template>
    <div class="box" style="background-color: #0a1a2d">
        <h3 style="text-align: left;margin-left: 40px;padding-top: 10px;padding-bottom: 10px">情报观测参数</h3>
        <!--<hr/>-->
            <div class="big_kuang">
                <div class="big_kuanglog">
                    <div class="tabletop">
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">情报名称</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">检测时间间隔</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple-light">告警显示</div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">显示时长</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="big_kuangbottom">
                    <el-scrollbar>
                        <el-row v-for="(tab, index) in dataList" :key="index">
                            <el-col :span="6">
                                <div class="grid-content bg-purple"><span>{{tab.name}}</span></div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple-light">
                                    <!-- <el-checkbox v-model="checked[index]">实时</el-checkbox> -->
                                    <div class="rightmenu">
                                        <div @click="pan(index)" class="buttonmain">
                                            <!--:class="panduan ? 'button7' : 'button8'"-->
                                            <div>
                                               <!-- <span style="width:49px;height:20px;background:yellow;float: left"></span>
                                                <span style="width:10px;height:20px;background:red;float: left"></span>
                                                <span style="width:49px;height:20px;background:yellow;float: left"></span>-->
                                                <span v-model="tab.sign" :class="dataList[index].sign ? 'button3' : 'button4'" style="text-align: center;line-height: 20px">实时</span>
                                                <span v-model="tab.sign" :class="dataList[index].sign ? 'button1' : 'button2'" style="text-align: center;line-height: 20px"></span>
                                                <span v-model="tab.sign" :class="dataList[index].sign ? 'button5' : 'button6'" style="text-align: center;line-height: 20px"></span>
                                            </div>
                                        </div>
                                        <!--<el-checkbox v-model="tab.sign">{{tab.sign}}实时</el-checkbox>-->
                                        <el-input size="small" class="tems_Input inputWidth" placeholder="请输入..." clearable :disabled="tab.sign" @keyup.native="number('intervals',$event,tab)" v-model="tab.intervals" />分钟</div>
                                    <!--<div class="rightmenu" v-else><el-checkbox v-model="checked[index]">实时</el-checkbox><el-input size="small" class="tems_Input inputWidth" placeholder="请输入..." clearable v-model="tab.intervals"/></div>-->
                                   <!-- <div class="rightmenu" v-else><el-checkbox v-model="checked[index]">实时</el-checkbox><el-select size="small" class="tems_Input inputWidth" v-model="tab.intervals" filterable placeholder="请选择..." clearable>
                                        <el-option v-for="item in equipment" :key="item.value" :label="item.label" :value="item.value" :checked="checked">
                                        </el-option>
                                    </el-select></div>-->
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div v-if="tab.status === 1" class="grid-content bg-purple-light">
                                    <el-button-group>
                                    <el-button class="buttonstyal zicolor" size="mini" type="primary" @click="show(tab.id,tab.status)">显示</el-button>
                                    <el-button class="buttonstyal noshow" size="mini" type="danger" @click="show(tab.id,tab.status)">不显示</el-button>
                                      <!--  <label class="switch-btn no-radius">
                                            <input class="checked-switch" type="checkbox" />
                                            <span class="text-switch" data-yes="yes" data-no="no"></span>
                                            <span class="toggle-btn"></span>
                                        </label>-->
                                    </el-button-group>
                                </div>
                                <div v-else class="grid-content bg-purple-light">
                                    <el-button-group>
                                    <el-button class="buttonstyal show" size="mini" type="primary" @click="show(tab.id,tab.status)">显示</el-button>
                                    <el-button class="buttonstyal zicolorno" size="mini" type="danger" @click="show(tab.id,tab.status)">不显示</el-button>
                                    </el-button-group>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple-light">
                                    <el-input size="small" type="number" class="tems_Input inputWidth" :disabled="tab.status === 0 ? true : true"  placeholder="请输入..." clearable @keyup.native="number('valueOne',$event,tab)" v-model="tab.valueOne"/>分钟
                                </div>
                            </el-col>
                        </el-row>
                    </el-scrollbar>
                    </div>
                </div>
            </div>
        <div class="titlePart"  style="margin: 20px 0;">
            <span class="tems_Button exportBtn" v-if="checkQCboo" @click="postData()">保存</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "warningrules",
    props: ["checkQCboo"],
    components: {},
    data() {
        return {
            intelligenceDetectionIntervals: "",
            dataList: "",
            value: "",
            checked: [],
            panduan: false,
            zhujian4: false,
            equipment: [
                { label: "实时", value: 0 },
                { label: "3分钟", value: 3 },
                { label: "10分钟", value: 10 },
                { label: "30分钟", value: 30 },
                { label: "60分钟", value: 60 }
            ]
        };
    },
    watch: {
        "dataList": {
            handler: function(val, old) {
                val.map(t => {
                    // t.intervals = t.sign ? 0 : t.intervals;
                    t.intervals = t.sign ? t.intervals : t.intervals;
                    /*t.valueOne = t.status === 0 ? 0 : t.valueOne;*/
                    // t.valueOne = t.status === 0 ? 0 : 5;
                    t.valueOne = t.status === 0 ? 5 : 5;
                });
            },
            deep: true
        }
    },
    created() {
        axios.get("intelligence/").then((res) => {
            res.data.data.map(t => {
                t.sign = t.sign === 1;
            });
            this.dataList = res.data.data;
            for(let i in this.dataList){
                if(this.dataList[i].name === "外地车异常占比波动报警阈值"){
                    this.$set(this.dataList[i], "name", "外地车数量异常")
                }
                if(this.dataList[i].name === "大型车流量占比波动阈值"){
                    this.$set(this.dataList[i], "name", "车型构成异常")
                }
            }
        }).catch((err) => {
            this.$message.error(err);
        });
    },
    methods: {
        pan(key) {
            this.zhujian4= true;
            this.$emit("ifxiugai",this.zhujian4)
            if (this.dataList[key].sign){
                this.dataList[key].sign = false;
            } else {
                this.dataList[key].sign = true;
            }
        },
        // 验证方法绝对值
        number(name,val,that) {
            if(val.target.value){
                this.zhujian4= true;
                this.$emit("ifxiugai",this.zhujian4)
            }
            let value = val.target.value;
            if(isNaN(value)) {
                value = 0;
            }
            if(value <= 0) {
                value = Math.abs(value);
            }
            if(value.length > 6){
                value = value.slice(0,6)
            }
            value = Math.round(value);
            this.$set(that,name,value);
        },
        postData() {
            this.$layerNotice("提示", "确定要保存吗？", () => {
                let dataLL = this.$tools.deepCopy(this.dataList);
                dataLL.map(t => {
                    t.isLineations = "";
                    t.sign = t.sign === true ? 1 : 0;
                    t.intervals =Math.round(Number(t.intervals));
                    t.valueOne = Number(t.valueOne);
                    t.sign = (t.intervals === 0 || t.intervals === "0") ? 1 : 0;
                    t.status = (t.valueOne === 0 || t.valueOne === "0") ? 0 : 1;
                });
                this.intelligences = JSON.stringify(dataLL);
                let data = {
                    intelligences: this.intelligences
                };
                axios.put("intelligence/", data).then((e) => {
                    this.zhujian4= false;
                    this.$emit("ifxiugai",this.zhujian4)
                    if (e.data.code === 0) {
                        this.$showSimpleMessage("保存成功", "success");
                        axios.get("intelligence/").then((res) => {
                            res.data.data.map(t => {
                                t.sign = t.sign === 1;
                            });
                            this.dataList = res.data.data;
                        }).catch((err) => {
                            this.$message.error(err);
                        });
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === e.data.code).name, "error");
                    }
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        show(id,status) {
            this.$layerNotice("提示", "您确定要"+(status === 1 ? "不显示" : "显示")+"吗？", () => {
            axios.put("intelligence/" + id).then(() => {
                this.$showSimpleMessage("保存成功", "success");
                axios.get("intelligence/").then((res) => {
                    res.data.data.map(t => {
                        t.sign = t.sign === 1;
                    });
                    this.dataList = res.data.data;
                }).catch((err) => {
                    this.$message.error(err);
                });
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
            }, null, "warning");
        }
    },
};
</script>
<style scoped>
    .buttonmain {
        width:60px;
        height:20px;
        border:1px solid #000000;
        border-image: initial;
        position: relative;
        overflow: hidden;
        float: left;
        margin-left: 20%;
    }
    .button1
    {
        width:10px;
        height:20px;
        background: #BBDEE3;
        position:absolute;
        animation:mymove 0.5s infinite;
        -webkit-animation:mymove 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button2{
        width:10px;
        height:20px;
        background: #BBDEE3;
        position:absolute;
        animation:mymove1 0.5s infinite;
        -webkit-animation:mymove1 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button3{
        width:49px;
        height:20px;
        background: #0A6A88;
        position:absolute;
        animation:mymove3 0.5s infinite;
        -webkit-animation:mymove3 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button4{
        width:49px;
        height:20px;
        background:#0A6A88;
        position:absolute;
        animation:mymove4 0.5s infinite;
        -webkit-animation:mymove4 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button5{
        width:49px;
        height:20px;
        background: #001530;
        position:absolute;
        animation:mymove5 0.5s infinite;
        -webkit-animation:mymove5 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button6{
        width:49px;
        height:20px;
        background: #001530;
        position:absolute;
        animation:mymove6 0.5s infinite;
        -webkit-animation:mymove6 0.5s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button7{
        position:absolute;
        animation:mymove7 2s infinite;
        -webkit-animation:mymove7 2s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .button8{
        position:absolute;
        animation:mymove8 2s infinite;
        -webkit-animation:mymove8 2s infinite; /* Safari and Chrome */
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    @keyframes mymove
    {
        from {left:0px;}
        to {left:50px;}
    }

    @-webkit-keyframes mymove /* Safari and Chrome */
    {
        from {left:0px;}
        to {left:50px;}
    }
    @keyframes mymove1
    {
        from {left:50px;}
        to {left:0px;}
    }

    @-webkit-keyframes mymove1 /* Safari and Chrome */
    {
        from {left:50px;}
        to {left:0px;}
    }
    @keyframes mymove3
    {
        from {left:-50px;}
        to {left:0px;}
    }

    @-webkit-keyframes mymove3 /* Safari and Chrome */
    {
        from {left:-50px;}
        to {left:0px;}
    }
    @keyframes mymove4
    {
        from {left:0px;}
        to {left:-50px;}
    }

    @-webkit-keyframes mymove4 /* Safari and Chrome */
    {
        from {left:0px;}
        to {left:-50px;}
    }
    @keyframes mymove5
    {
        from {left:10px;}
        to {left:60px;}
    }

    @-webkit-keyframes mymove5 /* Safari and Chrome */
    {
        from {left:10px;}
        to {left:60px;}
    }
    @keyframes mymove6
    {
        from {left:60px;}
        to {left:10px;}
    }

    @-webkit-keyframes mymove6 /* Safari and Chrome */
    {
        from {left:60px;}
        to {left:10px;}
    }
    @keyframes mymove7
    {
        from {left:-50px;}
        to {left:0px;}
    }

    @-webkit-keyframes mymove7 /* Safari and Chrome */
    {
        from {left:-50px;}
        to {left:0px;}
    }
    @keyframes mymove8
    {
        from {left:0px;}
        to {left:-50px;}
    }

    @-webkit-keyframes mymove8 /* Safari and Chrome */
    {
        from {left:0px;}
        to {left:-50px;}
    }
    .big_kuangbottom /deep/ .el-col .el-input input::-webkit-outer-spin-button,
    .big_kuangbottom /deep/ .el-col .el-input input::-webkit-inner-spin-button{
        -moz-appearance: none !important;
        -webkit-appearance: none !important;
    }
    .show {
        color: #1E540B;
        background-color: #001530;
        border-color: #001530;
    }
    .zicolor {
        color: #03fa1e;
        background-color: #0a6a88;
        border-color: #0a6a88;
    }
    .zicolorno {
        color: #de0d0d;
        background-color: #0a6a88;
        border-color: #0a6a88;
    }

    .noshow {
        color: #2F000C;
        background-color: #020F24;
        border-color: #020F24;
    }
    hr{
        margin: 0 40px 35px 40px;
        border: 1px solid;
        background-color:#33A5FF;
        color:#33A5FF;
    }
    .box {
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
    }
    tr {
        line-height: 40px;
    }
    .tems_Button {
        margin-left: 200px;
        margin-top: 20px;
    }
    .big_kuang {
        flex:1;
        display: flex;
        flex-direction: row;
        /* justify-content: space-around; */
    }
    .big_kuang .big_kuanglog {
        border: 1px solid #132B4E;
        width: 100%;
        height: 630px;
    }
    .tabletop {
        box-shadow: inset 0 0 107px #132B4E;
        padding-top: 5px;
        border-bottom: 2px solid #132B4E;
    }
    .bg-purple {
        color: #bbdeff;
    }
    .big_kuangbottom {
        overflow-y: auto;
        height: 580px;
    }
    .bg-purple-light {
        color: #bbdeff;
    }
    .grid-content {
        margin-top: 5px;
        text-align: center;
        min-height: 23px;
    }
    .inputWidth {
        width: 7vw!important;
        min-width: 130px!important;
        max-width: 170px!important;
        margin-left: 10px;
    }
    .dataTableCss>div{
        height: auto !important;
    }
    .buttonstyal {
        width: 70px;
    }
</style>
