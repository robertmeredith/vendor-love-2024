const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema(
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
    partner: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
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

module.exports = mongoose.model('Submission', SubmissionSchema)
