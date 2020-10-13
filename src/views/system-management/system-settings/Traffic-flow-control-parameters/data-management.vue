/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
 * @Last Modified by: chase
 * @Last Modified time: 2018-10-24 11:07:51
*/
<template>
    <div>
        <div style="background-color: #0a1a2d;height: 400px">
            <h3 style="text-align: left;margin-left: 40px;padding-top: 10px">数据存储时长</h3>
            <!--<hr/>-->
            <div class="tablewz" index="01">
                <table cellspacing="0" cellpadding="0" style="width: 600px;height: 300px;">
                    <tr style="background-color: #132B4E">
                        <th style="vertical-align:middle;">数据时长</th>
                        <th style="vertical-align:middle;">数据分类</th>
                        <th style="vertical-align:middle;">存储时长</th>
                    </tr>
                    <tr v-for="(tab,key) in dataListtong" :key="key">
                        <td style="vertical-align:middle;" :rowspan="tab.row" v-if="tab.col !== 0" :colspan="tab.col">{{tab.type}}</td>
                        <td style="vertical-align:middle;">{{tab.paramKey}}</td>
                        <td style="vertical-align:middle;"><el-input type="number" class="tems_Input" size="mini" @keyup.native="number('value',$event,tab)" v-model="tab.value"/> 天</td>
                    </tr>
                </table>
                <div class="titlePart" style="width: 600px;margin: 20px 0;">
            <span class="tems_Button exportBtn" v-if="checkTongboo" @click="handlerRemove()">
                保存
            </span>
                </div>
            </div>
            <!--<hr/>
            <div class="tablewz" index="02">
                <table>
                    <tr>
                        <th>
                            级别
                        </th>
                        <th>
                            CXI范围
                        </th>
                    </tr>
                    <tr v-for="(tab,key) in dataList" :key="key">
                        <td>
                            <span>{{tab.name}}：</span>
                        </td>
                        <td>
                            <span v-if="tab.name === '潮汐流一级'"><el-input class="tems_Input" min="0" @keyup.native="number('0',$event,tab.valueOne)" v-model="tab.valueOne[0]" size="mini"/>≤CXI</span>
                            <span v-else><el-input class="tems_Input" min="1.55" @keyup.native="number('0',$event,tab.valueOne)" v-model="tab.valueOne[0]" size="mini"/>≤CXI＜<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valueOne)" v-model="tab.valueOne[1]" /></span>或
                            <span v-if="tab.name === '潮汐流一级'">CXI≤<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valueTwo)" v-model="tab.valueTwo[1]" /></span>
                            <span v-else><el-input class="tems_Input" min="0" size="mini" @keyup.native="number('0',$event,tab.valueTwo)" v-model="tab.valueTwo[0]" />＜CXI≤<el-input class="tems_Input" min="0" size="mini" @keyup.native="number('1',$event,tab.valueTwo)" v-model="tab.valueTwo[1]" /></span>
                        </td>
                    </tr>
                </table>
                <div class="titlePart">
            <span class="tems_Button qiliang" @click="postData()">
                保存
            </span>
                </div>
            </div>
            <hr/>
            <div class="tablewz" index="03">
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
<style scoped>
    table tr td { border:1px solid #132B4E; }
    .tablewz /deep/ .el-input input::-webkit-outer-spin-button,
    .tablewz /deep/ .el-input input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }
    .tablewz /deep/ .el-input input[type="number"]{
        -moz-appearance: textfield !important;
    }
</style>
<script>
    export default {
        name: "datamanagement",
        props: ["checkTongboo"],
        components: {},
        data() {
            return {
                zhujian1: false,
                tideSunsetRestricts: "",
                valueOnelist: [],
                aboutMsg: "我是about组件",
                dataList: "",
                dataListtong: [],
                dataListqing: "",
                menuList:[
                    {id:1,name:1},
                    {id:2,name:2},
                    {id:3,name:3}
                ]
            }
        },
        created() {
            // 潮汐流
            axios.get("tideSunsetRestrict/").then((res) => {
                this.dataList = res.data.data;
                for(let i = 0; i < res.data.data.length; i++){
                    if( res.data.data[i].valueOne === null){
                        this.dataList[i].valueOne =[0,0]
                    } else {
                        let dataArr = this.dataList[i].valueOne.split(",");
                        this.dataList[i].valueOne = dataArr;
                    }
                };
                for(let i = 0; i < res.data.data.length; i++){
                    if( res.data.data[i].valueTwo === null){
                        this.dataList[i].valueTwo =[0,0]
                    } else {
                        let dataArr = this.dataList[i].valueTwo.split(",");
                        this.dataList[i].valueTwo = dataArr;
                    }
                }
            }).catch((err) => {
                this.$message.error(err);
            });
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
        mounted: function () {
            this.$emit("ifxiugai",this.zhujian1)
            this.$nextTick(function () {
                document.getElementsByClassName("main")[0].addEventListener('scroll', this.onScroll);
            })
        },
        methods: {
            /* onScroll () {
                let scrolled = document.getElementsByClassName("main")[0].scrollTop;
                // 422、687分别为第二个和第三个锚点对应的距离
                if (scrolled >= 422) {
                    console.log(2)
                    // alert("3")
                } else if (scrolled < 422 && scrolled >= 201) {
                    console.log(1)
                    // alert("2")
                } else {
                    console.log(0)
                    // alert("1")
                }
            }, */
            jump(index){
                const cateItem = document.querySelectorAll('.tablewz');
                let total = cateItem[index].offsetTop;
                let distance = document.documentElement.scrollTop || document.body.scrollTop; // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
                let step = total / 50;
                if (total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total;
                    step = newTotal / 50;
                    smoothUp()
                }
                function smoothDown () {
                    if (distance < total) {
                        distance += step;
                        document.body.scrollTop = distance;
                        document.documentElement.scrollTop = distance;
                        setTimeout(smoothDown, 10);
                    } else {
                        document.body.scrollTop = total;
                        document.documentElement.scrollTop = total;
                    }
                }
                function smoothUp () {
                    if (distance > total) {
                        distance -= step;
                        document.body.scrollTop = distance;
                        document.documentElement.scrollTop = distance;
                        setTimeout(smoothUp, 10);
                    } else {
                        document.body.scrollTop = total;
                        document.documentElement.scrollTop = total;
                    }
                }
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
                   this.zhujian1= true;
                   this.$emit("ifxiugai",this.zhujian1)
            }
                let value = val.target.value;
                if(isNaN(value)) {
                    value = 0;
                }
                if(value < 0) {
                    value = Math.abs(value);
                }
                if(value.length > 6){
                    value = value.slice(0,6)
                }
                value = Math.round(value);
                this.$set(that,name,value);
            },
            // 潮汐流参数
            postData() {
                let dataLL = this.$tools.deepCopy(this.dataList);
                dataLL.map(val => {
                    val.valueOne = val.valueOne.toString();
                    val.valueTwo = val.valueTwo.toString();
                })
                this.tideSunsetRestricts = JSON.stringify(dataLL);
                let data = {
                    tideSunsetRestricts: this.tideSunsetRestricts
                }
                axios.put("tideSunsetRestrict/", data).then(() => {
                    this.$showSimpleMessage("修改成功", "success");
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            },
            // 通用参数
            handlerRemove() {
                this.zhujian1= false;
                this.$emit("ifxiugai",this.zhujian1)
                /* let isAxios = false;
                 this.dataListtong.map(t => {
                     if ((t.value).match(/\D/)!==null) {
                         isAxios = true;
                     }
                 });
                 if (isAxios) {
                     this.$showSimpleMessage("内容中包含非法字符，请重新输入！", "error");
                 } else {*/
                this.$layerNotice("提示", "确定要保存吗？", () => {
                    let dataLL = this.$tools.deepCopy(this.dataListtong);
                    this.dataListtong = [];
                    let dataListtong = this.$tools.deepCopy(dataLL);
                    setTimeout(()=> {
                        this.dataListtong = dataListtong;
                    });
                    this.sysParam = JSON.stringify(dataLL);
                    let data = {
                        sysParamListStr: this.sysParam
                    }
                    axios.put("/sysparam/updatesysparambatch", data).then(() => {
                        this.$showSimpleMessage("保存成功", "success");
                    }).catch(error => {
                        this.$showSimpleMessage(error, "error");
                    });
                }, null, "warning");
                /* }*/
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
                let ind = 0;
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
                        ind = 0;
                        num = 1;
                        dataListtong[i].row = 1;
                        dataListtong[i].col = 1;
                    }
                }
            }
        },
    }
</script>
<style scoped>
    .menu-title-list {
        width: 10%;
        float: left;
    }
    .tems_Input {
        width: 80px !important;
    }
    .main {
        float: left;
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
</style>