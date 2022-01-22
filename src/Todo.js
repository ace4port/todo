import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const Todo = () => {
  const todoNameRef = useRef()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    e.preventDefault()
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <Container>
      <AddTodo>
        <input ref={todoNameRef} type='text' />
        <Button type='submit' onClick={handleAddTodo}>
          Add Todo
        </Button>
      </AddTodo>

      <TodoList todos={todos} toggleTodo={toggleTodo} />

      <h4>{todos.filter((todo) => !todo.complete).length} to-dos remaining</h4>

      <Button onClick={handleClearTodos} className='btn'>
        Clear Complete
      </Button>
    </Container>
  )
}

export default Todo

const Button = styled.button`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  background-color: #e60076;
  color: white;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const AddTodo = styled.form`
  display: flex;
  border-radius: 3px;

  width: 300px;
  margin: 0.5rem 0;

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    // border-radius: 3px;
    flex: 1;
  }
`
