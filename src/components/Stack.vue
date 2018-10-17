<template>
  <div class="app">
    <el-container>
      <el-header :height="50">
        <el-row :gutter="5">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>创建新stack</el-button>
            </div></el-col>
          <el-col :span="6" :offset="0"><div class="grid-content bg-purple">共0个stack</div></el-col>
          <el-col :span="6" :offset="5"><div class="grid-content bg-purple">
              <el-input
                placeholder="搜索stack名"
                prefix-icon="el-icon-search"
                v-model="search">
              </el-input>
            </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :show-header="false">
          <el-table-column
            prop="name"
            label="项目名称"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
              <div>{{scope.row.time}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="image_url"
            label="镜像"
            width="300">
            <template slot-scope="scope">
              <!-- <div>镜像:{{scope.row.image_url}}</div> -->
              <!-- <div>版本:{{scope.row.version}}</div> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="new_version"
            label="重新部署"
            width="700">
            <template slot-scope='scope'>
              <el-button icon="el-icon-refresh">{{scope.row.new_version}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
