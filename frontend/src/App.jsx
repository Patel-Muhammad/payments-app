import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Guest from './pages/Guest'
import { ToastContainer } from "react-toastify";
import { useEffect } from 'react'



function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if(token) {
      return 'true'
    }
    else {
      return 'false'
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={isAuthenticated()? '/dashboard' : '/signup'} />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/sendmoney' element={<SendMoney/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='guest' element={< Guest />}/>
      </Routes>
      <div>  <ToastContainer position="top-right" /></div>
    </BrowserRouter>
  )
}

export default App
