import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { App, store } from 'app'
import { ThemeProvider } from '@mui/material'
import { GlobalStyle, theme } from 'styles'
import { Login } from 'features/login'

// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <App />,
//     },
//     {
//       path: '/login',
//       element: <Login />,
//     },
//   ],
//   {
//     basename: '/react-todolist',
//   }
// )
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
//
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// )
//
// reportWebVitals()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter basename="react-todolist">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
