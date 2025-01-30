import React from 'react';
// Components
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
// Style
import './AddTask.css';
import Button from '../../components/Button/Button';

export default function AddTask() {
  return (
    <div className='workspace'>
        <h1>Add Task</h1>
        <div className='row'>
          <div className='column'>
            <Input
              type="text"
              label="Title"
              placeholder="Enter a title"
            />
            <Textarea 
              label="Description"
            />
            <Select
              label="Assigned to" 
            />
          </div>
          <div className='column'>
            <Input
              type="date"
              label="Due Date"
              placeholder="dd/mm/yyyy"
            />
            <Select
              label="Priority" 
            />
            <Select
              label="Category" 
            />
            <Input
              label="Subtasks"
              placeholder="Add new subtask"
            />
          </div>
        </div>
        <div className='row-right'>
          <Button
            label="Clear" 
          />
          <Button
            label="Create Task" 
          />
        </div>
    </div>
  )
}
