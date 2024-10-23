const CustomAPIError = require('./custom-api')
const BadRequest = require('./bad-request')
const NotFound = require('./not-found')
const Unauthenticated = require('./unauthenticated')
const Unauthorised = require('./unauthorised')

module.exports = {
  BadRequest,
  NotFound,
  Unauthenticated,
  Unauthorised,
}
