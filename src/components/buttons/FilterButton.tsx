import { memo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { FilterValuesType } from 'state/todolists-reducer'

type FilterButtonProps = {
  filter: FilterValuesType
  onClickCallback: (filter: FilterValuesType) => void
  filterName: FilterValuesType
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
