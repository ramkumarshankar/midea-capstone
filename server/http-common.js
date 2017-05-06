const axios = require('axios')

const HTTP = axios.create({
  // baseURL: 'http://localhost:8000/'
  baseURL: 'http://story-wall.herokuapp.com/'
})

module.exports = HTTP
