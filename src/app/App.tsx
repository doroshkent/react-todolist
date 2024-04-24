import React from 'react'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { ErrorSnackbar, InitializeProgress } from 'common/components'
import { Header } from 'widgets/header'
import { Pages } from 'pages'
import { useApp } from './useApp'

export function App() {
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

const AppContainer = styled(Box)`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
`
