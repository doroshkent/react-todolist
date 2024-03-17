import React, { memo } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Todolist } from 'features/todolists/todolist/Todolist'
import { useTodolists } from 'features/todolists/useTodolists'
import { Navigate } from 'react-router-dom'
import { PATH } from 'app/pages/Pages'
import { NoItemsPrompt } from 'components/NoItemsPrompt'

export const Todolists = memo(() => {
  const { todolists, isLoggedIn } = useTodolists()

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
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
        <NoItemsPrompt item={'todolist'} />
      )}
    </Container>
  )
})
