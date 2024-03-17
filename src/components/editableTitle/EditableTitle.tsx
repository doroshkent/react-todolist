import { EditItemField } from 'components/editItemField/EditItemField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useCallback, useState } from 'react'
import { RequestStatus } from 'app/app-reducer'

type EditableTitleProps = {
  renameItemCallback: (title: string) => void
  entityStatus: RequestStatus
  title: string
}

export const EditableTitle = ({ renameItemCallback, entityStatus, title }: EditableTitleProps) => {
  const [titleEditMode, setTitleEditMode] = useState(false)
  const toggleTitleEditMode = useCallback(
    (toggleValue: boolean) => {
      if (entityStatus === 'loading') return
      setTitleEditMode(toggleValue)
    },
    [entityStatus]
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
