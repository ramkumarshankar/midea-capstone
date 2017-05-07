var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  req.HTTP.get('/api/prompts').then(function (prompts) {
    console.log(prompts.data)
    req.HTTP.get('/api/stories').then(function (stories) {
      console.log(stories.data)
      res.render('index', {
        title: 'Home Page',
        // data: JSON.stringify(output)
        prompts: JSON.stringify(prompts.data),
        stories: JSON.stringify(stories.data)
      })
    })
  }, function (err) {
    console.error('error getting stories: ')
    console.error(err)
  })
})

module.exports = router
