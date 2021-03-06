module.exports = [
  {
    name: 'DevOps',
    id: 'devOps',
    sub: [
      {
        name: '项目',
        componentName: 'BuildFlowsList',
        path: '/buildFlows',
        children: [
          {
            name: 'buildFlows',
            componentName: 'buildFlows'
          },
          {
            name: '查看详情',
            componentName: 'ViewDetails'
          }
        ]
      }
    ]
  },
  {
    name: '交付中心',
    id: 'deliveryCenter',
    sub: [
      {
        name: '镜像仓库',
        componentName: 'MirrorWarehouseList',
        path: '/MirrorWarehouse',
        children: [
          {
            name: 'MirrorWarehouse',
            componentName: 'MirrorWarehouse'
          },
          {
            name: 'MirrorWarehouseItemInfo',
            componentName: 'MirrorWarehouseItemInfo'
          }
        ]
      },
      {
        name: '收藏夹',
        componentName: 'Favorites',
        path: 'Favorites'
      },
      {
        name: '发现镜像',
        componentName: 'DiscoverMirror',
        path: 'DiscoverMirror'
      }
    ]
  },
  {
    name: '应用平台',
    id: 'applicationPlatform',
    sub: [
      {
        name: '集群管理',
        componentName: 'ClusterManagement',
        path: 'ClusterManagement'
      },
      {
        name: '应用',
        componentName: 'Application',
        path: 'Application'
      },
      {
        name: 'Stack',
        componentName: 'Stack',
        path: 'Stack'
      }
    ]
  },
  {
    name: '设置',
    id: 'settings',
    sub: [
      {
        name: '用户中心',
        componentName: 'UserCenter',
        path: 'UserCenter'
      }
    ]
  }
]
// sub代表二级菜单
