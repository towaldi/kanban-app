import React, { useState} from 'react';
// Components
import Column from '../../components/Column/Column';
// Style
import './Board.css';
import Button from '../../components/Button/Button';

const initialTasks = [
  { id: 1, title: "Set up Firebase", description: "Description 1", priority: "high", assigned: "user1", status: "todo" },
  { id: 2, title: "Create Board UI", description: "Description 2", priority: "medium", assigned: "user2", status: "in-progress" },
  { id: 3, title: "Fix login issues", description: "Description 3", priority: "high", assigned: "user3", status: "await-feedback" },
  { id: 4, title: "Deploy app", description: "Description 4", priority: "low", assigned: "user4", status: "done" }
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
      <div className='workspace-header'>
        <h1>Board</h1>
        <Button
          label="Add Task"
        />
      </div>
      <div className='kanban-board'>
        {columns.map((column) => (
          <Column 
            key={column.id} 
            title={column.title} 
            tasks={tasks.filter(task => task.status === column.id)} 
          />
        ))}
      </div>
    </div>
  )
}
