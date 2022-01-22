import { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Todo from './Todo'
import initialData from './initialData'
import { Card, Scroll } from './TodoList'

const App = () => {
  const [tasks, setTasks] = useState(initialData.tasks)
  const [columns, setColumns] = useState(initialData.columns)
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder)

  const drag = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const selected_column = columns[source.droppableId]
    const newTasks = [...selected_column.taskIds]
    newTasks.splice(source.index, 1)
    newTasks.splice(destination.index, 0, draggableId)
    const newColumn = { ...selected_column, taskIds: newTasks }

    setColumns({ ...columns, [newColumn.id]: newColumn })
  }

  return (
    <Main>
      <Heading>Todo list with drag and drop</Heading>

      <DragDropContext onDragEnd={drag}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId]
          const task = column.taskIds.map((taskId) => tasks[taskId])
          return <Column key={columnId} order={columnOrder} column={column} tasks={task} />
        })}
      </DragDropContext>
      <Todo />
    </Main>
  )
}

export default App

const Column = ({ column, tasks }) => {
  return (
    <Clm>
      <h2>{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <Scroll ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={task.id} index={index} task={task} />
            ))}
            {provided.placeholder}
          </Scroll>
        )}
      </Droppable>
    </Clm>
  )
}

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <label>
            {/* <input type='checkbox' checked={task.complete} /> */}
            {task.content}
          </label>
        </Card>
      )}
    </Draggable>
  )
}

const Main = styled.main`
  font: 16px 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 18px);
  margin: 0;
  padding: 0;
  background-color: #d5d5d5;
`

const Heading = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
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
`
