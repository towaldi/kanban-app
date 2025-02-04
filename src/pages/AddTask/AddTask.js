import React, { useState } from 'react';
import { db } from '../../firebase'; // Firebase Firestore instance
import { collection, addDoc } from 'firebase/firestore';
// Components
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
// Style
import './AddTask.css';

export default function AddTask() {
  // State to store from inputs
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: '',
    category: '',
    subtasks: '',
    status: 'To Do' // Default column whnme a task is created
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  };

  // Function to submit form and add task to Firebase
  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    if (!task.title || !task.description) {
      alert("Title and description are required!");
    }

    try {
      // Add task to Firebase
      const docRef = await addDoc(collection(db, 'tasks'), task);
      alert("Task added successfully!");
      // Reset form fields
      setTask({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        priority: '',
        category: '',
        subtasks: '',
        status: 'To Do'
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Try again.")
    }
  };

  return (
    <div className='workspace'>
        <h1>Add Task</h1>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='column'>
              <Input
                type="text"
                label="Title"
                name="title"
                placeholder="Enter a title"
                value={task.title}
                onChange={handleChange}
              />
              <Textarea 
                label="Description"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
              <Select
                label="Assigned to"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
              />
            </div>
            <div className='column'>
              <Input
                type="date"
                label="Due Date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
              />
              <Select
                label="Priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              />
              <Select
                label="Category"
                name="category"
                value={task.category}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Subtasks"
                name="subtasks"
                placeholder="Add new subtask"
                value={task.subtasks}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='row-right'>
            <Button
              style="btn-secondary"
              label="Clear"
              onClick={() => setTask({
                title: '',
                description: '',
                assignedTo: '',
                dueDate: '',
                priority: '',
                category: '',
                subtasks: '',
                status: 'To Do'
              })}
            />
            <Button
              style="btn-primary"
              type="Submit"
              label="Create Task" 
            />
          </div>
        </form>
    </div>
  )
}
