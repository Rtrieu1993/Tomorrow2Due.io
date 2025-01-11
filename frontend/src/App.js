import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

// export default App;

 // Initialize FullCalendar
 const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'month', // Show month view by default
  selectable: true,  // Enable date selection
  events: async function(fetchInfo, successCallback, failureCallback) {
      try {
          const response = await fetch('/api/tasks');
          const tasks = await response.json();

          const events = tasks.map(task => ({
              title: task.text,
              start: task.due_date, // Use the due_date as the start date
              description: `Task: ${task.text}`, // Optional description
          }));

          successCallback(events);
      } catch (err) {
          console.error(err);
          failureCallback(err);
      }
  },
  dateClick: function(info) {
      // This function will trigger when a date is clicked
      const selectedDate = info.dateStr; // Get the clicked date (ISO format)

      // Prompt the user to add a task
      const taskText = prompt(`Enter task for ${selectedDate}:`);
      if (taskText) {
          // If a task is entered, add it to the database
          addTaskToDatabase(taskText, selectedDate);
      }
  }
});

calendar.render();
// Function to add task to the backend (PostgreSQL)
async function addTaskToDatabase(taskText, dueDate) {
  const newTask = {
      text: taskText,
      due_date: dueDate, // Assign due date
  };

  // Send the task to the backend
  const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
  });

  const task = await response.json();
  addTaskToUI(task); // Add task to the UI (task list)
}

// Add task to the task list on the frontend
function addTaskToUI(task) {
  const taskList = document.getElementById('task-list');
  const li = document.createElement('li');
  li.textContent = `${task.text} (Due: ${task.due_date})`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteTask(task.id, li);

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Function to delete a task
async function deleteTask(taskId, liElement) {
  await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
  });
  liElement.remove();
}

});