import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Tooltip from '@mui/material/Tooltip'

export const DeleteButton = (props: IconButtonProps) => {
  return (
    <Tooltip title={'Remove'}>
      <IconButton {...props}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  )
}
