import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    props:true, 
    name:'home',
    component: () => import('../views/index.vue')
  },
  {
    path: '/Classify',
    name:'classify',
    component: () => import('../views/classify.vue')
  },
  {
    path: '/shoppcart',
    name:'shoppcart',
    component: () => import('../views/shoppcart.vue')
  },
  {
    path: '/me',
    name:'me',
    props:true,
    component: () => import('../views/Me.vue')
  },
  {
    path:'/prolist/:kw',
    name:"prolist",
    component:()=>import('../views/productList.vue')
  },
  {
    path:'/details/:pid',
    props:true,
    name:'details',
    component:()=>import('../views/details.vue')
  },
  {
    path:'/sign',
    component:()=>import('../views/Sign.vue')
  },
  {
    path:'/login',
    component:()=>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
