/*
 * @Author: Eco.dujun
 * @Date: 2018-09-27 10:13:55
 * @Last Modified by: Eco.dujun
 * @Last Modified time: 2018-10-12 15:27:03
 */
<template>
	<div class="tree-table">
		<div class="tree-head">
			<table>
				<tr>
					<td class="td1">单位名称</td>
					<td class="td2">上级单位名称</td>
					<!-- <td class="td3" @click="isDesc=!isDesc">
						创建时间
						<div class="arrow">
							<span class="up-arrow" :class="{'sort':isDesc}"></span>
							<span class="down-arrow" :class="{'sort':!isDesc}"></span>
						</div>
					</td> -->
					<td class="td3">联系方式</td>
					<td class="td4">通信方式</td>
					<td class="td5">单位状态</td>
					<td class="td6">操作</td>
				</tr>
			</table>
		</div>
		<div id="scrollWrap" class="tree-wrap">
			<div class="tree-body">
				<table v-if="treeDataSource.length>0">
					<tbody>
						<tr>
							<td>
								<tree-item
									v-for="(model,i) in treeDataSource"
									:key="'root_node_'+i"
									:root="0"
									:num="i"
                                    :UnitTabularButton="UnitTabularButton"
                                    @viewUnitFunc="viewUnitFunc"
									@actionFunc="actionFunc"
									@addingFunc="addingFunc"
									@deleteFunc="deleteFunc"
									@disableOperationFunc="disableOperationFunc"
									@handlerExpand="handlerExpand"
									:nodes="treeDataSource.length"
									:trees.sync="treeDataSource"
									:model.sync="model">
								</tree-item>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
        <div id="scrollWrap" class="tree-wrap tree-nodata" v-if="list.length === 0">
            <div class="tree-body">
                暂无数据
            </div>
        </div>
	</div>
</template>

<script>
export default {
    name: "treeTable",
    props: ["list", "UnitTabularButton"],
    data() {
        return {
            isDesc: false,
            treeDataSource: []
        };
    },
    watch: {
        "list": {
            handler() {
                // console.log("ddddd");
                this.initTreeData();
            },
            deep: true
        },
        isDesc(nelVal, oldVal) {
            this.$emit("orderByFunc", nelVal); // 触发排序功能
        }
    },
    computed: {
    },
    methods: {
        initTreeData() {
            // console.log("处理前的:", JSON.parse(JSON.stringify(this.list)));
            // 这里一定要转化，要不然他们的值监听不到变化
            let tempData = JSON.parse(JSON.stringify(this.list));
            let reduceDataFunc = (data, level) => {
                data.map((m, i) => {
                    m.isExpand = false;
                    m.children = m.children || [];
                    m.level = level;
                    m.bLeft = level === 1 ? 34 : (level - 2) * 16 + 34;
                    m.Experience = m.Experience || "无";
                    if (m.children.length > 0) {
                        reduceDataFunc(m.children, level + 1);
                    }
                });
            };
            reduceDataFunc(tempData, 1);
            // console.log("处理后的:", tempData);
            this.treeDataSource = tempData;
        },
        getMore() {
            // alert("滚动到底部加载更多");
            this.$showSuccessMessage("提示", "滚动到底部加载更多");
            // 滚动到最后
            document.getElementById("scrollWrap").mCustomScrollbar("scrollTo", "top", {
                scrollInertia: 0
            });
        },
        // 查看
        viewUnitFunc(m) {
            this.$emit("viewUnitFunc", m);
        },
        // 编辑
        actionFunc(m) {
            this.$emit("actionFunc", m);
        },
        // 添加
        addingFunc(m) {
            this.$emit("addingFunc", m);
        },
        // 删除
        deleteFunc(m) {
            this.$emit("deleteFunc", m);
        },
        // 停用，启用
        disableOperationFunc(m) {
            this.$emit("disableOperationFunc", m);
        },
        // 展开
        handlerExpand(m) {
            this.$emit("handlerExpand", m);
        }
    },
    components: {
        treeItem: () => import("./unit-tree-item.vue")
    },
    mounted() {
        const vm = this;
        vm.$nextTick(() => {
            vm.initTreeData();
        });
    }
};
</script>

<style>
    /* html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    html,
    body {
        -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow-x: hidden;
    }

    body {
        line-height: 1;
        font-size: 12px;
    }

    :focus {
        outline: 0
    }

    ol,
    ul {
        list-style: none
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    img {
        border: 0;
        width: 100%;
        max-width: 100% !important;
        vertical-align: middle;
    }

    input,
    textarea {
        margin: 0;
        padding: 0
    }

    a {
        text-decoration: none;
    }

    a:hover,
    a:focus {
        outline: none;
    }

    q:before,
    q:after {
        content: "";
    } */
    a {
        text-decoration: none;
    }
    html, body, div, span, applet, object, iframe, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, h1, h2, h3, h4, h5, article, section, nav, header, footer {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        /* font-size: 100%; */
        vertical-align: baseline;
        background: transparent;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
