
<template>
    <!-- 潮汐流规律 -->
    <div></div>
</template>

<script>
    export default {
        name: "tidal-current",
        created() {
            this.$router.push({
                path: "/gisMap",
                query: {
                    pageStatus: "tidalLow"
                }
            });
        }
    };
</script>
<style>
</style>
