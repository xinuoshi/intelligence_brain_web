<template>
    <div>
        <!-- <div class="title">
            <div class="word">角色管理</div>
        </div> -->
        <api class="ccc">
            <!-- <div slot="lowerMenuBar">123</div> -->
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage" :searchName="searchName"  @searchEvent="searchEvent"></SearchPage>
            <div slot="searchBoxBar" class="operation">
                <btn ref="bt" :buttonList="topButton" @operation="makeMore"></btn>
            </div>
            <!-- 表格 -->
            <tab slot="table" ref="tab" :table-list="tableList" @selectArySlected="selectArySlected">
                <div slot="btn">
                    <el-table-column label="操作" fit  min-width="300" width="400">
                        <template slot-scope="scope">
                            <btn ref="btn" v-if="scope.row.status === 1"  :button-list="buttonListT" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                            <btn ref="btn" v-else :button-list="buttonList" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                        </template>
                    </el-table-column>
                </div>
            </tab>
        </api>
        <el-pagination class="cli-pagination"  background  @size-change="handleSizeChange" @current-change="currentPage"  :current-page="pageNum" :pageNum-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allPageValue"></el-pagination>
        <editdialog ref="editDialog" @getTree="getTree" :EditDialogList="EditDialogList"   @opration="showDialog" @requestList="requestPageList"></editdialog>
    </div>
</template>
<style>
.el-table th > .cell {
  text-align: center;
}
.el-dialog::after {
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
.top {
  display: flex;
}
#red {
  margin-right: 25px;
  display: none;
}
.blue {
  color: red;
}
.kongSelf {
  display: none;
}
</style>
<style scoped>
    .ccc /deep/ .subordinateSubject {
        border-bottom: none !important;
    }
</style>

<script>
import editdialog from "./ruleDialog.vue";
import tab from "./ruleTable.vue";
// import btn from "./button.vue";

export default {
    components: {
        tab,
        editdialog
    },
    data() {
        return {
            // ifshow: false,
            // 弹窗组件传值
            EditDialogList: {
                title: "",
                ifshow: false, // 控制弹窗显示隐藏
                power: [], // 编辑时角色的权限
                unit: [], // 编辑时角色所属的部门
                name: "", // 角色名称
                roleId: "", // 角色ID
                disable: false // 表单禁用
            },
            tableList: {
                // selection: true,
                index: 1,

                title: [
                    //     {
                    //     "name": "id",
                    //     "title": "角色编号"
                    // },
                    {
                        name: "name",
                        title: "角色名称",
                        hover: true
                    },
                    {
                        name: "deptId",
                        title: "所属单位",
                        hover: true
                    },
                    // {
                    //     "name": "createdTime",
                    //     "title": "创建时间"
                    // },
                    // {
                    //     "name": "updatedTime",
                    //     "title": "更新时间"
                    // },
                    {
                        name: "statusData",
                        title: "角色状态",
                        width:100
                    }
                ],
                list: []
            },
            buttonList: [
                {
                    title: "启用", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "suBtn"
                },
                {
                    title: "查看", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    classId: "suBtn"
                },
                {
                    title: "编辑", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    a: 1
                },
                {
                    title: "删除", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "erBtn"
                }
            ],
            buttonListT: [
                {
                    title: "停用", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "erBtn"
                },
                {
                    title: "查看", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    classId: "suBtn"
                },
                {
                    title: "编辑", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    classId: "suBtn"
                },
                {
                    title: "删除", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "erBtn"
                }
            ],
            // 当前页
            pageNum: 1,
            // 当前页面显示数量
            pageSize: 10,
            // 所有数据的条数
            allPageValue: 0,
            // 多选时的选中的id
            selectId: [],
            // 搜索列表
            searchName: [
                // { searchPlaceholder: "角色名称", type: 0, Sendkey: "name" },
                {
                    searchPlaceholder: "角色名称",
                    id: 2,
                    type: 1,
                    url: "",
                    Sendkey: "deptIds",
                    data: ""
                },
                {
                    searchPlaceholder: "所属单位",
                    id: 2,
                    type: 1,
                    url: "",
                    Sendkey: "deptIds",
                    data: ""
                }
            ],
            // 搜索条件
            name: "", // 角色名称
            deptId: "", // 部门id
            topButton: [
                {
                    title: "创建",
                    type: "primary",
                    size: "mini",
                    plain: true,
                    loading: false,
                    class: "qiliang"
                },
                {
                    title: "批量启用",
                    type: "primary",
                    size: "mini",
                    plain: true,
                    loading: false,
                    class: "qiliang"
                },
                {
                    title: "批量停用",
                    type: "primary",
                    size: "mini",
                    plain: true,
                    loading: false,
                    class: "qiliang"
                }
                //, {
                //     title: "批量删除",
                //     type: "primary",
                //     size: "mini",
                //     plain: true,
                // }
            ],
            // 单位
            department: [],
            tree: ""
        };
    },
    methods: {
    // 点击表格里面的相应的按钮，返回的index
        operation(data) {
            let event = data.event;
            let itemScope = data.itemScope;
            let url = "";
            // 停用启用
            if (data.index === 0) {
                let msg;
                let showMsg;
                if (itemScope.row.status === 1) {
                    url = "role/status/disable";
                    msg = this.buttonListT[data.index].title;
                    showMsg = "角色停用将导致该角色的用户无法正常登录，是否停用？";
                } else {
                    url = "role/status/activation";
                    msg = this.buttonList[data.index].title;
                    showMsg = "启用此角色？";
                }
                let param = { ids: itemScope.row.id };
                this.$layerNotice(
                    "提示",
                    showMsg,
                    () => {
                        axios
                            .put(url, param)
                            .then(e => {
                                if (e.data.code === 0) {
                                    this.$showSimpleMessage(msg + "成功", "success");
                                    this.requestPageList();
                                } else {
                                    this.$showSimpleMessage(
                                        this.$store.state.codeStatus.find(
                                            t => t.code === e.data.code
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
            // 编辑和查看
            if (data.index === 1 || data.index === 2) {
                if (data.index === 1) {
                    this.EditDialogList.disable = true;
                    this.$refs.editDialog.title = "查看角色";
                } else {
                    this.EditDialogList.disable = false;
                    this.$refs.editDialog.title = "编辑角色";
                    if (itemScope.row.status === 1) {
                        this.$showSimpleMessage(
                            "该角色为启用状态，禁止编辑！",
                            "error"
                        );
                        return;
                    }
                }
                // console.log(this.$refs.editDialog.title)
                this.EditDialogList.title = 1;
                this.EditDialogList.roleId = itemScope.row.id;
                axios
                    .get("/role/roleId?roleId=" + itemScope.row.id)
                    .then(res => {
                        if (res.data.code === 0) {
                            let list = res.data.data;
                            // 角色名称
                            this.EditDialogList.name = list.name;
                            // 所属部门id
                            this.EditDialogList.unit = [];
                            this.unitDo(list.deptList);
                            // 获取角色具有的权限
                            axios.get("/module/roleId?roleId=" + itemScope.row.id).then(e => {
                                if (e.data.code === 0) {
                                    let moduleIds = e.data.data.children;
                                    this.EditDialogList.power = [];
                                    this.moduleDo(moduleIds);
                                } else {
                                    this.$showSimpleMessage(
                                        this.$store.state.codeStatus.find(
                                            t => t.code === e.data.code
                                        ).name,
                                        "error"
                                    );
                                }
                            });

                            this.EditDialogList.ifshow = true;
                        } else {
                            this.$showSimpleMessage(
                                this.$store.state.codeStatus.find(t => t.code === res.data.code)
                                    .name,
                                "error"
                            );
                        }
                    })
                    .catch(err => {
                        this.$showSimpleMessage(err, "error");
                    });
            }
            // 删除
            if (data.index === 3) {
                this.$layerNotice(
                    "提示",
                    "您确定要删除吗？",
                    () => {
                        if (itemScope.row.status === 1) {
                            // this.$layerNotice("提示", "启用状态不可删除", () => {})
                            this.$showSimpleMessage("启用状态不可删除", "error");
                            return;
                        }
                        axios
                            .delete("role/" + data.dataId)
                            .then(e => {
                                if (e.data.code === 0) {
                                    this.$showSimpleMessage("删除成功！", "success");
                                    this.requestPageList();
                                } else {
                                    this.$showSimpleMessage(
                                        this.$store.state.codeStatus.find(
                                            t => t.code === e.data.code
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
        },
        // 创建，批量操作的按钮
        makeMore(data) {
            // 创建
            if (data.index === 0) {
                this.$refs.editDialog.title = "创建角色";
                this.EditDialogList.title = 0;
                this.EditDialogList.ifshow = true;
                this.EditDialogList.disable = false;
            }
            // 批量启用,停用
            if (data.index === 1 || data.index === 2) {
                let param = { ids: this.selectId.toString() };
                let url;
                let msg;
                if (data.index === 1) {
                    url = "role/status/activation";
                    msg = "启用";
                } else {
                    url = "role/status/disable";
                    msg = "停用";
                }
                if (this.selectId.length <= 0) {
                    this.$showSimpleMessage("未发现选中设备", "error");
                    return;
                }
                this.$layerNotice(
                    "提示",
                    msg + "选中的角色？",
                    () => {
                        axios
                            .put(url, param)
                            .then(e => {
                                if (e.data.code === 0) {
                                    this.$showSimpleMessage(msg + "成功", "success");
                                    this.requestPageList();
                                } else {
                                    this.$showSimpleMessage(
                                        this.$store.state.codeStatus.find(
                                            t => t.code === e.data.code
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
            // 批量删除
            if (data.index === 3) {
                // this.$layerNotice("提示", "您确定要删除吗？", ()=>{
                //     axios.delete("role/" + data).then((e) => {
                //         this.$showSimpleMessage("删除成功", "success");
                //         this.requestPageList();
                //     }).catch((err) => {
                //         this.$showSimpleMessage(err, "error");
                //     });
                // }, null,  "warning")
            }
        },
        // 弹窗的操作，显示,关闭弹窗
        showDialog(data) {
            this.EditDialogList.ifshow = !this.EditDialogList.ifshow;
        },

        // 操作按钮dome
        // data是改变的数据
        // name 按钮title
        // idname  按钮样式，id
        // buttonChange(event, data) {
        //     if (data.name) {
        //         event.target.innerText = data.name;
        //     }
        //     if (data.idname) {
        //         let button;
        //         if (event.target.nodeName == "SPAN") {
        //             button = event.target.parentNode;
        //         } else {
        //             button = event.target;
        //         }

        //         button.setAttribute("id", data.idname);
        //     }
        // },
        // 初始化请求列表
        // requestList() {
        //     axios.get("role/").then((e) => {
        //         let array = e.data.data;
        //         array.map(val => {
        //             val.createdTime = this.$filter.formatDateTimeInput(val.createdTime);
        //             val.updatedTime = this.$filter.formatDateTimeInput(val.updatedTime);
        //             val.statusData = val.status == 1 ? "启用" : "停用";
        //         });
        //         this.tableList.list = array;
        //         this.allPageValue = array.length;
        //     });
        // },
        // 请求列表
        requestPageList() {
            let params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                name: this.name,
                deptIds: this.deptIds
            };
            axios.get("role/", { params }).then(e => {
                if (e.data.code === 0) {
                    let array = e.data.data.list;
                    if (array.length <= 0) {
                        this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                    }
                    this.allPageValue = e.data.data.total;
                    array.map(val => {
                        val.createdTime = this.$filter.formatDateTimeInput(val.createdTime);
                        val.updatedTime = this.$filter.formatDateTimeInput(val.updatedTime);
                        val.deptId = [];
                        val.deptList.map(item => {
                            val.deptId.push(item.name);
                        });
                        val.deptId = val.deptId.toString();
                        val.statusData = val.status === 1 ? "启用" : "停用";
                    });
                    this.tableList.list = array;
                } else {
                    this.$showSimpleMessage(
                        this.$store.state.codeStatus.find(t => t.code === e.data.code).name,
                        "error"
                    );
                }
            });
        },

        // 分页
        // 改变每页的条数
        handleSizeChange(data) {
            this.pageSize = data;
            this.requestPageList();
            this.tableList.index = (this.pageNum - 1) * this.pageSize + 1;
        },
        // 当前页数
        currentPage(data) {
            this.pageNum = data;
            this.requestPageList();
            this.tableList.index = (this.pageNum - 1) * this.pageSize + 1;
        },
        // 搜索
        searchEvent(data) {
            this.name = data.name;
            this.deptIds = data.deptIds;
            this.requestPageList();
        },
        // 多选
        selectArySlected(data) {
            this.selectId = [];
            data.map(val => {
                this.selectId.push(val.id);
            });
        },
        // 处理角色具有的权限
        moduleDo(data) {
            data.map(val => {
                const myPower = this.$store.state.authData;
                this.powerDo(myPower, val.id);
                if (val.hasChildren === true) {
                    this.moduleDo(val.children);
                }
            });
        },
        // 遍历具有的全部权限
        powerDo(data, id) {
            data.map(val => {
                if (val.id === id) {
                    this.EditDialogList.power.push(val);
                }
                if (val.nextlevel) {
                    this.powerDo(val.nextlevel, id);
                }
            });
        },
        // //处理角色具有的单位数据
        unitDo(data) {
            let department = this.$refs.editDialog.department;
            console.log(department);
            data.map(val => {
                this.myUnit(department, val.id);
            });
        },
        // //遍历具有的全部单位
        myUnit(data, id) {
            data.map(val => {
                // this.EditDialogList.unit.push(data[0]);
                if (val.id === id) {
                    this.EditDialogList.unit.push(val);
                }
                if (val.children) {
                    this.myUnit(val.children, id);
                }
            });
        },
        // 处理所属单位的数据
        depart(data) {
            let department = data.children;
            department.map(val => {
                val.level = val.t.level;
                val.label = val.t.name;
                val.value = val.id;
                if (val.hasChildren === true) {
                    this.depart(val);
                } else {
                    val.children = null;
                }
            });
        },
        checkAdult(item) {
            return item.name === "系统配置";
        },
        checkButton(item) {
            return item.name === "角色管理";
        },
        getTree() {
            axios
                .get("/department/special/all")
                .then(res => {
                    if (res.data.code === 0) {
                        let tree = [];
                        res.data.data.map(val => {
                            tree.push({ id: val.id, name: val.name });
                        });
                        this.searchName = [
                            // { searchPlaceholder: "角色名称", type: 0, Sendkey: "name" },
                            {
                                searchPlaceholder: "角色名称",
                                id: "name",
                                type: 6,
                                url: "/role/",
                                Sendkey: "name",
                                getDataKey: "name",
                                data: ""
                            },
                            {
                                searchPlaceholder: "所属单位",
                                id: 2,
                                type: 1,
                                url: "",
                                Sendkey: "deptIds",
                                data: tree
                            }
                        ];
                    } else {
                        this.$showSimpleMessage(
                            this.$store.state.codeStatus.find(t => t.code === res.data.code)
                                .name,
                            "error"
                        );
                    }
                })
                .catch(err => {
                    this.$showSimpleMessage(err, "error");
                });
        }
    },
    async created() {
        this.requestPageList();
        // 处理按钮权限
        let button1 = [];
        let button2 = [];
        let item = this.$store.state.authData.find(this.checkAdult);
        button1 = item.nextlevel.find(this.checkButton).button1;
        button2 = item.nextlevel.find(this.checkButton).button2;
        let topList = [];
        let operationList = [];
        button1.map(val => {
            topList.push(val.name);
        });
        button2.map(val => {
            operationList.push(val.name);
        });
        this.topButton.map(val => {
            if (!topList.includes(val.title)) {
                val.title = "";
                val.class = "kongSelf";
            }
        });
        this.buttonList.map(val => {
            if (!operationList.includes(val.title)) {
                val.title = "";
                val.class = "kongSelf";
            }
        });
        this.buttonListT.map(val => {
            if (!operationList.includes(val.title)) {
                val.title = "";
                val.class = "kongSelf";
            }
        });
    },
    mounted() {
        this.getTree();
    }
};
</script>
