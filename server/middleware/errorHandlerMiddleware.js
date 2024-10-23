const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  console.log('REQUEST PATH', req.path)
  console.log('Res status: ', res.statusCode)
  console.log('Err status: ', err.statusCode)
  console.log('Error Name', err.name)
  console.log('Error Value', err.value)
  console.log('Error Code', err.code)
  console.log('Message: ', err.message)
  console.log('Stack: ', err.stack)

  // Sets default message and error code for any errors thrown that aren't custom and we don't handle manually
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // 500
    msg: err.message || 'Something went wrong, try again later',
  }

  // Cast Error - when item ID is malformatted e.g. missing a char
  if (err.name === 'CastError') {
    ;(customError.msg = `No item found with ID : ${err.value}`),
      (customError.statusCode = StatusCodes.NOT_FOUND) // 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler
