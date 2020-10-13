/**
 * name: 全局工具方法
 * author: howard.wanghao
 * time: 2018/9/4
 */
export default {
    // 判断空数组(为空返回true)
    emptyArray(arr) {
        return arr.every((item, index) => {
            return !item || item === undefined || item === "";
        });
    },
    // 乘法
    accMul(arg1, arg2) {
        let m = 0;
        let s1 = arg1.toString();
        let s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return (
            (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
            Math.pow(10, m)
        );
    },
    /*
     * 冒泡排序
     * 请使用 arr = [{label: "", ...}, {label: "", ...}] 数组对象模型传入（也可以排正常数组）
     * arr传入数组 label传入想排序的对象中要比对属性的 "属性名" 如 bubbleSort(array, "name");
     * type: normal 从小到大 inverted 从大到小
     */
    bubbleSort(arr, label, type) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (label) {
                    if (Number(arr[j][label]) > Number(arr[j + 1][label])) {
                        let temp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = temp;
                    }
                } else {
                    if (Number(arr[j]) > Number(arr[j + 1])) {
                        let temp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }
        if (type === "inverted") {
            let array = [];
            for (let i = arr.length - 1; i >= 0; i--) {
                array.push(arr[i]);
            }
            return array;
        } else {
            return arr;
        }
    },
    /*
     * 数组深复制
     */
    deepCopy(arr) {
        // 只拷贝对象
        if (typeof arr !== "object") return;
        // 根据arr的类型判断是新建一个数组还是一个对象
        let newObj = arr instanceof Array ? [] : {};
        for (let key in arr) {
            // 遍历arr,并且判断是arr的属性才拷贝
            if (arr.hasOwnProperty(key)) {
                // 判断属性值的类型，如果是对象递归调用深拷贝
                newObj[key] =
                    typeof arr[key] === "object" ? this.deepCopy(arr[key]) : arr[key];
            }
        }
        return newObj;
    },
    /*
     * 数组去重
     */
    arrUnique(arr, label) {
        // let newArr = Array.from(new Set(arr));
        let newArr = [];
        if (label) {
            let a = new Set();
            let labelData = [];
            arr.forEach(i => {
                labelData.push(i[label]);
            });
            let size = 0;
            arr.forEach((i, key) => {
                a.add(labelData[key]);
                if (a.size > size) {
                    newArr.push(i);
                    size++;
                }
            });
        } else {
            newArr = Array.from(new Set(arr));
        }
        return newArr;
    },
    /*
     * 阿拉伯数字转中文数字方法
     */
    sectionToChinese(section) {
        let chnNumChar = [
            "零",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九"
        ];
        // let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        let chnUnitChar = ["", "十", "百", "千"];
        let strIns = "";
        let chnStr = "";
        let unitPos = 0;
        let zero = true;
        while (section > 0) {
            let v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    },
    /**
     * 将时间戳转化成数据的年月日时分秒的时间戳
     */
    setTimeUse(date) {
        // let time = new Date();
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let hours = time.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        let minute = time.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        let second = time.getSeconds();
        second = second < 10 ? "0" + second : second;
        let timeUse = yy + "" + month + "" + day + "" + hours + "" + minute + "" + second;
        return timeUse;
    },
      // 转化年月日
      setTimeUser(date) {
        // let time = new Date();
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let timeUse = yy + "" + month + "" + day;
        return timeUse;
    },
    /**
     * 将时间戳转成3分钟一个区间(数据胡需要的)
     */
    getTimeInt(date) {
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let hours = time.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        let minute = time.getMinutes();
        minute = Math.floor(minute / 3) * 3;
        minute = minute < 10 ? "0" + minute : minute;
        let timeUse = yy + "" + month + "" + day + "" + hours + "" + minute + "00";
        return timeUse;
    },
    /**
     * 将时间戳转成整点(数据胡需要的整点传参)
     */
    getTimeHour(date) {
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let hours = time.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        let timeUse = yy + "" + month + "" + day + "" + hours + "0000";
        return timeUse;
    },
    /**
     * 将时间戳转成23点
     */
    getTwoThree(date) {
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let timeUse = yy + "" + month + "" + day + "" + "23" + "0000";
        return timeUse;
    },
    /**
     * 转换成数据的精确到日期
     */
    getDays(date) {
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let timeUse = yy + "" + month + "" + day;
        return timeUse;
    },
    /**
     * 保存地图用的时间 2018-11-19 18：16：36
     */
    nowTime(date) {
        // let time = new Date();
        let time = date || new Date();
        let yy = time.getFullYear();
        let month = time.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = time.getDate();
        day = day < 10 ? "0" + day : day;
        let hours = time.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        let minute = time.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        let second = time.getSeconds();
        second = second < 10 ? "0" + second : second;
        let timeUse = yy + "-" + month + "-" + day + " " + hours + "时" + minute + "分" + second + "秒";
        return timeUse;
    },
    /**
     * 排名，根据rangk
     */
    rank(data) {
        let result = [];
        data.map((val, index) => {
            result.push(data.find(t => t.rank === index));
        });
        return result;
    }
};
