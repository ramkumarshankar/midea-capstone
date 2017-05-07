const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const api = express.Router()
const path = require('path')

// Controllers
const stories = require('./server/controllers/stories')
const prompts = require('./server/controllers/prompts')

// Define route handlers
const index = require('./routes/index')
const post = require('./routes/post')
const about = require('./routes/about')

// Get HTTP object for api calls
const HTTP = require('./server/http-common.js')

// Express config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride())
app.set('port', process.env.PORT || 8000)

app.use(express.static(path.join(__dirname, '/public')))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Make the db accessible to the router
app.use(function (req, res, next) {
  req.HTTP = HTTP
  next()
})

// Define and use API routes
// Stories
api.get('/stories', stories.index)
api.post('/stories', stories.create)
// Prompts
api.get('/prompts', prompts.index)

app.use('/api', api)

// App routes
app.use('/', index)
app.use('/post', post)
app.use('/about', about)

// start server
const server = app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'))
})

// Socket.io
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('refresh', function (data) {
    HTTP.get('/api/stories').then(function (stories) {
      socket.emit('refreshData', stories.data)
    })
  })
})
