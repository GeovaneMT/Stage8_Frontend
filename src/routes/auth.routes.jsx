import { Routes, Route } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

import { Error404 } from "../pages/Error404"




export function AuthRoutes() {
  
  const user = localStorage.getItem("@RocketNotes:user")

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {!user && <Route path="*" element={<Error404 />} />}
    </Routes>
  )
}