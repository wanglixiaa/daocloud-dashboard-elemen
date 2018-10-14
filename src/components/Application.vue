<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-button type="primary">主要按钮</el-button></div></el-col>
          <el-col :span="6" :offset="12"><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input21">
            </el-input>
            </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop=""
            label="应用名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="最近更新"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="运行环境"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="所属镜像"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
