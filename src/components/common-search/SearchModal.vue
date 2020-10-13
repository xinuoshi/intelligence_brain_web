/*
 * @Author: Eco.dujun
 * @Date: 2018-09-04 09:36:13
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2019-02-22 18:00:30
 */
<template>
    <div class="margin-right">
        <!-- type===0 输入框 -->
        <div v-if="searchData.type===0" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-input size="small" class="tems_Input inputWidth" placeholder="请输入..." v-model="itemData"
                    @input="$emit('change', itemData)" clearable/>
        </div>
        <!-- type===1 通用下拉框不带url参数默认传入下拉数据，上传id -->
        <div v-if="searchData.type===1" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-select size="small" class="tems_Input inputWidth" @input="$emit('change', itemData)" clearable filterable
                    v-model="itemData"
                    placeholder="请选择...">
                <el-option class="" v-for="(item, index) in selectData" :key="index" :value="item.id" :label="item.name">
                    {{ item.name}}
                </el-option>
            </el-select>
        </div>
        <!-- type===9 通用下拉框不带url参数默认传入下拉数据，上传name -->
        <div v-if="searchData.type===9" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-select size="small" class="tems_Input inputWidth" @input="$emit('change', itemData)" clearable filterable
                    v-model="itemData"
                    placeholder="请选择...">
                <el-option class="" v-for="(item, index) in selectData" :key="index" :value="item.name" :label="item.name">
                    {{ item.name}}
                </el-option>
            </el-select>
        </div>
        <!-- type===2 通用下拉框带url参数接口获取下拉数据，上传id -->
        <div v-if="searchData.type===2" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-select size="small" class="tems_Input inputWidth" @input="$emit('change', itemData)" clearable filterable
                    v-model="itemData"
                    placeholder="请选择...">
                <el-option class="" v-for="(item, index) in selectUrlData" :key="index" :value="item.id" :label="item.name">
                    {{ item.name}}
                </el-option>
            </el-select> 
        </div>
        <!-- type===10 通用下拉框带url参数接口获取下拉数据，上传name -->
        <div v-if="searchData.type===10" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-select size="small" class="tems_Input inputWidth" @input="$emit('change', itemData)" clearable filterable
                    v-model="itemData"
                    placeholder="请选择...">
                <el-option class="" v-for="(item, index) in selectUrlData" :key="index" :value="item.name" :label="item.name">
                    {{ item.name}}
                </el-option>
            </el-select>
        </div>
        <!-- type===3，4 时间筛选通用下拉 -->
        <div v-if="searchData.type===3"  :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-date-picker class="tems_Input inputWidth" v-model="itemData" size="small" @input="$emit('change', itemData)" placeholder="选择开始日期时间" />
        </div>
        <div v-if="searchData.type===4" style="margin-left:-10px" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder}}</span>
            <el-date-picker class="tems_Input inputWidth" v-model="itemData" size="small" @input="$emit('change', itemData)" placeholder="选择结束日期时间" />
        </div>
        <!-- type===5时间筛选(带时分秒选择)通用下拉 -->
         <div v-if="searchData.type===5" class="datetime" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-date-picker class="tems_Input inputWidth" size="small" v-model="itemData" type="datetimerange" @input="$emit('change', itemData)"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <!-- type===6 通用输入框带url参数接口获取下拉数据 -->
            <div v-if="searchData.type===6" :class="{'margin-leftTen': searchData.left === '0'}">
                <span>{{searchData.searchPlaceholder + ": "}}</span>
                <el-autocomplete size="small" class="tems_Input inputWidth" placeholder="请输入..." v-model="itemData"
                    @input="$emit('change', itemData)" :fetch-suggestions="querySearchAsync" :trigger-on-focus="true" clearable/>
        </div>
        <!-- type===7，8 时间(带时分秒选择)筛选通用下拉 -->
        <div v-if="searchData.type===7" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder + ": "}}</span>
            <el-date-picker class="tems_Input inputWidth" type="datetime" v-model="itemData" size="small" @input="$emit('change', itemData)" placeholder="开始时间" />
        </div>
        <div v-if="searchData.type===8" style="margin-left:-10px" :class="{'margin-leftTen': searchData.left === '0'}">
            <span>{{searchData.searchPlaceholder}}</span>
            <el-date-picker class="tems_Input inputWidth" type="datetime" v-model="itemData" size="small" @input="$emit('change', itemData)" placeholder="结束时间" />
        </div>
    </div>
</template>

<script>
export default {
    name: "searchModal",
    props: ["value", "searchData", "typeIndex"],
    model: {
        event: "change"
    },
    data() {
        return {
            visibleItem: true,
            selectUrlData: [], // 通用下拉框数据带url参数
            selectData: [], // 通用下拉框数据不带url参数需要默认传入下拉数据
            itemData: "" // v-model值绑定
            // timeout:  null
        };
    },
    watch: {
        "typeIndex": function(val, old) {
            this.itemData = "";
        },
        "searchData": {
            // 检测到传入的值改变重新获取下拉数据
            handler: function(val, oldVal) {
                this.itemData = "";
                if (val.url || val.type == 10) {
                    this.getTableData();
                } else if (!val.url && val.type !== 0) {
                    this.selectData = [];
                    this.selectData = val.data;
                }
                if (val.time) {
                    this.itemData = val.time;
                    this.$emit("change", this.itemData);
                }
            },
            deep: true
        }
    },
    methods: {
        querySearchAsync(queryString, cb) {
            if (!this.itemData) {
                queryString = this.itemData;
            }
            let restaurants = this.selectUrlData;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
            // clearTimeout(this.timeout);
            // this.timeout = setTimeout(() => {
            //     cb(results);
            // }, 1000 * Math.random());
            cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        getTableData() {
            axios.get(this.searchData.url).then((res) => {
                let selectUrlData = this.$tools.arrUnique(res.data.data, this.searchData.getDataKey);
                this.selectUrlData = [];
                selectUrlData.map(t => {
                    this.selectUrlData.push({ id: t[this.searchData.id], name: t[this.searchData.getDataKey], value: t[this.searchData.getDataKey]});
                });
            }).catch(this.defaultHttpHandler);
        },
        initialGetTableData() {
            if (this.searchData.url || this.searchData.type == 10) {
                axios.get(this.searchData.url).then((res) => {
                    let selectUrlData = this.$tools.arrUnique(res.data.data, this.searchData.getDataKey);
                    this.selectUrlData = [];
                    selectUrlData.map(t => {
                        this.selectUrlData.push({ id: t[this.searchData.id], name: t[this.searchData.getDataKey], value: t[this.searchData.getDataKey]});
                    });
                });
            } else if (!this.searchData.url && this.searchData.type !== 0) {
                this.selectData = [];
                this.selectData = this.searchData.data;
            } else if (this.searchData.type == 9) {
                this.selectData = [];
                this.selectData = this.searchData.data;
            }
            if (this.searchData.time) {
                this.itemData = this.searchData.time;
                this.$emit("change", this.itemData);
            }
        }
    },
    mounted() {
        this.initialGetTableData();
    }
};
</script>

<style scoped>
    .inputWidth {
        width: 7vw!important;
        min-width: 110px!important;
        max-width: 170px!important;
    }
    .tems_Input /deep/ {
        margin-left: 0px;
        margin-right: 0px;
    }
    .el-input__inner {
        height: 34px;
    }
    .el-date-editor .el-range-separator {
        color: #22c6f9 !important;
    }
</style>
<style>
.margin-leftTen{
    margin-left:-10px !important;
}
.datetime .inputWidth {
    width: 22vw !important;
    max-width: 400px !important;
}
.datetime .el-date-editor .el-range-separator {
    color: #22c6f9 !important;
}
.datetime .el-range-editor .el-range-input {
    background-color: #030729;
    color: #22c6f9;
}
</style>


