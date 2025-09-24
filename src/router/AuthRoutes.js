import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
//import Login from '../views/pages/login/Login'
const Login = lazy(() => import('../views/pages/login/Login'));
export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path='/*' element={<Navigate to="/login"/> }/>
    </Routes>
  )
}
