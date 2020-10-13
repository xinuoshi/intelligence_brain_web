/*
* @Author: lijin
* @Date: 2018-09-04 09:29:45
 * @Last Modified by: howard.wanghao
 * @Last Modified time: 2018-12-28 10:33:09
*/
<template>
    <div>
        <api class="classapi">
            <!-- 下级菜单栏 -->
            <div slot="lowerMenuBar" class="flexRow">
                <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="jump(index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.name}}</div>
                <div class="lowerMenuBarListActiveHr"></div>
            </div>
            <!-- 切换窗 -->
           <!-- <div slot="equipmentChangeName">
                <span class="equipmentChangeName" :class="{equipmentChangeNameActive: index === isActive}" @click="changEquipment(item),isActive = index" v-for="(item, index) in lowerMenuBarList[upIsIndex].equipmentTypeList" :key="item.index">{{item.name}}</span>
            </div>-->
            <!-- 插槽 -->
            <!--<router-view slot="table"></router-view>-->
            <div slot="table">
                <div>
                    <div class="main" :scrollTop.prop="scrollTop">
                        <datamanagement class="tablewzl" :checkTongboo="checkTongboo" v-if="checkTongmenu" @ifxiugai=ifxiugai1></datamanagement>
                        <tidalflow class="tablewzl" :checkGKboo="checkGKboo" v-if="checkGKmenu" @ifxiugai=ifxiugai2></tidalflow>
                        <Intelligencethreshold class="tablewzl" :checkQFboo="checkQFboo" v-if="checkQFmenu" @ifxiugai=ifxiugai3></Intelligencethreshold>
                        <warningrules class="tablewzl" :checkQCboo="checkQCboo" v-if="checkQCmenu" @ifxiugai=ifxiugai4></warningrules>
                        <deviationlinelimit ref="aa" :checkXXall="checkXXall" v-if="checkXXmenu" class="tablewzl"></deviationlinelimit>
                    </div>
                </div>
            </div>
        </api>
    </div>
</template>
<style >

</style>
<script>
import deviationlinelimit from "./deviation-line-limit.vue";
import warningrules from "./warning-rules.vue";
import tidalflow from "./tidal-flow.vue";
import datamanagement from "./data-management.vue";
import Intelligencethreshold from "./Intelligence-threshold.vue";
export default {
    name: "tidal-Flow-index",
    components: {
        warningrules,
        deviationlinelimit,
        Intelligencethreshold,
        tidalflow,
        datamanagement
    },
    data() {
        return {
            checkTongboo: true,
            checkGKboo: true,
            checkQFboo: true,
            checkQCboo: true,
            checkXXall: [],
            checkTongmenu: true,
            checkGKmenu: true,
            checkQFmenu: true,
            checkQCmenu: true,
            checkXXmenu: true,
            ifxiu:[false,false,false,false],
            upIsIndex: 0,
            // 切换窗是否切换
            isActive: 0,
            // 搜索传参
            searchName: [],
            // 左侧下级导航菜单列表
            lowerMenuBarList: [
                /*{ name: "通用参数",
                    // 切换窗分好类的设备列表
                    equipmentTypeList: [
                        { name: "数据管理", path: "/datamanagement" }
                    ]
                },
                { name: "交通流管控参数",
                    equipmentTypeList: [
                        { name: "潮汐流指数阈值", path: "/tidalflow" }
                    ]
                },
                { name: "情报检测阈值",
                    equipmentTypeList: [
                        { name: "情报涉及阈值", path: "/intelligencethreshold" }
                    ]
                },
                { name: "情报观测参数",
                    equipmentTypeList: [
                        /!* {name:"情报检测间隔时间", path: "/intelligenceinterval"}, *!/
                        /!* {name:"情报涉及阈值", path: "/intelligencethreshold"}, *!/
                        { name: "情报观测参数", path: "/warningrules" },
                        { name: "偏离/限行参数", path: "/deviationLineimit" }
                    ]
                },
                { name: "偏离/限行参数",
                    equipmentTypeList: [
                        /!* {name:"情报检测间隔时间", path: "/intelligenceinterval"}, *!/
                        /!* {name:"情报涉及阈值", path: "/intelligencethreshold"}, *!/
                        { name: "情报观测参数", path: "/warningrules" },
                        { name: "偏离/限行参数", path: "/deviationLineimit" }
                    ]
                }*/
            ],
            detectionDirectionId: "",
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
            reFresh: false,
            scrollTop: 0
        };
    },
    methods: {
        checkAdult(item) {
            return item.name === "系统配置";
        },
        checkButton(item) {
            return item.name === "参数管理";
        },
        checkTong(item) {
            return item.name === "通用参数";
        },
        checkGK(item) {
            return item.name === "交通流管控参数";
        },
        checkQF(item) {
            return item.name === "情报检测阈值";
        },
        checkQC(item) {
            return item.name === "情报观测参数";
        },
        checkXX(item) {
            return item.name === "偏离/限行参数";
        },
        ifxiugai1(val){
            this.ifxiu[0] = val
        },
        ifxiugai2(val){
            this.ifxiu[1] = val
        },
        ifxiugai3(val){
            this.ifxiu[2] = val
        },
        ifxiugai4(val){
            this.ifxiu[3] = val
        },
        onScroll() {
            this.$refs.aa.$children[0].$children[0].$children[0].$children[0].blur();
            this.$refs.aa.$children[0].$children[0].$children[1].$children[0].blur();
            this.$refs.aa.$children[0].$children[0].$children[2].$children[0].$children[0].$attrs.placeholder = "";
            // console.log(this.$refs.aa.$children[0].$children[0].$children[2].$children[0])
            let scrolled = document.getElementsByClassName("dataTableCss")[0].scrollTop;
            const cateItem = document.querySelectorAll(".tablewzl");
            let cateItemone = cateItem[0].offsetTop; // 128  第一个模块到顶部的距离
            for (let i = 0; i < this.lowerMenuBarList.length; i++) {
                let total = cateItem[i].offsetTop - cateItemone;
                if (i !== this.lowerMenuBarList.length - 1) {
                    if (scrolled >= (cateItem[i + 1].offsetTop - cateItemone)) {
                        this.upIsIndex = i + 1;
                    } else {
                        if (scrolled < (cateItem[i + 1].offsetTop - cateItemone) && scrolled >= total) {
                            this.upIsIndex = i;
                        }
                    }
                }
            }
            /* if (scrolled < 211 && scrolled >= 0) {
                this.upIsIndex = 0;
            } else if (scrolled < 466 && scrolled >= 211) {
                this.upIsIndex = 1;
            } else if (scrolled < 773 && scrolled >= 466) {
                this.upIsIndex = 2;
            } else if (scrolled < 1513 && scrolled >= 773) {
                this.upIsIndex = 3;
            } else {
                this.upIsIndex = 4;
            } */
        },
        jump(index) {
            const cateItem = document.querySelectorAll(".tablewzl");
            // 模块到顶部的距离
            let total = cateItem[index].offsetTop - cateItem[0].offsetTop;
            // 滚动条到模块齐平位置的距离 两模块差等于一个滚动条移动距离
            let distance = document.getElementsByClassName("dataTableCss")[0].scrollTop; // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
            // 滚动速度
            let step = total / 20;
            if (total > distance) {
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 20;
                smoothUp();
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step;
                    document.getElementsByClassName("dataTableCss")[0].scrollTop = distance;
                    setTimeout(smoothDown, 10);
                } else {
                    document.getElementsByClassName("dataTableCss")[0].scrollTop = total+1;
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step;
                    document.getElementsByClassName("dataTableCss")[0].scrollTop = distance;
                    setTimeout(smoothUp, 10);
                } else {
                    document.getElementsByClassName("dataTableCss")[0].scrollTop = total+3;
                }
            }
        },
        changEquipment(item) {
            this.$router.push({
                path: item.path
            });
        },
        // 下级菜单切换
        urlHref(index) {
            if (index !== this.upIsIndex) {
                this.upIsIndex = index;
                this.isActive = 0;

            }
            this.changEquipment(this.lowerMenuBarList[this.upIsIndex].equipmentTypeList[0]);
        }

    },
    watch: {
        /* $route: {
            handler: function(val, oldVal){
                console.log(val);
            },
            // 深度观察监听
            deep: true
        } */
    },
    // 离开当前页面前执行
    beforeRouteLeave(to, from, next) {
        let changeRe = this.ifxiu.find(t => t === true);
        if (changeRe) {
            this.$layerNotice("提示", "确定参数保存完毕，离开当前页面吗？", () => {
                next(true);
            }, () => {
                this.$router.push({ path: "/tidalFlowindex" }); // 返回键要返回的路由
            }, "warning");
        } else {
            next(true);
        }
    },
    async created() {
        // 处理按钮权限
        let checkTong1 = [];
        let checkGK1 = [];
        let checkQF1 = [];
        let checkQC1 = [];
        let checkXX1 = [];
        let checkXX2 = [];
        let aaa = [];
        let item = this.$store.state.authData.find(this.checkAdult);
        aaa = item.nextlevel.find(this.checkButton).nextlevel;
        console.log(aaa)
        aaa.map(t=>{
            this.lowerMenuBarList.push({name: t.name})
        })
        checkTong1 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkTong).button1;
        this.checkTongmenu = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkTong);
        checkGK1 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkGK).button1;
        this.checkGKmenu = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkGK);
        checkQF1 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkQF).button1;
        this.checkQFmenu = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkQF);
        checkQC1 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkQC).button1;
        this.checkQCmenu = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkQC);
        checkXX1 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkXX).button1;
        checkXX2 = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkXX).button2;
        this.checkXXmenu = item.nextlevel.find(this.checkButton).nextlevel.find(this.checkXX);
        if (checkTong1[0].name !== "保存"){
            this.checkTongboo = false
        };
        if (checkGK1[0].name !== "保存"){
            this.checkGKboo = false
        };
        if (checkQF1[0].name !== "保存"){
            this.checkQFboo = false
        };
        if (checkQC1[0].name !== "保存"){
            this.checkQCboo = false
        };
        this.checkXXall.push(checkXX1)
        this.checkXXall.push(checkXX2)
    },
    mounted() {
        this.$nextTick(function() {
            // 监听滚动条滚动 addEventListener给滚动事件scroll增加函数
            document.getElementsByClassName("dataTableCss")[0].addEventListener("scroll", this.onScroll);
        });
        this.changEquipment(this.lowerMenuBarList[this.upIsIndex].equipmentTypeList[0]);
    }
};
</script>
<style scoped>
    .tablewzl {
        margin-bottom: 20px;
    }
    .classapi /deep/ .dataTableCss{
        height: 62vh !important;
        overflow-y: scroll !important;
    }
    .main {
        float: left;
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
</style>
