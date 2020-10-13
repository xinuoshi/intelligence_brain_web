/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
 * @Last Modified by: chase
 * @Last Modified time: 2018-12-20 18:56:26
*/
<template>
    <div>
        <div style="background-color: #0a1a2d;height: 400px">
            <h3 style="text-align: left;margin-left: 40px;padding-top: 10px">潮汐流指数阈值</h3>
           <!-- <hr/>-->
            <div class="tablewz">
                <table cellspacing="0" cellpadding="0" style="width: 670px;">
                    <tr style="background-color: #132B4E;height: 40px">
                        <th style="vertical-align:middle;">
                            潮汐流级别
                        </th>
                        <th style="vertical-align:middle;">
                            CXI范围
                        </th>
                    </tr>
                    <tr v-for="(tab,key) in dataList" :key="key" style="margin-bottom: 10px;height: 55px">
                        <!--<td>
                            <span>{{tab.name}}：</span>
                        </td>
                        <td>
                            <span v-if="tab.name === '潮汐流一级'"><el-input class="tems_Input" type="number" min="0" @keyup.native="number('0',$event,tab.valueOne)" v-model="tab.valueOne[0]" size="mini"/>≤CXI</span>
                            <span v-else><el-input class="tems_Input" type="number" min="0" @keyup.native="number('0',$event,tab.valueOne)" v-model="tab.valueOne[0]" size="mini"/>≤CXI＜<el-input class="tems_Input" type="number" min="0" size="mini" @keyup.native="number('1',$event,tab.valueOne)" v-model="tab.valueOne[1]" /></span>或
                            <span v-if="tab.name === '潮汐流一级'">CXI≤<el-input class="tems_Input" type="number" min="0" size="mini" @keyup.native="number('1',$event,tab.valueTwo)" v-model="tab.valueTwo[1]" /></span>
                            <span v-else><el-input class="tems_Input" type="number" min="0" size="mini" @keyup.native="number('0',$event,tab.valueTwo)" v-model="tab.valueTwo[0]" />＜CXI≤<el-input class="tems_Input" type="number" min="0" size="mini" @keyup.native="number('1',$event,tab.valueTwo)" v-model="tab.valueTwo[1]" /></span>
                        </td>-->
                        <td style="border:1px solid #132B4E;vertical-align:middle;">
                            <span>潮汐流{{tab.name}}级：</span>
                           <!-- <el-input class="tems_Input1" min="0" v-model="dataList[key].name" size="mini"/>：-->
                        </td>
                        <td style="border:1px solid #132B4E;vertical-align:middle;">
                            <span v-if="dataList[key].name === '1'"><el-input class="tems_Input" step=0.01 type="number" min="0" @keyup.native="number('0',$event,dataList[key].valueOne)" v-model="dataList[key].valueOne[0]" size="mini"/> ≤ CXI</span>
                            <span v-else><el-input class="tems_Input" step=0.01 type="number" min="0" @keyup.native="number('0',$event,dataList[key].valueOne)" v-model="dataList[key].valueOne[0]" size="mini"/> ≤ CXI < <el-input class="tems_Input" step=0.01 type="number" min="0" size="mini" @keyup.native="number('1',$event,dataList[key].valueOne)" v-model="dataList[key].valueOne[1]" /></span>或
                            <span v-if="dataList[key].name === '1'"> CXI ≤ <el-input class="tems_Input" step=0.01 type="number" min="0" size="mini" @keyup.native="number('1',$event,dataList[key].valueTwo)" v-model="dataList[key].valueTwo[1]" /></span>
                            <span v-else><el-input class="tems_Input" step=0.01 type="number" min="0" size="mini" @keyup.native="number('0',$event,dataList[key].valueTwo)" v-model="dataList[key].valueTwo[0]" /> < CXI ≤ <el-input class="tems_Input" step=0.01 type="number" min="0" size="mini" @keyup.native="number('1',$event,dataList[key].valueTwo)" v-model="dataList[key].valueTwo[1]" /></span>
                        </td>
                        <td>
                            <span class="addDel" v-if="key === 0" @click="addName(key)" style="border:2px solid #25fd90;color: #25fd90;font-size: 25px;">+</span>
                            <span class="addDel" v-if="key === dataList.length-1 && key !== 0" @click="deletName(key)" style="border:2px solid #F95553;color:#F95553;font-weight: 500;font-size: 16px;">—</span>
                        </td>
                    </tr>
                </table>
                <div class="titlePart" style="width: 600px;margin: 20px 0;">
            <span class="tems_Button exportBtn" v-if="checkGKboo" @click="postData()">
                保存
            </span>
                </div>
            </div>
            <!-- <hr/>
             <div class="tablewz">
                 <table width="500" cellspacing="0" cellpadding="0">
                     <tr>
                         <th colspan="2">数据类型</th>
                         <th>存储时间（天）</th>
                     </tr>
                     <tr v-for="(tab,key) in dataListtong" :key="key">
                         <td :rowspan="tab.row" v-if="tab.col !== 0" :colspan="tab.col">{{tab.type}}</td>
                         <td>{{tab.paramKey}}</td>
                         <td><el-input class="tems_Input" min="0" size="mini" @keyup.native="number('value',$event,tab)" v-model="tab.value"/></td>
                     </tr>
                 </table>
                 <div class="titlePart">
             <span class="tems_Button qiliang" @click="handlerRemove(itemb)">
                 保存
             </span>
                 </div>
             </div>
             <hr/>
             <div class="tablewz">
                 <table width="600" cellspacing="0" cellpadding="0">
                     <tr>
                         <th>情报名</th>
                         <th>数值</th>
                     </tr>
                     <tr v-for="(tab,key) in dataListqing" :key="key">
                         <td style="text-align: left">{{tab.name}}</td>
                         <td style="text-align: left" v-if="tab.name !=='交通流量异常'"><el-input class="tems_Input" min="0" size="mini" @keyup.native="number('0',$event,tab.valuTwo)" v-model=tab.valuTwo[0] />%</td>
                         <td style="text-align: left" v-else>
                             <li><span>Ⅰ级：</span><el-input class="tems_Input" min="0" @keyup.native="number('0',$event,tab.valuTwo)" v-model=tab.valuTwo[0] size="mini"/>%＜上升幅度</li>
                             <li><span>Ⅱ级：</span><el-input class="tems_Input" min="0" @keyup.native="number('0',$event,tab.valuThree)" v-model=tab.valuThree[0] size="mini"/>%＜上升幅度≤<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valuThree)" v-model=tab.valuThree[1] />%</li>
                             <li><span>Ⅲ级：</span><el-input class="tems_Input" min="0" @keyup.native="number('0',$event,tab.valuFour)" v-model=tab.valuFour[0] size="mini"/>%＜上升幅度≤<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valuFour)" v-model=tab.valuFour[1] />%</li>
                             <li><span>Ⅳ级：</span><el-input class="tems_Input" min="0" @keyup.native="number('0',$event,tab.valuFive)" v-model=tab.valuFive[0] size="mini"/>%＜上升幅度≤<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valuFive)" v-model=tab.valuFive[1] />%</li>
                         </td>
                     </tr>
                 </table>

                 <div class="titlePart">
             <span class="tems_Button qiliang" @click="postDataqing()">
                 保存
             </span>
                 </div>
             </div>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: "tidalflow",
        props: ["checkGKboo"],
        components: {},
        data() {
            return {
                zhujian2: false,
                tideSunsetRestricts: "",
                valueOnelist: [],
                aboutMsg: "我是about组件",
                dataList: [],
                dataListtong: [],
                dataListqing: "",
                dataListbianhua: [{
                    name: "",
                    valueOne: "",
                    valueTwo: ""
                }]
            }
        },
        created() {
            // 潮汐流
           this.tideSunsetRestrict();
            // 情报阈值
            axios.get("/intelligence/detection/").then((res) => {
                this.dataListqing = res.data.data;
                let num = res.data.data.length
                for(let i = 0; i < num; i++){
                    if( res.data.data[i].valuTwo === null || res.data.data[i].valuTwo === "{}"){
                        this.dataListqing[i].valuTwo =[0,0]
                    } else {
                        let dataArr = this.dataListqing[i].valuTwo.split(",");
                        this.dataListqing[i].valuTwo = dataArr;
                    }
                    if( res.data.data[i].valuThree === null || res.data.data[i].valuThree === "{}"){
                        this.dataListqing[i].valuThree =[0,0]
                    } else {
                        let dataArr = this.dataListqing[i].valuThree.split(",");
                        this.dataListqing[i].valuThree = dataArr;
                    }
                    if( res.data.data[i].valuFour === null || res.data.data[i].valuFour === "{}"){
                        this.dataListqing[i].valuFour =[0,0]
                    } else {
                        let dataArr = this.dataListqing[i].valuFour.split(",");
                        this.dataListqing[i].valuFour = dataArr;
                    }
                    if( res.data.data[i].valuFive === null || res.data.data[i].valuFive === "{}"){
                        this.dataListqing[i].valuFive =[0,0]
                    } else {
                        let dataArr = this.dataListqing[i].valuFive.split(",");
                        this.dataListqing[i].valuFive = dataArr;
                    }
                };
            }).catch((err) => {
                this.$message.error(err);
            });
            // 通用参数
            axios.get("/sysparam/").then((res) => {
                this.dataListtong = res.data.data;
                this.changeColRows();
            }).catch((err) => {
                this.$message.error(err);
            });
        },
        methods: {
            //潮汐流参数
            tideSunsetRestrict(){
                axios.get("tideSunsetRestrict/").then((res) => {
                    let dataListbianhua = [];
                    /* this.dataList = res.data.data; */
                    let paixu = this.$tools.bubbleSort(res.data.data, "name");
                    for(let i = 0; i < paixu.length; i++){
                        dataListbianhua.push({
                            id: res.data.data[i].id,
                            name: res.data.data[i].name,
                            valueOne: res.data.data[i].valueOne,
                            valueTwo: res.data.data[i].valueTwo,
                            status: res.data.data[i].status
                        });
                        if( res.data.data[i].valueOne === null){
                            dataListbianhua[i].valueOne =[0,0]
                        } else {
                            let dataArr = dataListbianhua[i].valueOne.split(",");
                            dataListbianhua[i].valueOne = dataArr;
                        };
                        if( res.data.data[i].valueTwo === null){
                            dataListbianhua[i].valueTwo =[0,0]
                        } else {
                            let dataArr = dataListbianhua[i].valueTwo.split(",");
                            dataListbianhua[i].valueTwo = dataArr;
                        }
                    }
                    this.dataList = dataListbianhua;
                    /* for(let i = 0; i < res.data.data.length; i++){
                        if( res.data.data[i].valueTwo === null){
                            this.dataList[i].valueTwo =[0,0]
                        } else {
                            let dataArr = this.dataList[i].valueTwo.split(",");
                            this.dataList[i].valueTwo = dataArr;
                        }
                    } */
                }).catch((err) => {
                    this.$message.error(err);
                });
            },
            addName() {
                if (this.dataList.length < 5) {
                    this.dataList.push({
                        name: this.dataList.length+1,
                        status: 1,
                        valueOne: [0,0],
                        valueTwo: [0,0]
                    });
                } else {
                    this.$layerNotice("提示", "最多写五条", () => {
                    }, null, "warning");
                }
            },
            deletName(i) {
                // this.$layerNotice("提示", "确定要删除吗？", () => {
                axios.delete("tideSunsetRestrict/" + this.dataList[i].id).then((e) => {
                    if (e.data.code === 0) {
                        // this.$showSimpleMessage("修改成功", "success");
                        this.dataList.splice(i, 1);
                    } else {
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === e.data.code).name, "error");
                    }
                }).catch((err) => {
                    this.$showSimpleMessage(err, "error");
                });
                // }, null, "warning");
            },
            /* mustNumber(val, box, name) {
                 if (val !== "" && val !== undefined && val !== null) {
                     if (val.length > 5) {
                         let a = val.substr(0, 4);
                         this.$set(box, name, a);
                         return;
                     }
                 } else {
                     this.$set(box, name, "1");
                     this.$message.error("不能为空");
                     return;
                 }
             }, */
            number(name,val,that) {
                if(val.target.value){
                    this.zhujian2= true;
                    this.$emit("ifxiugai",this.zhujian2)
                }
                if(val.target.value === ""){
                    this.$showSimpleMessage("输入格式不正确", "error");
                    this.$set(that,name,0);
                    return;
                }
                let value = val.target.value;
                if((value.match(/0/g)||[]).length>=3){
                    this.$set(that,name,0);
                    return;
                }
                if(isNaN(value)) {
                    value = 0;
                }
                if(value <= 0) {
                    value = Math.abs(value);
                }
                if(value.length > 6){
                    value = value.slice(0,6)
                }
                // value = value.substring(0,value.indexOf(".") + 3);
                //  value = Math.round(value * 100) / 100;
                // value = Math.round(value);
                if(value.includes(".")) {
                    let arr = value.split("");
                    if(arr[0] === "0") {
                        value = +value;
                    }
                    let len = value.length;
                    if( len > value.indexOf(".")+3) {
                        value = Number(value).toFixed(2);
                        this.$set(that,name,Number(value));
                    }
                } else {
                    let arr = value.split("");
                    if(arr[0] === "0") {
                        value = +value;
                    }
                    this.$set(that,name,value);
                }
            },
            // 潮汐流参数
            postData() {
                this.$layerNotice("提示", "确定要保存吗？", () => {
                    this.zhujian2= false;
                    this.$emit("ifxiugai",this.zhujian2)
                    this.dataList[0].name = "1";
                    for(let i = 0; i< this.dataList.length-1; i++){
                        let a = this.dataList[i].valueOne;
                        let b = this.dataList[i].valueTwo;
                        let c = this.dataList[i+1].valueOne;
                        let d = this.dataList[i+1].valueTwo;
                        /*if(a[0].charAt(a[0].length()-1) === '.'){
                            
                            this.$showSimpleMessage("不是一个正确的小数", "error");
                            return;
                        }
                        if(!(a[0].contains(".") && a[0].indexOf('.') === a[0].lastIndexOf("."))){
                            this.$showSimpleMessage("不是一个正确的小数", "error");
                            return;
                        }*/
                        if(i>0){
                            if(a[0]>b[1] || c[0]>d[1]){
                                if(a[0]>=a[1] || b[0]>=b[1] || c[0]>=c[1] || d[0]>=d[1]){
                                    this.$showSimpleMessage("区间值错误", "error");
                                    return;
                                };
                                if(c[0]< this.dataList[0].valueTwo[1] || d[1]>this.dataList[0].valueOne[0] || c[0]<d[1]){
                                    this.$showSimpleMessage("区间重复", "error");
                                    return;
                                }
                            } else {
                                this.$showSimpleMessage("请保持区间左侧大于右侧", "error");
                                return;
                            }
                        };
                        if(a[0]>b[1] || c[0]>d[1]){
                            if(i< this.dataList.length-1){
                                if(a[0]<c[1] || b[1]>d[0]){
                                    this.$showSimpleMessage("区间重复", "error");
                                    return;
                                }
                            };
                        }else{
                            this.$showSimpleMessage("请保持区间左侧大于右侧", "error");
                            return;
                        }
                    }

                    let dataLL = this.$tools.deepCopy(this.dataList);
                    this.dataList = [];
                    let dataList = this.$tools.deepCopy(dataLL);
                    setTimeout(()=> {
                        this.dataList = dataList;
                    });
                        dataLL.map(val => {
                            /*console.log(val)*/
                            val.valueOne = val.valueOne.toString();
                            val.valueTwo = val.valueTwo.toString();
                        });
                    this.tideSunsetRestricts = JSON.stringify(dataLL);
                    let data = {
                        tideSunsetRestricts: this.tideSunsetRestricts
                    }
                    axios.put("tideSunsetRestrict/", data).then((e) => {
                        if (e.data.code === 0) {
                            this.tideSunsetRestrict();
                            this.$showSimpleMessage("保存成功", "success");
                        } else {
                            this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === e.data.code).name, "error");
                        }
                    }).catch(error => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
            },
            // 通用参数
            handlerRemove() {
                let dataLL = this.$tools.deepCopy(this.dataListtong);
                this.sysParam = JSON.stringify(dataLL);
                let data = {
                    sysParamListStr: this.sysParam
                }
                axios.put("/sysparam/updatesysparambatch", data).then(() => {
                    this.$showSimpleMessage("修改成功", "success");
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            },
            // 情报阈值
            postDataqing() {
                let dataLL = this.$tools.deepCopy(this.dataListqing);
                dataLL.map(val => {
                    val.valuThree = val.valuThree.toString();
                    val.valuTwo = val.valuTwo.toString();
                    val.valuFive = val.valuFive.toString();
                    val.valuFour = val.valuFour.toString();
                })
                // console.log(dataLL)
                this.intelligences = JSON.stringify(dataLL);
                let data = {
                    intelligences: this.intelligences
                }
                axios.put("/intelligence/", data).then(() => {
                    this.$showSimpleMessage("修改成功", "success");
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            },
            // 处理通用参数字典行列
            changeColRows() {
                let dataListtong = this.dataListtong;
                let len = dataListtong.length;
                let ind = "";
                let num = 1;
                for(let i = 0; i< len; i++) {
                    dataListtong[i].row = 1;
                    dataListtong[i].col = 1;
                    if(i > 0 && dataListtong[i].type === dataListtong[i - 1].type) {
                        if(i > 1 && dataListtong[i].type !== dataListtong[i - 2].type) {
                            ind = i - 1;
                        }
                        num = num + 1;
                        dataListtong[i].row = 0;
                        dataListtong[i].col = 0;
                        dataListtong[ind].row = num;
                        dataListtong[ind].col = 1;
                    } else {
                        ind = "";
                        num = 1;
                        dataListtong[i].row = 1;
                        dataListtong[i].col = 1;
                    }
                }
            }
        }
    }
</script>
<style scoped>
    table th{ border:1px solid #132B4E; }
    .tems_Input1 {
        width: 100px !important;
        margin-top: 8px;
    }
    .tems_Input {
        width: 80px !important;
    }
    .main {
        height: 90%;
        width: 100%;
        overflow-y: auto;
    }
    .tablewz {
        margin-left: 30%;
    }
    hr{
        margin: 0 40px 35px 40px;
        border: 1px solid;
        background-color:#33A5FF;
        color:#33A5FF;
    }
    li {
        list-style-type:none;
    }
    .addDel{
        margin-left: 20px;
        margin-top: 10px;
        line-height: 24px;
    }
</style>
<style scoped>
    .tablewz /deep/ .el-input input::-webkit-outer-spin-button,
    .tablewz /deep/ .el-input input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }
    .tablewz /deep/ .el-input input[type="number"]{
        -moz-appearance: textfield !important;
    }
</style>