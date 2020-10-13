<template>
    <div class="contain">
        <div></div>
        <div class="formBox">
            <div>
                <el-form class="loginForm" ref="form" :model="form" :rules="rule" label-width="60px">
                    <div class="login_title"></div>
                    <div class="login_box">
                        <el-form-item prop="username" label="用户名：" class="noneTipe">
                            <img :src="userIcon" alt="" class="login_icon">
                            <el-input type="text" class="login_input" clearable v-model="form.username"
                                @focus="changeUserIcon(1)" @blur="changeUserIcon(0)"
                                placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：" class="noneTipe">
                            <img :src="passwordIcon" alt="" class="login_icon">
                            <el-input class="login_input" type="password" clearable v-model="form.password"
                                @focus="changePasswordIcon(1)" @blur="changePasswordIcon(0)"
                                placeholder="请输入用户密码"></el-input>
                        </el-form-item>
                        <div class="loginBtn">
                            <div class="forget_btn" @click="onForget">忘记密码</div>
                            <div class="login_btn" @click="onSubmit('form')">登录</div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div></div>
    </div>
</template>
<style>
    .login_box .el-form-item__label{
        color: #ffffff !important;
    }
</style>

<style scoped>
    .contain {
        width: 100%;
        height: 100%;
        background: url(../assets/static/bgImg.png) no-repeat;
        background-size: 100% 100%;
        background-position: center;
        display: flex;
        flex-direction: column;
    }
    .contain>div{
        flex: 1;
    }
    .login_box{        
        padding-left: 20%;
    }
    .loginBtn{        
        margin: 0 28% 0 0;
    }
    .forget_btn{
        color: #fff;
        text-align: right;
        cursor: pointer;
    }
    .login_btn{
        border: 2px solid #fff;
        height: 30px;
        color: #fff;
        border-radius: 5px;
        margin-top: 25px;
        line-height: 30px;
        cursor: pointer;
    }
    .formBox{
        text-align: center
    }
    .formBox>div{        
        display: -webkit-inline-box;
        border: 4px solid #405d7b;
        border-radius: 15px;
        width: 500px;
        background: rgba(151,215,255,0.1);
    }
    .formBox form{        
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px 0;
    }
    .loginForm .el-form-item .el-form-item__content{
        text-align: left !important;
    }
    .login_icon{
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 100;
    }
    .el-input {
        width: 70% !important;
        display: block;
    }
    .login_title{
        background: url(../assets/static/loginLogo.png) no-repeat;
        background-position: center;
        height: 30px;
        width: 290px;
        background-size: 100% 100%;
        margin: 0px auto;
        margin-bottom: 48px;
        margin-left: 20%;
    }
</style>

<script>
import userIcon from "../assets/login_user.png";
import passwordIcon from "../assets/login_password.png";
import userIconPich from "../assets/login_user_pich.png";
import passwordIconPich from "../assets/login_password_pich.png";
export default {
    name: "home",
    props: [],
    components: {},
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rule: {
                username: [
                    { required: true, message: "请填写用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请填写密码", trigger: "blur" },
                    { type: "string", min: 0, message: "密码长度不能小于1位", trigger: "blur" }
                ]
            },
            userIcon: userIcon,
            passwordIcon: passwordIcon
        };
    },
    methods: {
        keyPress() {
            this.onSubmit("form");
        },
        onForget() {
            this.$showSimpleMessage("请联系管理员重置密码", "warning");
        },
        onSubmit(name) {
            this.$refs[name].validate((valid) => {
                let data = {
                    username: this.form.username,
                    password: this.form.password
                };
                // 登录
                // let date = new Date();
                // date.setSeconds(date.getSeconds() - 1);
                // document.cookie = "JSESSIONID=" + escape("") + "; expires=" + date.toGMTString();
                axios.get("login/logout").then((res) => {
                    if (res.data.code === 305) {
                        axios.post("login/login", data).then((res) => {
                            if (!valid) {
                                // 取消键盘监听的提交事件
                                document.onkeydown = function(e) {
                                    let key = window.event.keyCode;
                                    if (key === 13) {
                                    }
                                };
                                this.$layerNotice("校验失败", "请检查输入的用户名和密码", () => {
                                    // 重新恢复页面内监听键盘事件
                                    let _this = this;
                                    document.onkeydown = function(e) {
                                        let key = window.event.keyCode;
                                        if (key === 13) {
                                            _this.keyPress();
                                        }
                                    };
                                }, null, "error", { determine: "确定" });
                                return;
                            }
                            if (res.data) {
                                if (res.data.code === 0) {
                                    this.$store.state.token = res.data.Authorization; // 存储用户token
                                    // this.$store.state.loginModel = [res.data.login_model];
                                    this.$store.state.loginModel = res.data.login_model.children;
                                    this.$store.state.firstRender = true;
                                    this.$store.commit("editLoginState");
                                    this.$store.commit("getUserInfo", res.data.login_user_info);
                                    this.$router.replace({
                                        path: "/home"
                                    });
                                }
                            } else {
                                this.$showSimpleMessage(res, "error");
                            }
                        }).catch((error) => {
                            this.$showSimpleMessage(error, "error");
                        });
                    }
                });
            });
        },
        changeUserIcon(state) {
            if (state === 1) {
                this.userIcon = userIconPich;
            } else {
                this.userIcon = userIcon;
            }
        },
        changePasswordIcon(state) {
            if (state === 1) {
                this.passwordIcon = passwordIconPich;
            } else {
                this.passwordIcon = passwordIcon;
            }
        }
    },
    created() {
        // 记录当前路由
        this.$store.state.nowRoute = this.$route.path;
    },
    mounted() {
        let _this = this;
        // 页面内监听键盘事件
        document.onkeydown = function(e) {
            let key = window.event.keyCode;
            if (key === 13) {
                _this.keyPress();
            }
        };
    },
    beforeDestroy() {
        // 销毁当前路由记录
        this.$store.state.nowRoute = "";
    }
};
</script>
