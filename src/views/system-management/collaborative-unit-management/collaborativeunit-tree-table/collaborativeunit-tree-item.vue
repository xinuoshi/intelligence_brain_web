/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:15:18
 * @Last Modified by: Eco.dujun
 * @Last Modified time: 2018-10-19 10:26:39
 */
<template>
    <div :class="tdClass">
        <span class="before-line" v-if="root !== 0 && nodes !== 1" :style="{'left':model.bLeft + 'px'}"></span>
        <table>
            <tr>
                <td :colspan="colSpan">
                    <table>
                        <tr class="leve" :class="levelClass">
                            <td class="td1" style="width: 180px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                <div class="td-title" @dblclick="handlerExpand(model)">
                                    <span v-if="model.children.length > 0" class="tree-close" :class="{'tree-open':model.isExpand}" @click="handlerExpand(model)"></span>
                                    <a class="ellipsis">
                                        <i class="t-icon m-dep"></i>
                                        <span :title="model.t.name">{{model.t.name}}</span>
                                    </a>
                                </div>
                            </td>
                            <!-- <td class="td2">{{model.t.parentName || "无"}}</td> -->
                            <!-- <td class="td3">{{model.CreateTime|formatDate}}</td> -->
                            <td class="td2">
                                <span :title="model.t.serviceTelephone" class="ellipsis">{{model.t.serviceTelephone}}</span>
                            </td>
                            <td class="td3" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                <span :title="model.t.serviceEmail" class="ellipsis">{{model.t.serviceEmail || "无"}}</span>
                            </td>
                            <td class="td4"><span :title="model.t.fax" class="ellipsis">{{model.t.fax || "无"}}</span></td>
                            <td class="td5" style="width: 70px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><span :title="model.t.typeName" class="ellipsis">{{model.t.typeName || "无"}}</span></td>
                            <td class="td6" style="width: 180px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><span :title="model.t.address" class="ellipsis">{{model.t.address || "无"}}</span></td>
                            <td class="td7" style="width: 50px;text-align: center;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                {{model.t.status === 1 ? "启用" : "停用"}}
                            </td>
                            <td class="td8" style="width: 140px;text-align: center;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                <a class="delete" href="javascript:;" v-if="disableOperationFuncButton && model.t.status" @click="disableOperationFunc(model)">停用</a>
                                <a class="suBtn" href="javascript:;" v-if="disableOperationFuncButton && !model.t.status" @click="disableOperationFunc(model)">启用</a>
                                <i class="line" v-if="disableOperationFuncButton"></i>
                                <a class="reset" href="javascript:;" v-if="viewUnitFuncButton" @click="viewUnitFunc(model)">查看</a>
                                <i class="line" v-if="viewUnitFuncButton"></i>
                                <a class="reset" href="javascript:;" v-if="actionFuncButton" @click="actionFunc(model)">编辑</a>
                                <i class="line" v-if="actionFuncButton"></i>
                                <!-- <a class="reset" href="javascript:;" @click="addingFunc(model)">添加</a>
                                <i class="line"></i> -->
                                <a class="delete" href="javascript:;" v-if="deleteFuncButton" @click="deleteFunc(model)">删除</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div v-show="model.isExpand" class="other-node" :class="otherNodeClass">
            <tree-item
                v-for="(m, i) in model.children"
                :key="String('child_node'+i)"
                :num="i"
                :root="1"
                :CollaborativeUnitTabularButton="CollaborativeUnitTabularButton"
                @viewUnitFunc="viewUnitFunc"
                @actionFunc="actionFunc"
                @addingFunc="addingFunc"
                @deleteFunc="deleteFunc"
                @disableOperationFunc="disableOperationFunc"
                @handlerExpand="handlerExpand"
                :nodes.sync="model.children.length"
                :trees.sync="trees"
                :model.sync="m">
            </tree-item>
        </div>
    </div>
</template>

<script>
export default {
    name: "treeItem",
    props: ["model", "num", "nodes", "root", "trees", "CollaborativeUnitTabularButton"],
    data() {
        return {
            parentNodeModel: null
        };
    },
    computed: {
        colSpan() {
            return this.root === 0 ? "" : 6;
        },
        tdClass() {
            return this.root === 0 ? "td-border" : "not-border";
        },
        levelClass() {
            return this.model ? "leve-" + this.model.level : "";
        },
        childNodeClass() {
            return this.root === 0 ? "" : "child-node";
        },
        otherNodeClass() {
            return this.model ? "other-node-" + this.model.level : "";
        },
        // 按钮渲染验证
        // 查看按钮
        viewUnitFuncButton() {
            let item = this.CollaborativeUnitTabularButton.find(t => t.name === "查看");
            if (item) {
                return true;
            }
            return false;
        },
        // 启用停用按钮
        disableOperationFuncButton() {
            let item = this.CollaborativeUnitTabularButton.find(t => t.name === "启用" || t.name === "停用");
            if (item) {
                return true;
            }
            return false;
        },
        // 编辑按钮
        actionFuncButton() {
            let item = this.CollaborativeUnitTabularButton.find(t => t.name === "编辑");
            if (item) {
                return true;
            }
            return false;
        },
        // 删除按钮
        deleteFuncButton() {
            let item = this.CollaborativeUnitTabularButton.find(t => t.name === "删除");
            if (item) {
                return true;
            }
            return false;
        }
    },
    watch: {
        // "model": {
        //     handler() {
        //         console.log("对象变化", this.model.isExpand)
        //     },
        //     deep: true
        // }
    },
    methods: {
        getParentNode(m) {
            // 查找点击的子节点
            let recurFunc = (data, list) => {
                data.forEach((l) => {
                    if (l.id === m.id) this.parentNodeModel = list;
                    if (l.children) {
                        recurFunc(l.children, l);
                    }
                });
            };
            recurFunc(this.trees, this.trees);
        },
        // 展开
        handlerExpand(m) {
            this.$emit("handlerExpand", m);
        },
        // 删除
        deleteFunc(m) {
            this.$emit("deleteFunc", m);
            // this.getParentNode(m);
            // console.log(this.parentNodeModel);
            // if (this.parentNodeModel.hasOwnProperty("children")) {
            //     console.log("父级是跟节点", this.parentNodeModel);
            //     this.parentNodeModel.children.splice(this.parentNodeModel.children.indexOf(m), 1);
            // } else if (this.parentNodeModel instanceof Array) {
            //     console.log("跟节点", this.parentNodeModel);
            //     this.parentNodeModel.splice(this.parentNodeModel.indexOf(m), 1);
            // }
        },
        // 查看
        viewUnitFunc(m) {
            this.$emit("viewUnitFunc", m);
        },
        // 编辑
        actionFunc(m) {
            this.$emit("actionFunc", m);
        },
        // 添加
        addingFunc(m) {
            this.$emit("addingFunc", m);
        },
        // 停用，启用
        disableOperationFunc(m, type) {
            this.$emit("disableOperationFunc", m);
        }
    },
    filters: {
        formatDate: function(date) {
            // 后期自己格式化
            return date; // Utility.formatDate(date, "yyyy/MM/dd")
        }
    }
};
</script>


