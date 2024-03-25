import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom'
import Home from './pages/Home'
import AddEmployee from './pages/AddEmployee'
import GetProduct from './pages/GetProduct'
import AddProducts from './pages/AddProducts'
import Header from './pages/First_Pages'
import Admin from './pages/Admin'
import UpdateProvider from './pages/UpdateProvider'
import UpdateProduct from './pages/UpdateProduct'
import App from './Captha/App'
import { createContext, useState } from 'react'
import Authorization from './pages/Authorization'
import PrivateRoute from './pages/PrivateRoute'
import Thanks from './pages/Thanks'
import GetProd from './pages/GetProd'

export const AuthContext = createContext({
  isAuthenticated: false,
  setAuth: () => {}
});

function AppProvider() {
  const [isAuthenticated, setAuth] = useState(false);
  
  return (

    <Router>
      <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
        <Routes>
          
            <Route  path='/' element={<Header />} />
            <Route  path='/login' element={<Authorization />} />
            <Route path='/captha' element={<App />} />          
            <Route path='/thanks' element={<Thanks/>} />
            <Route path='/add_provider' element={<AddEmployee />} />
            
            <Route path='/add_product' element={<AddProducts />} />
            
            <Route element={<PrivateRoute />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/get_product' element={<GetProduct/>} />
              <Route path='/admin/get_provider' element={<Home/>} />
              <Route path='/admin/get_provider/get_product/:provider_id' element={<GetProd/>} />
              <Route path='/update_provider/:provider_id' element={ <UpdateProvider /> } />
              <Route path='/update_product/:element_id' element={ <UpdateProduct /> } />
            </Route>
          
        </Routes>
      </AuthContext.Provider>
    </Router>

  )
}

export default AppProvider
