const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

// import User Settings model
const UserSettings = require('../models/userSettingsModel')

// GET ALL USER SETTINGS
const getAllUserSettings = async (req, res) => {
  const userSettings = await UserSettings.find({})

  res.status(StatusCodes.OK).json({ count: userSettings.length, userSettings })
}

// CREATE USER SETTINGS
const createCurrentUserSettings = async (req, res) => {
  const { user } = req

  const exists = await UserSettings.findOne({ user })

  if (exists) {
    throw new CustomError.BadRequest(
      `User settings already exist for user ${user.email}`
    )
  }

  const newUserSettings = new UserSettings({
    user,
  })
  await newUserSettings.save()

  res.status(StatusCodes.OK).json({ newUserSettings })
}

// GET SINGLE USER SETTINGS - PRIVATE
const getSingleUserSettings = async (req, res, next) => {
  const { user } = req.body

  const userSettings = await UserSettings.findById({ user })

  if (!userSettings) {
    return next(
      new CustomError.NotFound(
        `No user settings found with id ${userSettingsId}`
      )
    )
  }
  res.status(StatusCodes.OK).json(userSettings)
}

// GET SINGLE USER SETTINGS - PUBLIC
const getUserSettings = async (req, res) => {
  const { id: userId } = req.params

  const userSettings = await UserSettings.findOne({ user: userId })

  res.status(StatusCodes.OK).json({ userSettings })
}

// UPDATE USER SETTINGS
const updateUserSettings = async (req, res, next) => {
  const { id: userSettingsId } = req.params

  const userSettings = await UserSettings.findById(userSettingsId)
  if (!userSettings) {
    throw new CustomError.NotFound(
      `No user settings found with id ${userSettingsId}`
    )
  }

  if (userSettings.user.toString() !== req.user._id.toString()) {
    throw new CustomError.Unauthorised('Not authorized to update settings')
  }

  const updatedUserSettings = await UserSettings.findByIdAndUpdate(
    userSettingsId,
    req.body,
    { new: true, runValidators: true }
  )

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Success! Settings updated', updatedUserSettings })
}

module.exports = {
  getAllUserSettings,
  createCurrentUserSettings,
  getSingleUserSettings,
  updateUserSettings,
}
