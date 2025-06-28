import express from 'express'
import pg from 'pg'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
})

app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM messages')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3001, () => console.log('? Server running on http://localhost:3001'))
