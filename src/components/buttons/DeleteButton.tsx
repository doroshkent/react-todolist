import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { RequestStatus } from 'app/app-reducer'

type DeleteButtonProps = {
  entityStatus: RequestStatus
} & IconButtonProps

export const DeleteButton = ({ entityStatus, ...rest }: DeleteButtonProps) => {
  return (
    <Tooltip title={'Remove'}>
      <IconButton disabled={entityStatus === 'loading'} {...rest}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  )
}
