const mongoose = require('mongoose')
const Vendor = require('../models/vendorModel') // Adjust the path as necessary

// MongoDB connection URI
const mongoURI =
  'mongodb+srv://rob:z8AY9wnwQYmStcC8@cluster0.ke7ms6l.mongodb.net/vendor-app?retryWrites=true&w=majority' // Replace with your actual MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  console.log('Connected to MongoDB')

  try {
    // Find all vendors
    const vendors = await Vendor.find()

    // Update each vendor's name to lowercase
    for (const vendor of vendors) {
      vendor.name = vendor.name.toLowerCase()
      // console.log(vendor.name)
      await vendor.save()
    }

    console.log('All vendor names have been updated to lowercase')
  } catch (error) {
    console.error('Error updating vendor names:', error)
  } finally {
    // Close the database connection
    mongoose.connection.close()
  }
})
