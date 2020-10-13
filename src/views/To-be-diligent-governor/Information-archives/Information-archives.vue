<template>
    <api>
        <!-- 下级菜单栏 -->
        <div slot="lowerMenuBar" class="flexRow OthersC">
            <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="urlHref(index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.name}}</div>
        </div>
        <!-- 插槽 -->
        <router-view slot="table"></router-view>
    </api>
</template>

<script>
    export default {
        name: "tidal-Flow-index",
        watch: {
            "$route"(to, from) {
                if (to.path === "/InformationArchives" || from.path === "/customintelligence") {
                    setTimeout(() => {
                        this.urlHref(this.upIsIndex);
                    });
                }
            }
        },
        data() {
            return {
                upIsIndex: 0,
                // 左侧下级导航菜单列表
                lowerMenuBarList: [
                    { 
                        name: "自定义情报档案", path: "/customintelligence"
                    },
                    { 
                        name: "告警情报档案" , path: "/policeintelligence"
                    },
                ]
            };
        },
        methods: {
            // 下级菜单切换
            urlHref(index) {
                this.upIsIndex = index;
                this.$router.push({
                    path: this.lowerMenuBarList[this.upIsIndex].path
                });
            }
        },
        mounted(){
            this.urlHref(0);
        }
    };
</script>
<style>
.dataTableCss .rightBody{
    margin-top:-15px !important ;
}
</style>
