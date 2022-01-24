import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Scroll, Clm, Button, AddTodo, Item } from './components'

const TodoColumn = ({ column, columns, tasks, taskList, setTasks, setColumn, index }) => {
  const [newTask, setNewTask] = useState('')

  function toggleTask(id) {
    const newTasks = [...taskList]
    const task = newTasks.find((task) => task.id === id)
    task.complete = !task.complete
    setTasks([...newTasks])
  }

  function handleAddTodo(e) {
    e.preventDefault()
    const newId = uuidv4()
    setTasks([...taskList, { id: newId, content: newTask, complete: false }])
    setColumn({ ...columns, [column.id]: { ...column, taskIds: [...column.taskIds, newId] } })
    setNewTask('')
  }

  function handleClearTasks() {
    if (window.confirm('This will clear all completed tasks')) {
      const newTasks = tasks.filter((task) => !task.complete)
      setTasks([...taskList, newTasks])
      setColumn({ ...columns, [column.id]: { ...column, taskIds: newTasks.map((task) => task.id) } })
    }
  }

  const complete = tasks.length - tasks.filter((task) => !task.complete).length

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Clm {...provided.draggableProps} ref={provided.innerRef}>
          <h2 {...provided.dragHandleProps}>
            {column.title} <em>{tasks.length}</em>
          </h2>
          <Droppable droppableId={column.id}>
            {(provided) => (
              <Scroll ref={provided.innerRef} {...provided.droppableProps}>
                {!tasks.length ? (
                  <h4>No tasks here ... </h4>
                ) : (
                  tasks.map((task, index) => <Task key={task.id} index={index} task={task} toggleTask={toggleTask} />)
                )}
                {provided.placeholder}
              </Scroll>
            )}
          </Droppable>

          <div className='bot'>
            <AddTodo>
              <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='New Todo' type='text' />
            </AddTodo>
            <Button type='submit' onClick={handleAddTodo}>
              Add Todo
            </Button>
            {complete ? (
              <Button onClick={handleClearTasks} style={{ backgroundColor: 'maroon' }}>
                Delete {tasks.length - tasks.filter((task) => !task.complete).length} Complete tasks
              </Button>
            ) : (
              complete + ' tasks completed'
            )}
          </div>
        </Clm>
      )}
    </Draggable>
  )
}

export default TodoColumn

const Task = ({ task, index, toggleTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Item {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <label className={task.complete ? 'checked' : null}>
            <input type='checkbox' checked={task.complete} onChange={() => toggleTask(task.id)} />
            {task.content}
          </label>
        </Item>
      )}
    </Draggable>
  )
}
