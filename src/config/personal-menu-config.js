module.exports = [
  {name: 'DevOps',
    id: 'devOps',
    sub: [{
      name: '项目',
      componentName: 'buildFlows',
      children: [{
        name: '查看详情',
        componentName: 'ViewDetails'
      }]
    }]
  },
  {
    name: '交付中心',
    id: 'deliveryCenter',
    sub: [{
      name: '镜像仓库',
      componentName: 'MirrorWarehouse'
    },
    {
      name: '收藏夹',
      componentName: 'Favorites'
    },
    {
      name: '发现镜像',
      componentName: 'DiscoverMirror'
    }
    ]
  },
  {
    name: '应用平台',
    id: 'applicationPlatform',
    sub: [{
      name: '集群管理',
      componentName: 'ClusterManagement'
    },
    {
      name: '应用',
      componentName: 'Application'
    },
    {
      name: 'Stack',
      componentName: 'Stack'
    }
    ]
  },
  {name: '设置',
    id: 'settings',
    sub: [{
      name: '用户中心',
      componentName: 'UserCenter'
    }]
  }
]
// sub代表二级菜单
