// 非空判定
const isEmpty = (value) => {
    if (value === undefined || value === null || value.toString() === undefined || value.toString() === null) {
        return true;
    }

    return typeof value === "string" && value.trim() === "";
};
// 字符串最长限定
const mostString = (value) => {
    if (typeof value === "string" && value.length >= 255) {
        return true;
    }

    return false;
};

export default {
    // 非空验证
    NotEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 既能下拉又能输入的非空验证
    NotEmpty2: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }

            callback();
        },
        trigger: "change"
    },
    // 多选框非空验证
    NotEmpty3: {
        required: true,
        validator: (rule, value, callback) => {
            if (value.length <= 0) {
                return callback(new Error("内容不能为空"));
            };
            callback();
        },
        trigger: "change"
    },
    // 序列号
    NotString: {
        required: true,
        validator: (rule, value, callback) => {
            const notString = /^[\u4e00-\u9fa5]/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            };
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if ((notString.test(value))) {
                callback(new Error("请输入合法的序列号"));
            }
            callback();
        },
        trigger: "blur"
    },
    // 编号规则（无中文）
    NotChinese: {
        required: true,
        validator: (rule, value, callback) => {
            const NotChinese = /^[A-Za-z0-9]+$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            };
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(NotChinese.test(value))) {
                callback(new Error("不能为汉字，请输入字母或数字"));
            }
            callback();
        },
        trigger: "blur"
    },
    NotChineseisEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            const NotChinese = /^[A-Za-z0-9]+$/;
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(NotChinese.test(value)) && value !== undefined) {
                callback(new Error("不能为汉字，请输入字母或数字"));
            }
            callback();
        },
        trigger: "blur"
    },
    // 只能输入数字，字母和汉字，字符长度不能小于6，不能大于50
    numberChineseEnglish: {
        required: true,
        validator: (rule, value, callback) => {
            const NotChinese = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            };
            if (!(NotChinese.test(value)) && value !== undefined) {
                callback(new Error("只能为汉字，字母或数字"));
            };
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                let a = value.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len = len + 2;
                } else {
                    len += 1;
                }
            }
            // if (len < 6) {
            //     callback(new Error("字符长度不能小于6"));
            // }
            if (len > 50) {
                callback(new Error("字符长度不能大于50"));
            }
            callback();
        },
        trigger: "blur"
    },
    // 只能输入数字，字母和汉字，字符长度不能小于1，不能大于10
    numberChinese: {
        required: true,
        validator: (rule, value, callback) => {
            const NotChinese = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            };
            if (!(NotChinese.test(value)) && value !== undefined) {
                callback(new Error("只能为汉字，字母或数字"));
            };
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                let a = value.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len = len + 2;
                } else {
                    len += 1;
                }
            }
            if (len > 10) {
                callback(new Error("字符长度不能大于20"));
            }
            callback();
        },
        trigger: "blur"
    },
    // 只能输入数字，字母和汉字，字符长度不能小于1，不能大于5
    numberChinesefive: {
        required: true,
        validator: (rule, value, callback) => {
            const NotChinese = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            };
            if (!(NotChinese.test(value)) && value !== undefined) {
                callback(new Error("只能为汉字，字母或数字"));
            };
            let len = 0;
            for (let i = 0; i < value.length; i++) {
                let a = value.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {
                    len = len + 2;
                } else {
                    len += 1;
                }
            }
            if (/^[a-zA-Z0-9]*$/.test(value)) {
                if (len > 5) {
                    callback(new Error("字符长度不能大于5"));
                }
            } else if (/^[\u4e00-\u9fa5]*$/.test(value)) {
                if (len > 10) {
                    callback(new Error("字符长度不能大于5"));
                }
            }
            callback();
        },
        trigger: "blur"
    },
    // 必须选择
    SelectRule: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("必须选择其中一项"));
            }

            callback();
        },
        trigger: "change"
    },
    // 必须是数字（整数）
    MustBeNumber: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(/^[0-9]*$/.test(value))) {
                callback(new Error("请输入数字"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 汉字+数字
    HzOrNum: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            let juge = /^[\u4e00-\u9fa5\0-9]+$/;
            if (!juge.test(value)) {
                callback(new Error("请输入汉字+正数字"));
            }

            callback();
        },
        trigger: "change"

    },
    // 必须是正数（整数）
    MustBeNumberPlus: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
                callback(new Error("请输入正数"));
            }

            callback();
        },
        trigger: "blur"
    },
    MustBeNumberisEmpty: { // 必须数字（整数可为空）
        required: true,
        validator: (rule, value, callback) => {
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(/^[0-9]*$/.test(value)) && value !== undefined) {
                callback(new Error("请输入数字"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 必须输数字 (可以是小数)
    MustBeAllNumber: {
        required: true,
        validator: (rule, value, callback) => {
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            if (mostString(value)) {
                return callback(new Error("超过字符限制"));
            }
            if (!(/^\d+(\.\d+)?$/.test(value))) {
                callback(new Error("请输入数字"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 日期规则
    DateRule: {
        required: true,
        validator: (rule, value, callback) => {
            if (!value || value === null || value === undefined) {
                callback(new Error("请选择日期"));
            }

            callback();
        },
        trigger: "change"
    },
    // 日期不能大于当前日期
    DateRuleNotTody: {
        required: true,
        validator: (rule, value, callback) => {
            if (!value || value === null || value === undefined) {
                callback(new Error("请选择日期"));
            }
            if (value > new Date()) {
                callback(new Error("日期不能大于今天"));
            }
            callback();
        },
        trigger: "change"
    },
    // 日期不能小于当前日期
    DateRulelittleTody: {
        required: true,
        validator: (rule, value, callback) => {
            if (!value || value === null || value === undefined) {
                callback(new Error("请选择日期"));
            }
            if ((new Date(value)).getTime() < (new Date().getTime() - 60000)) {
                callback(new Error("日期不能小于今天此时"));
            }
            callback();
        },
        trigger: "change"
    },
    // 日期选择可以为空，也可以小于今天
    DateRuleNotTodyisEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            if (value > new Date()) {
                callback(new Error("日期不能大于今天"));
            }
            callback();
        },
        trigger: "change"
    },
    // mac地址规则
    MacRule: {
        required: true,
        validator: (rule, value, callback) => {
            const macRegularExpression = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!macRegularExpression.test(value)) {
                callback(new Error("请输入合法的MAC地址"));
            }

            callback();
        },
        trigger: "blur"
    },
    // IP地址规则
    IpRule: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("请输入合法的ip地址"));
            }

            callback();
        },
        trigger: "blur"
    },
    // ip可以为空，也可以是合法ip
    IpRuleisEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

            if (!ipRegularExpression.test(value)) {
                callback(new Error("请输入合法的ip地址"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 经度规则
    LongitudeRule: {
        required: true,
        validator: (rule, value, callback) => {
            // const ipRegularExpression = /^-?(?:(?:180(?:\.0{1,8})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,8})?))$/;
            // const ipRegularExpression = /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,9})|(\d|[1-9]\d|1[1-7]\d|0{1,3})|180\.0{0,9}|180)$/;
            const ipRegularExpression = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,9})?)|180(([.][0]{1,9})?))$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("-180~180<10位小数"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 经度可以为空，也可以是经度格式
    LongitudeRuleisEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,9})?)|180(([.][0]{1,9})?))$/;

            if (!ipRegularExpression.test(value) && value !== undefined) {
                callback(new Error("-180~180<10位小数"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 纬度规则
    LatitudeRule: {
        required: true,
        validator: (rule, value, callback) => {
            // const ipRegularExpression = /^-?(?:90(?:\.0{1,6})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/;
            const ipRegularExpression = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/;

            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!ipRegularExpression.test(value)) {
                callback(new Error("-90~90<10位小数"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 纬度可以为空，也可以是纬度格式
    LatitudeRuleisEmpty: {
        required: true,
        validator: (rule, value, callback) => {
            // const ipRegularExpression = /^-?(?:90(?:\.0{1,6})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/;
            const ipRegularExpression = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,9})?)|90(([.][0]{1,9})?))$/;

            if (!ipRegularExpression.test(value) && value !== undefined) {
                callback(new Error("-90~90<10位小数"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 经度-纬度格式验证
    LongitudeRule_LatitudeRule: {
        required: true,
        validator: (rule, value, callback) => {
            const ipRegularExpression = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,100})?)|180(([.][0]{1,100})?))$/;
            const ip2 = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,100})?)|90(([.][0]{1,100})?))$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }
            const reg = RegExp("-");
            if (!reg.test(value)) {
                callback(new Error("经度-纬度连接符用-"));
            } else {
                if (!ipRegularExpression.test((value.split("-"))[0])) {
                    callback(new Error("经度：-180~180"));
                }
                if (!ip2.test((value.split("-"))[1])) {
                    callback(new Error("纬度：-90~90"));
                }
            }
            callback();
        },
        trigger: "change"
    },
    // 手机号码规则
    phoneRule: {
        required: true,
        validator: (rule, value, callback) => {
            const phoneRegularExpression = /^[1][1-9][0-9]{9}$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!phoneRegularExpression.test(value)) {
                callback(new Error("请输入合法的手机号码"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 手机号和固话码规则（无非空验证）
    phoneSimplePhone: {
        required: true,
        validator: (rule, value, callback) => {
            const phonePhoneRegularExpression = /^[1][1-9][0-9]{9}$/;
            const phonePhoneRegularExpression2 = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            if (!phonePhoneRegularExpression.test(value) && !phonePhoneRegularExpression2.test(value) && !(value === undefined || !value || value.toString() === undefined || value === "——" || value === null)) {
                callback(new Error("请输入合法手机号码或者(区号-固话)"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 固话码规则
    fixedLinePhone: {
        required: true,
        validator: (rule, value, callback) => {
            const phonePhoneRegularExpression = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!phonePhoneRegularExpression.test(value)) {
                callback(new Error("请输入合法区号-固话"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 手机号和固话码规则
    phoneRuleAndPhone: {
        required: true,
        validator: (rule, value, callback) => {
            const phonePhoneRegularExpression = /^[1][1-9][0-9]{9}$/;
            const phonePhoneRegularExpression2 = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!phonePhoneRegularExpression.test(value) && !phonePhoneRegularExpression2.test(value)) {
                callback(new Error("请输入合法手机号码或者(区号-固话)"));
            }

            callback();
        },
        trigger: "blur"
    },
    // 邮箱规则
    emailRule: {
        required: true,
        validator: (rule, value, callback) => {
            const emailExpression = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
            if (isEmpty(value)) {
                return callback(new Error("内容不能为空"));
            }

            if (!emailExpression.test(value)) {
                callback(new Error("请输入合法的电子邮箱地址"));
            }

            callback();
        },
        trigger: "blur"
    }
};
