<template>
  <div>
    <div class="flex container">
      <div class="setting-title">镜像名称</div>
      <div>
        <div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox @change="changeValue" label="成功构建后设置 latest 为镜像标签"></el-checkbox>
            <el-checkbox @change="changeValue" label="成功构建后设置分支名为镜像标签"></el-checkbox>
          </el-checkbox-group>
        </div>
        <p>当构建成功后，默认命名为 {branch}-{commit-id} 或者 {tag}，
          你可以同时配置以上策略。</p>
      </div>
    </div>
    <div class="flex container">
      <div class="setting-title">删除项目</div>
      <div>
        <div>请注意，删除项目将清除项目的所有历史数据以及
          相关的镜像，且该操作不能被恢复，您确定要删除吗?</div>
        <el-button type="danger">删除项目</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: [{ auto_branch_tag: false }, { auto_latest_tag: false }]
    }
  },
  methods: {
    changeValue() {
      console.log(this.checkList)
      // this.axios.
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox {
  display: block;
  margin-left: 0;
}
.container {
  font-size: 14px;
  padding: 25px 30px;
  border-bottom: 1px solid #e4e7ed;
  background-color: #fff;
}
.setting-title {
  line-height: 24px;
  width: 133px;
  color: #3d444f;
}
p {
  line-height: 24px;
  color: #9ba3af;
  margin: 10px 0 0;
}
</style>
