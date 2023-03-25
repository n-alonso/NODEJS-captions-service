const { Caption, Picture, User } = require('../../models/index')
const Mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


const getCaptions = async (req, res) => {

    await Caption.find({})
        .then(captions => {
            res.status(200).json({
                message: 'Captions fetched successfully.',
                captions
            })
        })
        .catch(err => res.status(401).json({
            message: 'Could not fetch captions.',
            error: err.message
        }))

}

const getCaptionById = async (req, res) => {

    const id = req.params.id

    await Caption.findById(id)
        .then(caption => {
            res.status(200).json({
                message: 'Caption fetched successfully.',
                caption
            })
        })
        .catch(err => res.status(401).json({
            message: 'Could not fetch caption.',
            error: err.message
        }))

}

const createCaption = async (req, res) => {

    const { caption, pictureId } = req.body

    const token = req.cookies.jwt
    const tokenObject = jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) return res.status(401).json({
            message: 'Not Authorised.', 
            error: 'JWT token invalid.'
        })
        return decodedToken
    })

    const picture = await Picture.findById(pictureId)
        .then(picture => { return picture })
        .catch(err => res.status(400).json({
            message: 'Could not create caption.',
            error: err
        }))

    const user = await User.findById(tokenObject.id)
        .then(user => { return user })
        .catch(err => res.status(400).json({
            message: 'Could not create caption.',
            error: err
        }))

    const userObjectId = new Mongoose.Types.ObjectId(tokenObject.id)
    const pictureObjectId = new Mongoose.Types.ObjectId(pictureId)

    const newCaption = await Caption.create({ caption, pictureId: pictureObjectId, userId: userObjectId })
        .then(caption => {
            res.status(200).json({
                message: 'Caption successfully created.',
                caption
            })
            return caption
        })
        .catch(err => res.status(401).json({
            message: 'Could not create caption.',
            error: err.message
        }))

    picture.captionIds.push(new Mongoose.Types.ObjectId(newCaption._id))
    await picture.save()
    user.captionIds.push(new Mongoose.Types.ObjectId(newCaption._id))
    await user.save()

}

const updateCaption = async (req, res) => {

    const { id } = req.params
    const { caption: userCaption } = req.body

    await Caption.findById(id)
        .then(retrievedCaption => {
            if (userCaption) {
                retrievedCaption.caption = userCaption
                retrievedCaption.save()
                    .then(retrievedCaption => res.status(201).json({
                        message: 'Caption successfully updated.',
                        retrievedCaption
                    }))
                    .catch(err => {
                            res.status(400).json({
                                message: 'Error updating caption.',
                                error: err.message
                            })
                            process.exit(1)
                        }
                    )
            } else {
                res.status(400).json({
                    message: 'Error updating caption.',
                    error: 'Caption is missing.'
                })
            }
            
        })
        .catch(err => res.status(401).json({
            message: 'Error updating caption.',
            error: err.message
        }))

}

const deleteCaption = async (req, res) => {

    const { id } = req.params

    const token = req.cookies.jwt
    const tokenObject = jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) return res.status(401).json({
            message: 'Not Authorised.', 
            error: 'JWT token invalid.'
        })
        return decodedToken
    })

    const caption = await Caption.findById(id)
        .then(caption => { return caption })
        .catch(err => res.status(400).json({
            message: 'Error deleting caption.',
            error: err.message
        }))

    const pictureObjectId = new Mongoose.Types.ObjectId(caption.pictureId)
    const userObjectId = new Mongoose.Types.ObjectId(tokenObject.id)
    const captionObjectId = new Mongoose.Types.ObjectId(caption._id)

    await Picture.updateOne({ _id: pictureObjectId }, { $pull: { captionIds: captionObjectId }})
    await User.updateOne({ _id: userObjectId }, { $pull: { captionIds: captionObjectId }})

    await Caption.findByIdAndRemove(id)
        .then(caption => res.status(200).json({
            message: 'Caption successfully deleted.',
            caption
        }))
        .catch(err => res.status(400).json({
            message: 'Error deleting caption.',
            error: err.message
        }))

}


module.exports = {
    getCaptions,
    getCaptionById,
    createCaption,
    updateCaption,
    deleteCaption
}