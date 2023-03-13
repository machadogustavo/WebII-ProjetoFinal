import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Index from './pages/Index'
import Home from './pages/Home'
import Ajuda from './pages/Ajuda'
import NotFound from './pages/NotFound'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, errorElement: <NotFound />, children: [
      {
        path: '/', element: <Index />
      }, {
        path: '/home', element: <Home />
      }, {
        path: '/ajuda', element: <Ajuda />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
