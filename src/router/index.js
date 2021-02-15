import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Home from '@/components/Home'

Vue.use(Router)

const loadView = view => () => import(`@/components/${view}.vue`)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: loadView('home')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: loadView('tasks')
    },
    {
      path: '/logs',
      name: 'logs',
      component: loadView('logs')
    },
    {
      path: '/tools',
      name: 'tools',
      component: loadView('tools')
    }
  ]
})
