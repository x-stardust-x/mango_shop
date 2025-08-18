import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'

import Member from '../views/Member.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Orders from '@/views/Orders.vue'
import Accounts from '@/views/Accounts.vue'

//之後新增admin介面/admin/

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/products', name: 'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/member', name: 'Member', component: Member ,meta: {requiresAuth: true}},
  { path: '/admin/login', name: 'Login', component: Login},
  { path: '/admin/register', name: 'Register', component: Register},
  { path: "/admin/orders", name:'Orders', component: Orders },
  { path: "/admin/accounts", name:'Accounts', component: Accounts },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 等做好登入
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token') // 有 token 就視為登入

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('admin/login') // 未登入，導向 login
  } else {
    next() // 放行
  }
})

export default router