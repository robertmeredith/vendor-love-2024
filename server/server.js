

// env constants
require('dotenv').config()
const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

const connectDB = require('./db.js')

// Initialise express
const express = require('express')
const cors = require('cors')
const app = express()
// Enables default handling of async errors without try catch - can just throw
require('express-async-errors')

// FOR DEPLOYMENT to Heroku
const { dirname } = require('path')
const path = require('path')

// DEPLOYMENT TO RENDER
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)

// FOR DEPLOYMENT - security
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

// FOR DEPLOYMENT - rate limit
const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  // TODO: change back to 10
  max: 50,
  message: 'Too many requests from this IP, please try again in 15 minutes',
})

// Import Routes
const authRouter = require('./routes/authRouter.js')
const eventRouter = require('./routes/eventRouter.js')
const userRouter = require('./routes/userRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const submissionRouter = require('./routes/submissionRouter.js')
const vendorRouter = require('./routes/vendorRouter.js')

// Import Middleware
const morgan = require('morgan')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware.js')
const notFoundMiddleware = require('./middleware/notFoundMiddleware.js')

// MIDDLEWARE
app.use(morgan('tiny'))
// Parse JSON bodies
app.use(express.json())

// DEPLOYMENT  - security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        'data:',
        'https://images.unsplash.com',
        'https://tailwindui.com',
      ],
    },
  })
)
app.use(xss())
app.use(mongoSanitize())

// DEPLOYMENT
const __dirName = dirname(require.main.filename)

// Check if the environment is production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'client/build' directory
  app.use(express.static(path.resolve(__dirname, 'client/build')))
}

// DEPLOYMENT - location of build file
app.use(express.static(path.resolve(__dirName, 'client/build')))

app.get('/api/v1', (req, res) => {
  res.status(205).json({ msg: 'Welcome' })
})

app.use('/api/v1/auth', apiLimiter, authRouter)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/submissions', submissionRouter)
app.use('/api/v1/vendors', vendorRouter)
// app.use('/api/v1/settings', userSettingsRouter)

// DEPLOYMENT - after trying above routes, serve index.html file
// res.sendFile(path.resolve(__dirName, 'client/build', 'index.html'))

app.get('*', (req, res) => {})
app.use(express.static('../client/build'))

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Function to connect to database, then if successful spin up server
const start = async () => {
  try {
    console.log('ENVIRONMENT = ', process.env.NODE_ENV)
    await connectDB(MONGO_URI)
    console.log('Database is connected')
    app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

start()
