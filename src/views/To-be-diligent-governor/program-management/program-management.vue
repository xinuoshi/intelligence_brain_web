<template>
    <div style="display: flex;flex-direction: row;flex-wrap: nowrap;width: 100%;height: 100%;border: 1px solid rgba(23, 58, 96, 1);">
        <div class="graphBar">
            <div class="graphBarItem" v-for="(item, index) in barItems" :key="index">
                <div class="barItem" :id="item.id" draggable="true" @dragstart="drag($event, item)" @dblclick="dbClick(item)" :style="item.style">{{item.label}}</div>
            </div>
        </div>
        <div class="graphShow" ref="graphShow">
            <!-- 操作 -->
            <div style="width: 100%; height: 60px; display: flex; align-items: center; margin-left: 10px">
                <!-- <button @click="addC">新增圆</button>
                <button @click="addN">新增矩形</button> -->
                <!-- <button @click="addNew">新增自定义</button> -->
                <!-- <button @click="delNode">删除</button> -->
                <el-button @click="addLine" :class="modeIs === 'def' ? 'AIbtn' : 'lineBt'" size="mini" type="primary">
                    <img style="margin-top: -8px" width="35" height="35" src="../../../../src/assets/programA.png" />
                </el-button>
                <el-button @click="reGraph" class="AIbtn" size="mini" type="primary">
                    <img width="20" height="20" src="../../../../src/assets/programR.png" />
                </el-button>
                <!-- <button @click="modeDef">恢复模式</button> -->
                <!-- <button @click="savePg">测试存储数据</button> -->
                <!-- <button @click="readPg">测试读取数据</button> -->
            </div>
            <!-- 创建图容器 -->
            <div ref="graphWin" @dragover="allowDrop" @drop="drop($event)" style="width: 100%; height: calc(100% - 120px)">
                <div id="mountNode"></div>
            </div>
            <!-- 编辑 -->
            <div style="width: 100%; height: 60px; display: flex; justify-content: flex-end; align-items: center;  margin-right: 10px">
                <el-button @click="saveProgram" class="AIbtn" size="mini" type="primary">保存档案</el-button>
            </div>
            <div class="bg_text" :style="bg_text" v-show="bgTextShow">请拖入步骤</div>
        </div>
        <div class="graphEdit">
            <el-form ref="form" class="formEdit" :model="form" label-width="80px" v-if="checkNode && checkNode.type !== 'customOver' && checkNode.type !== 'customFollow'">
                <el-form-item label="步骤名称：">
                    <el-input v-model="form.name" maxlength="8" clearable></el-input>
                </el-form-item>
                <!-- 事件特征 -->
                <div v-if="checkNode.type === 'customFeature'">
                    <el-form-item label="事件类型：">
                        <el-select v-model="form.type" clearable filterable>
                            <el-option v-for="(item, index) in $store.state.venteType" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="事件级别：">
                        <el-select v-model="form.level" clearable filterable>
                            <el-option label="1级" value="1"></el-option>
                            <el-option label="2级" value="2"></el-option>
                            <el-option label="3级" value="3"></el-option>
                            <el-option label="4级" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!-- 推送信息 -->
                <div v-if="checkNode.type === 'customInfo'" style="display: flex; flex-wrap: wrap; justify-content: flex-start">
                    <div style="width: 100%; margin-bottom: 20px;">
                        <el-checkbox class="checkBt" v-model="form.radio1" label="基础信息"></el-checkbox>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">事件编号</div>
                            <div class="flexNum devLineTable">辖区点位</div>
                            <div class="flexNum devLineTable">辖区大队</div>
                        </div>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">行政区域</div>
                            <div class="flexNum devLineTable">天气特征</div>
                            <div class="flexNum devLineTable">发生时间</div>
                        </div>
                    </div>
                    <div style="width: 100%; margin-bottom: 20px;">
                        <el-checkbox class="checkBt" v-model="form.radio2" label="车辆信息"></el-checkbox>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">号码号牌</div>
                            <div class="flexNum devLineTable">号牌类型</div>
                            <div class="flexNum devLineTable">车辆类型</div>
                        </div>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">车辆型号</div>
                            <div class="flexNum devLineTable">车身颜色</div>
                            <div class="flexNum devLineTable">车辆标识</div>
                        </div>
                    </div>
                    <div style="width: 100%; margin-bottom: 20px;">
                        <el-checkbox class="checkBt" v-model="form.radio3" label="人员信息"></el-checkbox>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">驾驶员姓名</div>
                            <div class="flexNum devLineTable">驾驶员身份证号码</div>
                        </div>
                        <div class="flexRow">
                            <div class="flexNum devLineTable">驾驶员联系方式</div>
                            <div class="flexNum devLineTable"></div>
                        </div>
                    </div>
                </div>
                <!-- 接收方 -->
                <div v-if="checkNode.type === 'customReceive'">
                    <el-form-item label="接收单位：">
                        <el-select v-model="form.company" clearable filterable>
                            <el-option label="交管津南支队" value="1"></el-option>
                            <el-option label="公安津南分局" value="2"></el-option>
                            <el-option label="津南公安消防支队" value="3"></el-option>
                            <el-option label="咸水沽医院" value="4"></el-option>
                            <el-option label="海河医院" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接收方式：">
                        <el-input v-model="form.infoMeth" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="调度资源：">
                        <el-input class="textarea" type="textarea" :rows="5" :autosize="{ minRows: 5, maxRows: 25 }"  v-model="form.source" clearable></el-input>
                    </el-form-item>
                </div>
                <!-- <el-form-item label="事件级别：">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                  <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item> -->
                <div>
                  <el-button style="line-height: 18px !important" @click="delNode" class="dic_closed" size="mini" type="primary">删除</el-button>
                  <el-button style="line-height: 18px !important" @click="saveNode" class="exportBtn" size="mini" type="primary">保存</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "programManage",
    components: {
    },
    data() {
        return {
            // 左面板图块
            barItems: [
                { label: "事件特征", id: "customFeature", style: { backgroundColor: "#137db7" } },
                { label: "推送信息", id: "customInfo", style: { backgroundColor: "#13adb7" } },
                { label: "接收方", id: "customReceive", style: { backgroundColor: "#13b777" } },
                { label: "事件跟踪", id: "customFollow", style: { backgroundColor: "#b77f13" } },
                { label: "结束并评价", id: "customOver", style: { backgroundColor: "#b75113" } }
            ],
            // 模式状态
            modeIs: "def",
            // 正在拖动的图块
            dragItemInfo: {},
            graph: "", // 流程图实例
            id: 0, // 唯一id
            // 表单
            form: {},
            // 点位字典
            // intersection: [],
            // 单击节点的情况
            checkNode: "",
            // 存储节点详情数据
            nodeDetailData: [],
            // data: ""
            // 中间文字样式以及显示控制
            bg_text: {},
            bgTextShow: true
        };
    },
    computed: {
    },
    methods: {
        // ~拖动操作~
        // 拖动
        drag(e, item) {
            // console.log(e)
            this.dragItemInfo = { item: item, e: e };
        },
        // 允许拖进
        allowDrop(e) {
            e.preventDefault();
        },
        // 拖进
        drop(e) {
            // console.log(e)
            this.addNew(this.dragItemInfo, e);
        },
        // ~双击操作~
        dbClick(item) {
            this.addNew(item);
        },
        // 初始化开始渲染
        graphFlow() {
            let _this = this;
            // 注册自定义画块
            // 事件特征
            this.$G6.registNode("customFeature", {
                // 绘制
                cssSize: true,
                getHtml: (cfg) => {
                    let model = cfg.model;
                    // 除了返回 dom 元素还能返回html字符串
                    return `<div class="customFeature" ref="${model.id}">${model.label}</div>`;
                }
            }, "html");
            // 推送信息
            this.$G6.registNode("customInfo", {
                // 绘制
                /* draw: (cfg, group) => {
                    group.addShape("rect", {
                        attrs: {
                            x: 0,
                            y: 0,
                            width: 150,
                            height: 40,
                            stroke: "rgba(255, 255, 255, 0.3)",
                            radius: 5,
                            fill: "#13adb7"
                        }
                    });
                    group.addShape("text", {
                        attrs: {
                            x: 38,
                            y: 6,
                            fontSize: 18,
                            fill: "#ffffff",
                            text: "推送信息",
                            textBaseline: "top"
                        }
                    });
                } */
                cssSize: true,
                getHtml: (cfg) => {
                    let model = cfg.model;
                    // 除了返回 dom 元素还能返回html字符串
                    return `<div class="customInfo" ref="${model.id}">${model.label}</div>`;
                }
            }, "html");
            // 接收方
            this.$G6.registNode("customReceive", {
                // 绘制
                cssSize: true,
                getHtml: (cfg) => {
                    let model = cfg.model;
                    // 除了返回 dom 元素还能返回html字符串
                    return `<div class="customReceive" ref="${model.id}">${model.label}</div>`;
                }
            }, "html");
            // 事件跟踪
            this.$G6.registNode("customFollow", {
                // 绘制
                cssSize: true,
                getHtml: (cfg) => {
                    let model = cfg.model;
                    // 除了返回 dom 元素还能返回html字符串
                    return `<div class="customFollow" ref="${model.id}">${model.label}</div>`;
                }
            }, "html");
            // 结束并评价
            this.$G6.registNode("customOver", {
                // 绘制
                cssSize: true,
                getHtml: (cfg) => {
                    let model = cfg.model;
                    // 除了返回 dom 元素还能返回html字符串
                    return `<div class="customOver" ref="${model.id}">${model.label}</div>`;
                }
            }, "html");

            // 准备数据
            /* let data = {
                // nodes: [{
                //     shape: "customFeature",
                //     id: "node0",
                //     x: 300,
                //     y: 200,
                //     label: "hahah"
                // }],
                // edges: [{
                //     shape: "smooth",
                //     id: "edge1",
                //     target: "node2",
                //     source: "node1"
                // }]
            }; */
            // 初始化实例
            this.graph = new this.$G6.Net({
                id: "mountNode",
                // width: 500,
                height: this.$refs["graphWin"].offsetHeight,
                grid: null,
                modes: {
                    default: [ // handler
                        "dragNode",
                        "dragEdge",
                        "dragAddEdge",
                        "clickBlankClearActive",
                        "resizeEdge",
                        "clickActive",
                        "dragNodeEndSetActive",
                        "multiSelect",
                        "hoverNodeShowAnchor",
                        "hoverAnchorSetActived",
                        "dragEdgeEndHideAnchor",
                        "dragNodeEndHideAnchor"
                    ],
                    add: [
                        "dragAddEdge",
                        "dragEdge",
                        "hoverAnchorSetActived",
                        "hoverNodeShowAnchor"
                    ]
                }
                // mode: "edit"
                // clipboard: false
                // fitView: "tl"
            });
            // this.graph.on();
            // 禁用右键
            this.graph.get("graphContainer").oncontextmenu = function(e) { return false; };
            // 禁用双击
            // this.graph.get("graphContainer").ondblclick = function(e) { return false; };
            // 禁用键盘
            // this.graph.get("graphContainer").onkeydown = function(e) { return false; };
            // this.graph.handler("dragCanvas")
            // 点击绑定事件
            this.graph.on("click", async function(ev) {
                // console.log(ev)
                await _this.clearEdit(); // 先清空一次（假设点击空白处）
                // 点击到节点
                if (ev.itemType === "node") {
                    let id = ev.item.get("model").id;
                    let shape = ev.item.get("model").shape;
                    // console.log(id, shape)
                    // 获取表单详情
                    let nodeDetailData = _this.$tools.deepCopy(_this.nodeDetailData);
                    let nodeDetailDataItem = nodeDetailData.find(n => n.id === id);
                    _this.form = nodeDetailDataItem.form;
                    _this.checkNode = { id: id, type: shape }; // 负责右侧面板渲染
                }
            });
            // 鼠标左键抬起绑定事件
            this.graph.on("mouseup", function(ev) {
                _this.lineEvent(_this.modeIs);
            });
            // 初始渲染
            // this.graph.source(data.nodes, data.edges);
            this.graph.render();
            // 关闭 G6 的体验改进计划打点请求
            this.$G6.track(false);
        },
        // 增加圆
        addC() {
            this.graph.add(
                "node",
                {
                    shape: "circle",
                    id: "node" + this.id.toString(),
                    x: 50 + this.id * 10,
                    y: 50 + this.id * 10
                }
            );
            this.id += 1;
            this.graph.refresh();
        },
        // 增加矩形
        addN() {
            this.graph.add(
                "node",
                {
                    // shape: 'circle',
                    id: "node" + this.id.toString(),
                    x: 50 + this.id * 10,
                    y: 50 + this.id * 10
                }
            );
            this.id += 1;
            this.graph.refresh();
        },
        // 增加自定义
        addNew(item, showEvent) {
            let nodeId = `node${this.id}`;
            // let _this = this;
            if (showEvent) {
                this.graph.add(
                    "node",
                    {
                        shape: item.item.id,
                        x: (showEvent.offsetX - item.e.offsetX) + 75,
                        y: (showEvent.offsetY - item.e.offsetY) + 20,
                        id: "node" + this.id.toString(),
                        label: item.item.label
                    }
                );
                this.id += 1;
                this.graph.refresh();
                // 存储进节点详情
                let nodeName = "";
                /* this.barItems.forEach((i) => {
                    if (i.id === item.item.id) {
                        nodeName = i.label;
                    }
                }); */
                this.nodeDetailData.push({ id: nodeId, shape: item.item.id, form: { name: nodeName }, firstStart: true });
            } else {
                this.graph.add(
                    "node",
                    {
                        shape: item.id,
                        x: this.$refs["graphWin"].offsetWidth / 2 - 75,
                        y: 60,
                        id: "node" + this.id.toString(),
                        label: item.label
                    }
                );
                this.id += 1;
                this.graph.refresh();
                // 存储进节点详情
                let nodeName = "";
                /* this.barItems.forEach((i) => {
                    if (i.id === item.id) {
                        nodeName = i.label;
                    }
                }); */
                this.nodeDetailData.push({ id: nodeId, shape: item.id, form: { name: nodeName } });
            }
        },
        /* // 删除
        delNode() {
            if (this.id >= 3) {
                this.graph.remove(this.graph.find("node" + this.id.toString()));
                this.id -= 1;
                this.graph.refresh();
            }
        }, */
        // 添加连线
        addLine() {
            this.modeIs = this.modeIs === "def" ? "line" : "def";
        },
        // 添加连线事件
        lineEvent(modeIs) {
            if (modeIs === "line") {
                // 延时绑定，否则不能划线
                setTimeout(() => {
                    this.graph.beginAdd("edge", {
                        shape: "arrow",
                        color: "#ffffff"
                    });
                }, 10);
            }
        },
        // 重置画布
        reGraph() {
            this.graph.destroy(); // 销毁
            this.graphFlow();
            this.clearEdit();
            this.nodeDetailData = [];
            this.modeIs = "def";
        },
        // 删除节点
        delNode() {
            this.$layerNotice("提示", "您确定要删除吗？", () => {
                let nodeId = this.checkNode.id;
                this.graph.remove(this.graph.find(nodeId));
                // 去除节点详情数据中删除的节点详情
                let nodeKey = 0;
                this.nodeDetailData.find((n, key) => {
                    if (n.id === nodeId) {
                        nodeKey = key;
                    }
                });
                this.nodeDetailData.splice(nodeKey, 1);
                this.clearEdit();
            }, null, "warning");
        },
        // 保存节点
        saveNode() {
            this.$layerNotice("提示", "您确定要保存吗？", () => {
                let _this = this;
                /* this.graph.update(ev.item.get('model').id, {
                    label: "终于成功了"
                }); */
                // 保存表单
                let nodeKey = 0;
                this.nodeDetailData.find((n, key) => {
                    if (n.id === _this.checkNode.id) {
                        nodeKey = key;
                    }
                });
                // console.log(nodeKey)
                this.$set(this.nodeDetailData[nodeKey], "form", this.form);
                // 更新节点名
                this.graph.update(this.checkNode.id, {
                    label: this.form.name
                });
            }, null, "warning");
        },
        // 保存档案
        saveProgram() {
            this.$layerNotice("提示", "您确定要保存档案吗？", () => {
                this.$showSimpleMessage("保存成功", "success");
            }, null, "warning");
        },
        // 清空右侧面板
        clearEdit() {
            this.checkNode = "";
            this.form = {};
        }
        /* // 存储数据
        savePg() {
            this.data = this.graph.save();
            this.reGraph();
            console.log(this.data)
        },
        // 读取数据
        readPg() {
            this.graph.read(this.data);
            this.graph.render();
        } */
    },
    watch: {
        /* "form": {
            handler: function(val, old) {
                console.log(val)
            },
            deep: true
        }, */
        /* "nodeDetailData": {
            handler: function(val, old) {
                console.log(val)
            },
            deep: true
        }, */
        // 控制背景字显示
        "nodeDetailData": {
            handler: function(val, old) {
                // console.log(val)
                if (val.length === 0) {
                    this.bgTextShow = true;
                } else {
                    this.bgTextShow = false;
                }
            }
        },
        // 监听控制mode变换
        "modeIs": {
            handler: function(val, old) {
                // let _this = this;
                this.graph.beginAdd("edge", {
                    shape: "arrow",
                    color: "#ffffff"
                });
                if (val === "line") {
                    this.graph.changeMode("add");
                } else {
                    this.graph.changeMode("default");
                    this.graph.endAdd("edge", {
                        shape: "arrow",
                        color: "#ffffff"
                    });
                }
            }
        },
        "form.company": {
            handler: function(val, old) {
                if (this.checkNode.type === "customReceive") {
                    if (val) {
                        switch (val) {
                            case "1":
                                this.$set(this.form, "infoMeth", "022-88511360");
                                break;
                            case "2":
                                this.$set(this.form, "infoMeth", "022-28391360");
                                break;
                            case "3":
                                this.$set(this.form, "infoMeth", "022-28256930");
                                break;
                            case "4":
                                this.$set(this.form, "infoMeth", "022-88912404");
                                break;
                            case "5":
                                this.$set(this.form, "infoMeth", "022—28552374");
                                break;
                        }
                    } else {
                        this.$set(this.form, "infoMeth", "");
                    }
                }
            },
            deep: true
        }
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.graphFlow();
            this.bg_text = {
                top: `${-(this.$refs["graphShow"].offsetHeight / 2)}px`,
                left: `${(this.$refs["graphShow"].offsetWidth / 2) - 95}px`
            };
        });
        /* axios.get("intersection/").then((res) => {
            if (res.data.code === 0) {
                console.log(res.data.data);
                this.intersection = res.data.data;
            }
        }).catch((error) => {
            this.$showSimpleMessage(error, "error");
        }); */
    },
    beforeDestroy() {
    }
};
</script>

<style>
</style>

<style scoped>
    /* 渲染面板中的节点样式控制 */
    .graphShow /deep/ .customFeature {
        background-color: #137db7;
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    .graphShow /deep/ .customInfo {
        background-color: #13adb7;
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    .graphShow /deep/ .customReceive {
        background-color: #13b777;
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    .graphShow /deep/ .customFollow {
        background-color: #b77f13;
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    .graphShow /deep/ .customOver {
        background-color: #b75113;
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    /* 左侧面板 */
    .graphBar {
        width: 260px;
        height: 100%;
        background-color: #021632;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        /* justify-content: center; */
    }
    .graphBarItem {
        width: 100%;
        height: 80px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    /* 左侧块 */
    .barItem {
        width: 150px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 3px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 40px;
        cursor: pointer;
    }
    /* 中间面板 */
    .graphShow {
        width: calc(100% - 620px);
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    /* 右编辑面板 */
    .graphEdit {
        width: 360px;
        height: 100%;
        background-color: #021632;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .formEdit {
        width: 85%;
        height: 95%;
    }
    .formEdit .el-form-item {
        margin-right: 0 !important;
    }
    .checkBt {
        height: 35px;
        /* width: 100%; */
        margin-left: -220px;
    }
    .checkBt /deep/ .el-checkbox__inner {
        border-radius: 50%;
    }
    .checkBt /deep/ .el-checkbox__inner::after {
        height: 20px;
        left: -1px;
        top: 0px;
        width: 20px;
        /* border-left: 0;
        border-top: 0; */
        background: #00ffff;
        border: none;
        border-radius: 50%;
    }
    .devLineTable {
        color: #06a2de;
        line-height: 30px;
        border: 1px solid #215B86;
    }
    .textarea /deep/ .el-textarea__inner{
        background-color: #030729;
        border: 1px solid #53D4F9;
        padding: 5px 25px 5px 27px;
        color: #22c6f9;
    }
    /* 点下按钮 */
    .lineBt {
        background: url(../../../../src/assets/btnBG/sb_press.png)no-repeat !important;
        background-size: 100% 100% !important;
        width: 105px !important;
        height: 32px !important;
        -webkit-box-shadow: 4px 5px 9px #0a1a2d;
        box-shadow: 4px 5px 9px #0a1a2d;
        display: inline-block;
        cursor: pointer;
    }
    .bg_text {
        position: relative;
        font-size: 28px;
        color: #2a4b78;
    }
</style>
