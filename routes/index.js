var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Home Page' })
  req.HTTP.get('/api/stories').then(function (response) {
    console.log(response.data)
    // res.render('index', { title: 'Home Page' })
    res.render('index', {
      title: 'Home Page',
      data: JSON.stringify(response.data)
    })
  }, function (err) {
    console.error('error getting stories: ')
    console.error(err)
  })
})

module.exports = router
