import React, { memo } from 'react'
import { Container, Grid } from '@mui/material'
import { Todolist } from 'features/todolists/todolist/Todolist'
import { useTodolists } from 'features/todolists/useTodolists'
import { Navigate } from 'react-router-dom'

export const Todolists = memo(() => {
  const { todolists, isLoggedIn } = useTodolists()

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Container maxWidth={'xl'} sx={{ marginTop: '15px' }}>
      {todolists.length > 0 ? (
        <Grid container gap={'10px'}>
          {todolists.map((tl) => {
            return (
              <Grid item key={tl.id}>
                <Todolist {...tl} />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <p style={{ fontStyle: 'italic', opacity: '0.5', textAlign: 'center' }}>You have no todolists yet</p>
      )}
    </Container>
  )
})
