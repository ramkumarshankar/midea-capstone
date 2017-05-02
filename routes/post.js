// Post view
var express = require('express')
var router = express.Router()
var prompts = require('../server/seeders/prompts')

/* Post story page */
router.get('/', function (req, res, next) {
  console.log(prompts)
  res.render('post', { 
    title: 'Share a story',
    prompts: JSON.stringify(prompts)
  })
})

module.exports = router
