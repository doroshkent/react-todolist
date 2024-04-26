import React from 'react'
import { AddItemForm } from 'common/components'
import { useHeader } from './useHeader'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login'

export const Header = () => {
  const { onTodolistAdded, status, onLogout, isLoggedIn } = useHeader()

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid>{isLoggedIn && <AddItemForm addItem={onTodolistAdded} item="todolist" />}</Grid>
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
