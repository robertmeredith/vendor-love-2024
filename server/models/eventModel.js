const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    clientInstagram: {
      type: String,
    },
    partner: {
      type: String,
    },
    partnerInstagram: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    vendors: [
      {
        category: {
          type: String,
        },
        vendor: {
          type: mongoose.Schema.ObjectId,
          ref: 'Vendor',
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', EventSchema)
