import Vue from 'vue'
import Router from 'vue-router'

//Components
import Home from '@/pages/home'
import Topography from '@/components/topography'
import ProjectNav from '@/components/project-nav/project-nav'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Project Nav',
      component: ProjectNav
    },
    { 
      path: '*', 
      redirect: { name: 'Project Nav' } 
    }
  ]
})
