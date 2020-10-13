/**
/**
 * Created by wanghao on 2018/08/30.
 */
// 修复文件损失
import vue from "vue";
import vuex from "vuex";
import CreatePersistedState from "vuex-persistedstate";

vue.use(vuex);

const state = {
    // 视频地址
    videoUrl: "http://211.159.188.107:80/video.mp4",
    // 加载中状态
    loading: false,
    geoLoading: false,
    sjhLoading: false,
    // 存储用户token
    token: "Bearer",
    // 存储用户权限模型
    loginModel: [],
    // 存储情报特殊事件
    specialEventSet: [],
    // 存储一二级菜单及页面层级权限
    authData: [],
    // 是否登录转跳
    userLogin: false,
    // 登陆后第一次渲染
    firstRender: false,
    // 是否是退出
    logout: false,
    // 是否在登录页(存路由)
    nowRoute: "",
    // 民族对应
    nation: [{
            name: "汉",
            id: "01"
        },
        {
            name: "蒙",
            id: "02"
        },
        {
            name: "回",
            id: "03"
        },
        {
            name: "藏",
            id: "04"
        },
        {
            name: "维吾尔",
            id: "05"
        },
        {
            name: "苗",
            id: "6"
        },
        {
            name: "彝族",
            id: "07"
        },
        {
            name: "壮",
            id: "08"
        },
        {
            name: "布依",
            id: "09"
        },
        {
            name: "朝鲜族",
            id: "10"
        },
        {
            name: "满",
            id: "11"
        },
        {
            name: "侗族",
            id: "12"
        },
        {
            name: "瑶",
            id: "13"
        },
        {
            name: "白",
            id: "14"
        },
        {
            name: "土家族",
            id: "15"
        },
        {
            name: "哈尼族",
            id: "16"
        },
        {
            name: "哈萨克族",
            id: "17"
        },
        {
            name: "傣族",
            id: "18"
        },
        {
            name: "黎族",
            id: "19"
        },
        {
            name: "傈傈族",
            id: "20"
        },
        {
            name: "佤族",
            id: "21"
        },
        {
            name: "畲族",
            id: "22"
        },
        {
            name: "高山族",
            id: "23"
        },
        {
            name: "拉祜族",
            id: "24"
        },
        {
            name: "水族",
            id: "25"
        },
        {
            name: "东乡族",
            id: "26"
        },
        {
            name: "纳西族",
            id: "27"
        },
        {
            name: "景颇族",
            id: "28"
        },
        {
            name: "柯尔克孜族",
            id: "29"
        },
        {
            name: "土族",
            id: "30"
        },
        {
            name: "达翰尔族",
            id: "31"
        },
        {
            name: "仫佬族",
            id: "32"
        },
        {
            name: "羌族",
            id: "33"
        },
        {
            name: "布朗族",
            id: "34"
        },
        {
            name: "撒拉族",
            id: "35"
        },
        {
            name: "毛难族",
            id: "36"
        },
        {
            name: "仡佬族",
            id: "37"
        },
        {
            name: "锡伯族",
            id: "38"
        },
        {
            name: "阿昌族",
            id: "39"
        },
        {
            name: "普米族",
            id: "40"
        },
        {
            name: "塔吉克族",
            id: "41"
        },
        {
            name: "怒族",
            id: "42"
        },
        {
            name: "乌兹别克",
            id: "43"
        },
        {
            name: "俄罗斯族",
            id: "44"
        },
        {
            name: "鄂温克族",
            id: "45"
        },
        {
            name: "崩龙族",
            id: "46"
        },
        {
            name: "保安族",
            id: "47"
        },
        {
            name: "裕固族",
            id: "48"
        },
        {
            name: "京族",
            id: "49"
        },
        {
            name: "塔塔尔族",
            id: "50"
        },
        {
            name: "独龙族",
            id: "51"
        },
        {
            name: "鄂伦春族",
            id: "52"
        },
        {
            name: "赫哲族",
            id: "53"
        },
        {
            name: "门巴族",
            id: "54"
        },
        {
            name: "珞巴族",
            id: "55"
        },
        {
            name: "基诺族",
            id: "56"
        },
        {
            name: "其他",
            id: "57"
        },
        {
            name: "外国血统",
            id: "58"
        }
    ],
    // 事件对应的ID和名称
    venteType: [{
            id: "1",
            name: "路口交通溢出拥堵"
        },
        {
            id: "2",
            name: "路段交通严重拥堵"
        },
        /*{
            id: "3",
            name: "车辆慢行"
        },*/
        {
            id: "4",
            name: "信号灯不正常显示"
        },
        {
            id: "5",
            name: "交通事故"
        },
        {
            id: "6",
            name: "车辆逆行"
        },
        {
            id: "7",
            name: "不文明停车"
        },
        {
            id: "8",
            name: "烟雾/火灾"
        },
        {
            id: "9",
            name: "道路积水"
        },
        {
            id: "10",
            name: "机动车闯红灯"
        },
        {
            id: "11",
            name: "行人闯红灯"
        },
        {
            id: "12",
            name: "行人翻越护栏"
        },
        {
            id: "13",
            name: "非机动车闯灯"
        },
        {
            id: "14",
            name: "路口车辆交通秩序混乱"
        },
        {
            id: "15",
            name: "牌照无法识别"
        },
        {
            id: "16",
            name: "状态异常车辆识别"
        },
        {
            id: "17",
            name: "车辆偏离路线"
        },
        {
            id: "18",
            name: "交通流量异常"
        },
        {
            id: "19",
            name: "车型构成异常"
        },
        {
            id: "20",
            name: "违反限行"
        },
        {
            id: "21",
            name: "报废车辆上路行驶"
        },
        {
            id: "22",
            name: "逾期未检车辆上路行驶"
        },
        /*{
            id: "23",
            name: "抛洒滴漏(车辆遗撒)"
        },*/
        {
            id: "24",
            name: "外地车数量异常"    
        },
        /*{
            id: "25",
            name: "外地车频繁通过(机动车频繁通过)"
        },*/
        {
            id: "26",
            name: "占道施工"
        }
        /* {
             id: "27",
             name: "自定义"
         }*/
    ],
    // 车辆分类
    categoryType: [{
            id: "1",
            name: "大型客车"
        },
        {
            id: "2",
            name: "中型客车"
        },
        {
            id: "3",
            name: "小型客车"
        },
        {
            id: "4",
            name: "微型客车"
        },
        {
            id: "5",
            name: "重型货车"
        },
        {
            id: "6",
            name: "中型货车"
        },
        {
            id: "7",
            name: "轻型货车"
        },
        {
            id: "8",
            name: "微型货车"
        },
        {
            id: "9",
            name: "拖拉机"
        },
        {
            id: "10",
            name: "摩托车"
        },
        {
            id: "11",
            name: "半挂车"
        },
        {
            id: "12",
            name: "全挂车"
        },
        {
            id: "13",
            name: "专项作业车"
        },
        {
            id: "14",
            name: "电车"
        },
        {
            id: "15",
            name: "牵引车"
        },
        {
            id: "16",
            name: "其它"
        }
    ],
    vehicleClass: [{
            name: "非机动车",
            id: 1
        },
        {
            name: "无牌无证机动车",
            id: 2
        },
        {
            name: "公安牌证机动车",
            id: 3
        },
        {
            name: "武警牌证机动车",
            id: 4
        },
        {
            name: "部队牌证机动车",
            id: 5
        },
        {
            name: "农机牌证机动车",
            id: 6
        },
        {
            name: "其他",
            id: 9
        }
    ],
    // 驾驶证状态
    licenseState:
    [
        { id: "A", name: "正常" },
        { id: "B", name: "超分" },
        { id: "C", name: "转出" },
        { id: "D", name: "暂扣" },
        { id: "E", name: "撤销" },
        { id: "F", name: "吊销" },
        { id: "G", name: "注销" },
        { id: "H", name: "违法未处理" },
        { id: "I", name: "事故未处理" },
        { id: "J", name: "停止使用" },
        { id: "K", name: "扣押" },
        { id: "L", name: "锁定" },
        { id: "M", name: "逾期未换证" },
        { id: "N", name: "延期换证" },
        { id: "P", name: "延期体检" },
        { id: "R", name: "注销可恢复" }
    ],
    // 驾驶证原准驾车型
    category3:
    [
        { id: "A", name: "大型车" },
        { id: "B", name: "中型车" },
        { id: "C", name: "小型车" },
        { id: "D", name: "三轮摩托车" },
        { id: "E", name: "二轮摩托车" },
        { id: "F", name: "轻便摩托车" },
        { id: "M", name: "轮式自行机械车" },
        { id: "N", name: "无轨电车" },
        { id: "P", name: "有轨电车" }
    ],
    category4: [
        { id: "A1", name: "大型客车" },
        { id: "A2", name: "牵引车" },
        { id: "A3", name: "城市公共汽车" },
        { id: "B1", name: "中型客车" },
        { id: "B2", name: "大型货车" },
        { id: "C1", name: "小型汽车" },
        { id: "C2", name: "小型自动档汽车" },
        { id: "C3", name: "低速载货汽车" },
        { id: "C4", name: "三轮汽车" },
        { id: "C5", name: "残疾人专用小型自动挡载客汽车" },
        { id: "A", name: "大型车" },
        { id: "B", name: "中型车" },
        { id: "C", name: "小型车" },
        { id: "D", name: "三轮摩托车" },
        { id: "E", name: "二轮摩托车" },
        { id: "F", name: "轻便摩托车" },
        { id: "M", name: "轮式自行机械车" },
        { id: "N", name: "无轨电车" },
        { id: "P", name: "有轨电车" }
    ],
    // 驾驶证准驾车型
    category2:
    [
        { id: "A1", name: "大型客车" },
        { id: "A2", name: "牵引车" },
        { id: "A3", name: "城市公共汽车" },
        { id: "B1", name: "中型客车" },
        { id: "B2", name: "大型货车" },
        { id: "C1", name: "小型汽车" },
        { id: "C2", name: "小型自动档汽车" },
        { id: "C3", name: "低速载货汽车" },
        { id: "C4", name: "三轮汽车" },
        { id: "C5", name: "残疾人专用小型自动挡载客汽车" },
        { id: "D", name: "三轮摩托车" },
        { id: "E", name: "二轮摩托车" },
        { id: "F", name: "轻便摩托车" },
        { id: "M", name: "轮式自行机械车" },
        { id: "N", name: "无轨电车" },
        { id: "P", name: "有轨电车" }
    ],
    // 车型
    // category: [
    //     { name: "出租车", id: "taxi" },
    //     { name: "推土机", id: "bulldozer" },
    //     { name: "水泥搅拌机", id: "cement-transporter" },
    //     { name: "工程救援车辆", id: "engineering-rescue-vehicle" },
    //     { name: "挖掘机", id: "excavator" },
    //     { name: "公路客运、公交客运、旅游客运、校车", id: "bus" },
    //     { name: "货运、救护、消防车", id: "van" },
    //     { name: "工程救险", id: "engineering-cars" },
    //     { name: "行人", id: "person" },
    //     { name: "二轮自行车、二轮电动车、摩托车", id: "bike" },
    //     { name: "小货车", id: "truck" },
    //     { name: "普通小汽车", id: "car" },
    //     { name: "大货车", id: "huge-truck" },
    //     { name: "起重车吊车", id: "crane" },
    //     { name: "油罐车，危化品运输车", id: "tanker" }
    // ],
    // 营运车辆类型
    Operatingvehicles: [{
            "id": "1",
            "name": "公交车"
        },
        {
            "id": "2",
            "name": "大货车"
        },
        {
            "id": "3",
            "name": "危险品运输车"
        },
        {
            "id": "4",
            "name": "大客车"
        },
        {
            "id": "5",
            "name": "救护车"
        },
        {
            "id": "6",
            "name": "消防车"
        },
        {
            "id": "7",
            "name": "警车"
        },
    ],
    category: [{
            name: "出租车",
            id: "1"
        },
        {
            name: "推土机",
            id: "2"
        },
        {
            name: "水泥搅拌机",
            id: "3"
        },
        {
            name: "工程救援车辆",
            id: "4"
        },
        {
            name: "挖掘机",
            id: "5"
        },
        {
            name: "公路客运、公交客运、旅游客运、校车",
            id: "6"
        },
        {
            name: "货运、救护、消防车",
            id: "7"
        },
        {
            name: "工程救险",
            id: "8"
        },
        {
            name: "行人",
            id: "9"
        },
        {
            name: "二轮自行车、二轮电动车、摩托车",
            id: "10"
        },
        {
            name: "小货车",
            id: "11"
        },
        {
            name: "普通小汽车",
            id: "12"
        },
        {
            name: "大货车",
            id: "13"
        },
        {
            name: "起重车吊车",
            id: "14"
        },
        {
            name: "油罐车，危化品运输车",
            id: "15"
        }
    ],
    // 区域对应的ID和名称
    /* area: [{
        name: "咸水沽镇",
        id: "120112100"
    }, {
        name: "葛沽镇",
        id: "120112101"
    }, {
        name: "小站镇",
        id: "120112102"
    }, {
        name: "双港镇",
        id: "120112103"
    }, {
        name: "辛庄镇",
        id: "120112104"
    }, {
        name: "双桥河镇",
        id: "120112106"
    }, {
        name: "八里台镇",
        id: "120112107"
    }, {
        name: "北闸口镇",
        id: "120112108"
    }], */
	"//": "edited by brandy",
    area: [{
        name: "淤溪镇",
        id: "120112107"
    }, {
        name: "溱潼镇",
        id: "120112108"
    }, {
        name: "沈高镇",
        id: "120112101"
    }, {
        name: "张甸镇",
        id: "120112103"
    }, {
        name: "顾高镇",
        id: "120112106"
    }, {
        name: "大土仑镇",
        id: "120112100"
    }, {
        name: "俞垛镇",
        id: "120112102"
    }, {
        name: "白米镇",
        id: "120112104"
    }],
    areas:[
        {name: "淤溪镇",id: "淤溪镇"},
        {name: "溱潼镇",id: "溱潼镇"},
        {name: "沈高镇" ,id: "沈高镇"},
        {name: "张甸镇" ,id: "张甸镇"},
        {name: "顾高镇",id: "顾高镇"},
        {name: "大土仑镇",id: "大土仑镇"},
        {name: "俞垛镇" ,id: "俞垛镇"},
        {name: "白米镇" ,id: "白米镇"}
    ],
    // 用途属性
    useAttribute: [{
            id: 1,
            name: "专用"
        },
        {
            id: 2,
            name: "非专用"
        },
        {
            id: 9,
            name: "其他"
        }
    ],
    // 公路行政等级
    adminLevel:[
        {
            id: "1",
            name: "国道"
        },{
            id: "2",
            name: "省道"
        },{
            id: "3",
            name: "县道"
        },{
            id: "4",
            name: "乡道"
        },{
            id: "9",
            name: "其他"
        },
    ],
    // 交通方式
    trafficWay: [{
            id: "A1",
            name: "步行"
        },
        {
            id: "C1",
            name: "乘大中型汽车"
        },
        {
            id: "C2",
            name: "乘小微型客车"
        },
        {
            id: "C3",
            name: "乘普通货车"
        },
        {
            id: "C4",
            name: "乘汽车列车"
        },
        {
            id: "C5",
            name: "乘三轮汽车和低速货车"
        },
        {
            id: "C6",
            name: "乘摩托车"
        },
        {
            id: "C7",
            name: "乘拖拉机"
        },
        {
            id: "C8",
            name: "乘其他机动车"
        },
        {
            id: "C9",
            name: "乘其他非机动车"
        },
        {
            id: "F1",
            name: "自行车"
        },
        {
            id: "F2",
            name: "三轮车"
        },
        {
            id: "F3",
            name: "手推车"
        },
        {
            id: "F4",
            name: "残疾人专用车"
        },
        {
            id: "F5",
            name: "畜力车"
        },
        {
            id: "F6",
            name: "电动自行车"
        },
        {
            id: "F9",
            name: "其它非机动车"
        },
        {
            id: "G1",
            name: "驾驶汽车列车"
        },
        {
            id: "H1",
            name: "驾驶重型货车"
        },
        {
            id: "H2",
            name: "驾驶中型货车"
        },
        {
            id: "H3",
            name: "驾驶轻型货车"
        },
        {
            id: "H4",
            name: "驾驶微型货车"
        },
        {
            id: "J1",
            name: "驾驶其他机动车"
        },
        {
            id: "K1",
            name: "驾驶大型客车"
        },
        {
            id: "K2",
            name: "驾驶中型客车"
        },
        {
            id: "K3",
            name: "驾驶小型客车"
        },
        {
            id: "K4",
            name: "驾驶微型客车"
        },
        {
            id: "M1",
            name: "驾驶普通摩托车"
        },
        {
            id: "M2",
            name: "驾驶轻便摩托车"
        },
        {
            id: "N1",
            name: "驾驶三轮汽车"
        },
        {
            id: "N2",
            name: "驾驶低速货车"
        },
        {
            id: "Q1",
            name: "驾驶其他汽车"
        },
        {
            id: "T1",
            name: "驾驶拖拉机"
        },
        {
            id: "X9",
            name: "其它"
        }
    ],
    // 车辆使用性质
    useNature: [{
            id: "A",
            name: "非运营"
        },
        {
            id: "B",
            name: "公路客运"
        },
        {
            id: "C",
            name: "公交客运"
        },
        {
            id: "D",
            name: "出租客运"
        },
        {
            id: "E",
            name: "旅游客运"
        },
        {
            id: "F",
            name: "货运"
        },
        {
            id: "G",
            name: "租赁"
        },
        {
            id: "H",
            name: "消防"
        },
        {
            id: "I",
            name: "救护"
        },
        {
            id: "J",
            name: "工程救险"
        },
        {
            id: "K",
            name: "营转非"
        },
        {
            id: "L",
            name: "非运营"
        },
        {
            id: "M",
            name: "出租转非"
        },
        {
            id: "N",
            name: "教练"
        },
        {
            id: "O",
            name: "幼儿校车"
        },
        {
            id: "P",
            name: "小学生校车"
        },
        {
            id: "Q",
            name: "其他校车"
        },
        {
            id: "R",
            name: "危险品运输"
        }
    ],
    // 机动车号牌种类代码
    plateType: [{
            id: "01",
            name: "大型汽车"
        },
        {
            id: "02",
            name: "小型汽车"
        },
        {
            id: "03",
            name: "使馆汽车"
        },
        {
            id: "04",
            name: "领馆汽车"
        },
        {
            id: "05",
            name: "境外汽车"
        },
        {
            id: "06",
            name: "外籍汽车"
        },
        {
            id: "07",
            name: "普通摩托车"
        },
        {
            id: "08",
            name: "轻便摩托车"
        },
        {
            id: "09",
            name: "使馆摩托车"
        },
        {
            id: "10",
            name: "领馆摩托车"
        },
        {
            id: "11",
            name: "境外摩托车"
        },
        {
            id: "12",
            name: "外籍摩托车"
        },
        {
            id: "13",
            name: "低速车"
        },
        {
            id: "14",
            name: "拖拉机"
        },
        {
            id: "15",
            name: "挂车"
        },
        {
            id: "16",
            name: "教练汽车"
        },
        {
            id: "17",
            name: "教练摩托车"
        },
        {
            id: "18",
            name: "实验汽车"
        },
        {
            id: "19",
            name: "实验摩托车"
        },
        {
            id: "20",
            name: "临时入境汽车"
        },
        {
            id: "21",
            name: "临时入境摩托车"
        },
        {
            id: "22",
            name: "临时行驶车"
        },
        {
            id: "23",
            name: "警用汽车"
        },
        {
            id: "24",
            name: "警用摩托"
        },
        {
            id: "25",
            name: "原农机号牌"
        },
        {
            id: "26",
            name: "香港入出境车"
        },
        {
            id: "27",
            name: "澳门入出境车"
        },
        {
            id: "31",
            name: "武警号牌"
        },
        {
            id: "32",
            name: "军队号牌"
        },
        {
            id: "41",
            name: "无号牌"
        },
        {
            id: "42",
            name: "假号牌"
        },
        {
            id: "43",
            name: "挪用号牌"
        },
        {
            id: "99",
            name: "其他号牌"
        }
    ],
    // 车辆类型
    carType: [{
            id: "B11",
            name: "重型普通半挂车"
        },
        {
            id: "B12",
            name: "重型厢式半挂车"
        },
        {
            id: "B13",
            name: "重型罐式半挂车"
        },
        {
            id: "B14",
            name: "重型平板半挂车"
        },
        {
            id: "B15",
            name: "重型集装箱半挂车"
        },
        {
            id: "B16",
            name: "重型自卸半挂车"
        },
        {
            id: "B17",
            name: "重型特殊结构半挂车"
        },
        {
            id: "B18",
            name: "重型仓栅式半挂车"
        },
        {
            id: "B19",
            name: "重型旅居半挂车"
        },
        {
            id: "B1A",
            name: "重型专项作业半挂车"
        },
        {
            id: "B1B",
            name: "重型低平板半挂车"
        },
        {
            id: "B21",
            name: "中型普通半挂车"
        },
        {
            id: "B22",
            name: "中型厢式半挂车"
        },
        {
            id: "B23",
            name: "中型罐式半挂车"
        },
        {
            id: "B24",
            name: "中型平板半挂车"
        },
        {
            id: "B25",
            name: "中型集装箱半挂车"
        },
        {
            id: "B26",
            name: "中型自卸半挂车"
        },
        {
            id: "B27",
            name: "中型特殊结构半挂车"
        },
        {
            id: "B28",
            name: "中型仓栅式半挂车"
        },
        {
            id: "B29",
            name: "中型旅居半挂车"
        },
        {
            id: "B2A",
            name: "中型专项作业半挂车"
        },
        {
            id: "B2B",
            name: "中型低平板半挂车"
        },
        {
            id: "B31",
            name: "轻型普通半挂车"
        },
        {
            id: "B32",
            name: "轻型厢式半挂车"
        },
        {
            id: "B33",
            name: "轻型罐式半挂车"
        },
        {
            id: "B34",
            name: "轻型平板半挂车"
        },
        {
            id: "B35",
            name: "轻型自卸半挂车"
        },
        {
            id: "B36",
            name: "轻型仓栅式半挂车"
        },
        {
            id: "B37",
            name: "轻型旅居半挂车"
        },
        {
            id: "B38",
            name: "轻型专项作业半挂车"
        },
        {
            id: "B39",
            name: "轻型低平板半挂车"
        },
        {
            id: "D11",
            name: "无轨电车"
        },
        {
            id: "D12",
            name: "有轨电车"
        },
        {
            id: "G11",
            name: "重型普通全挂车"
        },
        {
            id: "G12",
            name: "重型厢式全挂车"
        },
        {
            id: "G13",
            name: "重型罐式全挂车"
        },
        {
            id: "G14",
            name: "重型平板全挂车"
        },
        {
            id: "G15",
            name: "重型集装箱全挂车"
        },
        {
            id: "G16",
            name: "重型自卸全挂车"
        },
        {
            id: "G17",
            name: "重型仓栅式全挂车"
        },
        {
            id: "G18",
            name: "重型旅居全挂车"
        },
        {
            id: "G19",
            name: "重型专项作业全挂车"
        },
        {
            id: "G21",
            name: "中型普通全挂车"
        },
        {
            id: "G22",
            name: "中型厢式全挂车"
        },
        {
            id: "G23",
            name: "中型罐式全挂车"
        },
        {
            id: "G24",
            name: "中型平板全挂车"
        },
        {
            id: "G25",
            name: "中型集装箱全挂车"
        },
        {
            id: "G26",
            name: "中型自卸全挂车"
        },
        {
            id: "G27",
            name: "中型仓栅式全挂车"
        },
        {
            id: "G28",
            name: "中型旅居全挂车"
        },
        {
            id: "G29",
            name: "中型专项作业全挂车"
        },
        {
            id: "G31",
            name: "轻型普通全挂车"
        },
        {
            id: "G32",
            name: "轻型厢式全挂车"
        },
        {
            id: "G33",
            name: "轻型罐式全挂车"
        },
        {
            id: "G34",
            name: "轻型平板全挂车"
        },
        {
            id: "G35",
            name: "轻型自卸全挂车"
        },
        {
            id: "G36",
            name: "轻型仓栅式全挂车"
        },
        {
            id: "G37",
            name: "轻型旅居全挂车"
        },
        {
            id: "G38",
            name: "轻型专项作业全挂车"
        },
        {
            id: "H11",
            name: "重型普通货车"
        },
        {
            id: "H12",
            name: "重型厢式货车"
        },
        {
            id: "H13",
            name: "重型封闭货车"
        },
        {
            id: "H14",
            name: "重型罐式货车"
        },
        {
            id: "H15",
            name: "重型平板货车"
        },
        {
            id: "H16",
            name: "重型集装厢车"
        },
        {
            id: "H17",
            name: "重型自卸货车"
        },
        {
            id: "H18",
            name: "重型特殊结构货车"
        },
        {
            id: "H19",
            name: "重型仓栅式货车"
        },
        {
            id: "H21",
            name: "中型普通货车"
        },
        {
            id: "H22",
            name: "中型厢式货车"
        },
        {
            id: "H23",
            name: "中型封闭货车"
        },
        {
            id: "H24",
            name: "中型罐式货车"
        },
        {
            id: "H25",
            name: "中型平板货车"
        },
        {
            id: "H26",
            name: "中型集装厢车"
        },
        {
            id: "H27",
            name: "中型自卸货车"
        },
        {
            id: "H28",
            name: "中型特殊结构货车"
        },
        {
            id: "H29",
            name: "中型仓栅式货车"
        },
        {
            id: "H31",
            name: "轻型普通货车"
        },
        {
            id: "H32",
            name: "轻型厢式货车"
        },
        {
            id: "H33",
            name: "轻型封闭货车"
        },
        {
            id: "H34",
            name: "轻型罐式货车"
        },
        {
            id: "H35",
            name: "轻型平板货车"
        },
        {
            id: "H37",
            name: "轻型自卸货车"
        },
        {
            id: "H38",
            name: "轻型特殊结构货车"
        },
        {
            id: "H39",
            name: "轻型仓栅式货车"
        },
        {
            id: "H41",
            name: "微型普通货车"
        },
        {
            id: "H42",
            name: "微型厢式货车"
        },
        {
            id: "H43",
            name: "微型封闭货车"
        },
        {
            id: "H44",
            name: "微型罐式货车"
        },
        {
            id: "H45",
            name: "微型自卸货车"
        },
        {
            id: "H46",
            name: "微型特殊结构货车"
        },
        {
            id: "H47",
            name: "微型仓栅式货车"
        },
        {
            id: "H51",
            name: "普通低速货车"
        },
        {
            id: "H52",
            name: "厢式低速货车"
        },
        {
            id: "H53",
            name: "罐式低速货车"
        },
        {
            id: "H54",
            name: "自卸低速货车"
        },
        {
            id: "H55",
            name: "仓栅式低速货车"
        },
        {
            id: "J11",
            name: "轮式装载机械"
        },
        {
            id: "J12",
            name: "轮式挖掘机械"
        },
        {
            id: "J13",
            name: "轮式平地机械"
        },
        {
            id: "K11",
            name: "大型普通客车"
        },
        {
            id: "K12",
            name: "大型双层客车"
        },
        {
            id: "K13",
            name: "大型卧铺客车"
        },
        {
            id: "K14",
            name: "大型铰接客车"
        },
        {
            id: "K15",
            name: "大型越野客车"
        },
        {
            id: "K16",
            name: "大型轿"
        },
        {
            id: "K17",
            name: "大型专用客车"
        },
        {
            id: "K21",
            name: "中型普通客车"
        },
        {
            id: "K22",
            name: "中型双层客车"
        },
        {
            id: "K23",
            name: "中型卧铺客车"
        },
        {
            id: "K24",
            name: "中型铰接客车"
        },
        {
            id: "K25",
            name: "中型越野客车"
        },
        {
            id: "K26",
            name: "中型轿车"
        },
        {
            id: "K27",
            name: "中型专用客车"
        },
        {
            id: "K31",
            name: "小型普通客车"
        },
        {
            id: "K32",
            name: "小型越野客车"
        },
        {
            id: "K33",
            name: "小型轿车"
        },
        {
            id: "K34",
            name: "小型专用客车"
        },
        {
            id: "K41",
            name: "微型普通客车"
        },
        {
            id: "K42",
            name: "微型越野客车"
        },
        {
            id: "K43",
            name: "微型轿车"
        },
        {
            id: "M11",
            name: "普通正三轮摩托车"
        },
        {
            id: "M12",
            name: "轻便正三轮摩托车"
        },
        {
            id: "M13",
            name: "正三轮载客摩托车"
        },
        {
            id: "M14",
            name: "正三轮载货摩托车"
        },
        {
            id: "M15",
            name: "侧三轮摩托车"
        },
        {
            id: "M21",
            name: "普通二轮摩托车"
        },
        {
            id: "M22",
            name: "轻便二轮摩托车"
        },
        {
            id: "N11",
            name: "三轮汽车"
        },
        {
            id: "Q11",
            name: "重型半挂牵引车"
        },
        {
            id: "Q12",
            name: "重型全挂牵引车"
        },
        {
            id: "Q21",
            name: "中型半挂牵引车"
        },
        {
            id: "Q22",
            name: "中型全挂牵引车"
        },
        {
            id: "Q31",
            name: "轻型半挂牵引车"
        },
        {
            id: "Q32",
            name: "轻型全挂牵引车"
        },
        {
            id: "T11",
            name: "大型轮式拖拉机"
        },
        {
            id: "T21",
            name: "小型轮式拖拉机"
        },
        {
            id: "T22",
            name: "手扶拖拉机"
        },
        {
            id: "T23",
            name: "手扶变形运输机"
        },
        {
            id: "X99",
            name: "其它"
        },
        {
            id: "Z11",
            name: "大型专项作业车"
        },
        {
            id: "Z21",
            name: "中型专项作业车"
        },
        {
            id: "Z31",
            name: "小型专项作业车"
        },
        {
            id: "Z41",
            name: "微型专项作业车"
        },
        {
            id: "Z51",
            name: "重型专项作业车"
        },
        {
            id: "Z71",
            name: "轻型专项作业车"
        }
    ],
    // 国产/进口车辆
    domOrImp: [{
            id: "A",
            name: "国产"
        },
        {
            id: "B",
            name: "海关进口"
        },
        {
            id: "C",
            name: "公安没收"
        },
        {
            id: "D",
            name: "工商没收"
        },
        {
            id: "E",
            name: "海关没收"
        },
        {
            id: "F",
            name: "一车一证"
        },
        {
            id: "G",
            name: "海关监管"
        },
        {
            id: "H",
            name: "进口改装"
        },
        {
            id: "I",
            name: "解除监管"
        }
    ],
    // 机动车燃料种类
    fuleType: [{
            id: "A",
            name: "汽油"
        },
        {
            id: "B",
            name: "柴油"
        },
        {
            id: "C",
            name: "电"
        },
        {
            id: "D",
            name: "混合油"
        },
        {
            id: "E",
            name: "天然气"
        },
        {
            id: "F",
            name: "液化石油气"
        },
        {
            id: "L",
            name: "甲醇"
        },
        {
            id: "M",
            name: "乙醇"
        },
        {
            id: "N",
            name: "太阳能"
        },
        {
            id: "O",
            name: "混合动力"
        },
        {
            id: "P",
            name: "氢"
        },
        {
            id: "Q",
            name: "生物燃料"
        },
        {
            id: "Y",
            name: "无"
        }
    ],
    // 道路线形
    roadAlign: [{
            id: "01",
            name: "平直"
        },
        {
            id: "02",
            name: "一般弯"
        },
        {
            id: "03",
            name: "一般坡"
        },
        {
            id: "04",
            name: "急弯"
        },
        {
            id: "05",
            name: "陡坡"
        },
        {
            id: "06",
            name: "连续下坡"
        },
        {
            id: "07",
            name: "一般弯坡"
        },
        {
            id: "08",
            name: "急弯陡坡"
        },
        {
            id: "09",
            name: "一般坡急弯"
        },
        {
            id: "10",
            name: "一般弯陡坡"
        }
    ],
    // 违法行为
    illegalBehavior: [{
            id: 11,
            name: "不按规定使用灯光"
        },
        {
            id: 12,
            name: "超速行驶"
        },
        {
            id: 13,
            name: "饮酒驾驶"
        },
        {
            id: 14,
            name: "逆行"
        },
        {
            id: 15,
            name: "疲劳驾驶"
        },
        {
            id: 16,
            name: "醉酒驾驶"
        },
        {
            id: 17,
            name: "未低速通过"
        },
        {
            id: 18,
            name: "违法变更车道"
        },
        {
            id: 19,
            name: "违法超车"
        },
        {
            id: 20,
            name: "违法倒车"
        },
        {
            id: 21,
            name: "违法掉头"
        },
        {
            id: 22,
            name: "违法会车"
        },
        {
            id: 23,
            name: "违法牵引"
        },
        {
            id: 24,
            name: "违法抢行"
        },
        {
            id: 25,
            name: "违法上道路行驶"
        },
        {
            id: 26,
            name: "违法停车"
        },
        {
            id: 27,
            name: "违法占道行驶"
        },
        {
            id: 28,
            name: "违法装载"
        },
        {
            id: 29,
            name: "违法装载超限及危险品运输"
        },
        {
            id: 30,
            name: "货动车辆超载"
        },
        {
            id: 31,
            name: "违反交通信号"
        },
        {
            id: 32,
            name: "未按规定让行"
        },
        {
            id: 33,
            name: "无证驾驶"
        },
        {
            id: 34,
            name: "客运车辆超员"
        },
        {
            id: 35,
            name: "未携带驾驶证"
        },
        {
            id: 36,
            name: "驾驶证失效"
        },
        {
            id: 37,
            name: "非法获取机动车牌证"
        },
        {
            id: 38,
            name: "擅自销售生产机动车"
        },
        {
            id: 40,
            name: "未按规定办理业务"
        },
        {
            id: 41,
            name: "铁路道口或渡口"
        },
        {
            id: 49,
            name: "其他影响安全行为"
        },
        {
            id: 51,
            name: "超速行驶"
        },
        {
            id: 52,
            name: "酒后驾驶"
        },
        {
            id: 53,
            name: "逆行"
        },
        {
            id: 55,
            name: "违法超车"
        },
        {
            id: 56,
            name: "违法牵引"
        },
        {
            id: 57,
            name: "违法抢行"
        },
        {
            id: 58,
            name: "违法上道路行驶"
        },
        {
            id: 59,
            name: "违法停车"
        },
        {
            id: 60,
            name: "违法占道行驶"
        },
        {
            id: 61,
            name: "违法装载"
        },
        {
            id: 62,
            name: "违反交通信号"
        },
        {
            id: 63,
            name: "未按规定让行"
        },
        {
            id: 64,
            name: "无证驾驶"
        },
        {
            id: 69,
            name: "其他影响安全行为"
        },
        {
            id: 73,
            name: "违法上道路行驶"
        },
        {
            id: 74,
            name: "违法占道"
        },
        {
            id: 75,
            name: "违法装载超限及危险品运输"
        },
        {
            id: 76,
            name: "违反交通信号"
        },
        {
            id: 77,
            name: "铁路道口或渡口"
        },
        {
            id: 78,
            name: "其他影响安全行为"
        },
        {
            id: 79,
            name: "其他违法行为"
        },
        {
            id: 81,
            name: "未设置道路安全设施"
        },
        {
            id: 82,
            name: "安全设施损坏、灭失"
        },
        {
            id: 83,
            name: "道路缺陷"
        },
        {
            id: 89,
            name: "其它道路原因"
        },
        {
            id: 90,
            name: "制动不当"
        },
        {
            id: 91,
            name: "转向不当"
        },
        {
            id: 92,
            name: "油门控制不当"
        },
        {
            id: 93,
            name: "其他操作不当"
        },
        {
            id: 94,
            name: "自然灾害"
        },
        {
            id: 95,
            name: "机件故障"
        },
        {
            id: 96,
            name: "爆胎"
        },
        {
            id: 97,
            name: "其他意外"
        },
        {
            id: 99,
            name: "其他"
        }
    ],
    // 机动车辆状态代码
    vehicleCondition: [{
            id: "A",
            name: "正常"
        },
        {
            id: "B",
            name: "转出"
        },
        {
            id: "C",
            name: "被盗抢"
        },
        {
            id: "D",
            name: "停驶"
        },
        {
            id: "E",
            name: "注销"
        },
        {
            id: "F",
            name: "违法未处理"
        },
        {
            id: "G",
            name: "海关监管"
        },
        {
            id: "H",
            name: "事故未处理"
        },
        {
            id: "I",
            name: "嫌疑车"
        },
        {
            id: "J",
            name: "查封"
        },
        {
            id: "K",
            name: "暂扣"
        },
        {
            id: "M",
            name: "强制注销"
        },
        {
            id: "N",
            name: "事故逃逸"
        },
        {
            id: "O",
            name: "锁定"
        }
    ],
    // 机动车所有权
    Ownership: [{
            id: 1,
            name: "单位"
        },
        {
            id: 2,
            name: "个人"
        }
    ],
    // 机动车获得方式
    getWay: [{
            id: "A",
            name: "购买"
        },
        {
            id: "B",
            name: "赠予"
        },
        {
            id: "C",
            name: "继承"
        },
        {
            id: "D",
            name: "调解"
        },
        {
            id: "E",
            name: "调拨"
        },
        {
            id: "F",
            name: "协议抵偿债务"
        },
        {
            id: "G",
            name: "军转"
        },
        {
            id: "H",
            name: "仲裁裁决"
        },
        {
            id: "I",
            name: "资产重组"
        },
        {
            id: "J",
            name: "资产整体买卖"
        },
        {
            id: "K",
            name: "裁定"
        },
        {
            id: "L",
            name: "判决"
        },
        {
            id: "M",
            name: "境外自带"
        },
        {
            id: "N",
            name: "中奖"
        },
        {
            id: "O",
            name: "协议离婚"
        },
        {
            id: "Z",
            name: "其他"
        }

    ],
    // 机动车定期检验情况代码
    periodicInspect: [{
            id: 1,
            name: "合格"
        },
        {
            id: 2,
            name: "延期合格"
        },
        {
            id: 3,
            name: "委托检验"
        },
        {
            id: 4,
            name: "不合格"
        }
    ],
    // 机动车抵押标记
    mortgageCar: [{
            id: 0,
            name: "未抵押"
        },
        {
            id: 1,
            name: "已抵押"
        },
        {
            id: 2,
            name: "已质押"
        }
    ],
    // 道路物理隔离
    PhysicalIsolation: [{
            id: 1,
            name: "无隔离"
        },
        {
            id: 2,
            name: "中心隔离"
        },
        {
            id: 3,
            name: "机非隔离"
        },
        {
            id: 4,
            name: "中心隔离加机非隔离"
        }
    ],
    // 道路防护设施类型
    ProtectType: [{
            id: 1,
            name: "无防护"
        },
        {
            id: 10,
            name: "避险车道"
        },
        {
            id: 19,
            name: "其他"
        },
        {
            id: 2,
            name: "行道树"
        },
        {
            id: 3,
            name: "绿化带"
        },
        {
            id: 4,
            name: "混凝土护拦"
        },
        {
            id: 5,
            name: "防护墩(柱)"
        },
        {
            id: 6,
            name: "波形护拦"
        },
        {
            id: 7,
            name: "金属护拦"
        },
        {
            id: 8,
            name: "柔性护拦"
        },
        {
            id: 9,
            name: "缓冲物"
        }
    ],
    // 中央隔离设施
    centralIsolation: [{
            id: 1,
            name: "绿化带"
        },
        {
            id: 2,
            name: "混凝土护拦"
        },
        {
            id: 3,
            name: "波形护拦"
        },
        {
            id: 4,
            name: "金属护拦"
        },
        {
            id: 5,
            name: "柔性护拦"
        },
        {
            id: 6,
            name: "活动护栏"
        },
        {
            id: 7,
            name: "隔离墩(柱)"
        }
    ],
    // 事故认定原因
    reason: [{
            id: 1001,
            name: "驾驶拼装的机动车上道路行驶的"
        },
        {
            id: 1002,
            name: "驾驶已达报废标准的车辆上道路行驶的"
        },
        {
            id: 1003,
            name: "肇事逃逸，构成犯罪"
        },
        {
            id: 1004,
            name: "重大事故，构成犯罪"
        },
        {
            id: 1005,
            name: "未取得驾驶证驾驶机动车的"
        },
        {
            id: 1006,
            name: "驾驶证被吊销期间驾驶机动车的"
        },
        {
            id: 1007,
            name: "把机动车交给未取得机动车驾驶证的人驾驶的 "
        },
        {
            id: 1008,
            name: "把机动车交给机动车驾驶证被吊销的人驾驶的 "
        },
        {
            id: 1009,
            name: "把机动车交给机动车驾驶证被暂扣的人驾驶的"
        },
        {
            id: 1010,
            name: "驾驶人在驾驶证超过有效期仍驾驶机动车的"
        },
        {
            id: 1011,
            name: "非法安装警报器"
        },
        {
            id: 1012,
            name: "非法安装标志灯具"
        },
        {
            id: 1013,
            name: "驾驶证丢失期间仍驾驶机动车的"
        },
        {
            id: 1014,
            name: "驾驶证损毁期间仍驾驶机动车的"
        },
        {
            id: 1015,
            name: "驾驶证被依法扣留期间仍驾驶机动车的"
        },
        {
            id: 1016,
            name: "违法记分达到12分仍驾驶机动车的"
        },
        {
            id: 1017,
            name: "无第三者责任保险"
        },
        {
            id: 1018,
            name: "机动车不在机动车道内行驶的"
        },
        {
            id: 1019,
            name: "机动车违反规定使用专用车道的"
        },
        {
            id: 1020,
            name: "机动车驾驶人不服从交警指挥的"
        },
        {
            id: 1021,
            name: "遇前方机动车停车排队等候或者缓慢行驶时，从前方车辆两侧穿插行驶的"
        },
        {
            id: 1022,
            name: "遇前方机动车停车排队等候或者缓慢行驶时，从前方车辆两侧超越行驶的"
        },
        {
            id: 1023,
            name: "遇前方机动车停车排队等候或者缓慢行驶时，未依次交替驶入车道减少后的路口、路段的"
        },
        {
            id: 1024,
            name: "在没有交通信号灯、交通标志、交通标线或者交警指挥的交叉路口遇到停车排队等候或者缓慢行驶时，机动车未依次交替通行的"
        },
        {
            id: 1025,
            name: "遇前方机动车停车排队等候或者缓慢行驶时，在人行横道、网状线区域内停车等候的"
        },
        {
            id: 1026,
            name: "行经铁路道口，不按规定通行的 "
        },
        {
            id: 1031,
            name: "运载危险物品未经批准的"
        },
        {
            id: 1035,
            name: "客运机动车违反规定载货的"
        },
        {
            id: 1036,
            name: "货运机动车违反规定载人的"
        },
        {
            id: 1037,
            name: "未将故障车辆移到不妨碍交通的地方停放的"
        },
        {
            id: 1038,
            name: "不避让正在作业的道路养护车、工程作业车的"
        },
        {
            id: 1039,
            name: "机动车违反规定停放、临时停车且驾驶人不在现场或驾驶人虽在现场拒绝立即驶离，妨碍其它车辆、行人通行的"
        },
        {
            id: 1040,
            name: "机动车喷涂、粘贴标识或者车身广告影响安全驾驶的"
        },
        {
            id: 1041,
            name: "道路养护施工作业车辆、机械作业时未开启示警灯和危险报警闪光灯的"
        },
        {
            id: 1042,
            name: "机动车不按规定车道行驶的"
        },
        {
            id: 1043,
            name: "变更车道时影响正常行驶的机动车的"
        },
        {
            id: 1044,
            name: "在禁止掉头或者禁止左转弯标志、标线的地点掉头的"
        },
        {
            id: 1045,
            name: "在容易发生危险的路段掉头的"
        },
        {
            id: 1046,
            name: "掉头时妨碍正常行驶的车辆和行人通行的"
        },
        {
            id: 1047,
            name: "机动车未按规定鸣喇叭示意的"
        },
        {
            id: 1048,
            name: "在禁止鸣喇叭的区域或者路段鸣喇叭的"
        },
        {
            id: 1049,
            name: "在机动车驾驶室的前后窗范围内悬挂、放置妨碍驾驶人视线的物品的"
        },
        {
            id: 1050,
            name: "机动车行经漫水路或漫水桥时未低速通过的"
        },
        {
            id: 1051,
            name: "机动车载运超限物品行经铁路道口时不按指定的道口、时间通过的"
        },
        {
            id: 1052,
            name: "机动车载运超限物品行经铁路道口时不按指定的时间通过的"
        },
        {
            id: 1053,
            name: "机动车行经渡口，不服从渡口管理人员指挥，不依次待渡的"
        },
        {
            id: 1054,
            name: "上下渡船时，不低速慢行的"
        },
        {
            id: 1055,
            name: "特种车辆违反规定使用警报器的"
        },
        {
            id: 1056,
            name: "特种车辆违反规定使用标志灯具的"
        },
        {
            id: 1057,
            name: "机动车在单位院内居民居住区内不低速行驶的"
        },
        {
            id: 1058,
            name: "机动车在单位院内居民居住区内不避让行人的"
        },
        {
            id: 1059,
            name: "驾驶摩托车手离车把的"
        },
        {
            id: 1060,
            name: "驾驶摩托车在车把上悬挂物品的"
        },
        {
            id: 1061,
            name: "拖拉机驶入大中城市中心城区内道路的"
        },
        {
            id: 1062,
            name: "拖拉机驶入其它禁止通行道路的"
        },
        {
            id: 1063,
            name: "拖拉机载人的"
        },
        {
            id: 1064,
            name: "拖拉机牵引多辆挂车的"
        },
        {
            id: 1065,
            name: "学习驾驶人不按指定路线上道路学习驾驶的"
        },
        {
            id: 1066,
            name: "学习驾驶人不按指定时间上道路学习驾驶的"
        },
        {
            id: 1067,
            name: "学习驾驶人使用非教练车上道路驾驶的"
        },
        {
            id: 1068,
            name: "学习驾驶人在教练不随车指导下上道路驾驶车辆的"
        },
        {
            id: 1069,
            name: "无关人员乘坐教练车"
        },
        {
            id: 1070,
            name: "实习期未放置实习标志"
        },
        {
            id: 1072,
            name: "驾驶安全设施不全的机动车的"
        },
        {
            id: 1073,
            name: "驾驶机件不符合技术标准的机动车的"
        },
        {
            id: 1074,
            name: "不按规定倒车的"
        },
        {
            id: 1075,
            name: "在车门、车厢没有关好时行车的"
        },
        {
            id: 1076,
            name: "机动车在没有划分机动车道、非机动车道和人行道的道路上，不在道路中间通行的"
        },
        {
            id: 1077,
            name: "驾驶机动车下陡坡时熄火、空档滑行的"
        },
        {
            id: 1078,
            name: "机动车违反交通管制规定强行通行，不听劝阻的"
        },
        {
            id: 1081,
            name: "连续驾驶机动车超过4小时未停车休息或停车休息时间少于20分钟的"
        },
        {
            id: 1082,
            name: "使用他人机动车驾驶证驾驶机动车的"
        },
        {
            id: 1083,
            name: "未按照规定安装侧面及后下部防护装置、粘贴车身反光标识"
        },
        {
            id: 1084,
            name: "未按规定时限办理变更登记"
        },
        {
            id: 1085,
            name: "未按规定时限办理转移登记"
        },
        {
            id: 1086,
            name: "未按照规定时限办理机动车转入"
        },
        {
            id: 1087,
            name: "擅自改变机动车外形和已登记的有关技术数据"
        },
        {
            id: 1088,
            name: "以欺骗、贿赂等不正当手段办理补、换领机动车登记证书、号牌、行驶证和检查合格标志等业务"
        },
        {
            id: 1089,
            name: "公路客运车辆违反规定载货的"
        },
        {
            id: 1090,
            name: "机动车违反警告标志指示的"
        },
        {
            id: 1091,
            name: "机动车违反警告标线指示的"
        },
        {
            id: 1092,
            name: "公路客运车辆以外的载客汽车违反规定载货的"
        },
        {
            id: 1093,
            name: "驾驶时观看电视的"
        },
        {
            id: 1094,
            name: "在同车道行驶中，不按规定与前车保持必要的安全距离的"
        },
        {
            id: 1095,
            name: "实习期内驾驶公共汽车的"
        },
        {
            id: 1096,
            name: "实习期内驾驶营运客车的"
        },
        {
            id: 1097,
            name: "实习期内驾驶执行任务的特种车辆的"
        },
        {
            id: 1098,
            name: "实习期内驾驶载有危险物品的机动车的"
        },
        {
            id: 1099,
            name: "实习期内驾驶的机动车牵引挂车的"
        },
        {
            id: 1101,
            name: "驾驶人未按规定使用安全带的"
        },
        {
            id: 1102,
            name: "不按规定使用灯光的"
        },
        {
            id: 1103,
            name: "不按规定会车的"
        },
        {
            id: 1108,
            name: "上道路行驶的机动车未放置保险标志的"
        },
        {
            id: 1109,
            name: "未随车携带行驶证的"
        },
        {
            id: 1110,
            name: "未随车携带驾驶证的"
        },
        {
            id: 1111,
            name: "机动车载货长度、宽度、高度超过规定的"
        },
        {
            id: 1115,
            name: "上道路行驶的机动车未放置检验合格标志的"
        },
        {
            id: 1201,
            name: "机动车载物超过核定载质量未达30%的"
        },
        {
            id: 1204,
            name: "行经人行横道，未减速行驶的"
        },
        {
            id: 1205,
            name: "遇行人正在通过人行横道时未停车让行的"
        },
        {
            id: 1206,
            name: "行经没有交通信号的道路时，遇行人横过道路未避让的"
        },
        {
            id: 1207,
            name: "驾驶摩托车时驾驶人未按规定戴安全头盔的"
        },
        {
            id: 1208,
            name: "机动车通过有灯控路口时，不按所需行进方向驶入导向车道的 "
        },
        {
            id: 1209,
            name: "左转弯时，未靠路口中心点左侧转弯的"
        },
        {
            id: 1210,
            name: "通过路口遇放行信号不依次通过的"
        },
        {
            id: 1211,
            name: "通过路口遇停止信号时，停在停止线以内或路口内的"
        },
        {
            id: 1212,
            name: "通过路口向右转弯遇同车道内有车等候放行信号时，不依次停车等候的"
        },
        {
            id: 1223,
            name: "驾驶时拨打接听手持电话的"
        },
        {
            id: 1225,
            name: "驾车时有其他妨碍安全行车的行为的"
        },
        {
            id: 1228,
            name: "路口遇有交通阻塞时未依次等候的"
        },
        {
            id: 1231,
            name: "机动车违反警告标志指示的 "
        },
        {
            id: 1232,
            name: "机动车违反警告标线指示的 "
        },
        {
            id: 1238,
            name: "机动车载人超过核定人数的"
        },
        {
            id: 1239,
            name: "运输剧毒化学品机动车超过核定载质量未达30％"
        },
        {
            id: 1241,
            name: "驾驶公路客运车辆以外的载客汽车载人超过核定人数未达20%"
        },
        {
            id: 1243,
            name: "遇前方机动车停车排队或者缓慢行驶时，借道超车或者占用对面车道、穿插等候车辆的"
        },
        {
            id: 1244,
            name: "在城市快速路上行驶时，驾驶人未按规定使用安全带的"
        },
        {
            id: 1301,
            name: "机动车逆向行驶的"
        },
        {
            id: 1302,
            name: "机动车不按交通信号灯规定通行的"
        },
        {
            id: 1303,
            name: "机动车行驶超过规定时速50%以下的"
        },
        {
            id: 1304,
            name: "从前车右侧超车的"
        },
        {
            id: 1305,
            name: "前车左转弯时超车的"
        },
        {
            id: 1306,
            name: "前车掉头时超车的"
        },
        {
            id: 1307,
            name: "前车超车时超车的"
        },
        {
            id: 1308,
            name: "与对面来车有会车可能时超车的"
        },
        {
            id: 1309,
            name: "超越执行紧急任务的警车、消防车、救护车、工程救险车的"
        },
        {
            id: 1310,
            name: "在铁路道口、路口、窄桥、弯道、陡坡、隧道、人行横道、交通流量大的路段等地点超车的"
        },
        {
            id: 1311,
            name: "车辆在道路上发生故障或事故后，妨碍交通又难以移动的，不按规定设置警告标志或未按规定使用警示灯光的"
        },
        {
            id: 1312,
            name: "准备进入环形路口不让已在路口内的机动车先行的"
        },
        {
            id: 1313,
            name: "转弯的机动车未让直行的车辆、行人先行的"
        },
        {
            id: 1314,
            name: "相对方向行驶的右转弯机动车不让左转弯车辆先行的"
        },
        {
            id: 1315,
            name: "机动车通过无灯控或交警指挥的路口，不按交通标志、标线指示让优先通行的一方先行的"
        },
        {
            id: 1316,
            name: "机动车通过无灯控、交警指挥、交通标志标线控制的路口，不让右方道路的来车先行的"
        },
        {
            id: 1317,
            name: "载货汽车牵引多辆挂车的"
        },
        {
            id: 1318,
            name: "半挂牵引车牵引多辆挂车的"
        },
        {
            id: 1319,
            name: "挂车的灯光信号、制动、连接、安全防护等装置不符合国家标准的"
        },
        {
            id: 1320,
            name: "小型载客汽车牵引旅居挂车以外的且总质量700千克以上挂车的"
        },
        {
            id: 1321,
            name: "挂车载人的"
        },
        {
            id: 1322,
            name: "载货汽车牵引挂车的载质量超过汽车本身的载质量的"
        },
        {
            id: 1323,
            name: "大型载客汽车牵引挂车的"
        },
        {
            id: 1324,
            name: "中型载客汽车牵引挂车的"
        },
        {
            id: 1325,
            name: "低速载货汽车牵引挂车的"
        },
        {
            id: 1326,
            name: "三轮机动车汽车牵引挂车的"
        },
        {
            id: 1327,
            name: "机动车在发生故障或事故后，不按规定使用灯光的"
        },
        {
            id: 1328,
            name: "驾驶机动车下陡坡时熄火、空档滑行的 "
        },
        {
            id: 1333,
            name: "不避让执行任务的特种车辆的"
        },
        {
            id: 1334,
            name: "机动车不避让盲人的"
        },
        {
            id: 1339,
            name: "运输剧毒化学品机动车超过规定时速50％以下的"
        },
        {
            id: 1340,
            name: "上道路行驶的机动车未按规定定期进行安全技术检验的"
        },
        {
            id: 1341,
            name: "驾驶公路客运车辆以外的载客汽车载人超过核定人数20%以上的"
        },
        {
            id: 1342,
            name: "机动车载物超过核定载质量30％的"
        },
        {
            id: 1343,
            name: "货运机动车违反规定载客的"
        },
        {
            id: 1344,
            name: "机动车违反禁令标志指示的"
        },
        {
            id: 1345,
            name: "机动车违反禁止标线指示的"
        },
        {
            id: 1346,
            name: "运输剧毒化学品机动车超过核定载质量30％的"
        },
        {
            id: 1347,
            name: "货运机动车驾驶室载人超过核定人数的"
        },
        {
            id: 1602,
            name: "机动车载物超过核定载质量30%的"
        },
        {
            id: 1603,
            name: "机动车行驶超过规定时速50%的"
        },
        {
            id: 1608,
            name: "运输剧毒化学品机动车超过核定载质量30％的"
        },
        {
            id: 1609,
            name: "运输剧毒化学品机动车超过规定时速50％的"
        },
        {
            id: 1610,
            name: "在驾驶证暂扣期间仍驾驶机动车的"
        },
        {
            id: 1611,
            name: "连续驾驶公路客运车辆超过4小时未停车休息或者停车休息时间少于20分钟的"
        },
        {
            id: 1612,
            name: "连续驾驶危险物品运输车辆超过4小时未停车休息或者停车休息时间少于20分钟的"
        },
        {
            id: 1613,
            name: "上道路行驶的机动车未悬挂机动车号牌的"
        },
        {
            id: 1614,
            name: "故意遮挡机动车号牌的"
        },
        {
            id: 1615,
            name: "故意污损机动车号牌的"
        },
        {
            id: 1616,
            name: "不按规定安装机动车号牌的"
        },
        {
            id: 1617,
            name: "运载危险物品时不按规定的时间、路线、速度行驶的"
        },
        {
            id: 1618,
            name: "运载危险物品时未悬挂警示标志的"
        },
        {
            id: 1619,
            name: "运载危险物品时未采取必要的安全措施的"
        },
        {
            id: 1621,
            name: "公路客运车辆载客超过核定载客人数未达20%的"
        },
        {
            id: 1622,
            name: "机动车在城市快速路上遇交通拥堵，占用应急车道行驶的"
        },
        {
            id: 1702,
            name: "醉酒后驾驶机动车的"
        },
        {
            id: 1703,
            name: "醉酒后驾驶营运机动车的"
        },
        {
            id: 1705,
            name: "肇事逃逸（财产损失）"
        },
        {
            id: 1707,
            name: "逾期3个月不缴纳罚款"
        },
        {
            id: 1708,
            name: "连续两次逾期未缴纳罚款"
        },
        {
            id: 1709,
            name: "驾驶与驾驶证载明的准驾车型不相符合的车辆的 "
        },
        {
            id: 1710,
            name: "公路客运车辆载客超过额定乘员20%的"
        },
        {
            id: 1711,
            name: "饮酒后驾驶营运机动车的"
        },
        {
            id: 1712,
            name: "饮酒后驾驶机动车的"
        },
        {
            id: 1713,
            name: "再次酒后驾车"
        },
        {
            id: 2001,
            name: "肇事逃逸，未犯罪"
        },
        {
            id: 2002,
            name: "非机动车违反交通管制的规定强行通行，不听劝阻的"
        },
        {
            id: 2003,
            name: "非机动车未依法登记，上道路行驶的"
        },
        {
            id: 2004,
            name: "非机动车逆向行驶的"
        },
        {
            id: 2005,
            name: "没有非机动车道的道路上，非机动车不靠车行道右侧行驶的"
        },
        {
            id: 2006,
            name: "非机动车违反规定使用其他车辆专用车道的"
        },
        {
            id: 2007,
            name: "非机动车不按照交通信号规定通行的"
        },
        {
            id: 2008,
            name: "非机动车驾驶人不服从交警指挥的"
        },
        {
            id: 2009,
            name: "非机动车未在非机动车道内行驶的"
        },
        {
            id: 2010,
            name: "醉酒驾驶、驾驭非机动车、畜力车的"
        },
        {
            id: 2011,
            name: "驾驶残疾人机动轮椅车超速行驶的"
        },
        {
            id: 2012,
            name: "驾驶电动自行车超速行驶的"
        },
        {
            id: 2013,
            name: "非机动车不按规定载物的"
        },
        {
            id: 2014,
            name: "非机动车不在规定地点停放的"
        },
        {
            id: 2015,
            name: "非机动车停放时妨碍其他车辆和行人通行的"
        },
        {
            id: 2016,
            name: "非机动车通过路口，转弯的非机动车不让直行的车辆、行人优先通行的"
        },
        {
            id: 2017,
            name: "非机动车通过路口，遇有前方路口交通阻塞时，强行进入的"
        },
        {
            id: 2018,
            name: "非机动车通过路口，向左转弯时，不靠路口中心点右侧转弯的"
        },
        {
            id: 2019,
            name: "非机动车遇停止信号时，停在停止线以内或路口内的"
        },
        {
            id: 2020,
            name: "非机动车向右转弯遇同车道内有车等候放行信号不能转弯时，不依次等候的 "
        },
        {
            id: 2021,
            name: "行经无灯控或交警指挥的路口，不让标志、标线指示优先通行的一方先行的"
        },
        {
            id: 2022,
            name: "行经无灯控、交警指挥或标志、标线控制的路口，无交通标志标线，不让右方道路的来车先行的"
        },
        {
            id: 2023,
            name: "行经无灯控或交警指挥的路口，右转弯的非机动车不让左转弯的车辆先行的"
        },
        {
            id: 2024,
            name: "驾驶自行车、电动自行车、三轮车在路段上横过机动车道时不下车推行的"
        },
        {
            id: 2025,
            name: "有人行横道时，非机动车不从人行横道横过机动车道的"
        },
        {
            id: 2026,
            name: "有行人过街设施时，非机动车不从行人过街设施横过机动车道的"
        },
        {
            id: 2027,
            name: "非机动车借道行驶后不迅速驶回非机动车道的"
        },
        {
            id: 2028,
            name: "非机动车转弯时未减速慢行，伸手示意，突然猛拐的"
        },
        {
            id: 2029,
            name: "非机动车超车时妨碍被超越的车辆行驶的"
        },
        {
            id: 2030,
            name: "驾驶非机动车牵引车辆的"
        },
        {
            id: 2031,
            name: "驾驶非机动车攀扶车辆的"
        },
        {
            id: 2032,
            name: "非机动车被其他车辆牵引的"
        },
        {
            id: 2033,
            name: "驾驶非机动车时双手离把的"
        },
        {
            id: 2034,
            name: "驾驶非机动车时手中持物的"
        },
        {
            id: 2035,
            name: "驾驶非机动车时扶身并行的"
        },
        {
            id: 2036,
            name: "驾驶非机动车时互相追逐的"
        },
        {
            id: 2037,
            name: "驾驶非机动车时曲折竟驶的"
        },
        {
            id: 2038,
            name: "在道路上骑独轮自行车的"
        },
        {
            id: 2039,
            name: "在道路上骑2人以上骑行的自行车的"
        },
        {
            id: 2040,
            name: "非下肢残疾的人驾驶残疾人机动轮椅车的"
        },
        {
            id: 2041,
            name: "自行车加装动力装置的"
        },
        {
            id: 2042,
            name: "三轮车加装动力装置的"
        },
        {
            id: 2043,
            name: "在道路上学习驾驶非机动车的"
        },
        {
            id: 2044,
            name: "非机动车不避让盲人的"
        },
        {
            id: 2045,
            name: "驾驭畜力车横过道路时，驾驭人未下车牵引牲畜的"
        },
        {
            id: 2046,
            name: "畜力车并行的"
        },
        {
            id: 2047,
            name: "驾驶畜力车时驾驭人离开车辆的"
        },
        {
            id: 2048,
            name: "驾驶畜力车时在容易发生危险的路段超车的"
        },
        {
            id: 2049,
            name: "驾驶两轮畜力车不下车牵引牲畜的"
        },
        {
            id: 2050,
            name: "使用未经驯服的牲畜驾车的"
        },
        {
            id: 2051,
            name: "随车幼畜未栓系的"
        },
        {
            id: 2052,
            name: "停放畜力车时未拉紧车闸的"
        },
        {
            id: 2053,
            name: "停放畜力车时未栓系牲畜的"
        },
        {
            id: 2054,
            name: "未满12周岁驾驶自行车、三轮车的"
        },
        {
            id: 2055,
            name: "未满16周岁驾驶、驾驭电动自行车、残疾人机动轮椅、畜力车的"
        },
        {
            id: 3001,
            name: "行人违反交通信号通行的"
        },
        {
            id: 3002,
            name: "行人不服从交警指挥的"
        },
        {
            id: 3003,
            name: "行人不在人行道内行走的"
        },
        {
            id: 3004,
            name: "行人在没有划分机动车道、非机动车道和人行道的道路上，不靠路边行走的"
        },
        {
            id: 3005,
            name: "行人横过道路未走人行横道或过街设施的"
        },
        {
            id: 3006,
            name: "行人跨越道路隔离设施的"
        },
        {
            id: 3007,
            name: "行人倚坐道路隔离设施的"
        },
        {
            id: 3008,
            name: "行人扒车的"
        },
        {
            id: 3009,
            name: "行人强行拦车的"
        },
        {
            id: 3010,
            name: "行人实施其他妨碍交通安全的行为的"
        },
        {
            id: 3011,
            name: "学龄前儿童以及不能辨认或不能控制自己行为的精神疾病患者、智力障碍者在道路上通行时，没有其监护人或对其负有管理职责的人带领的"
        },
        {
            id: 3012,
            name: "盲人在道路上通行，未使用导盲手段的"
        },
        {
            id: 3013,
            name: "行人不按规定通过铁路道口的"
        },
        {
            id: 3014,
            name: "在道路上使用滑行工具的"
        },
        {
            id: 3015,
            name: "行人在车行道内坐卧、停留、嬉闹的"
        },
        {
            id: 3016,
            name: "行人有追车、抛物击车等妨碍道路交通安全的行为的"
        },
        {
            id: 3017,
            name: "行人不按规定横过机动车道的"
        },
        {
            id: 3018,
            name: "行人列队在道路上通行时每横列超过2人的"
        },
        {
            id: 3019,
            name: "机动车行驶时，乘坐人员未按规定使用安全带的"
        },
        {
            id: 3020,
            name: "乘坐摩托车不戴安全头盔的"
        },
        {
            id: 3021,
            name: "乘车人携带易燃、易爆等危险物品的"
        },
        {
            id: 3022,
            name: "乘车人向车外抛洒物品的"
        },
        {
            id: 3023,
            name: "乘车人有影响驾驶人安全驾驶的行为的"
        },
        {
            id: 3024,
            name: "在机动车道上拦乘机动车的"
        },
        {
            id: 3025,
            name: "在机动车道上从机动车左侧上下车的"
        },
        {
            id: 3026,
            name: "开关车门妨碍其他车辆和行人通行的"
        },
        {
            id: 3027,
            name: "机动车行驶中乘坐人员干扰驾驶的"
        },
        {
            id: 3028,
            name: "机动车行驶中乘坐人员将身体任何部分伸出车外的"
        },
        {
            id: 3029,
            name: "乘车人在机动车行驶中跳车的"
        },
        {
            id: 3030,
            name: "乘坐两轮摩托车未正向骑坐的"
        },
        {
            id: 4001,
            name: "行人进入高速公路的"
        },
        {
            id: 4002,
            name: "拖拉机驶入高速公路的"
        },
        {
            id: 4003,
            name: "非机动车进入高速公路的"
        },
        {
            id: 4004,
            name: "在高速公路上车辆发生故障或事故后，车上人员未迅速转移到右侧路肩上或者应急车道内的"
        },
        {
            id: 4005,
            name: "机动车从匝道进入或驶离高速公路时不按规定使用灯光的"
        },
        {
            id: 4006,
            name: "机动车从匝道进入高速公路时妨碍已在高速公路内的机动车正常行驶的"
        },
        {
            id: 4007,
            name: "在高速公路的路肩上行驶的"
        },
        {
            id: 4008,
            name: "非紧急情况下在高速公路应急车道上行驶的"
        },
        {
            id: 4009,
            name: "机动车在高速公路上通过施工作业路段，不减速行驶的"
        },
        {
            id: 4010,
            name: "在高速公路上骑、轧车行道分界线的"
        },
        {
            id: 4011,
            name: "在高速公路上试车或学习驾驶机动车的"
        },
        {
            id: 4012,
            name: "在高速公路上违反规定拖曳故障车、肇事车的"
        },
        {
            id: 4013,
            name: "低能见度气象条件下在高速公路上不按规定行驶的"
        },
        {
            id: 4014,
            name: "在高速公路上行驶的载货汽车车厢载人的"
        },
        {
            id: 4015,
            name: "在高速公路上行驶的两轮摩托车载人的"
        },
        {
            id: 4201,
            name: "在高速公路匝道上超车的 "
        },
        {
            id: 4202,
            name: "在高速公路加速车道上超车的"
        },
        {
            id: 4203,
            name: "在高速公路减速车道上超车的 "
        },
        {
            id: 4204,
            name: "在高速公路上行驶时，驾驶人未按规定使用安全带的"
        },
        {
            id: 4301,
            name: "驾驶设计最高时速低于70公里的机动车进入高速公路的"
        },
        {
            id: 4302,
            name: "机动车在高速公路上发生故障或交通事故后，驾驶人不按规定使用危险报警闪光灯的"
        },
        {
            id: 4303,
            name: "高速公路上车辆发生故障或交通事故后，不按规定设置警告标志的 "
        },
        {
            id: 4305,
            name: "在高速公路上超速不足50%的"
        },
        {
            id: 4306,
            name: "在高速公路上正常情况下以低于规定最低时速行驶的"
        },
        {
            id: 4311,
            name: "在高速公路上不按规定超车的"
        },
        {
            id: 4604,
            name: "在高速公路上的车道内停车的"
        },
        {
            id: 4605,
            name: "非紧急情况下在高速公路应急车道上停车的"
        },
        {
            id: 4607,
            name: "在高速公路行车道上停车的"
        },
        {
            id: 4608,
            name: "机动车在高速公路遇交通拥堵，占用应急车道行驶的"
        },
        {
            id: 4701,
            name: "在高速公路上倒车的"
        },
        {
            id: 4702,
            name: "在高速公路上逆行的"
        },
        {
            id: 4703,
            name: "在高速公路上穿越中央分隔带掉头的"
        },
        {
            id: 5001,
            name: "伪造、变造机动车登记证书"
        },
        {
            id: 5002,
            name: "伪造、变造机动车号牌"
        },
        {
            id: 5003,
            name: "伪造、变造机动车行驶证"
        },
        {
            id: 5004,
            name: "伪造、变造机动车检验合格标志"
        },
        {
            id: 5005,
            name: "伪造、变造机动车保险标志"
        },
        {
            id: 5006,
            name: "伪造、变造机动车驾驶证"
        },
        {
            id: 5007,
            name: "使用伪造、变造的机动车登记证书"
        },
        {
            id: 5010,
            name: "使用伪造、变造的机动车检验合格标志的"
        },
        {
            id: 5011,
            name: "使用伪造、变造的机动车保险标志的"
        },
        {
            id: 5013,
            name: "使用其他车辆的机动车登记证书"
        },
        {
            id: 5016,
            name: "使用其他车辆的机动车检验合格标志的"
        },
        {
            id: 5017,
            name: "使用其他车辆的机动车保险标志的"
        },
        {
            id: 5018,
            name: "强迫驾驶人违反交通安全法律、法规和安全驾驶要求驾驶机动车，造成交通事故但尚不构成犯罪的"
        },
        {
            id: 5019,
            name: "故意损毁交通设施，造成危害后果，尚不构成犯罪的"
        },
        {
            id: 5020,
            name: "故意移动交通设施，造成危害后果，尚不构成犯罪的"
        },
        {
            id: 5021,
            name: "故意涂改交通设施，造成危害后果，尚不构成犯罪的"
        },
        {
            id: 5022,
            name: "非法拦载机动车，不听劝阻，造成交通严重阻塞、较大财产损失的"
        },
        {
            id: 5023,
            name: "非法扣留机动车辆，不听劝阻，造成交通严重阻塞、较大财产损失的"
        },
        {
            id: 5024,
            name: "道路两侧及隔离带上种植物或设置广告牌、管线等，遮挡路灯、交通信号灯、交通标志，妨碍安全视距拒不排除障碍的"
        },
        {
            id: 5025,
            name: "道路两侧及隔离带上种植物或设置广告牌、管线等，遮挡路灯、交通信号灯、交通标志，妨碍安全视距的"
        },
        {
            id: 5026,
            name: "擅自挖掘道路影响交通安全的"
        },
        {
            id: 5027,
            name: "擅自占用道路施工影响交通安全的"
        },
        {
            id: 5028,
            name: "从事其他影响交通安全活动的"
        },
        {
            id: 5029,
            name: "出售报废机动车"
        },
        {
            id: 5030,
            name: "其他机动车喷涂特种车特定标志图案的"
        },
        {
            id: 5031,
            name: "生产拼装机动车"
        },
        {
            id: 5032,
            name: "生产擅自改装的机动车"
        },
        {
            id: 5033,
            name: "销售拼装机动车"
        },
        {
            id: 5034,
            name: "销售擅自改装的机动车"
        },
        {
            id: 5035,
            name: "服用国家管制的精神药品或麻醉药品仍继续驾驶的"
        },
        {
            id: 5036,
            name: "患有妨碍安全驾驶机动车的疾病仍继续驾驶的"
        },
        {
            id: 5037,
            name: "过度疲劳仍继续驾驶的"
        },
        {
            id: 5038,
            name: "未按规定喷涂放大的牌号的"
        },
        {
            id: 5039,
            name: "扣留驾驶证后不及时接受处理"
        },
        {
            id: 5040,
            name: "以欺骗、贿赂手段取得机动车牌证"
        },
        {
            id: 5041,
            name: "以欺骗、贿赂手段取得驾驶证"
        },
        {
            id: 5042,
            name: "达12分后逾期拒不接受考试"
        },
        {
            id: 5043,
            name: "车辆扣留后不及时接受处理"
        },
        {
            id: 5044,
            name: "技检机构出具虚假检验结果"
        },
        {
            id: 5045,
            name: "擅自停止使用停车场或改作他用的"
        },
        {
            id: 5046,
            name: "运输单位处罚后不改"
        },
        {
            id: 5047,
            name: "擅自改号"
        },
        {
            id: 5048,
            name: "未经许可，占用道路从事非交通活动的"
        },
        {
            id: 5049,
            name: "年内醉洒驾车被处罚两次以上"
        },
        {
            id: 5603,
            name: "以隐瞒、欺骗手段补领机动车驾驶证的"
        },
        {
            id: 5701,
            name: "使用伪造、变造的机动车号牌的"
        },
        {
            id: 5702,
            name: "使用伪造、变造的机动车行驶证的"
        },
        {
            id: 5703,
            name: "使用伪造、变造的机动车驾驶证的"
        },
        {
            id: 5704,
            name: "使用其他车辆的机动车号牌的"
        },
        {
            id: 5705,
            name: "使用其他车辆的机动车行驶证的"
        },
        {
            id: 5981,
            name: "未设置道路安全设施"
        },
        {
            id: 5982,
            name: "安全设施损坏、灭失"
        },
        {
            id: 5983,
            name: "道路缺陷"
        },
        {
            id: 5989,
            name: "其它道路原因"
        },
        {
            id: 6001,
            name: "牵引故障机动车时，被牵引的机动车除驾驶人外载人的"
        },
        {
            id: 6002,
            name: "牵引故障机动车时，被牵引的机动车拖带挂车的"
        },
        {
            id: 6003,
            name: "牵引故障机动车时，被牵引的机动车宽度大于牵引的机动车的"
        },
        {
            id: 6004,
            name: "使用软连接装置牵引故障机动车时，牵引车与被牵引车之间未保持安全距离的"
        },
        {
            id: 6005,
            name: "牵引制动失效的被牵引车，未使用硬连接牵引装置的"
        },
        {
            id: 6006,
            name: "使用汽车吊车牵引车辆的"
        },
        {
            id: 6007,
            name: "使用轮式专用机械牵引车辆的"
        },
        {
            id: 6008,
            name: "使用摩托车牵引车辆的"
        },
        {
            id: 6009,
            name: "牵引摩托车的"
        },
        {
            id: 6010,
            name: "未使用专用清障车拖曳转向或照明、信号装置失效的机动车的"
        },
        {
            id: 6011,
            name: "在高速公路或城市快速路以外的道路上行驶时，驾驶人未按规定使用安全带的"
        },
        {
            id: 6012,
            name: "摩托车后座乘坐不满十二周岁未成年人的"
        },
        {
            id: 6013,
            name: "驾驶轻便摩托车载人的"
        },
        {
            id: 6014,
            name: "机动车载物行驶时遗洒、飘散载运物的"
        },
        {
            id: 6015,
            name: "运载超限物品时不按规定的时间、路线、速度行驶的"
        },
        {
            id: 6016,
            name: "运载超限物品时未悬挂明显标志的"
        },
        {
            id: 6017,
            name: "驾驶载客汽车以外的其他机动车载人超过核定人数的"
        },
        {
            id: 6018,
            name: "补领机动车驾驶证后，继续使用原机动车驾驶证的"
        },
        {
            id: 9001,
            name: "制动不当"
        },
        {
            id: 9002,
            name: "转向不当"
        },
        {
            id: 9003,
            name: "油门控制不当"
        },
        {
            id: 9009,
            name: "其他操作不当"
        },
        {
            id: 9101,
            name: "自然灾害"
        },
        {
            id: 9102,
            name: "机件故障"
        },
        {
            id: 9103,
            name: "爆胎"
        },
        {
            id: 9109,
            name: "其他意外"
        },
        {
            id: 9901,
            name: "其他"
        }
    ],
    // 认定原因分类
    reasonClass: [{
            id: 11,
            name: "不按规定使用灯光"
        },
        {
            id: 12,
            name: "超速行驶"
        },
        {
            id: 13,
            name: "酒后驾驶"
        },
        {
            id: 14,
            name: "逆行"
        },
        {
            id: 15,
            name: "疲劳驾驶"
        },
        {
            id: 18,
            name: "违法变更车道"
        },
        {
            id: 19,
            name: "违法超车"
        },
        {
            id: 20,
            name: "违法倒车"
        },
        {
            id: 21,
            name: "违法掉头"
        },
        {
            id: 22,
            name: "违法会车"
        },
        {
            id: 23,
            name: "违法牵引"
        },
        {
            id: 24,
            name: "违法抢行"
        },
        {
            id: 25,
            name: "违法上道路行驶"
        },
        {
            id: 26,
            name: "违法停车"
        },
        {
            id: 27,
            name: "违法占道行驶"
        },
        {
            id: 28,
            name: "违法装载"
        },
        {
            id: 29,
            name: "违法装载超限及危险品运输"
        },
        {
            id: 31,
            name: "违反交通信号"
        },
        {
            id: 32,
            name: "未按规定让行"
        },
        {
            id: 33,
            name: "无证驾驶"
        },
        {
            id: 41,
            name: "铁路道口或渡口"
        },
        {
            id: 49,
            name: "其他影响安全行为"
        },
        {
            id: 51,
            name: "超速行驶"
        },
        {
            id: 52,
            name: "酒后驾驶(非)"
        },
        {
            id: 53,
            name: "逆行(非)"
        },
        {
            id: 55,
            name: "违法超车(非)"
        },
        {
            id: 56,
            name: "违法牵引(非)"
        },
        {
            id: 57,
            name: "违法抢行(非)"
        },
        {
            id: 58,
            name: "违法上道路行驶(非)"
        },
        {
            id: 59,
            name: "违法停车(非)"
        },
        {
            id: 60,
            name: "违法占道行驶(非)"
        },
        {
            id: 61,
            name: "违法装载(非)"
        },
        {
            id: 62,
            name: "违反交通信号(非)"
        },
        {
            id: 63,
            name: "未按规定让行(非)"
        },
        {
            id: 64,
            name: "无证驾驶(非)"
        },
        {
            id: 69,
            name: "其他影响安全行为(非)"
        },
        {
            id: 73,
            name: "违法上道路行驶(行人)"
        },
        {
            id: 74,
            name: "违法占道"
        },
        {
            id: 75,
            name: "违法装载超限及危险品运输(行人)"
        },
        {
            id: 76,
            name: "违反交通信号(行人)"
        },
        {
            id: 77,
            name: "铁路道口或渡口(行人)"
        },
        {
            id: 78,
            name: "其他影响安全行为(行人)"
        },
        {
            id: 79,
            name: "其他违法行为"
        },
        {
            id: 81,
            name: "未设置道路安全设施"
        },
        {
            id: 82,
            name: "安全设施损坏、灭失"
        },
        {
            id: 83,
            name: "道路缺陷"
        },
        {
            id: 89,
            name: "其它道路原因"
        },
        {
            id: 90,
            name: "制动不当"
        },
        {
            id: 91,
            name: "转向不当"
        },
        {
            id: 92,
            name: "油门控制不当"
        },
        {
            id: 93,
            name: "其他操作不当"
        },
        {
            id: 94,
            name: "自然灾害"
        },
        {
            id: 95,
            name: "机件故障"
        },
        {
            id: 96,
            name: "爆胎"
        },
        {
            id: 97,
            name: "其他意外"
        },
        {
            id: 99,
            name: "其他"
        }
    ],
    // 路面结构
    roadStructure: [{
            id: 1,
            name: "沥青"
        },
        {
            id: 2,
            name: "水泥"
        },
        {
            id: 3,
            name: "沙石"
        },
        {
            id: 4,
            name: "土路"
        },
        {
            id: 9,
            name: "其它"
        }
    ],
    // 文化程度
    cultureLevel: [{
            id: 10,
            name: "研究生在读"
        },
        {
            id: 11,
            name: "研究生毕业"
        },
        {
            id: 19,
            name: "研究生肄业"
        },
        {
            id: 20,
            name: "上大学"
        },
        {
            id: 21,
            name: "大学毕业"
        },
        {
            id: 28,
            name: "相当大学毕业"
        },
        {
            id: 29,
            name: "大学肄业"
        },
        {
            id: 30,
            name: "上大专"
        },
        {
            id: 31,
            name: "专科毕业"
        },
        {
            id: 38,
            name: "相当专科毕业"
        },
        {
            id: 39,
            name: "专科肄业"
        },
        {
            id: 40,
            name: "上中专或中技"
        },
        {
            id: 41,
            name: "中专毕业"
        },
        {
            id: 42,
            name: "中技毕业"
        },
        {
            id: 48,
            name: "相当中专毕业"
        },
        {
            id: 49,
            name: "中专中技肄业"
        },
        {
            id: 50,
            name: "上技工学校"
        },
        {
            id: 51,
            name: "技工学校毕业"
        },
        {
            id: 59,
            name: "技工学校肄业"
        },
        {
            id: 60,
            name: "上高中"
        },
        {
            id: 61,
            name: "高中毕业"
        },
        {
            id: 62,
            name: "职业高中毕业"
        },
        {
            id: 63,
            name: "农业高中毕业"
        },
        {
            id: 68,
            name: "相当高中毕业"
        },
        {
            id: 69,
            name: "高中肄业"
        },
        {
            id: 70,
            name: "上初中"
        },
        {
            id: 71,
            name: "初中毕业"
        },
        {
            id: 72,
            name: "职业初中毕业"
        },
        {
            id: 73,
            name: "农业初中毕业"
        },
        {
            id: 78,
            name: "相当初中毕业"
        },
        {
            id: 79,
            name: "初中肄业"
        },
        {
            id: 80,
            name: "上小学"
        },
        {
            id: 81,
            name: "小学毕业"
        },
        {
            id: 88,
            name: "相当小学毕业"
        },
        {
            id: 89,
            name: "小学肄业"
        },
        {
            id: 90,
            name: "文盲或半文盲"
        },
        {
            id: 91,
            name: "从未上过学"
        },
        {
            id: 92,
            name: "学龄前儿童"
        }
    ],
    roadTyp2: [{
            id: "10",
            name: "高速"
        },
        {
            id: "11",
            name: "一级"
        },
        {
            id: "12",
            name: "二级"
        },
        {
            id: "13",
            name: "三级"
        },
        {
            id: "14",
            name: "四级"
        },
        {
            id: "19",
            name: "等外"
        },
        {
            id: "21",
            name: "城市快速路"
        },
        {
            id: "22",
            name: "一般城市道路"
        },
        {
            id: "25",
            name: "单位小区自建路"
        },
        {
            id: "26",
            name: "公共停车场"
        },
        {
            id: "27",
            name: "公共广场"
        },
        {
            id: "29",
            name: "其他路"
        }
    ],
    // 道路类型
    roadTyp: [{
            id: "0",
            name: "高速"
        },
        {
            id: "1",
            name: "国道"
        },
        {
            id: "2",
            name: "省道"
        },
        {
            id: "3",
            name: "县道"
        },
        {
            id: "4",
            name: "乡村道"
        },
        {
            id: "5",
            name: "城市快速路"
        },
        {
            id: "6",
            name: "城市主干道"
        },
        {
            id: "7",
            name: "城市次干道"
        },
        {
            id: "8",
            name: "城市支路"
        },
        {
            id: "9",
            name: "其他道路"
        },
        {
            id: "A",
            name: "单位小区自建路"
        },
        {
            id: "B",
            name: "公共停车场"
        },
        {
            id: "C",
            name: "公共广场"
        }
    ],
    // 路口路段类型
    crossRodeType: [{
            id: 11,
            name: "三支分叉口"
        },
        {
            id: 12,
            name: "四支分叉口"
        },
        {
            id: 13,
            name: "多支分叉口"
        },
        {
            id: 14,
            name: "环形交叉口"
        },
        {
            id: 15,
            name: "匝道口"
        },
        {
            id: 21,
            name: "普通路段"
        },
        {
            id: 22,
            name: "高架路段"
        },
        {
            id: 23,
            name: "变窄路段"
        },
        {
            id: 24,
            name: "窄路"
        },
        {
            id: 25,
            name: "桥梁"
        },
        {
            id: 26,
            name: "隧道"
        },
        {
            id: 27,
            name: "路段进出处"
        },
        {
            id: 28,
            name: "路侧险要路段"
        },
        {
            id: 29,
            name: "其他特殊路段"
        }
        // { id: 16, name: "铁路平交道口" },
        // { id: 19, name: "其他路口" },
        // { id: 21, name: "普通路段" },
        // { id: 22, name: "高架路段" },
        // { id: 23, name: "变窄路段" },
        // { id: 24, name: "窄路" },
        // { id: 25, name: "桥梁" },
        // { id: 26, name: "隧道" },
        // { id: 27, name: "路段进出处" },
        // { id: 28, name: "临时路段" },
        // { id: 29, name: "临崖路段" },
        // { id: 30, name: "其他路侧险要路段" },
        // { id: 31, name: "匝道" },
        // { id: 39, name: "其他路段" }
    ],
    // 事故类型
    accidentType: [{
            id: 0,
            name: "无"
        },
        {
            id: 1,
            name: "死亡事故"
        },
        {
            id: 2,
            name: "伤亡事故"
        },
        {
            id: 3,
            name: "财产损失事故"
        },
        {
            id: 4,
            name: "简易程序事故"
        }
    ],
    // 车身颜色对应
    vehicleColor: [{
            id: "red",
            name: "红"
        },
        {
            id: "black",
            name: "黑"
        },
        {
            id: "sliver",
            name: "条纹"
        },
        {
            id: "indigo",
            name: "靛蓝"
        },
        {
            id: "brown",
            name: "棕"
        },
        {
            id: "grey",
            name: "灰"
        },
        {
            id: "white",
            name: "白"
        },
        {
            id: "other_colors",
            name: "其他颜色"
        },
        {
            id: "yellow",
            name: "黄"
        },
        {
            id: "blue",
            name: "蓝"
        }
    ],
    // 车辆颜色
    vehicleColorT: [{
        id:"A",
        name:"白"
    }, {
        id:"B",
        name:"灰"   
    },{
        id:"C",
        name:"黄"   
    },{
        id:"D",
        name:"粉"   
    },{
        id:"E",
        name:"红"   
    },{
        id:"F",
        name:"紫"   
    },{
        id:"G",
        name:"绿"   
    },{
        id:"H",
        name:"蓝"   
    },{
        id:"I",
        name:"棕"   
    },{
        id:"J",
        name:"黑"   
    }],
    // 天气
    weather: [{
            id: "1",
            name: "晴"
        },
        {
            id: "2",
            name: "阴"
        },
        {
            id: "3",
            name: "雨"
        },
        {
            id: "4",
            name: "雪"
        },
        {
            id: "5",
            name: "雾"
        },
        {
            id: "6",
            name: "大风"
        },
        {
            id: "7",
            name: "沙尘"
        },
        {
            id: "8",
            name: "冰雹"
        },
        {
            id: "9",
            name: "其他"
        }
    ],
    // 交通信号方式
    trafficSingal: [{
            id: 1,
            name: "无信号"
        },
        {
            id: 2,
            name: "民警指挥"
        },
        {
            id: 3,
            name: "信号灯"
        },
        {
            id: 4,
            name: "标志"
        },
        {
            id: 5,
            name: "标线"
        },
        {
            id: 6,
            name: "其他安全设施"
        }
    ],
    // 能见度
    vidibility: [{
            id: 1,
            name: "50米以下"
        },
        {
            id: 2,
            name: "50-100米"
        },
        {
            id: 3,
            name: "100-200米"
        },
        {
            id: 4,
            name: "200米以上"
        }
    ],
    // 地形
    terrain: [{
            id: 1,
            name: "平丘"
        },
        {
            id: 2,
            name: "丘陵"
        },
        {
            id: 3,
            name: "山区"
        }
    ],
    // 星期
    dayNumberOfweek: [{
            id: 1,
            name: "星期一"
        },
        {
            id: 2,
            name: "星期二"
        },
        {
            id: 3,
            name: "星期三"
        },
        {
            id: 4,
            name: "星期四"
        },
        {
            id: 5,
            name: "星期五"
        },
        {
            id: 6,
            name: "星期六"
        },
        {
            id: 7,
            name: "星期天"
        }
    ],
    // 照明条件
    lightCon: [{
            id: 1,
            name: "白天"
        },
        {
            id: 2,
            name: "夜间有路灯照明"
        },
        {
            id: 3,
            name: "夜间无路灯照明"
        },
        {
            id: 4,
            name: "黎明"
        },
        {
            id: 5,
            name: "黄昏"
        }
    ],
    // 车辆间事故
    vehicleBetAccident: [{
            id: 1,
            name: "追尾碰撞"
        },
        {
            id: 2,
            name: "正面碰撞"
        },
        {
            id: 3,
            name: "侧面碰撞（同向）"
        },
        {
            id: 4,
            name: "侧面碰撞（对向）"
        },
        {
            id: 5,
            name: "侧面碰撞（直角）"
        },
        {
            id: 6,
            name: "侧面碰撞（角度不确定）"
        },
        {
            id: 7,
            name: "同向刮擦"
        },
        {
            id: 8,
            name: "对向刮擦"
        },
        {
            id: 9,
            name: "其他角度碰撞"
        }
    ],
    vehicleAccident: [{
            id: 11,
            name: "中央隔离设施"
        },
        {
            id: 12,
            name: "同向护栏"
        },
        {
            id: 13,
            name: "对向护栏"
        },
        {
            id: 14,
            name: "交通标识支撑物"
        },
        {
            id: 15,
            name: "缓冲物"
        },
        {
            id: 16,
            name: "直立的杆或路灯柱"
        },
        {
            id: 17,
            name: "树木"
        },
        {
            id: 18,
            name: "桥墩"
        },
        {
            id: 19,
            name: "隧道口挡墙"
        },
        {
            id: 20,
            name: "建筑物"
        },
        {
            id: 21,
            name: "山体"
        },
        {
            id: 29,
            name: "其他"
        },
        {
            id: 31,
            name: "动物"
        },
        {
            id: 32,
            name: "作业/维修设备"
        },
        {
            id: 39,
            name: "其他"
        }
    ],
    // 道路安全属性
    roadSafe: [{
            id: 1,
            name: "正常路段"
        },
        {
            id: 2,
            name: "已经治理但仍存在隐患路段"
        },
        {
            id: 3,
            name: "正在治理隐患路段"
        },
        {
            id: 4,
            name: "尚未治理隐患路段"
        }
    ],
    // 路面状况
    roadCondition: [{
            id: 1,
            name: "路面完好"
        },
        {
            id: 2,
            name: "施工"
        },
        {
            id: 3,
            name: "凹凸"
        },
        {
            id: 4,
            name: "塌陷"
        },
        {
            id: 5,
            name: "路障"
        },
        {
            id: 9,
            name: "其他"
        }
    ],
    // 路表情况
    routeCondition: [{
            id: 1,
            name: "干燥"
        },
        {
            id: 2,
            name: "潮湿"
        },
        {
            id: 3,
            name: "积水"
        },
        {
            id: 4,
            name: "漫水"
        },
        {
            id: 5,
            name: "冰雪"
        },
        {
            id: 6,
            name: "泥泞"
        },
        {
            id: 9,
            name: "其他"
        }
    ],
    roadCrossLoc: [{
            id: 1,
            name: "机动车道"
        },
        {
            id: 2,
            name: "非机动车道"
        },
        {
            id: 3,
            name: "机非混合道"
        },
        {
            id: 4,
            name: "人行道"
        },
        {
            id: 5,
            name: "人行横道"
        },
        {
            id: 6,
            name: "紧急停车带"
        },
        {
            id: 9,
            name: "其他"
        }
    ],
    // 车辆用途
    vehicleUse: [{
            id: "P1",
            name: "普通汽车"
        },
        {
            id: "W1",
            name: "剧毒危化品车"
        },
        {
            id: "W2",
            name: "易爆危化品车"
        },
        {
            id: "W9",
            name: "其它危化品车"
        },
        {
            id: "X1",
            name: "幼儿校车"
        },
        {
            id: "X2",
            name: "小学生校车"
        },
        {
            id: "X9",
            name: "其他校车"
        }
    ],
    // 驾驶证行政区划
    adminArea:[
        { id:"120101", name:"和平区" },
        { id:"120102", name:"河东区" },
        { id:"120103", name:"河西区" },
        { id:"120104", name:"南开区" },
        { id:"120105", name:"河北区" },
        { id:"120106", name:"红桥区" },
        { id:"120110", name:"东丽区" },
        { id:"120111", name:"西青区" },
        { id:"120112", name:"津南区" },
        { id:"120113", name:"北辰区" },
        { id:"120114", name:"武清区" },
        { id:"120115", name:"宝坻区" },
        { id:"120116", name:"滨海新区" },
        { id:"120221", name:"宁河县" },
        { id:"120223", name:"静海县" },
        { id:"120225", name:"蓟县" }
    ],
    // 同一方法名称
    functionList: {
        btn: {
            plain: true,
            size: "mini",
            type: "primary",
            loading: false
        },
        function: {
            button1: [{
                    enName: "save",
                    title: "创建",
                    functionName: "operationDariy"
                },
                {   enName: "update",
                    title: "批量AI配置",
                    functionName: "ifshowEvent:true",
                },
                {
                    enName: "start",
                    title: "批量启用",
                    functionName: "stopItAll:1"
                },
                {
                    enName: "stop",
                    title: "批量停用",
                    functionName: "stopItAll:0"
                },
                {
                    enName: "export",
                    title: "导出",
                    functionName: "export"
                },
                {
                    enName: "import",
                    title: "导入",
                    functionName: "import"
                },
                {
                    enName: "delete",
                    title: "批量删除",
                    functionName: "deleteAll:true"
                },{
                    enName: "update",
                    title: "路径规划",
                    functionName: "updateRoad"
                }
            ],
            button2: [{
                    enName: "update",
                    title: "编辑"
                },
                {
                    enName: "stop",
                    title: "关闭事件",
                    class: "erBtn"
                },
                {
                    title: "停用",
                    enName: "stop",
                    // class: "erBtn",
                    chang: {
                        status: 1,
                        changStop: ["停用", "erBtn"],
                        changStar: ["启用", "suBtn"]
                    }
                },
                {
                    enName: "select",
                    title: "查看"
                },
                {
                    enName: "select",
                    title: "详情"
                },
                {
                    enName: "delete",
                    title: "删除",
                    class: "erBtn"
                },
                {
                    enName: "update",
                    title: "AI配置"
                }

            ]
        }
    },
    // 后台返回状态
    codeStatus: [{
            code: -1,
            name: "系统错误"
        },
        {
            code: -3,
            name: "数据湖接口有问题"
        },
        {
            code: 0,
            name: "成功"
        },
        {
            code: 1,
            name: "数据重复"
        },
        {
            code: 2,
            name: "查询数据为空"
        },
        {
            code: 3,
            name: "非空验证不通过"
        },
        {
            code: 4,
            name: "参数验证不通过"
        },
        {
            code: 5,
            name: "存在关联数据，不能删除或停用此数据"
        },
        {
            code: 6,
            name: "重复"
        },
        {
            code: 7,
            name: "存在关联数据，不能修改或停用此数据"
        },
        {
            code: 8,
            name: "未经授权,您无权使用该权限"
        },
        {
            code: 9,
            name: "需要管理员进行该操作"
        },
        {
            code: 10,
            name: "该用户有管理员角色,无法删除或停用"
        },
        {
            code: 11,
            name: "数据正在使用,无法删除、编辑或者停用"
        },
        {
            code: 12,
            name: "该数据为停用状态"
        },
        {
            code: 13,
            name: "两次密码输入不一致"
        },
        {
            code: 14,
            name: "新旧密码重复"
        },
        {
            code: 15,
            name: "旧密码输入错误"
        },
        {
            code: 16,
            name: "数据已经删除，无法进行操作"
        },
        {
            code: 17,
            name: "非树状结构"
        },
        {
            code: 18,
            name: "不允许上传该文件类型"
        },
        {
            code: 19,
            name: "读取Excel文件失败,请重新检查"
        },
        {
            code: 20,
            name: "导入Excel数据的表头异常,需重新检查"
        },
        {
            code: 21,
            name: "数据库数据非法"
        },
        {
            code: 22,
            name: "不能创建同级单位的用户"
        },
        {
            code: 23,
            name: "单位管理只能分配只读权限"
        },
        {
            code: 24,
            name: "数据正在使用"
        },
        {
            code: 25,
            name: "时间段重复"
        },
        {
            code: 28,
            name: "您取消勾选的单位有启用的用户在使用该角色"
        },
        {
            code: 29,
            name: "路径规划中，请稍后修改"
        },
        {
            code: 151,
            name: "状态不统一（不是启用/停用）"
        },
        {
            code: 154,
            name: "父级单位被停用无法添加，请先启用父级单位"
        },
        {
            code: 155,
            name: "不是AI设备，不能设置启用停用AI状态"
        },
        {
            code: 152,
            name: "数据类型不存在"
        },
        {
            code: 305,
            name: "请登陆账号"
        },
        {
            code: 262,
            name: "用户名已存在"
        },
        {
            code: 263,
            name: "邮箱已存在"
        },
        {
            code: 150,
            name: "设备类型不能修改"
        },
        {
            code: 264,
            name: "手机号已存在"
        }
    ],
    // 对应状态
    statusList: [{
        name: 1,
        value: "正常"
    }, {
        name: 0,
        value: "异常"
    }],
    statusList2: [{
        name: 1,
        value: "启用"
    }, {
        name: 0,
        value: "停用"
    }, {
        name: 3,
        value: "--"
    }],
    statusList3: [{
        name: 1,
        value: "已完成"
    }, {
        name: 0,
        value: "未完成"
    }, {
        name: undefined,
        value: "未完成"
    }, {
        name: null,
        value: "未完成"
    }, {
        name: "NAN",
        value: "未完成"
    }],
    IsStatus: [{
        name: 1,
        value: "是"
    }, {
        name: 0,
        value: "否"
    }],
    // 所有设备类型
    equipmentType: [
        // id name(设备中文)；parent(所在页面)；enName(设备英文)；isOuter(是否内场设备);parentIndex(页面顺序，只要对应即可)
        // 交通控制
        {
            id: "000001-1",
            name: "信号灯",
            parent: "交通控制设施",
            enName: "signalLights",
            isOuter: "1",
            parentIndex: 1
        },
        {
            id: "000001-2",
            name: "信号机",
            parent: "交通控制设施",
            enName: "signalMachines",
            isOuter: "1",
            parentIndex: 1
        },
        // 交通信号方案
        {
            id: "000002-1",
            name: "信号配时",
            parent: "交通信号方案",
            enName: "matchTimes",
            isOuter: "1",
            parentIndex: 2
        },
        // 交通检测
        {
            id: "000003-1",
            name: "微波",
            parent: "交通检测设备",
            enName: "microwaves",
            isOuter: "1",
            parentIndex: 3
        },
        {
            id: "000003-2",
            name: "地磁",
            parent: "交通检测设备",
            enName: "geomagneticSensors",
            isOuter: "1",
            parentIndex: 3
        },
        {
            id: "000003-3",
            name: "视频检测",
            parent: "电警监控设备",
            enName: "geomagneticSensors",
            isOuter: "1",
            parentIndex: 4
        },
        // 电警监控设备
        {
            id: "000004-1",
            name: "电子警察",
            parent: "电警监控设备",
            enName: "electronicPolices",
            isOuter: "1",
            parentIndex: 4
        },
        {
            id: "000004-2",
            name: "卡口",
            parent: "电警监控设备",
            enName: "dimentions",
            isOuter: "1",
            parentIndex: 4
        },
        {
            id: "000004-3",
            name: "违停",
            parent: "电警监控设备",
            enName: "illegalParkings",
            isOuter: "1",
            parentIndex: 4
        },
        {
            id: "000004-4",
            name: "视频监控",
            parent: "电警监控设备",
            enName: "monitors",
            isOuter: "1",
            parentIndex: 4
        },
        // 交通诱导
        {
            id: "000005-1",
            name: "诱导屏",
            parent: "交通诱导设备",
            enName: "induceScreens",
            isOuter: "1",
            parentIndex: 5
        },
        // // 机房设备
        // {
        //     id: "000006-1",
        //     name: "服务器",
        //     parent: "机房设备",
        //     enName: "servers",
        //     isOuter: "0",
        //     parentIndex: 6
        // },
        // {
        //     id: "000006-2",
        //     name: "交换机",
        //     parent: "机房设备",
        //     enName: "interchangers",
        //     isOuter: "0",
        //     parentIndex: 6
        // },
        // {
        //     id: "000006-3",
        //     name: "硬盘存储",
        //     parent: "机房设备",
        //     enName: "hardDiskStorages",
        //     isOuter: "0",
        //     parentIndex: 6
        // },
        // {
        //     id: "000006-4",
        //     name: "校时服务器",
        //     parent: "机房设备",
        //     enName: "timeoutserver",
        //     isOuter: "0",
        //     parentIndex: 6
        // },
        // 交通安全设备
        {
            id: "000007-1",
            name: "标志",
            parent: "交通安全设备",
            enName: "symbols",
            isOuter: "1",
            parentIndex: 7
        },
        {
            id: "000007-2",
            name: "标线",
            parent: "交通安全设备",
            enName: "marks",
            isOuter: "1",
            parentIndex: 7
        },
        {
            id: "000007-3",
            name: "护栏",
            parent: "交通安全设备",
            enName: "fences",
            isOuter: "1",
            parentIndex: 7
        }
    ],
    equipmentType2: [
        // id name(设备中文)；parent(所在页面)；enName(设备英文)；isOuter(是否内场设备);parentIndex(页面顺序，只要对应即可)
        // 交通控制
        {
            id: "000001",
            parent: "交通控制设施",
            parentNmae: "trafficControlEquipment",
            equipmentTypeList: [{
                    url: "",
                    id: "000001-1",
                    name: "信号灯",
                    enName: "signalLight",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000001-2",
                    name: "信号机",
                    enName: "signalMachine",
                    isOuter: "1"
                }
            ]
        },
        // 交通信号方案
        {
            id: "000002",
            parent: "交通信号方案",
            parentNmae: "trafficSignalFacilities",
            equipmentTypeList: [{
                url: "",
                id: "000002-1",
                name: "信号配时",
                enName: "matchTime",
                isOuter: "1"
            }]
        },
        // 交通检测
        {
            id: "000003",
            parent: "交通检测设施",
            parentNmae: "trafficSignalFacilities",
            equipmentTypeList: [{
                    url: "",
                    id: "000003-1",
                    name: "微波",
                    enName: "microwave",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000003-2",
                    name: "地磁",
                    enName: "geomagneticSensor",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000003-3",
                    name: "视频检测",
                    enName: "monitorDetection",
                    isOuter: "1"
                }
            ]
        },
        // 电警监控设备
        {
            id: "000004",
            parent: "电警监控设施",
            parentNmae: "trafficSignalFacilities",
            equipmentTypeList: [{
                    url: "",
                    id: "000004-1",
                    name: "电子警察",
                    enName: "electronicPolice",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000004-2",
                    name: "卡口",
                    enName: "dimention",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000004-3",
                    name: "违停",
                    enName: "illegalParking",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000004-4",
                    name: "视频监控",
                    enName: "monitor",
                    isOuter: "1"
                }
            ]
        },
        // 交通诱导
        {
            id: "000005",
            parent: "交通诱导设施",
            parentNmae: "trafficSignalFacilities",
            equipmentTypeList: [{
                url: "",
                id: "000005-1",
                name: "诱导屏",
                enName: "induceScreen",
                isOuter: "1"
            }]
        },
        // 机房设备
        // {
        //     id: "000006",
        //     parent: "机房设施",
        //     parentNmae: "trafficSignalFacilities",
        //     equipmentTypeList: [
        //         { url: "", id: "000006-1", name: "服务器", enName: "servers", isOuter: "0" },
        //         { url: "", id: "000006-2", name: "交换机", enName: "interchangers", isOuter: "0" },
        //         { url: "", id: "000006-3", name: "硬盘存储", enName: "hardDiskStorages", isOuter: "0" },
        //         { url: "", id: "000006-4", name: "校时服务器", enName: "timeoutserver", isOuter: "0" }
        //     ]
        // },
        // 交通安全设备
        {
            id: "000007",
            parent: "交通安全设施",
            parentNmae: "trafficSignalFacilities",
            equipmentTypeList: [{
                    url: "",
                    id: "000007-1",
                    name: "标志",
                    enName: "symbol",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000007-2",
                    name: "标线",
                    enName: "mark",
                    isOuter: "1"
                },
                {
                    url: "",
                    id: "000007-3",
                    name: "护栏",
                    enName: "fence",
                    isOuter: "1"
                }
            ]
        }
    ],
    // 违法字典，违法行为，研判分析用的
    illegal: [{
            id: "1001",
            name: "驾驶拼装车"
        }, {
            id: "1002",
            name: "驾驶报废车"
        }, {
            id: "1003",
            name: "肇事逃逸，构成犯罪"
        }, {
            id: "1004",
            name: "重大犯罪，构成犯罪"
        }, {
            id: "10041",
            name: "饮酒或者醉酒驾驶机动车发生重大交通事故，构成犯罪"
        }, {
            id: "1005",
            name: "无证驾驶"
        }, {
            id: "1006",
            name: "驾驶证吊销后驾车"
        }, {
            id: "1007",
            name: "机动车交无证人驾驶"
        }, {
            id: "1008",
            name: "机动车交驾驶证吊销人驾驶"
        }, {
            id: "1009",
            name: "机动车交驾驶证暂扣人驾驶"
        }, {
            id: "1010",
            name: "驾驶证超过有效期后驾车"
        }, {
            id: "1011",
            name: "非法安装警报器"
        }, {
            id: "1012",
            name: "非法安装标志灯具"
        }, {
            id: "1013",
            name: "驾驶证丢失期间驾车"
        }, {
            id: "1014",
            name: "驾驶证损毁后驾车"
        }, {
            id: "1014",
            name: "驾驶证损毁后驾车"
        }, {
            id: "1015",
            name: "驾驶证扣留期间驾车"
        }, {
            id: "1016",
            name: "满12分仍驾车"
        }, {
            id: "1017",
            name: "无第三者责任保险"
        }, {
            id: "1018",
            name: "机动车不走机动车道"
        }, {
            id: "1019",
            name: "机动车违规使用专用车道"
        }, {
            id: "1020",
            name: "不服从指挥"
        }, {
            id: "1023",
            name: "交通拥堵处未依次交替行驶"
        }, {
            id: "1024",
            name: "无设施路口未依次交替行驶"
        }, {
            id: "1025",
            name: "交通拥堵处不按规定停车等候"
        }, {
            id: "1026",
            name: "铁路路口不按规定行驶"
        }, {
            id: "1031",
            name: "未经批准运载危险品"
        }, {
            id: "1035",
            name: "客运机动车违反规定载货"
        }, {
            id: "1036",
            name: "货车违规载人"
        }, {
            id: "1037",
            name: "故障车占道妨碍交通"
        }, {
            id: "1038",
            name: "不避让道路养护车、工程作业车"
        }, {
            id: "1039",
            name: "不按规定停车"
        }, {
            id: "1040",
            name: "机动车喷涂、粘贴标识或者车身广告影响安全驾驶"
        }, {
            id: "1041",
            name: "道路养护施工作业车辆、机械作业时未开启警告灯和危险报警闪光灯"
        }, {
            id: "1043",
            name: "变更车道影响其他车辆行驶"
        }, {
            id: "1044",
            name: "违反规定调头"
        }, {
            id: "1045",
            name: "危险路段调头"
        }, {
            id: "1046",
            name: "调头时妨碍车辆或者行驶通行"
        }, {
            id: "1047",
            name: "未按规定鸣喇叭示意"
        }, {
            id: "1048",
            name: "禁鸣区鸣喇叭"
        }, {
            id: "1049",
            name: "驾驶室放置物品妨碍安全"
        }, {
            id: "1050",
            name: "漫水路桥不低速行驶"
        }, {
            id: "1051",
            name: "超限车辆在铁道路口不按指定道口通过"
        }, {
            id: "1052",
            name: "超限车辆在铁道路口不按指定时间通过"
        }, {
            id: "1053",
            name: "渡口不按指挥依次待渡"
        }, {
            id: "1054",
            name: "上下渡船不低速行驶"
        }, {
            id: "1055",
            name: "特种车辆违规使用警报器"
        }, {
            id: "1056",
            name: "特种车辆违规使用标志灯具"
        }, {
            id: "1057",
            name: "机动车在单位院内居民居住区内不低速行驶"
        }, {
            id: "1058",
            name: "机动车在单位院内居民居住区内不避让行人"
        }, {
            id: "1059",
            name: "驾驶摩托车手离车把"
        }, {
            id: "1060",
            name: "摩托车车把上挂物"
        }, {
            id: "1061",
            name: "拖拉机进入中心区"
        }, {
            id: "1062",
            name: "拖拉机驶入禁行路"
        }, {
            id: "1063",
            name: "拖拉机载人"
        }, {
            id: "1064",
            name: "拖拉机牵引多辆挂车"
        }, {
            id: "10651",
            name: "不按指定路线学习驾驶"
        }, {
            id: "10661",
            name: "不按指定时间学习驾驶"
        }, {
            id: "10671",
            name: "学习驾驶时未使用符合规定机动车的"
        }, {
            id: "10681",
            name: "学习驾驶时没有教练员或者随车指导人员的"
        }, {
            id: "1069",
            name: "无关人员乘坐教练车"
        }, {
            id: "1072",
            name: "安全设施不全"
        }, {
            id: "1073",
            name: "机件不全"
        }, {
            id: "1074",
            name: "不按规定倒车的"
        }, {
            id: "1075",
            name: "在车门、车厢没有关好时行车的"
        }, {
            id: "1076",
            name: "机动车在没有划分机动车道、非机动车道和人行道的道路上，不在道路中间通行的"
        }, {
            id: "1077",
            name: "驾驶机动车下陡坡时熄火、空档滑行的"
        }, {
            id: "1078",
            name: "机动车违反交通管制规定强行通行，不听劝阻的"
        }, {
            id: "1082",
            name: "使用他人机动车驾驶证驾驶机动车的"
        }, {
            id: "1083",
            name: "未按照规定安装侧面及后下部防护装置、粘贴车身反光标识"
        }, {
            id: "1084",
            name: "未按规定时限办理变更登记"
        }, {
            id: "1085",
            name: "未按规定时限办理转移登记"
        }, {
            id: "1086",
            name: "未按照规定时限办理机动车转入"
        }, {
            id: "1087",
            name: "擅自改变机动车外形和已登记的有关技术数据"
        }, {
            id: "1088",
            name: "以欺骗、贿赂等不正当手段办理补、换领机动车登记证书、号牌、行驶证和检查合格标志等业务"
        }, {
            id: "1089",
            name: "客运车辆载货"
        }, {
            id: "1090",
            name: "违反警告标志指示"
        },
        {
            id: "1091",
            name: "违反警告标线指示"
        },
        {
            id: "1092",
            name: "公路客运车辆以外的载客汽车违反规定载货的"
        },
        {
            id: "1093",
            name: "驾车看电视"
        },
        {
            id: "1094",
            name: "不与前车保持安全距离"
        },
        {
            id: "1095",
            name: "实习期驾驶公交车"
        },
        {
            id: "1096",
            name: "实习期驾驶营运车"
        },
        {
            id: "1097",
            name: "实习期驾驶执行任务特种车"
        },
        {
            id: "1098",
            name: "实习期驾驶危险品车"
        },
        {
            id: "1099",
            name: "实习期驾车牵引车辆"
        },
        {
            id: "1102",
            name: "不按规定使用灯光"
        },
        {
            id: "1103",
            name: "不按规定会车"
        },
        {
            id: "1108",
            name: "未放置保险标志"
        },
        {
            id: "1109",
            name: "未带行驶证"
        },
        {
            id: "1110",
            name: "未带驾驶证"
        },
        {
            id: "1111",
            name: "机动车载货长度、宽度、高度超过规定的"
        },
        {
            id: "1115",
            name: "未放置检验合格标志"
        },
        {
            id: "1207",
            name: "不戴安全头盔"
        },
        {
            id: "1208",
            name: "不按导向车道行驶"
        },
        {
            id: "1209",
            name: "左转弯不靠路口中心行驶"
        },
        {
            id: "1210",
            name: "信号路口不依次通过"
        },
        {
            id: "1211",
            name: "信号灯路口越停车线停车"
        },
        {
            id: "1212",
            name: "强行右转弯"
        },
        {
            id: "1223",
            name: "驾车接拨手持电话"
        },
        {
            id: "1225",
            name: "驾车时有其他妨碍安全行车的"
        },
        {
            id: "1228",
            name: "交通阻塞路口不依次等候"
        },
        {
            id: "1243",
            name: "借道超车或者占用对面车道、穿插等候车辆的"
        },
        {
            id: "1244",
            name: "城市快速路上驾驶人未按规定使用安全带的"
        },
        {
            id: "1245",
            name: "不按照规定为校车配备安全设备的"
        },
        {
            id: "1246",
            name: "不按照规定对校车进行安全维护的"
        },
        {
            id: "1247",
            name: "驾驶校车运载学生，不按照规定放置校车标牌的"
        },
        {
            id: "1248",
            name: "驾驶校车运载学生，不按照规定开启校车标志灯的"
        },
        {
            id: "1249",
            name: "驾驶校车运载学生，不按照经审核确定线路行驶的"
        },
        {
            id: "1250",
            name: "校车上下学生，不按照规定在校车停靠站点停靠的"
        },
        {
            id: "1251",
            name: "校车未运载学生上道路行驶，使用校车标牌的"
        },
        {
            id: "1252",
            name: "校车未运载学生上道路行驶，使用校车标志灯的"
        },
        {
            id: "1253",
            name: "校车未运载学生上道路行驶，使用停车指示标志的"
        },
        {
            id: "1254",
            name: "驾驶校车上道路行驶前，未对校车车况是否符合安全技术要求进行检查的"
        },
        {
            id: "1255",
            name: "驾驶存在安全隐患的校车上道路行驶的"
        },
        {
            id: "1256",
            name: "在校车载有学生时给车辆加油的"
        },
        {
            id: "1257",
            name: "在校车发动机引擎熄灭前离开驾驶座位的"
        },
        {
            id: "1301",
            name: "逆向行驶"
        },
        {
            id: "1304",
            name: "右侧超车"
        },
        {
            id: "1305",
            name: "超左转弯车"
        },
        {
            id: "1306",
            name: "超掉头车"
        },
        {
            id: "1307",
            name: "超越正在超车车辆"
        },
        {
            id: "1308",
            name: "有会车可能时超车"
        },
        {
            id: "1309",
            name: "超越执行任务车辆"
        },
        {
            id: "1310",
            name: "特殊地段超车"
        },
        {
            id: "1311",
            name: "故障车不设标志"
        },
        {
            id: "1312",
            name: "环形路口不让车"
        },
        {
            id: "1313",
            name: "转弯车不让直行车或行人"
        },
        {
            id: "1314",
            name: "右转弯车不让左转弯车"
        },
        {
            id: "1315",
            name: "无信号路口不让优先通行车辆"
        },
        {
            id: "1316",
            name: "无信号路口不让右方来车"
        },
        {
            id: "1317",
            name: "载货车牵引多辆挂车"
        },
        {
            id: "1318",
            name: "半挂车牵引多辆挂车"
        },
        {
            id: "1319",
            name: "挂车机件不全"
        },
        {
            id: "1320",
            name: "小型载客车不按规定牵引挂车"
        },
        {
            id: "1321",
            name: "挂车载人"
        },
        {
            id: "1322",
            name: "挂车载质量超越车辆本身载质量"
        },
        {
            id: "1323",
            name: "大型载客汽车牵引挂车"
        },
        {
            id: "1324",
            name: "中型载客汽车牵引挂车"
        },
        {
            id: "1325",
            name: "低速载货汽车牵引挂车"
        },
        {
            id: "1326",
            name: "三轮机动车牵引挂车"
        },
        {
            id: "1327",
            name: "故障车不按规定使用灯光"
        },
        {
            id: "1333",
            name: "不避让执行任务特种车辆"
        },
        {
            id: "1334",
            name: "不避让盲人"
        },
        {
            id: "1339",
            name: "剧毒品运输车超速50％以下"
        },
        {
            id: "1340",
            name: "上道路行驶的机动车未按规定定期进行安全技术检验的"
        },
        {
            id: "1344",
            name: "违反禁令标志指示"
        },
        {
            id: "13441",
            name: "违反禁令标志指示"
        },
        {
            id: "13442",
            name: "违反禁令标志指示"
        },
        {
            id: "13443",
            name: "违反禁令标志指示"
        },
        {
            id: "13444",
            name: "违反禁令标志指示(7时至19时)"
        },
        {
            id: "13445",
            name: "违反禁令标志指示(19时至翌日7时)"
        },
        {
            id: "1345",
            name: "违反禁止标线指示"
        },
        {
            id: "13451",
            name: "违反禁止标线指示"
        },
        {
            id: "1348",
            name: "驾驶营运客车（不包括公共汽车）、校车以外的载客汽车载人超过核定人数未达20%的"
        },
        {
            id: "13491",
            name: "驾驶中型以上载客汽车在高速公路、城市快速路以外的道路上行驶超过规定时速10%未达20%的"
        },
        {
            id: "13501",
            name: "驾驶中型以上载货汽车在高速公路、城市快速路以外的道路上行驶超过规定时速10%未达20%的"
        },
        {
            id: "13511",
            name: "驾驶危险物品运输车辆在高速公路、城市快速路以外的道路上行驶超过规定时速10%未达20%的"
        },
        {
            id: "13521",
            name: "驾驶中型以上载客载货汽车、危险物品运输车辆以外的其他机动车行驶超过规定时速10%未达20%的"
        },
        {
            id: "1353",
            name: "驾驶货车载物超过核定载质量未达30%的"
        },
        {
            id: "1354",
            name: "驾驶危险物品运输车辆载物超过核定载质量未达30%的"
        },
        {
            id: "1355",
            name: "驾驶机动车在城市快速路上不按规定车道行驶的"
        },
        {
            id: "1356",
            name: "人行道不减速的"
        },
        {
            id: "1357",
            name: "人行道不停车让行的"
        },
        {
            id: "1358",
            name: "无信号道路不避让行人的"
        },
        {
            id: "1610",
            name: "在驾驶证暂扣期间仍驾驶机动车的"
        },
        {
            id: "1617",
            name: "运载危险物品时不按规定的时间、路线、速度行驶的"
        },
        {
            id: "1618",
            name: "运载危险物品时未悬挂警示标志的"
        },
        {
            id: "1619",
            name: "运载危险物品时未采取必要的安全措施的"
        },
        {
            id: "1621",
            name: "公路客运车辆载客超过核定载客人数未达20％的"
        },
        {
            id: "16221",
            name: "占用应急车道行驶的"
        },
        {
            id: "1623",
            name: "校车载人超过核定人数未达20%的"
        },
        {
            id: "1624",
            name: "机动车驾驶人不按照规定避让校车"
        },
        {
            id: "1625",
            name: "驾驶机动车违反道路交通信号灯通行的"
        },
        {
            id: "1626",
            name: "驾驶公路客运车辆、公共汽车以外的其他营运客车载人超过核定人数未达20％的"
        },
        {
            id: "1627",
            name: "驾驶营运客车（不包括公共汽车）以外的其他载客汽车载人超过核定人数20％以上的"
        },
        {
            id: "1628",
            name: "驾驶中型以上载客汽车在城市快速路上行驶超过规定时速未达20％的"
        },
        {
            id: "1629",
            name: "驾驶中型以上载货汽车在城市快速路上行驶超过规定时速未达20％的"
        },
        {
            id: "1630",
            name: "驾驶校车在城市快速路上行驶超过规定时速未达20％的"
        },
        {
            id: "1631",
            name: "驾驶危险物品运输车辆在城市快速路上行驶超过规定时速未达20％的"
        },
        {
            id: "1632",
            name: "驾驶中型以上载客汽车在高速公路、城市快速路以外的道路上行驶超过规定时速20%以上未达到50%的"
        },
        {
            id: "1633",
            name: "驾驶中型以上载货汽车在高速公路、城市快速路以外的道路上行驶超过规定时速20%以上未达到50%的"
        },
        {
            id: "1634",
            name: "驾驶校车在高速公路、城市快速路以外的道路上行驶超过规定时速20%以上未达到50%的"
        },
        {
            id: "1635",
            name: "驾驶危险物品运输车辆在高速公路、城市快速路以外的道路上行驶超过规定时速20%以上未达到50%的"
        },
        {
            id: "1636",
            name: "驾驶中型以上载客载货汽车、校车、危险物品运输车辆以外的其他机动车行驶超过规定时速20%以上未达到50%的"
        },
        {
            id: "1637",
            name: "驾驶货车载物超过核定载质量30%以上"
        },
        {
            id: "1638",
            name: "驾驶货车违反规定载客的"
        },
        {
            id: "1639",
            name: "危险物品运输车辆载物超过核定载质量30%以上"
        },
        {
            id: "1640",
            name: "未按指定的时间、路线、速度行驶的"
        },
        {
            id: "1641",
            name: "未悬挂明显标志的"
        },
        {
            id: "1642",
            name: "连续驾驶中型以上载客汽车、危险物品运输车辆以外的机动车超过4小时未停车休息或者停车休息时间少于20分钟的"
        },
        {
            id: "1705",
            name: "肇事逃逸（财产损失）"
        },
        {
            id: "1709",
            name: "准驾不符"
        },
        {
            id: "1710",
            name: "公路客运车辆载客超过额定乘员20％的"
        },
        {
            id: "17121",
            name: "酒后驾车"
        },
        {
            id: "1714",
            name: "校车载人超过核定人数20%以上的"
        },
        {
            id: "1715",
            name: "驾驶人未取得校车驾驶资格驾驶校车的"
        },
        {
            id: "1716",
            name: "驾驶公路客运车辆、公共汽车以外的其他营运客车载人超过核定人数20％以上的"
        },
        {
            id: "1717",
            name: "上道路行驶的机动车未悬挂机动车号牌的"
        },
        {
            id: "1718",
            name: "故意遮挡机动车号牌的"
        },
        {
            id: "1719",
            name: "故意污损机动车号牌的"
        },
        {
            id: "1720",
            name: "不按规定安装机动车号牌的"
        },
        {
            id: "1721",
            name: "驾驶中型以上载客载货汽车、校车、危险物品运输车辆以外的机动车行驶超过规定时速50%以上的"
        },
        {
            id: "1722",
            name: "驾驶中型以上载客汽车在城市快速路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "1723",
            name: "驾驶中型以上载货汽车在城市快速路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "1724",
            name: "驾驶校车在城市快速路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "1725",
            name: "驾驶危险物品运输车辆在城市快速路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "1726",
            name: "驾驶中型以上载客汽车在高速公路以外的道路上行驶超过规定时速50%的"
        },
        {
            id: "1727",
            name: "驾驶中型以上载货汽车在高速公路以外的道路上行驶超过规定时速50%的"
        },
        {
            id: "1728",
            name: "驾驶校车在高速公路以外的道路上行驶超过规定时速50%的"
        },
        {
            id: "1729",
            name: "驾驶危险物品运输车辆在高速公路以外的道路上行驶超过规定时速50%的"
        },
        {
            id: "1730",
            name: "连续驾驶中型以上载客汽车超过4小时未停车休息或者停车休息时间少于20分钟的"
        },
        {
            id: "1731",
            name: "连续驾驶危险物品运输车辆超过4小时未停车休息或者停车休息时间少于20分钟的"
        },
        {
            id: "2001",
            name: "肇事逃逸，未犯罪"
        },
        {
            id: "2002",
            name: "违反交通管制"
        },
        {
            id: "2003",
            name: "非机动车未登记"
        },
        {
            id: "2004",
            name: "逆向行驶"
        },
        {
            id: "20041",
            name: "逆向行驶"
        },
        {
            id: "2005",
            name: "不靠车行道右侧行驶"
        },
        {
            id: "2006",
            name: "违规使用专用车道"
        },
        {
            id: "2007",
            name: "违反交通信号指示"
        },
        {
            id: "20071",
            name: "违反交通信号指示"
        },
        {
            id: "2008",
            name: "不服从指挥"
        },
        {
            id: "2009",
            name: "不走非机动车道"
        },
        {
            id: "20091",
            name: "不走非机动车道"
        },
        {
            id: "2010",
            name: "醉酒上路"
        },
        {
            id: "2011",
            name: "残疾人车超速"
        },
        {
            id: "2012",
            name: "电动自行车超速"
        },
        {
            id: "2013",
            name: "不按规定载物"
        },
        {
            id: "2014",
            name: "不按规定地点停放"
        },
        {
            id: "2015",
            name: "违规停放，妨碍通行"
        },
        {
            id: "2016",
            name: "路口转弯时违反优先顺序"
        },
        {
            id: "2017",
            name: "遇路口阻塞强行进入"
        },
        {
            id: "2018",
            name: "转弯不靠路口中心右侧"
        },
        {
            id: "2019",
            name: "遇停止信号停在路口内"
        },
        {
            id: "20191",
            name: "遇停止信号停在路口内"
        },
        {
            id: "2020",
            name: "强行右转弯"
        },
        {
            id: "2021",
            name: "无信号路口不按标志让行"
        },
        {
            id: "2022",
            name: "无信号路口不让行"
        },
        {
            id: "2023",
            name: "无信号路口右转不让左转"
        },
        {
            id: "2024",
            name: "横过机动车道不下车推行"
        },
        {
            id: "2025",
            name: "不从人行横道横过道路"
        },
        {
            id: "2026",
            name: "有行人过街设施时，非机动车不从行人过街设施横过机动车道"
        },
        {
            id: "2027",
            name: "借道行驶不及时驶回"
        },
        {
            id: "2028",
            name: "转弯时不减速或伸手示意"
        },
        {
            id: "2029",
            name: "超车时妨碍被超载车辆"
        },
        {
            id: "2030",
            name: "牵引车辆"
        },
        {
            id: "2031",
            name: "攀扶其他车辆"
        },
        {
            id: "2032",
            name: "被其他车辆牵引"
        },
        {
            id: "2033",
            name: "双手离把"
        },
        {
            id: "2034",
            name: "手中持物驾驶车辆"
        },
        {
            id: "2035",
            name: "非机动车扶身并行"
        },
        {
            id: "2036",
            name: "非机动车时互相追逐"
        },
        {
            id: "2037",
            name: "非机动车时曲折竟驶"
        },
        {
            id: "2038",
            name: "骑独轮自行车上路"
        },
        {
            id: "2039",
            name: "骑2人以上骑行的自行车上路"
        },
        {
            id: "2040",
            name: "非下肢残疾驾残疾机动轮椅"
        },
        {
            id: "2041",
            name: "自行车加装动力装置"
        },
        {
            id: "2042",
            name: "三轮车加装动力装置"
        },
        {
            id: "2043",
            name: "道路上学习驾驶非机动车"
        },
        {
            id: "2044",
            name: "非机动车不避让盲人"
        },
        {
            id: "2045",
            name: "畜力车驾驭人未下车牵引"
        },
        {
            id: "2046",
            name: "畜力车并行"
        },
        {
            id: "2047",
            name: "畜力车驾驭人离开车辆"
        },
        {
            id: "2048",
            name: "畜力车危险路段超车"
        },
        {
            id: "2049",
            name: "两轮畜力车不下车牵引牲畜"
        },
        {
            id: "2050",
            name: "使用未经驯服的牲畜驾车"
        },
        {
            id: "2051",
            name: "随车幼畜未栓系"
        },
        {
            id: "2052",
            name: "停放畜力车时未拉紧车闸"
        },
        {
            id: "2053",
            name: "停放畜力车时未栓系牲畜"
        },
        {
            id: "2054",
            name: "未满12周岁驾自行车、三轮车"
        },
        {
            id: "2055",
            name: "未满16周岁驾电动自行车、残疾人机动轮椅、畜力车"
        },
        {
            id: "3001",
            name: "行人违反交通信号"
        },
        {
            id: "3002",
            name: "行人不服从交警指挥"
        },
        {
            id: "3003",
            name: "行人不在人行道内行走"
        },
        {
            id: "3004",
            name: "行人不靠路边行走"
        },
        {
            id: "3005",
            name: "横过道路未走人行过街道"
        },
        {
            id: "3006",
            name: "行人跨越道路隔离设施"
        },
        {
            id: "3007",
            name: "行人倚坐道路隔离设施"
        },
        {
            id: "3008",
            name: "行人扒车"
        },
        {
            id: "3009",
            name: "行人强行拦车"
        },
        {
            id: "3010",
            name: "行人实施妨碍交通安全行为"
        },
        {
            id: "3011",
            name: "需监护人无人监护上路"
        },
        {
            id: "3012",
            name: "盲人未使用导盲手段"
        },
        {
            id: "3013",
            name: "行人不按规定通过铁路道口"
        },
        {
            id: "3014",
            name: "使用滑行工具上路"
        },
        {
            id: "3015",
            name: "车行道内坐卧、停留、嬉闹"
        },
        {
            id: "3016",
            name: "有追车、抛物击车等妨碍道路交通安全行为"
        },
        {
            id: "3017",
            name: "不按规定横过机动车道"
        },
        {
            id: "3018",
            name: "列队时每横列超过2人"
        },
        {
            id: "3019",
            name: "机动车乘坐人未使用安全带"
        },
        {
            id: "3020",
            name: "乘坐摩托车不戴头盔"
        },
        {
            id: "3021",
            name: "携带易燃、易爆等物品上车"
        },
        {
            id: "3022",
            name: "乘车人向车外抛洒物品"
        },
        {
            id: "3023",
            name: "有影响驾驶人安全驾驶行为"
        },
        {
            id: "3024",
            name: "在机动车道上拦乘机动车"
        },
        {
            id: "3025",
            name: "在机动车道上从机动车左侧上下车"
        },
        {
            id: "3026",
            name: "开关车门妨碍其他车辆和行人通行"
        },
        {
            id: "3027",
            name: "行驶中乘坐人员干扰驾驶"
        },
        {
            id: "3028",
            name: "行驶中乘坐人员将身体任何部分伸出车外"
        },
        {
            id: "3029",
            name: "行驶中跳车"
        },
        {
            id: "3030",
            name: "乘坐两轮摩托车未正向骑坐"
        },
        {
            id: "4001",
            name: "行人进高速公路"
        },
        {
            id: "4002",
            name: "拖拉机驶入高速公路"
        },
        {
            id: "4003",
            name: "非机动车驶入高速公路"
        },
        {
            id: "4004",
            name: "故障车上人员不及时转移"
        },
        {
            id: "4005",
            name: "进入匝道不按规定使用灯光"
        },
        {
            id: "4006",
            name: "匝道驶入车辆妨碍高速公路正常行驶车辆"
        },
        {
            id: "4007",
            name: "在高速公路路肩上行驶"
        },
        {
            id: "4009",
            name: "施工路段不减速行驶"
        },
        {
            id: "4011",
            name: "在高速公路上试车或学习驾驶机动车的"
        },
        {
            id: "4012",
            name: "违规拖曳车辆"
        },
        {
            id: "4014",
            name: "载货汽车车厢载人"
        },
        {
            id: "4015",
            name: "两轮摩托车载人"
        },
        {
            id: "4016",
            name: "驾驶机动车在高速公路上行驶低于规定时速20%以下的"
        },
        {
            id: "4204",
            name: "驾驶人未按规定使用安全带的"
        },
        {
            id: "4301",
            name: "低速车辆驶入高速公路"
        },
        {
            id: "4302",
            name: "故障车不使用危险报警灯"
        },
        {
            id: "4303",
            name: "故障车不设标志"
        },
        {
            id: "43061",
            name: "驾驶机动车在高速公路上正常情况下行驶速度低于规定最低时速20%以上的"
        },
        {
            id: "4311",
            name: "高速公路上不按规定超车的"
        },
        {
            id: "4312",
            name: "驾驶机动车在高速公路上不按规定车道行驶的"
        },
        {
            id: "46081",
            name: "占用应急车道行驶的"
        },
        {
            id: "4609",
            name: "驾驶中型以上载客汽车在高速公路上行驶超过规定时速未达20％的"
        },
        {
            id: "4610",
            name: "驾驶中型以上载货汽车在高速公路上行驶超过规定时速未达20％的"
        },
        {
            id: "4611",
            name: "驾驶校车在高速公路上行驶超过规定时速未达20％的"
        },
        {
            id: "4612",
            name: "驾驶危险物品运输车辆在高速公路上行驶超过规定时速未达20％的"
        },
        {
            id: "4613",
            name: "驾驶营运客车以外的机动车在高速公路行车道上停车的"
        },
        {
            id: "4614",
            name: "驾驶营运客车以外的机动车非紧急情况下在高速公路应急车道上停车的"
        },
        {
            id: "4615",
            name: "低能见度条件下不按规定行驶"
        },
        {
            id: "4701",
            name: "不按规定倒车"
        },
        {
            id: "4702",
            name: "逆向行驶"
        },
        {
            id: "4703",
            name: "不按规定掉头"
        },
        {
            id: "4704",
            name: "驾驶营运客车在高速公路行车道上停车的"
        },
        {
            id: "4705",
            name: "驾驶营运客车非紧急情况下在高速公路应急车道上停车的"
        },
        {
            id: "4706",
            name: "驾驶中型以上载客汽车在高速公路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "4707",
            name: "驾驶中型以上载货汽车在高速公路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "4708",
            name: "驾驶校车在高速公路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "4709",
            name: "驾驶危险物品运输车辆在高速公路上行驶超过规定时速20％以上未达50%的"
        },
        {
            id: "4710",
            name: "驾驶中型以上载客汽车在高速公路上行驶超过规定时速50%的"
        },
        {
            id: "4711",
            name: "驾驶中型以上载货汽车在高速公路上行驶超过规定时速50%的"
        },
        {
            id: "4712",
            name: "驾驶校车在高速公路上行驶超过规定时速50%的"
        },
        {
            id: "4713",
            name: "驾驶危险物品运输车辆在高速公路上行驶超过规定时速50%的"
        },
        {
            id: "50011",
            name: "伪造、变造机动车登记证书"
        },
        {
            id: "50021",
            name: "伪造、变造机动车号牌"
        },
        {
            id: "50031",
            name: "伪造、变造机动车行驶证"
        },
        {
            id: "50041",
            name: "伪造、变造机动车检验合格标志"
        },
        {
            id: "50051",
            name: "伪造、变造机动车保险标志"
        },
        {
            id: "50061",
            name: "伪造、变造机动车驾驶证"
        },
        {
            id: "50071",
            name: "使用伪造、变造的机动车登记证书"
        },
        {
            id: "50101",
            name: "使用伪造、变造的机动车检验合格标志"
        },
        {
            id: "50111",
            name: "使用伪造、变造的机动车保险标志"
        },
        {
            id: "50131",
            name: "使用其他车辆的机动车登记证书"
        },
        {
            id: "50161",
            name: "使用其他车辆的机动车检验合格标志"
        },
        {
            id: "50171",
            name: "使用其他车辆的机动车保险标志"
        },
        {
            id: "5018",
            name: "强迫他人驾车造成交通事故"
        },
        {
            id: "5019",
            name: "损毁交通设施造成严重后果"
        },
        {
            id: "5020",
            name: "移动交通设施造成严重后果"
        },
        {
            id: "5021",
            name: "涂改交通设施造成严重后果"
        },
        {
            id: "5022",
            name: "非法拦截机动车"
        },
        {
            id: "5023",
            name: "非法扣留机动车"
        },
        {
            id: "5024",
            name: "道路设置物妨碍安全视距不排除的"
        },
        {
            id: "5025",
            name: "道路设置物妨碍安全视距"
        },
        {
            id: "5026",
            name: "擅自挖掘道路影响交通安全"
        },
        {
            id: "5027",
            name: "占用道路施工影响交通安全"
        },
        {
            id: "5028",
            name: "从事其他影响交通安全活动"
        },
        {
            id: "5029",
            name: "出售报废机动车"
        },
        {
            id: "5030",
            name: "其他机动车喷涂特种车特定标志图案"
        },
        {
            id: "5031",
            name: "生产拼装机动车"
        },
        {
            id: "5032",
            name: "生产擅自改装的机动车"
        },
        {
            id: "5033",
            name: "销售拼装机动车"
        },
        {
            id: "5034",
            name: "销售擅自改装的机动车"
        },
        {
            id: "5035",
            name: "服用管制药品驾车"
        },
        {
            id: "5036",
            name: "患有妨碍安全驾驶疾病仍驾车"
        },
        {
            id: "5037",
            name: "过度疲劳仍继续驾驶"
        },
        {
            id: "5038",
            name: "未按规定喷涂放大号"
        },
        {
            id: "5039",
            name: "扣留驾驶证后不及时接受处理"
        },
        {
            id: "5040",
            name: "以欺骗、贿赂手段取得机动车牌证"
        },
        {
            id: "5041",
            name: "以欺骗、贿赂手段取得驾驶证"
        },
        {
            id: "5042",
            name: "达12分后逾期拒不接受考试"
        },
        {
            id: "5043",
            name: "车辆扣留后不及时接受处理"
        },
        {
            id: "5044",
            name: "技检机构出具虚假检验结果"
        },
        {
            id: "5045",
            name: "擅自停止使用停车场或改作他用"
        },
        {
            id: "5046",
            name: "运输单位处罚后不改"
        },
        {
            id: "5047",
            name: "擅自改号"
        },
        {
            id: "5048",
            name: "占用道路从事非交通活动"
        },
        {
            id: "5050",
            name: "车辆所有人使用拼装的机动车接送学生的"
        },
        {
            id: "5051",
            name: "车辆所有人使用达到报废标准的机动车接送学生的"
        },
        {
            id: "5052",
            name: "使用未取得校车标牌的车辆提供校车服务的"
        },
        {
            id: "5053",
            name: "使用未取得校车驾驶资格的人员驾驶校车的"
        },
        {
            id: "5054",
            name: "伪造、变造校车标牌的"
        },
        {
            id: "5055",
            name: "未按照规定指派照管人员随校车全程照管乘车学生的"
        },
        {
            id: "50561",
            name: "在一个记分周期内累积记分达到十二分的"
        },
        {
            id: "56031",
            name: "以隐瞒、欺骗手段补领机动车驾驶证的"
        },
        {
            id: "57011",
            name: "使用伪造、变造的机动车号牌的"
        },
        {
            id: "57021",
            name: "使用伪造、变造的机动车行驶证"
        },
        {
            id: "57031",
            name: "使用伪造、变造的机动车驾驶证"
        },
        {
            id: "57041",
            name: "使用其他车辆的机动车号牌的"
        },
        {
            id: "57051",
            name: "使用其他车辆的机动车行驶证"
        },
        {
            id: "5706",
            name: "使用伪造、变造的校车标牌的"
        },
        {
            id: "6001",
            name: "被牵引故障车载人"
        },
        {
            id: "6002",
            name: "被牵引故障车拖带挂车"
        },
        {
            id: "6003",
            name: "被牵引车宽度大于牵引车"
        },
        {
            id: "6004",
            name: "牵引车与被牵引车未保持安全距离"
        },
        {
            id: "6005",
            name: "牵引制动失效车辆未使用硬性连接"
        },
        {
            id: "6006",
            name: "汽车吊车牵引车辆"
        },
        {
            id: "6007",
            name: "轮式专用机械牵引车辆"
        },
        {
            id: "6008",
            name: "摩托车牵引车辆"
        },
        {
            id: "6009",
            name: "牵引摩托车"
        },
        {
            id: "6010",
            name: "未使用专用清障车拖曳转向或照明、信号装置失效的机动车"
        },
        {
            id: "6011",
            name: "驾驶人未按规定使用安全带的"
        },
        {
            id: "6012",
            name: "摩托车载未成年人"
        },
        {
            id: "6013",
            name: "轻便摩托车载人"
        },
        {
            id: "6014",
            name: "机动车载物行驶时遗洒、飘散载运物的"
        },
        {
            id: "6017",
            name: "其他机动车载人超过核定人数的"
        },
        {
            id: "60181",
            name: "补领机动车驾驶证后，继续使用原机动车驾驶证的"
        },{
            id: "6019",
            name: "发生交通事故后，应当自行撤离现场而未撤离，造成交通堵塞的"
        },{
            id: "6020",
            name: "驾驶拼装的机动车接送学生的"
        },
        {
            id: "6021",
            name: "驾驶达到报废标准的机动车接送学生的"
        },
        {
            id: "6022",
            name: "饮酒后或者醉酒驾驶机动车发生重大交通事故，构成犯罪的"
        },
        {
            id: "6023",
            name: "驾驶机动车在高速公路、城市快速路以外的道路上不按规定车道行驶的"
        },
        {
            id: "60241",
            name: "机动车驾驶人在实习期内驾驶公共汽车、营运客车或者执行任务的警车、消防车、救护车、工程救险车以及载有爆炸物品、易燃易爆化学物品、剧毒或者放射性等危险物品的机动车的"
        },
        {
            id: "60251",
            name: "机动车驾驶人在实习期内驾驶牵引挂车的"
        },
        {
            id: "60261",
            name: "机动车驾驶人在实习期内驾驶机动车上高速公路行驶，无相应或者更高准驾车型驾驶证三年以上的驾驶人陪同的"
        },
        {
            id: "60271",
            name: "驾驶机动车未按规定粘贴、悬挂实习标志的"
        },
        {
            id: "60281",
            name: "驾驶机动车未按规定粘贴、悬挂残疾人机动车专用标志的"
        },
        {
            id: "60291",
            name: "持有大型客车、牵引车、城市公交车、中型客车、大型货车驾驶证的驾驶人，未按照规定申报变更信息的"
        },
        {
            id: "60301",
            name: "机动车驾驶人身体条件发生变化不适合驾驶机动车，仍驾驶机动车的"
        },
        {
            id: "60311",
            name: "逾期不参加审验的"
        },
        {
            id: "6032",
            name: "醉酒后驾车的"
        },
        {
            id: "6033",
            name: "醉酒后驾营运车的"
        },
        {
            id: "6034",
            name: "饮酒后驾驶营运机动车的"
        },
        {
            id: "6035",
            name: "再次酒后驾车的"
        },
        {
            id: "6036",
            name: "挂车机件不全的"
        },
        {
            id: "6037",
            name: "挂车载人的"
        },
        {
            id: "6038",
            name: "货运机动车驾驶室载人超过核定人数的"
        },
        {
            id: "6039",
            name: "因号牌被盗、丢失等原因未悬挂机动车号牌的，且当事人能够出具报警记录或者受案回执单等相关证明的"
        },
        {
            id: "6040",
            name: "因交通事故导致车辆号牌损坏、残缺或号牌老化、褪色等非人为因素影响号牌识认的"
        },
        {
            id: "6041",
            name: "未按规定粘帖有效临时行驶车号牌的"
        },
        {
            id: "6042",
            name: "使用的号牌架内侧边缘距离号牌上汉字、字母或者数字边缘不足5mm且影响号牌识认的"
        },
        {
            id: "6043",
            name: "机动车已安装号牌但未使用号牌专用固封装置的"
        },
        {
            id: "6044",
            name: "外地驾驶人因不熟悉道路，违反载货汽车禁令标志指示通行的，经交通警察当场指出后立即终止违法行为的"
        },
        {
            id: "6045",
            name: "机动车号牌不清晰、不完整的"
        },
        {
            id: "6046",
            name: "驾驶机动车在限速低于60公里/小时的公路上超过规定车速50%以下的"
        },
        {
            id: "6047",
            name: "驾驶中型以上载客汽车在高速公路、城市快速路以外的道路上超过规定时速10%以下的"
        },
        {
            id: "6048",
            name: "驾驶中型以上载货汽车在高速公路、城市快速路以外的道路上超过规定时速10%以下的"
        },
        {
            id: "6049",
            name: "驾驶危险物品运输车辆在高速公路、城市快速路以外的道路上超过规定时速10%以下的"
        },
        {
            id: "6050",
            name: "驾驶中型以上载客载货汽车、危险物品运输车辆以外的机动车超过规定时速10%以下的"
        },
        {
            id: "6051",
            name: "学习驾驶时未随身携带学习驾驶证明的"
        },
        {
            id: "6052",
            name: "学习驾驶时未放置、粘贴学车专用标识的"
        },
        {
            id: "6053",
            name: "学习驾驶时搭载随车指导人员以外其他人员的"
        },
        {
            id: "6054",
            name: "学习驾驶时未取得学习驾驶证明的"
        },
        {
            id: "6055",
            name: "学习驾驶时学习驾驶证明超过有效期的"
        },
        {
            id: "6056",
            name: "学习驾驶时由不符合规定的人员随车指导的"
        },
        {
            id: "6057",
            name: "将机动车交由未取得学习驾驶证明的申请人驾驶的"
        },
        {
            id: "6058",
            name: "将机动车交由学习驾驶证明过期的申请人驾驶的"
        },
        {
            id: "6059",
            name: "将机动车交由没有教练员或随车指导人员的申请人驾驶的"
        },
        {
            id: "6060",
            name: "将机动车交由不符合规定人员随车指导的申请人驾驶的"
        },
        {
            id: "6061",
            name: "未按规定戴安全头盔的"
        },
        {
            id: "6062",
            name: "在城市快速路应急车道上停车的"
        },
        {
            id: "6063",
            name: "驾驶排放检验不合格的机动车上道路行驶的"
        },
        {
            id: "7023",
            name: "危险化学品专用车辆未在划设的危险化学品运输专用车道内通行的"
        },
        {
            id: "7040",
            name: "驾驶无牌无证燃油助力车"
        },
        {
            id: "7041",
            name: "机动车未按规定进行安全技术检验"
        },
        {
            id: "7042",
            name: "违法变更机动车辆"
        },
        {
            id: "7043",
            name: "机动车遇盲人等未停车让行"
        },
        {
            id: "7044",
            name: "机动车行经学校等未减速慢行的"
        },
        {
            id: "7045",
            name: "车辆遇借道通行行人未避让"
        },
        {
            id: "7046",
            name: "机动车违反分道行驶规定"
        },
        {
            id: "7047",
            name: "公共汽车未在专用车道顺序行驶"
        },
        {
            id: "7048",
            name: "机动车在没有交通信号控制的路段未让行"
        },
        {
            id: "7049",
            name: "机动车通过没有交通信号灯控制的路口，小型客车时速超过三十公里，其他车辆时速超过二十公里的"
        },
        {
            id: "7050",
            name: "车辆违反五交叉以上路口通行规定的"
        },
        {
            id: "7051",
            name: "机动车辆借用非机动车道、人行道行驶，时速超过二十公里的"
        },
        {
            id: "7052",
            name: "在机动车前后挡风玻璃上张贴、悬挂、放置物品，妨碍驾驶视线，或在机动车车顶设置立体广告的"
        },
        {
            id: "7053",
            name: "机动车转弯、掉头、靠路边停车时未提前在三十米处开启转向灯的"
        },
        {
            id: "7054",
            name: "公共汽车不按规定进出站点或者在站点以外上下乘客的"
        },
        {
            id: "7055",
            name: "客运出租车不按规定上下乘客或者借用公共汽车站点上下乘客，妨碍公共汽车正常行驶的"
        },
        {
            id: "7056",
            name: "客运出租车在公共汽车站点停车侯客或者违反规定在道路上停车侯客、揽客的"
        },
        {
            id: "7057",
            name: "在交叉路口、车行道、桥梁、地道、涵洞、过街天桥等地点散发宣传品、兜售商品或者乞讨的"
        },
        {
            id: "7058",
            name: "驾乘人员接受宣传品、购买商品或者施舍的"
        },
        {
            id: "7059",
            name: "乘车人未按规定侯乘的"
        },
        {
            id: "7060",
            name: "机动车因故障或者交通事故在车行道停车时，乘车人未离开车辆和车行道的"
        },
        {
            id: "7061",
            name: "机动车等待通行信号或者前方受阻临时停车时，允许乘车人上下车辆的"
        },
        {
            id: "7062",
            name: "明知驾驶人无驾驶证或者饮酒，乘坐其驾驶的机动车的"
        },
        {
            id: "7063",
            name: "在道路上从事清扫、设施维修等作业人员未穿着反光服饰，过往车辆未避让的"
        },
        {
            id: "7064",
            name: "驾驶残疾人机动轮椅车，未携带残疾证的"
        },
        {
            id: "7065",
            name: "自行车、电动自行车违反载人规定的"
        },
        {
            id: "7066",
            name: "车辆以外以动力装置驱动的收割机、播种机等机械不按规定通行的"
        },
        {
            id: "7067",
            name: "机动车在高速公路快速路违反规定在超车道停放的"
        },
        {
            id: "7068",
            name: "机动车驾驶人未按规定随车携带信息卡的"
        },
        {
            id: "7069",
            name: "机动车在道路上行驶时尾气排放抽测不合格"
        },
        {
            id: "7070",
            name: "未取得教练车号牌的机动车用于教练的"
        },
        {
            id: "7071",
            name: "驾驶警车、消防车、救护车、工程救险车的人员未随车携带特种车辆使用凭证的"
        },
        {
            id: "7072",
            name: "报废机动车回收企业拆解大型客、货车及其他营运车辆，未向公安机关交通管理部门申报的"
        },
        {
            id: "7073",
            name: "在道路上未按规定高度架设临时设施或者设置物体的"
        },
        {
            id: "7074",
            name: "机动车未按规定时间、道路、区域行驶的"
        },
        {
            id: "70741",
            name: "机动车未按规定时间、道路、区域行驶的"
        },
        {
            id: "7075",
            name: "非机动车未按规定时间、道路、区域行驶的"
        },
        {
            id: "7076",
            name: "停车场擅自停止使用或者改作他用的"
        },
        {
            id: "7077",
            name: "不按规定使用移动证的"
        },
        {
            id: "7078",
            name: "托运人未向公安部门申领剧毒化学品公路运输通行证，擅自通过公路运输剧毒化学品的"
        },
        {
            id: "7079",
            name: "危险化学品运输企业运输危险化学品，不配备押运人员或者脱离押运人员监管，超装、超载"
        },
        {
            id: "7080",
            name: "危险化学品运输企业运输危险化学品，未向公安部门报告，擅自进入危险化学品运输车辆禁止通行区域，或者进入禁止通行区域不遵守公安部门规定的行车时间和路线的"
        },
        {
            id: "7081",
            name: "违法记分达到12分（含）以上"
        },
        {
            id: "7083",
            name: "涉嫌使用伪造、变造机动车行驶证、驾驶证或检验合格标识"
        },
        {
            id: "7084",
            name: "涉嫌驾驶拼装的机动车上道路行驶的"
        },
        {
            id: "7086",
            name: "未取得机动车驾驶证驾驶机动车"
        },
        {
            id: "7088",
            name: "涉嫌使用伪造、变造，或者其他车辆号牌"
        },
        {
            id: "7089",
            name: "机动车未按照规定期限进行安全技术检验"
        },
        {
            id: "7090",
            name: "黄标车未按规定时间、道路、区域行驶的"
        },
        {
            id: "7091",
            name: "驾驶擅自改变机动车结构、构造或者特征的车辆上道路行驶的"
        },
        {
            id: "7092",
            name: "机动车违反尾号限行规定，未按规定时间、道路、区域行驶的"
        },
        {
            id: "7093",
            name: "外埠牌照机动车违反早晚高峰限行规定，未按规定时间、道路、区域行驶的"
        },
        {
            id: "7094",
            name: "违反恶劣天气限行规定，机动车在限制通行的区域内行驶"
        },
        {
            id: "70941",
            name: "违反恶劣天气限行规定，机动车在限制通行的区域内行驶"
        },
        {
            id: "7095",
            name: "机动车未按规定时间、道路、区域行驶的"
        },
        {
            id: "7096",
            name: "机动车未按规定时间、道路、区域行驶的"
        },
        {
            id: "7097",
            name: "机动车未按规定时间、道路、区域行驶的"
        },{
            id: "7098",
            name: "使用伪造、变造，或者其他车辆号牌"
        },
        {
            id: "7100",
            name: "残疾人机动轮椅车只准下肢残疾的残疾人使用，其他人员不得使用残疾人机动轮椅车。"
        },
        {
            id: "7101",
            name: "驾驶改装的残疾人专用代步车上路行驶"
        },
        {
            id: "7102",
            name: "在驾驶证暂扣期间仍驾驶机动车的"
        },
        {
            id: "7103",
            name: "因雨雪天气原因来不及清洗车辆导致机动车车身及号牌均被泥浆遮挡当场予以改正的"
        },
        {
            id: "71039",
            name: "不按规定停车"
        },
        {
            id: "7104",
            name: "载货汽车装载货物影响车辆号牌识认，当场予以改正的"
        },
        {
            id: "7105",
            name: "驾驶无牌无证机动三、四轮车上道路行驶的"
        },
        {
            id: "71345",
            name: "违反禁止标线指示"
        },
        {
            id: "7201",
            name: "非机动车的外形尺寸、质量、制动器、车铃和夜间反光装置不符合安全技术标准的"
        }
    ],
    // 事故形态
    accidentForm:[
        { name:"碰撞运动车辆", id:"11" },
        { name:"碰撞静止车辆", id:"12" },
        { name:"其他", id:"19" },
        { name:"刮撞行人", id:"21" },
        { name:"碾压行人", id:"22" },
        { name:"碰撞后碾压行人", id:"23" },
        { name:"其他", id:"29" },
        { name:"侧翻", id:"31" },
        { name:"滚翻", id:"32" },
        { name:"坠车", id:"33" },
        { name:"失火", id:"34" },
        { name:"撞固定物", id:"35" },
        { name:"撞非固定物", id:"36" },
        { name:"自身摺叠", id:"37" },
        { name:"乘员跌落或抛出", id:"38" }
    ],
    count: 0,
    //  当前搜索结果
    resultArr: [],
    // 存储轮巡播放视频的状态
    playingVideo: {},
    // ~websocket控制~
    intelligenceRef: 0, // gis情报告警面板
    // 是否导出之后
    isExport: false,
    isExportParams: "" // 记录原来查询的参数
};

const getters = {
    count(state) {
        return state.count;
    },
    searchArr(state) {
        return state.resultArr;
    }
};

const mutations = {
    // 修改后台特殊消息会弹
    backMessage(state, msg) {
        state.codeStatus.forEach((s, key) => {
            if (s.code === msg.code) {
                vue.set(state.codeStatus[key], "name", msg.message);
            }
        });
    },
    // 记录轮巡信息
    updateVideoInfo(state, videoInfo) {
        state.playingVideo = videoInfo;
    },
    // loading状态
    loadingState(state, bool) {
        state.loading = bool;
    },
    geoLoadingState(state, bool) {
        state.geoLoading = bool;
    },
    sjhLoadingState(state, bool) {
        state.sjhLoading = bool;
    },
    statuLoadingState(state, bool) {
        state.statuLoading = bool;
    },
    // 修改登录状态
    editLoginState(state) {
        state.userLogin = !state.userLogin;
    },
    // 修改是否是退出
    confirmLogout(state) {
        state.logout = !state.logout;
    },
    setCount(state) {
        state.count++;
    },
    // 个人权限内容
    setAuthData(state, authData) {
        state.authData = authData;
    },
    // 个人信息
    getUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 记录搜索分发状态
    getSearchArr(state, payload) {
        state.resultArr = payload;
    },
    removeSearch(state) {
        state.resultArr = [];
    },
    // websocket返回方法
    reGisInfoNotic(state) { // GIS情报告警
        state.intelligenceRef++;
    },
    // 修改特殊事件集合
    setSpecialEventSet(state, specialEventSet) {
        state.specialEventSet = specialEventSet;
    }
};

const actions = {
    handlerSearch({
        commit
    }, payload) {
        commit("getSearchArr", payload);
    },
    handlerCount({
        commit
    }) {
        commit("setCount");
    }
};

const vuexPersisted = new CreatePersistedState({
    key: "state",
    storage: window.sessionStorage,
    modules: state
});
export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [vuexPersisted]
});