import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Content from '@/components/Content'

// import menus from '@/config/personal-menu-config'

Vue.use(Router)

// menus.forEach(item => {
//   item.sub.forEach(sub => {
//     let children = []
//     if (sub.children) {
//       sub.children.forEach(child => {
//         children.push({
//           path: `/${sub.componentName}/${child.componentName}`,
//           name: child.name,
//           component: () => import(`@/components/${child.componentName}`)
//         })
//       })
//     }

//     routes.push({
//       path: `/${sub.componentName}`,
//       name: sub.componentName,
//       component: () => import(`@/components/${sub.componentName}`),
//       children: children
//     })
//   })
// })

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: Login
//     },
//     {
//       path: '/content',
//       name: '内容',
//       component: Content,
//       children: routes
//     }
//   ]
// })
// var routes = [
//   {
//     path: '/buildFlowsList',
//     name: 'buildFlowsList',
//     component: () => import('@/components/BuildFlowsList'),
//     children: [
//       {
//         path: '/buildFlows',
//         name: 'buildFlows',
//         component: () => import('@/components/buildFlows')
//       },
//       {
//         path: '/buildFlows/ViewDetails',
//         name: 'ViewDetails',
//         component: () => import('@/components/ViewDetails')
//       }
//     ]
//   }
// ]

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: '内容',
      component: Content,
      children: [
        {
          path: '/person',
          name: '个人',
          component: () => import('@/components/person'),
          children: [
            {
              path: '/buildFlows',
              name: 'buildFlows',
              component: () => import('@/components/buildFlows')
            },
            {
              path: '/buildFlows/:id',
              name: '查看详情',
              component: () => import('@/components/ViewDetails')
            },
            {
              path: '/MirrorWarehouse',
              name: '镜像仓库',
              component: () => import('@/components/MirrorWarehouse')
            },
            {
              path: '/Favorites',
              name: '收藏夹',
              component: () => import('@/components/Favorites')
            },
            {
              path: '/DiscoverMirror',
              name: '发现镜像',
              component: () => import('@/components/DiscoverMirror')
            },
            {
              path: '/ClusterManagement',
              name: '集群管理',
              component: () => import('@/components/ClusterManagement')
            },
            {
              path: '/Application',
              name: '应用',
              component: () => import('@/components/Application')
            },
            {
              path: '/Stack',
              name: 'Stack',
              component: () => import('@/components/Stack')
            },
            {
              path: '/UserCenter',
              name: '设置',
              component: () => import('@/components/UserCenter')
            }
          ]
        }
      ]
    }
  ]
})
// console.log(routes)
// let innerRoutes = [
//   {
//     path: '/projects',
//     // You could also have named views at tho top
//     component: Projects,
//     children: [
//       {
//         path: '/:id',
//         component: ProjectsDetail
//       },
//       {
//         path: '/',
//         components: ProjectsList
//       }
//     ]
//   }
// ]

// routes = [
//   {
//     path: '/',
//     children: innerRoutes
//   },
//   {
//     path: '/org',
//     children: innerRoutes
//   }
// ]
