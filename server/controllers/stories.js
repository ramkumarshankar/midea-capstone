// Stories controller
const db = require('./index')
const collection = db.get('stories')

module.exports = {
  index (req, res) {
    collection.find({}, {}, function (e, docs) {
      console.log(docs)
      console.log('received request')
      res.status(200).json(docs)
    })
    // res.status(200).json('return all stories')
    // res.send('return all stories')
  },
  create (req, res) {
    // create a story here
    res.send('create a story')
  }
}
