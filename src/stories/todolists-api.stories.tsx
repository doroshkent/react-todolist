import React, { useEffect, useState } from 'react'
import { todolistsApi } from "api/todolists-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [ state, setState ] = useState<any>( null )
  useEffect( () => {
    todolistsApi.getTodolists()
      .then( (res) => {
        console.log(res)
        setState( res.data )
      } )
  }, [] )
  return <div>{ JSON.stringify( state ) }</div>
}
export const CreateTodolist = () => {
  const [ state, setState ] = useState<any>( null )
  useEffect( () => {

    const title = "refactoring"
    todolistsApi.createTodolist( title )
      .then( (res) => {
        setState( res.data )
      } )
  }, [] )

  return <div>{ JSON.stringify( state ) }</div>
}
export const DeleteTodolist = () => {
  const [ state, setState ] = useState<any>( null )
  useEffect( () => {
    const id = "b979e852-e13d-41ba-9533-f15e069f2631";
    todolistsApi.deleteTodolist( id )
      .then( (res) => setState( res.data ) )
  }, [] )

  return <div>{ JSON.stringify( state ) }</div>
}
export const UpdateTodolistTitle = () => {
  const [ state, setState ] = useState<any>( null );
  useEffect( () => {
    const id = "b979e852-e13d-41ba-9533-f15e069f2631"
    const title = "rename refactoring"
      todolistsApi.updateTodolistTitle(id, title)
      .then( (res) => {
        setState( res.data )
      } )
  }, [] )

  return <div>{ JSON.stringify( state ) }</div>
}
