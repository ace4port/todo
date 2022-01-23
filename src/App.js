import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import TodoColumn from './Todo'
import initialData from './initialData'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_COLUMN = 'todoApp.columns'
const LOCAL_STORAGE_COLUMN_ORDER = 'todoApp.column.order'

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialData.tasks)
  const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMN)) || initialData.columns)
  const [columnOrder, setColumnOrder] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMN_ORDER)) || initialData.columnOrder
  )

  // TODO: load from local storage
  // useEffect(
  //   () => localStorage.getItem(LOCAL_STORAGE_KEY) && setTasks(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))),
  //   [setTasks]
  // )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    localStorage.setItem(LOCAL_STORAGE_COLUMN, JSON.stringify(columns))
    localStorage.setItem(LOCAL_STORAGE_COLUMN_ORDER, JSON.stringify(columnOrder))
  }, [tasks, columns, columnOrder])

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
    const destination_column = columns[destination.droppableId]

    if (selected_column === destination_column) {
      const newTasks = [...selected_column.taskIds]
      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, draggableId)
      const newColumn = { ...selected_column, taskIds: newTasks }

      setColumns({ ...columns, [newColumn.id]: newColumn })
      return
    }
    // Moving from one column to another
    const source_taskIds = [...selected_column.taskIds]
    source_taskIds.splice(source.index, 1)
    const new_src_column = { ...selected_column, taskIds: source_taskIds }

    const destination_taskIds = [...destination_column.taskIds]
    destination_taskIds.splice(destination.index, 0, draggableId)
    const new_dest_column = { ...destination_column, taskIds: destination_taskIds }

    setColumns({ ...columns, [new_src_column.id]: new_src_column, [new_dest_column.id]: new_dest_column })
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
      index={index}
      tasks={task}
      taskList={tasks}
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
