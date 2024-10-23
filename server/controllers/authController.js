const User = require('../models/userModel')
const Vendor = require('../models/vendorModel')
const UserSettings = require('../models/userSettingsModel')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { createJWT } = require('../utils/jwt')

// TODO: Delete this, not used
// Same function in userController
// // VERIFY USER
// const verifyUser = async (req, res) => {
//   const { userId } = req.user

//   const user = await User.findById(userId).select('-password')

//   if (!user) {
//     throw new CustomError.Unauthenticated('Authentication Invalid')
//   }

//   res.status(StatusCodes.OK).json(user)
// }

// REGISTER
const register = async (req, res) => {
  // name here is the business name
  const { email, password, name, category } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  // check if user exists
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    res.status(400)
    throw new Error('User account with that email already exists')
  }

  // make first registered user an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  // create user
  const user = await User.create({
    firstName: '',
    lastName: '',
    email,
    password,
    role,
  })

  // create vendor to associate with user
  const userVendor = await Vendor.create({
    user: user._id,
    name: name,
    alias: '',
    instagram: '',
    website: '',
    email: user.email,
    verified: true,
    isUser: true,
  })

  // create user settings with vendor associated with the user
  const userSettings = new UserSettings({
    user: user._id,
    business: { category: category || 'other', vendor: userVendor._id },
  })
  await userSettings.save()

  const userToken = createJWT({ userId: user._id })

  res.status(StatusCodes.OK).json({
    userId: user._id,
    userToken,
  })
}

// LOGIN
const login = async (req, res) => {
  console.log('LOGIN')
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.Unauthenticated('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated('Invalid Credentials')
  }

  const userToken = createJWT({ userId: user._id })

  res.status(StatusCodes.OK).json({
    userId: user._id,
    userToken,
  })
}

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  const { id } = req.params
  const { newPassword } = req.body

  const user = await User.findOne({ id })

  if (!user) {
    throw new CustomError.NotFound(`No user with id : ${id}`)
  }

  user.password = newPassword
  const updatedUser = await user.save()

  res.status(StatusCodes.OK).json(updatedUser)
}

// DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id)
  if (!user) {
    throw new CustomError.NotFound(`No user with id : ${id}`)
  }

  // if user matches the logged in user, delete the user
  if (user.id === req.user.id) {
    await User.findByIdAndDelete(id)
  }

  // delete all associated user settings, vendors and events
  await UserSettings.deleteMany({ user: id })
  await Vendor.deleteMany({ user: id })
  await Event.deleteMany({ user: id })

  res.status(StatusCodes.OK).json({ message: 'User deleted successfully' })
}

module.exports = {
  register,
  login,
  changePassword,
}
