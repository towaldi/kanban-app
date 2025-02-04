import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// Components
import Button from '../../components/Button/Button';
// Style
import './Board.css';


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

  // Handle drag & drop event
  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    // Find task and update Firestore
    const taskToUpdate = tasks.find(task => task.id === draggableId);
    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      try {
        const taskRef = doc(db, 'tasks', draggableId);
        await updateDoc(taskRef, { status: newStatus });
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  return (
    <div className='workspace'>
      <div className='workspace-header'>
        <h1>Board</h1>
        <Button style="btn-primary" label="Add Task" />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='kanban-board'>
          {['To Do', 'In Progress', 'Await Feedback', 'Done'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='column'>
                  <h2>{status}</h2>
                  <div className='tasks'>
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                            className='task'
                          >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Category: {task.category}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
