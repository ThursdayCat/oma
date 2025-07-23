const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note