/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:14:02
 * @Last Modified by: chase
 * @Last Modified time: 2018-12-05 15:25:56
 */
<template>
    <div :class="tdClass">
        <span class="before-line" v-if="root !== 0 && nodes !== 1" :style="{'left':model.bLeft + 'px'}"></span>
        <table>
            <tr>
                <td :colspan="colSpan">
                    <table>
                        <tr class="leve" :class="levelClass">
                            <td class="td1">
                                <div class="td-title" @dblclick="handlerExpand(model)">
                                    <span v-if="model.children.length > 0" class="tree-close" :class="{'tree-open':model.isExpand}" @click="handlerExpand(model)"></span>
                                    <a class="ellipsis">
                                        <i class="t-icon m-dep"></i>
                                        <span :title="model.t.name">{{model.t.name}}</span>
                                         <el-checkbox class="Ccheckbox" :label="model.t.id" true-label="" false-label=""> </el-checkbox>
                                    </a>
                                </div>
                            </td>
                            <!-- <td class="td2">
                                <span :title="model.t.parentName" class="ellipsis">{{model.t.parentName || "无"}}</span>
                            </td> -->
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
                :UnitTabularButton="UnitTabularButton"
                @handlerExpand="handlerExpand"
                :nodes.sync="model.children.length"
                :trees.sync="trees"
                :model.sync="m">
            </tree-item>
        </div>
    </div>
</template>
<style>
    .Ccheckbox{
        margin-left: 10px;
    }
    .Ccheckbox /deep/.el-checkbox__label {
        display: none !important;
    }
</style>

<script>
export default {
    name: "treeItem",
    props: ["model", "num", "nodes", "root", "trees", "UnitTabularButton"],
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
    },
    filters: {
        formatDate: function(date) {
            // 后期自己格式化
            return date; // Utility.formatDate(date, "yyyy/MM/dd")
        }
    }
};
</script>
