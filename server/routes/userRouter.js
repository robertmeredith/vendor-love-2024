const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')

// import controllers
const {
  getCurrentUserAccount,
  getCurrentUserSettings,
  updateCurrentUserSettings,
  updateCurrentUserName,
  updateCurrentUserEmail,
  updateCurrentUserPassword,
  getFilteredCurrentUserVendors,
  getCurrentUserVendors,
  getCurrentUserEvents,
} = require('../controllers/userController')

// GET - user Account
router.get('/', authMiddleware, getCurrentUserAccount)

// PATCH - user Name, Email, Password
router.patch('/name', authMiddleware, updateCurrentUserName)
router.patch('/email', authMiddleware, updateCurrentUserEmail)
router.patch('/password', authMiddleware, updateCurrentUserPassword)  

// GET - user Settings
router.get('/settings', authMiddleware, getCurrentUserSettings)
router.put('/settings', authMiddleware, updateCurrentUserSettings)

// GET - user Vendors
router.get('/vendors', authMiddleware, getFilteredCurrentUserVendors)

router.get('/vendors/all', authMiddleware, getCurrentUserVendors)

// GET - user Events
router.get('/events', authMiddleware, getCurrentUserEvents)

module.exports = router
