import Vue from "vue";
import "./plugins/axios";
import Router from "vue-router";
import App from "./App.vue";
import routerConfig from "./public/router"; // 引入路由配置
import store from "./public/store/store"; // 引入vuex静态管理
import "./plugins/element.js";
import echarts from "echarts"; // 引入echarts
import videojs from "video.js"; // 引入video.js
import "../node_modules/video.js/dist/video-js.min.css"; // 引入video.js样式
import "videojs-flash"; // 引入videojs
import g6 from "@antv/g6"; // 引入G6关系图表
// import "./public/videojs.css"; // 引入videojs一个css但是没用上
import baseData from "./public/baseData.js"; // 引入全局变量

// 共公共样式引入
import "./public/public.css";
import "./assets/icon/iconfont.css";
// 引入公共树treeTable表格组件样式
import "./public/publicTreeTable.less";
// 公共组件方法
import Api from "./components/common/api.vue"; // 引入api模板
import msgBox from "./public/msgBox.js"; // 引入公共提示信息窗
import CommonRule from "./public/CommonRule.js"; // 引入验证信息
import TableCommon from "./components/common/tableCommom.vue"; // 引入公共表格
import tableCommonPut from "./components/common/tableCommomPut.vue"; // 引入公共表格
import Button from "./components/common/button.vue"; // 引入按钮
import btn from "./components/common/btn.vue"; // 新按钮组件
import SearchPage from "./components/common-search/SearchPage.vue"; // 引入搜索
import filter from "./public/filter.js"; // 引入过滤器
import tools from "./public/tool.js"; // 引入工具方法
import GisClassMethod from "./public/GisClassMethod"; // 引入地图方法
// 引入公共指令
import VdialogDrag from "./public/directives/dialogDrag.js"; // v-dialogDrag: 弹窗拖拽属性
import VcanvasDrag from "./public/directives/canvasDrag.js"; // v-canvasDrag: 弹窗拖拽属性
import VifScroll from "./public/directives/scrollTop.js"; // v-ifScroll: 弹窗自动滚动

import htmlToPdf from "./public/PDFvue.js";// 导出pdf
// Vue全局配置
Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示。

// 全局注册插件
Vue.use(Router);
Vue.use(htmlToPdf);

// 注册全局组件
Vue.component("api", Api);
Vue.component("tableCommon", TableCommon);
Vue.component("TableCommonPut", tableCommonPut);
Vue.component("bt", Button);
Vue.component("btn", btn);
Vue.component("SearchPage", SearchPage);

// 全局实例属性
Vue.prototype.$layerNoticeIS = msgBox.layerNoticeIS; // 提示弹框是否
Vue.prototype.$layerNotice = msgBox.layerNotice; // 提示弹框
Vue.prototype.$showErrorMessage = msgBox.showErrorMessage; // 顶部弹出（红色）
Vue.prototype.$showSuccessMessage = msgBox.showSuccessMessage; // 顶部弹出（绿色）
Vue.prototype.$showSimpleMessage = msgBox.showSimpleMessage; // 顶部弹出
Vue.prototype.$loading = msgBox.loading; // loading页面
Vue.prototype.$CommonRule = CommonRule; // 验证合集
Vue.prototype.$filter = filter; // 转化方法合集(过滤器)
Vue.prototype.$tools = tools; // 工具方法合集
Vue.prototype.GLOBAL = baseData; // ！全局变量！
Vue.prototype.$echarts = echarts; // 全局引入echarts
Vue.prototype.$videojs = videojs; // 全局引入videojs
Vue.prototype.GisClassMethod = GisClassMethod; // 全局引入GisClassMethod
Vue.prototype.$G6 = g6; // 全局引入G6

// 全局注册指令
Vue.directive("dialogDrag", VdialogDrag);
Vue.directive("canvasDrag", VcanvasDrag);
Vue.directive("ifScroll", VifScroll);

// 全局router
const router = new Router({
    // mode: "history",
	// 20200804 梁超修改   URL带#
	mode: "hash",
    base: process.env.NODE_ENV === "production" ? baseData.outputUrl : "/",
    routes: routerConfig
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// 处理时间戳的插件
import moment from "moment";
Vue.filter('dateTime',function (datastr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattern)
})