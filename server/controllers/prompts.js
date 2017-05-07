// Prompts controller
const db = require('./config')
const collection = db.get('prompts')

module.exports = {
  index (req, res) {
    collection.find({}).then(function (prompts) {
      console.log(prompts)
      console.log('returning all prompts')
      res.status(200).json(prompts)
    })
  },
  findById (req, res) {
    collection.find({ '_id': req.params.id }).then(function (record) {
      console.log('returning prompt with id:' + req.params.id)
      res.status(200).send(record)
    })
  }
}
