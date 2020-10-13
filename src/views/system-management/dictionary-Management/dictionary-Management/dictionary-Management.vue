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
                <span class="equipmentChangeName" :class="{equipmentChangeNameActive: index === isActive}" @click="changEquipment(item),isActive = index" v-for="(item, index) in lowerMenuBarList[upIsIndex].nextlevel" :key="item.index">{{item.name}}</span>
            </div>
            <!-- 搜索栏 左边搜索 -->
            <SearchPage slot="searchBoxBar" class="search flexNum" ref="searchPage"
                :searchName="searchName"
                @searchEvent="handlerSearchEvent"
                :typeIndex="typeIndex" :reSet="reSet" @resetover="reSetOver" ></SearchPage>
            <!-- 搜索栏 右边操作按钮 -->
            <div slot="searchBoxBar" class="operation">
                <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
            </div>
            <!--表格栏  -->
            <tableCommon slot="table" ref="tableCommon" :buttonList="buttonList2" :reFresh="reFresh" @selectArySlected="selectArySlected" :table-list="tableList"  @update:table-list="val => tableList=val" @tablePageNum="tablePageNum"></tableCommon>
        </api>
        <el-dialog
        :title="title + lowerMenuBarList[upIsIndex].nextlevel[isActive].name"
        :visible.sync="Dialog" v-dialogDrag  class="tems_dialog"
        :before-close="handleClose"
        :close-on-press-escape="false" 
        :class="(isActive === 3 && upIsIndex === 0) ? 'largreDiction' : 'littleDiction'"
        :width="this.changeList[upIsIndex].nextlevel[isActive].width" >
            <div class="scrollPart" id="scrollDPart">
                <el-form  :disabled="(title === '查看' ? true : false)" :class="{isDisable: title === '查看'}" :model="formValidate" :rules="ruleValidate" ref="formValidateEmpty" label-width="100px" class="demo-ruleForm">
                    <div :style="{'width': (item.province || item.ParentClass ? '100%' : 'auto'), 'display': 'flex'}" v-for="(item, index) in lowerMenuBarList[upIsIndex].nextlevel[isActive].list"
                        :key="index">
                        <el-form-item  v-if="!item.option && !item.province && !item.Inputbox" :class="item.class ? item.class: ''" :label="item.name+':'" :prop="item.key">
                            <el-input v-if="!item.length && item.name === '经纬度'" class="tems_Input" v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')">
                              <!-- <el-button slot="append" class="choseLocationbtn" icon="el-icon-location-outline"
                                    @click="choseLocation(
                                        formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key],
                                        lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key)">
                                </el-button> -->
                            </el-input>
                            <i v-if="!item.length && item.name === '经纬度'" class="el-icon-location-outline" style="position: absolute;right: -17px;top: 12px;"
                                @click="choseLocation(formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key],
                                    lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key)">
                            </i>
                            <el-input v-else-if="!item.length && item.name !== '经纬度'" class="tems_Input" v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')"/>
                            <el-input v-else :maxlength="item.length" class="tems_Input" v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')"/>
                        </el-form-item>
                        <el-form-item  v-if="item.option" :class="item.class ? item.class: ''" :label="item.name+':'" :prop="item.key">
                            <el-select :disabled="(title === item.title ? true : false)" class="tems_Input" v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]" filterable clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请选择...')">
                                <el-option v-for="(items, index) in item.option" :key="index" :label="items.label" :value="items.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="item.Inputbox" :class="item.class ? item.class: ''" :label="item.name+':'" :prop="item.key">
                            <el-autocomplete class="ass_Input"
                                @keyup.native="keyup(item.DariyListData)"                                            
                                            size="small" clearable 
                                            :trigger-on-focus="true" @select="handleSelect"
                                            v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]"
                                            :fetch-suggestions="querySearchAsyncdurableAry">
                            </el-autocomplete>
                        </el-form-item>
                        <el-form-item v-if="item.province" :class="item.class ? item.class: ''" :label="item.name+':'" :prop="item.key">
                            <el-cascader 
                                expand-trigger="hover"
                                :options="options"
                                v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].province]"
                                @change="handleChange" filterable clearable size="small">
                            </el-cascader>
                        </el-form-item>
                        <el-input :maxlength="item.length" style="flex:1; margin-top: 5px;"  v-if="item.province && formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].province] !== ''" v-model="formValidate[lowerMenuBarList[upIsIndex].nextlevel[isActive].list[index].key]" placeholder="请填写详细地址"  filterable clearable size="small" ></el-input>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum footer">
                    <div v-if="title === '查看'" class="tems_Button qiliang inportBtn" @click="Dialog = false">关 闭</div>
                    <div v-if="title !== '查看'" class="tems_Button inportBtn inportBtn" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '查看'" class="tems_Button exportBtn exportBtn" @click="handleSubmit(formValidate)">保 存</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="选取经纬度坐标" :close-on-press-escape="true" :visible.sync="showmap" v-dialogDrag :close-on-click-modal="false" @close="resetFormMap()" width="1400px" class="tems_dialog showmap_dialog">
            <div class="showmapBox GIS_page">
                <div style="width: 100%;margin-bottom: 12px;">
                    <div class="srarchqy">
                        <span>搜索：</span>
                        <!-- :disabled="title === '查看' ? true : false" -->
                        <el-select style="d_srarchqy" filterable remote placeholder="请输搜索" v-model="choseSome" :remote-method="requestMap" :loading="loading">
                            <el-option v-for="item in allMap" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="tems_gis" id="tems_gis" style="width: 100%;height: 100%"></div>
            </div>
            <div class="showCoordinateBox">
                获取经纬度坐标为：{{CoordinatePoint || "无"}}
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div class="tems_Button tems_errorButton inportBtn dic_closed" v-if="title === '编辑' || title === '创建'"  @click="resetFormMap">取 消</div>
                    <div class="tems_Button exportBtn dic_closed" v-if=" title === '编辑' || title === '创建'" @click="handleSubmitMap">保 存</div>
                    <div class="tems_Button qiliang inportBtn" v-if="title === '查看'" @click="resetFormMap">关 闭</div>
                    <!-- <bt ref="bt" :buttonList="ButtonArrs" @operation="operation"></bt> -->
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ol from "openlayers";
import { Loading } from 'element-ui';
import "openlayers/css/ol.css";
// 引入坐标转换
import coordtransform from "coordtransform";
import GisClassMethod from "@/public/GisClassMethod";

export default {
    name: "dictionary-Management",
    data() {
        return {
            // 省市区列表
            options: [],
            title: "创建",
            // 行Id
            RowId: "",
            // 验证
            ruleValidate: {
                // monitor: this.$CommonRule.SelectRule,
                contactPhone: this.$CommonRule.phoneSimplePhone,
                value: this.$CommonRule.NotEmpty,
                value1: this.$CommonRule.HzOrNum,
                roadOneId: this.$CommonRule.SelectRule,
                roadOneName: this.$CommonRule.SelectRule,
                number: this.$CommonRule.numberChineseEnglish,
                name: this.$CommonRule.NotEmpty,
                equipmentType: this.$CommonRule.SelectRule,
                companyName: this.$CommonRule.NotEmpty,
                phone: this.$CommonRule.phoneSimplePhone
                // ,
                // longitude_latitude: this.$CommonRule.LongitudeRule_LatitudeRule
            },
            // 数据
            formValidateEmpty: {},
            formValidate: {},
            // 弹窗
            Dialog: false,
            // 表格按钮
            buttonList2: [
                {
                    group: true,
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    title: "0"
                },
                {
                    plain: true,
                    size: "mini",
                    type: "primary",
                    loading: false,
                    title: "0"
                }
            ],
            falseReturn:false,
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
                thisPageSize: 10,
                getDataUrl: "",
                params: "",
                selection: false, // 是否有选中框
                scope: "0", // 是否有操作栏
                index: "0", // 是否有序号
                // 表格表头名称和要加载的prop
                // hover(是否显示表格鼠标划入有无弹窗)；
                // time(是否是时间格式转换，自动装换，时间格式转为时间戳，时间戳格式转为时间格式)；
                // keyChange（指是否有需要根据一个参数装换为其他等，比如状态status = 0 为"正常"status = 1 为"异常"）
                // keyChange里的name（指是否是否本身的字段转换,比如 设备状态字段对应为eqstatus 想根据status的状态转换是否正常的汉字形式）
                // keyChange里的keyName keyValue（指是根据keyName字段寻找keyValue）
                // keyChange里的pand（转换的列表）
                list: [
                    { tableName: "方向", tableProp: "value", hover: "flge" },
                    { tableName: "方向状态", tableProp: "status",width:120 }
                ]
            },
            // 左侧下级导航菜单列表
            lowerMenuBarList: [
                { nextlevel: [{ name: "方向", tableListList: [], searchNameList: [] }], name: "通用字典" }
            ],
            changeList: [
                {
                    name: "通用字典",
                    // 切换窗分好类的设备列表
                    nextlevel: [
                        {
                            name: "方向",
                            id: "10001",
                            url: "code/",
                            element: "?type=",
                            width:"420px",
                            tableListList: [
                                { tableName: "方向", tableProp: "value", hover: "flge" },
                                { tableName: "方向状态",width:200,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "角色名称", id: "name", type: 6, url: "/code/?type=10001", Sendkey: "name",getDataKey:"name", data: tree },
                                { searchPlaceholder: "方向", type: 6, id: "value", Sendkey: "value", url: "/code/?type=10001", getDataKey:"value"}
                            ],
                            list:[
                                { name: "方向", key: "value", length:"10" },
                            ]
                        },
                        {
                            name: "天气",
                            id: "10002",
                            url: "code/",
                            element: "?type=",
                            width:"420px",
                            tableListList: [
                                { tableName: "天气", tableProp: "value", hover: "flge" },
                                { tableName: "天气状态",width:200,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "天气", type: 0, Sendkey: "value" }
                                { searchPlaceholder: "天气", type: 6, id: "value", Sendkey: "value", url: "/code/?type=10002", getDataKey:"value"}
                            ],
                            list:[
                                { name: "天气", key: "value", length:"10" },
                            ]
                        },
                        {
                            name: "公交线路编号",
                            id: "10003",
                            url: "code/",
                            element: "?type=",
                            width:"420px",
                            tableListList: [
                                { tableName: "线路编号", tableProp: "value", hover: "flge" },
                                { tableName: "线路状态",width:200,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                { searchPlaceholder: "线路编号", type: 6, id: "value", Sendkey: "value", url: "/code/?type=10003", getDataKey:"value"}
                            ],                            
                            list:[
                                { name: "线路号", key: "value1", length:"10" },
                            ]
                        },
                        {
                            name: "点位",
                            url: "intersection/",
                            width: "823px",
                            tableListList: [
                                // { tableName: "点位类型", tableProp: "monitor",width:80,
                                // keyChange: { keyName: "value", keyValue: "label" },
                                // pand: [
                                //         { label: "虚拟点位", value: 1 },
                                //         { label: "设备点位", value: 0 }
                                //     ]  },
                                { tableName: "点位编号", tableProp: "number" },
                                { tableName: "点位名称", tableProp: "intersectionName", hover: "flge",width:400 },
                                { tableName: "点位级别", tableProp: "grade",replace:"级",width:80 },
                                { tableName: "区域", tableProp: "districtId" },
                                { tableName: "点位状态",width:80,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            list: [
                                // { name: "点位类型", key: "monitor",
                                //     option: [
                                //         { label: "虚拟点位", value: 1 },
                                //         { label: "设备点位", value: 0 }
                                //     ],
                                //     title:"编辑"
                                //  },
                                { name: "点位编号", key: "number" },
								{ name: "道路一", key: "roadOneId" },
								{ name: "道路二", key: "roadTwoId" },
                                // { name: "道路一",
                                //     key: "roadOneId",                                    
                                //     Inputbox: true,
                                //     DariyListData: [
                                //         ["tj_towns2", "NAME","ID","TYPE"],
                                //         ["tj_nine", "NAME","ID","TYPE"],
                                //         ["tj_county", "NAME","ID","TYPE"],
                                //         ["tj_province", "NAME","ID","TYPE"]
                                //     ]
                                //     },
                                // { name: "道路二",
                                //     key: "roadTwoId",
                                //     Inputbox: true,
                                //     DariyListData: [
                                //         ["tj_towns2", "NAME","ID"],                                    
                                //         ["tj_nine", "NAME","ID","TYPE"],
                                //         ["tj_county", "NAME","ID","TYPE"],
                                //         ["tj_province", "NAME","ID","TYPE"]
                                //     ] },
                                { name: "点位描述", key: "rests", length:50 },
                                { name: "经纬度", key: "longitude_latitude", placeholder: "经度-纬度", ParentClass: true, class: "el_class"},
                                { name: "点位类型",
                                    key: "type",
                                    option: [
                                        { label: "十字型", value: "十字型" },
                                        { label: "T型", value: "T型" },
                                        { label: "Y型", value: "Y型" },
                                        { label: "多岔型", value: "多岔型" },
                                        { label: "环岛", value: "环岛" },
                                        { label: "畸形口", value: "畸形口" },
                                        { label: "路侧", value: "路侧" },
                                        { label: "中央", value: "中央" }
                                    ] },
                                { name: "点位级别",
                                    key: "grade",
                                    option: [
                                        { lable: "1级", value: "1" },
                                        { lable: "2级", value: "2" },
                                        { lable: "3级", value: "3" }
                                    ] },
                                { name: "区域",
                                    key: "districtId",
                                    // Inputbox: true,
                                    //DariyListData: [["tj_bound2", "Name", "Name"]]
                                    option: [
                                        { label: "梁徐街道", value: "梁徐街道" },
                                        { label: "罗塘街道", value: "罗塘街道" },
                                        { label: "三水街道", value: "三水街道" },
                                        { label: "天目山街道", value: "天目山街道" },
                                        { label: "蒋垛镇", value: "蒋垛镇" },
                                        { label: "娄庄镇", value: "娄庄镇" },
                                        { label: "白米镇", value: "白米镇" },
										{ label: "俞垛镇", value: "俞垛镇" },
										{ label: "大土仑镇", value: "大土仑镇" },
										{ label: "顾高镇", value: "顾高镇" },
										{ label: "张甸镇", value: "张甸镇" },
										{ label: "沈高镇", value: "沈高镇" },
										{ label: "溱潼镇", value: "溱潼镇" },
                                        { label: "淤溪镇", value: "淤溪镇" }
                                    ] 
                                    },
                                { name: "备注", key: "power", length: "50" }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "点位编号", id: 0, url: "", type: 0, Sendkey: "number" },
                                // { searchPlaceholder: "点位类型", type: 1, Sendkey: "monitor",data:[{id:1,name:"虚拟点位"},{id:0,name:"设备点位"}] },
                                { searchPlaceholder: "点位编号", type: 6, id: "number", Sendkey: "number", url: "/intersection/?monitor=0", getDataKey:"number"},
                                // { searchPlaceholder: "点位名称", id: 0, url: "", type: 0, Sendkey: "intersectionName" },
                                { searchPlaceholder: "点位名称", type: 6, id: "intersectionName", Sendkey: "intersectionName", url: "/intersection/?monitor=0", getDataKey:"intersectionName"},
                                { searchPlaceholder: "点位级别", id: 0, url: "", type: 1, data: [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 3, name: 3 }], Sendkey: "grade" },
                                { searchPlaceholder: "区域",
                                    data: [
                                        { label: "梁徐街道", value: "梁徐街道" },
                                        { label: "罗塘街道", value: "罗塘街道" },
                                        { label: "三水街道", value: "三水街道" },
                                        { label: "天目山街道", value: "天目山街道" },
                                        { label: "蒋垛镇", value: "蒋垛镇" },
                                        { label: "娄庄镇", value: "娄庄镇" },
                                        { label: "白米镇", value: "白米镇" },
                                        { label: "俞垛镇", value: "俞垛镇" },
                                        { label: "大土仑镇", value: "大土仑镇" },
                                        { label: "顾高镇", value: "顾高镇" },
                                        { label: "张甸镇", value: "张甸镇" },
                                        { label: "沈高镇", value: "沈高镇" },
                                        { label: "溱潼镇", value: "溱潼镇" },
                                        { label: "淤溪镇", value: "淤溪镇" }
										],
                                    type: 1,
                                    Sendkey: "districtId" },
                                { searchPlaceholder: "点位状态", id: 0, url: "", data: [{ id: 1, name: "启用" }, { id: 0, name: "停用" }], type: 1, Sendkey: "status" }
                            ]
                        }
                    ]
                },
                {
                    name: "资产字典",
                    nextlevel: [
                        {
                            name: "设备组件类型",
                            url: "/subassemblyType/",
                            width:"420px",
                            tableListList: [
                                { tableName: "组件类型", tableProp: "name", hover: "flge" },
                                { tableName: "设备类型", tableProp: "equipmentTypeName",width:200 },
                                { tableName: "组件类型状态",width:200,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "组件类型", type: 0, Sendkey: "name" },
                                { searchPlaceholder: "组件类型", type: 6, id: "name", Sendkey: "name", url: "/subassemblyType/", getDataKey:"name"},
                                { searchPlaceholder: "设备类型", id: "", type: 1, url: "", Sendkey: "equipmentType", data: [] },
                                { searchPlaceholder: "组件类型状态", id: "", type: 1, url: "", data: [{ id: 1, name: "启用" }, { id: 0, name: "停用" }], type: 1, Sendkey: "status" }
                            ],
                            list: [
                                { name: "组件类型", key: "name", length:"30" },
                                { name: "设备类型",
                                    key: "equipmentType",
                                    option: [] }

                            ]
                        },
                        {
                            name: "设备供应商",
                            url: "supplier/",
                            width:"800px",
                            tableListList: [
                                { tableName: "供应商名称", tableProp: "companyName", hover: "flge" },
                                // { tableName: "地址", tableProp: "address" },
                                { tableName: "负责人", tableProp: "contacts" },
                                { tableName: "联系电话", tableProp: "contactPhone",width:400 },
                                { tableName: "供应商状态",width:200,
                                    tableProp: "status",
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "供应商名称", type: 0, Sendkey: "companyName" },
                                { searchPlaceholder: "供应商名称", type: 6, id: "companyName", Sendkey: "companyName", url: "/supplier/", getDataKey:"companyName"},
                                { searchPlaceholder: "供应商状态", type: 1, data: [{ id: 1, name: "启用" }, { id: 0, name: "停用" }], type: 1, Sendkey: "status" }
                            ],
                            list: [
                                { name: "供应商名称", key: "companyName", length: "20" },
                                { name: "负责人", key: "contacts", length: "5" },
                                { name: "联系电话", key: "contactPhone", class: "noneTipe", length: "12" },
                                { name: "地址", key: "address", length: "20", province: "provinceList" }

                            ]
                        },
                        {
                            name: "品牌",
                            id: "10005",
                            url: "code/",
                            element: "?type=",
                            width:"420px",
                            tableListList: [
                                { tableName: "品牌", tableProp: "value", hover: "flge" },
                                { tableName: "品牌状态",
                                    tableProp: "status",width:200,
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "品牌", type: 0, Sendkey: "value" }
                                { searchPlaceholder: "品牌", type: 6, id: "value", Sendkey: "value", url: "/code/?type=10005", getDataKey:"value"},
                            ],
                            list: [
                                { name: "品牌", key: "value", length:"10" }
                            ]
                        },
                        {
                            name: "建设单位",
                            url: "constructionUnit/",
                            width:"800px",
                            tableListList: [
                                { tableName: "建设单位名称", tableProp: "name", hover: "flge" },
                                { tableName: "负责人", tableProp: "legalPerson" },
                                { tableName: "联系电话", tableProp: "phone",width:400 },
                                { tableName: "建设单位状态",
                                    tableProp: "status",width:200,
                                    keyChange: { keyName: "name", keyValue: "value" },
                                    pand: this.$store.state.statusList2 }
                            ],
                            searchNameList: [
                                // { searchPlaceholder: "建设单位名称", type: 0, Sendkey: "name" },
                                { searchPlaceholder: "建设单位名称", type: 6, id: "name", Sendkey: "name", url: "/constructionUnit/", getDataKey:"name"},
                                { searchPlaceholder: "建设单位状态", data: [{ id: 1, name: "启用" }, { id: 0, name: "停用" }], type: 1, Sendkey: "status" }
                            ],
                            list: [
                                { name: "建设单位名称", key: "name", length: "20" },
                                { name: "负责人", key: "legalPerson", length: "5" },
                                { name: "联系电话", key: "phone", length: "12", class: "noneTipe" },
                                { name: "地址", key: "detailAddress", length: "20", province: "provinceList" }
                            ]
                        }
                    ]
                },
                {
                    name: "运维字典",
                    url: ""
                },
                { name: "情指勤督字典" },
                { name: "交通流管控字典" },
                { name: "研判与决策字典" }
            ],
            DariyListData:[],
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
            // 地图底层图层
            bottomMapLayer: "",
            // 根据坐标描点层
            coordinateTracingPoint: "",
            // 显示地图弹窗，选择经纬度
            CoordinatePoint: "",
            PointKeys: "",
            // mapCenter: [117.384925, 38.998398],
			mapCenter: [120.125347,32.540074],
            showmap: false,
            MapDataList: [],
            // 搜索地图接口返回的数据
            allMap: [],
            poiMap: [],
            // 地图基础功能选择的东西
            choseSome: "",
            // 地图绘制区域层
            regionalLayer: "",
            loading: false,
            dataValue:[]
        };
    },
    methods: {
        // 关闭弹窗回调
        handleClose(done) {
            if (this.title !== "查看") {
                this.$confirm("确定要取消吗？", "提示", { type: "warning" }).then(() => {
                    done();
                    this.handleClosedDo();
                }).catch(() => {});
            } else {
                done();
                this.handleClosedDo();
            }
        },
        // 关闭回调后清理
        handleClosedDo() {
            this.$refs["formValidateEmpty"].resetFields();
            this.formValidate = {};
        },
        // 页面条数变更
        tablePageNum(item) {
            this.tableList.thisPageSize = item;
        },
        // 选取的省市区
        handleChange(value) {
            this.formValidate.province = value[0];
            this.formValidate.city = value[1];
            this.formValidate.district = value[2];
        },
        // 省市区列表
        getProveList() {
            function provinceGet(data) {
                let tableDataU = [];
                for (let key in Object.keys(data)) {
                    let value = Object.keys(data)[key];
                    let label = data[value].name ? data[value].name : data[value];
                    tableDataU.push({ "value": label, "label": label });
                    let children = data[value].child;
                    if (children) {
                        tableDataU[key].children = provinceGet(children);
                    }
                }
                return tableDataU;
            }
            this.options = provinceGet(this.GLOBAL.province);
        },
        // 重置表单
        resetForm(formName, juge) {
            if (this.title === "查看" && juge) {
                this.closeDialogData(formName, "关闭");
            } else {
                this.closeDialogData(formName, "取消");
            }
        },
        //  选择成功
        handleSelect(item) {
            if (item.roadGrade && this.formValidate.roadOneId) {
                this.formValidate.roadGrade = item.roadGrade;
            }
        },
        keyup(item) {
            this.DariyListData = item;
        },              
        // 输入或选择
        async querySearchAsyncdurableAry(queryString, cb) {
            this.falseReturn = false;
            this.MapDataList = [];
            if (queryString !== undefined && queryString !== "" && queryString !== null) {
                for (let i in this.DariyListData) {
                    // this.mapLoading = Loading.service({
                    //     lock: true,
                    //     background: "rgba(10, 40, 100, 0)"
                    // });
                    let key = this.DariyListData[i][0];
                    let name = this.DariyListData[i][1];
                    let id = this.DariyListData[i][2];
                    let roadGrade = this.DariyListData[i][3];
                    let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><Or><PropertyIsLike wildCard=\"*\" singleChar=\".\" escapeChar=\"!\"><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" + name + "</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
                    // let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><And><PropertyIsEqualTo><PropertyName>NAME</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></And></Filter></Query></GetFeature>";
                    geoAxios.get(testUrl).then((res) => {
                        for (let i in res.data.features) {
                            this.MapDataList.push ({
                                value: res.data.features[i].properties[name],
                                roadGrade:res.data.features[i].properties[roadGrade]
                            });
                        }
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(() => { 
                            let MapDataList = this.arrUnique(this.MapDataList, "value");  
                            if (MapDataList.length === 0) {
                                this.$showSimpleMessage("未查询到数据，请重新输入", "error");
                                this.falseReturn = false;
                                return;
                            } else {
                                this.falseReturn = true;
                                cb(MapDataList);
                            }
                            this.mapLoading.close();
                            this.mapLoading = "";
                        }, 1000 * 2);
                    }).catch(error => {
                        // this.$showSimpleMessage(error, "error");
                        // this.mapLoading.close();
                        // this.mapLoading = "";
                    });
                }
            }     
        },
        arrUnique(arr, label) {
            // let newArr = Array.from(new Set(arr));
            let newArr = [];
            if (label) {
                let a = new Set();
                let labelData = [];
                arr.forEach(i => {
                    labelData.push(i[label]);
                });
                let size = 0;
                arr.forEach((i, key) => {
                    a.add(labelData[key]);
                    if (a.size > size) {
                        newArr.push(i);
                        size++;
                    }
                });
            } else {
                newArr = Array.from(new Set(arr));
            }
            return newArr;
        },
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                this.formValidate = {};
                this.$refs[formName].resetFields();
                this.Dialog = false;
            }, null, "warning");
        },
        // 保存按钮数据
        handleSubmit(data) {   
            if (data.value1 && data.value) {
                delete data.value;
            }
            if (data.value1) {
                let juge = /^[\u4e00-\u9fa5\0-9]+$/;
                if (!juge.test(data.value1)) {
                    this.$showSimpleMessage(("请输入汉字+正数字"), "error");
                    return;
                }
            }
            this.$refs["formValidateEmpty"].validate((valid) => {
                if (valid) {
                    if ((this.upIsIndex === 0 && this.isActive < 3) || (this.upIsIndex === 1 && this.isActive === 2)) {
                        data.type = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].id;
                        data.parentId = 0;
                        data.codeKey = "wu";
                        if (data.value1) {
                            data.value = data.value1;
                            delete data.value1;
                        }
                    } else {
                        // if (data.roadTwoId && data.roadOneId) {
                        //     let roadTwoId = this.MapDataList.find(t=>t.value === data.roadTwoId).id;
                        //     let roadOneId = this.MapDataList.find(t=>t.value === data.roadOneId).id;
                        //     if (roadOneId === roadTwoId) {
                        //         this.$showSimpleMessage("道路一不能跟道路二重复", "error");
                        //         return false;
                        //     }
                        // }
                        if (data.roadTwoId && data.roadOneId) {
                            if (data.roadTwoId === data.roadOneId) {
                                this.$showSimpleMessage("道路一不能跟道路二重复", "error");
                                return false;
                            }
                        }
                    }
      //               if (!this.falseReturn && (data.roadTwoId || data.roadOneId || data.districtId)) {
						// debugger
      //                   if (data.roadTwoId !== "") {
      //                       if (this.dataValue[0][1]===data.roadTwoId) {
      //                       } else {
      //                           this.$showSimpleMessage("名称不存在，请重新输入选取地图名称", "error");
      //                           return false;
      //                       }
      //                   }
      //                   if (data.districtId !== "") {
      //                       if (this.dataValue[0][2] === data.districtId) {
      //                       } else {
      //                           this.$showSimpleMessage("名称不存在，请重新输入选取地图名称", "error");
      //                           return false;
      //                       }
      //                   }
      //               }
                    let juge = this.RowId !== "";
                    let url = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].url;
                    // if (data.provinceList !== "" && data.provinceList) {
                    //     if (url === "supplier/") {
                    //         if (data.address === undefined || data.address === "" || data.address === null) {
                    //             this.$showSimpleMessage("请填写详细地址", "error");
                    //             return;
                    //         }
                    //         data.provinceList.push(data.address);
                    //         data.address = data.provinceList.toString();
                    //     } else {
                    //         if (data.detailAddress === undefined || data.detailAddress === "" || data.detailAddress === null) {
                    //             this.$showSimpleMessage("请填写详细地址", "error");
                    //             return;
                    //         }
                    //     }
                    //     delete data.provinceList;
                    // }
                    if (this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].name==="点位") {
                        const ipRegularExpression = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,100})?)|180(([.][0]{1,100})?))$/;
                        const ip2 = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,100})?)|90(([.][0]{1,100})?))$/;
                        if (data.longitude_latitude === undefined || data.longitude_latitude === null || data.longitude_latitude.toString() === undefined || data.longitude_latitude.toString() === null) {
                           this.$showSimpleMessage(("经度-纬度不能为空"),"error");
                           return;
                        }
                        const reg = RegExp("-");
                        if (!reg.test(data.longitude_latitude)) {
                            this.$showSimpleMessage(("经度-纬度连接符用-"),"error");
                                return;
                        } else {
                            if (!ipRegularExpression.test((data.longitude_latitude.split("-"))[0])) {
                                this.$showSimpleMessage(("经度：-180~180"),"error");
                                return;
                            }
                            if (!ip2.test((data.longitude_latitude.split("-"))[1])) {
                                this.$showSimpleMessage(("纬度：-90~90"),"error");
                                return;
                            }
                        }
                    }
                    if (data.longitude_latitude !== undefined) {
                        if (data.longitude_latitude !=="") {
                            let longitude_latitude = data.longitude_latitude.split("-");
                            data.longitude = longitude_latitude[0];
                            data.latitude = longitude_latitude[1];
                        } else {
                            this.$showSimpleMessage("请选择经纬度", "error");
                            return;
                        }
                    }
                    let name = (juge ? "编辑" : "创建");
                    url = url + (juge ? this.RowId : "");
                    this.$layerNotice("提示", "您确定要" + name + "吗？", () => {
                        if (data.longitude_latitude !== undefined) {
                            delete data.longitude_latitude;
                            data.monitor = "0";
                        }
                        
                        if (!juge) {
                            if(data.address){
                                data.address = data.province + "," + data.city + "," + data.district + "," + data.address
                            }
                            // 创建
                            axios.post(url, data).then((res) => {
                                successEvent(res.data.code);
                            }).catch(error => {
                                this.$showSimpleMessage(error, "error");
                            });
                        } else {
                            // 编辑
                            axios.put(url, data).then((res) => {
                                successEvent(res.data.code);
                            }).catch(error => {
                                this.$showSimpleMessage(error, "error");
                            });
                        }
                    }, null, "warning");
                } else {
                    this.$showSimpleMessage("内容验证失败", "error");
                    return false;
                }
                let _this = this;
                function successEvent(code) {
                    if (code === 0) {
                        _this.Dialog = false;
                        _this.reFresh = !_this.reFresh;
                        _this.$showSimpleMessage("保存成功", "success");
                    } else {
                        let mess = _this.$store.state.codeStatus.find(t => t.code === code).name;
                        _this.$showSimpleMessage(mess, "error");
                    }
                }
            });
        },
        // 打开创建或编辑
        operation(data) {
            let args = this.buttonList[data.index].functionKeyName.split(":");
            let fn = eval(`this.${args.shift()}`);
            fn.apply(this, args);
        },
        // 路径规划按钮
        updateRoad(){     
            // axios.get("intersection/generate/bestRoutes").then((res) => {
            RoadAxios.get("/route/findRealAll",
                {params:
                { ak:"Cm2377ZHHipLHeVi1b1Hk7nCsYcgjaxG",
                  password:"59069026",
                  size:"5000" }
            }).then((res) => {
                switch (res.data.code) {
                    case 0:
                        this.$showSimpleMessage("路径开始规划", "success");
                        break
                    case 29:
                        this.$showSimpleMessage("路径规划中", "success");
                    break
                    default:
                        this.$showSimpleMessage("规划失败", "error");
                }
            }).catch(this.defaultHttpHandler);
        },
        // 打开创建
        operationDariy() {
            this.RowId = "";
            this.Dialog = true;
            this.reFresh = !this.reFresh;
            this.formValidate = {};
            this.title = "创建";
            this.dataValue = [];
        },
        // 打开弹窗
        openDialog(id) {
            this.operationDariy();
            this.RowId = id;
            let url = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].url;
            axios.get(url + this.RowId).then((res) => {
                if (res.data.code === 0) {
                    let resData = res.data.data;
                    this.formValidate = resData; 
                    if (resData.address) {
                        resData.address = resData.address.split(",");
                        if (resData.address) { 
                            this.formValidate.provinceList = [resData.address[0], resData.address[1], resData.address[2]];
                        } else {
                            this.formValidate.provinceList = [resData.province, resData.city, resData.district];
                        }
                        this.formValidate.address = resData.address[3];
                    }
                    if (resData.province) {
                        this.formValidate.provinceList = [resData.province, resData.city, resData.district];
                    }
                    let data = {
                        value: resData.value,
                        parentId: resData.parentId,
                        codeKey: resData.codeKey
                    };
                    this.dataValue =  [[resData.roadOneId , resData.roadTwoId, resData.districtId]];
                    if (resData.longitude) {
                        this.formValidate.longitude_latitude = resData.longitude+"-"+ resData.latitude;
                        this.dataValue.push(this.formValidate.longitude_latitude)
                    }
                    this.formValidate = data.value ? data : resData;
                    if (this.upIsIndex === 0 && this.changeList[0].nextlevel[this.isActive].name === "公交线路编号") {
                        this.formValidate.value1 = this.formValidate.value;
                        delete this.formValidate.value;
                    }
                } else {
                    this.$showSimpleMessage(this.$store.state.codeStatus.find(t => t.code === res.data.code).name, "error");
                }
            }).catch(this.defaultHttpHandler);
        },
        // 下级菜单切换
        urlHref(index) {
            if (index !== this.upIsIndex) {
                this.upIsIndex = index;
                this.isActive = 0;
            }
            let item = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive];
            this.changEquipment(item);
        },
        changEquipment(item) {
            // this.$nextTick(()=>{
                let url = item.url + (item.element ? item.element : "") + (item.id ? item.id : "");
                this.searchName = item.searchNameList;
                this.$set(this.tableList, "list", item.tableListList);
                this.$set(this.tableList, "getDataUrl", url);
                this.buttonList = this.getButton(item, "button1");
                this.buttonList2 = this.getButton(item, "button2");
                this.paramsChange(item);
            // })
        },
        // 按钮权限
        getButton(item, buttonName) {
            let button = item[buttonName];
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
                if (listName[i].title === "停用") {
                    listName[i].chang = {   
                        changSutusAll:[
                            ["停用", "erBtn", "status", "1","statusList2"],
                            ["启用", "suBtn", "status", "0","statusList2"],
                            ["", "buttonKong2", "status", "3","statusList2"]
                        ]                        
                    }
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
                if (listName[i].title === "路径规划") {
                    listName[i].functionKeyName = "updateRoad";
                }
            }
            return listName;
        },
        reSetOver() {
            this.reSet = false;
        },
        // 搜索有关
        paramsChange(item) {
            this.typeIndex = item;
            let params = this.$filter.SearchEvent(this.searchName, this.pageNum, 10);
            params.monitor=0
            this.tableList.params = params;
            this.reSet = true;
        },
        // 表格操作变化
        selectArySlected(item) {
            if (item.id) {
                switch (item.title) {
                    case "编辑":
                        if (item.id.status === "启用" || item.id.status === 1) {
                            this.$showSimpleMessage("启用状态不可编辑", "error");
                        } else {
                            this.openDialog(item.id.id);
                            this.title = "编辑";
                        }
                        break;
                    case "查看":
                        this.openDialog(item.id.id);
                        this.title = "查看";
                        break;
                    case "启用":
                        this.stopItAll(item.id);
                        break;
                    case "停用":
                        this.stopItAll(item.id);
                        break;
                    case "删除":
                        /* this.$layerNotice("提示", "您确定要删除吗？", () => {
                            if (item.id.status === "启用" || item.id.status === 1) {
                                this.$showSimpleMessage("启用状态不可删除", "error");
                            } else {
                                this.deleteAll(item.id);
                            }
                        }, null, "warning"); */
                        if (item.id.status === "启用" || item.id.status === 1) {
                            this.$showSimpleMessage("启用状态不可删除", "error");
                        } else {
                            this.deleteAll(item.id);
                        }
                        break;
                }
            } else {
                this.selectAry = item;
            }
        },
        // 获取id集合
        pLGetArry() {
            let idAry = [];
            this.selectAry.forEach((value) => {
                idAry.push(value.id);
            });
            return idAry;
        },
        // 删除
        deleteAll(status) {
            let juge = status.id;
            let mess = juge ? "" : "批量";
            let _this = this;
            let id = juge || this.pLGetArry();
            let url = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].url;
            if (id.length === 0) {
                this.$showSimpleMessage("没有发现选中项", "error");
            } else {
                this.$layerNotice("提示", "您确定要" + mess + "删除吗？", () => {
                    switch (url) {
                        case "code/":
                            axios.delete(url + "batch", { params: { ids: id.toString() } }).then((res) => {
                                axiosDelete(res.data.code);
                            }).catch(this.defaultHttpHandler);
                            break;
                        case "constructionUnit/":
                            axios.delete(url + id).then((res) => {
                                axiosDelete(res.data.code);
                            }).catch(this.defaultHttpHandler);
                            break;
                        default:
                            axios.put(url + "delete", { id: id.toString() }).then((res) => {
                                axiosDelete(res.data.code);
                            }).catch(this.defaultHttpHandler);
                    }
                }, null, "warning");
            }
            function axiosDelete(status) {
                if (status === 0) {
                    _this.$showSimpleMessage(mess + "删除成功", "success");
                    _this.reFresh = !_this.reFresh;
                } else {
                    let mess = _this.$store.state.codeStatus.find(t => t.code === status).name;
                    _this.$showSimpleMessage(mess, "error");
                }
            }
        },
        pLGetArrystar(item, status) {
            let idAry = [];
            let juge1 = ["正常", "启用", "1", 1, "已完成"];
            let juge2 = ["异常", "停用", "0", 0, "已完成"];
            let juge = (juge1.filter(t => t === status).length === 0 ? juge1 : juge2);
            let idList = this.selectAry;
            for (let j = 0; j < idList.length; j++) {
                let pdList = [];
                for (let i = 0; i < item.length; i++) {
                    let pd = juge.filter(t => t === idList[j][item[i]]);
                    if (pd.length > 0) {
                        pdList.push(pd);
                        if (pdList.length === item.length) {
                            idAry.push(idList[j].id);
                        }
                    }
                }
            }
            return idAry;
        },
        // 全部启、停用
        stopItAll(status) {
            let juge = status.status;
            let mess = (juge ? "" : "批量");
            let states = juge ? (juge === "停用" ? "启用" : "停用") : (status === "0" ? (mess + "启用") : (mess + "停用"));
            let stateUrl = juge ? (juge === "停用" ? "star" : "stop") : (status === "1" ? "star" : "stop");
            let idAry = juge ? status.id : this.pLGetArrystar(["status"], status);
            if (idAry.length === 0 && juge === undefined) {
                this.$showSimpleMessage("未发现可" + states + "项", "error");
            } else {
                this.$layerNotice("提示", "您确定要" + states + "吗？", () => {
                    let url = this.lowerMenuBarList[this.upIsIndex].nextlevel[this.isActive].url;
                    let params = ((url === "code/" || url === "constructionUnit/") ? { ids: idAry.toString() } : { id: idAry.toString() });
                    axios.put(url + stateUrl, params).then((res) => {
                        if (res.data.code === 0) {
                            this.$showSimpleMessage(states + "成功", "success");
                            this.reFresh = !this.reFresh;
                        } else {
                            let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                            this.$showSimpleMessage(mess, "error");
                        }
                    }).catch(this.defaultHttpHandler);
                }, null, "warning");
            }
        },
        // 搜索回调函数
        handlerSearchEvent(payload) {
            payload.monitor = "0";
            this.payload = payload;
            this.tableList.params = this.payload;
            this.tableList.params.pageSize = this.tableList.thisPageSize;
        },
        // 页面权限走接口获取数据 mountedFunction、getEardiry、getOption这三个是一体的
        getOption(data) {
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
            let data = this.$store.state.authData.find(t => t.name === "系统配置"); ;
            data = data ? data.nextlevel : [];
            this.lowerMenuBarList = [];
            let list = data ? data.find(t => t.name === "字典管理") : [];
            let namelist = list ? list.nextlevel.filter(t => t.type === 1) : [];
            namelist.forEach(namelist => {
                this.changeList.forEach(changeList => {
                    if (namelist.name === changeList.name && namelist.nextlevel) {
                        namelist.nextlevel.forEach(Nnextlevel => {
                            changeList.nextlevel.forEach(Cnextlevel => {
                                if (Nnextlevel.name === Cnextlevel.name && Nnextlevel.button1 && Nnextlevel.button2) {
                                    Cnextlevel.button1 = Nnextlevel.button1;
                                    Cnextlevel.button2 = Nnextlevel.button2;
                                }
                            });
                        });
                        this.lowerMenuBarList.push({
                            name: namelist.name,
                            nextlevel: []
                        });
                    }
                });
            });
            for (let i in this.changeList) {
                for (let j in this.changeList[i].nextlevel) {
                    if (this.changeList[i].nextlevel[j].button1) {
                        this.lowerMenuBarList[i].nextlevel.push(this.changeList[i].nextlevel[j]);
                    }
                }
            }

            let list2 = data ? data.find(t => t.name === "资产管理").nextlevel : [];
            let option = [];
            for (let i = 0; i < list2.length; i++) {
                if (list2[i].nextlevel && list2[i].type === 1) {
                    for (let j = 0; j < list2[i].nextlevel.length; j++) {
                        if (list2[i].nextlevel[j].type === 1 && list2[i].nextlevel[j].name !== "信号配时" && list2[i].nextlevel[j].name !== "标志" && list2[i].nextlevel[j].name !== "标线") {
                            let id = this.$store.state.equipmentType.find(t => t.name === list2[i].nextlevel[j].name).id;
                            option.push({
                                id: id,
                                name: list2[i].nextlevel[j].name,
                                label: list2[i].nextlevel[j].name,
                                value: id
                            });
                        }
                    }
                }
            }

            this.$set(this.lowerMenuBarList[1].nextlevel[0].searchNameList[1], "data", option);
            this.$set(this.lowerMenuBarList[1].nextlevel[0].list[1], "option", option);
            this.getEardiry("url");
        },
        choseLocation(data, keys) {
            this.PointKeys = keys;
            this.CoordinatePoint = data;
            this.showmap = true;
            setTimeout(() => {
                this.getGISData(data);
            }, 200);
        },
        handleSubmitMap() {
            this.$layerNotice("提示", "您确定使用坐标吗？", () => {
                if (this.CoordinatePoint) {
                    this.formValidate[this.PointKeys] = this.CoordinatePoint;
                }
                this.showmap = false;
                this.PointKeys = "";
                this.choseSome = ""; // 清除选择的区域
                this.mapGis.removeLayer(this.regionalLayer); // 删除区域层
                this.mapGis.removeLayer(this.coordinateTracingPoint); // 删除绘制层
            }, null, "warning");
        },
        resetFormMap() {
            this.showmap = false;
            this.PointKeys = "";
            this.choseSome = ""; // 清除选择的区域
            this.mapGis.removeLayer(this.regionalLayer); // 删除区域层
            this.mapGis.removeLayer(this.coordinateTracingPoint); // 删除绘制层
        },
        // 地图
        // 处理坐标点,用于在地图上标记警告点使用
        InitGisData(dataSource) {
            let data = [];
            for (let i = 0; i < dataSource.length; i++) {
                let point = [];
                point.push(dataSource[i].longitude, dataSource[i].latitude);
                data.push({
                    point: point // 报警坐标
                });
            }
            // 处理坐标点偏移问题
            // data.map(t => {
            //     t.point = coordtransform.wgs84togcj02(t.point[0], t.point[1]);
            // });
            return data;
        },
        // 获取坐标点数据
        getGISData(data) {
            let pointData = [];
            if (data) {
                data = `${data}`;
                let piontArrs = data.split("-");
                if (piontArrs.length === 2) {
                    pointData.push({ longitude: Number(piontArrs[0]), latitude: Number(piontArrs[1]) });
                }
            }
            let dataSource = this.InitGisData(pointData);
            if (!this.mapGis) {
                this.InitCarGis(dataSource);
            } else {
                this.InitCarGiso(dataSource);
            }
        },
        // 初始化地图
        InitCarGis(coordinate) {
                let Mapurl = "http://192.168.31.88:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
            // let Mapurl = "http://49.7.59.232:80/map_gaode/mapabc/roadmap/{z}/{x}/{y}.png"; // 地图底图链接
            let scaleLineControl = GisClassMethod.ScaleLineControl(); // 地图比例尺控件初始化
            let overviewMapControl = GisClassMethod.OverViewMapControl(Mapurl); // 地图鹰眼控件初始化
            this.bottomMapLayer = GisClassMethod.BottomMapLayer(Mapurl); // 地图底图图层初始化
            this.coordinateTracingPoint = GisClassMethod.CoordinateTracingPoint(coordinate); // 地图根据坐标描点层(不使用自定义图标代替)
            let MapsArrs = [this.bottomMapLayer, this.coordinateTracingPoint];
            this.mapGis = GisClassMethod.TotalLayer("tems_gis", this.mapCenter, 12, 11, 21, MapsArrs); // 地图总绘制初始化
            this.mapGis.addControl(scaleLineControl); this.mapGis.addControl(overviewMapControl); // 鹰眼，比例尺控件放进地图中
            this.markPointPosition();
        },
        InitCarGiso(coordinate) {
            this.coordinateTracingPoint = GisClassMethod.CoordinateChangePoint(this.coordinateTracingPoint, coordinate); // 地图根据坐标描点层(不使用自定义图标代替)
            this.mapGis.addLayer(this.coordinateTracingPoint); // 再次添加绘制层
        },
        // 标记点位
        markPointPosition() {
            // 标记点
            let SetupDraw = GisClassMethod.SetupDraw(this.mapGis);
            this.mapGis = SetupDraw[0]; this.draws = SetupDraw[1];
            let measureTooltipElement, measureTooltip;
            document.getElementsByClassName("GIS_page")[0].onclick = function(evt) {
                if (this.title !== "查看") {
                    let tooltipCoord = ol.proj.toLonLat(this.mapGis.getEventCoordinate(evt));
                    this.CoordinatePoint = `${tooltipCoord[0]}-${tooltipCoord[1]}`;
                    this.getGISData(`${tooltipCoord[0]}-${tooltipCoord[1]}`);
                }
            }.bind(this);
        },
        // 请求地图服务，地图基础搜索功能
        requestMap(val) {
            // let searchType = "tj_bound";
            // let name = "QH_NAME";
            // this.loading = true;
            // let queryString = val;
            // let testUrl =
            //     "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
            //     searchType +
            //     '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
            //     searchType +
            //     '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
            //     name +
            //     "</PropertyName><Literal>" +
            //     queryString +
            //     "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
            //     name +
            //     "</PropertyName><Literal>" +
            //     queryString +
            //     "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
            // geoAxios.get(testUrl).then(async res => {
            //     let coordinates = res.data.features;
            //     this.loading = false;
            //     coordinates.map(val => {val.name = val.properties.QH_NAME;});
            //     this.allMap = coordinates;
            // });
            let map = new BMap.Map("map");
            map.centerAndZoom(new BMap.Point(116.404, 39.915));
            let options = {
                onSearchComplete: (results) => {
                    // this.loading = false;
                    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                        // 判断状态是否正确      
                        let s = [];
                        for (let i = 0; i < results.getCurrentNumPois(); i++) {
                            results.getPoi(i).name = results.getPoi(i).title;
                            results.getPoi(i).id = results.getPoi(i).uid;
                            let poi = coordtransform.bd09togcj02(results.getPoi(i).point.lng, results.getPoi(i).point.lat);
                            results.getPoi(i).point.lng = poi[0];
                            results.getPoi(i).point.lat = poi[1];
                            s.push(results.getPoi(i));
                        }
                        this.poiMap = s;
                        this.allMap = [...this.poiMap];
                        this.loading = false;
                    }
                }
            };
            let local = new BMap.LocalSearch(map, options);
            local.search("天津" + val);
        },
        // 绘制搜索出的区域
        drawSearchArea(pra) {
            // this.mapGis.getLayers().clear(); // 清除所有图层包括底层图层
            // this.mapGis.addLayer(this.bottomMapLayer); // 再次添加底层图层
            // this.mapGis.addLayer(this.coordinateTracingPoint); // 再次添加画点层
            // let geojsonObject = {
            //     type: "FeatureCollection",
            //     totalFeatures: 1,
            //     features: pra.coordinates,
            //     crs: {
            //         type: "name",
            //         properties: {
            //             name: "EPSG:4326"
            //         }
            //     }
            // };
            // let vectorSource = new ol.source.Vector({
            //     features: new ol.format.GeoJSON({featureProjection: "EPSG:3857"}).readFeatures(geojsonObject)
            // });
            // this.regionalLayer = new ol.layer.Vector({
            //     source: vectorSource,
            //     style: new ol.style.Style({
            //         // fill: new ol.style.Fill({
            //         //     color: 'red'
            //         // }),
            //         stroke: new ol.style.Stroke({
            //             color: "#0087e6",
            //             width: 2
            //         }),
            //         image: new ol.style.Circle({
            //             radius: 10,
            //             fill: new ol.style.Fill({
            //             color: "#ffcc33"
            //             })
            //         })
            //     })
            // });
            // this.mapGis.addLayer(this.regionalLayer);

            this.mapGis.removeLayer(this.regionalLayer);
            this.regionalLayer = GisClassMethod.CoordinateTracingPointImg([{point: pra, intelligenceId: "110"}], 1);
            this.mapGis.addLayer(this.regionalLayer);
        },
        // 地图移动中心点
        moveToCenter(point) {
            let position = point;
            let view = this.mapGis.getView();
            let center = ol.proj.fromLonLat(position);
            view.setCenter(center);
            // view.setZoom(12);
        }
    },
    mounted() {
        this.mountedFunction();
        this.getProveList();
    },
    watch: {
        "Dialog": function(val) {
            if (val === false) {
                this.$refs["formValidateEmpty"].resetFields();
            }
        },
        "choseSome": {
            handler: function(val) {
                if (val) {
                    // let chosed = this.allMap.find(t => t.id === val);
                    // let req = {
                    //     coordinates: [chosed],
                    //     result: "",
                    //     area: chosed.id
                    // };
                    // this.drawSearchArea(req); // 绘制区域
                    // this.moveToCenter([chosed.geometry.coordinates[0][0][0][0], chosed.geometry.coordinates[0][0][0][1]]) // 地图移动中心点
                    let chosed = this.allMap.find(t => t.id === val);
                    this.drawSearchArea([chosed.point.lng, chosed.point.lat]); // 绘制区域
                    this.moveToCenter([chosed.point.lng, chosed.point.lat]) // 地图移动中心点
                }
            }
        }
    }
};
</script>

<style>
.el_class{
    width: 86%; 
}
.el-form-item .el-input-group__append {
    padding: 0 !important;
    left: 15px;
    border: 0px !important;
    width: 0 !important;
}
.el-form-item .el-button{
    background-color: #020324 !important;
    color: #53d4f9 !important;
    padding: 8px 0px !important;
}
.showmapBox {
    height: 555px !important;
    overflow: hidden;
}

.showCoordinateBox {
    height: 35px;
    text-align: left;
    line-height: 35px;
    padding-left: 20px;
    color: #fff;
    font-size: 18px;
}

.showmap_dialog .el-dialog__body {
   margin: 5px;
   padding: 5px;
}
.dic_closed {
    border-radius: 3px;
}
.el-cascader__label {
    color: #53d4f9;
}
.el-cascader__label span {
    color: #53d4f9;
}
.srarchqy {
    text-align: left;
    color: #3ba7c9;
}
.srarchqy .el-select {
    width: 200px !important;
}
</style>
