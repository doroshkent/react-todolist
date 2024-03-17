import { Route, Routes } from 'react-router-dom'
import { Todolists } from 'features/todolists/Todolists'
import { Login } from 'features/login/Login'
import { Error404 } from 'components/error404/Error404'
import React from 'react'

export const PATH = {
  LOGIN: '/login',
} as const

export const Pages = () => {
  return (
    <Routes>
      <Route path="" element={<Todolists />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
