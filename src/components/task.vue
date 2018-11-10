<template>
<div>
  <div>
    <el-form label-position="left" :rules="rules" ref="taskForm" :model="taskForm" label-width="80px">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="taskForm.name"></el-input>
      </el-form-item>
      <div v-for="item in taskForm.arguments" :key="item.id">
        <el-form-item v-if="item.type==='image'" :label="item.name" prop="image">
          <el-input v-model="item.default.split(':')[0]"></el-input>
          <el-input v-model="item.default.split(':')[1]"></el-input>
        </el-form-item>
        <el-form-item v-else-if="item.type==='kvlist'" :label="item.name" prop="kvlist">
          <div v-for="info in item.default" :key="info.id">
            <el-col :span="11">
              <el-input v-model="info.key"></el-input>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input v-model="info.value"></el-input>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item v-else-if="item.type==='string'" :label="item.name" prop="string">
          <el-input v-model="item.default"></el-input>
        </el-form-item>
        <el-form-item v-else-if="item.type==='strlist'" :label="item.name" prop="strlist">
          <!-- <div class="jj">{{jj=item.default.join('\n')}}</div> -->
          <codemirror v-model="item.default" :options="cmOptions"></codemirror>
          <!-- <codemirror v-model="jj" :options="cmOptions"></codemirror> -->
        </el-form-item>
        <el-form-item v-else-if="item.type==='services'" :label="item.name" prop="services">
          <el-select v-model="item.default" placeholder="选择服务">
            <el-option label="mysql" value="mysql"></el-option>
            <el-option label="redis" value="redis"></el-option>
            <el-option label="mongodb" value="mongodb"></el-option>
            <el-option label="influxdb" value="influxdb"></el-option>
            <el-option label="rabbitmq" value="rabbitmq"></el-option>
            <el-option label="postgres" value="postgres"></el-option>
            <el-option label="kairosdb" value="kairosdb"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item>
          <el-button type="primary" @click="submitForm('taskForm')">创建任务</el-button>
          <el-button @click="resetForm('taskForm')">重置</el-button>
          <el-button @click="backtrack">返回</el-button>
        </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  data: () => ({
    taskForm: {},
    jj: '',
    index: 0,

    rules: {
      name: [{ required: true, message: '请输入', trigger: 'blur' }],
      // image: [{ required: true, message: '请输入', trigger: 'change' }],
      kvlist: [{}],
      // string: [{ required: true, message: '请输入', trigger: 'change' }],
      // strlist: [
      //   {
      //     required: true,
      //     message: '输入用以安装依赖或者执行测试的命令',
      //     trigger: 'blur'
      //   }
      // ],
      services: [{}]
    }
  }),
  props: ['taskType', 'stageName'],
  created() {
    this.getTaskInfo('ruby-test')
  },
  // computed: {
  //   code: function() {
  //     return this.jj
  //   }
  // },
  methods: {
    getTaskInfo() {
      this.axios.get('https://api.daocloud.io/v1/ship/templates').then(res => {
        res.data.forEach((item, index) => {
          if (item.job_type === this.taskType) {
            this.index = index
          }
        })
        let temp = res.data[this.index].config
        for (let i = 0; i < temp.arguments.length; i++) {
          if (temp.arguments[i].type === 'strlist') {
            temp.arguments[i].default = temp.arguments[i].default.join('\n')
          }
        }
        this.taskForm = temp
        this.taskForm = res.data[this.index].config
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var newTaskForm = {}
          this.taskForm.arguments.forEach(item => {
            if (item.type === 'strlist') {
              newTaskForm[item.id] = item.default.split('\n')
            } else {
              newTaskForm[item.id] = item.default
            }
          })
          newTaskForm.name = this.taskForm.name
          newTaskForm.job_type = this.taskType
          newTaskForm.stage = this.stageName
          this.axios
            .post(
              `https://api.daocloud.io/v1/ship/project/${
                this.$route.params.id
              }/flow/${this.taskForm.name}`,
              newTaskForm
            )
            .then(res => {
              this.$emit('ex', 'ProcessDefinition')
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    backtrack() {
      this.$emit('ex', 'ProcessDefinition')
    }
  }
}
</script>
<style lang="scss" scoped>
.jj {
  display: none;
}
</style>
