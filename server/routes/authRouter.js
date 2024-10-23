const express = require('express')
const router = express.Router()

// import Validation
const authValidation = require('./validation/authValidation')

const {
  register,
  login,
  changePassword,
} = require('../controllers/authController')

const { getCurrentUserAccount } = require('../controllers/userController')
const { authMiddleware } = require('../middleware/authMiddleware')

// GET - Verify user exists
router.get('/', authMiddleware, getCurrentUserAccount)

// POST - Register
router.post('/register', authValidation.register, register)

// POST - Login
router.post('/login', authValidation.login, login)

// PUT - Change Password
// TODO: add auth middleware - do I need to add id to the route?
router.put('/:id/change-password', changePassword)

module.exports = router
