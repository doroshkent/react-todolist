import React from 'react'
import { Controller } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useLogin } from 'features/auth/lib/useLogin'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export const Login = () => {
  const { isLoggedIn, onLogin, handleSubmit, errors, register, control, watch } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'} minHeight={'500px'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel focused={false}>
            <p>
              To log in get registered&nbsp;
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={handleSubmit(onLogin)}>
            <FormGroup>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={errors.email?.message || 'Email'}
                    margin="normal"
                    error={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Incorrect email address',
                      },
                    })}
                  />
                )}
                control={control}
                name="email"
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label={errors.password?.message || 'Password'}
                    margin="normal"
                    error={!!errors.password}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 4,
                        message: 'Password is too short',
                      },
                    })}
                  />
                )}
                control={control}
                name="password"
              />

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox checked={watch('rememberMe')} {...register('rememberMe')} />}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
