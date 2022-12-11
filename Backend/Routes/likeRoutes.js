const likeRouter = require("express").Router();
const controller = require("../controllers/likeController");

likeRouter
    .get('/:documentId', controller.getLikeCount)
    .patch('/:documentId', controller.likeDocument)
    .delete('/:documentId', controller.unlikeDocument);

module.exports = likeRouter;