import VueRouter from 'vue-router'

import MainPage from '../pages/MainPage'
import DepartmentsLayout from '../pages/DepartmentsLayout'
import AllDepartmentsPage from '../pages/AllDepartmentsPage'
import DepartmentPage from '../pages/DepartmentPage'
import EditUserPage from '../pages/EditUserPage'
import EditDevicePage from '../pages/EditDevicePage'

import CreateDevice from '../pages/CreateDevice'
import CreateDepartment from '../pages/CreateDepartment'
import RegisterPage from '../pages/RegisterPage'

import LoginPage from '../pages/LoginPage'

import AdminPage from '../pages/AdminPage'

import NotFound from '../pages/404'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: AdminPage
    },
    {
      path: '/createUser',
      name: 'createUser',
      component: RegisterPage
    },
    {
      path: '/editUser',
      name: 'editUser',
      component: EditUserPage
    },
    {
      path: '/editDevice',
      name: 'editDevice',
      component: EditDevicePage
    },
    {
      path: '/createDevice',
      name: 'createDevice',
      component: CreateDevice
    },
    {
      path: '/createDepartment',
      name: 'createDepartment',
      component: CreateDepartment
    },
    {
      path: '/departments',
      name: 'departmentsLayout',
      component: DepartmentsLayout,
      children: [
        {
          path: '',
          name: 'departments',
          component: AllDepartmentsPage
        },
        {
          path: ':id',
          name: 'departmentPage',
          component: DepartmentPage,
        },
        {
          path: '*/*',
          redirect: { name: 'login' }
        },
    ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
  ]
})

//navigation guard
// if not authenticated redirect to 'login'
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('jwt')
//   if (to.name !== 'login' && to.name !== 'main' && !isAuthenticated) next({ name: 'login' })
//   else next()
// })

export default router