// Post view
var express = require('express')
var router = express.Router()
var prompts = require('../server/seeders/prompts')

/* Post story page */
router.get('/', function (req, res, next) {
  res.render('post', {
    title: 'Share a story',
    prompts: JSON.stringify(prompts)
  })
})

router.post('/', function (req, res, next) {
  // Variables are in req.body.prompt and req.body.story
  // Route to about page
  var story = {
    prompt: req.body.prompt,
    text: req.body.story
  }
    res.render('thanks', {
      title: 'Thank You'
    })
  // req.HTTP.post('/api/stories', story).then(function (response) {
  //   console.log(response.data)
  //   res.render('thanks', {
  //     title: 'Thank You'
  //   })
  // }, function (err) {
  //   console.error('error posting story :( ')
  //   console.error(err)
  // })
})

module.exports = router
