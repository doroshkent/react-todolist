import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getTodolists, TodolistDomainType } from 'state/todolists-reducer'

export const useTodolists = () => {
  const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getTodolists())
  }, [])

  return { todolists, isLoggedIn }
}
