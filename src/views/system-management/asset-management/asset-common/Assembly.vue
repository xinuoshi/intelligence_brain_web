<style>
.assInputNopad input{
    padding: 0 10px 0 10px !important;
}
.assInputNopad .el-input__suffix {
    right: 15px !important;
}
.assInputNopad .el-input__icon {
    width: 0px !important;
}
.assembly_tab_item input{
 border-left: 0px;
}
 .assemFirst input{
  border-left: 1px solid #53D4F9;
}
.flextwo{
    flex: 0.2 !important;
}
.flexthree{
    flex: 0.3 !important;
}
.flexFour{
    flex: 0.4 !important;
}
.flexHaft{
    flex: 0.45 !important;
}
.flexeight{
    flex: 0.8 !important;
}
.flexnine{
    flex: 0.9 !important;
}
.flexSenve{
    flex: 0.7 !important;
}
.flexSenveHalf{
    flex: 0.75 !important;
}
.flexSix{
    flex: 0.6 !important;
}.flexFive{
    flex: 0.5 !important;
}
.assembly_tab_bor .addDel {
    border-radius: 50%;
    display: inline-block;
    line-height: 1;
    height: 20px;
    width: 20px;
    cursor: pointer;
}
</style>

<template>
    <div style="width:100%">
        <!-- <div class="titleBottom" >组件信息</div> -->
        <hr class="hrBorder"/>
        <div class="assembly_tab_bor flexColumn">
            <div class="assembly_tab_head flexRow">
                <div v-show="assemblyValue.isDisable === false" class="assembly_tab_item flexNum" :class="[{flexthree : index=== 10}, {flexHaft : index > 5 && index < 8},{flexeight:index=== 9}]" v-for="(aL, index) in assemblyList"  :key="aL.index">
                    <div class="assembly_tab_text">{{aL}}</div>
                </div>
                <div v-show="assemblyValue.isDisable === true" class="assembly_tab_item flexNum" :class="[{flexFour : index > 5 && index < 8},{flexFive:index === 9},{flexSenveHalf:index===3}]" v-for="(aL, index) in assemblyList2"  :key="aL.index">
                    <div  class="assembly_tab_text">{{aL}}</div>
                </div>
            </div>
            <div class="assembly_tab_body flexColumn" >
                <div class="assembly_tab_line flexRow " @click="getIndex(index)" v-for="(item, index) in assemblyValue.equipmentSubassemblyk" :key="index">
                    <!-- 组件名称 -->
                    <div class="assembly_tab_item flexNum ">
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].codeName" placement="top">
                            <el-select class="ass_Input assemFirst" size="small" v-model="assemblyValue.equipmentSubassemblyk[index].codeName" :title="assemblyValue.equipmentSubassemblyk[index].codeName" filterable @change="changModeList(assemblyValue.equipmentSubassemblyk[index].codeName, index)" clearable style="width:100%">
                                <el-option v-for="itemName in assemblyValue.moduleList" :key="itemName.index" :label="itemName.name" :value="itemName.name" />
                            </el-select>
                        </el-tooltip>
                    </div>
                    <div class="assembly_tab_item flexNum">
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].number" placement="top">
                            <el-select class="ass_Input" :title="assemblyValue.equipmentSubassemblyk[index].number" size="small" @change="hideSelectChang(assemblyValue.equipmentSubassemblyk[index].number, index)" clearable v-model="assemblyValue.equipmentSubassemblyk[index].number" style="width:100%">
                                <el-option v-if="assemblyValue.equipmentSubassemblyk[index].codeName !==''" label="自定义新增" value="自定义新增"></el-option>
                                <el-option :title="itemUnder.name" v-if="assemblyValue.equipmentSubassemblyk[index].codeName !==''" v-for="itemUnder in assemblyValue.moduleListUnder[index]" :key="itemUnder.number" :label="itemUnder.number" :value="itemUnder"></el-option>
                            </el-select>
                        </el-tooltip>
                    </div>
                    <div class="assembly_tab_item flexNum">
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].name" placement="top">
                            <el-autocomplete class="ass_Input" :maxlength="20"
                                         size="small" clearable
                                         :title="assemblyValue.equipmentSubassemblyk[index].name"
                                         v-model="assemblyValue.equipmentSubassemblyk[index].name"
                                         :fetch-suggestions="querySearchAsync"
                                         @select="handleSelect">
                            </el-autocomplete>
                        </el-tooltip>
                    </div>
                    <!-- IP地址 -->
                    <div class="assembly_tab_item " :class="{flexSenveHalf:assemblyValue.isDisable === true,flexNum:assemblyValue.isDisable === false}">
                       <!-- <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].ipAddress" placement="top"> -->
                             <el-input class="ass_Input" size="small" v-model="assemblyValue.equipmentSubassemblyk[index].ipAddress" clearable></el-input>
                        <!-- </el-tooltip> -->
                    </div>
                    <!-- 品牌 -->
                    <div class="assembly_tab_item flexNum" >
                        <!-- <el-input class="ass_Input" size="small" v-model="assemblyValue.equipmentSubassemblyk[index].trademark" clearable></el-input> -->
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].tradeMark" placement="top">
                             <el-select class="ass_Input"  v-model="assemblyValue.equipmentSubassemblyk[index].tradeMark" clearable :popper-append-to-body="false">
                                <el-option v-for="item in brandList" :key="item.id" :label="item.value" :value="item.value" />
                            </el-select> 
                        </el-tooltip>
                    </div>
                    <!-- 型号 -->
                    <div class="assembly_tab_item flexNum">
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].model" placement="top">
                             <el-input class="ass_Input" size="small" v-model="assemblyValue.equipmentSubassemblyk[index].model" clearable></el-input>
                        </el-tooltip>
                    </div>
                    <!-- 保修期 -->
                    <div class="assembly_tab_item" :class="{flexFour:assemblyValue.isDisable === true,flexHaft:assemblyValue.isDisable === false}">
                        <!-- <el-select class="ass_Input"  v-model="assemblyValue.equipmentSubassemblyk[index].warrantyPeriod" clearable size="small" @change="WatchData(assemblyValue.equipmentSubassemblyk[index])">
                            <el-option v-for="item in durableAry" :key="item" :label="item+ '年'" :value="item+ '年'" />
                        </el-select> -->
                        <!-- <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].warrantyPeriod" placement="top"> -->
                            <el-autocomplete class="ass_Input assInputNopad" @blur="WatchData(assemblyValue.equipmentSubassemblyk[index])"
                                            size="small" clearable @keyup.native="keyup(assemblyValue.equipmentSubassemblyk[index].warrantyPeriod, 'warrantyPeriod')"
                                            v-model="assemblyValue.equipmentSubassemblyk[index].warrantyPeriod"
                                            :fetch-suggestions="querySearchAsyncdurableAry"
                                            @select="WatchData(assemblyValue.equipmentSubassemblyk[index])">
                            </el-autocomplete>
                        <!-- </el-tooltip> -->
                    </div>
                    <!-- 使用寿命 -->
                    <div class="assembly_tab_item" :class="{flexFour:assemblyValue.isDisable === true,flexHaft:assemblyValue.isDisable === false}">
                        <!-- <el-select class="ass_Input" v-model="assemblyValue.equipmentSubassemblyk[index].serviceLife" clearable size="small" @change="WatchData(assemblyValue.equipmentSubassemblyk[index])">
                            <el-option v-for="item in durableAry" :key="item" :label="item+ '年'" :value="item+ '年'" />
                        </el-select> -->     
                        <!-- <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].serviceLife" placement="top"> -->
                            <el-autocomplete class="ass_Input assInputNopad"
                                            @blur="WatchData(assemblyValue.equipmentSubassemblyk[index])"
                                            size="small" clearable @keyup.native="keyup(assemblyValue.equipmentSubassemblyk[index].serviceLife, 'serviceLife')"
                                            v-model="assemblyValue.equipmentSubassemblyk[index].serviceLife"
                                            :fetch-suggestions="querySearchAsyncdurableAry"
                                            @select="WatchData(assemblyValue.equipmentSubassemblyk[index])">
                            </el-autocomplete>  
                        <!-- </el-tooltip> -->
                    </div>
                    <!-- 供应商 -->
                    <div class="assembly_tab_item flexNum">
                        <el-tooltip class="item" effect="dark" :content="assemblyValue.equipmentSubassemblyk[index].supplierId" placement="top">
                            <el-select class="ass_Input"  v-model="assemblyValue.equipmentSubassemblyk[index].supplierId" :title="assemblyValue.equipmentSubassemblyk[index].supplierId" style="color:#fff" filterable clearable size="small">
                                <el-option v-for="item in suppliersList" :key="item.id" :label="item.companyName" :value="item.companyName" />
                            </el-select>
                        </el-tooltip>
                    </div>
                    <!-- 建设日期 -->
                    <div class="assembly_tab_item" :class="{flexeight:assemblyValue.isDisable === false,flexFive:assemblyValue.isDisable === true}">
                       <el-date-picker class="ass_Input" v-model="assemblyValue.equipmentSubassemblyk[index].buildTime" size="small" placeholder="选择日期" />
                    </div>
                    <!-- 删除按钮 -->
                    <div class="assembly_tab_item flexthree" v-if="assemblyValue.isDisable === false">
                        <span class="addDel" @click="delAssHang(index)" style="font-size: 15px;font-weight: 900;line-height: 1;border:2px solid #F95553;color:#F95553;">—</span>
                    </div>
                </div>
            </div>
            <div style="display:flex" v-if="assemblyValue.isDisable === false">
                <div style="flex:9.5;border:none;box-shadow:none;-webkit-box-shadow:none" ></div>
                <div class="flexthree">
                    <span class="addDel" @click="assemblyListAdd"  style="font-size: 25px;line-height: 0.8;border:2px solid #25fd90;color: #25fd90;">+</span>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "assembly",
    props: ["assemblyValue", "suppliersList", "durableAry", "brandList"],
    data() {
        return {
            restaurants: 0,
            timeout: null,
            // 组件表头
            assemblyList: ["组件类型", "组件使用类型", "组件名称", "IP地址", "品牌", "型号", "保修期", "使用寿命", "供应商", "建设日期", "操作"],
            assemblyList2: ["组件类型", "组件使用类型", "组件名称", "IP地址", "品牌", "型号", "保修期", "使用寿命", "供应商", "建设日期"]
        };
    },
    methods: {
        //   时间加年
        keyup(value, item) {
            this.assemblyValue.equipmentSubassemblyk[this.restaurants][item] = value.replace("年", "")+ "年";
        },  
        getIndex(index) {
            this.restaurants = index;
        },               
        // 组件名称输入或选择
        querySearchAsyncdurableAry(queryString, cb) {
            let dataList = this.durableAry;
            let dataListAll = [];
            for (let i = 0; i < dataList.length; i++) {
                dataListAll.push({value : dataList[i] + "年"})
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(dataListAll);
            }, 10 * Math.random());            
        },
        // 组件名称输入或选择
        querySearchAsync(queryString, cb) {
            let dataList = this.assemblyValue.moduleListUnder[this.restaurants];
            for (let i = 0; i < dataList.length; i++) {
                dataList[i].value = dataList[i].name;
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(dataList);
            }, 1000 * Math.random());
            this.nameChang(this.assemblyValue.equipmentSubassemblyk[this.restaurants], this.restaurants);
        },
        // 组件名称选择下拉后
        handleSelect(item) {
            this.nameChang(item, this.restaurants);
        },
        // 根据组件名称整行改变数据
        nameChang(item, index) {
            this.hideSelect(item.number, index);
            let dataList1 = this.assemblyValue.newList[index];
            if (item.name !== dataList1.name) {
                item.number = "自定义新增";
            }
            let data = item.number !== "自定义新增" && item.number !== "" && item.number;
            let ass = this.assemblyValue.equipmentSubassemblyk[index];
            let codeType = ass.codeName !== "";
            if (data) {
                ass.id = item.subassemblyId;
            } else {
                delete ass.id;
            }
            ass.number = data ? item.number : "自定义新增";
            ass.codeId = codeType ? ass.codeId : "";
            ass.codeName = codeType ? ass.codeName : "";
            ass.ipAddress = data ? item.ipAddress : "";
            ass.trademark = data ? item.trademark : "";
            ass.model = data ? item.model : "";
            ass.createdTime = data ? item.createdTime : "";
            ass.serviceLife = data ? item.serviceLife : "";
            ass.warrantyPeriod = data ? item.warrantyPeriod : "";
            ass.supplierId = item.supplierId;
        },
        // 组件增加按钮
        assemblyListAdd() {
            if (this.assemblyValue.isDisable === false) {                
                this.assemblyValue.equipmentSubassemblyk.push({
                    codeId: "",
                    name: "",
                    number: "",
                    codeName: "",
                    ipAddress: "",
                    trademark: "",
                    model: "",
                    createdTime: "",
                    serviceLife: "",
                    warrantyPeriod: "",
                    supplierId: ""
                });
                this.assemblyValue.moduleListUnder.push({});
                // 定位滚动条
                let doms = document.getElementById("scrollDPart");
                doms.scrollTop = doms.scrollHeight;
                }
        },
        // 组件信息行删除
        delAssHang(index) {
            if (this.assemblyValue.isDisable === false) {    
                this.assemblyValue.equipmentSubassemblyk.splice(index, 1);
                this.assemblyValue.moduleListUnder.splice(index, 1);
                this.hideSelect("", index);
                this.getGeomagnumberLength();
            }
        },
        getGeomagnumberLength() {
            if (this.assemblyValue.equipmentType === "000003-2") {
                let geomagnumberLength = 0;
                for (let j = 0; j < this.assemblyValue.equipmentSubassemblyk.length; j++) {
                    if (this.assemblyValue.equipmentSubassemblyk[j].codeName === "地磁单元") {
                        geomagnumberLength++;
                    }
                }
                this.$set(this.assemblyValue, "geomagnumberLength", geomagnumberLength);
            }
        },
        // 组件名称下拉框选择取值所有公用组件库
        changModeList(data, index) {
            this.getGeomagnumberLength();
            if (data !== "") {
                for (let i = 0; i < this.assemblyValue.moduleList.length; i++) {
                    if (data === this.assemblyValue.moduleList[i].name) {
                        this.assemblyValue.equipmentSubassemblyk[index].codeId = this.assemblyValue.moduleList[i].id;
                        axios.get("subassembly/", { params: { codeId: this.assemblyValue.moduleList[i].id } }).then((resList) => {
                            let res = resList.data.data;
                            if (res !== undefined) {
                                let equipmentSubassemblyk = this.assemblyValue.equipmentSubassemblyk;
                                let moduleListUnder = this.assemblyValue.moduleListUnder;
                                if (equipmentSubassemblyk[index].number !== "") {
                                    this.hideSelectChang("", index);
                                }
                                this.$set(moduleListUnder, index, res);
                                for (let j = 0; j < equipmentSubassemblyk.length; j++) {
                                    for (let k = 0; k < res.length; k++) {
                                        if (j !== index) {
                                            switch (equipmentSubassemblyk[j].number) {
                                                case res[k].number:
                                                    this.$set(moduleListUnder, index, moduleListUnder[j]);
                                                    break;
                                                case "自定义新增":
                                                    this.$set(moduleListUnder, index, moduleListUnder[j]);
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }).catch((error) => {
                            this.$showSimpleMessage(error, "error");
                            this.$showSimpleMessage("获取公用组件失败", "error");
                        });
                    }
                }
            } else {
                this.hideSelectChang("", index);
            }
        },
        // 组件公用下拉框选择取值公用组件库整行信息
        hideSelectChang(data, index) {
            this.hideSelect(data.number, index);
            let ass = this.assemblyValue.equipmentSubassemblyk[index];
            let dataType = data !== "自定义新增" && data !== "";
            let codeType = ass.codeName !== "";
            if (dataType) {
                ass.id = data.equipmentSubassemblyId;
            } else {
                delete ass.id;
            }
            ass.codeId = (dataType ? ass.codeId : (codeType ? ass.codeId : ""));
            ass.codeName = (dataType ? ass.codeName : (codeType ? ass.codeName : ""));
            ass.name = (dataType ? data.name : "");
            ass.number = (dataType ? data.number : (data !== "" ? "自定义新增" : ""));
            ass.ipAddress = (dataType ? data.ipAddress : "");
            ass.trademark = (dataType ? data.trademark : "");
            ass.model = (dataType ? data.model : "");
            ass.createdTime = (dataType ? data.createdTime : "");
            ass.serviceLife = (dataType ? data.serviceLife : "");
            ass.warrantyPeriod = (dataType ? data.warrantyPeriod : "");
            ass.supplierId = (dataType ? data.supplierId : "");
            ass.equipmentType = data.equipmentType;
            ass.equipmentTypeName = data.equipmentTypeName;
            ass.parentName = data.parentName;
            ass.parentId = data.parentId;
        },
        // 组件公用只能每个类型选一次
        hideSelect(data, index) {
            // data选择下拉框的id 和操作行的序列index
            let moduleListUnder = this.assemblyValue.moduleListUnder[index];
            let newList = this.assemblyValue.newList;
            if (data !== "") {
                if (newList[index] !== undefined && newList[index].number) {
                    moduleListUnder.unshift(newList[index]);
                    newList[index] = "";
                }
                for (let i = 0; i < moduleListUnder.length; i++) {
                    if (data === moduleListUnder[i].number) {
                        newList[index] = moduleListUnder[i];
                        moduleListUnder.splice(i, 1);
                    }
                }
            } else {
                if (newList[index] !== undefined && newList[index].number) {
                    if (newList[index].number !== "自定义新增" && moduleListUnder) {
                        moduleListUnder.unshift(newList[index]);
                    }
                    newList.splice(index, 1);
                }
            }
        },
        // 使用寿命要大于保修期
        WatchData(data) {
            if (data.serviceLife !== "" && data.warrantyPeriod !== "") {
                let serviceLife = parseInt(data.serviceLife);
                let warrantyPeriod = parseInt(data.warrantyPeriod);
                if (serviceLife < warrantyPeriod) {
                    data.serviceLife = "";
                    this.$showSimpleMessage("使用寿命大于保修期", "warning");
                }
            }
        },
        // 是否停用
        supplierStop() {
            // let k = 0;
            // let arry = [];
            // let arry1 = [];
            // let equipmentSubassemblyk = this.assemblyValue.equipmentSubassemblyk;
            // if (equipmentSubassemblyk) {
            //     for (let i = 0; i < equipmentSubassemblyk.length; i++) {
            //         arry.push(equipmentSubassemblyk[i].name);
            //         for (let j = 0; j < this.suppliersList.length; j++) {
            //             if (equipmentSubassemblyk[i].supplierId === this.suppliersList[j].id && equipmentSubassemblyk[i].supplierId !== undefined && equipmentSubassemblyk[i].supplierId !== null && equipmentSubassemblyk[i].supplierId !== "") {
            //                 k++;
            //                 arry.splice(i, 1);
            //                 arry1.push({ supplierId: equipmentSubassemblyk[i].supplierId, index: i });
            //             }
            //         }
            //         equipmentSubassemblyk[i].supplierId = "";
            //     }
            //     for (let j = 0; j < arry1.length; j++) {
            //         equipmentSubassemblyk[arry1[j].index].supplierId = arry1[j].supplierId;
            //     }
            //     if (k !== equipmentSubassemblyk.length) {
            //         // this.$showSimpleMessage("组件名称为" + arry.toString() + "的供应商停用，请重新选择", "error");
            //     }
            // }
        },
        getlist() {
            axios.get("subassemblyType/", { params: { equipmentType: this.assemblyValue.equipmentType } }).then((res) => {
                let getUnitList = res.data.data;
                this.assemblyValue.moduleList = getUnitList;
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
            this.supplierStop();
        }
    },
    mounted() {
        this.getlist();
    },
    watch: {
        "assemblyValue.changFunction": function(val, old) {
            this.getlist();
        }
    }
};
</script>

