import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Firebase Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore';
// Components
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
// Style
import './AddTask.css';

export default function AddTask({ showSnackbar }) {
  // State to store from inputs
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: '',
    category: '',
    subtasks: '',
    status: 'To Do'
  });

  // State for validation error
  const [errors, setErrors] = useState({});

  // State for contacts
  const [contacts, setContacts] = useState([]);
  // Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const contactsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(contactsArray);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Function to validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!task.title.trim()) newErrors.title = "Title is required";
    if (!task.assignedTo) newErrors.assignedTo = "Assigned To is required";
    if (!task.dueDate) newErrors.dueDate = "Due Date is required";
    if (!task.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Function to submit form and add task to Firebase
  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    if (!validateInputs()) {
      showSnackbar("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), task);
      showSnackbar("Task added successfully!");

      // Reset form fields and errors
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
      setErrors({});
    } catch (error) {
      console.error("Error adding task:", error);
      showSnackbar("Failed to add task. Try again.");
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
                required
                error={errors.title}
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
                options={contacts.map(contact => contact.name)} // Map Firestore contacts
                required
                error={errors.assignedTo}
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
                required
                error={errors.dueDate}
              />
              <Select
                label="Priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                options={["High", "Medium", "Low"]}
              />
              <Select
                label="Category"
                name="category"
                value={task.category}
                onChange={handleChange}
                options={["Technical Task", "User Story", "Prototyping", "Wireframes"]}
                required
                error={errors.category}
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
              type="button"
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
