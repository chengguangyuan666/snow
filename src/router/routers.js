import Home from '@/views/page/home'
import demo from './group/demo'
// import system from './group/system'

const base = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  // {
  //   path: '/juejin/label',
  //   name: 'aaa',
  //   component: () => import('@/views/page/juejin/element-label')
  // }
]
base.push.apply(base, demo)
// base[0].children.push.apply(base[0].children, system)
export default base
