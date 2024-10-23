const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

// import Form Submissions model
const Submission = require('../models/submissionModel')
const Vendor = require('../models/vendorModel')

// GET ALL SUBMISSIONS
const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find({}).populate({
    path: 'vendors',
    populate: [
      {
        path: 'vendor',
        model: 'Vendor',
      },
    ],
  })
  res.status(200).json({ count: submissions.length, submissions })
}

// GET ALL USERS SUBMISSIONS
const getAllMySubmissions = async (req, res) => {
  const { user } = req

  const submissions = await Submission.find({ user: user._id }).populate({
    path: 'vendors',
    populate: [
      {
        path: 'vendor',
        model: 'Vendor',
      },
    ],
  })
  res.status(200).json({ count: submissions.length, submissions })
}

// CREATE SUBMISSION
const createSubmission = async (req, res) => {
  const { user, client, partner, email, date, vendors } = req.body

  // Remove entries from vendors array where vendor name is empty
  const populatedVendors = vendors.filter((v) => v.vendor.name.trim() !== '')

  // Create new Vendor if not already in database
  // List of newly created vendors, so if a new vendor is added twice on the same form (e.g venue), it will only be created once
  const newlyCreatedVendors = []
  const finalVendorList = []
  for (const v of populatedVendors) {
    // If vendor has id, means already in database
    if (v.vendor._id) {
      finalVendorList.push({
        vendorType: v.vendorType,
        vendor: v.vendor._id,
      })
    } else {
      let vendorAlreadyCreated = newlyCreatedVendors.find(
        (vendor) => vendor.name === v.vendor.name.trim().toLowerCase()
      )

      // If vendor already created, use that vendor id
      if (vendorAlreadyCreated) {
        finalVendorList.push({
          vendorType: v.vendorType,
          vendor: vendorAlreadyCreated._id,
        })
      } else {
        // Create new vendor and add to newlyCreatedVendors array so it can be referenced later
        const newVendor = await Vendor.create({
          user,
          name: v.vendor.name.trim(),
          instagram: v.vendor.instagram.trim(),
          website: v.vendor.website.trim(),
          email: v.vendor.email.trim(),
        })
        // Add vendor to newlyCreatedVendors array
        newlyCreatedVendors.push({
          name: newVendor.name.toLowerCase(),
          _id: newVendor._id,
        })
        // Add vendor to finalVendorList
        finalVendorList.push({
          vendorType: v.vendorType,
          vendor: newVendor._id,
        })
      }
    }
  }

  // Create new submission
  const newSubmission = new Submission({
    user,
    client,
    email,
    partner,
    eventDate: date.startDate,
    vendors: finalVendorList,
  })

  newSubmission.save()

  res.status(200).json(newSubmission)
}

// GET SINGLE SUBMISSION
const getSingleSubmission = async (req, res, next) => {
  const { id: submissionId } = req.params

  const submission = await Submission.findById(submissionId).populate({
    path: 'vendors',
    populate: {
      path: 'vendor',
      model: 'Vendor',
    },
  })

  if (!submission) {
    return next(
      new CustomError.NotFound(
        `No user submission found with id ${submissionId}`
      )
    )
  }
  res.status(StatusCodes.OK).json({ submission })
}

// EDIT SUBMISSION
const editSubmission = async (req, res) => {
  //TODO: Does this need to be verified against user making request
  const { id: submissionId } = req.params

  const submission = await Submission.findById(submissionId)
  if (!submission) {
    throw new CustomError.NotFound(
      `No user submission found with id ${submissionId}`
    )
  }

  const updatedSubmission = await Submission.findByIdAndUpdate(
    submissionId,
    req.body,
    { new: true }
  )

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Success! Submission updated', updatedSubmission })
}

// DELETE SUBMISSION
const deleteSubmission = async (req, res) => {
  const { id: submissionId } = req.params

  const submission = await Submission.findById(submissionId)
  if (!submission) {
    throw new CustomError.NotFound(`No record found with id ${submissionId}`)
  }
  await submission.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Form submission removed' })
}

// GET CURRENT USER SUBMISSIONS
const getAllUserSubmissions = async (req, res) => {
  // take user from auth middleware
  const { userId } = req.user

  // find submissons associated with user
  const submissions = await Submission.find({ user: userId })

  res.status(StatusCodes.OK).json({ count: submissions.length, submissions })
}

module.exports = {
  getAllSubmissions,
  createSubmission,
  getSingleSubmission,
  editSubmission,
  deleteSubmission,
  getAllUserSubmissions,
  getAllMySubmissions,
}
