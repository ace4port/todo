import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, Scroll } from './TodoList'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const TodoColumn = ({ column, columns, tasks, setTasks, setColumn }) => {
  const [newTask, setNewTask] = useState('')

  // TODO: load from local storage
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   if (storedTodos) setTasks(storedTodos)
  // }, [setTasks])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function toggleTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find((task) => task.id === id)
    task.complete = !task.complete
    setTasks([...newTasks])
  }

  function handleAddTodo(e) {
    e.preventDefault()
    const newId = uuidv4()
    setTasks([...tasks, { id: newId, content: newTask, complete: false }])
    setColumn({ ...columns, [column.id]: { ...column, taskIds: [newId, ...column.taskIds] } })
    setNewTask('')
  }

  function handleClearTasks() {
    if (window.confirm('This will clear all completed tasks')) {
      const newTasks = tasks.filter((task) => !task.complete)
      setTasks(newTasks)
      setColumn({ ...columns, [column.id]: { ...column, taskIds: newTasks.map((task) => task.id) } })
    }
  }

  return (
    <Clm>
      <h2>{column.title}</h2>
      <Container>
        <AddTodo>
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} type='text' />
          <Button type='submit' onClick={handleAddTodo}>
            Add Todo
          </Button>
        </AddTodo>

        <Droppable droppableId={column.id}>
          {(provided) => (
            <Scroll ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task key={task.id} index={index} task={task} toggleTask={toggleTask} />
              ))}
              {provided.placeholder}
            </Scroll>
          )}
        </Droppable>

        <h4>{tasks.filter((task) => !task.complete).length} to-dos remaining</h4>

        <Button onClick={handleClearTasks} className='btn'>
          Clear Complete
        </Button>
      </Container>
    </Clm>
  )
}

export default TodoColumn

const Task = ({ task, index, toggleTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <label>
            <input type='checkbox' checked={task.complete} onChange={() => toggleTask(task.id)} />
            {task.content}
          </label>
        </Card>
      )}
    </Draggable>
  )
}

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

const Clm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
  margin: 0.5rem;

  label {
    cursor: grab;
  }
`
