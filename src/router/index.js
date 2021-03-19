import Vue from 'vue'
import VueRouter from 'vue-router'
import allList from '../components/allList.vue'
import activedList from '../components/activedList.vue'
import completedList from '../components/completedList.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: allList
}, {
  path: '/all',
  component: allList
}, {
  path: '/actived',
  component: activedList
}, {
  path: '/completed',
  component: completedList
}]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
