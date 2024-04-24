import React from 'react'
import error404 from './404.svg'
import { styled } from 'styled-components'

export const Error404 = () => {
  return (
    <Error>
      <ErrorImg src={error404} alt={'404 error'} />
    </Error>
  )
}

const ErrorImg = styled.img`
  width: 451px;
  height: 100%;
`
const Error = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
`
