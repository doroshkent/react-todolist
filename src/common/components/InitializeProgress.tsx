import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'

export const InitializeProgress = () => {
  return (
    <ProgressContainer>
      <CircularProgress />
    </ProgressContainer>
  )
}

const ProgressContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
