import React from 'react'
import { Header } from 'widgets/header/Header'
import { ErrorSnackbar } from 'components/errorSnackbar/ErrorSnackbar'
import { InitializeProgress } from 'components/InitializeProgress'
import { useApp } from 'app/useApp'
import { Pages } from 'app/pages/Pages'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'

function App() {
  const { isInitialized } = useApp()

  if (!isInitialized) {
    return <InitializeProgress />
  }

  return (
    <AppContainer>
      <Header />
      <Pages />
      <ErrorSnackbar />
    </AppContainer>
  )
}

export default App

const AppContainer = styled(Box)`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
`

// types
export type ItemsType = 'todolist' | 'task'
