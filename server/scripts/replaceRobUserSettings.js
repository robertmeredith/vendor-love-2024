const mongoose = require('mongoose')

const UserSettings = require('../models/userSettingsModel')

// Replace with your MongoDB connection string
const mongoURI =
  'mongodb+srv://rob:z8AY9wnwQYmStcC8@cluster0.ke7ms6l.mongodb.net/vendor-app?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// // Function to replace user settings
const replaceUserSettings = async (userId, newSettings) => {
  try {
    // const result = await UserSettings.findOneAndUpdate(
    //   { userId: userId, _id: settingsId },
    //   newSettings,
    //   { new: true, useFindAndModify: false } // Return the updated document
    // )

    const result = await UserSettings.findOneAndReplace(
      { user: userId },
      newSettings,
      {
        new: true,
        useFindAndModify: false,
      }
    )

    if (result) {
      console.log('User settings updated successfully:', result)
    } else {
      console.log('No user settings found for the given userId and settingsId')
    }
  } catch (error) {
    console.error('Error updating user settings:', error)
  } finally {
    mongoose.connection.close() // Close the connection
  }
}

// Replace with the new settings you want to apply
const newSettings = {
  user: '640fc4c6d69dbeb3b43c62e8',
  business: {
    includeOnForm: true,
    category: 'Photographer',
    vendor: '66fb8571fd2f3d987a5f1a7a',
  },
  categories: [
    'Styling',
    'Hair',
    'Photographer',
    'Ceremony Venue',
    'DJ',
    'Videographer',
    'Florist',
    'Stationery',
    'Cake',
    'MUA',
    'Venue',
    'Celebrant',
    'Catering',
    'Band',
    'Transport',
    'Dress Store',
    'Dress Designer',
  ],
}

// Call the function with the user ID and settings ID
replaceUserSettings('640fc4c6d69dbeb3b43c62e8', newSettings)
