var express = require('express')
var router = express.Router()
var socketURL = process.env.HEROKU_SOCKET_URL || 'http://localhost:3000/'
var webURL = (process.env.HEROKU_URL || 'http://localhost:8000/') + 'post'

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(socketURL)
  req.HTTP.get('/api/prompts').then(function (prompts) {
    req.HTTP.get('/api/stories').then(function (stories) {
      res.render('index', {
        title: 'Home Page',
        postURL: webURL,
        socketio: socketURL,
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
