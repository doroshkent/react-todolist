import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from 'state/store';
import { getTodolists, TodoListStateType } from 'state/todolistsReducer';

export const useTodolists = () => {
  const todolists = useSelector<AppRootStateType, TodoListStateType>(state => state.todolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodolists());
  }, [dispatch]);

  return todolists;
};
