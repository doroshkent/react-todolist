import Button, { ButtonProps } from '@mui/material/Button'
import { Filter } from 'features/todolists'

type Props = {
  filter: Filter
  onClickCallback: (filter: Filter) => void
  filterName: Filter
} & ButtonProps

export const FilterButton = ({ filterName, filter, onClickCallback, ...rest }: Props) => {
  return (
    <Button
      variant={filter === filterName ? 'contained' : 'outlined'}
      onClick={() => onClickCallback(filterName)}
      {...rest}>
      {filterName}
    </Button>
  )
}
