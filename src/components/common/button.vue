
<template>
    <div>
        <el-row v-if="array[0] && array[0].group">
            <el-button-group>
                <el-button v-for="(item, index) in array"  :class="item.class || 'clearBtn'" :key="item.index" :id="item.classId" :type="item.type" :size="item.size" :icon="item.icon" @click="change(index)" :circle="item.circle" :round="item.round" :plain="item.plain" :disabled="item.disabled" :loading="item.loading">{{item.title}}</el-button>
            </el-button-group>
        </el-row>
        <el-row v-else>
            <el-button v-for="(item, index) in array" :key="item.index" :class="item.class || 'clearBtn'" :id="item.classId" :type="item.type" :size="item.size" :icon="item.icon" @click="change(index)" :circle="item.circle" :round="item.round" :plain="item.plain" :disabled="item.disabled" :loading="item.loading">
                {{item.title}}                
            </el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    props: ["buttonList", "dataId"],
    data() {
        return {
            array: []
        };
    },
    created() {
        this.$nextTick(() => {
            this.getArry();                
            this.changALL();
        });
    },
    watch: {
        "dataId": function(val) {
            if (val) {
                this.changALL();
            }
        },
        "buttonList": {
            handler(newName, oldName) {
                if (newName) {
                    this.getArry();
                }
            },
            deep: true
        }
    },
    methods: {
        // 获取Arry
        getArry() {
            let array = JSON.parse(JSON.stringify(this.buttonList));
            this.array = array;
        },
        // 多个按钮点击
        change(index) {
            this.$emit("operation", { index: index, id: this.dataId, title: this.array[index].title });
        },
        // 按钮点击
        changeStatus(index) {
            this.array[index].loading = !this.array[index].loading;
        },
        // 按钮状态改变
        changALL() {
            let arryName = this.array;
            let arryLength = arryName.length;
            for (let i = 0; i < arryLength; i++) {
                let changBtn = arryName[i].chang;
                if (changBtn) {
                    let juge = arryName[i].chang.prop;
                    let jugeList = ["启用" , "正常" , 1 , "1"];
                    juge = jugeList.filter(t=>t === this.dataId[juge]);
                    let isNumber = (juge.length > 0) ? 0 : 1;
                    let status = (changBtn.status === isNumber);
                    // 一般的启用停用按钮格式直接搜索changStop和changStar，并且数组里只含有这两个搜索
                    if (changBtn.changStop && changBtn.changStar) {
                        arryName[i].title = status ? changBtn.changStar[0] : changBtn.changStop[0];
                        arryName[i].class = changBtn.changStar[1] ? status ? changBtn.changStar[1] : changBtn.changStop[1] : "qiliang";
                    }
                    // 自定义按钮装换状态，涉及AI配置表格按钮（启用停用以及不显示三个状态，这个也可以用下面的方法比较简单），情报自定义关闭事件按钮
                    if (changBtn.changSutus) {
                        let juge2 = changBtn.changSutus[2];
                        juge2 = (this.dataId[juge2] === changBtn.changSutus[3]);
                        arryName[i].title = juge2 ? (changBtn.changSutusOther ? changBtn.changSutusOther[0] : arryName[i].title) : changBtn.changSutus[0];
                        arryName[i].class = juge2 ? (changBtn.changSutusOther ? changBtn.changSutusOther[1] : arryName[i].class): changBtn.changSutus[1];
                    }
                    // 涉及字典和资产页面表格按钮搜索changSutusAll即可知道格式（适用于启用停用和不显示三种状态）
                    if (changBtn.changSutusAll) {
                        for (let g in changBtn.changSutusAll){
                            // All每条循环数组
                            let All = changBtn.changSutusAll[g];
                            let backStus = this.dataId[All[2]];
                            let panduan = this.$store.state[All[4]].find(t=>t.value === backStus);
                            backStus = panduan ? panduan.name : backStus;
                            backStus = backStus.toString()===All[3].toString();
                            if(backStus){
                                arryName[i].title = All[0];
                                arryName[i].class = All[1];
                            }
                        }
                    }
                    // 涉及情报自定义页面表格按钮（编辑和删除）搜索changSutusBiJiao即可知道格式适用于根据时间大小进行判断是否显示此按钮
                    if (changBtn.changSutusBiJiao) {
                        for (let g in changBtn.changSutusBiJiao){
                            // All每条循环数组
                            let All = changBtn.changSutusBiJiao[g];
                            let backStus = this.$filter.timesFormat(this.dataId[All[2]]);
                            backStus = backStus < this.$filter.timesFormat(All[3]);
                            backStus = backStus === All[4];
                            if(backStus){
                                arryName[i].title = All[0];
                                arryName[i].class = All[1];
                            }
                        }
                    }
                }
            }
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
// 父组件ref绑定子组件的changeStatus方法，当点击按钮，进行截留，防止重复点击
</script>
