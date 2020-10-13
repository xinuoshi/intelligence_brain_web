<template>
    <div>
        <api>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchName"
                @searchEvent="handlerSearchEvent"
                :typeIndex="typeIndex" :reSet="reSet" @resetover="reSetOver" ></SearchPage>
            <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" class="operation">
                 <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon"  :reFresh="reFresh" :buttonList = "buttonList2"  @update:button-list="val=>buttonList2 = val" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum" />
        </api>
    </div>
</template>

<script>
export default {
    name: "computerRoomManagement",
    components: {

    },
    data() {
        return {
            WireList: { ifshow: false, id: "", title: "线框配置", refesh: false },
            shuttleList: { ifshow: false, id: "", title: "" },
            buttonList2: [{
                title: "AI停用",
                plain: true,
                size: "mini",
                type: "primary",
                changTitle: 1,
                isAI: true,
                class: "erBtn",
                disabled: false
            },
            {
                title: "线框配置",
                plain: true,
                size: "mini",
                type: "primary"
            },
            {
                title: "事件配置",
                plain: true,
                size: "mini",
                type: "primary"
            }],
            // 按钮
            buttonList: [
                {
                    title: "批量事件配置",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "ifshowEvent:true"
                },
                {
                    title: "批量停用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:0",
                    class: "erBtn"
                },
                {
                    title: "批量启用",
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    functionKeyName: "stopItAll:1"
                }
            ],
            // 搜索传参
            searchName: [
                { searchPlaceholder: "资产大类", id: 1, url: "", type: 2, key: "intersectionRank" },
                { searchPlaceholder: "资产小类", id: 1, url: "", type: 2, key: "administerDepartmentName" },
                { searchPlaceholder: "设备编号/名", id: 1, url: "", type: 0, key: "equipmentType" }
            ],
            // 表格组件传参列表
            tableList: {
                thisPageSize: 10,
                getDataUrl: "machineRoom/",
                params: [],
                selection: "0", // 是否有选中框
                scope: "0", // 是否有操作栏
                width: "300", // 操作宽度
                index: "0", // 是否有序号
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    { tableName: "设备编号", tableProp: "equipmentNumber", hover: "flge" },
                    { tableName: "设备名", tableProp: "equipmentName" },
                    { tableName: "资产大类", tableProp: "parentName" },
                    { tableName: "资产小类", tableProp: "equipmentTypeName" },
                    { tableName: "点位编号",
                        tableProp: "intersectionName",
                        keyChange: { name: "intersectionId", keyName: "name", keyValue: "value" },
                        pand: [] },
                    { tableName: "管辖单位",
                        tableProp: "administerDepartmentName",
                        keyChange: { name: "administerDepartmentId", keyName: "name", keyValue: "value" },
                        pand: [{ name: "2", value: "津南支队" }] },
                    { tableName: "设备启用状态",
                        tableProp: "status",
                        keyChange: { keyName: "name", keyValue: "value" },
                        pand: this.$store.state.statusList
                    },
                    { tableName: "设备状态",
                        tableProp: "equipmentStatus",
                        keyChange: { keyName: "name", keyValue: "value" },
                        pand: this.$store.state.statusList
                    },
                    { tableName: "是否AI设备",
                        tableProp: "isAI",
                        keyChange: { keyName: "name", keyValue: "value" },
                        pand: this.$store.state.statusList
                    }
                ]
            },
            // 菜单权限
            columnHeadlines: "AI功能配置",
            // 搜索管理单位(全部)
            ManagementListNotdiscontinued: [],
            // 运维单位 建设单位
            OperationList: [],
            // 当前页
            pageNum: 1,
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            reSet: false, // 重置搜索状态值(仅在需要多页使用同一个路由的情况下使用)
            typeIndex: 0, // 切换菜单时传入对应行号(仅在需要多页使用同一个路由的情况下使用)
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false
        };
    },
    methods: {           
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        },
        operation(data) {
            let args = this.buttonList[data.Index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        ifshowEvent(item) {
            let idList = this.pLGetArry();
            if (item === "true") {
                if (idList.length === 0) {
                    this.$showSimpleMessage("未发现选中设备", "error");
                    return false;
                } else {
                    this.$set(this.shuttleList, "id", idList);
                }
            } else {
                this.$set(this.shuttleList, "id", item);
            }
            this.relationShip(this.shuttleList, true);
        },
        WireListEvent() {
            this.WireList.title = "线框配置";
            this.relationShip(this.WireList, true);
            setTimeout(() => {
                pagearea.load();
            }, 500);
        },
        submintButton() {
            this.relationShip(this.shuttleList, false);
        },
        WireButton() {
            this.relationShip(this.WireList, false);
        },
        // 弹窗显示和页面是否刷新的方法以及关系
        relationShip(item, isPan) {
            this.shuttleList.refesh = !isPan;
            item.ifshow = isPan;
            this.reFresh = !isPan;
        },
        reSetOver() {
            this.reSet = false;
        },
        paramsChange(item) {
            this.typeIndex = item;
            this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            this.reSet = true;
        },
        // 获取id集合
        pLGetArry() {
            let idAry = [];
            this.selectAry.forEach((value) => {
                idAry.push(value.id);
            });
            return idAry.toString();
        },
        // 表格操作变化
        selectArySlected(item) {
            if (item.id) {
                if (item.title !== "AI停用" && item.title !== "AI启用") {
                    if (item.title === "事件配置") {
                        this.ifshowEvent(item.id.id);
                    } else {
                        if (item.title === "线框配置") {
                            this.WireList.id = item.id;
                            this.WireListEvent();
                        }
                    }
                } else {
                    this.stopIt(item.id, item.title, item.index);
                }
            } else {
                this.selectAry = item;
            }
        },
        // 启、停用
        stopIt(id, name, index) {
            // if(name == "AI停用"){
            //     //执行启用
            //     axios.put("equipment/addon/stop/ai/", { id: id} ).then((res)=>{
            //         if(res.data.code === 0) {
            //             this.$refs.tableCommon.changetitle(index)
            //         }
            //     }).catch((error) => {
            //         this.$showSimpleMessage(error, "error");
            //     });
            // } else {
            //     //执行停用
            //     axios.put("equipment/addon/star/ai/",{ id: id} ).then().catch();
            // }
        },
        // 全部启、停用
        stopItAll(status) {
            // let states = status === 1 ? "停" : "启";
            // this.$layerNotice("提示", "您确定要批量" + states + "用吗？", () => {
            // let idAry = [];
            // let url = status === 1 ? "stop" : "start";
            // this.selectAry.forEach((value) => {
            //     if (value.status === status) {
            //         idAry.push(value.id);
            //     }
            // });
            // if (idAry.length === 0) {
            //     this.$showSimpleMessage("未发现可" + states + "用设备", "error");
            // }
            // axios.post("base/equipments/" + url, { id: idAry.toString() }).then(() => {
            //     this.$showSimpleMessage("批量" + states + "用成功", "success");
            // }).catch(this.defaultHttpHandler);
            // }, null, "warning");
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            this.payload = payload;
            this.tableList.params = this.payload;
            this.tableList.params.pageSize = this.tableList.thisPageSize;
        }
    },
    created() {
        // axios.get("/authority/roles/user", {params: {systemMenuName: this.columnHeadlines}}).then((res) => {
        //     let resData = res;
        //     for (let i = 0; i < resData.length; i++) {
        //         this.buttonData.push(resData[i].systemOperationTypeName);
        //     }
        // }).catch((err) => {
        //     this.$message.error(err);
        // });
    },
    mounted() {
        this.reSetOver();
        this.tableList.params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
    }
};
</script>
<style>
.equipmentChangeNameActive{
    background: #ccc !important;
}
</style>
