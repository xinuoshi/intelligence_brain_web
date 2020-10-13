
<template>
    <!-- 拥堵规律 -->
    <div></div>
</template>

<script>
    export default {
        name: "rule-of-congestion",
        mounted() {
            this.$router.push({
                path: "/gisMap",
                query: {
                    pageStatus: "trafficLow"
                }
            });
        }
    };
</script>
<style>
</style>
