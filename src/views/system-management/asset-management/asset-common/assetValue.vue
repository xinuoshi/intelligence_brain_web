<template>

    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false" :title="SeeList.beforeTitle + SeeList.equipmentTypeList.name" v-dialogDrag  :visible.sync="SeeList.EditDialog" class="tems_dialog"  width="1200px" :close-on-click-modal="false">
        <div class="scrollPart">
            <div v-for="(item, index) in formValidate" :key="index" >
                <div class="titleBottom" style="padding-left:15px" v-for = "(items, index) in item" :key="index" v-if="items.name === 'title'">
                    {{items.key}}
                </div>
                <el-row :gutter="24">
                    <el-col :span="8" v-for = "(items, index) in item" :key="index" v-if="items.name !== 'title'">
                        <span class="keySee">{{items.key}}：</span>
                        <span class="valueSee">{{items.value}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum">
                <div class="tems_Button tems_errorButton" @click="closeDialogData('formValidateEmpty')">关 闭</div>
            </div>
        </div>
    </el-dialog>
</template>
<script>

export default {
    name: "AssetValue",
    props: ["SeeList"],
    model: {
        event: "submitButton"
    },
    data() {
        return {
            // 通讯状态：
            laneList: [],
            // 机房列表
            serialNumberList: [],
            // 信号灯类型
            signalTypeList: [],
            // 服务设备类型
            manageDeviceTypeList: [],
            // 方向
            DetectionList: [],
            // 创建编辑内容
            formValidate: {},
            // 单位列表
            ManagementList: [],
            // 点位列表
            intersectionsList: [],
            // 供应商列表
            suppliersList: {},
            // 数据对应表
            dataListALL: [
                // 设备信息
                { key: "设备信息", name: "title" },
                { key: "设备ID", name: "equipmentType" },
                { key: "检测方向", name: "detectionDirectionId" },
                { key: "设备名称", name: "equipmentName" },
                { key: "设备编号", name: "equipmentNumber" },
                { key: "点位名称", name: "intersectionName" },
                { key: "点位编号", name: "intersectionId" },
                { key: "管辖单位", name: "administerDepartmentId" },
                { key: "经度", name: "longitude" },
                { key: "纬度", name: "latitude" },
                { key: "设备状态", name: "kong" },
                // 安装信息
                { key: "安装信息", name: "title" },
                { key: "品牌", name: "tradeMark" },
                { key: "型号", name: "model" },
                { key: "供应商", name: "supplierId" },
                { key: "建设单位", name: "constructionDepartmentId" },
                { key: "出厂日期", name: "manufactureInteger" },
                { key: "建设日期", name: "constructionTime" },
                { key: "保修期", name: "warrantyPeriod" },
                { key: "使用寿命", name: "serviceLife" },
                // 不公共（配置信息）
                { key: "建设信息", name: "title" },
                { key: "有无交换机", name: "haveSwitches" },
                { key: "MAC地址", name: "macAddress" },
                { key: "链路类型", name: "linkType" },
                { key: "网络配置", name: "kong" },
                { key: "逻辑框版本号", name: "logicalBoxVersionNumber" },
                { key: "逻辑框类型", name: "logicalBoxType" },
                { key: "灯头数量", name: "lampNumber" },
                { key: "信号灯类型", name: "signalType" },
                { key: "交换机序列号", name: "switchSerialNumber" },
                { key: "供电方式", name: "powerSupplyMode" },
                { key: "太阳能序列号", name: "solarSerialNumber" },
                { key: "地磁单元数量", name: "geomagneticDetectionUnitsNumber" },
                { key: "埋设时间", name: "kong" },
                { key: "采集中心IP", name: "acquisitionCenterIp" },
                { key: "AP-ID", name: "kong" },
                { key: "控制主机的IP", name: "kong" },
                { key: "RTSP视频地址", name: "kong" },
                { key: "相机角度", name: "kong" },
                { key: "功能", name: "kong" }
            ]
        };
    },
    methods: {
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要关闭吗？", () => {
                this.$emit("submitButton");
            }, null, "warning");
        },
        // 处理数据看是否有数据
        getListValue(data) {
            // data.intersectionName = this.intersectionsList.find(t => t.districtId === this.formValidate.intersectionId).name;
            // data.supplierId = this.suppliersList.find(t => t.id === data.supplierId).companyName;
            let noData = "暂无数据";
            let tableDataU = [];
            // 如果表格现有数据返回数据中返回的是nan 或者undefined则显示暂无数据
            for (let i = 0; i < this.dataListALL.length; i++) {
                if (this.dataListALL[i].name === "title") {
                    tableDataU.push(
                        {
                            key: this.dataListALL[i].key,
                            name: this.dataListALL[i].name
                        }
                    );
                }
                for (let key in Object.keys(data)) {
                    let name = Object.keys(data)[key];
                    if (this.dataListALL[i].name === name) {
                        console.log(data[name]);
                        // data[name] = data[name] === (null && "" && undefined) ? noData : data[name];
                        if (data[name]) {
                            tableDataU.push(
                                {
                                    name: name,
                                    value: data[name],
                                    key: this.dataListALL[i].key
                                }
                            );
                        }
                    }
                }
            }
            let tableData = [];
            let SpanLength = 3;
            let k = parseInt(tableDataU.length / SpanLength);
            for (let j = 0; j < (k + 1); j++) {
                let tableDataK = [];
                let judgeParth = (j * SpanLength);
                let judge = tableDataU.length - judgeParth;
                judge = (judge > 0) && (judge < SpanLength);
                let small = judge ? judgeParth : judgeParth;
                let large = judge ? tableDataU.length : judgeParth + SpanLength;
                for (let i = small; i < large; i++) {
                    tableDataK.push(tableDataU[i]);
                }
                tableData.push(tableDataK);
            }
            this.formValidate = tableData;
        },
        // 打开查看获取数据
        editDirect(val) {
            // 编辑组件信息行加载
            axios.get("equipment/" + val).then((res) => {
                let resArry = res.data.data;
                if (res.data.data !== undefined) {
                    this.getListValue(resArry);
                }
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 获取列表
        getAxios(element, val) {
            axios.get(val).then((res) => {
                let getUnitList = res.data.data;
                for (let i = 0; i < getUnitList.length; i++) {
                    let data = getUnitList[i];
                    for (let key in Object.keys(data)) {
                        let name = Object.keys(data)[key];
                        let value = data[name];
                        if (value === null || value === undefined) {
                            data[name] = "无数据";
                        }
                    }
                    this.$set(element, i, getUnitList[i]);
                }
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        },
        // 获取数据列表
        getUnitList() {
            this.getAxios(this.intersectionsList, "intersection/?status=1"); // 点位列表
            this.getAxios(this.suppliersList, "supplier/?status=1"); // 供应商列表
            this.getAxios(this.manageDeviceTypeList, "service/code/?status=1"); // 服务器设备列表
            this.getAxios(this.ManagementList, "syndept/?status=1"); // 单位列表
            this.getAxios(this.DetectionList, "road/section/?status=1"); // 检测方向
            this.getAxios(this.serialNumberList, "machineRoom/?status=1"); // 机房列表
            if (this.SeeList.RowId !== "") {
                this.editDirect(this.SeeList.RowId);
            }
        }
    },
    watch: {
        "SeeList.RowId": function(val) {
            this.getUnitList();
        },
        "SeeList.EditDialog": function(val) {
            if (val) {
                this.getUnitList();
            }
        },
        "SeeList.equipmentTypeList.id": function(val, old) {
            // this.arryId.classA = (val === "000002-1");
            // this.arryId.classE = (!!((val === "000006-1" || val === "000006-2" || val === "000006-3")));
            // this.arryId.classB = (!!((val === "000007-1" || val === "000007-2" || val === "000007-3" || val === "000007-4")));
            // this.arryId.classC = (!!((val === "000004-1" || val === "000004-2" || val === "000004-3" || val === "000004-4")));
        }
    }
};
</script>
<style>
.el-col-8 {
    line-height: 40px;
    color: #fff;
    height: 40px;
    text-align: left;
}
.el-row {
    width: 100%;  
    text-align: right;
}
.keySee,.valueSee{
    width: 27%;
    display: inline-block;
    text-align: right;
}
.valueSee{
      width: 70%;
    text-align: left;
    margin-left: 3%;
}
</style>
