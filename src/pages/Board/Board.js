import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
// Components
import Column from '../../components/Column/Column';
// Style
import './Board.css';
import Button from '../../components/Button/Button';


export default function Board() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Real-time listener for tasks form Firestore
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });
    // Cleanup on unmount
    return () => unsubscribe();
  }, []);
  
  // Function to filter tasks based on status
  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className='workspace'>
      <div className='workspace-header'>
        <h1>Board</h1>
        <Button
          style="btn-primary"
          label="Add Task"
        />
      </div>
      <div className='kanban-board'>
        {['To Do', 'In Progress', 'Await Feeback', 'Done'].map(status => (
          <div key={status} className='column'>
            <h2>{status}</h2>
            <div className='tasks'>
              {getTasksByStatus(status).map(task => (
                <div key={task.id} className='task'>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due:{task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Category: {task.category}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
