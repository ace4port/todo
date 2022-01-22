import { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import TodoColumn from './Todo'
import initialData from './initialData'

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

  false && setColumnOrder()
  return (
    <Main>
      <Heading>Todo list with drag and drop</Heading>

      <DragDropContext onDragEnd={drag}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId]
          const task = column.taskIds.map((taskId) => tasks.find((task) => task.id === taskId))
          return (
            <TodoColumn
              key={columnId}
              order={columnOrder}
              column={column}
              tasks={task}
              setTasks={setTasks}
              columns={columns}
              setColumn={setColumns}
            />
          )
        })}
      </DragDropContext>
    </Main>
  )
}

export default App

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
