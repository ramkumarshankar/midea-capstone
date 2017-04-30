const axios = require('axios')

const HTTP = axios.create({
  baseURL: `http://localhost:8000/`
})

module.exports = HTTP
