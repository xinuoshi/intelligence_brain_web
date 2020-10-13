<template>
    <div class="rightBody flexColumn flexNum">
           <!--下级菜单栏  -->
        <div class="lowerMenuBar">
            <slot name="lowerMenuBar"></slot>
        </div>
        <!-- 主要内容区域 -->
        <div class="subordinateSubject flexColumn flexNum">
            <!-- (以下每个div都是横向排列) -->
            <!-- 切换窗 -->
            <div class="parentequipmentChangeName">
                <slot name="equipmentChangeName"></slot>
            </div>
            <!-- 搜索栏 -->
            <div class="searchBoxBar flexRow ">
                <slot name="searchBoxBar"></slot>
            </div>
            <slot name="tips"></slot>
            <!-- 表格数据栏 -->
            <div class="dataTableCss flexNum">
                <slot name="table"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        handlerStartGroup(args) {
        },
        handlerStopGroup(args) {
        },
        async getData(args) {
            return await axios.get(args.api, { params: args.params }).then((res) => {
                return res;
            });
        },
        async getAsyncData(args) {
            return await axios.get(args.api).then((res) => {
                return res;
            });
        },
        async postData(args) {
            return await axios.post(args.api, args).then((res) => {
                return res;
            });
        },
        async putData(args) {
            return await axios.put(args.api, args).then((res) => {
                return res;
            });
        }
    }
};
</script>
