import React from 'react'
import { AppBar, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { AddItemForm } from 'components/addItemForm/AddItemForm'
import LoginIcon from '@mui/icons-material/Login'
import { useHeader } from 'widgets/header/useHeader'

export const Header = () => {
  const { onTodolistAdded, status, onLogout, isLoggedIn } = useHeader()

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid>
            {isLoggedIn && <AddItemForm disabled={status === 'loading'} addItem={onTodolistAdded} item="todolist" />}
          </Grid>
          <Grid>
            <Typography variant="h4" component="div" marginRight={isLoggedIn ? '150px' : '0'}>
              {isLoggedIn ? 'Tasks Board' : 'Welcome!'}
            </Typography>
          </Grid>
          <Grid>
            {isLoggedIn && (
              <IconButton color="inherit" sx={{ marginLeft: 'auto' }} onClick={onLogout}>
                <LoginIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
