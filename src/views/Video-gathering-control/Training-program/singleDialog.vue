<template>
  <!-- 创建和编辑查看弹窗 -->
  <el-dialog
    :close-on-press-escape="false"
    :title="dialogTitle"
    v-dialogDrag
    :show-close="true"
    @close="closeNoneTips()"
    :visible="dialogVisible === 'single'"
    class="tems_dialog trainingPg"
    width="700px"
    :close-on-click-modal="false"
    :append-to-body="isMulti"
  >
    <div class="scrollPart" id="scrollDPart">
      <el-form
        :disabled="(dialogTitle === '查看轮巡计划' ? true : false)"
        :model="formValidate"
        :rules="ruleValidate"
        ref="formValidate"
        label-width="140px"
        class="demo-ruleForm"
      >
        <div class="dialog">
          <el-form-item label="轮巡名称：" prop="name">
            <el-input
              maxlength="20"
              class="tems_Input"
              placeholder="请输入..."
              v-model="formValidate.name"
              :clearable="dialogTitle !== '查看轮巡计划'"
              size="small"
            />
          </el-form-item>
          <div style="display: flex">
            <el-form-item label="轮巡时间：" prop="startTime">
              <div class="itemData">
                <el-date-picker
                  type="datetime"
                  class="tems_Input"
                  v-model="formValidate.startTime"
                  size="small"
                  placeholder="选择时间"
                  :clearable="dialogTitle !== '查看轮巡计划'"
                />
              </div>
            </el-form-item>
            <span class="zhiclass">至</span>
            <el-form-item prop="endTime" label-width="0px" class="endTime">
              <div class="itemData">
                <el-date-picker
                  type="datetime"
                  class="tems_Input"
                  v-model="formValidate.endTime"
                  size="small"
                  placeholder="选择时间"
                  :clearable="dialogTitle !== '查看轮巡计划'"
                />
              </div>
            </el-form-item>
          </div>
          <div style="display: flex">
            <el-form-item label="轮巡间隔：" prop="intervalTime" style="width: 90%;">
              <el-input
                maxlength="9"
                class="tems_Input"
                placeholder="请输入..."
                v-model="formValidate.intervalTime"
                :clearable="dialogTitle !== '查看轮巡计划'"
                size="small"
              />
            </el-form-item>
            <span class="zhiclass">分钟</span>
          </div>
          <el-form-item label="选择分屏：" prop="showNumber">
            <el-select
              v-model="formValidate.showNumber"
              :clearable="dialogTitle !== '查看轮巡计划'"
              placeholder="请选择..."
              @change="Selection"
            >
              <el-option
                v-for="(item, index) in videoWinSize"
                :key="index"
                :label="item.size"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="设备列表：">
              <!-- <el-input v-model="videoSearch" size="small" placeholder="请输入...">
                                 <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>-->
              <el-button
                class="qiliang"
                size="mini"
                v-if="dialogTitle !== '查看轮巡计划'"
                style="margin-right:350px;"
                @click="eqDialogOpen"
              >{{"选择设备"}}</el-button>
              <div>
                <div
                  class="flexNum devLineTable"
                  v-for="(eq, index) in formValidate.equipmentIds"
                  :key="index"
                >
                  <div>{{eq.equipmentName}}</div>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 选择设备弹窗 -->
    <el-dialog
      :close-on-press-escape="false"
      title="选择设备"
      v-dialogDrag
      :show-close="false"
      class="tems_dialog eqListDialog"
      width="705px"
      :visible.sync="eqDialogVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="d_transfer" ref="dTransfer">
        <el-transfer
          ref="transEq"
          :titles="['未选中', '已选中']"
          :props="{ key: 'id', label: 'equipmentName' }"
          v-model="eqSeleted"
          filterable
          target-order="push"
          :data="eqData"
        ></el-transfer>
      </div>
      <div slot="footer" class="dialog-footer flexRow">
        <div class="flexNum">
          <div class="tems_Button qiliang dic_closed" @click="eqClose">取 消</div>
          <div class="tems_Button exportBtn" @click="eqSubmit">保 存</div>
        </div>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer flexRow">
      <div class="flexNum">
        <div
          v-if="dialogTitle === '查看轮巡计划'"
          class="tems_Button inportBtn dic_closed"
          @click="closeNoneTips()"
        >关 闭</div>
        <div
          v-if="dialogTitle !== '查看轮巡计划'"
          class="tems_Button inportBtn dic_closed"
          @click="resetForm('formValidate')"
        >取 消</div>
        <div
          v-if="dialogTitle !== '查看轮巡计划'"
          class="tems_Button exportBtn"
          @click="handleSubmit('formValidate')"
        >保 存</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Loading } from "element-ui";
export default {
  props: ["dialogVisible", "dialogTitle", "dialogData", "isMulti"],
  components: {},
  data() {
    return {
      // 选择设备弹窗控制
      eqDialogVisible: false,
      // 获取轮询时长
      PollingTime: "",
      // 获取分屏数量
      SplitScreen: "",
      // 已选中设备列表
      DeviceList: [],
      // 左侧多选按钮
      leftbtn:[],
      // 右侧多选按钮
      rightbtn:[],
      // 弹窗表单
      formValidate: {
        equipmentIds: []
      },
      ruleValidate: {
        name: this.$CommonRule.NotEmpty,
        startTime: this.$CommonRule.DateRule,
        endTime: this.$CommonRule.DateRule,
        intervalTime: this.$CommonRule.MustBeNumberPlus,
        showNumber: this.$CommonRule.SelectRule
      },
      // 初始化已选中数组
      SelectedArry:[],
      // 设备弹窗列表
      eqData: [],
      // 设备弹窗选中
      eqSeleted: [],
      // 分屏数参数
      videoWinSize: [
        { size: "1", value: 1 },
        { size: "3", value: 3 },
        { size: "4", value: 4 },
        { size: "6", value: 6 },
        { size: "8", value: 8 },
        { size: "9", value: 9 },
        { size: "10", value: 10 },
        { size: "13", value: 13 },
        { size: "14", value: 14 },
        { size: "16", value: 16 },
        { size: "25", value: 25 },
        { size: "36", value: 36 },
        { size: "49", value: 49 },
        { size: "64", value: 64 }
      ],
      // 穿梭框设备名长度
      d_transfer_nameLength: 0,
      // 页面loading
      pageLoading: ""
    };
  },
  methods: {
    // 获取弹窗详情
    getData() {
      this.formValidate.equipmentIds = [];
      axios
        .get("turnsInspection/" + this.dialogData.id)
        .then(async res => {
          this.pageLoading = Loading.service({
            lock: true,
            background: "rgba(10, 40, 100, 0)"
          });
          let data = res.data.data;
          let eqSelet = [];
          let equipmentIds = [];
          // await axios.get("equipment/?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1").then(async(res) => {
          await axios
            .get(
              "equipment/rapidly?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1"
            )
            .then(async res => {
              // 海涛提供的一个更快速的接口
              if (res.data.code === 0) {
                this.eqData = await res.data.data;
                data.turnsInspectionEquipmentViewList.forEach(id => {
                  this.eqData.forEach(e => {
                    if (id.equipmentId === e.id) {
                      equipmentIds.push(e);
                      eqSelet.push(e.id);
                    }
                  });
                });
                await this.pageLoading.close();
                this.pageLoading = "";
              }
            })
            .catch(error => {
              this.$showSimpleMessage(error, "error");
            });
          this.$set(this.formValidate, "equipmentIds", equipmentIds);
          this.$set(this.formValidate, "name", data.name);
          this.formValidate.number = data.number;
          let sTime = new Date(data.startTime);
          let eTime = new Date(data.endTime);
          this.$set(
            this.formValidate,
            "startTime",
            new Date(
              sTime.getFullYear(),
              sTime.getMonth(),
              sTime.getDate(),
              sTime.getHours(),
              sTime.getMinutes(),
              sTime.getSeconds()
            )
          );
          this.$set(
            this.formValidate,
            "endTime",
            new Date(
              eTime.getFullYear(),
              eTime.getMonth(),
              eTime.getDate(),
              eTime.getHours(),
              eTime.getMinutes(),
              eTime.getSeconds()
            )
          );
          // this.formValidate.startTime = this.$filter.formatDateTime(data.startTime);
          // this.formValidate.endTime = this.$filter.formatDateTime(data.endTime);
          // this.formValidate.intervalTime = data.intervalTime;
          this.$set(this.formValidate, "intervalTime", data.intervalTime);
          this.$set(this.formValidate, "showNumber", data.showNumber);
          this.eqSeleted = await eqSelet;
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 时间起止时间判定（njc写的）
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
        if (endTime < startTime) {
          this.formValidate.endTime =
            nowData > endTime ? new Date() : startTime + 60000;
          this.$showSimpleMessage("开始日期不应大于结束日期", "warning");
        }
      }
    },
    // 关闭无提示
    closeNoneTips() {
      if (this.dialogVisible === "single") {
        if (this.dialogTitle === "查看轮巡计划") {
          // 查看时，关闭弹窗不提示
          this.$emit("controlShow", "");
          this.$refs["formValidate"].resetFields();
          this.formValidate = {};
          this.eqSeleted = [];
        } else {
          this.$layerNotice(
            "提示",
            "您确定要取消吗？",
            () => {
              this.$emit("controlShow", "");
              this.$refs["formValidate"].resetFields();
              this.formValidate = {};
              this.eqSeleted = [];
            },
            null,
            "warning"
          );
        }
      }
      // this.dialogVisible = false;
    },
    // 弹窗关闭数据变化
    closeDialogData(formName, mes) {
      this.$layerNotice(
        "提示",
        "您确定要" + mes + "吗？",
        () => {
          this.formValidate = { equipmentIds: [] };
          this.$refs[formName].resetFields();
          this.eqSeleted = [];
          // this.dialogVisible = false;
          this.$emit("controlShow", "");
        },
        null,
        "warning"
      );
    },
    // 取消重置表单
    resetForm(formName, mess) {
      if (this.title === "查看" || mess) {
        this.closeDialogData(formName, "关闭");
      } else {
        this.closeDialogData(formName, "取消");
      }
    },
    // 提交
    handleSubmit(name) {

      this.$refs[name].validate(result => {
        // let startTime = this.formValidate.startTime.valueOf();
        // let endTime = this.formValidate.endTime.valueOf();
        let startTime = this.formValidate.startTime.getTime();
        let endTime = this.formValidate.endTime.getTime();
        let aa  = (endTime - startTime)/60000
        let bb = this.PollingTime * this.DeviceList.length;
        let judge = aa>= bb
        if (!result) {
          this.$showSimpleMessage("内容验证失败", "error");
          return false;
        } else if (this.eqSeleted.length === 0) {
          this.$showSimpleMessage("请选择设备", "error");
          return false;
        } else if (startTime >= endTime) {
          this.$showSimpleMessage("轮巡结束时间应大于开始时间", "error");
          return false;
        } else if (!judge) {
          this.$showSimpleMessage(
            "可用轮巡时长应大于等于轮巡实际所需时长",
            "error"
          );
        } else {
          if (this.dialogTitle === "创建单组轮巡计划") {
            this.handleAdd(this.formValidate);
          } else {
            this.handleEdit(this.formValidate);
          }
        }
      });
    },
    // 保存创建
    handleAdd(formData) {
      let eqIds = this.formValidate.equipmentIds.map(e => e.id);
      // console.log(this.formValidate)
      let data = {
        name: this.formValidate.name,
        startTime: this.formValidate.startTime.getTime(),
        endTime: this.formValidate.endTime.getTime(),
        intervalTime: Number(this.formValidate.intervalTime),
        showNumber: this.formValidate.showNumber,
        type: "1",
        equipmentIds: eqIds.toString()
      };
      this.$layerNotice(
        "提示",
        "您确定要创建吗？",
        () => {
          axios
            .post("turnsInspection/", data)
            .then(res => {
              if (res.data.code === 0) {
                this.$emit("controlShow", ""); // 创建编辑弹窗隐藏
                this.formValidate = {};
                this.$refs["formValidate"].resetFields();
                this.eqSeleted = [];
                this.$emit("refreshPage");
                this.$showSimpleMessage("创建成功", "success");
              } else {
                let codeName = this.$store.state.codeStatus.find(
                  t => t.code === res.data.code
                ).name;
                this.$showSimpleMessage(codeName, "error");
              }
            })
            .catch(error => {
              this.$showSimpleMessage(error, "error");
            });
        },
        null,
        "warning"
      );
    },
    // 保存编辑
    handleEdit(formData) {
      let eqIds = this.formValidate.equipmentIds.map(e => e.id);
      // console.log(this.formValidate)
      let data = {
        name: this.formValidate.name,
        number: this.formValidate.number,
        startTime: this.formValidate.startTime.getTime(),
        endTime: this.formValidate.endTime.getTime(),
        intervalTime: Number(this.formValidate.intervalTime),
        showNumber: this.formValidate.showNumber,
        type: "1",
        equipmentIds: eqIds.toString()
      };
      this.$layerNotice(
        "提示",
        "您确定要保存修改吗？",
        () => {
          axios
            .put("turnsInspection/" + this.dialogData.id, data)
            .then(res => {
              if (res.data.code === 0) {
                this.$emit("controlShow", ""); // 创建编辑弹窗隐藏
                this.formValidate = {};
                this.$refs["formValidate"].resetFields();
                this.eqSeleted = [];
                this.$emit("refreshPage");
                this.$showSimpleMessage("保存成功", "success");
              } else {
                let codeName = this.$store.state.codeStatus.find(
                  t => t.code === res.data.code
                ).name;
                this.$showSimpleMessage(codeName, "error");
              }
            })
            .catch(error => {
              this.$showSimpleMessage(error, "error");
            });
        },
        null,
        "warning"
      );
    },
    // 设备弹窗打开
    eqDialogOpen() {
      let _this = this
      // axios.get("equipment/?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1").then(async(res) => {
      axios
        .get(
          "equipment/rapidly?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1"
        )
        .then(async res => {
          // 海涛提供的一个更快速的接口
          if (res.data.code === 0) {
            // 清除左侧列表选中状态
            if(_this.$refs.transEq) {  
              _this.$refs.transEq.$children["0"]._data.checked = [];
            }
            _this.eqData = res.data.data;
            // 获取设备名长度
            // this.rightbtn = [];
            // this.leftbtn =[];
            _this.eqSeleted = this.SelectedArry
            for (let i = 0; i < this.eqData.length; i++) {
              // console.log(this.equipmentList[i].equipmentName.length)
              if (
                this.eqData[i].equipmentName.length > this.d_transfer_nameLength
              ) {
                this.d_transfer_nameLength = await this.eqData[i].equipmentName
                  .length;
              }
            }
            this.$nextTick(() => {
              this.$refs.dTransfer.style.setProperty(
                "--itemWidth",
                `${this.d_transfer_nameLength * 14 + 49}px`
              );
            });
          }
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
      this.eqDialogVisible = true;
    },
    // 设备弹窗取消
    eqClose() {
      this.$layerNotice(
        "提示",
        "您确定要取消吗？",
        () => {
          this.eqSeleted = this.SelectedArry
          this.eqDialogVisible = false;
          this.$refs.transEq.clearQuery("left");
          this.$refs.transEq.clearQuery("right");
        },
        null,
        "warning"
      );
    },
    // 监听分屏数量
    Selection(val, old) {
      this.SplitScreen = val;
    },
    // 设备选择确定
    eqSubmit() {
      this.$layerNotice(
        "提示",
        "您确定要保存吗？",
        () => {
          this.eqDialogVisible = false;
          this.$refs.transEq.clearQuery("left");
          this.$refs.transEq.clearQuery("right");
          this.formValidate.equipmentIds = [];
          this.eqSeleted.forEach(id => {
            this.eqData.forEach(e => {
              if (id === e.id) {
                this.formValidate.equipmentIds.push(e);
              }
            });
          });
        },
        null,
        "warning"
      );
    }
  },
  watch: {
    /* "dialogPropData": {
            handler: function(val, old) {
                console.log("s:" + val)
                this.dialogData = val;
            },
            deep: true
        }, */
    // 监听设备已选中列表
    "eqSeleted": {
      handler: function(val, old) {
        if(!old){
          this.Arry = val
        }
      }
    },
    // 监听轮询时长
    "formValidate.intervalTime": {
      handler: function(val, old) {
        this.PollingTime = val;
      }
    },
    // 监听已选中设备列表
    "formValidate.equipmentIds": {
      handler: function(val, old) {
        val.map(res=>{
          this.SelectedArry.push(res.id);
        })
        this.DeviceList = val;
      }
    },
    "formValidate.startTime": function(val) {
      this.tiemDB();
    },
    "formValidate.endTime": function(val) {
      this.tiemDB();
    },
    "dialogData.id": {
      handler: function(val, old) {
        if (val) {
          
          this.getData();
        } else {
          this.formValidate = {
            equipmentIds: []
          };
        }
      },
      deep: true
    },
    formValidate: {
      handler: function(val, old) {
        // console.log(val)
      },
      deep: true
    }
  },
  created() {},
  mounted() {}
};
</script>

<style>
.eqListDialog .el-transfer-panel__filter {
  margin: 0 !important;
}
</style>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
}
.dialog .zhiclass {
  color: rgb(67, 212, 224);
  padding: 10px 15px 0 0;
}
.dialog /deep/ .el-input__inner {
  padding: 0 25px 0 27px;
}
.d_transfer {
  --itemWidth: 298px;
}
.eqListDialog /deep/ .el-transfer-panel {
  /* overflow-x: visible !important; */
  overflow: visible !important;
}
.eqListDialog /deep/ .el-dialog__header {
  text-align: center;
}
.eqListDialog /deep/ .el-transfer-panel .el-transfer-panel__header {
  /* width: 418px; */
  height: 48px;
}
.eqListDialog /deep/ .el-transfer-panel .el-transfer-panel__body {
  /* width: 410px;
        height: 400px; */
}
.eqListDialog /deep/ .el-dialog__body {
  padding: 0 25px 25px !important;
}
.eqListDialog /deep/ .el-transfer-panel__item {
  /* width: 150%; */
  width: var(--itemWidth);
}
.eqListDialog /deep/ .el-transfer-panel__item .el-checkbox__label {
  text-align: left;
  overflow: visible;
}
.eqListDialog /deep/ .el-transfer-panel__filter .el-input__inner {
  margin-top: 4px;
  width: 95%;
  height: 28px;
}
.eqListDialog /deep/ .el-transfer-panel__list {
  height: 220px;
}
.devLineTable {
  color: #06a2de;
  /* height: 30px; */
  line-height: 30px;
  border: 1px solid #53d3fe;
}
.eqListDialog /deep/ .el-transfer__buttons .el-button {
  margin-left: 0px;
}
</style>
