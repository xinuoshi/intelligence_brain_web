<!--
   用户管理
   create 2018.08.30 to liujin
-->
<template>
    <div class="userManage">
        <api>
            <SearchPage slot="searchBoxBar" class="search flexNum" :searchName="searchData" :initialComponent="initialComponent" @initialComponentover="initialComponentOver" @searchEvent="searchEvent"></SearchPage>
            <div slot="searchBoxBar" class="operation">
                <bt class="bt flexNum" ref="bt" :buttonList="buttonListR" @operation="changeStatus"></bt>
            </div>
            <!--表格栏  -->
            <tab slot="table" ref="tab" :table-list="tableList" @selectArySlected="selectArySlected">
                <div slot="btn">
                    <el-table-column label="操作" :width="450">
                        <template slot-scope="scope">
                            <!--{{scope.row.status}}-->
                            <btn ref="btn" v-if="scope.row.status === '启用'" :button-list="buttonListT" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                            <btn ref="btn" v-else :button-list="buttonList" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                        </template>
                    </el-table-column>
                </div>
            </tab>
        </api>
        <!-- 分页 -->
        <el-pagination class="cli-pagination"  background  @size-change="handleSizeChange" @current-change="currentPage" :current-page="pageNum" :pageNum-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allPageValue"></el-pagination>
        <!-- 创建和编辑查看弹窗 -->

        <el-dialog :close-on-press-escape="false"  :title="assemblyValue.title+'用户'" v-dialogDrag :show-close="true" :before-close="handleClose"
                   :visible.sync="EditDialog" class="tems_dialog userManagement" width="480px" :close-on-click-modal="false">
            <div id="scrollDPart">
                <el-form :model="assemblyValue" :disabled="disabledShow" :rules="ruleValidate" ref="assemblyValue"
                         label-width="120px" class="demo-ruleForm">
                    <!-- 设备类型 -->
                    <div class="infoItemInfo">
                        <el-form-item label="用户名：" prop="username">
                            <el-input v-model="assemblyValue.username" :disabled="assemblyValue.title === '编辑' || assemblyValue.title === '查看' ? true : false"  auto-complete="off" clearable size="small"
                                    placeholder="请输入用户名..."  class="tems_Input comment-width"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名：" prop="accountName">
                            <el-input v-model="assemblyValue.accountName" :disabled="disabledShow" placeholder="请输入..." auto-complete="off" clearable size="small" class="tems_Input comment-width"></el-input>
                        </el-form-item>

                        <el-form-item label="性别：" prop="sex">
                            <el-select v-model="assemblyValue.sex" :disabled="disabledShow" size="small" class="tems_Input comment-width">
                                <el-option label="男" value="男">
                                </el-option>
                                <el-option label="女" value="女">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属单位：" prop="deptId">
                            <el-cascader
                                    class="danwei"
                                    :options="department.children"
                                    :show-all-levels="false"
                                    change-on-select
                                    v-model="assemblyValue.deptId"
                                    placeholder="请选择所属单位..."
                                    clearable
                                    filterable
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="用户角色：" prop="roleIds">
                            <el-select class="tems_Input comment-width" placeholder="请选择用户角色..." v-model="assemblyValue.roleIds" filterable clearable size="small">
                                <el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系方式：" prop="telephone">
                            <el-input v-model="assemblyValue.telephone" :disabled="disabledShow" auto-complete="off" clearable size="small"
                                    placeholder="请输入联系方式..."  class="tems_Input comment-width"></el-input>
                        </el-form-item>
                        <el-form-item label="通信方式：" prop="email">
                            <el-input v-model="assemblyValue.email" :disabled="disabledShow" auto-complete="off" clearable size="small"
                                    placeholder="请输入通信方式..."  class="tems_Input comment-width"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" prop="remark">
                            <el-input v-model="assemblyValue.remark" :disabled="disabledShow" auto-complete="off" clearable size="small"
                                    placeholder="请输入..." class="tems_Input comment-width"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer" :class="{ 'dialog-footerll' : assemblyValue.title === '查看'}">
                <div class="flexNum footer" v-if="assemblyValue.title === '查看'">
                    <div class="inportBtn" @click="closeForm('assemblyValue')">关 闭</div>
                </div>
                <div class="flexNum" v-else>
                    <div class=" inportBtn" v-if="assemblyValue.title === '查看'" @click="resetForm('assemblyValue')">关 闭</div>
                    <div class="inportBtn" @click="resetForm('assemblyValue')">取 消</div>
                    <div class="exportBtn " @click="handleSubmit('assemblyValue')">保 存</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from "@/components/common/api.vue";
import tab from "../ruleManagement/ruleTable.vue";
// import btn from "./button1.vue";

export default {
    name: "assetTrafficControlEquipment",
    components: {
        api, tab
        // Assembly
    },
    data() {
        return {
            // 多选时的选中的id
            selectId: [],
            roleList: [],
            // 输入框状态
            disabledShow: false,
            department: "",
            departmentProps: {
                label: "parentId",
                value: "id"
            },
            searchData: [],
            searchName: [
                { searchPlaceholder: "用户名称", id: "username", type: 6, getDataKey: "username", url: "/user/", Sendkey: "username" },
                { searchPlaceholder: "角色", id: "id", type: 2, getDataKey: "name", url: "/role/", Sendkey: "roleIds" },
                { searchPlaceholder: "所属单位", id: "id", type: 2, getDataKey: "name", url: "/department/", Sendkey: "deptId" },
                { searchPlaceholder: "用户状态", id: "status", type: 1, getDataKey: "id", url: "", Sendkey: "status", data: [{ id: "1", name: "启用" }, { id: "0", name: "停用" }] }
            ],
            // 表格组件传参列表
            tableList: {
                params: [],
                selection: false,
                index: 1,
                title: [
                    {
                        "name": "username",
                        "title": "用户名"
                    },
                    {
                        "name": "accountName",
                        "title": "姓名"
                    },
                    {
                        "name": "sex",
                        "title": "性别",
                        width:80
                    },
                    {
                        "name": "deptName",
                        "title": "所属单位"
                    },
                    {
                        "name": "roleList[0].name",
                        "title": "用户角色"
                    },
                    {
                        "name": "createdTime",
                        "title": "创建时间",
                        width:180
                    },
                    {
                        "name": "lastTime",
                        "title": "上次登录时间",
                        width:180
                    },
                    {
                        "name": "lastIp",
                        "title": "上次登录IP",
                        width:180
                    },
                    {
                        "name": "status",
                        "title": "用户状态",
                        width:100
                    }
                ],
                list: []
            },
            buttonListR: [
                {
                    title: "创建",
                    type: "primary",
                    size: "mini",
                    plain: true,
                    loading: false,
                    functionKeyName: "addDirect",
                    class: "qiliang"
                },
                {
                    title: "批量启用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:1",
                    class: "qiliang"
                },
                {
                    title: "批量停用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:0",
                    class: "qiliang"
                }
            ],
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
                    a: 1
                },
                {
                    title: "编辑", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    a: 1
                },
                {
                    title: "密码初始化",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    class: "erBtn"
                },
                {
                    title: "删除", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "erBtn",
                    a: 1
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
                    a: 1
                },
                {
                    title: "编辑", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    classId: "suBtn"
                },
                {
                    title: "密码初始化",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    class: "erBtn"
                },
                {
                    title: "删除", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    class: "erBtn",
                    classId: "suBtn"
                }
            ],
            assemblyValue: { // 变化的
                id: this.rowID,
                title: "",
                username: "",
                accountName: "",
                sex: "",
                deptId: [],
                telephone: "",
                email: "",
                remark: "",
                roleIds: ""
            },
            payload: "", // 搜索回调传入的搜索参数
            // 表格数据
            tableData: [],
            // 当前页
            pageNum: 1,
            // 当前页面显示数量
            pageSize: 10,
            // 数据总数
            allPageValue: 0,
            // 是否搜索
            isSearch: false,
            allPageReapt: [],
            // 创建编辑弹窗
            EditDialog: false,
            // 创建编辑内容
            formValidate: {},
            // 验证
            ruleValidate: {
                username: this.$CommonRule.numberChineseEnglish,
                accountName: this.$CommonRule.numberChinesefive,
                sex: this.$CommonRule.SelectRule,
                deptId: this.$CommonRule.SelectRule,
                roleIds: this.$CommonRule.SelectRule,
                telephone: this.$CommonRule.phoneRuleAndPhone,
                email: this.$CommonRule.emailRule
            },
            initialComponent: false,
            modifyRoleIds: true // 状态判断当deptId改变时是否需要清空roleIds
        };
    },
    methods: {
        // 关闭弹窗回调
        handleClose(done) {
            if (this.assemblyValue.title !== "查看") {
                this.$confirm("确定要取消吗？", "提示", { type: "warning" }).then(() => {
                    done();
                    this.handleClosedDo();
                }).catch(() => {});
            } else {
                done();
                this.handleClosedDo();
            }
        },
        // 关闭回调后清理
        handleClosedDo() {
            this.$refs["assemblyValue"].resetFields();
            this.initialComponent = true;
            this.searchData = [];
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
        // 分页
        // 改变每页的条数
        handleSizeChange(data) {
            this.pageSize = data;
            this.requestList();
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;

        },
        // 当前页数
        currentPage(data) {
            this.pageNum = data;
            this.requestList();
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;
        },
        // 点击相应的按钮，返回的index
        operation(data) {
            let itemScope = data.itemScope;
            let url = "";
            // 停用启用
            if (data.index === 0) {
                let msg;
                if (itemScope.row.status === "启用") {
                    url = "user/status/disable";
                    msg = this.buttonListT[data.index].title;
                } else {
                    url = "user/status/activation";
                    msg = this.buttonList[data.index].title;
                }
                let param = { ids: itemScope.row.id };
                this.$layerNotice("提示","您确定要"+ msg +"吗？", () => {
                    axios.put(url, param).then((e) => {
                        if (e.data.code === 0) {
                            this.$showSimpleMessage(msg + "成功", "success");
                            this.requestList();
                        } else {
                            this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === e.data.code).name, "error");
                        }
                    }).catch((err) => {
                        this.$showSimpleMessage(err, "error");
                    });
                }, null, "warning");
            }
            ;
            // 查看
            if (data.index === 1) {
                this.assemblyValue = {
                    id: this.rowID,
                    username: "",
                    accountName: "",
                    sex: "",
                    deptId: [],
                    telephone: "",
                    email: "",
                    remark: "",
                    roleIds: ""
                };
                this.modifyRoleIds = false;
                this.dataId = itemScope.row.id;
                this.disabledShow = true;
                this.assemblyValue.username = itemScope.row.username;
                this.assemblyValue.accountName = itemScope.row.accountName;
                this.assemblyValue.sex = itemScope.row.sex;
                this.assemblyValue.telephone = itemScope.row.telephone;
                this.assemblyValue.remark = itemScope.row.remark;
                this.assemblyValue.roleIds = itemScope.row.roleList[0].id;
                this.assemblyValue.email = itemScope.row.email;
                this.assemblyValue.title = "查看";
                this.assemblyValue.deptId = [];
                this.department.children.map(ele => {
                    if (ele.id === itemScope.row.deptId) {
                        this.assemblyValue.deptId = [itemScope.row.deptId];
                    } else {
                        this.getDeptId(ele, itemScope.row.deptId, this.assemblyValue.deptId);
                    }
                });
                this.EditDialog = true;
            }
            ;
            // 编辑
            if (data.index === 2) {
                this.assemblyValue = {
                    id: this.rowID,
                    username: "",
                    accountName: "",
                    sex: "",
                    deptId: [],
                    telephone: "",
                    email: "",
                    remark: "",
                    roleIds: ""
                };
                this.modifyRoleIds = false;
                if(itemScope.row.status === "启用"){
                    this.$showSimpleMessage("用户已启用，禁止修改", "error");
                    return;
                };
                this.dataId = itemScope.row.id;
                this.disabledShow = false;
                this.assemblyValue.username = itemScope.row.username;
                this.assemblyValue.accountName = itemScope.row.accountName;
                this.assemblyValue.sex = itemScope.row.sex;
                this.assemblyValue.telephone = itemScope.row.telephone;
                this.assemblyValue.remark = itemScope.row.remark;
                this.assemblyValue.roleIds = itemScope.row.roleList[0].id;
                this.assemblyValue.email = itemScope.row.email;
                this.assemblyValue.title = "编辑";
                this.assemblyValue.deptId = [];
                this.department.children.map(ele => {
                    if (ele.id === itemScope.row.deptId) {
                        this.assemblyValue.deptId = [itemScope.row.deptId];
                    } else {
                        this.getDeptId(ele, itemScope.row.deptId, this.assemblyValue.deptId);
                    }
                });
                this.EditDialog = true;
            }
            ;
            // 初始化密码
            if (data.index === 3) {
                this.$layerNotice("提示", "您确定要重置密码吗？", () => {
                    axios.put("user/resetpassword/" + itemScope.row.id).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("重置成功", "success");
                        } else {
                            this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                        }
                    }).catch((error) => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
            }
            ;
            // 删除
            if (data.index === 4) {
                this.$layerNotice("提示", "您确定要删除吗？", () => {
                    if (itemScope.row.status === "启用") {
                        this.$showSimpleMessage("启用状态不可删除", "error");
                    } else {
                        axios.delete("user/" + itemScope.row.id).then((e) => {
                            if (e.data.code === 0) {
                                this.$showSimpleMessage("删除成功", "success");
                                this.requestList();
                            } else {
                                this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === e.data.code).name, "error");
                            }
                        }).catch((err) => {
                            this.$showSimpleMessage(err, "error");
                        })
                    };
                }, null, "warning");
            }
        },
        // 将级联的子集及父级以数组拼接["",""]
        getDeptId(ele, deptId, data) {
            if (ele.children) {
                ele.children.map(el => {
                    if (el.id === deptId) {
                        data.unshift(el.id);
                        if (el.parentId !== "0") {
                            this.getDeptId(this.department, el.parentId, data);
                        }
                    } else {
                        this.getDeptId(el, deptId, data);
                    }
                });
            }
        },
        changeStatus(data) {
            let args = this.buttonListR[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 初始化请求列表
        requestList() {
            let params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                username: this.username,
                accountName: this.accountName,
                sex: this.sex,
                roleId: this.roleIds,
                deptId: this.deptId,
                status: this.status
            };
            axios.get("/user/", { params }).then((e) => {
                let resArry = e.data.data;
                if (resArry.total === 0) {
                    this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                }
                let array = e.data.data.list;
                this.allPageValue = e.data.data.total;
                array.map(val => {
                    val.createdTime = this.$filter.formatDateTimeInput(val.createdTime);

                    val.lastTime = val.lastTime === null ? "----" : this.$filter.formatDateTimeInput(val.lastTime);
                    val.status = val.status === 1 ? "启用" : "停用";
                });
                this.tableList.list = array;
                for (let i in array) {
                    this.tableList.list[i].lastIp = this.tableList.list[i].lastIp ? this.tableList.list[i].lastIp : "——"
                }
            });
        },
        // 搜索
        searchEvent(data) {
            this.pageNum = data.pageNum;
            this.username = data.username;
            this.deptId = data.deptId;
            this.roleIds = data.roleIds;
            this.status = data.status;
            this.requestList();
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;
        },
        // 重置表单
        closeForm(formName) {
            this.closeDialog(formName);
        },
        // 重置表单
        resetForm(formName) {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.closeDialog(formName);
            }, null, "warning");
        },
        // 关闭
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.EditDialog = false;// 创建编辑弹窗隐藏
            /*this.assemblyValue = {};*/
            this.initialComponent = true;
            this.searchData = [];
        },
        initialComponentOver() {
            this.initialComponent = false;
            setTimeout(() => {
                this.searchData = [...this.searchName];
            });
        },
        // 提交
        handleSubmit(name) {
            this.$refs[name].validate((result) => {
                if (!result) {
                    this.$message.error("内容验证失败");
                    return false;
                } else {
                    let a = this.assemblyValue.deptId.length;
                    let args = {
                        username: this.assemblyValue.username,
                        accountName: this.assemblyValue.accountName,
                        sex: this.assemblyValue.sex,
                        deptId: this.assemblyValue.deptId[a - 1],
                        telephone: this.assemblyValue.telephone,
                        email: this.assemblyValue.email,
                        remark: this.assemblyValue.remark,
                        roleIds: this.assemblyValue.roleIds
                    };
                    if (this.dataId) {
                        this.handleEditUnit(args, name);
                    } else {
                        this.handleAddUnit(args, name);
                    }
                }
            });
        },
        // 打开创建
        addDirect() {
            // this.$refs["assemblyValue"].resetFields();
            this.assemblyValue = {
                id: this.rowID,
                username: "",
                accountName: "",
                sex: "",
                deptId: [],
                telephone: "",
                email: "",
                remark: "",
                roleIds: ""
            };
            this.dataId = "";
            this.assemblyValue.title = "创建";
            this.disabledShow = false;
            // nk_code
            this.EditDialog = true;
        },
        // 多选
        selectArySlected(data) {
            this.selectId = [];
            data.map(val => {
                this.selectId.push(val.id);
            });
        },
        // 保存创建
        handleAddUnit(data, name) {
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("user/", data).then((res) => {
                    if (res.data.code === 0) {
                        this.EditDialog = false;// 创建编辑弹窗隐藏
                        this.$showSimpleMessage("创建成功", "success");
                        this.$refs[name].resetFields();
                        this.requestList();
                    } else {
                        let codeName = this.$store.state.codeStatus.find(i => i.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 保存编辑
        handleEditUnit(data, name) {
            this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                axios.put("user/" + this.dataId, data).then((res) => {
                    if (res.data.code === 0) {
                        this.EditDialog = false;// 创建编辑弹窗隐藏
                        this.$showSimpleMessage("保存成功", "success");
                        this.$refs[name].resetFields();
                        this.requestList();
                    } else {
                        let codeName = this.$store.state.codeStatus.find(i => i.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 表格选中变化
        tableSelect(selection) {
            this.selectAry = selection;
        },
        checkAdult(item) {
            return item.name === "系统配置";
        },
        checkButton(item) {
            return item.name === "用户管理";
        },
        // 全部启、停用
        stopItAll(status) {
            let param = { ids: this.selectId.toString() };
            let url;
            let msg;
            if (status === "1") {
                url = "user/status/activation";
                msg = "启用";
            } else {
                url = "user/status/disable";
                msg = "停用";
            }
            axios.put(url, param).then((e) => {
                if (e.data.code === 0) {
                    this.$showSimpleMessage(msg + "成功", "success");
                    this.requestList();
                } else {
                    this.$showSimpleMessage(e.data.msg ? e.data.msg : "发生未知错误", "error");
                }
            }).catch((err) => {
                this.$showSimpleMessage(err, "error");
            });
        },
        // 查询
        search() {
            this.pageNum = 1;
            this.getPages();
        }
    },
    watch: {
        "assemblyValue.deptId": function(val, oldval) {
            if (val) {
                let deptId = val[val.length - 1];
                let data = {
                    deptId: deptId
                };
                let modifyRoleIds = this.modifyRoleIds;
                axios.get("/role/deptId?status=1", { params: data }).then((res) => {
                    this.roleList = res.data.data;
                    if (modifyRoleIds) {
                        this.assemblyValue.roleIds = "";
                    } else {
                        this.modifyRoleIds = true;
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }
        }
    },
    async created() {
        this.searchData = this.searchName;
        this.requestList();
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
        this.buttonListR.map(val => {
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
        axios.get("/department/tree?status=1").then((res) => {
            let department = res.data.data;
            this.depart(department);
            this.department = department;
        }).catch((error) => {
            this.$showSimpleMessage(error, "error");
        });
        this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
    }
};
</script>

<style>
</style>

<style scoped>
    .danwei /deep/ .el-cascader__label{
        padding: 0 25px 0 28px;
    }
    .inportBtn {
        /* line-height: 26px; */
    }
    .exportBtn {
        /* line-height: 27px !important; */
    }
.user_Button {
    border-radius: 3px;
    line-height: 10px;
}
.kongSelf{
    display: none;
}
.dialog-footerll {
    text-align: center!important;
}
.userManage /deep/ .subordinateSubject {
    border-bottom: none;
}
</style>
