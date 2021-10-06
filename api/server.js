const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')

// initiate dotenv
dotenv.config()

// connect to DB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Connected to DB')
  },
)

// initiate express
const app = express()
const PORT = process.env.PORT || 3001

// express midlleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// connect server
app.listen(PORT, () =>
  console.log(`🌍 Backend server listening on PORT:${PORT}`),
)
