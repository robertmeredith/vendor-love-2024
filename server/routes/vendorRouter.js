const express = require('express')
const router = express.Router()

// import Auth Middleware
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')

// import User model
const Vendor = require('../models/vendorModel')

// import controller actions
const {
  adminGetAllVendors,
  getVendors,
  getAllVendors,
  getSingleVendor,
  createVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendorController')

// Get all vendors / create vendor
router.route('/').get(adminMiddleware, adminGetAllVendors).post(authMiddleware, createVendor)

// GET SINGLE VENDOR
router.get('/:id', authMiddleware, getSingleVendor)

// UPDATE SINGLE VENDOR
router.put('/:id', authMiddleware, updateVendor)

// DELETE SINGLE VENDOR
router.delete('/:id', authMiddleware, deleteVendor)

module.exports = router
