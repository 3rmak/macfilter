import VueRouter from 'vue-router'

import MainPage from '../pages/MainPage'
import DepartmentsLayout from '../pages/DepartmentsLayout'
import AllDepartmentsPage from '../pages/AllDepartmentsPage'
import DepartmentPage from '../pages/DepartmentPage'

import CreateDevice from '../pages/CreateDevice'
import CreateDepartment from '../pages/CreateDepartment'
import RegisterPage from '../pages/RegisterPage'

import LoginPage from '../pages/LoginPage'

import AdminPage from '../pages/AdminPage'

import NotFound from '../pages/404'
// import AllFilmsPage from '../pages/AllFilmsPage'
// import FilmPage from '../pages/FilmPage'

// import FilmsLayout from '../pages/FilmsLayout'

export default new VueRouter({
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
          // beforeEnter: (to, from, next) => {
          //   if(localStorage.getItem('auth')) {
          //     next()
          //   } else {
          //     next({ name: 'departments' })
          //   }
          // }
        },
        {
          path: '*/*',
          redirect: { name: 'login' }
        },
    ]
    },
    
    // {
    //   path: '/films',
    //   name: 'filmsLayout',
    //   component: FilmsLayout,
    //   children: [
    //     {
    //       path: '',
    //       name: 'films',
    //       component: AllFilmsPage
    //     },
    //     {
    //       path: ':id',
    //       name: 'filmPage',
    //       component: FilmPage,
    //       beforeEnter: (to, from, next) => {
    //         if(localStorage.getItem('auth')) {
    //           next()
    //         } else {
    //           next({ name: 'films' })
    //         }
    //       }
    //     },
    //     {
    //       path: '*/*',
    //       redirect: { name: 'films' }
    //     },
    //   ]
    // },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
  ]
})