// script/updateVendors.js
const mongoose = require('mongoose')
const Vendor = require('../models/vendorModel') // Adjust the path as necessary

async function updateVendors() {
  try {
    // Connect to the database
    await mongoose.connect(
      'mongodb+srv://rob:z8AY9wnwQYmStcC8@cluster0.ke7ms6l.mongodb.net/vendor-app?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    // Retrieve all vendors
    const vendors = await Vendor.find()

    // Update each vendor to set verified to true
    for (const vendor of vendors) {
      vendor.verified = true
      await vendor.save()
    }

    console.log('All vendors have been updated to verified: true')
  } catch (error) {
    console.error('Error updating vendors:', error)
  } finally {
    // Close the database connection
    await mongoose.disconnect()
  }
}

updateVendors()
