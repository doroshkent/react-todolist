import { Route, Routes } from 'react-router-dom'
import { Todolists } from 'features/todolists/Todolists'
import { Login } from 'features/login/Login'
import { Error404 } from 'components/error404/Error404'
import React from 'react'

export const Pages = () => {
  return (
    <Routes>
      <Route path="" element={<Todolists />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
