import React from 'react'
import styled from 'styled-components'

export default function TodoList({ todos, toggleTodo }) {
  return (
    <Scroll>
      {todos.map((todo) => (
        <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
      ))}
    </Scroll>
  )
}

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <Card>
      <label onClick={handleTodoClick} className={todo.complete ? 'checked' : null}>
        <input type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
        {/* <input type='checkbox' checked={todo.complete} /> */}
        {todo.name}
      </label>
    </Card>
  )
}

const Card = styled.div`
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;

  background-color: white;
  width: 300px;
  margin: 0.5rem 0;

  label {
    border-radius: 3px;
    display: block;
    padding: 10px;
    color: white;
    background-color: #7600e6;
    transition: all 0.5s ease-in-out;
  }
  .checked {
    color: #7600e6;
    background-color: #7600e602;
    text-decoration: line-through;
  }
`

const Scroll = styled.div`
  padding 1rem 0.3rem 1rem 0;
  overflow-y: auto;
  max-height: calc(100vh - 25rem);
`
