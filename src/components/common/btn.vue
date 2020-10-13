<template>
    <div>
        <el-row v-if="array[0] && array[0].group">
            <el-button-group>
                <el-button v-for="(item, index) in array" :class="item.class || 'clearBtn'" :key="item.index" :id="item.classId" :type="item.type" :size="item.size" :icon="item.icon" @click="change(index,  $event)" :circle="item.circle" :round="item.round" :plain="item.plain" :disabled="item.disabled" :loading="item.loading">{{item.title}}</el-button>
            </el-button-group>
        </el-row>
        <el-row v-else>
            <el-button v-for="(item, index) in array" :key="item.index" :class="item.class || 'clearBtn'" :id="item.classId" :type="item.type" :size="item.size" :icon="item.icon" @click="change(index,  $event)" :circle="item.circle" :round="item.round" :plain="item.plain" :disabled="item.disabled" :loading="item.loading">{{item.title}}</el-button>
        </el-row>
        <div slot="s"></div>
    </div>
</template>
<script>
export default {
    props: ["buttonList", "dataId", "itemScope"], // buttonList  按钮列表 dataId 对应列的数据id itemScope对应的table里面的数据
    data() {
        return {
            array: []
        };
    },
    created() {
        let array = JSON.parse(JSON.stringify(this.buttonList));
        this.array = array;
    },
    watch: {
        "buttonList": function() {
            let array = JSON.parse(JSON.stringify(this.buttonList));
            this.array = array;
        },
        "dataId": function(val) {
        }
    },
    methods: {
        change(index, event) {
            let param = {
                "index": index,
                "event": event
            };
            if (this.dataId) {
                param.dataId = this.dataId;
            }
            if (this.itemScope) {
                param.itemScope = this.itemScope;
            }
            this.$emit("operation", param);
        }
    }
};

// buttonList为传过来的数组
// 如果使用el-group 则在buttonList[0]中加入group：true字段
// title:"primary", //按钮文字
// type:"info", //按钮类型： success , info, warning, danger, text, primary
// plain: true, //是否是朴素按钮 true false
// circle: true,  //是否是圆 true false
// disabled: true, //是否禁用 true false
// round: true, //是否是圆角 true false
// icon: "el-icon-share",//按钮图标： el-icon-delete el-icon-edit el-icon-share el-icon-upload el-icon--right
// size: "small", //按钮大小：small medium mini
// loading: true, // 是否显示加载状态
// cb:function   //点击按钮执行的父级的无参函数

// 返回的值
// index 第n个按钮
// itemScope 按钮所在表格的行的数据
// dataId 按钮所在行的数据的id
// event 点击的事件
</script>
