const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
const dotenv = require('dotenv')
const multer = require('multer')
// const userRoute = require('./routes/users')
// const authRoute = require('./routes/auth')
// const postRoute = require('./routes/posts')
// const conversationRoute = require('./routes/conversations')
// const messageRoute = require('./routes/messages')

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')
const db = require('./config/connection')

dotenv.config()
const PORT = process.env.PORT || 3001
const app = express()

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploded successfully')
  } catch (error) {
    console.error(error)
  }
})

// app.use('/api/auth', authRoute)
// app.use('/api/users', userRoute)
// app.use('/api/posts', postRoute)
// app.use('/api/conversations', conversationRoute)
// app.use('/api/messages', messageRoute)
// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  })
  await server.start()
  server.applyMiddleware({ app })
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}
startApolloServer()

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
  })
})
