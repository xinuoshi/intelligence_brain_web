
<template>
    <!-- OD规律 -->
    <div></div>
</template>

<script>
    export default {
        name: "od-law",
        created() {
            this.$router.push({
                path: "/gisMap",
                query: {
                    pageStatus: "ODLow"
                }
            });
        }
    };
</script>
<style>
</style>
