const mongoose = require('mongoose')
const Submission = require('../models/submissionModel')
const Event = require('../models/eventModel')

async function copySubmissionsToEvents() {
  try {
    await mongoose.connect(
      'mongodb+srv://rob:z8AY9wnwQYmStcC8@cluster0.ke7ms6l.mongodb.net/vendor-app?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    const submissions = await Event.find()
    console.log(submissions)
    console.log('All submissions copied to events successfully.')
  } catch (error) {
    console.error('Error copying submissions to events:', error)
  } finally {
    await mongoose.disconnect()
  }
}

copySubmissionsToEvents()
