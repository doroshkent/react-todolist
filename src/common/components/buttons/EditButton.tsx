import { IconButtonProps } from '@mui/material/IconButton'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import React from 'react'

export const EditButton = (props: IconButtonProps) => {
  return (
    <Tooltip title={'Edit'} arrow>
      <IconButton {...props}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}
