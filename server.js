const express = require('express')
const db = require('./config/connection')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

// initiate dotenv
dotenv.config()

// initiate express
const app = express()
const PORT = process.env.PORT || 3001

// express midlleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// connect to database
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Backend server listening on PORT:${PORT}`),
  )
})
