
<template>
    <!-- 营运车辆规律 -->
    <div></div>
</template>

<script>
    export default {
        name: "operating-vehicleRule",
        created() {
            this.$router.push({
                path: "/gisMap",
                query: {
                    pageStatus: "carLow"
                }
            });
        }
    };
</script>
<style>
</style>
