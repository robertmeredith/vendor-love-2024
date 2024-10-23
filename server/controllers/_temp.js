// CREATE SUBMISSION
const createSubmission = async (req, res) => {
  const { user, client, partner, email, date, vendors } = req.body

  // Remove values from vendors array where vendor name is empty
  const populatedVendors = vendors.filter((v) => v.vendor.name.trim() !== '')

  // List of processed vendor names, so if a new vendor is added twice on the same form (e.g venue), it will only be created once

  const newlyCreatedVendorNames = []
  const results = []
  for (const v of populatedVendors) {
    // If vendor has id, means already in database
    if (v.vendor._id) {
      results.push({
        vendorType: v.vendorType,
        vendor: v.vendor._id,
      })
    } else {
      // If no id - check if already created first then create new vendor in database
      if (
        newlyCreatedVendorNames.includes(v.vendor.name.trim().toLowerCase())
      ) {
        results.push({
          vendorType: v.vendorType,
          vendor: mongoose.Types.ObjectId(
            Vendor.findOne({ name: v.vendor.name })._id
          ),
        })
      } else {
        // Create new vendor
        const newVendor = await Vendor.create({
          user,
          name: v.vendor.name.trim(),
          instagram: v.vendor.instagram.trim(),
          website: v.vendor.website.trim(),
          email: v.vendor.email.trim(),
        })
      }

      newlyCreatedVendorNames.push(newVendor.name.toLowerCase())
      results.push({
        vendorType: v.vendorType,
        vendor: newVendor._id,
      })
    }
  }

  const newSubmission = new Submission({
    user,
    client,
    email,
    partner,
    eventDate: date.startDate,
    vendors: results,
  })

  newSubmission.save()

  res.status(200).json(newSubmission)
}


