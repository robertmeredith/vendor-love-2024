const mongoose = require('mongoose')

const UserSettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categories: {
    type: [String],
    default: [
      'Venue',
      'Photographer',
      'Videographer',
      'DJ',
      'Florist',
      'Caterer',
      'Bar',
      'Transport',
      'Other',
    ],
  },
  business: {
    includeOnForm: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      default: '',
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
  },
})

module.exports = mongoose.model('UserSettings', UserSettingsSchema)
