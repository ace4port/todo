import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
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
    <>
      <h3 class='item'>Add items, remove and clear</h3>
      <div className='container'>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type='text' />
        <br />
        <button onClick={handleAddTodo} className='btn'>
          Add Todo
        </button>
        <button onClick={handleClearTodos} className='btn'>
          Clear Complete
        </button>
        <div className='item'>{todos.filter((todo) => !todo.complete).length} left to do</div>
      </div>
    </>
  )
}

export default App
