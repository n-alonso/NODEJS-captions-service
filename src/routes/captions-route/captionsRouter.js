const express = require('express')
const captionsRouter = express.Router()
const { getCaptions, getCaptionById, createCaption, updateCaption, deleteCaption } = require('../../services/index')


captionsRouter.route('/').get(getCaptions)
captionsRouter.route('/:id').get(getCaptionById)
captionsRouter.route('/').post(createCaption)
captionsRouter.route('/:id').put(updateCaption)
captionsRouter.route('/:id').delete(deleteCaption)

module.exports = {
    captionsRouter
}