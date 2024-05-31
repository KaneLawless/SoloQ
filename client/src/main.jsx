import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import Root from './Root.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: []
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
