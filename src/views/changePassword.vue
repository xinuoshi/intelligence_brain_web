<template>
    <el-dialog title="修改密码" :close-on-press-escape="false"  :visible="eventDetail" width="600px" :lock-scroll="true"  v-dialogDrag :show-close="true" @close="closeD()" :close-on-click-modal="false" class="tems_dialog littleDiction changPassWord">
         <div class="scrollPart flexRow" id="scrollDPart">
            <div class="flexNum"></div>
            <div style="flex:2">
                <el-form class="demo-ruleForm" style="padding:0" ref="form" :model="form" :rules="rule" label-width="110px">
                    <el-form-item prop="password" label="原始密码：">
                        <img :src="passwordIcon" alt="" class="login_icon">
                        <el-input class="login_input" type="password" clearable v-model="form.password"
                            @focus="changePasswordIcon(1)" @blur="changePasswordIcon(0)"
                            placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="newPasswordOne" label="新密码：">
                        <img :src="passwordIcon" alt="" class="login_icon">
                        <el-input class="login_input" type="password" clearable v-model="form.newPasswordOne"
                            @focus="changePasswordIcon(1)" @blur="changePasswordIcon(0)"
                            placeholder="请输入新的用户密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="newPasswordTwo" label="确认密码：">
                        <img :src="passwordIcon" alt="" class="login_icon">
                        <el-input class="login_input" type="password" clearable v-model="form.newPasswordTwo"
                            @focus="changePasswordIcon(1)" @blur="changePasswordIcon(0)"
                            @keyup.enter.native="keyPress" placeholder="请输入新的用户密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
             <div class="flexNum"></div>
        </div>
        <div slot="footer" class="dialog-footer flexRow">
            <div class="flexNum footer">
                <div class="tems_Button inportBtn dic_closed" @click="closeD()">取消</div>
                <div class="tems_Button exportBtn dic_closed" @click="onSubmit('form')">保存</div>
            </div>
        </div>
    </el-dialog>
</template>
<style scoped>
    .login_icon{
        position: absolute;
        top: 10px;
        left: 10px;
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
                password: "",
                newPasswordOne: "",
                newPasswordTwo: ""
            },
            rule: {
                // username: [
                //     { required: true, message: "请填写用户名", trigger: "blur" }
                // ],
                password: [
                    { required: true, message: "请填写密码", trigger: "blur" },
                    { type: "string", min: 0, message: "密码长度不能小于1位", trigger: "blur" }
                ],
                newPasswordOne: [
                    { required: true, message: "请填写新密码", trigger: "blur" },
                    { type: "string", min: 0, message: "密码长度不能小于1位", trigger: "blur" }
                ],
                newPasswordTwo: [
                    { required: true, message: "请再次填写新密码", trigger: "blur" },
                    { type: "string", min: 0, message: "密码长度不能小于1位", trigger: "blur" }
                ]
            },
            userIcon: userIcon,
            passwordIcon: passwordIcon,
            eventDetail: false
        };
    },
    methods: {
        keyPress() {
            this.onSubmit("form");
        },
        closeD() {
            if (this.eventDetail) {
                this.$layerNotice("提示", "您确定要取消吗？", () => {
                    this.$refs["form"].resetFields();
                    this.eventDetail = false;
                }, null, "warning");
            }
        },
        onSubmit(name) {
            this.$refs[name].validate((valid) => {
                let data = {
                    // username: this.form.username,
                    oldPassword: this.form.password,
                    newPasswordOne: this.form.newPasswordOne,
                    newPasswordTwo: this.form.newPasswordTwo
                };
                if (!valid) {
                    // this.$showErrorMessage("校验失败", "请检查输入的用户名和密码","error");
                    this.$showSimpleMessage("请填写正确的内容", "error");
                    return;
                }
                // 登录
                axios.put("/login/password", data).then((res) => {
                    if (res.data) {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage("密码修改成功,请重新登陆！", "success");
                            setTimeout(() => {
                                this.$store.commit("confirmLogout");
                                axios.get("login/logout").then((res) => {
                                });
                            }, 200);
                        } else {
                            this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                        }
                    } else {
                        // alert("2")
                        this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                        // this.$showSimpleMessage(res, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
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
    watch: {
        "eventDetail": function(val) {
            this.$refs["form"].resetFields();
        }
    }
};
</script>
