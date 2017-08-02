import Vue from 'vue'
import Router from 'vue-router'
import Topography from '@/components/topography'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/topography'
    },
    {
      path: '/topography',
      name: 'topography',
      component: Topography
    }
  ]
})
