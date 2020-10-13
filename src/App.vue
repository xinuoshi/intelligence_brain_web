<template>
  <div id="app">
    <!-- <login v-else></login> -->
    <!-- <router-view v-if="isStatuLoading" element-loading-text="拼命加载中" v-loading="true" element-loading-spinner="el-icon-loading" element-loading-background="rgba(10, 40, 100, 0.5)"/> -->
    <!-- <router-view />  -->
    <router-view v-loading.fullscreen.lock="isGeoLoading||isLoading" element-loading-background="rgba(10, 40, 100, 0)"/>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import login from "./views/login.vue";
import {Loading} from 'element-ui';
export default {
    name: "app",
    components: {
        Home, login
    },
    data() {
        return {
            loadingInstance: ""
        };
    },
    computed: {
        // loginState() {
        //     return this.$store.state.userLogin; // 监听是否为登录页面
        // },
        isLoading() {
            return this.$store.state.loading; // 监听是否为登录页面
        },
        isGeoLoading() {
            return this.$store.state.geoLoading; // geoserver请求时的转圈圈
        },
        // isSjhLoading() {
        //     return this.$store.state.sjhLoading; // 数据湖接口请求时的转圈圈
        // },
        // isStatuLoading() {
        //     return this.$store.state.statuLoading; // 数据湖接口请求时的转圈圈
        // }
    },
    created() {
        // 初始化修改videojs实例flash配置
        // this.$videojs.options.flash.swf = "./assets/video-js.swf";
    },
    mounted() {
    },
    methods: {
    },
    watch: {
        "isStatuLoading":function(val){
            if(val === true) {
                let loadingInstance = Loading.service({ 
                    fullscreen: true,
                    background: "rgba(10, 40, 100, 0)"
                    });
                this.loadingInstance = loadingInstance;
                // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                //         loadingInstance.close();
                //     });
            } else {
                let _this = this;
                setTimeout(()=>{
                    _this.loadingInstance.close();
                },1000)
                
            }
        }
    }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
