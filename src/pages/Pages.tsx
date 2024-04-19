import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Todolists } from 'features/todolists'
import { Error404 } from 'common/components'
import { Login } from 'features/auth'

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
