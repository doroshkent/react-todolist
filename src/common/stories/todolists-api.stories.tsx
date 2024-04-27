import React, { useEffect, useState } from 'react'
import { todolistsApi } from 'features/todolists'
import { TASK_PRIORITIES, TASK_STATUSES } from '../enums'
import { tasksApi, UpdateApiTaskModel } from 'features/tasks'

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
    todolistsApi.deleteTodolist({ id }).then((res) => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b979e852-e13d-41ba-9533-f15e069f2631'
    const title = 'rename refactoring'
    todolistsApi.renameTodolist({ id, title }).then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b6cd041e-0116-4942-b149-8f00aa06f5e6'
    tasksApi.getTasks(id).then((res) => {
      setState(res.data.items.map((i) => `${i.title} ${i.id}`))
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'b6cd041e-0116-4942-b149-8f00aa06f5e6'
    tasksApi.createTask({ todolistId: id, title: 'smth new' }).then((res) => {
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
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
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
    const model: UpdateApiTaskModel = {
      title,
      status: TASK_STATUSES.New,
      deadline: null,
      startDate: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
    }
    tasksApi.updateTask({ todolistId, taskId, model }).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
