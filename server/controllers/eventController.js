const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Event = require('../models/eventModel')
const Vendor = require('../models/vendorModel')

// ADMIN - GET - all events
const getAllEvents = async (req, res) => {
  const events = await Event.find({})
  res.status(200).json({ count: events.length, events })
}

// POST - Create Event
const createEvent = async (req, res) => {
  const { userId } = req.user

  const { client, partner, email, eventDate, vendors } = req.body

  console.log('REQUEST BODY', req.body)

  // Remove entries from vendors array where vendor name is empty
  const populatedVendors = vendors.filter((v) => v.vendor.name.trim() !== '')

  console.log('POPULATED VENDORS', populatedVendors)

  // Create new Vendor if not already in database
  // List of newly created vendors, so if a new vendor is added twice on the same form (e.g venue), it will only be created once
  const newlyCreatedVendors = []
  // Final vendor list to be added to the Event record
  const finalVendorList = []
  // Filter through vendors to create New Vendor for any vendors not currently in db
  for (const v of populatedVendors) {
    // If vendor has id, means already in database
    if (v.vendor._id || v.vendor.isUser) {
      finalVendorList.push({
        category: v.category,
        vendor: v.vendor._id,
      })
    } else {
      // check to see if we have already created the new vendor
      let vendorAlreadyCreated = newlyCreatedVendors.find(
        (vendor) => vendor.name === v.vendor.name.trim().toLowerCase()
      )

      // If vendor already created, use that vendor id
      if (vendorAlreadyCreated) {
        finalVendorList.push({
          category: v.category,
          vendor: vendorAlreadyCreated._id,
        })
      } else {
        console.log('CREATE NEW VENDOR')
        // Create new vendor and add to newlyCreatedVendors array so it can be referenced later
        const newVendor = await Vendor.create({
          user: userId,
          name: v.vendor.name.trim(),
          instagram: v.vendor.instagram.trim(),
          website: v.vendor.website.trim(),
          email: v.vendor.email.trim(),
          verified: true,
        })
        // Add vendor to newlyCreatedVendors array
        newlyCreatedVendors.push({
          name: newVendor.name.toLowerCase(),
          _id: newVendor._id,
        })
        // Add vendor to finalVendorList
        finalVendorList.push({
          category: v.category,
          vendor: newVendor._id,
        })
      }
    }
  }

  // console.log({ FINAL: finalVendorList, NEW: newlyCreatedVendors })

  // res.status(200).json({final: finalVendorList, new: newlyCreatedVendors})

  // Create new record in Event collection
  const newEvent = new Event({
    user: userId,
    client,
    partner,
    email,
    // TODO: convert eventDate to UTC date object - seems to be working
    eventDate: new Date(eventDate),
    vendors: finalVendorList,
  })

  newEvent.save()

  res.status(200).json({ event: newEvent })
}

// PUT - Edit Event
const editEvent = async (req, res) => {
  const { id: eventId } = req.params
  const updatedEventData = req.body
  const { userId } = req.user

  const event = await Event.findById(eventId)

  // If no event found throw error
  if (!event) {
    throw new CustomError.NotFound(`No event found with id : ${eventId}`)
  }

  // Check event belongs to user
  if (String(event.user) !== String(userId)) {
    throw new CustomError.Unauthorised('You are not authorized to edit this')
  }

  // Remove entries from vendors array where vendor name is empty
  const populatedVendors = updatedEventData.vendors.filter(
    (v) => v.vendor.name.trim() !== ''
  )

  // Create new Vendor if not already in database
  // List of newly created vendors, so if a new vendor is added twice on the same form (e.g venue), it will only be created once
  const newlyCreatedVendors = []
  // Final vendor list to be added to the Event record
  const finalVendorList = []
  // Filter through vendors to create New Vendor for any vendors not currently in db
  for (const v of populatedVendors) {
    // If vendor has id, means already in database
    if (v.vendor._id || v.vendor.isUser) {
      finalVendorList.push({
        category: v.category,
        vendor: v.vendor._id,
      })
    } else {
      // check to see if we have already created the new vendor
      let vendorAlreadyCreated = newlyCreatedVendors.find(
        (vendor) => vendor.name === v.vendor.name.trim().toLowerCase()
      )

      // If vendor already created, use that vendor id
      if (vendorAlreadyCreated) {
        finalVendorList.push({
          category: v.category,
          vendor: vendorAlreadyCreated._id,
        })
      } else {
        // Create new vendor and add to newlyCreatedVendors array so it can be referenced later
        const newVendor = await Vendor.create({
          user: userId,
          name: v.vendor.name.trim(),
          instagram: v.vendor.instagram.trim(),
          website: v.vendor.website.trim(),
          email: v.vendor.email.trim(),
          verified: true,
        })
        // Add vendor to newlyCreatedVendors array
        newlyCreatedVendors.push({
          name: newVendor.name.toLowerCase(),
          _id: newVendor._id,
        })
        // Add vendor to finalVendorList
        finalVendorList.push({
          category: v.category,
          vendor: newVendor._id,
        })
      }
    }
  }

  // Update event record
  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      ...updatedEventData,
      vendors: finalVendorList,
    },
    { new: true, runValidators: true } // Return the updated document and run validators
  )
  res.status(200).json({ event })
}

// GET - Single Event
const getSingleEvent = async (req, res) => {
  console.log('getSingleEvent')
  const { userId } = req.user
  const { id: eventId } = req.params

  const event = await Event.findById(eventId).populate({
    path: 'vendors',
    populate: {
      path: 'vendor',
      model: 'Vendor',
    },
  })

  if (!event) {
    throw new CustomError.NotFound(`No event found with id : ${eventId}`)
  }

  if (event.user.toString() !== userId) {
    throw new CustomError.Unauthorised(
      'You are not authorized to view this event'
    )
  }

  // date Object serialised to a string in the JSON response
  res.status(200).json({ event })
}


// DELETE - event
const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params

  const event = await Event.findById(eventId)
  if (!event) {
    throw new CustomError.NotFound(`No record found with id ${eventId}`)
  }
  if (event.user.toString() !== req.user.userId) {
    throw new CustomError.Unauthorised('You are not authorized to delete this')
  }
  await event.deleteOne()

  res.status(StatusCodes.OK).json({ msg: 'Success! Event removed' })
}

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  editEvent,
  deleteEvent,
}
