import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import initialData from './initialData'

import TodoColumn from './Todo'
import { Main, Heading, FlexContainer, Modal, Question, Button } from './components'

const LOCAL_STORAGE_KEY = 'todoApp.todos'
const LOCAL_STORAGE_COLUMN = 'todoApp.columns'
const LOCAL_STORAGE_COLUMN_ORDER = 'todoApp.column.order'

const App = () => {
  const [modal, setModal] = useState(!localStorage.getItem('not_first_time'))
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || initialData.tasks)
  const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMN)) || initialData.columns)
  const [columnOrder, setColumnOrder] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_COLUMN_ORDER)) || initialData.columnOrder
  )

  useEffect(() => localStorage.setItem('not_first_time', true), [])

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
      <Question onClick={() => setModal(true)}>?</Question>
      {modal && (
        <Modal onClick={() => setModal(false)}>
          <div className='contents'>
            <h1>Welcome to Todo list app</h1>
            <p>This is a simple todo list with drag and drop. You can drag and drop tasks between columns.</p>
            <p>You may also rearrange the list columns by dragging their title.</p>
            <p>Or by keyboard: press space to lift, arrow keys to move around within or among different columns</p>
            <Button onClick={() => setModal(false)}>Got it!</Button>
          </div>
        </Modal>
      )}

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
