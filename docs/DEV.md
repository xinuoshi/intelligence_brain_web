# ⌨ 开发说明书

```
😀请务必查阅开发说明书，里面存放了前端开发相关的内容，封装的公共组件和公共方法等使用说明
❗❗请优先使用已有的组件进行开发，没有再造❗❗
😘如果你是新人，务必好好看
😎如果你是老员工，务必按约定执行，别的不谈了
```

---

## ⭐

```
>>>开发人员随时都可新增新的组件和方法等，增加后请自行在开发说明书中增加开发文档<<<
>>>注意公用的请在main.js中进行暴露，页面内不用再引用组件，直接使用即可<<<
```

---

## 项目结构

项目代码都放在📁src目录下，开发时请按目录结构存放新文件

* **📂assets**： 图片、图标等静态文件
* **📂components**： 公共组件，以及各页面内的组件等
* **📂plugins**： vue-cli3脚手架引用的插件（ex. axios element-ui）
* **📂public**： 公共样式、方法、指令、工具等
* **📂views**： 所有视图页面

---

## **公共样式**

---

## **公共组件**

### <font color="#F56C6C">< api > 页面公共布局模板</font>
系统中大部分页面可通用的公共布局模板组件

#### 基础用法：

只要slot插槽对应，即可插到`< api >`中

`slot="lowerMenuBar"`: 顶栏位置

`slot="equipmentChangeName"`: 主要区域顶部位置

`slot="searchBoxBar"`: 主要区域搜索部位置

`slot="tips"`: 主要区域搜索部与主内容中间位置

`slot="table"`: 主要区域主内容位置

``` html
<api>
    <!-- 下级菜单栏 -->
    <div slot="lowerMenuBar" class="flexRow">
        <div></div>...
    </div>
    <!-- 切换窗 -->
    <div slot="equipmentChangeName">
        <div></div>...
    </div>
    <!-- 搜索栏 左边搜索 -->
    <SearchPage slot="searchBoxBar"></SearchPage>
    <!-- 搜索栏 右边操作按钮 -->
    <div slot="searchBoxBar">
        <bt></bt>...
    </div>
    <!--表格栏  -->
    <tableCommon slot="table"></tableCommon>
</api>
```

### <font color="#F56C6C">< bt > 按钮组件</font>
封装的批量生成按钮组件(可搭配 TABLE 组件使用)

#### 基础用法：

``` html
<bt :buttonList="buttonList" @operation="operation"></bt>
```
``` javascript
属性buttonList必须传入参数：

// 也可直接在data()中初始化
let buttonList = [
    {
        title: "查看", // 按钮文字
        plain: true,
        type: "primary", // 按钮类型： success , info, warning, danger, text, primary
        size: "small", // 按钮大小：small medium mini
        classId: "suBtn"
    },
    {
        title: "编辑", // 按钮文字
        plain: true,
        type: "primary", // 按钮类型： success , info, warning, danger, text, primary
        size: "small", // 按钮大小：small medium mini
        a: 1
    },
    {
        title: "删除", // 按钮文字
        plain: true,
        type: "primary", // 按钮类型： success , info, warning, danger, text, primary
        size: "small", // 按钮大小：small medium mini
        class: "erBtn"
    }
];
```
``` javascript
事件operation为点击按钮后获得具体点击相应按钮的回调：

operation(data) {
    // data.index 为 buttonList 数组对应顺序的按钮，依据index可判断点击的具体按钮（也可通过data中回调的其他信息来判断）
    if (data.index === 0) {
        // 此处执行index === 0相应的按钮的操作
    }
}
```

TABLE组件中的按钮用法详见`< tableCommon >`

### <font color="#F56C6C">< tableCommon > 通用表格组件</font>
系统中大部分页面可通用的公共布局模板组件

#### 基础用法：

``` html
<tableCommon
    :table-list="tableList"
    @update:table-list="val => tableList = val"
    :buttonList="buttonList"
    @update:button-list="val => buttonList = val"
    :reFresh="reFresh"
    @selectArySlected="selectArySlected"
    @tablePageNum="tablePageNum"
/>
```

### <font color="#F56C6C">< SearchPage ></font>

---

## **公共方法**

### <font color="#409EFF">$layerNotice 提示弹框</span>


