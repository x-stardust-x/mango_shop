import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import Member from '../views/Member.vue'


const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/products', name: 'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/member', name: 'Member', component: Member }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router