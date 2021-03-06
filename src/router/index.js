import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import AddProductPage from '../views/AddProductPage'
import EditProductPage from '../views/EditProductPage'
import MainPage from '../views/MainPage'
import ProductsTabel from '../components/ProductsTabel'
import NotFound from '../views/NotFound'
import AddBannerPage from '../views/AddBannerPage'
import EditBannerPage from '../views/EditBannerPage'
import BannersTabel from '../components/BannersTabel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'ProductsTabel',
        component: ProductsTabel
      },
      {
        path: 'add',
        name: 'AddProductPage',
        component: AddProductPage
      },
      {
        path: 'edit/:idProduct',
        name: 'EditProductPage',
        component: EditProductPage
      },

      {
        path: 'banners',
        name: 'BannersTabel',
        component: BannersTabel
      },
      {
        path: 'banners/add',
        name: 'AddBannerPage',
        component: AddBannerPage
      },
      {
        path: 'banners/edit/:idBanner',
        name: 'EditBannerPage',
        component: EditBannerPage
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if (to.name !== 'LoginPage' && !isAuthenticated) {
    next({ name: 'LoginPage' })
  } else if (to.name === 'LoginPage' && isAuthenticated) {
    next({ name: 'MainPage' })
  } else {
    next()
  }
})
export default router
