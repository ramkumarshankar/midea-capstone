// Post view
var express = require('express')
var router = express.Router()
var prompts = require('../server/seeders/prompts')

/* Post story page */
router.get('/', function (req, res, next) {
  req.HTTP.get('/api/prompts').then(function (response) {
    console.log(response.data)
    res.render('post', {
      title: 'Share a story',
      prompts: JSON.stringify(response.data)
    })
  }, function (err) {
    console.error('error getting stories: ')
    console.error(err)
  })
})

router.post('/', function (req, res, next) {
  // Variables are in req.body.prompt and req.body.story
  // Route to about page
  var story = {
    promptId: req.body.promptId,
    text: req.body.story
  }
  // res.render('thanks', {
  //   title: 'Thank You'
  // })
  req.HTTP.post('/api/stories', story).then(function (response) {
    console.log(response.data)
    res.render('thanks', {
      title: 'Thank You'
    })
  }, function (err) {
    console.error('error posting story :( ')
    console.error(err)
  })
})

module.exports = router
