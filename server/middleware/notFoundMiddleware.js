const notFoundMiddleware = (req, res) => {
  console.log('NOT FOUND MIDDLEWARE ROUTE HIT')
  
  res.status(404).send('Route does not exist')
}

module.exports = notFoundMiddleware
