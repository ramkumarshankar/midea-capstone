// mongod --dbpath ./data

var mongoUri = MONGODB_URI || "localhost:27017/capstone";

const mongo = require('mongodb')
const monk = require('monk')
// const db = monk('localhost:27017/capstone')
const db = monk(mongoUri)

module.exports = db
