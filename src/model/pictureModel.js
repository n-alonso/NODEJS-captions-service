const Mongoose = require('mongoose')

const PictureSchema = new Mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    captionIds: [{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Caption'
    }],
})

const Picture = Mongoose.model('picture', PictureSchema)
module.exports = { Picture }