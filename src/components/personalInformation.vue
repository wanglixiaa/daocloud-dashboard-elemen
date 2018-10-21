<template>
  <div class="setting">
    <div class="title-block">个人信息</div>
    <div class="setting-block">
      <div class="setting-title">头像</div>
      <div class="setting-content">
        <img class="headPortrait" src="https://cdn-daoweb-prod.daocloud.io/static/noavatar01.png" alt="头像">
        <!-- <button class="imgSource">选择图片</button>
        <p>支持JPG，PNG格式。文件小于1M</p> -->
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">用户名</div>
      <div class="setting-content">
        <input type="text" class="inputStyle" placeholder="xzhenglun">
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">手机号<font-awesome-icon icon="coffee"/></div>
      <div class="setting-content">
        <input type="text" class="inputStyle"><button class="modify">修改</button>
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">更改密码</div>
      <div class="setting-content">
        <input type="text" placeholder="ddddd" class="inputStyle"><button class="modify">更改</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // data: () => ({
  //   fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  // }),
  // methods:{
  //   methods: {
  //     handleRemove(file, fileList) {
  //       console.log(file, fileList);
  //     },
  //     handlePreview(file) {
  //       console.log(file);
  //     },
  //     handleExceed(files, fileList) {
  //       this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  //     },
  //     beforeRemove(file, fileList) {
  //       return this.$confirm(`确定移除 ${ file.name }？`);
  //     }
  //   }
  // } ,
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了${files.length} 个文件，共选择了${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
button.modify{
  margin-left: 15px;
  background-color: #f5f7fa;
  color: #9ba3af;
  border: 1px solid #ccd1d9;
  border-radius: 2px;
  width: 50px;
  height: 32px;
  line-height: 1;
}
.inputStyle{
  background-color: #f5f7fa;
  color: #9ba3af;
  border: 1px solid #ccd1d9;
  border-radius: 2px;
  cursor: not-allowed;
  width: 287px;
  height: 32px;
  line-height: 1;
}
div.setting-content{
  img.headPortrait{
    display:block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border:1px solid #e4e7ed;
  }
  button.imgSource{
    padding: 5px 15px;
    width: 92px;
    height: 32px;
    color: #fff;
    background-color: #3890ff;
    border-color: #217ef2;
    margin-top: 20px;
    font-size: 14px;
  }
  p{
    line-height: 24px;
    margin-top:5px;
    color: #9ba3af;

  }
}
</style>
