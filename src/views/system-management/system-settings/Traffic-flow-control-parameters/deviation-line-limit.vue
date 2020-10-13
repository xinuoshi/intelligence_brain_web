/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2019-02-25 18:09:06
*/
<template>
    <div>
        <div style="background-color: #0a1a2d">
        <h3 style="text-align: left;margin-left: 40px;padding-top: 10px;padding-bottom: 30px">偏离/限行参数</h3>
        <!--<hr/>-->
        <api>
            <SearchPage slot="searchBoxBar" class="search flexNum" :searchName="searchName" @searchEvent="searchEvent"></SearchPage>
            <div slot="searchBoxBar" class="operation">
                <bt class="bt flexNum" ref="bt" :buttonList="buttonListR" @operation="changeStatus"></bt>
            </div>
            <!--表格栏  -->
            <tab slot="table" ref="tableCommon" :table-list="tableList" @selectArySlected="selectArySlected">
                <div slot="btn">
                    <el-table-column label="操作" :width="400">
                        <template slot-scope="scope">
                            <!--{{scope.row.status}}-->
                            <btn ref="btn" v-if="scope.row.status === 1" :button-list="buttonListT" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                            <btn ref="btn" v-else :button-list="buttonList" :dataId="scope.row.id" :itemScope="scope" @operation="operation"></btn>
                        </template>
                    </el-table-column>
                </div>
            </tab>
        </api>
        <div style="height: 30px"></div>
        <!-- 分页 -->
        <el-pagination class="cli-pagination"  background  @size-change="handleSizeChange" @current-change="currentPage"  :current-page="pageNum" :pageNum-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allPageValue"></el-pagination>
        <!-- 创建和编辑查看弹窗 -->

        <el-dialog :close-on-press-escape="false" :visible.sync="EditDialog" v-if="EditDialog" :title="formValidate.title" v-dialogDrag :show-close="true"
                class="tems_dialog deviation plianli_dialog" width="830px" @close="closeDialog('formValidate')"
                :close-on-click-modal="false" :before-close="handleClose">
            <div class="scrollPart" id="scrollDPart">
                <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate"
                         label-width="120px" class="demo-ruleForm">
                    <!-- 约束对象 -->
                    <el-form-item class="item" label="约束对象：">
                        <el-checkbox-group v-model="formValidate.carObject" :disabled="IsEdit || IsSee">
                            <el-checkbox v-show="(IsEdit && formValidate.carObject[0] === '线路编号') || (IsSee && formValidate.carObject[0] === '线路编号') || formValidate.carObject.length === 0 || (formValidate.carObject.length !== 0 && !IsSee && !IsEdit)" label="线路编号"></el-checkbox>
                            <el-checkbox v-show="(IsEdit && formValidate.carObject[0] === '车型') || (IsSee && formValidate.carObject[0] === '车型') || formValidate.carObject.length === 0 || (formValidate.carObject.length !== 0 && !IsSee && !IsEdit)" label="车型"></el-checkbox>
                            <el-checkbox v-show="(IsEdit && formValidate.carObject[0] === '号牌') || (IsSee && formValidate.carObject[0] === '号牌') || formValidate.carObject.length === 0 || (formValidate.carObject.length !== 0 && !IsSee && !IsEdit)" label="号牌"></el-checkbox>
                            <el-checkbox v-show="(IsEdit && formValidate.carObject[0] === '车辆属地') || (IsSee && formValidate.carObject[0] === '车辆属地') || formValidate.carObject.length === 0 || (formValidate.carObject.length !== 0 && !IsSee && !IsEdit)" label="车辆属地"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <transition name="el-zoom-in-top" style="width:100%">
                        <div v-show = "sliptShow" class="devLineContent" style="width:100%">
                            <div v-if="carObjectShow[0]" class="devLineBox" style="border: 1px solid red;">
                                <div class="obj_name">线路编号约束对象</div>
                                <el-form-item label="规则名称：">
                                    <el-input maxlength="50" :disabled="IsSee" class="tems_Input" placeholder="请输入规则名称..." v-model="formValidate.carDetectionRuleJson[0].name" clearable size="small" />
                                </el-form-item>
                                <div class="devLineTableBox">
                                    <div class="flexRow">
                                        <div class="flexNum devLineTable">序号</div>
                                        <div class="flexNum devLineTable">公交线路编号</div>
                                        <div class="flexNum devLineTable">操作</div>
                                    </div>
                                    <div class="flexColumn" >
                                        <div class="flexRow" v-for="(item, index) in formValidate.carDetectionRuleJson[0].constraintNumbers" :key="index">
                                            <div class="flexNum devLineTable">{{index + 1}}</div>
                                            <div class="flexNum devLineTable">
                                                <el-select class="flexkuang" :disabled="IsSee" size="small" v-model="formValidate.carDetectionRuleJson[0].constraintNumbers[index]" filterable clearable style="width:100%">
                                                    <el-option v-for="item in carDataList" :key="item.index" :label="item.value" :value="item.id" />
                                                </el-select>
                                            </div>
                                            <div class="flexNum devLineTable">
                                                <span class="addDel" v-if="!IsSee" @click="delCarHang(index)" style="height: 18px;width: 18px;font-size: 15px;font-weight: 900;line-height: 1;border:2px solid #F95553;color:#F95553;">—</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="display:flex" class="devLineTable">
                                        <div style="flex:2;border:none;box-shadow:none;-webkit-box-shadow:none" ></div>
                                        <div class="flexNum">
                                            <span class="addDel" v-if="!IsSee" @click="carListAdd" style="margin-top: 3px;height: 18px;width: 18px;font-size: 25px;line-height: 20px;border:2px solid #25fd90;color: #25fd90;">+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="carObjectShow[1]" class="devLineBox" style="border: 1px solid green;">
                                <div class="obj_name">车型约束对象</div>
                                <el-form-item label="规则名称：">
                                    <el-input maxlength="50" :disabled="IsSee" class="tems_Input" placeholder="请输入..." v-model="formValidate.carDetectionRuleJson[1].name" clearable size="small" />
                                </el-form-item>
                                <el-form-item>
                                    <el-checkbox-group v-model="formValidate.carDetectionRuleJson[1].carType" :disabled="IsSee" style="line-height: 3;">
                                        <el-checkbox label="1">大型货车</el-checkbox>
                                        <el-checkbox label="2">危化品运输车</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                            <div v-if="carObjectShow[2]" class="devLineBox" style="border: 1px solid blue;">
                                <div class="obj_name">号牌约束对象</div>
                                <el-form-item label="规则名称：">
                                    <el-input maxlength="50" class="tems_Input" :disabled="IsSee" placeholder="请输入规则名称..." v-model="formValidate.carDetectionRuleJson[2].name" clearable size="small" />
                                </el-form-item>
                                <el-form-item class="item" label="约束类型：">
                                    <el-select v-model="formValidate.remark" :disabled="IsSee" clearable placeholder="请选择...">
                                        <el-option label="单/双号" value="1"></el-option>
                                        <el-option label="尾号" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="item" label="号牌类型：" v-show="formValidate.remark === '1'">
                                    <el-select v-model="formValidate.remarkOne" :disabled="IsSee" clearable size="small" placeholder="请选择...">
                                        <el-option label="单号" value="-1"></el-option>
                                        <el-option label="双号" value="-2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="item TailNumberArray d_remarkTwo" label="尾号：" v-show="formValidate.remark === '0'">
                                    <el-select v-model="formValidate.remarkTwo" :disabled="IsSee" clearable multiple size="small" placeholder="请选择...">
                                        <el-option class="" v-for="(item, index) in TailNumberArray" :key="index" :value="item.id" :label="item.name">
                                            {{item.name}}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-if="carObjectShow[3]" class="devLineBox" style="border: 1px solid burlywood;">
                                <div class="obj_name">车辆属地约束对象</div>
                                <!-- prop="name" -->
                                <el-form-item label="规则名称：">
                                    <el-input maxlength="50" class="tems_Input" :disabled="IsSee" placeholder="请输入..." v-model="formValidate.carDetectionRuleJson[3].name" clearable size="small" />
                                </el-form-item>
                                <!-- prop="carOwnership" -->
                                <el-form-item class="item" label="选择属地：">
                                    <el-select v-model="formValidate.carDetectionRuleJson[3].carOwnership" :disabled="IsSee" clearable placeholder="请选择...">
                                        <el-option label="本地车" value="1"></el-option>
                                        <el-option label="外地车" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </transition>
                    <el-form-item class="item" label="规则类型：" prop="ruleType">
                        <el-select v-model="formValidate.ruleType" :disabled="IsSee" clearable placeholder="请选择...">
                            <el-option label="正向规则" value="1"></el-option>
                            <el-option label="反向规则" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <div style="display:flex;">
                        <el-form-item label="起止日期：" prop="startDate">
                            <div class="itemData">
                                <el-date-picker class="tems_Input" v-model="formValidate.startDate" :disabled="IsSee" format="yyyy-MM-dd" size="small" placeholder="选择日期"></el-date-picker>
                                <span class="zhiclass">至</span>
                            </div>
                        </el-form-item>
                        <el-form-item prop="endDate" label-width="0px" class="endDates">
                            <div class="itemData">
                            </el-date-picker>
                                <el-date-picker class="tems_Input" v-model="formValidate.endDate" :disabled="IsSee" format="yyyy-MM-dd" size="small" placeholder="选择日期"></el-date-picker>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item class="item" label="有效日期：" >
                        <div class="border_" style="padding:0;border: 1px solid #409eff;border-radius: 3px">
                            <div style="display:flex;">
                                <el-checkbox v-model="formValidate.validityDateAll" :disabled="IsSee" style="margin-left: 30px;">每一天</el-checkbox>
                            </div>
                            <el-checkbox-group v-model="formValidate.validityDate" :disabled="IsSee">
                                <el-checkbox style="margin-left:30px;" label="-1">单号日</el-checkbox>
                                <el-checkbox style="width:77%;text-align: left;" label="-2">双号日</el-checkbox>
                                <el-checkbox label="1">周一</el-checkbox>
                                <el-checkbox label="2">周二</el-checkbox>
                                <el-checkbox label="3">周三</el-checkbox>
                                <el-checkbox label="4">周四</el-checkbox>
                                <el-checkbox label="5">周五</el-checkbox>
                                <el-checkbox label="6">周六</el-checkbox>
                                <el-checkbox label="7">周日</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="有效时段：">
                        <div class="itemData flexColumn" v-for="(item, index) in formValidate.timeData" :key="index">
                            <div class="flexRow">
                                <el-time-select 
                                    class="tems_Input"
                                    v-model="item.startTime"
                                    size="small"
                                    :disabled="IsSee"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:01',
                                        end: '23:59'
                                    }"
                                    placeholder="选择时间" />
                                <span class="zhiclass">至</span>
                                <el-time-select
                                    class="tems_Input"
                                    v-model="item.endTime"
                                    size="small"
                                    :disabled="IsSee"
                                    :picker-options="{
                                        start: '00:00',
                                        step: '00:01',
                                        end: '23:59'
                                    }"
                                    placeholder="选择时间" />
                                <!-- <div v-if="formValidate.timeData.length !== 1">
                                    <span class="addDel" @click="delTimeHang(index)" v-if="!IsSee" style="font-size: 15px;font-weight: 900;line-height: 1.5;border:2px solid #F95553;color:#F95553;">—</span>
                                </div> -->
                            </div>
                        </div>
                    </el-form-item>
                    <!-- <div style="text-align: right; width:722px;">
                        <span class="addDel" @click="timeListAdd" v-if="!IsSee" style="font-size: 25px;line-height: 25px;border:2px solid #25fd90;color: #25fd90;">+</span>
                    </div> -->
                    <div class="border_" ref="dTransfer">
                        <span class="zhiclass">约束区域：</span>
                        <span @click="parameterMap" style="padding:5px" class="dj_qiliang" v-if="!IsSee">点击地图</span>
                        <el-transfer class="d_transfer" :titles="['未选中', '已选中']" :filterable="true" :disabled="IsSee" :props="{ key: 'id', label: 'equipmentName'}" v-model="formValidate.addEquipmentList" :data="equipmentList"></el-transfer>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="flexNum">
                    <div class="tems_Button inportBtn" v-if="!IsSee" @click="resetForm('formValidate')">取 消</div>
                    <div class="tems_Button inportBtn" v-else @click="resetFormclosed('formValidate')">关 闭</div>
                    <div class="tems_Button exportBtn" v-if="!IsSee" @click="handleSubmit(formValidate, 'formValidate')">保 存</div>
                </div>
            </div>
        </el-dialog>
        <parameterMap v-if="showmap" :showmap="showmap" :equipmentList="equipmentList" @closeDialogButton="closeDialogButton" @submitButton="submitButton"
            :select-device-array="SelectDeviceArray"
        ></parameterMap>
        <!-- 验证创建，编辑时表单的内容，验证内容太多做一个弹窗 -->
        <el-dialog :close-on-press-escape="false"  title="提示" v-dialogDrag :show-close="true" @close="colsedErrorMessage()" :visible.sync="ErrorMessageDialog" class="tems_dialog ErrorMessageDialog" width="480px" :close-on-click-modal="false">
            <div id="scrollDPart" class="scrollDPartErrorMessage">
                <p v-for="(i, index) in ErrorMessage" :key="index">{{i}}</p>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div class="tems_Button tems_errorButton qiliang colsedErrorMessage" @click="colsedErrorMessage()">关 闭</div>
                    <!-- <div class="tems_Button" @click="handleSubmit('formValidate')">保 存</div> -->
                    <!-- <bt ref="bt" :buttonList="ButtonArrs" @operation="operation"></bt> -->
                </div>
            </div>
        </el-dialog>
        <div style="height: 120px"></div>
        </div>
    </div>
</template>

<script>
import tab from "@/views/system-management/ruleManagement/ruleTable.vue";
import parameterMap from "./parameter-map.vue";
export default {
    name: "deviationlinelimit",
    props: ["checkXXall"],
    components: {
        tab,
        parameterMap
    },
    data() {
        return {
            // 默认的有效时段（开始和结束）
            aTimer: "",
            bTimer: "",
            // 选择动画显示
            sliptShow: false,
            // 多选时的选中的id
            selectId: [],
            searchName: [
                { searchPlaceholder: "约束对象", id: "", type: 1, url: "", Sendkey: "types", data: [{id: "1", name: "线路编号"},{id: "2", name: "车型"},{id: "3", name: "号牌"},{id: "4", name: "车辆属地"}] },
                { searchPlaceholder: "规则类型", id: "id", type: 1, Sendkey: "ruleType", data: [{id: "1", name: "正向规则"}, {id: "0", name: "反向规则"}] },
                { searchPlaceholder: "规则名称", id: "id", type: 6, url: "/carDetectionRule/", Sendkey: "name", getDataKey: "name" },
            ],
            // 表格组件传参列表
            tableList: {
                params: [],
                selection: false,
                index: 1,
                title: [
                    {
                        "name": "name",
                        "title": "规则名称"
                    },
                    {
                        "name": "types",
                        "title": "约束对象"
                    },
                    {
                        "name": "ruleType",
                        "title": "规则类型",
                        width:200
                    },
                    {
                        "name": "createdTime",
                        "title": "创建时间"
                    },
                    {
                        "name": "statusName",
                        "title": "状态",
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
                    class: "qiliang",
                    functionKeyName: "addDirect"
                },
                /*{
                    title: "批量启用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:1"
                },
                {
                    title: "批量停用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:0",
                    class: "erBtn"
                }*/
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
                    title: "删除", // 按钮文字
                    plain: true,
                    type: "primary", // 按钮类型： success , info, warning, danger, text, primary
                    size: "small", // 按钮大小：small medium mini
                    a: 1,
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
            // 表单
            formValidate: {
                id: this.rowID,
                title: "",
                // 规则合集
                carDetectionRuleJson: [
                    {
                        name: "",
                        types: 1,
                        constraintNumbers: [],
                        typeName: "线路编号"
                    },
                    {
                        name: "",
                        types: 2,
                        carType: [],
                        typeName: "车型"
                    },
                    {
                        name: "",
                        types: 3,
                        carLicence: "",
                        typeName: "号牌"
                    },
                    {
                        name: "",
                        types: 4,
                        carOwnership: "",
                        typeName: "车辆属地"
                    }
                ],
                carObject: [], // 约束对象
                validityDate: ["-1", "-2", "1", "2", "3", "4", "5", "6", "7"], // 有效日期
                ruleType: "", // 规则类型
                remarkOne: "", // 暂时用来做选择号牌的单双号或者填写尾号用
                remarkTwo: [], // 暂时用来做选择号牌的单双号或者填写尾号用
                remark: "", // 存储号牌类型
                startDate: "",
                endDate: "",
                validityDateAll: true, // 有效日期全选
                timeData: [{ startTime: "", endTime: "" }], // 有效时段
                addEquipmentList: [], // 添加的设备
                equipmentType: "",
                accountName: "",
            },
            checkbox_validityDate: ["-1", "-2", "1", "2", "3", "4", "5", "6", "7"],
            equipmentList: [], // 添加设备列表
            carDataList: [], // 公交线路字典
            carObjectShow: [false, false, false, false], // 约束对象显隐
            payload: "", // 搜索回调传入的搜索参数
            // 当前页
            pageNum: 1,
            // 当前页面显示数量
            pageSize: 10,
            // 数据总数
            allPageValue: 0,
            allPageReapt: [],
            // 创建编辑弹窗
            EditDialog: false,
            // 是否编辑
            IsEdit: false,
            // 是否查看
            IsSee: false,
            // 验证
            ruleValidate: {
                ruleType: this.$CommonRule.SelectRule,
                carOwnership: this.$CommonRule.SelectRule,
                name: this.$CommonRule.NotEmpty,
                startDate: this.$CommonRule.NotEmpty,
                endDate: this.$CommonRule.NotEmpty
            },
            ErrorMessageDialog: false, // 验证有错误后的弹窗
            ErrorMessage: [], // 错误信息数组
            remarkMessage: "", // 全局存一下remark号牌信息
            showmap: false, // 地图弹窗
            formValidateData: [],
            // 尾号数组
            TailNumberArray: [
                { id: "0", name: "0" },
                { id: "1", name: "1" },
                { id: "2", name: "2" },
                { id: "3", name: "3" },
                { id: "4", name: "4" },
                { id: "5", name: "5" },
                { id: "6", name: "6" },
                { id: "7", name: "7" },
                { id: "8", name: "8" },
                { id: "9", name: "9" }
            ],
            SelectDeviceArray: [], // 选择的设备名称数组
            // 穿梭框设备名长度
            d_transfer_nameLength: 0
        };
    },
    computed: {
    },
    methods: {
        // 关闭弹窗回调
        handleClose(done) {
            if (!this.IsSee) {
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
            this.$refs["formValidate"].resetFields();
            this.formValidate = {
                id: this.rowID,
                title: "",
                // 规则合集
                carDetectionRuleJson: [
                    {
                        name: "",
                        types: 1,
                        constraintNumbers: [],
                        typeName: "线路编号"
                    },
                    {
                        name: "",
                        types: 2,
                        carType: [],
                        typeName: "车型"
                    },
                    {
                        name: "",
                        types: 3,
                        carLicence: "",
                        typeName: "号牌"
                    },
                    {
                        name: "",
                        types: 4,
                        carOwnership: "",
                        typeName: "车辆属地"
                    }
                ],
                carObject: [], // 约束对象
                validityDate: ["-1", "-2", "1", "2", "3", "4", "5", "6", "7"], // 有效日期
                ruleType: "", // 规则类型
                remarkOne: "", // 暂时用来做选择号牌的单双号或者填写尾号用
                remarkTwo: [], // 暂时用来做选择号牌的单双号或者填写尾号用
                remark: "", // 存储号牌类型
                startDate: "",
                endDate: "",
                validityDateAll: true, // 有效日期全选
                timeData: [{ startTime: "00:00", endTime: "23:59" }], // 有效时段
                addEquipmentList: [], // 添加的设备
                equipmentType: "",
                accountName: ""
            };
            this.formValidateData = [];
            this.carObject = [];
            this.dataId = "";
            this.IsEdit = false;
            this.IsSee = false;
        },
        // 分页
        // 改变每页的条数
        handleSizeChange(data) {
            this.pageSize = data;
            this.requestList(this.tableList.params);
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;
        },
        // 关闭
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.EditDialog = false;// 创建编辑弹窗隐藏
            this.formValidate = {
                id: this.rowID,
                title: "",
                // 规则合集
                carDetectionRuleJson: [
                    {
                        name: "",
                        types: 1,
                        constraintNumbers: [],
                        typeName: "线路编号"
                    },
                    {
                        name: "",
                        types: 2,
                        carType: [],
                        typeName: "车型"
                    },
                    {
                        name: "",
                        types: 3,
                        carLicence: "",
                        typeName: "号牌"
                    },
                    {
                        name: "",
                        types: 4,
                        carOwnership: "",
                        typeName: "车辆属地"
                    }
                ],
                carObject: [], // 约束对象
                validityDate: ["-1", "-2", "1", "2", "3", "4", "5", "6", "7"], // 有效日期
                ruleType: "", // 规则类型
                remarkOne: "", // 暂时用来做选择号牌的单双号或者填写尾号用
                remarkTwo: [], // 暂时用来做选择号牌的单双号或者填写尾号用
                remark: "", // 存储号牌类型
                startDate: "",
                endDate: "",
                validityDateAll: true, // 有效日期全选
                timeData: [{ startTime: "00:00", endTime: "23:59" }], // 有效时段
                addEquipmentList: [], // 添加的设备
                equipmentType: "",
                accountName: "",
            };
            this.formValidateData = [];
            this.carObject = [];
            this.dataId = "";
            this.IsEdit = false;
            this.IsSee = false;
        },
        // 当前页数
        currentPage(data) {
            this.pageNum = data;
            this.requestList(this.tableList.params);
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;
        },
        // 公交线路增加按钮
        carListAdd() {
            this.formValidate.carDetectionRuleJson[0].constraintNumbers.push("");
            // this.formValidate.moduleListUnder.push({});
            // 定位滚动条
            // let doms = document.getElementById("scrollDPart");
            // doms.scrollTop = doms.scrollHeight;
        },
        // 公交线路行删除
        delCarHang(index) {
            this.formValidate.carDetectionRuleJson[0].constraintNumbers.splice(index, 1);
            // this.hideSelect("", index);
            // this.getGeomagnumberLength();
        },
        // 有效时段增加按钮
        timeListAdd() {
            this.formValidate.timeData.push({
                startTime: "00:00",
                endTime: "23:59"
            });
            // this.formValidate.moduleListUnder.push({});
            // 定位滚动条
            // let doms = document.getElementById("scrollDPart");
            // doms.scrollTop = doms.scrollHeight;
        },
        // 有效时段行删除
        delTimeHang(index) {
            this.formValidate.timeData.splice(index, 1);
            // this.hideSelect("", index);
            // this.getGeomagnumberLength();
        },
        // 点击相应的按钮，返回的index
        operation(data) {
            let itemScope = data.itemScope;
            let url = "";
            // 停用启用
            if (data.index === 0) {
                let name = itemScope.row.status === 1 ? "停用" : "启用";
                let data = {
                    id: itemScope.row.id,
                    status: itemScope.row.status === 1 ? 0 : 1
                };
                this.$layerNotice("提示", "确定要" + name + "吗？", () => {
                    axios.put(`/carDetectionRule/updateStatus/${itemScope.row.id}`, data).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage(`${name}成功`, "success");
                            this.requestList(this.tableList.params);
                        } else {
                            let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(codeName, "error");
                        }
                    }).catch((err) => {
                        this.$showSimpleMessage(err, "error");
                    });
                }, null, "warning");
            };
            // 查看
            if (data.index === 1) {
                this.IsSee = true;
                this.dataId = itemScope.row.id;
                axios.get(`/carDetectionRule/${this.dataId}`).then((res) => {
                    this.getFormValidate(res, "查看偏离/限行参数");
                }).catch((err) => {
                    this.$showSimpleMessage(err, "error");
                });
            }
            // 编辑
            if (data.index === 2) {
                if (itemScope.row.status === 1) {
                    this.$showSimpleMessage("启用状态下不可编辑", "error");
                    return;
                } else {
                    this.IsEdit = true;
                    this.dataId = itemScope.row.id;
                    axios.get(`/carDetectionRule/${this.dataId}`).then((res) => {
                        this.getFormValidate(res, "编辑偏离/限行参数");
                        res.data.data.startTime = res.data.data.startTime;
                        res.data.data.endTime = res.data.data.endTime;
                        this.formValidateData = res.data.data;
                    }).catch((err) => {
                        this.$showSimpleMessage(err, "error");
                    });
                }
            };
            // 删除
            if (data.index === 3) {
                let data = {
                    id: itemScope.row.id,
                    status: -1
                }
                this.$layerNotice("提示", "您确定要删除吗？", () => {
                    if (itemScope.row.status === 1) {
                        this.$showSimpleMessage("启用状态不可删除", "error");
                        return;
                    }
                    axios.put(`/carDetectionRule/updateStatus/${itemScope.row.id}`, data).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("删除成功", "success");
                            this.requestList(this.tableList.params);
                        } else {
                            let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(codeName, "error");
                        }
                    }).catch((err) => {
                        this.$showSimpleMessage(err, "error");
                    });
                }, null, "warning");
            }
        },
        // 查看或者编辑时配置参数
        getFormValidate(res, name) {
            this.formValidate = {
                id: this.rowID,
                title: "",
                // 规则合集
                carDetectionRuleJson: [
                    {
                        name: "",
                        types: 1,
                        constraintNumbers: [],
                        typeName: "线路编号"
                    },
                    {
                        name: "",
                        types: 2,
                        carType: [],
                        typeName: "车型"
                    },
                    {
                        name: "",
                        types: 3,
                        carLicence: "",
                        typeName: "号牌"
                    },
                    {
                        name: "",
                        types: 4,
                        carOwnership: "",
                        typeName: "车辆属地"
                    }
                ],
                carObject: [], // 约束对象
                validityDate: [], // 有效日期
                ruleType: "", // 规则类型
                remarkOne: "", // 暂时用来做选择号牌的单双号或者填写尾号用
                remarkTwo: [], // 暂时用来做选择号牌的单双号或者填写尾号用
                remark: "", // 存储号牌类型
                startDate: "",
                endDate: "",
                validityDateAll: "", // 有效日期全选
                timeData: [{ startTime: "", endTime: "" }], // 有效时段
                addEquipmentList: [], // 添加的设备
                equipmentType: "",
                accountName: "",
            }
            this.EditDialog = true;
            this.formValidate.id = this.rowID;
            this.formValidate.title = name;
            // 规则合集
            let item = this.formValidate.carDetectionRuleJson.find(t => t.types === res.data.data.types);
            item.name = res.data.data.name;
            if (res.data.data.types === 1) {
                if (res.data.data.carDetectionRuleCodeViewList) {
                    res.data.data.carDetectionRuleCodeViewList.map(t => {
                        item.constraintNumbers.push(t.codeId);
                    });
                } else {
                    item.constraintNumbers = [];
                }
            } else if (res.data.data.types === 2) {
                item.carType = JSON.parse(res.data.data.carType);
            } else if (res.data.data.types === 3) {
                // item.carLicence = res.data.data.carLicence;
                this.formValidate.remark = res.data.data.remark;
            } else {
                item.carOwnership = res.data.data.carOwnership;
            }
            let carObjectName = res.data.data.types === 1 ? "线路编号" : (res.data.data.types === 2 ? "车型" : (res.data.data.types === 3 ? "号牌" : "车辆属地"));
            this.formValidate.carObject = [carObjectName];
            this.formValidate.validityDateAll = JSON.parse(res.data.data.validityDate).length === this.checkbox_validityDate.length; // 有效日期全选
            this.formValidate.validityDate = JSON.parse(res.data.data.validityDate);
            if (res.data.data.types === 3 && this.formValidate.remark === "0") {
                setTimeout(() => {
                    this.formValidate.remarkTwo = JSON.parse(res.data.data.carLicence);
                });
            } else if (res.data.data.types === 3 && this.formValidate.remark !== "0") {
                setTimeout(() => {
                    this.formValidate.remarkOne = res.data.data.carLicence.substring(2, 4);
                    // console.log(this.formValidate.remarkOne, this.formValidate.remarkTwo)
                });
            }
            // res.data.data.startTime = (JSON.parse(res.data.data.startTime))[0].startTime
            // res.data.data.endTime = (JSON.parse(res.data.data.endTime))[0].endTime
            res.data.data.startTime = res.data.data.startTime;
            res.data.data.endTime = res.data.data.endTime;
            this.formValidate.ruleType = res.data.data.ruleType;
            this.formValidate.startDate = this.$filter.formatDateTimeDay(res.data.data.startDate);
            this.formValidate.endDate = this.$filter.formatDateTimeDay(res.data.data.endDate);
            // this.formValidate.timeData = JSON.parse(res.data.data.startTime); // 有效时段
            this.formValidate.timeData = [{ "startTime": res.data.data.startTime, "endTime": res.data.data.endTime }]; // 有效时段
            if (res.data.data.carDetectionRuleEquipmentViewList) {
                res.data.data.carDetectionRuleEquipmentViewList.map(t => {
                    this.formValidate.addEquipmentList.push(t.equipmentId); // 添加的设备
                });
            } else {
                this.formValidate.addEquipmentList = [];
            }
            this.equipmentList.map(t => {
                t.disabled = this.IsSee ? true : false;
            });
        },
        changeStatus(data) {
            let args = this.buttonListR[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 初始化请求列表
        requestList(data) {
            let paramsdata = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                types: data.types,
                ruleType: data.ruleType,
                name: data.name
            };
            axios.get("/carDetectionRule/", {params: paramsdata}).then((res) => {
                this.allPageValue = res.data.data.total;
                let array = res.data.data.list;
                array.map(t => {
                    t.types = t.types === 1 ? "线路编号" : (t.types === 2 ? "车型": (t.types === 3 ? "号牌" : "车辆属地"));
                    t.ruleType = t.ruleType === "1" ? "正向规则" : "反向规则";
                    t.createdTime = this.$filter.formatDateTime(t.createdTime);
                    t.statusName = t.status ? "启用" : "停用";
                });
                this.tableList.list = array;
                if (this.allPageValue === 0) {
                    this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                }
            }).catch((error) => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 搜索
        searchEvent(data) {
            this.pageNum = data.pageNum;
            this.tableList.params = data;
            this.requestList(data);
            this.tableList.index = ((this.pageNum - 1) * this.pageSize) + 1;
        },
        // 重置表单
        resetForm(formName) {
            this.$layerNotice("提示", "您确定要取消吗？", () => {
                this.closeDialog(formName);
            }, null, "warning");
        },
        // 关闭按钮
        resetFormclosed(formName) {
            this.closeDialog(formName);
        },
        // 提交
        handleSubmit(name, formName) {
            this.$refs["formValidate"].validate(async(valid) => {
                if (valid) {
                    this.ErrorMessage = await this.verificationFramework();// 调用验证框架验证一些无法直接验证规则验证的内容
                    if (this.ErrorMessage.length !== 0) {
                        this.ErrorMessageDialog = true;
                    } else {
                        // 更新限行规则
                        if (this.dataId) {
                            let data = {};
                            data.name = this.formValidate.carDetectionRuleJson.find(t => t.types === this.formValidateData.types).name;
                            data.ruleType = this.formValidate.ruleType;
                            data.startDate = this.$filter.timesFormat(this.formValidate.startDate);
                            data.endDate = this.$filter.timesFormat(this.formValidate.endDate);
                            data.validityDate = JSON.stringify(this.formValidate.validityDate);
                            data.remark = this.formValidate.remark;
                            this.formValidate.timeData.map(t => {
                                // this.$filter.timesFormat(t.startTime);
                                // this.$filter.timesFormat(t.endTime);
                                t.startTime = t.startTime;
                                t.endTime = t.endTime;
                            });
                            // data.startTime = JSON.stringify(this.formValidate.timeData);
                            data.startTime = this.formValidate.timeData[0].startTime;
                            data.endTime = this.formValidate.timeData[0].endTime;
                            if (this.formValidateData.types === 1) {
                                let constraintNumbers = this.$tools.deepCopy(this.formValidate.carDetectionRuleJson.find(t => t.types === this.formValidateData.types).constraintNumbers);
                                let constraintNumbersString = "";
                                constraintNumbers.map((t, i) => {
                                    if (constraintNumbers.length === (i + 1)) {
                                        constraintNumbersString += `${t}`;
                                    } else {
                                        constraintNumbersString += `${t},`;
                                    }
                                });
                                data.constraintNumbers = constraintNumbersString;
                            } else if (this.formValidateData.types === 2) {
                                data.carType = JSON.stringify(this.formValidate.carDetectionRuleJson.find(t => t.types === this.formValidateData.types).carType);
                            } else if (this.formValidateData.types === 3) {
                                // data.carLicence = this.formValidate.carDetectionRuleJson.find(t => t.types === this.formValidateData.types).carLicence;
                                if (data.remark === "0") {
                                    data.carLicence = JSON.stringify(this.formValidate.remarkTwo);
                                } else {
                                    data.carLicence = `["${this.formValidate.remarkOne}"]`;
                                }
                            } else {
                                data.carOwnership = this.formValidate.carDetectionRuleJson.find(t => t.types === this.formValidateData.types).carOwnership;
                            }
                            let constraintRegionalString = "";
                            this.formValidate.addEquipmentList.map((t, i) => {
                                if (this.formValidate.addEquipmentList.length === (i + 1)) {
                                    constraintRegionalString += `${t}`;
                                } else {
                                    constraintRegionalString += `${t},`;
                                }
                            });
                            data.constraintRegional = constraintRegionalString;
                            data.types = this.formValidateData.types;
                            
                            this.handleEditUnit(data, formName);
                        } else {
                            this.formValidate.timeData.map(t => {
                                // this.$filter.timesFormat(t.startTime)
                                // this.$filter.timesFormat(t.endTime)
                                t.startTime = t.startTime;
                                t.endTime = t.endTime;
                            });
                            let constraintRegional = "";
                            this.formValidate.addEquipmentList.map((t, i) => {
                                if (this.formValidate.addEquipmentList.length === (i + 1)) {
                                    constraintRegional += `${t}`;
                                } else {
                                    constraintRegional += `${t},`;
                                }
                            });
                            let data = {
                                ruleType: this.formValidate.ruleType,
                                startDate: this.formValidate.startDate,
                                endDate: this.formValidate.endDate,
                                validityDate: JSON.stringify(this.formValidate.validityDate),
                                // startTime: JSON.stringify(this.formValidate.timeData),
                                startTime: this.formValidate.timeData[0].startTime,
                                endTime: this.formValidate.timeData[0].endTime,
                                constraintRegional: constraintRegional,
                                remark: this.formValidate.remark
                            };
                            
                            let carDetectionRuleJson = [];
                            this.formValidate.carObject.map(t => {
                                let index = "";
                                index = t === "线路编号" ? 0 : (t === "车型" ? 1 : (t === "号牌" ? 2 : 3));
                                carDetectionRuleJson.push(this.formValidate.carDetectionRuleJson[index]);
                            });
                            let carDetectionRuleJsonString = this.$tools.deepCopy(carDetectionRuleJson);
                            carDetectionRuleJsonString.map(e => {
                                if (e.hasOwnProperty("constraintNumbers")) {
                                    let carDetectionRule = "";
                                    e.constraintNumbers.map((t, i) => {
                                        if (e.constraintNumbers.length === (i + 1)) {
                                            carDetectionRule += `${t}`;
                                        } else {
                                            carDetectionRule += `${t},`;
                                        }
                                    });
                                    e.constraintNumbers = carDetectionRule;
                                }
                                if (e.types === 3) {
                                    if (this.formValidate.remark === "0") {
                                        e.carLicence = JSON.stringify(this.formValidate.remarkTwo);
                                    } else {
                                        e.carLicence = `["${this.formValidate.remarkOne}"]`;
                                    };
                                }
                            });
                            data.carDetectionRuleJson = JSON.stringify(carDetectionRuleJsonString);
                            
                            this.handleAddUnit(data, formName);
                        }
                    }
                } else {
                    this.$showSimpleMessage("内容验证失败", "error");
                    return false;
                }
            });
        },
        // 打开创建
        addDirect() {
            this.formValidate.title = "创建偏离/限行参数";
            this.IsEdit = false;
            this.IsSee = false; // 手动重置一下，好像出问题了
            this.formValidateData = [];
            this.equipmentList.map(t => { t.disabled = false; });
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
        handleAddUnit(data, formName) {
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("/carDetectionRule/", data).then((res) => {
                    if (res.data.code === 0) {
                        this.closeDialog(formName);
                        this.$showSimpleMessage("创建成功", "success");
                        this.requestList(this.tableList.params);
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(codeName, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 保存编辑
        handleEditUnit(data, formName) {
            this.$layerNotice("提示", "您确定要保存修改吗？", () => {
                axios.put(`/carDetectionRule/${this.dataId}`, data).then((res) => {
                    if (res.data.code === 0) {
                        this.closeDialog(formName);
                        this.$showSimpleMessage("保存成功", "success");
                        this.requestList(this.tableList.params);
                    } else {
                        let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
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
        // 打开地图弹窗
        parameterMap() {
            this.showmap = true;
            this.SelectDeviceArray = this.formValidate.addEquipmentList;
        },
        // 确定回调事件
        submitButton(data) {
            this.formValidate.addEquipmentList = [...data];
            this.showmap = false;
            this.SelectDeviceArray = [];
        },
        // 关闭弹窗回调事件
        closeDialogButton() {
            this.showmap = false;
            this.SelectDeviceArray = [];
        },
        // 验证框架验证一些无法直接验证规则验证的内容
        verificationFramework() {
            let ErrorMessage = [];
            let _this = this;
            return new Promise((reslove, reject) => {
                // 验证是否有选择约束对象
                // console.log(_this.formValidate);
                if (_this.formValidate.carObject.length === 0) {
                    ErrorMessage.push("错误：至少选择一项约束对象");
                    reslove(ErrorMessage); // 返回具体错误信息
                } else {
                    let regu = "^[ ]+$";
                    let re = new RegExp(regu);
                    // 验证选择的约束对象信息是否填写完整
                    _this.formValidate.carObject.map(t => {
                        let item = _this.formValidate.carDetectionRuleJson.find(e => e.typeName === t);
                        if (item.types === 1) {
                            // 线路编号
                            if (item.name && item.name.length >= 50) {
                                ErrorMessage.push("错误：线路编号规则名称填写过长，限制50字以内");
                            }
                            if (!item.name) {
                                ErrorMessage.push("错误：线路编号规则名称未填写");
                            }
                            if (item.name) {
                                //为空或纯空格为 true,有值为false
                                if (re.test(item.name)) {
                                    ErrorMessage.push("错误：线路编号规则名称填写错误，不能为纯空格");
                                }
                            }
                            if (item.constraintNumbers.length === 0) {
                                ErrorMessage.push("错误：线路编号未添加公交线路编号");
                            } else {
                                let constraintNumbersName = false;
                                item.constraintNumbers.map(t => {
                                    if (!t) {
                                        constraintNumbersName = true;
                                    }
                                });
                                if (constraintNumbersName) {
                                    ErrorMessage.push("错误：线路编号存在一个或多个未选择的公交线路编号");
                                } else {
                                    let isRepeat = function(arr) {
                                        let hash = {};
                                        for(let i in arr) {
                                            if(hash[arr[i]]) {
                                                return true;
                                            }
                                            // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
                                            hash[arr[i]] = true;
                                        }
                                        return false;
                                    };
                                    let constraintNumbersNameT = isRepeat(item.constraintNumbers);
                                    if (constraintNumbersNameT) {
                                        // 如果为true表示有重复元素
                                        ErrorMessage.push("错误：线路编号存在一个或多个重复选择的公交线路编号");
                                    }
                                }
                            }
                        } else if (item.types === 2) {
                            // 车型
                            if (item.name && item.name.length >= 50) {
                                ErrorMessage.push("错误：车型规则名称填写过长，限制50字以内");
                            }
                            if (!item.name) {
                                ErrorMessage.push("错误：车型规则名称未填写");
                            }
                            if (item.name) {
                                //为空或纯空格为 true,有值为false
                                if (re.test(item.name)) {
                                    ErrorMessage.push("错误：车型规则名称填写错误，不能为纯空格");
                                }
                            }
                            if (item.carType.length === 0) {
                                ErrorMessage.push("错误：车型未选择");
                            }
                        } else if (item.types === 3) {
                            // 号牌
                            if (item.name && item.name.length >= 50) {
                                ErrorMessage.push("错误：号牌规则名称填写过长，限制50字以内");
                            }
                            if (!item.name) {
                                ErrorMessage.push("错误：号牌规则名称未填写");
                            }
                            if (item.name) {
                                //为空或纯空格为 true,有值为false
                                if (re.test(item.name)) {
                                    ErrorMessage.push("错误：号牌规则名称填写错误，不能为纯空格");
                                }
                            }
                            if (!_this.formValidate.remark) {
                                ErrorMessage.push("错误：约束类型未选择");
                            }
                            if (_this.formValidate.remark) {
                                if (_this.formValidate.remark === "1" && !_this.formValidate.remarkOne) {
                                    ErrorMessage.push("错误：未选择号牌类型");
                                } else if (_this.formValidate.remark === "0" && _this.formValidate.remarkTwo.length === 0) {
                                    ErrorMessage.push("错误：未选择尾号");
                                }
                                // else if (item.carLicence === "0" && _this.formValidate.remark && isNaN(_this.formValidate.remark)) {
                                //     ErrorMessage.push("错误：尾号必须填写数字");
                                // } else if (item.carLicence === "0" && _this.formValidate.remark && !isNaN(_this.formValidate.remark) && _this.formValidate.remark.length > 9) {
                                //     ErrorMessage.push("错误：尾号填写过长，限制9位数");
                                // }
                            }
                        } else {
                            // 车辆属地
                            if (!item.name) {
                                ErrorMessage.push("错误：车辆属地规则名称未填写");
                            }
                            if (item.name) {
                                //为空或纯空格为 true,有值为false
                                if (re.test(item.name)) {
                                    ErrorMessage.push("错误：车辆属地规则名称填写错误，不能为纯空格");
                                }
                            }
                            if (!item.carOwnership) {
                                ErrorMessage.push("错误：车辆属地未选择");
                            }
                        }
                    });
                    // 验证是否有选择有效日期
                    if (_this.formValidate.validityDate.length === 0) {
                        ErrorMessage.push("错误：有效日期未选择");
                    }
                    // 验证是否填写有效时段并且开始有效时段是否大于结束时段
                    let IstimeData = false; let ErrortimeData = false;
                    _this.formValidate.timeData.map(t => {
                        if (!t.startTime || !t.endTime) {
                            IstimeData = true;
                        }
                    });
                    _this.formValidate.timeData.map(t => {
                        if (t.startTime && t.endTime) {
                            let timeDataObj = this.$tools.deepCopy(t); // 深复制一份
                            let startTimeArr = timeDataObj.startTime.split(":"); let endTimeArr = timeDataObj.endTime.split(":");
                            // 转成数字进行比较
                            let startTimeNum = Number(`${startTimeArr[0]}${startTimeArr[1]}`);
                            let endTimeNum =  Number(`${endTimeArr[0]}${endTimeArr[1]}`);
                            // if (_this.$filter.timesFormat(t.startTime) >= _this.$filter.timesFormat(t.endTime)) {
                            //     ErrortimeData = true;
                            // }
                            if (startTimeNum >= endTimeNum) {
                                ErrortimeData = true;
                            }
                        }
                    });
                    if (IstimeData) {
                        ErrorMessage.push("错误：存在有未选择的有效时段");
                    }
                    if (ErrortimeData) {
                        ErrorMessage.push("错误：存在有开始有效时段大于或者等于结束时段的选项");
                    }
                    // 验证是否选择设备集合(约束区域)
                    if (_this.formValidate.addEquipmentList.length === 0) {
                        ErrorMessage.push("错误：约束区域未选择");
                    }
                    reslove(ErrorMessage); // 返回具体错误信息
                }
            });
        },
        // 验证错误弹窗关闭事件
        colsedErrorMessage() {
            this.ErrorMessageDialog = false;
            this.ErrorMessage = [];
        }
    },
    watch: {
        // 监听选择数据
        "carObjectShow": function(val) {
            for (let i in val) {
                if (val[i]) {
                    this.sliptShow = true;
                }
            }
        },
        "formValidate.carDetectionRuleJson": {
            handler: function(val, oldval) {
                this.remarkMessage = this.formValidate.carDetectionRuleJson[2].carLicence;
            },
            deep: true
        },
        "remarkMessage": function(val, oldval) {
            if (val === "1") {
                this.formValidate.remarkTwo = [];
            } else if (val === "0") {
                this.formValidate.remarkOne = "";
            }
        },
        "formValidate.validityDateAll": {
            handler: function(val, oldval) {
                if (val) {
                    this.formValidate.validityDate = this.checkbox_validityDate;
                } else {
                    if (this.formValidate.validityDate.length === this.checkbox_validityDate.length) {
                        this.formValidate.validityDate = [];
                    }
                }
            }
        },
        "formValidate.validityDate": {
            handler: function(val, oldval) {
                if (val.length !== this.checkbox_validityDate.length) {
                    this.formValidate.validityDateAll = false;
                } else {
                    this.formValidate.validityDateAll = true;
                }
            },
            deep: true
        },
        // 控制约束对象规则显隐
        "formValidate.carObject": {
            handler: function(val, oldval) {
                // console.log(val)
                this.carObjectShow = [false, false, false, false];
                let _this = this;
                val.forEach((check) => {
                    switch (check) {
                        case "线路编号":
                            _this.carObjectShow[0] = true;
                            break;
                        case "车型":
                            _this.carObjectShow[1] = true;
                            break;
                        case "号牌":
                            _this.carObjectShow[2] = true;
                            break;
                        case "车辆属地":
                            _this.carObjectShow[3] = true;
                            break;
                    }
                });
            },
            deep: true
        },
        // 监听表单起止时间
        "formValidate.startDate": {
            handler: function(val, oldval) {
                let currentTime = this.$filter.timesFormat(new Date()); // 当前时间
                this.formValidate.startDate = val.valueOf();
                // if (this.$filter.timesFormat(val) > currentTime) {
                //     this.$showSimpleMessage("选择的开始日期应小于当前日期", "warning");
                //     this.formValidate.startDate = "";
                // } else if (this.$filter.timesFormat(val) >= this.$filter.timesFormat(this.formValidate.endDate)) {
                //     this.$showSimpleMessage("选择的开始日期应小于结束日期", "warning");
                //     this.formValidate.endDate = "";
                // }
                if (this.$filter.timesFormat(val) > this.$filter.timesFormat(this.formValidate.endDate)) {
                    this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                    this.formValidate.endDate = "";
                }
            }
        },

        "formValidate.endDate": {
            handler: function(val, oldval) {
            this.formValidate.endDate = val.valueOf();
                let currentTime = this.$filter.timesFormat(new Date()); // 当前时间
                // let endtiem= this.$filter.timesFormat(val)
                // if (endtiem < currentTime) {
                //     this.$showSimpleMessage("结束日期应大于当前日期1", "warning");
                //     this.formValidate.endDate = "";
                // } else
                 if (this.$filter.timesFormat(this.formValidate.startDate) > this.$filter.timesFormat(val)) {
                    this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                    this.formValidate.endDate = "";
                }
            }
        },
        // 监听弹窗打开
        "EditDialog": {
            handler: function(val, oldval) {
                if (val === true) {
                    this.$nextTick(() => {
                        this.$refs.dTransfer.style.setProperty("--itemWidth", `${this.d_transfer_nameLength * 14 + 49}px`);
                    });
                }
            }
        },
        // 防错机制,监听获取到最长设备名长度
        "d_transfer_nameLength": {
            handler: function(val, oldval) {
                if (val > 0 && this.EditDialog === true) {
                    this.$nextTick(() => {
                        this.$refs.dTransfer.style.setProperty("--itemWidth", `${this.d_transfer_nameLength * 14 + 49}px`);
                    });
                }
            }
        }
    },
    created() {
        console.log(this.checkXXall[0])
        this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
        this.requestList(this.tableList.params);
        // "equipment/?cameraAngle=1&equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3"
        axios.get("equipment/?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3").then(async(res) => {
            this.equipmentList = [...res.data.data];
            // 获取设备名长度
            for (let i = 0; i < this.equipmentList.length; i++) {
                // console.log(this.equipmentList[i].equipmentName.length)
                if (this.equipmentList[i].equipmentName.length > this.d_transfer_nameLength) {
                    this.d_transfer_nameLength = await this.equipmentList[i].equipmentName.length;
                }
            };
            // console.log(this.d_transfer_nameLength)
        }).catch((error) => {
            this.$showSimpleMessage(error, "error");
        });
        axios.get("code/?type=10003").then((res) => {
            this.carDataList = res.data.data;
        }).catch((error) => {
            this.$showSimpleMessage(error, "error");
        });
        // 处理按钮权限
        let button1 = this.checkXXall[0];
        let button2 = this.checkXXall[1];
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
        // 默认的有效时段
        // this.aTimer = `${this.$filter.formatDateTime(this.$filter.formatDateTime(this.$filter.timesFormat(new Date()))).split(" ")[0]} 00:00:00`;
        // this.bTimer = `${this.$filter.formatDateTime(this.$filter.formatDateTime(this.$filter.timesFormat(new Date()))).split(" ")[0]} 23:59:59`;
        // 把默认时段给赋值上
        this.formValidate.timeData[0].startTime = "00:00";
        this.formValidate.timeData[0].endTime = "23:59";
    }
};
</script>
<style>
    .deviation .demo-ruleForm {
        padding: 0 1vw 0 2vw;
    }
    .d_remarkTwo .el-tag {
        width: auto !important;
        padding-top: 1px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
        display: inline-block !important;
    }
    .plianli_dialog .el-dialog__title {
        width: 168px !important;
        background-size: 100% 100% !important;
    }
    .el-dialog::after {
        position: absolute;
        top: -2px; bottom: -2px;
        left: -2px; right: -3px;
        background: linear-gradient(#0e66d8,#00ebfb,#0e66d8);
        content: "";
        z-index: -1;
        border-radius: 10px;
    }
</style>

<style scoped>
    .d_transfer /deep/ .el-transfer__buttons .el-button {
        margin-left: 0px;
    }
    .d_transfer {
        height: 390px;
    }
    .d_transfer /deep/ .el-transfer-panel {
        overflow: visible !important;
    }
    .d_transfer /deep/ .el-transfer-panel__body {
        height: 340px;
        margin-top: -5px !important;
        margin-left: 0;
        width: 298px;
    }
    .d_transfer /deep/ .el-input {
        width: 90% !important;
    }
    .d_transfer /deep/ .el-transfer-panel__header {
        height: 48px;
        width: 302px;
    }
    .d_transfer /deep/ .el-transfer-panel__list.is-filterable {
        height: 310px;
    }
    .d_transfer /deep/ .el-transfer-panel__filter {
        margin-left: 18px !important;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .d_transfer /deep/ .el-transfer-panel__item {
        height: 38px;
        line-height: 38px;
        padding-top: 6px;
        width: var(--itemWidth);
        /* width: 132%; */
    }
    .d_transfer /deep/ .el-transfer-panel__item.el-checkbox .el-checkbox__label {
        text-align: left;
        overflow: visible;
    }
    .d_transfer /deep/ .el-transfer-panel__item .el-checkbox__input {
        top: 14px;
    }
    .deviation .scrollPart {
        max-height: 422px;
    }
    .border_ {
        width: 100%;
        padding: 22px;
        text-align: left;
        --itemWidth: 298px;
    }
    .addDel {
        text-align: center
    }
    .zhiclass {
        color:rgb(67, 212, 224);
        padding:0 50px;
        height: 40px;
    }
    .devLineBox {
        width: 703px;
        padding: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        border-radius: 3px;
    }
    .devLineTableBox {
        width: 96%;
    }
    .devLineTable {        
        color: #06a2de;        
        height: 30px;
        line-height: 30px;
         border: 1px solid #21446C;
    }
    .flexkuang /deep/ .el-input__inner{
        border-color: #21446C!important;
        background-color: #071b35;
    }
    hr {
        margin: 0 40px 35px 40px;
        border: 1px solid;
        background-color:#33A5FF;
        color:#33A5FF;
    }
    /* .item{
        line-height: 40px;
        padding-top: 10px;
    } */
    .itemData {
        display: flex;
    }
    .itemData+.itemData {
        margin-top: 15px;
    }
    .obj_name {
        width: 100%;
        text-align: left;
        margin-bottom: 10px;
        font-size: 16px;
        color: #53D4F9;
    }
    .colsedErrorMessage {
        border-radius: 3px;
    }
    .dj_qiliang {
        background: url(../../../../assets/btnBG/sb.png)no-repeat !important;
        background-size: 100% 100% !important;
        width: 92px !important;
        -webkit-box-shadow: 4px 5px 9px #0a1a2d;
        box-shadow: 4px 5px 9px #0a1a2d;
        display: inline-block;
        cursor: pointer;
        color: #fff;
        text-align: center;
    }
</style>
<style>
.ErrorMessageDialog .scrollDPartErrorMessage {
    height: 200px;
    overflow-y: scroll;
}
.ErrorMessageDialog .scrollDPartErrorMessage p {
    color: #ffffff;
    text-align: left;
    font-size: 16px;
    margin-top: 8px;
    margin-left: 50px;
}
.ErrorMessageDialog .el-dialog {
    /* overflow: auto; */
}
.deviation .endDates .el-form-item__error {
    padding-top: 13px;
}
.TailNumberArray .el-input {
    height: 100% !important;
}
.ErrorMessageDialog .el-dialog__footer {
    padding: 15px 20px 20px !important;
}
</style>

