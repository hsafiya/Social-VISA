const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/visa',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to Social-VISA Database')
  },
)

module.exports = mongoose.connection

// || 'mongodb://localhost/social-visa'
