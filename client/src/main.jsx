import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


import Root from './Root.jsx'
import Auth from './components/Auth.jsx'
import Home from './components/Home.jsx'
import SinglePost from './components/SinglePost.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'Auth',
        element: <Auth />
      },
      {
        path: '',
        element: <Home />
      },
      {
        path: 'posts/:postId',
        element: <SinglePost />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
