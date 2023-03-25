const Mongoose = require('mongoose')

const CaptionSchema = new Mongoose.Schema({
    caption: {
        type: String,
        required: true,
        unique: true
    },
    pictureId: [{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Picture'
    }],
    userId: [{
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
})

const Caption = Mongoose.model('caption', CaptionSchema)
module.exports = { Caption }