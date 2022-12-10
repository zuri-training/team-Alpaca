const router = require("express").Router();
const controller = require("../controller/commentController");

router
  .get("/", controller.getAllComments)
  .get("/:id", controller.getComment) //might not be needed
  .post("/", controller.createComment)
  .put("/:id", controller.updateComment)
  .delete("/:id", controller.deleteComment);

module.exports = router;
