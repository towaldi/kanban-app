import React, { useState, useEffect } from 'react';
// Firebase
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
// Components
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Select from '../Select/Select';
import Button from '../Button/Button';
// Style
import './Dialog.css';

export default function DialogTask({ onClose }) {
    // Task state
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

    // State for validation errors
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

    // Handle input changes
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
        // Clear error when user types
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // Validate inputs
    const validateInputs = () => {
        const newErrors = {};

        if (!task.title.trim()) newErrors.title = "Title is required";
        if (!task.assignedTo) newErrors.assignedTo = "Assigned To is required";
        if (!task.dueDate) newErrors.dueDate = "Due Date is required";
        if (!task.category) newErrors.category = "Category is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Submit form and add task to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
        return;
        }

        try {
            await addDoc(collection(db, 'tasks'), {
            ...task,
            assignedTo: contacts.find(contact => contact.name === task.assignedTo)?.name || ""
        });

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
        onClose(); // Close dialog after submission
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className='dialog-bgr'>
            <form className='dialog' onSubmit={handleSubmit}>
                <div className='dialog-input'>
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
                        options={contacts.map(contact => contact.name)}
                        required
                        error={errors.assignedTo}
                    />
                    <Input
                        type="date"
                        label="Due Date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
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
                <div className='row-right'>
                    <Button
                        style='btn-secondary'
                        type='button'
                        label='Cancel'
                        onClick={onClose}
                    />
                    <Button
                        style='btn-primary'
                        type='submit'
                        label='Add Task'
                    />
                </div>
            </form>
        </div>
    )
}
