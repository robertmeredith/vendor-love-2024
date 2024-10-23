const { check, body, validationResult } = require('express-validator')
const CustomError = require('../../errors')

// TODO: Look at this, used in authRouter

function handleValidationError() {
  return (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() })

      // Takes message from validation and throws error to be handled by Error Handler Middleware
      const msg = errors
        .array()
        .map((error) => error.msg)
        .join(', ')
      throw new CustomError.BadRequest(msg)
    } else {
      next()
    }
  }
}

// REGISTER validation
const register = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  // check('name', 'Name must be at least 2 characters').isLength({
  //   min: 2,
  // }),
  check('password', 'Password must be at least 6 characters').isLength({
    min: 6,
  }),
  handleValidationError(),
]

// LOGIN validation
const login = [
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
  handleValidationError(),
]

module.exports = {
  register,
  login,
}
