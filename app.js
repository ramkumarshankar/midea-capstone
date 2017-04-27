const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const api = express.Router()
const path = require('path')
const stories = require('./server/controllers/stories')
const index = require('./routes/index')
const post = require('./routes/post')

// Express config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, '/public')))

// API routes
// Stories
api.get('/stories', stories.index)
// router.post('/stories', stories.create)

// App routes
app.use('/post', post)
app.use('/', index)

app.use('/api', api)
// app.use('/', router)

// start server
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'))
})
