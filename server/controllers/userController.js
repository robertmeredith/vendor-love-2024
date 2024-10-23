const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

// import User Settings model
const UserSettings = require('../models/userSettingsModel')
const Vendor = require('../models/vendorModel')
const User = require('../models/userModel')
const Event = require('../models/eventModel')

// ------------------------------ USER ACCOUNT ------------------------------

// GET LOGGED IN USER ACCOUNT - PRIVATE
// Used for populating settings form with user account details
// Used for verifying user is authenticated
const getCurrentUserAccount = async (req, res) => {
  console.log('GET CURRENT USER ACCOUNT')

  const { userId } = req.user

  const user = await User.findById(userId).select('-password')

  if (!user) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  res.status(StatusCodes.OK).json(user)
}

// UPDATE LOGGED IN USER NAME - PRIVATE
const updateCurrentUserName = async (req, res) => {
  const { userId } = req.user
  const { firstName, lastName } = req.body

  // check if user exists
  const user = await User.findById(userId)
  if (!user) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true }
  ).select('-password')

  res.status(StatusCodes.OK).json(updatedUser)
}

// UPDATE LOGGED IN USER EMAIL - PRIVATE
const updateCurrentUserEmail = async (req, res) => {
  const { userId } = req.user
  const { email } = req.body

  // check if user exists
  const user = await User.findById(userId)
  if (!user) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email },
    { new: true, runValidators: true }
  ).select('-password')

  res.status(StatusCodes.OK).json(updatedUser)
}

// UPDATE LOGGED IN USER PASSWORD - PRIVATE
const updateCurrentUserPassword = async (req, res) => {
  const { userId } = req.user
  const { password } = req.body

  // check if user exists
  const user = await User.findById(userId)
  if (!user) {
    throw new CustomError.Unauthenticated('Authentication Invalid')
  }

  // Update the password
  user.password = password
  await user.save()

  res.status(StatusCodes.OK).json({ message: 'Password updated successfully' })
}

// ------------------------------ USER SETTINGS ------------------------------

// GET LOGGED IN USER SETTINGS - PRIVATE
const getCurrentUserSettings = async (req, res) => {
  // get userId from auth middleware
  const { userId } = req.user

  // fetch settings associated with user and populate vendor
  const userSettings = await UserSettings.findOne({ user: userId }).populate(
    'business.vendor'
  )

  res.status(StatusCodes.OK).json(userSettings)
}

// UPDATE LOGGED IN USER SETTINGS - PRIVATE
const updateCurrentUserSettings = async (req, res) => {
  const { userId } = req.user
  const settings = req.body

  const updatedVendorDetails = {
    ...settings.business.vendor,
    isUser: true,
    isVerified: true,
  }

  await Vendor.findByIdAndUpdate(updatedVendorDetails._id, updatedVendorDetails)

  const updatedSettings = await UserSettings.findOneAndUpdate(
    { user: userId },
    settings,
    { new: true, runValidators: true }
  )

  res.status(StatusCodes.OK).json(updatedSettings)
}

// ------------------------------ USER VENDORS ------------------------------

// GET LOGGED IN USER VENDORS ALL - PRIVATE
const getCurrentUserVendors = async (req, res) => {
  const { userId } = req.user

  const vendors = await Vendor.find({ user: userId })

  res.status(StatusCodes.OK).json({ count: vendors.length, vendors })
}

// GET LOGGED IN USER VENDORS FILTERED - PRIVATE
const getFilteredCurrentUserVendors = async (req, res) => {
  try {
    const { userId } = req.user
    const { search } = req.query

    // set default values for pagination
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 15))

    let query = { user: userId }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const sanitizedSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      query.name = { $regex: sanitizedSearch, $options: 'i' }
    }

    const totalItems = await Vendor.countDocuments(query)
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit

    const vendors = await Vendor.find(query)
      .sort({ name: 'asc' })
      .skip(startIndex)
      .limit(limit)

    res.status(StatusCodes.OK).json({
      vendors,
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    })
  } catch (error) {
    console.error('Error in getCurrentUserVendors:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error occurred while fetching vendors' })
  }
}

// ------------------------------ USER EVENTS ------------------------------

// GET LOGGED IN USER EVENTS - PRIVATE
const getCurrentUserEvents = async (req, res) => {
  // take user from auth middleware
  const { userId } = req.user

  // fetch submissons associated with user
  const events = await Event.find({ user: userId })

  res.status(StatusCodes.OK).json({ count: events.length, events })
}

module.exports = {
  updateCurrentUserName,
  updateCurrentUserEmail,
  updateCurrentUserPassword,
  getCurrentUserAccount,
  getCurrentUserSettings,
  updateCurrentUserSettings,
  getFilteredCurrentUserVendors,
  getCurrentUserVendors,
  getCurrentUserEvents,
}
