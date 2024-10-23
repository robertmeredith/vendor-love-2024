const { StatusCodes } = require('http-status-codes')

const errorHandler = (error, req, res, next) => {
  console.log('ERROR HANDLER TRIGGERED')

  // If statusCode is the default 200 then assign the default error code 500
  if (res.statusCode === 200) {
    res.status(500)
  }

  console.log('Res status: ', res.statusCode)
  console.log('Error Name', error.name)
  console.log('Error Value', error.value)
  console.log('Error Code', error.code)
  console.log('Message: ', error.message)
  console.log('Stack: ', error.stack)

  res.json({
    status: res.statusCode,
    message: error.message || 'Something went wrong',
    stack: error.stack,
  })
}

module.exports = errorHandler
