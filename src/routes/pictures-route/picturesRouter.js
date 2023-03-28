const express = require('express')
const picturesRouter = express.Router()
const { getPictures, getPictureById, createPicture, updatePicture, deletePicture } = require('../../services/index')


picturesRouter.route('/').get(getPictures)
picturesRouter.route('/:id').get(getPictureById)
picturesRouter.route('/').post(createPicture)
picturesRouter.route('/:id').put(updatePicture)
picturesRouter.route('/:id').delete(deletePicture)


module.exports = {
    picturesRouter
}