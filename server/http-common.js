const axios = require('axios')

var apiUri = process.env.HEROKU_URL || "http://localhost:8000/";

const HTTP = axios.create({
  // baseURL: 'http://localhost:8000/'
  baseURL: apiUri
})

module.exports = HTTP
