<template>
  <el-dialog :title="title" :lock-scroll="true" ref="form" v-dialogDrag :show-close="true" :visible.sync="showCheck" class="tems_dialog cwl" width="1150px" style="z-index:3000" :close-on-click-modal="false" :before-close="closeDialog" append-to-body :close-on-press-escape="false" >
    <div v-if="title === '编辑单位' || title==='查看单位'" style="overflow: auto;text-align:left;padding-left: 10px; height:460px;margin-top:10px;display:flex;justify-content:space-around;">
      <div class="depLeft">
          <tree-table slot="table" ref="recTree" :title="title" :checkList="checkList" :list.sync="department"  @handlerExpand="handlerExpand" @changeChecked="changeChecked"></tree-table>
      </div>
      <div class="depRight">
          <div v-for="(item,index) in chosed" style="color:#00C1DE" :key="index">
              <i class="t-icon m-dep"></i>
              {{item.name}}
          </div>
      </div>
       
    </div>
    <div v-else style="overflow: auto;text-align:left; height:450px;margin-top:10px;">
      <el-menu class="el-menu-demo" active-text-color="#00ffff" :default-active="defaultActive" @select="handleSelect">
        <el-menu-item class="el-menu-btn"  v-for="(item,inx) in header" :key="item.id" :index="inx.toString()" > <a :href="'#'+item.id">{{item.name}}</a> </el-menu-item>
      </el-menu>
      <div  @scroll="navScroll" id="scrollForm" style="overflow: auto;text-align:left; height:400px;margin-top:10px;">
        <el-form :disabled="dis">
          <table class="table" border="1">
            <tbody>
              <el-checkbox-group v-model="power">
                <tr id="tr" v-for="(item, index) in powerData" :key="index">
                  <td style="vertical-align: middle;" v-for="(val, idx) in item" v-if="val.rowspan!==0" :id="val.id" :rowspan="val.rowspan" :colspan="val.colspan" :key="idx + '0'">
                    <span
                      class="normalTd"
                      v-if="val.name && val.name !=='——'"
                    >
                      <el-checkbox
                        :label="val.id"
                        @change="lineChose(val.id)"
                      >{{val.name}}</el-checkbox>
                    </span>
                    <span
                      class="normalTd"
                      style="text-align:center"
                      v-else-if="val.name && val.name ==='——'"
                    >{{val.name}}</span>
                    <span
                      v-else
                      class="unNormalTd"
                    >
                      <el-checkbox
                        style="display: inline-block;padding:5px 5px;margin-left:10px"
                        v-if="val[0].name !=='——'"
                        v-for="t in val"
                        :key="t.id"
                        :disabled="t.id ==='70102' || t.id ==='70103' || t.id ==='70104' || t.id ==='70105' || t.id ==='70106' || t.id ==='70202' || t.id ==='70203' || t.id ==='70204' || t.id ==='70205' || t.id ==='70206'"
                        @change="lineChose(t.id)"
                        :label="t.id"
                      >{{t.name}}</el-checkbox>
                      <span
                        v-else
                        style="display:inline-block;width:100%;text-align:center"
                      >{{val[0].name}}</span>
                    </span>
                  </td>
                </tr>
              </el-checkbox-group>
            </tbody>
          </table>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flexRow buttonBottom">
      <div class="flexNum">
        <btn ref="btn" :button-list="buttonList" @operation="operation"></btn>
      </div>
    </div>
  </el-dialog>
</template>
<style scoped>
.t-icon.m-dep {
    background: url(/static/img/unitIcon.4f10e736.png) no-repeat;
}
.t-icon {
    display: inline-block;
    width: 20px;
    height: 25px;
    background-size: 100% 100% !important;
    vertical-align: middle;
    margin: -3px 4px 0 0;
}
.cwl /deep/ .el-dialog {
  padding: 0 0 !important;
  height: 625px !important;
  /* overflow: hidden; */
}
.cwl /deep/ .el-dialog .el-dialog__body {
  margin-left: 10px !important;
}
.cwl /deep/ .el-dialog__footer {
    padding: 20px;
}
.first {
  margin-left: 30px;
  border-top: 1px solid #dfe4e4;
}
.first:first-child {
  border-top: none;
}
.second {
  margin-left: 60px;
}
.third {
  margin-left: 90px;
}
.four {
  margin-left: 120px;
}
.five {
  margin-left: 150px;
}
.six {
  margin-left: 180px;
}
.el-checkbox-group {
  line-height: 30px;
}
.cwl /deep/ .el-dialog__title {
  text-align: center;
}
.cwl /deep/ .el-dialog__header {
  text-align: center;
}
.cwl /deep/ .el-dialog::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -3px;
    background: -webkit-gradient(linear,left top, left bottom,from(#0e66d8),color-stop(#00ebfb),to(#0e66d8));
    background: linear-gradient(#0e66d8,#00ebfb,#0e66d8);
    content: '';
    z-index: -1;
    border-radius: 10px;
}
.el-menu-demo {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(0, 0, 0, 0);
}
.el-menu-btn {
  background-color: rgb(0, 0, 0, 0);
  width: 100px;
  text-align: center;
}
.el-menu-item {
  border-bottom: 1px solid #073168;
}
.el-menu-item:hover,
.el-menu-item.is-active,
.el-submenu.is-active .el-submenu__title {
  background: rgb(0, 0, 0, 0) !important;
  border-bottom: 1px solid #00ffff;
}
.el-menu-demo /deep/ .el-menu-item:hover,
.el-menu-demo /deep/ .el-submenu .el-menu-item:hover,
.el-menu-demo /deep/ .el-submenu .el-menu-item.is-active,
.el-menu-demo /deep/ .el-submenu__title:hover,
.el-menu-demo /deep/ .el-menu-item.is-active,
.el-menu-demo /deep/ .el-submenu.is-active .el-submenu__title {
  background: rgb(0, 0, 0, 0) !important;
  border-bottom: 1px solid #00ffff;
}
table, tr, th, td,{
    border:1 !important;
}
td {
    border: 1px solid !important;
}
.table {
  margin-top: 10px;
  padding: 0;
  margin-left: 20px;
}
table {
  display: table;
  border-collapse: separate;
  border-spacing: 0px !important;
  border: 1px solid #086580;
  border-color: #086580 !important;
}
td {
  border-color: #086580 !important;
}
.normalTd {
  /* width: 120px; */
  padding: 5px 0px;
  color: #086580;
  border-color: #086580;
  display: inline-block;
  margin-left: 10px;
}
.unNormalTd {
  width: 600px;
  display: inline-block;
  color: #086580;
  border-color: #086580;
}
.tr {
  display: flex;
}
.unNormalTd /deep/ .el-checkbox__inner,
.normalTd /deep/ .el-checkbox__inner {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 10px;
  /* top:-2px; */
  background-color: #fff;
}
.unNormalTd /deep/ .el-checkbox__inner::after,
.normalTd /deep/ .el-checkbox__inner::after {
  height: 15px;
  left: -1px;
  top: 0px;
  width: 15px;
  border: 0px solid #fff;
  border-left: 0;
  border-top: 0;
  background: #00ffff;
  border-radius: 50%;
}
a {
  text-decoration: none;
  color: #54d5ff;
}
.depLeft{
    width: 450px;
    /* height: 458px; */
    background-image: url(../../../assets/depleft.png);
    background-size: contain;
    background-repeat: no-repeat;
}
.depRight{
    width: 450px;
    /* height: 458px; */
    background-image: url(../../../assets/depright.png);
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 60px;
    padding-left: 15px;
}
.depRight>div{
    width: 100%;
    text-align: left;
    height: 30px;
    line-height: 30px;
}
</style>

<script>
import treeTable from "./ruleUnit-tree-table/ruleUnit-tree-table.vue";
export default {
    components: {
        treeTable
    },
    props: ["allData", "chose", "showCheck", "title", "buttonList", "dis", "department"],
    data() {
        return {
            classNameList: ["first", "second", "third", "four", "five", "six"],
            chosed: [],
            header: [],
            powerData: [],
            // 最后一列的数据集合
            lastData: [],
            power: [],
            doData: [],
            checkList:[],
            trs:"",
            doc:"",
            defaultActive: "0"
        };
    },
    watch: {
        showCheck: {
            handler(val, oldVal) {
                if (val === true) {
                    console.log(this.chose)
                    this.chosed = this.$tools.deepCopy(this.chose);
                    if (this.title === "编辑权限" || this.title === "查看权限") {
                        this.power = [];
                        this.chose.map(val => {
                            this.power.push(val.id);
                        });
                    } else {
                        this.chosed = this.$tools.deepCopy(this.chose);
                        this.checkList = [];
                        this.chose.map(val => {
                            this.checkList.push(val.id);
                        })
                        // this.$refs.recTree.newChecked = this.checkList;
                    }
                }
            },
            deep: true
        },
        chosed: {
            handler(val, oldVal) {
                let len = val.length;
                if (this.title === "编辑权限" && len > 0 && val[len - 1]) {
                    this.parentChose(val[len - 1].parentId);
                }
                if (oldVal.length < val.length) {
                }
            },
            deep: true
        },
        allData: function(val) {
            this.selectHeader(val);
            this.doAllData(val);
        },
        power: {
            handler(val, oldVal) {
                let allData = this.doData;
                if (this.showCheck === true) {
                    this.chosed = [];
                    this.power.map(item => {
                        let t = allData.find(v => v.id === item);
                        this.chosed.push(t);
                    });
                }
            },
            deep: true
        },
        checkList:{
            handler(val){
                this.chosed = [];
                // console.log(this.allData)
                val.map(item => {
                    // console.log(item)
                    let aa =  this.allData.find(t => t.id === item);
                    this.chosed.push(aa);
                });
                // console.log(this.chosed)
            },
            deep: true
        }
    },
    methods: {
        //树的选择
        changeChecked(val) {
            this.checkList = val;
        },
        // 关闭编辑框
        closeDialog() {
            if (this.dis === true) {
                this.$emit("changeCheck");
            } else {
                this.$layerNotice(
                    "提示",
                    "确定要取消吗？",
                    () => {
                        this.$emit("changeCheck");
                    },
                    null,
                    "warning"
                );
            }
        },
        // 按钮事件
        operation(data) {
            if (data.index === 0) {
                if (this.dis) {
                    this.$emit("hasChose", this.chose);
                    this.$emit("changeCheck");
                } else {
                    this.$layerNotice(
                        "提示",
                        "确定要取消吗？",
                        () => {
                            this.$emit("hasChose", this.chose);
                            this.$emit("changeCheck");
                        },
                        null,
                        "warning"
                    );
                }
            } else if (data.index === 1) {
                this.$emit("hasChose", this.chosed);
                this.$showSimpleMessage("编辑成功", "success");
                this.$emit("changeCheck");
            }
        },
        // 选中子级，父级选中
        parentChose(parentId) {
            let parent = this.allData.find(t => t.id === parentId);
            let ifshow = this.chosed.find(t => t.id === parentId);
            if (parent !== undefined && !ifshow) {
                this.chosed.push(parent);
                if (parent.parentId && parent.parentId !== 0) {
                    this.parentChose(parent.parentId);
                }
            }
        },
        // 父级去掉，子级全部去掉
        changeStatus(val) {
            let _this = this;
            let ifshow = this.chosed.find(t => t.id === val.id);
            if (!ifshow) {
                if (val.nextlevel) {
                    val.nextlevel.map(item => {
                        if (_this.chosed.find(t => t.id === item.id)) {
                            let value = _this.chosed.find(t => t.id === item.id);
                            let index = this.chosed.indexOf(value);
                            _this.chosed.splice(index, 1);
                        }
                        if (item.nextlevel) {
                            this.changeStatus(item);
                        }
                    });
                }
            } else {
                if (this.title === "编辑权限") {
                    this.parentChose(val.parentId);
                }
                if (val.nextlevel) {
                    val.nextlevel.map(item => {
                        let ItemNameList = [
                            "单位创建",
                            "单位编辑",
                            "单位删除",
                            "单位启用",
                            "单位停用",
                            "角色创建",
                            "角色编辑",
                            "角色删除",
                            "角色启用",
                            "角色停用"
                        ];
                        if (
                            !_this.chosed.find(t => t.id === item.id) &&
              ItemNameList.find(t => t === item.name) === undefined
                        ) {
                            _this.chosed.push(item);
                        }
                        if (item.nextlevel) {
                            this.changeStatus(item);
                        }
                    });
                }
            }
        },
        // 导航的按钮
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        // 筛选导航条
        async selectHeader(data) {
            let header = [];
            await data.map(val => {
                if (val.level === "0") {
                    header.push(val);
                }
            });
            this.header = header;
            this.powerData = [];
            this.lastData = [];
            await header.map(val => {
                this.doPower(val);
            });
            this.choseLastData();
        },
        // 处理数据,找出最后一列的数据集合
        doPower(data) {
            if (data.nextlevel && data.nextlevel[0]) {
                if (data.nextlevel[0].type !== 2) {
                    data.nextlevel.map(val => {
                        this.doPower(val);
                    });
                } else {
                    this.lastData.push(data.nextlevel);
                }
            } else {
                this.lastData.push(data);
            }
        },
        // 从后往前推，找出每一行的数据
        async choseLastData() {
            let lastData = this.lastData;
            await lastData.map(val => {
                let choseData = [];
                choseData.push(val);
                if (val[0]) {
                    let item = val[0];
                    this.chosePro(item, choseData);
                } else {
                    this.chosePro(val, choseData);
                    // this.powerData.push(choseData);
                }
            });
            console.log(this.powerData);
            let length = 0;
            // 每行的最大个数
            await this.powerData.map(val => {
                let len = val.length;
                if (len > length) {
                    length = len;
                }
            });
            // 处理空的td为——
            await this.powerData.map(val => {
                let len = val.length;
                if (len > 0 && len < length && !val[len - 1].name) {
                    let ll = length - len;
                    for (let i = 0; i < ll; i++) {
                        val.splice(-1, 0, { name: "——" });
                    }
                } else if (len > 0 && len < length) {
                    let ll = length - len;
                    for (let i = 0; i < ll; i++) {
                        if (i === +ll - 1) {
                            val.push([{ name: "——" }]);
                        } else {
                            val.push({ name: "——" });
                        }
                    }
                }
            });
            let data = this.$tools.deepCopy(this.powerData);
            let idx = 0;
            let num = 1;
            data.map(val => {
                val.map(item => {
                    item.rowspan = 1;
                    item.colspan = 1;
                });
            });
            // 合并行
            for (let i = 0; i < length - 1; i++) {
                data.map((val, index) => {
                    if (index > 0) {
                        if (val[i].id && val[i].id === data[index - 1][i].id) {
                            num += 1;
                            val[i].rowspan = 0;
                            val[i].colspan = 0;
                            if (index === data.length - 1) {
                                data[idx][i].rowspan = num;
                            }
                            // val.name = "";
                        } else {
                            data[idx][i].rowspan = num;
                            num = 1;
                            idx = index;
                            val[i].rowspan = 1;
                            val[i].colspan = 1;
                        }
                    } else {
                        val[i].rowspan = 1;
                        val[i].colspan = 1;
                    }
                });
            }
            this.powerData = data;
        },
        // 往前找的方法
        chosePro(data, choseData) {
            let allData = this.allData;
            let item = allData.find(t => t.id === data.parentId);
            if (item === undefined) {
                this.powerData.push(choseData);
            }
            choseData = [item, ...choseData];
            if (item && item.parentId !== "0") {
                this.chosePro(item, choseData);
            } else if (item) {
                this.powerData.push(choseData);
            }
        },
        // 处理alldata
        doAllData(data) {
            let arr = this.$tools.deepCopy(data);
            let doData = [];
            arr.map(val => {
                if (val.name) {
                    doData.push(val);
                } else {
                    val.map(item => {
                        doData.push(item);
                    });
                }
            });
            this.doData = doData;
        },
        // 权限的选择，
        lineChose(dataId) {
            let item = this.power.find(t => t === dataId);
            if (item !== undefined) {
                // 选中
                this.parentToChild(dataId);
                this.childToParent(dataId);
            } else {
                // 取消
                this.cancelParentToChild(dataId);
                this.cancelChildToParent(dataId);
            }
        },
        // 选中父级，子级全部选中
        parentToChild(dataId) {
            let doData = this.doData;
            let item = doData.find(t => t.id === dataId);
            if (item.nextlevel) {
                item.nextlevel.map(val => {
                    let item = this.power.find(t => t === val.id);
                    if (item === undefined && val.id !=='70102' && val.id !=='70103' && val.id !=='70104' && val.id !=='70105' && val.id !=='70106' && val.id !=='70202' && val.id !=='70203' && val.id !=='70204' && val.id !=='70205' && val.id !=='70206') {
                        this.power.push(val.id);
                    }
                    this.parentToChild(val.id);
                });
            }
        },
        // 选中子级，默认选中父级
        childToParent(dataId) {
            let doData = this.doData;
            let item = doData.find(t => t.id === dataId);
            if (item.parentId !== "0") {
                let val = doData.find(t => t.id === item.parentId);
                let par = this.power.find(t => t === val.id);
                if (par === undefined) {
                    this.power.push(val.id);
                }
                this.childToParent(val.id);
                // 选中查询外的其他权限，默认选中查询权限
                let brother = val.nextlevel;
                brother.map(cil => {
                    if(cil.name === "查询") {
                        if(!this.power.includes(cil.id)) {
                            this.power.push(cil.id);
                        }
                    }
                });
            };
        },
        // 父级取消，子级全部取消
        cancelParentToChild(dataId) {
            let doData = this.doData;
            let item = doData.find(t => t.id === dataId);
            if (item.nextlevel) {
                item.nextlevel.map(val => {
                    let index = this.power.indexOf(val.id);
                    if (index !== -1 ) {
                        this.power.splice(index, 1);
                        this.cancelParentToChild(val.id);
                    }
                    // this.cancelParentToChild(val.id);
                });
            }
        },
        // 子级全部取消，父级取消
        cancelChildToParent(dataId) {
            let doData = this.doData;
            let power = this.power;
            let item = doData.find(t => t.id === dataId);
            if (item.parentId !== "0") {
                let parent = doData.find(t => t.id === item.parentId);
                let num = 0;
                // 查询取消，其他的一起取消
                if (item.name === "查询") {
                    parent.nextlevel.map(val => {
                        if(this.power.includes(val.id)) {
                            let ind = power.indexOf(val.id);
                            this.power.splice(ind, 1);
                        }
                    });
                };          
                parent.nextlevel.map(val => {
                    let tt = power.find(t => t === val.id);
                    if (tt !== undefined) {
                        num += 1;
                    }
                });
                if (num === 0) {
                    let index = power.indexOf(parent.id);
                    this.power.splice(index, 1);
                    this.cancelChildToParent(parent.id);
                }
            }
        },
        // 单位管理的展开树的处理
        handlerExpand(m) {
            m.isExpand = !m.isExpand;
        },
        // 角色管理的滚动，导航显示的处理
        navScroll() {
            let trs = "";
            let doc = "";
            if(this.trs === "") {
                trs = document.querySelectorAll("#tr");
                this.trs = trs;
            } else {
                trs = this.trs;
            }
            if(this.doc === "") {
                doc = document.querySelector("#scrollForm");
                this.doc = doc;
            } else {
                doc = this.doc;
            }
            // 滚上去的距离
            let heightAll = doc.scrollTop;
            // 获取每个tr距离顶部的距离
            let len = trs.length;
            for(let i=0; i<len; i++) {
                let height = trs[i].offsetTop;
                if(height < heightAll && height > heightAll - 40) {
                    let navName = trs[i].children[0].innerText;
                    let item = "";
                    this.powerData.map(val => {
                        item = val.find(t => t.name === navName);
                        if(item) {
                            let defaultActive = this.header.findIndex(t => t.name === val[0].name);
                            this.defaultActive = defaultActive.toString();
                        }
                    });
                }
            };
        }
    }
};
</script>
