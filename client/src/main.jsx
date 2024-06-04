import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './styles/main.scss'

import Root from './Root.jsx'
import Home from './components/Home.jsx'
import SinglePost from './components/SinglePost.jsx'
import SingleCommunity from './components/SingleCommunity.jsx'
import CreatePost from './components/CreatePost.jsx'
import EditPost from './components/EditPost.jsx'
import Search from './components/Search.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
      },
      {
        path: 'create-post',
        element: <CreatePost />
      },
      {
        path: 'edit-post/:postId',
        element: <EditPost />
      },
      {
        path: 'search/:query',
        element: <Search />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
