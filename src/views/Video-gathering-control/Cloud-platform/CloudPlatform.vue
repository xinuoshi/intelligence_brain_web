<template>
    <div>
        <Rvideo v-if="videoPage" @changePage="changeVideoPage"></Rvideo>
        <Tvideo v-if="!videoPage" @changePage="changeVideoPage"></Tvideo>
    </div>
</template>

<script>
import Rvideo from "./realtimeVideo";
import Tvideo from "./trainingVideo";

export default {
    name: "cloudPlatform",
    components: {
        Rvideo, Tvideo
    },
    data() {
        return {
            // 默认页面
            videoPage: 1 // 对应true
        };
    },
    methods: {
        // 改变页面
        changeVideoPage(bt) {
            this.videoPage = bt === "轮巡模式" ? 0 : 1;
        }
    },
    created() {
    },
    mounted() {
    }
};
</script>

<style>
</style>

<style scoped>

</style>
