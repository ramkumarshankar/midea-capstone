// Stories controller
const db = require('./config')
const collection = db.get('stories')

module.exports = {
  index (req, res) {
    collection.find({'enabled': true}).then(function (docs) {
      console.log(docs)
      console.log('received request')
      res.status(200).json(docs)
    })
  },
  create (req, res) {
    collection.insert({ text: req.body.text, promptId: req.body.promptId, enabled: false }).then(function (record) {
      console.log('record inserted with id ' + record._id)
      res.status(200).send('record inserted with id ' + record._id)
    })
  }
}
