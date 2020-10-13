/*
 * @Author: Eco.dujun
 * @Date: 2018-09-04 09:29:45
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2019-02-22 18:01:10
 */
<template>
    <div class="police-pageNum rightBody">
        <api>
            <!-- <div slot="equipmentChangeName" class="title">
                <div class="word">单位管理</div>
            </div> -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage" :initialComponent="initialComponent"
                @initialComponentover="initialComponentOver" :searchName="searchData" @searchEvent="searchEvent"></SearchPage>
            <div slot="searchBoxBar" class="operation">
                <bt ref="bt" :buttonList="UnitTopButton" @operation="operation"></bt>
            </div>
            <!--树形表格实现  -->
            <tree-table slot="table" ref="recTree" :list.sync="treeDataSource" :UnitTabularButton="UnitTabularButton" @viewUnitFunc="viewUnitFunc" @actionFunc="actionFunc"
                @addingFunc="addingFunc" @deleteFunc="deleteFunc" @disableOperationFunc="disableOperationFunc"
                @handlerExpand="handlerExpand"></tree-table>
        </api>
        <!-- 弹窗 -->
        <editDialog ref="editDialog" @submitButton="submitButton" @closeDialogButton="closeDialogButton"
            :formValidate="formValidate" :EditDialogList="EditDialogList" :Isdisable="Isdisable"
            @update:Edit-dialog-list="val=> EditDialogList = val" ></editDialog>
    </div>
</template>

<script>
import editDialog from "./unit-editDialog.vue";
import treeTable from "./unit-tree-table/unit-tree-table.vue";

export default {
    name: "management",
    data() {
        return {
            UnitTopButton: [], // 顶部按钮权限
            UnitTabularButton: [], // 表格按钮权限
            // 树形表格数据
            treeDataSource: [],
            searchData: [],
            // 搜索组件传入参数
            searchName: [
                { searchPlaceholder: "单位名称", id: "id", type: 2, url: "/department/", Sendkey: "id", getDataKey: "name" }
                // { searchPlaceholder: "时间数量", type: 0, Sendkey: "time1", Combinatorialname: ["time1", "time2"], fillNum: true},
                // { searchPlaceholder: "至", type: 0, Sendkey: "time2", Combinatorialname: ["time1", "time2"], fillNum: true},
                // { searchPlaceholder: "车辆数量", type: 0, Sendkey: "car1", Combinatorialname: ["car1", "car2"], fillNum: true},
                // { searchPlaceholder: "至", type: 0, Sendkey: "car2", Combinatorialname: ["car1", "car2"], fillNum: true}
            ],
            // 顶部按钮组件传入参数
            topButton: [
                { title: "创建一级单位", plain: true, type: "primary", size: "small", class: "qiliang", functionKeyName: "creationUnit:1" }
            ],
            formValidate: {}, // 创建编辑内容
            payload: { id: "" }, // 搜索回传参数
            // 弹窗组件传值
            EditDialogList: {
                EditDialog: false, // 控制弹窗显示隐藏
                Title: "", // 弹窗title文字
                id: "", // 点击当前数据的id
                parentId: "", // 新增节点时，点击当前的节点id，用作新增子节点的父节点id，如果是编辑直接用当前数据的parentId
                level: "", // 当前层级
                typeof: true, // 判断是不是新增的一级单位
                titleType: 0 // 控制弹窗是在创建还是查看和编辑的情况触发的(0，创建，1，查看和编辑)
            },
            Isdisable: false, // 弹窗是否禁用修改
            initialComponent: false
        };
    },
    components: {
        editDialog,
        treeTable
    },
    methods: {
        // 获取单位所有按钮权限
        GetButtonPermissions() {
            let localAuthDataInformation = this.$store.state.authData;
            let unitButtonInformation = localAuthDataInformation.find(t => t.name === "系统配置").nextlevel.find(e => e.name === "单位管理");
            unitButtonInformation.button1.map(t => {
                let item = this.topButton.find(e => e.title === t.name);
                if (item) {
                    this.UnitTopButton = [...this.UnitTopButton, item];
                    this.UnitTopButton[0].title = "创建单位"
                }
            });
            this.UnitTabularButton = [...unitButtonInformation.button2];
        },
        // 获取单位信息
        getFirstDept() {
            axios.get("/department/tree").then((res) => {
                this.treeDataSource = res.data.data ? res.data.data.children : [];
                if (this.treeDataSource.length === 0) {
                    this.$showSimpleMessage(`抱歉，未查询到匹配数据`, "error");
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 搜索回调函数
        searchEvent(payload) {
            this.payload = payload;
            if (payload.id) {
                // 回调是否有选择的单位名称
                axios.get(`/department/${payload.id}`).then((res) => {
                    if (res.data.data) {
                        let obj = { t: {}, children: [] };
                        Object.keys(res.data.data).map(m => {
                            obj.t[m] = res.data.data[m];
                        });
                        this.treeDataSource = [obj];
                        if (this.treeDataSource.length === 0) {
                            this.$showSimpleMessage(`抱歉，未查询到匹配数据`, "error");
                        }
                    } else {
                        this.$showSimpleMessage(`抱歉，未查询到匹配数据`, "error");
                        this.treeDataSource = [];
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            } else {
                // 没有选择的单位名称默认查找整颗树
                this.getFirstDept();
            }
        },
        // 页面顶部按钮组件回调
        operation(data) {
            let args = this.UnitTopButton[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 创建一级/添加子级单位
        creationUnit(type) {
            this.EditDialogList.EditDialog = true;
            if (type) {
                this.EditDialogList.Title = "创建一级单位";
                this.Isdisable = false;
                this.EditDialogList.parentId = "0";
                this.EditDialogList.level = "0";
                this.EditDialogList.typeof = true;
            }
            this.EditDialogList.titleType = 0;
            this.formValidate = {};
        },
        // 弹窗组件保存时的回调
        submitButton() {
            this.formValidate = {};
            // 重新请求数据
            // if (this.payload.id) {
            //     this.searchEvent(this.payload);
            // } else {
            //     this.getFirstDept();
            // }
            this.getFirstDept();
            this.initialComponent = true;
            this.searchData = [];
        },
        initialComponentOver() {
            this.initialComponent = false;
            setTimeout(() => {
                this.searchData = [...this.searchName];
            });
        },
        // 弹窗组件关闭时的回调
        closeDialogButton() {
            this.formValidate = {};
            setTimeout(() => {
                this.Isdisable = false;
            }, 500);
        },
        // 查看单位
        viewUnitFunc(m) {
            axios.get(`/department/${m.t.id}`).then((res) => {
                if (res.data.data) {
                    this.Isdisable = true;
                    this.EditDialogList.EditDialog = true;
                    this.EditDialogList.Title = "查看单位";
                    this.formValidate = {
                        name: res.data.data.name,
                        contactPhone: res.data.data.contactPhone,
                        contactEmail: res.data.data.contactEmail
                    };
                } else {
                    this.formValidate = {};
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 编辑单位
        actionFunc(m) {
            axios.get(`/department/${m.t.id}`).then((res) => {
                if (res.data.data) {
                    if (res.data.data.status) {
                        this.$showSimpleMessage("单位已启用，禁止修改", "error");
                        return;
                    }
                    this.Isdisable = false;
                    this.EditDialogList.EditDialog = true;
                    this.EditDialogList.Title = "编辑单位";
                    this.EditDialogList.titleType = 1;
                    this.EditDialogList.id = m.t.id;
                    this.EditDialogList.parentId = m.t.parentId;
                    this.EditDialogList.level = m.t.level;
                    this.formValidate = {
                        name: res.data.data.name,
                        contactPhone: res.data.data.contactPhone,
                        contactEmail: res.data.data.contactEmail
                    };
                } else {
                    this.formValidate = {};
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 添加子单位
        addingFunc(m) {
            this.EditDialogList.Title = `添加${this.$tools.sectionToChinese(Number(m.t.level) + 2)}级单位`;
            this.Isdisable = false;
            this.EditDialogList.id = m.t.id;
            this.EditDialogList.parentId = m.t.id;
            this.EditDialogList.level = m.t.level;
            this.EditDialogList.typeof = false;
            this.creationUnit();
        },
        // 删除单位
        deleteFunc(m) {
            this.$layerNotice("提示", "您确定要删除吗？", () => {
                if (m.t.status === 1) {
                    this.$showSimpleMessage("启用状态不可删除", "error");
                } else {
                    axios.delete(`/department/${m.t.id}`).then((res) => {
                        // if (res.data.code === 5) {
                        //     this.$showSimpleMessage("存在子节点，不能删除或禁用此数据", "error");
                        // } else if (res.data.code === 11) {
                        //     this.$showSimpleMessage("数据正在使用,无法删除或禁用", "error");
                        // } else {
                        //     this.$showSimpleMessage("删除成功", "success");
                        //     // 重新请求数据
                        //     // if (this.payload.id) {
                        //     //     this.searchEvent(this.payload);
                        //     // } else {
                        //     //     this.getFirstDept();
                        //     // }
                        //     this.getFirstDept();
                        //     this.initialComponent = true;
                        // }
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("删除成功", "success");
                            this.getFirstDept();
                            this.initialComponent = true;
                        } else {
                            let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(codeName, "error");
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    });
                }
            }, null, "warning");
        },
        // 停用，启用
        disableOperationFunc(m) {
            let statusName = m.t.status ? "停" : "启";
            let url = m.t.status ? "/department/status/disable" : "/department/status/activation";
            let data = {
                ids: [m.t.id].toString()
            };
            this.$layerNotice("提示", `您确定要${statusName}用吗？`, () => {
                axios.put(url, data).then((res) => {
                    // if (res.data.code === -1) {
                    //     this.$showSimpleMessage("系统错误", "error");
                    // }  else if (res.data.code === 7) {
                    //     this.$showSimpleMessage("子单位存在已启用单位或上级单位已停用，禁止修改", "error");
                    // } else if (res.data.code === 11) {
                    //     this.$showSimpleMessage("数据正在使用,无法删除或禁用", "error");
                    // } else {
                    //     this.$showSimpleMessage(`${statusName}用成功`, "success");
                    //     // 重新请求数据
                    //     if (this.payload.id) {
                    //         this.searchEvent(this.payload);
                    //     } else {
                    //         this.getFirstDept();
                    //     }
                    // }
                    if (res.data.code === 0) {
                        // let codeName = res.data.userCount === 0 ? `${statusName}用成功` : `${statusName}用成功，但对${res.data.userCount}个用户有影响`;
                        this.$showSimpleMessage(`${statusName}用成功`, "success");
                        // 重新请求数据
                        if (this.payload.id) {
                            this.searchEvent(this.payload);
                        } else {
                            this.getFirstDept();
                        }
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        if (codeName === "存在关联数据，不能修改或停用此数据") {
                            codeName = "存在启用的子单位，无法停用";
                        } else if (codeName === "数据正在使用,无法删除、编辑或者停用") {
                            codeName = "存在启用的用户，无法停用";
                        }
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 展开/收缩树
        handlerExpand(m) {
            m.isExpand = !m.isExpand;
        }
    },
    created() {
        this.searchData = this.searchName;
        this.GetButtonPermissions();
        this.getFirstDept();
    },
    mounted() {
        //
    }
};
</script>

