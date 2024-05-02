import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from 'widgets/pages'
import { NoItemsPrompt } from 'common/components'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Todolist } from 'features/todolists/ui/todolist/Todolist'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/auth'
import { useActions } from 'common/hooks'
import { selectTodolists } from 'features/todolists/model/todolists-slice'

export const Todolists = () => {
  const todolists = useSelector(selectTodolists)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { fetchTodolists } = useActions()

  useEffect(() => {
    if (!isLoggedIn) return
    fetchTodolists()
  }, [])

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
                <Todolist todolist={tl} />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <NoItemsPrompt item={'todolist'} />
      )}
    </Container>
  )
}
