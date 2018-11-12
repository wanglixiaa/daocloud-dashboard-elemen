<template>
  <div class="app">
    <div class="left">
      <div class="dao-alert dao-alert-error">{{warning}}</div>
      <div class="flex stage">
        <div v-for="(item,index) in stage" :key="item.id" class="flex">
          <button @click="addStage(index)" class="add">+</button>
          <div class="stage-item">
            <div class="stage-item-title flex"><span>{{item.name}}</span>
            <div @click="getStyle(item)">...</div>
            </div>
            <transition name="fade">
              <ul v-if="item.show" class="dropdown">
                <li @click="getModifyType(subIndex,index,item.name)"
                v-for="(sub,subIndex) in dropdown" :key=sub.id>{{sub}}</li>
              </ul>
            </transition>
            <div v-for="(task) in item.tasks" :key='task.key' class="stage-task con flex">
              <!-- <a @click="modifyTask(index,key,item.name)">{{task.name}}</a><div>*</div> -->
              <a @click="modifyTask(item.name,task)">{{task.name}}</a><div>*</div>
            </div>
            <div @click="getParallelTask(item.name)" class="stage-plus-one flex">
              <button class="add">+</button><span>添加并行任务</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-content">
        <div class="right-item">全局变量</div>
        <div class="right-item">环境变量变量</div>
      </div>
      <div class="right-content">
        <div class="right-item">使用 submodule</div>
        <div class="right-item">构建集群 IP</div>
      </div>
      <div class="right-content">
        <div class="right-item">通过yaml快捷编辑</div>
      </div>
      <div class="right-content">
        <button>切换至本地yaml</button>
      </div>
    </div>
    <el-dialog
      title="添加阶段"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="form">
        <el-form-item label="阶段名称" label-width="70px">
          <el-input v-model="form.stageName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="buttonStatus" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
    <parallelTask @parallelTaskDialog="closeDialog"
    :dialogVisible="parallelTaskDialog" :stageName='stageName'></parallelTask>

     <modifyTask :modifyTaskDialog.sync="modifyTaskDialogVisible"
     :taskForm="taskForm"
     @update:flow="stage=$event" :task="task"></modifyTask>
  </div>
</template>
<script>
import parallelTask from '@/components/parallelTask'
import viewDetails from '@/services/viewDetails'
import modifyTask from '@/components/modifyTask'
import _ from 'lodash'
export default {
  data() {
    return {
      warning: '',
      styles: false,
      dialogVisible: false,
      parallelTaskDialog: false,
      modifyTaskDialogVisible: false,
      modifyTaskStageName: '',
      taskIndex: 0,
      stageIndex: 0,
      stage: [],
      stageName: '',
      templates: [],
      taskForm: {},
      task: {},
      form: {
        stageName: '',
        stageIndex: 0
      },
      dropdown: [
        '添加任务',
        '重命名当前阶段',
        '在左侧增加一列',
        '在右侧增加一列',
        '删除当前阶段'
      ]
    }
  },
  components: {
    parallelTask,
    modifyTask
  },
  props: ['tasks'],
  created() {
    this.getRepoInfo()
    this.getTemplates()
  },
  computed: {
    buttonStatus: function() {
      if (this.form.stageName) {
        return false
      } else {
        return true
      }
    }
    // taskForm:{
    //   get:function(){
    //     return _.cloneDeep(taskForm[0])
    //   }
    // }
  },
  methods: {
    getRepoInfo() {
      viewDetails.processDefinition(this.$route.params.id).then(res => {
        this.warning = res.data.warnings ? res.data.warnings[0] : ''
        res.data.parsed_yaml.forEach(item => {
          this.stage.push({
            name: item.name,
            // tasksName: Object.keys(item.tasks),
            tasks: item.tasks,
            show: false
          })
        })
      })
    },
    getTemplates() {
      this.axios.get('https://api.daocloud.io/v1/ship/templates').then(res => {
        this.templates = res.data
      })
    },
    // 确定下拉框显示状态
    getStyle(item) {
      item.show = !item.show
    },
    // 打开弹出框
    addStage(id) {
      this.dialogVisible = true
      this.form.stageIndex = id
      this.form.stageName = ''
    },
    deleteStage(id, stageName) {
      this.axios
        .delete(
          `https://api.daocloud.io/v1/ship/project/${
            this.$route.params.id
          }/flow/stages/${stageName}`,
          { headers: { Authorization: this.$cookies.get('token') } }
        )
        .then(res => {
          this.stage = []
          this.getRepoInfo()
        })
    },
    // 确认
    confirm() {
      this.dialogVisible = false
      const stageNames = []
      this.stage.forEach(item => {
        stageNames.push(item.name)
      })
      if (this.form.stageName) {
        stageNames.splice(this.form.stageIndex, 0, this.form.stageName)
        this.axios.put(
          `https://api.daocloud.io/v1/ship/project/${
            this.$route.params.id
          }/flow/stages`,
          stageNames
        )
        this.stage = []
        this.getRepoInfo()
      } else {
        this.buttonStatus = true
      }
    },
    // 获取修改方式
    getModifyType(type, index, stageName) {
      if (type === 0) {
        this.addStage(index)
      } else if (type === 4) {
        this.deleteStage(index, stageName)
      }
    },
    // 确定并行任务弹出框状态
    getParallelTask(name) {
      this.parallelTaskDialog = true
      this.stageName = name
    },
    // 关闭弹出框
    closeDialog(item, name) {
      this.parallelTaskDialog = false
      if (item !== 'cancel') {
        this.$emit('exchange', item, name)
      }
    },
    modifyTask(stageName, task) {
      this.modifyTaskDialogVisible = true
      var taskForm = this.templates.filter(item => {
        return item.job_type === task.job_type
      })
      this.task = _.cloneDeep(task)
      this.taskForm = _.cloneDeep(taskForm[0])
    },
    closeModifyTaskDialog(stage) {
      this.modifyTaskDialogVisible = false
      if (stage.parsed_yaml) {
        this.stage = []
        stage.parsed_yaml.forEach(item => {
          this.stage.push({
            name: item.name,
            tasks: item.tasks,
            show: false
          })
        })
      } else {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
div.app {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 15px 10px 15px 10px;
  div.left {
    height: 100%;
  }
  div.right {
    background-color: #fff;
    height: 100%;

    border-left: 1px solid grey;
    div.right-content {
      border-bottom: 1px solid grey;
      height: 100%;
      div.right-item {
        margin-top: 10px;
      }
      button {
        margin-top: 10px;
      }
    }
  }
}
.add {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #ccd1d9;
  padding: 0;
  border: 0;
}
.Instructions {
  width: 15px;
  height: 15px;
  background-color: #ccd1d9;
}
.stage {
  margin-top: 20px;
}
.stage-item {
  width: 220px;
  position: relative;
  .stage-item-title {
    font-size: 13px;
    line-height: 26px;
    height: 26px;
    margin-bottom: 15px;
    padding: 0 6px 0 10px;
    color: #fff;
    border-radius: 2px;
    background-color: #9ba3af;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    justify-content: space-between;
  }
  .stage-task {
    margin-bottom: 10px;
    border: 1px solid #ccd1d9;
    border-radius: 2px;
    background-color: #fff;
    justify-content: space-between;
  }
  .stage-plus-one {
    height: 30px;
    cursor: pointer;
    color: #595f69;
    border-radius: 2px;
  }
}
ul.dropdown {
  position: absolute;
  background-color: #fff;
  padding: 5px 15px 2px 10px;
  right: 3px;
  top: 26px;
  li {
    margin-bottom: 5px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
