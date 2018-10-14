<template>
  <div class="dao-container">
    <div class="container">
      <div class="panel panel-default panel-cluster">
        <div class="panel-heading borderStyle">
          <h4><a href="#">自有集群 - 默认</a></h4>
          <div class="text-right">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </div>
        </div>
        <div class="panel-body borderStyle">
          <div class="row borderStyle">
            <div class="col-xs-6">
              <div class="caption">容器</div>
              <div class="ng-binding">0</div>
            </div>
            <div class="col-xs-6">
              <div class="caption">主机</div>
              <div class="ng-binding">5</div>
            </div>
          </div>
          <div class="cluster-usage">
            <el-progress :percentage="36" color="#8e71c7"></el-progress>
            <div class="legend">
              <span>已经使用25.86G内存中的9.20G</span>
              <span>已使用(9.20 GB)</span>
              <span>未使用(16.66 GB)</span>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <div class="btn-group">
            <a href="">管理主机</a>
            <a href="">添加主机</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="increase" >
        <div class="increase-icon">
        <i class="el-icon-circle-plus"></i>
      </div>
      <div class="commentary"><span>可以添加一个主机容器集群</span></div>
      <div class="increase-button">
        <button>添加新集群</button>
      </div>
      </div>
    </div>
    <div class="container">
      <div class="increase" >
        <div class="increase-icon">
        <i class="el-icon-circle-plus"></i>
      </div>
      <div class="commentary"><span>可以添加一个 DaoCloud 应用云平台</span></div>
      <div class="increase-button">
        <button>添加应用云平台</button>
      </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media screen and (min-width:768px) {
  div.container {
    width: 50%;
  }
}
.dao-container{
  padding:20px 40px 20px 40px;
  display: flex;
  flex-wrap:wrap;
}
.borderStyle{
  border-bottom: 1px solid transparent;
  border-color: #e5e5e5;
}
div.container{
  height: 350px;
  padding-right:10px;
  padding-left:10px;
  text-align: left;
  // border: 1px solid transparent;
  border-color: #e5e5e5;
  display:flex;
}
.panel{
  display:flex;
  flex-direction:column;
  border: 1px solid transparent;
  width: 100%;
}
.panel.panel-cluster{
  min-height:330px;
}
.cluster .panel{
  border-color:#dee1e2;
  border-radius: 4px;
  box-shadow:0 2px 5.8px 0.2px rgba(0,0,0,.6);
}
.panel{
  margin-bottom:20px;
  background-color:#fff;
  // border:1px solid transparent;
  border-radius:2px;
}
.cluster .panel-heading{
  background-color:#fff;
  border-top-left-radius:4px;
  border-top-right-radius: 4px;
  flex:1
}
div.panel-heading{
  height:59px;
  align-items: center;
  padding:10px 15px;
  padding-top:0px;
  padding-bottom:0px;
  display: flex;
  h4.panel-title{
    flex: 1;
    margin-top:0;
    margin-bottom: 0;
    color: inherit;
  }
  div.text-right{
    flex: 1;
    text-align: right;
    li{
      width:8px;
      height:8px;
      border-radius:8px;
      border: 1px solid transparent;
      background-color: #cfdef2;
      border-color: #6396d5;
      display: inline-block;
    }
  }
}
div.panel-body{
  flex:3;
  display:flex;
  flex-direction: column;
  padding: 15px;
  .row{
    flex:1;
    display:flex;
    margin: -15px -15px 0 -15px;
    .col-xs-6{
      flex:1;
      padding-left: 15px;
      padding-top: 15px;
    }
    .col-xs-6:first-child{
      border-right:1px solid #dee1e2;
    }
  }
  .cluster-usage{
    flex:1;
    display:flex;
    flex-direction: column;
    margin-top:35px;
    margin-bottom: 15px;
    .el-progress{
      margin-bottom: 20px;
    }
    .legend{
      span{
        margin-right:10px;
      }
    }
  }
}
div.panel-footer{
  flex:1;
  .btn-group{
    display: flex;
    height: 100%;
    a{
      flex: 1;
      display: flex;
      justify-content:center;
      align-items:center;
      height:100%;
    }
  }
}
div.container{
div.increase{
  padding: 40px 50px 0;
  margin-bottom: 20px;
  flex:1;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  text-align: center;
  .increase-icon{
    flex:2;
    width: 100%;
    i{
      width: 50px;
      height: 50px;
    }
  }
  .commentary{
    flex:1;
    width: 100%;
  }
  .increase-button{
    flex:1;
    width: 100%;
    button{
      padding: 10px 16px;
      font-size: 18px;
      line-height: 1.333;
      border-radius: 4px;
      background-color: #2ecc71;
      border-color: #2ecc71;
      color: #fff;
    }
  }
}
}
</style>
