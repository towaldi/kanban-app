import React, { useState} from 'react';
// Components
import Column from '../../components/Column/Column';
// Style
import './Board.css';

const initialTasks = [
  { id: 1, title: "Set up Firebase", status: "todo" },
  { id: 2, title: "Create Board UI", status: "in-progress" },
  { id: 3, title: "Fix login issues", status: "await-feedback" },
  { id: 4, title: "Deploy app", status: "done" },
];

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "await-feedback", title: "Await Feedback" },
  { id: "done", title: "Done" }
];

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className='workspace'>
      <h1>Board</h1>
      <div className='kanban-board'>
        {columns.map((column) => (
          <Column key={column.id} title={column.title} tasks={tasks.filter(task => task.status === column.id)} />
        ))}
      </div>
    </div>
  )
}
