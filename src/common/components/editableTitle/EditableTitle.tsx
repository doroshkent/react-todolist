import React, { useState } from 'react'
import { RequestStatus } from '../../types'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { EditItemField } from 'common/components/editItemField/ui/EditItemField'

type Props = {
  renameItemCallback: (title: string) => Promise<unknown>
  fetchStatus: RequestStatus
  title: string
}

export const EditableTitle = ({ renameItemCallback, fetchStatus, title }: Props) => {
  const [titleEditMode, setTitleEditMode] = useState(false)
  const toggleTitleEditMode = (toggleValue: boolean) => {
    if (fetchStatus === 'loading') return
    setTitleEditMode(toggleValue)
  }

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
