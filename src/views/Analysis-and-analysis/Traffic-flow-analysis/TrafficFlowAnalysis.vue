<template>
    <div>
        <api>
            <!-- 下级菜单栏 -->
            <div slot="lowerMenuBar" class="flexRow">
                <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="urlHref(index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.name}}</div>
            </div>
            <!-- 切换窗 -->
            <!-- <div slot="equipmentChangeName">
                 <span class="equipmentChangeName" :class="{equipmentChangeNameActive: index === isActive}" @click="changEquipment(item),isActive = index" v-for="(item, index) in lowerMenuBarList[upIsIndex].equipmentTypeList" :key="item.index">{{item.name}}</span>
             </div>-->
            <!-- 插槽 -->
            <router-view slot="table"></router-view>
        </api>
    </div>
</template>

<script>
    export default {
        name: "tidal-Flow-index",
        components: {

        },
        watch: {
            "$route"(to, from) {
                if (to.path === "/TrafficFlowAnalysis" || from.path === "/TrafficFlowAnalysis") {
                    this.upIsIndex = 0;
                    setTimeout(() => {
                        this.changEquipment(this.lowerMenuBarList[this.upIsIndex].equipmentTypeList[0]);
                    });
                }
            }
        },
        data() {
            return {
                upIsIndex: 0,
                // 切换窗是否切换
                isActive: 0,
                // 搜索传参
                searchName: [],
                // 左侧下级导航菜单列表
                lowerMenuBarListop: [
                    { name: "交通流管理评价",
                        // 切换窗分好类的设备列表
                        equipmentTypeList: [
                            {name:"交通流管理评价", path: "/TrafficFlowManagement"}
                        ]
                    },
                ],
                lowerMenuBarList: [],
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
                // 弹窗所需传参
                EditDialogList: {
                    RowId: "",
                    EditDialog: false,
                    equipmentTypeList: [],
                    // 点位级别是否可用
                    Usable: false,
                    // 是创建还是编辑
                    beforeTitle: "创建"
                },
                reSet: false, // 重置搜索状态值(仅在需要多页使用同一个路由的情况下使用)
                typeIndex: 0, // 切换菜单时传入对应行号(仅在需要多页使用同一个路由的情况下使用)
                payload: "", // 搜索回调传入的搜索参数
                // 刷新页面
                reFresh: false
            };
        },
        methods: {
            operation(data) {
                let args = this.buttonList[data.Index].functionKeyName.split(":");
                let fn = eval(`this.${args.shift()}`);
                fn.apply(this, args);
            },
            // 下级菜单切换
            urlHref(index) {
                if (index !== this.upIsIndex) {
                    this.upIsIndex = index;
                    this.isActive = 0;
                }
                this.changEquipment(this.lowerMenuBarList[this.upIsIndex].equipmentTypeList[0]);
            },
            reSetOver() {
                this.reSet = false;
            },
            changEquipment(item) {
                this.EditDialogList.equipmentTypeList = item;
                this.$router.push({
                    path: item.path
                });
            },
            // 保存按钮
            submitButton() {
                this.EditDialogList.EditDialog = false;
                this.reFresh = !this.EditDialogList.EditDialog;
            },
        },
        mounted() {
            this.changEquipment(this.lowerMenuBarList[this.upIsIndex].equipmentTypeList[0]);
        },
        created() {
            // 处理权限
            let item = this.$store.state.authData.find(t => t.name === "研判分析");
            if (item) {
                let otem = item.nextlevel.find(e => e.name === "交通流分析");
                if (otem) {
                    otem.nextlevel.map(el => {
                        let op = this.lowerMenuBarListop.find(ele => ele.name === el.name);
                        if (op) {
                            this.lowerMenuBarList = [...this.lowerMenuBarList, op];
                        }
                    });
                }
            }
        }
    };
</script>
<style>
</style>
