// component to add a new task
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskText || !dueDate) {
      alert('Please fill in both fields');
      return;
    }

    const newTask = { text: taskText, due_date: dueDate };
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        onAddTask(newTask);
        setTaskText('');
        setDueDate('');
      } else {
        alert('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task:
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </label>
      <br />
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;