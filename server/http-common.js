const axios = require('axios')
const apiURL = process.env.HEROKU_URL || 'http://localhost:8000/'

const HTTP = axios.create({
  baseURL: apiURL
})

module.exports = HTTP
