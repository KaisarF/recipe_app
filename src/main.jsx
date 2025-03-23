import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RecipePage from './pages/Recipe.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import{ createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:'/', element:<RecipePage/>},
  {path:'/recipe/:id', element:<RecipeDetail/>},
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
