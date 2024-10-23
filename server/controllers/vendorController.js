const mongoose = require('mongoose')

// import Vendor model
const Vendor = require('../models/vendorModel')
const Event = require('../models/eventModel')

const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

// ----------------------------------------------------------------

// ADMIN - GET all vendors- PRIVATE
const adminGetAllVendors = async (req, res) => {
  const vendors = await Vendor.find({})
  res.status(StatusCodes.OK).json({ count: vendors.length, vendors })
}

// ----------------------------------------------------------------

// GET single vendor - PRIVATE
const getSingleVendor = async (req, res) => {
  const { userId } = req.user
  const { id: vendorId } = req.params

  const vendor = await Vendor.findById(vendorId)

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }

  // Check if the vendor belongs to the user
  if (vendor.user.toString() !== userId) {
    throw new CustomError.Unauthorised(
      'You are not authorized to view this vendor'
    )
  }

  // Get all events that contain this vendor
  const events = await Event.find({ 'vendors.vendor': vendorId })

  res.status(StatusCodes.OK).json({ vendor, events })
}

// UPDATE single vendor - PRIVATE
const updateVendor = async (req, res) => {
  const { id: vendorId } = req.params
  const { name, instagram, website, email, notes } = req.body

    if (!name) {
      throw new CustomError.BadRequest('Please provide a vendor name')
    }
    
  const vendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }
  res.status(StatusCodes.OK).json({ vendor })
}


// DELETE single vendor - PRIVATE
const deleteVendor = async (req, res) => {
  const { userId } = req.user
  const { id: vendorId } = req.params

  const vendor = await Vendor.findById(vendorId)

  if (!vendor) {
    throw new CustomError.NotFound(`No vendor found with id: ${vendorId}`)
  }

  // Check if the vendor belongs to the user
  if (String(vendor.user) !== String(userId)) {
    throw new CustomError.Unauthorised(
      'You are not authorized to delete this vendor'
    )
  }

  // go through events and remove vendor from events

  // await vendor.deleteOne()

  await vendor.deleteOne()
  console.log(`Vendor ${vendorId} removed successfully`)
  res.status(StatusCodes.OK).json({ msg: 'Success! Vendor record removed' })
}

// GET user vendors - PUBLIC
const getUserPublicVendors = async (req, res) => {
  const { userId } = req.query
  const vendors = await Vendor.find({ user: userId })

  res.status(200).json({ count: vendors.length, vendors })
}

// ------------------------------------------------------------

// CREATE vendor
const createVendor = async (req, res, next) => {
  const { userId } = req.user
  const { name, instagram, website, email, notes } = req.body

  if (!name) {
    throw new CustomError.BadRequest('Please provide a vendor name')
  }

  const vendor = await Vendor.create({
    user: userId,
    name: name.toLowerCase(),
    instagram: instagram.toLowerCase(),
    website: website.toLowerCase(),
    email: email.toLowerCase(),
    notes,
    // vendor created by user so verified set as true
    verified: true,
  })

  res.status(StatusCodes.OK).json({ vendor })
}

// GET ALL VENDORS
// TODO: delete this?
const getAllVendors = async (req, res, next) => {
  const { user } = req.query

  // TODO: Is this a valid route? Split in to two?
  // if no user query string supplied return all vendors
  if (!user) {
    const vendors = await Vendor.find({})
    return res.status(200).json({ count: vendors.length, vendors })
  }

  // TODO: What is the below??

  if (mongoose.isValidObjectId(user)) {
    const vendors = await Vendor.find({ user }).populate('User')
    return res.status(200).json(vendors)
    // returns null if no record found.
  } else {
    // const vendors = await Vendor.find({}).populate('user')
    // returnres.status(200).json(vendors)
    res.status(404)
    next(new Error('Not a valid user id'))
  }
}

module.exports = {
  adminGetAllVendors,
  getUserPublicVendors,
  getAllVendors,
  getSingleVendor,
  createVendor,
  updateVendor,
  deleteVendor,
}
