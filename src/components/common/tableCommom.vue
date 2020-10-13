<template>
    <div>
        <div class="tableBox">
            <el-table :span-method="arraySpanMethod" border :data="tableData" key="tableData" class="tems_table" style="width: 100%" @selection-change="tableSelect">
                <el-table-column  type="selection" v-if="tableList.selection" key="o_tab" />
                <el-table-column v-if="tableList.index" width="80" prop="index" label="序号" key="x_tab" />
                <el-table-column v-if="tableList.scope === '0'" label="操作" :width="tableList.width || 250" key="c_tab"  >
                    <template slot-scope="scope">
                        <!-- <div class="tems_TableButton" @click="editDirect(scope.row.id, '查看')">查看</div>
                        <div class="tems_TableButton" @click="editDirect(scope.row.id, '编辑')">编辑</div>
                        <div :class="scope.row.status === 0 ? 'tems_TableButton':'tems_TableErrorButton'" @click="stopIt(scope.row)">{{scope.row.status === 0 ? "启用":"停用"}}</div> -->
                        <bt ref="bt" :buttonList="buttonList" :dataId="scope.row" @update:dataId="val=> scope.row === val" @operation="operation"></bt>
                    </template>
                </el-table-column>
                <div v-for="(items, index) in tableList.list" :key="items.id" >
                    <el-table-column v-if="!items.hover" :prop="(items.tableProp)" :label="items.tableName" :width="items.width" :key="items.tableProp">
                    </el-table-column>
                    <el-table-column v-else :prop="items.tableProp" :label="items.tableName"  :width="items.width"  :key="items.tableProp">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <p style="color: #fff">{{scope.row[items.tableProp]}}</p>
                                <div slot="reference" class="tems_popover">
                                    <el-tag class="roadNameInner" size="medium">{{scope.row[items.tableProp]}}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </div>
            </el-table>
        </div>
        <!-- <div v-if="tableData.length > 0" style="position: absolute;left: 50%;top: 36%;">暂无数据</div> -->
        <!-- 分页 -->
        <el-pagination v-if="!tableList.pagination" key="f_tab" class="cli-pagination" slot="tableList.params.pageNum" background  @size-change="handleSizeChange" @current-change="currentPageAll"  :current-page="tableList.params.pageNum" :pageNum-sizes="[10, 20, 30, 40, 100]" :page-size="this.tableList.params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="allPageValue"></el-pagination>

    </div>
</template>

<script>
export default {
    name: "tableCommon",
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
            // 表格数据
            // tableData: [],
            tableData: [],
            btData: "",
            list11: [{
                incidentId: 213123213,
                incidentType: 22,
                startTime: 22,
                endTime: 22,
                incidentLevel: 22,
                address: 22,
                popedomId: 22,
                administrativeId: 22,
                remark: 0
            },
                {
                    incidentId: 213123213,
                    incidentType: 22,
                    startTime: 22,
                    endTime: 22,
                    incidentLevel: 22,
                    address: 22,
                    popedomId: 22,
                    administrativeId: 22,
                    remark: 1
                }]
        };
    },
    watch: {
        "reFresh": {
            // 监听是否刷新页面（比如编辑保存，创建保存，停用，启用）,变化出发函数重新获取表格数据
            handler: function(val, oldVal) {
                let resture = 1
                this.getPages(resture);
            }
        },
        "tableList.params": {
            // 监听参数是否变化,变化出发函数重新获取表格数据
            handler: function(val, oldVal) {
                this.getPages();
            }
        },
        "tableList.pagination":function(val) {
            if(val) {
                this.tableList.params.pageNum = 1;
            }
        }
    },
    methods: {
        // 表格移动
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        },
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
        currentPageAll(pageNum) {
            this.tableList.params.pageNum = pageNum;
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
                let prop = list[j].tableProp;
                if (list[j].tableTime) {
                    for (let i = 0; i < data.length; i++) {
                        let tableElement = this.tableData[i][prop];
                        if (tableElement !== "" && tableElement !== undefined && tableElement !== NaN) {
                            let panduan = Number(tableElement);
                            let formatDateTime = "";
                            switch (list[j].tableTime) {
                                case "day":
                                    formatDateTime = this.$filter.formatDateTimeDay(tableElement);
                                break;
                                case "month":
                                    formatDateTime = this.$filter.formatDateTimeMonth(tableElement);
                                break;
                                default:
                                    formatDateTime = this.$filter.formatDateTime(tableElement);
                            }                          
                            let timesFormat = this.$filter.timesFormat(tableElement);
                            this.tableData[i][prop] = panduan ? formatDateTime : timesFormat;
                        } else {
                            this.tableData[i][prop] = "";
                        }
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
                            let mes = this.$store.state.codeStatus.find(t=>t.code === error).name;
                            this.$showSimpleMessage(mes ? mes : error, "error");
                        });
                    }                    
                    let value = list[j].pand;
                    if (value) {
                        for (let k = 0; k < value.length; k++) {
                            for (let i = 0; i < data.length; i++) {
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
                    }
                    let getUrl = list[j].url;
                    if (getUrl) {
                        axios.get(getUrl).then((res) => {
                            let value = res.data.data;
                            if (value) {
                                for (let k = 0; k < value.length; k++) {
                                    for (let i = 0; i < data.length; i++) {
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
                            }
                        }).catch((error) => {
                            let mes = this.$store.state.codeStatus.find(t=>t.code === error).name;
                            this.$showSimpleMessage(mes ? mes : error, "error");
                        });
                    }
                } 
            }
            this.getListValue();
        },
        // 获取内容
        getPages(resture) {
            if (this.tableList.getDataUrl !== "") {
              axios
                .get(this.tableList.getDataUrl, { params: this.tableList.params })
                .then((res) => {
                    let code = res.data.code;
                    if (code !== 0) {
                        let mes = this.$store.state.codeStatus.find(t=>t.code === code).name;
                        this.$showSimpleMessage(mes ? mes : code, "error");
                    }
                    let resArry = res.data.data;
                    if (resArry.list) {
                        this.tableData = [];
                        this.tableData = resArry.list;
                        for (let i = 0; i < resArry.list.length; i++) {
                            this.tableData[i].index = (i + 1) + this.tableList.params.pageSize * (this.tableList.params.pageNum - 1);
                        }
                        for (let i in this.tableData) {
                            if (this.tableData[i].controlStatus !== undefined) {
                                if (!this.tableData[i].isAI) {
                                    this.tableData[i].isAI = 0;
                                }
                            }
                        }
                        this.allPageValue = resArry.total;
                        let changurl = Object.keys(this.tableList.params);
                        let changurlLength = 0;
                        for (let d in changurl) {
                            if (this.tableList.params[changurl[d]] !== undefined) {
                                changurlLength++
                            }
                        }
                        if (resArry.total === 0 && changurlLength > 2 && resture !== 1) {
                            this.$showSimpleMessage("抱歉，未查询到匹配数据", "error");
                            bb ={};
                        }
                        this.changDataList(this.tableData);
                    } else {
                        this.tableData = [];
                    }
                }).catch((error) => {
                    let mes = this.$store.state.codeStatus.find(t=>t.code === error).name;
                    this.$showSimpleMessage(mes ? mes : error, "error");
                });
            } else {
                this.tableData = this.list11;
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
