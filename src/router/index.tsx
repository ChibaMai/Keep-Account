import React from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

// 路由懒加载，配合 App.tsx 的 Suspense
// const Layout = React.lazy(() => import('@/pages/layout/Index'))
// const Count = React.lazy(() => import('@/pages/count/Index'))
// const Home = React.lazy(() => import('@/pages//home/Index'))
// const Record = React.lazy(() => import('@/pages/record/Index'))
// const User = React.lazy(() => import('@/pages/user/Index'))
// const Login = React.lazy(() => import('@/pages/login/Index'))
// const NotFound = React.lazy(() => import('@/pages/NotFound/Index'))

// 组件
import Layout from '@/pages/layout/Index'
import Count from '@/pages/count/Index'
import Home from '@/pages/home/Index'
import Record from '@/pages/record/Index'
import User from '@/pages/user/Index'
import NotFound from '@/pages/NotFound/Index'
import Login from '@/pages/login/Index'

const routerMap: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/count',
        element: <Count />
      },
      {
        path: '/record',
        element: <Record />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]

export default routerMap
