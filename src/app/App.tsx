import React from 'react'
import { S } from 'app/App_Styles'
import { Header } from 'widgets/header/Header'
import { ErrorSnackbar } from 'components/errorSnackbar/ErrorSnackbar'
import { InitializeProgress } from 'components/InitializeProgress'
import { useApp } from 'app/useApp'
import { Pages } from 'app/pages/Pages'

function App() {
  const { isInitialized } = useApp()

  if (!isInitialized) {
    return <InitializeProgress />
  }

  return (
    <S.AppContainer>
      <Header />
      <Pages />
      <ErrorSnackbar />
    </S.AppContainer>
  )
}

export default App

// types
export type ItemsType = 'todolist' | 'task'
