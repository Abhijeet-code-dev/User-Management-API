import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './pages/Auth/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
 

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App
