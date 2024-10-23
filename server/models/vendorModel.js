const mongoose = require('mongoose');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const VendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      // Changed name to be not required so that new Vendor can be created without a name during registration
      // Added a check in the vendorController to make sure name is provided before creating a vendor
      validate: {
        validator: function(v) {
          // If the vendor is user-associated, name can be empty
          if (this.isUser) {
            return true;
          }
          // For non-user-associated vendors, name is required and must be at least 2 characters
          return v && v.length >= 2;
        },
        message: props => {
          if (!props.value) {
            return 'Vendor name is required';
          }
          return 'Vendor name must be at least 2 characters long';
        }
      }
    },
    alias: {
      type: String,
    },
    instagram: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Middleware to remove vendor from events when vendor is deleted
VendorSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function (next) {
    console.log('The ID of the document to be deleted is:', this.getQuery()._id)

    const vendorId = this.getQuery()._id

    try {
      // Find events containing this vendor
      const eventsToUpdate = await mongoose.model('Event').find({
        'vendors.vendor': vendorId,
      })

      console.log(
        `Found ${eventsToUpdate.length} events containing this vendor.`
      )

      // Update each event
      for (let event of eventsToUpdate) {
        event.vendors = event.vendors.filter((v) => !v.vendor.equals(vendorId))
        await event.save()
        console.log(`Updated event ${event._id}`)
      }

      console.log('Finished updating events.')
      next()
    } catch (error) {
      console.error('Error in vendor remove middleware:', error)
      next(error)
    }
  }
)

module.exports = mongoose.model('Vendor', VendorSchema)
