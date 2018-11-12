<template>
  <div>
    <el-dialog
    :title=title
      :visible.sync="modifyTaskDialog"
      width="60%"
      center>
      <div class="content">
        <ul>
          <li @click="confirmTag(item)" v-for="item in setting" :key="item.id">{{item.name}}</li>
        </ul>
        <div>
          <keep-alive>
            <component :modifyTaskDialog='modifyTaskDialog' :taskForm="taskForm"
             :task="task" :is="currentComponent">
            </component>
          </keep-alive>
          <!-- <keep-alive>
            <component :taskForm.sync="taskForm"
             :task="task" :is="currentComponent">
            </component>
          </keep-alive> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="saving()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import modifyTasks from '@/components/modifyTasks'
import TriggeringConditions from '@/components/TriggeringConditions'
import dependence from '@/components/dependence'
import modifySetting from '@/components/modifySetting'
export default {
  data() {
    return {
      currentComponent: modifyTasks,
      updatedTaskForm: {},
      setting: [
        { name: '任务', component: modifyTasks },
        { name: '触发条件', component: TriggeringConditions },
        { name: '依赖', component: dependence },
        { name: '设置', component: modifySetting }
      ]
    }
  },
  props: ['modifyTaskDialog', 'taskForm', 'task'],
  computed: {
    title: function() {
      if (this.taskForm.config) {
        return `编辑${this.taskForm.config.name}任务`
      } else {
        return ''
      }
    }
  },
  methods: {
    confirmTag(item) {
      this.currentComponent = item.component
    },
    cancel() {
      this.$emit('update:modifyTaskDialog', false)
    },
    saving() {
      var newTaskForm = {}
      if (this.taskForm) {
        this.taskForm.config.arguments.forEach(item => {
          if (item.type === 'strlist') {
            newTaskForm[item.id] = item.default.split('\n')
          } else {
            newTaskForm[item.id] = item.default
          }
        })
      }
      newTaskForm.name = this.task.name
      newTaskForm.job_type = this.task.job_type
      newTaskForm.stage = this.task.stage
      this.axios
        .put(
          `https://api.daocloud.io/v1/ship/project/${
            this.$route.params.id
          }/flow/${this.task.name}`,
          newTaskForm
        )
        .then(res => {
          this.$emit('update:flow', res.data.parsed_yaml)
          this.$emit('update:modifyTaskDialog', false)
        })
    },
    updateTaskInfo(form) {
      this.updatedTaskForm = form
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
}
</style>
