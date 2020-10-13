<template>
  <div
    style="display: flex;flex-direction: row;flex-wrap: nowrap;width: 100%;height: 100%;border: 1px solid rgba(23, 58, 96, 1);"
  >
    <div class="videoBar">
      <div class="videoBarContent" style="height: 91%">
        <div class="listTitle">{{playText}}</div>
        <div class="eqList">
          <div
            style="border-bottom: 1px solid #215c86; font-size: 18px; width: 100%;height: auto;min-height: 25px; padding: 10px 0; color: #00b9d7;"
            :style="{ backgroundColor: data.type === 1 ? '#0a2864' : 'none' }"
          >{{data.name}}</div>
          <div v-if="data.type === 2">
            <div
              v-for="(item, index) in data.turnsInspectionRelationshipViewList"
              :key="index"
              style="width: 100%; height: auto;"
            >
              <div
                style="border-bottom: 1px solid #215c86; background-color: #0a2864; width: 100%; height: auto; min-height: 25px; padding: 10px 0; color: #00b9d7;"
              >{{item.name + ":"}}</div>
              <div
                v-for="(video, videoIndex) in item.turnsInspectionEquipmentViewList"
                :key="videoIndex"
                style="border-bottom: 1px solid #215c86; width: calc(100% - 20px); height: auto; min-height: 25px; padding: 10px 10px; color: #00b9d7; display: flex; font-size: 14px; text-align:left;"
              >
                <div style="width: 92%;">{{video.equipmentName}}</div>
                <div class="playingImgContent">
                    <div class="playingImg" v-if="showArr.indexOf(video.equipmentNumber) !== -1 && nowPlayList === index"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="data.type === 1">
            <div
              v-for="(video, index) in data.turnsInspectionEquipmentViewList"
              :key="index"
              style="border-bottom: 1px solid #215c86; width: calc(100% - 20px); height: auto; min-height: 25px; padding: 10px 10px; color: #00b9d7; display: flex; font-size: 14px; text-align:left;"
            >
              <div style="width: 92%;">{{video.equipmentName}}</div>
              <div class="playingImgContent">
                <div class="playingImg" v-if="showArr.indexOf(video.equipmentNumber) !== -1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="videoBarContent shotContain" style="height: 9%">
        <!-- <div @click="screenShot()" class="shotButton"></div> -->
      </div>
    </div>
    <div class="videoWindow">
      <div
        class="videoShow"
        :style="data.length === 0 ? { border: '1px solid rgba(23, 58, 96, 1)' } : ''"
      >
        <div
          class="videoShowBg"
          v-for="(item, index) in windowsBox"
          :key="index"
          :style="winStyle[item.id]"
          :ref="item.id"
        >
          <div></div>
          <!-- <video v-if="renderVideo[item.id]"
                        :id="item.id"
                        width="100"
                        height="100"
                        class="video-js">
          </video>-->
        </div>
      </div>
      <div class="videoShowControl">
        <div class="controlSelect">
          <div>
            <span>窗口尺寸：</span>
            <el-select v-model="winScale" @change="Proportion" placeholder="请选择...">
              <el-option label="原比例" value="1"></el-option>
              <el-option label="适应屏幕" value="0"></el-option>
            </el-select>
          </div>
          <!-- <div>
                        <span>清晰度：</span>
                        <el-select v-model="winRate" placeholder="请选择...">
                            <el-option label="高码流" value="1"></el-option>
                            <el-option label="低码流" value="0"></el-option>
                        </el-select>
          </div>-->
        </div>
        <div class="controlRight">
          <!-- <el-pagination class="cli-pagination" background @current-change="currentPage" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, jumper" :total="allPageValue"></el-pagination> -->
          <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
        </div>
      </div>
      <!-- <canvas id="shot" ref="screenShot" :width="800" :height="450"></canvas> -->
    </div>
  </div>
</template>

<script>
import saveAs from "save-as";
import html2canvas from "html2canvas";

export default {
  name: "realtimeVideo",
  components: {},
  data() {
    return {
      // 窗口尺寸
      winScale: "1",
      // 清晰度
      winRate: "1",
      // 窗口数
      winSize: "",
      // 窗口分页页数
      aaaaaaa: 1,
      // 接收终止视频的个数
      dispose:0,
      // 窗口分页每页数
      pageSize: 16,
      // 窗口分页总页数
      allPageValue: 0,
      // 窗口数参数
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
      winStyle: {}, // 窗口样式控制
      // 切换功能按钮
      buttonList: [
        {
          title: "实时模式",
          plain: true,
          size: "mini",
          type: "primary",
          loading: false,
          class: "AIbtn"
        }
      ],
      // 轮巡列表
      data: {},
      multiList: "",
      singleList: [],
      videoList: [],
      // 视频实例组
      videoBox: [],
      showArr: [], // 正在播放的实例组
      // 窗口组
      windowsBox: [],
      // 拖动的数据
      dragData: {},
      //  每次播放的视频
      PageNum :[],
      // 是否渲染视频
      renderVideo: {},
      playText: "轮巡列表", // 为了刷新组件不得不。。。保留解决方案（刷新这个对象来激活渲染）
      // 轮巡组结束计时器
      overPlayTimeOut: "",
      // 切换下一组视频计时器
      changePlayTime: "",
      changeTime: "", // 持续的计时器结束时间戳
      // 分屏页数
      needPage: 1,
      nowPage: 0, // 现在页数
      // 正在播放第几组
      nowPlayList: 0,
      // 继续播放的数据
      continueData: ""
      // 假数据。。。。。。。
      // videosS:
      // {
      //     "code": 0,
      //     "data": {
      //         "id": "0DF2247983924D35BF0D98EAC3A1850B",
      //         "name": "下雨了",
      //         "number": "LX1541321555581",
      //         "startTime": 1541260800000,
      //         "endTime": 1542080740000,
      //         "intervalTime": 1,
      //         "type": 1,
      //         "showNumber": 1,
      //         "status": 2,
      //         "createdBy": "Developer1",
      //         "createdTime": 1541321555581,
      //         "updatedBy": "FAA1247A04B143E2A266F08CBFF5023D",
      //         "updatedTime": 1541467348366,
      //         "equipmentIds": null,
      //         "turnsInspectionEquipmentViewList": [
      //             {
      //                 equipmentName: "设备1",
      //                 equipmentNumber: "10001",
      //                 rtspAddr: "rtmp://58.200.131.2:1935/livetv/hunantv"
      //             },
      //             {
      //                 equipmentName: "设备2",
      //                 equipmentNumber: "10002",
      //                 rtspAddr: "rtmp://media3.sinovision.net:1935/live/livestream"
      //             }
      //         ],
      //         "turnsInspectionRelationshipViewList": []
      //     }
      // },
      // videosM:
      // {
      //     "code": 0,
      //     "data": {
      //         "id": "D79C93DF395C44FEB51C656C3444A138",
      //         "name": "组间测试",
      //         "number": null,
      //         "startTime": 1540915200000,
      //         "endTime": 1542080740000,
      //         "intervalTime": null,
      //         "type": 2,
      //         "showNumber": null,
      //         "status": 2,
      //         "createdBy": "Developer1",
      //         "createdTime": 1540802825595,
      //         "updatedBy": "FAA1247A04B143E2A266F08CBFF5023D",
      //         "updatedTime": 1541061506211,
      //         "equipmentIds": null,
      //         "turnsInspectionEquipmentViewList": null,
      //         "turnsInspectionRelationshipViewList": [
      //             {
      //                 createdTime: 1540802558273,
      //                 endTime: 1538668800000,
      //                 intervalTime: 0.5,
      //                 showNumber: 3,
      //                 name: "单2",
      //                 number: "LX1540802558273",
      //                 turnsInspectionEquipmentViewList: [
      //                     {
      //                         equipmentName: "设备2",
      //                         equipmentNumber: "10002",
      //                         rtspAddr: "rtmp://media3.sinovision.net:1935/live/livestream"
      //                     }
      //                 ],
      //                 turnsInspectionRelationshipViewList: null,
      //                 type: 1,
      //                 updatedBy: null,
      //                 updatedTime: null
      //             },
      //             {
      //                 "id": "0DF2247983924D35BF0D98EAC3A1850B",
      //                 "name": "下雨了",
      //                 "number": "LX1541321555581",
      //                 "startTime": 1541260800000,
      //                 "endTime": 1543507200000,
      //                 "intervalTime": 0.5,
      //                 "type": 1,
      //                 "showNumber": 4,
      //                 "status": 2,
      //                 "createdBy": "Developer1",
      //                 "createdTime": 1541321555581,
      //                 "updatedBy": "FAA1247A04B143E2A266F08CBFF5023D",
      //                 "updatedTime": 1541467348366,
      //                 "equipmentIds": null,
      //                 "turnsInspectionEquipmentViewList": [
      //                     {
      //                         equipmentName: "湖南卫视",
      //                         equipmentNumber: "10001",
      //                         rtspAddr: "rtmp://58.200.131.2:1935/livetv/hunantv"
      //                     },
      //                     {
      //                         equipmentName: "美国中文电视",
      //                         equipmentNumber: "10002",
      //                         rtspAddr: "rtmp://media3.sinovision.net:1935/live/livestream"
      //                     },
      //                     {
      //                         equipmentName: "韩国朝鲜日报",
      //                         equipmentNumber: "10003",
      //                         rtspAddr: "rtmp://live.chosun.gscdn.com/live/tvchosun1.stream"
      //                     },
      //                     {
      //                         equipmentName: "韩国goodTV",
      //                         equipmentNumber: "10004",
      //                         rtspAddr: "rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp"
      //                     },
      //                     {
      //                         equipmentName: "香港财经",
      //                         equipmentNumber: "10005",
      //                         rtspAddr: "rtmp://202.69.69.180:443/webcast/bshdlive-pc"
      //                     }
      //                 ],
      //                 "turnsInspectionRelationshipViewList": []
      //             }
      //         ]
      //     }
      // }
    };
  },
  computed: {
    /* "renderVideos": function() {
            return this.renderVideo;
        } */
  },
  methods: {
    // 截图
    async screenShot() {
      let _this = this;
      for (let i = 0; i < this.videoBox.length; i++) {
        let shotC = _this.$refs.screenShot;
        shotC.height = await shotC.height;
        /* let videoDomIndex;
                _this.$refs[v.id][0].children[0].children[0].children.find((t, key) => {
                    if (t.tagName === "VIDEO") {
                        videoDomIndex = key;
                    }
                }); */
        // console.log(shotC)
        // console.log(_this.$videojs(`#${v.id}`).width())
        let ctx = await shotC.getContext("2d");
        await ctx.drawImage(
          _this.$refs[this.videoBox[i].id][0].children[0].children[0]
            .children[0],
          0,
          0,
          _this.$videojs(`#${this.videoBox[i].id}`).videoWidth(),
          _this.$videojs(`#${this.videoBox[i].id}`).videoHeight(),
          0,
          0,
          800,
          450
        );
        await _this.$nextTick(() => {
          let time = _this.$tools.nowTime();
          html2canvas(shotC, { scale: 2, logging: false, useCORS: true }).then(
            canvas => {
              // console.log(canvas)
              canvas.toBlob(blob => {
                saveAs(blob, `screenshot_${time}.png`);
                // 服务端传截图接口
                // let screenshot = new File([blob], `screenshot_${new Date().getTime()}.png`);
                // let screenshotObj = new FormData();
                // screenshotObj.append("screenshot", screenshot);
                // let axiosConf = {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //         "Accept": "*/*"
                //     }
                // };
                // baseAxios.post("wit_harns_service/file/picture/screenshot", screenshotObj, axiosConf).then((res) => {
                //     console.log(res.data);
                //     if (res.data.code === 0) {
                //         console.log(res.data.msg);
                //         window.location.href = `http://${this.GLOBAL.thisIp}/temp_screenshot_repertory/${res.data.msg}`;
                //     } else {
                //         let mess = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
                //         this.$showSimpleMessage(mess, "error");
                //     }
                // }).catch((error) => {
                //     this.$showSimpleMessage(error, "error");
                // });
              });
            }
          );
        });
      }
      // this.videoBox.forEach(async(v) => {
      //     let shotC = _this.$refs.screenShot;
      //     shotC.height = shotC.height;
      //     /* let videoDomIndex;
      //     _this.$refs[v.id][0].children[0].children[0].children.find((t, key) => {
      //         if (t.tagName === "VIDEO") {
      //             videoDomIndex = key;
      //         }
      //     }); */
      //     console.log(shotC)
      //     // console.log(_this.$videojs(`#${v.id}`).width())
      //     let ctx = shotC.getContext("2d");
      //     ctx.drawImage(_this.$refs[v.id][0].children[0].children[0].children[0], 0, 0, _this.$videojs(`#${v.id}`).videoWidth(), _this.$videojs(`#${v.id}`).videoHeight(), 0, 0, 800, 450);
      //     await _this.$nextTick(() => {
      //         let time = _this.$tools.nowTime();
      //         html2canvas(shotC, { allowTaint: true, scale: 2, logging: false, useCORS: true }).then((canvas) => {
      //             console.log(canvas)
      //             canvas.toBlob((blob) => {
      //                 saveAs(blob, `screenshot_${time}.png`);
      //             });
      //         });
      //     });
      // });
      /* this.videoBox.forEach((v) => {
                console.log(_this.$refs[v.id][0].children[0].children[0].children[0].tagName)
            }); */
    },
    // 获取数据
    getData() {
      let _this = this;
      return new Promise(function(resolve, reject) {
        axios
          .get("turnsInspection/cloud/")
          .then(res => {
            if (res.data.code === 0) {
              _this.data = {};
              // this.data = res.data.data;
              resolve(res.data.data);
              /* return new Promise((reslove, reject) => {
                            resolve(res.data.data);
                        }); */
              // return Promise.resolve(res.data.data);
            } else {
              let codeName = _this.$store.state.codeStatus.find(
                t => t.code === res.data.code
              ).name;
              _this.$showSimpleMessage(codeName, "error");
            }
          })
          .catch(error => {
            _this.$showSimpleMessage(error, "error");
          });
      });
      // this.data = this.videosM.data;
      // return Promise.resolve();
    },
    // 不得已只能使用其他组件来重新激活vue渲染
    /* reRender() {
            this.playText = "";
            this.playText = "播放列表";
        }, */
    // 切换功能
    operation(data) {
      this.$emit("changePage", data.title);
    },
    // 调节轮巡模式屏幕比例
    Proportion(val) {
      var video = document.getElementsByTagName("video");
      if (val == 0) {
        for (let i in video) {
          video[i].style.objectFit = "cover";
        }
      } else {
        for (let i in video) {
          video[i].style = "";
        }
      }
    },
    // 关闭窗口事件
    videoClose(id) {
      this.$videojs(`#${id}`).dispose();
      // this.$set(this.windowsBox);
      // this.$refs[id][0].innerHTML = `<video id="${id}" width="300" height="200" class="video-js"></video>` + this.$refs[id][0].innerHTML;
      // this.$videojs(`#${id}`).dispose();
      // 修改播放实例组
      let videoBoxKey = "";
      this.videoBox.forEach((i, key) => {
        if (i.id === id) {
          videoBoxKey = key;
        }
      });
      this.videoBox.splice(videoBoxKey, 1);
      this.$nextTick(() => {
        this.$set(this.renderVideo, id, false);
        this.renderPlayList();
      });
    },
    // 渲染窗口准备
    renderWin() {
      this.renderVideo = {};
      this.windowsBox = [];
      for (let i = 0; i < this.winSize; i++) {
        this.renderVideo[`video${i}`] = false;
      }
      for (let i = 0; i < this.winSize; i++) {
        this.windowsBox.push({ id: `video${i}` });
      }
    },
    // 渲染播放列表 ！！****用这个触发vue渲染
    renderPlayList(Arry) {
        // if(Arry){
        //     this.playList = this.$tools.arrUnique(this.PageNum, "equipmentNumber");
        // }else{

            this.playList = this.$tools.arrUnique(this.videoBox, "equipmentNumber");
        // }
    },
    // 渲染视频
    playVideo(data, id, nullWin,Arry) {
      // 向后台请求转码
          this.videoBox.push({ ...data, id: id });
            this.showArr.push(data.equipmentNumber)
              // 添加到播放实例组
      // axios.get(`/equipment/rtsp2rtmp/${data.equipmentId}`).then((res) => {
      // if (res.data.code === 0) {
      // setTimeout(() => {
          console.log(data.rtspAddr);
          console.log(this.GLOBAL.serviceIp);
      if (nullWin) {

        // 判断是否为空窗
        this.$videojs(`#${id}`, {
          controls: false,
          loop:true,
          height: this.$refs[id][0].offsetHeight - 1.5,
          width: this.$refs[id][0].offsetWidth - 1.5,
          /* flash: {
                                    hls: {
                                        withCredentials: false
                                    },
                                    swf: "../../../assets/video-js.swf"
                                }, */
          html5: {
            hls: {
              withCredentials: true
            }
          },
          autoplay: true,
          preload: "auto",
          sources: [
            {
                src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${data.rtspAddr}`,
                            //   type: "application/x-mpegURL",
                type: "video/mp4",
                withCredentials: true
            }
          ]
        });
        
      } else {
        let video = this.$videojs(`#${id}`);
        video.loop = true,
        video.src({ 
        src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${data.rtspAddr}`,
                            //   type: "application/x-mpegURL",
        type: "video/mp4",
        withCredentials: true });
        video.load();
        video.play();
        // 修改播放实例组
        let videoBoxKey = this.videoBox.forEach((i, key) => {
          if (i.id === id) {
            return key;
          }
        });
        // this.videoBox.splice(videoBoxKey, 1, { ...data, id: id });
      }
    //   if(Arry.length == 3){
        this.renderPlayList(Arry);
    //   }
      // }, 6000);
      // }
      // }).catch((error) => {
      //     this.$showSimpleMessage(error, "error");
      // });
    },
    // 初始化页面
    starPage() {
      if (this.data.length !== 0) {
        let nowTime = new Date().getTime(); // 现在时间戳
        let stopTime = this.data.endTime - nowTime;
        stopTime = stopTime > 86400000 ? 86400000 : stopTime; // 是否超过24小时限制到24小时
        this.overPlayTimeOut = setTimeout(() => {
          // 轮巡组结束事件计时器
          this.$showSimpleMessage("此组轮巡结束", "error");
          // 清除所有视频实例
          let _this = this;
          this.videoBox.forEach(v => {
            _this.$videojs(`#${v.id}`).dispose();
          });
          // 清除计时器和数据
          clearTimeout(this.changePlayTime);
          this.nowPlayList = 0;
        //   this.videoBox = [];
          // 重新获取新轮巡组
          this.$nextTick(() => {
            this.getData().then(val => {
              this.data = val;
              this.starPage();
            });
          });
        }, stopTime);
        if (stopTime > 250) {
          // 太短不渲染了
          // 准备计算播放间隔
          // 先获取是否有在播放的轮巡视频
          if (
            this.$store.state.playingVideo &&
            this.$store.state.playingVideo.name === this.data.name &&
            this.$store.state.playingVideo.type === this.data.type &&
            this.$store.state.playingVideo.updatedTime === this.data.updatedTime
          ) {
            // 还是当前轮巡组
            this.continueData = this.$tools.deepCopy(
              this.$store.state.playingVideo
            ); // 先取出继续播放数据
            let continueData = this.$tools.deepCopy(this.continueData);
            this.$store.commit("updateVideoInfo", {}); // 清空存储的数据
            if (this.data.type === 1) {
              // 单
              this.renderPage(this.data, continueData);
            } else if (this.data.type === 2) {
              // 组间
              this.renderPage(
                this.data.turnsInspectionRelationshipViewList[
                  continueData.nowPlayList
                ],
                continueData
              );
              this.nowPlayList = continueData.nowPlayList;
            }
          } else {
            // 第一次页面打开
            if (this.data.type === 1) {
              // 单
              this.renderPage(this.data);
            } else if (this.data.type === 2) {
              // 组间
              // this.data.turnsInspectionRelationshipViewList.intervalTime * 60 * 1000
              this.renderPage(this.data.turnsInspectionRelationshipViewList[0]);
            }
          }
        }
      }
      return Promise.resolve();
    },
    renderPage(videoData, continueData) {
      // 判断分屏
      if (
        videoData.turnsInspectionEquipmentViewList.length /
          videoData.showNumber <=
        1
      ) {
        // 确定是否翻页播放
        this.needPage = 1;
      } else {

        // 确定是否翻页播放
        let aaa = videoData.turnsInspectionEquipmentViewList.length % videoData.showNumber
          ? (this.needPage =
              Number(
                (
                  videoData.turnsInspectionEquipmentViewList.length /
                  videoData.showNumber
                )
                  .toFixed(1)
                  .split(".")[0]
              ) + 1)
          : (this.needPage = (
              videoData.turnsInspectionEquipmentViewList.length /
              videoData.showNumber
            ).toFixed(0));
      }
      this.nowPage = continueData ? continueData.nowPage : this.needPage; // 初始化正在播放的页面数
      // 开始准备渲染窗口框
      this.winSize = 0;
      this.winSize = videoData.showNumber;
      this.$nextTick(() => {
        for(let i in this.videoBox.length){
          
          let Id = `video${i}`;
          let videoBoxKey = "";
          this.$videojs(`#${id}`).dispose();
          this.videoBox.forEach((i, key) => {
            if (i.id === id) {
              videoBoxKey = key;
            }
          });
          this.videoBox.splice(videoBoxKey, 1);
        }
        let renderLength = 0;
        if (this.needPage === 1) {
          renderLength = videoData.turnsInspectionEquipmentViewList.length;
        } else {
          renderLength = videoData.showNumber;
        }
        let continueNum = continueData ? continueData.continueNum : ""; // 继续从哪个设备视频开始渲染
        let rlength = continueData ? continueData.renderLength : renderLength;
        this.data.turnsInspectionEquipmentViewList.map(res=>{
            res.isPlay = 0;
        })
        for (let i = 0; i < rlength; i++) {
          // 开始找窗口进行video标签渲染
          let winId = `video${i}`;
          if (winId) {
            this.$refs[
              winId
            ][0].children[0].innerHTML = `<video id="${winId}" width="300" height="200" class="video-js" style="background-color : transparent;"></video>`;
            this.$set(this.renderVideo, winId, true);
            this.$nextTick(() => {
              if (!continueData) {
                this.playVideo(
                  videoData.turnsInspectionEquipmentViewList[i],
                  winId,
                  true
                );
              } else {
                this.playVideo(
                  videoData.turnsInspectionEquipmentViewList[continueNum + i],
                  winId,
                  true
                );
              }
            });
          }
        }
        this.$nextTick(() => {
          // 判断是否继续播
          if (continueData) {
            // 换页计时器
            this.changePlayTime = setTimeout(() => {
              this.nowPage -= 1;
            }, continueData.continueTime);
            this.changeTime = new Date().getTime() + continueData.continueTime;
          } else {
            // 换页计时器
            this.changePlayTime = setTimeout(() => {
              this.nowPage -= 1;
            }, videoData.intervalTime * 10 * 1000);
            this.changeTime =
              new Date().getTime() + videoData.intervalTime * 10 * 1000;
          }
        });
      });
    },
    // 切换播放页
    changePage(videoData) {
      // 判断是要渲染多少
      let _this = this;
      
      _this.aaaaaaa++;
      let aaa= _this.aaaaaaa;
      let Arry = [];
      
      let reshowLength =
        this.nowPage === 1
          ? videoData.turnsInspectionEquipmentViewList.length -
            (this.needPage - 1) * videoData.showNumber
          : videoData.showNumber;
      let reshowStart =
        (aaa - 1) * videoData.showNumber; // 从第几个key开始渲染
        // this.nowPage === 1
        //   ? videoData.turnsInspectionEquipmentViewList.length - reshowLength
        //   : (this.needPage - this.nowPage) * videoData.showNumber; // 从第几个key开始渲染
        // this.videoBox = [];
        this.data.turnsInspectionEquipmentViewList.map(res=>{
            res.isPlay=0
        })
        this.dispose = reshowLength;
      for (let r = 0; r < reshowLength; r++) {
        let id = `video${r}`;
        this.$nextTick(() => {
          let aaa =  videoData.turnsInspectionEquipmentViewList[reshowStart + r]
          Arry.push(aaa)
          this.playVideo(
           aaa,
            id,
            false,
            Arry
          );
        });
      }
      if (reshowLength < videoData.showNumber) {

        // 把不需要的去掉
        for (let v = videoData.showNumber - 1; v >= reshowLength; v--) {
          let id = `video${v}`;
          this.$videojs(`#${id}`).dispose();
          let videoBoxKey = "";
          this.videoBox.forEach((i, key) => {
            if (i.id === id) {
              videoBoxKey = key;
            }
          });
          this.videoBox.splice(videoBoxKey, 1);
          this.$nextTick(() => {
            this.$set(this.renderVideo, id, false);
            this.renderPlayList();
          });
        }
      }
    }
  },
  watch: {
    // "videoBox": {
    //   handler: function(val, old) {
    //       
    //     this.showArr = [];
    //     if (val.length !== 0) {
    //       val.forEach(v => {
    //         this.showArr.push(v.equipmentId);
    //       });
    //     }
    //   },
    //   deep: true
    // },
    /* "changePlayTime": {
            handler: function(val, old) {
                console.log(val)
            },
            deep: true
        },
        "changeTime": {
            handler: function(val, old) {
                console.log(this.changeTime)
            },
            deep: true
        }, */
    // 监听换页换组
    nowPage: {
      handler: function(val, old) {
        
        if (this.continueData) {
          this.continueData = "";
        } else if (val !== this.needPage && val !== this.continueData.nowPage) {
          if (val === 0) {
            //  重置轮巡次数
            this.aaaaaaa = 1;
            // 所有翻页完成
            this.showArr = [];
            this.$showSimpleMessage("此单组完成", "success");
            // let aa= Object.prototype.toString.call(this.data.turnsInspectionRelationshipViewList)
            // console.log(this.data)
            // console.log(aa)
            // if(this.data.turnsInspectionRelationshipViewList.length>1){
              
                                         
              // let length = this.data.showNumber;
              // for (let v = 0; v <= length; v++) {
              //   let id = "video"+v;
              //   this.$videojs(`#${id}`).dispose();
              // }
            // }else{
              this.$nextTick(() => {
                // 开始重新渲染下一单组的页面
                if (this.data.type === 1) {
                this.starPage()    
               let length = this.videoBox.length;
              for (let v = 0; v <= length; v++) {
                let id = "video"+v;
                this.$videojs(`#${id}`).dispose();
              }  
              this.videoBox = []            
                  // this.renderPage(this.data);
                } else if (this.data.type === 2) {
                  this.nowPlayList =
                    this.nowPlayList + 1 ===
                    this.data.turnsInspectionRelationshipViewList.length
                      ? 0
                      : this.nowPlayList + 1;
                for (let v = 0; v <  this.dispose; v++) {
                  let id = "video"+v;
                  this.$videojs(`#${id}`).dispose();
                }  
                  this.renderPage(
                    this.data.turnsInspectionRelationshipViewList[
                      this.nowPlayList
                    ]
                  );
                }
              // let length = this.videoBox.length;
              // for (let v = 0; v <= length; v++) {
              //   let id = `video${v}`;
              //   this.$videojs(`#${id}`).dispose();
              // }     
              });
              // this.videoBox=[];
            // }
            // 先把所有实例先去掉

          
            
          } else {
              this.showArr =[];
            // 正常翻页
            this.changePage(
              this.data.type === 1
                ? this.data
                : this.data.turnsInspectionRelationshipViewList[
                    this.nowPlayList
                ]
            );
            this.$nextTick(() => {
              // 换页计时器
              let intervalTime =
                this.data.type === 1
                  ? this.data.intervalTime * 10 * 1000
                  : this.data.turnsInspectionRelationshipViewList[
                      this.nowPlayList
                    ].intervalTime *
                    10 *
                    1000;
              this.changePlayTime = setTimeout(() => {
                this.nowPage -= 1;
              }, intervalTime);
              this.changeTime = new Date().getTime() + intervalTime;
            });
          }
        }
      }
    },
    // 监听窗口数
    winSize: {
      handler: function(val, old) {
        // 插入窗口样式
        if (val) {
          switch (val) {
            case 1:
              this.$set(this.winStyle, "video0", {
                float: "left",
                height: "calc(100% - 2px)",
                width: "calc(100% - 2px)",
                border: "1px solid rgba(23, 58, 96, 1)"
              });
              break;
            case 3:
              this.$set(this.winStyle, "video0", {
                float: "left",
                height: "calc(65% - 2px)",
                width: "calc(100% - 2px)",
                border: "1px solid rgba(23, 58, 96, 1)"
              });
              for (let i = 1; i < 3; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(35% - 2px)",
                  width: "calc(50% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 4:
              for (let i = 0; i < 4; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(50% - 2px)",
                  width: "calc(50% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 6:
              this.$set(this.winStyle, "video0", {
                float: "left",
                height: "calc(66.55% - 2px)",
                width: "calc(66.6% - 2px)",
                border: "1px solid rgba(23, 58, 96, 1)"
              });
              for (let i = 1; i < 6; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(33.3% - 2px)",
                  width: "calc(33.3% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 8:
              this.$set(this.winStyle, "video0", {
                float: "left",
                height: "calc(74.9% - 2px)",
                width: "calc(75% - 2px)",
                border: "1px solid rgba(23, 58, 96, 1)"
              });
              for (let i = 1; i < 8; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(25% - 2px)",
                  width: "calc(25% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 9:
              for (let i = 0; i < 9; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(33.3% - 2px)",
                  width: "calc(33.3% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 10:
              for (let i = 0; i < 8; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(25% - 2px)",
                  width: "calc(25% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              for (let i = 8; i < 10; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(50% - 2px)",
                  width: "calc(50% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 13:
              for (let i = 0; i < 2; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(40% - 2px)",
                  width: "calc(40% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              for (let i = 2; i < 4; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(20% - 2px)",
                  width: "calc(20% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              for (let i = 4; i < 6; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(39.9% - 2px)",
                  width: "calc(40% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              for (let i = 6; i < 13; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(20% - 2px)",
                  width: "calc(20% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 14:
              for (let i = 0; i < 8; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(33.3% - 2px)",
                  width: "calc(33.3% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              this.$set(this.winStyle, "video8", {
                float: "left",
                height: "calc(21.99% - 2px)",
                width: "calc(22.2% - 2px)",
                border: "1px solid rgba(23, 58, 96, 1)"
              });
              for (let i = 9; i < 14; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(11.1% - 2px)",
                  width: "calc(11.1% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 16:
              for (let i = 0; i < 16; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(25% - 2px)",
                  width: "calc(25% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 25:
              for (let i = 0; i < 25; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(20% - 2px)",
                  width: "calc(20% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 36:
              for (let i = 0; i < 36; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(16.66% - 2px)",
                  width: "calc(16.66% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 49:
              for (let i = 0; i < 49; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(14.28% - 2px)",
                  width: "calc(14.28% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
            case 64:
              for (let i = 0; i < 64; i++) {
                this.$set(this.winStyle, `video${i}`, {
                  float: "left",
                  height: "calc(12.5% - 2px)",
                  width: "calc(12.5% - 2px)",
                  border: "1px solid rgba(23, 58, 96, 1)"
                });
              }
              break;
          }
          this.renderWin(); // 准备渲染窗口
        }
      },
      immediate: true // 进入组件立即监听
    }
  },
  created() {},
  mounted() {
    // 获取轮巡数据
    this.getData().then(val => {
      this.data = val;
      this.starPage();
    });
  },
  beforeDestroy() {
    // 记录继续播放情况
    if (this.videoBox.length !== 0) {
      let data = {
        name: this.data.name,
        type: this.data.type,
        isPlay: 0,
        nowPage: this.nowPage,
        nowPlayList: this.nowPlayList,
        continueNum: (this.needPage - this.nowPage) * this.winSize,
        renderLength: this.videoBox.length,
        continueTime: this.changeTime - new Date().getTime(),
        updatedTime: this.data.updatedTime
      };
      this.$store.commit("updateVideoInfo", data);
    }
    // 消除所有videojs实例
    let _this = this;
    // axios.get("/equipment/closertsp2rtmp/").then((res) => {
    //     if (res.data.code !== 0) {
    //         let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
    //         this.$showSimpleMessage(codeName, "error");
    //     }
    // }).catch((error) => {
    //     this.$showSimpleMessage(error, "error");
    // });
    this.videoBox.forEach(v => {
      _this.$videojs(`#${v.id}`).dispose();
    });
    // 清除所有计时器
    clearTimeout(this.overPlayTimeOut);
    clearTimeout(this.changePlayTime);
  }
};
</script>

<style>
</style>

<style scoped>
.playingImgContent {
  height: auto;
  display: flex;
  align-items: center;
}
.playingImg {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 25px;
  background: url(../../../assets/playing.png) no-repeat 0;
  background-size: 100%;
  right: 0px;
}
.videoBar {
  width: 300px;
  height: 100%;
  background-color: #021632;
  /* border: 1px solid red; */
}
.videoBarContent {
  width: 100%;
  /* border: 1px solid yellow; */
}
.videoWindow {
  width: calc(100% - 300px);
  height: 100%;
  /* border: 1px solid red; */
}
.videoShow {
  height: 95%;
  /* border: 1px solid red; */
}
.videoShowControl {
  height: 5%;
  display: flex;
  padding: 8px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  /* border: 1px solid red; */
}
.controlSelect {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.controlSelect div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.controlSelect div span {
  width: 90px;
}
.controlSelect /deep/ .el-select {
  width: 120px;
}
.controlRight {
  width: 120px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.controlRight /deep/ .el-button--primary.is-plain {
  width: 100px;
}
.eqList {
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100% - 7px);
  font-size: 14px !important;
  border-bottom: 2px solid #007cf8;
  width: 100%;
}
.eqList::-webkit-scrollbar {
  display: none;
}
.listTitle {
  color: #00b9d7;
  border-bottom: 2px solid #007cf8;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  padding: 10px 0;
}
.closeBt {
  position: relative;
}
.videoShowBg {
  background: url(../../../assets/video_bg.png) no-repeat 0;
  background-size: 100%;
}
.shotContain {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.shotButton {
  width: 45px;
  height: 45px;
  background: url(../../../assets/shotBt.png) no-repeat 0;
  background-size: 100%;
  cursor: pointer;
  margin-top: 40px;
}
</style>
