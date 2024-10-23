const mongoose = require('mongoose')
const Event = require('../models/eventModel')

async function updateEventDates() {
  try {
    await mongoose.connect(
      'mongodb+srv://rob:z8AY9wnwQYmStcC8@cluster0.ke7ms6l.mongodb.net/vendor-app?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    const events = await Event.find()
    for (const event of events) {
      if (event.eventDate) {
        // event.eventDate = new Date(event.eventDate + 'Z') // Convert string to Date
        console.log(event)
        // await event.save() // Save the updated event

      }
    }

    console.log('Event dates updated successfully.')
  } catch (error) {
    console.error('Error updating event dates:', error)
  } finally {
    await mongoose.disconnect()
  }
}

updateEventDates()

// console.log(new Date('2024-09-13'))