// import User model
const User = require('../models/userModel')
const UserSettings = require('../models/userSettingsModel')
const Vendor = require('../models/vendorModel')

// EXPRESS VALIDATION
const { check, body, validationResult } = require('express-validator')

// GET - All Users
const getAllUsers = async (req, res, next) => {
  const users = await User.find({})
  res.status(200).json({ users })
}

// GET - single user - used by useUser hook on front end
const getUser = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findById(userId).select('-password')
  res.status(200).json(user)
}


// GET - user settings
const getUserSettings = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findById(userId)
  if (!user) return res.status(404).json({ message: 'User not found' })

  const userSettings = await UserSettings.findOne({ user: userId })
  if (!userSettings)
    return res.status(404).json({ message: 'User settings not found' })

  res.status(200).json(userSettings)
}

// GET USER VENDORS
const getUserVendors = async (req, res) => {
  const { id: userId } = req.params

  const user = await User.findById(userId)
  if (!user) return res.status(404).json({ message: 'User not found' })

  const vendors = await Vendor.find({ user: userId })

  res.status(200).json({ user: user._id, vendors })
}

module.exports = {
  getAllUsers,
  getUser,
  getUserSettings,
  getUserVendors,
}
