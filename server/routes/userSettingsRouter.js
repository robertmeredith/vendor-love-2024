const express = require('express')
const router = express.Router()

// import Validation
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')

// import controller actions
const {
  getAllUserSettings,
  createCurrentUserSettings,
  getSingleUserSettings,
  getUserSettings,
  updateUserSettings,
} = require('../controllers/userSettingsController')

// GET all user settings / POST create user settings
router.route('/')
  .get(authMiddleware, adminMiddleware, getAllUserSettings)
  .post(authMiddleware, createCurrentUserSettings)

// GET - single user settings / POST - update user settings
router.route('/:id')
  .get(authMiddleware, getSingleUserSettings)
  .post(authMiddleware, updateUserSettings)

  module.exports = router