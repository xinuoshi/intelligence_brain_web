/**
 * Created by wanghao on 2018/08/30.
 */
// 配置路由
const routes = [{
        // 引入首页
        path: "/",
        component: resolve => require(["../views/Home.vue"], resolve),
        children: [{
            // GIS集控
            path: "/",
            component: resolve => require(["../views/gis-map/gisMap.vue"], resolve),
            name: "GIS集控"
        }]
    },
    {
        // 登录
        path: "/login",
        component: resolve => require(["../views/login.vue"], resolve),
        name: "登录"
    },
    {
        // 大屏显示
        path: "/screenDisplay",
        component: resolve => require(["../views/screen-display/screen-display.vue"], resolve),
        name: "大屏展示1"
    },
    {
        // 大屏显示
        path: "/screenDisplayTwo",
        component: resolve => require(["../views/screen-display/screenDisplayTwo.vue"], resolve),
        name: "大屏展示2"
    },
    {
        // 修改密码
        path: "/changePassword",
        component: resolve => require(["../views/changePassword.vue"], resolve),
        name: "登录"
    },
    {
        // 首页
        path: "/home",
        component: resolve => require(["../views/Home.vue"], resolve),
        children: [{
                //  引入情指勤督的情报自定义页面
                path: "/IntelligenceCustomization",
                component: resolve => require(["../views/To-be-diligent-governor/Intelligence-customization/IntelligenceCustomization.vue"], resolve),
                name: "情报自定义"
            },
            {
                //  引入情指勤督的情报档案页面
                path: "/InformationArchives",
                component: resolve => require(["../views/To-be-diligent-governor/Information-archives/Information-archives.vue"], resolve),
                name: "情报档案",
                children: [{
                        // 自定义情报档案
                        path: "/customintelligence",
                        component: resolve => require(["../views/To-be-diligent-governor/Information-archives/Custom-intelligence.vue"], resolve),
                        name: "自定义情报档案"
                    },
                    {
                        // 告警情报档案
                        path: "/policeintelligence",
                        component: resolve => require(["../views/To-be-diligent-governor/Information-archives/Police-intelligence.vue"], resolve),
                        name: "告警情报档案"
                    }
                ]
            },
            {
                //  引入情指勤督的预案管理页面
                path: "/programManagement",
                component: resolve => require(["../views/To-be-diligent-governor/program-management/program-management.vue"], resolve),
                name: "预案管理"
            },
            {
                //  引入视频集控的云台
                path: "/CloudPlatform",
                component: resolve => require(["../views/Video-gathering-control/Cloud-platform/CloudPlatform.vue"], resolve),
                name: "云台"
            },
            {
                //  引入视频集控的轮训计划
                path: "/TrainingProgram",
                component: resolve => require(["../views/Video-gathering-control/Training-program/TrainingProgram.vue"], resolve),
                name: "轮训计划"
            },
            {
                //  引入研判分析的数据检索
                path: "/dataRetrieval",
                component: resolve => require(["../views/Analysis-and-analysis/data-retrieval/dataRetrieval.vue"], resolve),
                name: "数据检索"
            },
            {
                //  引入研判分析的主体画像
                path: "/SubjectPortrait",
                component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/SubjectPortrait.vue"], resolve),
                name: "主体画像",
                children: [{
                        // 车画像
                        path: "/carPortrait",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/carPortrait"], resolve),
                        name: "车画像"
                    },
                    {
                        // 车画像导出
                        path: "/carPortraitdao",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/carPortraitdao"], resolve),
                        name: "车画像导出"
                    },
                    {
                        // 人画像导出
                        path: "/portraitPersondao",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/portraitPersondao"], resolve),
                        name: "人画像导出"
                    },
                    {
                        // 人画像
                        path: "/portraitPerson",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/portraitPerson"], resolve),
                        name: "人画像"
                    },
                    {
                        // 路画像导出
                        path: "/roadPortraitdao",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/roadPortraitdao"], resolve),
                        name: "路画像导出"
                    },
                    {
                        // 路画像
                        path: "/roadPortrait",
                        component: resolve => require(["../views/Analysis-and-analysis/Subject-portrait/roadPortrait"], resolve),
                        name: "路画像"
                    }
                ]
            },
            {
                //  引入研判分析的交通流分析
                path: "/TrafficFlowAnalysis",
                component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/TrafficFlowAnalysis.vue"], resolve),
                name: "交通流分析",
                children: [{
                        // 交通流管理评价
                        path: "/TrafficFlowManagement",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/TrafficFlowManagement.vue"], resolve),
                        name: "交通流管理评价"
                    },
                    {
                        // 交通流管理评价导出
                        path: "/TrafficFlowManagementOut",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/TrafficFlowManagementOut.vue"], resolve),
                        name: "交通流管理评价导出"
                    },
                    {
                        // 拥堵规律
                        path: "/RuleOfCongestion",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/RuleOfCongestion.vue"], resolve),
                        name: "拥堵规律"
                    },
                    {
                        // 潮汐流规律
                        path: "/TidalCurrent",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/TidalCurrent.vue"], resolve),
                        name: "潮汐流规律"
                    },
                    {
                        // OD规律
                        path: "/ODlaw",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/ODlaw.vue"], resolve),
                        name: "OD规律"
                    },
                    {
                        // 营运车辆规律
                        path: "/OperatingVehicleRule",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-flow-analysis/OperatingVehicleRule.vue"], resolve),
                        name: "营运车辆规律"
                    }
                ]
            },
            {
                //  引入研判分析的交通安全分析
                path: "/TrafficSafetyAnalysis",
                component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficSafetyAnalysis.vue"], resolve),
                name: "交通安全分析",
                children: [{
                        // 交通安全评价
                        path: "/TrafficSafetyEvaluation",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficSafetyEvaluation.vue"], resolve),
                        name: "交通安全评价"
                    },
                    {
                        // 交通安全评价导出
                        path: "/TrafficSafetyEvaluationOut",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficSafetyEvaluationOut.vue"], resolve),
                        name: "交通安全评价导出"
                    },
                    {
                        // 交通事故分析
                        path: "/TrafficAccidentAnalysis",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficAccidentAnalysis.vue"], resolve),
                        name: "交通事故分析"
                    },
                    {
                        // 交通事故分析
                        path: "/download",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/download.vue"], resolve),
                        name: "交通事故分析1"
                    },
                    {
                        // 交通违法分析
                        path: "/TrafficOffenceAnalysis",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficOffenceAnalysis.vue"], resolve),
                        name: "交通违法分析"
                    },
                    {
                        // 交通秩序分析
                        path: "/TrafficOrderAnalysis",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/TrafficOrderAnalysis.vue"], resolve),
                        name: "交通秩序分析"
                    },
                    {
                        // 交通秩序分析导出
                        path: "/TrafficOrderAnalysisdao",
                        component: resolve => require(["../views/Analysis-and-analysis/Traffic-safety-analysis/" +
                        "TrafficOrderAnalysisdao.vue"], resolve),
                        name: "交通秩序分析导出"
                    }
                ]
            },
            {
                //  引入研判分析的内部管理分析
                path: "/InternalManagementAnalysis",
                component: resolve => require(["../views/Analysis-and-analysis/Internal-management-analysis/InternalManagementAnalysis.vue"], resolve),
                name: "内部管理分析",
                children: [{
                        // 交通内部管理评价
                        path: "/EvaluationInternalManagement",
                        component: resolve => require(["../views/Analysis-and-analysis/Internal-management-analysis/EvaluationInternalManagement.vue"], resolve),
                        name: "交通内部管理评价"
                    },
                    {
                        // 设施运行分析
                        path: "/FacilityOperationAnalysis",
                        component: resolve => require(["../views/Analysis-and-analysis/Internal-management-analysis/FacilityOperationAnalysis.vue"], resolve),
                        name: "设施运行分析"
                    },
                    {
                        // 导出设施运行分析
                        path: "/FacilityOperationAnalysisdao",
                        component: resolve => require(["../views/Analysis-and-analysis/Internal-management-analysis/FacilityOperationAnalysisdao.vue"], resolve),
                        name: "设施运行分析1"
                    }
                ]
            },
            {
                //  引入研判分析的综合分析
                path: "/comprehensiveAnalysis",
                component: resolve => require(["../views/Analysis-and-analysis/comprehensive-analysis/comprehensiveAnalysis.vue"], resolve),
                name: "综合分析",
                children: [{
                    // 综合分析
                    path: "/ComprehensiveAnalysisOf",
                    component: resolve => require(["../views/Analysis-and-analysis/comprehensive-analysis/ComprehensiveAnalysisOf.vue"], resolve),
                    name: "综合分析"
                }, {
                    // 综合分析导出
                    path: "/comprehensiveAnalysisOut",
                    component: resolve => require(["../views/Analysis-and-analysis/comprehensive-analysis/comprehensiveAnalysisOut.vue"], resolve),
                    name: "综合分析导出"
                }]
            },
            {
                //  引入交通流管控
                path: "/TrafficFlowControl",
                component: resolve => require(["../views/Traffic-flow-control/TrafficFlowControl.vue"], resolve),
                name: "交通流管控"
            },
            {
                // GIS集控
                path: "/gisMap",
                component: resolve => require(["../views/gis-map/gisMap.vue"], resolve),
                name: "GIS集控"
            },
            {
                //  引入资产页面
                path: "/assetTrafficControlEquipment",
                component: resolve => require(["../views/system-management/asset-management/asset-list/assetTrafficControlEquipment.vue"], resolve),
                name: "交通控制设施"
            },
            {
                // 用户管理
                path: "/userManagement",
                component: resolve => require(["../views/system-management/user-management/userManagement.vue"], resolve),
                name: "用户管理"
            },
            {
                // 日志管理
                path: "/logManagement",
                component: resolve => require(["../views/system-management/log-management/logManagement"], resolve),
                name: "日志管理"
            },
            {
                // 角色管理
                path: "/ruleManagement",
                component: resolve => require(["../views/system-management/ruleManagement/ruleManagement.vue"], resolve),
                name: "角色管理"
            },
            {
                // 单位管理
                path: "/unitManagement",
                component: resolve => require(["../views/system-management/unit-management/unitManagement.vue"], resolve),
                name: "单位管理"
            },
            {
                // 机房管理
                path: "/computerRoomManagement",
                component: resolve => require(["../views/system-management/computer-room-management/computer-room-management.vue"], resolve),
                name: "机房管理"
            },
            {
                // AI设备管理
                path: "/AIDeviceManagement",
                component: resolve => require(["../views/AI-device-management/AI-device-management.vue"], resolve),
                name: "AI设备管理"
            },
            {
                // 参数设置
                path: "/tidalFlowindex",
                component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/tidal-Flow-index"], resolve),
                name: "参数管理",
                children: [{
                        // 参数设置-潮汐流阈值
                        path: "/tidalflow",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/tidal-flow"], resolve),
                        name: "潮汐流指数阈值"
                    },
                    {
                        // 参数设置-情报间隔
                        path: "/intelligenceinterval",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/Intelligence-interval"], resolve),
                        name: "潮汐流指数阈值"
                    },
                    {
                        // 参数设置-数据管理
                        path: "/datamanagement",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/data-management"], resolve),
                        name: "数据管理"
                    },
                    {
                        // 参数设置-情报阈值
                        path: "/intelligencethreshold",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/Intelligence-threshold"], resolve),
                        name: "情报阈值"
                    },
                    {
                        // 参数设置-告警显示规则
                        path: "/warningrules",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/warning-rules"], resolve),
                        name: "告警显示规则"
                    },
                    {
                        // 参数设置-偏离/限行规则
                        path: "/deviationLineimit",
                        component: resolve => require(["../views/system-management/system-settings/Traffic-flow-control-parameters/deviation-line-limit"], resolve),
                        name: "偏离限行规则"
                    }
                ]
            },
            {
                // 字典管理
                path: "/dictionaryManagement",
                component: resolve => require(["../views/system-management/dictionary-Management/dictionary-Management/dictionary-Management.vue"], resolve),
                name: "字典管理"
            },
            {
                // 组件库
                path: "/assetDictionary",
                component: resolve => require(["../views/system-management/asset-management/asset-list/asset-dictionary.vue"], resolve),
                name: "组件库"
            },
            {
                // 系统帮助
                path: "/systermHelp",
                component: resolve => require(["../views/system-management/systermHelp/systermHelp.vue"], resolve),
                name: "系统帮助"
            },
            {
                // 协同单位管理
                path: "/collaborativeunitmanagement",
                component: resolve => require(["../views/system-management/collaborative-unit-management/collaborativeunitmanagement.vue"], resolve),
                name: "协同单位"
            }
        ]
    },
    {
        // 全屏地图
        path: "/fullScreenGis",
        component: resolve => require(["../views/gis-map/fullScreenGis.vue"], resolve)
    }
];
export default routes;