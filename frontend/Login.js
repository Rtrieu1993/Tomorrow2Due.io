const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

const client = new Client({
  host: 'your-database-host',
  user: 'your-database-user',
  password: 'your-database-password',
  database: 'your-database-name',
  port: 5432,
});

client.connect();

// Secret key for JWT
const JWT_SECRET = 'your-jwt-secret-key';  // Store securely in environment variables

// Register new user
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, email, hashedPassword];

  try {
    const result = await client.query(query, values);
    const newUser = result.rows[0];
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error registering user' });
  }
});