// filepath: /Users/adrianahernandez/Tomorrow2Due.io/frontend/src/components/Calendar.js
import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TaskForm from './TaskForm';

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        const events = tasks.map(task => ({
          title: task.text,
          start: task.due_date,
        }));
        setEvents(events);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (newTask) => {
    const newEvent = {
      title: newTask.text,
      start: newTask.due_date,
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Calendar;