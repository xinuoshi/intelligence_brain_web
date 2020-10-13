/*
 * @Author: chase
 * @Date: 2018-09-08 11:03:38
 * @Last Modified by: Eco.dujun
 * @Last Modified time: 2019-01-22 16:40:08
 */

<template>
    <div class="video" v-if="WireList.ifshow">
        <!-- 创建和编辑查看弹窗 -->
        <el-dialog :title="WireList.title" v-dialogDrag :visible.sync="WireList.ifshow" class="tems_dialog WireFrame" width="1440px" :before-close="closeDialog" :close-on-press-escape="false" :close-on-click-modal="false" >
            <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" class="demo-ruleForm">
                <div class="radioBox scrollPart">
                    <el-radio class="radioList" v-if="WireList.tablist" v-for="(item, index) in WireList.tablist" :key="index" v-model="WireList.id" :label="item.id" :title="item.equipmentName">
                        <div class="radioName">{{item.equipmentName}}</div>
                        <div class="radioBtn" v-if="WireList.hl2 === true && WireList.hl === true" :class="{radioBtnAright:(item.leftUp !== null && item.leftUp !== '——' && item.leftUp !== '' && item.leftUp !== '暂无数据' && item.rightDown !== null && item.leftDown !== null && item.rightUp !== null && item.handrailRightDown !== null && item.handrailRightDown !== '——' && item.handrailRightDown !== '')}"></div>
                        <div class="radioBtn" v-if="WireList.hl2 === true && WireList.hl === false" :class="{radioBtnAright:(item.leftUp !== null && item.leftUp !== '——' && item.leftUp !== '' && item.leftUp !== '暂无数据' && item.rightDown !== null && item.leftDown !== null && item.rightUp !== null)}"></div>
                        <div class="radioBtn" v-if="WireList.hl2 === false && WireList.hl === true" :class="{radioBtnAright:(item.handrailRightDown !== null && item.handrailRightDown !== '——' && item.handrailRightDown !== '')}"></div>
                    </el-radio>
                </div>
                <div class="canvasBox" >
                    <img :src="imgUrl+Imgvideo" class="ImgvideoBOX" />
                    <canvas id="myCanvas" width="960px" height = "540px" @click="writeCanvas" @mousemove="drawCanvas">

                    </canvas>
                    <canvas id="myCanvasTwo" width="960px" height = "540px" @click="writeHulanCanvas" @mousemove="drawHulanCanvas">

                    </canvas>
                </div>
            </el-form>
            <div class="notesBottom" style="margin-top:10px;">
                注：画框请按顺时针方向，轨迹框的起点以及终点的连线即为车辆的进入方向
            </div>
            <div slot="footer" class="dialog-footer flexRow" style="margin-top:10px;">
                <bt class="bt flexNum" ref="bt" :buttonList="topButton" @operation="changeStatus"></bt>
            </div>
        </el-dialog>
    </div>
</template>
<style>
    .WireFrame .qiliang{
        line-height: 10px !important;
    }
    .WireFrame .el-dialog__body{
        padding: 0 15px !important;
    }
    .WireFrame .demo-ruleForm{
        padding: 0 !important;
    }
    /*  单选按钮 start*/
    .radioBox>.el-radio{
        height: 50px;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: auto;
    }
    .radioBox .el-radio__label {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        flex-direction: row;
        overflow-x: auto !important;
        overflow-y: hidden !important;
    }
    .radioBtn{
        width: 10px;
        height: 10px;
        border: 1px solid;
        border-radius: 50px;
        margin: 20px 15px;
    }
    .radioBtnAright{
        background: #2BDD4A;
    }
    .radioName{
        flex: 1;
        overflow-x: auto;
        overflow-y: hidden;
    }
    .radioBox .el-radio+.el-radio {
        border-top: 0.5px solid #48CBFF;
    }
    .radioBox .el-radio__input{
       margin-left: 15px;
       display: none;
    }
    .radioBox .el-radio.is-checked{
        background: #11425F;
    }
    .radioBox .el-radio.is-checked>.el-radio__label,
    .radioBox .el-radio__input.is-checked+.el-radio__label {
        color: #2AC0E0 !important;
    }
    .radioBox .el-radio__label, .radioBox .el-radio{
        color: #2AC0E0 !important;
    }
    .radioBox .el-radio+.el-radio{
        margin: 0;
    }
    .radioBox{
        flex: 1;
        text-align: left;
        border: 1px solid #48CBFF;
        overflow: auto;
        height: 540px;
        border-radius: 7px;
    }
    .demo-ruleForm{
        flex-direction: row;
    }
    /*  单选按钮 end*/
    .canvasBox{
        position: relative;
        width: 960px;
        height: 540px;
        border: 1px solid #48cbff;
        border-radius: 7px;
        margin-left: 10px;
    }
    #myCanvas{
        width: 100%;
        position:relative;
        top:0;
        left:0;
        /* background-image: url(../../assets/static/tima.png); */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #myCanvasTwo{
        width: 100%;
        position:absolute;
        top:0;
        left:0;
        /* background-image: url(../../assets/static/tima.png); */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .kongSelf{
        display: none;
    }
    .pointer{
        pointer-events: none;
    }
</style>
<style scoped>
    .scrollPart{
        max-height: 540px;
    }
    #AIvideo{
        position: absolute;
        top: 0;
        pointer-events: none;
    }
    .ImgvideoBOX{
        position: absolute;
        width:100%;
        height: 100%;
    }
</style>

<script>
export default {
    name: "Wire",
    props: ["WireList", "incidentNum"],
    model: {
        click: "WireButton"
    },
    data() {
        return {
            // 图片地址
            imgUrl: "http://192.168.31.88",
            // imgUrl: "http://49.7.59.232",
            ruleValidate: {},
            formValidate: {},
            topButton: [
                {
                    title: "轨迹框",
                    class: "qiliang"
                },
                {
                    title: "护栏线",
                    class: "qiliang"
                },
                {
                    title: "保存",
                    class: "qiliang exportBtn"
                },
                {
                    title: "取消",
                    class: "qiliang inportBtn"
                }
            ],
            // 轨迹框的点
            draws: [],
            // 护栏线的点
            hulanDraws: [],
            ids: [],
            // 提交时的第一个传参
            params: [],
            // 当前操作的id
            nowId: "",
            hulan: false,
            Imgvideo:""
        };
    },
    mounted() {},
    updated() {
        if (this.WireList.hl2 === false) {
            this.topButton[0].title = "";
            this.topButton[0].class = "kongSelf";
        } else {
            this.topButton[0].title = "轨迹框";
            this.topButton[0].class = "qiliang";
        }
        if (this.WireList.hl === false) {
            this.topButton[1].title = "";
            this.topButton[1].class = "kongSelf";
        } else {
            this.topButton[1].title = "护栏线";
            this.topButton[1].class = "qiliang";
        }
    },
    watch: {
        "WireList.id": {
            handler: function(val, oldVal) {
                this.nowId = val;
                if (val !== "") {
                    axios.get("/equipment/addon/screenshot", {params:{"id":val.toString()}}).then((res) => {
                        if (res.data.code === 2) {
                            this.Imgvideo = "";
                            this.$showSimpleMessage("找不到该视频", "error");
                        } else {
                            this.Imgvideo = (res.data.msg).substring(21,res.data.msg.length);
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    });
                }
                // 切换左侧列表时，如果刚刚配置了画框，则赋值给刚刚的设备
                if (oldVal && val !== "") {
                    let oldOne = this.params.find(t => t.id ===oldVal);
                    this.nowId = val;
                    let index = this.params.indexOf(oldOne);
                    if (this.draws[1]) {
                        let judgeDirection = `${this.draws[3].leftX}, ${this.draws[3].topY}, ${this.draws[0].leftX}, ${this.draws[0].topY}`;
                        oldOne = {
                            id: oldVal, // 配置线框的id
                            rightUp: `${this.draws[2].leftX}, ${this.draws[2].topY}`, // 右上角坐标
                            rightDown: `${this.draws[3].leftX}, ${this.draws[3].topY}`, // 右下上角坐标
                            leftDown: `${this.draws[0].leftX}, ${this.draws[0].topY}`, // 左下角坐标
                            leftUp: `${this.draws[1].leftX}, ${this.draws[1].topY}`, // 左上角坐标
                            fromDirection: judgeDirection, // 车辆驶入方向
                            handrailRightUp: `${this.hulanDraws[0] ? this.hulanDraws[0].leftX : ""}, ${this.hulanDraws[0]? this.hulanDraws[0].topY : ""}`, // 护栏线的起始点
                            handrailRightDown: `${this.hulanDraws[1] ? this.hulanDraws[1].leftX : ""}, ${this.hulanDraws[1]? this.hulanDraws[1].topY : ""}`, // 护栏线的终点
                            isDo: true
                        };
                        this.draws = [];
                        this.hulanDraws = [];
                    } else if (this.hulanDraws[1]) {
                        oldOne = {
                            id: oldVal, // 配置线框的id
                            rightUp: "", // 右上角坐标
                            rightDown: "", // 右下上角坐标
                            leftDown: "", // 左下角坐标
                            leftUp: "", // 左上角坐标
                            fromDirection: "", // 车辆驶入方向
                            handrailRightUp: `${this.hulanDraws[0].leftX}, ${this.hulanDraws[0].topY}`, // 护栏线的起始点
                            handrailRightDown: `${this.hulanDraws[1].leftX}, ${this.hulanDraws[1].topY}`, // 护栏线的终点
                            isDo: true
                        };
                        this.draws = [];
                        this.hulanDraws = [];
                    } else {
                        this.draws = [];
                        this.hulanDraws = [];
                    }
                    this.params[index] = oldOne;
                }
                // AI画框配置
                if (val) {
                    this.WireList.id = val;
                    let isPz = "";
                    if(this.params[0]) {
                        isPz = this.params.find(t => t.id === val);
                    }
                    if(isPz !== "" && isPz.isDo) {
                        let draws = [];
                        let hulanDraws = [];
                        draws.push(this.getNum(isPz.leftDown));
                        draws.push(this.getNum(isPz.leftUp));
                        draws.push(this.getNum(isPz.rightUp));
                        draws.push(this.getNum(isPz.rightDown));
                        hulanDraws.push(this.getNum(isPz.handrailRightUp));
                        hulanDraws.push(this.getNum(isPz.handrailRightDown));
                        if (draws.length > 0) {
                            this.write = false;
                            let c = document.getElementById("myCanvas");
                            c.height = c.height;
                            let ctx = c.getContext("2d");
                            let startX = draws[0].leftX;
                            let startY = draws[0].topY;
                            let len = draws.length;
                            ctx.beginPath();
                            ctx.strokeStyle = "#0000ff";
                            ctx.lineWidth = 2;
                            ctx.moveTo(startX, startY);
                            for (let i = 1; i < len; i++) {
                                ctx.lineTo(draws[i].leftX, draws[i].topY);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            let ctxx = c.getContext("2d");
                            ctxx.strokeStyle = "red";
                            ctxx.lineWidth = 2;
                            ctxx.beginPath();
                            ctxx.moveTo(startX, startY);
                            ctxx.lineTo(draws[3].leftX, draws[3].topY);
                            ctxx.stroke();
                        } else {
                            let c = document.getElementById("myCanvas");
                            c.height = c.height;
                        }

                        if (hulanDraws.length > 0) {
                            this.write = false;
                            let c = document.getElementById("myCanvasTwo");
                            c.height = c.height;
                            let ctx = c.getContext("2d");
                            let startX = hulanDraws[0].leftX;
                            let startY = hulanDraws[0].topY;
                            let ctxx = c.getContext("2d");
                            ctxx.strokeStyle = "red";
                            ctxx.lineWidth = 2;
                            ctxx.beginPath();
                            ctxx.moveTo(startX, startY);
                            ctxx.lineTo(hulanDraws[1].leftX, hulanDraws[1].topY);
                            ctxx.stroke();
                        } else {
                            let c = document.getElementById("myCanvasTwo");
                            c.height = c.height;
                        }
                    } else if(this.WireList.tablist.length <= 1) {
                        this.getData(val);
                    } else {
                        let c = document.getElementById("myCanvasTwo");
                        c.height = c.height;
                        let d = document.getElementById("myCanvas");
                        d.height = d.height;
                    }
                }
            }
        },
        "WireList.ifshow": {
            handler: function(val, oldVal) {
                let wirelist = this.WireList.tablist;
                let params = [];
                // 批量操作时，提前处理传递参数
                if (val === true) {
                    wirelist.map((val,index) => {
                        if(this.WireList.tablist.length > 1) {
                            val.rightUp = "";
                            val.rightDown = "";
                            val.leftUp = "";
                            val.leftDown = "";
                            val.fromDirection = "";
                            val.handrailRightUp = "";
                            val.handrailRightUp = "";
                        } else if(this.WireList.hl2 === false){
                            val.handrailRightUp = "";
                            val.handrailRightUp = "";
                        } else if(this.WireList.hl1 === false){
                            val.rightUp = "";
                            val.rightDown = "";
                            val.leftUp = "";
                            val.leftDown = "";
                            val.fromDirection = "";
                        };                    
                        let param = {
                            id: val.id,
                            rightUp: "", // 右上角坐标
                            rightDown: "", // 右下上角坐标
                            leftDown: "", // 左下角坐标
                            leftUp: "", // 左上角坐标
                            fromDirection: "", // 车辆驶入方向
                            handrailRightUp: "", // 护栏线的起始点
                            handrailRightDown: "", // 护栏线的终点
                            isDo: false
                        };
                        params.push(param);
                    });
                    if (params.length === 0) {
                        let param = {
                            id: this.WireList.id,
                            rightUp: "", // 右上角坐标
                            rightDown: "", // 右下上角坐标
                            leftDown: "", // 左下角坐标
                            leftUp: "", // 左上角坐标
                            fromDirection: "", // 车辆驶入方向
                            handrailRightUp: "", // 护栏线的起始点
                            handrailRightDown: "" // 护栏线的终点
                        };
                        params.push(param);
                    }
                    this.params = params;
                }
            }
        }
    },
    methods: {
        // 按钮事件
        changeStatus(item) {
            if (item.index === 0) {
                this.write = true;
                this.draws = [];
                let wireListTablist =  this.WireList.tablist.find(t => t.id === this.nowId);
                let index = this.WireList.tablist.indexOf(wireListTablist);
                this.WireList.tablist[index].leftDown = null;
                this.WireList.tablist[index].leftUp = null;
                this.WireList.tablist[index].rightUp = null;
                this.WireList.tablist[index].rightDown = null;
                let c = document.getElementById("myCanvas");
                let cClass = c.className;
                if(cClass.includes("pointer")) {
                    c.removeAttribute("class", "pointer");
                };
                c.height = c.height;
                let d = document.getElementById("myCanvasTwo");
                let dClass = d.className;
                if(dClass.includes("pointer")) {
                } else {
                    d.setAttribute("class", "pointer");
                };
                this.hulan = false;
            } else if (item.index === 1) {
                this.write = true;
                this.hulanDraws = [];
                let wireListTablist =  this.WireList.tablist.find(t => t.id === this.nowId);
                let index = this.WireList.tablist.indexOf(wireListTablist);
                this.WireList.tablist[index].handrailRightUp = null;
                this.WireList.tablist[index].handrailRightDown = null;
                let c = document.getElementById("myCanvas");
                let cClass = c.className;
                if(cClass.includes("pointer")) {
                } else {
                    c.setAttribute("class", "pointer");
                };
                let d = document.getElementById("myCanvasTwo");
                let dClass = d.className;
                if(dClass.includes("pointer")) {
                    d.removeAttribute("class", "pointer");
                };
                d.height = d.height;
                this.hulan = true;
            } else if (item.index === 2) {
                let data;
                let judgeDirection;
                let param = this.params;
                let _this = this;
                if (this.draws[0]) {
                    judgeDirection = `${this.draws[3].leftX*2}, ${this.draws[3].topY*2}, ${this.draws[0].leftX*2}, ${this.draws[0].topY*2}`;
                    data = {
                        id: this.WireList.id, // 配置线框的id
                        rightUp: `${this.draws[2].leftX * 2}, ${this.draws[2].topY * 2}`, // 右上角坐标
                        rightDown: `${this.draws[3].leftX * 2}, ${this.draws[3].topY * 2}`, // 右下上角坐标
                        leftDown: `${this.draws[0].leftX * 2}, ${this.draws[0].topY * 2}`, // 左下角坐标
                        leftUp: `${this.draws[1].leftX * 2}, ${this.draws[1].topY * 2}`, // 左上角坐标
                        fromDirection: judgeDirection, // 车辆驶入方向
                        handrailRightUp: "", // 护栏线的起始点
                        handrailRightDown: "" // 护栏线的终点
                    };
                    if(_this.hulanDraws[1]) {
                        data.handrailRightUp = `${this.hulanDraws[0].leftX * 2}, ${this.hulanDraws[0].topY * 2}`; // 护栏线的起始点
                        data.handrailRightDown = `${this.hulanDraws[1].leftX * 2}, ${this.hulanDraws[1].topY * 2}`; // 护栏线的终点
                    }
                    param.map((val, index) => {
                        if (val.id === this.WireList.id) {
                            param[index] = data;
                        }
                    });
                } else if (this.hulanDraws[1]) {
                    data = {
                        id: this.WireList.id, // 配置线框的id
                        rightUp: "", // 右上角坐标
                        rightDown: "", // 右下上角坐标
                        leftDown: "", // 左下角坐标
                        leftUp: "", // 左上角坐标
                        fromDirection: "", // 车辆驶入方向
                        handrailRightUp: `${this.hulanDraws[0].leftX * 2}, ${this.hulanDraws[0].topY * 2}`, // 护栏线的起始点
                        handrailRightDown: `${this.hulanDraws[1].leftX * 2}, ${this.hulanDraws[1].topY * 2}` // 护栏线的终点
                    };
                    param.map((val, index) => {
                        if (val.id === this.WireList.id) {
                            param[index] = data;
                        }
                    });
                };
                let incidentNum = [];
                this.WireList.numbers.map(val => {
                    incidentNum.push(val.number);
                });
                let message = "确定保存配置操作？"
                let len = param.length;
                for(let i=0; i<len; i++ ) {
                    if(this.WireList.hl2 && param[i].rightUp === "") {
                        message = "未绘制轨迹框，相关事件将自动失效，确定保存？";
                        break;
                    };
                    if(this.WireList.hl && param[i].handrailRightUp === "") {
                        message = "未绘制护栏线，相关事件将自动失效，确定保存？";
                        break;
                    }
                    if(this.WireList.hl && param[i].handrailRightUp === "" && this.WireList.hl2 && param[i].rightUp === "") {
                        message = "未绘制护栏线/轨迹框，相关事件将自动失效，确定保存？";
                        break;
                    }
                }
                this.$layerNotice("提示", message, () => {
                    axios.post("/equipment/addon/ai", { equipmentAddons: JSON.stringify(param), incidentNum: incidentNum.toString() }).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("线框配置成功", "success");                      
                            let c = document.getElementById("myCanvas");
                            let ids = res.data.ids;
                            c.height = c.height;
                            let d = document.getElementById("myCanvasTwo");
                            d.height = d.height;
                            this.WireList.id = "";
                            if (this.WireList.tablist.length <= 0) {
                                let wire = this.WireList;
                                let tablist = [];
                                tablist.push(wire);
                                if (this.draws[0] && this.draws[0] !== "") {
                                    this.$emit("ifStartAll", tablist);
                                }
                            } else {
                                if(ids !== "") {
                                    this.$emit("ifStartAll", ids);
                                }
                            }
                            this.$emit("WireButton");
                        } else if(res.data.code === -3) {
                            this.$showSimpleMessage("数据湖接口有问题", "error");
                        } else {
                            this.$showSimpleMessage("系统内部错误，请稍后再试", "error");
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
            } else {
                this.$layerNotice("提示", "您确定退出配置吗？", () => {
                    this.clearCanvas();
                    let c = document.getElementById("myCanvas");
                    c.height = c.height;
                    let d = document.getElementById("myCanvasTwo");
                    d.height = d.height;
                    this.hulan = false;
                    this.WireList.id = "";
                    this.$emit("WireButton");
                }, null, "warning");
            }
        },
        // 获取之前设置的线框信息
        getData(id) {
            axios.get(`/equipment/${id}`).then((res) => {
                if (!res.data.data) {
                    this.$showSimpleMessage("找不到该设备", "error");
                    return;
                }
                let array = res.data.data;
                let draws = [];
                let hulanDraws = [];
                if (array.leftDown && this.WireList.hl2 === true) {
                    draws.push(this.getNum(array.leftDown));
                    draws.push(this.getNum(array.leftUp));
                    draws.push(this.getNum(array.rightUp));
                    draws.push(this.getNum(array.rightDown));
                };
                if (array.handrailRightUp && this.WireList.hl === true) {
                    hulanDraws.push(this.getNum(array.handrailRightUp));
                    hulanDraws.push(this.getNum(array.handrailRightDown));
                };
                if(draws !== []) {
                    draws.map(val => {
                        val.leftX = val.leftX / 2;
                        val.topY = val.topY / 2;
                    })
                };
                if(hulanDraws !== []) {
                    hulanDraws.map(val => {
                        val.leftX = val.leftX / 2;
                        val.topY = val.topY / 2;
                    })
                };
                this.draws = draws;
                this.hulanDraws = hulanDraws;
                if (draws.length > 0) {
                    this.write = false;
                    let c = document.getElementById("myCanvas");
                    c.height = c.height;
                    let ctx = c.getContext("2d");
                    let startX = draws[0].leftX;
                    let startY = draws[0].topY;
                    let len = draws.length;
                    ctx.beginPath();
                    ctx.strokeStyle = "#0000ff";
                    ctx.lineWidth = 2;
                    ctx.moveTo(startX, startY);
                    for (let i = 1; i < len; i++) {
                        ctx.lineTo(draws[i].leftX, draws[i].topY);
                    }
                    ctx.closePath();
                    ctx.stroke();
                    let ctxx = c.getContext("2d");
                    ctxx.strokeStyle = "red";
                    ctxx.lineWidth = 2;
                    ctxx.beginPath();
                    ctxx.moveTo(startX, startY);
                    ctxx.lineTo(draws[3].leftX, draws[3].topY);
                    ctxx.stroke();
                } else {
                    let c = document.getElementById("myCanvas");
                    c.height = c.height;
                }

                if (hulanDraws.length > 0) {
                    this.write = false;
                    let c = document.getElementById("myCanvasTwo");
                    c.height = c.height;
                    let ctx = c.getContext("2d");
                    let startX = hulanDraws[0].leftX;
                    let startY = hulanDraws[0].topY;
                    let ctxx = c.getContext("2d");
                    ctxx.strokeStyle = "red";
                    ctxx.lineWidth = 2;
                    ctxx.beginPath();
                    ctxx.moveTo(startX, startY);
                    ctxx.lineTo(hulanDraws[1].leftX, hulanDraws[1].topY);
                    ctxx.stroke();
                } else {
                    let c = document.getElementById("myCanvasTwo");
                    c.height = c.height;
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 显示线框的时候，处理坐标点
        getNum(data) {
            let array = data.split(",");
            let draw = {
                leftX: +array[0],
                topY: +array[1]
            };
            return draw;
        },
        // 绘制轨迹线框
        writeCanvas(e) {
            let write = this.write;
            if (write == true) {
                let data = {
                    leftX: e.offsetX,
                    topY: e.offsetY
                };
                this.draws.push(data);
                let len = this.draws.length;
                if (len === 4) {
                    this.write = false;
                    let c = document.getElementById("myCanvas");
                    c.height = c.height;
                    let ctx = c.getContext("2d");
                    let startX = this.draws[0].leftX;
                    let startY = this.draws[0].topY;
                    let len = this.draws.length;
                    ctx.beginPath();
                    ctx.strokeStyle = "#0000ff";
                    ctx.lineWidth = 2;
                    ctx.moveTo(startX, startY);
                    for (let i = 1; i < len; i++) {
                        ctx.lineTo(this.draws[i].leftX, this.draws[i].topY);
                    }
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.closePath();
                    ctx.stroke();
                    let ctxx = c.getContext("2d");
                    ctxx.strokeStyle = "red";
                    ctxx.lineWidth = 2;
                    ctxx.beginPath();
                    ctxx.moveTo(startX, startY);
                    ctxx.lineTo(e.offsetX, e.offsetY);
                    ctxx.stroke();
                    let nowOne;
                    let nowId = this.nowId;
                    this.params.map(val => {
                        if (val.id === nowId) {
                            nowOne = val;
                        }
                    });
                    let index = this.params.indexOf(nowOne);
                    if (this.WireList.tablist[index]) {
                        this.WireList.tablist[index]["leftDown"] = `${this.draws[0].leftX},${this.draws[0].topY}`;
                        this.WireList.tablist[index]["leftUp"] = `${this.draws[1].leftX},${this.draws[1].topY}`;
                        this.WireList.tablist[index]["rightUp"] = `${this.draws[2].leftX},${this.draws[2].topY}`;
                        this.WireList.tablist[index]["rightDown"] = `${this.draws[3].leftX},${this.draws[3].topY}`;
                    }
                }
            }
        },
        // 绘制护栏线
        writeHulanCanvas(e) {
            let write = this.write;
            if (write == true) {
                let data = {
                    leftX: e.offsetX,
                    topY: e.offsetY
                };
                this.hulanDraws.push(data);
                let len = this.hulanDraws.length;
                if (len >= 2) {
                    this.write = false;
                    let c = document.getElementById("myCanvasTwo");
                    c.height = c.height;
                    let ctx = c.getContext("2d");
                    let startX = this.hulanDraws[0].leftX;
                    let startY = this.hulanDraws[0].topY;
                    let len = this.hulanDraws.length;
                    ctx.beginPath();
                    ctx.strokeStyle = "#0000ff";
                    ctx.lineWidth = 2;
                    ctx.moveTo(startX, startY);
                    for (let i = 1; i < len; i++) {
                        ctx.lineTo(this.hulanDraws[i].leftX, this.hulanDraws[i].topY);
                    }
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.closePath();
                    ctx.stroke();
                    let ctxx = c.getContext("2d");
                    ctxx.strokeStyle = "red";
                    ctxx.lineWidth = 2;
                    ctxx.beginPath();
                    ctxx.moveTo(startX, startY);
                    ctxx.lineTo(e.offsetX, e.offsetY);
                    ctxx.stroke();
                    let nowOne;
                    let nowId = this.nowId;
                    this.params.map(val => {
                        if (val.id === nowId) {
                            nowOne = val;
                        }
                    });

                    let index = this.params.indexOf(nowOne);
                    if (this.WireList.tablist[index]) {
                        this.WireList.tablist[index]["handrailRightUp"] = `${this.hulanDraws[0].leftX},${this.hulanDraws[0].topY}`;
                        this.WireList.tablist[index]["handrailRightDown"] = `${this.hulanDraws[1].leftX},${this.hulanDraws[1].topY}`;
                    }
                }
            }
        },
        // 绘制线框过程动画
        drawCanvas(e) {
            let write = this.write;
            let draws = this.draws;
            if (write === true && draws[0]) {
                let c = document.getElementById("myCanvas");
                c.height = c.height;
                let ctx = c.getContext("2d");
                let startX = this.draws[0].leftX;
                let startY = this.draws[0].topY;
                let len = this.draws.length;
                ctx.beginPath();
                ctx.strokeStyle = "#0000ff";
                ctx.lineWidth = 2;
                ctx.moveTo(startX, startY);
                for (let i = 1; i < len; i++) {
                    ctx.lineTo(this.draws[i].leftX, this.draws[i].topY);
                }
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        },
        // 绘制护栏线过程动画
        drawHulanCanvas(e) {
            let write = this.write;
            let draws = this.hulanDraws;
            let hulan = this.hulan;
            if (write === true && draws[0]) {
                let c = document.getElementById("myCanvasTwo");
                c.height = c.height;
                let ctx = c.getContext("2d");
                let startX = this.hulanDraws[0].leftX;
                let startY = this.hulanDraws[0].topY;
                let len = this.hulanDraws.length;
                ctx.beginPath();
                ctx.strokeStyle = "#0000ff";
                ctx.lineWidth = 2;
                ctx.moveTo(startX, startY);
                for (let i = 1; i < len; i++) {
                    ctx.lineTo(this.hulanDraws[i].leftX, this.hulanDraws[i].topY);
                }
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        },
        stopDraw(e) {
        },
        closeDialog() {
            this.$layerNotice("提示", "您确定放弃当前配置？", () => {
                this.clearCanvas();
                let c = document.getElementById("myCanvas");
                c.height = c.height;
                let d = document.getElementById("myCanvasTwo");
                d.height = d.height;
                this.WireList.id = "";
                this.$emit("WireButton");
            }, null, "warning");
        },
         // 清空绘画的记录
        clearCanvas() {
            this.draws = [];
            this.hulanDraws = [];
            this.params = "";
        }
    },
    beforeDestroy() {
    }
};
</script>
