                <template>
  <div class="home">
    <!-- 主体 -->
    <div class="contentBox flexColumn">
      <!-- 头部信息 -->
      <div class="topHeadBar flexRow">
        <span class="flexNum titleMain">
            <div class="loginImg"></div>
        </span>
        <div class="flexRow">
            <div class="mangmentPeple">登入时间：<span class="welcom">{{loginTime}}</span></div>
            <div class="outExist">
                <img src="">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{userName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="dropdown" slot="dropdown">
                        <el-dropdown-item @click.native="outSubmit">安全退出</el-dropdown-item>
                        <el-dropdown-item  @click.native="changePassword">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- <router-link tag="div" to="/systermHelp" style="cursor: pointer;">系统帮助</router-link> -->
        </div>
      </div>
      <!-- 主体信息 -->
      <div class="bodyBar flexRow flexNum">
        <!-- 左侧导航 -->
        <div class="leftNavigation flexColumn" style="width:152px !important">
          <el-menu router unique-opened
            ref="menu"
            :default-active="onRoutes.matched.length > 2 ? onRoutes.matched[1].path : onRoutes.path"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose">
              <div v-for="(item, index) in menuList" :key="index"  :class="{nextlevel: item.nextlevel || item.path === '/gisMap'}">
                <!-- 无下级菜单 -->
                <el-menu-item v-if="!item.nextlevel || (item.nextlevel && item.button1)" :class="{'is-activeDef': onRoutes.path === item.path}" :index="item.path" class="firstMenu">
                  <i :class="item.iImg"></i>
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
                <!-- 有下级菜单 -->
                <el-submenu v-if="item.nextlevel && !item.button1" :class="{'is-openMenu': openMenu === item.path && onRoutes.path !== '/gisMap' && onRoutes.path !== '/AIDeviceManagement'}" :index="item.path">
                  <template slot="title">
                    <i :class="item.iImg"></i>
                    <span slot="title">{{item.name}}</span>
                  </template>
                  <el-menu-item-group v-for="items in item.nextlevel" :key = "items.index" >
                    <el-menu-item :class="{'is-activeDef': onRoutes.path === items.path || onRoutes.matched[1].path === items.path}" :index="items.path">
                        <span>{{items.name}}</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </div>
            </el-menu>
        </div>
        <!-- 右侧主体 -->
        <div class="subject flexNum flexColumn">
          <!-- <div class="title">
            <div class="word">{{title}}</div>
          </div> -->
          <transition name="fade" mode="out-in">
              <router-view class="flexNum flexColumn" v-if="routerRefresh"></router-view>
          </transition>
        </div>
      </div>
    </div>
    <changePassword ref="changePassword"></changePassword>
  </div>
</template>
<style>
    .dropdown {
        z-index: 3002 !important;
    }
</style>
<script>
import changePassword from "./changePassword";
export default {
    name: "home",
    components: {
        changePassword
    },
    data() {
        return {
            // 登录时间
            loginTime: "2018-9-20 13:30:25",
            title: "标题",
            userName: "",
            // 当前路由
            onRoutes: "",
            openMenu: "", // 打开的菜单组
            menuList: [], // 用户导航菜单列表
            cdTitle: [
                { name: "GIS集控", path: "/gisMap", iImg: "iconfont icon-gis" },
                { name: "视频集控",
                    path: "/2",
                    iImg: "iconfont icon-video-channel",
                    nextlevel: [
                        { name: "云台", path: "/CloudPlatform" },
                        { name: "轮训计划", path: "/TrainingProgram" }
                    ] },
                { name: "情指勤督",
                    path: "/3",
                    iImg: "iconfont icon-information",
                    nextlevel: [
                        { name: "情报自定义", path: "/IntelligenceCustomization" },
                        { name: "情报档案", path: "/InformationArchives" }
                    ] },
                { name: "交通流管控", path: "/4", iImg: "iconfont icon-traffic" },
                { name: "研判分析",
                    path: "/5",
                    iImg: "iconfont icon-yanpan",
                    nextlevel: [
                        { name: "数据检索", path: "/dataRetrieval" },
                        { name: "主体画像", path: "/SubjectPortrait" },
                        { name: "交通流分析", path: "/TrafficFlowAnalysis" },
                        { name: "交通安全分析", path: "/TrafficSafetyAnalysis" },
                        { name: "内部管理分析", path: "/InternalManagementAnalysis" },
                        { name: "综合分析", path: "/comprehensiveAnalysis" }
                    ] },
                { name: "AI设备管理", path: "/AIDeviceManagement", iImg: "iconfont icon-ai" },
                { name: "系统配置",
                    path: "/7",
                    iImg: "iconfont icon-xitong",
                    nextlevel: [
                        { name: "单位管理", path: "/unitManagement" },
                        { name: "角色管理", path: "/ruleManagement" },
                        { name: "用户管理", path: "/userManagement" },
                        { name: "参数管理", path: "/tidalFlowindex" },
                        { name: "字典管理", path: "/dictionaryManagement" },
                        { name: "资产管理", path: "/assetTrafficControlEquipment" },
                        { name: "组件库", path: "/assetDictionary" },
                        // { name: "机房管理", url: "/computerRoomManagement" },
                        { name: "协同单位", path: "/collaborativeunitmanagement" },
                        { name: "系统日志", path: "/logManagement" }
                    ] }
            ],
            // 刷新控制
            routerRefresh: true
        };
    },
    methods: {
        // 菜单栏回调
        handleClose(key, indexPath) {
            // console.log(key, indexPath);
        },
        handleOpen(key, indexPath) {
            // console.log(key, indexPath);
            // this.openMenu = key;
            // console.log(this.openMenu);
        },
        handleSelect(key, keyPath) {
            // console.log(this.$route);
            // console.log(key, keyPath);
            // 菜单栏点击刷新
            /* if (keyPath[0] === "/7") { // 系统配置
                this.routerRefresh = false;
                this.$nextTick(() => {
                    this.routerRefresh = true;
                });
            } */
            if (this.$route.path === key) {
                this.routerRefresh = false;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.routerRefresh = true;
                    }, 330); // 不可低于310ms
                });
            }
            // 点击无下级菜单项 关闭菜单组
            if (key === "/gisMap" || key === "/AIDeviceManagement") {
                if (this.openMenu) {
                    // console.log(this.openMenu);
                    this.$refs.menu.close(this.openMenu);
                    // this.openMenu = "";
                }
            }
        },
        checkDialog() {},
        // 获取权限菜单
        async getMenuList() {
            // type: 1 菜单 type: 2 按钮
            let userAuth = this.$store.state.loginModel;
            let menuList = []; // 存储菜单模型
            let finMenu = []; // 最终菜单权限模型
            let _this = this;

            // 剥离权限模型
            function readData(auth, resArr, parentData) { // auth后台获取的权限 resArr最终剥离后返回的权限数组模型 parentData当前层级的数据
                auth.forEach((data, key) => {
                    if (data.hasChildren) {
                        if (data.children[0].t.type === 1) { // 判断类型
                            resArr.push({ ...check(data), nextlevel: [] });
                            readData(data.children, resArr[key].nextlevel);
                        } else if (data.children[0].t.type === 2) {
                            resArr.push({ ...check(data), nextlevel: [], button1: [], button2: [], button3: [] });
                            readData(data.children, resArr[key].nextlevel, resArr[key]);
                        }
                    } else {
                        if (parentData) {
                            resArr.push(check(data));
                            let button = [];
                            let reCheckData = check(data, true);
                            reCheckData[1].forEach((b) => {
                                _this.GLOBAL.buttonModel.forEach((i) => {
                                    if (b === i.name) {
                                        button.push(i);
                                    }
                                });
                            });
                            button.forEach((i) => {
                                let index = i.index.split(":");
                                let btKey = index[0];
                                parentData[index[0]].push({ index: index[1], name: i.name, enName: i.value });
                                parentData[btKey] = _this.$tools.arrUnique(parentData[index[0]], "name");
                                parentData[btKey] = _this.$tools.bubbleSort(parentData[index[0]], "index");
                            });
                        } else {
                            resArr.push(check(data));
                        }
                    }
                });
                return resArr;
            };
            // 剥离权限模型检出 层级/权限 内容
            function check(data, btFn) {
                if (btFn) {
                    let aclData = data.t.acl ? data.t.acl.split(":") : ["", [""]]; // acl现在有可能有空值
                    // acl对应按钮类型
                    /* if (aclData[1] === "save") {
                        aclData[1] = ["创建"];
                    } else if (aclData[1] === "update") {
                        aclData[1] = ["编辑"];
                    } else if (aclData[1] === "delete") {
                        aclData[1] = ["批量删除", "删除"];
                    } else if (aclData[1] === "start") {
                        aclData[1] = ["批量启用", "启用"];
                    } else if (aclData[1] === "stop") {
                        aclData[1] = ["批量停用", "停用"];
                    } else if (aclData[1] === "import") {
                        aclData[1] = ["导入"];
                    } else if (aclData[1] === "export") {
                        aclData[1] = ["导出"];
                    } else if (aclData[1] === "select") {
                        aclData[1] = ["查看"];
                    } */
                    // 页面统一更换按钮文字
                    if (data.t.name === "查询") {
                        aclData[1] = ["查看"];
                    } else if (data.t.name === "修改") {
                        aclData[1] = ["编辑"];
                    } else {
                        aclData[1] = [data.t.name];
                    }
                    return aclData;
                } else {
                    return data.t;
                }
            };

            // 映射菜单按钮配置模型
            function mapModel(arr, model, res) {
                let newArr = _this.$tools.deepCopy(arr);
                res = [];
                if (model.length === 0) {
                    res = newArr;
                } else {
                    model.forEach((m, mkey) => {
                        // console.log(newArr, mkey)
                        newArr.forEach((data, akey) => {
                            let a = _this.$tools.deepCopy(data);
                            // console.log(a);
                            if (m.name === a.name) {
                                res.push(a);
                                if (m.next) {
                                    // res[res.length - 1].nextlevel = [];
                                    res[res.length - 1].nextlevel = mapModel(a.nextlevel, m.next, res[res.length - 1].nextlevel);
                                } else if (m.bt) {
                                    res[res.length - 1] = mapButton(a, m.bt, res[res.length - 1]);
                                }
                            }
                        });
                    });
                }
                return res;
            };
            // 映射特殊按钮
            function mapButton(dataB, modelB, resB) {
                let newData = _this.$tools.deepCopy(dataB);
                if (modelB.length === 0) {
                    if (newData.button1) {
                        _this.GLOBAL.buttonMiss.forEach((del) => { // 懒得看了。。。去掉不要的按钮
                            let delArr = newData[del.index];
                            newData[del.index].forEach((b, key) => {
                                if (b.name === del.name) {
                                    delArr.splice(key, 1);
                                    newData[del.index] = delArr;
                                }
                            });
                        });
                        resB = _this.$tools.deepCopy(newData);
                    } else {
                        resB = newData;
                    }
                } else {
                    let newDel = _this.GLOBAL.buttonMiss;
                    modelB.forEach((b) => {
                        for (let mbKey in b) {
                            for (let abKey in newData) {
                                if (abKey === mbKey) {
                                    let arrD = [];
                                    newDel.forEach((del) => {
                                        if (del.index !== mbKey) {
                                            arrD.push(del);
                                        }
                                    });
                                    newDel = arrD;
                                    resB[abKey] = [];
                                    b[mbKey].forEach((mName) => {
                                        let changeName = "";
                                        _this.GLOBAL.buttonModel.forEach((i) => {
                                            if ((i.name === mName) || (i.other.split(",").find(name => name === mName))) {
                                                changeName = i.name;
                                            }
                                        });
                                        newData[abKey].forEach((aName) => {
                                            if (changeName === aName.name) {
                                                let i = _this.$tools.deepCopy(aName);
                                                i.name = mName;
                                                resB[abKey].push(i);
                                            }
                                        });
                                    });
                                }
                            }
                        }
                    });
                    let newRes = _this.$tools.deepCopy(resB);
                    newDel.forEach((del) => { // 去掉不要的按钮。。。
                        let delArr = newRes[del.index];
                        newRes[del.index].forEach((b, key) => {
                            if (b.name === del.name) {
                                delArr.splice(key, 1);
                                newRes[del.index] = delArr;
                            }
                        });
                    });
                    resB = _this.$tools.deepCopy(newRes);
                }
                return resB;
            };
            // 执行函数
            menuList = await readData(userAuth, menuList);
            finMenu = await mapModel(menuList, this.GLOBAL.menuSetting, finMenu);
            // 临时放进icon 去除不要的
            let menu = []; // 左侧图标
            finMenu.forEach((m) => {
                this.cdTitle.forEach((i) => {
                    if (m.path === i.path) {
                        m.iImg = i.iImg;
                    }
                });
                if (m.name !== "交通流管控") {
                    menu.push(m);
                }
            });
            // console.log(finMenu)
            this.menuList = menu;
            // this.menuList = menuList;
            this.$store.commit("setAuthData", finMenu);
            // this.$store.commit("setAuthData", menuList);
        },
        // 退出登录
        outSubmit() {
            this.$store.commit("confirmLogout");
            axios.get("login/logout").then((res) => {
            });
        },
        // 修改密码
        changePassword() {
            // this.$router.push({
            //     path: "/changePassword"
            // });
            this.$refs.changePassword.eventDetail = true;
        },
        // 获取个人信息
        async getUserInfo() {
            let userInfo = await this.$filter.Axios("GET", "login/");
            // this.$store.commit("getUserInfo", userInfo.data);
            this.userName = userInfo.data.data.username;
        }
    },
    watch: {
        "$route": {
            handler: function(val, oldVal) {
                // console.log(val);
                // 判断出打开的菜单组
                if (val.name !== undefined && val.path !== "/home") {
                    this.onRoutes = val;
                    this.cdTitle.forEach((r, key) => {
                        let root = r.path;
                        if (r.path === val.matched[1].path) {
                            this.openMenu = "";
                        } else {
                            if (r.nextlevel) {
                                r.nextlevel.forEach((page, key) => {
                                    if (page.path === val.matched[1].path) {
                                        this.openMenu = root;
                                        // console.log(this.openMenu)
                                        this.$nextTick(() => {
                                            this.$refs.menu.open(this.openMenu);
                                        });
                                    }
                                });
                            }
                        }
                    });
                } else { // 防止报错
                    this.onRoutes = { matched: [{ path: "" }, { path: "" }], path: "" };
                }
            },
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
    async created() {
        await this.getMenuList();
        if (this.$store.state.userLogin) {
            this.getUserInfo();
            // 增加权限判断渲染页面
            if (this.$store.state.firstRender) {
                let paths = "";
                let lev1 = this.$store.state.authData[0];
                if (lev1.nextlevel) {
                    paths = lev1.nextlevel[0].path;
                } else {
                    paths = lev1.path;
                }
                this.$store.state.firstRender = false;
                this.$router.replace({
                    path: paths
                });
            }
        }
    },
    mounted() {
        this.loginTime = this.$filter.formatDateTime(new Date());
        // 建立websocket
        let _this = this;
        this.ws = new WebSocket(_this.GLOBAL.wsURL);
        this.ws.addEventListener("open", (event) => {
            // 建立连接后执行
            this.ws.send(_this.$store.state.userInfo.id);
        });
        this.ws.addEventListener("message", function(event) {
            // 监听后端返回需要刷新的状态
            // GIS情报告警公告
            if (event.data === "INTELLIGENCE_REFRESH") {
                _this.$store.commit("reGisInfoNotic");
            }
        });
        this.ws.addEventListener("close", function(event) {
            // 断开websocket
        });
        // 去掉一个疑难BUG
        $(".el-input__inner,input").focus(function() {
            let inputOnblur2 = document.querySelectorAll(".el-select-dropdown__item");
            for (let j in inputOnblur2) {
                for (let k in inputOnblur2[j].classList) {
                    if (inputOnblur2[j].classList[k] === "hover") {
                        inputOnblur2[j].classList.remove("hover");
                    }
                }
            }
        });
        $(".el-input__inner,input").blur(function() {
            let inputOnblur2 = document.querySelectorAll(".el-select-dropdown__item");
            for (let j in inputOnblur2) {
                for (let k in inputOnblur2[j].classList) {
                    if (inputOnblur2[j].classList[k] === "hover") {
                        inputOnblur2[j].classList.remove("hover");
                    }
                }
            }
        });
    },
    beforeDestroy() {
        this.ws.close();
    }
};
</script>

<style scoped>
    /* router-view切换组件效果 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    /* 自定义一组边栏导航当前页面样式 */
    .el-menu-vertical-demo /deep/ .el-submenu .el-menu-item.is-activeDef {
        color: #fff !important;
    }
    .el-menu-vertical-demo /deep/ .el-menu-item.is-activeDef i {
        color: #fff !important;
    }
    /* .el-menu-vertical-demo /deep/ .is-opened .el-submenu__title i, */
    .el-menu-vertical-demo /deep/ .is-openMenu .el-submenu__title i,
    .el-menu-vertical-demo /deep/ .el-submenu.is-activeDef i {
        color: #fff !important;
    }
    /* .el-menu-vertical-demo /deep/ .is-opened .el-submenu__title, */
    .el-menu-vertical-demo /deep/ .is-openMenu .el-submenu__title,
    .el-menu-vertical-demo /deep/ .is-activeDef,
    /* .el-menu-vertical-demo /deep/ .el-menu-item:focus, .el-menu-item:hover, */
    .el-menu-vertical-demo /deep/ .el-menu-item:hover,
    .el-menu-vertical-demo /deep/ .el-submenu .el-menu-item:hover,
    .el-menu-vertical-demo /deep/ .el-submenu .el-menu-item.is-activeDef,
    .el-menu-vertical-demo /deep/ .el-submenu__title:hover
    .el-menu-vertical-demo /deep/ .el-menu-item.is-activeDef,
    .el-menu-vertical-demo /deep/ .el-submenu.is-activeDef .el-submenu__title {
        background: -webkit-linear-gradient(left, #35aceb, #2a8ac9, #2e98d6, #2e98d6, #54d5ff);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(left, #35aceb, #2a8ac9, #2e98d6, #2e98d6, #54d5ff);
        /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(left, #35aceb, #2a8ac9, #2e98d6, #2e98d6, #54d5ff);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #35aceb, #2a8ac9, #2e98d6, #2e98d6, #54d5ff);
        /* 标准的语法（必须放在最后） */
        background-size: 100%;
    }
    /* .el-menu-vertical-demo /deep/ .el-menu-item:focus {
        background: none;
    } */
    /* .el-menu-vertical-demo /deep/ .is-opened  .el-submenu__title, */
    .el-menu-vertical-demo /deep/ .is-openMenu  .el-submenu__title,
    .el-menu-vertical-demo /deep/ .el-menu-item.is-activeDef,
    .el-menu-vertical-demo /deep/ .el-submenu.is-activeDef .el-submenu__title {
        color: #fff !important;
    }
    .nextlevel>li>ul>li /deep/ .el-menu-item.is-activeDef {
        height: 30px;
        line-height: 30px;
        padding: 0 !important;
    }
    .nextlevel>li>ul>li /deep/ .el-menu-item.is-activeDef {
        color: #fff !important;
        background: transparent !important;
        border: 1px solid #4bcaff !important;
    }
    .el-menu-vertical-demo /deep/ .is-activeDef:hover i {
        color: #fff !important;
    }

</style>
