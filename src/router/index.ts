import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/Layout.vue'
import ListEmployee from '../components/ListEmployee.vue'
import FormEmployee from '../components/FormEmployee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutView,
      children: [
        { path: '', component: ListEmployee },
        { path: 'form', component: FormEmployee }
      ]
    }
  ]
})

export default router
