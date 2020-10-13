<template>
    <!-- 创建和编辑查看弹窗 -->
        <el-dialog :close-on-press-escape="false" :title="title" v-dialogDrag :show-close="true" @close="resetForm('formValidate','关闭')"
                   :visible.sync="Dialog" class="tems_dialog intelligence" width="460px" :close-on-click-modal="false">
            <div class="scrollPart" id="scrollDPart">
                <el-form :disabled="(title === '查看自定义情报' ? true : false)" :class="{isDisable: title === '查看自定义情报'}"
                 :model="formValidate" :rules="ruleValidate" ref="formValidateEmpty" label-width="90px" class="demo-ruleForm">
                    <div :style="{'width': (item.province ? '100%' : 'auto'), 'display': 'flex','flex-direction': 'column'}" v-for="(item, index) in DialogList" :key="index">
                        <el-form-item v-if="item.option" :class="item.class ? item.class: ''" :label="item.tableName+':'" :prop="item.tableProp">
                            <el-select class="tems_Input" v-model="formValidate[DialogList[index].tableProp]" filterable clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请选择...')">
                                <el-option v-for="(items, index) in item.option" :key="index" :label="items.label" :value="items.value" />
                            </el-select>
                        </el-form-item>                        
                        <el-form-item v-if="item.button" :class="item.class ? item.class: ''" :label="item.tableName+':'" :prop="item.tableProp">
                            <el-button style="width: 115px;" type="primary">地图绘制</el-button>
                        </el-form-item>
                        <el-form-item v-if="item.time" style="margin: 0px;" :class="item.class ? item.class: ''" :label="item.tableName+':'">
                        </el-form-item>
                        <el-form-item v-if="item.time" :class="item.class ? item.class: ''" :label="''" label-width="0px" :prop="item.tableProp">
                              <el-date-picker v-if="item.time"
                                v-model="formValidate[DialogList[index].tableProp]"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                            
                        <el-form-item v-if="!item.button && !item.time && !item.option" :class="item.class ? item.class: ''" :label="item.tableName+':'" :prop="item.tableProp">
                            <el-input  :maxlength="item.length" class="tems_Input" v-model="formValidate[DialogList[index].tableProp]"  clearable size="small" :placeholder="(item.placeholder ? item.placeholder : '请输入...')"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer flexRow">
                <div class="flexNum">
                    <div v-if="title === '查看自定义情报'" class="tems_Button inportBtn dic_closed" @click="resetForm('formValidateEmpty')">关 闭</div>
                    <div v-if="title !== '查看自定义情报'" class="tems_Button inportBtn dic_closed" @click="resetForm('formValidateEmpty')">取 消</div>
                    <div v-if="title !== '查看自定义情报'" class="tems_Button exportBtn dic_closed" @click="handleSubmit(formValidate)">保 存</div>
                </div>
            </div>
        </el-dialog>
</template>
