"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../public/store/store";
import qs from "qs";
import GLOBAL from "../public/baseData.js";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const baseURL = GLOBAL.baseURL; // 为 axios 实例的方法传递相对 URL

// axios 全局配置
axios.defaults.headers.common = {
    Accept: "application/json",
    // "Authorization": "Bearer",
    "X-Requested-With": "XMLHttpRequest"
    // "Access-Control-Allow-Origin": "*"
};
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
// axios.defaults.headers.post["Content-Type"] = "text/xml";
axios.defaults.withCredentials = true;
axios.defaults.timeout =  150000;
// 发送请求前处理request的数据
/* axios.defaults.transformRequest = [(data) => {
    // Do whatever you want to transform the data
    let newData = "";
    for (let k in data) {
        newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
    }
    return newData;
}]; */

// 请求配置
let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    baseURL: baseURL + "wit_harns_service/", // 为 axios 实例的方法传递相对 URL
    timeout: 150000 // Timeout 超时时间
    // withCredentials: true // 跨域请求时是否需要使用凭证
};
// 荣丰接口实例化
const _axios = axios.create(config);
_axios.interceptors.request.use(
    function(config) {
        store.commit("loadingState", true); // loading状态开启
        // Do something before request is sent
        // 根据是否登录的状态改变token值
        if (window.sessionStorage.getItem("state")) {
            config.headers.Authorization = JSON.parse(
                window.sessionStorage.getItem("state")
            ).token;
        } else {
            config.headers.Authorization = "Bearer";
        }

        // 处理request
        if (config.method === "get") {
            return config;
        }
        config.data = qs.stringify(config.data);
        return config;
    },
    function(error) {
        // Do something with request error
        store.commit("loadingState", true); // loading状态开启
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        store.commit("loadingState", false); // loading状态开启
        // Do something with response data
        // 处理response对应状态（详见store状态表）
        if (response.data.code === 304) {
            // 账号或密码错误
            const responseError = new Error("账号或密码错误");
            responseError.error = "账号或密码错误";
            throw responseError.error;
            // return Promise.resolve("账号或密码错误");
        } else if (response.data.code === 305) {
            // 需要用户登陆
            if (JSON.parse(window.sessionStorage.getItem("state")).nowRoute === "/login") {
                return response;
            } else if (JSON.parse(window.sessionStorage.getItem("state")).logout) { // 已经登出（或超时登出）
                store.commit("confirmLogout"); // 修改是否是登出状态
                store.commit("setAuthData", []); // 清空token内容
                store.commit("editLoginState"); // 修改登录状态
				// window.location.href = "/login";
				//20200804 梁超  退出登录+  #/login
                window.location.href = "#/login";
                sessionStorage.clear();
                return Promise.resolve("请重新登录");
            } else {
                setTimeout(() => {
                    store.commit("setAuthData", []); // 清空token内容
                    store.commit("editLoginState"); // 修改登录状态
                    window.location.href = "/login";
                    sessionStorage.clear();
                }, 50);
                const responseError = new Error("请重新登录");
                responseError.error = "请重新登录";
                throw responseError.error;
            }
        } else if (response.data.code === 1) {
            // 数据重复时，替换为后台返回的具体重复内容弹出显示
            if (response.data.msg) {
                store.commit("backMessage", {
                    code: response.data.code,
                    message: response.data.msg
                });
            }
            return response;
        } else if (response.data.code === 306) {
            const responseError = new Error("需要权限");
            responseError.error = "需要权限";
            throw responseError.error;
            // return Promise.resolve("需要权限");
        } else if (response.data.code === 307) {
            const responseError = new Error("账号已被锁定,请联系管理员");
            responseError.error = "账号已被锁定,请联系管理员";
            throw responseError.error;
            // return Promise.resolve("账号已被锁定,请联系管理员");
        } else if (response.data.code === 500) {
            const responseError = new Error(
                "服务器内部错误，请稍后重试或与管理员联系"
            );
            responseError.error = "服务器内部错误，请稍后重试或与管理员联系";
            throw responseError.error;
        } else if (!response.data) {
            const responseError = new Error(response);
            // responseError.origin = response;
            throw responseError;
        } else {
            return response;
        }
    },
    function(error) {
        store.commit("loadingState", false);
        // Do something with response error
        /* let responseError;
            if (error.data.code === 500) {
                responseError = new Error("服务器内部错误，请稍后重试或与管理员联系");
            } else {
                responseError = new Error("消息发送失败，请稍后重试或与管理员联系");
            }
            // responseError.error = error;
            throw responseError; */
        return Promise.reject(error);
    }
);
// 数据湖接口实例
let sjhconfig = {
    headers: {
        "Content-Type": "application/json"
    }
};
const sjhAxios = axios.create(sjhconfig);
sjhAxios.interceptors.request.use(
    function(sjhconfig) {
        store.commit("sjhLoadingState", true);
        return sjhconfig;
    }
);
sjhAxios.interceptors.response.use(
    function(response) {
        store.commit("sjhLoadingState", false);
        if (response.result === "failure") {
            const responseError = new Error(
                "服务器内部错误，请稍后重试或与管理员联系"
            );
            responseError.error = "服务器内部错误，请稍后重试或与管理员联系";
            throw responseError.error;
        }
        return response;
    },
    function(error) {
        store.commit("sjhLoadingState", false);
        return Promise.reject(error);
    });

// 地图数据
let geoconfig = {
    headers: {
        "Content-Type": "text/xml"
    },
    baseURL: "http://47.105.212.6:8080"
    // baseURL: "http://192.168.31.88:8080"
	
};
const geoAxios = axios.create(geoconfig);
geoAxios.interceptors.request.use(
    function(geoconfig) {
        store.commit("geoLoadingState", true);
        return geoconfig;
    }
);
geoAxios.interceptors.response.use(
    function(response) {
        store.commit("geoLoadingState", false);
        return response;
    },
    function(error) {
        store.commit("geoLoadingState", false);
        return Promise.reject(error);
    });
// 路径规划
let Roadconfig = {
    headers: {
        "Content-Type": "text/xml"
    },
    baseURL: "http://47.105.212.6/map_service/",
    timeout: 150000 // Timeout 超时时间
};
const RoadAxios = axios.create(Roadconfig);
RoadAxios.interceptors.request.use(
    function(Roadconfig) {
        store.commit("RoadLoadingState", true);
        return Roadconfig;
    }
);
RoadAxios.interceptors.response.use(
    function(response) {
        store.commit("RoadLoadingState", false);
        return response;
    },
    function(error) {
        store.commit("RoadLoadingState", false);
        return Promise.reject(error);
    });

// 通用获取接口实例
let baseConfig = {
    baseURL: "/",
    headers: {
        "Content-Type": "application/json"
    }
};
const baseAxios = axios.create(baseConfig);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    Vue.sjhAxios = sjhAxios;
    Vue.geoAxios = geoAxios;
    Vue.RoadAxios = RoadAxios;
    Vue.baseAxios = baseAxios;
    window.axios = _axios;
    window.sjhAxios = sjhAxios;
    window.geoAxios = geoAxios;
    window.RoadAxios = RoadAxios;
    window.baseAxios = baseAxios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);

export default Plugin;