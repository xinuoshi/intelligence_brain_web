<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false" :title="title" :lock-scroll="true" ref="form" v-dialogDrag :show-close="true" :visible.sync="ifShowTree" class="tems_dialog cwl" width="1150px" :close-on-click-modal="false" :before-close="closeDialog">
        <div class="scrollPart" id="scrollDPart">
            <ruleUnitTreeTableVue class="treeTable" ref="recTree" :list.sync="department.children" @handlerExpand="handlerExpand"></ruleUnitTreeTableVue>
        </div>
    </el-dialog>
</template>
<script>
import ruleUnitTreeTableVue from './ruleUnit-tree-table.vue';
export default {
    props: ["depaetment","ifShowTree"],
    components: {
        ruleUnitTreeTableVue
    },
    data() {
        return {
            
        };
    }
}
</script>