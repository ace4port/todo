const initialData = {
  tasks: [
    { id: 'task-1', content: 'Take out the trash', complete: false },
    { id: 'task-2', content: 'Watch my favorite show', complete: false },
    { id: 'task-3', content: 'Charge my phone', complete: false },
    { id: 'task-4', content: 'Cook dinner', complete: false },
    { id: 'task-5', content: 'Cook 2 dinner', complete: false },
    { id: 'task-6', content: 'Cook 54 dinner', complete: false },
    { id: 'task-7', content: 'Cook 24 dinner', complete: false },
  ],

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-5', 'task-7'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-6'],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default initialData
