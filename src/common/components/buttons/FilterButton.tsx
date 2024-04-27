import { memo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { FilterValues } from 'features/todolists'

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

// types
type FilterButtonProps = {
  filter: FilterValues
  onClickCallback: (filter: FilterValues) => void
  filterName: FilterValues
} & ButtonProps
