<!--
 * @Description: 描述
 * @Author: pym
 * @Github: https://github.com/fodelf
 * @Date: 2020-04-05 16:32:04
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-13 15:58:32
 -->
<template>
  <el-dialog
    :visible="tempVisible"
    width="40%"
    :title="title"
    :before-close="close"
    v-if="tempVisible"
  >
    <el-form
      :model="tempForm"
      :rules="tempRules"
      ref="tempForm"
      label-width="100px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="组件名称" prop="componentName">
            <el-input
              v-model="tempForm.componentName"
              placeholder="请输入组件名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件类型" prop="type">
            <el-select v-model="tempForm.type">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="项目路径"
        prop="pathUrl"
        v-if="tempForm.addMethod === 'localImport'"
      >
        <el-input
          type="text"
          v-model="tempForm.pathUrl"
          placeholder="请输入项目路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="Git路径" prop="gitUrl">
        <el-input
          type="text"
          v-model="tempForm.gitUrl"
          placeholder="请输入Git路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片说明">
        <el-upload
          class="upload-demo"
          action="/api/upload"
          accept="image/jpeg,image/gif,image/png,image/jpg"
          :limit="1"
          :multiple="false"
          :on-success="getFile"
        >
          <el-button size="small" type="primary" class="el-icon-plus"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input
          type="text"
          v-model="tempForm.keyword"
          placeholder="请输入关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件描述">
        <el-input
          type="textarea"
          v-model="tempForm.dec"
          :rows="2"
          placeholder="请输入组件描述"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button type="info" @click="close">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { insertComponent, updateComponent } from '@/api/componentApi.js'
import { getProjectType } from '@/api/index/projectManage.js'
export default {
  name: 'tempDialog',
  props: ['itemObj', 'actionType'],
  data() {
    return {
      tempVisible: false,
      title: '',
      tempForm: {
        componentName: '',
        type: '',
        gitUrl: '',
        keyword: '',
        dec: '',
        decImg: ''
      },
      tempRules: {
        componentName: [
          { required: true, message: '请输入组件名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入组件类型', trigger: 'change' }
        ],
        gitUrl: [{ required: true, message: '请输入Git路径', trigger: 'blur' }],
        keyword: [{ required: true, message: '请输入关键字', trigger: 'blur' }]
      },
      typeList: [],
      file: null
    }
  },
  methods: {
    show() {
      this.title = this.$props.actionType == 'modify' ? '修改组件' : '新增组件'
      if (this.$props.actionType == 'modify') {
        debugger
        this.tempForm = this.$props.itemObj
      } else {
        this.proForm = {
          componentName: '',
          type: '',
          gitUrl: '',
          keyword: '',
          dec: '',
          decImg: ''
        }
      }
      this.tempVisible = true
      this.queryTempTypeList()
    },
    close() {
      this.tempVisible = false
      this.$refs.tempForm.resetFields()
    },
    getFile(response) {
      this.tempForm.decImg = response.resultEntity
    },
    queryTempTypeList() {
      getProjectType({}).then(res => {
        this.typeList = res || []
      })
    },
    /**
     * @name: confirm
     * @description: 弹窗确认
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     */
    confirm() {
      this.$refs.tempForm.validate(valid => {
        if (valid) {
          if (this.$props.actionType == 'add') {
            insertComponent(this.tempForm).then(() => {
              this.$message({
                type: 'success',
                message: '新增组件成功'
              })
              this.$emit('getList',this.tempForm.type)
              this.close()
            })
          } else {
            updateComponent(this.tempForm).then(() => {
              this.$message({
                type: 'success',
                message: '修改组件成功'
              })
              this.$emit('getList',this.tempForm.type)
              this.close()
            })
          }
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  margin-top: 5vh !important;
  margin-bottom: 0;
  background-color: #303641;
  .el-dialog__header {
    border-bottom: 1px solid #4f5467;
    .el-dialog__title {
      color: #ced4da;
    }
  }
  .el-dialog__body {
    padding: 10px 20px;
    .el-form-item__label {
      color: #ced4da;
    }
    .el-input__inner {
      background-color: #353c48;
      border: none;
      color: #ced4da;
    }
    .el-textarea__inner {
      background-color: #353c48;
      border: none;
      color: #ced4da;
    }
    .el-radio__inner {
      background-color: #272c36;
      border: 1px #adb5bd solid;
      outline: none;
    }
    .is-checked {
      .el-radio__inner {
        background-color: #fb9678;
        border: 1px solid #fb9678;
      }
      .el-radio__label {
        color: #fb9678;
      }
    }
  }
}
</style>
