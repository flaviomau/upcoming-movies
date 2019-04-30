const express     = require('express'),
      router      = express.Router()

router.get('/', function (request, response) {
  response.send('Upcoming Movies API')
})

module.exports = router