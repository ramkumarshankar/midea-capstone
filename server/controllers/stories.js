// Stories controller
const db = require('./config')
const collection = db.get('stories')

module.exports = {
  index (req, res) {
    collection.find({}).then(function (docs) {
      console.log(docs)
      console.log('received request')
      res.status(200).json(docs)
    })
  },
  create (req, res) {
    // create a story here
    res.send('create a story')
  }
}
