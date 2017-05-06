// mongod --dbpath ./data

var mongoUri = process.env.MONGOHQ_URL || "localhost:27017/capstone";

const mongo = require('mongodb')
const monk = require('monk')
// const db = monk('localhost:27017/capstone')
const db = monk(process.env.MONGOHQ_URL)

module.exports = db
