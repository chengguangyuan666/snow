export default [
  {
    path: '/juejin/label',
    name: 'aaa',
    component: () => import('@/views/page/juejin/element-label')
  },
  {
    path: '/text',
    name: 'aaa',
    component: () => import('@/views/page/text/text')
  },
  {
    path: '/pengyouquan',
    name: 'pengyouquan',
    component: () => import('@/views/page/pengyouquan/index')
  }
  // {
  //   path: '/demo/bread',
  //   name: 'bread',
  //   component: () => import('@/views/demo/append-bread-crumb')
  // }
]
