import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'

//Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

import Signup from './pages/Auth/Signup.jsx'
import Login from './pages/Auth/Login.jsx'
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        
        <Route path = '/' element ={<App/>}>
        <Route path='/login' element = {<Login/>}/>
        <Route path = '/Signup' element = {<Signup/>}/>

        <Route path = '' element = {<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute/>}>
            <Route path='userList' element= {<UserList/>}/>
        </Route>
        </Route>
      
    )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store} >
   <RouterProvider router ={router}/>
   </Provider>
  
)
