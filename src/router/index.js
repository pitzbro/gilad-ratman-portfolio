import Vue from 'vue'
import Router from 'vue-router'

//Components
import Topography from '@/components/topography'
import ProjectNav from '@/components/project-nav/project-nav'
import Project from '@/components/project'
import Gallery from '@/components/gallery/gallery.vue'

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
      path: '/project/:alias',
      name: 'Project',
      component: Project,
      children: [
        {
          path: 'gallery/:num',
          component: Gallery
        }
      ]
    },
    { 
      path: '*', 
      redirect: { 
        path: '/',
        name: 'Project Nav',
        component: ProjectNav
    } 
    }
  ]
})
