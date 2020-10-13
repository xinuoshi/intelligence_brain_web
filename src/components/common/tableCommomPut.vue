<template>
    <div>
        <div class="tableBox" v-if="buttonList.length !== 0">
            <el-table border :data="tableData" key="tableData" class="tems_table" style="width: 100%" @selection-change="tableSelect">
                <el-table-column type="selection" v-if="tableList.selection"  key="o_tab" />
                <el-table-column v-if="tableList.index" width="80" prop="index" label="序号" key="x_tab" />
                <!--  edited by brandy on 2020-07-31 不显示操作列
				<el-table-column v-if="tableList.scope === '0'" label="操作" :width="tableList.width?tableList.width:250"  key="c_tab">
                    <template slot-scope="scope">
                        <bt ref="bt" :buttonList="buttonList" :dataId="scope.row" @update:dataId="val=> scope.row === val" @operation="operation"></bt>
                    </template>
                </el-table-column> -->
                <div v-for="(items, index) in tableList.list" :key="index">
                    <el-table-column v-if="!items.hover && !items.tableButton" :prop="(items.tableProp) || '——'" :label="items.tableName" :width="items.width" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp"/>
                    <el-table-column v-if="items.hover && !items.tableButton" :prop="items.tableProp || '——'" :label="items.tableName" :width="items.width" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <p style="color: #fff">{{scope.row[items.tableProp]}}</p>
                                <div slot="reference" class="tems_popover">
                                    <el-tag class="roadNameInner" size="medium">{{scope.row[items.tableProp]}}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="items.tableButton && !items.hover" :label="items.tableName" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp" :width="items.width">
                        <template slot-scope="scope">
                            <el-popover :trigger=items.tableEvent placement="top">
                                <img src="../../../src/assets/static/loginLogo.png" />
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.tableButton }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </div>
            </el-table>
        </div>
        <div class="tableBox noneLast" v-if="buttonList.length === 0">
            <el-table border :data="tableData" key="tableData" class="tems_table" style="width: 100%" @selection-change="tableSelect">
                <el-table-column width="80" prop="index" label="序号" key="x_tab+'index'" />
                <el-table-column width="0" label="" />
                <div v-for="(items, i) in tableList.list" :key="i">
                    <el-table-column v-if="!items.hover && !items.tableButton" :prop="(items.tableProp) || '——'" :label="items.tableName" :width="items.width" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp"/>
                    <el-table-column v-if="items.hover && !items.tableButton" :prop="items.tableProp || '——'" :label="items.tableName" :width="items.width" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <p style="color: #fff">{{scope.row[items.tableProp]}}</p>
                                <div slot="reference" class="tems_popover">
                                    <el-tag class="roadNameInner" size="medium">{{scope.row[items.tableProp]}}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="items.tableButton && !items.hover" :label="items.tableName" :key="tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex :tableList.thisIndex ? items.tableProp+'_'+tableList.thisIndex : items.tableProp" :width="items.width">
                        <template slot-scope="scope">
                            <el-popover :trigger=items.tableEvent placement="top">
                                <img src="../../../src/assets/static/loginLogo.png" />
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.tableButton }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </div>
            </el-table>
        </div>
        <!-- <div v-if="tableData.length > 0" style="position: absolute;left: 50%;top: 36%;">暂无数据</div> -->
        <!-- 分页 -->
        <el-pagination v-if="!tableList.pagination" key="f_tab" class="cli-pagination" slot="tableList.params.currentPage" background @size-change="handleSizeChange" @current-change="currentPageAll" :current-page="tableList.params.currentPage" :pageNum-sizes="[10, 20, 30, 40, 100]" :page-size="this.tableList.params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allPageValue"></el-pagination>
    </div>
</template>

<script>
export default {
    name: "tableCommonPut",
    props: ["tableList", "reFresh", "buttonList"],
    components: {
    },
    model: {
        event: ["selectArySlected", "tablePageNum"]
    },
    data() {
        return {
            // 数据总数
            allPageValue: 0,
            changUrl: false,
            // 表格数据
            tableData: [],
            btData: "",
            list11: [{ "index": "1", "administrativeId": "咸水沽", "apprTime": "2018-10-16 16:39:40", "cameraId": "JN0006Q", "districtRegionId": "120112101", "file": "fileXXXXXX", "flag": "0", "incidentId": "ZFACFFYSIAPHX2WSLL05O65V7VE1BIAF", "incidentType": "交通事故", "latitude": 44.58, "longitude": 48.4, "originalFile": "originalXXXXXX", "popedomId": "a单位", "reliability": "89%", "roadRegionId": "4", "timeLength": 7.16238542476781, "videoAddr": "videoXXXXXX" }, { "index": "2", "administrativeId": "小站镇", "apprTime": "2018-10-16 16:39:20", "cameraId": "JN0006Q", "districtRegionId": "120112107", "file": "fileXXXXXX", "flag": "1", "incidentId": "CF6K3HZHWB1HAGRGSFLNW7DNK2YVU8RK", "incidentType": "不文明停车", "latitude": 127.88, "longitude": 253.95, "originalFile": "originalXXXXXX", "popedomId": "b单位", "reliability": "91%", "roadRegionId": "5", "shortCutFile": "XXXXXX", "timeLength": 8.402677073493084, "videoAddr": "videoXXXXXX" }, { "index": "3", "administrativeId": "北闸口镇", "apprTime": "2018-10-16 16:40:00", "cameraId": "JN0002Q", "districtRegionId": "120112104", "file": "fileXXXXXX", "flag": "1", "incidentId": "657DM6TT98GU0FTHVHF7LL9OAHTW759Z", "incidentType": "行人闯红灯", "latitude": 88.5, "longitude": 89.26, "originalFile": "originalXXXXXX", "popedomId": "c单位", "reliability": "79%", "roadRegionId": "2", "timeLength": 0.6086903674692834, "videoAddr": "videoXXXXXX" }]
        };
    },
    watch: {
        "reFresh": {
            // 监听是否刷新页面（比如编辑保存，创建保存，停用，启用）,变化出发函数重新获取表格数据
            handler: function (val, oldVal) {
                if (this.tableList.params.pageNum) {
                    this.tableList.params.currentPage = this.tableList.params.pageNum;
                    delete this.tableList.params.pageNum;
                }
                this.getPages();
            }
        },
        "tableList.params": {
            // 监听参数是否变化,变化出发函数重新获取表格数据
            handler: function (val, oldVal) {
                if (this.tableList.params.pageNum) {
                    this.tableList.params.currentPage = this.tableList.params.pageNum;
                    delete this.tableList.params.pageNum;
                }
                this.changUrl = false;
                // 传参notchangurl进行判断是否改变页面进行数据接口getPages不弹提示窗口"未查询到数据"，如果没有改变页面点击搜索会有提示窗口"未查询到数据"
                if (this.tableList.notchangurl !== undefined) {
                    let changurl = Object.keys(val).toString() === Object.keys(oldVal).toString();
                    this.changUrl = this.tableList.notchangurl && changurl;
                }
                this.getPages();
            }
        }
    },
    methods: {
        // 表格选中变化
        tableSelect(selection) {
            this.$emit("selectArySlected", selection);
        },
        // 切换条数
        handleSizeChange(item) {
            this.tableList.params.pageSize = item;
            this.$emit("tablePageNum", item);
            this.getPages();
        },
        // 切换分页
        currentPageAll(currentPage) {
            this.tableData=[];
            this.tableList.params.currentPage = currentPage;
            this.getPages();
        },
        // 处理数据看是否有数据
        getListValue() {
            let list = this.tableList.list;
            let noData = "——";
            for (let i = 0; i < this.tableData.length; i++) {
                let tableDataU = [];
                let data = this.tableData[i];
                // 如果表格现有数据返回数据中返回的是nan 或者undefined则显示暂无数据
                for (let key in Object.keys(data)) {
                    let name = Object.keys(data)[key];
                    data[name] = data[name] === "" ? noData : data[name];
                    tableDataU.push({ name: name });
                }
                // 如果表格现有的参数返回数据中根本没有则显示暂无数据
                for (let j = 0; j < list.length; j++) {
                    let name = list[j].tableProp;
                    let value = !tableDataU.find(t => t.name === name);
                    data[name] = value ? noData : data[name] === undefined ? noData : data[name] === null ? "——" : data[name];
                    let replace = list[j].replace;
                    if (replace && data[name] !== "——") {
                        data[name] = data[name] + replace;
                    }
                }
            }
        },
        // 切换中文或换算时间
        changDataList(data) {
            let list = this.tableList.list;
            for (let j = 0; j < list.length; j++) {
                for (let i = 0; i < data.length; i++) {
                    if (list[j].tableButton) {
                        this.tableData[i].tableButton = list[j].tableButton;
                    }
                    let prop = list[j].tableProp;
                    if (list[j].tableTime) {
                        let tableElement = this.tableData[i][prop];
                        if (tableElement !== "" && tableElement !== undefined && tableElement !== NaN) {
                            let panduan = Number(tableElement);
                            let formatDateTime = "";
                            let month = tableElement.substring(0, 4) + "-" + tableElement.substring(4, 6);
                            let day = month + "-" + tableElement.substring(6, 8);
                            let allTime = day + " " + tableElement.substring(8, 10) + ":" + tableElement.substring(10, 12) + ":" + tableElement.substring(12, 14);
                            switch (list[j].tableTime) {
                                case "day":
                                    formatDateTime = day;
                                    break;
                                case "month":
                                    formatDateTime = month;
                                    break;
                                default:
                                    formatDateTime = allTime;
                            }
                            let timesFormat = this.$filter.timesFormat(tableElement);
                            this.tableData[i][prop] = panduan ? formatDateTime : timesFormat;
                        } else {
                            this.tableData[i][prop] = "——";
                        }
                    }
                    let keyValue = list[j].keyChange;
                    if (keyValue) {
                        let key = keyValue.name ? keyValue.name : prop;
                        // 传接口
                        if (keyValue.url !== ("" || undefined)) {
                            axios.get(keyValue.url).then((res) => {
                                list[j].pand === res.data.data;
                            }).catch((error) => {
                                this.$showSimpleMessage(error, "error");
                            });
                        }
                        let value = list[j].pand;
                        if (value) {
                            for (let k = 0; k < value.length; k++) {
                                let dataKey = data[i][key];
                                let valueName = value[k][keyValue.keyName];
                                let data0 = this.$filter.stringEvent(dataKey);
                                let data1 = this.$filter.intEvent(dataKey);
                                let valueName0 = this.$filter.stringEvent(valueName);
                                let valueName1 = this.$filter.intEvent(valueName);
                                let pand = (valueName0 === data0 || valueName1 === data1);
                                this.tableData[i][prop] = pand ? value[k][keyValue.keyValue] : this.tableData[i][prop];
                            }
                        }
                        let getUrl = list[j].url;
                        if (getUrl) {
                            axios.get(getUrl).then((res) => {
                                let value = res.data.data;
                                if (value) {
                                    for (let k = 0; k < value.length; k++) {
                                        let dataKey = data[i][key];
                                        let valueName = value[k][keyValue.keyName];
                                        let data0 = this.$filter.stringEvent(dataKey);
                                        let data1 = this.$filter.intEvent(dataKey);
                                        let valueName0 = this.$filter.stringEvent(valueName);
                                        let valueName1 = this.$filter.intEvent(valueName);
                                        let pand = (valueName0 === data0 && valueName1 === data1);
                                        this.tableData[i][prop] = pand ? value[k][keyValue.keyValue] : this.tableData[i][prop];
                                    }
                                }
                            }).catch((error) => {
                                this.$showSimpleMessage(error, "error");
                            });
                        }
                    }
                }
            }
            this.getListValue();
        },
        // 获取内容
        getPages() {
            if (this.tableList.getDataUrl !== "") {
                this.tableData = [];
                axios.post(this.tableList.getDataUrl, this.tableList.params).then((res) => {
                    let resArry = res.data.data.list;
                this.tableData = [];
                    this.allPageValue = 0;
                    if (resArry) {
                        let length = resArry.length === 0 ? 0 : (resArry[resArry.length - 1].recordCount === 0 || resArry[resArry.length - 1].recordCount) ? resArry.length - 1 : resArry.length;
                        if (this.tableList.notchangurl !== undefined || length === 0) {
                            if (this.changUrl === true && length === 0) {
                                this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                                 return;
                            }
                            if (this.tableList.notchangurl === true && length === 0) {
                                this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                                return;
                            }
                        } else {
                            if (length === 0) {
                                this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                                return;
                            }
                        }
                        if (res.data.pageData) {
                            this.allPageValue = res.data.pageData.recordCount;
                        } else {
                            this.allPageValue = resArry[resArry.length - 1].recordCount;
                        }
                        this.tableData = [];
                        for (let i = 0; i < length; i++) {
                            let k = (i + 1) + this.tableList.params.pageSize * (this.tableList.params.currentPage - 1);
                            resArry[i].index = k;
                            this.tableData.push(resArry[i]);
                        }
                        for (let i in this.tableData) {
                            if (this.tableData[i].controlStatus !== undefined) {
                                if (!this.tableData[i].isAI) {
                                    this.tableData[i].isAI = 0;
                                }
                            }
                        }
                        this.changDataList(this.tableData);
                    } else {
                        let reg = RegExp("For input string");
                        if (reg.test(res.data.message)) {
                            this.$showSimpleMessage("数据填写不合理", "error");
                            return;
                        }
                        if (this.tableList.notchangurl !== undefined) {
                            if (this.changUrl === true) {
                                this.$showSimpleMessage(res.data.message, "error");
                                return;
                            }
                        } else {
                            // 判断返回值是否为undefined
                            if(resArry === undefined){
                                this.$showSimpleMessage(res.data.message, "error");
                                return;
                            }
                        }
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            } else {
                let canshu = this.tableList.params;
                if (canshu.administrativeId === undefined) {
                    this.tableData = this.list11;
                } else {
                    let jihe = []
                    for (let i = 0; i < this.list11.length; i++) {
                        if (this.list11[i].administrativeId === canshu.administrativeId) {
                            jihe.push(this.list11[i])
                        }
                    }
                    this.tableData = jihe;
                }
                /*this.tableData = this.list11;*/
                this.changDataList(this.tableData);
                this.allPageValue = this.tableData.length;
            }
        },
        /**
         * 对应的按钮的操作
         * settimeout里面的函数在执行完相应的操作后执行即可，
         * 如果不需要进行截流，可以不执行ref相关操作
         * 使用截流时，传参必须带有loading
         */
        operation(data) {
            this.$emit("selectArySlected", data);
        }
    },
    created() {
    },
    mounted() {
        this.allPageValue = this.tableData.length;
        // this.getPages();
    }
};
</script>
