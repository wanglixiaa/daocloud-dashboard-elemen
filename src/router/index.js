import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Content from '@/components/Content'

// import ViewDetails from '@/components/signin'

import menus from '@/config/personal-menu-config'

Vue.use(Router)

var routes = []

// menus.forEach((item) => {
//   item.sub.forEach((sub) => {
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
menus.forEach(item => {
  item.sub.forEach(sub => {
    let children = []
    if (sub.children) {
      sub.children.forEach(child => {
        children.push({
          path: `/${sub.componentName}/${child.componentName}`,
          name: child.name,
          component: () => import(`@/components/${child.componentName}`)
        })
      })
    }

    routes.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`),
      children: children
    })
  })
})

console.log(routes)

// export default new Router({routes})

// const routers = new Router({
//   mode: 'history',
//   linkActiveClass: 'active',
//   routers: [
//     {
//       path: '/login',
//       component: Login
//     }
//   ]
// })
// const routers = [
//   {
//     path: '/login',
//     component: Login,
//     name: 'login'
//   }
// ]
// export default new Router({routers})
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/content',
      name: '内容',
      component: Content,
      children: routes
      // children: [
      //   {
      //     path: '/buildFlows',
      //     name: '项目',
      //     component: buildFlows
      //   }
      // ]
    }
  ]
})
