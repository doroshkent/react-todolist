import React, { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from 'pages'
import { NoItemsPrompt } from 'common/components'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useTodolists } from 'features/todolists/lib/useTodolists'
import { Todolist } from 'features/todolists/todolist/Todolist'

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
