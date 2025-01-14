// sets up routing of each component using react-router-dom
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Calendar from './components/Calendar';
import Tasks from './components/Tasks';
import Notes from './components/Notes';
import './App.css';
import 'fullcalendar';


const Header = () => {
  return (
    <header>
    <h1>My Productivity Dashboard</h1>
    <nav>
      <ul>
        <li><Link to="/tasks" onClick={() => console.log('Tasks link clicked')}>Tasks</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Login</Link></li>
      </ul>
    </nav>
  </header>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;