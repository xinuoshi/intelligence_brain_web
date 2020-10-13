/* eslint-disable */
/**
 * name: 全局过滤器（转化数据方法）
 * author: add
 * time: 2018/9/4
 */
export default {
    /**
     * 根据ID获取设备名称
     * @param that this
     * @param id 设备ID （需要转换为int类型）
     */
    getEquipmentName(that, id) {
        for (let j = 0; j < that.$store.state.configData.length; j++) {
            if (parseInt(that.$store.state.configData[j].id) === id) {
                return that.$store.state.configData[j].name;
            }
        }
    },
    /**
     * 根据名称获取设备ID
     * @param that this
     * @param name 设备名称
     */
    getEquipmentId(that, name) {
        for (let j = 0; j < that.$store.state.configData.length; j++) {
            if (that.$store.state.configData[j].name === name) {
                return that.$store.state.configData[j].id;
            }
        }
    },
    /**
     * 转义时间戳方法合集
     */
    timesFormat(stringTime) {
        return (new Date(stringTime)).getTime();
    },
    // eg:2018-07-01 转化到190几年到天
    formatDate(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        return y + "-" + m + "-" + d;
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
    // 2018-07-01 转化有月日汉字
    formatDateZH(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let m = date.getMonth() + 1;
        // m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        // d = d < 10 ? ('0' + d) : d;
        return m + "月" + d + "日";
    },
    // 时间戳转时间格式（用于组件）
    formatDateTime(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ("0" + minute) : minute;
        second = second < 10 ? ("0" + second) : second;
        return y + "-" + m + "-" + d + "   " + h + ":" + minute + ":" + second;
    },
    // 时间戳转日期时间格式（用于ele时间日期组件）
    formatDateTimePicker(inputTime) {
        let date = new Date(inputTime);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    },
    // eg:2018-07-01 转化到190几年
    formatDateTimeInput(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ("0" + minute) : minute;
        return y + "-" + m + "-" + d + " " + h + ":" + minute;
    },
    // 年月日
    formatDateTimeDay(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ("0" + minute) : minute;
        return y + "-" + m + "-" + d;
    },
    // 年月
    formatDateTimeMonth(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ("0" + minute) : minute;
        return y + "-" + m;
    },
    // 年月日 时分
    formatDateTimeMinute(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ("0" + minute) : minute;
        return y + "-" + m + "-" + d + " " + h + ":" + minute;
    },
    
    // 年月日 时
    formatDateTimeHourse(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ("0" + minute) : minute;
        return y + "-" + m + "-" + d + " " + h;
    },
     //  时分秒
     formatDateTimeHMS(inputTime) {        
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ("0" + minute) : minute;
        second = second < 10 ? ("0" + second) : second;
        return h + ":" + minute + ":" + second;
    },
    // 转化[年月日, 时分秒]
    formatDateTimeArray(inputTime) {
        try {
            inputTime = parseInt(inputTime);
        } catch (e) {
            inputTime = 0;
        }
        let param = [];
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ("0" + minute) : minute;
        second = second < 10 ? ("0" + second) : second;
        param[0] = y + "-" + m + "-" + d;
        param[1] = h + ":" + minute + ":" + second;
        return param;
    },
    // 返回周岁年龄
    age(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ("0" + m) : m;
        let d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        let h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ("0" + minute) : minute;
        second = second < 10 ? ("0" + second) : second;
        let BirthDate = y + "-" + m + "-" + d + "  " + h + "-" + minute + "-" + second;
        let returnAge;
        let strBirthdayArr = BirthDate.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];
        d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();
        if (nowYear === birthYear) {
            returnAge = 0;// 同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear; // 年之差
            if (ageDiff > 0) {
                if (nowMonth === birthMonth) {
                    let dayDiff = nowDay - birthDay;// 日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    let monthDiff = nowMonth - birthMonth;// 月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1;// 返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;
    },
    // 公用拼凑表格组件搜索参数
    SearchEvent(searchName, pageNum, perPage,) {
        let obj = {};
        searchName.map(t => {
            if (t.hasOwnProperty("time")) {
                obj[t.Sendkey] = t.time ? this.timesFormat(t.time): undefined;
            } else {
                obj[t.Sendkey] = undefined;
            }
        });
        return {...obj, ...{pageNum: pageNum, pageSize: perPage}};
    },
    // 告警档案专用拼凑表格组件搜索参数
    SearchEventl(searchName, pageNum, perPage, thistime) {
        let obj = {};
        
        searchName.map(t => {
            if (t.hasOwnProperty("time")) {
                let aa = this.timesFormat(t.time);
                obj[t.Sendkey] = t.time ? this.setTimeUse(new Date(aa)): undefined;
            } else {
                obj[t.Sendkey] = undefined;
            }
        });
        return {...obj, ...{pageNum: pageNum, pageSize: perPage,flag: thistime}};
    },
    // 转换string类型
    stringEvent(data) {
        let dataKey = Number(data) ? (data).toString() : data;// string
        return dataKey;
    },
    // 转换int类型
    intEvent(data) {
        let dataKey = typeof(data) === "string" ? parseInt(data) : data;// int
        return dataKey;
    },
    // 数据对比最大值
    contrast(data) {
        let list = {
            leftWidth: 10,
            widthLength:80
        };
        if (data.length>0 && data !== undefined) {     
            list.leftWidth = data.sort(function(a, b) {
                return b.length - a.length;
            })[0].length;
            list.leftWidth = list.leftWidth < 3 ? 5 * list.leftWidth : list.leftWidth * 2.7;
            list.widthLength = 95 - list.leftWidth;
        }
        return list;
    },
    // 处理数据小数点
    // eg:this.$filter.backFloat({
    //      list:res.data.data, num:2, SpecialTreatment:{avgSpeed:0,name:1}]
    // })
    // 传参 list，num或者SpecialTreatment，中的一个，或者两个都传
    // list指要处理数字保留的列表res.data.data
    // num 是指所有的数字返归保留几位小数，如果没有特殊处理字段，
    // 那么所有的数字都返回num个小数，如果有特殊字段，
    // 这个也可以传即除了特殊字段的保留小数之外，其他数字保留num位小数
    // SpecialTreatment 是指特殊处理的字段列表list
    // SpecialTreatment{key:value,key:value}
    // (key指要处理的字段，value指保留几位小数)
    backFloat(data) {
        let list = data.list;
        let num = data.num;
        let SpecialTreatment = data.SpecialTreatment;
        let listChange = [];
        for (let i in list) {
            listChange.push({});
            let nameAll = Object.keys(list[i]);
            for (let k in nameAll) {
                if (Number(list[i][nameAll[k]])) {
                    if ((String(list[i][nameAll[k]]).indexOf('.'))>0) {
                        if (num) {
                            listChange[i][nameAll[k]] = list[i][nameAll[k]].toFixed(num);
                        }
                        if (SpecialTreatment) {
                            let name = Object.keys(SpecialTreatment);
                            for (let j in name) {
                                let value = SpecialTreatment[name[j]];
                                listChange[i][name[j]] = list[i][name[j]].toFixed(value);
                            }
                        }
                    } else {
                        listChange[i][nameAll[k]] = list[i][nameAll[k]];
                    }
                } else {
                    listChange[i][nameAll[k]] = list[i][nameAll[k]];
                }
            }
        }
        return listChange;
    },
    // 判断表格弹窗数据否重复
    IsReplace(listAll, data, element, id) {
        for (let k = 0; k < listAll.length; k++) {
            if (data[element] === listAll[k][[element]] && id !== listAll[k].id) {
                return false;
            }
        }
    },
    // 乘法
    accMul(arg1,arg2) {
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },

    //axios请求
    //tp请求方式
    //url请求地址
    //data 参数
    //msg请求成功后的弹窗内容
    Axios(tp, url, data, msg) {
        let p = new Promise(function(resolve, reject){
            axios({
                method: tp,
                url: url,
                data: data
            }).then((e) => {
                if(msg) {
                    this.$showSimpleMessage(msg, "success");
                }
                resolve(e);
            }).catch((err) => {
                this.$showSimpleMessage(err, "error");
            })
        });
        return p;
    },
    //权限处理
    // list 需要处理的数组
    donePower(list){
        var allList = new Array();
        allList.push(list.t)
        list.map(val => {
            if(val.children.length > 0) {
                this.$filter.donePower(val.children)
            } 
        })
    }
};

