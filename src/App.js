import { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import TodoColumn from './Todo'
import initialData from './initialData'
import { Droppable } from 'react-beautiful-dnd'

const App = () => {
  const [tasks, setTasks] = useState(initialData.tasks)
  const [columns, setColumns] = useState(initialData.columns)
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder)

  const drag = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'column') {
      const newColumnOrder = [...columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      setColumnOrder(newColumnOrder)
      return
    }

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
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <FlexContainer {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId]
                return (
                  <InnerColumn
                    key={column.id}
                    column={column}
                    index={index}
                    tasks={tasks}
                    setTasks={setTasks}
                    columns={columns}
                    setColumns={setColumns}
                  />
                )
              })}
              {provided.placeholder}
            </FlexContainer>
          )}
        </Droppable>
      </DragDropContext>
    </Main>
  )
}

export default App

const InnerColumn = ({ column, tasks, index, columns, setColumns, setTasks }) => {
  const task = column.taskIds.map((taskId) => tasks.find((task) => task.id === taskId))
  return (
    <TodoColumn
      column={column}
      // task={task}
      index={index}
      tasks={task}
      setTasks={setTasks}
      columns={columns}
      setColumn={setColumns}
    />
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

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`
