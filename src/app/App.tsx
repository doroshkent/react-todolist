import React, { useEffect } from 'react'
import 'app/App.css'
import Box from '@mui/material/Box'
import { Header } from 'widgets/header/Header'
import { Todolists } from 'features/todolists/Todolists'
import { ErrorSnackbar } from 'components/errorSnackbar/ErrorSnackbar'
import { Route, Routes } from 'react-router-dom'
import { Login } from 'features/login/Login'
import { Error404 } from 'components/error404/Error404'
import { useAppDispatch, useAppSelector } from 'state/store'
import { me } from 'state/auth-reducer'
import { InitializeProgress } from 'components/InitializeProgress'

export type ItemsType = 'todolist' | 'task'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  useEffect(() => {
    dispatch(me())
  }, [])

  if (!isInitialized) {
    return <InitializeProgress />
  }

  return (
    <Box width="100%" minHeight="100vh" sx={{ backgroundColor: '#f5f5f5' }}>
      <Header />
      <Routes>
        <Route path="" element={<Todolists />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ErrorSnackbar />
    </Box>
  )
}

export default App
