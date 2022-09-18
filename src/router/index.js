import Vue from 'vue'
import Router from 'vue-router'

// import Notebooks from '../components/NotebookList.vue'
// import NoteDetail from '../components/NoteDetail.vue'
// import TrashDetail from '../components/TrashDetail.vue'
// import Login from '../components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component: () => import('../components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('../components/Login')
    },
    {
      path: '/note',
      component: () => import('../components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('../components/TrashDetail.vue')
    }
  ]
})
