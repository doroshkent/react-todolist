import { memo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { FilterValues } from 'features/todolists/todolistsSlice'

type FilterButtonProps = {
  filter: FilterValues
  onClickCallback: (filter: FilterValues) => void
  filterName: FilterValues
} & ButtonProps

export const FilterButton = memo(({ filterName, filter, onClickCallback, ...rest }: FilterButtonProps) => {
  return (
    <Button
      variant={filter === filterName ? 'contained' : 'outlined'}
      onClick={() => onClickCallback(filterName)}
      {...rest}>
      {filterName}
    </Button>
  )
})
