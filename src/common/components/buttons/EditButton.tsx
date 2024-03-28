import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'

export const EditButton = (props: IconButtonProps) => {
  return (
    <Tooltip title={'Edit'} arrow>
      <IconButton {...props}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}
