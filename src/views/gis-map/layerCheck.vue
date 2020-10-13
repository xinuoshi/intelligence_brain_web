<template>
  <div>

    <!-- 情报图层控制 -->
    <!-- <el-checkbox v-if="typeName === 'intelligence'" :indeterminate="isIndeterminate" v-model="checkAll" @change="inhandleCheckAllChange">{{title}}</el-checkbox> -->
    <div class="el-checkbox__label" v-if="typeName === 'intelligence'">
        <label class="el-checkbox" @click="inhandleCheckAllChange">
          <span
          :class="{'el-checkbox__label': true, 'd_span': true, 'active': checkedNews.length > 0}">
          {{title}}</span>
        </label>
    </div>
    <div v-if="typeName === 'intelligence'" style="margin: 15px 0;"></div>
    <!-- <el-checkbox-group v-model="checkedNews" @change="inhandleCheckedChange" v-if="typeName === 'intelligence'">
            <el-checkbox  v-for="item in data" :label="item.name" :key="item.name" :title="item.name" class="elCheckbox">
                  <img class="QBimg" :src="item.imgSrc" alt="">
                    {{item.name}}
            </el-checkbox>
    </el-checkbox-group> -->
    <div class="el-checkbox-group" v-if="typeName === 'intelligence'">
      <label class="elCheckbox" v-for="item in data" :key="item.name" :title="item.name" @click="inhandleCheckedChange(item.name)">
        <span :class="{'el-checkbox__label': true, 'd_span': true, 'active': checkedNews.find(t => t === item.name)}">
          <img class="QBimg" :src="item.imgSrc">
          {{item.name}}
        </span>
      </label>
    </div>

    <!-- 设备图层控制 -->
    <!-- <el-checkbox v-if="typeName === 'equipment'" :indeterminate="isIndeterminate" v-model="checkAll" @change="eqhandleCheckAllChange">{{title}}</el-checkbox> -->
    <div class="el-checkbox__label" v-if="typeName === 'equipment'">
        <label class="el-checkbox" @click="eqhandleCheckAllChange"><span
          :class="{'el-checkbox__label': true, 'd_span': true, 'active': checkedEquipment.length > 0}">
          {{title}}</span></label>
    </div>
    <div v-if="typeName === 'equipment'" style="margin: 15px 0;"></div>
    <!-- <el-checkbox-group v-model="checkedEquipment" @change="eqhandleCheckedChange" v-if="typeName === 'equipment'">
        <el-checkbox  v-for="item in data" :label="item.id" :key="item.id" :title="item.name" class="elCheckbox">
          <img class="SBimg" :src="item.imgSrc" alt="">
          {{item.name}}
        </el-checkbox>
    </el-checkbox-group> -->
    <div class="el-checkbox-group" v-if="typeName === 'equipment'">
      <label class="elCheckbox" v-for="item in data" :key="item.id" :title="item.name" @click="eqhandleCheckedChange(item.id)">
        <span :class="{'el-checkbox__label': true, 'd_span': true, 'active': checkedEquipment.find(t => t === item.id)}">
          <img class="SBimg" :src="item.imgSrc">
          {{item.name}}
        </span>
      </label>
    </div>

    <!-- 设备图层控制 -->
    <!-- <el-checkbox v-if="typeName === 'Pointposition'" :indeterminate="isIndeterminate" v-model="checkedPoint" @change="pphandleCheckAllChange">{{title}}</el-checkbox> -->
    <div class="el-checkbox__label" v-if="typeName === 'Pointposition'">
        <label class="el-checkbox" @click="pphandleCheckAllChange(title)">
          <span :class="{'el-checkbox__label': true, 'd_span': true, 'active': checkedPoint.length > 0}">{{title}}</span>
        </label>
    </div>
  </div>
</template>

<style scoped>
.elCheckbox {
  width: 27%;
  float: left;
  margin-left: 30px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.QBimg, .SBimg {
  width: 20px;
  height: 23px;
  vertical-align: middle;
  margin-right: 8px;
}
.d_span {
  color: #356575 !important;
}
.active {
  color: #22a8ff !important;
}
</style>

<script>
import GisClassMethod from "@/public/GisClassMethod";
export default {
  name: "layerCheck",
  props: ["title", "typeName", "data", "pageStatus"],
  data() {
    return {
      // 左侧选择的情报
      checkedNews: [],
      // 左侧选择点位
      checkedPoint: [],
      // 左侧选择的设备
      checkedEquipment: [],
      // 左侧的全部情报
      news: [],
      isIndeterminate: false,
      checkAll: false,
      newslist: []
    };
  },
  watch: {
    "pageStatus": {
      handler: function(val) {
        if (val === "eventBulletin") {
          setTimeout(() => {
            this.checkedNews = [];
            this.newslist.map(t => { this.checkedNews.push(t.name); });
          }, 100);
        }
      }
    }
  },
  methods: {
    inhandleCheckAllChange(val) {
      // let allNew = [];
      // this.data.map(val => {
      //   allNew.push(val.name);
      // });
      // this.checkedNews = val ? allNew : [];
      // this.isIndeterminate = false;

      if (this.data.length === this.checkedNews.length) {
        this.checkedNews = [];
      } else {
        this.data.map(t => {
          let item = this.checkedNews.find(e => e === t.name);
          if (!item) {
            this.checkedNews = [...this.checkedNews, t.name];
          }
        });
      }
      this.$emit("inChange", this.checkedNews);
    },
    inhandleCheckedChange(val) {
      // let checkedCount = val.length;
      // this.checkAll = checkedCount === this.data.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length;

      let item = this.checkedNews.find(t => t === val);
      if (item) {
        this.checkedNews.splice(this.checkedNews.indexOf(item), 1)
      }
      this.checkedNews = item ? [...this.checkedNews] : [...this.checkedNews, val];
      this.$emit("inChange", this.checkedNews);
    },

    eqhandleCheckAllChange(val) {
      // let allEquipment = [];
      // this.data.map(val => {
      //   allEquipment.push(val.id);
      // });
      // this.checkedEquipment = val ? allEquipment : [];
      // this.isIndeterminate = false;

      if (this.data.length === this.checkedEquipment.length) {
        this.checkedEquipment = [];
      } else {
        this.data.map(t => {
          let item = this.checkedEquipment.find(e => e === t.id);
          if (!item) {
            this.checkedEquipment = [...this.checkedEquipment, t.id];
          }
        });
      }
      this.$emit("eqChange", this.checkedEquipment);
    },
    eqhandleCheckedChange(val) {
      // let checkedCount = val.length;
      // this.checkAll = checkedCount === this.data.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length;

      let item = this.checkedEquipment.find(t => t === val);
      if (item) {
        this.checkedEquipment.splice(this.checkedEquipment.indexOf(item), 1)
      }
      this.checkedEquipment = item ? [...this.checkedEquipment] : [...this.checkedEquipment, val];
      this.$emit("eqChange", this.checkedEquipment);
    },

    pphandleCheckAllChange(val) {
      this.checkedPoint = this.checkedPoint.length > 0 ? [] : [val];
      let checkedPointZ = this.checkedPoint.length > 0 ? true : false;
      this.$emit("ppChange", checkedPointZ);
    }
  },
  created() {
    // 登录后再执行
    if (this.$store.state.userLogin) {
      axios.get("/intelligence/").then(res => {
        this.newslist = res.data.data.filter(t => t.status === 1);
        // 情报页默认全选
        this.checkedNews = [];
        this.newslist.map(t => {
          t.name = t.name === "外地车异常占比波动报警阈值" ? "外地车数量异常" : (t.name === "大型车流量占比波动阈值" ? "车型构成异常" : t.name);
          this.checkedNews.push(t.name);
        });
      }).catch(error => {
        this.$showSimpleMessage(error, "error");
      });
    }
  }
};
</script>
