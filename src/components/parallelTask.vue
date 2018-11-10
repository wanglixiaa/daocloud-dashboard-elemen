<template>
  <el-dialog
    title="快速创建任务"
    :visible.sync="taskdialogVisible"
    width="40%">
      <div>
        <span @click="searchLabel(item)" :class="item.labelStyle" v-for="item in labels" :key="item.id">{{item.name}}</span>
      </div>
      <ul class="template-container">
        <li :class="item.taskStyle" @click="getTaskStyle(item)" v-for="item in taskLabels" :key="item.id">
          <img :src="item.taskIcon" alt="图标">
          <span>{{item.taskName}}</span>
        </li>
      </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      taskdialogVisible: false,
      labels: [],
      taskStyle: '',
      taskLabels: [],
      currentTask: ''
    }
  },
  props: ['dialogVisible', 'stageName'],
  created() {
    this.getTaskList()
    this.searchLabel({ name: '全部', labelStyle: 'label' })
  },
  watch: {
    dialogVisible: function(value, oldValue) {
      this.taskdialogVisible = !this.taskdialogVisible
    }
  },
  methods: {
    cancel() {
      this.$emit('parallelTaskDialog', 'cancel')
    },
    confirm() {
      this.$emit('parallelTaskDialog', this.currentTask, this.stageName)
    },
    getTaskList() {
      this.axios.get('https://api.daocloud.io/v1/ship/templates').then(res => {
        // res.data.forEach(item => {
        //   item.config.labels.forEach(item => {
        //     this.labels.push(item)
        //   })
        // })
        // this.labels = Array.from(new Set(this.labels))
        // this.labels.unshift('all')
        var label = []
        res.data.forEach(item => {
          item.config.labels.forEach(item => {
            label.push(item)
          })
        })
        label = Array.from(new Set(label))
        label.unshift('全部')
        label.forEach(item => {
          this.labels.push({
            name: item,
            labelStyle: 'label'
          })
        })
      })
    },
    getTaskStyle(item) {
      this.currentTask = item.taskName
      // console.log(this.currentTask)
      this.taskLabels.forEach(item => {
        item.taskStyle = ''
      })
      item.taskStyle = 'taskStyle'
    },
    searchLabel(label) {
      this.labels.forEach(item => {
        item.labelStyle = 'label'
      })
      label.labelStyle = 'clickedStyle'
      this.taskLabels = []
      this.axios.get('https://api.daocloud.io/v1/ship/templates').then(res => {
        if (label.name === '全部') {
          res.data.forEach(item => {
            this.taskLabels.push({
              taskName: item.job_type,
              taskIcon: item.icon,
              taskStyle: ''
            })
          })
        } else {
          var tasks = res.data.filter(function(item, index, array) {
            return item.config.labels.indexOf(label.name) !== -1
          })
          tasks.forEach(item => {
            this.taskLabels.push({
              taskName: item.job_type,
              taskIcon: item.icon,
              taskStyle: ''
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
span.label {
  display: inline-block;
  height: 26px;
  padding: 0 16px;
  border-radius: 26px;
  background-color: #f5f7fa;
  margin: 6px 3px 0;
  line-height: 26px;
  font-size: 13px;
  cursor: pointer;
}
ul.template-container {
  margin-top: 20px;
  li {
    width: 25%;
    border: 1px solid #e4e7ed;
    display: inline-block;
    margin: 0 5px 5px 5px;
    height: 100px;
    text-align: center;
    position: relative;
    border-radius: 2px;
    img {
      display: block;
      width: 32px;
      height: 32px;
      position: absolute;
      left: 35%;
      top: 20%;
    }
    span {
      position: absolute;
      left: 28%;
      top: 60%;
    }
  }
}
li.taskStyle {
  background-color: #f0f7ff;
  border: 1px solid #3890ff;
}
.clickedStyle {
  display: inline-block;
  height: 26px;
  padding: 0 16px;
  border-radius: 26px;
  margin: 6px 3px 0;
  line-height: 26px;
  font-size: 13px;
  cursor: pointer;
  background-color: blue;
}
</style>
