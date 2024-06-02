import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'


import Root from './Root.jsx'
import Auth from './components/Auth.jsx'
import Home from './components/Home.jsx'
import SinglePost from './components/SinglePost.jsx'
import SingleCommunity from './components/SingleCommunity.jsx'

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
      },
      {
        path: 'communities/:communityId',
        element: <SingleCommunity />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
