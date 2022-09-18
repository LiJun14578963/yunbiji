import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Notebooks from '../components/NotebookList.vue'
import NoteDetail from '../components/NoteDetail.vue'
import TrashDetail from '../components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',
      component: Notebooks
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }
  ]
})
