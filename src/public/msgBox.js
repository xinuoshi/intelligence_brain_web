import store from "../public/store/store";

export default {
    /**
     * 提示弹出框
     * @argument that this
     * @augments titleText 标题
     * @augments promptText 提示的文本
     * @augments determineFun 确定方法
     * @augments cancelFun 取消方法
     * @augments layerType 可选值(success / info / warning / error),默认为success
     * @augments buttonMap eg:{determine:"确定",cancel:"取消"} 如果只需要确定按钮，则只传 eg:{determine:"确定"}
     */
    layerNotice(titleText, promptText, determineFun, cancelFun, layerType, buttonMap) {
        let showCancelButton = true;

        if (!promptText) {
            promptText = "此操作将会产生一些异常操作, 是否继续?";
        }

        if (!layerType) {
            layerType = "success";
        }

        if (!buttonMap) {
            buttonMap = {
                determine: "确定",
                cancel: "取消"
            };
        } else {
            if (!buttonMap.cancel) {
                showCancelButton = false;
            }
        }

        this.$confirm(promptText, titleText, {
            confirmButtonText: buttonMap.determine,
            cancelButtonText: buttonMap.cancel,
            type: layerType,
            showCancelButton: showCancelButton
        }).then(() => {
            if (determineFun) {
                determineFun();
            } else {

            }
        }).catch((error) => {
            if (cancelFun) {
                cancelFun();
            } else {
                return error;
            }
        });
    },
    layerNoticeIS(titleText, promptText, determineFun, cancelFun, layerType, buttonMap) {
        let showCancelButton = true;

        if (!promptText) {
            promptText = "此操作将会产生一些异常操作, 是否继续?";
        }

        if (!layerType) {
            layerType = "success";
        }

        if (!buttonMap) {
            buttonMap = {
                determine: "是",
                cancel: "否"
            };
        } else {
            if (!buttonMap.cancel) {
                showCancelButton = false;
            }
        }

        this.$confirm(promptText, titleText, {
            confirmButtonText: buttonMap.determine,
            cancelButtonText: buttonMap.cancel,
            type: layerType,
            showCancelButton: showCancelButton
        }).then(() => {
            if (determineFun) {
                determineFun();
            } else {

            }
        }).catch((error) => {
            if (cancelFun) {
                cancelFun();
            } else {
                return error;
            }
        });
    },
    showErrorMessage(titleText, promptText) {
        this.$layerNotice(titleText, promptText, null, null, "error", { determine: "确定" });
    },
    showSuccessMessage(titleText, promptText) {
        this.$layerNotice(titleText, promptText, null, null, "success", { determine: "确定" });
    },
    /**
     * 简易提示弹出框
     * @augments promptText 提示的文本
     * @augments msgType 弹出框的类型 '',success','error','warning'  可以为空
     * @augments showClose 关闭弹窗的按钮 默认为 false
     */
    showSimpleMessage(promptText, msgType, showClose) {
        if (showClose === "" || showClose === undefined || showClose === null) {
            showClose = false;
        }

        this.$message({
            message: promptText,
            type: msgType
        });
    },
    initDefaultHttpHandler: (homeVue) => {
        return (error) => {
            if (homeVue.changeChildLoading !== undefined) {
                homeVue.changeChildLoading(false);
            }

            if (error.origin !== undefined && error.origin.status === -2) {
                // the current pageNum is about to redirect to login pageNum. do nothing.
                return;
            }
            if (typeof (error) === "string") {
                // the current pageNum is about to redirect to login pageNum. do nothing.
                homeVue.showErrorMessage("错误", error);
                return;
            }

            homeVue.showErrorMessage("网络错误", error.message);
        };
    },
    loading(bool) {
        store.commit("loadingState", bool);
    }
};
