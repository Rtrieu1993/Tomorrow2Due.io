require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Server is running'));

Set up PostgreSQL connection pool
const pool = new Pool({
    user: 'tomorrow2due_user',  
    host: 'dpg-cu2okeggph6c73a8kmeg-a',
    database: 'tomorrow2due',
    password: 'aJKEoF4EegpdmrREN6g0iOQbf2Kq7mkS',
    port: 5432,
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
    const { text } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
            [text]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
        res.status(204).send();  // No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
////////////////////////////////////////////////          CALENDAR
// Add a new task with due date
app.post('/api/tasks', async (req, res) => {
    const { text, due_date } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (text, due_date) VALUES ($1, $2) RETURNING *',
            [text, due_date]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add task' });
    }
});
// Get all tasks (including due dates)
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});


<<<<<<< HEAD
const PORT = process.env.PORT || 3001;
=======
const PORT = process.env.PORT || 5432;
>>>>>>> 2424ef292e72e727e4a7304bcc91f0159e5a5965
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));