<template>
    <div>
        <api>
            <!-- 下级菜单栏 -->
            <div slot="lowerMenuBar" class="flexRow">
                <div v-for="(item, index) in lowerMenuBarList" :key="index" @click="urlHref(index)" :class="{lowerMenuBarListActive:index === upIsIndex}" class="lowerMenuBarList">{{item.name}}</div>
                <div class="lowerMenuBarListActiveHr"></div>
            </div>
            <!-- 切换窗 -->
            <div slot="equipmentChangeName">
                <span class="equipmentChangeName" :class="{equipmentChangeNameActive: index === isActive}" @click="isActive = index,changEquipment(item)" v-if="!item.noName" v-for="(item, index) in lowerMenuBarList[upIsIndex].nextlevel" :key="item.index">{{item.name}}</span>
            </div>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage  slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchName"
                @searchEvent="handlerSearchEvent"
                :typeIndex="typeIndex" :reSet="reSet" @resetover="reSetOver" ></SearchPage>
            <!--表格栏  -->
            <tableCommonPut class="dataRetrievalTable" slot="table" ref="tableCommonPut" :buttonList="buttonList2" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum"></tableCommonPut>
        </api>
        <el-dialog
            :title="title"
            :width="this.changeList[upIsIndex].nextlevel[isActive].width"
            :visible.sync="Dialog" v-dialogDrag :close-on-click-modal="false" :close-on-press-escape="false" class="tems_dialog dataRetrieval" >
            <div class="scrollPart" id="scrollDPart">
                <div class="nameChangeBar">
                    <span class="nameChange" @click="openDialog(index)" :class="{nameChangeActive:index=== nameChangeActive}" v-for="(item,index) in nameChange" :key="index" >
                        {{item}}档案信息库
                    </span>
                </div>
                <div style="height:475px;overflow:auto" :disabled="(title === '查看' ? true : false)" :class="{isDisable: title === '查看'}" >
                    <div class="demo-ruleForm partOfEveryDA" :key="index" 
                        v-for="(item, index) in lowerMenuBarList[upIsIndex].nextlevel[isActive].list2"
                        v-show="formValidate.length>0">
                        <div v-for="(items, key) in item"  :key="key">
                            <span class="lableDialog">{{items.name+':'}}</span>
                            <span class="valueDialog">{{formValidate[index][items.key]}}</span>
                        </div>
                    </div>
                    <div style="color: #54d5ff;font-size: 20px;"
                        v-show="formValidate.length === 0">
                        暂无数据{{nameChange[nameChangeActive]}}信息
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum footer">
                    <div v-if="title === '详情'" class="tems_Button inportBtn dic_closed" @click="Dialog = false">关 闭</div>
                    <div v-if="title === '查看'" class="tems_Button inportBtn dic_closed" @click="Dialog = false">关 闭</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ol from "openlayers";
import "openlayers/css/ol.css";
// 引入坐标转换
import coordtransform from "coordtransform";
import GisClassMethod from "@/public/GisClassMethod";

export default {
    name: "dataRetrieval",
    data() {
        return {
            nameChangeActive: 0,
            faceImage: "",
            // 省市区列表
            options: [],
            title: "创建",
            formValidate:[],
            // 弹窗
            Dialog: false,
            // 表格按钮
            buttonList2: [],
            // 搜索栏按钮
            buttonList: [],
            // 三级菜单
            upIsIndex: 0,
            // 切换窗是否切换
            isActive: 0,
            // 搜索传参
            searchName: [],
            // 表格组件传参列表
            tableList: {
                thisIndex:"0_0",
                thisPageSize: 10,
                getDataUrl: "",
                params: "",
                selection: false, // 是否有选中框
                index: true, // 是否有序号
                scope: "0", // 是否有操作栏
                width: "100",
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    { tableName: "方向", tableProp: "value", hover: "flge" },
                    { tableName: "方向状态", tableProp: "status" }
                ]
            },
            // 左侧下级导航菜单列表
            lowerMenuBarList: [
                { nextlevel: [{ name: "关联组合检索", tableListList: [], searchNameList: [] }] }
            ],
            nameChange:[],
            nameChangeList:[
                {   
                    name: "人员",
                    url:"sjh2/strategysupport/combinedQuery/personFile",
                    list2:[
                        {name:"姓名", key:"personName"},
                        {name:"性别", key:"sex", data:[{id:"1", name:"男"}, {id:"2", name:"女"}]},
                        {name:"民族", key:"nation",data: this.$store.state.nation},
                        {name:"身份证明名称", key:"idName"},
                        {name:"身份证明号码", key:"idNum"},
                        {name:"人脸识别Id", key:"faceId"},
                        {name:"出生日期", key:"birthday", listTime:"day"},
                        {name:"年龄", key:"age",replace:"岁"},
                        {name:"居住地址", key:"address"},
                        {name:"户口所在地址", key:"registerAdd"},
                        {name:"联系电话", key:"tel"},
                        {name:"是否有驾驶证", key:"driving", data:[{id:"1", name:"是"}, {id:"0", name:"否"}]},
                        {name:"驾龄", key:"driveAge",replace:"年"},
                        {name:"违章次数", key:"violationNum"},
                        {name:"事故次数", key:"accidentNum"},
                        {name:"驾驶证准驾车型", key:"drvingType",data: this.$store.state.category4},
                        {name:"驾驶证状态", key:"licenseState", data: this.$store.state.licenseState},
                        {name:"驾驶证行政区划", key:"adminArea", data: this.$store.state.adminArea},
                        {name:"驾驶证发证日期", key:"certificateDate", listTime:"time"},
                        {name:"驾驶证管理部门", key:"managePart"},
                        {name:"驾驶证发证机关", key:"licenseAgency"},
                        {name:"驾驶证更新时间", key:"updateTime", listTime:"time"},
                        {name:"驾驶证原准驾车型", key:"rootDrivingType", data: this.$store.state.category4},
                        {name:"驾驶证初次领证日期", key:"firstDate", listTime:"time"},
                        {name:"驾驶证初次领证机关", key:"firstAgency"},
                        {name:"驾驶证期限", key:"timeLimit"},
                        {name:"驾驶证有效期始", key:"startTime", listTime:"time"},
                        {name:"驾驶证有效期止", key:"endTime", listTime:"time"},
                        {name:"驾驶证累积计分", key:"score"},
                        {name:"驾驶证补正次数", key:"fillLicenseNum"},
                        {name:"驾驶证审验有效期截止日期", key:"effectiveEnd", listTime:"time"},
                        {name:"参加工作日期", key:"jobTime", listTime:"time"},
                        {name:"所属企业组织机构代码", key:"companyCode"},
                        {name:"婚姻状态", key:"marryCondition",data: [{id:1,name:"未婚"},{id:2,name:"已婚"},{id:3,name:"丧偶"}]},
                        {name:"文化程度", key:"cultureLevel", data: this.$store.state.cultureLevel}
                    ]
                },
                {
                    name: "车辆", 
                    url:"sjh2/strategysupport/combinedQuery/carFile",
                    list2:[
                        { name: "号牌号码", key: "plateNum" },
                        { name: "号牌种类", key: "plateType", data:this.$store.state.plateType },
                        { name: "车辆用途", key: "vehicleUse", data:this.$store.state.vehicleUse },
                        { name: "机动车所有人姓名", key: "ownerName" },
                        { name: "所有人身份证明", key: "ownerIdName" },
                        { name: "所有人身份证明号码", key: "ownerIdNum" },
                        { name: "机动车所有单位", key: "carUnit" },
                        { name: "车辆品牌", key: "carBrand" },
                        { name: "车辆型号", key: "carModel" },
                        { name: "车身颜色", key: "color", data: this.$store.state.vehicleColorT },
                        { name: "车辆识别代号", key: "carIdNum" },
                        { name: "用途属性", key: "useAttribute",data:this.$store.state.useAttribute },
                        { name: "车辆类型", key: "carType",data:this.$store.state.carType },
                        { name: "使用性质", key: "useNature",data:this.$store.state.useNature },
                        { name: "机动车辆状态", key: "vehicleCondition",data:this.$store.state.vehicleCondition },
                        { name: "各类违法次数", key: "illegaNum" },
                        { name: "事故次数", key: "accidentNum" },
                        { name: "是否为重点车辆", key: "keyCar",data:[ {id:1, name:"是"},{id:2, name:"否"} ] },
                        { name: "重点车辆行驶路线", key: "keyCarRoute" },
                        { name: "机动车所有权", key: "Ownership",data:this.$store.state.Ownership },
                        { name: "机动车获得方式", key: "getWay",data:this.$store.state.getWay },
                        { name: "机动车定期检验情况", key: "periodicInspect" ,data:this.$store.state.periodicInspect},
                        { name: "逾期检验强制报废截止日期", key: "limitScrap", listTime:"time" },
                        { name: "逾期检验期截止时间", key: "limitEnd", listTime:"time" },
                        { name: "国产/进口车辆", key: "domOrImp",data:this.$store.state.domOrImp },
                        { name: "制造国", key: "makeCountry",url:["code/?type=gjdm","id","value"],data:[] },
                        { name: "制造厂名称", key: "factoryName" },
                        { name: "检验有效期截止日期", key: "inspectEnd", listTime:"time" },
                        { name: "强制报废截止日期", key: "mandatoryEnd", listTime:"time" },
                        { name: "行驶证发证机关", key: "licenseAgency" },
                        { name: "机动车管理部门", key: "vehicleManage" },
                        { name: "机动车发牌日期", key: "vehiclePlate", listTime:"time" },
                        { name: "发行驶证日期", key: "certificateDate", listTime:"time" },
                        { name: "发登记证书日期", key: "registraTime", listTime:"time" },
                        { name: "发合格证日期", key: "approvalTime", listTime:"time" },
                        { name: "保险终止日期", key: "insuranceEnd", listTime:"time" },
                        { name: "补领号牌次数", key: "fillPlate" },
                        { name: "补行驶证次数", key: "fillLicenseNum" },
                        { name: "补登记次数", key: "fillRegistra" },
                        { name: "机动车抵押标记", key: "mortgageCar",data:this.$store.state.mortgageCar },
                        { name: "机动车燃料种类", key: "fuleType",data:this.$store.state.fuleType },
                        { name: "购买日期", key: "buyTime", listTime:"time" },
                        { name: "保险金额", key: "insuranceAcc" },
                        { name: "交强险", key: "insurance", data:[{id:1,name:"是"},{id:0,name:"否"}] },
                        { name: "第三者责任险", key: "thirdRespon", data:[{id:1,name:"是"},{id:0,name:"否"}]  },
                        { name: "乘客险", key: "passagerIns", data:[{id:1,name:"是"},{id:0,name:"否"}]  },
                        { name: "保险公司", key: "insuranceComp"},
                        { name: "保险期限起止日期", key: "insStartTime", listTime:"time" },
                        { name: "保险期限结束日期", key: "insEndTime", listTime:"time" }
                    ]
                },
                {
                    name: "道路",
                    url:"sjh2/strategysupport/combinedQuery/roadFile",
                    list2:[
                        { name: "道路代码", key: "roadCode" },
                        { name: "道路名称", key: "roadName" },
                        { name: "道路级别", key: "roadLevel" },
                        { name: "道路类型", key: "roadType", data:this.$store.state.roadTyp2 },
                        { name: "路口路段类型", key: "crossRodeType", data:this.$store.state.crossRodeType },
                        { name: "道路物理隔离", key: "PhysicalIsolation", data:this.$store.state.PhysicalIsolation },
                        { name: "道路防护设施类型", key: "ProtectType", data:this.$store.state.ProtectType },
                        { name: "中央隔离设施", key: "centralIsolation", data:this.$store.state.centralIsolation },
                        { name: "行政区划", key: "area", data:this.$store.state.area },
                        { name: "管理部门", key: "managePart" },
                        { name: "公路行政等级", key: "adminLevel", data:this.$store.state.adminLevel},
                        { name: "地形", key: "terrain",data:this.$store.state.terrain },
                        { name: "道路线形", key: "roadAlign",data:this.$store.state.roadAlign },
                        { name: "路面结构", key: "roadStructure",data:this.$store.state.roadStructure },
                        { name: "里程起始", key: "mileageStart" },
                        { name: "里程结束", key: "mileageEnd" },
                        { name: "辖区里程", key: "areaMileage" },
                        { name: "起点名称", key: "startPoint" },
                        { name: "结束名称", key: "endPoint" },
                        { name: "学校数量", key: "schoolNum" },
                        { name: "医院数量", key: "hospitalNum" },
                        { name: "事故数量", key: "accidentNum" },
                        { name: "违法数量", key: "illegalNum" },
                        { name: "拥堵发生数量", key: "congesNum" },
                        { name: "是否有积水/结冰", key: "waterOrIce", data:[{id:1,name:"积水"},{id:0,name:"未积水"}] },
                        { name: "路边停车位数量", key: "parkingNum" }
                    ]
                },
                {
                    name: "违法", 
                    url:"sjh2/strategysupport/combinedQuery/illegalFile",
                    list2: [
                        { name: "违法编号", key: "illegalCode" },
                        { name: "车辆用途", key: "vehicleUse", data:this.$store.state.vehicleUse },
                        { name: "校车服务", key: "schoolService", data:[
                            {id:"1", name:"是"},
                            {id:"0", name:"否"}
                        ]  },
                        { name: "车辆分类", key: "vehicleClass",data:this.$store.state.vehicleClass },
                        { name: "号牌种类", key: "plateType", data:this.$store.state.plateType },
                        { name: "号牌号码", key: "plateNum" },
                        { name: "车辆归属地", key: "domicile" },
                        { name: "使用性质", key: "useNature",data:this.$store.state.useNature},
                        { name: "交通方式", key: "trafficWay",data:this.$store.state.trafficWay },
                        { name: "采集方式（非现场）", key: "collectionWay" },
                        { name: "违法时间", key: "illegalTime", listTime:"time" },
                        { name: "行政区划", key: "area",data: this.$store.state.adminArea },
                        { name: "驾驶人身份证明号码", key: "driverIdNum" },
                        { name: "驾驶人姓名", key: "driverName" },
                        { name: "道路类型", key: "roadType", data:this.$store.state.roadTyp2 },
                        { name: "公路行政等级", key: "adminLevel", data:this.$store.state.adminLevel },
                        { name: "违法地点", key: "illegalLoc" },
                        { name: "违法地址", key: "illegalAdd" },
                        { name: "违法行为", key: "illegalBehavior",data:this.$store.state.illegalBehavior,url:["code/?type=wfdm","id","value"],data:[] },
                        { name: "违法记分数", key: "illegalScore" },
                        { name: "罚款金额", key: "fines" },
                        { name: "采集（发现）机关", key: "collectionDepart" },
                        { name: "采集（采集）机关名称", key: "collectionDepartName" },
                        { name: "处理机关", key: "dealDepart" },
                        { name: "处理机关名称", key: "dealDepartName" },
                        { name: "处理时间", key: "dealTime", listTime:"time" },
                        { name: "执勤民警", key: "police" },
                        { name: "违法照片/视频地址", key: "pictureOrVedio" },
                        { name: "执法方式", key: "lawWay", data:[
                            {id:1, name:"现场执法"},
                            {id:2, name:"非现场执法"},
                            {id:3, name:"强措"}
                        ] }
                    ]
                },
                {
                    name: "事故", 
                    url:"sjh2/strategysupport/combinedQuery/accidentFile",
                    list2: [
                        { name: "事故类型", key: "accidentType", data:this.$store.state.accidentType },
                        { name: "事故编号", key: "accidentCode" },
                        { name: "事故发生时间", key: "accidentTime", listTime:"time" },
                        { name: "事故地点", key: "accidentPlace" },
                        { name: "受伤人数", key: "injuredPeople" },
                        { name: "7天死亡人数", key: "dieNum" },
                        { name: "直接财产损失", key: "propertyLose",replace:"元"},
                        { name: "认定原因分类", key: "reasonClass",data:this.$store.state.reasonClass },
                        { name: "事故认定原因", key: "reason",data:this.$store.state.reason },
                        { name: "天气", key: "weather",data:this.$store.state.weather },
                        { name: "能见度", key: "vidibility",data:this.$store.state.vidibility },
                        { name: "地形", key: "terrain",data:this.$store.state.terrain },
                        { name: "照明条件", key: "lightCon",data:this.$store.state.lightCon },
                        { name: "事故形态", key: "accidentForm",data:this.$store.state.accidentForm},
                        { name: "行政区划", key: "area",data: this.$store.state.adminArea },
                        { name: "星期", key: "dayNumberOfweek",data:this.$store.state.dayNumberOfweek },
                        { name: "车辆间事故", key: "vehicleBetAccident",data:this.$store.state.vehicleBetAccident },
                        { name: "单车事故", key: "vehicleAccident",data:this.$store.state.vehicleAccident },
                        { name: "道路安全属性", key: "roadSafe",data:this.$store.state.roadSafe },
                        { name: "公路行政等级", key: "adminLevel",data:this.$store.state.adminLevel },
                        { name: "路名", key: "roadName" },
                        { name: "公里数", key: "mileage" },
                        { name: "路面状况", key: "roadCondition",data:this.$store.state.roadCondition },
                        { name: "路表情况", key: "routeCondition",data:this.$store.state.routeCondition },
                        { name: "在道路横断面位置", key: "roadCrossLoc",data:this.$store.state.roadCrossLoc },
                        { name: "交通信号方式", key: "trafficSingal",data:this.$store.state.trafficSingal },
                        { name: "机动车数量", key: "motorNum" },
                        { name: "非机动车数量", key: "nonMortorNum" },
                        { name: "行人数量", key: "personNum" },
                        { name: "事故照片/视频地址", key: "accidentLoc" }
                    ]
                }
            ],
            changeList: [
                {
                    name: "关联组合检索",
                    // 切换窗分好类的设备列表
                    nextlevel: [
                        {
                            name: "人员查询",
                            detileUrl: [
                                {index: 0, keyName: "idNum", value: "idNum"},
                                {index: 1, keyName: "idNum", value: "idNum"},
                                {index: 3, keyName: "idNum", value: "idNum"},
                                {index: 4, keyName: "idNum", value: "idNum"}
                            ],
                            url: "/judged/user",
                            width:"1250px",
                            tableListList: [
                                { tableName: "姓名", tableProp: "personName",width:150 },
                                { tableName: "性别", tableProp: "sex",width:60, keyChange: { keyName: "id", keyValue: "name" },pand:[{id:1, name:"男"}, {id:2, name:"女"}] },
                                { tableName: "民族", tableProp: "nation",width:200, keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.nation },
                                { tableName: "身份证号码", tableProp: "idNum",width:250, hover: "flge" },
                                { tableName: "居住地址", tableProp: "address", hover: "flge" },
                                { tableName: "是否有驾驶证", tableProp: "driving",width:120,keyChange: { keyName: "id", keyValue: "name" },pand:[{id:1, name:"是"}, {id:2, name:"否"}]  },
                                { tableName: "驾龄", tableProp: "driveAge",width:80, replace: "年" },
                                { tableName: "违章次数", tableProp: "violationNum",width:120, replace: "次" },
                                { tableName: "事故次数", tableProp: "accidentNum",width:120, replace: "次" },
                            ],
                            searchNameList: [
                                { searchPlaceholder: "姓名", type: 0, Sendkey: "personName" },
                                { searchPlaceholder: "性别", type: 1, Sendkey: "sex", data:[{id:"1", name:"男"}, {id:"2", name:"女"}]},
                                { searchPlaceholder: "年龄", type: 0, Sendkey: "ageStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "ageEnd" },
                                { searchPlaceholder: "身份证号", type: 0, Sendkey: "idNum" },
                                { searchPlaceholder: "电话", type: 0, Sendkey: "tel" },
                                { searchPlaceholder: "居住地址", type: 0, Sendkey: "address" }
                            ]
                        },
                        {
                            name: "车辆查询",
                            detileUrl: [
                                {index: 1, keyName: "plateNum", value: "plateNum"},
                                {index: 4, keyName: "plateNum", value: "plateNum"},
                                {index: 3, keyName: "plateNum", value: "plateNum"},
                                {index: 0, keyName: "idNum", value: "ownerIdNum"}
                            ],
                            url: "/judged/car",
                            width:"1250px",
                            tableListList: [
                                { tableName: "号牌号码", tableProp: "plateNum",width:80, hover: "flge" },
                                { tableName: "机动车所有人姓名", tableProp: "ownerName",width:120},
                                { tableName: "所有人身份证号码", tableProp: "ownerIdNum",width:150},
                                { tableName: "机动车所有单位", tableProp: "carUnit"},
                                { tableName: "号牌种类", tableProp: "plateType",width:80, keyChange: { keyName: "id", keyValue: "name" }, pand:this.$store.state.plateType},
                                { tableName: "使用性质", tableProp: "useNature",width:80, keyChange: { keyName: "id", keyValue: "name" }, pand:this.$store.state.useNature},
                                { tableName: "车辆品牌", tableProp: "carBrand",width:80},
                                { tableName: "车辆型号", tableProp: "carModel",width:120},
                                { tableName: "车身颜色", tableProp: "color",width:80, keyChange: { keyName: "id", keyValue: "name" }, pand:this.$store.state.vehicleColorT},
                                { tableName: "车辆状态", tableProp: "vehicleCondition",width:80, keyChange: { keyName: "id", keyValue: "name" }, pand:this.$store.state.vehicleCondition},
                                { tableName: "违法次数", tableProp: "illegaNum",width:80,replace:"次"},
                                { tableName: "事故次数", tableProp: "accidentNum",width:80,replace:"次"}
                            ],
                            searchNameList: [
                                { searchPlaceholder: "车牌号", type: 0, Sendkey: "plateNum" },
                                { searchPlaceholder: "车辆使用性质", type: 1, Sendkey: "useNature", data:this.$store.state.useNature },
                                { searchPlaceholder: "品牌", type: 0, Sendkey: "carBrand" },
                                { searchPlaceholder: "颜色", type: 1, Sendkey: "color", data: this.$store.state.vehicleColorT },
                                { searchPlaceholder: "重点车辆", type: 1, Sendkey: "keyCar",data:[
                                    {id:1, name:"是"},{id:2, name:"否"}
                                ] }
                            ]
                        },
                        {
                            name: "道路查询",
                            detileUrl: [
                                {index: 2, keyName: "roadCode", value: "roadCode"},
                                {index: 3, keyName: "roadName", value: "roadName"},
                                {index: 4, keyName: "roadName", value: "roadName"}
                            ],
                            url: "/judged/road",
                            width:"1250px",
                            tableListList: [
                                { tableName: "道路代码", tableProp: "roadCode",width:120},
                                { tableName: "道路名称", tableProp: "roadName", hover: "flge" },
                                { tableName: "行政区域", tableProp: "area", keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.area },
                                { tableName: "道路级别", tableProp: "roadLevel",width:150,replace:"级" },
                                { tableName: "道路类型", tableProp: "roadType",width:150,keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.roadTyp2 },
                                { tableName: "路口路段类型", tableProp: "crossRodeType",keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.crossRodeType },
                                { tableName: "事故数量", tableProp: "accidentNum",width:120 },
                                { tableName: "违法数量", tableProp: "illegalNum",width:120 },
                                { tableName: "积水结冰次数", tableProp: "waterOrIce",width:120,replace:"次" }],
                            searchNameList: [
                                { searchPlaceholder: "道路名称", type: 0, Sendkey: "roadName" },
                                { searchPlaceholder: "行政区划", type: 0, Sendkey: "area", data:this.$store.state.area },
                                { searchPlaceholder: "道路类型", type: 1, Sendkey: "roadType", data: this.$store.state.roadTyp2 },

                                { searchPlaceholder: "是否积水结冰", type: 1, Sendkey: "waterOrNot", data:[{id:1,name:"是"},{id:0,name:"否"}] },
                                { searchPlaceholder: "事故数量起", type: 0, Sendkey: "accidentNumStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "accidentNumEnd" },
                                { searchPlaceholder: "违法数量起", type: 0, Sendkey: "illegalNumStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "illegalNumEnd" },
                                { searchPlaceholder: "学校数量起", type: 0, Sendkey: "schoolNumStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "schoolNumEnd" },
                                { searchPlaceholder: "医院数量起", type: 0, Sendkey: "hospitalNumStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "hospitalNumEnd" },
                                { searchPlaceholder: "停车位数量起", type: 0, Sendkey: "parkingNumStart" },
                                { searchPlaceholder: "至",left:"0" , type: 0, Sendkey: "parkingNumEnd" }
                            ]
                        },
                        {
                            name: "违法信息查询",
                            detileUrl: [
                                {index: 3, keyName: "illegalCode", value: "illegalCode"},
                                {index: 2, keyName: "address", value: "illegalAdd"},
                                {index: 0, keyName: "idNum", value: "driverIdNum"},
                                {index: 1, keyName: "plateNum", value: "plateNum"}
                            ],
                            url: "/judged/illegal",
                            width: "1250px",
                            tableListList: [
                                { tableName: "违法编号", tableProp: "illegalCode" },
                                { tableName: "违法时间", tableProp: "illegalTime", tableTime: "flage",width:200 },
                                { tableName: "违法地点", tableProp: "illegalAdd", hover: "flge" },
                                { tableName: "号牌号码", tableProp: "plateNum",width:150 },
                                { tableName: "驾驶人姓名", tableProp: "driverName",width:150 },
                                { tableName: "驾驶人身份证明号码", tableProp: "driverIdNum" },
                                { tableName: "违法行为", tableProp: "illegalBehavior", keyChange: { keyName: "id", keyValue: "value" }, url:"code/?type=wfdm" },
                                { tableName: "违法记分数", tableProp: "illegalScore",width:120 },
                                { tableName: "罚款金额", tableProp: "fines",width:120 }
                            ],
                            searchNameList: [
                                { searchPlaceholder: "发生时间", id: 0, url: "", type: 7, Sendkey: "illegalTimeStart", time: "" },
                                { searchPlaceholder: "至",left:"0" , id: 0, url: "", type: 8, Sendkey: "illegalTimeEnd", time: "" },
                                { searchPlaceholder: "发生区域", id: 0, url: "", type: 1, Sendkey: "area", data:this.$store.state.area },
                                { searchPlaceholder: "号牌号码", id: 0, url: "", type: 0, Sendkey: "plateNum" },
                                { searchPlaceholder: "驾驶人身份证号码", id: 0, url: "", type: 0, Sendkey: "driverIdNum" },
                                { searchPlaceholder: "违法行为", id: "id", type: 2, Sendkey: "illegalBehavior",getDataKey:"value", url:"code/?type=wfdm" }
                             ]
                        },
                        {
                            name: "事故信息查询",
                            detileUrl: [
                                {index: 4, keyName: "accidentCode", value: "accidentCode"},
                                {index: 0, keyName: "accidentCode", value: "accidentCode"},
                                {index: 1, keyName: "accidentCode", value: "accidentCode"},
                                {index: 2, keyName: "address", value: "accidentPlace"}
                            ],
                            url: "/judged/accident",
                            width: "1250px",
                            tableListList: [
                                { tableName: "事故类型", tableProp: "accidentType",width:150, keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.accidentType },
                                { tableName: "事故编号", tableProp: "accidentCode",width:150 },
                                { tableName: "发生时间", tableProp: "accidentTime", tableTime:"all",width:200 },
                                { tableName: "事故地点", tableProp: "accidentPlace", hover: "flge" },
                                { tableName: "受伤人数", tableProp: "injuredPeople",width:120 },
                                { tableName: "7天死亡人数", tableProp: "dieNum",width:120 },
                                { tableName: "直接财产损失", tableProp: "propertyLose",width:120,replace:"元" },
                                { tableName: "认定原因分类", tableProp: "reasonClass",width:300, keyChange: { keyName: "id", keyValue: "name" } ,pand:this.$store.state.reasonClass},
                                { tableName: "事故照片/视频地址", tableProp: "accidentLoc", hover: "flge" }
                            ],
                            searchNameList: [
                                { searchPlaceholder: "事故类型", id: 0, type: 1, Sendkey: "accidentType",data:this.$store.state.accidentType },
                                { searchPlaceholder: "发生区域", id: 0, url: "", type: 0, Sendkey: "area",data:this.$store.state.area },
                                { searchPlaceholder: "发生时间", id: 0, url: "", type: 7, Sendkey: "accidentTimeStart", time: "" },
                                { searchPlaceholder: "至",left:"0" , id: 0, url: "", type: 8, Sendkey: "accidentTimeEnd", time: "" },
                                { searchPlaceholder: "受伤人数", id: 0, url: "", type: 0, Sendkey: "injuredPeopleStart" },
                                { searchPlaceholder: "至",left:"0" , id: 0, url: "", type: 0, Sendkey: "injuredPeopleEnd" },
                                { searchPlaceholder: "7天死亡人数", id: 0, url: "", type: 0, Sendkey: "dieNumStart" },
                                { searchPlaceholder: "至",left:"0" , id: 0, url: "", type: 0, Sendkey: "dieNumEnd" },
                                { searchPlaceholder: "直接财产损失起", id: 0, url: "", type: 0, Sendkey: "propertyLoseStart" },
                                { searchPlaceholder: "至", id: 0, url: "", type: 0, Sendkey: "propertyLoseEnd",left:"0" },
                            ]
                        }                        
                    ]
                },
                {
                    name: "业务主题检索",
                    nextlevel: [
                        {
                            name: "查询",
                            noName: true,
                            detileUrl: [],
                            url: "/judged/opera",
                            width:"746px",
                            tableListList: [
                                { tableName: "开始时间", tableProp: "startTime",width:200 },
                                { tableName: "结束时间", tableProp: "endTime",width:200 },
                                { tableName: "点位", tableProp: "spottingNo", keyChange: { keyName: "id", keyValue: "name" }, pand:[] },
                                { tableName: "姓名", tableProp: "personName",width:150 },
                                { tableName: "身份证号", tableProp: "idNum", hover: "flge" },
                                { tableName: "车辆号牌", tableProp: "plateNo",width:150 },
                                { tableName: "车型", tableProp: "category", keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.category },
                                { tableName: "车辆颜色", tableProp: "vehicleColor",width:100, keyChange: { keyName: "id", keyValue: "name" }, pand: this.$store.state.vehicleColor },
                            ],
                            searchNameList: [
                                { searchPlaceholder: "发生时间", id: 0, url: "", type: 7, Sendkey: "startTime", time: "" },
                                { searchPlaceholder: "至", id: 0, url: "", type: 8, Sendkey: "endTime", time: "" },
                                { searchPlaceholder: "点位", id: "", type: 1, Sendkey: "spottingNo", data: [] },
                                { searchPlaceholder: "机动车号牌", id: "", type: 0, url: "", Sendkey: "plateNo", data: [] },
                                { searchPlaceholder: "车型", id: "", type: 1, Sendkey: "category", data: this.$store.state.category },
                                { searchPlaceholder: "车辆颜色", id: "", type: 1, Sendkey: "vehicleColor", data: this.$store.state.vehicleColor},
                                { searchPlaceholder: "人员姓名", id: "", type: 0, url: "", Sendkey: "personName", data: [] },
                                { searchPlaceholder: "身份证号", id: "", type: 0, url: "", Sendkey: "idNum", data: [] },
                            ]
                        }
                    ]
                }
            ],
            detectionDirectionId: "",
            // 搜索管理单位(全部)
            ManagementListNotdiscontinued: [],
            // 运维单位 建设单位
            OperationList: [],
            // 当前页
            pageNum: 1,
            // 选中的数据
            selectAry: [],
            // 获取按钮权限
            buttonData: [],
            reSet: false, // 重置搜索状态值(仅在需要多页使用同一个路由的情况下使用)
            typeIndex: 0, // 切换菜单时传入对应行号(仅在需要多页使用同一个路由的情况下使用)
            payload: "", // 搜索回调传入的搜索参数
            // 刷新页面
            reFresh: false,
            // 全局的map地图
            mapGis: "",
            // 根据坐标描点层
            coordinateTracingPoint: "",
            // 显示地图弹窗，选择经纬度
            CoordinatePoint: "",
            PointKeys: "",
            // mapCenter: [117.384925, 38.998398],
			mapCenter: [120.125347,32.540074],
            showmap: false,
            MapDataList: []
        };
    },
    methods: {     
        update(e) {	
            let file = e.target.files[0];
            let param = new FormData(); //创建form对象
            param.append('excelFile',file);//通过append向form对象添加数据
            this.faceImage = param;
        },                 
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        },
        // 重置表单
        resetForm(formName) {
            if (this.title === "查看") {
                this.closeDialogData(formName, "关闭");
            } else {
                this.closeDialogData(formName, "取消");
            }
        },                      
        // 组件名称输入或选择
        querySearchAsyncdurableAry(queryString, cb) {
            if (queryString !== undefined && queryString !== "" && queryString !== null) {
                this.MapDataList = [];
                axios.get(testUrl).then((res) => {
                    this.MapDataList.push ({
                        value: res.data.features[0].properties.NAME,
                        id:res.data.features[0].properties.MAPID
                    });
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(this.MapDataList);
                    }, 100 * Math.random());  
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            }        
        },
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                this.formValidate = [];
                this.$refs[formName].resetFields();
                this.Dialog = false;
            }, null, "warning");
        },
        // 打开创建或编辑
        operation(data) {
            let args = this.buttonList[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 打开创建
        operationDariy() {
            this.Dialog = true;
            this.formValidate = [];
            this.title = "创建";
        },
        // 弹窗切换窗
        openDialog(index) {
            this.nameChangeActive = index;
            let Lujing = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive];
            let listParem = Lujing.detileUrl[index];
            let tableList2 = this.nameChangeList[listParem.index];
            let params = {};
            params[listParem.keyName] = this.selectAry[listParem.value];
            sjhAxios.post(
                tableList2.url,params
            ).then((res) => {
                Lujing.list2 = [];
                if (res.data.result !== "failure") {
                    let resData = res.data.data;
                    for (let i in resData) {                        
                        Lujing.list2[i] = tableList2.list2;
                    }
                    this.formValidate = resData;
                    this.litsChangeValue(tableList2.list2,resData.length);
                } else {
                    this.formValidate = {};
                    let reg = RegExp("Error querying database");
                    if (reg.test(res.data.message)) {
                        this.$showSimpleMessage("网络错误", "error");
                        console.log("数据湖崩了");
                        return;
                    }
                    this.$showSimpleMessage(res.data.message + ",未查询到匹配数据", "error");
                }
            }).catch(this.defaultHttpHandler);
        },
        
        // 数据跟六个一表对应
        litsChangeValue(item,k) {
            // this.formValidate = [];
            item.map(val=>{
                if (val.url){
                    axios.get(val.url[0]).then((res) => {
                        for (let i in res.data.data) {
                            val.data.push({
                                id:res.data.data[i][val.url[1]],
                                name:res.data.data[i][val.url[2]]
                            });
                        }
                    }).catch(error => {
                        this.$showSimpleMessage(error, "error");
                    });
                }
                for (let i = 0; i < k; i++) {
                    let formElement = this.$filter.stringEvent(this.formValidate[i][val.key]);
                    if (val.data) {
                        if (formElement) {
                            if (val.url) {
                                let UrlName = val.data.find(t=>this.$filter.stringEvent(t.id) === formElement);
                                this.formValidate[i][val.key] = UrlName ?  UrlName.name : formElement;
                            } else {
                                let length = val.length ? val.length : 1;
                                let m = [];
                                let v = [];
                                for (let p = 0; p < length; p++) {
                                    let dataList = val["data"+(p===0?"":p+1)];  
                                    for (let q in dataList) {
                                        if (dataList[q].id === formElement) {
                                            this.formValidate[i][val.key] = dataList[q].name;
                                            return;
                                        } else {
                                            let formElement3 = formElement;
                                            let formElement2 = formElement3.split(","); 
                                            if (formElement2.length>1) {
                                                for (let k in formElement2){
                                                    if (dataList[q].id === formElement2[k]) {
                                                        this.formValidate[i][val.key] = dataList[q].name;
                                                        return;
                                                    }
                                                }
                                            } else {
                                                if (RegExp(dataList[q].id).test(formElement)) {
                                                    m.push(dataList[q].name);
                                                    v.push([dataList[q].id,dataList[q].name]);
                                                    if (v.length>1) {
                                                        for (let vk in v) {
                                                            if (vk>0) {
                                                                if (RegExp(v[vk][0]).test(v[vk-1][0])) {
                                                                    for (let mk in m) {
                                                                        if (m[mk] === (v[vk][1])) {
                                                                            delete m[mk];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    m = m.length>0 ? m.length > 1 ? (this.$tools.arrUnique(m)) : m: this.formValidate[i][val.key];
                                                    this.formValidate[i][val.key] = m.toString();
                                                }
                                            }  
                                        }
                                    }  
                                }
                            }
                        }
                    }
                    if (val.listTime && this.formValidate[i][val.key]) {
                        let tableElement = this.formValidate[i][val.key].toString();
                        let year = tableElement.substring(0, 4);
                        let month = year + "-" + tableElement.substring(4, 6);
                        let day = month + "-" + tableElement.substring(6, 8);
                        let hourse = day + " " + tableElement.substring(8, 10);
                        let minite = hourse + ":" + tableElement.substring(10, 12);
                        let second = minite + ":" + tableElement.substring(12, 14);
                        switch (val.listTime) {
                            case "day":
                                this.formValidate[i][val.key] = day;
                            break;
                            case "month":
                                this.formValidate[i][val.key] = month;
                            break;
                            default:
                                this.formValidate[i][val.key] = second;
                        }
                    }
                    if (this.formValidate[i][val.key] === "") {
                        this.formValidate[i][val.key] = "——";
                    }
                    if (this.formValidate[i][val.key] === undefined) {
                        this.formValidate[i][val.key] = "暂无数据返回----";
                    }                    
                    if (val.replace) {
                        this.formValidate[i][val.key] = this.formValidate[i][val.key] + val.replace;
                    }
                }
            });
        },
        // 下级菜单切换
        urlHref(index) {
            if (index !== this.upIsIndex) {
                this.upIsIndex = index;
                this.isActive = 0;
            } 
            let item = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive];
            this.changEquipment(item);  
            this.$set(this.tableList.params, "pageSize", 10);
        },
        reSetOver() {
            this.reSet = false;
        },
        changEquipment(item) {
            this.tableList.thisIndex = this.isActive +"_"+ this.upIsIndex;
            this.tableList.list = [];
            this.$set(this.tableList, "notchangurl", false);
            this.searchName = item.searchNameList;
            let url = item.url + (item.element ? item.element : "") + (item.id ? item.id : "");
            this.$set(this.tableList, "list", item.tableListList);
            this.$set(this.tableList, "getDataUrl", url);
            this.paramsChange(item);
            this.buttonList2 = this.getButton(item, "button2");
        },
        // 按钮权限
        getButton(item, buttonName) {
            let button = item[buttonName] ? item[buttonName] : [];
            let buttonListLength = button.length;
            let listName = [];
            let functionList = this.$store.state.functionList;
            for (let i = 0; i < buttonListLength; i++) {
                listName.push({
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false
                });
                this.$set(listName[i], "title", button[i].name);
                let fnameList = functionList.function[buttonName].find(t => t.enName === button[i].enName);
                let fname = fnameList ? fnameList.functionName : "";
                this.$set(listName[i], "functionKeyName", fname);
                let fnameClass = fnameList ? fnameList.class : "";
                fnameClass = fnameClass || "";
                this.$set(listName[i], "class", fnameClass);
                let fnameChang = fnameList || "";
                if (fnameChang.chang) {
                    this.$set(listName[i], "chang", fnameChang.chang);
                    this.$set(listName[i].chang, "prop", "status");
                }
                switch (buttonName) {
                    case "button2":
                        this.$set(listName[0], "group", true);
                        this.tableList.width = buttonListLength * 70;
                        break;
                    case "button1":
                        this.$set(listName[i], "class", "qiliang");
                        break;
                };
            }
            return listName;
        },
        // 搜索有关
        paramsChange(item) {
            this.typeIndex = item;
            let payload = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            this.tableList.params = payload;
            this.reSet = true;
        },
        // 表格操作变化
        selectArySlected(item) {
            let Lujing = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive];
            this.nameChange = [];
            for (let i in Lujing.detileUrl) {
                this.nameChange.push(this.nameChangeList[Lujing.detileUrl[i].index].name)
            }
            this.operationDariy();
            this.selectAry = item.id;
            this.title = "详情";
            this.openDialog(0);
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            this.formValidate = [];
            this.$set(this.tableList, "notchangurl", true);
            payload.pageSize = this.tableList.thisPageSize;
            // 事故
            if (payload.accidentNumStart !== undefined && payload.accidentNumEnd !== undefined) {
                payload.accidentNumStart = this.$filter.intEvent(payload.accidentNumStart);
                payload.accidentNumEnd = this.$filter.intEvent(payload.accidentNumEnd);
                if (payload.accidentNumStart < 0 || payload.accidentNumEnd < 0) {
                    this.$showSimpleMessage("事故数量不能为负数", "error");
                    return;
                }
                if (payload.accidentNumStart >= payload.accidentNumEnd) {
                    this.$showSimpleMessage("事故数量结束要大于事故数量开始", "error");
                    return;
                }
            }
            // 违法            
            if (payload.illegalNumStart !== undefined && payload.illegalNumEnd !== undefined) {
                payload.illegalNumStart = this.$filter.intEvent(payload.illegalNumStart);
                payload.illegalNumEnd = this.$filter.intEvent(payload.illegalNumEnd);
                if (payload.illegalNumStart < 0 || payload.illegalNumEnd < 0) {
                    this.$showSimpleMessage("违法数量不能为负数", "error");
                    return;
                }
                if (payload.illegalNumStart >= payload.illegalNumEnd) {
                    this.$showSimpleMessage("违法数量结束要大于违法数量开始", "error");
                    return;
                }
            }
            // 学校           
            if (payload.schoolNumStart !== undefined && payload.schoolNumEnd !== undefined) {
                payload.schoolNumStart = this.$filter.intEvent(payload.schoolNumStart);
                payload.schoolNumEnd = this.$filter.intEvent(payload.schoolNumEnd);
                if (payload.schoolNumStart < 0 || payload.schoolNumEnd < 0) {
                    this.$showSimpleMessage("学校数量不能为负数", "error");
                    return;
                }
                if (payload.schoolNumStart >= payload.schoolNumEnd) {
                    this.$showSimpleMessage("学校数量结束要大于学校数量开始", "error");
                    return;
                }
            }
            // 医院         
            if (payload.hospitalNumStart !== undefined && payload.hospitalNumEnd !== undefined) {
                payload.hospitalNumStart = this.$filter.intEvent(payload.hospitalNumStart);
                payload.hospitalNumEnd = this.$filter.intEvent(payload.hospitalNumEnd);
                if (payload.hospitalNumStart < 0 || payload.hospitalNumEnd < 0) {
                    this.$showSimpleMessage("医院数量不能为负数", "error");
                    return;
                }
                if (payload.hospitalNumStart >= payload.hospitalNumEnd) {
                    this.$showSimpleMessage("医院数量结束要大于医院数量开始", "error");
                    return;
                }
            }
            // 停车位  
            if (payload.parkingNumStart !== undefined && payload.parkingNumEnd !== undefined) {
                payload.parkingNumStart = this.$filter.intEvent(payload.parkingNumStart);
                payload.parkingNumEnd = this.$filter.intEvent(payload.parkingNumEnd);
                if (payload.parkingNumStart < 0 || payload.parkingNumEnd < 0) {
                    this.$showSimpleMessage("停车位数量不能为负数", "error");
                    return;
                }
                if (payload.parkingNumStart >= payload.parkingNumEnd) {
                    this.$showSimpleMessage("停车位数量结束要大于停车位数量开始", "error");
                    return;
                }
            }
            // 受伤人数            
            if (payload.injuredPeopleStart !== undefined && payload.injuredPeopleEnd !== undefined) {
                payload.injuredPeopleStart = this.$filter.intEvent(payload.injuredPeopleStart);
                payload.injuredPeopleEnd = this.$filter.intEvent(payload.injuredPeopleEnd);
                if (payload.injuredPeopleStart < 0 || payload.injuredPeopleEnd < 0) {
                    this.$showSimpleMessage("受伤人数不能为负数", "error");
                    return;
                }
                if (payload.injuredPeopleStart >= payload.injuredPeopleEnd) {
                    this.$showSimpleMessage("受伤人数结束要大于受伤人数开始", "error");
                    return;
                }
            }
            // 7天死亡            
            if (payload.dieNumStart !== undefined && payload.dieNumEnd !== undefined) {
                payload.dieNumStart = this.$filter.intEvent(payload.dieNumStart);
                payload.dieNumEnd = this.$filter.intEvent(payload.dieNumEnd);
                if (payload.dieNumStart < 0 || payload.dieNumEnd < 0) {
                    this.$showSimpleMessage("7天死亡人数不能为负数", "error");
                    return;
                }
                if (payload.dieNumStart >= payload.dieNumEnd) {
                    this.$showSimpleMessage("7天死亡人数结束要大于7天死亡人数开始", "error");
                    return;
                }
            }
            // 直接财产损失
            if (payload.propertyLoseStart !== undefined && payload.propertyLoseEnd !== undefined) {
                payload.propertyLoseStart = this.$filter.intEvent(payload.propertyLoseStart);
                payload.propertyLoseEnd = this.$filter.intEvent(payload.propertyLoseEnd);
                if (payload.propertyLoseStart < 0 || payload.propertyLoseEnd < 0) {
                    this.$showSimpleMessage("直接财产损失不能为负数", "error");
                    return;
                }
                if (payload.propertyLoseStart >= payload.propertyLoseEnd) {
                    this.$showSimpleMessage("直接财产损失结束要大于直接财产损失开始", "error");
                    return;
                }
            }
            // 年龄
            if (payload.ageStart !== undefined && payload.ageEnd !== undefined) {
                payload.ageStart = this.$filter.intEvent(payload.ageStart);
                payload.ageEnd = this.$filter.intEvent(payload.ageEnd);
                if (payload.ageStart < 0 || payload.ageEnd < 0) {
                    this.$showSimpleMessage("年龄不能为负数", "error");
                    return;
                }
                if (payload.ageStart >= payload.ageEnd) {
                    this.$showSimpleMessage("年龄结束要大于年龄开始", "error");
                    return;
                }
            }
            if (payload.illegalTimeStart && payload.illegalTimeEnd) {
                payload.illegalTimeStart = this.$tools.setTimeUse(new Date(payload.illegalTimeStart));
                payload.illegalTimeEnd = this.$tools.setTimeUse(new Date(payload.illegalTimeEnd));
            }
            if (payload.accidentTimeStart && payload.accidentTimeEnd) {
                payload.accidentTimeStart = this.$tools.setTimeUse(new Date(payload.accidentTimeStart));
                payload.accidentTimeEnd = this.$tools.setTimeUse(new Date(payload.accidentTimeEnd));
            }
            if (payload.startTime && payload.endTime) {
                payload.startTime = this.$tools.setTimeUse(new Date(payload.startTime));
                payload.endTime = this.$tools.setTimeUse(new Date(payload.endTime));
            }
            if (this.faceImage !== "") {
                
            }
            this.tableList.params = payload;
        },
        // 页面权限走接口获取数据 mountedFunction、getEardiry、getOption这三个是一体的
        getOption(data) {
            this.formValidate = [];
            let option = [];
            axios.get(data.url).then((res) => {
                if (res.data.code === 0) {
                    let list = res.data.data;
                    for (let j = 0; j < list.length; j++) {
                        option.push({
                            label: list[j][data.changName],
                            value: list[j][data.changid]
                        });
                    }
                    this.$set(data, "option", option);
                } else {
                    this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                }
            }).catch(this.defaultHttpHandler);
        },
        // 页面权限走接口获取数据上级判断哪里需要走接口mountedFunction、getEardiry、getOption这三个是一体的 
        getEardiry(item) {
            let listValue = this.lowerMenuBarList;
            for (let i in listValue) {
                let data = listValue[i].nextlevel;
                if (data) {
                    for (let j in data) {
                        let dataj = data[j].list;
                        if (dataj) {
                            for (let k in dataj) {
                                if (dataj[k][item]) {
                                    this.getOption(dataj[k]);
                                }
                            }
                        }
                    }
                }
            }
            this.$nextTick(() => {
                this.reSetOver();
                this.urlHref(this.upIsIndex);
            });
        },
        // 页面权限，四级菜单以及五级菜单mountedFunction、getEardiry、getOption这三个是一体的
        mountedFunction() {
            let data = this.$store.state.authData.find(t => t.name === "研判分析"); ;
            data = data ? data.nextlevel : [];
            this.lowerMenuBarList = [];
            let list = data ? data.find(t => t.name === "数据检索") : [];
            let namelist = list ? list.nextlevel.filter(t => t.type === 1) : [];
            let nameKeylist = [];
            namelist.forEach(namelist => {
                this.changeList.forEach(changeList => {
                    if (namelist.name === changeList.name) {
                        if (namelist.nextlevel) {
                            namelist.nextlevel.forEach(Nnextlevel => {
                                changeList.nextlevel.forEach(Cnextlevel => {
                                    if (Nnextlevel.name === Cnextlevel.name) {
                                        nameKeylist.push(Cnextlevel.name)
                                        if ( Nnextlevel.button1 && Nnextlevel.button2) {
                                            Cnextlevel.button1 = Nnextlevel.button1;
                                            Cnextlevel.button2 = Nnextlevel.button2;
                                        }
                                    }
                                });
                            });
                        }
                        this.lowerMenuBarList.push({
                            name: namelist.name,
                            nextlevel: []
                        });
                    }
                });
            });
            for (let i in this.changeList) {
                for (let j in this.changeList[i].nextlevel) {
                    if (this.changeList[i].nextlevel[j]) {
                        for (let n in nameKeylist) {
                            if (nameKeylist[n] === this.changeList[i].nextlevel[j].name) {
                                this.lowerMenuBarList[i].nextlevel.push(this.changeList[i].nextlevel[j]);
                            }
                        }
                 }
                }
            }
            this.getEardiry("url");
        },
        // 走接口进行接口获取数据填充到页面表格pand和搜索Data传参
        getCreat() {
            let axiosList = [["intersection/?monitor=0","spottingNo"]];
            for (let k in axiosList)  {
                axios.get(axiosList[k][0]).then((res) => {
                    let data = res.data.data;
                    let intersection = []
                    for(let i in data) {
                        intersection.push({
                            name: data[i].intersectionName,
                            id: data[i].id
                        });
                    }
                    let lowerMenuBar =  this.lowerMenuBarList[1].nextlevel[0];
                    let list = [
                        ["searchNameList","Sendkey","data"],
                        ["tableListList","tableProp","pand"]
                    ];
                    for (let j in list) {
                        let ever = list[j];
                        for (let i in lowerMenuBar[ever[0]]) {
                            if (lowerMenuBar[ever[0]][i][ever[1]] === axiosList[k][1]) {
                                this.lowerMenuBarList[1].nextlevel[0][ever[0]][i][ever[2]] = intersection;
                            }
                        }
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });

            } 
        }
    },
    created() {
        this.getCreat();
    },
    mounted() {
        this.mountedFunction();
        this.getCreat();
    }
};
</script>
<style scoped>
</style>

<style>
    .dataRetrieval .scrollPart {
        max-height: 525px;
    }
    .lableDialog{   
        color: #2ca5c7;
        font-size: 14px;
        width: 185px;
        text-align: right;
        display: inline-block;
        margin-right: 5px;
        height: 30px;
        line-height: 30px;
    }
    .valueDialog{
        color: #2ca5c7;
        font-size: 14px;
        width: 345px;
        display: inline-block;
        border-radius: 5px;    
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        border: 1px solid #2ca5c7;
    }
    .partOfEveryDA>div {
        display: flex;
        padding-bottom: 15px;
    }
    .partOfEveryDA>div:nth-child(2n+1){
        margin: 0 50px 0 0;
    }
    .nameChange{     
        color: #54d5ff;
        margin: 0 30px 25px;
        padding: 0 0 5px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }
    .nameChangeActive{
        border-bottom: 1px solid;
    }
    .partOfEveryDA + .partOfEveryDA{
        border-top: 1px solid #54d5ff;
        padding-top: 10px;
    }
    .fileDomAll{        
        display: flex;
        margin-right: 10px;
    }
    .fileDomName{
        display: inline-block;
        font-size:14px;
        line-height: 39px;
    }
    .fileDomBox{ 
        display: inline-block;
        width: 175px;
        height: 32px;
        overflow: hidden;
        border: 1px solid #53d4f9;
        border-radius: 5px;
        line-height: 38px;
        font-size: 12px;
    }
    .fileDom {
        position: relative;
        left: -76px;
        height: 100%;
        top: -3px;
        background: #030729;
    }
</style>

