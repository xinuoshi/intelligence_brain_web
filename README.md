# intelligence_brain_web

> 天津市城市智慧交通管理大脑WEB

```
这是一个项目基本文档，记录一些基本的使用方法和注意事项
请尽量按照约定执行
```

❗(<font color="#e06c75">**开发成员必读**</font>)详细项目开发说明书请查看❗→：[暂无]()

---

## 技术选型

* 核心框架：[Vue](https://cn.vuejs.org/v2/guide/)
* 状态管理：[Vuex](https://vuex.vuejs.org/zh-cn/intro.html)
* 路由映射：[vue-router](https://router.vuejs.org/zh-cn/)
* UI组件库：[Element-UI](http://element.eleme.io/#/zh-CN/component/quickstart)
* HTTP请求库：[axios](https://github.com/mzabriskie/axios)
* 资源加载打包工具：[Webpack](https://webpack.github.io/)
* 代码规范工具：[eslint](http://eslint.org/)
* 其他：[ES6](https://wohugb.gitbooks.io/ecmascript-6/content/index.html), [node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/)

---

## Build Setup

``` bash
# 在项目根目录执行 安装依赖 install dependencies (增加新的插件后均需重新执行)
npm install

# 在项目目录执行 启动项目dev环境 启动热重载服务 serve with hot reload at localhost:8080
npm run dev

# 编译打包生产版本 build for production with minification
npm run build

# 编译打包prod版本&分析报告 build for production and view the bundle analyzer report
npm run build --report
```

---

## 项目注意事项

### UI部分：

* 浏览器兼容：`ie11`、`Microsoft Edge`、`360极速模式`、`chrome`
* 所有展示表格列宽可拖动，行宽不可拖动改变
* 子窗口可拖拽，右上有`x`关闭
* 所有页面添加`刷新`按钮
* 对空字段，在列表中展示文字`无信息`，不要空展示
* 🙄所有地址的录入方式：改为像淘宝购物选择地址一样的方式，"X省X市X县/区+详细地址" (X为下拉菜单选择我国省市区信息，详细地址：浅色字体提示“如道路、门牌号、小区、楼栋号、单元室等”）
* 列表中的数字靠右端对齐

---

## 开发注意：

没啥，请大家写好`注释！！！` 不用多规范，通俗易懂，越细致越好，至少大家得会用

---

## GIT代码管理使用注意

> 为了防止多分支开发引起过多的冲突，对代码的拉取推送进行如下要求，请尽量注意。这样可以尽可能保证公共内容的同步，并且代码冲突的解决也只会发生在每个开发成员同步主分支代码的时候。*每个开发人员应该创建一条自己的分支*

### 保持更新主分支

1. 公共代码都提交在**主分支**上，所以注意`origin/master`远程主分支的更新，尽量及时*pull拉取*主分支代码到本地保持更新

### 推送自己代码步骤

1. 自己开发的模块代码更新，提交的自己的分支即可

### 推送公共代码步骤

0. 新增修改**公共方法、公共组件等**，统一推送代码到主分支上共享 ❗*注：更新路由也可推送到主分支，请同时把新增或修改的路由对应组件页面也推送更新，否则会因丢失路由报错*

1. 先在本地`master`、`xxx`(**你自己的分支**)上分别*pull拉取*`origin/master`远程主分支最新的代码，让自己本地的所有分支都与远程主分支代码保持一致（*并解决冲突*）

2. 切换到本地`xxx`分支，*commit提交*&*push推送*你需要更新到`origin/master`远程主分支的代码（*不需要把所有代码都暂存提交推送*）到`origin/xxx`(**你自己的远程分支**)

3. 切换到本地`master`分支，选择你自己分支刚才推送的更新，并*merge合并*此更新到主分支，然后*push推送*到`origin/master`远程主分支即可

> 推送公共部分的更新后，可通知开发组成员一声，提醒大伙拉取新代码

