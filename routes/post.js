// Post view
var express = require('express')
var router = express.Router()

/* Post story page */
router.get('/', function (req, res, next) {
  res.status(200).send('post page')
    // res.render('post', { prompt: 'What is your earliest memory?' });
})

module.exports = router



// module.exports = {
//   index (req, res) {
//     console.log('post page')
//     // return the post page
//     res.status(200).json('post page')
//     // res.send('return all stories')
//   }
// }
