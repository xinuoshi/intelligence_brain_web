<template>
  <div
    ref="aaaa"
    style="display: flex;flex-direction: row;flex-wrap: nowrap;width: 100%;height: 100%;border: 1px solid rgba(23, 58, 96, 1);"
  >
    <div class="videoBar">
      <div class="videoBarContent topInput" style="height: 5%">
        <el-input v-model="videoSearch" size="small" placeholder="请输入内容" clearable>
          <el-button
            slot="append"
            class="searchBtn"
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="searchEq"
          ></el-button>
        </el-input>
      </div>
      <div class="videoBarContent" style="height: 45%">
        <div class="listTitle">设备列表</div>
        <div class="eqList">
          <div
            class="eqListVideo"
            v-for="(item, index) in equipments"
            :key="index"
            @click="eqClick(item)"
            @dblclick="eqDbClick(item)"
            style="border-bottom: 1px solid #215c86; width: calc(100% - 20px); height: auto; min-height: 25px; padding: 10px 10px; text-align:left;"
            :style="{color: showArr.indexOf(item.equipmentName) !== -1 ? '#00d664' : '#00b9d7'}"
            draggable="true"
            @dragstart="drag($event, item)"
          >{{item.equipmentName}}</div>
        </div>
      </div>
      <div class="videoBarContent" style="height: 46%">
        <div class="listTitle">{{playText}}</div>
        <div class="eqList">
          <div
            v-for="(item, index) in playList"
            :key="index"
            style="border-bottom: 1px solid #215c86; width: calc(100% - 20px);height: auto;min-height: 25px; padding: 10px 10px; color: #00b9d7; display: flex; text-align:left;"
            draggable="true"
            @dragstart="drag($event, item)"
          >
            <div style="width: 92%;">{{item.equipmentName}}</div>
            <div class="playingImgContent">
              <div class="playingImg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="videoBarContent shotContain" style="height: 9%">
        <div @click="screenShot()" class="shotButton"></div>
        <!-- <span>视频列表</span>
                <div class="eqList">
                    <div v-for="(item, index) in videoList" :key="index" @dblclick="eqDbClick(item)" style="background-color: white;width: 100%;height: auto;min-height: 50px; border: 1px solid #000;" draggable="true" @dragstart="drag($event, item)">
                        {{item.name}}
                        <span class="playing"></span>
                    </div>
        </div>-->
      </div>
    </div>
    <div class="videoWindow">
      <div class="videoShow">
        <div
          class="videoShowBg"
          v-for="(item, index) in windowsBox"
          :key="index"
          :style="winStyle[item.id]"
          :ref="item.id"
          @dragover="allowDrop"
          @drop="drop($event, item.id)"
          @mouseenter="intoVideo(item.id)"
          @mouseleave="outVideo(item.id)"
        >
          <!-- <video v-if="renderVideo[item.id]"
                        :id="item.id"
                        width="100"
                        height="100"
                        class="video-js">
          </video>-->
          <div></div>
          <!-- <el-button
            v-show="renderVideo[item.id] && showCloseButton[item.id]"
            class="closeBt"
            :style="closeButton[item.id]"
            @click="videoClose(item.id)"
            type="danger"
            icon="el-icon-close"
            size="mini"
            circle
          ></el-button>-->
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
          <div>
            <span>窗口数：</span>
            <el-select v-model="winSize" placeholder="请选择...">
              <el-option
                v-for="(item, index) in videoWinSize"
                :key="index"
                :label="item.size"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="controlRight">
          <!-- <el-pagination class="cli-pagination" background @current-change="currentPage" :current-page="pageNum" :page-size="pageSize" layout="prev, pager, next, jumper" :total="allPageValue"></el-pagination> -->
          <bt ref="bt" :buttonList="buttonList" @operation="operation"></bt>
        </div>
      </div>
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
      // 播放直播
      video: "",
      // 视频搜索
      videoSearch: "",
      // 窗口尺寸
      winScale: "1",
      // 清晰度
      winRate: "1",
      // 储存video标签id
      VideoId: [],
      // 窗口数
      winSize: 1,
      noReWin: false, // 页面窗是否重新渲染
      /* // 窗口分页页数
            pageNum: 1,
            // 窗口分页每页数
            pageSize: 16,
            // 窗口分页总页数
            allPageValue: 0, */
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
          title: "轮巡模式",
          plain: true,
          size: "mini",
          type: "primary",
          loading: false,
          class: "AIbtn"
        }
      ],
      // 设备列表
      equipments: [],
      // 播放列表
      playList: [],
      // 视频列表
      videoList: [],
      // 单击延时器
      clickTime: "",
      // 视频实例组
      videoBox: [],
      showArr: [],
      // 窗口组
      windowsBox: [],
      // 拖动的数据
      dragData: {},
      // 是否渲染视频
      renderVideo: {},
      playText: "播放列表", // 为了刷新组件不得不。。。保留解决方案（刷新这个对象来激活渲染）
      // 窗口关闭按钮
      closeButton: {},
      showCloseButton: {},
      // 假数据。。。。。。。
      videos: [
        {
          equipmentName: "设备1",
          equipmentNumber: "10001",
          rtspAddr: "http://192.168.1.223/video.mp4",
          video: [
            // { name: "视频1-1", rtspAddr: "http://vjs.zencdn.net/v/oceans.mp4" }
            { name: "视频1-1", rtspAddr: "F://rongfeng/11.avi" }
          ]
        },
        {
          equipmentName: "设备2",
          equipmentNumber: "10002",
          rtspAddr: "rtmp://media3.sinovision.net:1935/live/livestream",
          video: [
            { name: "视频2-1", rtspAddr: "http://47.105.212.6:80/video.mp4" }
          ]
        }
      ]
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
    // 拖动
    drag(e, data) {
      this.dragData = data;
    },
    // 允许拖进
    allowDrop(e) {
      e.preventDefault();
    },
    // 拖进
    drop(e, id) {
      

      let nullWin = false; // 是否是空窗口
      if (!this.renderVideo[id]) {
        this.$refs[
          id
        ][0].children[0].innerHTML = `<video id="${id}" width="300" height="200" class="video-js"></video>`;
        this.$set(this.renderVideo, id, true);
        nullWin = true;
      } else {
        
        this.$videojs(`#${id}`).dispose();
        this.$refs[
          id
        ][0].children[0].innerHTML = `<video id="${id}" width="300" height="200" class="video-js"></video>`;
      }
      // this.reRender();
      // this.renderPlayList();
      this.$nextTick(() => {
        this.playVideo(this.dragData, id, nullWin);
      });
    },
    // 鼠标移入视频区
    intoVideo(id) {
      this.$set(this.showCloseButton, id, true);
    },
    Proportion(val) {
      
      this.winScale = val
      var video = document.getElementsByTagName("video");
      if (val == 0) {
          for(var i = 0;i<winScale.length;i++){
              winScale[i].style.objectFit = "cover";
          }
      } else {
          for(var i = 0;i<winScale.length;i++){
              winScale[i].style.objectFit = "";
          }
      }
    },
    // 鼠标移出视频区  : fill;
    outVideo(id) {
      this.$set(this.showCloseButton, id, false);
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
    // 获取设备列表
    getEqData(search) {
      let url = search
        ? "equipment/?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1&equipmentName=" +
          search
        : "equipment/?equipmentTypes=000004-1,000004-2,000004-3,000004-4,000003-3&status=1";
      axios
        .get(url)
        .then(res => {
          if (res.data.code === 0) {
            let equipmentList = res.data.data;
            equipmentList.forEach(i => {
              i.equipmentId = i.id;
            });
            this.equipments = equipmentList;
          }
        })
        .catch(error => {
          this.$showSimpleMessage(error, "error");
        });
    },
    // 搜索设备
    searchEq() {
      this.getEqData(this.videoSearch);
    },
    // 单击事件
    eqClick(data) {
      clearTimeout(this.clickTime); // 首先清除计时器
      this.clickTime = setTimeout(() => {
        this.videoList = [];
        /* let video = this.$tools.deepCopy(data.video);
                video.forEach((i, key) => {
                    this.videoList.push({
                        equipmentName: data.equipmentName,
                        equipmentNumber: data.equipmentNumber,
                        ...i
                    });
                }); */
      }, 300); // 大概时间300ms
    },
    // 双击事件
    eqDbClick(data) {
      clearTimeout(this.clickTime); // 清除计时器
      // 先检测空窗
      let winId = "";
      for (let id in this.renderVideo) {
        if (!this.renderVideo[id]) {
          winId = id;
          break;
        }
      }
      if (winId) {
        this.$refs[
          winId
        ][0].children[0].innerHTML = `<video id="${winId}" width="300" height="200" class="video-js"></video>`;
        this.$set(this.renderVideo, winId, true);
        // let videoAddr = { "ip": "10.20.5.4", "port": "8080", "videoAddr": "/home/ubuntu/realtime2.0Temp/video/11.avi", "filename": "11.avi" }
        // let hahaha = {
        //     videoAddr: JSON.stringify(videoAddr),
        //     destination: "F:\\rongfeng"
        // };
        // sjhAxios.post("sjh5/realtime/VideoShow", hahaha).then((res) => {
        //     data.rtspAddr = res.data.video;
        //     this.$nextTick(() => {
        //         this.playVideo(data, winId, true);
        //     });
        // })
        this.$nextTick(() => {
          this.playVideo(data, winId, true);
        });
      } else {
        this.$showSimpleMessage("暂无空闲窗口", "error");
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
          // 找到对应实例组中的视频，向后台请求关闭转码
          // axios.get(`/equipment/closertsp2rtmp?id=${i.equipmentId}`).then((res) => {
          //     if (res.data.code !== 0) {
          //         let codeName = this.$store.state.codeStatus.find(t => t.code === res.data.code).name;
          //         this.$showSimpleMessage(codeName, "error");
          //     }
          // }).catch((error) => {
          //     this.$showSimpleMessage(error, "error");
          // });
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

      // this.renderClose(); // 准备渲染关闭视频按钮
      let videoShowBg = document.getElementsByClassName("video-js");
      if (videoShowBg.length !== 0) {
        //    videoShowBg.map(val => {
        for (let a = 0; a < videoShowBg.length; a++) {
          videoShowBg[a].style.display = "none";
        }
        //    });
      }
    },
    // 渲染关闭按钮
    // renderClose() {
    //   this.$nextTick(() => {
    //     this.windowsBox.forEach((w, key) => {
    //       this.$set(this.showCloseButton, w.id, false); // 先让所有关闭按钮状态为fasle
    //       let top = 0; // 向上移动
    //       let left = 0; // 向右移动
    //       top = -(this.$refs[w.id][0].offsetHeight - 30);
    //       left = this.$refs[w.id][0].offsetWidth / 2 - 30;
    //       this.$set(this.closeButton, w.id, {
    //         top: top + "px",
    //         left: left + "px"
    //       });
    //     });
    //   });
    // },
    // 切换窗口数
    // WindowNum(val) {
    //   // this.video.pause();
    //   // if (this.videoBox) {
    //   // this.videoBox.forEach(v => {
    //   //   this.$videojs(`#${v.id}`).dispose();
    //   // });
    //     // this.VideoId.map(res => {
    //     //   for(let i in this.VideoId){
    //     //   this.$videojs(`#${this.VideoId[i]}`).dispose();
    //     // // });
    //     //   this.VideoId.splice(i,1);
    //     //   }
    //   }
    //   // this.renderClose();
    // },
    // 渲染播放列表 ！！****用这个触发vue渲染
    renderPlayList() {
      
      this.playList = this.$tools.arrUnique(this.videoBox, "equipmentId");
    },
    // 渲染视频
    playVideo(data, id, nullWin) {
      let isThere =  this.VideoId.find(res=> res==id)
      
      if(!isThere){
        this.VideoId.push(id);
      }
      
      let video = "";
      let videoList = this.$tools.deepCopy(this.videoBox);
      let out = 0; // 停止执行
      videoList.find(v => {
        if (data.equipmentId === v.equipmentId) {
          out += 1;
        }
      });
      if (out) {
        
        this.$showSimpleMessage("已在播放中", "error");
        if (nullWin) {
          this.$refs[id][0].children[0].innerHTML = "";
          this.$set(this.renderVideo, id, false);
          this.renderPlayList();
        }
      // } else {
      }
        // 向后台请求转码
        // axios.get(`/equipment/rtsp2rtmp/${data.equipmentId}`).then((res) => {
        // if (res.data.code === 0) {
        // setTimeout(() => {
        
                  console.log(data.rtspAddr);
          console.log(this.GLOBAL.serviceIp);
        if (nullWin) {
          // 判断是否为空窗
          video = this.$videojs(`#${id}`, {
            controls: true,
            height: this.$refs[id][0].offsetHeight - 1.5,
            width: this.$refs[id][0].offsetWidth - 1.5,
            /* flash: {
                                        swf: "../../../assets/video-js.swf"
                                    }, */
            html5: {
              hls: {
                withCredentials: true
              }
            },
            loop:true,
            controlBar: {
              progressControl: false,
              remainingTimeDisplay: false
            },
            autoplay: true,
            preload: "auto",
            sources: [
              {
                src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${data.rtspAddr}`,
                // type: "application/x-mpegURL",
                type: "video/mp4",
                withCredentials: true
                // type: "rtmp/mp4"
              }
            ]
          });
          // 添加到播放实例组
          this.videoBox.push({ ...data, id: id });
          this.renderPlayList();
        } else {
          setTimeout(() => {
            video = this.$videojs(`#${id}`, {
              controls: false,
              // controls: true,
              loop:true,
              height: this.$refs[id][0].offsetHeight - 1.5,
              width: this.$refs[id][0].offsetWidth - 1.5,
              controlBar: {
                progressControl: false,
                remainingTimeDisplay: false
              },
              html5: {
                hls: {
                  withCredentials: true
                }
              },
              autoplay: true,
              preload: "auto",
              withCredentials: true,
              sources: [
                {
                src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${data.rtspAddr}`,
                  type: "video/mp4",
                }
              ]
            });
            this.video = video;
          }, 200);
          // 修改播放实例组
          let videoBoxKey = this.videoBox.forEach((i, key) => {
            if (i.id === id) {
              return key;
            }
          });
          this.videoBox.splice(videoBoxKey, 1, { ...data, id: id });
          this.renderPlayList();
        // }
        // }, 6000);
        // }
        // }).catch((error) => {
        //     this.$showSimpleMessage(error, "error");
        // });
      }
      var winScale = document.getElementsByTagName("video");
      if (this.winScale == 0) {
          for(var i = 0;i<winScale.length;i++){

              winScale[i].style.objectFit = "cover";
          }
      } else {
          for(var i = 0;i<winScale.length;i++){

              winScale[i].style.objectFit = "contain";
          }
      }
    }
  },
  watch: {
    videoBox: {
      handler: function(val, old) {
        // console.log(val)
        this.showArr = [];
        if (val.length !== 0) {
          val.forEach(v => {
            this.showArr.push(v.equipmentName);
          });
        }
      },
      deep: true
      // console.log(this.videoBox)
      // console.log(this.renderVideo)
    },
    // 监听窗口数
    winSize: {
      handler: function(val, old) {
        // 插入窗口样式
        
        this.videoBox = [];
        this.playList = [];
        if (val) {
          if (val < old || !old) {
            // 减少窗口数
            // if (this.videoBox.length > 0) {
            //     this.winSize = old;
            //     this.noReWin = true;
            //     this.$showSimpleMessage("播放中，不可减少窗口数", "error");
            // } else {
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
              if (this.VideoId.length > 0) {
                let _this = this;
                this.VideoId.forEach((v, key) => {
                  if(_this.$videojs(`#${v}`)){
                    _this.$videojs(`#${v}`).dispose();
                  }
                });
                this.VideoId = [];
              }
            this.renderWin(); // 准备渲染窗口
            
            // this.renderClose(); // 准备渲染关闭视频按钮
            // }
          } else if (val > old) {
            // 窗口增多
            
            if (this.noReWin) {
              this.noReWin = false;
            } else {
              if (this.VideoId.length > 0) {
                let _this = this;
                this.VideoId.forEach((v, key) => {
                  if(_this.$videojs(`#${v}`)){
                    _this.$videojs(`#${v}`).dispose();
                  }
                });
                this.VideoId = [];
              }
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

              this.$nextTick(() => {
                if (this.videoBox.length > 0) {
                  let _this = this;
                  this.videoBox.forEach((v, key) => {
                    // 向后台请求转码
                    
                    // axios.get(`/equipment/rtsp2rtmp/${v.equipmentId}`).then((res) => {
                    if (res.data.code === 0) {
                      // setTimeout(() => {
                      _this.$refs[
                        v.id
                      ][0].children[0].innerHTML = `<video id="${v.id}" width="300" height="200" class="video-js"></video>`;
                      _this.$set(this.renderVideo, v.id, true);
                      _this.$nextTick(() => {
                        let aa = _this.$videojs(`#${v.id}`, {
                          controls: true,
                          height: this.$refs[v.id][0].offsetHeight - 1.5,
                          width: this.$refs[v.id][0].offsetWidth - 1.5,
                          controlBar: {
                            progressControl: false,
                            remainingTimeDisplay: false
                          },
                          html5: {
                            hls: {
                              withCredentials: true
                            }
                          },
                          autoplay: true,
                          loop:true,
                          preload: "auto",
                          sources: [
                            {
                            src: `http://${this.GLOBAL.serviceIp}/wit_harns/mp4/${v.rtspAddr}`,
                            //   type: "application/x-mpegURL",
                              type: "video/mp4",
                              withCredentials: true
                            }
                          ]
                        });

                        document.body.appendChild(aa);
                      });
                      // }, 6000);
                    }
                    // }).catch((error) => {
                    //     this.$showSimpleMessage(error, "error");
                    // });
                  });
                }
              });
            }
          }
        }
      },
      immediate: true // 进入组件立即监听
    }
  },
  created() {
    this.getEqData();
    // this.equipments = this.videos; // 假数据
  },
  mounted() {},
  beforeDestroy() {
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
  }
};
</script>

<style>
/* 播放器设置 */
.video-js .vjs-big-play-button {
  font-size: 2em;
}
.video-js .vjs-control-bar {
  height: 2.4em;
}
.video-js .vjs-control {
  /* height: 50% !important; */
  width: 2em;
}
.video-js .vjs-volume-panel.vjs-volume-panel-horizontal:hover {
  width: 7em !important;
}
</style>

<style scoped>
.topInput /deep/ .el-input__inner {
  border: 1px solid #1b51a2;
}
.videoShowBg {
  /* position: absolute; */
  background: url(../../../assets/video_bg.png) no-repeat 0;
  background-size: 100%;
}
.videoBarContent /deep/ .el-input .el-input-group__append {
  background-color: #1b51a2 !important;
  border: 1px solid #1b51a2;
}
.playingImgContent {
  height: auto;
  display: flex;
  align-items: center;
}
.playingImg {
  display: inline-block;
  width: 18px;
  height: 18px;
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
  padding: 8px;
  display: flex;
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
.listTitle {
  color: #00b9d7;
  border-bottom: 1px solid #215c86;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  padding: 0 0 8px;
}
.eqList {
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 14px !important;
  border-bottom: 2px solid #007cf8;
  height: calc(100% - 40px);
  width: 100%;
}
.eqList::-webkit-scrollbar {
  display: none;
}
.eqListVideo:hover {
  color: #00d664 !important;
}
.playing {
  display: inline-block;
  height: 15px;
  width: 15px;
  /* background-color: green; */
  border-radius: 50%;
  border: 1px solid #000;
  position: relative;
  top: 10px;
}
.closeBt {
  position: relative;
  left: 47%;
  top: -7%;
  z-index: 1000;
}
.shotContain {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.fill {
  object-fit: fill;
}
.shotButton {
  width: 45px;
  height: 45px;
  /* background: url(../../../assets/shotBt.png) no-repeat 0; */
  background-size: 100%;
  cursor: pointer;
  margin-top: -5px;
}
</style>
