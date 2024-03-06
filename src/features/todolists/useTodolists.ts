import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'state/store';
import { getTodolists, TodolistDomainType } from 'state/todolists-reducer';

export const useTodolists = () => {
  const todolists = useAppSelector<TodolistDomainType[]>( state => state.todolists );
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch( getTodolists() );
  }, [] );

  return todolists;
};
