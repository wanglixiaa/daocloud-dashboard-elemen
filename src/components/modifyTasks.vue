<template>
  <div>
    <el-form label-position="left" ref="taskForm" :model="template" label-width="100px">
      <div v-for="item in template.config.arguments" :key="item.id">
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
          <codemirror v-model="item.default" :options="cmOptions"></codemirror>
        </el-form-item>
        <!-- <el-form-item v-else-if="item.type==='services'" :label="item.name" prop="services">
          <el-select v-model="item.default" placeholder="选择服务">
            <el-option label="mysql" value="mysql"></el-option>
            <el-option label="redis" value="redis"></el-option>
            <el-option label="mongodb" value="mongodb"></el-option>
            <el-option label="influxdb" value="influxdb"></el-option>
            <el-option label="rabbitmq" value="rabbitmq"></el-option>
            <el-option label="postgres" value="postgres"></el-option>
            <el-option label="kairosdb" value="kairosdb"></el-option>
          </el-select>
        </el-form-item> -->
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskForm: {},
      index: 0,
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      },
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
    }
  },
  props: ['template', 'task'],
  created() {
    this.getTaskForm()
  },
  watch: {
    template: {
      handler: function(to, from) {
        this.$emit('update:template', this.template)
      },
      deep: true
    }
  },
  methods: {
    getTaskForm() {
      for (let i = 0; i < this.template.config.arguments.length; i++) {
        if (this.template.config.arguments[i].type === 'strlist') {
          this.template.config.arguments[i].default = this.task[
            this.template.config.arguments[i].id
          ].join('\n')
          continue
        }
        this.template.config.arguments[i].default = this.task[
          this.template.config.arguments[i].id
        ]
      }
    }
  }
}
</script>
