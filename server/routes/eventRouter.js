const express = require('express')
const router = express.Router()

// import middleware
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware')

// import controller actions
const {
  createEvent,
  // getAllEvents,
  getSingleEvent,
  deleteEvent,
  editEvent,
} = require('../controllers/eventController')

// router.route('/').get(adminMiddleware, getAllEvents)

// Create Event for logged in user
router.route('/').post(authMiddleware, createEvent)

router
  .route('/:id')
  .get(authMiddleware, getSingleEvent)
  .delete(authMiddleware, deleteEvent)
  .put(authMiddleware, editEvent)
module.exports = router
