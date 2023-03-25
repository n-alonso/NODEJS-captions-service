const { Picture, Caption } = require('../../models/index')
const Mongoose = require('mongoose')


const getPictures = async (req, res) => {

    await Picture.find({})
        .then(pictures => {
            res.status(200).json({
                message: 'Pictures fetched successfully.',
                pictures
            })
        })
        .catch(err => res.status(401).json({
            message: 'Could not fetch pictures.',
            error: err.message
        }))

}

const getPictureById = async (req, res) => {

    const id = req.params.id

    await Picture.findById(id)
        .then(picture => {
            res.status(200).json({
                message: 'Picture fetched successfully.',
                picture
            })
        })
        .catch(err => res.status(401).json({
            message: 'Could not fetch picture.',
            error: err.message
        }))

}

const createPicture = async (req, res) => {

    const { url, description } = req.body

    await Picture.create({ url, description, captionIds: [] })
        .then(picture => res.status(200).json({
            message: 'Picture successfully created.',
            picture
        }))
        .catch(err => res.status(401).json({
            message: 'Could not create picture.',
            error: err.message
        }))

}

const updatePicture = async (req, res) => {

    const { id } = req.params
    const { url, description } = req.body

    await Picture.findById(id)
        .then(picture => {
            if (url) picture.url = url
            if (description) picture.description = description
            picture.save()
                .then(picture => res.status(201).json({
                    message: 'Picture successfully updated.',
                    picture
                }))
                .catch(err => {
                        res.status(400).json({
                            message: 'Error updating picture.',
                            error: err.message
                        })
                        process.exit(1)
                    }
                )
        })
        .catch(err => res.status(401).json({
            message: 'Error updating picture.',
            error: err.message
        }))

}

const deletePicture = async (req, res) => {

    const { id } = req.params
    const pictureObjectId = new Mongoose.Types.ObjectId(id)

    await Picture.findByIdAndRemove(id)
        .then(picture => res.status(200).json({
            message: 'Picture successfully deleted.',
            picture
        }))
        .catch(err => res.status(400).json({
            message: 'Error deleting picture.',
            error: err.message
        }))

    await Caption.deleteMany({ pictureId: pictureObjectId })

}


module.exports = {
    getPictures,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture
}