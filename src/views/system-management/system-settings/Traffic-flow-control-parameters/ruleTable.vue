<template>
    <div>
        <div class="tableBox">
            <el-table :span-method="arraySpanMethod" border :data="tableList.list" class="tems_table" style="width: 100%" @selection-change="tableSelect">
                <el-table-column  type="selection" v-if="tableList.selection" />
                <el-table-column type="index" :index="tableList.index" v-if="tableList.index" width="80" label="序号" />
                <el-table-column  v-for="(item, index) in tableList.title" :key="index" :prop="item.name" :label="item.title" :width="item.width"></el-table-column>
                <el-table-column width="1" />
                <slot scope name="btn"></slot>
            </el-table>
        </div>
        <!-- 分页 -->
    </div>
</template>
<script>
export default {
    name: "tableCommon",
    props: ["tableList"],
    components: {
    },
    model: {
        event: "selectArySlected"
    },
    data() {
        return {

        };
    },
    watch: {
        array: function(val) {
            array = val;
        }
    },
    methods: {
        // 表格移动
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        },
        // 表格选中变化
        tableSelect(selection) {
            this.selection = selection;
            this.$emit("selectArySlected", this.selection);
        }
    },
    created() {

    },
    mounted() {

    }
};
</script>
