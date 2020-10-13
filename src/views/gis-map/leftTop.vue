<template>
  <div>
    <div style="display:flex;">
      <!-- <div
        v-if="choseStates && pageStatus==='ODLow'"
        class="choseStates"
        @click="changeChoseStates"
      >
        <div class="choseStatesPoint">点位</div>
        <div class="choseStatesArea">区域</div>
      </div>
      <div
        v-if="!choseStates && pageStatus==='ODLow'"
        class="choseStates"
        @click="changeChoseStates"
      >
        <div class="choseStatesArea">点位</div>
        <div class="choseStatesPoint">区域</div>
      </div>-->
      <div class="searchBox">
        <div class="searchBoxLeft" v-show="leftHide">
          <!-- <el-input v-model="serchContent" clearable></el-input> -->
          <el-select
            v-if="pageStatus==='eventBulletin'"
            v-model="serchContent"
            placeholder="请选择"
            clearable
          >
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='tidalLow'"
            v-model="serchContent"
            placeholder="请选择"
            clearable
          >
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='carLow'"
            v-model="serchContent"
            placeholder="请选择"
            clearable
          >
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <!-- <el-select v-if="pageStatus==='ODwatch' && choseStates ===true" v-model="startPoint" placeholder="起点" clearable>
                    <el-option v-for="item in point" :key="item.id" :label="item.intersectionName" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-if="pageStatus==='ODwatch' && choseStates ===true" v-model="endPoint" placeholder="终点" clearable>
                    <el-option v-for="item in point" :key="item.id" :label="item.intersectionName" :value="item.id">
                    </el-option>
          </el-select>-->
          <!-- <el-select
            v-if="pageStatus==='ODwatch' || pageStatus==='tidalWatch' || pageStatus==='trafficFlow'|| pageStatus==='carWatch' || pageStatus==='trafficWatch'"
            v-model="baseId"
          >
            <el-option
              v-for="item in baseChose"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>-->
          <el-select
            v-if="pageStatus==='ODwatch' || pageStatus==='tidalWatch' || pageStatus==='trafficFlow'|| pageStatus==='carWatch' || pageStatus==='trafficWatch'"
            v-model="choseSome"
            filterable
            remote
            placeholder="请输入搜索"
            :remote-method="requestMapAll"
            :loading="loading"
            clearable
          >
            <el-option v-for="item in allMap" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-select v-model="baseSearch" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in baseChose" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
          </el-select>-->
          <!-- <el-select v-if="pageStatus==='ODwatch' && choseStates ===false" v-model="startPoint" placeholder="起始区域" clearable>
                    <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-if="pageStatus==='ODwatch' && choseStates ===false" v-model="endPoint" placeholder="终止区域" clearable>
                    <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
          </el-select>-->
          <!-- <el-select v-if="pageStatus === 'trafficWatch'" v-model="lowArea" placeholder="区域" clearable>
                    <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
          </el-select>-->
          <el-select
            v-if="pageStatus==='ODLow' && choseStates ===true"
            v-model="lowStartPoint"
            placeholder="起点"
            clearable
          >
            <el-option
              v-for="item in point"
              :key="item.id"
              :label="item.intersectionName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='ODLow' && choseStates ===true"
            v-model="lowEndPoint"
            placeholder="终点"
            clearable
          >
            <el-option
              v-for="item in point"
              :key="item.id"
              :label="item.intersectionName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='ODLow' && choseStates ===false"
            v-model="lowStartRegion"
            placeholder="起始区域"
            clearable
          >
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='ODLow' && choseStates ===false"
            v-model="lowEndRegion"
            placeholder="终止区域"
            clearable
          >
            <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
          <el-select
            v-if="pageStatus==='roadWatch'"
            filterable
            v-model="roadPoints"
            placeholder="请选择点位"
            clearable
            @change="changePoint"
          >
            <el-option
              v-for="item in point"
              :key="item.id"
              :label="item.intersectionName"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- 搜索按钮 -->
          <el-button
            v-if="pageStatus!=='eventBulletin'"
            class="searchBtn"
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="search"
          ></el-button>
          <el-button
            v-if="pageStatus==='eventBulletin'"
            class="searchBtn searchEventBtn"
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </div>
        <div class="searchBoxRight">
          <div style="flex:1"></div>
          <el-button
            v-if="pageStatus==='eventBulletin'"
            type="primary"
            size="mini"
            @click="manualEntry"
          >人工录入</el-button>
          <!-- <el-button
            v-if="pageStatus==='tidalWatch'"
            type="primary"
            size="mini"
            @click="changeTidal"
          > 潮汐流规律</el-button>
          <el-button
            v-if="pageStatus==='tidalLow'"
            type="primary"
            size="mini"
            @click="changeTidal"
          > 潮汐流观测</el-button>
          <el-button
            v-if="pageStatus==='ODwatch'"
            type="primary"
            size="mini"
            @click="changeOD"
          > OD规律</el-button>
          <el-button
            v-if="pageStatus==='ODLow'"
            type="primary"
            size="mini"
            @click="changeOD"
          > OD观测</el-button>
          <el-button
            v-if="pageStatus==='carLow'"
            type="primary"
            size="mini"
            @click="changeCar"
          > 营运车辆观测</el-button>
          <el-button
            v-if="pageStatus==='carWatch'"
            type="primary"
            size="mini"
            @click="changeCar"
          > 营运车辆规律</el-button>
          <el-button
            v-if="pageStatus==='trafficFlow'"
            type="primary"
            size="mini"
            @click="changeTrafficFlow"
          > 拥堵规律分析</el-button>
          <el-button
            v-if="pageStatus==='trafficLow'"
            type="primary"
            size="mini"
            @click="changeTrafficFlow"
          > 交通状态观测</el-button>-->
        </div>
      </div>
    </div>
    <!-- 情报告警的时间选择按钮 -->
    <!-- <div class="dataTimer" v-if="pageStatus==='eventBulletin'" style="margin-top:10px;">
        <el-date-picker v-model="serchTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable @change="search"></el-date-picker>
    </div>-->
    <!-- OD规律的时间选择按钮 -->
    <div class="dataTimer" v-if="pageStatus==='ODLow'" style="margin-top:10px;">
      <!-- <el-date-picker
        v-model="serchTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
        @change="search"
      ></el-date-picker>-->
      <div style="display: flex;" class="fenkai">
        <el-date-picker v-model="serchTimeO" type="datetime" clearable placeholder="选择开始日期时间"></el-date-picker>
        <el-date-picker v-model="serchTimeP" type="datetime" clearable placeholder="选择结束日期时间"></el-date-picker>
      </div>
      <!-- OD规律时间区分选择框 -->
      <el-checkbox-group class="tidal tidalClass" v-if="pageStatus==='ODLow'">
        <el-radio
          v-model="ODTimer"
          v-for="(t, index) in ODTimerCheckBox"
          :key="index"
          :label="t.value"
          :value="t.value"
          :id="t.id"
          :class="t.class"
        ></el-radio>
      </el-checkbox-group>
      <el-checkbox-group
        class="tidal tidalClass"
        @change="ODLowTimerChange"
        v-if="pageStatus==='ODLow'"
        v-model="roadKey"
        style="background-color:#f3f4f6 !important;width:100px"
      >
        <el-checkbox
          v-for="(t, index) in roadColor"
          :key="index"
          :label="t.name"
          :value="t.name"
          :class="t.class"
          style="display:block;text-align:left;margin-left:-7px;line-height:30px;color:#102243 !important"
          id="level"
        ></el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- 潮汐流规律的时间选择按钮 -->
    <div class="dataTimer" v-if="pageStatus==='tidalLow'" style="margin-top:10px;">
      <!-- <el-date-picker
        v-model="serchTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
        @change="search"
      ></el-date-picker>-->
      <div style="display: flex;" class="fenkai">
        <el-date-picker v-model="serchTimeO" type="datetime" clearable placeholder="选择开始日期时间"></el-date-picker>
        <el-date-picker v-model="serchTimeP" type="datetime" clearable placeholder="选择结束日期时间"></el-date-picker>
      </div>
    </div>
    <!-- 交通构成的时间选择按钮 -->
    <!-- <div class="dataTimer" v-if="pageStatus==='trafficWatch'" style="margin-top:10px;">
        <el-date-picker v-model="serchTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable @change="search"></el-date-picker>
    </div>-->
    <!-- 营运车辆规律的时间选择按钮 -->
    <div class="dataTimer" v-if="pageStatus==='carLow'" style="margin-top:10px;">
      <!-- <el-date-picker
        v-model="serchTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        clearable
          @change="search"
          @change="search"
        @change="search"
      ></el-date-picker>-->
      <div style="display: flex;" class="fenkai">
        <el-date-picker
          v-model="serchTimeO"
          type="datetime"
          clearable
          placeholder="选择开始日期时间"
        ></el-date-picker>
        <el-date-picker
          v-model="serchTimeP"
          type="datetime"
          clearable
          placeholder="选择结束日期时间"
        ></el-date-picker>
      </div>
    </div>
    <!-- 潮汐流选择框 -->

    <el-radio-group
      class="tidal tidalLowRadiodataType"
      v-if="pageStatus==='tidalLow'"
      v-model="tidalLowRadiodataType"
      @change="search"
    >
      <el-radio label="工作日">工作日</el-radio>
      <el-radio label="双休日">双休日</el-radio>
      <el-radio label="节假日">节假日</el-radio>
    </el-radio-group>
    <!-- 潮汐流规律时段选择 -->
    <el-checkbox-group
      class="tidal tidalClass"
      @change="handleCheckedCitiesChangeTimer"
      v-if="pageStatus==='tidalLow'"
      v-model="tidalTimeIntervalCheckList"
      style="background-color:#03072a !important;width:100px;float: left;"
    >
      <el-checkbox
        v-for="(t, index) in tidalTimeInterval"
        :key="index"
        :label="t.name"
        :value="t.name"
        class="ODClass8"
        style="display:block;text-align:left;margin-left:-7px;line-height:30px;color:#646567 !important"
        id="level"
      ></el-checkbox>
    </el-checkbox-group>
    <!-- 潮汐流等级 -->
    <el-checkbox-group
      class="tidal tidalClass"
      :class="{'tidal': true, 'tidalClass': true, 'tidallevel': pageStatus === 'tidalLow'}"
      @change="handleCheckedCitiesChange"
      v-if="pageStatus==='tidalWatch' || pageStatus==='tidalLow'"
      v-model="tidalCheckList"
      style="background-color:#03072a !important;width:100px;"
    >
      <el-checkbox
        v-for="(t, index) in tidalCurrentGrade"
        :key="index"
        :label="t.label"
        :value="t.value"
        :class="t.class"
        style="display:block;text-align:left;margin-left:-7px;line-height:30px;color:#646567 !important"
        id="level"
      ></el-checkbox>
    </el-checkbox-group>
    <!-- 营运车辆选择框 -->
    <!-- <el-select
      class="cartidal TailNumberArray d_cartidal"
      v-if="pageStatus==='carWatch' || pageStatus==='carLow'"
      :placeholder="placeholder"
      multiple
      v-model="carCheckList"
      @change="handleCheckedCarChange"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>-->
    <!-- 营运车辆选择车辆类型 -->
    <div class="vehiclesiv" v-if="pageStatus==='carWatch' || pageStatus==='carLow'">
      <div
        v-for="(item, index) in vehicleIconArray"
        :key="index"
        class="vehiclesiv_img"
        @click="handleCheckedCarChange(item.id)"
      >
        <img :src="item.src" class="vehicleImg" />
        <span :class="{'vehicles_active': carCheckList.find(t => t === item.id)}">{{item.name}}</span>
      </div>
    </div>
    <!-- <el-checkbox-group class="tidal" v-if="pageStatus==='carWatch' || pageStatus==='carLow'" v-model="carCheckList">
            <el-checkbox label="大货车"></el-checkbox>
            <el-checkbox label="出租车"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
    </el-checkbox-group>-->
    <!-- 交通构成图例 -->
    <div class="vehiclesiv d_vehiclesiv" v-if="pageStatus==='trafficWatch'">
      <div class="vehiclesiv_img d_vehiclesiv_img">
        <div class="tuli_div" style="background-color: #c0a020;"></div>
        <span>到达交通比例</span>
      </div>
      <div class="vehiclesiv_img d_vehiclesiv_img">
        <div class="tuli_div" style="background-color: #206fc0;"></div>
        <span>驶离交通比例</span>
      </div>
      <div class="vehiclesiv_img d_vehiclesiv_img">
        <div class="tuli_div" style="background-color: #20c0be;"></div>
        <span>内部交通比例</span>
      </div>
      <div class="vehiclesiv_img d_vehiclesiv_img">
        <div class="tuli_div" style="background-color: #00c645;"></div>
        <span>过境交通比例</span>
      </div>
    </div>
    <!-- 交通状态观测选择框 -->
    <el-checkbox-group
      class="tidal"
      v-if="pageStatus==='trafficFlow'"
      v-model="trafficFlowList"
      style="background-color: #03072a !important;;width:100px"
    >
      <el-checkbox
        v-for="(item, key) in trafficFlowCheckBox"
        :label="item.value"
        :class="item.class"
        :key="key"
        style="display:block;text-align:left;margin-left:-7px;line-height:30px;color:#646567 !important"
        id="level"
      >{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-dialog
      :close-on-press-escape="false"
      title="人工录入情报"
      :visible.sync="peopleEntry"
      width="460px"
      :before-close="handleClose"
      :lock-scroll="true"
      v-dialogDrag
      :show-close="true"
      :close-on-click-modal="false"
      class="tems_dialog intelligence"
    >
      <!-- 地图弹窗 -->
      <div class="scrollPart" id="scrollDPart">
        <el-form
          :model="formValidate"
          :rules="ruleValidate"
          ref="formValidateEmpty"
          label-width="90px"
          class="demo-ruleForm"
        >
          <div
            :style="{'width': (item.province ? '100%' : 'auto'), 'display': 'flex','flex-direction': 'column','width': ((item.timeFunction === 'time' && item.tableProp==='startTime' || item.tableProp==='endTime') ? '50%' : 'auto')}"
            v-for="(item, index) in DialogList"
            :key="index"
          >
            <el-form-item
              v-if="item.option"
              :class="item.class ? item.class: ''"
              :label="item.tableName+'：'"
              :prop="item.tableProp"
            >
              <el-select
                class="tems_Input"
                v-model="formValidate[DialogList[index].tableProp]"
                filterable
                clearable
                size="small"
                :placeholder="(item.placeholder ? item.placeholder : '请选择...')"
              >
                <el-option
                  v-for="(items, index) in item.option"
                  :key="index"
                  :label="items.label"
                  :value="items.value"
                />
              </el-select>
            </el-form-item>
            <!-- :prop="item.tableProp" -->
            <el-form-item
              v-if="item.button"
              :class="item.class ? item.class: ''"
              :label="item.tableName+'：'"
            >
              <div
                style="border:1px solid;border-radius: 15px;color: rgb(76, 195, 236);padding:0 15px;cursor: pointer;"
                @click="showMapDialog"
              >{{item.btnName}}</div>
            </el-form-item>
            <el-form-item
              v-if="item.timeFunction"
              style="margin: 0px;"
              :label-width="item.tableName === '至' ? '20px' : 'auto'"
              :class="item.class ? item.class: ''"
              :label="item.tableName+'：'"
              :prop="item.tableProp"
            ></el-form-item>
            <el-form-item
              v-if="item.timeFunction === 'timeAll'"
              :class="item.class ? item.class: ''"
              :label="''"
              label-width="0px"
              :prop="item.tableProp"
            >
              <el-date-picker
                v-if="item.timeFunction"
                v-model="formValidate[DialogList[index].tableProp]"
                editable
                unlink-panels="true"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-if="item.timeFunction === 'time'"
              class="DialogListTime"
              :class="item.class ? item.class: ''"
              :label="''"
              label-width="0px"
              :prop="item.tableProp"
            >
              <el-date-picker
                v-model="formValidate[DialogList[index].tableProp]"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-if="item.Inputbox"
              :class="item.class ? item.class: ''"
              :label="item.tableName+'：'"
              :prop="item.tableProp"
            >
              <el-autocomplete
                class="ass_Input"
                @keyup.native="keyup(item.DariyListData)"
                size="small"
                clearable
                :trigger-on-focus="true"
                @select="handleSelect"
                v-model="formValidate[DialogList[index].tableProp]"
                :fetch-suggestions="querySearchAsyncdurableAry"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item
              v-if="!item.button && !item.timeFunction && !item.option && !item.Inputbox"
              :class="item.class ? item.class: ''"
              :label="item.tableName+'：'"
              :prop="item.tableProp"
            >
              <el-input
                :maxlength="item.length || 30"
                class="tems_Input"
                v-model="formValidate[DialogList[index].tableProp]"
                clearable
                size="small"
                :placeholder="(item.placeholder ? item.placeholder : '请输入...')"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer flexRow">
        <div class="flexNum">
          <div class="tems_Button inportBtn dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
          <div class="tems_Button exportBtn dic_closed" @click="handleSubmit(formValidate)">保 存</div>
        </div>
      </div>
    </el-dialog>
    <mapDialog
      ref="mapDialog"
      @showMapDialog="showMapDialog"
      :dialogVisible="dialogVisible"
      :mapDialogPoint="mapDialogPoint"
      :LayermapDialog="LayermapDialog"
      @selectPoint="selectPoint"
      @removeLayermapDialog="removeLayermapDialog"
    ></mapDialog>
    <div id="map" style="width:100px;height:100px;display:none"></div>
  </div>
</template>

<style>
/* .today~.available,
.next-month,.prev-month div{
  display: none;
} */
.tidalClass .el-checkbox__inner {
  width: 15px;
  height: 15px;
}
.tidalClass .el-checkbox__inner::after {
  height: 11px;
  left: 1.5px;
  top: -2px;
  width: 6px;
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
}
.el-button + .el-button {
  margin-left: 10px;
}

.tidalClassA .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #cd0a0a !important;
  background: #cd0a0a !important;
}
.tidalClassA .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #cd0a0a !important;
  background: #cd0a0a !important;
}
.tidalClassA .el-checkbox__inner {
  border: 1px solid #cd0a0a;
  background: #cd0a0a;
}

.tidalClassB .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #b85be4 !important;
  background: #b85be4 !important;
}
.tidalClassB .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #b85be4 !important;
  background: #b85be4 !important;
}
.tidalClassB .el-checkbox__inner {
  border: 1px solid #b85be4;
  background: #b85be4;
}

.tidalClassC .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #2f82ff !important;
  background: #2f82ff !important;
}
.tidalClassC .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #2f82ff !important;
  background: #2f82ff !important;
}
.tidalClassC .el-checkbox__inner {
  border: 1px solid #2f82ff;
  background: #2f82ff;
}

.tidalClassD .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #2afbea !important;
  background: #2afbea !important;
}
.tidalClassD .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #2afbea !important;
  background: #2afbea !important;
}
.tidalClassD .el-checkbox__inner {
  border: 1px solid #2afbea;
  background: #2afbea;
}

.tidalClassE .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #2bdf27 !important;
  background: #2bdf27 !important;
}
.tidalClassE .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #2bdf27 !important;
  background: #2bdf27 !important;
}
.tidalClassE .el-checkbox__inner {
  border: 1px solid #2bdf27;
  background: #2bdf27;
}

.ODClass1 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #9e0000 !important;
  background: #9e0000 !important;
}
.ODClass1 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #9e0000 !important;
  background: #9e0000 !important;
}
.ODClass1 .el-checkbox__inner {
  border: 1px solid #9e0000;
  background: #9e0000;
}

.ODClass2 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #db3300 !important;
  background: #db3300 !important;
}
.ODClass2 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #db3300 !important;
  background: #db3300 !important;
}
.ODClass2 .el-checkbox__inner {
  border: 1px solid #db3300;
  background: #db3300;
}

.ODClass3 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #0144a9 !important;
  background: #0144a9 !important;
}
.ODClass3 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #0144a9 !important;
  background: #0144a9 !important;
}
.ODClass3 .el-checkbox__inner {
  border: 1px solid #0144a9;
  background: #0144a9;
}

.ODClass4 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #00a295 !important;
  background: #00a295 !important;
}
.ODClass4 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #00a295 !important;
  background: #00a295 !important;
}
.ODClass4 .el-checkbox__inner {
  border: 1px solid #00a295;
  background: #00a295;
}

.ODClass5 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #93066d !important;
  background: #93066d !important;
}
.ODClass5 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #93066d !important;
  background: #93066d !important;
}
.ODClass5 .el-checkbox__inner {
  border: 1px solid #93066d;
  background: #93066d;
}

.ODClass6 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #7500b1 !important;
  background: #7500b1 !important;
}
.ODClass6 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #7500b1 !important;
  background: #7500b1 !important;
}
.ODClass6 .el-checkbox__inner {
  border: 1px solid #7500b1;
  background: #7500b1;
}

.ODClass7 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #92de10 !important;
  background: #92de10 !important;
}
.ODClass7 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #92de10 !important;
  background: #92de10 !important;
}
.ODClass7 .el-checkbox__inner {
  border: 1px solid #92de10;
  background: #92de10;
}

.ODClass8 .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #04aa00 !important;
  background: #04aa00 !important;
}
.ODClass8 .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #04aa00 !important;
  background: #04aa00 !important;
}
.ODClass8 .el-checkbox__inner {
  border: 1px solid #04aa00;
  background: #04aa00;
}

.TailNumberArray .el-input {
  height: 100% !important;
}
.searchBoxLeft {
  flex: 2;
  display: flex;
}
/* .searchBoxRight {
  display: flex;
  flex-direction: column;
} */
.leftTop .el-button--mini,
.leftTop .el-button--mini.is-round {
  padding: 0px 15px;
  margin-left: 5px;
  height: 35px;
}
.leftTop .el-checkbox__label,
.leftTop .el-radio__label {
  padding-left: 3px !important;
}
.leftTop .el-checkbox + .el-checkbox,
.leftTop .el-radio + .el-radio {
  margin-left: 10px;
}
.d_cartidal .el-tag {
  width: auto !important;
  padding-top: 1px !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  display: inline-block !important;
}
.fenkai .el-input {
  height: 36px !important;
}
</style>

<style scoped>
.searchBox {
  top: 3px;
  text-align: left;
  position: relative;
  display: flex;
  flex: 1;
}
.searchBtn {
  margin-left: 1%;
}
.tems_dialog {
  height: auto;
}
.dataTimer /deep/ .el-range-separator {
  color: #22c6f9 !important;
}
.tidal,
.cartidal {
  background: #030729;
  border-radius: 4px;
  margin-top: 5px;
  width: 100%;
  box-sizing: border-box;
}
.tidal {
  padding: 8px 10px;
}
.searchBtn {
  height: 32px;
}
.searchBox /deep/ .el-select {
  width: 89% !important;
  height: 35px;
}
.searchBox /deep/ .el-select > .el-input {
  height: 35px;
}
.searchBox /deep/ .searchBtn {
  width: 10% !important;
  height: 35px;
  padding: 0;
  line-height: 35px;
  text-align: center;
}
.searchBox /deep/ .searchEventBtn {
  width: 14% !important;
  height: 35px;
  padding: 0;
  line-height: 35px;
  text-align: center;
}
.searchBox /deep/ .dataTimer {
  width: 437px !important;
}

.leftTop .searchBox .el-select {
  flex: 1;
}
.choseStates {
  width: 50px;
  height: 60px;
  border: 1px solid #409eff;
  border-radius: 5px;
  line-height: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  margin-top: 6px;
  margin-right: 10px;
}
.choseStatesPoint {
  color: white;
  background-color: #409eff;
}
.choseStatesArea {
  color: #409eff;
  background-color: #fff;
}
#level /deep/ .el-checkbox__label {
  color: #646567 !important;
  font-weight: bold;
}
.vehiclesiv {
  width: 130px;
  height: 25px;
  /* border: 1px solid #409eff; */
  text-align: left;
}
.vehiclesiv_img {
  margin-top: 10px;
  cursor: pointer;
  color: #8f9094;
  font-weight: bold;
}
.vehicleImg {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 10px;
}
.vehicles_active {
  color: #444446;
}
.d_vehiclesiv .tuli_div {
  width: 28px;
  height: 16px;
  float: left;
  margin-top: 2px;
  border-radius: 3px;
}
.d_vehiclesiv .d_vehiclesiv_img {
  margin-top: 10px;
}
.d_vehiclesiv .d_vehiclesiv_img span {
  margin-left: 5px;
  color: #646567;
}
.tidallevel {
  margin-left: 90px;
}
</style>

<script>
// 引入地图弹窗
import mapDialog from "@/components/common/mapDialog";
import { setTimeout } from "timers";
import coordtransform from "coordtransform";
// 引入营运车辆图片
import Bus from "@/assets/vehicleIcons/Bus.png"; // 公交车
import Bigtruck from "@/assets/vehicleIcons/Bigtruck.png"; // 大货车
import Dangerouschemcalscar from "@/assets/vehicleIcons/Dangerouschemcalscar.png"; // 危险品运输车
import Bigbus from "@/assets/vehicleIcons/Bigbus.png"; // 大客车
import Ambulance from "@/assets/vehicleIcons/Ambulance.png"; // 救护车
import Fireengine from "@/assets/vehicleIcons/Fireengine.png"; // 消防车
import Policecar from "@/assets/vehicleIcons/Policecar.png"; // 警车
export default {
  // 路口交通观测的点位 roadPoint:"",
  props: [
    "pageStatus",
    "point",
    "roadPoint",
    "roadsKey",
    "roadColor",
    "mapSearchLayer",
    "mapGis",
    "coordinateTracingPointImg"
  ],
  components: {
    mapDialog
  },
  data() {
    return {
      leftHide: true,
      options: this.$store.state.Operatingvehicles,
      placeholder: "请选择车辆..",
      students: [],
      value5: [],
      ruleValidate: {
        intelligenceId: this.$CommonRule.SelectRule,
        name: this.$CommonRule.NotEmpty,
        timeAll: this.$CommonRule.DateRuleNotTody,
        startTime: this.$CommonRule.DateRule,
        endTime: this.$CommonRule.DateRulelittleTody,
        location_latitude: this.$CommonRule.SelectRule,
        area: this.$CommonRule.SelectRule
      },
      // 搜索框里的内容
      serchContent: "",

      tidalLowRadiodataType: "工作日", // 潮汐流规律日期类型选择
      area: this.$store.state.area,
      // 搜索的时间区间
      serchTime: [new Date(2018, 10, 5, 0, 0), new Date(2018, 11, 5, 0, 0)],
      // 时间搜索
      serchTimeO: "",
      serchTimeP: "",
      // 人工录入的弹窗是否显示
      peopleEntry: false,
      eventType: [],
      form: {
        type: "",
        time: ""
      },
      // 弹窗的关联值
      formValidate: {
        location_latitude: ""
      },
      // 弹窗的传值
      falseReturn: true,
      DialogList: [
        {
          tableName: "事件类型",
          tableProp: "intelligenceId",
          option: [],
          url: "intelligence/?custom=custom",
          changName: "name",
          changid: "id"
        },
        {
          tableName: "事件名称",
          tableProp: "name"
        },
        // { tableName: "事件起止时间", tableProp: "timeAll", timeFunction:"timeAll"  },
        {
          tableName: "事件起止时间",
          tableProp: "startTime",
          timeFunction: "time"
        },
        {
          tableName: "至",
          tableProp: "endTime",
          timeFunction: "time",
          class: "noneTipe kongColor"
        },
        {
          tableName: "事件地点",
          tableProp: "location_latitude",
          button: "button",
          btnName: "地图绘制",
          class: "is-required"
        },
        {
          tableName: "区域",
          tableProp: "area",
          // Inputbox: true,
          // DariyListData: ["tj_bound", "QH_NAME", "AREA_ID"]
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
        {
          tableName: "事件级别",
          tableProp: "level",
          option: [
            { label: "1级", value: "1" },
            { label: "2级", value: "2" },
            { label: "3级", value: "3" },
            { label: "4级", value: "4" }
          ]
        },
        {
          tableName: "备注",
          tableProp: "remark"
        }
      ],
      // 是否显示地图弹窗
      dialogVisible: false,
      // 交通构成查询的区域
      lowArea: "",
      OdSjh:false,
      // OD观测的查询的起点
      startPoint: "",
      mapDialogPoint: "", // mapDialog回显的坐标点集合
      // OD观测的查询的终点
      endPoint: "",
      // OD规律搜索区域
      searchArea: this.$store.state.area,
      lowStartRegion: "",
      lowEndRegion: "",
      lowStartPoint: "",
      DataLakeLow:false,
      lowEndPoint: "",
      // 判断是否调用数据湖
      sjhTide: 1,
      // 潮汐流复选框数组
      tidalCheckList: [],
      // 潮汐流规律时段选择数组
      tidalTimeIntervalCheckList: [
        "0点到3点",
        "3点到6点",
        "6点到9点",
        "9点到12点",
        "12点到15点",
        "15点到18点",
        "18点到21点",
        "21点到24点"
      ],
      // 潮汐流规律时段区分
      tidalTimeInterval: [
        {
          name: "0点到3点",
          colorA: "158,0,0",
          colorB: "#ff1919",
          class: "ODClass1",
          flag: 1,
          index: 1
        },
        {
          name: "3点到6点",
          colorA: "63,189,255",
          colorB: "#82d4ff",
          class: "ODClass2",
          flag: 1,
          index: 2
        },
        {
          name: "6点到9点",
          colorA: "1,68,169",
          colorB: "#3b89fe",
          class: "ODClass3",
          flag: 1,
          index: 3
        },
        {
          name: "9点到12点",
          colorA: "0,162,149",
          colorB: "#36f1e2",
          class: "ODClass4",
          flag: 1,
          index: 4
        },
        {
          name: "12点到15点",
          colorA: "147,6,109",
          colorB: "#93066d",
          class: "ODClass5",
          flag: 1,
          index: 5
        },
        {
          name: "15点到18点",
          colorA: "117,0,177",
          colorB: "#b632fa",
          class: "ODClass6",
          flag: 1,
          index: 6
        },
        {
          name: "18点到21点",
          colorA: "146,222,16",
          colorB: "#cbff72",
          class: "ODClass7",
          flag: 1,
          index: 7
        },
        {
          name: "21点到24点",
          colorA: "4,170,0",
          colorB: "#3ef63a",
          class: "ODClass8",
          flag: 1,
          index: 8
        }
      ],
      // 潮汐流等级选择数组
      tidalCurrentGrade: [],
      // 路口交通观测的点位
      roadPoints: this.roadPoint,
      // 营运车辆复选框数组
      carCheckList: [],
      tidalCheckLists:[],
      // 交通状态观测复选框
      trafficFlowList: [],
      // 判断调用数据湖数据
      CarSjhLew: false,
      trafficFlowCheckBox: [
        {
          label: "畅通",
          value: "0",
          class: "tidalClassE",
          flag: 1
        },
        {
          label: "基本畅通",
          value: "1",
          class: "tidalClassD",
          flag: 1
        },
        {
          label: "轻度拥堵",
          value: "2",
          class: "tidalClassC",
          flag: 1
        },
        {
          label: "中度拥堵",
          value: "3",
          class: "tidalClassB",
          flag: 1
        },
        {
          label: "重度拥堵",
          value: "4",
          class: "tidalClassA",
          flag: 1
        }
      ],
      // 工作日，双休日， 法定节假日
      ODTimer: "工作日",
      ODTimerCheckBox: [
        {
          value: "工作日",
          id: 1
        },
        {
          value: "非工作日",
          id: 0
        }
        // {
        //   value: "法定节假日"
        // }
      ],
      roadKey: [],
      // 改变页面的底部的选项卡
      pageChange: true,

      // 选择的点位和区域
      choseStates: false,
      // 地图基础搜索功能的输入框
      baseSearch: "",
      baseChose: [
        {
          id: 1,
          name: "区域"
        },
        {
          id: 2,
          name: "道路"
        },
        {
          id: 3,
          name: "地理信息"
        },
        {
          id: 4,
          name: "点位"
        }
      ],
      // 营运车辆图标数组
      vehicleIconArray: [
        {
          id: "7",
          name: "警车",
          src: Policecar,
          flag: 1
        },
        {
          id: "1",
          name: "公交车",
          src: Bus,
          flag: 1
        },
        {
          id: "2",
          name: "大货车",
          src: Bigtruck,
          flag: 1
        },
        {
          id: "4",
          name: "大客车",
          src: Bigbus,
          flag: 1
        },
        {
          id: "5",
          name: "救护车",
          src: Ambulance,
          flag: 1
        },
        {
          id: "6",
          name: "消防车",
          src: Fireengine,
          flag: 1
        },
        {
          id: "3",
          name: "危险品运输车",
          src: Dangerouschemcalscar,
          flag: 1
        }
      ],
      baseId: 1,
      // 判定道路交通状态观测的画线问题
      stop: 1,
      // 地图基础功能选择的东西
      choseSome: "",
      // 搜索地图接口返回的数据
      allMapPoint: [],
      poiMap: [],
      quMap: [],
      roadMap: [],
      allMap: [],
      loading: false,
      LayermapDialog: false // 控制mapDialog弹窗中的图层是否从地图上删除(当这个变为true时mapDialog中会把图层从地图上清除)
    };
  },
  computed: {
    // "roadPoints": function () {
    //     return this.roadPoint;
    // }
  },
  methods: {
    // 搜索
    async search() {
      // 情报搜索
      if (this.pageStatus === "eventBulletin") {
        // if (this.serchTime !== null && this.serchTime !== "") {
        //   let currTime = this.$filter.timesFormat(new Date()); // 生成一个当前时间用于对比时间
        //   if (this.$filter.timesFormat(this.serchTime[0]) > currTime || this.$filter.timesFormat(this.serchTime[1] > currTime)) {
        //     // 只要有一个时间大于现在时刻就不成立
        //     if (this.$filter.timesFormat(this.serchTime[0]) > currTime) {
        //       // 第一个时间大于现在时刻
        //       this.$showSimpleMessage("开始时间不能大于当前时刻", "error");
        //       return;
        //     }
        //     if (this.$filter.timesFormat(this.serchTime[1] > currTime)) {
        //       // 第二个时间大于现在时刻
        //       this.$showSimpleMessage("结束时间不能大于当前时刻", "error");
        //       return;
        //     }
        //   }
        // }
        // let data = {};
        // if (this.serchContent && this.serchTime === null) {
        //   data["area"] = this.serchContent;
        // } else if (this.serchTime && this.serchContent === "") {
        //   console.log(new Date(this.serchTime[1]).getTime());
        //   console.log(new Date(this.serchTime[0]).getTime());
        //   data["startTime"] =
        //     new Date(this.serchTime[1]).getTime() -
        //     new Date(this.serchTime[0]).getTime();
        //   data["endTime"] = this.$tools.setTimeUse(
        //     new Date(new Date(this.serchTime[1]).getTime())
        //   );
        // } else if (this.serchTime && this.serchContent !== "") {
        //   data["area"] = this.serchContent;
        //   data["startTime"] =
        //     new Date(this.serchTime[1]).getTime() -
        //     new Date(this.serchTime[0]).getTime();
        //   data["endTime"] = this.$tools.setTimeUse(
        //     new Date(new Date(this.serchTime[1]).getTime())
        //   );
        // }
        let data = {};
        if (this.serchContent) {
          data["area"] = this.serchContent;
        }
        this.$emit("searchEvent", data);
      }
      // 潮汐流规律搜索
      if (this.pageStatus === "tidalLow") {
        // let url = "/intelligenceCustom/?status=1&intelligenceStatus=1&alarmStatus=1";
        let aa = this.tidalLowRadiodataType;
        let tidalCheckList = [];
        this.tidalCheckList.map(t => {
          switch (t) {
            case "一级潮汐流":
              tidalCheckList = [...tidalCheckList, 1];
              break;
            case "二级潮汐流":
              tidalCheckList = [...tidalCheckList, 2];
              break;
            case "三级潮汐流":
              tidalCheckList = [...tidalCheckList, 3];
              break;
            case "四级潮汐流":
              tidalCheckList = [...tidalCheckList, 4];
              break;
            case "五级潮汐流":
              tidalCheckList = [...tidalCheckList, 5];
              break;
          }
        });
        if(this.serchTimeO==null && this.serchTimeP==null){
          this.DataLakeLow = false;
          let tidalsearchdata = {
            tidalareaval: this.serchContent, // 潮汐流区域
            tidalCheckList: tidalCheckList, // 潮汐流等级
            dayNatrue: this.tidalLowRadiodataType, // 潮汐流日期类型
            tidalserchTime: this.serchTime, // 潮汐流时间
            type: this.pageStatus // 潮汐流属性是观测还是规律
          };
          this.$emit("tidalsearchEvent", tidalsearchdata);
        }
        this.tidalCheckLists = tidalCheckList;
        if (this.serchTimeO && this.serchTimeP) {
          this.serchTime = [this.serchTimeO, this.serchTimeP];
          if (this.serchTime !== null && this.serchTime !== "") {
            let currTime = this.$filter.timesFormat(new Date()); // 生成一个当前时间用于对比时间
            if (
              this.$filter.timesFormat(this.serchTime[0]) > currTime ||
              this.$filter.timesFormat(this.serchTime[1] > currTime)
            ) {
              // 只要有一个时间大于现在时刻就不成立
              if (this.$filter.timesFormat(this.serchTime[0]) > currTime) {
                // 第一个时间大于现在时刻
                this.$showSimpleMessage("开始日期不应大于当前日期", "warning");
                return;
              }
              if (this.$filter.timesFormat(this.serchTime[1]) > currTime) {
                // 第二个时间大于现在时刻
                this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
                return;
              }
            }
            if (
              this.$filter.timesFormat(this.serchTime[0]) >
              this.$filter.timesFormat(this.serchTime[1])
            ) {
              // 第一个时间大于第二个时间
              this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
              return;
            }
          }
          //
          let tidalsearchdata = {
            tidalareaval: this.serchContent, // 潮汐流区域
            tidalCheckList: tidalCheckList, // 潮汐流等级
            dayNatrue: this.tidalLowRadiodataType, // 潮汐流日期类型
            tidalserchTime: this.serchTime, // 潮汐流时间
            type: this.pageStatus // 潮汐流属性是观测还是规律
          };
          this.sjhTide = 0;
          this.DataLakeLow = true;
          this.$emit("tidalsearchEvent", tidalsearchdata);

        }else if (
          this.serchTimeO == "" &&
          this.serchTimeP == "" &&
          this.serchContent == ""
        ) {
           this.DataLakeLow = false;
          let tidalsearchdata = {
            tidalareaval: this.serchContent, // 潮汐流区域
            tidalCheckList: tidalCheckList, // 潮汐流等级
            dayNatrue: this.tidalLowRadiodataType, // 潮汐流日期类型
            tidalserchTime: "", // 潮汐流时间
            type: this.pageStatus // 潮汐流属性是观测还是规律
          };
          this.$emit("tidalsearchEvent", tidalsearchdata);
        } else if (this.serchTimeO == "" || this.serchTimeP == "") {
          this.$showSimpleMessage("请选择完整的时间区间", "warning");
          return;
        }
        //   else {
        // }
      }
      // 路口交通观测搜索
      if (this.pageStatus === "roadWatch") {
        let _this = this;
        if (this.roadPoints !== "") {
          axios
            .get("/intersection/" + this.roadPoints)
            .then(res => {
              let longitude = res.data.data.longitude;
              let latitude = res.data.data.latitude;
              let location = [
                {
                  point: [longitude, latitude],
                  id: res.data.data.id,
                  intelligenceId: "110",
                  move: true
                }
              ];
              _this.$emit("drawPoint", location);
              this.$emit("roadWatch", this.roadPoints);
            })
            .catch(error => {
              this.$showSimpleMessage(error, "error");
            });
        } else {
          this.$showSimpleMessage("请选择点位", "error");
        }
      }
      // OD规律的搜索
      if (this.pageStatus === "ODLow") {
        if (this.serchTimeO && this.serchTimeP) {
          this.serchTime = [this.serchTimeO, this.serchTimeP];
          if (this.serchTime === null || this.serchTime === "") {
            this.$showSimpleMessage("请选择时间区间", "error");
            return;
          }
          let currTime = this.$filter.timesFormat(new Date()); // 生成一个当前时间用于对比时间
          if (
            this.$filter.timesFormat(this.serchTime[0]) > currTime ||
            this.$filter.timesFormat(this.serchTime[1] > currTime)
          ) {
            // 只要有一个时间大于现在时刻就不成立
            if (this.$filter.timesFormat(this.serchTime[0]) > currTime) {
              // 第一个时间大于现在时刻
              this.$showSimpleMessage("开始日期不应大于当前日期", "warning");
              return;
            }
            if (this.$filter.timesFormat(this.serchTime[1]) > currTime) {
              // 第二个时间大于现在时刻
              this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
              return;
            }
          }
          if (
            this.$filter.timesFormat(this.serchTime[0]) >
            this.$filter.timesFormat(this.serchTime[1])
          ) {
            // 第一个时间大于第二个时间
            this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
            return;
          }
          let startTime = this.$tools.getDays(this.serchTime[0]);
          let endTime = this.$tools.getDays(this.serchTime[1]);
          let params = {
            startTime: startTime,
            endTime: endTime
            //   startRegion: this.lowStartRegion,
            //   endRegion: this.lowEndRegion,
            //   startPointId: this.lowStartPoint,
            //   endPointId: this.lowEndPoint
          };
          if (this.lowStartRegion !== "" && this.lowEndRegion !== "") {
            params = {
              startTime: startTime,
              endTime: endTime,
              startRegion: this.lowStartRegion,
              endRegion: this.lowEndRegion
              //   startPointId: this.lowStartPoint,
              //   endPointId: this.lowEndPoint
            };
          }
          if (this.lowStartRegion !== "" && this.lowEndRegion === "") {
            params = {
              startTime: startTime,
              endTime: endTime,
              startRegion: this.lowStartRegion
            };
          }
          if (this.lowEndRegion !== "" && this.lowStartRegion === "") {
            params = {
              startTime: startTime,
              endTime: endTime,
              endRegion: this.lowEndRegion
            };
          }
          this.OdSjh=true;
          this.$emit("ODwatch", params);
        } else {
          this.$showSimpleMessage("请选择完整的时间区间", "warning");
        }
      }
      // 营运车辆规律搜索
      if (this.pageStatus === "carLow") {
        if (this.serchTimeO && this.serchTimeP) {
          this.serchTime = [this.serchTimeO, this.serchTimeP];
          if (this.serchTime !== null && this.serchTime !== "") {
            let currTime = this.$filter.timesFormat(new Date()); // 生成一个当前时间用于对比时间
            if (
              this.$filter.timesFormat(this.serchTime[0]) > currTime ||
              this.$filter.timesFormat(this.serchTime[1] > currTime)
            ) {
              // 只要有一个时间大于现在时刻就不成立
              if (this.$filter.timesFormat(this.serchTime[0]) > currTime) {
                // 第一个时间大于现在时刻
                this.$showSimpleMessage("开始日期不应大于当前日期", "warning");
                return;
              }
              if (this.$filter.timesFormat(this.serchTime[1]) > currTime) {
                // 第二个时间大于现在时刻
                this.$showSimpleMessage("结束日期不应大于当前日期", "warning");
                return;
              }
            }
            if (
              this.$filter.timesFormat(this.serchTime[0]) >
              this.$filter.timesFormat(this.serchTime[1])
            ) {
              // 第一个时间大于第二个时间
              this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
              return;
            }
          }
          let carsearchdata = {
            region: this.serchContent, // 营运车辆区域
            useNatures: this.carCheckList, //  营运车辆类型
            carserchTime: this.serchTime, // 营运车辆时间
            type: this.pageStatus // 营运车辆属性是观测还是规律
          };
          this.CarSjhLew =true;
          this.$emit("carsearchEvent", carsearchdata);
        } else  if (this.serchTimeO =="" || this.serchTimeP == "") {
          this.$showSimpleMessage("请选择完整的时间区间", "warning");
        }
      }
      // 地图基础搜索搜索
      if (
        this.pageStatus === "ODwatch" ||
        this.pageStatus === "tidalWatch" ||
        this.pageStatus === "trafficFlow" ||
        this.pageStatus === "carWatch" ||
        this.pageStatus === "trafficWatch"
      ) {
        let base1 = this.quMap.find(t => t.id === this.choseSome);
        let base2 = this.roadMap.find(t => t.id === this.choseSome);
        let base3 = this.poiMap.find(t => t.id === this.choseSome);
        let base4 = this.allMapPoint.find(t => t.id === this.choseSome);
        if (this.mapSearchLayer !== "") {
          this.mapGis.removeLayer(this.mapSearchLayer);
        }
        if (this.coordinateTracingPointImg !== "") {
          this.mapGis.removeLayer(this.coordinateTracingPointImg);
        }
        console.log(base4);
        // 点位
        if (base4) {
          let chosed = this.allMap.find(t => t.id == this.choseSome);
          let location = [
            {
              point: [chosed.longitude, chosed.latitude],
              id: "m" + chosed.id,
              intelligenceId: "110",
              move: true
            }
          ];
          console.log(chosed);
          this.$emit("drawPoint", location);
          this.$emit("moveToCenter", [chosed.longitude, chosed.latitude]);
        }
        // 区域
        if (base1) {
          let chosed = this.allMap.find(t => t.id == this.choseSome);
          let req = {
            coordinates: [chosed],
            result: "",
            area: chosed.id
          };
          this.$emit("trafficWatch", req);
          this.$emit("moveToCenter", [
            chosed.geometry.coordinates[0][0][0][0],
            chosed.geometry.coordinates[0][0][0][1]
          ]);
        }
        // 路段
        if (base2) {
          let chosed = this.allMap.find(t => t.id == this.choseSome);
          console.log(chosed);
          let location = [
            {
              point: chosed.geometry.coordinates[0][0],
              id: "m" + chosed.id,
              intelligenceId: "110",
              move: true
            }
          ];
          this.$emit("drawPoint", location);
          this.$emit("moveToCenter", chosed.geometry.coordinates[0][0]);
        }
        //地理信息
        if (base3) {
          let chosed = this.allMap.find(t => t.id == this.choseSome);
          let location = [
            {
              point: [chosed.point.lng, chosed.point.lat],
              id: "m" + chosed.id,
              intelligenceId: "110",
              move: true
            }
          ];
          this.$emit("drawPoint", location);
          this.$emit("moveToCenter", [chosed.point.lng, chosed.point.lat]);
        }
      }

      // 交通构成
      //   if (this.pageStatus === "trafficWatch") {
      //     let _this = this;
      //     let result;
      //     let areaId = this.lowArea;
      //     if (this.serchTime === null) {
      //       this.$showSimpleMessage("请选择时间区间", "error");
      //       return;
      //     }
      //     let params = {
      //       startTime: _this.$tools.setTimeUse(_this.serchTime[0]),
      //       endTime: _this.$tools.setTimeUse(_this.serchTime[0]),
      //       areaId: areaId
      //     };
      //     await sjhAxios
      //       .post("sjh2/strategysupport/trafficComposition/obser", {})
      //       .then(res => {
      //         result = res.data.data;
      //         let key = "tj_bound";
      //         let name = "QH_NAME";
      //         let queryString = this.$store.state.area.find(
      //           t => t.id === this.lowArea
      //         ).name;
      //         let testUrl =
      //           "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
      //           key +
      //           '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
      //           key +
      //           '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
      //           name +
      //           "</PropertyName><Literal>" +
      //           queryString +
      //           "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
      //           name +
      //           "</PropertyName><Literal>" +
      //           queryString +
      //           "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
      //         geoAxios.get(testUrl).then(async res => {
      //           let coordinates = res.data.features;
      //           let req = {
      //             coordinates: coordinates,
      //             result: result,
      //             area: areaId
      //           };
      //           this.$emit("trafficWatch", req);
      //         });
      //       });
      //   }
      // 交通状态观测
      //   if (this.pageStatus === "trafficFlow") {
      //     let params = {
      //       choseArea: this.serchContent,
      //       choseLevel: this.trafficFlowList
      //     };
      //     this.$emit("trafficFlow", params);
      //   }
    },

    // 人工录入
    manualEntry() {
      this.peopleEntry = true;
      if (this.$refs["formValidateEmpty"]) {
        this.$refs["formValidateEmpty"].resetFields();
        this.formValidate = {};
      }
    },
    // 关闭人工录入弹窗
    handleClose() {
      this.$layerNotice(
        "提示",
        "确定要取消吗？",
        () => {
          this.peopleEntry = false;
          this.$refs["formValidateEmpty"].resetFields();
          this.formValidate = {};
          this.LayermapDialog = true;
        },
        null,
        "warning"
      );
    },
    // 取消
    resetForm() {
      this.$layerNotice(
        "提示",
        "确定要取消吗？",
        () => {
          this.peopleEntry = false;
          this.$refs["formValidateEmpty"].resetFields();
          this.formValidate = {};
          this.LayermapDialog = true;
        },
        null,
        "warning"
      );
    },
    selectPoint(item) {
      if (item.length === 0) {
        this.formValidate.location = "";
        this.formValidate.location_latitude = "";
        return;
      }
      this.formValidate.location = JSON.stringify(item);
      this.formValidate.location_latitude = JSON.stringify(item);
    },
    //  选择成功
    handleSelect(item) {
      // console.log(item)
    },
    keyup(item) {
      this.DariyListData = item;
    },
    // 输入或选择
    querySearchAsyncdurableAry(queryString, cb) {
      if (
        queryString !== undefined &&
        queryString !== "" &&
        queryString !== null
      ) {
        let key = this.DariyListData[0];
        let name = this.DariyListData[1];
        let id = this.DariyListData[2];
        let testUrl =
          "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
          key +
          '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
          key +
          '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
          name +
          "</PropertyName><Literal>" +
          queryString +
          "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
          name +
          "</PropertyName><Literal>" +
          queryString +
          "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
        // let testUrl = "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" + key + "&outputformat=json&Filter=<GetFeature xmlns=\"http://www.opengis.net/wfs\" service=\"WFS\" version=\"1.1.0\" outputFormat=\"application/json\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd\"><Query typeName=\"wit_brains:" + key + "\" srsName=\"EPSG:4326\" xmlns:osm=\"http://openstreemap.org\"><Filter xmlns=\"http://www.opengis.net/ogc\"><And><PropertyIsEqualTo><PropertyName>NAME</PropertyName><Literal>" + queryString + "</Literal></PropertyIsEqualTo></And></Filter></Query></GetFeature>";
        let MapDataList = [];
        geoAxios
          .get(testUrl)
          .then(async res => {
            if (res.data.totalFeatures === 0) {
              this.$showSimpleMessage("未查询到数据", "error");
              this.falseReturn = false;
            } else {
              this.falseReturn = true;
              for (let i in res.data.features) {
                MapDataList.push({
                  value: res.data.features[i].properties[name],
                  id: res.data.features[i].properties[id]
                });
              }
              this.MapDataList = await this.$tools.arrUnique(
                MapDataList,
                "value"
              );
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(this.MapDataList);
              }, 100);
            }
          })
          .catch(error => {
            this.$showSimpleMessage(error, "error");
          });
      }
    },
    // 确定人工录入
    handleSubmit(data) {
      this.$refs["formValidateEmpty"].validate(valid => {
        if (valid) {
          if (data.timeAll) {
            data.startTime = data.timeAll[0];
            data.endTime = data.timeAll[1];
          }
          data.startTime = this.$filter.timesFormat(data.startTime);
          data.endTime = this.$filter.timesFormat(data.endTime);
          delete data.timeAll;
          let dataNow = this.$filter.timesFormat(new Date());
          if (data.endTime < dataNow) {
            this.$showSimpleMessage("事件结束日期应大于当前日期", "warning");
            return false;
          }
          if (!this.falseReturn) {
            this.$showSimpleMessage(
              "区域名称不存在，请重新输入选取区域名称",
              "error"
            );
            return false;
          }
          if (!data.location_latitude) {
            this.$showSimpleMessage("地图未画，请重新打开地图操作", "error");
            return false;
          }
          this.$layerNotice(
            "提示",
            "您确定要录入吗？",
            () => {
              axios
                .post("intelligenceCustom/", data)
                .then(res => {
                  if (res.data.code === 0) {
                    this.peopleEntry = false;
                    this.$refs["formValidateEmpty"].resetFields();
                    this.$showSimpleMessage("保存成功", "success");
                    this.LayermapDialog = true;
                    this.$emit("requestInitializationIntelligence");

                  } else {
                    let mess = this.$store.state.codeStatus.find(
                      t => t.code === res.data.code
                    ).name;
                    this.$showSimpleMessage(mess, "error");
                  }
                })
                .catch(error => {
                  this.$showSimpleMessage(error, "error");
                });
            },
            null,
            "warning"
          );
        } else {
          this.$showSimpleMessage("内容验证失败", "error");
          return false;
        }
      });
    },
    // 显示/关闭地图弹窗
    showMapDialog() {
      this.dialogVisible = !this.dialogVisible;
      if (this.dialogVisible) {
        this.mapDialogPoint = this.formValidate.location;
      }
    },
    // 处理人工录入的值
    getOption(data) {
      let option = [];
      axios
        .get(data.url)
        .then(res => {
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
            this.$showSimpleMessage(
              this.$store.state.codeStatus.find(t => t.code === res.data.code)
                .name,
              "error"
            );
          }
        })
        .catch(this.defaultHttpHandler);
    },
    getEardiry() {
      let data = this.DialogList;
      for (let j in data) {
        if (data[j].url) {
          this.getOption(data[j]);
        }
      }
    },
    // 检测开始时间和结束时间
    tiemDB() {
      let startTime = this.formValidate.startTime;
      let endTime = this.formValidate.endTime;
      if (
        startTime !== null &&
        startTime !== "" &&
        startTime !== undefined &&
        endTime !== null &&
        endTime !== "" &&
        endTime !== undefined
      ) {
        startTime = this.$filter.timesFormat(startTime);
        endTime = this.$filter.timesFormat(endTime);
        let nowData = this.$filter.timesFormat(new Date());
        if (endTime <= startTime) {
          this.formValidate.endTime =
            nowData > endTime ? new Date() : startTime + 60000;
          this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
        }
      }
    },
    // 切换OD观测和OD规律
    changeOD() {
      if (this.pageStatus === "ODwatch") {
        this.$emit("changePageStatus", "ODLow");
        // 请求区域列表
        // axios.get("/district/").then((res) => {
        //     this.searchArea = res.data.data;
        // })
      } else {
        this.$emit("changePageStatus", "ODwatch");
      }
    },
    // 切换潮汐流观测和潮汐流规律
    changeTidal() {
      this.tidalCheckList = []; // 切换时清空选择的潮汐流等级
      this.serchContent = ""; // 切换时清空选择的潮汐流区域
      if (this.pageStatus === "tidalWatch") {
        this.$emit("changePageStatus", "tidalLow");
      } else {
        this.serchTimeO = "";
        this.serchTimeP = "";
        this.serchTime = ""; // 切换时清空选择的潮汐流规律时间
        this.tidalLowRadiodataType = "工作日"; // 切换时恢复选择的潮汐流日期类型
        this.$emit("changePageStatus", "tidalWatch");
      }
    },
    // 切换营运车辆观测和营运车辆规律
    changeCar() {
      this.carCheckList = []; // 切换时清空选择的营运车辆类型
      this.serchContent = ""; // 切换时清空选择的营运车辆区域
      if (this.pageStatus === "carWatch") {
        this.$emit("changePageStatus", "carLow");
      } else {
        this.serchTimeO = "";
        this.serchTimeP = "";
        this.serchTime = ""; // 切换时清空选择的营运车辆规律时间
        this.$emit("changePageStatus", "carWatch");
      }
    },
    // 监听checkbox选择的潮汐流等级
    handleCheckedCitiesChange(value) {
      let tidalCheckList = [];
      value.map(t => {
        switch (t) {
          case "一级潮汐流":
            tidalCheckList = [...tidalCheckList, 1];
            break;
          case "二级潮汐流":
            tidalCheckList = [...tidalCheckList, 2];
            break;
          case "三级潮汐流":
            tidalCheckList = [...tidalCheckList, 3];
            break;
          case "四级潮汐流":
            tidalCheckList = [...tidalCheckList, 4];
            break;
          case "五级潮汐流":
            tidalCheckList = [...tidalCheckList, 5];
            break;
        }
      });
        this.tidalCheckLists = tidalCheckList;
      let tidalsearchdata = {
        tidalCheckList: tidalCheckList, // 潮汐流等级
        type: this.pageStatus // 潮汐流属性是观测还是规律
      };
      if (this.pageStatus === "tidalLow") {
        // 潮汐流规律参数
        this.serchTime = [this.serchTimeO, this.serchTimeP];
        (tidalsearchdata.tidalareaval = this.serchContent), // 潮汐流区域
          (tidalsearchdata.dayNatrue = this.tidalLowRadiodataType), // 潮汐流日期类型
          (tidalsearchdata.tidalserchTime = this.serchTime); // 潮汐流时间
      }
      this.$emit("handleCheckedCitiesChange", tidalsearchdata);
    },
    // 监听潮汐流规律时段选择
    handleCheckedCitiesChangeTimer(value) {

      this.$emit("handleCheckedCitiesChangeTimer", value);
    },
    // 监听营运车辆选择车辆类型
    handleCheckedCarChange(value) {
      let item = this.carCheckList.find(t => t === value);
      if (item) {
        this.carCheckList.splice(this.carCheckList.indexOf(item), 1);
      }
      this.carCheckList = item
        ? [...this.carCheckList]
        : [...this.carCheckList, value];
      let carsearchdata = {
        useNatures: this.carCheckList, // 营运车辆类型
        type: this.pageStatus // 营运车辆属性是观测还是规律
      };
      if (this.pageStatus === "carLow") {
        // 营运车辆规律参数
        this.serchTime = [this.serchTimeO, this.serchTimeP];
        (carsearchdata.region = this.serchContent), // 营运车辆区域
          (carsearchdata.carserchTime = this.serchTime); // 营运车辆时间
      }
      this.$emit("handleCheckedCarChange", carsearchdata);
    },
    // 切换交通状态观测和规律
    changeTrafficFlow() {
      if (this.pageStatus === "trafficFlow") {
        this.$emit("changePageStatus", "trafficLow");
      } else {
        this.$emit("changePageStatus", "trafficFlow");
      }
    },
    changePoint(val) {
      this.$emit("changeRoadPoint", val);
    },
    // 切换点位和区域
    changeChoseStates() {
      this.choseStates = !this.choseStates;
      this.lowStartRegion = "";
      this.lowEndRegion = "";
      this.lowStartPoint = "";
      this.lowEndPoint = "";
    },
    // 请求地图服务，地图基础搜索功能
    // 地图基础搜索，取消前面的选择
    async requestMapAll(val) {
      this.allMap = [];
      this.loading = true;
      for (let i = 1; i < 5; i++) {
        await this.requestMap(i, val);
      }
    },
    requestMap(baseId, val) {
      //   let baseId = baseId;
      let searchType = "";
      let name = "QH_NAME";
      switch (baseId) {
        case 1:
          searchType = "tj_bound";
          break;
        case 2:
          searchType = "tj_towns2";
          name = "NAME";
          break;
        case 3:
          searchType = "tj_poi";
          name = "name";
          break;
        case 4:
          searchType = "none";
          break;
      }
      //   this.loading = true;
      if (searchType === "none") {
        // this.allMap = [];
        let pointList = [];
        axios
          .get("/intersection/?status=1&monitor=0&intersectionName=" + val)
          .then(res => {
            pointList = res.data.data;
            if (pointList.length > 0) {
              pointList.map(val => {
                val.name = val.intersectionName;
              });
              this.allMapPoint = pointList;
              if (this.allMap.length === 0) {
                this.allMap = pointList;
              } else {
                this.allMap = [...this.allMap, pointList];
              }
            }
          })
          .catch(error => {
            this.$showSimpleMessage(error, "error");
          });
      }
      if (baseId === 3) {
        let map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(116.404, 39.915));
        let options = {
          onSearchComplete: results => {
            // this.loading = false;
            if (local.getStatus() == BMAP_STATUS_SUCCESS) {
              // 判断状态是否正确
              let s = [];
              for (let i = 0; i < results.getCurrentNumPois(); i++) {
                results.getPoi(i).name = results.getPoi(i).title;
                results.getPoi(i).id = results.getPoi(i).uid;
                let poi = coordtransform.bd09togcj02(
                  results.getPoi(i).point.lng,
                  results.getPoi(i).point.lat
                );
                results.getPoi(i).point.lng = poi[0];
                results.getPoi(i).point.lat = poi[1];
                s.push(results.getPoi(i));
              }
              this.poiMap = s;
              if (this.poiMap.length > 0) {
                if (this.allMap.length === 0) {
                  this.allMap = this.poiMap;
                } else {
                  this.allMap = [...this.allMap, ...this.poiMap];
                }
              }
              this.loading = false;
            }
          }
        };
        let local = new BMap.LocalSearch(map, options);
        local.search("天津" + val);
      }
      if (baseId === 1 || baseId === 2) {
        let queryString = val;
        let testUrl =
          "geoserver/wit_brains/wfs?request=GetFeature&version=1.1.0&typename=wit_brains:" +
          searchType +
          '&outputformat=json&Filter=<GetFeature xmlns="http://www.opengis.net/wfs" service="WFS" version="1.1.0" outputFormat="application/json" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"><Query typeName="wit_brains:' +
          searchType +
          '" srsName="EPSG:4326" xmlns:osm="http://openstreemap.org"><Filter xmlns="http://www.opengis.net/ogc"><Or><PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><PropertyName>' +
          name +
          "</PropertyName><Literal>" +
          queryString +
          "*</Literal></PropertyIsLike><PropertyIsEqualTo><PropertyName>" +
          name +
          "</PropertyName><Literal>" +
          queryString +
          "</Literal></PropertyIsEqualTo></Or></Filter></Query></GetFeature>";
        geoAxios
          .get(testUrl)
          .then(async res => {
            let coordinates = res.data.features;
            // this.loading = false;
            if (baseId === 1) {
              coordinates.map(val => {
                val.name = val.properties.QH_NAME;
              });
              this.quMap = coordinates;
              this.allMap = [...this.allMap, ...this.quMap];
            } else if (baseId === 2) {
              let length = coordinates.length;
              let coor = [];
              coordinates.map((val, index) => {
                let item = coor.find(t => t.name === val.properties.NAME);
                if (!item) {
                  val.name = val.properties.NAME;
                  coor.push(val);
                }
              });
              // coor.map((val, index) => {
              //   if (val.name === null) {
              //     coor.splice(index, 1)
              //   };
              // });
              this.roadMap = coor;
              if (this.allMap.length === 0) {
                this.allMap = this.roadMap;
              } else {
                this.allMap = [...this.allMap, ...this.roadMap];
              }
            } else {
            }
          })
          .catch(error => {
            this.$showSimpleMessage(error, "error");
          });
      }
    },
    ODLowTimerChange() {
      // console.log(this.roadKey);
      if (this.pageStatus === "ODLow") {
        this.$emit("ODLowTimerChange", this.roadKey);
      }
    },
    // 最外层弹窗关闭后mapDialog组件的回调
    removeLayermapDialog() {
      this.LayermapDialog = false;
    }
  },
  mounted() {
    // 登录后再执行
    if (this.$store.state.userLogin) {
      this.getEardiry();
    }
  },
  created() {
    // 登录后再执行
    if (this.$store.state.userLogin) {
      // 请求事件类型
      axios
        .get("/intelligence/?custom=custom")
        .then(res => {
          if (res.data.code === 0) {
            this.eventType = res.data.data;
          } else {
            this.$showSimpleMessage(
              this.$store.state.codeStatus.find(t => t.code === res.data.code)
                .name,
              "error"
            );
          }
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
      // 请求区域列表
      axios.get("/district/").then(res => {
        this.searchArea = res.data.data;
      });
    }
  },
  watch: {
    "formValidate.startTime": function(val) {
      this.tiemDB();
    },
    "formValidate.endTime": function(val) {
      this.tiemDB();
    },
    roadPoints: function(val) {
      this.$emit("changeRoadPoint", val);
    },
    roadPoint: function(val) {
      this.roadPoints = val;
    },
    trafficFlowList: function(val) {
     this.choseSome = "";
      if (
        this.pageStatus === "trafficFlow" &&
        this.serchContent !== "" &&
        this.serchContent !== null
      ) {

        this.$emit("trafficFlow", {
          choseLevel: val,
          choseArea: this.serchContent
        });
      } else if (this.pageStatus === "trafficFlow" && val.length == 5) {
        this.$emit("trafficFlow", { choseLevel: val });
      } else if (val.length < 5) {
        this.stop = 0;
        this.$emit("trafficFlow", { choseLevel: val });
      }
    },
    ODTimer: function(val) {
      // this.roadKey = [];
      if (this.pageStatus === "ODLow") {
        this.$emit("ODTimerChange", val);
      }
    },
    pageChange: function(val) {
      if (val === false) {
        this.serchContent = "";
        this.startPoint = "";
        this.endPoint = "";
        this.lowArea = "";
        this.lowStartRegion = "";
        this.lowEndRegion = "";
        this.serchTime = null;
        this.serchTimeO = "";
        this.serchTimeP = "";
        this.ODTimer = "工作日";
        this.tidalCheckList = [];
        this.tidalLowRadiodataType = "工作日";
        this.carCheckList = [];
        this.value5 = [];
        this.trafficFlowList = ["0", "1", "2", "3", "4"];
        this.choseSome = "";
        if (this.pageStatus === "trafficWatch") {
          this.baseId = 2;
          this.baseChose = [
            {
              id: 2,
              name: "道路"
            },
            {
              id: 3,
              name: "地理信息"
            },
            {
              id: 4,
              name: "点位"
            }
          ];
        } else {
          this.baseId = 1;
          this.baseChose = [
            {
              id: 1,
              name: "区域"
            },
            {
              id: 2,
              name: "道路"
            },
            {
              id: 3,
              name: "地理信息"
            },
            {
              id: 4,
              name: "点位"
            }
          ];
        }
        this.pageChange = true;
      }
    },
    pageStatus: function(val) {
		console.log("leftTop watch pageStatus ---------", val);
      if (val === "trafficLow") {
        this.leftHide = false;
      } else {
        this.leftHide = true;
      }
      // pageStatus==='eventBulletin'" 人工录入
      // pageStatus==='tidalWatch'"  潮汐流规律
      // pageStatus==='tidalLow'" 潮汐流观测
      // pageStatus==='ODwatch'" OD规律
      // pageStatus==='ODLow'" OD观测
      // pageStatus==='carLow'" 营运车辆观测
      // pageStatus==='carWatch 营运车辆规律
      // 'trafficFlow'" 拥堵规律分析
      // pageStatus==='trafficLow 交通状态观测
    },
    baseId: function(val) {
      this.choseSome = "";
      this.allMap = [];
      // if (val === 4) {
      //     this.allMap = this.point;
      //     this.allMap.map(val => {
      //         val.name = val.intersectionName;
      //     })
      // }
    },
    choseSome: function(val) {
      if (val === "") {
        this.allMap = [];
      }
    }
  }
};
</script>
