import React, { useEffect, useState } from 'react'
import { TaskPriorities, TaskStatuses, todolistsApi, UpdateTaskModel } from 'features/todolists/todolists-api'

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setState(res.data.map((i) => `${i.title} ${i.id}`))
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'refactoring'
    todolistsApi.createTodolist(title).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = '6a0692fc-69c0-4899-8044-4b11702910ec'
    todolistsApi.deleteTodolist(id).then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b979e852-e13d-41ba-9533-f15e069f2631'
    const title = 'rename refactoring'
    todolistsApi.updateTodolistTitle(id, title).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b6cd041e-0116-4942-b149-8f00aa06f5e6'
    todolistsApi.getTasks(id).then((res) => {
      setState(res.data.items.map((i) => `${i.title} ${i.id}`))
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b6cd041e-0116-4942-b149-8f00aa06f5e6'
    todolistsApi.createTask(id, 'smth new').then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'b6cd041e-0116-4942-b149-8f00aa06f5e6'
    const taskId = 'cd21f8af-68d7-4800-9ed7-7c2ef9adc891'
    todolistsApi.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'a3a8cf4c-757a-4ecf-8a3f-0e62e7f8810d'
    const taskId = 'c4fbd0ce-a1f3-40e4-850e-13387f3a8b38'
    const title = 'feeling well'
    const model: UpdateTaskModel = {
      title,
      status: TaskStatuses.New,
      deadline: '',
      startDate: '',
      description: '',
      priority: TaskPriorities.Low,
    }
    todolistsApi.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
