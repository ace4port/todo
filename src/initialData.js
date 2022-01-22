const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the trash', complete: false },
    'task-2': { id: 'task-2', content: 'Watch my favorite show', complete: false },
    'task-3': { id: 'task-3', content: 'Charge my phone', complete: false },
    'task-4': { id: 'task-4', content: 'Cook dinner', complete: false },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },

  columnOrder: ['column-1'],
}

export default initialData
