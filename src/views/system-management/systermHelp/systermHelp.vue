<template>
  <div class="out">
    <div class="treeBody">
      <!-- 左侧 -->
      <div class="help flexColumn">
        <!-- 导航栏 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo helpDh">
            <div v-for="(item, index) in data2" :key="index" >
                <el-submenu v-if="item.children" :index="index+'ss'">
                    <template slot="title">
                      <a :href="'#'+item.id" target="_self" :id="item.id+'help'">
                        <i class="el-icon-caret-right"></i>
                        <span>{{item.label}}</span>
                      </a>
                    </template>
                    <div v-for="(items,i) in item.children" :key="i">
                        <el-menu-item-group  v-if="!items.children"  class="noneI" >
                            <el-menu-item :index="index+'-'+i+'ss'">
                              <a :href="'#'+items.id" target="_self" :id="items.id+'help'">
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              {{items.label}}
                              </a>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-submenu :index="index+'-'+i+'ss'" v-if="items.children">
                            <template slot="title">
                              <a :href="'#'+items.id" target="_self"  :id="items.id+'help'">
                                &nbsp;&nbsp;&nbsp;
                                <i class="el-icon-caret-right"></i>
                                {{items.label}}
                                </a>
                            </template>
                            <el-menu-item :index="index+'-'+i+'-'+v+'ss'" v-for="(val,v) in items.children"  :key="v">
                                <a :href="'#'+val.id" target="_self"  :id="val.id+'help'">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {{val.label}}
                                </a>
                            </el-menu-item>
                        </el-submenu>
                    </div>
                </el-submenu>
                <el-menu-item v-if="!item.children" :index="index+'ss'">
                    <a :href="'#'+item.id" target="_self" :id="item.id+'help'" >
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span slot="title">
                        {{item.label}}
                      </span>
                    </a>
                </el-menu-item>
            </div>
          </el-menu>
          <!-- 下载按钮 -->
        <div class="Down">
          <!-- <div class="exportBtn" @click="canleGetPdfDown()">下载</div> -->
          <!-- <a style="display:block" target="view_window" href="http://211.159.157.184/file/%E6%99%BA%E8%84%91%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8CV1.0.pdf" >
            <div class="exportBtn"> 下载 </div>
          </a> -->
          <a style="margin-left: 100px;" target="view_window" href="http://211.159.157.184/file/%E6%99%BA%E8%84%91%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V1.4.pdf" >
            <div class="exportBtn"> 下载 </div>
          </a>
        </div>
      </div>
      <!-- 右侧，数据内容循环 -->
      <div class="flexNum flexRow bodyHelpBox">
          <div class="flexNum"></div>
          <div id="bodyHelp">
            <div id="pdfDom2">
              <div v-for="(item, index) in data2" :key="index" :id="item.id">
                  <div class="head" >
                    {{item.label}}
                  </div>
                  <div v-for="(items, i) in item.value" v-show="item.value" class="C_I" :class="{C_I_AllBox:items.p.length===1&& items.p[0].length<5 && items.img && !items.none}" :key="i">
                      <div v-for="(items1, i1) in items.p" class="content" :key="i1+'a'">{{items1}}</div>
                      <img v-if="items.img" class="imgHelp" :class="items.class" :src="items.img"/>
                      <h3 v-if="items.h3" class="imgHelp" >{{items.h3}}</h3>
                  </div>
                  <div v-for="(items, i) in item.children" v-show="item.children" :key="i+'b'" :id="items.id">
                      <div class="head2" >
                        {{items.label}}
                      </div>
                      <div :class="{flexUsint:items.flex}">
                        <div v-for="(val, v) in items.value"  v-show="items.value"  class="C_I" :class="{C_I_AllBox:val.p.length===1 && val.p[0].length<5 && !val.none && val.img ,flexUC_I:val.flex }" :style="{width:val.width}" :key="v">
                            <div v-show="val1[0].length>1" v-for="(val1, v1) in val.p" :key="v1+'c'" >
                              <div v-for="(val2, v2) in val1"  class="content" :key="v2+'d'">
                                {{val2}}
                              </div>
                            </div>
                            <div v-show="val1[0].length === 1"  v-for="(val1, v1) in val.p"  class="content" :key="v1+'e'" >{{val1}}</div>
                            <img v-if="val.img" class="imgHelp"  :class="val.class"  :src="val.img"/>
                            <h3 v-if="val.h3" class="imgHelp" >{{val.h3}}</h3>
                        </div>
                      </div>
                      <div v-for="(val, v) in items.children"  v-show="items.children" :key="v+'f'" :id="val.id" >
                          <div class="head2" >
                              {{val.label}}
                          </div>
                          <div :class="{flexUsint:val.flex}">
                            <div v-for="(vals, vs) in val.value" v-show="val.value"  class="C_I" :class="{C_I_AllBox:vals.p.length===1 && vals.p[0].length<5 && !vals.none && vals.img,flexUC_I:vals.flex}" :style="{width:vals.width}" :key="vs+'g'">
                                <div v-show="vals1[0].length>1" v-for="(vals1, vs1) in vals.p" :key="vs1+'h'">
                                  <div v-for="(vals2, vs2) in vals1" :key="vs2+'i'"  class="content">
                                    {{vals2}}
                                  </div>
                                </div>
                                <div v-show="vals1[0].length === 1" v-for="(vals1, vs1) in vals.p" class="content" :key="vs1+'j'">{{vals1}}</div>
                                <img v-if="vals.img" class="imgHelp"  :class="vals.class"  :src="vals.img"/>
                                <h3 v-if="vals.h3" class="imgHelp">{{vals.h3}}</h3>
                            </div>
                          </div>
                        </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="flexNum"></div>
      </div>
    </div>
  </div>
</template>
<style>
.width550{
  width: 500px;
  margin-top: 25px;
}
#pdfDom2>div,
#pdfDom2>div>div{
  margin-bottom: 20px;
}
.flexUsint{  
    display: flex;
    flex-wrap: wrap;
}
.C_I{
  text-align: center;
}

.C_I_AllBox{
  display: flex;
  margin-top: 5px;
}
.C_I_AllBox2 .content{
  width: 35%;
}
.content{
    display: block;
    font-size: 14px;
    text-align: left;
    text-indent:35px;
    margin-bottom: 5px;
    margin-left: 55px;
}
.imgHelp{ 
    /* margin-left: 100px; */
    max-width: 90%;
}
.el-submenu.is-opened a i:before{
  transform: rotate(0deg);
  display: block;
  margin-top: 6px;
}
.el-submenu.is-opened a i{
  transform: rotate(0deg);
  display: block;
  margin-top: 0px !important;
}
.el-submenu.is-opened>div>a i:before{
  transform: rotate(90deg);
  display: block;
}
.help a{
  text-decoration: none;
  color: #fff;
  display: flex;
}
.noneI:after{
  width: 100px;
  height: 100px;
}
.treeBody {
  display: flex;
  flex-direction: row !important;
  border-top: 1px solid rgb(23, 58, 96);
  width: 100%;
  height: 100%;
}
#bodyHelp>#pdfDom2{
  padding: 15px 1vw 10px 1vw !important;
}
.bodyHelpBox{
  overflow: auto;
}
#bodyHelp {
  min-width:400px ;
  width: 60%;
  color: #fff;
}
.help {
  background: #021632;
  width: 300px;
}
.help .el-tree,.helpDh{
  flex: 1;
  overflow: auto;
}
.help .el-menu-item i:first-child,.help .el-submenu__title i:first-child{
  margin-right: 5px;
  margin-top: 5px;
}
.Down{
  height: 50px;
  line-height: 100px;
}
.help .el-tree,
.help .el-tree-node__expand-icon,
.helpDh i,
.helpDh .el-submenu.is-active i{
  background: transparent;
  color: #fff !important;
}
.help .is-active>a,.help .is-active>a span{
    color: #137db7;
}
.help .el-menu-item:hover, 
.help .el-submenu .el-menu-item:hover,
.help .el-submenu .el-menu-item.is-active,
.help .el-submenu__title:hover,
.help .el-menu-item.is-active,
.help .el-submenu.is-active .el-submenu__title,
.help .el-submenu__title,
 .help .el-submenu .el-menu-item,
.help .el-menu-item, .help .el-submenu__title,
.help .el-submenu .el-menu-item, 
.help .leftNavigation,
 .help .el-menu-item-group__title{  
  background: transparent;
  color: #fff;  
  height: 30px;
  line-height: 30px;
  border: 0 !important;
  text-align: left;
  padding-left: 0px !important;
}
.help .el-menu-item,.helpDh .el-menu-vertical-demo>div {
    border-bottom: 0px solid #4F8CC8;
}
.help .el-menu-item-group__title,.help .el-menu-item-group__title{
  padding: 0;
  height: 0;
}
.help .el-tree-node__content:hover {
  background-color: #fff;
  color: #fff;
}  
.el-tree-node__label{
  font-size: 14px
}
.head{
    font-size: 16px;
    display: block;
    text-align: left;
    margin-bottom: 10px;
}
.head2{
    font-size: 16px;
    display: block;
    text-align: left;
    margin-left: 25px;
    margin-bottom: 10px;
}
</style>
<script>

import { Loading } from 'element-ui';
export default {
  data() {
    return {
      htmlTitle: "智脑用户手册",
      data2: [
        {
          label: "系统概述",
          value:[
            {p:["根据城市交通运行管理特点，基于智慧城市建设现状及规划设计，天津易华录将城市智慧交通管理大脑功能定位为利用人工智能、互联网+、大数据、云计算、蓝光存储等高新技术，以交管数据为核心，融合政府其他部门相关管理数据、互联网交通数据和其他社会资源数据，实现人、车、路、设施、事件、勤务等交通要素全息感知展示；实现交通运行水平、交通安全水平、交通管理水平数据化评比分析。",
            "智脑模块划分："],
            img:""}
          ]
        },
        {
          label: "1.登陆",
          value:[
            {p:["用户输入用户名和密码登录系统，初始密码为“111111”。",
            "如果忘记密码需要联系管理员重置密码。"],
            img:"",
            h3:"图 1 登陆界面"}
          ]
        },
        {
          label: "2.个人中心",
          value:[
            {p:["进入平台后个人中心位于界面右上角，有退出登录和修改密码功能。"],
            img:""},
            {p:["修改密码需要用户输入原密码和两次确认新密码。"],img:"",
            h3:"图 3 修改密码界面"}
          ]
        },
        {
          label: "3.GIS集控",
          value:[
            {p:["GIS集控模块基于地图，综合情报、车流量等数据，实现了情报告警、交通状态、OD轨迹、潮汐流现象、区域交通构成、营运车辆、路口交通流的展示。"],
            img:"",
            h3:"图 4 GIS集控"}
          ],
          children: [
            {
              label: "3.1.基础功能",
              value:[
                {
                  p:["GIS的基础功能包括地图、工具栏、比例尺、图层控制、地理位置查询。",
                  "工具栏位于地图中间顶端，鼠标移入时唤出，工具包括：缩小地图、放大地图、框选、标记、测量、保存、全屏。"],
                  img:"",
                  h3:"图 5 工具栏"
                },
                {
                  p:["鹰眼功能位于地图右下角，可以查看地图框中所显示的地图在整个图中的位置，也可以快捷切换当前查看的地图位置。"],
                  img:"",
                  h3:"图 6 鹰眼"
                },
                {
                  p:["告警情报类型：", "1.烟雾/火灾；", "2.交通事故；",
                  "3.路口交通溢出拥堵；",
                  "4.车辆逆行；","5.牌照无法识别；","6.交通流量异常；",
                  "7.违反限行；","8.报废车辆上路行驶；","9.非机动车闯红灯；",
                  "10.外地车数量异常；","11.逾期未检车辆上路行驶；","12.机动车闯红灯；",
                  "13.不文明停车；","14.状态异常车辆识别；","15.路口车辆交通秩序混乱；",
                  "16.行人闯红灯；","17.路段交通严重拥堵；","18.车辆偏离路线；","19.车型构成异常；",
                  "20.行人翻越护栏；","21.信号灯不正常显示；","22.占道施工；","23.道路积水。",
                  "设备类型：","交通控制设施：信号机、信号灯。","交通信号方案：信号配时。",
                  "交通检测设施：微波、地磁、视频检测。","电警监控设施：电子警察、卡口、违停、视频监控。",
                  "交通诱导设施：诱导屏。","交通安全设施：标志、标线、护栏。","图层控制按钮在地图中间左端，点击唤出图层控制侧边栏，通过其中的选项可以控制在地图上显示/隐藏情报、设备、点位信息。"],
                  img:"",
                  h3:"图 7 图层控制"
                }
              ]
            },
            {
              label:"3.2.情报告警",
              value:[
                {p:[
                  "默认展示23种情报的告警，地图标记、公告栏、详情弹窗、右侧边栏播放视频。可以使用图层筛选显示的情报类型。",
                  "点击情报图标出现对话框，包含事件简略信息和操作按钮，对于自定义情报可以取消告警、展示详情，对于告警情报可以查看视频、展示详情。"
                ],
                img:"",
                h3:"图 8 情报告警"
                },
                {p:[
                  "情报告警：出现红色情报图标同时闪烁3秒。",
                  "情报结束：红色图标在情报事件结束时变灰，情报显示时长参数控制灰色图标停留时长，消失时图标同样闪烁3秒。",
                  "在地图左上方人工录入按钮，通过地图选点或轨迹绘制和区域模糊匹配，可以快捷录入道路积水、占道施工情报信息，生成手动告警情报。"],
                img:"",
                h3:"图 9 人工录入情报"},{
                  p:["地点绘制：点击上方绘制工具栏的标记或路段按钮，标记是鼠标单击地图一点，路段是鼠标连续点击地图，最后双击完成绘制一条路段，再次点击绘制工具可以清空已绘制内容。"],
                  img:"",
                  h3:"图 10 地图绘制事件地点"
                }
              ]
            },
            {
              label:"3.3.交通状态观测与拥堵规律分析",
              children:[
                {
                  label:"3.3.1.交通状态观测",
                  value:[
                    {p:[
                      "交通状态观测分为地图和侧边栏。",
                      "地图上用不同颜色区别展示全部5个状态等级的路口、路段的实时交通运行状态，侧边栏展示区域交通运行指数、区域和路段延时排行榜、路口拥堵和失衡排行榜。",
                      "鼠标移入地图上的路段轨迹，显示该路段的状态等级和车辆数。",
                      "在地图左上角的交通状态等级图例，可对地图上展示的运行状态进行筛选。"],
                      img:"",
                      h3:"图 11 交通状态观测"}
                  ]
                },
                {
                  label:"3.3.2.拥堵规律分析",
                  value:[
                    {p:["区分工作日和非工作日，展示津南区日均拥堵指数、各行政区日均交通构成、早高峰拥堵指数排行榜、晚高峰拥堵指数排行榜、高峰拥堵指数排行榜、日均拥堵指数排行榜。"],
                      img:"",
                      h3:"图 12 拥堵规律分析"}
                  ]
                }
              ]
            },
            {
              label:"3.4 OD观测与规律",
              children:[
                {
                  label:"3.4.1.OD观测",
                  value:[
                    {p:["以3分钟的刷新频率，在地图上展示实时OD轨迹，车辆数级别越高，颜色越深，鼠标靠近轨迹显示该OD轨迹的车辆数。"],
                      img:"",
                      h3:"图 13 OD观测"}
                  ]
                },
                {
                  label:"3.4.2.OD规律",
                  value:[
                    {p:["默认展示近7天的日均OD规律，在地图左上角可以以点位到点位或区域到区域的形式设置起终点，结合时间段、工作日、非工作日进行筛选，鼠标靠近轨迹显示盖OD轨迹的时段和车辆数。"],
                      img:"",
                      h3:"图 14 OD规律"}
                  ]
                }
              ]
            },
            {
              label:"3.5 潮汐流观测与规律",
              children:[
                {
                  label:"3.5.1.潮汐流观测",
                  value:[
                    {p:["展示路段上实时发生的潮汐流现象，用不同颜色区分等级，可以对级别筛选显示，鼠标靠近轨迹显示该段潮汐流的正向流量、反向流量、当前CXI、预计对称时段CXI、日期类型。",
                    "潮汐流级别可配置，详情配置见7.4.2交通流管控参数。"],
                    img:"",
                    h3:"图 15 潮汐流观测"}            
                  ]
                },
                {
                  label:"3.5.2.潮汐流规律",
                  value:[
                    {p:["默认展示近7天日均潮汐流轨迹，在地图左上角可以对时间段、潮汐流级别、工作日、双休日、法定节假日进行筛选，鼠标靠近轨迹显示该段潮汐流的正向流量、反向流量、当前CXI、预计对称时段CXI、日期类型。"],
                    img:"",
                    h3:"图 16 潮汐流规律"}            
                  ]
                }
              ]
            },
            {
              label:"3.6.交通构成观测",
              value:[
                {p:["直接在地图上绘制8个镇的范围，展示各镇当天的到达、驶离、内部、过境交通量及占比。"],
                img:"",
                h3:"图 17 交通构成观测"}
              ]
            },
            {
              label:"3.7.营运车辆观测与规律",
              children:[
                {
                  label:"3.7.1.营运车辆观测",   
                  value:[
                    {p:[
                      "默认在地图上展示实时的营运车辆轨迹，鼠标移入轨迹时显示车辆种类、轨迹速度。",
                      "可以通过车辆种类筛选展示范围。",
                      "车辆种类：",
                      "1.警车；",
                      "2.公交车；",
                      "3.大货车；",
                      "4.大客车；",
                      "5.救护车；",
                      "6.消防车；",
                      "7.危险品运输车。"],
                      img:"",
                      h3:"图 18 营运车辆观测"
                    }
                  ]
                },
                {
                  label:"3.7.2.营运车辆规律",   
                  value:[
                    {p:[
                      "默认展示近7天的营运车辆轨迹，鼠标移入轨迹时显示车辆种类、轨迹速度。侧边栏展示各类车辆的交通延时指数和平均行驶速度。"],
                      img:"",
                      h3:"图 19 营运车辆规律"
                    }
                  ]
                }
              ]
            },
            {
              label:"3.8.路口交通流观测",
              value:[
                {p:["默认在地图上展示全部点位，点击点位图标 或使用搜索功能切换侧边栏显示的对应图表，同时点位图标变为红色。"]},
                {p:["在侧边栏可以更改所选点位、时间段、车流量统计图维度（东进口、西进口、南进口、北进口、直行、掉头、左转、右转、大型车、中型车、小型车、非机动车）进行任意搭配查询统计，查看设备实时视频。"],
                img:"",
                h3:"图 20 路口交通流观测"}
              ]
            }
          ]
        }, 
        {
          label: "4.视频集控",
          value:[
            {p:["视频集控通过接入电子警察、卡口、视频检测、视频监控、违停的设备视频，实现了查看实时监控和自定义轮巡的功能。"]}
          ],
          children: [
              {
              label: "4.1 云台",
                value:[
                  {p:["云台功能是用来查看视频类设备的实时画面和执行轮巡计划的显示界面。",
                  "在云台实时模式，设备列表默认显示全部设备，可以搜索设备名称直接查找。",
                  "双击设备或者将设备拖动至播放窗口开始播放，窗口尺寸和窗口数（1、3、4、6、8、9、10、13、14、16、26、36、49、64）可以设置。",
                  "可以点击播放窗口右上角的关闭来关闭单个正在播放的设备，当窗口中有正在播放的视频时，禁止手动减少窗口数。",
                  "播放中的设备被添加至播放列表，在设备列表中会变为绿色。"],
                  img:"",
                  h3:"图 21 云台实时模式"},
                  {p:["在云台实时界面，点击右下角轮巡模式，切换至轮巡模式的播放界面，按预设的轮巡计划播放。",
                  "轮巡模式按照执行中的轮巡计划，循环播放。"],img:"",
                  h3:"图 22 云台轮巡模式"}
                ]
            }, 
            {
              label: "4.2.轮巡计划",
                value:[
                  {p:["轮巡计划模块是对于单组和组件轮巡计划管理功能，组间计划由单组计划组合而成，可启用无重叠时间的多个计划，按照计划开始时间自动执行。"],
                  img:"",h3:"图 23 轮巡计划"},
                  {p:["创建单组计划需要输入轮巡名称、时间、间隔、分屏数，然后选择设备组合。"],
                  img:"",h3:"图 24 创建单组轮巡计划"},
                  {p:["创建组间计划需要输入轮巡名称、时间，然后可以将多个单组计划组合，或者同时创建新的单组计划，被应用进组间计划的单组计划会使用组间计划的执行时间。"],
                  img:"",h3:"图 25 创建组间轮巡计划"
                  }
                ]
            }
          ]
        }, 
        {
          label: "5.情指勤督",
          value:[
            {
              p:[
                "情指勤督模块围绕情报提供服务，本期实现了人工录入自定义情报、所有情报自动归档存储和处理预案编辑功能。"
              ]
            }
          ],
          children: [
            {
              label: "5.1.自定义情报",
              value:[
                {p:["情报自定义模块用于管理人工录入的占道施工和道路积水两类事件，并且在地图情报界面提供了创建自定义情报的快捷方式，可以通过手动关闭告警中的自定义事件来结束地图上的显示，正在进行的事件存在“关闭事件”按钮，已结束的事件只可以进行查看操作。"],
                img:"",h3:"图 26 自定义情报"
                },
                {p:["创建自定义情报必填事件类型、事件名称、起止时间、区域，在地图上点选或绘制事件地点。"],
                img:"",h3:"图 27 创建自定义情报"
                }
              ]
            }, 
            {
            label: '5.2.情报档案',
              value:[
                {p:["情报档案模块划分为自定义情报档案和告警情报档案，用于存储和查看已经结束归档的情报信息。",
                "可以以excel格式导出。"],
                img:"",h3:"图 28 情报档案"}
              ]
            }, 
            {
            label: '5.3.预案管理',
              value:[
                {p:["预案管理模块是对于事件处理预案的编辑功能，以事件级别为最小粒度，编辑多项处理方式。",
                "操作顺序是将左侧处理步骤拖入中间画布，在右侧编辑栏对每个步骤编辑，然后点击画布左上角连线按钮对每个步骤进行连线，然后点击画布右下角按钮保存该项预案。",
                "可以点击画布左上第二个按钮清空整个画布。"],img:"",h3:"图 29 预案管理"}
              ]
            }
          ]
        }, 
        {
          label: "6.研判分析",
          value:[
              {
                p:["研判分析模块实现了全息档案检索和主体画像、交通流分析、交通安全分析、内部管理分析、综合分析的可视化图表。"]
              }
          ],
          children:[
            {
            label:"6.1 数据检索",
            children: [
              {
                label: "6.1.1 关联组合检索",
                value:[
                  {p:["关联组合检索通过对人、车、路、违法、事故的分别查询，关联出各自之间的联系。",
                  "在人员档案详情中，还可以查看该人的车辆档案、违法档案、事故档案。",
                  "在车辆档案详情中，还可以查看该车的事故档案、违法档案、人员档案。",
                  "在道路档案详情中，还可以查看该道路的违法档案、事故档案。",
                  "在违法档案详情中，还可以查看该次事件的道路档案、人员档案、车辆档案。",
                  "在事故档案详情中，还可以查看该次事件的人员档案、车辆档案、道路档案。"],
                  img:"",h3:"图 30 关联组合检索"}
                ]
              },
              {
                label:"6.1.2 业务主题检索",
                value:[
                {p:["业务主题检索通过多维度条件，查询展示包括时间、点位、姓名、身份证号、车辆号牌、车型、车辆颜色的过车数据。"],
                img:"",h3:"图 31 业务主题检索"}
                ]
              }
            ]
          },
          {
            label: '6.2 主体画像',
            value:[
              {p:["对“全息档案”中的人、车、路档案进行画像展示。"]}
            ],
            children:[
              {
                label: "6.2.1 人画像",
                value:[
                    {p:["人画像：近五年驾驶员数量统计（人）、职业统计（人）、年龄统计（人）、驾龄统计（人）、违法扣分统计（人）、性别统计（人）。"
                    ],img:"",h3:"图 32 人画像"}
                ]
              },
              {
                label: "6.2.2 车画像",
                value:[
                    {p:["车画像：近五年机动车数量统计（辆）、车检状态统计（辆）、使用性质统计（辆）、违法扣分统计（辆）、属地统计（辆）、报废状态统计（辆）。"
                    ],img:"",h3:"图 33 车画像"}
                ]
              },
              {
                label: "6.2.3 路画像",
                value:[
                    {p:["路画像：区域道路级配统计（条）、道路高频积水点数量统计（条）、区域路网密度统计（千米/平方千米）。"
                    ],img:"",h3:"图 34 路画像"}
                ]
              }
            ]
          },
          {
            label: '6.3.交通流分析',
            value:[{
              p:[
                "交通流分析是交通流管理评价的图表展示页面。",
                "交通流管理评价以柱状图展示各区域交通流管理评价指数，鼠标靠近展示该镇的交通流管理评价指数、指数环比，可以通过时间段查询。"
              ],img:"",h3:"图 35 交通流分析"
            }]
          }, 
          {
            label: '6.4 交通安全分析',
            value:[
                {p:["交通安全分析分为交通安全评价、交通事故分析、交通违法分析、交通秩序分析，以图表展示各项统计结果。",
                "交通安全评价：各区域交通安全管理指数。","可以通过时间段查询。"],img:"",
                h3:"图 36 交通安全评价"}, 
                {p:["交通事故分析：企业事故排行榜、事故24小时数量分布（起）、涉事驾驶员性别统计（人）、涉事驾驶员年龄统计（人）、涉事驾驶员驾龄统计（人）、涉事驾驶员违章次数统计（人）、涉事驾驶员累计扣分统计（人）、涉事驾驶员历史事故统计（起）、事故天气类型分布（天）、各行政区事故数量及环比同比、涉事人员属地统计（人）、涉事机动车属地统计（辆）、事故类型分布（起）、涉事机动车类型统计（辆）、涉事机动车颜色统计（辆）、涉事机动车使用性质统计（辆）、涉事机动车用途性质统计（辆）、涉事机动车违法次数统计（辆）、涉事机动车事故次数统计（辆）、涉事机动车所有权统计（辆）。",
                "可以通过区域和时间段查询。"],
                img:"",h3:"图 37 交通事故分析"},
                {p:["交通违法分析：企业违法排行榜、违法24小时数量分布（起）、违法驾驶员性别统计（人）、违法驾驶员年龄统计（人）、违法驾驶员驾龄统计（人）、违法驾驶员违章次数统计（人）、违法驾驶员累计扣分统计（人）、违法驾驶员历史违法统计（起）、各行政区违法数量及环比同比、违法人员属地统计（人）、违法机动车属地统计（辆）、违法行为分布（起）、违法机动车颜色统计（辆）、违法机动车使用性质统计（辆）、违法机动车用途性质统计（辆）、违法机动车违法次数统计（辆）、违法机动车事故次数统计（辆）、违法机动车所有权统计（辆）。",
                "可以通过区域和时间段查询。"],img:"",h3:"图 38 交通违法分析"}, 
                {p:["交通秩序分析：各行政区负秩序事件数量及环比同比、负秩序事件24小时数量分布（起）、负秩序事件类型分布（起）。",
                "可以通过区域和时间段查询。"],img:"",h3:"图 39 交通秩序分析"}
            ]
          },
          {
            label: '6.5 内部管理分析',
            value:[
                {p:["内部管理分析目前仅包括设施运行分析，以图表展示各项统计结果，包括：电子警察覆盖率、电子警察覆盖率环比同比、人行灯覆盖率、人行灯覆盖率环比同比、斑马线覆盖率、斑马线覆盖率环比同比、外场设施数量及环比（个）、行政区事故高发路段排名。",
                "可以通过区域、时间段、设备类型查询。"],img:"",h3:"图 40 设施运行分析"}   
            ]
          },
          {
            label: '6.6 综合分析',
            value:[
                {p:["以图表展示各区域交通管理综合指数，鼠标靠近展示指数和环比。","可以通过时间段查询。"],
                img:"",h3:"图 41 综合分析"}
              ]
          }
        ]
        }, 
        {
          label: "7.AI配置",
          value:[
                {p:["AI配置模块是对电子警察、卡口、视频检测、视频监控、违停设备检测情报事件配置的管理功能。",
                "配置方式以设备为主体，通过选择检测事件类型和绘制监控监测范围，精确规范每一个设备的检测配置。"],
                  img:"",h3:"图 42 AI配置"},
                {p:["配置流程为勾选设备点击右上角批量配置或直接对单个设备点击右侧操作栏的配置按钮：",
                "第一步，分配事件，在穿梭框左侧勾选事件，点击添加按钮添加至右侧，可在右侧勾选事件后点击撤回按钮取消选择。"],
                img:"",
                h3:"图 43 AI分配事件"},
                {p:[
                  "第二步，如果所选事件均为不需画框，可以直接完成配置。如果所选事件需要画框，点击下一步转至线框配置界面。对左侧设备列表进行线框配置，点击轨迹框/护栏线按钮开始绘制，轨迹框为依次点击四个点绘制成框，护栏线为二点连线。（其中轨迹框起点和终点连成的线代表车辆进入方向）",
                  ],img:"",h3:"图 44 AI线框配置"},
                {p:["注：",
                "（1）仅对于完成配置的设备可以启用/停用AI功能。",
                "（2）设备分为固定相机（电子警察、卡口、视频检测、视频监控（固定角度））、可动相机（违停、视频监控（可动角度））。",
                "（3）固定相机可配置事件：道路积水、烟雾/火灾、交通事故、交通溢出拥堵、车辆逆行、牌照无法识别、交通流量异常、违反限行、报废车辆上路行驶、非机动车闯红灯、外地车数量异常、逾期未检车辆上路行驶、机动车闯红灯、不文明停车、状态异常车辆识别、路口交通秩序混乱、行人闯红灯、路段交通严重拥堵、车辆偏离路线、车型构成异常、行人翻越护栏、信号灯不正常显示。",
                "（4）可动相机可配置事件：道路积水、烟雾/火灾、交通事故。",
                "（5）需画轨迹框事件：路口交通溢出拥堵、路段交通严重拥堵、车辆逆行、不文明停车、机动车闯红灯、行人闯红灯、非机动车闯红灯、路口交通秩序混乱、牌照无法识别、状态异常车辆识别、车辆偏离路线、交通流量异常、车型构成异常、违反限行、报废车辆上路行驶、逾期未检车辆上路行驶、外地车数量异常。",
                "（6）需画护栏线事件：行人翻越护栏。",
                "（7）不需线框事件：信号灯不正常显示、交通事故、烟雾/火灾、道路积水。",
                "（8）任一设备在配置结束时，如果存在缺少线框的事件，会出现提示，保存后则该类事件的检测功能自动失效。",
                "（9）对已配置完成的设备再次进行配置，会覆盖上次配置。"
                ]}
          ]
        }, 
        {
          label: "8.系统配置",
          value:[
            {p:["系统配置是城市智慧交通管理大脑运行的基础，通过单位-角色-用户的结构为系统配置账户权限，结合数据的分类和资产与组件自动绑定等机制，为各级单位业务和数据互通提供了支持。"]}
          ],
          children: [
            {
              label: "8.1 单位管理",
              value:[
                  {p:["单位管理模块采用树状结构，清晰直观，是单位分级管理的基础支撑。"],
                    img:"",h3:"图 45 单位管理"},
                  {p:["使用右上角按钮来创建一级单位，在任意单位的操作里点击添加来创建下级单位。"],
                    img:"",h3:"图 46 创建单位"
                  },
                  {p:["处于启用状态的单位禁止编辑和删除。"],img:"",h3:"图 47 修改单位提示" },
                  {p:[],img:"",h3:"图 48 删除单位提示"},
                  {p:["处于禁用的单位会被禁止分配给角色。","存在启用用户的单位不可被停用。",
                  "存在用户的单位不可被删除。"]}
                ]
            }, 
            {
              label: '8.2 角色管理',
              value:[
                  {p:["角色管理模块用于管理可从属于多个单位的角色，并为其分配系统权限。"],
                  img:"",h3:"图 49 角色管理"},
                  {p:["使用右上角按钮创建角色。"],
                  img:"",h3:"图 50 创建角色"},
                  {p:["需要点击编辑单位给角色分配一个或多个所属单位。",
                  "左侧是单位的树状结构，可以勾选，右侧是被选中的单位集合。"],
                  img:"",h3:"图 51 角色分配单位"
                  },
                  {
                    p:["需要给角色分配系统使用权限。"],img:"",h3:"图 52 角色分配权限"
                  },{
                    p:["最后点击保存，创建完成一个角色。",
                    "处于启用状态的角色禁止编辑和删除。"],
                    img:"",h3:"图 53 修改角色提示"
                  },{
                    p:[],img:"",h3:"图 54 删除角色提示"
                  }
              ]
            }, 
            {
              label: '8.3 用户管理',
              value:[
                  {p:["用户管理模块用于创建和管理使用系统的账户，并为其分配单位和角色，具体到每一个用户。"],
                  img:"",h3:"图 55 用户管理" },
                  {p:["使用右上角按钮创建用户，需要给用户分配所属单位，然后根据所属单位分配所属角色。"],
                  img:"",h3:"图 56 创建用户" },
                  {p:["点击操作栏中的密码初始化，可以将对应用户的密码重置为111111。"],
                  img:"",h3:"图 57 用户重置密码" },
                  {p:["处于启用状态的用户禁止编辑和删除。"],img:"",h3:"图 58 修改用户提示"},
                  {p:[],img:"",h3:"图 59 删除用户提示"},
                  {p:["处于停用状态的用户会被禁止登录系统。","被删除的用户会立即被强制下线。"]}
              ]
            }, 
            {
              label: '8.4 参数管理',
              children:[
                {
                  label:"8.4.1 通用参数",
                  value:[
                  {p:["通用参数对数据存储时长进行配置，以整数天为单位配置交通事件数据（图片、文本记录、视频）和交通过车数据（图片、文本记录）的存储时长。"],
                  img:"",h3:"图 60 通用参数"}
                  ]
                },
                {
                  label:"8.4.2 交通流管控参数",
                  value:[
                  {p:["交通流管控参数对潮汐流指数级别配置，可自由增减潮汐流级别1-5级，配置属于各级别的CXI数值范围。"],
                  img:"",h3:"图 61 交通流管控参数"}
                ]
                },
                {
                  label:"8.4.3 情报检测阈值",
                  value:[
                  {p:["情报检测阈值对多个情报的检测数值配置，包括交通流量异常4个级别的判断幅度、外地车数量占比波动报警阈值、路口车辆交通秩序混乱报警阈值、路段交通严重拥堵的过车数量和时间、大型车流量占比波动阈值。"],
                  img:"",h3:"图 62 情报检测阈值"}
                  ]
                },
                {
                  label:"8.4.4 情报观测参数",
                  value:[
                  {p:["情报观测参数配置23种事件的检测间隔、告警显示和显示时长。",
                  "检测间隔实时状态被选中时。会禁用输入框。",
                  "通过告警显示设置可以分别控制每类事件是否在地图显示。",
                  "显示时长是情报结束后变为灰色图标在地图停留的时间，目前固定为5分钟。"]
                  ,img:"",h3:"图 63 情报观测参数"}

                  ]
                },
                {
                  label:"8.4.5 偏离/限行参数",
                  value:[
                    {p:["偏离/限行参数是对公交路线、车型、号牌、车辆属地偏离/限行规则的管理功能。"
                    ],img:"",h3:"图 64 偏离/限行参数"},
                    {p:["点击右上角创建按钮，创建一条偏离/限行规则："],img:"",h3:"图 65 创建偏离/限行参数"},
                    {p:["创建流程："]},
                    {p:["1.勾选约束对象（可以多选，多选后分别以单条进行保存）。"],
                    img:"", h3:"图 66 勾选约束对象"},
                    {p:["2.选择规则类型（正反规则）。"],img:"",h3:"图 67 选择规则类型"},
                    {p:["3.选择起止日期。"],img:"",h3:"图 68 选择起止日期"},
                    {p:["4.勾选有效日期（勾选每一天时自动勾选其他所有选项）。"],img:"",
                    h3:"图 69 勾选有效日期"},
                    {p:["5.设置有效时段（可通过增减功能设置1至多条）。"],img:"",h3:"图 70 设置有效时段"},
                    {p:["6.通过地图或设备列表选择约束区域。"],img:"",h3:"图 71 选择约束区域"},
                    {p:["注：",
                    "（1）正向规则表示如果约束对象在约束区域的设备编号的设备中出现，则触发事件；",
                    "（2）反向规则表示如果约束对象在约束区域的设备编号以外的设备中出现，则触发事件。"]}

                  ]
                }
              ]
            }, 
            {
              label: '8.5 字典管理',
              value:[
                    {p:["字典管理用于创建和管理多类系统通用的基础数据，应用于诸多模块。",
                    "通用字典：方向、天气、公交路线编号、点位。",
                    "资产字典：设备组件类型、设备供应商、品牌、建设单位。"],
                    img:"",h3:"图 72 字典管理"},
                    {p:["点击右上角创建按钮，用来创建一条新的字典，下图以方向为例。"],
                    img:"",h3:"图 73 创建方向字典"},
                    {p:["处于启用状态的字典禁止编辑和删除。"],img:"",h3:"图 74 编辑字典提示"},
                    {p:[],img:"",h3:"图 75 删除字典提示"},
                    {
                      p:["正在使用的字典不可删除、编辑、停用"],
                      img:"",h3:"图 76 修改字典提示"
                    }
              ]
            }, 
            {
              label: '8.6 资产管理',
              value:[
                    {p:["资产管理是对各类设备的创建和管理功能，可以通过创建或编辑为设备绑定多个组件。",
                    "交通控制设施：信号机、信号灯。",
                    "交通信号方案：信号配时。",
                    "交通检测设施：微波、地磁、视频检测。",
                    "电警监控设施：电子警察、卡口、违停、视频监控。",
                    "交通诱导设施：诱导屏。",
                    "交通安全设施：标志、标线、护栏。"],
                    img:"",h3:"图 77 资产管理"
                    },
                    {
                      p:["使用右上角的创建按钮来创建新的设备。下图以信号机为例，必须填写点位、方向、管辖单位、建设单位、品牌、供应商。" ]
                      ,img:"",h3:"图 78 创建信号机"
                    },
                    {p:["对于存在组件的设备可以添加组件，添加组件的操作位于创建页面最下方。",
                    "可以通过加减按钮来添加1至多条组件信息。"],img:"",h3:"图 79 添加组件"},
                    {p:["处于启用状态的设备禁止编辑和删除。"],img:"",h3:"图 80 编辑设备提示"},
                    {p:[],img:"",h3:"图 81 删除设备提示"}
              ]
            },
            {
              label: '8.7 组件库',
              value:[
                    {p:["组件库用于存储和查看已应用于设备的每个组件，有查询、查看详情、导出列表功能。"],
                    img:"",h3:"图 82 组件库"}
              ]
            },
            {
              label: '8.8 协同单位',
              value:[
                    {p:["协同单位用于管理维护协同单位的信息，有增、删、改、查、启停用、导出列表功能。"],
                    img:"",h3:"图 83 协同单位"},
                    {p:["使用右上角的创建按钮来创建一个新的协同单位。"],
                    img:"",h3:"图 84 创建协同单位"
                    },
                    {p:["处于启用状态的协同单位禁止编辑和删除。"],
                    img:"",h3:"图 85 修改协同单位提示"},
                    {p:[],img:"",h3:"图 86 删除协同单位提示"}
              ]
            },
            {
              label: '8.9 系统日志',
              value:[
                    {p:["系统日志用于记录用户的系统操作信息，有查询、查看详情、导出列表功能。"],
                    img:"",h3:"图 87 系统日志"}
              ]
            },
            {
              label: '8.10 系统帮助',
              value:[
                    {p:["系统帮助模块提供系统用户手册的在线查看，用来指导用户对系统的操作，可以下载成pdf文档。"]}
              ]
            }
          ]
        },
        {
          label: "9.系统图标说明",
          value:[
            {p:["对于平台使用的图标含义说明。"]}
          ],
          children:[
            {
              label:"9.1 GIS",
              value:[
                {p:["各界面模块图标"],img:"",h3:"图 88 GIS模块图标",class:"width550"}
              ]
            },{
              label:"9.2 设备",
              value:[
                {p:["各界面模块图标"],img:"",h3:"图 89 设备图标",class:"width550"}
              ]
            },{
              label:"9.3 情报",
              value:[
                {p:["各界面模块图标"],img:"",h3:"图 90 情报图标",class:"width550"}
              ]
            },{
              label:"9.4 营运车辆",
              value:[
                {p:["各界面模块图标"],img:"",h3:"图 91 营运车辆图标",class:"width550"}
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    async canleGetPdfDown(){
      this.$layerNotice("提示", "您确定要导出吗？", () => {
          window.location.href = "http://211.159.157.184/file/%E6%99%BA%E8%84%91%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8CV1.0.pdf";
      }, null, "warning");
    },
    getData2() {
      // 图片路径引入，图片命名方式根据页面左侧导航的顺序，比如说图1的图片路径为
      // img_1_0,建议查看intelligence_brain_webs\src\assets\img下的图片命名即可知道
      foreachChild(this.data2);
      function foreachChild(item,index) {
        for (let i in item) {
          if (item[i].label) {
            item[i].id = "id" +(index ? index+"_"+i : i);
          }
          if (item[i].value) {
              imgChange(item[i].value, (index ? index+"_"+i : i));
              if (item[i].children) {
                  foreachChild(item[i].children, (index ? index+"_"+i : i) );
              }
          } else {
              foreachChild(item[i].children, (index ? index+"_"+i : i) );
          }
        }
        function imgChange(item,index) {
          let k = 0;
          for (let j in item) {   
            if (item[j].img !== undefined) {
              item[j].img = require("@/assets/img/img"+index+"_"+k+".png");
              // console.log(index+"_"+k+"===="+item[j].img)
              k++;
            }
          }
        }
        return item;
      }
    }    
  },
  async created() {
    await this.getData2();
  },
  async mounted() {
    $("#pdfDom2").click(function(e) { // 在页面任意位置点击而触发此事件
        getId($(e.target));
        function getId(val) {
          if (val.attr("id") !== undefined) {
              let idKey = val.attr("id")+"help";
              $("#"+idKey).parents("li").addClass("is-active")
              $("#"+idKey).parents("li").siblings().removeClass("is-active");
              $("#"+idKey).parents("div").siblings().find("li").removeClass("is-active");
              $("#"+idKey).parents(".el-submenu").siblings().find("li").removeClass("is-active");
              $("#"+idKey).parents(".el-submenu").addClass("is-opened");
              $("#"+idKey).parents(".el-menu").show();
              $("#"+idKey).parents(".el-submenu").parent().siblings().find(".el-menu").hide();
              $("#"+idKey).parents(".el-submenu").parent().siblings().find(".el-submenu").removeClass("is-opened")
              return;
          } else {
            getId(val.parent());
          }
        }
    });
    $(".help").mousedown(function () {
      $(".help").find(".is-active").removeClass("is-active");
    });    
    this.mapLoading = Loading.service({
        lock: true,
        background: "rgba(10, 40, 100, 0)"
    });
    let time = setTimeout(() => {
        this.mapLoading.close();
        this.mapLoading = "";
        clearTimeout(time);
    }, 2000);
  }
};
</script>
