<template>
    <div>
        <api>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchName"
                @searchEvent="handlerSearchEvent" >
            </SearchPage>
            <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" class="operation">
                <bt ref="bt" :buttonList="buttonList1" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon" :buttonList="buttonList2" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList" @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
        <!-- 创建和编辑查看弹窗 -->
        <el-dialog :close-on-press-escape="false" :title="dialogList.title" v-dialogDrag :show-close="true" @close="closeDialog('formValidate')"
                   :visible.sync="dialogVisible" class="tems_dialog assetLibaray" width="700px" :close-on-click-modal="false">
            <div class="scrollPart" id="scrollDPart">
                <el-form :model="formValidate" ref="formValidate"
                         label-width="140px" class="demo-ruleForm">
                    <div class="infoItemInfo" style="text-align: left;color: #25d7fd;">
                        <el-form-item class="infoItem" label="序号：">
                            <div class="form_data">{{this.dialogList.index}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="组件编号：">
                            <div class="form_data">{{this.dialogList.number}}</div>
                        </el-form-item>
                        <!-- <el-form-item class="infoItem" label="组件使用类型：">
                            <div class="form_data">{{this.dialogList.useType}}</div>
                        </el-form-item> -->
                        <el-form-item class="infoItem" label="组件类型：">
                            <div class="form_data">{{this.dialogList.codeName}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="组件名称：">
                            <div class="form_data">{{this.dialogList.name}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="设备名称：">
                            <div class="form_data">{{this.dialogList.equipmentNames}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="设备类型：">
                            <div class="form_data">{{this.dialogList.equipmentTypeName}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="品牌：">
                            <div class="form_data">{{this.dialogList.tradeMark}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="供应商：">
                            <div class="form_data">{{this.dialogList.supplierName}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="保修期：">
                            <div class="form_data">{{this.dialogList.warrantyPeriod}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="使用寿命：">
                            <div class="form_data">{{this.dialogList.serviceLife}}</div>
                        </el-form-item>
                        <el-form-item class="infoItem" label="建设日期：">
                            <div class="form_data">{{this.dialogList.buildTime}}</div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="dialogList.title === '详情'" class="tems_Button inportBtn log_close" @click="dialogVisible = false">关闭</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "assetDictionary",
    components: {
    },
    data() {
        return {
            // 搜索传参
            searchName: [
                // { searchPlaceholder: "组件使用类型", id: 1, type: 1, url: "", Sendkey: "useType", data: [{ id: 0, name: "共用" }, { id: 1, name: "非共用" }] },
                { searchPlaceholder: "组件类型", id: "codeName", type: 6, url: "/subassembly/", Sendkey: "codeName", getDataKey: "codeName" },
                { searchPlaceholder: "组件名称", id: "name", type: 6, url: "/subassembly/", Sendkey: "name", getDataKey: "name" },
                { searchPlaceholder: "设备类型", id: 1, type: 1, url: "", Sendkey: "equipmentType", data: [] },
                { searchPlaceholder: "设备名称", id: "id", type: 2, url: "equipment/?status=1", Sendkey: "equipmentIds", getDataKey: "equipmentName" },
                { searchPlaceholder: "点位信息", id: "id", type: 2, url: "intersection/?status=1", Sendkey: "intersectionIds", getDataKey: "intersectionName" }
            ],
            // 表格组件传参列表
            tableList: {
                thisPageSize: 10,
                getDataUrl: "subassembly/",
                params: [],
                selection: false, // 是否有选中框
                scope: "0", // 是否有操作栏
                width: "100", // 操作宽度
                index: true, // 是否有序号
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    // { tableName: "序号", tableProp: "index", hover: true },
                    { tableName: "组件编号", tableProp: "number", hover: true,width:250 },
                    // { tableName: "组件使用类型", tableProp: "useType" },
                    { tableName: "组件类型", tableProp: "codeName" },
                    { tableName: "组件名称", tableProp: "name" },
                    { tableName: "设备名称", tableProp: "equipmentNames" },
                    // { tableName: "所属设备类型", tableProp: "equipmentTypeName" },
                    { tableName: "品牌", tableProp: "tradeMark" },
                    { tableName: "供应商", tableProp: "supplierName" },
                    { tableName: "建设日期", tableProp: "buildTime",width:150, tableTime: "day" }
                    /* { tableName: "供应商", tableProp: "supplierId",
                        keyChange: { keyName: "id", keyValue: "companyName" },
                        url: "supplier/"
                    }, */
                ]
            },
            // 按钮
            buttonList1: [{
                title: "导出",
                plain: true,
                type: "primary",
                size: "small",
                class: "qiliang",
                functionKeyName: "exportExcle"
            }],
            buttonList2: [{
                title: "查看",
                plain: true,
                size: "mini",
                type: "primary",
                disabled: false
            }],
            // 弹窗显示内容
            dialogList: {
                title: "",
                index: "",
                number: "",
                useType: "",
                codeName: "",
                userId: "",
                username: "",
                name: "",
                equipmentNames: "",
                equipmentTypeName: "",
                tradeMark: "",
                supplierName: "",
                warrantyPeriod: "",
                serviceLife: "",
                buildTime: ""
            },
            // 弹窗表单
            formValidate: {},
            // 弹窗显隐
            dialogVisible: false,
            // 供应商列表
            supplierList: [],
            // 当前页
            pageNum: 1,
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false,
            // 判断搜索回传的参数是否全是空的默认是全空
            Ifpayload: false
        };
    },
    methods: {               
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            this.payload = payload;
            this.tableList.params = this.payload;
            this.tableList.params.pageSize = this.tableList.thisPageSize;
        },
        // 判断是否有搜索参数
        Isreference(payload) {
            Object.keys(payload).map(t => {
                if (t !== "pageNum" && t !== "pageSize") {
                    if (payload[t] !== undefined && payload[t] !== null && payload[t] !== "") {
                        this.Ifpayload = true; // 有一个参数不是空就调用搜索否则获取全部数据
                    }
                }
            });
        },
        // 导出操作
        operation() {
            this.Isreference(this.payload);
            let data = "?";
            if (this.Ifpayload) {
                Object.keys(this.payload).map(m => {
                    if (this.payload[m] !== undefined && this.payload[m] !== null && this.payload[m] !== "") {
                        data = `${data}${m}=${this.payload[m]}&`;
                    }
                });
            }
            this.$layerNotice("提示", "您确定要导出吗？", () => {
                window.location.href = this.Ifpayload ? `/wit_harns_service/subassembly/export/${data}` : "/wit_harns_service/subassembly/export/";
                this.Ifpayload = false;
            }, null, "warning");
        },
        // 表格操作变化
        selectArySlected(item) {
            if (item.id.type === "查看") {
                this.openDialog(item);
            } else {
                this.openDialog(item);
            }
        },
        // 打开弹窗
        openDialog(data) {
            this.dialogList.title = "详情";
            this.dialogList.index = data.id.index;
            this.dialogList.number = data.id.number;
            this.dialogList.useType = data.id.useType;
            this.dialogList.codeName = data.id.codeName;
            this.dialogList.userId = data.id.userId;
            this.dialogList.username = data.id.username;
            this.dialogList.name = data.id.name;
            this.dialogList.equipmentNames = data.id.equipmentNames;
            this.dialogList.equipmentTypeName = data.id.equipmentTypeName;
            this.dialogList.tradeMark = data.id.tradeMark;
            this.dialogList.supplierName = data.id.supplierName;
            this.dialogList.warrantyPeriod = data.id.warrantyPeriod;
            this.dialogList.serviceLife = data.id.serviceLife;
            this.dialogList.buildTime = data.id.buildTime;
            this.dialogVisible = true;
        },
        // 关闭弹窗
        closeDialog(formName) {
            this.$refs[formName].resetFields();
            this.formValidate = {};
            this.dialogVisible = false;// 创建编辑弹窗隐藏
        }
    },
    created() {
        this.$store.state.equipmentType.forEach((e) => {
            if (e.id !== "000002-1" && e.id !== "000007-1" && e.id !== "000007-2" && e.id !== "000006-1" && e.id !== "000006-2" && e.id !== "000006-3" && e.id !== "000006-4") {
                this.searchName[2].data.push(e);
            }
        });
    },
    mounted() {
        this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
    }
};
</script>

<style>
</style>

<style scoped>
/* .flexNum{
    text-align: center
} */
.form_data {
    text-align: left !important;
    text-align-last: left !important;
}
</style>
