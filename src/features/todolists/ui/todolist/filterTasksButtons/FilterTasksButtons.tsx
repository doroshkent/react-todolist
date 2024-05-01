import React from 'react'
import { FilterButton } from 'common/components'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Filter } from 'features/todolists/model/todolists-slice'
import { useActions } from 'common/hooks'

type Props = {
  id: string
  filter: Filter
}

export const FilterTasksButtons = ({ id, filter }: Props) => {
  const { changeFilter } = useActions()

  const onChangeFilter = (filter: Filter) => {
    changeFilter({ id, filter })
  }

  return (
    <ButtonGroup size={'small'}>
      <FilterButton filter={filter} onClickCallback={onChangeFilter} filterName={'all'} />
      <FilterButton filter={filter} onClickCallback={onChangeFilter} filterName={'active'} />
      <FilterButton filter={filter} onClickCallback={onChangeFilter} filterName={'completed'} />
    </ButtonGroup>
  )
}
