<template>
  <!-- 400px -->
  <div style="display:flex;height: 400px">
    <div
      class="leftOrRight"
      @click="showOrHide"
      style="background-color: rgba(3, 8, 37, 0.9);color:#ffffff;"
    >{{leftRight}}</div>
    <!-- <div style=" background-color: rgba(255, 255, 255, 0.8);"> -->
    <!-- style="background-color: #081d52;" -->
    <div>
      <div class="videoNow">
        <!-- <video  autoplay = "autoplay" loop="loop"  :src="'http://10.20.5.19/' + realTimeVideoAddress" style="position: relative;" width="310px"></video> -->
        <video id="videoIs" class="video-js"></video>
      </div>
      <div class="videoEvent">
        <!-- <video
          controls="controls"
          autoplay="autoplay"
          loop="loop"
          :src="'http://10.20.5.19' + watchVideoUrl"
          style="position: relative;"
          width="310px"
          height="200px"
        ></video> -->
        <video
          controls="controls"
          autoplay="autoplay"
          loop="loop"
          :src="watchVideoUrl"
          style="position: relative;"
          width="310px"
          height="175px">
        </video>
      </div>
      <!-- <el-date-picker v-model="dateInterval" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            <el-table class="timeListT" :show-header="false" :data="tableData" @cell-click="showVideo"  border style="width: 100%">
                <el-table-column prop="date" label="日期"  width="300">
                </el-table-column>
      </el-table>-->
    </div>
    <el-dialog
      :close-on-press-escape="false"
      :title="dialogTitle"
      :visible.sync="ShowVideo"
      width="600px"
      style="padding:10px"
      :before-close="handleClose"
      :lock-scroll="true"
      v-dialogDrag
      :show-close="true"
      :close-on-click-modal="false"
      class="tems_dialog eventDetail"
    >
      <video
        autoplay="autoplay"
        controls="controls"
        loop="loop"
        :src="videoUrl"
        style="position: relative;"
        width="580px"
      ></video>
    </el-dialog>
  </div>
</template>
<style scoped>
.videoNow .videoEvent {
  width: 300px;
  height: 150px;
}
.timeListT {
  cursor: pointer;
  position: absolute;
  top: 400px;
  bottom: 0px;
  width: 310px;
  background-color: white;
  text-align: center;
  color: #000;
  border: 1px solid #000;
}
.leftOrRight {
  cursor: pointer;
  width: 35px;
  height: 100px;
  position: relative;
  background-color: rgba(255, 255, 255);
  line-height: 100px;
  text-align: center;
  color: #000;
  top: 50%;
  transform: translateY(-50%);
}
.eldialog {
  padding: 10px;
}
</style>
<style>
.el-picker-panel {
  z-index: 3001 !important;
}
</style>

<script>
export default {
  name: "watchVideo",
  props: ["watchVideoUrl", "realTimeVideoAddress"], // 事件视频地址, 设备实时视频地址
  data() {
    return {
      videoUrl: "",
      // 选择的时间区间
      dateInterval: "",
      tableData: [],
      leftRight: "<<",
      ShowVideo: false,
      dialogTitle: ""
    };
  },
  watch: {
    dateInterval: function(val) {
      this.tableData = [];
      let _this = this;
      if (!val[0]) return;
      let startTime = new Date(val[0]).getTime();
      let endTime = new Date(val[1]).getTime();
      this.JsonData.map(val => {
        let time = new Date(val.date).getTime();
        console.log(time);
        console.log(startTime);
        if (time > startTime) {
          console.log(startTime);
          _this.tableData.push(val);
        }
      });
    },
    watchVideoUrl: function(val) {
      // console.log(val);
    },
    realTimeVideoAddress: function(val) {
      // console.log(val);
    }
  },
  created() {
    this.leftRight = "》";
    this.videoUrl = this.$store.state.videoUrl;
    this.tableData = this.JsonData;
  },
  mounted() {
    setTimeout(() => {
      this.$videojs(`#videoIs`, {
        controls: true,
        height: 200,
        width: 310,
        loop:true,
        /* flash: {
                    swf: "../../../assets/video-js.swf"
                }, */
        /* html5: {
                    hls: {
                        withCredentials: true
                    }
                }, */
        controlBar: {
          progressControl: false,
          remainingTimeDisplay: false
        },
        autoplay: true,
        preload: "auto",
        sources: [
          {
            src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${this.realTimeVideoAddress}`,
            type: "video/mp4",
          }
        ]
      });
    }, 1000);
  },
  beforeDestroy() {
    this.$videojs(`#videoIs`).dispose();
  },
  methods: {
    showOrHide() {
      this.$emit("showOrHide");
      // if(this.leftRight === "《") {
      //     this.leftRight = "》"
      // } else {   b nvb bn
      //     this.leftRight = "《"
      // }
    },
    showVideo(data) {
      // console.log(data)
      this.ShowVideo = true;
      this.dialogTitle = data.address;
    },
    handleClose() {
      this.ShowVideo = false;
    }
  }
};
</script>

