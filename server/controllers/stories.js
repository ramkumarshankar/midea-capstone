// Stories controller

module.exports = {
  index (req, res) {
    console.log('received request')
    res.status(200).json('return all stories')
    // res.send('return all stories')
  },
  create (req, res) {
    // create a story here
    res.send('create a story')
  }
}
