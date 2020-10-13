<template>
    <!-- 创建和编辑查看弹窗 -->
    <el-dialog :close-on-press-escape="false"  :title="EditDialogList.beforeTitle + EditDialogList.equipmentTypeList.name" v-dialogDrag  :visible.sync="EditDialogList.EditDialog" class="tems_dialog asset assetCase" width="1170px" :before-close="handleClose">
        <div class="scrollPart" id="scrollDPart">
            <el-form :model="formValidate" :disabled="isDisable" :class="{isDisable: isDisable,'PaddingNone':isDisable}" :rules="ruleValidate" ref="formValidateEmpty" label-width="110px" class="demo-ruleForm">
                <!--点位信息-->
                <!-- <div class="titleBottom" >点位信息</div> -->
                <el-form-item class="el_class" label="点位名称：" prop="intersectionId">
                    <el-select class="tems_Input" v-model="formValidate.intersectionId" @visible-change="parentsBlur"  filterable  @change="inspectUsable" placeholder="请选择点位名称" clearable size="small">
                        <el-option v-for="item in intersectionsList" :key="item.id" :label="item.intersectionName" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item class="el_class" label="点位编号：" prop="intersectionNumber">
                    <el-input class="tems_Input" disabled placeholder="请输入..." v-model="formValidate.intersectionNumber" clearable size="small" />
                </el-form-item>
                <el-form-item class="el_class" label="经度x - 纬度y:" prop="longitudeLatitude">
                    <el-input class="tems_Input" disabled placeholder="自动获取点位经度" v-model="formValidate.longitude" clearable size="small" />
                </el-form-item>
                <!-- 设备信息 -->
                <!-- <div class="titleBottom" >设备信息</div> -->
                <hr class="hrBorder"/>
                <div class="infoItemInfoAll" v-if="arryId.classD!=='000002-1'">
                    <el-form-item label="设备编号：" class="el_class" prop="equipmentNumber">
                        <el-input class="tems_Input" :maxlength=25 placeholder="请输入..." v-model="formValidate.equipmentNumber" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="信号灯类型：" prop="signalType" v-if="arryId.classD==='000001-1'">
                        <el-select class="tems_Input" v-model="formValidate.signalType"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="机动车灯" value="1" />
                            <el-option label="非机动车灯" value="2" />
                            <el-option label="人行灯" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="控制方向：" prop="controlDirection" v-if="arryId.classD==='000001-1'">
                        <el-select class="tems_Input" v-model="formValidate.controlDirection"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in directionList" :key="item.id" :label="item.value" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="检测方向：" prop="detectionDirection" v-if="arryId.classD!=='000001-1' && arryId.classD!=='000001-2' && arryId.classD!=='000007-1' && arryId.classD!=='000007-2' && arryId.classD!=='000007-3' && arryId.classD!=='000005-1'">
                        <el-select class="tems_Input" v-model="formValidate.detectionDirection"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in directionList" :key="item.id" :label="item.value" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="reamrk">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.reamrk" maxlength="20" clearable size="small" />
                    </el-form-item>
                    <el-tooltip class="item" effect="dark" :content="formValidate.equipmentName" placement="top">
                        <el-form-item label="设备名称：" class="el_class" prop="equipmentName">
                            <el-input class="tems_Input2" placeholder="请输入..." v-model="formValidate.equipmentName" clearable size="small" />
                        </el-form-item>
                    </el-tooltip>
                    <el-form-item label="管辖单位：" prop="administerDepartmentId">
                        <el-select class="tems_Input" v-model="formValidate.administerDepartmentId"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="建设单位：" prop="constructionDepartmentName">
                        <el-select class="tems_Input" v-model="formValidate.constructionDepartmentId"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in constructionList" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出厂日期：" class="noneTipe" prop="manufactureDate" v-if="arryId.classD!=='000007-2'">
                        <el-date-picker class="tems_Input" v-model="formValidate.manufactureDate" size="small" placeholder="选择日期时间" />
                    </el-form-item>
                    <el-form-item label="建设日期：" prop="constructionTime" >
                        <el-date-picker class="tems_Input" v-model="formValidate.constructionTime" size="small" placeholder="选择日期时间" />
                    </el-form-item>
                    <el-form-item label="品牌：" prop="tradeMark" v-if="arryId.classD!=='000007-2'">
                        <el-select class="tems_Input" v-model="formValidate.tradeMark"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in brandList" :key="item.id" :label="item.value" :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="型号：" prop="model" v-if="arryId.classD!=='000007-2'">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.model" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="供应商：" prop="supplierId" v-if="arryId.classD!=='000007-2'">
                        <el-select class="tems_Input" v-model="formValidate.supplierId"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in suppliersList" :key="item.id" :label="item.companyName" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保修期：" prop="warrantyPeriod">
                        <!-- <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.warrantyPeriod" clearable size="small" /> -->
                        <el-autocomplete class="tems_Input" @keyup.native="keyup(formValidate.warrantyPeriod, 'warrantyPeriod')"
                                         @blur="timebulr" @select="timebulr"
                                         size="small" clearable
                                         v-model="formValidate.warrantyPeriod"
                                         :fetch-suggestions="querySearchAsyncdurableAry">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="使用寿命：" prop="serviceLife">
                        <!-- <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.serviceLife" clearable size="small" /> -->
                        <el-autocomplete class="tems_Input" @keyup.native="keyup(formValidate.serviceLife, 'serviceLife')"
                                         @blur="timebulr" @select="timebulr"
                                         size="small" clearable
                                         v-model="formValidate.serviceLife"
                                         :fetch-suggestions="querySearchAsyncdurableAry">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="类型：" prop="types" v-if="arryId.classD==='000007-2'">
                        <el-select class="tems_Input" v-model="formValidate.types"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="指示标线" value="1" />
                            <el-option label="禁止标线" value="2" />
                            <el-option label="警示标线" value="3" />
                            <el-option label="立面标记" value="4" />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="类型：" prop="types" v-if="arryId.classD==='000007-3'">
                        <el-select class="tems_Input" v-model="formValidate.types"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="路面中心护栏" value="1" />
                            <el-option label="机非护栏" value="2" />
                            <el-option label="其他" value="3" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指示方向：" prop="detectionDirection" v-if="arryId.classD==='000007-1' || arryId.classD==='000007-2'">
                        <el-select class="tems_Input" v-model="formValidate.detectionDirection"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in directionList" :key="item.id" :label="item.value" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="展示方向：" prop="controlDirection" v-if="arryId.classD==='000005-1'">
                        <el-select class="tems_Input" v-model="formValidate.controlDirection"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in directionList" :key="item.id" :label="item.value" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="功能:" prop="functions" v-if="arryId.classD==='000007-2'">
                        <el-select class="tems_Input" v-model="formValidate.functions" placeholder="请选择功能：" clearable size="small">
                            <el-option label="斑马线" value="1" />
                            <el-option label="双黄线" value="2" />
                            <el-option label="停车线" value="3" />
                            <el-option label="导流线" value="4" />
                            <el-option label="黄格线" value="5" />
                        </el-select>
                    </el-form-item>
                </div>
                <!--信号配时-->
                <div class="infoItemInfoAll" v-if="arryId.classD==='000002-1'">
                    <el-form-item label="配时编号：" prop="equipmentNumber">
                        <el-input class="tems_Input" :maxlength=25 placeholder="请输入..." v-model="formValidate.equipmentNumber" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="控制方向：" prop="controlDirection">
                        <el-select class="tems_Input" v-model="formValidate.controlDirection"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in directionList" :key="item.id" :label="item.value" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" prop="reamrk">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.reamrk" maxlength="20" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="方案名称：" class="el_class" prop="equipmentName">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.equipmentName" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="管辖单位：" prop="administerDepartmentId">
                        <el-select class="tems_Input" v-model="formValidate.administerDepartmentId"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                </div>
                <!--配置信息-->
                <!-- <div class="titleBottom" v-if="arryId.classD==='000001-2'||arryId.classD==='000001-1'">配置信息</div> -->
                <hr v-if="arryId.classD==='000001-2'||arryId.classD==='000001-1'" class="hrBorder"/>
                <!--信号机-->
                <div class="infoItemInfoAll" v-if="arryId.classD==='000001-2'">
                    <el-form-item label="有无交换机：" prop="haveSwitches">
                        <el-select class="tems_Input" v-model="formValidate.haveSwitches"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="有" value="1" />
                            <el-option label="无" value="0" />
                        </el-select>
                    </el-form-item>
                    <el-tooltip class="item" effect="dark" :content="formValidate.macAddress" placement="top">
                        <el-form-item label="MAC地址：" prop="macAddress">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.macAddress" clearable size="small" />
                        </el-form-item>
                    </el-tooltip>
                    <el-form-item label="链路类型：" prop="linkType">
                        <el-select class="tems_Input" v-model="formValidate.linkType"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="广电" value="1" />
                            <el-option label="联通" value="2" />
                            <el-option label="电信" value="3" />
                            <el-option label="未连接" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="网络配置：" prop="equipmentIp">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.equipmentIp" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="逻辑框版本号：" prop="logicalBoxVersionNumber">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.logicalBoxVersionNumber" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="逻辑框类型：" prop="logicalBoxType">
                        <el-select class="tems_Input" v-model="formValidate.logicalBoxType"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="8灯组" value="8" />
                            <el-option label="16灯组" value="16" />
                            <el-option label="24灯组" value="24" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机箱位置：" prop="machineroomLocation">
                        <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="点位东南角" value="1" />
                            <el-option label="点位东北角" value="2" />
                            <el-option label="点位西北角" value="3" />
                            <el-option label="点位西南角" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供电来源：" prop="powerSupplyMode">
                        <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="专用供电" value="1" />
                            <el-option label="小区供电" value="2" />
                            <el-option label="门卫室供电" value="3" />
                            <el-option label="路灯供电" value="4" />
                            <el-option label="公安设施供电" value="5" />
                            <el-option label="太阳能供电" value="6" />
                            <el-option label="其他" value="7" />
                        </el-select>
                    </el-form-item>
                </div>
                <!--信号灯-->
                <div class="infoItemInfoAll" v-if="arryId.classD==='000001-1'">
                    <el-form-item label="灯组数量：" class="noneTipe" prop="lampNumber">
                        <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.lampNumber" clearable size="small" />
                    </el-form-item>
                    <el-form-item label="机箱位置：" prop="machineroomLocation">
                        <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="点位东南角" value="1" />
                            <el-option label="点位东北角" value="2" />
                            <el-option label="点位西北角" value="3" />
                            <el-option label="点位西南角" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供电来源：" prop="powerSupplyMode">
                        <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                            <el-option label="专用供电" value="1" />
                            <el-option label="小区供电" value="2" />
                            <el-option label="门卫室供电" value="3" />
                            <el-option label="路灯供电" value="4" />
                            <el-option label="公安设施供电" value="5" />
                            <el-option label="太阳能供电" value="6" />
                            <el-option label="其他" value="7" />
                        </el-select>
                    </el-form-item>
                </div>
                <!--微波-->
                <div  class="widthten"  v-if="arryId.classD==='000003-1'">
                    <!-- <div class="titleBottom">配置信息</div> -->
                    <hr class="hrBorder"/>
                    <div class="infoItemInfoAll">
                        <el-form-item label="交换机序列号：" prop="switchSerialNumber">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.switchSerialNumber" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="网络配置：" prop="equipmentIp">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.equipmentIp" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="机箱位置：" prop="machineroomLocation">
                            <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="点位东南角" value="1" />
                                <el-option label="点位东北角" value="2" />
                                <el-option label="点位西北角" value="3" />
                                <el-option label="点位西南角" value="4" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供电来源：" prop="powerSupplyMode">
                            <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="专用供电" value="1" />
                                <el-option label="小区供电" value="2" />
                                <el-option label="门卫室供电" value="3" />
                                <el-option label="路灯供电" value="4" />
                                <el-option label="公安设施供电" value="5" />
                                <el-option label="太阳能供电" value="6" />
                                <el-option label="其他" value="7" />
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!--地磁-->
                <div  class="widthten"  v-if="arryId.classD==='000003-2'">
                    <!-- <div class="titleBottom">配置信息</div> -->
                    <hr class="hrBorder"/>
                    <div class="infoItemInfoAll">
                        <el-form-item label="地磁采集单元：" prop="geomagneticDetectionUnitsNumber">                            
                            <!-- <el-input class="tems_Input" disabled  v-model="formValidate.geomagneticDetectionUnitsNumber = assemblyValue.geomagnumberLength" clearable size="small" /> -->
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.geomagneticDetectionUnitsNumber" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="采集中心IP：" prop="acquisitionCenterIp">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.acquisitionCenterIp" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="AP-ID：" prop="geomagneticApId">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.geomagneticApId" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="机箱位置：" prop="machineroomLocation">
                            <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="点位东南角" value="1" />
                                <el-option label="点位东北角" value="2" />
                                <el-option label="点位西北角" value="3" />
                                <el-option label="点位西南角" value="4" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供电来源：" prop="powerSupplyMode">
                            <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="专用供电" value="1" />
                                <el-option label="小区供电" value="2" />
                                <el-option label="门卫室供电" value="3" />
                                <el-option label="路灯供电" value="4" />
                                <el-option label="公安设施供电" value="5" />
                                <el-option label="太阳能供电" value="6" />
                                <el-option label="其他" value="7" />
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!--视频检测-->
                <div  class="widthten"  v-if="arryId.classD==='000003-3' || arryId.classD==='000004-1' || arryId.classD==='000004-2' || arryId.classD==='000004-3' || arryId.classD==='000004-4'">
                    <!-- <div class="titleBottom">配置信息</div> -->
                    <hr class="hrBorder"/>
                    <div class="infoItemInfoAll">
                        <el-form-item label="控制主机IP：" prop="serverIp">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.serverIp" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="相机IP：" prop="equipmentIp">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.equipmentIp" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="相机角度：" v-if="arryId.classD === '000004-4'" prop="cameraAngle">
                            <el-select class="tems_Input" v-model="formValidate.cameraAngle"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="固定" value="1" />
                                <el-option label="可动" value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="机箱位置：" prop="machineroomLocation">
                            <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="点位东南角" value="1" />
                                <el-option label="点位东北角" value="2" />
                                <el-option label="点位西北角" value="3" />
                                <el-option label="点位西南角" value="4" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供电来源：" prop="powerSupplyMode">
                            <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="专用供电" value="1" />
                                <el-option label="小区供电" value="2" />
                                <el-option label="门卫室供电" value="3" />
                                <el-option label="路灯供电" value="4" />
                                <el-option label="公安设施供电" value="5" />
                                <el-option label="太阳能供电" value="6" />
                                <el-option label="其他" value="7" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="RTSP视频流地址：" class="el_class widthImportant" label-width="130px" prop="rtspAddr">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.rtspAddr" clearable size="small" />
                        </el-form-item>
                    </div>
                </div>
                <!-- 诱导屏 -->
                <div class="widthten" v-if="arryId.classD==='000005-1'">
                    <!-- <div class="titleBottom">配置信息</div> -->
                    <hr class="hrBorder"/>
                    <div class="infoItemInfoAll">
                        <el-form-item label="网络配置：" prop="equipmentIp">
                            <el-input class="tems_Input" placeholder="请输入..." v-model="formValidate.equipmentIp" clearable size="small" />
                        </el-form-item>
                        <el-form-item label="机箱位置：" prop="machineroomLocation">
                            <el-select class="tems_Input" v-model="formValidate.machineroomLocation"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="点位东南角" value="1" />
                                <el-option label="点位东北角" value="2" />
                                <el-option label="点位西北角" value="3" />
                                <el-option label="点位西南角" value="4" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供电来源：" prop="powerSupplyMode">
                            <el-select class="tems_Input" v-model="formValidate.powerSupplyMode"  @visible-change="parentsBlur"  filterable clearable size="small">
                                <el-option label="专用供电" value="1" />
                                <el-option label="小区供电" value="2" />
                                <el-option label="门卫室供电" value="3" />
                                <el-option label="路灯供电" value="4" />
                                <el-option label="公安设施供电" value="5" />
                                <el-option label="太阳能供电" value="6" />
                                <el-option label="其他" value="7" />
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <!-- 组件 -->
                <Assembly v-if="(arryId.classD !== '000002-1') && (arryId.classD !== '000007-1') && (arryId.classD !== '000007-2')" ref="assembly" :durable-ary="durableAry" :assembly-value="assemblyValue" @update:assembly-value="val => assemblyValue=val" :suppliers-list="suppliersList" :brandList="brandList"/>
                <!-- 组件 -->
            </el-form>
        </div>
        <div v-if="EditDialogList.RowId === ''" class="notesBottom">
            <!-- 注：为保证设备的顺利创建，需确保已添加相应的点位、方向、大队、供应商、运维单位、机房以及设备组件的组件类型, 组件使用类型, 组件名称； -->
            注：为保证设备的顺利创建，需确保已添加相应的点位，方向，管辖单位，建设单位，品牌，供应商；
        </div>
        <div slot="footer" class="dialog-footer flexRow">            
            <div class="flexNum footer">
                <div v-if="this.EditDialogList.beforeTitle ==='查看'" class="tems_Button inportBtn" @click="GB">关 闭</div>
                <div v-if="this.EditDialogList.beforeTitle !=='查看'" class="tems_Button inportBtn" @click="resetForm('formValidateEmpty')">取 消</div>
                <div v-if="this.EditDialogList.beforeTitle !=='查看'" class="tems_Button exportBtn" @click="handleSubmit(formValidate)">保 存</div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import Assembly from "@/views/system-management/asset-management/asset-common/Assembly";
import { setTimeout } from 'timers';

export default {
    name: "EditDialog",
    props: ["EditDialogList"],
    components: {
        Assembly
    },
    model: {
        event: "submitButton"
    },
    data() {
        return {
            // 是否查看
            isDisable: false,
            // 通讯状态：
            laneList: [],
            // 机房列表
            serialNumberList: [],
            // 信号灯类型
            signalTypeList: [],
            // 服务设备类型
            manageDeviceTypeList: [],
            // 方向
            DetectionList: [],
            // 建设单位列表
            constructionList: [],
            // 品牌列表
            brandList: [],
            formValidateEmpty: {},
            // 创建编辑内容
            formValidate: {},
            arryId: {
                classA: false,
                classB: false,
                classC: false,
                classD: ""
            },
            // 查重
            allPageReapt: [],
            allList: ["", "", ""],
            // 协同单位列表
            ManagementList: [],
            // 点位列表
            intersectionsList: [],
            // 管辖单位部门列表
            departmentList: [],
            // 方向字典列表
            directionList: [],
            // 验证
            ruleValidate: {
                equipmentNumber: this.$CommonRule.MustBeNumber, // 设备编号：
                intersectionId: this.$CommonRule.SelectRule, // 点位名称
                equipmentName: this.$CommonRule.NotEmpty, // 设备名称：
                serviceLife: this.$CommonRule.NotEmpty2, // 使用寿命：
                warrantyPeriod: this.$CommonRule.NotEmpty2, // 保修期
                haveSwitches: this.$CommonRule.SelectRule, // 有无交换机
                logicalBoxType: this.$CommonRule.SelectRule, // 逻辑框类型
                detectionDirection: this.$CommonRule.SelectRule, // 检测方向
                controlDirection: this.$CommonRule.SelectRule, // 控制方向
                // powerSupplyMode: this.$CommonRule.SelectRule, // 供电方式
                // lampNumber: this.$CommonRule.MustBeNumberisEmpty, // 灯组数量
                linkType: this.$CommonRule.SelectRule, // 链路类型
                signalType: this.$CommonRule.SelectRule, // 信号灯类型
                macAddress: this.$CommonRule.MacRule, // MAC地址

                solarSerialNumber: this.$CommonRule.NotEmpty, // 太阳能序列号
                geomagneticApId: this.$CommonRule.NotEmpty, // AP-ID
                functions: this.$CommonRule.SelectRule, // 功能
                rtspAddr: this.$CommonRule.NotEmpty, // RTSP视频地址
                types: this.$CommonRule.SelectRule, // 类型
                cameraAngle: this.$CommonRule.SelectRule, // 相机角度

                geomagneticDetectionUnitsNumber: this.$CommonRule.MustBeNumber, // 地磁单元数量
                switchSerialNumber: this.$CommonRule.MustBeNumber, // 交换机序列号
                logicalBoxVersionNumber: this.$CommonRule.NotEmpty, // 逻辑框版本号
                networkConfiguration: this.$CommonRule.IpRule, // 网络配置
                acquisitionCenterIp: this.$CommonRule.IpRule, // 采集中心IP
                serverIp: this.$CommonRule.IpRule, // 控制主机IP
                administerDepartmentId: this.$CommonRule.SelectRule, // 管辖单位：
                // longitudeLatitude: this.$CommonRule.NotEmpty, // 经纬度
                equipmentIp: this.$CommonRule.IpRule, // 网络配置
                // longitude: this.$CommonRule.LongitudeRule, // 纬度
                // latitude: this.$CommonRule.LatitudeRule, // 经度
                constructionTime: this.$CommonRule.DateRuleNotTody, // 建设日期：
                manufactureDate: this.$CommonRule.DateRuleNotTodyisEmpty // 出厂日期：
            },
            cameraAngle: "0",
            // 使用寿命数组
            durableAry: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            // 供应商列表
            suppliersList: {},
            assemblyValue: { // 变化的
                changFunction: false,
                isDisable: false,
                equipmentType: "",
                geomagnumberLength: 0,
                moduleList: [],
                newList: [{}],
                moduleListUnder: [{}],
                equipmentSubassemblyk: []
            },
            filterable: false,
            equipmentName:""
        };
    },
    methods: {
        // 关闭弹窗回调
        handleClose(done) {
            if (this.EditDialogList.beforeTitle !== "查看") {
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
            this.assemblyValue.moduleList = [];
        },
        // 判断保修期和使用寿命
        timebulr() {
            if (this.formValidate.serviceLife !== undefined && this.formValidate.warrantyPeriod !== undefined) {
                let serviceLife = this.formValidate.serviceLife.replace("年", "");
                let warrantyPeriod = this.formValidate.warrantyPeriod.replace("年", "");
                let juge = parseInt(serviceLife) < parseInt(warrantyPeriod);
                if (juge) {
                    this.$showSimpleMessage("使用寿命大于保修期", "warning");
                    this.formValidate.serviceLife = "";
                }
            }
        },
        //   时间加年
        keyup(value, item) {
            if (value.replace("年", "") !== "") {
                this.formValidate[item] = value.replace("年", "") + "年";
            } else {
                this.formValidate[item] = value.replace("年", "");
            }
        },  
        // 组件名称输入或选择
        querySearchAsyncdurableAry(queryString, cb) {
            let dataList = this.durableAry;
            let dataListAll = [];
            for (let i = 0; i < dataList.length; i++) {
                dataListAll.push({value : dataList[i] + "年"})
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(dataListAll);
            }, 10 * Math.random());            
        },
        // 获取列表
        getAxios(element, val) {
            axios.get(val).then((res) => {
                let getUnitList = res.data.data;
                for (let i = 0; i < getUnitList.length; i++) {
                    let data = getUnitList[i];
                    for (let key in Object.keys(data)) {
                        let name = Object.keys(data)[key];
                        let value = data[name];
                        if (value === null || value === undefined || value === "") {
                            data[name] = "无数据";
                        }
                    }
                    this.$set(element, i, getUnitList[i]);
                }
            }).catch(error => {
                // this.$showSimpleMessage(error, "error");
            });
        },
        // 获取数据列表
        getUnitList() {
            this.getAxios(this.allPageReapt, "equipment/"); // 查重
            this.getAxios(this.intersectionsList, "intersection/?status=1&monitor=0"); // 点位列表
            this.getAxios(this.suppliersList, "supplier/?status=1"); // 供应商列表
            this.getAxios(this.manageDeviceTypeList, "service/code/?status=1"); // 服务器设备列表
            // this.getAxios(this.ManagementList, "syndept/?status=1"); // 协同单位列表
            this.getAxios(this.DetectionList, "road/section/?status=1"); // 检测方向
            this.getAxios(this.serialNumberList, "machineRoom/?status=1"); // 机房列表
            this.getAxios(this.departmentList, "department/special/all"); // 单位/管辖单位/部门
            this.getAxios(this.directionList, "code/?type=10001&status=1"); // 方向字典
            this.getAxios(this.brandList, "code/?type=10005&status=1"); // 品牌字典
            this.getAxios(this.constructionList, "constructionUnit/?status=1"); // 建设单位
        },
        // 检查点位名称状态
        inspectUsable() {
            this.getIntersectionRank();
            let intersectionId = this.formValidate.intersectionId;
            if (intersectionId) {
                this.repeatcreation();
            }
        },
        // 重置表单
        resetForm(formName) {
            if (this.EditDialogList.beforeTitle === "查看") {
                this.closeDialogData(formName, "关闭");
            } else {
                this.closeDialogData(formName, "取消");
            }
        },
        GB() {
            this.$emit("submitButton");
        },
        // 弹窗关闭数据变化
        closeDialogData(formName, mes) {
            this.$layerNotice("提示", "您确定要" + mes + "吗？", () => {
                this.$refs[formName].resetFields();
                this.formValidate = {};
                this.assemblyValue.moduleList = [];
                this.$emit("submitButton");
            }, null, "warning");
        },
        // ip格式判断组件
        f_check_IP(data) {
            let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            return reg.test(data);
        },
        // 是否重复创建
        repeatcreation() {
            if (this.arryId.classD === "000001-2") {
                let typeOfmodel = this.allPageReapt.find(t => t.equipmentType === this.EditDialogList.equipmentTypeList.enName);
                let numberOflocation = this.allPageReapt.find(t => t.intersectionId === this.formValidate.locationNumber);
                if (typeOfmodel && numberOflocation) {
                    this.$showSimpleMessage("一个点位仅能有一个该类型设备,请修改改点名称位", "error");
                }
            }
        },
        // 提交
        handleSubmit(data) {
            this.repeatcreation();
            this.$refs["formValidateEmpty"].validate((valid) => {
                if (valid) {
                    if (this.$filter.IsReplace(this.allPageReapt, data, "equipmentNumber", this.EditDialogList.RowId)) {
                        this.$showSimpleMessage("设备编号重复", "error");
                        return;
                    }
                    data.equipmentType = this.EditDialogList.equipmentTypeList.id;
                    if (data.equipmentType === "000004-3") {
                        data.cameraAngle = 2;
                    }
                    if (data.constructionTime) {
                        // data.buildTime = data.constructionTime;
                        data.constructionTime = this.$filter.timesFormat(data.constructionTime);
                    }
                    delete data.intersectionNumber;
                    delete data.longitude;
                    if (data.manufactureDate) {
                        data.manufactureDate = this.$filter.timesFormat(data.manufactureDate);
                    } 
                    if (data.rtspAddr && data.equipmentIp) {
                        // rtsp格式验证
                        /* let reg = RegExp("@" + data.equipmentIp + ":")
                        if (!reg.test(data.rtspAddr)) {
                            this.$showSimpleMessage("RSTP视频流地址包含的IP格式必须是'@相机IP:'冒号为英文冒号", "error");
                            return;
                        } */
                    }
                    // 组件信息
                    let assL = this.assemblyValue.equipmentSubassemblyk;
                    for (let i = 0; i < assL.length; i++) {
                        if ((assL[i].name && assL[i].codeName && assL[i].codeId) !== "") {
                            // assL[i].number = assL[i].number === "自定义新增" ? "" : assL[i].number;
                            if(assL[i].number === "自定义新增"){
                                delete assL[i].number;
                            }
                            if (assL[i].buildTime) {
                                assL[i].buildTime = new Date(assL[i].buildTime).getTime();
                            }
                        } else {
                            switch ("") {
                                case assL[i].codeName:
                                    this.$showSimpleMessage("请选择组件类型", "error");
                                    break;
                                case assL[i].number:
                                    this.$showSimpleMessage("请选择组件共用", "error");
                                    break;
                                case assL[i].name:
                                    this.$showSimpleMessage("请填写组件名称", "error");
                                    break;
                            }

                            return false;
                        }
                    };
                    if (assL.length > 0) {
                        data.subassemblys = JSON.stringify(assL);
                    }
                    if (this.EditDialogList.RowId !== "") {
                        delete data.equipmentSubassemblyViewList;
                        this.handleEditUnit(data);
                    } else {
                        this.handleAddUnit(data);
                    }
                } else {
                    this.$showSimpleMessage("内容验证失败", "error");
                    return false;
                }
            });
        },
        // 保存创建
        handleAddUnit(data) {
            this.$layerNotice("提示", "您确定要创建吗？", () => {
                axios.post("equipment/", data).then((res) => {
                    if (res.data.code === 0) {
                        this.$emit("submitButton");
                        this.$showSimpleMessage("保存成功", "success");
                    } else {
                        let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(mess, "error");
                    }
                }).catch((error) => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 保存编辑
        handleEditUnit(data) {
            let mess = (this.cameraAngle !== data.cameraAngle) ? "所有相关AI事件将失效，是否确认修改？" : "您确定要保存修改吗？";
            this.$layerNotice("提示", mess, () => {
                axios.post("equipment/" + this.EditDialogList.RowId, data).then((res) => {
                    if (res.data.code === 0) {
                        this.$emit("submitButton");
                        this.$showSimpleMessage("保存成功", "success");
                    } else {
                        let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                        this.$showSimpleMessage(mess, "error");
                    }
                }).catch(error => {
                    this.$showSimpleMessage(error, "error");
                });
            }, null, "warning");
        },
        // 是否是可选择点位级别
        getIntersectionRank() {
            this.EditDialogList.Usable = !this.formValidate.intersectionId;
        },
        // 打开编辑
        editDirect(val) {
            // 编辑组件信息行加载
            axios.get("equipment/" + val).then((resArry) => {
                let res = resArry.data.data;
                if (res !== undefined) {
                    this.formValidate = res;
                    if (res.functions) {
                        res.functions = res.functions.toString();
                    }
                    if (res.signalType) {
                        res.signalType = res.signalType.toString();
                    }
                    if (res.cameraAngle === 1) {
                        res.cameraAngle = "1";
                    } else {
                        res.cameraAngle = "2";
                    }
                    this.equipmentName = res.equipmentName;
                    this.cameraAngle = res.cameraAngle;
                    this.getIntersectionRank();
                    let resAss = res.equipmentSubassemblyViewList;
                    this.assemblyValue.equipmentSubassemblyk = resAss;
                    for (let i = 0; i < resAss.length; i++) {
                        this.assemblyValue.equipmentSubassemblyk[i].id = this.assemblyValue.equipmentSubassemblyk[i].subassemblyId;
                        axios.get("subassembly/", { params: { codeId: resAss[i].codeId } }).then((moduleListUnderRes) => {
                            let moduleListUnder = moduleListUnderRes.data.data;
                            if (moduleListUnder !== undefined) {
                                let equipmentSubassemblyk = this.assemblyValue.equipmentSubassemblyk;
                                for (let i = 0; i < equipmentSubassemblyk.length; i++) {
                                    for (let j = 0; j < moduleListUnder.length; j++) {
                                        if (equipmentSubassemblyk[i].number === moduleListUnder[j].number) {
                                            this.assemblyValue.newList[i] = moduleListUnder[j];
                                            moduleListUnder.splice(j, 1);
                                            this.$set(this.assemblyValue.moduleListUnder, i, moduleListUnder);
                                        }
                                    }
                                }
                            }
                        }).catch((error) => {
                            this.$showSimpleMessage(error, "error");
                            this.$showSimpleMessage("获取公用组件失败", "error");
                        });
                    }
                }
            }).catch(error => {
                this.$showSimpleMessage(error, "error");
            });
        },
        changeName(val,old) {
            this.$set(this.formValidate,"equipmentName",this.equipmentName);
            let allList = [this.EditDialogList.equipmentTypeList.name];
            for (let i in this.allList) {
                if (this.allList[i] !== "") {
                    allList.push(this.allList[i]);
                }
            }
            let name = allList.toString().replace(/,/g, "-");
            if (this.EditDialogList.RowId === "") {
                this.$set(this.formValidate,"equipmentName",name);
            } else {
                if (old) {
                    this.$set(this.formValidate,"equipmentName",name);
                } else {
                    if (val !== "" && old !== undefined) {
                        this.$set(this.formValidate,"equipmentName",name);
                    }
                }
            }
            if (this.EditDialogList.beforeTitle ==='查看') {
                this.$set(this.formValidate,"equipmentName",this.equipmentName);
            }
        },
        // 变化组件内容置空
        changOld(old) {
            if (old) {
                let ass = this.assemblyValue;
                ass.equipmentSubassemblyk = [];
                ass.moduleListUnder = [{}];
                ass.newList = [{}];
            }
        },
        // select选中后，失去焦点
        parentsBlur(data) {
            this.filterable = data;        
        }
    },
    mounted() {
        this.getUnitList();
    },
    watch: {
        "EditDialogList.beforeTitle": function(val, old) {
            if (val === "查看") {
                this.isDisable = true;
            } else {
                this.isDisable = false;
            }            
            this.assemblyValue.isDisable = this.isDisable;
        },
        "EditDialogList.EditDialog": function(val, old) {
            if (val) {
                this.$set(this.assemblyValue, "changFunction", !this.assemblyValue.changFunction);
                if (this.EditDialogList.RowId !== "") {
                    this.editDirect(this.EditDialogList.RowId);
                }
            } else {
                this.formValidate = {};                
                this.$refs["formValidateEmpty"].resetFields();
            } 
            this.changOld(old);
        },
        "EditDialogList.equipmentTypeList.id": function(val, old) {
            this.arryId.classD = val;
            this.arryId.classA = (val === "000002-1");
            this.arryId.classE = (!!((val === "000006-1" || val === "000006-2" || val === "000006-3")));
            this.arryId.classB = (!!((val === "000007-1" || val === "000007-2" || val === "000007-3" || val === "000007-4")));
            this.arryId.classC = (!!((val === "000004-1" || val === "000004-2" || val === "000004-3" || val === "000004-4" || val === "000003-3")));
            this.$set(this.assemblyValue, "equipmentType", val);
            // this.changeName(val, old);
        },
        "formValidate.reamrk": function(val, old) {
            this.allList[2] = val;
            this.changeName(val, old);
        },
        "formValidate.intersectionId": {
            handler: function(val, old) {
                this.changOld(old);
                if (val && val !== "" && val !== null) {
                    let inteersecList = this.intersectionsList.find(t => t.id === val);
                    if (inteersecList) {
                        this.allList[0] = inteersecList.intersectionName;
                        this.formValidate.intersectionNumber = inteersecList.number;
                        this.formValidate.longitude = inteersecList.longitude + "-" + inteersecList.latitude;
                    } else {
                        this.$showSimpleMessage("此选择点位已停用或被删除，请重新选择", "warning");
                    }
                } else {
                    this.allList[0] = ""; 
                    this.formValidate.intersectionNumber = "";
                    this.formValidate.longitude = "";
                }
                this.changeName(val, old);
            }
        },
        "formValidate.detectionDirection": {
            handler: function(val, old) {
                if (val && val !== "" && val !== null) {
                    let allListKey = this.directionList.find(t => t.id === val).value;
                    if (allListKey) {
                        this.allList[1] = allListKey;
                    } else {
                        this.$showSimpleMessage("此选择方向已停用或被删除，请重新选择", "warning");
                    }
                } else {
                    this.allList[1] = "";
                }
                this.changeName(val, old);
            }
        },
        "formValidate.constructionTime": function(val, old) {
            if (this.formValidate.constructionTime !== "" && this.formValidate.constructionTime !== undefined && this.formValidate.constructionTime !== null) {
                if (this.formValidate.manufactureDate !== "" && this.formValidate.manufactureDate !== undefined && this.formValidate.manufactureDate !== null) {
                    let manufactureDate = this.$filter.timesFormat(this.formValidate.manufactureDate);
                    let constructionTime = this.$filter.timesFormat(this.formValidate.constructionTime);
                    if (manufactureDate > constructionTime) {
                        this.formValidate.constructionTime = "";
                        this.$showSimpleMessage("建设日期要大于出厂日期", "warning");
                    }
                }
            }
        },
        "formValidate.manufactureDate": function(val, old) {
            if (this.formValidate.constructionTime !== "" && this.formValidate.constructionTime !== undefined && this.formValidate.constructionTime !== null) {
                if (this.formValidate.manufactureDate !== "" && this.formValidate.manufactureDate !== undefined && this.formValidate.manufactureDate !== null) {
                    let manufactureDate = this.$filter.timesFormat(this.formValidate.manufactureDate);
                    let constructionTime = this.$filter.timesFormat(this.formValidate.constructionTime);
                    if (manufactureDate > constructionTime) {
                        this.formValidate.constructionTime = "";
                        this.$showSimpleMessage("建设日期要大于出厂日期", "warning");
                    }
                }
            }
        }
    }
};
</script>
<style>
.widthten{
    width: 98%;
}
.assetCase .demo-ruleForm {
    padding: 0 0.6vw 0 2vw !important;
}
.assetCase .PaddingNone{
    padding: 0 0.6vw 0 0.6vw !important;
}
.PaddingNone label{
    width: 98px !important;
}
.PaddingNone .el-form-item__content{
    margin-left: 98px !important;
}
.PaddingNone .widthImportant label{
    width: 130px !important;
}
.PaddingNone .widthImportant .el-form-item__content{
    margin-left: 130px !important;
}
.PaddingNone input{
    padding: 0px !important;
    text-align: center;
}
.PaddingNone .el-form-item{
    margin-right: 10px !important;
}
.PaddingNone>.el-form-item{
    margin-right: 0px !important;
}
.PaddingNone .assembly_tab_bor {
    width: 100%;
    margin-left: -0.5vw;
}
.assetCase .PaddingNone>.el_class {
    width: 49%;
}
.PaddingNone .infoItemInfoAll .el_class{
    width: 49%;
}
.PaddingNone .el-form-item {
    width: 24%;
}
.PaddingNone .el-form-item__error{
    display: none;
}
.hrBorder {    
    width: 95%;
    border: 1px solid #1e2b42;
    margin-bottom: 15px;
}
.assetCase .el_class{
    width: 47.5%;
}
</style>

