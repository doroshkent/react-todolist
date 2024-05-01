import Button, { ButtonProps } from '@mui/material/Button'
import { Filter } from 'features/todolists'

export const FilterButton = ({ filterName, filter, onClickCallback, ...rest }: FilterButtonProps) => {
  return (
    <Button
      variant={filter === filterName ? 'contained' : 'outlined'}
      onClick={() => onClickCallback(filterName)}
      {...rest}>
      {filterName}
    </Button>
  )
}

// types
type FilterButtonProps = {
  filter: Filter
  onClickCallback: (filter: Filter) => void
  filterName: Filter
} & ButtonProps
