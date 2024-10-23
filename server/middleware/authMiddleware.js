const CustomError = require('../errors')
const { isTokenValid } = require('../utils/jwt')
const User = require('../models/userModel')

// AUTH MIDDLEWARE - takes token from auth header
const authMiddleware = async (req, res, next) => {
  // console.log('AUTH MIDDLEWARE')
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  // retrieve token from auth header
  const token = authorization.split(' ')[1]
  try {
    // check validity of token
    const payload = isTokenValid(token)

    req.user = { userId: payload.userId }
  } catch (error) {
    // console.log('AUTH MIDDLEWARE ERROR ......', error)
    throw new CustomError.Unauthenticated('Token expired. Please login again')
  }
  next()
}


const adminMiddleware = async (req, res, next) => {
  const { user } = req

  if (!user || user.role !== 'admin') {
    throw new CustomError.Unauthenticated(
      'Admin privileges required to access this route'
    )
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }
