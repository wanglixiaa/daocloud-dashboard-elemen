<template>
<div>
  <keep-alive>
    <component @ex="changeComponent" @exchange="exchangeComponent" :tasks='tasks' v-bind:is="currentTabComponent" :taskType="currentTaskType" :stageName="stageName"></component>
  </keep-alive>
</div>
</template>
<script>
import ProcessDefinition from '@/components/ProcessDefinition'
import task from '@/components/task'
export default {
  data: () => ({
    currentTabComponent: ProcessDefinition,
    currentTaskType: '',
    stageName: '',
    tasks: []
  }),
  created() {
    this.getTaskInfo()
  },
  components: {
    ProcessDefinition,
    task
  },
  methods: {
    exchangeComponent(item, name) {
      this.currentTabComponent = task
      this.currentTaskType = item
      this.stageName = name
    },
    changeComponent(component) {
      this.currentTabComponent = component
    },
    getTaskInfo() {
      this.axios.get('https://api.daocloud.io/v1/ship/templates').then(res => {
        this.tasks = res.data
      })
    }
  }
}
</script>
