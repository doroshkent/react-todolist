import React, { useCallback, useState } from 'react'
import { RequestStatus } from '../../types'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { EditItemField } from '../editItemField/EditItemField'

type EditableTitleProps = {
  renameItemCallback: (title: string) => void
  fetchStatus: RequestStatus
  title: string
}

export const EditableTitle = ({ renameItemCallback, fetchStatus, title }: EditableTitleProps) => {
  const [titleEditMode, setTitleEditMode] = useState(false)
  const toggleTitleEditMode = useCallback(
    (toggleValue: boolean) => {
      if (fetchStatus === 'loading') return
      setTitleEditMode(toggleValue)
    },
    [fetchStatus]
  )

  return (
    <>
      {titleEditMode ? (
        <EditItemField title={title} renameItem={renameItemCallback} toggleEditMode={toggleTitleEditMode} />
      ) : (
        <Tooltip title={'Double click to rename'}>
          <Typography
            variant={'h5'}
            onDoubleClick={() => toggleTitleEditMode(true)}
            sx={{ cursor: 'pointer', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {title}
          </Typography>
        </Tooltip>
      )}
    </>
  )
}
