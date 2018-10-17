<template>
  <div>
    <div class="left flex">
      <button @click="dialogVisible = true" class="add">+</button>
      <div class="stage-item">
        <div class="stage-item-title flex"><span>test</span><div>...</div></div>
        <div class="stage-task con flex"><h5>自定义任务</h5><div>*</div></div>
        <div class="stage-plus-one flex"><button class="add">+</button><span>添加并行任务</span></div>
      </div>
      <button class="Instructions">=</button>
    </div>
    <div class="right"></div>
    <el-dialog
      title="添加阶段"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <label for="phaseName"></label><input type="text" name="" id="phaseName">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.add{
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #ccd1d9;
  padding: 0;
  border: 0;
}
.Instructions{
  width: 15px;
  height: 15px;
  background-color: #ccd1d9;
}
.stage-item{
  width: 220px;
  .stage-item-title{
    font-size: 13px;
    line-height: 26px;
    height: 26px;
    margin-bottom: 15px;
    padding: 0 6px 0 10px;
    color: #fff;
    border-radius: 2px;
    background-color: #9ba3af;
    text-shadow: 0 2px 4px rgba(0,0,0,.15);
    justify-content: space-between;
  }
  .stage-task{
    margin-bottom: 10px;
    border: 1px solid #ccd1d9;
    border-radius: 2px;
    background-color: #fff;
    justify-content: space-between;
  }
  .stage-plus-one{
    height: 30px;
    cursor: pointer;
    color: #595f69;
    border-radius: 2px;
  }
}
</style>
