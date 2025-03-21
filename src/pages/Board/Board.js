import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// Components
import Button from '../../components/Button/Button';
import Task from '../../components/Task/Task';
// Style
import './Board.css';
import Drawer from '../../components/Drawer/Drawer';

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

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

  // Delete task from Firestore
  const deleteTask = async (taskId) => {
    try {
      // Delete form Firestore
      await deleteDoc(doc(db, 'tasks', taskId));
      // Remove from UI
      setTasks(tasks.filter(task => task.id !== taskId));
      if (selectedTask?.id === taskId) {
        setSelectedTask(null) // Close 'Drawer' if deleted task is open
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
    <div className='workspace-vert'>
      <div className='workspace'>
        <div className='workspace-header'>
          <h1>Board</h1>
          <Button 
            style="btn-primary" 
            label="Add Task" 
          />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className='kanban-board'>
            {['To Do', 'In Progress', 'Await Feedback', 'Done'].map(status => (
              <div key={status} className="column">
                <h2>{status}</h2> 

                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='tasks'>
                      {getTasksByStatus(status).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Task 
                            task={task} 
                            provided={provided} 
                            snapshot={snapshot} 
                            onDelete={deleteTask}
                            onSelect={() => setSelectedTask(task)} // Open 'Drawer' when task is clicked
                            isSelected={selectedTask?.id === task.id} // Pass selected state
                          />
                        )}
                      </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
      {selectedTask && <Drawer task={selectedTask} onClose={() => setSelectedTask(null)}/>}
    </div>
  );
}
