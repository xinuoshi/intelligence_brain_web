/*
 * @Author: Eco.dujun
 * @Date: 2018-09-04 09:36:06
 * @Last Modified by: Eco.dujun
 * @Last Modified time: 2018-10-16 13:05:31
 */
<template>
    <div>
        <SearchModal ref="searchModal" v-for="(item,index) in searchName" :key="index" v-model="resultArr[index]" :searchData="item"
            :typeIndex="typeIndex" @initialComponentover="initialComponentOver"></SearchModal>
        <div>
            <el-button class="qiliang" style="width: 50px;height: 30px;padding: 0;" @click="search">
                查询
            </el-button>
        </div>
    </div>
</template>

<script>
import SearchModal from "./SearchModal";

export default {
    /*
        searchName参数格式：
        searchName: [
            {searchPlaceholder: "单位名称", id: "",  type: 0, url: "xxxx/xxx/xx接口链接", Sendkey: "name", getDataKey: "parentName", data: ""},
            {searchPlaceholder: "单位状态", id: "", type: 1, url: "", Sendkey: "status", data: [{id: 0, name: "正常"}, {id: 1, name: "异常"}]},
            {searchPlaceholder: "时间", id: "", type: 3, url: "", Sendkey: "startTime", data: "", time: "", overToday: true/false},
            {searchPlaceholder: "至", id: "", type: 4, url: "", Sendkey: "endTime", data: "", time: "", overToday: true/false},
            { searchPlaceholder: "选择时间", type: 5, Sendkey: "timeData", time: ["2018-09-11 11:11:11", "2018-10-01 12:00:00"], overToday: true/false },
        ],
        searchPlaceholder: 搜索名称
        id: 在data为空，url不为空下，id必须写值，值为从url获取的数据中的对应id的字段名，做重新拼凑数据使用，url为空有默认data时这个可以省略不写
        type: 搜索框类型---- 0：普通输入框 ----- 1：通用下拉框第一种类型，此种类型下需要默认传入
            data：下拉数据源，格式使用{id: xx, name: xx}，不需要传入url，写成url: "" 就行或者不写
            ----2：通用下拉框第二种类型不需要默认传入data 写成data: ""就行或者不写，但是需传入url：通过接口请求下拉数据源
            ----3,4：搭配使用（单个使用也可以），时间搜索集合，url和data都不需要传入可以省略，如果时间选择默认需要显示初始值，直接传入time: "xxxx"，不需要就写成空但不能不写，我需要做一些判断
            其他的一样
            ----5：时间选择(带时分秒的选择)，url和data都不需要传入可以省略，如果时间选择默认需要显示初始值，Sendkey: "timeData" 默认传这个不要改直接写这个就行
                直接传入如time: ["2018-09-01-01 11:11:11", "2018-10-01-01 11:11:11"]，不需要就写成空但不能不写，我需要做一些判断
        Sendkey: 当前使用的搜索框类型的关键字，后台接受什么名字就写什么名字，
        getDataKey: 在url不为空，data的情况下必须写值，值与上面的id一个性质，从url获取数据后对应显示的文字的字段名称，做重新拼凑数据使用，其他情况下这个可以省略不写
        overToday: 表示选择是否可以超过今天，true为可以，不可以的话可以传false也可以不写这个参数

        {searchPlaceholder: "车辆数量", type: 0, Sendkey: "car1", Combinatorialname: ["car1", "car2"], fillNum: true},
        {searchPlaceholder: "至", type: 0, Sendkey: "car2", Combinatorialname: ["car1", "car2"], fillNum: true}
        联合判断输入是否为数字，自带组合判断数字范围
        Combinatorialname: ["car1", "car2"] --组合判断的两条数据的Sendkey，不需要组合判断可以不传参
        fillNum: true --是否只能填写数字true为只能填写数字，false的话可以不传

        注：1，searchName里得每一条对象对应一个搜索框即搜索条件
            2，time字段只是在使用时间搜索框时写，并且没有默认值时也得写成time: "",使用其他类型的输入框或者下拉框时time不要写，不能写
            3，搜索的搜索下拉框均带有模糊搜索匹配项的功能

    */
    name: "searchPage",
    props: ["searchName", "pageNum", "perPage", "typeIndex", "reSet", "initialComponent"],
    components: {
        SearchModal
    },
    data() {
        return {
            timedata: this.$filter.timesFormat(new Date()),
            titleData: this.title,
            numRegular: "",
            resultArr: [] // 绑定子组件每一个输入框或者下拉框的数据
        };
    },
    watch: {
        "resultArr": {
            handler: function(val, oldVal) {
                // 判定数字和范围
                // this.determineNumberAndRange();
                // 判定时间正确性
                let OBJarr = this.judgmentTime();
                let obj = OBJarr[0]; let Keys = OBJarr[1];
                let currentTime = this.$filter.timesFormat(new Date()); // 当前时间
                this.decisionTime(obj, Keys, currentTime, val); // 直接判定选择的时间是否正确(包含带时分秒选择框的真确性)
                if (obj.hasOwnProperty("startTime") && obj.hasOwnProperty("endTime")) {
                    this.judgementStartTime(obj, Keys, val, "startTime", "endTime"); // 开始结束时间结合判定
                }
                if (obj.hasOwnProperty("illegalTimeStart") && obj.hasOwnProperty("illegalTimeEnd")) {
                    this.judgementStartTime(obj, Keys, val, "illegalTimeStart", "illegalTimeEnd"); // 开始结束时间结合判定数据检索页单独判断
                }
                if (obj.hasOwnProperty("accidentTimeStart") && obj.hasOwnProperty("accidentTimeEnd")) {
                    this.judgementStartTime(obj, Keys, val, "accidentTimeStart", "accidentTimeEnd"); // 开始结束时间结合判定数据检索页单独判断
                }
                if (obj.hasOwnProperty("incidentStart1") && obj.hasOwnProperty("incidentStart2")) {
                    this.judgementStartTimel(obj, val); // 开始结束时间结合判定
                }
            }
        },
        "reSet": function(val, old) {
            if (val === true) {
                this.resultArr = [];
                this.$emit("resetover");
            }
        },
        "initialComponent": {
            immediate: true,
            handler: function(val, old) {
                if (val === true) {
                    this.resultArr = [];
                    this.initialComponentOver();
                }
            }
        }
    },
    methods: {
        getTableData(payload) {
            // axios.get(this.getDataUrl, { params: payload }).then((res) => {
            //     this.$emit("searchEvent", res);
            // }).catch((error) => {
            //     this.$message.error(error.message);
            // });
            let SearchKey = this.searchName;
            SearchKey.map(t => {
                if (t.hasOwnProperty("time")) {
                    payload[t.Sendkey] = payload[t.Sendkey] ? this.$filter.timesFormat(payload[t.Sendkey]) : undefined;
                }
            });
            if (payload.hasOwnProperty("startTime")) {
                payload.startTime = payload.startTime ? this.$filter.timesFormat(payload.startTime) : undefined;
            }
            if (payload.hasOwnProperty("endTime")) {
                payload.endTime = payload.endTime ? this.$filter.timesFormat(payload.endTime) : undefined;
            }
            this.$emit("searchEvent", payload);
        },
        search() {
            let SearchKey = this.searchName;
            let pageNum = this.pageNum;
            let perPage = this.perPage;
            if (pageNum === undefined || pageNum === "" || pageNum === null) {
                pageNum = 1;
            }
            if (perPage === undefined || perPage === "" || perPage === null) {
                perPage = 10;
            }
            let newArr = [];
            for (let i = 0; i < SearchKey.length; i++) {
                newArr.push(SearchKey[i].Sendkey);
            }
            let obj = {};
            for (let i = 0; i < SearchKey.length; i++) {
                if (newArr[i] === "timeData") {
                    if (this.resultArr[i]) {
                        obj["startTime"] = (this.resultArr[i][0] === undefined || this.resultArr[i][0] === null || this.resultArr[i][0] === "") ? undefined : this.resultArr[i][0];
                        obj["endTime"] = (this.resultArr[i][1] === undefined || this.resultArr[i][1] === null || this.resultArr[i][1] === "") ? undefined : this.resultArr[i][1];
                    } else {
                        obj["startTime"] = undefined;
                        obj["endTime"] = undefined;
                    }
                } else {
                    obj[newArr[i]] = (this.resultArr[i] === undefined || this.resultArr[i] === null || this.resultArr[i] === "") ? undefined : this.resultArr[i];
                }
            }
            let args = {
                ...obj, ...{ pageNum: pageNum, pageSize: perPage }
            };
            this.getTableData(args);
        },
        // 当有时间格式选择时单独判断一下时间
        judgmentTime() {
            // 搜索列表相关
            let SearchKey = this.searchName;
            let newArr = [];
            for (let i = 0; i < SearchKey.length; i++) {
                newArr.push(SearchKey[i].Sendkey);
            }
            let obj = {};
            for (let i = 0; i < SearchKey.length; i++) {
                obj[newArr[i]] = (this.resultArr[i] === undefined || this.resultArr[i] === null || this.resultArr[i] === "") ? undefined : this.resultArr[i];
            }
            let Keys = [];
            SearchKey.map(t => {
                if (t.hasOwnProperty("time")) {
                    Keys.push(t.Sendkey);
                }
            });
            return [obj, Keys];
        },

        // 直接判定选择的时间是否正确(包含带时分秒选择框的真确性)
        decisionTime(obj, Keys, currentTime, val) {
            let SearchKey = this.searchName;
            if (Keys.length !== 0) {
                Keys.map(t => {
                    if (t === "timeData") {
                        if (obj[t]) {
                            let item = SearchKey.find(ele => ele.Sendkey === "timeData");
                            // hasOwnProperty表示是否包含有这个属性
                            if (item.hasOwnProperty("overToday") && item.overToday) {
                                this.$store.dispatch("handlerSearch", val); // item.overToday为真表示选择日期可以超过今天
                            } else {
                                if (this.$filter.timesFormat(obj[t][0]) > currentTime || obj[t][1] > currentTime) {
                                    this.$showSimpleMessage("选择日期应小于当前日期", "warning");
                                    let index = "";
                                    Object.keys(obj).map((e, i) => {
                                        if (e === t) {
                                            index = i;
                                        }
                                    });
                                    this.resultArr[index] = "";
                                    this.$refs.searchModal[index].itemData = "";
                                } else {
                                    this.$store.dispatch("handlerSearch", val);
                                }
                            }
                        } else {
                            this.$store.dispatch("handlerSearch", val);
                        }
                    } else {
                        if (obj[t]) {
                            let item = SearchKey.find(ele => ele.Sendkey === t);
                            if (item.hasOwnProperty("overToday") && item.overToday) {
                                this.$store.dispatch("handlerSearch", val); // item.overToday为真表示选择日期可以超过今天
                            } else {
                                if (this.$filter.timesFormat(obj["incidentStart1"]) > this.$filter.timesFormat(obj["incidentStart2"])) {
                                    this.$showSimpleMessage("开始日期不应大于结束日期", "warning")
                                    let index = "";
                                    Object.keys(obj).map((e, i) => {
                                        if (e === t) {
                                            index = i;
                                        }
                                    });
                                    this.resultArr[index] = "";
                                    this.$refs.searchModal[index].itemData = "";
                                }
                                // else if (this.$filter.timesFormat(obj[t]) > currentTime) {
                                //     this.$showSimpleMessage("选择日期应小于当前日期", "warning");
                                //     let index = "";
                                //     Object.keys(obj).map((e, i) => {
                                //         if (e === t) {
                                //             index = i;
                                //         }
                                //     });
                                //     this.resultArr[index] = null;
                                //     this.$refs.searchModal[index].itemData = "";
                                // } 
                                else {
                                    this.$store.dispatch("handlerSearch", val);
                                }
                            }
                        }
                    }
                });
            } else {
                this.$store.dispatch("handlerSearch", val);
            }
        },
        // 开始结束时间结合判定
        judgementStartTime(obj, Keys, val, timeKeya, timeKeyb) {
            Keys.map(t => {
                let SearchKey = this.searchName;
                let item = SearchKey.find(ele => ele.Sendkey === t);
                if (item.hasOwnProperty("overToday") && item.overToday) {
                    this.$store.dispatch("handlerSearch", val); // item.overToday为真表示选择日期可以超过今天
                        if (this.$filter.timesFormat(obj[timeKeya]) > this.$filter.timesFormat(obj[timeKeyb])) {
                            // this.formValidate.endTime = nowData > endTime ? new Date() :  startTime + 60000;
                            this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                            let index = "";
                            Object.keys(obj).map((e, i) => {
                                if (e === timeKeyb) {
                                    index = i;
                                }
                            });
                        this.resultArr[index] = null;
                        this.$refs.searchModal[index].itemData = "";
                        }
                } else {
                    if (this.$filter.timesFormat(obj[timeKeya]) > this.$filter.timesFormat(obj[timeKeyb])) {
                        this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                        let index = "";
                        Object.keys(obj).map((e, i) => {
                            if (e === timeKeyb) {
                                index = i;
                            }
                        });
                        this.resultArr[index] = null;
                        this.$refs.searchModal[index].itemData = "";
                    }
                    else if(this.$filter.timesFormat(obj[timeKeyb]) > (this.$filter.timesFormat(new Date()) + 1000)){
                        this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
                        let index = "";
                        Object.keys(obj).map((e, i) => {
                            if (e === timeKeyb) {
                                index = i;
                            }
                        });
                        this.resultArr[index] = null;
                        this.$refs.searchModal[index].itemData = "";
                    } else if(this.$filter.timesFormat(obj[timeKeya]) > (this.$filter.timesFormat(new Date()) + 1000)){
                        this.$showSimpleMessage("开始日期不应大于当前日期", "warning");
                        let index = "";
                        Object.keys(obj).map((e, i) => {
                            if (e === timeKeya) {
                                index = i;
                            }
                        });
                        this.resultArr[index] = null;
                        this.$refs.searchModal[index].itemData = "";
                    }
                    else {
                        this.$store.dispatch("handlerSearch", val);
                    }
                }
            })
        },

        // 开始结束时间结合判定
        judgementStartTimel(obj, val) {
            if (this.$filter.timesFormat(obj["incidentStart1"]) > this.$filter.timesFormat(obj["incidentStart2"])) {
                this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
                let index = "";
                Object.keys(obj).map((e, i) => {
                    if (e === "incidentStart2") {
                        index = i;
                    }
                });
                this.resultArr[index] = null;
                this.$refs.searchModal[index].itemData = "";
            } else if(this.$filter.timesFormat(obj["incidentStart2"]) > (this.$filter.timesFormat(new Date()) + 1000)){
                this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
                let index = "";
                Object.keys(obj).map((e, i) => {
                    if (e === "incidentStart2") {
                        index = i;
                    }
                });
                this.resultArr[index] = null;
                this.$refs.searchModal[index].itemData = "";
            } else if(this.$filter.timesFormat(obj["incidentStart1"]) > (this.$filter.timesFormat(new Date()) + 1000)){
                        this.$showSimpleMessage("开始日期不应大于当前日期", "warning");
                        let index = "";
                        Object.keys(obj).map((e, i) => {
                            if (e === "incidentStart1") {
                                index = i;
                            }
                        });
                        this.resultArr[index] = null;
                        this.$refs.searchModal[index].itemData = "";
                    }
            else{
                this.$store.dispatch("handlerSearch", val);
            }
        },

        // 判定是否填写数字并且连带判断范围
        determineNumberAndRange() {
            let searchNameLength = this.searchName.length;
            for (let i = 0; i < searchNameLength; i++) {
                if (this.searchName[i].fillNum) {
                    // 是否需要判定是不是数字
                    if (this.resultArr[i]) {
                        if (!Number(this.resultArr[i])) {
                            // 不是数字
                            this.$showSimpleMessage(
                                `填写错误，${this.searchName[i].searchPlaceholder}只能填写数字`, 
                                "warning");
                            setTimeout(() => {
                                this.resultArr[i] = null;
                                this.$refs.searchModal[i].itemData = "";
                            });
                            break;
                        } else {
                            if (Number(this.resultArr[i]) && Number(this.resultArr[i]) < 0) {
                                // 是数字但是小于0
                                this.$showSimpleMessage(
                                    `填写错误，${this.searchName[i].searchPlaceholder}应大于等于0`, 
                                    "warning");
                                setTimeout(() => {
                                    this.resultArr[i] = null;
                                    this.$refs.searchModal[i].itemData = "";
                                });
                                break;
                            } else {
                                // 是数字并且填写大于等于0，在根据参数决定是否需要组合判断
                                if (this.searchName[i].Combinatorialname) {
                                    // 组合判断
                                    let CombinatorialnameO = this.searchName[i].Combinatorialname[0];
                                    let CombinatorialnameP = this.searchName[i].Combinatorialname[1];
                                    let itemIndexO = this.searchName.indexOf(this.searchName.find(e => e.Sendkey === CombinatorialnameO));
                                    let itemIndexP = this.searchName.indexOf(this.searchName.find(e => e.Sendkey === CombinatorialnameP));
                                    if (this.resultArr[itemIndexO] && this.resultArr[itemIndexP]) {
                                        // 两个同时存在才组合判断
                                        if (Number(this.resultArr[itemIndexO]) >= Number(this.resultArr[itemIndexP])) {
                                            // 如果开始数字大于等于结束数字错误
                                            this.$showSimpleMessage(
                                                `填写错误，${this.searchName.find(e => e.Sendkey === CombinatorialnameO).searchPlaceholder}开始应小于结束`, 
                                                "warning");
                                            setTimeout(() => {
                                                this.resultArr[i] = null;
                                                this.$refs.searchModal[i].itemData = "";
                                            });
                                            break;
                                        } else {
                                            this.$store.dispatch("handlerSearch", this.resultArr);
                                        }
                                    } else {
                                        this.$store.dispatch("handlerSearch", this.resultArr);
                                    }
                                } else {
                                    // 不需要组合判断
                                    this.$store.dispatch("handlerSearch", this.resultArr);
                                }
                            }
                        }
                    } else {
                        this.$store.dispatch("handlerSearch", this.resultArr);
                    }
                } else {
                    this.$store.dispatch("handlerSearch", this.resultArr);
                }
            }
        },

        // 重置组件使用(回调函数)
        initialComponentOver() {
            this.$emit("initialComponentover");
        }
    }
};
</script>

<style scoped>
    .el-popper {
        margin-top: 40px;
    }
</style>


