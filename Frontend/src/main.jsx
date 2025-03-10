import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import RouteUser from './RouteUser.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <RouteUser />
    </BrowserRouter>
  </>
)
