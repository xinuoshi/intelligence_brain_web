<template>
    <div class="scrollPart" id="scrollDPart">
        <el-form :model="formValidate" :rules="ruleValidate" ref="formValidateEmpty" label-width="80px" class="demo-ruleForm">
            <div v-for="(item, index) in EditDialogList"
                :key="index">
                <el-form-item v-if="!item.option" :label="item.name+':'" :prop="item.key">
                    <el-input class="tems_Input" v-model="EditDialogList.list[key]" clearable size="small" />
                </el-form-item>
                <el-form-item v-else :label="item.name+':'" :prop="item.key">
                    <el-select class="tems_Input" v-model="formValidate[lowerMenuBarList[upIsIndex].nextList[isActive].list[index].key]" filterable clearable size="small">
                        <el-option v-for="(items, index) in item.option" :key="index" :label="items.label" :value="items.value" />
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import Assembly from "@/views/system-management/asset-management/asset-common/Assembly";

export default {
    name: "EditDialog",
    props: ["EditDialogList"],
    data() {
        return {
            ruleValidate: [],
            EditDialogList: {
                list: [
                    { name: "行人岛",
                        key: "pedestrianIsland",
                        option: [
                            { label: "是", value: "1" },
                            { label: "否", value: "0" }
                        ] },
                    { name: "道路一",
                        key: "roadOneId",
                        option: [] },
                    { name: "道路二",
                        key: "roadTwoId",
                        option: [] },
                    { name: "点位编号", key: "number" },
                    { name: "点位类型",
                        key: "type",
                        option: [
                            { label: "十字型", value: "十字型" },
                            { label: "T型", value: "T型" },
                            { label: "Y型", value: "Y型" },
                            { label: "多岔型", value: "多岔型" },
                            { label: "环岛", value: "环岛" },
                            { label: "畸形口", value: "畸形口" },
                            { label: "路侧（中央）", value: "路侧（中央）" }
                        ] },
                    { name: "经度", key: "longitude" },
                    { name: "纬度", key: "latitude" },
                    { name: "机箱位置",
                        key: "location",
                        option: [
                            { label: "点位东南角", value: "点位东南角" },
                            { label: "点位东北角", value: "点位东北角" },
                            { label: "点位西北角", value: "点位西北角" },
                            { label: "点位西南角", value: "点位西南角" }
                        ] },
                    { name: "供电来源",
                        key: "power",
                        option: [
                            { label: "专用供电", value: "专用供电" },
                            { label: "公用设施用电", value: "公用设施用电" },
                            { label: "小区用电", value: "小区用电" },
                            { label: "门卫室取电", value: "门卫室取电" },
                            { label: "路灯取电", value: "路灯取电" },
                            { label: "其他", value: "其他" }
                        ] },
                    { name: "点位级别",
                        key: "grade",
                        option: [
                            { lable: "1", value: "1" },
                            { lable: "2", value: "2" },
                            { lable: "3", value: "3" }
                        ] },
                    { name: "所属辖区", key: "districtId", option: [] },
                    { name: "备注", key: "rests" }
                ]
            }
        };
    }
};
</script>
